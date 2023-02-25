/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      display: ["Carter One", "sans-serif"],
      body: ["Nunito", "sans-serif"],
      heading: ["Rubik", "sans-serif"],
    },
  },
  plugins: [],
};
