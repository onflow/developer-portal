
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const url = require('@rollup/plugin-url');
const svgr = require('@svgr/rollup');

module.exports = (options) => ({
  ...options,
  plugins: [
    ...options.plugins,
    url(),
    svgr(),
    peerDepsExternal({
      includeDependencies: true,
      dedupe: ['react', 'react-dom']
    })
  ],

});
