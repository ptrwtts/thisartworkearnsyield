const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens:{
      'testy': '480px',
      // => @media (min-width: 320px) { ... }
      ...defaultTheme.screens,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
