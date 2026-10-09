const { visibleBreadcrumbs } = require("../partials/ui");
const config = require("../data/site-config");

const bookingUrl = "https://calendar.app.google/5qgdXS8GEKUd2L1dA";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Book a Consultation", href: "/book/" },
];

const content = `
${visibleBreadcrumbs(crumbs)}
<section data-reveal class="section pt-8">
  <div class="container-content max-w-3xl">
    <p class="eyebrow mb-4">Free Consultation</p>
    <h1 class="text-4xl md:text-5xl mb-6">Free Business Automation Consultation</h1>
    <p class="text-slate2 text-lg leading-relaxed mb-8">Choose a time to talk through the repetitive work, follow-up, or business systems you want to improve. This is a 30-minute conversation with no obligation.</p>

    <div class="grid sm:grid-cols-3 gap-4 mb-8" aria-label="Consultation details">
      <div class="card">
        <p class="font-head font-bold text-ink text-sm uppercase tracking-wide mb-2">Duration</p>
        <p class="text-slate2 text-sm">30 minutes</p>
      </div>
      <div class="card">
        <p class="font-head font-bold text-ink text-sm uppercase tracking-wide mb-2">Location</p>
        <p class="text-slate2 text-sm">Google Meet</p>
      </div>
      <div class="card">
        <p class="font-head font-bold text-ink text-sm uppercase tracking-wide mb-2">Commitment</p>
        <p class="text-slate2 text-sm">No obligation</p>
      </div>
    </div>

    <div class="card max-w-2xl">
      <h2 class="text-2xl md:text-3xl mb-4">Choose an available time</h2>
      <p class="text-slate2 leading-relaxed mb-6">Google Calendar will show current availability in your timezone. Your appointment is only confirmed after you complete Google Calendar's booking steps.</p>
      <a href="${bookingUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary inline-flex" data-cta="booking-google-calendar" data-booking-link data-allowed-source-params="source,demo,industry,category">Choose an Available Time</a>
      <p class="text-muted text-sm leading-relaxed mt-5">Google Calendar will provide the meeting details, confirmation, and available rescheduling or cancellation options.</p>
    </div>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content max-w-3xl">
    <h2 class="text-2xl md:text-3xl mb-4">Prefer to send an inquiry?</h2>
    <p class="text-slate2 leading-relaxed mb-5">Use the existing contact form for general questions or if you would rather explain what you need before choosing a time.</p>
    <a href="/contact/" class="btn-secondary" data-cta="booking-contact-fallback">Contact 2S Business Support</a>
  </div>
</section>
`;

module.exports = {
  path: "/book/",
  title: "Book a Free Consultation | 2S Business Support Service",
  description:
    "Choose an available time for a 30-minute business automation consultation with 2S Business Support Service.",
  h1: "Free Business Automation Consultation",
  content,
  schemas: [],
  breadcrumbs: crumbs,
};
