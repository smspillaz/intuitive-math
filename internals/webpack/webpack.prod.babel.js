// Important modules this config uses
const config = require('./webpack.base.babel');

module.exports = options =>
  config({
    performance: {
      assetFilter: assetFilename =>
        !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
    },

    optimization: {
      minimize: true,
      nodeEnv: 'production',
    },

    ...options,
  });
