# 2S Website Implementation Status

## Inherited baseline

- Source path: `C:\Projects\2S Website`
- Baseline commit: `7cb435b` (`chore: snapshot inherited Claude checkpoint`)
- The inherited design, routes, content, ROI calculator, resources,
  navigation, accessibility foundations, Dental demo, HR demo, and dormant
  Resend code were preserved.

## Milestone 1

Milestone 1 repairs cover Git version control, reproducible dependency
installation, cross-platform build behavior, generated-output policy, and
Windows/POSIX link verification.

Generated `dist/` output is intentionally not source-controlled. It is rebuilt
from `src/` by `npm run build` and is the deployment artifact for later hosting
milestones. Source assets remain in `src/assets/`.

## Milestone 2

Milestone 2 adds the centralized public demo registry and a new `/demos/`
portfolio experience. The registry contains 12 records: 11 verified technical
URLs and Client Onboarding with an explicitly unavailable URL. Future branded
subdomain targets are stored centrally but are not used for public links.

The homepage, navigation, About page, Dental resource links, and assistant now
consume the registry rather than duplicating Dental/HR demo URLs. The Business
OS is presented as the flagship example, while the portfolio explains that
modules can be combined selectively into a customized operating system.

Pricing now distinguishes packaged demo examples (Starter, Growth, Premium)
from the existing custom Build, Automate, and Support & Scale categories.

Validation completed:

- `npm test`: PASS — 24 contact checks, 37 ROI checks, verifier regression,
  and demo registry regression checks
- `npm run build`: PASS — 27 routes generated
- `npm run verify`: PASS — 0 errors, 0 warnings, 27 sitemap URLs
- Secrets scan: PASS
- UTF-8/mojibake scan: PASS
- `npm audit`: 5 high vulnerabilities remain in the existing Tailwind 3
  dependency tree; a major upgrade is intentionally deferred
- Browser QA: pending; no browser automation was available

## Milestone 3

Milestone 3 replaces the source-level Netlify Forms dependency with a portable
JSON `POST /api/contact` architecture. The browser now sends only the expected
contact fields to the API. Generated contact HTML contains no `data-netlify`,
`netlify-honeypot`, or hidden `form-name` markers.

The portable core in `shared/contact-core.mjs` owns:

- method, content-type, origin, payload-size, schema, length, enumeration,
  email, calendar-date, and time validation
- honeypot absorption and unknown-field exclusion
- plain-text normalization and HTML-email escaping
- fixed environment-controlled recipient and sender
- validated Reply-To behavior and header-injection protection
- Resend timeout, failure, and malformed-response handling
- optional server-side Turnstile verification
- a Cloudflare rate-limiter binding seam that fails closed when required
- safe JSON errors without stack traces, secrets, or submitted personal data

`functions/api/contact.js` is the thin Cloudflare Pages adapter. The retained
`functions/contact.js` is a clearly labeled legacy Netlify rollback adapter
using the same core. It can be removed after Cloudflare cutover, delivery
verification, monitoring, and the rollback window.

Configuration is documented in `.env.example` and `CLOUDFLARE-MIGRATION.md`.
Production requires Resend secrets, exact allowed origins, a verified sender,
Turnstile keys, and a `CONTACT_RATE_LIMITER` Cloudflare binding. No real values
were configured in this milestone.

Cloudflare response headers are generated from `src/static/_headers`, including
CSP, HSTS, frame protection, MIME sniffing protection, referrer policy, and a
restrictive permissions policy. CSP allows the existing Google Fonts and the
prepared Turnstile integration; rendered verification remains pending.

Milestone 3 validation:

- `npm ci`: PASS
- Contact/security/frontend/adapter checks: 44 passed
- ROI checks: 37 passed
- Demo registry and verifier regression suites: PASS
- `npm run build`: PASS — 27 routes
- `npm run verify`: PASS — 0 errors, 0 warnings, 0 dead links
- Generated replacement contact HTML has no Netlify Forms markers
- Secrets and UTF-8 scans: PASS
- Generated source maps: none
- `npm audit`: 5 known high findings in the Tailwind 3 development dependency
  tree; the required major upgrade remains deferred
