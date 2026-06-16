import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        rosegold: "#b76e79",
        blush: "#ffd7e1",
        softred: "#ff5c79",
        wine: "#7b1f3a"
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 92, 121, 0.4)",
        glass: "0 8px 30px rgba(183, 110, 121, 0.2)"
      },
      backgroundImage: {
        "luxury-gradient":
          "radial-gradient(circle at 10% 20%, rgba(255, 215, 225, 0.35) 0%, rgba(255, 92, 121, 0.2) 40%, rgba(123, 31, 58, 0.35) 100%)"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        sparkle: "sparkle 4s ease-in-out infinite",
        pulseheart: "pulseheart 2.5s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        sparkle: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" }
        },
        pulseheart: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
