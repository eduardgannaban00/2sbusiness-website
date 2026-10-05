const { visibleBreadcrumbs, workflowDiagram, faqAccordion } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Industries", href: "/industries/" },
  { name: "Roofing", href: "/industries/roofing/" },
];

const roofingWorkflow = workflowDiagram("roofing-workflow", [
  "Homeowner Inquiry",
  "AI Response",
  "Initial Job Questions",
  "Lead Qualified",
  "CRM Updated",
  "Estimate Appointment",
  "Follow-Up",
  "Human Handoff",
]);

const faq = faqAccordion(
  [
    {
      q: "What can an AI assistant do for a roofing company?",
      a: "It can respond to new inquiries, ask approved qualification questions, capture project details, update your CRM, answer common questions, offer scheduling options, and hand the conversation to your team when needed.",
    },
    {
      q: "Can AI book roofing estimate appointments?",
      a: "Yes \u2014 the assistant can offer available scheduling options and confirm appointments based on your calendar, with reminders and human takeover available for exceptions.",
    },
    {
      q: "Can an AI assistant work with GoHighLevel?",
      a: "Yes. 2S builds these workflows on GoHighLevel, connecting lead capture, pipelines, and follow-up automation to the AI assistant.",
    },
    {
      q: "Does AI perform roof inspections or estimates?",
      a: "No. The AI assistant handles inquiry response, qualification, and scheduling \u2014 not roof inspections, professional assessments, or final estimates, which remain your team's responsibility.",
    },
  ],
  `${config.url}/industries/roofing/`
);

const content = `
${visibleBreadcrumbs(crumbs)}
<section data-reveal class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">Roofing</p>
    <h1 class="text-4xl md:text-5xl mb-6">AI automation for roofing companies</h1>
    <p class="text-2xl font-head font-bold text-gold mb-4">Roofing leads don't wait. Your follow-up shouldn't either.</p>
    <p class="text-slate2 text-lg leading-relaxed">2S helps roofing companies automate lead response, qualification, CRM updates, follow-ups, estimate scheduling and repetitive customer communication \u2014 while keeping humans available when needed.</p>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content">
    <div class="card">
      <p class="text-xs font-head uppercase tracking-wide text-muted mb-4">From inquiry to estimate</p>
      ${roofingWorkflow}
    </div>
  </div>
</section>

<section data-reveal class="section">
  <div class="container-content">
    <h2 class="text-2xl md:text-3xl mb-8">Roofing automation, by task</h2>
    <div data-reveal-group class="grid md:grid-cols-3 gap-6">
      <a href="/ai-assistant-for-roofing-companies/" class="card block hover:border-gold/40">
        <p class="font-head font-bold text-ink mb-2">AI Assistant</p>
        <p class="text-slate2 text-sm leading-relaxed">Respond to inquiries, qualify leads, and update your CRM automatically.</p>
      </a>
      <a href="/roofing-lead-follow-up-automation/" class="card block hover:border-gold/40">
        <p class="font-head font-bold text-ink mb-2">Lead Follow-Up Automation</p>
        <p class="text-slate2 text-sm leading-relaxed">Keep every lead \u2014 from any source \u2014 moving through a structured follow-up sequence.</p>
      </a>
      <div class="card opacity-60">
        <p class="font-head font-bold text-ink mb-2">CRM &amp; Appointment Automation</p>
        <p class="text-slate2 text-sm leading-relaxed">Pipeline and scheduling automation \u2014 coming soon.</p>
      </div>
    </div>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content">
    <h2 class="text-2xl md:text-3xl mb-8">Guides</h2>
    <div data-reveal-group class="grid md:grid-cols-2 gap-6">
      <a href="/resources/roofing/how-ai-follows-up-roofing-leads-after-hours/" class="card block hover:border-gold/40">
        <p class="font-head font-bold text-ink">How AI Can Follow Up With Roofing Leads After Hours</p>
      </a>
      <a href="/resources/roofing/what-happens-when-roofing-ai-doesnt-know-the-answer/" class="card block hover:border-gold/40">
        <p class="font-head font-bold text-ink">What Happens When a Roofing AI Assistant Doesn't Know the Answer?</p>
      </a>
    </div>
  </div>
</section>

<section data-reveal class="section max-w-3xl mx-auto">
  <div class="container-content">
    <h2 class="text-2xl md:text-3xl mb-8">FAQ</h2>
    ${faq.html}
  </div>
</section>

<section data-reveal class="section text-center">
  <div class="container-content">
    <a href="/contact/" class="btn-primary" data-cta="roofing-hub-final" data-nav-event="service_to_contact_nav">${config.ctaPrimary}</a>
  </div>
</section>
`;

module.exports = {
  path: "/industries/roofing/",
  title: "AI Automation for Roofing Companies | 2S Business Support Service",
  description:
    "2S helps roofing companies automate lead response, qualification, CRM updates, and estimate scheduling \u2014 while keeping a human available when it matters.",
  h1: "AI automation for roofing companies",
  content,
  schemas: [faq.schema],
  breadcrumbs: crumbs,
};
