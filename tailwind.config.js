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
    extend: {},
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
