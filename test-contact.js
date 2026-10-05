const fs = require("fs");

async function run() {
  const core = await import("./shared/contact-core.mjs");
  let passed = 0;
  let failed = 0;

  function check(label, condition) {
    if (condition) {
      console.log(`PASS  ${label}`);
      passed++;
    } else {
      console.log(`FAIL  ${label}`);
      failed++;
    }
  }

  const origin = "https://2sbusinesssupport.com";
  const validPayload = {
    name: " Jane Roofer ",
    business_name: "Jane's Roofing",
    email: "jane@example-business.com",
    phone: "555-123-4567",
    interest: "Lead Follow-Up",
    preferred_date: "2026-10-15",
    preferred_time: "14:30",
    timezone: "America/Denver",
    message: "Please help with follow-up.",
    company_website_url: "",
  };
  const baseEnv = {
    RESEND_API_KEY: "test_fake_key_not_real",
    CONTACT_TO_EMAIL: "hello@2sbusinesssupport.com",
    CONTACT_FROM_EMAIL: "verified-sender@example.com",
    CONTACT_ALLOWED_ORIGINS: origin,
    CONTACT_PROVIDER_TIMEOUT_MS: "50",
  };
  const silentLogger = { error() {} };

  function request(payload = validPayload, overrides = {}) {
    const body = overrides.rawBody !== undefined ? overrides.rawBody : JSON.stringify(payload);
    const headers = new Headers({
      Origin: overrides.origin === undefined ? origin : overrides.origin,
      "Content-Type": overrides.contentType || "application/json",
      ...(overrides.headers || {}),
    });
    return new Request("https://2sbusinesssupport.com/api/contact", {
      method: overrides.method || "POST",
      headers,
      body: (overrides.method || "POST") === "GET" ? undefined : body,
    });
  }

  function resendSuccess(capture) {
    return async (url, options) => {
      capture.push({ url, options });
      return new Response(JSON.stringify({ id: "email_test_123" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };
  }

  const calls = [];
  const accepted = await core.handleContactRequest(request(), baseEnv, {
    fetchImpl: resendSuccess(calls),
    logger: silentLogger,
    ip: "203.0.113.10",
  });
  const acceptedBody = await accepted.json();
  const resendBody = JSON.parse(calls[0].options.body);
  check("valid request is accepted", accepted.status === 200 && acceptedBody.ok === true);
  check("Resend is called exactly once", calls.length === 1);
  check("fields are normalized before delivery", resendBody.text.includes("Name: Jane Roofer"));
  check("recipient is fixed by environment", resendBody.to[0] === baseEnv.CONTACT_TO_EMAIL);
  check("sender is fixed by environment", resendBody.from === baseEnv.CONTACT_FROM_EMAIL);
  check("validated user email is Reply-To", resendBody.reply_to[0] === validPayload.email);
  check("plain-text alternative is included", resendBody.text.includes("Interested in: Lead Follow-Up"));

  for (const [label, payload] of [
    ["missing required field", { ...validPayload, name: "" }],
    ["invalid email", { ...validPayload, email: "not-an-email" }],
    ["oversized field", { ...validPayload, message: "x".repeat(2001) }],
    ["invalid date", { ...validPayload, preferred_date: "15/10/2026" }],
    ["impossible calendar date", { ...validPayload, preferred_date: "2026-13-40" }],
    ["invalid time", { ...validPayload, preferred_time: "2:30pm" }],
    ["invalid interest enumeration", { ...validPayload, interest: "Send money" }],
  ]) {
    const response = await core.handleContactRequest(request(payload), baseEnv, {
      fetchImpl: resendSuccess([]),
      logger: silentLogger,
    });
    check(`${label} is rejected`, response.status === 400);
  }

  const tooLarge = await core.handleContactRequest(
    request(validPayload, { rawBody: JSON.stringify(validPayload) + " ".repeat(17000) }),
    baseEnv,
    { fetchImpl: resendSuccess([]), logger: silentLogger }
  );
  check("oversized request body is rejected", tooLarge.status === 413);

  const malformed = await core.handleContactRequest(
    request(validPayload, { rawBody: "{" }),
    baseEnv,
    { fetchImpl: resendSuccess([]), logger: silentLogger }
  );
  check("malformed JSON is rejected", malformed.status === 400);

  const unsupportedType = await core.handleContactRequest(
    request(validPayload, { contentType: "text/plain" }),
    baseEnv,
    { fetchImpl: resendSuccess([]), logger: silentLogger }
  );
  check("unsupported content type is rejected", unsupportedType.status === 415);

  const unsupportedMethod = await core.handleContactRequest(
    request(validPayload, { method: "GET" }),
    baseEnv,
    { fetchImpl: resendSuccess([]), logger: silentLogger }
  );
  check("unsupported method is rejected", unsupportedMethod.status === 405);

  const badOrigin = await core.handleContactRequest(
    request(validPayload, { origin: "https://evil.example" }),
    baseEnv,
    { fetchImpl: resendSuccess([]), logger: silentLogger }
  );
  check("invalid origin is rejected", badOrigin.status === 403);

  const honeypotCalls = [];
  const honeypot = await core.handleContactRequest(
    request({ ...validPayload, company_website_url: "https://spam.example" }),
    baseEnv,
    { fetchImpl: resendSuccess(honeypotCalls), logger: silentLogger }
  );
  check("honeypot is safely absorbed", honeypot.status === 200);
  check("honeypot does not call Resend", honeypotCalls.length === 0);

  const hostileCalls = [];
  await core.handleContactRequest(
    request({ ...validPayload, message: '<img src=x onerror="alert(1)">' }),
    baseEnv,
    { fetchImpl: resendSuccess(hostileCalls), logger: silentLogger }
  );
  const hostileBody = JSON.parse(hostileCalls[0].options.body);
  check("hostile HTML is escaped in HTML email", hostileBody.html.includes("&lt;img"));
  check("hostile HTML is not active in HTML email", !hostileBody.html.includes("<img"));

  const injected = await core.handleContactRequest(
    request({ ...validPayload, email: "jane@example.com\r\nBcc: attacker@example.com" }),
    baseEnv,
    { fetchImpl: resendSuccess([]), logger: silentLogger }
  );
  check("CRLF email injection is rejected", injected.status === 400);

  const arbitraryCalls = [];
  await core.handleContactRequest(
    request({
      ...validPayload,
      to: "attacker@example.com",
      from: "attacker@example.com",
      recipient: "attacker@example.com",
    }),
    baseEnv,
    { fetchImpl: resendSuccess(arbitraryCalls), logger: silentLogger }
  );
  const arbitraryBody = JSON.parse(arbitraryCalls[0].options.body);
  check("arbitrary recipient is ignored", arbitraryBody.to[0] === baseEnv.CONTACT_TO_EMAIL);
  check("arbitrary sender is ignored", arbitraryBody.from === baseEnv.CONTACT_FROM_EMAIL);

  const apiFailure = await core.handleContactRequest(request(), baseEnv, {
    fetchImpl: async () => new Response("denied", { status: 403 }),
    logger: silentLogger,
  });
  check("Resend API failure is handled safely", apiFailure.status === 502);

  const malformedProvider = await core.handleContactRequest(request(), baseEnv, {
    fetchImpl: async () => new Response(JSON.stringify({ unexpected: true }), { status: 200 }),
    logger: silentLogger,
  });
  check("malformed provider response is rejected", malformedProvider.status === 502);

  const timeoutEnv = { ...baseEnv, CONTACT_PROVIDER_TIMEOUT_MS: "5" };
  const timeout = await core.handleContactRequest(request(), timeoutEnv, {
    fetchImpl: async (_url, options) =>
      new Promise((_resolve, reject) => {
        options.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
      }),
    logger: silentLogger,
  });
  check("provider timeout is handled safely", timeout.status === 502);
  check("secret values never appear in error responses", !(await timeout.text()).includes(baseEnv.RESEND_API_KEY));

  const turnstileEnv = {
    ...baseEnv,
    TURNSTILE_REQUIRED: "true",
    TURNSTILE_SECRET_KEY: "test_turnstile_secret",
  };
  const turnstileCalls = [];
  const turnstileFetch = async (url, options) => {
    turnstileCalls.push({ url, options });
    if (url === core.TURNSTILE_ENDPOINT) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    return new Response(JSON.stringify({ id: "email_after_turnstile" }), { status: 200 });
  };
  const turnstileValid = await core.handleContactRequest(
    request({ ...validPayload, turnstile_token: "valid_test_token" }),
    turnstileEnv,
    { fetchImpl: turnstileFetch, logger: silentLogger }
  );
  check("valid Turnstile token is accepted", turnstileValid.status === 200 && turnstileCalls.length === 2);

  const missingTurnstile = await core.handleContactRequest(request(), turnstileEnv, {
    fetchImpl: turnstileFetch,
    logger: silentLogger,
  });
  check("missing required Turnstile token is rejected", missingTurnstile.status === 403);

  const invalidTurnstile = await core.handleContactRequest(
    request({ ...validPayload, turnstile_token: "invalid" }),
    turnstileEnv,
    {
      fetchImpl: async () => new Response(JSON.stringify({ success: false }), { status: 200 }),
      logger: silentLogger,
    }
  );
  check("invalid Turnstile token is rejected", invalidTurnstile.status === 403);

  const turnstileFailure = await core.handleContactRequest(
    request({ ...validPayload, turnstile_token: "provider_error" }),
    turnstileEnv,
    { fetchImpl: async () => { throw new Error("network"); }, logger: silentLogger }
  );
  check("Turnstile provider failure fails closed", turnstileFailure.status === 403);

  const turnstileMisconfigured = await core.handleContactRequest(
    request({ ...validPayload, turnstile_token: "token" }),
    { ...baseEnv, TURNSTILE_REQUIRED: "true" },
    { fetchImpl: resendSuccess([]), logger: silentLogger }
  );
  check("required Turnstile without secret fails closed", turnstileMisconfigured.status === 503);

  const limiterAllowed = await core.handleContactRequest(request(), {
    ...baseEnv,
    CONTACT_RATE_LIMIT_REQUIRED: "true",
    CONTACT_RATE_LIMITER: { async limit() { return { success: true }; } },
  }, { fetchImpl: resendSuccess([]), logger: silentLogger });
  check("rate limiter allows approved request", limiterAllowed.status === 200);

  const limiterRejected = await core.handleContactRequest(request(), {
    ...baseEnv,
    CONTACT_RATE_LIMIT_REQUIRED: "true",
    CONTACT_RATE_LIMITER: { async limit() { return { success: false }; } },
  }, { fetchImpl: resendSuccess([]), logger: silentLogger });
  check("rate limiter rejects limited request", limiterRejected.status === 429);

  const limiterMissing = await core.handleContactRequest(request(), {
    ...baseEnv,
    CONTACT_RATE_LIMIT_REQUIRED: "true",
  }, { fetchImpl: resendSuccess([]), logger: silentLogger });
  check("required missing rate limiter fails closed", limiterMissing.status === 503);

  const cloudflare = await import("./functions/api/contact.js");
  const realFetch = global.fetch;
  global.fetch = resendSuccess([]);
  const adapterResponse = await cloudflare.onRequest({ request: request(), env: baseEnv });
  global.fetch = realFetch;
  check("Cloudflare adapter translates request and environment", adapterResponse.status === 200);

  const contactPage = require("./src/pages/contact");
  const frontendSource = fs.readFileSync("src/js/main.js", "utf8");
  check("frontend posts to /api/contact", frontendSource.includes('fetch("/api/contact"'));
  check("frontend sends JSON", frontendSource.includes('"Content-Type": "application/json"'));
  check("replacement form has no Netlify Forms attributes", !/data-netlify|netlify-honeypot|form-name/.test(contactPage.content));
  check("loading state remains implemented", frontendSource.includes('submitBtn.textContent = "Sending'));
  check("success and error states remain implemented", frontendSource.includes("contact_form_complete") && frontendSource.includes("Something went wrong sending your request"));

  console.log(`\n${passed} passed, ${failed} failed.`);
  process.exit(failed > 0 ? 1 : 0);
}

run();
