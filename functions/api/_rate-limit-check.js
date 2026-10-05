const DIAGNOSTIC_KEY = "2s-rate-limit-diagnostic";

function diagnosticResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function onRequestGet(context) {
  const namespace = context.env && context.env.CONTACT_RATE_LIMITER_DO;
  if (!namespace || typeof namespace.idFromName !== "function" || typeof namespace.get !== "function") {
    return diagnosticResponse(503, { ok: false });
  }

  try {
    const id = namespace.idFromName(DIAGNOSTIC_KEY);
    const stub = namespace.get(id);
    if (!stub || typeof stub.fetch !== "function") return diagnosticResponse(502, { ok: false });

    const response = await stub.fetch("https://contact-rate-limit.internal/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: DIAGNOSTIC_KEY }),
    });
    if (!response.ok) return diagnosticResponse(502, { ok: false });

    const result = await response.json();
    if (!result || typeof result.allowed !== "boolean") return diagnosticResponse(502, { ok: false });
    return diagnosticResponse(200, { ok: true, allowed: result.allowed });
  } catch {
    return diagnosticResponse(502, { ok: false });
  }
}

export async function onRequest(context) {
  if (String(context.request.method || "GET").toUpperCase() !== "GET") {
    return diagnosticResponse(405, { ok: false });
  }
  return onRequestGet(context);
}
