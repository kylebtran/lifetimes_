import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: '#1A1717',
  			middleground: '#282323',
  			foreground: 'var(--foreground)',
  			muted: '#8B8484',
  			accent: '#FFC926',
  			panels: '#2D2B2B',
  			confirm: '#31AE57'
  		},
  		fontFamily: {
  			sans: ["var(--font-dm-sans)", "sans-serif"],
  			serif: ["var(--font-zilla-slab)", "serif"]
  		},
  		gridTemplateColumns: {
  			'auto-51': 'repeat(51, auto)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
