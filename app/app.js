/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// Import all the third party stuff
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import PropTypes from 'prop-types';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Import CSS reset and Global Styles
import './global-styles';

import { HistoryContext } from './utils/history';

const Root = ({ messages, history, store }) => (
  <Provider store={store}>
    <LanguageProvider messages={messages}>
      <ConnectedRouter history={history}>
        <HistoryContext.Provider value={history}>
          <App />
        </HistoryContext.Provider>
      </ConnectedRouter>
    </LanguageProvider>
  </Provider>
);

Root.propTypes = {
  messages: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default Root;
