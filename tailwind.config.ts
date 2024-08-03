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
    },
  },
  plugins: [],
};
export default config;
