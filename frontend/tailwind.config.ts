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
        background: "var(--background)",
        middleground: "#282323",
        foreground: "var(--foreground)",
        muted: "#8B8484",
        accent: "#FFC926",
        panels: "#2D2B2B",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        serif: ["var(--font-zilla-slab)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
