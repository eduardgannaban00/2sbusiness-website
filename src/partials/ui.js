function visibleBreadcrumbs(crumbs) {
  const items = crumbs
    .map((c, i) => {
      const isLast = i === crumbs.length - 1;
      return isLast
        ? `<span class="text-slate2" aria-current="page">${c.name}</span>`
        : `<a href="${c.href}" class="text-muted hover:text-gold">${c.name}</a><span class="text-muted mx-2" aria-hidden="true">/</span>`;
    })
    .join("");
  return `<nav aria-label="Breadcrumb" class="container-content pt-6 text-xs md:text-sm"><div class="flex flex-wrap items-center">${items}</div></nav>`;
}

/**
 * Workflow diagram: fully understandable with zero motion/JS.
 * Static: connected node list with arrows/labels, always visible as plain HTML.
 * JS (main.js) progressively adds a sequential pulse highlight — pure enhancement.
 */
function workflowDiagram(id, steps, options) {
  var isSignature = options && options.signature;
  const nodes = steps
    .map((step, i) => {
      const isLast = i === steps.length - 1;
      return `
      <div class="flex items-center gap-3 md:gap-4 shrink-0">
        <div class="node-card" data-workflow-node data-index="${i}">
          <span class="status-dot" aria-hidden="true"></span>
          <span class="font-head text-xs md:text-sm font-semibold text-ink uppercase tracking-wide">${step}</span>
        </div>
        ${
          !isLast
            ? `<svg class="w-6 h-6 md:w-8 md:h-8 text-gold/50 rotate-90 md:rotate-0 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="4" y1="12" x2="20" y2="12"/><polyline points="14 6 20 12 14 18"/></svg>`
            : ""
        }
      </div>`;
    })
    .join("\n");

  return `
  <div id="${id}" class="w-full" data-workflow-diagram${isSignature ? " data-signature-workflow" : ""}>
    <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-x-2 md:gap-y-4 md:flex-wrap py-2">
      ${nodes}
    </div>
  </div>
  <p class="sr-only">Workflow sequence: ${steps.join(" → ")}.</p>`;
}

/**
 * FAQ accordion — returns { html, schema }. Works with no JS (details/summary-style
 * fallback via [open] attribute is avoided in favor of button+CSS max-height, but content
 * is always in the DOM and readable even if the toggle script fails, since panels
 * default to visible content, only collapsed height without JS running is handled by
 * main.js applying the collapsed state — see main.js).
 */
function faqAccordion(items, pageUrl) {
  const idPrefix = `faq-${String(pageUrl || "page")
    .replace(/^https?:\/\/[^/]+/, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "") || "home"}`;
  const html = items
    .map(
      (item, i) => `
    <div class="faq-item" data-faq-item>
      <h3>
        <button type="button" id="${idPrefix}-trigger-${i}" class="faq-trigger" data-faq-trigger aria-expanded="false" aria-controls="${idPrefix}-panel-${i}">
          <span>${item.q}</span>
          <svg class="w-5 h-5 text-gold shrink-0 transition-transform duration-200" data-faq-icon viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </h3>
      <div id="${idPrefix}-panel-${i}" class="faq-panel" data-faq-panel role="region" aria-labelledby="${idPrefix}-trigger-${i}">
        <p class="text-slate2 leading-relaxed">${item.a}</p>
      </div>
    </div>`
    )
    .join("\n");

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return { html: `<div class="space-y-3" data-faq-group>${html}</div>`, schema };
}

/**
 * Icon-only social links — no visible URL or username text anywhere,
 * accessible via aria-label, safe target/rel on every link.
 */
function socialLinks(social, extraClass) {
  const icons = {
    facebook:
      '<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-5 h-5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.1 3.77-2.1 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.35-.02-3.1-1.9-3.1-1.9 0-2.2 1.48-2.2 3v5.7H9z"/></svg>',
  };
  const labels = { facebook: "Facebook", instagram: "Instagram", linkedin: "LinkedIn" };

  return Object.keys(icons)
    .map(
      (key) => `
      <a href="${social[key]}" target="_blank" rel="noopener noreferrer" aria-label="${labels[key]}" title="${labels[key]}"
         class="inline-flex items-center justify-center min-w-11 min-h-11 ${extraClass || "text-muted hover:text-gold transition-colors duration-200"}">
        ${icons[key]}
      </a>`
    )
    .join("\n");
}

/**
 * Hero "network sphere" — lightweight SVG + CSS only (no WebGL/canvas).
 * The ring/node network rotates slowly via a CSS animation; the logo is a
 * separate, absolutely-positioned layer on top and never rotates. Under
 * prefers-reduced-motion, the site's existing global override (which forces
 * animation-duration to ~0 on every element) freezes the rotation and node
 * pulses automatically — no extra reduced-motion code needed here.
 */
function heroSphere(logoSrc, size) {
  size = size || 280;
  const cx = size / 2;
  const cy = size / 2;
  const ringR = size * 0.48;
  const nodeCount = 8;
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2;
    nodes.push({
      x: (cx + ringR * Math.cos(angle)).toFixed(1),
      y: (cy + ringR * Math.sin(angle)).toFixed(1),
      pulse: i % 3 === 0, // a few nodes pulse green, not all — restrained, not flashy
    });
  }
  // Connect each node to its neighbor plus one cross-link for a network feel.
  const lines = nodes
    .map((n, i) => {
      const next = nodes[(i + 1) % nodeCount];
      const cross = nodes[(i + 3) % nodeCount];
      return `<line x1="${n.x}" y1="${n.y}" x2="${next.x}" y2="${next.y}" stroke="rgba(212,175,55,0.25)" stroke-width="1"/>
              <line x1="${n.x}" y1="${n.y}" x2="${cross.x}" y2="${cross.y}" stroke="rgba(212,175,55,0.12)" stroke-width="1"/>`;
    })
    .join("\n");
  const nodeDots = nodes
    .map(
      (n, i) =>
        `<circle cx="${n.x}" cy="${n.y}" r="3.5" fill="${n.pulse ? "#00E676" : "#D4AF37"}" class="${
          n.pulse ? "sphere-node-pulse" : ""
        }" style="animation-delay:${(i * 0.4).toFixed(1)}s"/>`
    )
    .join("\n");

  return `
  <div class="relative mx-auto" style="width:${size}px;height:${size}px;max-width:100%" aria-hidden="true">
    <div class="absolute inset-0 sphere-rotate">
      <svg viewBox="0 0 ${size} ${size}" class="w-full h-full">
        <circle cx="${cx}" cy="${cy}" r="${size * 0.49}" fill="none" stroke="rgba(212,175,55,0.15)" stroke-width="1"/>
        <circle cx="${cx}" cy="${cy}" r="${size * 0.36}" fill="none" stroke="rgba(212,175,55,0.1)" stroke-width="1"/>
        ${lines}
        ${nodeDots}
      </svg>
    </div>
    <img src="${logoSrc}" alt="" width="96" height="96"
         class="absolute inset-0 m-auto w-24 h-24 rounded-full shadow-goldglow" />
  </div>`;
}

