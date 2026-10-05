const { visibleBreadcrumbs, workflowDiagram, faqAccordion, articleMeta, relatedResources, articleSchema } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources/" },
  {
    name: "HVAC Lead Follow-Up Automation Explained",
    href: "/resources/hvac/hvac-lead-follow-up-automation-explained/",
  },
];

const DATE_PUBLISHED = null;
const DATE_MODIFIED = null;

const wf = workflowDiagram("article-workflow-hvac-followup-explained", [
  "New Lead",
  "Lead Record Created",
  "Source Recorded",
  "Immediate Acknowledgment",
  "Qualification",
  "Follow-Up Sequence",
  "Booking / Estimate / Service Request",
  "Pipeline Updated",
  "Sequence Stops or Escalates",
]);

const faq = faqAccordion(
  [
    {
      q: "Does follow-up automation work the same for every lead source?",
      a: "No. A website form usually arrives with structured details already filled in, while a missed call or a social inquiry often needs more information gathered before it can move forward \u2014 the automation for each source needs to account for that difference.",
    },
    {
      q: "What stops the follow-up messages once someone responds?",
      a: "A reply should be recognized and change the sequence's state \u2014 if the customer replies, the automation should not continue behaving as if no conversation has happened. If staff manually take over, automated messages should pause where appropriate.",
    },
    {
      q: "How is this different from the after-hours or receptionist articles?",
      a: "This article covers what happens after a lead already exists in your system \u2014 the follow-up, qualification, and pipeline mechanics \u2014 rather than how the initial call or after-hours response itself is handled.",
    },
  ],
  `${config.url}/resources/hvac/hvac-lead-follow-up-automation-explained/`
);

const related = relatedResources([
  {
    category: "HVAC Automation",
    title: "AI Receptionist for HVAC Companies: How It Works",
    href: "/resources/hvac/ai-receptionist-for-hvac-companies-how-it-works/",
  },
  {
    category: "HVAC Automation",
    title: "What Happens When an HVAC Lead Doesn't Book Right Away?",
    href: "/resources/hvac/what-happens-when-an-hvac-lead-does-not-book-right-away/",
  },
]);

const content = `
${visibleBreadcrumbs(crumbs)}
<article class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">HVAC Automation</p>
    <h1 class="text-3xl md:text-4xl mb-6">HVAC Lead Follow-Up Automation Explained</h1>

    ${articleMeta("HVAC Automation", DATE_PUBLISHED, DATE_MODIFIED)}

    <p class="text-slate2 text-lg leading-relaxed mb-6">Once an HVAC lead exists in your system \u2014 from a call, a form, or a referral \u2014 follow-up automation is what keeps it moving: acknowledging it, qualifying it, following up on a defined schedule, and updating your pipeline as it progresses, without someone having to manually track every lead by hand.</p>

    <div class="card my-10">
      <p class="text-xs font-head uppercase tracking-wide text-muted mb-4">A realistic follow-up workflow</p>
      ${wf}
    </div>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Where leads come from, and why it matters</h2>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-2 list-disc list-inside">
      <li><strong class="text-ink">Website form leads</strong> \u2014 typically arrive with structured details already captured</li>
      <li><strong class="text-ink">Missed-call leads</strong> \u2014 need information gathered through a callback or a text-back flow</li>
      <li><strong class="text-ink">Social inquiries</strong> \u2014 where applicable, often brief and need qualification before they're actionable</li>
      <li><strong class="text-ink">Referral or manually entered leads</strong> \u2014 still need to enter the same tracked process as any other lead</li>
    </ul>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">What the follow-up sequence actually does</h2>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-2 list-disc list-inside">
      <li><strong class="text-ink">SMS follow-up</strong> \u2014 short, direct check-ins at defined intervals</li>
      <li><strong class="text-ink">Email follow-up</strong> \u2014 for leads where email is the better channel or a supplement to text</li>
      <li><strong class="text-ink">Booking links or workflows</strong> \u2014 letting the lead pick a time directly where that's supported</li>
      <li><strong class="text-ink">CRM updates</strong> \u2014 reflecting the lead's actual current status, not a stale one</li>
      <li><strong class="text-ink">Staff tasks</strong> \u2014 created automatically when something needs a person's attention</li>
    </ul>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Why stopping conditions are essential</h2>
    <p class="text-slate2 leading-relaxed mb-6">A follow-up sequence that doesn't know when to stop becomes a liability. If the customer books, the system shouldn't keep sending booking prompts. If the customer replies, automation shouldn't continue as if no conversation has occurred. If staff manually take over the conversation, automated messages should pause where appropriate rather than talking over a real person. These aren't edge cases \u2014 they're the normal, expected situations any real sequence needs to handle correctly.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Handling the exceptions</h2>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-2 list-disc list-inside">
      <li><strong class="text-ink">No-response handling</strong> \u2014 a defined number of attempts, then the lead's status changes rather than the sequence running forever</li>
      <li><strong class="text-ink">Failed-delivery handling</strong> \u2014 a bounced message should be flagged, not silently treated as sent</li>
      <li><strong class="text-ink">Opt-outs</strong> \u2014 respected immediately and recorded</li>
      <li><strong class="text-ink">Duplicate prevention</strong> \u2014 checking for an existing record before creating a new one for the same person</li>
      <li><strong class="text-ink">Manual override</strong> \u2014 staff should always be able to pause, redirect, or take over a lead's automation directly</li>
    </ul>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">FAQ</h2>
    ${faq.html}

    ${related}

    <div class="border-t border-gold/10 pt-8 mt-10">
      <a href="/ai-automation-services/" class="link-inline text-sm block mb-6">See AI Automation Services &rarr;</a>
      <a href="/contact/" class="btn-primary" data-cta="article-hvac-followup-explained">${config.ctaPrimary}</a>
    </div>
  </div>
</article>
`;

module.exports = {
  path: "/resources/hvac/hvac-lead-follow-up-automation-explained/",
  title: "HVAC Lead Follow-Up Automation Explained | 2S Business Support Service",
  description:
    "What happens after an HVAC lead is captured \u2014 qualification, follow-up sequences, stopping conditions, and pipeline updates.",
  h1: "HVAC Lead Follow-Up Automation Explained",
  content,
  schemas: [
    articleSchema({
      headline: "HVAC Lead Follow-Up Automation Explained",
      entityName: config.entityName,
      url: config.url,
      mainEntityOfPage: `${config.url}/resources/hvac/hvac-lead-follow-up-automation-explained/`,
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
    }),
    faq.schema,
  ],
  breadcrumbs: crumbs,
};
