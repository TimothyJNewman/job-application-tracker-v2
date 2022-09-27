/** @type {import('tailwindcss').Config} */
const twElements = require('tw-elements/dist/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {},
  plugins: [twElements]
}
