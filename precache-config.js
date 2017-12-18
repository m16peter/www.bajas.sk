var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'docs',
  root: 'docs/',
  plugins: [
    new SWPrecacheWebpackPlugin({
      cacheId: 'firestarter',
      filename: 'service-worker.js',
      staticFileGlobs: [
        'docs/index.html',
        'docs/**.js'
      ],
      stripPrefix: 'docs/assets/',
      mergeStaticsConfig: true
    }),
  ]
};
