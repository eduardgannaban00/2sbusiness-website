# 2S Search Visibility Optimization — Local Completion Report

Date: 2026-10-13 (Asia/Singapore)

Scope: `C:\Projects\2S Website` only. No deployment, DNS change, Cloudflare setting change, production booking change, or IndexNow notification was sent.

## Outcome

The local release candidate now has 30 canonical content routes, a generated static 404 page, valid sitemap/robots artifacts, focused direct-answer content for the supplied search intents, consistent AI-readable service language, and an opt-in IndexNow notifier. Existing demos, booking integration, contact security controls, navigation, and visual system were preserved.

## Milestones

1. Repository audit — complete. Static Node/Tailwind build; `main` at `f4a9911`; clean baseline before this work.
2. Crawl/index audit — complete locally. Unknown routes now build to `404.html`; local unknown route returned HTTP 404. Production still has a soft-404 blocker (see below).
3. Canonical/redirect audit — complete. Repository canonical is `https://2sbusinesssupport.com`; Netlify rollback config has the www redirect. Cloudflare hostname redirect remains owner approval work.
4. Sitemap/indexing readiness — complete locally. Sitemap contains 30 canonical URLs; `lastmod` is present only on four pages changed in this pass.
5. Performance/accessibility review — complete at source/test level. Existing lightweight static build, dimensions/alt checks, reduced-motion CSS, and accessibility regressions remain green. Rendered Lighthouse/field CWV data was unavailable.
6. Intent mapping — complete; mapping below.
7. Dental commercial page — complete; dental service page retains workflow, limitations, demo, and consultation paths.
8. Front-desk comparison — complete; direct answer and balanced comparison preserved/strengthened.
9. Roofing — complete; direct workflow boundary and human handoff language added.
10. HVAC/service pages — complete; HVAC article now leads with an accurate answer and limitations.
11. AEO direct answers — complete on priority pages; no mass FAQ generation.
12. Structured data — audited; existing Organization, WebSite, Service, Article, BreadcrumbList, and visible FAQ schemas remain valid and non-duplicated.
13. Factual consistency — complete; demos remain explicitly illustrative and human boundaries are stated.
14. Helpful content — complete for priority pages; no fabricated statistics, credentials, clients, or outcomes.
15. Machine readability — complete at source/test level; one H1, semantic headings, link checks, alt/dimension checks, and crawlable HTML remain enforced.
16. Entity clarity — complete; business name, remote delivery, offerings, contact, and canonical URL are consistent.
17. AI-readable explanations — complete; `llms.txt` now includes receptionist, booking/reminders, GoHighLevel/CRM, websites/funnels, and support services.
18. Demonstrable expertise — complete; all 12 demos remain registry-controlled and disclosed as illustrative.
19. Citation readiness — complete locally; About/contact/resources/internal links and non-fabrication guidance are present. `llms.txt` is retained as a useful index, not a ranking guarantee.
20. Responsible crawler access — complete; robots allows public pages and does not expose private endpoints.
21. Bing diagnosis — complete as far as available. Sitemap is healthy; production indexing reasons require Bing Webmaster inspection access.
22. IndexNow — complete locally. `scripts/indexnow.js` is manual, canonical-only, key-gated, and was not executed.
23. Conversion path — audited; priority pages link to demos and `/contact/`, while `/book/` retains the approved Google Calendar URL.
24. Regression validation — complete. Results below.
25. Reporting/tracking — complete. See mapping, tracker template, and approval actions below.

## Priority query mapping

| Query / intent | Preferred page |
|---|---|
| AI front desk vs traditional reception | `/resources/dental/ai-receptionist-vs-traditional-receptionist-dentists/` |
| AI receptionist for dentists | `/industries/dental/` |
| Dental practice missed calls | `/industries/dental/` |
| Roofing lead follow-up automation | `/roofing-lead-follow-up-automation/` |
| Follow-up automation for roofers | `/roofing-lead-follow-up-automation/` |
| HVAC AI receptionist | `/industries/hvac/` and `/resources/hvac/ai-receptionist-for-hvac-companies-how-it-works/` |
| Small-business workflow automation | `/services/` and `/ai-automation-services/` |

This mapping intentionally uses existing pages; no new thin or duplicative landing pages were created.

## Production findings requiring approval

Read-only checks on 2026-10-13 found:

- `https://2sbusinesssupport.com/this-route-should-not-exist-2s-audit/` returned HTTP 200 and the homepage HTML: production soft-404 behavior remains.
- `http://2sbusinesssupport.com/` redirected to the canonical HTTPS hostname.
- `https://www.2sbusinesssupport.com/` returned HTTP 200 with canonical content, but did not redirect to the bare hostname.
- Production `robots.txt`, `sitemap.xml`, `/contact/`, and the HVAC article returned HTTP 200.

Owner-approved Cloudflare work is needed to deploy this repository's `404.html` and to add a hostname redirect/ruleset for `www` if Cloudflare is the active provider. Do not apply both competing redirect systems without checking the active deployment path.

## Validation

- Contact/security tests: 47 passed.
- ROI tests: 37 passed.
- Demo/route regression: passed; demo registry remains 12 verified demos.
- Build: passed; 30 pages plus generated 404 and required assets.
- Release quality: passed; metadata, schema, links, sitemap parity, security markers, and accessibility hooks.
- Visual regression: passed.
- Site verifier: 0 errors, 0 warnings.
- Local preview: representative legitimate routes HTTP 200; unknown route HTTP 404.
- Lighthouse, browser screenshots, Core Web Vitals field data, Google Search Console URL inspection, and Bing exclusion reasons: not available in this local session.

## Recommended reindex/inspection set after approved deployment

Google: `/`, `/industries/dental/`, `/roofing-lead-follow-up-automation/`, `/resources/dental/ai-receptionist-vs-traditional-receptionist-dentists/`, `/resources/hvac/ai-receptionist-for-hvac-companies-how-it-works/`, `/contact/`.

Bing: the same set, plus `/sitemap.xml`; inspect the two previously excluded/discovered URLs rather than assuming they are defective.

## IndexNow procedure

Create a random verification key, publish the matching `<key>.txt` at the domain root, verify it over HTTPS, then manually run the script only for canonical URLs that genuinely changed:

```powershell
$env:INDEXNOW_KEY = "<owner-created-key>"
node scripts/indexnow.js https://2sbusinesssupport.com/industries/dental/
```

The key is a domain ownership verification value, not a general API secret. No key is stored in this repository.

## Remaining measurements

Record Search Console and Bing data in `SEARCH-TRACKER.csv` weekly after deployment. Compare impressions, clicks, CTR, average position, indexed status, and notes; do not infer ranking improvement from a single small sample.
