const { visibleBreadcrumbs, workflowDiagram, faqAccordion } = require("../partials/ui");
const config = require("../data/site-config");
const { getPublicDemoUrl } = require("../data/demo-registry");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Industries", href: "/industries/" },
  { name: "Dental", href: "/industries/dental/" },
];

const dentalDemoUrl = getPublicDemoUrl("dental");

const dentalWorkflow = workflowDiagram("dental-workflow", [
  "Patient Inquiry",
  "AI Receptionist",
  "Approved Questions",
  "Scheduling Request",
  "Confirmation",
  "CRM / Staff Notification",
  "Human Escalation",
]);

const faq = faqAccordion(
  [
    {
      q: "What can a dental AI receptionist handle?",
      a: "It can answer approved administrative questions, collect basic appointment details, guide booking-related conversations, send reminders, and route requests to your team. The exact scope depends on the information and systems your practice approves.",
    },
    {
      q: "Can it diagnose a dental problem or recommend treatment?",
      a: "No. The workflow is for administrative support, not diagnosis, treatment recommendations, or independent clinical advice. Clinical, urgent, uncertain, or sensitive requests should go to your dental team or approved emergency process.",
    },
    {
      q: "Can it connect to our calendar or practice-management software?",
      a: "Possibly. Setup starts by reviewing the calendar, CRM, forms, messaging tools, and practice-management software you already use. Connections depend on the access and integration options each system provides.",
    },
    {
      q: "What happens when the assistant cannot handle a request?",
      a: "It should follow a defined handoff path rather than guess. That can include collecting the relevant details, notifying staff, and directing the person to the practice's preferred next step.",
    },
  ],
  `${config.url}/industries/dental/`
);

