const colors = require('tailwindcss/colors')

/** @typedef { import('tailwindcss/defaultConfig') } DefaultConfig */
/** @typedef { import('tailwindcss/defaultTheme') } DefaultTheme */
/** @typedef { DefaultConfig & { theme: { extend: DefaultTheme } } } TailwindConfig */

/** @type {TailwindConfig} */
module.exports = {
  purge: ['./src/**/*.tsx', './src/**/*.ts'],
  darkMode: false,
  //  prefix: 'tw-', might needed if there is additional class name collision
  theme: {
    extend: {
      colors: {
        'light-blue': colors.lightBlue,
        teal: colors.teal,
      }
    }
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
  variants: {},
}