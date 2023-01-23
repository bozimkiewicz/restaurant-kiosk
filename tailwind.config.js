/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "my-orange-100": "#ffe8aa",
        "my-orange-200": "#fed666",
        "my-orange-300": "#ffc115",
        "my-orange-400": "#dea400",
      }
    },
  },
  plugins: [],
}
