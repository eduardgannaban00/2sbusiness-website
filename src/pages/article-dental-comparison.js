const { visibleBreadcrumbs, faqAccordion, articleMeta, relatedResources, articleSchema } = require("../partials/ui");
const config = require("../data/site-config");
const { getPublicDemoUrl } = require("../data/demo-registry");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources/" },
  {
    name: "AI vs Traditional Receptionist for Dentists",
    href: "/resources/dental/ai-receptionist-vs-traditional-receptionist-dentists/",
  },
];

// Pre-launch: no real public go-live date yet. See articleSchema() in
// src/partials/ui.js and the Phase 8 report.
const DATE_PUBLISHED = null;
const DATE_MODIFIED = null;

const faq = faqAccordion(
  [
    {
      q: "Do I have to choose one or the other?",
      a: "No \u2014 most practices that use an AI receptionist keep their front desk team and use the AI to handle overflow, after-hours contact, and routine questions, rather than replacing staff entirely.",
    },
    {
      q: "Can an AI receptionist handle a genuine emergency?",
      a: "It can recognize when something sounds urgent and direct the caller to your practice's approved emergency process, but it shouldn't be relied on to assess or handle the emergency itself \u2014 that stays with your team.",
    },
    {
      q: "Which one is 'better'?",
      a: "Neither is universally better \u2014 they're suited to different parts of the job. Most practices get the most value from combining both rather than picking one.",
    },
  ],
  `${config.url}/resources/dental/ai-receptionist-vs-traditional-receptionist-dentists/`
);

const related = relatedResources([
  {
    category: "Dental Automation",
    title: "How Much Does an AI Receptionist Cost for a Dental Practice?",
    href: "/resources/dental/ai-receptionist-cost-dental-practice/",
  },
  {
    category: "Dental Automation",
    title: "What a Dental AI Receptionist Should \u2014 and Should Not \u2014 Answer",
    href: "/resources/dental/what-a-dental-ai-receptionist-should-and-should-not-answer/",
  },
]);

const comparisonRows = [
  ["After-hours routine inquiries", "Available", "Typically unavailable outside office hours"],
  ["Simultaneous inquiries", "Can handle more than one at once", "One at a time"],
  ["Routine FAQs", "Consistent, instant, available anytime", "Consistent when available; depends on staffing"],
  ["Standard booking workflows", "Handles well within its configured scope", "Handles well, including ad hoc adjustments"],
  ["Complex judgment calls", "Limited to what it's been configured for", "Strong \u2014 this is a core strength"],
  ["Sensitive or emotional conversations", "Should recognize and escalate to a person", "Strong \u2014 this is a core strength"],
  ["Unusual scheduling exceptions", "Limited unless specifically configured for it", "Strong \u2014 can adapt case by case"],
  ["Physical front-desk work", "Not applicable", "Required"],
];

const comparisonTable = `
<div class="article-table-wrap">
  <table class="article-table">
    <caption class="sr-only">Comparison of tasks handled by AI and human receptionists</caption>
    <thead>
      <tr>
        <th scope="col">Task</th>
        <th scope="col">AI Receptionist</th>
        <th scope="col">Human Receptionist</th>
      </tr>
    </thead>
    <tbody>
      ${comparisonRows
        .map(
          (r) => `
      <tr>
        <td class="font-head font-semibold text-ink">${r[0]}</td>
        <td>${r[1]}</td>
        <td>${r[2]}</td>
      </tr>`
        )
        .join("\n")}
    </tbody>
  </table>
</div>`;

