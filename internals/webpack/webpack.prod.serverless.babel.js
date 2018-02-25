// Important modules this config uses
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = require('./webpack.prod.babel')({
  // In production, we skip all hot-reloading stuff
  entry: [
    path.join(process.cwd(), 'lambda.js'),
  ],

  externals: [nodeExternals({
    // Need to whitelist @atlaskit/dropdown-menu things here,
    // otherwise when building the library it gets directly required, which in
    // turn causes node to trip up because navigator is not defined.
    whitelist: [
      '@atlaskit/avatar',
      '@atlaskit/dropdown-menu',
      '@atlaskit/droplist',
      '@atlaskit/navigation',
      'react-spinkit',
      'loaders.css',
    ],
  })],

  output: {
    filename: 'prodLambda.js',
    libraryTarget: 'umd',
    library: 'lambda',
    // Needs to go in process.cwd in order to be imported
    // correctly from lambda
    path: path.join(process.cwd()),
  },

  target: 'node',
  server: true,
});
