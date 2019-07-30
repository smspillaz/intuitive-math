// Important modules this config uses
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const config = require('./webpack.base.babel');

module.exports = config({
  // In production, we skip all hot-reloading stuff
  entry: [path.join(process.cwd(), 'internals/scripts/snapshot.js')],

  externals: [nodeExternals()],

  output: {
    filename: 'snapshot.js',
    path: path.join(process.cwd(), 'build'),
  },

  plugins: [],

  target: 'node',
  server: true,
});