- Browser QA: pending; browser automation was unavailable

Repair commit: recorded after final validation. The build now succeeds after
`npm ci`, generates all 26 routes, and copies browser assets through Node-based
file operations. The verifier now normalizes both Windows and POSIX paths.

Validation completed:

- `npm ci`: PASS
- `npm test`: PASS — 24 contact checks, 37 ROI checks, 1 verifier regression check
- `npm run build`: PASS — 26 routes generated
- `npm run verify`: PASS — 0 errors, 0 warnings, 26 sitemap URLs
- UTF-8/mojibake scan: PASS for source/config files
- Credential-signature scan: PASS
- Generated source maps: none
- `npm audit`: 5 high vulnerabilities remain in the existing Tailwind 3 dependency tree; fixing them requires a major Tailwind upgrade and is deferred.
- Browser smoke: not run; no browser automation was available in this local-only milestone.

## Milestone 4

Milestone 4 prepares a local release candidate without deploying, changing
DNS, configuring production services, or sending email. The generated site now
has a 27-route release quality gate covering unique metadata and canonicals,
Open Graph and Twitter metadata, one H1 per page, valid JSON-LD, internal-link
integrity, non-orphan routes, unique IDs, form label targets, safe external
links, sitemap parity, demo registry safety, pricing assets, contact-form
portability, secret signatures, source-map exclusion, and required artifacts.

SEO, answer-engine, and AI-discovery work includes direct homepage answers for
what 2S does, what a Business OS is, compatibility with existing tools, human
oversight, consultation flow, and industry scope. `llms.txt` provides a concise,
accurate index of canonical pages, services, demos, contact information, and
non-fabrication guidance. It contains no private implementation details.

Static accessibility and responsive improvements include unique FAQ control
relationships, tab roving focus, mobile-menu focus containment and state
labels, larger icon targets, assistant visibility state, and stacked contact
form fields on narrow screens. Non-home routes no longer request the
homepage-only ROI formulas. The build copies all reviewed root static files and
no longer prints obsolete manual build steps.

Local preview is dependency-free: run `npm.cmd run preview` after the build and
open `http://localhost:4173/`. Rendered browser and screenshot QA remains
`PENDING HUMAN QA` because browser automation is unavailable in this workspace.
The exact viewport, screenshot, keyboard, interaction, and responsive checklist
is recorded in `LOCAL-RELEASE-QA.md`.

The npm audit still reports five high-severity findings through the Tailwind
3 development/build dependency chain (`tailwindcss` -> `chokidar` / `fast-glob`
/ `micromatch` -> `braces`). These packages are not shipped to browsers; only
the generated CSS is shipped. npm's supported remediation is Tailwind 4, a
breaking major upgrade, so it is deferred rather than introduced into the
release candidate.

Milestone 4 validation:

- `npm ci`: PASS
- `npm test`: PASS — 44 contact/security checks, 37 ROI checks, existing
  regression suites, generated release-quality checks, and route verifier
- `npm run build`: PASS — 27 routes and required release artifacts generated
- `npm run verify`: PASS — 0 errors, 0 warnings, 27 sitemap URLs
- Local preview smoke: PASS — key pages, `llms.txt`, sitemap, CSS, and JS returned 200
- External demo availability: PASS — all 11 registry URLs returned HTTP 200
- Stale-copy, Netlify-marker, secret-signature, source-map, and diff checks: PASS
- Rendered browser screenshots and interaction QA: PENDING HUMAN QA

## Milestone 4.1 visual QA repair

Human review identified two bounded issues: scrolling content was readable
through the sticky header, and the custom Business OS cards exposed numeric
prices despite variable scope. The shared header now keeps an opaque charcoal
background while preserving sticky behavior and mobile menu behavior.

