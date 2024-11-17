import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#1A1A19",
        "green-dark": "#31511E",
        "green-medium": "#859F3D",
        "green-light": "#F6FCDF",
      },
    },
  },
  plugins: [],
} satisfies Config;
