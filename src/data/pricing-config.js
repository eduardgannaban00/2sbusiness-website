// Single source of truth for 2S's published pricing tiers.
// Consumed by: src/pages/pricing.js (Node/build-time), the chatbot's
// pricing node and the ROI calculator's default automation cost (both
// browser-side, via the generated dist/assets/pricing-config.js — see
// build.js). No prices are set or changed here; this only centralizes the
// values that were previously hardcoded in two separate places.
module.exports = {
  // Public packaged examples used by the interactive demo portfolio. These
  // are illustrative package structures, not quotes for a custom Business OS.
  demoPackages: [
    { label: "Starter", setup: "$499", monthly: "$199", minutes: "100 AI minutes" },
    { label: "Growth", setup: "$799", monthly: "$299", minutes: "300 AI voice minutes" },
    { label: "Premium", setup: "$1,299", monthly: "$499", minutes: "700 AI minutes" },
  ],
  build: {
    label: "Build",
    startingPriceText: "From $999",
  },
  automate: {
    label: "Automate",
    startingPriceText: "From $999 setup + $399/mo",
    // The recurring monthly figure, as a number — used as the ROI
    // calculator's default "Estimated Automation Cost / Month" since this
    // is the tier the calculator's automation-focused math corresponds to.
    monthlyRecurring: 399,
  },
  supportScale: {
    label: "Support & Scale",
    startingPriceText: "From $899/mo",
  },
};
