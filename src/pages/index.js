const { workflowDiagram, faqAccordion, heroSphere, industrySelector } = require("../partials/ui");
const config = require("../data/site-config");

const heroWorkflow = workflowDiagram(
  "hero-workflow",
  [
    "New Lead",
    "AI Response",
    "Qualification",
    "CRM Updated",
    "Follow-Up",
    "Appointment",
    "Human Escalation",
  ],
  { signature: true }
);

const heroStatusSteps = [
  "Lead Captured",
  "AI Qualification",
  "CRM Updated",
  "Follow-Up Sent",
  "Appointment Booked",
];

const heroStatusList = heroStatusSteps
  .map(
    (label) => `
    <div class="flex items-center gap-3 bg-obsidian border border-gold/15 rounded-full px-4 py-2.5" data-workflow-node>
      <span class="status-dot" aria-hidden="true"></span>
      <span class="text-sm text-slate2 font-head">${label}</span>
    </div>`
  )
  .join("\n");

const industries = industrySelector([
  {
    id: "dental",
    label: "Dental",
    headline: "Dental: from first call to appointment",
    description:
      "A simple example of how our Dental AI Receptionist works, from an incoming call to a confirmed, tracked appointment.",
    steps: ["Incoming Call", "AI Receptionist", "FAQ / Qualification", "Appointment", "Reminder", "CRM / Staff Notification"],
    linkHref: "/about/#dental-demo",
    linkLabel: "Try the Dental AI Demo",
  },
  {
    id: "roofing",
    label: "Roofing",
    headline: "Roofing: from lead to estimate",
    description:
      "How a new roofing lead moves from first contact to a scheduled estimate, without sitting in an inbox.",
    steps: ["New Lead", "Qualification", "Automated Follow-Up", "Estimate Request", "Appointment", "CRM Pipeline"],
    linkHref: "/industries/roofing/",
    linkLabel: "See Roofing Automation",
  },
  {
    id: "hvac",
    label: "HVAC",
    headline: "HVAC: from missed call to booking",
    description:
      "How an HVAC company responds immediately to a missed call or web lead, even after hours.",
    steps: ["Missed Call / Form Lead", "Immediate AI Response", "Service Qualification", "Booking", "Reminder", "CRM Update"],
    linkHref: "/resources/hvac/how-ai-follows-up-with-hvac-leads-after-hours/",
    linkLabel: "See HVAC Automation",
  },
  {
    id: "service-business",
    label: "Service Business",
    headline: "Service businesses: a general-purpose flow",
    description:
      "The same underlying pattern applied to service businesses generally \u2014 capture, qualify, schedule, and follow up.",
    steps: ["New Inquiry", "AI Response", "Qualification", "Scheduling", "Follow-Up", "CRM Update"],
    linkHref: "/ai-automation-services/",
    linkLabel: "See AI Automation Services",
  },
  {
    id: "hr",
    label: "HR / Recruitment",
    headline: "HR: from application to recruiter review",
    description:
      "How 2S HR Intelligence takes a candidate from application through a structured interview and evaluation.",
    steps: ["Candidate Application", "Screening", "AI Interview", "Evaluation", "Scorecard", "Recruiter Review"],
    linkHref: "/about/#hr-demo",
    linkLabel: "Try the HR Intelligence Demo",
  },
]);

const faq = faqAccordion(
  [
    {
      q: "What does 2S Business Support Service actually do?",
      a: "2S builds AI assistants, automated workflows, CRM systems, and human-in-the-loop support for small and growing service businesses. The goal is to handle repetitive operational work \u2014 responding to leads, updating records, following up, scheduling \u2014 while keeping people available for judgment calls and exceptions.",
    },
    {
      q: "Does AI replace my staff?",
      a: "No. 2S automates repetitive, well-defined tasks \u2014 lead routing, CRM updates, follow-up messages, scheduling \u2014 and keeps humans involved for exceptions, complex conversations, and quality control. The goal is less repetitive work for your team, not fewer people.",
    },
    {
      q: "What happens when I request a free consultation?",
      a: "You tell us what's taking up the most time in your business through a short form. We review it and follow up to discuss which processes are realistic candidates for automation before recommending anything.",
    },
    {
      q: "Do you only work with roofing companies?",
      a: "No. Roofing was our first specialized industry focus; the same underlying services \u2014 AI assistants, workflow automation, CRM setup, and human-in-the-loop support \u2014 now also apply to dental and HVAC businesses, and to service businesses generally.",
    },
    {
      q: "Do you work with GoHighLevel and n8n specifically?",
      a: "Yes. GoHighLevel CRM automation and n8n workflow automation are core parts of how 2S builds these systems.",
    },
  ],
  `${config.url}/`
);

