const { visibleBreadcrumbs, faqAccordion, articleMeta } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources/" },
  {
    name: "What a Dental AI Receptionist Should Answer",
    href: "/resources/dental/what-a-dental-ai-receptionist-should-and-should-not-answer/",
  },
];

const faq = faqAccordion(
  [
    {
      q: "Can a dental AI receptionist answer insurance questions?",
      a: "It can answer general, practice-approved information \u2014 such as which insurance plans your office accepts \u2014 but not determine an individual patient's specific coverage or costs, which require verification by your team.",
    },
    {
      q: "Can it tell a patient what's wrong with their tooth?",
      a: "No. Diagnosis and clinical assessment are never in scope for administrative front-desk automation, regardless of how the question is phrased.",
    },
    {
      q: "What happens if someone describes a dental emergency?",
      a: "The assistant is designed to direct the caller to your practice's approved emergency guidance \u2014 for example, contacting an on-call provider or, for serious emergencies, appropriate emergency services \u2014 rather than attempting to assess the situation itself.",
    },
  ],
  `${config.url}/resources/dental/what-a-dental-ai-receptionist-should-and-should-not-answer/`
);

const content = `
${visibleBreadcrumbs(crumbs)}
<article class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">Dental Automation</p>
    <h1 class="text-3xl md:text-4xl mb-6">What a Dental AI Receptionist Should \u2014 and Should Not \u2014 Answer</h1>

    ${articleMeta("Dental Automation", null, null)}

    <p class="text-slate2 text-lg leading-relaxed mb-6">The most important design decision in a dental AI receptionist isn't what it can do \u2014 it's where it stops. Front-desk automation works well for administrative tasks and breaks down fast if it's allowed to drift into anything clinical. Drawing that line clearly, before the assistant goes live, is what keeps it useful and safe.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">What the AI can handle</h2>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-2 list-disc list-inside">
      <li>Approved business and practice information \u2014 hours, location, accepted insurance, services offered</li>
      <li>Booking-related help \u2014 collecting patient details, reason for visit in general terms, and preferred timing</li>
      <li>Gathering basic inquiry details so your front desk has context before calling back</li>
    </ul>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">What it should never attempt</h2>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-2 list-disc list-inside">
      <li>Diagnosing a condition or symptom, however minor it sounds</li>
      <li>Giving emergency medical guidance beyond directing the caller to your practice's approved emergency process</li>
      <li>Making judgment calls on treatment urgency, cost estimates, or clinical suitability</li>
    </ul>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">When it should hand off to a person</h2>
    <p class="text-slate2 leading-relaxed mb-6">Any request that's uncertain, sensitive, or outside the approved script \u2014 not just clear emergencies \u2014 should route to your team. The goal isn't to make the assistant sound confident about everything; it's to make sure it recognizes its own limits reliably and escalates rather than guesses.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">FAQ</h2>
    ${faq.html}

    <div class="border-t border-gold/10 pt-8 mt-10">
      <p class="text-slate2 mb-4">See this scope in practice.</p>
      <a href="/about/#dental-demo" data-nav-event="resource_to_service_nav" class="link-inline text-sm block mb-2">Try the Dental AI Receptionist demo &rarr;</a>
      <a href="/resources/dental/how-ai-receptionists-handle-after-hours-dental-inquiries/" class="link-inline text-sm block mb-2">How AI Receptionists Handle After-Hours Dental Inquiries &rarr;</a>
      <a href="/resources/dental/ai-receptionist-vs-traditional-receptionist-dentists/" class="link-inline text-sm block mb-6">AI Receptionist vs Traditional Receptionist for Dentists &rarr;</a>
      <a href="/contact/" class="btn-primary" data-cta="article-dental-scope">${config.ctaPrimary}</a>
    </div>
  </div>
</article>
`;

module.exports = {
  path: "/resources/dental/what-a-dental-ai-receptionist-should-and-should-not-answer/",
  title:
    "What a Dental AI Receptionist Should — and Should Not — Answer",
  description:
    "Where administrative dental front-desk automation ends and clinical advice begins, and when a conversation should escalate to your team.",
  h1: "What a Dental AI Receptionist Should — and Should Not — Answer",
  content,
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "What a Dental AI Receptionist Should — and Should Not — Answer",
      author: { "@type": "Organization", name: config.entityName },
      publisher: { "@type": "Organization", name: config.entityName, url: config.url },
      mainEntityOfPage: `${config.url}/resources/dental/what-a-dental-ai-receptionist-should-and-should-not-answer/`,
    },
    faq.schema,
  ],
  breadcrumbs: crumbs,
};
