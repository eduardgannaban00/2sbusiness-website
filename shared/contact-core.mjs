const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TURNSTILE_ENDPOINT = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const DEFAULT_ALLOWED_ORIGIN = "https://2sbusinesssupport.com";
const DEFAULT_MAX_BODY_BYTES = 16 * 1024;
const DEFAULT_PROVIDER_TIMEOUT_MS = 8000;

const FIELD_LIMITS = Object.freeze({
  name: 200,
  business_name: 200,
  email: 320,
  phone: 40,
  interest: 100,
  preferred_date: 10,
  preferred_time: 5,
  timezone: 80,
  message: 2000,
  company_website_url: 500,
  turnstile_token: 2048,
});

const REQUIRED_FIELDS = Object.freeze([
  "name",
  "business_name",
  "email",
  "interest",
  "preferred_date",
  "preferred_time",
  "timezone",
]);

const ALLOWED_INTERESTS = new Set([
  "Website / Funnel",
  "AI Automation",
  "AI Receptionist",
  "Lead Follow-Up",
  "CRM / GoHighLevel",
  "Bookkeeping Automation",
  "Virtual Assistance",
  "Customer Support",
  "Social Media Support",
  "Not sure yet",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

function isValidDate(value) {
  if (!DATE_RE.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function jsonResponse(status, body, origin) {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    Vary: "Origin",
  });
  if (origin) headers.set("Access-Control-Allow-Origin", origin);
  return new Response(JSON.stringify(body), { status, headers });
}

function parseBoolean(value) {
  return String(value || "").toLowerCase() === "true";
}

function allowedOrigins(env) {
  return String(env.CONTACT_ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGIN)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function validateOrigin(request, env) {
  const origin = request.headers.get("Origin");
  const allowed = allowedOrigins(env);
  if (!origin || !allowed.includes(origin)) {
    return { valid: false, origin: null };
  }
  return { valid: true, origin };
}

function sanitizePlainText(value) {
  return String(value == null ? "" : value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizePayload(payload) {
  const normalized = {};
  for (const field of Object.keys(FIELD_LIMITS)) {
    normalized[field] = sanitizePlainText(payload[field]);
  }
  return normalized;
}

function validatePayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { valid: false, spam: false, errors: ["invalid_payload"] };
  }

  const clean = normalizePayload(payload);
  if (clean.company_website_url) {
    return { valid: false, spam: true, errors: ["honeypot_triggered"], clean };
  }

  const errors = [];
  for (const field of REQUIRED_FIELDS) {
    if (!clean[field]) errors.push(`${field}_required`);
  }
  for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
    if (clean[field].length > limit) errors.push(`${field}_too_long`);
  }
  if (clean.email && !EMAIL_RE.test(clean.email)) errors.push("email_invalid");
  if (clean.email && /[\r\n]/.test(clean.email)) errors.push("email_invalid");
  if (clean.preferred_date && !isValidDate(clean.preferred_date)) errors.push("preferred_date_invalid");
  if (clean.preferred_time && !TIME_RE.test(clean.preferred_time)) errors.push("preferred_time_invalid");
  if (clean.interest && !ALLOWED_INTERESTS.has(clean.interest)) errors.push("interest_invalid");

  return { valid: errors.length === 0, spam: false, errors, clean };
}

function emailContent(fields) {
  const subjectBusiness = fields.business_name.replace(/[\r\n]+/g, " ").slice(0, 120);
  const rows = [
    ["Name", fields.name],
    ["Business", fields.business_name],
    ["Email", fields.email],
    ["Phone", fields.phone || "(not provided)"],
    ["Interested in", fields.interest],
    ["Preferred date", fields.preferred_date],
    ["Preferred time", fields.preferred_time],
    ["Timezone", fields.timezone],
    ["Message", fields.message || "(not provided)"],
  ];
  return {
    subject: `New consultation request - ${subjectBusiness}`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
    html: `<h1>New consultation request</h1><dl>${rows
      .map(([label, value]) => `<dt><strong>${escapeHtml(label)}</strong></dt><dd>${escapeHtml(value)}</dd>`)
      .join("")}</dl>`,
  };
}

async function fetchWithTimeout(fetchImpl, url, options, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetchImpl(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function verifyTurnstile(token, ip, env, fetchImpl) {
  const required = parseBoolean(env.TURNSTILE_REQUIRED);
  const secret = env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return required ? { ok: false, configurationError: true } : { ok: true, skipped: true };
  }
  if (!token) return { ok: false };

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const response = await fetchWithTimeout(
      fetchImpl,
      TURNSTILE_ENDPOINT,
      { method: "POST", body },
      Number(env.CONTACT_PROVIDER_TIMEOUT_MS) || DEFAULT_PROVIDER_TIMEOUT_MS
    );
    if (!response.ok) return { ok: false };
    const result = await response.json();
    return { ok: result && result.success === true };
  } catch {
    return { ok: false, providerError: true };
  }
}

async function checkRateLimit(ip, env) {
  const required = parseBoolean(env.CONTACT_RATE_LIMIT_REQUIRED);
  const limiter = env.CONTACT_RATE_LIMITER;
  if (!limiter || typeof limiter.limit !== "function") {
    return required ? { allowed: false, configurationError: true } : { allowed: true, skipped: true };
  }
  try {
    const result = await limiter.limit({ key: ip || "unknown" });
    return { allowed: Boolean(result && result.success) };
  } catch {
    return { allowed: false, configurationError: true };
  }
}

async function sendWithResend(fields, env, fetchImpl) {
  const apiKey = env.RESEND_API_KEY;
  const toEmail = env.CONTACT_TO_EMAIL;
  const fromEmail = env.CONTACT_FROM_EMAIL;
  if (!apiKey || !toEmail || !fromEmail) throw new Error("contact_delivery_not_configured");

  const content = emailContent(fields);
  const response = await fetchWithTimeout(
    fetchImpl,
    RESEND_ENDPOINT,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: [fields.email],
        subject: content.subject,
        text: content.text,
        html: content.html,
      }),
    },
    Number(env.CONTACT_PROVIDER_TIMEOUT_MS) || DEFAULT_PROVIDER_TIMEOUT_MS
  );
  if (!response.ok) throw new Error("contact_delivery_rejected");
  const result = await response.json();
  if (!result || typeof result.id !== "string" || !result.id) {
    throw new Error("contact_delivery_invalid_response");
  }
  return { id: result.id };
}