const content = `
<section data-reveal class="section pt-16 md:pt-24">
  <div class="container-content grid lg:grid-cols-2 gap-12 items-center">
    <div>
      <p class="eyebrow mb-4">Automate &middot; Streamline &middot; Grow</p>
      <h1 class="text-4xl md:text-5xl leading-[1.1] mb-6">Automate the Work.<br>Keep the Human Touch.</h1>
      <p class="text-slate2 text-lg leading-relaxed mb-8 max-w-lg">2S builds AI automation, connected business systems, websites, and reliable support around the way service businesses actually work.</p>
      <div class="flex flex-wrap gap-4 mb-8">
        <a href="/contact/" class="btn-primary" data-cta="hero-primary">Book a Free Consultation</a>
        <a href="/services/" class="btn-secondary" data-cta="hero-secondary">Explore Solutions</a>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div><p class="font-head font-bold text-gold text-sm uppercase tracking-wide">More Leads</p><p class="text-muted text-xs mt-1">Capture &amp; convert</p></div>
        <div><p class="font-head font-bold text-gold text-sm uppercase tracking-wide">Less Admin</p><p class="text-muted text-xs mt-1">Get time back</p></div>
        <div><p class="font-head font-bold text-emerald2 text-sm uppercase tracking-wide">Faster Follow-Up</p><p class="text-muted text-xs mt-1">Nothing sits idle</p></div>
        <div><p class="font-head font-bold text-emerald2 text-sm uppercase tracking-wide">Connected Systems</p><p class="text-muted text-xs mt-1">One source of truth</p></div>
      </div>
    </div>

    <div>
      ${heroSphere(config.logo.sphere, 260)}
      <div class="space-y-2.5 mt-8" data-signature-workflow>
        ${heroStatusList}
      </div>
    </div>
  </div>
</section>

<section data-reveal id="service-matrix" class="section bg-obsidian/40 scroll-mt-24">
  <div class="container-content">
    <p class="eyebrow mb-3">What We Do</p>
    <h2 class="text-2xl md:text-3xl mb-10 max-w-2xl">Your business. One connected system.</h2>
    <div data-reveal-group class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="card">
        <p class="font-head font-bold text-ink mb-2">AI Automation</p>
        <p class="text-slate2 text-sm leading-relaxed mb-3">Automate repetitive work and customer follow-up with AI assistants and connected workflows.</p>
        <a href="/ai-automation-services/" class="link-inline text-sm">Learn more &rarr;</a>
      </div>
      <div class="card">
        <p class="font-head font-bold text-ink mb-2">Business Systems</p>
        <p class="text-slate2 text-sm leading-relaxed mb-3">CRM, GoHighLevel, and operational workflows tailored to how your business runs.</p>
        <a href="/services/" class="link-inline text-sm">Learn more &rarr;</a>
      </div>
      <div class="card">
        <p class="font-head font-bold text-ink mb-2">Websites &amp; Funnels</p>
        <p class="text-slate2 text-sm leading-relaxed mb-3">Modern, high-converting websites and funnels built to support the systems behind them.</p>
        <a href="/pricing/" class="link-inline text-sm">Learn more &rarr;</a>
      </div>
      <div class="card">
        <p class="font-head font-bold text-ink mb-2">Human Support</p>
        <p class="text-slate2 text-sm leading-relaxed mb-3">Virtual assistance and customer support to keep things running when a person is needed.</p>
        <a href="/services/" class="link-inline text-sm">Learn more &rarr;</a>
      </div>
    </div>
    <a href="/services/" class="link-inline text-sm inline-block mt-8">Explore all solutions &rarr;</a>
  </div>
</section>

<section data-reveal class="section">
  <div class="container-content">
    <p class="eyebrow mb-3">Choose Your Industry</p>
    <h2 class="text-2xl md:text-3xl mb-8 max-w-2xl">See how our AI systems work for your business.</h2>
    ${industries}
  </div>
</section>

<section data-reveal id="lead-automation" class="section bg-obsidian/40 scroll-mt-24">
  <div class="container-content">
    <p class="eyebrow mb-3">Lead Automation</p>
    <h2 class="text-2xl md:text-3xl mb-4 max-w-2xl">From New Lead to Next Step \u2014 Automatically</h2>
    <p class="text-slate2 leading-relaxed max-w-2xl mb-10">Incoming leads can be captured, qualified, followed up with, routed, and tracked \u2014 without being left sitting in an inbox.</p>
    <div class="card">
      <p class="text-xs font-head uppercase tracking-wide text-muted mb-4">Live automation flow</p>
      ${heroWorkflow}
    </div>
  </div>
</section>

<section data-reveal id="roi-calculator" class="section scroll-mt-24">
  <div class="container-content">
    <p class="eyebrow mb-3">Automation Opportunity</p>
    <h2 class="text-2xl md:text-3xl mb-4 max-w-2xl">What Could Automated Lead Recovery Be Worth?</h2>
    <p class="text-slate2 leading-relaxed max-w-2xl mb-10">Estimate how many missed leads could realistically be recovered \u2014 and what that could be worth against the cost of automating it.</p>

    <div class="card md:grid md:grid-cols-2 md:gap-10" data-roi-calculator>
      <div class="space-y-7">
        <div>
          <div class="flex items-baseline justify-between mb-2">
            <label for="roi-leads" class="font-head text-sm text-slate2">Monthly leads</label>
            <output for="roi-leads" id="roi-leads-out" class="font-head font-bold text-gold text-lg">100</output>
          </div>
          <input type="range" id="roi-leads" min="0" max="1000" step="10" value="100" class="w-full accent-gold" aria-describedby="roi-leads-out" />
        </div>

        <div>
          <label for="roi-value" class="font-head text-sm text-slate2 block mb-2">Average customer value (USD)</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true">$</span>
            <input type="number" id="roi-value" min="0" max="50000" step="1" value="500" class="w-full bg-charcoal border border-gold/20 rounded-md pl-8 pr-4 py-3 text-ink focus-visible:border-gold" />
          </div>
        </div>

        <div>
          <div class="flex items-baseline justify-between mb-2">
            <label for="roi-missed" class="font-head text-sm text-slate2">Missed / unanswered leads</label>
            <output for="roi-missed" id="roi-missed-out" class="font-head font-bold text-gold text-lg">20%</output>
          </div>
          <input type="range" id="roi-missed" min="0" max="100" step="5" value="20" class="w-full accent-gold" aria-describedby="roi-missed-out" />
        </div>

        <div>
          <div class="flex items-baseline justify-between mb-2">
            <label for="roi-conversion" class="font-head text-sm text-slate2">Current conversion rate</label>
            <output for="roi-conversion" id="roi-conversion-out" class="font-head font-bold text-gold text-lg">10%</output>
          </div>
          <input type="range" id="roi-conversion" min="0" max="100" step="1" value="10" class="w-full accent-gold" aria-describedby="roi-conversion-out" />
        </div>

        <details class="border border-gold/15 rounded-md" data-roi-advanced>
          <summary class="font-head text-sm text-slate2 px-4 py-3 cursor-pointer select-none">Advanced Settings</summary>
          <div class="px-4 pb-4 space-y-6 pt-2">
            <div>
              <div class="flex items-baseline justify-between mb-2">
                <label for="roi-recovery" class="font-head text-sm text-slate2">Estimated recovery rate</label>
                <output for="roi-recovery" id="roi-recovery-out" class="font-head font-bold text-emerald2 text-lg">50%</output>
              </div>
              <input type="range" id="roi-recovery" min="0" max="100" step="5" value="50" class="w-full accent-emerald2" aria-describedby="roi-recovery-out" />
              <p class="text-muted text-xs mt-1.5">Of missed leads, what share could realistically be recovered by faster/automated response.</p>
            </div>
            <div>
              <label for="roi-admin-hours" class="font-head text-sm text-slate2 block mb-2">Estimated admin hours saved / month</label>
              <input type="number" id="roi-admin-hours" min="0" max="200" step="1" value="10" class="w-full bg-charcoal border border-gold/20 rounded-md px-4 py-3 text-ink focus-visible:border-gold" />
            </div>
            <div>
              <label for="roi-staff-cost" class="font-head text-sm text-slate2 block mb-2">Average staff hourly cost (USD)</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true">$</span>
                <input type="number" id="roi-staff-cost" min="0" max="500" step="1" value="20" class="w-full bg-charcoal border border-gold/20 rounded-md pl-8 pr-4 py-3 text-ink focus-visible:border-gold" />
              </div>
            </div>
            <div>
              <label for="roi-automation-cost" class="font-head text-sm text-slate2 block mb-2">Estimated automation cost / month (USD)</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true">$</span>
                <input type="number" id="roi-automation-cost" min="0" max="50000" step="1" value="399" class="w-full bg-charcoal border border-gold/20 rounded-md pl-8 pr-4 py-3 text-ink focus-visible:border-gold" data-roi-cost-default />
              </div>
              <p class="text-muted text-xs mt-1.5">Defaults to the current Automate plan's monthly rate \u2014 adjust to match your situation.</p>
            </div>
          </div>
        </details>
      </div>

      <div class="mt-8 md:mt-0 pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-gold/10 md:pl-10">
        <div class="rounded-lg border border-emerald2/40 bg-emerald2/5 px-5 py-5 mb-5" data-roi-result-card>
          <p class="text-xs font-head uppercase tracking-wide text-emerald2 mb-2">Estimated Net Benefit</p>
          <p class="font-head font-bold text-emerald2 text-3xl md:text-4xl" id="roi-net-benefit" aria-live="polite">$301/mo</p>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-5" data-roi-mini-grid>
          <div class="rounded-lg border border-gold/25 bg-charcoal px-4 py-4" data-roi-result-card>
            <p class="text-xs font-head uppercase tracking-wide text-gold mb-2">Leads Recovered</p>
            <p class="font-head font-bold text-ink text-xl md:text-2xl" id="roi-leads-recovered">10/mo</p>
          </div>
          <div class="rounded-lg border border-gold/25 bg-charcoal px-4 py-4" data-roi-result-card>
            <p class="text-xs font-head uppercase tracking-wide text-gold mb-2">Additional Revenue</p>
            <p class="font-head font-bold text-ink text-xl md:text-2xl" id="roi-additional-revenue">$500/mo</p>
          </div>
          <div class="rounded-lg border border-gold/25 bg-charcoal px-4 py-4" data-roi-result-card>
            <p class="text-xs font-head uppercase tracking-wide text-gold mb-2">Admin Time Saved</p>
            <p class="font-head font-bold text-ink text-xl md:text-2xl" id="roi-time-saved">10 hrs/mo</p>
          </div>
          <div class="rounded-lg border border-gold/25 bg-charcoal px-4 py-4" data-roi-result-card>
            <p class="text-xs font-head uppercase tracking-wide text-gold mb-2">Labor Value</p>
            <p class="font-head font-bold text-ink text-xl md:text-2xl" id="roi-labor-value">$200/mo</p>
          </div>
        </div>

        <div class="rounded-lg border border-gold/15 px-5 py-4 mb-5 text-sm" data-roi-result-card>
          <div class="flex items-center justify-between py-1">
            <span class="text-muted">Estimated Monthly Value</span>
            <span class="text-slate2 font-head font-semibold" id="roi-monthly-value">$700/mo</span>
          </div>
          <div class="flex items-center justify-between py-1">
            <span class="text-muted">Estimated Monthly Cost</span>
            <span class="text-slate2 font-head font-semibold" id="roi-monthly-cost">$399/mo</span>
          </div>
          <div class="flex items-center justify-between py-1 border-t border-gold/10 mt-1 pt-2">
            <span class="text-muted">Value-to-Cost Multiple</span>
            <span class="text-emerald2 font-head font-semibold" id="roi-value-to-cost">1.75\u00d7</span>
          </div>
          <div class="flex items-center justify-between py-1">
            <span class="text-muted">Estimated ROI</span>
            <span class="text-emerald2 font-head font-semibold" id="roi-percent">75%</span>
          </div>
        </div>

        <p class="text-muted text-xs leading-relaxed mb-6">Estimates only. Actual results vary by business, lead quality, conversion process, implementation and other factors.</p>

        <div class="border-t border-gold/10 pt-5">
          <a href="/contact/" class="btn-primary w-full md:w-auto" data-cta="roi-calculator" data-roi-cta>${config.ctaPrimary}</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section data-reveal id="ai-systems-preview" class="section bg-obsidian/40">
  <div class="container-content">
    <p class="eyebrow mb-3">Real Working Systems</p>
    <h2 class="text-2xl md:text-3xl mb-10 max-w-2xl">Featured AI Systems</h2>
    <div data-reveal-group class="grid md:grid-cols-2 gap-6">
      <div class="card">
        <span class="inline-flex items-center gap-1.5 text-[11px] font-head font-bold uppercase tracking-wide text-emerald2 mb-3">
          <span class="status-dot" style="background-color:#10B981" aria-hidden="true"></span>System Online
        </span>
        <p class="font-head font-bold text-ink text-xl mb-2">2S Dental AI Receptionist</p>
        <p class="text-slate2 text-sm leading-relaxed mb-4">Handles common dental inquiries, guides booking-related conversations, and supports after-hours response.</p>
        <a href="${config.dentalDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary" data-cta="home-dental-demo">Launch Interactive Demo</a>
      </div>
      <div class="card">
        <span class="inline-flex items-center gap-1.5 text-[11px] font-head font-bold uppercase tracking-wide text-emerald2 mb-3">
          <span class="status-dot" style="background-color:#10B981" aria-hidden="true"></span>System Online
        </span>
        <p class="font-head font-bold text-ink text-xl mb-2">2S HR Intelligence</p>
        <p class="text-slate2 text-sm leading-relaxed mb-4">Candidate screening, AI interviews, and evaluation scorecards for a structured recruitment workflow.</p>
        <a href="${config.hrDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary" data-cta="home-hr-demo">Launch Interactive Demo</a>
      </div>
    </div>
    <a href="/about/#ai-systems" class="link-inline text-sm inline-block mt-8">See all AI systems &rarr;</a>
  </div>
</section>

<section data-reveal class="section">
  <div class="container-content grid md:grid-cols-2 gap-10 items-start">
    <div>
      <p class="eyebrow mb-3">In practice</p>
      <h2 class="text-2xl md:text-3xl mb-4">A homeowner submits an inquiry at 9:42 PM.</h2>
      <div class="space-y-4 text-sm">
        <p><span class="text-gold font-head font-bold uppercase text-xs">Automation:</span> <span class="text-slate2">The system acknowledges the inquiry, collects approved initial information, creates or updates the CRM record, and provides the appropriate next step.</span></p>
        <p><span class="text-gold font-head font-bold uppercase text-xs">Human role:</span> <span class="text-slate2">The team handles qualified opportunities and situations requiring professional judgment.</span></p>
        <p><span class="text-gold font-head font-bold uppercase text-xs">Outcome:</span> <span class="text-slate2">A faster, more organized response process without requiring every step to be performed manually.</span></p>
      </div>
    </div>
    <div class="card">
      <p class="font-head font-bold text-ink mb-4 text-sm uppercase tracking-wide">Without automation vs. with 2S</p>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p class="text-muted font-head text-xs uppercase mb-2">Without</p>
          <ul class="text-slate2 space-y-1.5">
            <li>Slow follow-up</li><li>Manual CRM updates</li><li>Missed inquiries</li><li>Scattered information</li>
          </ul>
        </div>
        <div>
          <p class="text-emerald font-head text-xs uppercase mb-2">With 2S</p>
          <ul class="text-slate2 space-y-1.5">
            <li>Faster acknowledgment</li><li>Structured follow-up</li><li>Connected workflows</li><li>Clear next actions</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content">
    <p class="eyebrow mb-3">How 2S Works</p>
    <h2 class="text-2xl md:text-3xl mb-10">From repetitive work to reliable automation</h2>
    <div data-reveal-group class="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 text-sm">
      <div class="card"><p class="font-head font-bold text-gold mb-2">01 Discover</p><p class="text-slate2">Understand the business, bottlenecks, and existing tools.</p></div>
      <div class="card"><p class="font-head font-bold text-gold mb-2">02 Design</p><p class="text-slate2">Map the workflow and determine what should be automated.</p></div>
      <div class="card"><p class="font-head font-bold text-gold mb-2">03 Build</p><p class="text-slate2">Build and connect the required systems.</p></div>
      <div class="card"><p class="font-head font-bold text-gold mb-2">04 Test</p><p class="text-slate2">Verify the workflow before launch.</p></div>
      <div class="card"><p class="font-head font-bold text-gold mb-2">05 Support &amp; Improve</p><p class="text-slate2">Monitor, maintain, and improve the system.</p></div>
    </div>
  </div>
</section>

<section data-reveal class="section">
  <div class="container-content">
    <p class="eyebrow mb-3">Why 2S</p>
    <h2 class="text-2xl md:text-3xl mb-8 max-w-2xl">Powerful automation needs control</h2>
    <div data-reveal-group class="grid md:grid-cols-3 gap-6 text-sm">
      <div class="card"><p class="text-slate2">Defined permissions and clear automation boundaries for every workflow.</p></div>
      <div class="card"><p class="text-slate2">Human escalation paths and error handling built into each system.</p></div>
      <div class="card"><p class="text-slate2">Testing before launch, with data minimization and controlled access throughout.</p></div>
    </div>
  </div>
</section>

<section data-reveal class="section bg-obsidian/40">
  <div class="container-content">
    <p class="eyebrow mb-3">Resources</p>
    <h2 class="text-2xl md:text-3xl mb-8">Automation guides</h2>
    <div data-reveal-group class="grid md:grid-cols-2 gap-6">
      <a href="/resources/roofing/how-ai-follows-up-roofing-leads-after-hours/" class="card block hover:border-gold/40">
        <p class="text-xs text-emerald font-head uppercase tracking-wide mb-2">Roofing Automation</p>
        <p class="font-head font-bold text-ink">How AI Can Follow Up With Roofing Leads After Hours</p>
      </a>
      <a href="/resources/dental/how-ai-receptionists-handle-after-hours-dental-inquiries/" class="card block hover:border-gold/40">
        <p class="text-xs text-emerald font-head uppercase tracking-wide mb-2">Dental Automation</p>
        <p class="font-head font-bold text-ink">How AI Receptionists Handle After-Hours Dental Inquiries</p>
      </a>
    </div>
    <a href="/resources/" class="link-inline text-sm inline-block mt-6">Browse all resources &rarr;</a>
  </div>
</section>

<section data-reveal id="faq" class="section scroll-mt-24">
  <div class="container-content max-w-3xl">
    <h2 class="text-2xl md:text-3xl mb-8">Frequently asked questions</h2>
    ${faq.html}
  </div>
</section>

<section data-reveal class="section">
  <div class="container-content text-center">
    <h2 class="text-2xl md:text-3xl mb-6">Ready to build a smarter business?</h2>
    <a href="/contact/" class="btn-primary" data-cta="final-cta">Book a Free Consultation</a>
  </div>
</section>
`;

module.exports = {
  path: "/",
  title: "AI Automation & Business Support | 2S Business Support Service",
  description:
    "2S builds AI assistants, automated workflows, CRM systems, and human-in-the-loop support that handle repetitive operations, follow up with leads, and keep your business moving.",
  h1: "Automate the Work. Keep the Human Touch.",
  content,
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: config.entityName,
      url: config.url,
      description: `${config.entityName} is ${config.category}.`,
      knowsAbout: config.capabilities,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: config.entityName,
      url: config.url,
    },
    faq.schema,
  ],
  breadcrumbs: null,
};
