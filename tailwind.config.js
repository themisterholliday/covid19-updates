const tailwindcssforms = require('@tailwindcss/forms');

module.exports = {
  purge: ['./**/*.{js,jsx,ts,tsx,html,pug}'],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  plugins: [tailwindcssforms],
};
