# Cloudflare Migration Runbook

This document describes the prepared target architecture. It does not record a
deployment, DNS change, production secret, or production email test.

## Target architecture

`POST /api/contact` is handled by `functions/api/contact.js`, a thin Cloudflare
Pages Function adapter. It passes the request and environment bindings to
`shared/contact-core.mjs`. The shared core owns validation, origin checks,
payload limits, abuse-control hooks, optional Turnstile verification, Resend
email composition, provider timeouts, and safe responses.

The retained `functions/contact.js` file is a legacy Netlify rollback adapter
using the same core. It can be removed only after Cloudflare cutover, contact
delivery verification, monitoring, and the agreed rollback window.

## Request contract

- Method: `POST`
- Path: `/api/contact`
- Content type: `application/json`
- Maximum body: 16 KiB by default
- Required fields: `name`, `business_name`, `email`, `interest`,
  `preferred_date`, `preferred_time`, `timezone`
- Optional fields: `phone`, `message`, `company_website_url`,
  `turnstile_token`
- Unknown fields are ignored and never influence recipient or sender settings.
- The honeypot field `company_website_url` must remain empty.

Allowed `interest` values are maintained in the shared core and mirror the
contact-page select control. The server validates all lengths, email, date,
time, content type, method, body size, and origin independently of the browser.

## Environment contract

Server-only production values:

- `RESEND_API_KEY` — required
- `CONTACT_TO_EMAIL` — required; set to `hello@2sbusinesssupport.com`
- `CONTACT_FROM_EMAIL` — required; must be a verified Resend sender
- `TURNSTILE_SECRET_KEY` — required when `TURNSTILE_REQUIRED=true`

Endpoint controls:

- `CONTACT_ALLOWED_ORIGINS` — comma-separated exact origins
- `CONTACT_MAX_BODY_BYTES` — optional; defaults to 16384
- `CONTACT_PROVIDER_TIMEOUT_MS` — optional; defaults to 8000
- `CONTACT_RATE_LIMIT_REQUIRED` — set `true` in production
- `TURNSTILE_REQUIRED` — set `true` in production after widget setup

Public build-time value:

- `TURNSTILE_SITE_KEY` — renders the Turnstile widget on the contact page

## Cloudflare configuration still required

1. Create a Pages project with build command `npm run build` and output `dist`.
2. Add all server-only values as encrypted secrets or protected variables.
   Include the active preview origin in `CONTACT_ALLOWED_ORIGINS` while testing,
   then restrict the production value to approved canonical origins.
3. Add a Cloudflare Rate Limiting binding named `CONTACT_RATE_LIMITER`.
4. Configure a conservative contact-form rule, then set
   `CONTACT_RATE_LIMIT_REQUIRED=true`.
5. Configure Turnstile for the production hostname and set both keys.
6. Build with `TURNSTILE_SITE_KEY` available.
7. Confirm `dist/_headers` is applied and rendered pages work under CSP.
8. Test the preview deployment before any domain or DNS change.

If the rate-limit binding or required Turnstile secret is missing while its
corresponding `*_REQUIRED` flag is true, the endpoint fails closed with a safe
503 response.

## Resend configuration still required

1. Verify a 2S-owned sending domain in Resend.
2. Select a verified `CONTACT_FROM_EMAIL`; do not invent or assume one.
3. Store the API key only in Cloudflare server-side secrets.
4. Set the fixed recipient to `hello@2sbusinesssupport.com`.
5. Perform a controlled preview email test during the deployment milestone.

The user-supplied email is used only as validated Reply-To. Browser input never
controls the recipient or sender.

## Security headers

The Cloudflare Pages `_headers` source is `src/static/_headers`. It includes
CSP, HSTS, clickjacking protection, MIME sniffing protection, referrer policy,
and a restrictive permissions policy. CSP explicitly allows Google Fonts and
Cloudflare Turnstile. It still requires rendered desktop/mobile verification
before production cutover.

## Rollback

Keep the current Netlify deployment and DNS untouched until the Cloudflare
preview passes build, contact, accessibility, responsive, security-header, and
delivery QA. If cutover later fails, restore DNS to the known Netlify target and
investigate in preview. Remove the legacy adapter only after the rollback window.
