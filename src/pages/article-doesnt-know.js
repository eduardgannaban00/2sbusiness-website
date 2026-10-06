const { visibleBreadcrumbs, articleMeta } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources/" },
  {
    name: "When the AI Doesn't Know the Answer",
    href: "/resources/roofing/what-happens-when-roofing-ai-doesnt-know-the-answer/",
  },
];

const content = `
${visibleBreadcrumbs(crumbs)}
<article class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">Roofing Automation</p>
    <h1 class="text-3xl md:text-4xl mb-6">What Happens When a Roofing AI Assistant Doesn't Know the Answer?</h1>

    ${articleMeta("Roofing Automation", null, null)}

    <p class="text-slate2 text-lg leading-relaxed mb-6">An AI assistant is only given approved information to work with \u2014 common questions, scheduling logic, and qualification questions your team has signed off on. When a homeowner asks something outside that scope \u2014 a technical roofing question, a pricing edge case, or anything requiring judgment \u2014 the assistant is designed to recognize that and hand the conversation to a person, rather than guess.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Why this matters</h2>
    <p class="text-slate2 leading-relaxed mb-6">A confidently wrong answer about roofing materials, timelines, or pricing can cost more trust than a slower but accurate one. The assistant's boundaries are defined deliberately \u2014 it operates within an approved question-and-answer scope, and anything outside that scope is treated as an escalation, not a guess.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">What escalation actually looks like</h2>
    <p class="text-slate2 leading-relaxed mb-6">The conversation is flagged for a team member, with the context already captured \u2014 what the homeowner asked, what's already been discussed, and any information collected so far. The homeowner isn't left without a response; they're told a team member will follow up, and that handoff is logged in your CRM so nothing gets lost between the automated and human parts of the conversation.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Setting the boundary correctly</h2>
    <p class="text-slate2 leading-relaxed mb-6">This requires deciding upfront which questions are safe for the assistant to answer and which should always go to a person \u2014 for example, general scheduling and common FAQs versus anything about roof condition, safety, or final pricing. Getting that boundary right is part of setting the system up, not something left to chance.</p>

    <div class="border-t border-gold/10 pt-8 mt-10">
      <p class="text-slate2 mb-4">This escalation behavior is built into 2S's roofing AI assistant setup.</p>
      <a href="/ai-assistant-for-roofing-companies/" data-nav-event="resource_to_service_nav" class="link-inline text-sm block mb-2">See AI Assistant for Roofing Companies &rarr;</a>
      <a href="/resources/roofing/roofing-crm-and-lead-follow-up-automation-explained/" class="link-inline text-sm block mb-6">Roofing CRM and Lead Follow-Up Automation Explained &rarr;</a>
      <a href="/contact/" class="btn-secondary" data-cta="article-doesnt-know-secondary">Talk to Us About This</a>
    </div>
  </div>
</article>
`;

module.exports = {
  path: "/resources/roofing/what-happens-when-roofing-ai-doesnt-know-the-answer/",
  title:
    "What Happens When a Roofing AI Assistant Doesn't Know the Answer?",
  description:
    "How escalation and human handoff work when a roofing AI assistant reaches the edge of its approved scope.",
  h1: "What Happens When a Roofing AI Assistant Doesn't Know the Answer?",
  content,
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "What Happens When a Roofing AI Assistant Doesn't Know the Answer?",
      author: { "@type": "Organization", name: config.entityName },
      publisher: { "@type": "Organization", name: config.entityName, url: config.url },
      mainEntityOfPage: `${config.url}/resources/roofing/what-happens-when-roofing-ai-doesnt-know-the-answer/`,
    },
  ],
  breadcrumbs: crumbs,
};
