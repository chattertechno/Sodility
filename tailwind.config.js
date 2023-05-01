/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#008de4",
        secondary: "#012060",
        tertiary: "#2F2D51",

        appGray: {
          400: "#e7f1fa",
          450: "#dee8f0",
          500: "#393e49",
        },
        primaryGradient: "#F2F9FF",
      },
      backgroundImage: {
        // blackPattern: "url('assets/index/popular-creators-mask.png')",
      },
      boxShadow: {
        "appShadow-sm": "0 2px 8px rgba(0, 0, 0, 0.3)",
        "appShadow-lg": "0px 1px 27px 17px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
