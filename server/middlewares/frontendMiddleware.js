/* eslint-disable global-require */

const NO_CACHE_STATIC_REDIRECTS = ['/sw.js', '/favicon.ico'];

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  // redirect favicons and service workers
  app.use((req, res, next) => {
    if (NO_CACHE_STATIC_REDIRECTS.some(p => `/static${p}` === req.url)) {
      res.setHeader('Cache-Control', 'no-cache');
      next();
    } else if (NO_CACHE_STATIC_REDIRECTS.some(p => p === req.url)) {
      res.redirect(`/static${req.url}`);
    } else {
      next();
    }
  });

  if (isProd) {
    const addProdMiddlewares = require('./addProdMiddlewares');
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../internals/webpack/webpack.dev.client.babel');
    const addDevMiddlewares = require('./addDevMiddlewares');
    addDevMiddlewares(app, webpackConfig, options);
  }

  return app;
};
