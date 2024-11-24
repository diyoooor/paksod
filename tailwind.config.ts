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
        "green-black": "#12372A",
        "green-dark": "#436850",
        "green-medium": "#ADBC9F",
        "green-light": "#FBFADA",
        "green-success": "#A1DD70",
        "red-normal": "#C62E2E",
        "red-error": "#EE4E4E",
      },
    },
  },
  plugins: [],
} satisfies Config;
