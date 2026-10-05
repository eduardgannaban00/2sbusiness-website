const { visibleBreadcrumbs, faqAccordion } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Industries", href: "/industries/" },
  { name: "Roofing", href: "/industries/roofing/" },
  { name: "AI Assistant", href: "/ai-assistant-for-roofing-companies/" },
];

const faq = faqAccordion(
  [
    {
      q: "What does an AI assistant for a roofing company do?",
      a: "It responds to new inquiries, asks approved qualification questions, captures project information, updates your CRM, answers common questions, offers scheduling options, and escalates to your team when needed.",
    },
    {
      q: "What does it not do?",
      a: "It does not perform roof inspections, professional assessments, final estimates, or safety judgments \u2014 those stay with your team.",
    },
    {
      q: "Can a human take over an AI conversation?",
      a: "Yes. The workflow is designed to hand off to your team for qualified opportunities, complex questions, or anything requiring judgment.",
    },
    {
      q: "How is this different from an AI receptionist?",
      a: "This page covers the assistant's role across a conversation \u2014 qualification, information capture, and CRM updates. A dedicated receptionist-style setup focused specifically on inbound call/inquiry handling is a related but separate configuration; ask us which fits your setup.",
    },
  ],
  `${config.url}/ai-assistant-for-roofing-companies/`
);

const content = `
${visibleBreadcrumbs(crumbs)}
<section data-reveal class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">Roofing &middot; AI Assistant</p>
    <h1 class="text-4xl md:text-5xl mb-6">AI assistant for roofing companies</h1>
    <p class="text-2xl font-head font-bold text-gold mb-4">Your roofing leads don't clock out at 5 PM.</p>
    <p class="text-slate2 text-lg leading-relaxed">Turn new inquiries into organized conversations faster with AI-assisted response, qualification, CRM updates, follow-up and scheduling.</p>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div data-reveal-group class="container-content grid md:grid-cols-2 gap-6">
    <div class="card">
      <p class="font-head font-bold text-ink mb-3">What it does</p>
      <ul class="text-slate2 text-sm space-y-1.5 leading-relaxed">
        <li>Respond to new inquiries</li>
        <li>Ask approved qualification questions</li>
        <li>Capture project information</li>
        <li>Update CRM records</li>
        <li>Answer approved common questions</li>
        <li>Send follow-ups</li>
        <li>Offer appropriate scheduling options</li>
        <li>Trigger reminders</li>
        <li>Escalate conversations to humans</li>
      </ul>
    </div>
    <div class="card">
      <p class="font-head font-bold text-ink mb-3">What it doesn't do</p>
      <ul class="text-slate2 text-sm space-y-1.5 leading-relaxed">
        <li>Roof inspections</li>
        <li>Professional roofing assessments</li>
        <li>Final estimates</li>
        <li>Safety judgments</li>
        <li>Technical roofing decisions</li>
      </ul>
    </div>
  </div>
</section>

<section data-reveal class="section">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-3">Related</p>
    <a href="/roofing-lead-follow-up-automation/" class="link-inline text-sm block mb-2">Roofing Lead Follow-Up Automation &rarr;</a>
    <a href="/industries/roofing/" class="link-inline text-sm block">Back to Roofing overview &rarr;</a>
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
    <a href="/contact/" class="btn-primary" data-cta="ai-assistant-roofing-final" data-nav-event="service_to_contact_nav">${config.ctaPrimary}</a>
  </div>
</section>
`;

module.exports = {
  path: "/ai-assistant-for-roofing-companies/",
  title: "AI Assistant for Roofing Companies | 2S Business Support Service",
  description:
    "An AI assistant built for roofing companies responds to inquiries, asks qualification questions, updates your CRM, and hands off to your team when it matters.",
  h1: "AI assistant for roofing companies",
  content,
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AI Assistant for Roofing Companies",
      serviceType: "AI assistant setup for the roofing industry",
      provider: { "@type": "Organization", name: config.entityName, url: config.url },
      areaServed: "Remote",
      description:
        "AI assistant setup that responds to roofing inquiries, qualifies leads, captures project information, and updates the CRM, with human escalation.",
    },
    faq.schema,
  ],
  breadcrumbs: crumbs,
};
