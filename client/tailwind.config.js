/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx}","./public/index.html"],
  theme: {
    fontFamily:{
      main:['Poppins','sans-serif']
    },
    extend: {
      width:{
        main: '1200px'
      },
      backgroundColor:{
        main:"#C92127"
      },
      colors:{
        main: "#C92127"
      },

    },
  },
  plugins: [],
}