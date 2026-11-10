import type { Config } from "tailwindcss"

/*
 * The importer's tray: near-black like the DGJ logo ground, the logo's gold line, gem-paper ivory,
 * and one Ceylon sapphire blue taken from their star sapphires.
 * Roles: onyx = hero, gallery tray and footer; gold = lines, rings and text on onyx only (fails on paper);
 * paper = reading surfaces and labels; sapphire = the custom-jewelry band, actions on paper, focus on paper;
 * ruby = form errors only.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        onyx: { DEFAULT: "#0e0d0b", soft: "#1c1a16" },
        gold: { DEFAULT: "#c9a33f", light: "#e0c06a" },
        paper: { DEFAULT: "#f5f0e6", warm: "#e9e1d0" },
        ink: { soft: "#5a544a" },
        sapphire: { DEFAULT: "#1f3d8c", deep: "#16306f" },
        ruby: "#a3172f",
      },
      fontFamily: {
        display: ["var(--font-display)", "Didot", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Hero names run 100 to 200px on desktop (house rule), scaled down on phones.
        mega: ["clamp(5.25rem, 15vw, 12.5rem)", { lineHeight: "0.82", letterSpacing: "-0.03em" }],
        d1: ["clamp(3.25rem, 8vw, 7rem)", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        d2: ["clamp(2.5rem, 5.5vw, 4.75rem)", { lineHeight: "0.95", letterSpacing: "-0.015em" }],
        d3: ["clamp(1.9rem, 3.4vw, 2.9rem)", { lineHeight: "1.02" }],
      },
      maxWidth: { site: "1320px" },
      transitionTimingFunction: { gem: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
    },
  },
  plugins: [],
}
export default config
