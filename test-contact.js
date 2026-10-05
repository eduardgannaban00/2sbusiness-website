// Local verification only. Does NOT send a real email or hit any real network
// endpoint. The "unconfigured" test relies on RESEND_API_KEY being genuinely
// unset to confirm fail-closed behavior; later tests temporarily set fake
// env vars and replace global.fetch with a mock to inspect the exact Resend
// request shape, then restore both before this script exits.
const { handleContact, validate, sanitize } = require("./functions/contact");

async function run() {
  let pass = 0;
  let fail = 0;
  function check(label, cond) {
    if (cond) {
      console.log(`PASS  ${label}`);
      pass++;
    } else {
      console.log(`FAIL  ${label}`);
      fail++;
    }
  }

  // Sanitize
  check(
    "sanitize strips angle brackets",
    sanitize("<script>alert(1)</script>hello") === "scriptalert(1)/scripthello"
  );
  check("sanitize trims", sanitize("  hi  ") === "hi");
  check("sanitize enforces max length", sanitize("a".repeat(3000)).length === 2000);

  // Validate — new short field set (no website/industry/time_sink, no ROI)
  const validPayload = {
    name: "Jane Roofer",
    business_name: "Jane's Roofing",
    email: "jane@example-business.com",
    phone: "555-123-4567",
    interest: "Lead Follow-Up",
    preferred_date: "2026-09-15",
    preferred_time: "14:30",
    timezone: "America/Denver",
    message: "Looking to automate follow-up for missed calls.",
  };
  check("validate accepts a complete valid payload", validate(validPayload).valid === true);
  check(
    "validate rejects missing required field",
    validate({ ...validPayload, name: "" }).valid === false
  );
  check(
    "validate rejects malformed email",
    validate({ ...validPayload, email: "not-an-email" }).valid === false
  );
  check(
    "validate rejects malformed preferred_date",
    validate({ ...validPayload, preferred_date: "15/09/2026" }).valid === false
  );
  check(
    "validate rejects malformed preferred_time",
    validate({ ...validPayload, preferred_time: "2:30pm" }).valid === false
  );
  check(
    "validate accepts payload without optional phone/message",
    validate({
      name: validPayload.name,
      business_name: validPayload.business_name,
      email: validPayload.email,
      interest: validPayload.interest,
      preferred_date: validPayload.preferred_date,
      preferred_time: validPayload.preferred_time,
      timezone: validPayload.timezone,
    }).valid === true
  );
  check(
    "validate flags honeypot as spam",
    validate({ ...validPayload, company_website_url: "http://spam.example" }).spam === true
  );

  // handleContact — honeypot short-circuit (should report ok:true without sending email)
  const honeypotResult = await handleContact(
    { ...validPayload, company_website_url: "http://spam.example" },
    "203.0.113.1"
  );
  check(
    "handleContact returns 200/ok for honeypot without sending email",
    honeypotResult.statusCode === 200 && honeypotResult.body.ok === true
  );

  // handleContact — invalid payload
  const invalidResult = await handleContact({ ...validPayload, email: "bad" }, "203.0.113.2");
  check(
    "handleContact returns 400 for invalid email",
    invalidResult.statusCode === 400 && invalidResult.body.ok === false
  );

  // handleContact — valid payload, but no env vars configured in this environment,
  // so the Resend call is EXPECTED to fail (no real network reachability needed —
  // it fails on the missing-credential check before fetch is ever called). This
  // confirms the form does not silently pretend success when it can't actually
  // deliver the message.
  const unconfiguredResult = await handleContact(validPayload, "203.0.113.3");
  check(
    "handleContact fails loudly (502) when RESEND_API_KEY/CONTACT_TO_EMAIL/CONTACT_FROM_EMAIL are unset — does not fake success",
    unconfiguredResult.statusCode === 502 && unconfiguredResult.body.ok === false
  );

  // handleContact — rate limiting (6th request from same IP within window should be limited)
  const ip = "203.0.113.4";
  let limited = false;
  for (let i = 0; i < 6; i++) {
    const r = await handleContact(validPayload, ip);
    if (r.statusCode === 429) limited = true;
  }
  check("handleContact rate-limits after 5 requests from the same IP", limited === true);

  // ---------------------------------------------------------------------
  // Resend request shape — verified against a MOCKED fetch. No real network
  // call is made and no real email is sent; we only inspect what would have
  // been sent, then restore the original fetch afterward.
  // ---------------------------------------------------------------------
  const realFetch = global.fetch;
  const originalEnv = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  };
  process.env.RESEND_API_KEY = "test_fake_key_not_real";
  process.env.CONTACT_TO_EMAIL = "hello@2sbusinesssupport.com";
  process.env.CONTACT_FROM_EMAIL = "consultations@2sbusinesssupport.com";

  let capturedUrl, capturedOptions;
  global.fetch = async (url, options) => {
    capturedUrl = url;
    capturedOptions = options;
    return { ok: true, status: 200 };
  };

  const mockedSuccessResult = await handleContact(validPayload, "203.0.113.5");
  const sentBody = JSON.parse(capturedOptions.body);

  check(
    "Resend call hits the correct endpoint",
    capturedUrl === "https://api.resend.com/emails" && capturedOptions.method === "POST"
  );
  check(
    "Resend call uses Bearer auth with RESEND_API_KEY and JSON content type",
    capturedOptions.headers.Authorization === "Bearer test_fake_key_not_real" &&
      capturedOptions.headers["Content-Type"] === "application/json"
  );
  check(
    "Resend payload: from = CONTACT_FROM_EMAIL, to = [CONTACT_TO_EMAIL]",
    sentBody.from === "consultations@2sbusinesssupport.com" &&
      Array.isArray(sentBody.to) &&
      sentBody.to[0] === "hello@2sbusinesssupport.com"
  );
  check(
    "Resend payload: reply_to is the submitter's own email",
    Array.isArray(sentBody.reply_to) && sentBody.reply_to[0] === validPayload.email
  );
  check(
    "Resend payload: subject references the business name",
    sentBody.subject.includes(validPayload.business_name)
  );
  check(
    "Resend payload: message body includes name, interest, preferred date/time, and timezone",
    sentBody.text.includes(validPayload.name) &&
      sentBody.text.includes(validPayload.interest) &&
      sentBody.text.includes(validPayload.preferred_date) &&
      sentBody.text.includes(validPayload.preferred_time) &&
      sentBody.text.includes(validPayload.timezone)
  );
  check(
    "Resend payload: no ROI/automation-estimate content is ever included",
    !sentBody.text.includes("Automation estimate") && !sentBody.text.includes("automatable")
  );
  check(
    "handleContact returns 200/ok when Resend accepts the request (mocked)",
    mockedSuccessResult.statusCode === 200 && mockedSuccessResult.body.ok === true
  );

  // Optional fields omitted entirely — email body should say so plainly, not crash.
  let capturedMinimalBody;
  global.fetch = async (url, options) => {
    capturedMinimalBody = JSON.parse(options.body);
    return { ok: true, status: 200 };
  };
  const { phone, message, ...minimalPayload } = validPayload;
  await handleContact(minimalPayload, "203.0.113.7");
  check(
    "Submission without optional phone/message still succeeds and notes them as not provided",
    capturedMinimalBody.text.includes("Phone: (not provided)") &&
      capturedMinimalBody.text.includes("Message: (not provided)")
  );

  // Rejected credential from Resend (e.g. bad key / unverified domain) must
  // fail closed — never a fake success.
  global.fetch = async () => ({ ok: false, status: 403 });
  const rejectedResult = await handleContact(validPayload, "203.0.113.6");
  check(
    "handleContact fails closed (502) when Resend rejects the request",
    rejectedResult.statusCode === 502 && rejectedResult.body.ok === false
  );

  // Restore real fetch and original env so nothing leaks past this test run.
  global.fetch = realFetch;
  Object.keys(originalEnv).forEach((key) => {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  });

  console.log(`\n${pass} passed, ${fail} failed.`);
  process.exit(fail > 0 ? 1 : 0);
}

run();
