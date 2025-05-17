/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: '#8368FF',
        primary: '#FFF',
        accent: '#FFAE25',
      },
      fontFamily: {
        Robo: ['Roboto', 'sans-serif'],
        source: ['Source Sans Pro', 'sans-serif']
      },
    },
  },
  plugins: [],
}