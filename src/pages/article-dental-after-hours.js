const { visibleBreadcrumbs, workflowDiagram, articleMeta } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources/" },
  {
    name: "AI Receptionists & After-Hours Dental Inquiries",
    href: "/resources/dental/how-ai-receptionists-handle-after-hours-dental-inquiries/",
  },
];

const wf = workflowDiagram("article-workflow-dental-1", [
  "Call or Message at 7:30 PM",
  "AI Greets & Listens",
  "Routine Question Answered",
  "Booking Request Captured",
  "Practice Notified",
  "Front Desk Follows Up",
]);

const content = `
${visibleBreadcrumbs(crumbs)}
<article class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">Dental Automation</p>
    <h1 class="text-3xl md:text-4xl mb-6">How AI Receptionists Handle After-Hours Dental Inquiries</h1>

    ${articleMeta("Dental Automation", null, null)}

    <p class="text-slate2 text-lg leading-relaxed mb-6">A patient calls about a chipped tooth at 7:30 PM, or messages your website asking whether you take their insurance after the front desk has gone home. Missed calls like these are common in dental practices \u2014 and every one is either a new patient or an existing one deciding whether to stay. An AI receptionist can pick up that first message, answer routine questions, and capture enough detail that your team isn't starting from zero the next morning.</p>

    <div class="card my-10">
      <p class="text-xs font-head uppercase tracking-wide text-muted mb-4">A typical after-hours inquiry</p>
      ${wf}
    </div>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">What counts as a "routine question"</h2>
    <p class="text-slate2 leading-relaxed mb-6">Office hours, accepted insurance plans, whether you're taking new patients, general appointment types, and parking or location details are the kinds of questions an AI receptionist can answer directly, using information your practice has approved in advance. Anything about a specific patient's symptoms, pain level, or treatment stays out of scope \u2014 that's a conversation for your clinical team.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Guiding booking-related conversations</h2>
    <p class="text-slate2 leading-relaxed mb-6">For a patient who wants to book, the assistant can collect their name, contact details, reason for the visit in general terms, and preferred timing, then hand that off as a qualified booking request. It doesn't confirm clinical suitability for a procedure \u2014 it gets the request organized so your front desk can follow up with full context already in hand.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Why human handoff still matters</h2>
    <p class="text-slate2 leading-relaxed mb-6">Dental inquiries can turn sensitive quickly \u2014 pain, anxiety, or something that sounds urgent. The assistant is built to recognize when a conversation goes beyond routine front-desk information and hand it to a person, rather than attempt to reassure or advise on anything clinical. Anything that sounds like an emergency is directed to your practice's approved emergency guidance, not handled by the AI.</p>

    <div class="border-t border-gold/10 pt-8 mt-10">
      <p class="text-slate2 mb-4">See this in action, or learn where the line is drawn.</p>
      <a href="/about/#dental-demo" data-nav-event="resource_to_service_nav" class="link-inline text-sm block mb-2">Try the Dental AI Receptionist demo &rarr;</a>
      <a href="/resources/dental/what-a-dental-ai-receptionist-should-and-should-not-answer/" class="link-inline text-sm block mb-2">What a Dental AI Receptionist Should \u2014 and Should Not \u2014 Answer &rarr;</a>
      <a href="/resources/dental/ai-receptionist-cost-dental-practice/" class="link-inline text-sm block mb-6">How Much Does an AI Receptionist Cost for a Dental Practice? &rarr;</a>
      <a href="/contact/" class="btn-primary" data-cta="article-dental-after-hours">${config.ctaPrimary}</a>
    </div>
  </div>
</article>
`;

module.exports = {
  path: "/resources/dental/how-ai-receptionists-handle-after-hours-dental-inquiries/",
  title:
    "How AI Receptionists Handle After-Hours Dental Inquiries",
  description:
    "How an AI receptionist answers routine dental practice questions, guides booking requests, and hands off to your team after hours.",
  h1: "How AI Receptionists Handle After-Hours Dental Inquiries",
  content,
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "How AI Receptionists Handle After-Hours Dental Inquiries",
      author: { "@type": "Organization", name: config.entityName },
      publisher: { "@type": "Organization", name: config.entityName, url: config.url },
      mainEntityOfPage: `${config.url}/resources/dental/how-ai-receptionists-handle-after-hours-dental-inquiries/`,
    },
  ],
  breadcrumbs: crumbs,
};
