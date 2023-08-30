/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      backgroundImage: {
        'front-card': "url('/images/bg-card-front.png')",
        'back-card': "url('/images/bg-card-back.png')",
        background: "url('/images/bg-main-desktop.png')",
      },
      colors: {
        'light-gray': '#DFDEE0',
        'deep-violet': '#21092F',
      },
    },
  },
  plugins: [],
};
