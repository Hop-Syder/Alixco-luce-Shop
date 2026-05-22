/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        tertiary: "hsl(var(--tertiary))",
        background: "hsl(var(--background))",
        "surface-light": "hsl(var(--surface-light))",
        "surface-neutral": "hsl(var(--surface-neutral))",
        "text-main": "hsl(var(--text-main))",
        "text-light": "hsl(var(--text-light))",
        success: "hsl(var(--success))",
        error: "hsl(var(--error))",
        warning: "hsl(var(--warning))",
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "serif"],
        subheading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}
