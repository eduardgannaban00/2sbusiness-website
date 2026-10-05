const { visibleBreadcrumbs } = require("../partials/ui");
const config = require("../data/site-config");
const pricingConfig = require("../data/pricing-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing/" },
];

const services = [
  "AI & Workflow Automation",
  "AI Receptionist / Voice AI",
  "Lead Automation",
  "CRM / GoHighLevel",
  "Website & Funnel Building",
  "SEO / AEO / GEO Foundations",
  "Bookkeeping Automation",
  "Virtual Assistance",
  "Customer Support",
  "Social Media Support",
  "Custom Business Systems",
];

const content = `
${visibleBreadcrumbs(crumbs)}
<section data-reveal class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">Pricing</p>
    <h1 class="text-4xl md:text-5xl mb-6">Simple pricing, built around what you actually need</h1>
    <p class="text-slate2 text-lg leading-relaxed">2S covers a wide range of business support work. Here's the full range, followed by how it's typically packaged and priced.</p>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content">
    <div class="flex flex-wrap gap-2.5">
      ${services
        .map(
          (s) =>
            `<span class="text-xs font-head text-slate2 border border-gold/20 rounded-full px-3.5 py-1.5">${s}</span>`
        )
        .join("\n")}
    </div>
  </div>
</section>

<section data-reveal class="section">
  <div class="container-content">
    <p class="eyebrow mb-3">Packaged Demo Examples</p>
    <h2 class="text-2xl md:text-3xl mb-4">A few ways an automation package can be sized</h2>
    <p class="text-slate2 leading-relaxed max-w-2xl mb-8">These package examples help make the interactive demos concrete. A customized Business OS can combine multiple modules and is scoped separately after consultation.</p>
    <div data-reveal-group class="grid md:grid-cols-3 gap-6">
      ${pricingConfig.demoPackages
        .map(
          (plan, i) => `
        <div class="card flex flex-col ${i === 1 ? "border-gold/40" : ""}">
          <p class="font-head font-bold text-ink text-xl mb-1">${plan.label}</p>
          <p class="text-gold font-head font-bold text-2xl mb-1">${plan.setup} setup</p>
          <p class="text-slate2 text-sm mb-4">${plan.monthly}/month</p>
          <p class="text-muted text-xs uppercase tracking-wide">Includes</p>
          <p class="text-slate2 text-sm mt-2">${plan.minutes}</p>
        </div>`
        )
        .join("\n")}
    </div>
  </div>
</section>

<section data-reveal class="section">
  <div class="container-content">
    <p class="eyebrow mb-3">Custom Business OS</p>
    <h2 class="text-2xl md:text-3xl mb-4">Build the combination that fits your business</h2>
    <p class="text-slate2 leading-relaxed max-w-2xl mb-8">The following categories describe custom work, ongoing support, and broader system builds. They are intentionally separate from the packaged demo examples above.</p>
    <div data-reveal-group class="grid md:grid-cols-3 gap-6">
      <div class="card flex flex-col">
        <p class="font-head font-bold text-ink text-xl mb-1">Build</p>
        <p class="font-head font-bold text-gold text-2xl mb-3">${pricingConfig.build.startingPriceText}</p>
        <p class="text-slate2 text-sm leading-relaxed mb-4">Websites, funnels, CRM foundations, and lead-capture systems.</p>
        <p class="text-muted text-xs font-head uppercase tracking-wide mb-2">Typical scope</p>
        <ul class="text-slate2 text-sm space-y-1.5 mb-6 flex-1">
          <li>Website &amp; funnel development</li>
          <li>Lead/contact forms</li>
          <li>Booking integration</li>
          <li>CRM setup</li>
          <li>Basic integrations</li>
          <li>SEO, AEO &amp; GEO foundations</li>
        </ul>
        <a href="/contact/" class="btn-secondary w-full" data-cta="pricing-build" data-consult-category="BUILD">Book a Consultation</a>
      </div>

      <div class="card flex flex-col border-gold/40 relative">
        <span class="absolute -top-3 left-6 text-[10px] font-head font-bold uppercase tracking-wide text-charcoal bg-gold rounded px-2 py-1">Recommended</span>
        <p class="font-head font-bold text-ink text-xl mb-1">Automate</p>
        <p class="font-head font-bold text-gold text-2xl mb-3">${pricingConfig.automate.startingPriceText}</p>
        <p class="text-slate2 text-sm leading-relaxed mb-4">AI and workflow automation designed to reduce repetitive work and improve lead and operational workflows.</p>
        <p class="text-muted text-xs font-head uppercase tracking-wide mb-2">Typical scope</p>
        <ul class="text-slate2 text-sm space-y-1.5 mb-6 flex-1">
          <li>AI workflows</li>
          <li>Lead follow-up automation</li>
          <li>AI receptionist</li>
          <li>CRM automation</li>
          <li>Bookkeeping automation</li>
          <li>Business integrations</li>
        </ul>
        <a href="/contact/" class="btn-primary w-full" data-cta="pricing-automate" data-consult-category="AUTOMATE">Book a Consultation</a>
      </div>

      <div class="card flex flex-col">
        <p class="font-head font-bold text-ink text-xl mb-1">Support &amp; Scale</p>
        <p class="font-head font-bold text-gold text-2xl mb-3">${pricingConfig.supportScale.startingPriceText}</p>
        <p class="text-slate2 text-sm leading-relaxed mb-4">Ongoing operational support for businesses that need reliable people, systems, or both.</p>
        <p class="text-muted text-xs font-head uppercase tracking-wide mb-2">Typical scope</p>
        <ul class="text-slate2 text-sm space-y-1.5 mb-6 flex-1">
          <li>Virtual assistance</li>
          <li>Customer support</li>
          <li>Bookkeeping support</li>
          <li>Social media support</li>
          <li>System monitoring/support</li>
        </ul>
        <a href="/contact/" class="btn-secondary w-full" data-cta="pricing-support" data-consult-category="SUPPORT & SCALE">Book a Consultation</a>
      </div>
    </div>

    <p class="text-muted text-sm leading-relaxed max-w-2xl mt-10">Third-party software, AI usage, telephony, messaging, CRM, and other usage-based costs may be separate. Any required third-party costs are explained before implementation.</p>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40 text-center">
  <div class="container-content">
    <a href="/contact/" class="btn-primary" data-cta="pricing-final">${config.ctaPrimary}</a>
  </div>
</section>
`;

module.exports = {
  path: "/pricing/",
  title: "Pricing | 2S Business Support Service",
  description:
    "Simple pricing for AI automation, website/CRM builds, and ongoing business support — Build, Automate, and Support & Scale.",
  h1: "Simple pricing, built around what you actually need",
  content,
  schemas: [],
  breadcrumbs: crumbs,
};
