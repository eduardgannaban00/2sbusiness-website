const assert = require("assert");
const fs = require("fs");

const home = fs.readFileSync("dist/index.html", "utf8");
const styles = fs.readFileSync("dist/assets/styles.css", "utf8");
const ui = fs.readFileSync("src/partials/ui.js", "utf8");
const nav = fs.readFileSync("src/partials/nav.js", "utf8");
const atmosphere = fs.readFileSync("src/partials/atmosphere.js", "utf8");
const css = fs.readFileSync("src/css/input.css", "utf8");
const config = fs.readFileSync("src/data/site-config.js", "utf8");
const brandFiles = fs.readdirSync("src/assets/brand");
const { themeForPath } = require("./src/partials/atmosphere");

assert.ok(home.includes('class="hero-sphere"'), "home must contain the new system sphere");
assert.ok(home.includes("sphere-body"), "sphere must contain a dimensional body gradient");
assert.ok(home.includes("sphere-rim-gold") && home.includes("sphere-rim-emerald"), "sphere must contain asymmetric gold and emerald rims");
assert.ok(home.includes("sphere-rim-glow"), "sphere must contain a rim halo");
assert.ok(home.includes("sphere-grid-front") && home.includes("sphere-grid-rear"), "sphere must contain foreground/rear grid hierarchy");
assert.ok(home.includes("sphere-trace"), "sphere must contain travelling light traces");
assert.ok(home.includes("sphere-trace-tail") && home.includes("sphere-trace-core"), "sphere must contain luminous signal trails");
assert.ok(home.includes("sphere-node-halo"), "sphere must contain arrival pulse halos");
assert.ok(home.includes("sphere-node"), "sphere must contain breathing intersection nodes");
assert.ok(!home.includes("sphere-logo.png"), "old sphere logo must not be generated");
assert.ok(!ui.includes("sphere-node-pulse"), "old sphere pulse class must be removed");
assert.ok(!ui.includes("heroSphere(config.logo.sphere"), "old logo-centered sphere call must be removed");
assert.ok(!config.includes("logo.sphere"), "old sphere logo config must be removed");
assert.ok(!brandFiles.includes("sphere-logo.png"), "old sphere asset must be removed");

assert.ok(home.includes('class="site-atmosphere atmosphere-home"'), "home atmosphere must be present");
assert.ok(home.includes('aria-hidden="true"'), "decorative atmosphere must be hidden from assistive technology");
assert.ok(atmosphere.includes("atmosphere-demos") === false, "theme classes should be selected by layout, not duplicated in the renderer");
assert.ok(styles.includes("@keyframes sphere-rotate"), "sphere rotation must be compiled");
assert.ok(styles.includes("@keyframes sphere-trace"), "sphere traces must be compiled");
assert.ok(styles.includes("@keyframes atmosphere-travel"), "global travelling light must be compiled");
assert.ok(styles.includes("@keyframes sphere-arrival"), "sphere arrival pulse must be compiled");
assert.ok(styles.includes("sphere-trace-tail"), "signal trail styling must be compiled");
assert.ok(styles.includes("prefers-reduced-motion"), "reduced-motion CSS must be compiled");
assert.ok(css.includes("@media (max-width: 767px)"), "mobile visual simplification must be defined");
assert.ok(css.includes(".atmosphere-pricing"), "pricing atmosphere variant must exist");
assert.ok(css.includes(".atmosphere-contact"), "contact dot-mesh atmosphere variant must exist");
assert.ok(nav.includes('class="sticky top-0 z-50"'), "sticky header must be preserved");
assert.ok(nav.includes("bg-charcoal"), "sticky header must have an opaque background");
assert.ok(fs.existsSync("src/assets/brand/footer-logo.png"), "footer logo must remain");

const expectedThemes = {
  "/": "home",
  "/demos/": "demos",
  "/services/": "services",
  "/industries/": "industries",
  "/pricing/": "pricing",
  "/about/": "about",
  "/resources/": "resources",
  "/contact/": "contact",
};
for (const [route, theme] of Object.entries(expectedThemes)) {
  const file = route === "/" ? "dist/index.html" : `dist${route}index.html`;
  assert.strictEqual(themeForPath(route), theme, `${route}: atmosphere theme mapping changed`);
  assert.ok(fs.readFileSync(file, "utf8").includes(`site-atmosphere atmosphere-${theme}`), `${route}: themed atmosphere missing`);
}

console.log("PASS  visual system: old orbit removed, system sphere, atmospheres, motion controls, mobile simplification, and brand logos verified");
