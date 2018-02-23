/* eslint consistent-return:0 */

const express = require('express');

const setup = require('./middlewares/frontendMiddleware');
const resolve = require('path').resolve;
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/static',
});

// Start your app.
module.exports = app;
