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
    /^micromark.*/,
    /^markdown.*/,
    "ccount",
    "character-entities",
    "comma-separated-tokens",
    "decode-named-character-reference",
    "fault",
    "html-whitespace-sensitive-tag-names",
    "mdx-bundler",
    "space-separated-tokens",
    "stringify-entities",
  ],
};
