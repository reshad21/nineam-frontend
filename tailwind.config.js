/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // primary: '#ff4c30', // Your custom primary color
        primary: '#116466',
        secondary: '#0047AB', // Optional deep blue accent
        accent: '#FFD700',    // Optional golden accent 
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Default sans-serif font
        josefin: ['Josefin Sans'],
      },
      fontWeight: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
}
