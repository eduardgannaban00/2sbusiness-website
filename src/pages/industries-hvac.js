const { visibleBreadcrumbs, workflowDiagram, faqAccordion } = require("../partials/ui");
const config = require("../data/site-config");
const { getPublicDemoUrl } = require("../data/demo-registry");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Industries", href: "/industries/" },
  { name: "HVAC", href: "/industries/hvac/" },
];

const hvacDemoUrl = getPublicDemoUrl("hvac");

const incomingWorkflow = workflowDiagram("hvac-incoming-workflow", [
  "Incoming Call / Form",
  "AI Response",
  "Service Questions",
  "Scheduling Request",
  "Calendar Check",
  "Confirmation",
  "Human Escalation",
]);

const missedCallWorkflow = workflowDiagram("hvac-missed-call-workflow", [
  "Missed Call",
  "Follow-Up Message",
  "Job Details",
  "Lead Status",
  "Scheduling Path",
  "CRM Update",
]);

const faq = faqAccordion(
  [
    {
      q: "What can an HVAC AI receptionist handle?",
      a: "It can acknowledge inquiries, collect approved job details, answer routine service questions, guide scheduling requests, update a CRM, and hand the conversation to your team when the request is urgent, uncertain, or outside its approved scope.",
    },
    {
      q: "Can it guarantee emergency response or diagnose an HVAC problem?",
      a: "No. Automation should not guarantee emergency response or diagnose a mechanical issue. Urgent or safety-related requests should follow the company's approved human escalation process.",
    },
    {
      q: "Can it book appointments automatically?",
      a: "Only when the implementation has a compatible calendar or scheduling connection and the business's availability rules are configured. Otherwise, it can collect the request and route it for staff confirmation.",
    },
    {
      q: "What happens after a missed call?",
      a: "A configured workflow can send an acknowledgment or follow-up message, collect useful job details, track the lead, and offer the appropriate scheduling path. The exact sequence depends on the connected tools and business rules.",
    },
  ],
  `${config.url}/industries/hvac/`
);