/**
 * Industry Selector — accessible tabs over per-industry workflow diagrams.
 * Progressive enhancement, same pattern as the FAQ accordion: without JS,
 * every panel is visible and fully readable (each with its own workflow
 * diagram and link) — nothing depends on the tabs actually working. With
 * JS, main.js hides all but one panel and wires up real tab switching.
 */
function industrySelector(industries) {
  const tabs = industries
    .map(
      (ind, i) => `
      <button type="button" role="tab" id="industry-tab-${ind.id}" aria-controls="industry-panel-${ind.id}"
        aria-selected="${i === 0 ? "true" : "false"}" tabindex="${i === 0 ? "0" : "-1"}" data-industry-tab="${ind.id}"
        class="industry-tab font-head text-sm font-semibold uppercase tracking-wide px-4 py-2.5 rounded-md border transition-colors duration-200 ${
          i === 0 ? "border-gold bg-gold text-charcoal" : "border-gold/20 text-slate2 hover:border-gold/40"
        }">${ind.label}</button>`
    )
    .join("\n");

  const panels = industries
    .map((ind) => {
      const wf = workflowDiagram(`industry-workflow-${ind.id}`, ind.steps);
      return `
      <div role="tabpanel" id="industry-panel-${ind.id}" aria-labelledby="industry-tab-${ind.id}" data-industry-panel="${ind.id}">
        <div class="card">
          <p class="font-head font-bold text-ink mb-1">${ind.headline}</p>
          <p class="text-slate2 text-sm leading-relaxed mb-6">${ind.description}</p>
          ${wf}
          <a href="${ind.linkHref}" class="link-inline text-sm inline-block mt-6">${ind.linkLabel} &rarr;</a>
        </div>
      </div>`;
    })
    .join("\n");

  return `
  <div data-industry-selector>
    <div role="tablist" aria-label="Choose your industry" class="flex flex-wrap gap-2.5 mb-8">
      ${tabs}
    </div>
    <div class="space-y-6" data-industry-panels>
      ${panels}
    </div>
  </div>`;
}

