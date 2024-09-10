import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        sans: ['Satoshi', 'Inter', 'sans-serif']
      },
      fontWeight: {
        extraBold: '800',
      },
      lineHeight: {
        '12': '1.2',
        '14': '1.4',
      },
      colors: {
        avocade: {
            100: '#e6f2e1', // light avocado
            500: '#81c784', // medium avocado
            800: '#388e3c', // dark avocado
        },
      },
    },
  },
  plugins: [],
};
export default config;