const content = `
${visibleBreadcrumbs(crumbs)}
<section data-reveal class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">HVAC</p>
    <h1 class="text-4xl md:text-5xl mb-6">HVAC AI receptionist &amp; lead follow-up automation</h1>
    <p class="text-2xl font-head font-bold text-gold mb-4">Keep inquiries moving when the team is busy or away.</p>
    <p class="text-slate2 text-lg leading-relaxed">2S helps HVAC businesses explore automation for incoming inquiries, missed-call recovery, appointment requests, structured follow-up, and CRM updates. Scheduling and urgent-service decisions remain subject to the business's tools, availability rules, and human process.</p>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content">
    <div data-reveal-group class="grid md:grid-cols-3 gap-6">
      <div class="card">
        <p class="font-head font-bold text-ink mb-2">Missed-call recovery</p>
        <p class="text-slate2 text-sm leading-relaxed">Acknowledge missed calls, collect the next useful details, and keep the inquiry visible for staff follow-up.</p>
      </div>
      <div class="card">
        <p class="font-head font-bold text-ink mb-2">Structured follow-up</p>
        <p class="text-slate2 text-sm leading-relaxed">Use defined follow-up steps for leads that do not book immediately, with stopping conditions when someone responds.</p>
      </div>
      <div class="card">
        <p class="font-head font-bold text-ink mb-2">Human escalation</p>
        <p class="text-slate2 text-sm leading-relaxed">Route urgent, safety-related, technical, or unusual requests to the team instead of asking automation to make the judgment.</p>
      </div>
    </div>
  </div>
</section>

<section data-reveal class="section">
  <div class="container-content space-y-10">
    <div>
      <h2 class="text-2xl md:text-3xl mb-8">Example incoming inquiry workflow</h2>
      <div class="card">
        <p class="text-xs font-head uppercase tracking-wide text-muted mb-4">From inquiry to scheduling path</p>
        ${incomingWorkflow}
      </div>
    </div>
    <div>
      <h2 class="text-2xl md:text-3xl mb-8">Example missed-call follow-up workflow</h2>
      <div class="card">
        <p class="text-xs font-head uppercase tracking-wide text-muted mb-4">From missed call to visible next step</p>
        ${missedCallWorkflow}
      </div>
    </div>
    <p class="text-muted text-sm leading-relaxed max-w-2xl">These are illustrative workflows. A production implementation depends on the HVAC business's phone, CRM, calendar, messaging tools, availability rules, and escalation process.</p>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content grid md:grid-cols-2 gap-6">
    <div class="card">
      <h2 class="text-2xl md:text-3xl mb-5">What automation can support</h2>
      <ul class="text-slate2 space-y-2 leading-relaxed">
        <li>Common service and availability questions</li>
        <li>Basic job-detail collection and qualification</li>
        <li>Missed-call acknowledgment and lead follow-up</li>
        <li>Scheduling requests and reminders</li>
        <li>CRM updates and staff notifications when compatible</li>
      </ul>
    </div>
    <div class="card">
      <h2 class="text-2xl md:text-3xl mb-5">What remains human</h2>
      <p class="text-slate2 leading-relaxed">Technician availability decisions, diagnosis, safety judgment, emergency handling, unusual requests, final pricing, and exceptions remain with the HVAC business. A calendar connection is required before any workflow can confirm availability automatically.</p>
    </div>
  </div>
</section>

<section data-reveal class="section">
  <div class="container-content">
    <h2 class="text-2xl md:text-3xl mb-8">HVAC resources</h2>
    <div data-reveal-group class="grid md:grid-cols-2 gap-6">
      <a href="/resources/hvac/how-ai-follows-up-with-hvac-leads-after-hours/" class="card block hover:border-gold/40"><p class="font-head font-bold text-ink">How AI Can Follow Up With HVAC Leads After Hours</p></a>
      <a href="/resources/hvac/ai-receptionist-for-hvac-companies-how-it-works/" class="card block hover:border-gold/40"><p class="font-head font-bold text-ink">AI Receptionist for HVAC Companies: How It Works</p></a>
      <a href="/resources/hvac/hvac-lead-follow-up-automation-explained/" class="card block hover:border-gold/40"><p class="font-head font-bold text-ink">HVAC Lead Follow-Up Automation Explained</p></a>
      <a href="/resources/hvac/what-happens-when-an-hvac-lead-does-not-book-right-away/" class="card block hover:border-gold/40"><p class="font-head font-bold text-ink">What Happens When an HVAC Lead Doesn't Book Right Away?</p></a>
    </div>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content card max-w-2xl">
    <p class="eyebrow mb-3">Interactive example</p>
    <h2 class="text-2xl md:text-3xl mb-4">Explore the HVAC booking and recovery demo</h2>
    <p class="text-slate2 leading-relaxed mb-5">See an illustrative example of after-hours booking support and missed-call recovery. It is a 2S demo build, not a guarantee of emergency response or a live dispatch system.</p>
    <a href="${hvacDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary">Try the HVAC Demo</a>
  </div>
</section>

<section data-reveal class="section max-w-3xl mx-auto">
  <div class="container-content">
    <h2 class="text-2xl md:text-3xl mb-8">HVAC automation FAQ</h2>
    ${faq.html}
  </div>
</section>

<section data-reveal class="section text-center cta-aurora">
  <div class="container-content flex flex-wrap justify-center gap-4">
    <a href="/pricing/" class="btn-secondary">See pricing examples</a>
    <a href="/contact/" class="btn-primary" data-cta="hvac-industry-final">${config.ctaPrimary}</a>
  </div>
</section>
`;

module.exports = {
  path: "/industries/hvac/",
  title: "HVAC AI Receptionist & Lead Follow-Up | 2S",
  description:
    "Explore HVAC AI receptionist, missed-call recovery, lead follow-up, scheduling requests, and human escalation workflows.",
  h1: "HVAC AI receptionist & lead follow-up automation",
  content,
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "HVAC AI Receptionist & Lead Follow-Up Automation",
      serviceType: "HVAC customer communication and lead automation",
      provider: { "@type": "Organization", name: config.entityName, url: config.url },
      areaServed: "Remote",
      description:
        "HVAC inquiry response, missed-call recovery, lead follow-up, and scheduling workflow automation with human escalation.",
    },
    faq.schema,
  ],
  breadcrumbs: crumbs,
};
