/**
 * DEVELOPMENT WEBPACK CONFIGURATION - SERVER CONFIGURATION
 */

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = require('./webpack.dev.babel.js')({
  entry: [
    path.join(process.cwd(), 'server/index.js'),
  ],

  externals: [nodeExternals()],

  output: {
    filename: 'devServer.js',
    path: path.join(process.cwd(), 'build'),
  },

  target: 'node',
  server: true,
});
