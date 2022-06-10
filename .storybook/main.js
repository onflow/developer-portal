module.exports = {
  core: { builder: "webpack5" },
  stories: [
    "../app/ui/design-system/**/*.stories.mdx",
    "../app/ui/design-system/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  staticDirs: [
    { from: "../app/ui/design-system/fonts", to: "/fonts" },
    { from: "../app/ui/design-system/images", to: "/images" },
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: "@storybook/react",
}
