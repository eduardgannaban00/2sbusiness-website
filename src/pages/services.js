const { visibleBreadcrumbs } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services/" },
];

const content = `
${visibleBreadcrumbs(crumbs)}
<section data-reveal class="section pt-8">
  <div class="container-content max-w-3xl">
    <p class="eyebrow mb-4">Services</p>
    <h1 class="text-4xl md:text-5xl mb-6">AI automation and business operations support</h1>
    <p class="text-slate2 text-lg leading-relaxed">2S builds modular business systems around three pillars: AI assistants and workflow automation, CRM and operational systems, and human-in-the-loop support. Modules can work independently or connect into a customized Business OS based on what your business actually needs.</p>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content">
    <div data-reveal-group class="grid md:grid-cols-3 gap-6">
      <div class="card">
        <p class="font-head font-bold text-ink mb-2">AI Assistants + n8n Automation</p>
        <p class="text-slate2 text-sm leading-relaxed">AI assistants, AI agents, n8n workflows, lead qualification, automated follow-up, data synchronization and notifications.</p>
      </div>
      <div class="card">
        <p class="font-head font-bold text-ink mb-2">GoHighLevel CRM + AI Systems</p>
        <p class="text-slate2 text-sm leading-relaxed">CRM setup, pipelines, lead capture and nurturing, booking, funnels, and AI chat/voice integrations.</p>
      </div>
      <div class="card">
        <p class="font-head font-bold text-ink mb-2">Human-in-the-Loop Operations</p>
        <p class="text-slate2 text-sm leading-relaxed">Virtual assistance, exception handling, customer support, administrative operations, and workflow supervision.</p>
      </div>
    </div>
  </div>
</section>

<section data-reveal class="section">
  <div class="container-content">
    <h2 class="text-2xl md:text-3xl mb-8">Available now</h2>
    <a href="/ai-automation-services/" class="card block max-w-xl hover:border-gold/40">
      <p class="font-head font-bold text-ink text-lg mb-2">AI Automation Services</p>
      <p class="text-slate2 text-sm leading-relaxed">AI assistants, AI agents, and n8n workflow automation built around your business's repetitive processes.</p>
      <span class="link-inline text-sm inline-block mt-4">Learn more &rarr;</span>
    </a>
    <p class="text-muted text-sm mt-6">Additional service pages covering GoHighLevel, lead follow-up automation, and human-in-the-loop support are in progress.</p>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content">
    <h2 class="text-2xl md:text-3xl mb-6">By industry</h2>
    <a href="/industries/" class="link-inline text-sm">See industry-specific automation &rarr;</a>
  </div>
</section>

<section data-reveal class="section text-center cta-aurora">
  <div class="container-content">
    <a href="/contact/" class="btn-primary" data-cta="services-final" data-nav-event="service_to_contact_nav">${config.ctaPrimary}</a>
  </div>
</section>
`;

module.exports = {
  path: "/services/",
  title: "AI Automation Services | 2S Business Support Service",
  description:
    "AI assistants, GoHighLevel CRM automation, and human-in-the-loop operations for small and growing service businesses.",
  h1: "AI automation and business operations support",
  content,
  schemas: [],
  breadcrumbs: crumbs,
};
