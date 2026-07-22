// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C71585",
        darkGray2: "#A9A9A9",
      },
      borderRadius: {
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};