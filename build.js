const fs = require("fs");
const path = require("path");
const { renderPage, breadcrumbSchema, config } = require("./src/partials/layout");
const pricingConfig = require("./src/data/pricing-config");
const { demos } = require("./src/data/demo-registry");

const pages = [
  require("./src/pages/index"),
  require("./src/pages/services"),
  require("./src/pages/pricing"),
  require("./src/pages/demos"),
  require("./src/pages/ai-automation-services"),
  require("./src/pages/industries"),
  require("./src/pages/industries-roofing"),
  require("./src/pages/ai-assistant-roofing"),
  require("./src/pages/roofing-lead-follow-up"),
  require("./src/pages/resources"),
  require("./src/pages/article-after-hours"),
  require("./src/pages/article-doesnt-know"),
  require("./src/pages/article-roofing-followup-automation"),
  require("./src/pages/article-roofing-delayed-contact"),
  require("./src/pages/article-roofing-crm-explained"),
  require("./src/pages/article-dental-after-hours"),
  require("./src/pages/article-dental-scope"),
  require("./src/pages/article-dental-cost"),
  require("./src/pages/article-dental-comparison"),
  require("./src/pages/article-dental-reminders"),
  require("./src/pages/article-hvac-after-hours"),
  require("./src/pages/article-hvac-receptionist"),
  require("./src/pages/article-hvac-crm-explained"),
  require("./src/pages/article-hvac-followup"),
  require("./src/pages/about"),
  require("./src/pages/contact"),
  require("./src/pages/privacy"),
];

const distDir = path.join(__dirname, "dist");
fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

const seenH1 = new Map();
const seenTitle = new Map();

pages.forEach((page) => {
  const schemas = [...page.schemas];
  if (page.breadcrumbs) {
    schemas.push(breadcrumbSchema(page.path, page.breadcrumbs));
  }

  const html = renderPage({
    path: page.path,
    title: page.title,
    description: page.description,
    h1: page.h1,
    content: page.content,
    schemas,
  });

  const outDir =
    page.path === "/" ? distDir : path.join(distDir, page.path.replace(/^\//, ""));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");

  // QA checks
  if (seenH1.has(page.h1)) {
    console.warn(`WARNING: duplicate H1 "${page.h1}" also used on ${seenH1.get(page.h1)}`);
  }
  seenH1.set(page.h1, page.path);
  if (seenTitle.has(page.title)) {
    console.warn(`WARNING: duplicate <title> also used on ${seenTitle.get(page.title)}`);
  }
  seenTitle.set(page.title, page.path);
});

// sitemap.xml
const urls = pages
  .map(
    (p) =>
      `  <url><loc>${config.url}${p.path}</loc></url>`
  )
  .join("\n");
fs.writeFileSync(
  path.join(distDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  "utf8"
);

// robots.txt
fs.writeFileSync(
  path.join(distDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${config.url}/sitemap.xml\n`,
  "utf8"
);

// Cloudflare Pages reads response-header rules from the generated _headers
// file. Keep the source policy reviewable under src/static/.
fs.copyFileSync(
  path.join(__dirname, "src", "static", "_headers"),
  path.join(distDir, "_headers")
);

// Copy brand assets (official logo derivatives) into dist/assets/brand/
const brandSrc = path.join(__dirname, "src", "assets", "brand");
const brandDest = path.join(distDir, "assets", "brand");
fs.mkdirSync(brandDest, { recursive: true });
if (fs.existsSync(brandSrc)) {
  fs.readdirSync(brandSrc).forEach((file) => {
    fs.copyFileSync(path.join(brandSrc, file), path.join(brandDest, file));
  });
}

// Generate the browser-consumable copy of the centralized pricing config
// (used by the chatbot and the ROI calculator's default automation cost).
// This is a generated build artifact — src/data/pricing-config.js remains
// the single source of truth; nothing here is hand-maintained separately.
fs.mkdirSync(path.join(distDir, "assets"), { recursive: true });
fs.writeFileSync(
  path.join(distDir, "assets", "pricing-config.js"),
  `window.PricingConfig = ${JSON.stringify(pricingConfig)};\n`,
  "utf8"
);
fs.writeFileSync(
  path.join(distDir, "assets", "demo-config.js"),
  `window.DemoRegistry = ${JSON.stringify(demos)};\n`,
  "utf8"
);

console.log(`Built ${pages.length} pages to /dist`);
console.log("Page list:");
pages.forEach((p) => console.log(`  ${p.path}`));
console.log(
  `Copied ${fs.readdirSync(brandDest).length} brand assets to /dist/assets/brand`
);
console.log(
  "\nNOTE: CSS/JS are compiled/copied separately — run:\n" +
    "  npx tailwindcss -i ./src/css/input.css -o ./dist/assets/styles.css --minify\n" +
    "  cp ./src/js/main.js ./dist/assets/main.js"
);
