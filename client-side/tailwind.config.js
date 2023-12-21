/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        head: ['Rock Salt', 'cursive'],
        nav: ['Philosopher', 'sans-serif'],
     }
    },
  },
  plugins: [],
}