/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { HelmetProvider } from 'react-helmet-async';

import PropTypes from 'prop-types';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Import CSS reset and Global Styles
import './global-styles';

const ConnectedApp = props => (
  <Provider store={props.store}>
    <LanguageProvider messages={props.messages}>
      <ConnectedRouter history={props.history}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ConnectedRouter>
    </LanguageProvider>
  </Provider>
);

ConnectedApp.propTypes = {
  messages: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default ConnectedApp;
