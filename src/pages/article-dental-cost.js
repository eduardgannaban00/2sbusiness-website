const { visibleBreadcrumbs, faqAccordion, articleMeta, relatedResources, articleSchema } = require("../partials/ui");
const config = require("../data/site-config");
const pricingConfig = require("../data/pricing-config");
const { getPublicDemoUrl } = require("../data/demo-registry");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources/" },
  {
    name: "AI Receptionist Cost for Dental Practices",
    href: "/resources/dental/ai-receptionist-cost-dental-practice/",
  },
];

// Pre-launch: no real public go-live date exists yet. See articleSchema()
// in src/partials/ui.js and the Phase 8 report for how this is handled —
// these stay null until the site actually goes live, at which point real
// ISO dates should be set here.
const DATE_PUBLISHED = null;
const DATE_MODIFIED = null;

const faq = faqAccordion(
  [
    {
      q: "Is there a free version of an AI receptionist for dental practices?",
      a: "Free demos and trial tools exist and can be a useful way to explore what's possible. A production implementation for an actual practice typically involves costs for infrastructure, telephony, messaging, integrations, initial configuration, and ongoing support \u2014 which is why most real-world, in-use setups carry an ongoing cost rather than staying free indefinitely.",
    },
    {
      q: "Does the monthly cost include phone or texting fees?",
      a: "Not usually. Voice, SMS, and other telephony usage is typically billed separately by the underlying provider based on actual usage. Any such costs should be explained to you before implementation, not discovered afterward.",
    },
    {
      q: "Can I try before committing to a monthly plan?",
      a: "You can see a live, interactive example of how a dental AI receptionist behaves before making any commitment \u2014 that's a reasonable way to evaluate fit before discussing a specific setup for your practice.",
    },
  ],
  `${config.url}/resources/dental/ai-receptionist-cost-dental-practice/`
);

const related = relatedResources([
  {
    category: "Dental Automation",
    title: "AI Receptionist vs Traditional Receptionist for Dentists",
    href: "/resources/dental/ai-receptionist-vs-traditional-receptionist-dentists/",
  },
  {
    category: "Dental Automation",
    title: "How AI Receptionists Handle After-Hours Dental Inquiries",
    href: "/resources/dental/how-ai-receptionists-handle-after-hours-dental-inquiries/",
  },
]);

const costTable = `
<div class="article-table-wrap">
  <table class="article-table">
    <thead>
      <tr>
        <th>Cost Category</th>
        <th>What It Covers</th>
        <th>Typically Billed As</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="font-head font-semibold text-ink">Setup / Configuration</td>
        <td>Configuring the assistant with your practice's information, booking rules, and approved answers; connecting it to your calendar or practice-management system; testing before launch.</td>
        <td>One-time</td>
      </tr>
      <tr>
        <td class="font-head font-semibold text-ink">Monthly Service</td>
        <td>Hosting the assistant, ongoing maintenance, and platform access.</td>
        <td>Recurring monthly</td>
      </tr>
      <tr>
        <td class="font-head font-semibold text-ink">Voice / Telephony Usage</td>
        <td>Actual phone call handling \u2014 minutes used, call routing, and any voice-specific provider fees.</td>
        <td>Usage-based</td>
      </tr>
      <tr>
        <td class="font-head font-semibold text-ink">SMS / Messaging Usage</td>
        <td>Text messages sent and received through the assistant, billed by the messaging provider based on volume.</td>
        <td>Usage-based</td>
      </tr>
      <tr>
        <td class="font-head font-semibold text-ink">Integrations / Custom Workflow Work</td>
        <td>Connecting to your specific practice-management software, CRM, or other systems beyond a standard setup, and building any non-standard workflow logic.</td>
        <td>One-time (varies by complexity)</td>
      </tr>
      <tr>
        <td class="font-head font-semibold text-ink">Ongoing Changes / Support</td>
        <td>Adjusting the assistant's configuration as your practice's information, hours, or policies change after launch.</td>
        <td>Recurring monthly or as-needed</td>
      </tr>
    </tbody>
  </table>
</div>`;

