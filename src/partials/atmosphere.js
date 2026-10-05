const themeForPath = (pagePath) => {
  if (pagePath === "/") return "home";
  if (pagePath === "/demos/") return "demos";
  if (pagePath === "/services/" || pagePath === "/ai-automation-services/") return "services";
  if (pagePath === "/industries/" || pagePath.startsWith("/industries/")) return "industries";
  if (pagePath === "/pricing/") return "pricing";
  if (pagePath === "/about/") return "about";
  if (pagePath === "/resources/" || pagePath.startsWith("/resources/")) return "resources";
  if (pagePath === "/contact/") return "contact";
  return "article";
};

function renderAtmosphere(pagePath) {
  const theme = themeForPath(pagePath);
  return `
<div class="site-atmosphere atmosphere-${theme}" aria-hidden="true">
  <div class="atmosphere-glow atmosphere-glow-a"></div>
  <div class="atmosphere-glow atmosphere-glow-b"></div>
  <svg class="atmosphere-lines" viewBox="0 0 1440 900" preserveAspectRatio="none" focusable="false">
    <path class="atmosphere-line atmosphere-line-a" d="M-120 690 C180 450 320 820 610 560 S1100 180 1580 360" pathLength="1" />
    <path class="atmosphere-line atmosphere-line-b" d="M-160 160 C160 360 350 80 650 300 S1140 650 1600 500" pathLength="1" />
    <path class="atmosphere-line atmosphere-line-c" d="M90 980 C320 700 480 740 700 850 S1120 1000 1480 680" pathLength="1" />
    <path class="atmosphere-trace atmosphere-trace-a" d="M-120 690 C180 450 320 820 610 560 S1100 180 1580 360" pathLength="1" />
    <path class="atmosphere-trace atmosphere-trace-b" d="M-160 160 C160 360 350 80 650 300 S1140 650 1600 500" pathLength="1" />
    <circle class="atmosphere-node atmosphere-node-a" cx="610" cy="560" r="3" />
    <circle class="atmosphere-node atmosphere-node-b" cx="650" cy="300" r="2.5" />
    <circle class="atmosphere-node atmosphere-node-c" cx="1120" cy="650" r="2.5" />
  </svg>
</div>`;
}

module.exports = { renderAtmosphere, themeForPath };