const content = `
${visibleBreadcrumbs(crumbs)}
<section data-reveal class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">Dental</p>
    <h1 class="text-4xl md:text-5xl mb-6">Dental AI receptionist &amp; appointment automation</h1>
    <p class="text-2xl font-head font-bold text-gold mb-4">Make routine patient communication easier to manage.</p>
    <p class="text-slate2 text-lg leading-relaxed">2S helps dental practices explore administrative automation for common inquiries, appointment requests, reminders, lead follow-up, and after-hours communication. The workflow keeps clinical judgment and patient-care decisions with your team.</p>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content">
    <div data-reveal-group class="grid md:grid-cols-3 gap-6">
      <div class="card">
        <p class="font-head font-bold text-ink mb-2">Routine inquiries</p>
        <p class="text-slate2 text-sm leading-relaxed">Answer approved questions about office information, appointment types, new-patient steps, and other administrative topics.</p>
      </div>
      <div class="card">
        <p class="font-head font-bold text-ink mb-2">Appointment support</p>
        <p class="text-slate2 text-sm leading-relaxed">Collect the details needed for a scheduling request, connect to an available calendar when compatible, and send appropriate reminders.</p>
      </div>
      <div class="card">
        <p class="font-head font-bold text-ink mb-2">Human handoff</p>
        <p class="text-slate2 text-sm leading-relaxed">Route clinical, sensitive, uncertain, or out-of-scope conversations to the practice's team instead of asking automation to guess.</p>
      </div>
    </div>
  </div>
</section>

<section data-reveal class="section">
  <div class="container-content">
    <h2 class="text-2xl md:text-3xl mb-8">Example dental workflow</h2>
    <div class="card">
      <p class="text-xs font-head uppercase tracking-wide text-muted mb-4">From inquiry to staff visibility</p>
      ${dentalWorkflow}
    </div>
    <p class="text-muted text-sm leading-relaxed max-w-2xl mt-6">This is an illustrative workflow. A production implementation would be configured around the practice's approved information, scheduling process, systems, and escalation rules.</p>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content grid md:grid-cols-2 gap-6">
    <div class="card">
      <h2 class="text-2xl md:text-3xl mb-5">What automation can support</h2>
      <ul class="text-slate2 space-y-2 leading-relaxed">
        <li>Common administrative and practice-information questions</li>
        <li>New-patient and appointment-request intake</li>
        <li>Reminder and confirmation workflows</li>
        <li>After-hours acknowledgment and follow-up</li>
        <li>CRM or staff notifications when systems are compatible</li>
      </ul>
    </div>
    <div class="card">
      <h2 class="text-2xl md:text-3xl mb-5">What remains human</h2>
      <p class="text-slate2 leading-relaxed">Diagnosis, treatment recommendations, emergency judgment, patient-specific clinical decisions, and exceptions remain with the practice's qualified team. The public demo is illustrative only and does not handle real patients.</p>
    </div>
  </div>
</section>

<section data-reveal class="section">
  <div class="container-content">
    <h2 class="text-2xl md:text-3xl mb-8">Dental resources</h2>
    <div data-reveal-group class="grid md:grid-cols-2 gap-6">
      <a href="/resources/dental/how-ai-receptionists-handle-after-hours-dental-inquiries/" class="card block hover:border-gold/40"><p class="font-head font-bold text-ink">How AI Receptionists Handle After-Hours Dental Inquiries</p></a>
      <a href="/resources/dental/what-a-dental-ai-receptionist-should-and-should-not-answer/" class="card block hover:border-gold/40"><p class="font-head font-bold text-ink">What a Dental AI Receptionist Should and Should Not Answer</p></a>
      <a href="/resources/dental/ai-receptionist-cost-dental-practice/" class="card block hover:border-gold/40"><p class="font-head font-bold text-ink">How Much Does an AI Receptionist Cost for a Dental Practice?</p></a>
      <a href="/resources/dental/ai-receptionist-vs-traditional-receptionist-dentists/" class="card block hover:border-gold/40"><p class="font-head font-bold text-ink">AI Receptionist vs Traditional Receptionist for Dentists</p></a>
      <a href="/resources/dental/dental-appointment-reminder-automation/" class="card block hover:border-gold/40"><p class="font-head font-bold text-ink">How Dental Appointment Reminder Automation Works</p></a>
    </div>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content card max-w-2xl">
    <p class="eyebrow mb-3">Interactive example</p>
    <h2 class="text-2xl md:text-3xl mb-4">Explore the Dental AI Receptionist demo</h2>
    <p class="text-slate2 leading-relaxed mb-5">See an illustrative example of common questions and booking-related conversations. It is a 2S demo build, not a live patient-service system.</p>
    <a href="${dentalDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary">Try the Dental AI Demo</a>
  </div>
</section>

<section data-reveal class="section max-w-3xl mx-auto">
  <div class="container-content">
    <h2 class="text-2xl md:text-3xl mb-8">Dental automation FAQ</h2>
    ${faq.html}
  </div>
</section>

<section data-reveal class="section text-center cta-aurora">
  <div class="container-content flex flex-wrap justify-center gap-4">
    <a href="/pricing/" class="btn-secondary">See pricing examples</a>
    <a href="/contact/" class="btn-primary" data-cta="dental-industry-final">${config.ctaPrimary}</a>
  </div>
</section>
`;

module.exports = {
  path: "/industries/dental/",
  title: "Dental AI Receptionist & Appointment Automation | 2S",
  description:
    "Explore dental AI receptionist and appointment automation for routine inquiries, reminders, scheduling requests, and human handoff.",
  h1: "Dental AI receptionist & appointment automation",
  content,
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Dental AI Receptionist & Appointment Automation",
      serviceType: "Dental administrative automation",
      provider: { "@type": "Organization", name: config.entityName, url: config.url },
      areaServed: "Remote",
      description:
        "Administrative AI receptionist and appointment workflow automation for dental practices, with human escalation and clinical boundaries.",
    },
    faq.schema,
  ],
  breadcrumbs: crumbs,
};
