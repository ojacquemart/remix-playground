const plugin = require('tailwindcss/plugin');

const FONTS = {
  ios: {name: '"Iosevka Medium"', path: 'iosevka/iosevka-medium'},
  iosBold: {name: '"Iosevka Bold"', path: 'iosevka/iosevka-bold'},
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ios': FONTS.ios.name,
        'ios-bold': FONTS.iosBold.name,
      }
    }
  },
  plugins: [
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
