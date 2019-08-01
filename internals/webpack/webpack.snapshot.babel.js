// Important modules this config uses
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const config = require('./webpack.base.babel');

module.exports = config({
  // In production, we skip all hot-reloading stuff
  entry: [path.join(process.cwd(), 'internals/scripts/snapshot.js')],

  externals: [nodeExternals()],

  output: {
    filename: 'snapshot.js',
    path: path.join(process.cwd(), 'build'),
  },

  plugins: [
    // Need to disable SSR state-hydration. If we have this enabled, a rather
    // complex interaction can happen which breaks routing. Basically,
    // since the host will redirect all 404's to index.html, we load that, but
    // the router-state will have been saved in index.html, therefore clobbering
    // the window.location variable
    new webpack.EnvironmentPlugin({
      DISABLE_SSR_STATE: '1',
    }),
  ],

  target: 'node',
  server: true,
});
