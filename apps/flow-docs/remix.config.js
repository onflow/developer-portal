/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: [".*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverDependenciesToBundle: [
    /^rehype.*/,
    /^remark.*/,
    /^unified.*/,
    /^unist.*/,
    /^hast.*/,
    /^mdast.*/,
    "mdx-bundler",
    "html-whitespace-sensitive-tag-names",
    "space-separated-tokens",
    "comma-separated-tokens",
    "stringify-entities",
  ],
};
