/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#DC2626",
        primaryHover: "#B91C1C",
        accent: "#F59E0B",
        background: "#FAFAF9",
        text: "#292524",
      },
    },
  },
  plugins: [],
};