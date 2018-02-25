// Important modules this config uses
const webpack = require('webpack');
const config = require('./webpack.base.babel');

module.exports = (options) => config({
  plugins: [
    // We need to disable this until a release
    // of react-loadable is shipped with:
    // https://github.com/jamiebuilds/react-loadable/commit/65abc58456a1bf027b883be78fbe32da9d6a4f53
    //
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true,
    }),
  ],

  performance: {
    assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
  },

  ...options,
});
