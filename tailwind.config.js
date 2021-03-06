const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    screens: {
      xs: { min: '300px', max: '600px' },
      md: { min: '600px', max: '1024px' },
      lg: { min: '1024px' },
      xl: { min: '1280px' },
      '2xl': { min: '1536px' },
      '3xl': { min: '1792px' },
    },
    boxShadow: { '4xl': '0px 0px 10px 4px rgba(0, 0, 0, 0.35)' },
    extend: {
      backgroundImage: (theme) => ({
        farmSearch: 'linear-gradient(106.25deg, #00FFD1 6.88%, #00BA98 81.93%)',
      }),
      gridTemplateColumns: {
        farmSearch: '2fr 1fr',
        farmContainer: '1fr 4fr',
        farmContainerOther: '1.2fr 3fr'
      },
      colors: {
        primary: '#10B981',
        primaryScale: colors.green,
        secondary: '#F9FAFB',
        secondaryScale: colors.gray,
        darkText: colors.gray['600'],
        inputBg: colors.gray['100'],
        inputText: '#374151',
        hoverGray: '#F3F4F6',
        buttonBg: '#10B981',
        buttonText: '#F9FAFB',
        greenLight: '#00C08B',
        greenOpacity100: 'rgba(2, 109, 97, 1)',
        whiteOpacity85: 'rgba(255, 255, 255, 0.85)',
        blackLight: '#003648',
        greenLight1: '#01C08B',
        cardBg: '#1D2932',
        chartBg: '#001320',
        warn: '#DEA550',
        error: '#DE5050',
        gradientFrom: '#00c6a2',
        gradientTo: '#008b72',
        gradientFromHover: '#00D6AF',
        gradientToHover: '#00967B',
        poolRowHover: '#001320',
        primaryText: '#7E8A93',
        inputDarkBg: 'rgba(0, 0, 0, 0.2)',
        navHighLightBg: '#304452',
        navHighLightText: '#C6D1DA',
        slipBg: '#3e4e59',
        farmText: '#73818B',
        farmSplitLine: '#314351',
        farmDark: '#2B3A44',
        framBorder: '#00C6A2',
        farmSbg: '#2F3D47',
        farmRound: '#B3C2CC',
        farmTopRight: '#008870',
        datebg:'#637684'
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
    plugins: [],
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      borderWidth: ['hover'],
      cursor: ['disabled'],
      padding: ['last'],
    },
  },

};
