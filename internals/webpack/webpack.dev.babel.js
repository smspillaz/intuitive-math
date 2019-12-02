/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
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
