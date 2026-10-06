const { visibleBreadcrumbs, workflowDiagram, faqAccordion, articleMeta, relatedResources, articleSchema } = require("../partials/ui");
const config = require("../data/site-config");
const { getPublicDemoUrl } = require("../data/demo-registry");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources/" },
  {
    name: "How Dental Appointment Reminder Automation Works",
    href: "/resources/dental/dental-appointment-reminder-automation/",
  },
];

// Pre-launch: no real public go-live date yet. See articleSchema() in
// src/partials/ui.js and the Phase 8 report.
const DATE_PUBLISHED = null;
const DATE_MODIFIED = null;

const wf = workflowDiagram("article-workflow-dental-reminder", [
  "Appointment Created",
  "Automation Detects Appointment",
  "Reminder Scheduled",
  "Message Provider Sends Reminder",
  "Patient Response Captured",
  "Connected System Updated",
  "Exceptions Routed to Staff",
]);

const faq = faqAccordion(
  [
    {
      q: "What channels can reminders be sent through?",
      a: "Typically text message and email, and sometimes automated voice calls, depending on what the practice's systems and patients' preferences support.",
    },
    {
      q: "Can patients reschedule directly from a reminder?",
      a: "Depending on how it's configured, a reminder can include a link or reply option to request a new time, which then gets routed to your front desk or an automated booking flow to confirm.",
    },
    {
      q: "Does this replace the need for a front desk to call patients?",
      a: "It replaces the routine, repetitive reminder work \u2014 not the judgment calls. If a patient responds with a question or an unusual request, that still goes to a person.",
    },
  ],
  `${config.url}/resources/dental/dental-appointment-reminder-automation/`
);

const related = relatedResources([
  {
    category: "Dental Automation",
    title: "How AI Receptionists Handle After-Hours Dental Inquiries",
    href: "/resources/dental/how-ai-receptionists-handle-after-hours-dental-inquiries/",
  },
  {
    category: "Dental Automation",
    title: "AI Receptionist vs Traditional Receptionist for Dentists",
    href: "/resources/dental/ai-receptionist-vs-traditional-receptionist-dentists/",
  },
]);

const content = `
${visibleBreadcrumbs(crumbs)}
<article class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">Dental Automation</p>
    <h1 class="text-3xl md:text-4xl mb-6">How Dental Appointment Reminder Automation Works</h1>

    ${articleMeta("Dental Automation", DATE_PUBLISHED, DATE_MODIFIED)}

    <p class="text-slate2 text-lg leading-relaxed mb-6">Appointment reminder automation sends scheduled messages to patients ahead of their appointment \u2014 typically by text or email \u2014 and, in an integrated setup, can update the connected practice-management system or CRM based on how a patient responds. The goal is straightforward: reduce the number of patients who simply forget, without requiring a staff member to manually contact every patient on the schedule.</p>

    <div class="card my-10">
      <p class="text-xs font-head uppercase tracking-wide text-muted mb-4">The general workflow</p>
      ${wf}
    </div>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">How the timing usually works</h2>
    <p class="text-slate2 leading-relaxed mb-6">Most setups send more than one reminder \u2014 for example, several days before the appointment and again the day before or morning of. The exact timing and number of touches is configurable per practice; there's no single correct schedule, and it's worth adjusting based on what actually reduces no-shows for your patient base rather than assuming a default is optimal.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">What happens in each scenario</h2>
    <p class="text-slate2 leading-relaxed mb-4">A reminder system needs a defined path for more than just "patient confirms." Here's what a well-built setup handles:</p>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-3">
      <li><strong class="text-ink">Patient confirms.</strong> In an integrated setup, the appointment or patient workflow status can update automatically in the connected system \u2014 no manual entry required.</li>
      <li><strong class="text-ink">Patient requests rescheduling.</strong> This typically routes to either an automated booking flow that offers new times, or directly to the front desk if the change needs a person's judgment.</li>
      <li><strong class="text-ink">Patient cancels.</strong> The cancellation should be reflected in the schedule and flagged for the front desk, since a cancellation often opens a slot worth filling.</li>
      <li><strong class="text-ink">Patient asks an unexpected question.</strong> A message that doesn't fit a simple confirm/reschedule/cancel pattern should be recognized as such and routed to a person rather than met with an automated guess.</li>
      <li><strong class="text-ink">Message delivery fails.</strong> A bounced text or undeliverable email should be flagged, not silently dropped \u2014 otherwise a practice can end up assuming a reminder was sent when it never reached the patient.</li>
      <li><strong class="text-ink">Integration fails.</strong> If the connection to the scheduling or practice-management system breaks, the reminder system should fail visibly (an alert to staff) rather than quietly stop working or show inaccurate appointment data.</li>
    </ul>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Implementation considerations</h2>
    <ul class="text-slate2 leading-relaxed mb-6 space-y-2 list-disc list-inside">
      <li>Reminder automation needs to connect to whatever system holds your actual appointment schedule \u2014 for many dental practices, that's dedicated practice-management or scheduling software rather than a general-purpose CRM, and the integration needs to match what you actually use</li>
      <li>Patients need a clear, simple way to respond (confirm, reschedule, or ask a question) without dead ends</li>
      <li>Message content and timing should be tested and adjusted rather than left on a generic default indefinitely</li>
      <li>Exactly what "automatically updates" means depends entirely on your specific integration \u2014 it's not a universal guarantee across every practice-management system</li>
    </ul>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Privacy considerations</h2>
    <p class="text-slate2 leading-relaxed mb-6">Appointment reminders involve sending patient contact information through third-party messaging providers. This is not something to assume is handled automatically \u2014 the specific vendors involved, what data is sent, how it flows between systems, and what agreements (such as a Business Associate Agreement where applicable) are in place should all be verified for your specific implementation before launch. 2S does not claim blanket compliance certifications; applicable requirements depend on your practice, your vendors, and your configuration.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">Practical next steps</h2>
    <p class="text-slate2 leading-relaxed mb-6">Reminder automation is usually one part of a broader front-desk automation setup rather than a standalone tool. If you're also dealing with missed calls or after-hours inquiries, it's worth looking at those together with a consultation rather than solving each piece separately.</p>

    <h2 class="text-xl md:text-2xl mt-10 mb-3">FAQ</h2>
    ${faq.html}

    ${related}

    <div class="border-t border-gold/10 pt-8 mt-10">
      <a href="${getPublicDemoUrl("dental")}" target="_blank" rel="noopener noreferrer" data-nav-event="resource_to_service_nav" class="link-inline text-sm block mb-6">Try the Dental AI Receptionist demo &rarr;</a>
      <a href="/contact/" class="btn-primary" data-cta="article-dental-reminders">${config.ctaPrimary}</a>
    </div>
  </div>
</article>
`;

module.exports = {
  path: "/resources/dental/dental-appointment-reminder-automation/",
  title: "How Dental Appointment Reminder Automation Works",
  description:
    "How automated appointment reminders work for dental practices \u2014 the workflow, what happens in each scenario, implementation, and privacy considerations.",
  h1: "How Dental Appointment Reminder Automation Works",
  content,
  schemas: [
    articleSchema({
      headline: "How Dental Appointment Reminder Automation Works",
      entityName: config.entityName,
      url: config.url,
      mainEntityOfPage: `${config.url}/resources/dental/dental-appointment-reminder-automation/`,
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
    }),
    faq.schema,
  ],
  breadcrumbs: crumbs,
};
