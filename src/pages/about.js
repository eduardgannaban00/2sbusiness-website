const { visibleBreadcrumbs } = require("../partials/ui");
const config = require("../data/site-config");
const { getPublicDemoUrl } = require("../data/demo-registry");

const dentalDemoUrl = getPublicDemoUrl("dental");
const hrDemoUrl = getPublicDemoUrl("hr");

const crumbs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about/" },
];

const content = `
${visibleBreadcrumbs(crumbs)}
<section data-reveal class="section pt-8">
  <div class="container-content max-w-2xl">
    <p class="eyebrow mb-4">About</p>
    <h1 class="text-4xl md:text-5xl mb-6">About 2S Business Support Service</h1>
    <p class="text-slate2 text-lg leading-relaxed mb-6">2S Business Support Service builds AI assistants, workflow automation, CRM systems, and human-in-the-loop support for small and growing service businesses. The goal is a practical Business OS made from the modules that fit—not a one-size-fits-all bundle.</p>
    <p class="text-slate2 leading-relaxed mb-6">Our approach starts from a simple principle: automate what machines do well \u2014 repetitive, well-defined, high-volume work \u2014 and keep people involved where judgment, exceptions, and quality matter. We'd rather build a smaller number of workflows that actually hold up in daily use than a long feature list that looks impressive and doesn't get used.</p>
    <p class="text-slate2 leading-relaxed">We started by validating this approach deeply in roofing, and have since expanded the same underlying systems into dental and HVAC \u2014 with more industries planned as each vertical proves out.</p>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content max-w-2xl">
    <h2 class="text-2xl md:text-3xl mb-6">What we build with</h2>
    <ul class="text-slate2 space-y-2">
      ${config.capabilities.map((c) => `<li>${c}</li>`).join("\n")}
    </ul>
  </div>
</section>

<section data-reveal class="section">
  <div class="container-content max-w-2xl">
    <h2 class="text-2xl md:text-3xl mb-6">How we work</h2>
    <p class="text-slate2 leading-relaxed mb-4">After you request a consultation, we start with a conversation about what's actually taking up your team's time \u2014 not a sales pitch. From there:</p>
    <ol class="text-slate2 space-y-3 leading-relaxed list-decimal list-inside">
      <li>We review what you've described and identify which parts are realistic to automate.</li>
      <li>You get a plain-language recommendation, including a written proposal before any build work starts.</li>
      <li>Any third-party software, API, or telephony costs required for your automation are explained upfront in that proposal \u2014 never added after the fact.</li>
      <li>We build, test, and hand off the workflow, with human escalation points defined before launch.</li>
    </ol>
  </div>
</section>

<section data-reveal id="ai-systems" class="section bg-obsidian/40 scroll-mt-24">
  <div class="container-content max-w-3xl">
    <p class="eyebrow mb-3">Real Working Systems</p>
    <h2 class="text-2xl md:text-3xl mb-4">See what we build</h2>
    <p class="text-slate2 leading-relaxed mb-8">These are real systems we've built \u2014 not mockups. Each one is clearly labeled <strong class="text-ink">"2S Demo Build"</strong> so it's never mistaken for client work or a completed case study.</p>

    <div class="grid md:grid-cols-2 gap-6">
      <div id="dental-demo" class="card scroll-mt-24">
        <span class="inline-flex items-center gap-1.5 text-[11px] font-head font-bold uppercase tracking-wide text-emerald2 mb-3">
          <span class="status-dot" style="background-color:#10B981" aria-hidden="true"></span>System Online
        </span>
        <span class="inline-block text-[11px] font-head font-bold uppercase tracking-wide text-charcoal bg-gold rounded px-2 py-1 mb-4">2S Demo Build</span>
        <p class="font-head font-bold text-ink text-xl mb-2">Dental AI Receptionist</p>
        <p class="text-slate2 leading-relaxed mb-4">See how an AI receptionist can handle common dental inquiries, guide booking-related conversations, and help practices respond after hours.</p>
        <ul class="text-slate2 text-sm space-y-1.5 mb-5">
          <li>Answers common practice and service questions</li>
          <li>Guides booking-related inquiries</li>
          <li>Handles routine after-hours conversations</li>
          <li>Demonstrates automated front-desk support</li>
        </ul>
        <p class="text-muted text-xs leading-relaxed mb-5">This demo is illustrative only and is not intended for medical diagnosis, emergencies, or clinical advice.</p>
        ${
          dentalDemoUrl
            ? `<a href="${dentalDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary" data-cta="dental-demo">Try the Dental AI Demo</a>`
            : `<span class="inline-flex items-center gap-2 text-muted text-sm border border-gold/15 rounded-md px-4 py-2.5"><span class="status-dot" aria-hidden="true"></span>Live demo link coming soon</span>`
        }
      </div>

      <div id="hr-demo" class="card scroll-mt-24">
        <span class="inline-flex items-center gap-1.5 text-[11px] font-head font-bold uppercase tracking-wide text-emerald2 mb-3">
          <span class="status-dot" style="background-color:#10B981" aria-hidden="true"></span>System Online
        </span>
        <span class="inline-block text-[11px] font-head font-bold uppercase tracking-wide text-charcoal bg-gold rounded px-2 py-1 mb-4">2S Demo Build</span>
        <p class="font-head font-bold text-ink text-xl mb-2">2S HR Intelligence</p>
        <p class="text-slate2 leading-relaxed mb-4">A structured recruitment workflow \u2014 candidate screening, an AI-guided interview, and an evaluation scorecard for recruiter review.</p>
        <ul class="text-slate2 text-sm space-y-1.5 mb-5">
          <li>Candidate screening</li>
          <li>AI-guided interview</li>
          <li>Candidate evaluation &amp; scorecard</li>
          <li>Recruiter review workflow</li>
        </ul>
        <p class="text-muted text-xs leading-relaxed mb-5">This demo is illustrative only and is not a hiring decision or employment recommendation.</p>
        ${
          hrDemoUrl
            ? `<a href="${hrDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary" data-cta="hr-demo">Try the HR Intelligence Demo</a>`
            : `<span class="inline-flex items-center gap-2 text-muted text-sm border border-gold/15 rounded-md px-4 py-2.5"><span class="status-dot" aria-hidden="true"></span>Live demo link coming soon</span>`
        }
      </div>
    </div>
  </div>
</section>

<section data-reveal class="section text-center">
  <div class="container-content">
    <a href="/contact/" class="btn-primary" data-cta="about-final">${config.ctaPrimary}</a>
  </div>
</section>
`;

module.exports = {
  path: "/about/",
  title: "About 2S Business Support Service",
  description:
    "2S Business Support Service builds AI assistants, workflow automation, CRM systems, and human-in-the-loop support for service businesses.",
  h1: "About 2S Business Support Service",
  content,
  schemas: [],
  breadcrumbs: crumbs,
};
