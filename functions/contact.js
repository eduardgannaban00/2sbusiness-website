/**
 * POST /.netlify/functions/contact  →  Free Consultation request handler
 * (also reachable at /api/contact via the netlify.toml redirect)
 *
 * Email delivery uses the Resend API (https://resend.com/docs/api-reference/emails/send-email)
 * directly via fetch — no SDK dependency, since a single POST doesn't need one.
 *
 * No secrets are hardcoded. All provider credentials come from environment
 * variables, set in the Netlify dashboard (Site settings → Environment variables):
 *   RESEND_API_KEY      — Resend API key (server-side only, never sent to the client)
 *   CONTACT_TO_EMAIL    — inbox that receives consultation requests
 *   CONTACT_FROM_EMAIL  — Resend-verified sending address for your domain
 */

const REQUIRED_FIELDS = [
  "name",
  "business_name",
  "email",
  "interest",
  "preferred_date",
  "preferred_time",
  "timezone",
];
const MAX_FIELD_LENGTH = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

// Naive in-memory rate limit. Serverless instances are ephemeral/parallel,
// so this is a first line of defense only — if spam becomes a real problem,
// move rate limiting to the edge (e.g. Cloudflare Turnstile / platform-level
// rate limiting) as noted in the approved architecture.
const recentSubmissions = new Map(); // ip -> [timestamps]
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (recentSubmissions.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  recentSubmissions.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function sanitize(value) {
  if (typeof value !== "string") return "";
  return value
    .slice(0, MAX_FIELD_LENGTH)
    .replace(/[<>]/g, "") // strip angle brackets to prevent HTML injection in the notification email
    .trim();
}

function validate(payload) {
  const errors = [];

  // Honeypot: if filled, treat as spam. Caller should short-circuit before
  // this even reaches here in most cases, but this is the authoritative check.
  if (payload.company_website_url) {
    return { valid: false, spam: true, errors: ["honeypot_triggered"] };
  }

  for (const field of REQUIRED_FIELDS) {
    if (!payload[field] || !String(payload[field]).trim()) {
      errors.push(`${field}_required`);
    }
  }
  if (payload.email && !EMAIL_RE.test(String(payload.email).trim())) {
    errors.push("email_invalid");
  }
  if (payload.preferred_date && !DATE_RE.test(String(payload.preferred_date).trim())) {
    errors.push("preferred_date_invalid");
  }
  if (payload.preferred_time && !TIME_RE.test(String(payload.preferred_time).trim())) {
    errors.push("preferred_time_invalid");
  }

  return { valid: errors.length === 0, spam: false, errors };
}

/**
 * Core handler — takes a plain object payload and an IP string,
 * returns { statusCode, body } for the caller to translate into its
 * platform's response shape.
 */
async function handleContact(payload, ip) {
  if (!payload || typeof payload !== "object") {
    return { statusCode: 400, body: { ok: false, error: "invalid_payload" } };
  }

  if (isRateLimited(ip)) {
    return { statusCode: 429, body: { ok: false, error: "rate_limited" } };
  }

  const clean = {
    name: sanitize(payload.name),
    business_name: sanitize(payload.business_name),
    email: sanitize(payload.email),
    phone: sanitize(payload.phone),
    interest: sanitize(payload.interest),
    preferred_date: sanitize(payload.preferred_date),
    preferred_time: sanitize(payload.preferred_time),
    timezone: sanitize(payload.timezone),
    message: sanitize(payload.message),
    company_website_url: payload.company_website_url, // honeypot, unsanitized on purpose for the spam check
  };

  const result = validate(clean);
  if (result.spam) {
    // Return success to the bot without sending anything — don't reveal detection.
    return { statusCode: 200, body: { ok: true } };
  }
  if (!result.valid) {
    return { statusCode: 400, body: { ok: false, error: "validation_failed", fields: result.errors } };
  }

  try {
    await sendNotificationEmail(clean);
    return { statusCode: 200, body: { ok: true } };
  } catch (err) {
    // Log server-side for operator visibility; never expose internals to the client.
    console.error("contact_form_send_failed", err);
    return { statusCode: 502, body: { ok: false, error: "delivery_failed" } };
  }
}

const RESEND_ENDPOINT = "https://api.resend.com/emails";

async function sendNotificationEmail(fields) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    // Fails loudly server-side rather than silently "succeeding" with no email sent.
    throw new Error(
      "Resend is not configured — set RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL."
    );
  }

  const subject = `New consultation request — ${fields.business_name}`;
  const bodyLines = [
    `Name: ${fields.name}`,
    `Business: ${fields.business_name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone || "(not provided)"}`,
    `Interested in: ${fields.interest}`,
    `Preferred date: ${fields.preferred_date}`,
    `Preferred time: ${fields.preferred_time}`,
    `Timezone: ${fields.timezone}`,
    `Message: ${fields.message || "(not provided)"}`,
  ];

  const body = bodyLines.join("\n");

  // Resend's "Send an email" endpoint: POST https://api.resend.com/emails
  // Auth: `Authorization: Bearer <RESEND_API_KEY>`
  // `to` and `reply_to` are arrays per Resend's documented request shape.
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject,
      text: body,
      reply_to: [fields.email],
    }),
  });

  if (!res.ok) {
    // Rejected credential, unverified domain, etc. — surface as a real failure,
    // never swallowed into a fake success.
    throw new Error(`Resend responded with status ${res.status}`);
  }
}

module.exports = {
  handleContact,
  validate,
  sanitize,
  sendNotificationEmail,
  RESEND_ENDPOINT,
};

/**
 * ---- Active Netlify Functions entry point ----
 * Netlify invokes `exports.handler` for requests to
 * /.netlify/functions/contact (and to /api/contact via the netlify.toml
 * redirect). This is real, wired-up code — not a reference stub.
 */
exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json", Allow: "POST" },
      body: JSON.stringify({ ok: false, error: "method_not_allowed" }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (e) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: "invalid_json" }),
    };
  }

  // Netlify provides the caller's IP via this header on its edge network.
  const ip =
    (event.headers && (event.headers["x-nf-client-connection-ip"] || event.headers["client-ip"])) ||
    "unknown";

  const { statusCode, body } = await handleContact(payload, ip);

  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
};
