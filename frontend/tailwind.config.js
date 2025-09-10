/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pervenche': '#CCCCFF',
        'lavande': '#E6E6FA',
        'texte-sombre': '#2D3748',
        'accent': '#A78BFA',
      },
      fontFamily: {
        'title': ['Cormorant Garamond', 'serif'],
        'body': ['Lato', 'sans-serif'],
      }
    },
  },
  plugins: [],
}