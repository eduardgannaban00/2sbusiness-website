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
    {
      q: "How long does implementation take?",
      a: "Implementation timelines depend on your workflow, integrations, access and approval readiness, data migration, testing, and security requirements. 2S reviews the scope before confirming a delivery schedule.",
    },
    {
      q: "What happens after an automation workflow launches?",
      a: "Initial setup, testing, and launch are separate from ongoing monitoring, troubleshooting, maintenance, new features, and additional integrations. What happens after launch depends on the support package or custom scope agreed for the engagement.",
    },
    {
      q: "Are third-party software subscriptions included?",
      a: "Not automatically. AI usage, CRM, telephony, messaging, calendar, and other third-party costs may be separate. Any required subscriptions or usage-based costs should be explained before implementation.",
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

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content">
    <h2 class="text-2xl md:text-3xl mb-4">A practical implementation process</h2>
    <p class="text-slate2 leading-relaxed max-w-2xl mb-8">The exact engagement varies by scope, but a useful implementation usually moves through these stages:</p>
    <div data-reveal-group class="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <div class="card"><p class="font-head font-bold text-ink mb-2">1. Discovery</p><p class="text-slate2 text-sm leading-relaxed">Understand the current workflow, requirements, tools, and constraints.</p></div>
      <div class="card"><p class="font-head font-bold text-ink mb-2">2. Workflow design</p><p class="text-slate2 text-sm leading-relaxed">Define tasks, integrations, approvals, exceptions, and handoff points.</p></div>
      <div class="card"><p class="font-head font-bold text-ink mb-2">3. Setup and testing</p><p class="text-slate2 text-sm leading-relaxed">Configure the approved systems and test realistic scenarios before launch.</p></div>
      <div class="card"><p class="font-head font-bold text-ink mb-2">4. Launch</p><p class="text-slate2 text-sm leading-relaxed">Activate the approved workflow after validation and agreed readiness checks.</p></div>
      <div class="card"><p class="font-head font-bold text-ink mb-2">5. Monitor and improve</p><p class="text-slate2 text-sm leading-relaxed">Review issues and refine the workflow according to the agreed support scope.</p></div>
    </div>
    <p class="text-muted text-sm leading-relaxed max-w-2xl mt-6">This is an illustrative process, not a promise that every engagement includes the same steps or delivery schedule.</p>
  </div>
</section>

<section data-reveal class="section">
  <div class="container-content">
    <h2 class="text-2xl md:text-3xl mb-4">How connected tools fit together</h2>
    <p class="text-slate2 leading-relaxed max-w-2xl mb-8">A workflow can connect the systems a business already uses, but each connection needs to be checked against the tool's access, API, subscription, and business rules.</p>
    <div data-reveal-group class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="card"><p class="font-head font-bold text-ink mb-2">CRM</p><p class="text-slate2 text-sm leading-relaxed">GoHighLevel is a core 2S capability. Other compatible CRMs can be considered after reviewing their access and integration options.</p></div>
      <div class="card"><p class="font-head font-bold text-ink mb-2">Workflow orchestration</p><p class="text-slate2 text-sm leading-relaxed">n8n, APIs, and webhooks can move approved information between systems. Other tools such as Make require technical validation for the specific workflow.</p></div>
      <div class="card"><p class="font-head font-bold text-ink mb-2">Scheduling</p><p class="text-slate2 text-sm leading-relaxed">Calendars and booking systems may support availability checks, requests, reminders, or confirmations when a compatible connection is available.</p></div>
      <div class="card"><p class="font-head font-bold text-ink mb-2">Messaging</p><p class="text-slate2 text-sm leading-relaxed">Email, SMS, and other approved channels may be used for responses and follow-up, subject to provider access, consent, and usage costs.</p></div>
      <div class="card"><p class="font-head font-bold text-ink mb-2">Telephony</p><p class="text-slate2 text-sm leading-relaxed">Compatible calling or receptionist providers can be evaluated for voice workflows, routing, and human handoff.</p></div>
      <div class="card"><p class="font-head font-bold text-ink mb-2">Business operations</p><p class="text-slate2 text-sm leading-relaxed">Forms, spreadsheets, reporting, and approved external services can be included when their role, access, and data handling are understood.</p></div>
    </div>
    <p class="text-muted text-sm leading-relaxed max-w-2xl mt-6">Public demos show illustrative workflows, not automatic compatibility with every tool or a guarantee that a connection will be included in a package.</p>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40 max-w-3xl mx-auto">
  <div class="container-content">
    <h2 class="text-2xl md:text-3xl mb-8">FAQ</h2>
    ${faq.html}
  </div>
</section>

<section data-reveal class="section text-center cta-aurora">
  <div class="container-content">
    <a href="/contact/" class="btn-primary" data-cta="ai-automation-final" data-nav-event="service_to_contact_nav">${config.ctaPrimary}</a>
  </div>
</section>
`;

module.exports = {
  path: "/ai-automation-services/",
  title: "AI Automation Services for Service Businesses",
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
