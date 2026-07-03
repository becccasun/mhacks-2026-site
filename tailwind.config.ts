import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moss: {
          900: "var(--moss-900)",
          800: "var(--moss-800)",
          700: "var(--moss-700)",
          500: "var(--moss-500)",
          300: "var(--moss-300)",
        },
        cream: {
          DEFAULT: "var(--cream)",
          soft: "var(--parchment)",
        },
        parchment: "var(--parchment)",
        ink: "var(--ink)",
        bloom: "var(--accent-pink)",
        sun: "var(--accent-yellow)",
        leaf: "var(--accent-green)",
        primary: "var(--primary-blue)",
        secondary: "var(--secondary)",
        // semantic
        surface: "var(--surface)",
        bg: "var(--bg)",
        muted: "var(--muted)",
        brand: "var(--brand)",
        "brand-on": "var(--brand-on)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "serif"],
        sans: ["var(--font-instrument-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-red-hat-display)", "system-ui", "sans-serif"],
        body: ["var(--font-red-hat-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-red-hat-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-1": ["clamp(80px, 15vw, 220px)", { lineHeight: "0.92", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(56px, 8vw, 112px)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-3": ["clamp(40px, 5vw, 72px)", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
        "display-4": ["clamp(28px, 3vw, 40px)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "14px",
        lg: "22px",
        pill: "999px",
      },
      boxShadow: {
        "e-1": "0 1px 2px rgba(20,30,10,.06)",
        "e-2": "0 4px 10px rgba(20,30,10,.08)",
        "e-3": "0 8px 24px rgba(20,30,10,.10)",
        "e-4": "0 16px 40px rgba(20,30,10,.14)",
        "e-glass": "0 8px 28px rgba(20,30,10,0.18)",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.2, 0.7, 0.2, 1)",
        snap: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        drift: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulse_soft: {
          "0%,100%": { opacity: "0.55" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        drift: "drift 6s ease-in-out infinite",
        "pulse-soft": "pulse_soft 3.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
