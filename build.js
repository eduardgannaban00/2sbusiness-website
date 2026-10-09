const fs = require("fs");
const path = require("path");
const { renderPage, breadcrumbSchema, config } = require("./src/partials/layout");
const pricingConfig = require("./src/data/pricing-config");
const { demos } = require("./src/data/demo-registry");

const pages = [
  require("./src/pages/index"), require("./src/pages/services"), require("./src/pages/pricing"),
  require("./src/pages/demos"), require("./src/pages/ai-automation-services"), require("./src/pages/industries"),
  require("./src/pages/industries-roofing"), require("./src/pages/industries-dental"), require("./src/pages/industries-hvac"),
  require("./src/pages/ai-assistant-roofing"),
  require("./src/pages/roofing-lead-follow-up"), require("./src/pages/resources"),
  require("./src/pages/article-after-hours"), require("./src/pages/article-doesnt-know"),
  require("./src/pages/article-roofing-followup-automation"), require("./src/pages/article-roofing-delayed-contact"),
  require("./src/pages/article-roofing-crm-explained"), require("./src/pages/article-dental-after-hours"),
  require("./src/pages/article-dental-scope"), require("./src/pages/article-dental-cost"),
  require("./src/pages/article-dental-comparison"), require("./src/pages/article-dental-reminders"),
  require("./src/pages/article-hvac-after-hours"), require("./src/pages/article-hvac-receptionist"),
  require("./src/pages/article-hvac-crm-explained"), require("./src/pages/article-hvac-followup"),
  require("./src/pages/about"), require("./src/pages/contact"), require("./src/pages/privacy"),
];

const distDir = path.join(__dirname, "dist");
fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });
const seenH1 = new Map();
const seenTitle = new Map();

pages.forEach((page) => {
  const schemas = [...page.schemas];
  if (page.breadcrumbs) schemas.push(breadcrumbSchema(page.path, page.breadcrumbs));
  const html = renderPage({
    path: page.path, title: page.title, description: page.description,
    h1: page.h1, content: page.content, schemas,
  });
  const outDir = page.path === "/" ? distDir : path.join(distDir, page.path.replace(/^\//, ""));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
  if (seenH1.has(page.h1)) console.warn(`WARNING: duplicate H1 "${page.h1}" also used on ${seenH1.get(page.h1)}`);
  seenH1.set(page.h1, page.path);
  if (seenTitle.has(page.title)) console.warn(`WARNING: duplicate <title> also used on ${seenTitle.get(page.title)}`);
  seenTitle.set(page.title, page.path);
});

const urls = pages.map((page) => `  <url><loc>${config.url}${page.path}</loc></url>`).join("\n");
fs.writeFileSync(path.join(distDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, "utf8");
fs.writeFileSync(path.join(distDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${config.url}/sitemap.xml\n`, "utf8");

const staticSrc = path.join(__dirname, "src", "static");
fs.readdirSync(staticSrc, { withFileTypes: true }).forEach((entry) => {
  if (entry.isFile()) fs.copyFileSync(path.join(staticSrc, entry.name), path.join(distDir, entry.name));
});

const brandSrc = path.join(__dirname, "src", "assets", "brand");
const brandDest = path.join(distDir, "assets", "brand");
fs.mkdirSync(brandDest, { recursive: true });
if (fs.existsSync(brandSrc)) {
  fs.readdirSync(brandSrc).forEach((file) => fs.copyFileSync(path.join(brandSrc, file), path.join(brandDest, file)));
}

fs.mkdirSync(path.join(distDir, "assets"), { recursive: true });
fs.writeFileSync(path.join(distDir, "assets", "pricing-config.js"), `window.PricingConfig = ${JSON.stringify(pricingConfig)};\n`, "utf8");
fs.writeFileSync(path.join(distDir, "assets", "demo-config.js"), `window.DemoRegistry = ${JSON.stringify(demos)};\n`, "utf8");

console.log(`Built ${pages.length} pages to /dist`);
console.log("Page list:");
pages.forEach((page) => console.log(`  ${page.path}`));
console.log(`Copied ${fs.readdirSync(brandDest).length} brand assets to /dist/assets/brand`);
console.log("HTML, metadata, static files, and browser configuration generated");
