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

## Remaining work

- P0: migrate the contact form away from Netlify Forms in a later milestone.
- P1: complete rendered browser QA and verify every technical demo endpoint.
- P1: select and implement the target hosting architecture.
- P2: complete AEO/GEO, security hardening, and performance budgets.
- P3: optional content, industry, and interaction polish.

## Next milestone

Hosting/contact migration and final rendered QA remain explicitly out of scope
for Milestone 2.
