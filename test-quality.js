const assert = require("assert");
const fs = require("fs");
const path = require("path");
const config = require("./src/data/site-config");
const { demos } = require("./src/data/demo-registry");

const root = __dirname;
const dist = path.join(root, "dist");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function webPath(file) {
  const relative = path.relative(dist, path.dirname(file)).replace(/\\/g, "/");
  return relative ? `/${relative}/` : "/";
}

function match(html, expression, message) {
  const found = html.match(expression);
  assert.ok(found, message);
  return found[1];
}

const files = walk(dist);
const htmlFiles = files.filter((file) => path.basename(file) === "index.html");
assert.strictEqual(htmlFiles.length, 27, "release candidate must contain exactly 27 routes");

const routes = new Map(htmlFiles.map((file) => [webPath(file), fs.readFileSync(file, "utf8")]));
const routeSet = new Set(routes.keys());
const titles = new Set();
const descriptions = new Set();
const canonicals = new Set();
const inbound = new Map([...routeSet].map((route) => [route, 0]));
const pricingHtml = routes.get("/pricing/");
assert.ok(pricingHtml, "pricing route must be generated");
for (const stalePrice of ["From $999", "From $999 setup + $399/mo", "From $899/mo", "$399/mo", "$899/mo"]) {
  assert.ok(!pricingHtml.includes(stalePrice), `pricing page contains stale custom price ${stalePrice}`);
}
for (const packagePrice of ["$499", "$199", "$799", "$299", "$1,299", "$499"]) {
  assert.ok(pricingHtml.includes(packagePrice), `pricing page lost packaged price ${packagePrice}`);
}
assert.strictEqual((pricingHtml.match(/Custom Quote/g) || []).length, 3, "custom pricing cards must use Custom Quote");

for (const [route, html] of routes) {
  const title = match(html, /<title>([^<]+)<\/title>/, `${route}: missing title`);
  const description = match(html, /<meta name="description" content="([^"]+)"/, `${route}: missing description`);
  const canonical = match(html, /<link rel="canonical" href="([^"]+)"/, `${route}: missing canonical`);
  assert.ok(!titles.has(title), `${route}: duplicate title`);
  assert.ok(!descriptions.has(description), `${route}: duplicate description`);
  assert.ok(!canonicals.has(canonical), `${route}: duplicate canonical`);
  titles.add(title);
  descriptions.add(description);
  canonicals.add(canonical);
  assert.strictEqual(canonical, `${config.url}${route}`, `${route}: canonical mismatch`);
  assert.ok(/<nav[^>]*class="[^"]*bg-charcoal/.test(html), `${route}: header must have an opaque charcoal background`);
  assert.ok(!html.includes("bg-charcoal/90"), `${route}: header still uses transparent scroll background`);
  assert.ok(/<meta name="robots" content="index, follow">/.test(html), `${route}: missing robots directive`);
  for (const tag of ["og:title", "og:description", "og:url", "og:image", "twitter:card", "twitter:title", "twitter:description", "twitter:image"]) {
    assert.ok(html.includes(`\"${tag}\"`), `${route}: missing ${tag}`);
  }
  assert.strictEqual((html.match(/<h1[\s>]/g) || []).length, 1, `${route}: expected one H1`);
  const headings = [...html.matchAll(/<h([1-6])\b/g)].map((item) => Number(item[1]));
  assert.strictEqual(headings[0], 1, `${route}: first heading must be H1`);
  headings.slice(1).forEach((level, index) => {
    assert.ok(level <= headings[index] + 1, `${route}: skipped heading level H${headings[index]} to H${level}`);
  });
  for (const image of html.matchAll(/<img\b[^>]*>/g)) {
    assert.ok(/\salt="[^"]*"/.test(image[0]), `${route}: image missing alt`);
    assert.ok(/\swidth="\d+"/.test(image[0]) && /\sheight="\d+"/.test(image[0]), `${route}: image missing dimensions`);
  }
  for (const table of html.matchAll(/<table\b.*?<\/table>/gs)) {
    assert.ok(/<caption\b/.test(table[0]), `${route}: data table missing caption`);
    assert.ok(!/<th\b(?![^>]*scope=)/.test(table[0]), `${route}: table header missing scope`);
  }

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((item) => item[1]);
  assert.strictEqual(ids.length, new Set(ids).size, `${route}: duplicate HTML id`);
  for (const label of html.matchAll(/<label[^>]+for="([^"]+)"/g)) {
    assert.ok(ids.includes(label[1]), `${route}: label target ${label[1]} is missing`);
  }
  for (const json of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    const schema = JSON.parse(json[1]);
    assert.strictEqual(schema["@context"], "https://schema.org", `${route}: unexpected JSON-LD context`);
    assert.ok(!JSON.stringify(schema).includes("aggregateRating"), `${route}: unverified rating schema`);
  }
  for (const link of html.matchAll(/<a\b([^>]*?)href="([^"]+)"([^>]*)>/g)) {
    const attrs = `${link[1]} ${link[3]}`;
    const href = link[2];
    assert.notStrictEqual(href, "#", `${route}: placeholder href`);
    if (/target="_blank"/.test(attrs)) {
      assert.ok(/rel="[^"]*noopener[^"]*"/.test(attrs), `${route}: unsafe target=_blank link`);
    }
    if (href.startsWith("/") && !href.startsWith("/assets/") && !href.startsWith("/api/") && !href.includes(".")) {
      const clean = href.split("#")[0].split("?")[0];
      const normalized = clean === "/" || clean.endsWith("/") ? clean : `${clean}/`;
      assert.ok(routeSet.has(normalized), `${route}: dead internal link ${href}`);
      inbound.set(normalized, inbound.get(normalized) + 1);
    }
  }
  assert.ok(!/data-netlify|netlify-honeypot|name="form-name"/i.test(html), `${route}: legacy Netlify form marker`);
  assert.ok(!/coming soon|\bTODO\b|\bFIXME\b|lorem ipsum/i.test(html), `${route}: stale placeholder copy`);
}

