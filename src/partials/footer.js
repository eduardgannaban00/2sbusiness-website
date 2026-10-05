const config = require("../data/site-config");
const { socialLinks } = require("./ui");

function renderFooter() {
  const links = config.footerCols.company
    .map(
      (item) =>
        `<li><a href="${item.href}" class="text-slate2 hover:text-gold text-sm transition-colors">${item.label}</a></li>`
    )
    .join("\n");

  return `
<footer class="border-t border-gold/10 mt-20">
  <div class="container-content py-12 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
    <div class="max-w-sm">
      <div class="flex items-center gap-3 mb-3">
        <img src="${config.logo.footer}" alt="${config.entityName} logo" width="48" height="48" loading="lazy" class="w-12 h-12 rounded-full" />
        <span class="font-head font-bold text-ink text-sm">${config.entityName}</span>
      </div>
      <p class="text-muted text-sm leading-relaxed">${config.tagline}</p>
    </div>
    <nav aria-label="Footer">
      <ul class="space-y-2">
        ${links}
      </ul>
    </nav>
    <div class="text-muted text-sm">
      <p>General inquiries:</p>
      <a href="mailto:${config.contactEmail}" class="text-slate2 hover:text-gold">${config.contactEmail}</a>
      <div class="flex items-center gap-4 mt-4">
        ${socialLinks(config.social)}
      </div>
    </div>
  </div>
  <div class="border-t border-gold/10">
    <div class="container-content py-6 text-muted text-xs">
      &copy; ${new Date().getFullYear()} ${config.entityName}. All rights reserved.
    </div>
  </div>
</footer>`;
}

module.exports = { renderFooter };
