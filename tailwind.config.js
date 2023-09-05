/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      backgroundImage: {
        'front-card': "url('../images/bg-card-front.png')",
        'back-card': "url('../images/bg-card-back.png')",
        'background-desktop': "url('../images/bg-main-desktop.png')",
        'background-mobile': "url('../images/bg-main-mobile.png')",
      },
      colors: {
        'light-gray': '#DFDEE0',
        'deep-violet': '#21092F',
        'purplish-grey': '#8F8694',
      },
    },
  },
  plugins: [],
};
