import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        display: ["var(--font-dm-serif)", "serif"],
      },
      colors: {
        accent: "#3b7cff",
      },
      animation: {
        "fade-up": "fadeUp 0.35s ease both",
        "blink": "blink 1.2s ease-in-out infinite",
        "drift1": "drift1 18s ease-in-out infinite alternate",
        "drift2": "drift2 22s ease-in-out infinite alternate",
        "drift3": "drift3 16s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.85)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        drift1: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "100%": { transform: "translate(30px, 25px) scale(1.08)" },
        },
        drift2: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "100%": { transform: "translate(-20px, -30px) scale(1.05)" },
        },
        drift3: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "100%": { transform: "translate(15px, -20px) scale(1.06)" },
        },
      },
      backdropBlur: {
        xs: "4px",
      },
    },
  },
  plugins: [],
};

export default config;
