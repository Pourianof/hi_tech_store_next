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
        background: "var(--background)",
        foreground: "var(--foreground)",
        mainBlue: "#0C68F4",
        highlightBoxBlue: "#005690",
        highlightYellow: "#FCC870",
        gradientStartBlue: "#1975B9",
        gradientMiddleBlue: "#1FB6CF",
        gradientEndBlue: "#B0E9C9",
      },
    },
  },
  plugins: [],
} satisfies Config;
