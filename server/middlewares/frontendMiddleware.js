/* eslint-disable global-require */

const redirect = (dst) => (req, res) => res.redirect(dst);

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  // redirect favicons and service workers
  app.get('/sw.js', redirect('/static/sw.js'));
  app.get('/favicon.ico', redirect('/static/favicon.ico'));

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
