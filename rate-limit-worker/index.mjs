const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

export class ContactRateLimiter {
  constructor(state) {
    this.state = state;
  }

  async fetch(request) {
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ allowed: false }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return new Response(JSON.stringify({ allowed: false }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!payload || typeof payload.key !== "string" || !payload.key) {
      return new Response(JSON.stringify({ allowed: false }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const now = Date.now();
    let windowState = await this.state.storage.get("window");
    if (!windowState || now >= windowState.resetAt) {
      windowState = { count: 0, resetAt: now + WINDOW_MS };
    }

    windowState.count += 1;
    await this.state.storage.put("window", windowState);

    return new Response(JSON.stringify({
      allowed: windowState.count <= MAX_REQUESTS,
      remaining: Math.max(0, MAX_REQUESTS - windowState.count),
      resetAt: windowState.resetAt,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }
}

export default {
  fetch() {
    return new Response("Contact rate limiter Worker", { status: 200 });
  },
  ContactRateLimiter,
};
