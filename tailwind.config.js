/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js,ejs}", "./views/**/*.ejs"],
  theme: {
    extend: {
      
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
