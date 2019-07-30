/**
 * client.js
 *
 * This is the entry file for the client, only setup and boilerplate
 * code.
 */

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { render } from 'react-snapshot';
import 'sanitize.css/sanitize.css';

import FontFaceObserver from 'fontfaceobserver';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '!file-loader?name=[name].[ext]!./images/favicon-16x16.png';
import '!file-loader?name=[name].[ext]!./images/favicon-32x32.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-192x192.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-512x512.png';
import '!file-loader?name=[name].[ext]!./images/mstile-150x150.png';
import '!file-loader?name=[name].[ext]!./images/apple-touch-icon.png';
import '!file-loader?name=[name].[ext]!./images/safari-pinned-tab.svg';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions

// Also load the banner image, which will be displayed on the homepage
import '!file-loader?name=[name].[ext]!./images/intuitive-math-banner.png';

/* eslint-enable import/no-webpack-loader-syntax */

// Import hotjar
import { hotjar } from 'react-hotjar';

// Listen for changes to location
import withLocation from 'components/CaptureLocation';

// Import history creator and store configure func
import createHistory from 'history/createBrowserHistory';
import configureStore from './configureStore';

// Import root containers
import Root from './app';

// Import analytics HOC
import analytics from './analytics';

// Import i18n messages
import { translationMessages } from './i18n';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// Initialize hotjar with our tracking code
hotjar.initialize('793002');

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

// Create redux store with history and hydrate state from server, if available
// eslint-disable-next-line no-underscore-dangle
const initialState = window.__SERVER_STATE || {};
const initialStateAllowedKeys = new Set(['global', 'language', 'route']);
const history = createHistory();
const store = configureStore(Object.keys(initialState).filter((k) =>
  initialStateAllowedKeys.has(k)
).reduce((acc, key) => ({
  ...acc,
  [key]: initialState[key],
}), {}), history);

const MOUNT_NODE = document.getElementById('app');

const AnalyticsRoot = withLocation(analytics(Root));

const renderFunc = (messages) =>
  render(
    <AnalyticsRoot
      messages={messages}
      history={history}
      store={store}
    />,
    MOUNT_NODE
  );

// Need to have this in order to keep react-snapshot happy
const renderOnPreload = (messages) => {
  if (!__SERVER__ && (
    navigator.userAgent.includes('Node.js') || navigator.userAgent.includes('jsdom')
  )) {
    Loadable.preloadReady().then(() => renderFunc(messages));
  } else {
    renderFunc(messages);
  }
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    renderOnPreload(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'));
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
      import('intl/locale-data/jsonp/de.js'),
    ]))
    .then(() => renderOnPreload(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  renderOnPreload(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
