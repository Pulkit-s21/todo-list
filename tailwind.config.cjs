/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.js",
  ],
  theme: {
    extend: {
      colors: {
        body: '#352f5b',
        input: '#423a6f',
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}