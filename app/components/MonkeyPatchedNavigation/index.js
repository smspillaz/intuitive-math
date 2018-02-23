/*
 * MonkeyPatchedNavigaton
 *
 * A wrapper for the @atlaskit/Navigation component that monkey-patches
 * window.navigator so that it doesn't fail to import when using
 * server side rendering.
 */

global.window = {
  navigator: {
    userAgent: ['None'],
  },
};
global.navigator = global.window.navigator;

const Navigation = require('@atlaskit/navigation');

global.window = undefined;
global.navigator = undefined;

module.exports = Navigation;
