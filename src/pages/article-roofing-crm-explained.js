const { visibleBreadcrumbs, workflowDiagram, faqAccordion, articleMeta, relatedResources, articleSchema } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources/" },
  {
    name: "Roofing CRM and Lead Follow-Up Automation Explained",
    href: "/resources/roofing/roofing-crm-and-lead-follow-up-automation-explained/",
  },
];

const DATE_PUBLISHED = null;
const DATE_MODIFIED = null;

const wf = workflowDiagram("article-workflow-roofing-crm-pipeline", [
  "New Lead",
  "Contact Attempted",
  "Qualified",
  "Inspection / Estimate Scheduled",
  "Estimate Sent",
  "Follow-Up",
  "Won / Lost",
]);

const faq = faqAccordion(
  [
    {
      q: "Is a CRM the same thing as lead follow-up automation?",
      a: "No. A CRM is where lead and pipeline information is stored and tracked. Automation is what acts on that information \u2014 sending messages, creating tasks, updating stages. A CRM can exist without automation, but automation needs somewhere like a CRM to track state.",
    },
    {
      q: "Does 2S use GoHighLevel?",
      a: "Yes, GoHighLevel is one of the platforms 2S builds roofing CRM and automation workflows on, alongside other tools depending on what a specific business already uses.",
    },
    {
      q: "What if a lead doesn't fit neatly into one pipeline stage?",
      a: "That's normal, and it's exactly the kind of situation where manual override matters \u2014 a person should always be able to move a lead, pause a sequence, or add a note, rather than being locked into whatever the automation assumed would happen.",
    },
  ],
  `${config.url}/resources/roofing/roofing-crm-and-lead-follow-up-automation-explained/`
);

const related = relatedResources([
  {
    category: "Roofing Automation",
    title: "How Roofing Companies Can Automate Lead Follow-Up",
    href: "/resources/roofing/how-roofing-companies-can-automate-lead-follow-up/",
  },
  {
    category: "Roofing Automation",
    title: "What Happens When a Roofing AI Assistant Doesn't Know the Answer?",
    href: "/resources/roofing/what-happens-when-roofing-ai-doesnt-know-the-answer/",
  },
]);

const stageTable = `
<div class="article-table-wrap">
  <table class="article-table">
    <caption class="sr-only">Roofing pipeline stages and suitable automation actions</caption>
    <thead>
      <tr>
        <th scope="col">Pipeline Stage</th>
        <th scope="col">What Automation Can Do Here</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="font-head font-semibold text-ink">New Lead</td>
        <td>Create the record, assign an owner, send an acknowledgment</td>
      </tr>
      <tr>
        <td class="font-head font-semibold text-ink">Contact Attempted</td>
        <td>Create a follow-up task, trigger an SMS/email sequence</td>
      </tr>
      <tr>
        <td class="font-head font-semibold text-ink">Qualified</td>
        <td>Offer available scheduling options for an inspection or estimate</td>
      </tr>
      <tr>
        <td class="font-head font-semibold text-ink">Inspection / Estimate Scheduled</td>
        <td>Send appointment reminders, update the status once completed</td>
      </tr>
      <tr>
        <td class="font-head font-semibold text-ink">Estimate Sent</td>
        <td>Trigger a follow-up sequence, notify staff if there's no response</td>
      </tr>
      <tr>
        <td class="font-head font-semibold text-ink">Follow-Up</td>
        <td>Continue scheduled check-ins until a defined stopping point</td>
      </tr>
      <tr>
        <td class="font-head font-semibold text-ink">Won / Lost</td>
        <td>Stop active sequences, log the outcome, optionally trigger a longer-term nurture path for "lost"</td>
      </tr>
    </tbody>
  </table>
</div>`;

const content = `
${visibleBreadcrumbs(crumbs)}
<article class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">Roofing Automation</p>
    <h1 class="text-3xl md:text-4xl mb-6">Roofing CRM and Lead Follow-Up Automation Explained</h1>

    ${articleMeta("Roofing Automation", DATE_PUBLISHED, DATE_MODIFIED)}

    <p class="text-slate2 text-lg leading-relaxed mb-6">A CRM (customer relationship management system) is where a roofing company tracks leads as they move through a pipeline, from first contact to won or lost. Lead follow-up automation connects to that pipeline and acts on it \u2014 sending messages, creating tasks, and updating stages \u2014 so the pipeline reflects reality without someone manually updating every record by hand.</p>

    <div class="card my-10">
      <p class="text-xs font-head uppercase tracking-wide text-muted mb-4">A practical roofing pipeline</p>
      ${wf}
    </div>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">What automation can do at each stage</h2>
    ${stageTable}

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Why stopping conditions matter</h2>
    <p class="text-slate2 leading-relaxed mb-6">Automation without a stopping condition becomes a liability instead of a convenience. If a homeowner already booked an inspection, the system should not keep sending "book your inspection" messages \u2014 that reads as sloppy at best and can actively damage trust. A well-built sequence stops or changes course the moment someone replies, books, or opts out, rather than running on a fixed schedule regardless of what's actually happened.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Duplicate leads and stale records</h2>
    <p class="text-slate2 leading-relaxed mb-6">The same homeowner can end up in the system twice \u2014 once from a form submission and again from a follow-up phone call, for example \u2014 if there's no check for an existing record by phone number, email, or address. Similarly, leads that go quiet need a defined "stale" status rather than sitting indefinitely in an active-looking stage, which can make the pipeline look busier or more current than it actually is.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Manual override always matters</h2>
    <p class="text-slate2 leading-relaxed mb-6">No automated pipeline handles every situation correctly. A staff member should always be able to move a lead between stages, pause or stop a sequence, or add context manually \u2014 automation should support that judgment, not replace it.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">A note on platforms</h2>
    <p class="text-slate2 leading-relaxed mb-6">2S builds these workflows on GoHighLevel, among other platforms, depending on what a business already uses or prefers. The pipeline logic described above applies regardless of the specific CRM behind it \u2014 the platform is the tool, not the point.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">FAQ</h2>
    ${faq.html}

    ${related}

    <div class="border-t border-gold/10 pt-8 mt-10">
      <a href="/roofing-lead-follow-up-automation/" class="link-inline text-sm block mb-2">See 2S's Roofing Lead Follow-Up Automation service &rarr;</a>
      <a href="/industries/roofing/" class="link-inline text-sm block mb-6">See Roofing Automation overview &rarr;</a>
      <a href="/contact/" class="btn-primary" data-cta="article-roofing-crm">${config.ctaPrimary}</a>
    </div>
  </div>
</article>
`;

module.exports = {
  path: "/resources/roofing/roofing-crm-and-lead-follow-up-automation-explained/",
  title: "Roofing CRM and Lead Follow-Up Automation Explained | 2S Business Support Service",
  description:
    "What a CRM does in a roofing lead pipeline, how automation connects to each stage, and why stopping conditions and manual override matter.",
  h1: "Roofing CRM and Lead Follow-Up Automation Explained",
  content,
  schemas: [
    articleSchema({
      headline: "Roofing CRM and Lead Follow-Up Automation Explained",
      entityName: config.entityName,
      url: config.url,
      mainEntityOfPage: `${config.url}/resources/roofing/roofing-crm-and-lead-follow-up-automation-explained/`,
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
    }),
    faq.schema,
  ],
  breadcrumbs: crumbs,
};
