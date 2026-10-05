const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "dist");

function normalizeWebPath(value) {
  return String(value).replace(/\\/g, "/");
}

function walk(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(walk(full));
    else if (entry.name === "index.html") results.push(full);
  }
  return results;
}

function verifySite() {
  if (!fs.existsSync(distDir)) {
    console.log("ERROR dist directory missing");
    return { errors: 1, warnings: 0 };
  }

  const htmlFiles = walk(distDir);
  const knownPaths = new Set(
    htmlFiles.map((file) => {
      const relative = normalizeWebPath(path.relative(distDir, path.dirname(file)));
      return relative === "" ? "/" : `/${relative}/`;
    })
  );

  let errors = 0;
  let warnings = 0;
  console.log(`Checking ${htmlFiles.length} pages...\n`);

  htmlFiles.forEach((file) => {
    const html = fs.readFileSync(file, "utf8");
    const relative = normalizeWebPath(path.relative(distDir, path.dirname(file)));
    const pagePath = relative === "" ? "/" : `/${relative}/`;

    const titleMatch = html.match(/<title>(.*?)<\/title>/s);
    if (!titleMatch || !titleMatch[1].trim()) {
      console.log(`ERROR [${pagePath}] missing <title>`);
      errors++;
    }
    if (!/<meta name="description" content="[^"]+"/.test(html)) {
      console.log(`ERROR [${pagePath}] missing meta description`);
      errors++;
    }
    if (!/<link rel="canonical" href="([^"]+)"/.test(html)) {
      console.log(`ERROR [${pagePath}] missing canonical`);
      errors++;
    }

    const h1Matches = html.match(/<h1[\s>]/g) || [];
    if (h1Matches.length !== 1) {
      console.log(`ERROR [${pagePath}] found ${h1Matches.length} <h1> elements (expected 1)`);
      errors++;
    }

    const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
    ldBlocks.forEach((match, index) => {
      try {
        JSON.parse(match[1]);
      } catch (error) {
        console.log(`ERROR [${pagePath}] invalid JSON-LD block #${index}: ${error.message}`);
        errors++;
      }
    });

    const hrefs = [...html.matchAll(/href="(\/[^"#]*)"/g)].map((match) => match[1]);
    hrefs.forEach((href) => {
      if (href.startsWith("/assets/") || href === "/sitemap.xml" || href === "/robots.txt") return;
      const normalized = href.endsWith("/") ? href : `${href}/`;
      if (!knownPaths.has(normalized) && !knownPaths.has(href)) {
        console.log(`ERROR [${pagePath}] dead internal link: ${href}`);
        errors++;
      }
    });

    if (!/<meta property="og:title"/.test(html)) {
      console.log(`WARNING [${pagePath}] missing og:title`);
      warnings++;
    }
  });

  const sitemapPath = path.join(distDir, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    console.log("ERROR sitemap.xml missing");
    errors++;
  } else {
    const sitemap = fs.readFileSync(sitemapPath, "utf8");
    console.log(`sitemap.xml contains ${(sitemap.match(/<loc>/g) || []).length} URLs`);
  }

  const robotsPath = path.join(distDir, "robots.txt");
  if (!fs.existsSync(robotsPath)) {
    console.log("ERROR robots.txt missing");
    errors++;
  } else {
    console.log(`robots.txt present:\n${fs.readFileSync(robotsPath, "utf8")}`);
  }

  console.log(`\n${errors} error(s), ${warnings} warning(s).`);
  return { errors, warnings };
}

if (require.main === module) {
  const result = verifySite();
  process.exit(result.errors > 0 ? 1 : 0);
}

module.exports = { normalizeWebPath, verifySite };
