const { visibleBreadcrumbs } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Industries", href: "/industries/" },
];

const content = `
${visibleBreadcrumbs(crumbs)}
<section data-reveal class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">Industries</p>
    <h1 class="text-4xl md:text-5xl mb-6">Industry-specific automation</h1>
    <p class="text-slate2 text-lg leading-relaxed">2S's core services apply across service businesses generally. The modules are adapted to each industry's customer journey and operating constraints \u2014 with deeper guidance currently focused on roofing, dental, and HVAC.</p>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content">
    <div data-reveal-group class="grid md:grid-cols-3 gap-6">
      <a href="/industries/roofing/" class="card block hover:border-gold/40">
        <p class="font-head font-bold text-ink text-lg mb-2">Roofing</p>
        <p class="text-slate2 text-sm leading-relaxed">AI-assisted lead response, follow-up automation, and CRM workflows built around how roofing companies actually operate.</p>
        <span class="link-inline text-sm inline-block mt-4">See roofing automation &rarr;</span>
      </a>
      <a href="/industries/dental/" class="card block hover:border-gold/40">
        <p class="font-head font-bold text-ink text-lg mb-2">Dental</p>
        <p class="text-slate2 text-sm leading-relaxed">Administrative AI reception, appointment requests, reminders, and after-hours communication \u2014 with clear clinical boundaries.</p>
        <span class="link-inline text-sm inline-block mt-4">See dental automation &rarr;</span>
      </a>
      <a href="/industries/hvac/" class="card block hover:border-gold/40">
        <p class="font-head font-bold text-ink text-lg mb-2">HVAC</p>
        <p class="text-slate2 text-sm leading-relaxed">AI receptionist, missed-call recovery, follow-up, and scheduling workflows with human escalation for urgent or uncertain requests.</p>
        <span class="link-inline text-sm inline-block mt-4">See HVAC automation &rarr;</span>
      </a>
    </div>
    <p class="text-muted text-sm mt-6">Additional industries \u2014 real estate, construction \u2014 are planned as this section expands.</p>
  </div>
</section>

<section data-reveal class="section text-center">
  <div class="container-content">
    <a href="/contact/" class="btn-primary" data-cta="industries-final" data-nav-event="service_to_contact_nav">${config.ctaPrimary}</a>
  </div>
</section>
`;

module.exports = {
  path: "/industries/",
  title: "Industries We Serve | 2S Business Support Service",
  description:
    "AI automation and CRM workflows for service businesses, with dedicated guidance for roofing, dental, and HVAC.",
  h1: "Industry-specific automation",
  content,
  schemas: [],
  breadcrumbs: crumbs,
};
