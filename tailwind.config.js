const { join } = require('path');

module.exports = {
  content: [
    join(
      __dirname,
      'libs/design-system/src/**/!(*.stories|*.spec).{ts,tsx,html}'
    ),
    join(__dirname, 'apps/flow-docs/app/**/!(*.stories|*.spec).{ts,tsx,html}'),
  ],
  theme: {
    extend: {
      colors: {
        'grey-2': '#69717E',
        'grey-3': '#ABB3BFbb',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