for (const [route, count] of inbound) {
  if (route !== "/") assert.ok(count > 0, `${route}: orphan route`);
}

const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((item) => item[1]);
assert.deepStrictEqual(new Set(sitemapUrls), new Set([...routeSet].map((route) => `${config.url}${route}`)), "sitemap route set mismatch");

const llms = fs.readFileSync(path.join(dist, "llms.txt"), "utf8");
for (const route of ["/services/", "/pricing/", "/demos/", "/industries/", "/resources/", "/contact/", "/privacy/"]) {
  assert.ok(llms.includes(`${config.url}${route}`), `llms.txt missing ${route}`);
}
assert.ok(llms.includes(config.contactEmail), "llms.txt missing public contact email");
assert.ok(llms.includes("not client case studies"), "llms.txt missing demo disclosure");

const sourceFiles = walk(path.join(root, "src")).filter((file) => /\.(js|html|md|txt)$/.test(file));
for (const file of sourceFiles) {
  const source = fs.readFileSync(file, "utf8");
  if (!file.endsWith(path.join("data", "demo-registry.js"))) {
    assert.ok(!/https:\/\/[^\s"'`]+\.vercel\.app/i.test(source), `${path.relative(root, file)}: hardcoded demo URL outside registry`);
  }
  assert.ok(!/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(source), `${path.relative(root, file)}: private key signature`);
  assert.ok(!/\b(?:sk_live_|sk_test_|re_[A-Za-z0-9]{20,})/.test(source), `${path.relative(root, file)}: credential-like token`);
}

assert.strictEqual(demos.length, 12, "demo registry count changed unexpectedly");
assert.strictEqual(demos.filter((demo) => demo.status === "verified" && demo.technicalUrl).length, 11, "verified demo count changed unexpectedly");
assert.ok(!files.some((file) => file.endsWith(".map")), "source maps must not ship");
for (const asset of ["assets/styles.css", "assets/main.js", "assets/roi-formulas.js", "assets/pricing-config.js", "assets/demo-config.js", "_headers", "robots.txt", "sitemap.xml", "llms.txt"]) {
  assert.ok(fs.existsSync(path.join(dist, asset)), `missing release asset ${asset}`);
}

console.log("PASS  release quality: 27 routes, metadata, links, schemas, accessibility hooks, sitemap, llms.txt, demos, contact, secrets, and artifacts");
