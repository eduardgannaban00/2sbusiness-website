const { visibleBreadcrumbs } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources/" },
];

// Data-driven category list so the hub scales cleanly as more categories
// gain real content — only categories with at least one article render.
// Preferred category taxonomy (per approved architecture): AI Automation,
// Dental, Roofing, HVAC, Business Systems, Lead Follow-Up, Websites &
// Funnels, HR / Recruitment. Only Dental, Roofing, and HVAC have published
// content today; the others simply don't render a section yet rather than
// showing an empty promise.
const categories = [
  {
    label: "Dental Automation",
    bg: true,
    articles: [
      {
        title: "How Much Does an AI Receptionist Cost for a Dental Practice?",
        description: "Setup costs, monthly costs, what affects the price, and 2S's actual published starting rate.",
        href: "/resources/dental/ai-receptionist-cost-dental-practice/",
      },
      {
        title: "AI Receptionist vs Traditional Receptionist for Dentists",
        description: "An honest comparison \u2014 what each is better at, and who benefits most from which.",
        href: "/resources/dental/ai-receptionist-vs-traditional-receptionist-dentists/",
      },
      {
        title: "How Dental Appointment Reminder Automation Works",
        description: "Timing, patient responses, implementation, and privacy considerations.",
        href: "/resources/dental/dental-appointment-reminder-automation/",
      },
      {
        title: "How AI Receptionists Handle After-Hours Dental Inquiries",
        description: "Missed calls, routine questions, booking guidance, and where human handoff still matters.",
        href: "/resources/dental/how-ai-receptionists-handle-after-hours-dental-inquiries/",
      },
      {
        title: "What a Dental AI Receptionist Should \u2014 and Should Not \u2014 Answer",
        description: "The line between front-desk assistance and clinical advice.",
        href: "/resources/dental/what-a-dental-ai-receptionist-should-and-should-not-answer/",
      },
    ],
    footerLink: { href: "/about/#dental-demo", label: "Try the Dental AI Receptionist demo" },
  },
  {
    label: "Roofing Automation",
    bg: false,
    articles: [
      {
        title: "How Roofing Companies Can Automate Lead Follow-Up",
        description: "A realistic workflow \u2014 lead sources, what to automate, what stays human, and operational details.",
        href: "/resources/roofing/how-roofing-companies-can-automate-lead-follow-up/",
      },
      {
        title: "What Happens When a Roofing Lead Is Not Contacted Quickly?",
        description: "The practical consequences of delay, and fast response vs. useful response.",
        href: "/resources/roofing/what-happens-when-a-roofing-lead-is-not-contacted-quickly/",
      },
      {
        title: "Roofing CRM and Lead Follow-Up Automation Explained",
        description: "What a CRM does in a roofing pipeline, and how automation connects to each stage.",
        href: "/resources/roofing/roofing-crm-and-lead-follow-up-automation-explained/",
      },
      {
        title: "How AI Can Follow Up With Roofing Leads After Hours",
        description: "What happens when a lead comes in after your team has gone home.",
        href: "/resources/roofing/how-ai-follows-up-roofing-leads-after-hours/",
      },
      {
        title: "What Happens When a Roofing AI Assistant Doesn't Know the Answer?",
        description: "How escalation and human handoff actually work in practice.",
        href: "/resources/roofing/what-happens-when-roofing-ai-doesnt-know-the-answer/",
      },
    ],
  },
  {
    label: "HVAC Automation",
    bg: true,
    articles: [
      {
        title: "AI Receptionist for HVAC Companies: How It Works",
        description: "The call workflow, inquiry types, and what the AI should never decide.",
        href: "/resources/hvac/ai-receptionist-for-hvac-companies-how-it-works/",
      },
      {
        title: "How AI Can Follow Up With HVAC Leads After Hours",
        description: "Missed calls, web inquiries, qualification basics, booking, and escalation.",
        href: "/resources/hvac/how-ai-follows-up-with-hvac-leads-after-hours/",
      },
      {
        title: "HVAC Lead Follow-Up Automation Explained",
        description: "Qualification, follow-up sequences, stopping conditions, and pipeline updates.",
        href: "/resources/hvac/hvac-lead-follow-up-automation-explained/",
      },
      {
        title: "What Happens When an HVAC Lead Doesn't Book Right Away?",
        description: "Structured follow-up, lead status, and avoiding forgotten inquiries.",
        href: "/resources/hvac/what-happens-when-an-hvac-lead-does-not-book-right-away/",
      },
    ],
  },
];

const categorySections = categories
  .map(
    (cat) => `
<section data-reveal class="section ${cat.bg ? "bg-obsidian/40" : ""}">
  <div class="container-content">
    <p class="eyebrow mb-4">${cat.label}</p>
    <div data-reveal-group class="grid md:grid-cols-2 gap-6">
      ${cat.articles
        .map(
          (a) => `
      <a href="${a.href}" class="card block hover:border-gold/40">
        <p class="font-head font-bold text-ink mb-2">${a.title}</p>
        <p class="text-slate2 text-sm leading-relaxed">${a.description}</p>
      </a>`
        )
        .join("\n")}
    </div>
    ${cat.footerLink ? `<p class="text-slate2 text-sm mt-6"><a href="${cat.footerLink.href}" class="link-inline">${cat.footerLink.label} &rarr;</a></p>` : ""}
  </div>
</section>`
  )
  .join("\n");

const content = `
${visibleBreadcrumbs(crumbs)}
<section data-reveal class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">Resources</p>
    <h1 class="text-4xl md:text-5xl mb-6">Automation guides &amp; resources</h1>
    <p class="text-slate2 text-lg leading-relaxed">Practical, specific guides on AI automation, CRM systems, and business operations \u2014 built from what we actually implement, not generic AI commentary.</p>
  </div>
</section>

${categorySections}

<section data-reveal class="section">
  <div class="container-content">
    <p class="text-muted text-sm">More categories \u2014 AI Automation, Business Systems, Lead Follow-Up, Websites &amp; Funnels, HR / Recruitment \u2014 are planned as the library grows.</p>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40 text-center cta-aurora">
  <div class="container-content">
    <a href="/contact/" class="btn-primary" data-cta="resources-final">${config.ctaPrimary}</a>
  </div>
</section>
`;

module.exports = {
  path: "/resources/",
  title: "Automation Guides & Resources | 2S Business Support Service",
  description:
    "Practical guides on AI automation, CRM systems, and business operations across dental, roofing, and HVAC.",
  h1: "Automation guides & resources",
  content,
  schemas: [],
  breadcrumbs: crumbs,
};
