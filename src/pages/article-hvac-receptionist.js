const { visibleBreadcrumbs, workflowDiagram, faqAccordion, articleMeta, relatedResources, articleSchema } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources/" },
  {
    name: "AI Receptionist for HVAC Companies: How It Works",
    href: "/resources/hvac/ai-receptionist-for-hvac-companies-how-it-works/",
  },
];

const DATE_PUBLISHED = null;
const DATE_MODIFIED = null;

const wf = workflowDiagram("article-workflow-hvac-receptionist", [
  "Incoming Call",
  "AI Receptionist Answers",
  "Caller Need Identified",
  "Basic Information Collected",
  "Service / Location Qualification",
  "Appropriate Next Step",
  "Booking or Staff Escalation",
  "Connected System Updated",
  "Staff Notification When Needed",
]);

const faq = faqAccordion(
  [
    {
      q: "Does an AI receptionist diagnose HVAC problems?",
      a: "No. It collects information \u2014 symptoms described in the caller's own words, system type, property details \u2014 and passes that along. Diagnosing the actual mechanical issue is a technician's job, not the receptionist's.",
    },
    {
      q: "Can it handle two calls at the same time?",
      a: "Yes, that's one of the practical advantages over a single staff member \u2014 it can respond to more than one inquiry at once rather than putting a second caller on hold.",
    },
    {
      q: "Does it work the same with every dispatch or CRM system?",
      a: "No. Integration depth depends on what your specific software supports and how it's configured \u2014 some systems allow direct booking and record updates, others need more manual steps. This is worth confirming specifically for your setup rather than assuming.",
    },
  ],
  `${config.url}/resources/hvac/ai-receptionist-for-hvac-companies-how-it-works/`
);

const related = relatedResources([
  {
    category: "HVAC Automation",
    title: "How AI Can Follow Up With HVAC Leads After Hours",
    href: "/resources/hvac/how-ai-follows-up-with-hvac-leads-after-hours/",
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
    <h1 class="text-3xl md:text-4xl mb-6">AI Receptionist for HVAC Companies: How It Works</h1>

    ${articleMeta("HVAC Automation", DATE_PUBLISHED, DATE_MODIFIED)}

    <p class="text-slate2 text-lg leading-relaxed mb-6">An AI receptionist for an HVAC company answers incoming calls, identifies what the caller needs, collects basic information, and either books an appointment or routes the caller to staff \u2014 following rules your business defines in advance, not judgment it makes on its own.</p>

    <div class="card my-10">
      <p class="text-xs font-head uppercase tracking-wide text-muted mb-4">The general call workflow</p>
      ${wf}
    </div>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">The kinds of inquiries it's built to handle</h2>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-2 list-disc list-inside">
      <li>Repair or service requests</li>
      <li>Maintenance inquiries</li>
      <li>Installation or replacement inquiries</li>
      <li>Scheduling requests</li>
      <li>Service-area questions</li>
      <li>Business-hours questions</li>
      <li>Existing appointment questions</li>
      <li>Urgent or unusual situations \u2014 recognized and routed, not resolved by the AI itself</li>
    </ul>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">What it should not decide</h2>
    <p class="text-slate2 leading-relaxed mb-6">An AI receptionist should not be presented as diagnosing HVAC equipment or determining whether a situation is physically safe. Those are judgment calls for a qualified technician or your business's approved emergency process \u2014 the AI's role is to collect information and route the conversation appropriately, not to make a technical or safety determination itself. Anything urgent, unusual, safety-related, or genuinely out of scope should follow your predefined escalation procedure to a person.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Practical mechanics</h2>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-2 list-disc list-inside">
      <li><strong class="text-ink">After-hours coverage</strong> \u2014 the same assistant can be configured to handle calls outside business hours, following its own defined rules for that context</li>
      <li><strong class="text-ink">Simultaneous inquiries</strong> \u2014 it can respond to more than one caller at once, unlike a single staff member</li>
      <li><strong class="text-ink">Qualification</strong> \u2014 gathering system type, symptoms in the caller's own words, and property details before booking or escalating</li>
      <li><strong class="text-ink">Booking</strong> \u2014 offering available appointment windows where your calendar or dispatch system is connected</li>
      <li><strong class="text-ink">CRM/dispatch integration</strong> \u2014 where supported, it can create or update records automatically; not every software integrates the same way, so this depends on what you actually use</li>
      <li><strong class="text-ink">Human escalation</strong> \u2014 a defined path for anything outside the approved scope</li>
    </ul>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">When things don't go as expected</h2>
    <p class="text-slate2 leading-relaxed mb-6">A failed integration, incorrect or missing information from the caller, or a question outside the assistant's configured knowledge should all be handled the same way: flagged rather than guessed at. A system that quietly makes something up when it doesn't know the answer is worse than one that plainly says it needs to check and follows up.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">FAQ</h2>
    ${faq.html}

    ${related}

    <div class="border-t border-gold/10 pt-8 mt-10">
      <a href="/ai-automation-services/" class="link-inline text-sm block mb-6">See AI Automation Services &rarr;</a>
      <a href="/contact/" class="btn-primary" data-cta="article-hvac-receptionist">${config.ctaPrimary}</a>
    </div>
  </div>
</article>
`;

module.exports = {
  path: "/resources/hvac/ai-receptionist-for-hvac-companies-how-it-works/",
  title: "AI Receptionist for HVAC Companies: How It Works | 2S Business Support Service",
  description:
    "How an AI receptionist handles HVAC calls \u2014 the workflow, inquiry types, what it should never decide, and how integration and failures are handled.",
  h1: "AI Receptionist for HVAC Companies: How It Works",
  content,
  schemas: [
    articleSchema({
      headline: "AI Receptionist for HVAC Companies: How It Works",
      entityName: config.entityName,
      url: config.url,
      mainEntityOfPage: `${config.url}/resources/hvac/ai-receptionist-for-hvac-companies-how-it-works/`,
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
    }),
    faq.schema,
  ],
  breadcrumbs: crumbs,
};
