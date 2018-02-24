const React = require('react');
const ReactDOMServer = require('react-dom/server');

// Memory history
const createMemoryHistory = require('history/createMemoryHistory').default;

// Import root containers
const Root = require('../app/app').default;
const messages = require('../app/i18n').translationMessages;
const configureStore = require('../app/configureStore').default;

module.exports = (app, fs, indexHTMLTemplatePath) => {
  app.use((req, res) => {
    // Should not have gotten here, but if we did, the resource
    // was not found
    if (req.url.startsWith('/static')) {
      res.status(404);
      return;
    }

    const memoryHistory = createMemoryHistory(req.url);
    memoryHistory.push(req.originalUrl);
    const store = configureStore({}, memoryHistory);
    const html = ReactDOMServer.renderToString(
      <Root messages={messages} history={memoryHistory} store={store} />
    );

    // This should read the compiled index.html file when running from the
    // webpack bundle and the non-compiled index.html file when running
    // from babel-node
    fs.readFile(indexHTMLTemplatePath, 'utf8', (err, data) => {
      // Set a dummy user agent based on the request user agent.
      global.navigator = { userAgent: req.headers['user-agent'] };
      res.send(data.replace(/<div id="app">\s*<\/div>/,
                            `<div id="app">${html}</div>`));
    });
  });
};
