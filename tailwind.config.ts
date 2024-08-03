import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "green-screen": "#00FF00",
        "cdc-red": "#FF4343",
        "cdc-darkred": "#620000",
        "cdc-grey": "#424242",
        "cdc-darkgrey": "#282828",
        "cdc-lightgrey": "#A9A9A9",
      },
      rotate: {
        "60": "60deg",
      },
      animation: {
        "leftright-scroll": "leftright-scroll 30s linear infinite",
        "rightleft-scroll": "rightleft-scroll 30s linear infinite",
        "draft-scroll": "draft-scroll 0.8s ease-out",
        "rightleft-scrollslow": "rightleft-scrollslow 60s linear infinite",
      },
      keyframes: {
        "leftright-scroll": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "rightleft-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "draft-scroll": {
          from: { transform: "translateX(-30%)" },
          to: { transform: "translateX(0%)" },
        },
        "rightleft-scrollslow": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
