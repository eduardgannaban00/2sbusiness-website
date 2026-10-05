/**
 * Legacy Netlify adapter retained for rollback/reference during migration.
 * New browser source posts to /api/contact and the target adapter is the
 * Cloudflare Pages Function in functions/api/contact.js.
 */
exports.handler = async function handler(event) {
  const { handleContactRequest } = await import("../shared/contact-core.mjs");
  const headers = new Headers(event.headers || {});
  const origin = headers.get("origin") || process.env.CONTACT_ALLOWED_ORIGINS || "https://2sbusinesssupport.com";
  if (!headers.has("origin")) headers.set("origin", origin.split(",")[0].trim());
  const request = new Request("https://2sbusinesssupport.com/api/contact", {
    method: event.httpMethod || "GET",
    headers,
    body: String(event.httpMethod || "GET").toUpperCase() === "POST" ? event.body || "" : undefined,
  });
  const response = await handleContactRequest(request, process.env, {
    ip:
      headers.get("x-nf-client-connection-ip") ||
      headers.get("client-ip") ||
      "unknown",
  });
  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    body: await response.text(),
  };
};
