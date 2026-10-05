const config = require("../data/site-config");

function navLink(item, currentPath) {
  const isActive =
    !item.homeAnchor && currentPath.startsWith(item.href) && item.href !== "/";
  return `<a href="${item.href}" class="font-head text-sm uppercase tracking-wide px-1 py-2 ${
    isActive ? "text-gold" : "text-slate2 hover:text-gold"
  } transition-colors">${item.label}</a>`;
}

function renderNav(currentPath) {
  const links = config.nav.map((item) => navLink(item, currentPath)).join("\n");
  const mobileLinks = config.nav
    .map(
      (item) =>
        `<a href="${item.href}" class="block font-head text-lg uppercase tracking-wide py-3 text-slate2 hover:text-gold border-b border-gold/10">${item.label}</a>`
    )
    .join("\n");

  return `
<header class="sticky top-0 z-50" data-nav-root>
  <a href="#main" class="skip-link">Skip to content</a>
  <nav class="border-b border-transparent transition-all duration-300" data-nav aria-label="Primary">
    <div class="container-content flex items-center justify-between h-16 md:h-20">
      <a href="/" class="flex items-center gap-2.5 shrink-0" aria-label="${config.entityName} home">
        <img src="${config.logo.emblem}" alt="${config.entityName} logo" width="36" height="36" class="w-9 h-9 rounded-full shrink-0" />
        <span class="hidden lg:block font-head font-bold text-slate2 text-sm tracking-wide leading-tight">2S <span class="text-ink">Business Support</span></span>
      </a>

      <div class="hidden md:flex items-center gap-8">
        ${links}
      </div>

      <div class="hidden md:block">
        <a href="/contact/" class="btn-primary text-xs md:text-sm px-4 md:px-5 py-2.5">${config.ctaPrimary}</a>
      </div>

      <button type="button" class="md:hidden text-ink p-2 -mr-2" data-mobile-menu-toggle aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
        <svg data-icon-open width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        <svg data-icon-close class="hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  </nav>

  <div id="mobile-menu" class="md:hidden fixed inset-0 top-16 bg-charcoal z-40 overflow-y-auto" data-open="false" data-mobile-menu>
    <div class="container-content py-4">
      ${mobileLinks}
      <a href="/contact/" class="btn-primary w-full mt-6">${config.ctaPrimary}</a>
    </div>
  </div>
</header>`;
}

module.exports = { renderNav };
