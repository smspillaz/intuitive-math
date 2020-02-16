const path = require('path');
const express = require('express');
const fs = require('fs');
const ssr = require('../ssr');

module.exports = function addProdMiddlewares(app, options) {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  // use the gzipped bundle
  // app.get('*.js', (req, res, next) => {
  //   req.url = req.url + '.gz'; // eslint-disable-line
  //   res.set('Content-Encoding', 'gzip');
  //   next();
  // });

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  //
  // Except that for now it doesn't work on serverless.
  // app.use(compression());
  //
  // Add SSR middleware first, then add express.static
  //
  // When express.static can't find a file, it will pass control to
  // the middleware
  app.use(express.static(outputPath));
  ssr(app, fs, path.join('./build', 'index.html'));
};
