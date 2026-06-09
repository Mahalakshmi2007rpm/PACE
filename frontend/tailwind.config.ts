import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pace: {
          ink: "#07111f",
          navy: "#0b1f33",
          slate: "#17263b",
          teal: "#15b7a8",
          amber: "#f59e0b",
          mist: "#eff6ff"
        }
      },
      boxShadow: {
        glow: "0 18px 50px rgba(21, 183, 168, 0.18)"
      },
      backgroundImage: {
        "grid-fade": "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
