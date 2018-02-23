const path = require('path');
const express = require('express');
const ssr = require('../ssr');

module.exports = function addProdMiddlewares(app, options) {
  const publicPath = options.publicPath || '/static';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  //
  // Except that for now it doesn't work on serverless.
  // app.use(compression());
  app.use(publicPath, express.static(outputPath));
  ssr(app);
};
