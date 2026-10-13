# SEO-3B Release Manifest

Project: 2S Business Support Service
Repository: `C:\Projects\2S Website`
Release status: Local release candidate; not deployed
Prepared: 2026-10-13 (Asia/Singapore)

## Included files

- `build.js` — meaningful sitemap `lastmod` support and generated top-level `404.html`.
- `src/partials/layout.js` — safe metadata/JSON-LD attribute handling and configurable robots/canonical output for 404 pages.
- `src/pages/article-dental-comparison.js` — direct answer for AI receptionist versus human receptionist intent.
- `src/pages/article-hvac-receptionist.js` — direct answer and operational limitations.
- `src/pages/industries-dental.js` — meaningful sitemap update date.
- `src/pages/roofing-lead-follow-up.js` — direct workflow and human-handoff explanation.
- `src/static/llms.txt` — accurate service/entity/remote-delivery guidance.
- `scripts/indexnow.js` — manual, canonical-only, key-gated notifier; never called by the build.
- `test-quality.js` — regression coverage for the generated non-indexable 404 page.
- `SEO-SEARCH-VISIBILITY-REPORT.md` — 25-milestone SEO/AEO/GEO report and production blockers.
- `SEARCH-TRACKER.csv` — supplied baseline tracker template; no new performance results invented.
- `RELEASE-MANIFEST.md` — this release inventory and deployment checklist.

## Explicitly excluded

- `dist/` — generated deployment output; rebuilt by `npm.cmd run build` and ignored by Git.
- `node_modules/` — installed dependencies; ignored by Git.
- `.env` and real credentials — excluded by `.gitignore`; only `.env.example` placeholders remain.
- Cloudflare DNS, redirect rules, Pages settings, secrets, bindings, and IndexNow verification files.
- Independently deployed demo repositories and live demo changes.
- STARK/Bella and all unrelated systems.
- Netlify rollback configuration changes.

## Cloudflare preview requirements

Use Cloudflare Pages Git integration with the GitHub repository, production branch `main`, repository root, build command `npm run build`, output directory `dist`, and Node.js 20. Git integration is required because the project contains the root `/functions` Pages Function directory.

Configure before preview testing:

- `RESEND_API_KEY` as a server-only secret.
- Fixed `CONTACT_TO_EMAIL=hello@2sbusinesssupport.com`.
- Verified `CONTACT_FROM_EMAIL`.
- Exact `CONTACT_ALLOWED_ORIGINS` for preview and production.
- Turnstile site and secret keys.
- `CONTACT_RATE_LIMITER_DO` Pages binding to the deployed `ContactRateLimiter` Worker.
- `CONTACT_RATE_LIMIT_REQUIRED=true` only after the binding is verified.

## Smoke-test checklist

- `npm.cmd test` passes.
- Preview homepage, contact, booking, demos, resources, sitemap, and robots return 200.
- Preview nonexistent route returns 404 and shows the generated 404 page.
- Canonical tags point to `https://2sbusinesssupport.com`.
- All 12 demo records and public links remain present.
- Booking page retains the approved Google Calendar URL.
- Contact form posts to `/api/contact` and rejects invalid origin, oversized, malformed, and honeypot payloads safely.
- Turnstile, Resend delivery, rate limiting, CSP, and response headers are verified in preview.
- Cloudflare `www` redirect is configured separately as a 301 to the bare HTTPS hostname.
- No IndexNow notification is sent unless separately authorized.

## Rollback

Keep the current deployment and DNS unchanged until preview and controlled contact delivery pass. If a promoted deployment fails, use the Cloudflare Pages rollback to the previous deployment or restore DNS to the known Netlify target. Keep the legacy Netlify adapter through the agreed rollback window.
