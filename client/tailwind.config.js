const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
      colors: {
        "trans-black": "rgba(0, 0, 0, 0.5)",
        ...colors
      },
      extend: {}
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
