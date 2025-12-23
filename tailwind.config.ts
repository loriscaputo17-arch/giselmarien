// tailwind.config.ts
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
        bg: "#e4e2dd",
        ink: "#343026",
      },
      letterSpacing: {
        wide2: "0.18em",
      },
    },
  },
  plugins: [],
} satisfies Config;
