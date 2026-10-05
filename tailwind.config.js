/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.html"],
  safelist: [
    "opacity-100", "opacity-0", "translate-y-0", "-translate-y-2",
    "rotate-45", "rotate-0", "max-h-0", "max-h-96"
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#080B0B",
        obsidian: "#101614",
        gold: "#D4AF37",
        champagne: "#F3E5AB",
        deepgold: "#B8860B",
        emerald: "#00E676",
        emerald2: "#10B981",
        ink: "#FFFFFF",
        slate2: "#CBD5E1",
        muted: "#94A3B8",
      },
      fontFamily: {
        head: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        goldglow: "0 0 24px rgba(212,175,55,0.25)",
        emeraldglow: "0 0 18px rgba(0,230,118,0.35)",
      },
    },
  },
  plugins: [],
};
