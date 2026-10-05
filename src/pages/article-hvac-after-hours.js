const { visibleBreadcrumbs, workflowDiagram, faqAccordion, articleMeta, relatedResources, articleSchema } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources/" },
  {
    name: "How AI Follows Up With HVAC Leads After Hours",
    href: "/resources/hvac/how-ai-follows-up-with-hvac-leads-after-hours/",
  },
];

const DATE_PUBLISHED = null;
const DATE_MODIFIED = null;

const wf = workflowDiagram("article-workflow-hvac-1", [
  "After-Hours Call",
  "Immediate Answer / Acknowledgment",
  "Caller Need Collected",
  "Basic Qualification",
  "Approved Urgency / Escalation Rules",
  "Booking / Callback Request / Staff Escalation",
  "CRM or Dispatch Record",
  "Next-Business-Day Follow-Up When Appropriate",
]);

const faq = faqAccordion(
  [
    {
      q: "Can the AI tell if an HVAC issue is a real emergency?",
      a: "No \u2014 it can apply predefined urgency rules your business sets in advance (for example, treating \u201cno heat\u201d in winter as higher priority than a routine maintenance request), but it doesn't make an independent technical or safety judgment. Genuinely urgent or ambiguous situations should follow your business's approved escalation procedure to a person.",
    },
    {
      q: "What happens if the caller just wants to talk to a person?",
      a: "A well-configured system recognizes that request and routes it accordingly \u2014 to a callback, an answering service, or however your business handles after-hours escalation \u2014 rather than insisting the caller continue with the automated flow.",
    },
    {
      q: "What if the integration to our CRM or dispatch system goes down?",
      a: "That should be treated as a failure to flag, not a silent gap. A reasonable setup logs the call and alerts staff even if the automatic record-creation step fails, so a call doesn't simply vanish because a connection broke.",
    },
  ],
  `${config.url}/resources/hvac/how-ai-follows-up-with-hvac-leads-after-hours/`
);

const related = relatedResources([
  {
    category: "HVAC Automation",
    title: "AI Receptionist for HVAC Companies: How It Works",
    href: "/resources/hvac/ai-receptionist-for-hvac-companies-how-it-works/",
  },
  {
    category: "HVAC Automation",
    title: "HVAC Lead Follow-Up Automation Explained",
    href: "/resources/hvac/hvac-lead-follow-up-automation-explained/",
  },
]);

const content = `
${visibleBreadcrumbs(crumbs)}
<article class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">HVAC Automation</p>
    <h1 class="text-3xl md:text-4xl mb-6">How AI Can Follow Up With HVAC Leads After Hours</h1>

    ${articleMeta("HVAC Automation", DATE_PUBLISHED, DATE_MODIFIED)}

    <p class="text-slate2 text-lg leading-relaxed mb-6">HVAC problems don't wait for business hours \u2014 a furnace goes out on a cold evening, or an AC stops working on a weekend, and the homeowner is calling or filling out a web form right away. Automating after-hours call handling means giving that call a real first response \u2014 an acknowledgment, some basic information gathering, and an appropriate next step \u2014 instead of letting it sit until Monday morning.</p>

    <div class="card my-10">
      <p class="text-xs font-head uppercase tracking-wide text-muted mb-4">A realistic after-hours workflow</p>
      ${wf}
    </div>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">What's actually happening at each step</h2>
    <p class="text-slate2 leading-relaxed mb-6">Answering a call, understanding basic intent, collecting information, and applying predefined routing rules are all things automation can reasonably do. Making a technical or safety judgment about the situation is not \u2014 that distinction matters, and it's worth being explicit about it with whoever sets this up. Type of system, general nature of the issue (no heat, no cooling, strange noise, routine maintenance), property type, and preferred contact time are the kind of details the assistant can gather. It doesn't attempt to diagnose the mechanical problem or determine how physically urgent a situation is \u2014 that's for your technician or your approved emergency process.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">How different callers get handled</h2>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-2 list-disc list-inside">
      <li><strong class="text-ink">Normal service request</strong> \u2014 basic details collected, appointment options offered</li>
      <li><strong class="text-ink">Existing customer</strong> \u2014 recognized where the system supports it, routed with that context if available</li>
      <li><strong class="text-ink">Appointment question</strong> \u2014 handled directly if it's a simple lookup, or routed to staff if it needs a change</li>
      <li><strong class="text-ink">Caller requesting emergency service</strong> \u2014 routed per your business's own predefined urgency/escalation rules, not assessed by the AI itself</li>
      <li><strong class="text-ink">Out-of-service-area inquiry</strong> \u2014 told plainly rather than left to assume you can help</li>
      <li><strong class="text-ink">Unknown or unclear question</strong> \u2014 flagged for a person rather than guessed at</li>
      <li><strong class="text-ink">Caller wanting a person</strong> \u2014 routed to your after-hours escalation path</li>
      <li><strong class="text-ink">System or integration failure</strong> \u2014 logged and flagged to staff rather than silently dropped</li>
    </ul>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Booking and escalation</h2>
    <p class="text-slate2 leading-relaxed mb-6">Once basic details are captured, the assistant can offer available appointment windows and confirm a booking, or flag the inquiry for a callback if the situation sounds more urgent than a routine booking. Either way, your team reviews and confirms \u2014 the automation handles the intake, not the judgment call on how urgent something actually is.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Where this fits into the bigger picture</h2>
    <p class="text-slate2 leading-relaxed mb-6">After-hours response is one part of a longer lead lifecycle, and it's a different topic from how the AI receptionist itself is configured to handle inquiries generally, or what happens to a lead over the days after first contact \u2014 see the related guides below for those.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">FAQ</h2>
    ${faq.html}

    ${related}

    <div class="border-t border-gold/10 pt-8 mt-10">
      <a href="/ai-automation-services/" class="link-inline text-sm block mb-6">See AI Automation Services &rarr;</a>
      <a href="/contact/" class="btn-primary" data-cta="article-hvac-after-hours">${config.ctaPrimary}</a>
    </div>
  </div>
</article>
`;

module.exports = {
  path: "/resources/hvac/how-ai-follows-up-with-hvac-leads-after-hours/",
  title: "How AI Can Follow Up With HVAC Leads After Hours | 2S Business Support Service",
  description:
    "How after-hours HVAC calls can be acknowledged, qualified, and routed \u2014 what automation handles, what stays with staff, and how failures are managed.",
  h1: "How AI Can Follow Up With HVAC Leads After Hours",
  content,
  schemas: [
    articleSchema({
      headline: "How AI Can Follow Up With HVAC Leads After Hours",
      entityName: config.entityName,
      url: config.url,
      mainEntityOfPage: `${config.url}/resources/hvac/how-ai-follows-up-with-hvac-leads-after-hours/`,
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
    }),
    faq.schema,
  ],
  breadcrumbs: crumbs,
};
