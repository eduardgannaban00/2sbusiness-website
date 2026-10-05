const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "dist");

function walk(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(walk(full));
    else if (entry.name === "index.html") results.push(full);
  }
  return results;
}

const htmlFiles = walk(distDir);
const knownPaths = new Set(
  htmlFiles.map((f) => {
    const rel = path.relative(distDir, path.dirname(f));
    return rel === "" ? "/" : `/${rel}/`;
  })
);

let errors = 0;
let warnings = 0;

console.log(`Checking ${htmlFiles.length} pages...\n`);

htmlFiles.forEach((file) => {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(distDir, path.dirname(file));
  const pagePath = rel === "" ? "/" : `/${rel}/`;

  // Title
  const titleMatch = html.match(/<title>(.*?)<\/title>/s);
  if (!titleMatch || !titleMatch[1].trim()) {
    console.log(`ERROR [${pagePath}] missing <title>`);
    errors++;
  }

  // Meta description
  if (!/<meta name="description" content="[^"]+"/.test(html)) {
    console.log(`ERROR [${pagePath}] missing meta description`);
    errors++;
  }

  // Canonical
  const canonMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!canonMatch) {
    console.log(`ERROR [${pagePath}] missing canonical`);
    errors++;
  }

  // Exactly one H1
  const h1Matches = html.match(/<h1[\s>]/g) || [];
  if (h1Matches.length !== 1) {
    console.log(`ERROR [${pagePath}] found ${h1Matches.length} <h1> elements (expected 1)`);
    errors++;
  }

  // JSON-LD validity
  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  ldBlocks.forEach((m, i) => {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      console.log(`ERROR [${pagePath}] invalid JSON-LD block #${i}: ${e.message}`);
      errors++;
    }
  });

  // Internal links resolve
  const hrefs = [...html.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]);
  hrefs.forEach((href) => {
    if (href.startsWith("/assets/") || href === "/sitemap.xml" || href === "/robots.txt") return;
    const normalized = href.endsWith("/") ? href : href + "/";
    if (!knownPaths.has(normalized) && !knownPaths.has(href)) {
      console.log(`ERROR [${pagePath}] dead internal link: ${href}`);
      errors++;
    }
  });

  // OG/Twitter tags present
  if (!/<meta property="og:title"/.test(html)) {
    console.log(`WARNING [${pagePath}] missing og:title`);
    warnings++;
  }
});

// sitemap.xml / robots.txt
if (!fs.existsSync(path.join(distDir, "sitemap.xml"))) {
  console.log("ERROR sitemap.xml missing");
  errors++;
} else {
  const sitemap = fs.readFileSync(path.join(distDir, "sitemap.xml"), "utf8");
  const locCount = (sitemap.match(/<loc>/g) || []).length;
  console.log(`sitemap.xml contains ${locCount} URLs`);
}
if (!fs.existsSync(path.join(distDir, "robots.txt"))) {
  console.log("ERROR robots.txt missing");
  errors++;
} else {
  console.log("robots.txt present:\n" + fs.readFileSync(path.join(distDir, "robots.txt"), "utf8"));
}

console.log(`\n${errors} error(s), ${warnings} warning(s).`);
process.exit(errors > 0 ? 1 : 0);
