/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {colors: {
                     'primary': '#CBD2A4',
                     'secondary': '#9A7E6F',
                     'btn_color': '#9A7E6F',
                     'dark_brown': '#54473F',
                   },},
  },
  plugins: [],
}

