// const { resolve } = require('path')
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const addons = [
  // '@storybook/addon-essentials',
  '@storybook/addon-links',
  '@storybook/addon-actions',
  '@storybook/addon-viewport',
  {
    name: '@storybook/addon-docs',
    options: {
      configureJSX: true,
      babelOptions: {},
      sourceLoaderOptions: null,
      transcludeMarkdown: true,
    },
  },
  '@storybook/addon-controls',
  '@storybook/addon-backgrounds',
  '@storybook/addon-toolbars',
  '@storybook/addon-measure',
  '@storybook/addon-outline',
  'storybook-addon-themes',
];

module.exports = {
  core: { builder: 'webpack5' },

  stories: [
    '../src/lib/**/*.stories.mdx',
    '../src/lib/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@nrwl/react/plugins/storybook', ...addons],
  staticDirs: [{ from: '../fonts', to: '/fonts' }]
  // webpackFinal: async (config, { configType }) => {
  //   return {
  //     ...config,
  //     resolve: {
  //       ...config.resolve,
  //       alias: {
  //         ...config.resolve.alias, 
  //         "/fonts": "../fonts"
  //       },
  //     },
  //   };
  // },
};
