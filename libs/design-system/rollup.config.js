const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const url = require('@rollup/plugin-url');
const svgr = require('@svgr/rollup');
const typescript = require('@rollup/plugin-typescript');

module.exports = (options) => ({
  ...options,
  plugins: [
    peerDepsExternal(),
    ...options.plugins,
    typescript({ tsconfig: './libs/design-system/tsconfig.json' }),
    url(),
    svgr(),
  ],
});
