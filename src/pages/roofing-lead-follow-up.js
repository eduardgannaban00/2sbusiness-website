const { visibleBreadcrumbs, workflowDiagram, faqAccordion } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Industries", href: "/industries/" },
  { name: "Roofing", href: "/industries/roofing/" },
  { name: "Lead Follow-Up Automation", href: "/roofing-lead-follow-up-automation/" },
];

const leadWorkflow = workflowDiagram("lead-followup-workflow", [
  "Facebook / Website / Referral / Missed Call",
  "Acknowledgment",
  "Qualification",
  "CRM Pipeline",
  "Follow-Up",
  "Estimate Booking",
  "Human Takeover",
]);

const faq = faqAccordion(
  [
    {
      q: "How does roofing lead follow-up automation work?",
      a: "New leads \u2014 from your website, Facebook, referrals, or missed calls \u2014 are acknowledged automatically, moved through qualification, added to your CRM pipeline, and followed up with until they book an estimate or a human takes over.",
    },
    {
      q: "Can AI follow up with old roofing leads?",
      a: "Yes \u2014 the same follow-up sequence can be applied to reactivate leads already sitting in your CRM, not just brand-new ones.",
    },
    {
      q: "Can AI respond to missed calls?",
      a: "Yes, when connected to a compatible calling/messaging system, a missed call can trigger the same acknowledgment and follow-up sequence as a form submission.",
    },
    {
      q: "How long does this take to set up?",
      a: "It depends on your existing systems and how many lead sources need to be connected. We'll give you a specific timeline when you request a consultation.",
    },
  ],
  `${config.url}/roofing-lead-follow-up-automation/`
);

const content = `
${visibleBreadcrumbs(crumbs)}
<section data-reveal class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">Roofing &middot; Lead Follow-Up</p>
    <h1 class="text-4xl md:text-5xl mb-6">Roofing lead follow-up automation</h1>
    <p class="text-2xl font-head font-bold text-gold mb-4">The lead already raised their hand. Don't let the follow-up disappear.</p>
    <p class="text-slate2 text-lg leading-relaxed">Automated acknowledgment, qualification, and follow-up for every roofing lead \u2014 from Facebook, your website, a referral, or a missed call \u2014 so none go cold.</p>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content">
    <div class="card">
      ${leadWorkflow}
    </div>
  </div>
</section>

<section data-reveal class="section">
  <div class="container-content max-w-2xl">
    <h2 class="text-xl md:text-2xl mb-3">Where automation ends and your team begins</h2>
    <p class="text-slate2 leading-relaxed">Acknowledgment, qualification questions, CRM updates, and scheduled follow-up messages run automatically. Once a lead is qualified and ready to book \u2014 or asks something outside the approved script \u2014 the conversation hands off to your team.</p>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-3">Related</p>
    <a href="/ai-assistant-for-roofing-companies/" class="link-inline text-sm block mb-2">AI Assistant for Roofing Companies &rarr;</a>
    <a href="/resources/roofing/how-ai-follows-up-roofing-leads-after-hours/" class="link-inline text-sm block mb-2">Guide: How AI Follows Up After Hours &rarr;</a>
    <a href="/industries/roofing/" class="link-inline text-sm block">Back to Roofing overview &rarr;</a>
  </div>
</section>

<section data-reveal class="section max-w-3xl mx-auto">
  <div class="container-content">
    <h2 class="text-2xl md:text-3xl mb-8">FAQ</h2>
    ${faq.html}
  </div>
</section>

<section data-reveal class="section text-center">
  <div class="container-content">
    <a href="/contact/" class="btn-primary" data-cta="roofing-followup-final" data-nav-event="service_to_contact_nav">${config.ctaPrimary}</a>
  </div>
</section>
`;

module.exports = {
  path: "/roofing-lead-follow-up-automation/",
  title: "Roofing Lead Follow-Up Automation | 2S Business Support Service",
  description:
    "Automate acknowledgment, qualification, and follow-up for every roofing lead \u2014 from Facebook, your website, or a missed call \u2014 so none go cold.",
  h1: "Roofing lead follow-up automation",
  content,
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Roofing Lead Follow-Up Automation",
      serviceType: "Lead follow-up automation for roofing companies",
      provider: { "@type": "Organization", name: config.entityName, url: config.url },
      areaServed: "Remote",
      description:
        "Automated lead acknowledgment, qualification, CRM pipeline updates, and follow-up for roofing companies.",
    },
    faq.schema,
  ],
  breadcrumbs: crumbs,
};
