const { visibleBreadcrumbs, articleMeta } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources/" },
  {
    name: "When an HVAC Lead Doesn't Book Right Away",
    href: "/resources/hvac/what-happens-when-an-hvac-lead-does-not-book-right-away/",
  },
];

const content = `
${visibleBreadcrumbs(crumbs)}
<article class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">HVAC Automation</p>
    <h1 class="text-3xl md:text-4xl mb-6">What Happens When an HVAC Lead Doesn't Book Right Away?</h1>

    ${articleMeta("HVAC Automation", null, null)}

    <p class="text-slate2 text-lg leading-relaxed mb-6">Not every HVAC inquiry turns into a same-call booking. Someone might be comparing quotes, waiting on a decision from a spouse, or just not ready to commit yet. The risk isn't that they said no \u2014 it's that the lead quietly disappears from view and nobody follows up again.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Giving the lead a status, not a dead end</h2>
    <p class="text-slate2 leading-relaxed mb-6">Instead of a lead simply sitting in an inbox as "unanswered," a structured workflow assigns it a status \u2014 for example, quoted, considering, or needs follow-up \u2014 so it's clear at a glance where things stand and what the next action is.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Automated reminders, human timing</h2>
    <p class="text-slate2 leading-relaxed mb-6">A follow-up sequence can check back at reasonable intervals \u2014 a few days, then a couple of weeks \u2014 with a simple message asking if they'd like to move forward or have questions. The system handles the reminder; your team still makes the call on how to actually re-engage someone who responds.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Avoiding forgotten inquiries</h2>
    <p class="text-slate2 leading-relaxed mb-6">The practical goal is simple: no lead should go quiet just because it didn't convert on the first contact. Whether that lead eventually books or not, having a visible record of what was offered and when the last follow-up happened means nothing gets lost by accident.</p>

    <div class="border-t border-gold/10 pt-8 mt-10">
      <p class="text-slate2 mb-4">Related reading and next steps.</p>
      <a href="/industries/hvac/" data-nav-event="resource_to_service_nav" class="link-inline text-sm block mb-2">See HVAC AI Receptionist &amp; Lead Follow-Up Automation &rarr;</a>
      <a href="/resources/hvac/how-ai-follows-up-with-hvac-leads-after-hours/" data-nav-event="resource_to_service_nav" class="link-inline text-sm block mb-2">How AI Can Follow Up With HVAC Leads After Hours &rarr;</a>
      <a href="/resources/hvac/hvac-lead-follow-up-automation-explained/" class="link-inline text-sm block mb-2">HVAC Lead Follow-Up Automation Explained &rarr;</a>
      <a href="/ai-automation-services/" class="link-inline text-sm block mb-6">See AI Automation Services &rarr;</a>
      <a href="/contact/" class="btn-primary" data-cta="article-hvac-followup">${config.ctaPrimary}</a>
    </div>
  </div>
</article>
`;

module.exports = {
  path: "/resources/hvac/what-happens-when-an-hvac-lead-does-not-book-right-away/",
  title:
    "What Happens When an HVAC Lead Doesn't Book Right Away?",
  description:
    "How structured follow-up keeps HVAC leads that don't book immediately from being forgotten.",
  h1: "What Happens When an HVAC Lead Doesn't Book Right Away?",
  content,
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "What Happens When an HVAC Lead Doesn't Book Right Away?",
      author: { "@type": "Organization", name: config.entityName },
      publisher: { "@type": "Organization", name: config.entityName, url: config.url },
      mainEntityOfPage: `${config.url}/resources/hvac/what-happens-when-an-hvac-lead-does-not-book-right-away/`,
    },
  ],
  breadcrumbs: crumbs,
};
