import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          deep: "#8B0038",
          hot: "#FF0066",
          rose: "#FF4488",
          blush: "#FFB3CC",
          pale: "#FFE0EC",
          light: "#FFF0F5",
        },
        gold: "#FFD700",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        dancing: ["Dancing Script", "cursive"],
        cormorant: ["Cormorant Garamond", "serif"],
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "float": "float 4s ease-in-out infinite",
        "heartbeat": "heartbeat 1.5s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "flicker": "flicker 0.15s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "twinkle": "twinkle 2s ease-in-out infinite",
        "shake": "shake 0.5s ease-in-out",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        "scale-in": "scaleIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "rise-up": "riseUp 1.2s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "sway": "sway 2s ease-in-out infinite",
        "gradient": "gradientShift 4s ease infinite",
      },
    },
  },
  plugins: [],
};
export default config;
