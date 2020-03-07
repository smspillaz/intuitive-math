// Important modules this config uses
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { HashedModuleIdsPlugin } = require('webpack');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

const config = require('./webpack.prod.babel')({
  // In production, we skip all hot-reloading stuff
  entry: [
    require.resolve('react-app-polyfill/ie11'),
    path.join(process.cwd(), 'app/client.js'),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: '/',
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        sourceMap: true,
      }),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    runtimeChunk: 'single',
    // We need to disable this until a release
    // of react-loadable is shipped with:
    // https://github.com/jamiebuilds/react-loadable/commit/65abc58456a1bf027b883be78fbe32da9d6a4f53
    //
    // concatenateModules: true,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
});

config.plugins.push.apply(config.plugins, [
  new webpack.ProvidePlugin({
    // make fetch available
    fetch: 'exports-loader?self.fetch!whatwg-fetch',
  }),
  // Minify and optimize the index.html
  new HtmlWebpackPlugin({
    template: 'app/index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
    inject: true,
  }),

  // Put it in the end to capture all the HtmlWebpackPlugin's
  // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
  new OfflinePlugin({
    relativePaths: false,
    publicPath: '/',
    appShell: '/',

    // No need to cache .htaccess. See http://mxs.is/googmp,
    // this is applied before any match in `caches` section
    excludes: ['.htaccess*'],

    caches: {
      main: [':rest:'],

      // All chunks marked as `additional`, loaded after main section
      // and do not prevent SW to install. Change to `optional` if
      // do not want them to be preloaded at all (cached only when first loaded)
      additional: ['*.chunk.js'],
    },

    // Removes warning for about `additional` section usage
    safeToUseOptionalCaches: true,

    AppCache: false,
  }),

  new CompressionPlugin({
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8,
  }),

  new WebpackPwaManifest({
    name: 'React Boilerplate',
    short_name: 'React BP',
    description: 'My React Boilerplate-based project!',
    background_color: '#fafafa',
    theme_color: '#b1624d',
    icons: [
      {
        src: path.resolve('app/images/icon-512x512.png'),
        sizes: [72, 96, 120, 128, 144, 152, 167, 180, 192, 384, 512],
      },
    ],
  }),

  new HashedModuleIdsPlugin({
    hashFunction: 'sha256',
    hashDigest: 'hex',
    hashDigestLength: 20,
  }),

  new ReactLoadablePlugin({
    filename: './build/react-loadable.json',
  }),
]);

module.exports = config;
