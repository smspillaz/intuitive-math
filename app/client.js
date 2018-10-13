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
import 'sanitize.css/sanitize.css';

import FontFaceObserver from 'fontfaceobserver';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions
/* eslint-enable import/no-webpack-loader-syntax */

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

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(
  () => {
    document.body.classList.add('fontLoaded');
  },
  () => {
    document.body.classList.remove('fontLoaded');
  },
);

// Create redux store with history and hydrate state from server, if available
// eslint-disable-next-line no-underscore-dangle
const initialState = window.__SERVER_STATE || {};
const history = createHistory();
const store = configureStore(initialState, history);

const MOUNT_NODE = document.getElementById('app');

const AnalyticsRoot = withLocation(analytics(Root));
const render = messages => {
  Loadable.preloadReady().then(() => {
    ReactDOM.render(
      <AnalyticsRoot messages={messages} history={history} store={store} />,
      MOUNT_NODE,
    );
  });
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/de.js'),
      ]),
    )
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