/**
 * Visible article metadata line — category + date. The date shown is the
 * real date this content was authored/last touched in the build (not a
 * fabricated or invented figure); dateModified is optional and only shown
 * when it genuinely differs from datePublished.
 */
function articleMeta(category, datePublished, dateModified) {
  if (!datePublished) {
    // Pre-launch state: the site hasn't gone live yet, so there is no real
    // publication date to show. We deliberately omit the date rather than
    // showing a source-file timestamp or any other stand-in for one.
    return `
  <div class="flex items-center gap-2 text-xs text-muted mb-4">
    <span class="text-emerald font-head uppercase tracking-wide">${category}</span>
  </div>`;
  }
  var updatedLine =
    dateModified && dateModified !== datePublished
      ? ` &middot; Updated ${formatArticleDate(dateModified)}`
      : "";
  return `
  <div class="flex items-center gap-2 text-xs text-muted mb-4">
    <span class="text-emerald font-head uppercase tracking-wide">${category}</span>
    <span aria-hidden="true">&middot;</span>
    <time datetime="${datePublished}">${formatArticleDate(datePublished)}</time>${updatedLine}
  </div>`;
}

function formatArticleDate(iso) {
  var d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

/**
 * Related Resources block — a small set of other articles/pages, rendered
 * as a distinct card group rather than inline text links, so it reads as
 * real cross-navigation rather than an afterthought.
 */
function relatedResources(items) {
  const cards = items
    .map(
      (item) => `
      <a href="${item.href}" class="card block hover:border-gold/40">
        <p class="text-xs text-emerald font-head uppercase tracking-wide mb-2">${item.category}</p>
        <p class="font-head font-bold text-ink text-sm">${item.title}</p>
      </a>`
    )
    .join("\n");
  return `
  <div class="mt-10">
    <p class="font-head font-bold text-ink text-sm uppercase tracking-wide mb-4">Related Resources</p>
    <div class="grid sm:grid-cols-2 gap-4">
      ${cards}
    </div>
  </div>`;
}

/**
 * Builds Article JSON-LD, omitting datePublished/dateModified entirely
 * when not supplied — used for the pre-launch state, where there is no
 * real publication date yet. Once the site goes live, pass real ISO dates
 * and they'll be included; until then, nothing date-related is fabricated
 * or asserted in the schema.
 */
function articleSchema(fields) {
  var schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fields.headline,
    author: { "@type": "Organization", name: fields.entityName },
    publisher: { "@type": "Organization", name: fields.entityName, url: fields.url },
    mainEntityOfPage: fields.mainEntityOfPage,
  };
  if (fields.datePublished) schema.datePublished = fields.datePublished;
  if (fields.dateModified) schema.dateModified = fields.dateModified;
  return schema;
}

module.exports = {
  visibleBreadcrumbs,
  workflowDiagram,
  faqAccordion,
  socialLinks,
  heroSphere,
  industrySelector,
  articleMeta,
  relatedResources,
  articleSchema,
};
