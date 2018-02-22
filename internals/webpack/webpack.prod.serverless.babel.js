// Important modules this config uses
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = require('./webpack.prod.babel')({
  // In production, we skip all hot-reloading stuff
  entry: [
    path.join(process.cwd(), 'lambda.js'),
  ],

  externals: [nodeExternals()],

  output: {
    filename: 'lambda.js',
    libraryTarget: 'umd',
    library: 'lambda',
    path: path.join(process.cwd(), 'build'),
  },

  target: 'node',
});
