const { visibleBreadcrumbs, faqAccordion, articleMeta, relatedResources, articleSchema } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources/" },
  {
    name: "What Happens When a Roofing Lead Is Not Contacted Quickly?",
    href: "/resources/roofing/what-happens-when-a-roofing-lead-is-not-contacted-quickly/",
  },
];

const DATE_PUBLISHED = null;
const DATE_MODIFIED = null;

const faq = faqAccordion(
  [
    {
      q: "Does a faster response guarantee the job?",
      a: "No. Being first to respond helps a homeowner form an impression, but it doesn't override price, availability, reviews, or fit. It just means the company is still part of the conversation instead of having missed it entirely.",
    },
    {
      q: "Is an instant automated reply enough on its own?",
      a: "An instant reply that just says \"thanks, we'll be in touch\" is better than silence, but it's not the same as a useful response that actually identifies the company, confirms next steps, and moves the inquiry forward.",
    },
    {
      q: "What's the most common way roofing leads get lost?",
      a: "Usually not one dramatic failure \u2014 more often it's a lead that sits in one inbox or spreadsheet while a team member assumes someone else is handling it, until enough time passes that following up starts to feel awkward.",
    },
  ],
  `${config.url}/resources/roofing/what-happens-when-a-roofing-lead-is-not-contacted-quickly/`
);

const related = relatedResources([
  {
    category: "Roofing Automation",
    title: "How Roofing Companies Can Automate Lead Follow-Up",
    href: "/resources/roofing/how-roofing-companies-can-automate-lead-follow-up/",
  },
  {
    category: "Roofing Automation",
    title: "How AI Can Follow Up With Roofing Leads After Hours",
    href: "/resources/roofing/how-ai-follows-up-roofing-leads-after-hours/",
  },
]);

const comparisonTable = `
<div class="article-table-wrap">
  <table class="article-table">
    <caption class="sr-only">Comparison of fast responses and useful responses to roofing leads</caption>
    <thead>
      <tr>
        <th scope="col">Fast Response</th>
        <th scope="col">Useful Response</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Arrives quickly, sometimes instantly</td>
        <td>Arrives quickly <em>and</em> moves the inquiry forward</td>
      </tr>
      <tr>
        <td>May just confirm the message was received</td>
        <td>Identifies the company and confirms what happens next</td>
      </tr>
      <tr>
        <td>Doesn't necessarily gather any information</td>
        <td>Gathers basic information needed to qualify or schedule</td>
      </tr>
      <tr>
        <td>Same generic message regardless of the request</td>
        <td>Offers an appropriate next step (scheduling, escalation, etc.)</td>
      </tr>
      <tr>
        <td>Doesn't distinguish routine vs. unusual requests</td>
        <td>Routes urgent or unusual situations to a person</td>
      </tr>
    </tbody>
  </table>
</div>`;

const content = `
${visibleBreadcrumbs(crumbs)}
<article class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">Roofing Automation</p>
    <h1 class="text-3xl md:text-4xl mb-6">What Happens When a Roofing Lead Is Not Contacted Quickly?</h1>

    ${articleMeta("Roofing Automation", DATE_PUBLISHED, DATE_MODIFIED)}

    <p class="text-slate2 text-lg leading-relaxed mb-6">When a roofing lead goes uncontacted for a while, the practical risk isn't one specific bad outcome \u2014 it's that several small, ordinary things can happen at once: the homeowner keeps looking at other options, the inquiry loses context as time passes, and it becomes easier for the lead to quietly fall through the cracks on your end too.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">What tends to happen on the homeowner's side</h2>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-2 list-disc list-inside">
      <li>They may reach out to multiple roofing contractors at once, which is a common and reasonable way to shop for this kind of work</li>
      <li>Their sense of urgency can cool, especially if the original issue wasn't a visible emergency</li>
      <li>They may simply forget which companies they contacted and in what order</li>
    </ul>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">What tends to happen on the company's side</h2>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-2 list-disc list-inside">
      <li>Staff can lose the context of the original inquiry, especially if it wasn't recorded anywhere central</li>
      <li>The same lead can end up getting a duplicate, uncoordinated follow-up from more than one person</li>
      <li>A scheduling opportunity \u2014 a day the crew or estimator was actually free \u2014 can pass by unused</li>
      <li>Leads can genuinely disappear between inboxes, spreadsheets, phone notes, and whatever CRM is (or isn't) actually being used consistently</li>
    </ul>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Fast response vs. useful response</h2>
    <p class="text-slate2 leading-relaxed mb-4">These aren't the same thing, and treating them as interchangeable is a common mistake. A fast response that doesn't actually move things forward isn't much better than a slow one.</p>
    ${comparisonTable}
    <p class="text-slate2 leading-relaxed mb-6">A useful first response can acknowledge the inquiry, identify the company clearly, confirm what happens next, gather the basic information needed to qualify the lead, offer an appropriate scheduling path, and route anything urgent or unusual to a person \u2014 rather than just sending a generic "thanks, we got your message" and leaving the homeowner to wonder what happens now.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">A practical way to think about this</h2>
    <p class="text-slate2 leading-relaxed mb-6">The goal isn't to respond instantly for its own sake \u2014 it's to make sure every inquiry gets a real, organized first step instead of sitting untouched. That's a process question as much as a speed question, and it's usually solvable without exaggerating what's at stake.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">FAQ</h2>
    ${faq.html}

    ${related}

    <div class="border-t border-gold/10 pt-8 mt-10">
      <a href="/roofing-lead-follow-up-automation/" class="link-inline text-sm block mb-6">See 2S's Roofing Lead Follow-Up Automation service &rarr;</a>
      <a href="/contact/" class="btn-primary" data-cta="article-roofing-delayed-contact">${config.ctaPrimary}</a>
    </div>
  </div>
</article>
`;

module.exports = {
  path: "/resources/roofing/what-happens-when-a-roofing-lead-is-not-contacted-quickly/",
  title: "What Happens When a Roofing Lead Is Not Contacted Quickly? | 2S Business Support Service",
  description:
    "The practical consequences of delayed roofing lead follow-up, and the difference between a fast response and a genuinely useful one.",
  h1: "What Happens When a Roofing Lead Is Not Contacted Quickly?",
  content,
  schemas: [
    articleSchema({
      headline: "What Happens When a Roofing Lead Is Not Contacted Quickly?",
      entityName: config.entityName,
      url: config.url,
      mainEntityOfPage: `${config.url}/resources/roofing/what-happens-when-a-roofing-lead-is-not-contacted-quickly/`,
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
    }),
    faq.schema,
  ],
  breadcrumbs: crumbs,
};
