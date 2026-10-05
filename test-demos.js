const assert = require("assert");
const fs = require("fs");
const { demos, getDemo, getPublicDemoUrl } = require("./src/data/demo-registry");
const pricing = require("./src/data/pricing-config");

assert.strictEqual(demos.length, 12, "registry should contain 12 demo modules");
assert.strictEqual(
  demos.filter((demo) => demo.status === "verified" && demo.publicUrl).length,
  12,
  "registry should contain 12 verified public URLs"
);
assert.strictEqual(getPublicDemoUrl("dental"), "https://dental.2sbusinesssupport.com");
assert.strictEqual(getPublicDemoUrl("hvac"), "https://hvac.2sbusinesssupport.com");
assert.strictEqual(getPublicDemoUrl("roofing"), "https://roofing.2sbusinesssupport.com");
assert.strictEqual(getPublicDemoUrl("crm"), "https://crm.2sbusinesssupport.com");
assert.strictEqual(getPublicDemoUrl("website"), "https://leads.2sbusinesssupport.com");
assert.strictEqual(getPublicDemoUrl("support"), "https://support.2sbusinesssupport.com");
assert.strictEqual(getPublicDemoUrl("appointments"), "https://appointments.2sbusinesssupport.com");
assert.strictEqual(getPublicDemoUrl("quotes"), "https://quotes.2sbusinesssupport.com");
assert.strictEqual(getPublicDemoUrl("reviews"), "https://reviews.2sbusinesssupport.com");
assert.strictEqual(getPublicDemoUrl("onboarding"), "https://onboarding.2sbusinesssupport.com");
assert.strictEqual(getPublicDemoUrl("businessos"), "https://businessos.2sbusinesssupport.com");
assert.strictEqual(getPublicDemoUrl("hr"), "https://hr.2sbusinesssupport.com");

const homepage = fs.readFileSync("src/pages/index.js", "utf8");
assert.ok(homepage.includes('href="/demos/"'));
assert.ok(homepage.includes("Explore the full demo portfolio"));

const demoPage = require("./src/pages/demos");
assert.strictEqual(demoPage.path, "/demos/");
assert.ok(demoPage.content.includes("Explore the Business OS"));
assert.ok(demoPage.content.includes("https://onboarding.2sbusinesssupport.com"));

const pricingPage = require("./src/pages/pricing");
assert.ok(pricingPage.content.includes("Custom Quote"));
assert.strictEqual((pricingPage.content.match(/Custom Quote/g) || []).length, 3);
assert.ok(pricingPage.content.includes("workflows, integrations, volume, support requirements"));
assert.ok(!pricingPage.content.includes("From $999"));
assert.ok(!pricingPage.content.includes("From $899"));
assert.ok(!pricingPage.content.includes("$399/mo"));

assert.deepStrictEqual(pricing.demoPackages, [
  { label: "Starter", setup: "$499", monthly: "$199", minutes: "100 AI minutes" },
  { label: "Growth", setup: "$799", monthly: "$299", minutes: "300 AI voice minutes" },
  { label: "Premium", setup: "$1,299", monthly: "$499", minutes: "700 AI minutes" },
]);

console.log("PASS  demo registry, route, pricing, and homepage regression checks");
