const assert = require("assert");
const fs = require("fs");
const { demos, getDemo, getPublicDemoUrl } = require("./src/data/demo-registry");
const pricing = require("./src/data/pricing-config");

assert.strictEqual(demos.length, 12, "registry should contain 12 demo modules");
assert.strictEqual(
  demos.filter((demo) => demo.status === "verified" && demo.technicalUrl).length,
  11,
  "registry should contain 11 verified URLs"
);
assert.strictEqual(getDemo("onboarding").technicalUrl, null);
assert.strictEqual(getPublicDemoUrl("onboarding"), null);
assert.ok(demos.every((demo) => demo.brandedUrl.startsWith("https://2sbusinesssupport.com/")));
assert.strictEqual(getPublicDemoUrl("dental"), "https://2s-dental-ai-demo.vercel.app/");
assert.strictEqual(getPublicDemoUrl("hr"), "https://2s-hr-ai-interview.vercel.app/");

const homepage = fs.readFileSync("src/pages/index.js", "utf8");
assert.ok(homepage.includes('href="/demos/"'));
assert.ok(homepage.includes("Explore the full demo portfolio"));

const demoPage = require("./src/pages/demos");
assert.strictEqual(demoPage.path, "/demos/");
assert.ok(demoPage.content.includes("Explore the Business OS"));
assert.ok(demoPage.content.includes("Preview Unavailable"));

assert.deepStrictEqual(pricing.demoPackages, [
  { label: "Starter", setup: "$499", monthly: "$199", minutes: "100 AI minutes" },
  { label: "Growth", setup: "$799", monthly: "$299", minutes: "300 AI voice minutes" },
  { label: "Premium", setup: "$1,299", monthly: "$499", minutes: "700 AI minutes" },
]);

console.log("PASS  demo registry, route, pricing, and homepage regression checks");