const content = `
${visibleBreadcrumbs(crumbs)}
<article class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">Dental Automation</p>
    <h1 class="text-3xl md:text-4xl mb-6">AI Receptionist vs Traditional Receptionist for Dentists</h1>

    ${articleMeta("Dental Automation", DATE_PUBLISHED, DATE_MODIFIED)}

    <p class="text-slate2 text-lg leading-relaxed mb-6">An AI receptionist and a human receptionist are good at different things. The practical question for most dental practices isn't which one to choose \u2014 it's which parts of front-desk work make sense to automate, and which parts genuinely need a person. Here's a direct comparison of both, by task.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Side-by-side comparison</h2>
    ${comparisonTable}

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Where an AI receptionist has a real advantage</h2>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-2 list-disc list-inside">
      <li><strong class="text-ink">Availability</strong> \u2014 it can respond to inquiries after hours, on weekends, or during lunch breaks, when no staff member is at the desk</li>
      <li><strong class="text-ink">Consistency</strong> \u2014 it answers approved questions the same way every time, without variation based on who happens to pick up</li>
      <li><strong class="text-ink">Simultaneous handling</strong> \u2014 it can respond to more than one inquiry at once, where a single staff member cannot</li>
      <li><strong class="text-ink">Routine repetition</strong> \u2014 answering the same handful of common questions all day is exactly the kind of task automation handles well</li>
    </ul>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Where a human receptionist has a real advantage</h2>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-2 list-disc list-inside">
      <li><strong class="text-ink">Judgment</strong> \u2014 recognizing when a situation is unusual, sensitive, or doesn't fit a standard pattern</li>
      <li><strong class="text-ink">Reassurance</strong> \u2014 an anxious or upset patient often responds better to a person than to an automated system</li>
      <li><strong class="text-ink">Complex scheduling exceptions</strong> \u2014 working around unusual constraints that don't fit a normal booking flow</li>
      <li><strong class="text-ink">In-person coordination</strong> \u2014 managing the physical waiting room, check-in, and day-of adjustments</li>
    </ul>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">How to think about cost</h2>
    <p class="text-slate2 leading-relaxed mb-6">A full-time front-desk hire involves salary, benefits, training time, and turnover risk. An AI receptionist involves a setup cost and an ongoing monthly cost structured very differently \u2014 usage-based in part, rather than a fixed salary. Rather than comparing the two purely on cost, it's more useful to ask what each is actually being asked to do: many practices find the real value isn't replacing a person's cost, but freeing their existing staff's time away from repetitive tasks and toward the judgment-based work only a person can do.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Limitations to go in with clear eyes about</h2>
    <p class="text-slate2 leading-relaxed mb-6">An AI receptionist only knows what it's been configured to know. It won't handle a conversation that falls outside its approved scope gracefully unless it's specifically built to recognize that and hand off to a person. It also can't physically manage your waiting room or greet a walk-in patient. These aren't flaws to work around quietly \u2014 they're the reason most practices use AI receptionists alongside a human team, not instead of one.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Who this is for</h2>
    <p class="text-slate2 leading-relaxed mb-6">Practices that miss calls after hours, have a front desk that's frequently overwhelmed during peak times, or want more consistent handling of routine questions tend to get the most value from adding an AI receptionist. Practices with very low call volume, or where every inquiry genuinely needs individual judgment, may see less benefit. For most practices, the two working together \u2014 not one replacing the other \u2014 is the realistic model.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">FAQ</h2>
    ${faq.html}

    ${related}

    <div class="border-t border-gold/10 pt-8 mt-10">
      <a href="/industries/dental/" class="link-inline text-sm block mb-2">See Dental AI Receptionist &amp; Appointment Automation &rarr;</a>
      <a href="${getPublicDemoUrl("dental")}" target="_blank" rel="noopener noreferrer" data-nav-event="resource_to_service_nav" class="link-inline text-sm block mb-6">Try the Dental AI Receptionist demo &rarr;</a>
      <a href="/contact/" class="btn-primary" data-cta="article-dental-comparison">${config.ctaPrimary}</a>
    </div>
  </div>
</article>
`;

module.exports = {
  path: "/resources/dental/ai-receptionist-vs-traditional-receptionist-dentists/",
  title: "AI Receptionist vs Traditional Receptionist for Dentists",
  description:
    "A task-by-task comparison of what an AI receptionist and a human receptionist are each better at, with a hybrid model in mind.",
  h1: "AI Receptionist vs Traditional Receptionist for Dentists",
  content,
  schemas: [
    articleSchema({
      headline: "AI Receptionist vs Traditional Receptionist for Dentists",
      entityName: config.entityName,
      url: config.url,
      mainEntityOfPage: `${config.url}/resources/dental/ai-receptionist-vs-traditional-receptionist-dentists/`,
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
    }),
    faq.schema,
  ],
  breadcrumbs: crumbs,
};
