# Local Release-Candidate QA

Status: **PENDING HUMAN QA** — browser automation is unavailable in this workspace.

## Start the production-like static preview

From `C:\Projects\2S Website`:

```powershell
npm.cmd ci
npm.cmd test
npm.cmd run preview
```

Open: `http://localhost:4173/`

The preview serves the generated `dist/` artifact without changing DNS,
deploying, configuring production services, or sending email. Press `Ctrl+C`
to stop it. The local static server does not emulate the production
`/api/contact` function or Cloudflare response-header processing.

## Screenshot checklist

Use a desktop viewport around 1440 x 900:

- [ ] Home — `/`
- [ ] Demos — `/demos/`
- [ ] Pricing — `/pricing/`
- [ ] Contact — `/contact/`
- [ ] Solutions — `/services/`
- [ ] Industries — `/industries/`

Use a mobile viewport around 390 x 844, then spot-check 320 px width:

- [ ] Home — `/`
- [ ] Home with the mobile menu open
- [ ] Demos — `/demos/`
- [ ] Pricing — `/pricing/`
- [ ] Contact — `/contact/`

## Human interaction checks

- [ ] Keyboard: skip link, desktop navigation, mobile-menu focus loop and Escape close
- [ ] Keyboard: industry tabs, FAQ controls, assistant open/close and options
- [ ] Responsive: no horizontal page overflow at 320, 390, 768, 1024, and 1440 px
- [ ] Contact: required-field and invalid-field messages are clear; do not submit a real inquiry locally
- [ ] CTA flow: Home, Solutions, Industries, Demos, Pricing, and Resources reach `/contact/`
- [ ] External demos: links open a new tab and show the intended labeled 2S demo
- [ ] Reduced motion: page content remains visible and interactions remain usable
- [ ] Visuals: focus rings, contrast, tables, cards, footer, assistant, and long text do not clip

Production-only follow-up remains required for CSP/headers, Turnstile, rate
limiting, controlled email delivery, Cloudflare preview behavior, and DNS.
