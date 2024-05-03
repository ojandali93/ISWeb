/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'primary': '#0369A1',
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

