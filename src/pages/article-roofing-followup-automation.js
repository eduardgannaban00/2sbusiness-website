const { visibleBreadcrumbs, workflowDiagram, faqAccordion, articleMeta, relatedResources, articleSchema } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources/" },
  {
    name: "How Roofing Companies Can Automate Lead Follow-Up",
    href: "/resources/roofing/how-roofing-companies-can-automate-lead-follow-up/",
  },
];

const DATE_PUBLISHED = null;
const DATE_MODIFIED = null;

const wf = workflowDiagram("article-workflow-roofing-followup", [
  "New Lead",
  "Lead Captured",
  "Source Recorded",
  "Basic Qualification",
  "Immediate Acknowledgment",
  "Follow-Up Sequence",
  "Estimate / Inspection Request",
  "Appointment",
  "CRM Pipeline Updated",
  "Human Follow-Up When Needed",
]);

const faq = faqAccordion(
  [
    {
      q: "Does automated follow-up work the same for every lead source?",
      a: "No. A website form typically arrives with more structured information than a phone call or a Google Business Profile message, so the automation for each source needs to be set up around what information is actually available at the start.",
    },
    {
      q: "What happens if a lead doesn't respond to any follow-up message?",
      a: "A defined sequence should have an end point \u2014 after a set number of attempts with no response, the lead's status is typically marked accordingly and follow-up either stops or shifts to a longer-term, lower-frequency check-in rather than continuing indefinitely.",
    },
    {
      q: "Can the same lead get contacted twice by mistake?",
      a: "That's a duplicate-lead problem, and it's worth asking directly how a given system checks for existing records \u2014 by phone number, email, or address \u2014 before creating a new one, since not every setup handles this the same way.",
    },
  ],
  `${config.url}/resources/roofing/how-roofing-companies-can-automate-lead-follow-up/`
);

const related = relatedResources([
  {
    category: "Roofing Automation",
    title: "What Happens When a Roofing Lead Is Not Contacted Quickly?",
    href: "/resources/roofing/what-happens-when-a-roofing-lead-is-not-contacted-quickly/",
  },
  {
    category: "Roofing Automation",
    title: "Roofing CRM and Lead Follow-Up Automation Explained",
    href: "/resources/roofing/roofing-crm-and-lead-follow-up-automation-explained/",
  },
]);

const content = `
${visibleBreadcrumbs(crumbs)}
<article class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">Roofing Automation</p>
    <h1 class="text-3xl md:text-4xl mb-6">How Roofing Companies Can Automate Lead Follow-Up</h1>

    ${articleMeta("Roofing Automation", DATE_PUBLISHED, DATE_MODIFIED)}

    <p class="text-slate2 text-lg leading-relaxed mb-6">Automating roofing lead follow-up means building a defined path for every new inquiry \u2014 capture, acknowledgment, qualification, follow-up, and scheduling \u2014 so leads move forward consistently instead of depending on whoever happens to check the inbox that day. Here's a realistic version of what that workflow looks like in practice.</p>

    <div class="card my-10">
      <p class="text-xs font-head uppercase tracking-wide text-muted mb-4">A realistic follow-up workflow</p>
      ${wf}
    </div>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Where roofing leads actually come from</h2>
    <p class="text-slate2 leading-relaxed mb-6">A workflow needs to account for more than one source, since each behaves differently:</p>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-2 list-disc list-inside">
      <li><strong class="text-ink">Website forms</strong> \u2014 usually arrive with structured details already filled in</li>
      <li><strong class="text-ink">Phone calls</strong> \u2014 information depends entirely on what's captured during or after the call</li>
      <li><strong class="text-ink">Google Business Profile inquiries</strong> \u2014 where applicable, often short messages with minimal context</li>
      <li><strong class="text-ink">Social inquiries</strong> \u2014 similarly brief, and platform-dependent in how they're received</li>
      <li><strong class="text-ink">Referral leads</strong> \u2014 often warmer, but still need to enter the same tracked process</li>
      <li><strong class="text-ink">Manually entered leads</strong> \u2014 from a trade show, a door-knock, or a paper intake sheet</li>
    </ul>
    <p class="text-slate2 leading-relaxed mb-6">Not every integration handles all of these identically \u2014 a form-to-CRM connection is usually more reliable than parsing a phone call, for example, so it's worth being specific with whoever sets this up about which sources actually need to be covered.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">What's reasonable to automate</h2>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-2 list-disc list-inside">
      <li>Recording the lead and its source the moment it arrives</li>
      <li>Sending an immediate acknowledgment so the homeowner knows they were heard</li>
      <li>Asking a small number of basic qualification questions (property type, general issue, timeline)</li>
      <li>Running a defined SMS/email follow-up sequence with a clear number of attempts</li>
      <li>Offering available times for an estimate or inspection</li>
      <li>Updating the CRM pipeline stage as the lead progresses</li>
    </ul>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">What should stay human</h2>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-2 list-disc list-inside">
      <li>Actual roofing assessments, technical questions, and pricing judgment calls</li>
      <li>Anything that sounds urgent, unusual, or outside the approved script</li>
      <li>Final decisions on how to handle an upset or difficult conversation</li>
    </ul>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Operational details that matter</h2>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-2 list-disc list-inside">
      <li><strong class="text-ink">Failed-delivery handling</strong> \u2014 a bounced text or email should be flagged, not silently treated as delivered</li>
      <li><strong class="text-ink">No-response handling</strong> \u2014 the sequence needs a defined end point rather than continuing indefinitely</li>
      <li><strong class="text-ink">Opt-out handling</strong> \u2014 a request to stop contact needs to be respected immediately and recorded</li>
      <li><strong class="text-ink">Escalation</strong> \u2014 a clear path for routing anything outside the automated scope to a person</li>
      <li><strong class="text-ink">Duplicate lead prevention</strong> \u2014 checking for an existing record before creating a new one, so the same person isn't contacted twice as if they were new</li>
    </ul>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">FAQ</h2>
    ${faq.html}

    ${related}

    <div class="border-t border-gold/10 pt-8 mt-10">
      <a href="/roofing-lead-follow-up-automation/" class="link-inline text-sm block mb-2">See 2S's Roofing Lead Follow-Up Automation service &rarr;</a>
      <a href="/ai-assistant-for-roofing-companies/" data-nav-event="resource_to_service_nav" class="link-inline text-sm block mb-6">See AI Assistant for Roofing Companies &rarr;</a>
      <a href="/contact/" class="btn-primary" data-cta="article-roofing-followup">${config.ctaPrimary}</a>
    </div>
  </div>
</article>
`;

module.exports = {
  path: "/resources/roofing/how-roofing-companies-can-automate-lead-follow-up/",
  title: "How Roofing Companies Can Automate Lead Follow-Up",
  description:
    "A realistic workflow for automating roofing lead follow-up \u2014 lead sources, what to automate, what stays human, and operational details like opt-outs and duplicates.",
  h1: "How Roofing Companies Can Automate Lead Follow-Up",
  content,
  schemas: [
    articleSchema({
      headline: "How Roofing Companies Can Automate Lead Follow-Up",
      entityName: config.entityName,
      url: config.url,
      mainEntityOfPage: `${config.url}/resources/roofing/how-roofing-companies-can-automate-lead-follow-up/`,
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
    }),
    faq.schema,
  ],
  breadcrumbs: crumbs,
};
