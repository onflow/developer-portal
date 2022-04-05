module.exports = {
  stories: [
    "../src/stories/**/*.stories.mdx",
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-postcss",
    "@storybook/addon-interactions",
    {
      name: "storybook-addon-swc",
      options: {
        enable: true,
        enableSwcLoader: true,
        enableSwcMinify: true,
        swcLoaderOptions: {},
        swcMinifyOptions: {}
      }
    }
  ]
};
