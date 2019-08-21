/* eslint-disable global-require */

const NO_CACHE_STATIC_REDIRECTS = [
  '/sw.js',
  '/favicon.ico',
];

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  // redirect favicons and service workers
  app.use((req, res, next) => {
    if (NO_CACHE_STATIC_REDIRECTS.some((p) => `/static${p}` === req.url)) {
      res.setHeader('Cache-Control', 'no-cache');
      next();
    } else if (NO_CACHE_STATIC_REDIRECTS.some((p) => p === req.url)) {
      res.redirect(`/static${req.url}`);
    } else {
      next();
    }
  });

  // This part is asynchronous, so probably not safe to immediately call
  // SSR methods as soon as the app launches.
  //
  // Note: Since we use "import" here, this will import the module in ES5 style,
  // meaning that we need to use .default in order to get the default export.
  if (isProd) {
    import('./addProdMiddlewares').then(addProdMiddlewares => addProdMiddlewares.default(app, options));

  } else {
    import('./addDevMiddlewares').then(addDevMiddlewares => {
      import('../../internals/webpack/webpack.dev.client.babel').then(webpackConfig =>
        addDevMiddlewares.default(app, webpackConfig.default, options)
      );
    });
  }

  return app;
};
