const { visibleBreadcrumbs, workflowDiagram, articleMeta } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources/" },
  {
    name: "How AI Follows Up After Hours",
    href: "/resources/roofing/how-ai-follows-up-roofing-leads-after-hours/",
  },
];

const wf = workflowDiagram("article-workflow-1", [
  "Inquiry at 9:42 PM",
  "AI Acknowledgment",
  "Qualification Questions",
  "CRM Record Created",
  "Follow-Up Scheduled",
  "Team Reviews in the Morning",
]);

const content = `
${visibleBreadcrumbs(crumbs)}
<article class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">Roofing Automation</p>
    <h1 class="text-3xl md:text-4xl mb-6">How AI Can Follow Up With Roofing Leads After Hours</h1>

    ${articleMeta("Roofing Automation", null, null)}

    <p class="text-slate2 text-lg leading-relaxed mb-6">Most roofing inquiries don't arrive during business hours. A homeowner researching options after dinner, or after a storm rolls through, is a common source of new leads \u2014 and if nobody responds until the next morning, that lead has often already contacted a competitor. An AI assistant can acknowledge the inquiry, ask a few qualification questions, and update your CRM the moment the lead comes in, so your team starts the next morning with organized information instead of a blank inbox.</p>

    <div class="card my-10">
      <p class="text-xs font-head uppercase tracking-wide text-muted mb-4">A typical after-hours sequence</p>
      ${wf}
    </div>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">What the AI actually does in this window</h2>
    <p class="text-slate2 leading-relaxed mb-6">It responds to confirm the inquiry was received, asks a small number of approved questions (property type, general issue, timeline), and creates or updates the corresponding CRM record. It does not attempt to diagnose roofing problems or provide an estimate \u2014 it collects information and sets expectations for next steps.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Where your team comes in</h2>
    <p class="text-slate2 leading-relaxed mb-6">In the morning, your team reviews the qualified lead and any specifics captured overnight, then follows up to schedule an estimate or answer questions that need professional judgment. The automation's job is to prevent the lead from going cold overnight \u2014 not to replace the conversation your team has with them.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Limitations worth knowing</h2>
    <p class="text-slate2 leading-relaxed mb-6">This only works as well as the systems it's connected to \u2014 it depends on having a working intake channel (form, chat, or compatible calling/messaging system) and a CRM to update. It's designed to support around-the-clock inquiry handling when configured with compatible communication systems, not as a blanket guarantee for every channel.</p>

    <div class="border-t border-gold/10 pt-8 mt-10">
      <p class="text-slate2 mb-4">This is part of 2S's roofing lead follow-up automation.</p>
      <a href="/roofing-lead-follow-up-automation/" data-nav-event="resource_to_service_nav" class="link-inline text-sm block mb-2">See Roofing Lead Follow-Up Automation &rarr;</a>
      <a href="/resources/roofing/how-roofing-companies-can-automate-lead-follow-up/" class="link-inline text-sm block mb-6">How Roofing Companies Can Automate Lead Follow-Up &rarr;</a>
      <a href="/contact/" class="btn-primary" data-cta="article-after-hours">${config.ctaPrimary}</a>
    </div>
  </div>
</article>
`;

module.exports = {
  path: "/resources/roofing/how-ai-follows-up-roofing-leads-after-hours/",
  title:
    "How AI Can Follow Up With Roofing Leads After Hours | 2S Business Support Service",
  description:
    "What happens when a roofing inquiry comes in after hours, and how AI-assisted acknowledgment and qualification keep the lead from going cold overnight.",
  h1: "How AI Can Follow Up With Roofing Leads After Hours",
  content,
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "How AI Can Follow Up With Roofing Leads After Hours",
      author: { "@type": "Organization", name: config.entityName },
      publisher: { "@type": "Organization", name: config.entityName, url: config.url },
      mainEntityOfPage: `${config.url}/resources/roofing/how-ai-follows-up-roofing-leads-after-hours/`,
    },
  ],
  breadcrumbs: crumbs,
};