The three packaged demo examples remain unchanged: Starter ($499 setup,
$199/month), Growth ($799 setup, $299/month), and Premium ($1,299 setup,
$499/month). Custom Build, Automate, and Support & Scale offerings now use
Custom Quote labels with scope-based descriptions. The pricing config, pricing
page, chatbot, dental pricing article, ROI defaults, generated HTML, and tests
no longer treat the retired custom prices as public rates.

Validation: `npm test` PASS, 27 routes built, verifier PASS with 0 errors and 0
warnings, dead-link and release-quality checks PASS, contact architecture and
demo registry intact. Rendered recheck remains required after this repair.

## Milestone 4.1 final visual system

The old logo-centered orbit graphic and its dedicated sphere asset were
removed. The homepage now uses a decorative concept #3 connected-system sphere
with no logo inside it: slow 36-second rotation, sparse emerald/gold travelling
traces, and staggered breathing nodes. The reusable atmospheric system lives
in `src/partials/atmosphere.js` and `src/css/input.css`, with page variants for
Home, diagonal-flow Demos, wave-oriented Services, geometric Industries, calm
Pricing vignette, About dual tone, Resources grid texture, calmer Articles,
Contact dot mesh, and selective CTA aurora glow.

Atmospheric layers are decorative and `aria-hidden`, use lightweight CSS/SVG,
have reduced-motion stop states, and simplify their paths, nodes, traces, glow,
and sphere size on mobile. The sticky header remains in place with an opaque
charcoal background. No content architecture, routes, contact backend, demo
registry, canonical URLs, or production configuration changed.

Validation: `npm ci` completed; `npm test` PASS including visual-system
regressions; build PASS with 27 routes; verifier PASS with 0 errors and 0
warnings; local preview representative routes returned HTTP 200; UTF-8,
secrets, and source-map scans PASS. npm audit still reports the documented five
high Tailwind 3 build-chain findings. Rendered human recheck is pending.

## Milestone 4.2 visual intensity refinement

The attached `Futuristic Dark UI Concept Board.png` was inspected and used as
the visual source of truth for this refinement. Existing content, routes,
functionality, navigation, SEO/AEO/GEO, contact architecture, demo registry,
and Milestone 4.1 custom pricing were preserved.

The concept #3 sphere is now materially more dimensional: it has a visible
deep-emerald body gradient, asymmetric gold and emerald rim lighting, a halo,
foreground/rear grid hierarchy, thicker primary paths, and two visible
green/gold signal systems with luminous trail/core layering. Selected nodes
have staggered breathing and arrival halos. The old logo-centered orbit and
its asset remain removed; no logo is inside the new sphere.

The shared atmospheric system now has stronger line hierarchy, glow, and
section depth. Page treatments are mapped through the reusable system:
diagonal Demos, wave Services, geometric Industries, calm vignette Pricing,
grid Resources, dual-tone About, dot-mesh Contact, calmer Articles, and
selective aurora CTA sections. Reduced-motion rules stop all animated signals,
rotation, breathing, arrival pulses, and aurora movement while retaining the
upgraded static design. Mobile removes secondary paths and traces, lowers
coverage, and keeps a visible smaller sphere.

Validation: `npm ci` completed; full tests, build, visual regression checks,
verifier, local preview smoke, UTF-8 scan, secrets scan, and source-map scan
passed. All 27 routes returned through the build; verifier reported 0 errors
and 0 warnings. Human comparison against the rendered site and board remains
pending. No deployment or production change was made.

## Remaining work

- P0: configure and preview-test Cloudflare, Resend, Turnstile, and the native
  rate-limiter binding before production cutover.
- P1: complete the documented rendered browser and screenshot QA checklist.
- P1: verify every external technical demo endpoint immediately before launch.
- P1: verify CSP and contact success/failure states in the rendered preview.
- P2: define production performance monitoring and budgets after hosting is available.
- P3: optional additional content, industry, and interaction polish.

## Next milestone

Cloudflare preview deployment, controlled email delivery testing, final browser
QA, DNS changes, and production cutover remain explicitly out of scope for this
local release-candidate milestone.
