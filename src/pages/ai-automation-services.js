const { visibleBreadcrumbs, workflowDiagram, faqAccordion } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services/" },
  { name: "AI Automation Services", href: "/ai-automation-services/" },
];

const demoWorkflow = workflowDiagram("demo-workflow", [
  "Website Form",
  "AI Response",
  "Qualification",
  "CRM",
  "Follow-Up",
  "Calendar",
  "Appointment",
  "Human Escalation",
]);

const faq = faqAccordion(
  [
    {
      q: "What is an AI assistant?",
      a: "An AI assistant is a system that responds to inquiries, answers approved questions, and completes defined tasks like collecting information or updating records \u2014 without needing a person to handle every step manually.",
    },
    {
      q: "What is an AI agent?",
      a: "An AI agent carries out a sequence of actions toward a goal \u2014 for example, qualifying a lead and then triggering the right follow-up \u2014 rather than just answering a single question.",
    },
    {
      q: "What is n8n automation?",
      a: "n8n is a workflow automation tool that connects different systems (forms, CRMs, calendars, messaging platforms) so information moves between them automatically, based on rules you define.",
    },
    {
      q: "When does a human get involved?",
      a: "Automation handles repetitive, well-defined steps. A person becomes involved for exceptions, complex questions, and anything requiring judgment \u2014 the workflow is designed to escalate rather than guess.",
    },
  ],
  `${config.url}/ai-automation-services/`
);

const content = `
${visibleBreadcrumbs(crumbs)}
<section data-reveal class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">AI Automation Services</p>
    <h1 class="text-4xl md:text-5xl mb-6">AI assistants, AI agents, and n8n workflow automation</h1>
    <p class="text-slate2 text-lg leading-relaxed">2S builds AI-driven systems that respond to inquiries, qualify leads, update your CRM, and trigger follow-up automatically \u2014 connected through n8n workflows so information moves between your tools without manual re-entry.</p>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content">
    <h2 class="text-xl md:text-2xl mb-3">What can an AI assistant do for my business?</h2>
    <p class="text-slate2 leading-relaxed max-w-2xl mb-8">An AI assistant built by 2S can respond to new inquiries, ask approved qualification questions, capture project information, update your CRM, answer common questions, send follow-ups, and escalate conversations to your team when needed.</p>
    <div class="card">
      <p class="text-xs font-head uppercase tracking-wide text-muted mb-4">See what happens after a lead clicks submit</p>
      ${demoWorkflow}
    </div>
  </div>
</section>

<section data-reveal class="section">
  <div data-reveal-group class="container-content grid md:grid-cols-2 gap-6">
    <div class="card">
      <p class="font-head font-bold text-ink mb-2">Includes</p>
      <ul class="text-slate2 text-sm space-y-1.5 leading-relaxed">
        <li>AI assistant &amp; agent setup</li>
        <li>n8n workflow automation</li>
        <li>API and webhook connections</li>
        <li>Lead qualification &amp; routing</li>
        <li>Automated follow-up</li>
        <li>Data synchronization between systems</li>
        <li>Notifications</li>
      </ul>
    </div>
    <div class="card">
      <p class="font-head font-bold text-ink mb-2">Human involvement</p>
      <p class="text-slate2 text-sm leading-relaxed">Exceptions, complex or sensitive conversations, and quality control remain with your team. Automation handles the repetitive steps in between.</p>
    </div>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40 max-w-3xl mx-auto">
  <div class="container-content">
    <h2 class="text-2xl md:text-3xl mb-8">FAQ</h2>
    ${faq.html}
  </div>
</section>

<section data-reveal class="section text-center">
  <div class="container-content">
    <a href="/contact/" class="btn-primary" data-cta="ai-automation-final" data-nav-event="service_to_contact_nav">${config.ctaPrimary}</a>
  </div>
</section>
`;

module.exports = {
  path: "/ai-automation-services/",
  title: "AI Automation Services (AI Assistants + n8n) | 2S Business Support Service",
  description:
    "AI assistants, AI agents, and n8n workflow automation that respond to leads, update your CRM, and follow up automatically \u2014 with human escalation built in.",
  h1: "AI assistants, AI agents, and n8n workflow automation",
  content,
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AI Automation Services",
      serviceType: "AI automation and workflow automation",
      provider: { "@type": "Organization", name: config.entityName, url: config.url },
      areaServed: "Remote",
      description:
        "AI assistants, AI agents, and n8n workflow automation for lead response, qualification, CRM updates, and follow-up.",
    },
    faq.schema,
  ],
  breadcrumbs: crumbs,
};
