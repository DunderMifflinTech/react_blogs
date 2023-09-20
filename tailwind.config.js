/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'nunito': ['nunito', 'sans-serif'],
    },
    screens: {
      '5xl':{'max': '8000px'},
      '4xl': {'max': '3000px'},
      '3xl': {'max': '2000px'},
      '2xl': {'max': '1535px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '639px'},
      'xsm': {'max': '420px'},
      '2xsm': {'max': '320px'},
    },
    extend: {},
  },
  plugins: [],
}