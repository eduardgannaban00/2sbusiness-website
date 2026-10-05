const { visibleBreadcrumbs } = require("../partials/ui");
const config = require("../data/site-config");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Privacy", href: "/privacy/" },
];

const content = `
${visibleBreadcrumbs(crumbs)}
<section data-reveal class="section pt-8">
  <div class="container-content max-w-2xl prose-invert">
    <p class="eyebrow mb-4">Legal</p>
    <h1 class="text-4xl md:text-5xl mb-8">Privacy Policy</h1>

    <div class="space-y-8 text-slate2 leading-relaxed">
      <div>
        <h2 class="text-xl font-head font-bold text-ink mb-2">Information we collect</h2>
        <p>When you submit the consultation request form, we collect the information you provide: your name, business name, email address, optional phone number, service interest, preferred consultation date and time, timezone, and any optional message.</p>
      </div>

      <div>
        <h2 class="text-xl font-head font-bold text-ink mb-2">Analytics</h2>
        <p>The site may use website analytics when an analytics service is configured. Any such measurement is intended to understand page visits and navigation in aggregate. The contact form's field contents are not intentionally sent as analytics events.</p>
      </div>

      <div>
        <h2 class="text-xl font-head font-bold text-ink mb-2">Third-party processors</h2>
        <p>To operate the site and contact form in production, we may use service providers for hosting, abuse protection, and email delivery. Those providers process information only as needed to provide those services. We do not sell submitted inquiry information or share it with third parties for their own marketing purposes.</p>
      </div>

      <div>
        <h2 class="text-xl font-head font-bold text-ink mb-2">Purpose of collection</h2>
        <p>Information submitted through the consultation request form is used to respond to your inquiry, evaluate whether our services are a fit for your business, and follow up with you about that request.</p>
      </div>

      <div>
        <h2 class="text-xl font-head font-bold text-ink mb-2">Retention</h2>
        <p>We retain submitted inquiry information only for as long as reasonably necessary to respond to your request, manage the business relationship, and meet applicable legal or operational requirements.</p>
      </div>

      <div>
        <h2 class="text-xl font-head font-bold text-ink mb-2">Contact us about privacy</h2>
        <p>If you have questions about this policy or want to request that your information be updated or removed, contact us at <a href="mailto:${config.contactEmail}" class="link-inline">${config.contactEmail}</a>.</p>
      </div>

      <div>
        <p class="text-muted text-sm">This policy may be updated as our tools or processes change. Last reviewed: October 2026.</p>
      </div>
    </div>
  </div>
</section>
`;

module.exports = {
  path: "/privacy/",
  title: "Privacy Policy | 2S Business Support Service",
  description:
    "How 2S Business Support Service collects, uses, and retains information submitted through the consultation request form.",
  h1: "Privacy Policy",
  content,
  schemas: [],
  breadcrumbs: crumbs,
};
