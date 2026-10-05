const config = require("../data/site-config");
const { renderNav } = require("./nav");
const { renderFooter } = require("./footer");
const { renderAssistant } = require("./assistant");

function breadcrumbSchema(path, crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${config.url}${c.href}`,
    })),
  };
}

function renderPage({
  path,
  title,
  description,
  h1,
  content,
  schemas = [],
  ogImage = "/assets/brand/og-default.jpg",
  bodyClass = "",
}) {
  const canonical = `${config.url}${path}`;
  const schemaScripts = schemas
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<link rel="icon" href="/assets/brand/favicon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/assets/brand/favicon-16.png" sizes="16x16" type="image/png">
<link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png">

<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${config.url}${ogImage}">
<meta property="og:site_name" content="${config.entityName}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${config.url}${ogImage}">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

<link rel="stylesheet" href="/assets/styles.css">
${schemaScripts}
</head>
<body class="${bodyClass}">
${renderNav(path)}
<main id="main">
${content}
</main>
${renderFooter()}
${renderAssistant()}
<script src="/assets/pricing-config.js" defer></script>
<script src="/assets/demo-config.js" defer></script>
<script src="/assets/roi-formulas.js" defer></script>
<script src="/assets/main.js" defer></script>
</body>
</html>`;
}

module.exports = { renderPage, breadcrumbSchema, config };
