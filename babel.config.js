// support ts tests in jest, not used by remix
// https://jestjs.io/docs/getting-started#using-typescript
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
}
