/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
<<<<<<< HEAD
const config = require('./webpack.base.babel.js');

module.exports = options =>
  config({
    mode: 'development',

    optimization: {
      minimize: false,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {},
      },
=======

module.exports = require('./webpack.base.babel')({
  mode: 'development',

  // Add hot reloading in development
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), 'app/app.js'), // Start with js/app.js
  ],

  // Don't use hashes in dev mode for better performance
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
>>>>>>> a794202... Hot reloading issues fixed (#2810)
    },

    // Add development plugins
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/, // exclude node_modules
        failOnError: false, // show a warning when there is a circular dependency
      }),
    ],

    performance: {
      hints: false,
    },

    ...options,
  });
