/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const CircularDependencyPlugin = require('circular-dependency-plugin');
const logger = require('../../server/logger');

// We don't want webpack to try resolving this during builds, use
// fs.readFileSync instead
const pkg = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'package.json')),
);
const { dllPlugin } = pkg;

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),

  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/, // exclude node_modules
    failOnError: false, // show a warning when there is a circular dependency
  }),
];

module.exports = options =>
  // eslint-disable-next-line global-require
  require('./webpack.base.babel')({
    mode: 'development',

    // Add development plugins
    plugins: dependencyHandlers().concat(plugins), // eslint-disable-line no-use-before-define

    // Emit a source map for easier debugging
    // See https://webpack.js.org/configuration/devtool/#devtool
    devtool: 'eval-source-map',

    optimization: {
      minimize: false,
      splitChunks: {
        cacheGroups: {},
      },
    },

    performance: {
      hints: false,
    },

    ...options,
  });

/**
 * Select which plugins to use to optimize the bundle's handling of
 * third party dependencies.
 *
 * If there is a dllPlugin key on the project's package.json, the
 * Webpack DLL Plugin will be used.
 *
 */
function dependencyHandlers() {
  // Don't do anything during the DLL Build step
  if (process.env.BUILDING_DLL) {
    return [];
  }

  // Don't do anything if package.json does not have a dllPlugin property
  // Code splitting now included by default in Webpack 4
  if (!dllPlugin) {
    return [];
  }

  const dllPath = path.resolve(
    process.cwd(),
    dllPlugin.path || 'node_modules/react-boilerplate-dlls',
  );

  /**
   * If DLLs aren't explicitly defined, we assume all production dependencies listed in package.json
   * Reminder: You need to exclude any server side dependencies by listing them in dllConfig.exclude
   */
  if (!dllPlugin.dlls) {
    const manifestPath = path.resolve(dllPath, 'reactBoilerplateDeps.json');

    if (!fs.existsSync(manifestPath)) {
      logger.error(
        'The DLL manifest is missing. Please run `npm run build:dll`',
      );
      process.exit(0);
    }

    return [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: JSON.parse(fs.readFileSync(manifestPath)),
      }),
    ];
  }

  // If DLLs are explicitly defined, we automatically create a DLLReferencePlugin for each of them.
  const dllManifests = Object.keys(dllPlugin.dlls).map(name =>
    path.join(dllPath, `/${name}.json`),
  );

  return dllManifests.map(manifestPath => {
    if (!fs.existsSync(path)) {
      if (!fs.existsSync(manifestPath)) {
        logger.error(
          `The following Webpack DLL manifest is missing: ${path.basename(
            manifestPath,
          )}`,
        );
        logger.error(`Expected to find it in ${dllPath}`);
        logger.error('Please run: npm run build:dll');

        process.exit(0);
      }
    }

    return new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: JSON.parse(fs.readFileSync(manifestPath)),
    });
  });
}
