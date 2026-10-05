const { visibleBreadcrumbs, socialLinks } = require("../partials/ui");
const config = require("../data/site-config");
const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY || "";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact/" },
];

const content = `
${visibleBreadcrumbs(crumbs)}
<section data-reveal class="section pt-8">
  <div class="container-content grid md:grid-cols-2 gap-12">
    <div>
      <p class="eyebrow mb-4">Free Consultation</p>
      <h1 class="text-4xl md:text-5xl mb-6">Request a Free Consultation</h1>
      <p class="text-slate2 text-lg leading-relaxed mb-6">Tell us a bit about what you need. We'll review it and follow up to confirm a time \u2014 no pressure, no obligation.</p>
      <p class="text-muted text-sm mb-6">We typically respond within a few business days. Response times are not guaranteed for every inquiry.</p>

      <!-- Populated only if the visitor arrived from a /pricing/ category button -->
      <p class="hidden text-sm text-emerald2 mb-4" data-consult-category-note></p>

      <div class="card">
        <p class="font-head font-bold text-ink text-sm uppercase tracking-wide mb-3">What happens next</p>
        <ul class="text-slate2 text-sm space-y-2 leading-relaxed">
          <li>We review what you've shared and reply to discuss your specific situation.</li>
          <li>If it's a fit, you get a written recommendation before any build work starts.</li>
          <li>Any third-party software, API, or telephony costs your automation needs are explained upfront in that proposal \u2014 never added after the fact.</li>
        </ul>
      </div>

      <div class="flex items-center gap-4 mt-6">
        <p class="text-muted text-sm">Or reach us directly:</p>
        <a href="mailto:${config.contactEmail}" class="text-slate2 hover:text-gold text-sm">${config.contactEmail}</a>
      </div>
      <div class="flex items-center gap-4 mt-3">
        ${socialLinks(config.social)}
      </div>
    </div>

    <form data-contact-form class="card space-y-5" novalidate>
      <div>
        <label for="name" class="block text-sm font-head text-slate2 mb-1.5">Name <span class="text-gold">*</span></label>
        <input id="name" name="name" type="text" required maxlength="200" autocomplete="name"
          class="w-full bg-charcoal border border-gold/20 rounded-md px-4 py-3 text-ink focus-visible:border-gold" />
      </div>
      <div>
        <label for="business_name" class="block text-sm font-head text-slate2 mb-1.5">Business Name <span class="text-gold">*</span></label>
        <input id="business_name" name="business_name" type="text" required maxlength="200" autocomplete="organization"
          class="w-full bg-charcoal border border-gold/20 rounded-md px-4 py-3 text-ink focus-visible:border-gold" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="email" class="block text-sm font-head text-slate2 mb-1.5">Email <span class="text-gold">*</span></label>
          <input id="email" name="email" type="email" required maxlength="200" autocomplete="email"
            class="w-full bg-charcoal border border-gold/20 rounded-md px-4 py-3 text-ink focus-visible:border-gold" />
        </div>
        <div>
          <label for="phone" class="block text-sm font-head text-slate2 mb-1.5">Phone (optional)</label>
          <input id="phone" name="phone" type="tel" maxlength="40" autocomplete="tel"
            class="w-full bg-charcoal border border-gold/20 rounded-md px-4 py-3 text-ink focus-visible:border-gold" />
        </div>
      </div>
      <div>
        <label for="interest" class="block text-sm font-head text-slate2 mb-1.5">What are you interested in? <span class="text-gold">*</span></label>
        <select id="interest" name="interest" required
          class="w-full bg-charcoal border border-gold/20 rounded-md px-4 py-3 text-ink focus-visible:border-gold">
          <option value="">Select one</option>
          <option>Website / Funnel</option>
          <option>AI Automation</option>
          <option>AI Receptionist</option>
          <option>Lead Follow-Up</option>
          <option>CRM / GoHighLevel</option>
          <option>Bookkeeping Automation</option>
          <option>Virtual Assistance</option>
          <option>Customer Support</option>
          <option>Social Media Support</option>
          <option>Not sure yet</option>
        </select>
      </div>

      <p class="text-slate2 text-sm">Preferred consultation date and time. Choose a time that works for you \u2014 we'll confirm availability by email.</p>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="preferred_date" class="block text-sm font-head text-slate2 mb-1.5">Preferred date <span class="text-gold">*</span></label>
          <input id="preferred_date" name="preferred_date" type="date" required
            class="w-full bg-charcoal border border-gold/20 rounded-md px-4 py-3 text-ink focus-visible:border-gold" />
        </div>
        <div>
          <label for="preferred_time" class="block text-sm font-head text-slate2 mb-1.5">Preferred time <span class="text-gold">*</span></label>
          <input id="preferred_time" name="preferred_time" type="time" required
            class="w-full bg-charcoal border border-gold/20 rounded-md px-4 py-3 text-ink focus-visible:border-gold" />
        </div>
      </div>
      <div>
        <label for="timezone" class="block text-sm font-head text-slate2 mb-1.5">Timezone <span class="text-gold">*</span></label>
        <input id="timezone" name="timezone" type="text" required maxlength="80"
          class="w-full bg-charcoal border border-gold/20 rounded-md px-4 py-3 text-ink focus-visible:border-gold" data-timezone-field />
        <p class="text-muted text-xs mt-1.5">Detected automatically \u2014 edit if this isn't right.</p>
      </div>

      <div>
        <label for="message" class="block text-sm font-head text-slate2 mb-1.5">Anything you'd like us to know? (optional)</label>
        <textarea id="message" name="message" rows="3" maxlength="2000"
          class="w-full bg-charcoal border border-gold/20 rounded-md px-4 py-3 text-ink focus-visible:border-gold"></textarea>
      </div>

      <!-- Honeypot field: hidden from real users, left blank by humans, often filled by bots -->
      <div class="absolute -left-[9999px]" aria-hidden="true">
        <label for="company_website_url">Leave this field blank</label>
        <input id="company_website_url" name="company_website_url" type="text" tabindex="-1" autocomplete="off" />
      </div>

      ${
        turnstileSiteKey
          ? `<div class="cf-turnstile" data-sitekey="${turnstileSiteKey}"></div>
      <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>`
          : ""
      }

      <div role="status" aria-live="polite" class="hidden text-sm" data-form-status tabindex="-1"></div>

      <button type="submit" data-form-submit class="btn-primary w-full">${config.ctaPrimary}</button>
      <p class="text-muted text-xs leading-relaxed">By submitting, you agree to be contacted about your inquiry. See our <a href="/privacy/" class="link-inline">Privacy Policy</a> for how your information is used.</p>
    </form>
  </div>
</section>
`;

module.exports = {
  path: "/contact/",
  title: "Contact | Request a Free Consultation | 2S Business Support Service",
  description:
    "Request a free consultation with 2S Business Support Service and find out what's realistic to automate in your business.",
  h1: "Request a Free Consultation",
  content,
  schemas: [],
  breadcrumbs: crumbs,
};
