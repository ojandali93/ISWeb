/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#0b8ec4'
      },
      strokeWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}

