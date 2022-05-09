const { join } = require('path');

module.exports = {
  darkMode: 'class',
  content: [
    join(
      __dirname,
      'libs/design-system/src/**/!(*.stories|*.spec).{ts,tsx,html}'
    ),
    join(__dirname, 'apps/flow-docs/app/**/!(*.stories|*.spec).{ts,tsx,html}'),
  ],
  theme: {
    fontSize: {
      '2xs': ['0.625rem', { lineHeight: '1rem' }],
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2rem', { lineHeight: '2.25rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    screens: {
      xs: '360px',
      sm: '375px',
      md: '768px',
      lg: '1440px',
      xl: '1536px',
    },
    extend: {
      colors: {
        primary: '#3B3CFF',
        green: '#00EF8B',
        blue: '#3B3CFF',
        purple: '#A269FF',
        yellow: '#F1E72A',
        pink: '#F4C6FB',
        red: '#F67D65',
        'red-error': '#FC4723',
        'green-success': '#05CE7A',
        'blue-hover': '#3031D1',
        'blue-hover-dark': '#A183E0',
        'green-dark': '#47FFB2',
        'blue-dark': '#B795FF',
        'pink-dark': '#F4C6FB',
        'red-error-dark': '#F67D65',
        'green-success-dark': '#7AFFC',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