const content = `
${visibleBreadcrumbs(crumbs)}
<article class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">Dental Automation</p>
    <h1 class="text-3xl md:text-4xl mb-6">How Much Does an AI Receptionist Cost for a Dental Practice?</h1>

    ${articleMeta("Dental Automation", DATE_PUBLISHED, DATE_MODIFIED)}

    <p class="text-slate2 text-lg leading-relaxed mb-6">An AI receptionist for a dental practice typically involves several distinct cost components rather than one flat number: setup/configuration, a recurring monthly service fee, usage-based telephony and messaging costs, and any custom integration work. As a concrete reference point, 2S's Automate package \u2014 which includes AI receptionist setup \u2014 is priced ${pricingConfig.automate.startingPriceText.toLowerCase()}.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Cost components, at a glance</h2>
    <p class="text-slate2 leading-relaxed mb-4">These are the categories that typically make up the total cost. We don't publish invented industry-average dollar ranges for the usage-based and integration categories below, since actual costs vary by provider and practice \u2014 but here's what each one represents:</p>
    ${costTable}

    <h2 class="text-xl md:text-2xl mt-10 mb-3">What the setup fee typically covers</h2>
    <p class="text-slate2 leading-relaxed mb-6">Setup work includes configuring the assistant with your practice's actual information \u2014 hours, accepted insurance, services, booking rules \u2014 connecting it to your calendar or practice-management system, defining what it's allowed to answer, and testing it before it goes live. Practices with more complex scheduling or multiple locations generally involve more setup work than a single-location general practice.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">What the monthly fee typically covers</h2>
    <p class="text-slate2 leading-relaxed mb-6">The recurring fee generally covers hosting the assistant, ongoing maintenance, and support for adjustments as your practice's information changes. Usage-based costs \u2014 phone minutes, text messages, and similar telephony or messaging fees \u2014 are commonly billed separately by the underlying provider based on actual call and message volume, rather than bundled into a flat rate. Any such costs should be explained to you clearly before implementation begins.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">What affects the price</h2>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-2 list-disc list-inside">
      <li>Call and message volume the practice actually handles</li>
      <li>Whether the practice needs voice (phone) capability, text-based capability, or both</li>
      <li>Integration complexity \u2014 which calendar, CRM, or practice-management software it needs to connect to</li>
      <li>How many distinct scenarios it needs to be configured to handle (scheduling, insurance questions, new patient intake, etc.)</li>
      <li>Ongoing support and adjustment needs after launch</li>
    </ul>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">2S's approved pricing</h2>
    <p class="text-slate2 leading-relaxed mb-6">2S's Automate package \u2014 which covers AI receptionist setup along with related workflow automation \u2014 is priced <strong class="text-ink">${pricingConfig.automate.startingPriceText}</strong>. This is a starting point, not a fixed quote; the exact cost for your practice depends on the factors above and is confirmed in a written proposal before any build work begins, with any third-party telephony or messaging costs disclosed at that stage.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">A note on security and privacy</h2>
    <p class="text-slate2 leading-relaxed mb-6">Any AI receptionist handling patient contact information should be configured with clear limits on what it can access and say, and a defined path for escalating anything sensitive to a person. This is a setup consideration to raise directly with whoever builds your system, not something to assume is handled by default. Applicable privacy and compliance requirements, the vendors involved, and how data flows between systems should be verified for your specific implementation rather than assumed.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Practical next steps</h2>
    <p class="text-slate2 leading-relaxed mb-6">Before committing to a monthly plan, it's reasonable to see how an AI receptionist actually behaves. 2S has a live, interactive Dental AI Receptionist demo you can try directly, followed by a consultation to discuss what setup would look like for your specific practice.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">FAQ</h2>
    ${faq.html}

    ${related}

    <div class="border-t border-gold/10 pt-8 mt-10">
      <a href="${getPublicDemoUrl("dental")}" target="_blank" rel="noopener noreferrer" data-nav-event="resource_to_service_nav" class="link-inline text-sm block mb-2">Try the Dental AI Receptionist demo &rarr;</a>
      <a href="/pricing/" class="link-inline text-sm block mb-6">See full 2S pricing &rarr;</a>
      <a href="/contact/" class="btn-primary" data-cta="article-dental-cost">${config.ctaPrimary}</a>
    </div>
  </div>
</article>
`;

module.exports = {
  path: "/resources/dental/ai-receptionist-cost-dental-practice/",
  title: "How Much Does an AI Receptionist Cost for a Dental Practice? | 2S Business Support Service",
  description:
    "What setup, monthly, and usage-based costs to expect for a dental AI receptionist, what affects the price, and 2S's actual published starting rate.",
  h1: "How Much Does an AI Receptionist Cost for a Dental Practice?",
  content,
  schemas: [
    articleSchema({
      headline: "How Much Does an AI Receptionist Cost for a Dental Practice?",
      entityName: config.entityName,
      url: config.url,
      mainEntityOfPage: `${config.url}/resources/dental/ai-receptionist-cost-dental-practice/`,
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
    }),
    faq.schema,
  ],
  breadcrumbs: crumbs,
};
