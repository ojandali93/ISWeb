/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#00A3E0'
      },
      strokeWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}

