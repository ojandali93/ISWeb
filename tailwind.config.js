/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#00A3E0',
        'alt-on': '#374151',
        'alt-off': '#4b5563'
      },
      strokeWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}

