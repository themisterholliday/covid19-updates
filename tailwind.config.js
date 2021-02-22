const tailwindcssforms = require('@tailwindcss/forms');

module.exports = {
  purge: ['./**/*.{js,jsx,ts,tsx,html}'],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  plugins: [tailwindcssforms],
};
