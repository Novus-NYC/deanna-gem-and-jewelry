import type { Config } from "tailwindcss"

/*
 * The case: garnet velvet lining, ivory tags, ink type, and the cold white light of a loupe.
 * Roles: garnet = canvas for the case, ivory = tags and reading surfaces, ink = text and
 * the dark "case" band, loupe = the one cool accent (close-up moments, focus).
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        garnet: { DEFAULT: "#4a0f1f", deep: "#350a16", soft: "#6e2236" },
        ivory: { DEFAULT: "#f4efe6", warm: "#ebe3d6" },
        ink: { DEFAULT: "#1a1414", soft: "#5c4a47" },
        loupe: { DEFAULT: "#d6e6ec", deep: "#9fc0cc" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Hero names run 100 to 200px on desktop (house rule), scaled down on phones.
        mega: ["clamp(5.5rem, 15vw, 12.5rem)", { lineHeight: "0.82", letterSpacing: "-0.03em" }],
        d1: ["clamp(3.25rem, 8vw, 7rem)", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        d2: ["clamp(2.5rem, 5.5vw, 4.75rem)", { lineHeight: "0.95", letterSpacing: "-0.015em" }],
        d3: ["clamp(1.9rem, 3.4vw, 2.9rem)", { lineHeight: "1.02" }],
      },
      maxWidth: { site: "1320px" },
      transitionTimingFunction: { case: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
    },
  },
  plugins: [],
}
export default config
