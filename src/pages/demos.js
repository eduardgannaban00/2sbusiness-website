const { visibleBreadcrumbs } = require("../partials/ui");
const config = require("../data/site-config");
const { demos, demosByCategory } = require("../data/demo-registry");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Demos", href: "/demos/" },
];

const groups = [
  ["lead-sales", "Lead & Sales", "Capture interest, keep follow-up moving, and make the next action visible."],
  ["booking-customer-experience", "Booking & Customer Experience", "Examples for answering, booking, supporting, and recovering customer conversations."],
  ["retention-operations", "Retention & Operations", "Examples for onboarding, reviews, hiring workflows, and the operational work around delivery."],
];

function demoCard(demo) {
  const isAvailable = demo.status === "verified" && demo.publicUrl;
  const action = isAvailable
    ? `<a href="${demo.publicUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary" data-cta="demo-${demo.id}">${demo.ctaLabel}</a>`
    : `<span class="inline-flex items-center gap-2 text-muted text-sm border border-gold/15 rounded-md px-4 py-2.5"><span class="status-dot" aria-hidden="true"></span>${demo.ctaLabel}</span>`;
  return `
    <article class="card flex flex-col ${demo.flagship ? "border-gold/50 md:col-span-2" : ""}">
      <div class="flex items-center justify-between gap-3 mb-4">
        <span class="inline-flex items-center gap-1.5 text-[11px] font-head font-bold uppercase tracking-wide ${isAvailable ? "text-emerald2" : "text-muted"}">
          <span class="status-dot" aria-hidden="true"${isAvailable ? ' style="background-color:#10B981"' : ""}></span>${isAvailable ? "Interactive Demo" : "Preview Unavailable"}
        </span>
        ${demo.flagship ? '<span class="text-[10px] font-head font-bold uppercase tracking-wide text-charcoal bg-gold rounded px-2 py-1">Flagship</span>' : ""}
      </div>
      <h3 class="font-head font-bold text-ink text-xl mb-2">${demo.name}</h3>
      <p class="text-slate2 text-sm leading-relaxed mb-4">${demo.description}</p>
      <p class="text-muted text-xs uppercase tracking-wide mb-5">${demo.industries.join(" · ")}</p>
      <div class="mt-auto">${action}</div>
    </article>`;
}

const content = `
${visibleBreadcrumbs(crumbs)}
<section data-reveal class="section pt-8">
  <div class="container-content max-w-3xl">
    <p class="eyebrow mb-4">Interactive Demos</p>
    <h1 class="text-4xl md:text-5xl mb-6">See the modules that can become your Business OS</h1>
    <p class="text-slate2 text-lg leading-relaxed mb-5">These interactive examples show practical ways 2S can help a business capture leads, book work, follow up, support customers, and keep operations visible.</p>
    <p class="text-slate2 leading-relaxed">A customized Business OS does not mean every business needs every module. We combine the workflows that fit how your business actually operates, with human review where judgment matters.</p>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content">
    <div class="card border-gold/50 md:grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
      <div>
        <p class="eyebrow mb-3">Flagship Example</p>
        <h2 class="text-2xl md:text-3xl mb-4">One operating view. The right modules connected.</h2>
        <p class="text-slate2 leading-relaxed mb-5">The Business OS demo shows how lead capture, appointments, quotes, onboarding, support, and reviews can share context without pretending every company needs the same setup.</p>
        <a href="${demos.find((demo) => demo.id === "businessos").publicUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" data-cta="demo-businessos-flagship">Explore the Business OS</a>
      </div>
      <div class="border border-gold/15 rounded-md p-5">
        <p class="text-xs font-head uppercase tracking-wide text-muted mb-4">Example module mix</p>
        <ul class="text-slate2 text-sm space-y-2">
          <li>Lead capture and follow-up</li>
          <li>Appointment and quote visibility</li>
          <li>Client onboarding handoff</li>
          <li>Support and reputation workflows</li>
        </ul>
      </div>
    </div>
  </div>
</section>

${groups.map(([id, label, description]) => `
<section data-reveal class="section">
  <div class="container-content">
    <p class="eyebrow mb-3">${label}</p>
    <h2 class="text-2xl md:text-3xl mb-3">${label} modules</h2>
    <p class="text-slate2 leading-relaxed max-w-2xl mb-8">${description}</p>
    <div data-reveal-group class="grid md:grid-cols-2 gap-6">
      ${demosByCategory(id).map(demoCard).join("\n")}
    </div>
  </div>
</section>`).join("\n")}

<section data-reveal class="section bg-obsidian/40 text-center cta-aurora">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-3">Build Your System</p>
    <h2 class="text-2xl md:text-3xl mb-4">Start with the workflow that matters most</h2>
    <p class="text-slate2 leading-relaxed mb-7">Tell us what is slowing the business down. We will help identify which modules belong together—and which ones do not.</p>
    <a href="/contact/" class="btn-primary" data-cta="demos-final">${config.ctaPrimary}</a>
  </div>
</section>`;

module.exports = {
  path: "/demos/",
  title: "Interactive Demos | 2S Business Support Service",
  description: "Explore interactive examples of AI reception, lead follow-up, appointment automation, customer support, and Business OS modules from 2S.",
  h1: "See the modules that can become your Business OS",
  content,
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "2S Interactive Demos",
      description: "Interactive examples of modular business automation systems from 2S Business Support Service.",
      url: `${config.url}/demos/`,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: demos.length,
        itemListElement: demos.map((demo, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: demo.name,
        })),
      },
    },
  ],
  breadcrumbs: crumbs,
};
