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
        createheader: ['Rubik Broken Fax'],
        salsa:['Salsa'],
        fatface:['Abril Fatface'],
        montserrat: ['Montserrat Alternates'],
     },
     fontWeight: {
      '300': 300,
    },
     gradientColorStops:theme=>({
      'blue-pink':{
        '0': '#3490dc',
        '50': '#3490dc',
        '100': '#f68b8b',
      },
    }),

  },

},

  plugins: [],
}