async function handleContactRequest(request, env = {}, options = {}) {
  const fetchImpl = options.fetchImpl || globalThis.fetch;
  const logger = options.logger || console;
  const method = String(request.method || "GET").toUpperCase();
  if (method !== "POST") {
    return jsonResponse(405, { ok: false, error: "method_not_allowed" });
  }

  const originResult = validateOrigin(request, env);
  if (!originResult.valid) {
    return jsonResponse(403, { ok: false, error: "origin_not_allowed" });
  }

  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return jsonResponse(415, { ok: false, error: "unsupported_media_type" }, originResult.origin);
  }

  const declaredLength = Number(request.headers.get("Content-Length") || 0);
  const maxBytes = Number(env.CONTACT_MAX_BODY_BYTES) || DEFAULT_MAX_BODY_BYTES;
  if (declaredLength > maxBytes) {
    return jsonResponse(413, { ok: false, error: "payload_too_large" }, originResult.origin);
  }

  let rawBody;
  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse(400, { ok: false, error: "invalid_payload" }, originResult.origin);
  }
  if (new TextEncoder().encode(rawBody).byteLength > maxBytes) {
    return jsonResponse(413, { ok: false, error: "payload_too_large" }, originResult.origin);
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return jsonResponse(400, { ok: false, error: "invalid_json" }, originResult.origin);
  }

  const validation = validatePayload(payload);
  if (validation.spam) return jsonResponse(200, { ok: true }, originResult.origin);
  if (!validation.valid) {
    return jsonResponse(400, { ok: false, error: "validation_failed", fields: validation.errors }, originResult.origin);
  }

  const ip = options.ip || request.headers.get("CF-Connecting-IP") || "unknown";
  const rateLimit = await checkRateLimit(ip, env);
  if (rateLimit.configurationError) {
    return jsonResponse(503, { ok: false, error: "service_unavailable" }, originResult.origin);
  }
  if (!rateLimit.allowed) {
    return jsonResponse(429, { ok: false, error: "rate_limited" }, originResult.origin);
  }

  const turnstile = await verifyTurnstile(validation.clean.turnstile_token, ip, env, fetchImpl);
  if (turnstile.configurationError) {
    return jsonResponse(503, { ok: false, error: "service_unavailable" }, originResult.origin);
  }
  if (!turnstile.ok) {
    return jsonResponse(403, { ok: false, error: "spam_check_failed" }, originResult.origin);
  }

  try {
    await sendWithResend(validation.clean, env, fetchImpl);
    return jsonResponse(200, { ok: true }, originResult.origin);
  } catch (error) {
    logger.error("contact_delivery_failed", { type: error && error.name ? error.name : "Error" });
    return jsonResponse(502, { ok: false, error: "delivery_failed" }, originResult.origin);
  }
}

export {
  ALLOWED_INTERESTS,
  DEFAULT_MAX_BODY_BYTES,
  FIELD_LIMITS,
  RESEND_ENDPOINT,
  TURNSTILE_ENDPOINT,
  emailContent,
  escapeHtml,
  handleContactRequest,
  normalizePayload,
  sendWithResend,
  validateOrigin,
  validatePayload,
};
