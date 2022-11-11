const plugin = require('tailwindcss/plugin');

const FONTS = {
  ios: {name: '"Iosevka Medium"', path: 'iosevka/iosevka-medium'},
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'ios': FONTS.ios.name,
      },
      width: {
        '128': '32rem',
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl'), fontWeight: 'bold' },
        'h2': { fontSize: theme('fontSize.xl') },
        'h3': { fontSize: theme('fontSize.lg') },
      })
    }),
    ...Object.values(FONTS).map(font => {
      return plugin(function ({addBase}) {
        addBase({
          '@font-face': {
            fontFamily: font.name,
            src: 'url("/fonts/' + font.path + '.woff2") format("woff2")'
          }
        })
      });
    }),
  ],
};
