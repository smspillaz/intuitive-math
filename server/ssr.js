const React = require('react');
const ReactDOMServer = require('react-dom/server');

// Real filesystem
const physicalFS = require('fs');

// Memory history
const createMemoryHistory = require('history/createMemoryHistory').default;

// Server-side metrics
const analytics = require('./serverAnalytics').default;

// Import root containers
const Root = require('../app/app').default;
const messages = require('../app/i18n').translationMessages;
const configureStore = require('../app/configureStore').default;

// Server rendering for styled-components
const ServerStyleSheet = require('styled-components').ServerStyleSheet;

// Server rendering for react-loadable
const Loadable = require('react-loadable');
const getBundles = require('react-loadable/webpack').getBundles;

// Wrap root container to get some analytics
const AnalyticsRoot = analytics(Root);

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
    const stylesheet = new ServerStyleSheet();
    const modules = [];
    const html = ReactDOMServer.renderToString(
      stylesheet.collectStyles(
        <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
          <AnalyticsRoot messages={messages} history={memoryHistory} store={store} />
        </Loadable.Capture>
      )
    );
    const styleTags = stylesheet.getStyleTags();
    physicalFS.readFile('./build/react-loadable.json', 'utf-8', (statsErr, statsData) => {
      const bundles = getBundles(JSON.parse(statsData), modules);
      const bundlesHTML = bundles.map((bundle) =>
        `<script src="/static/${bundle.file}"></script>`
      ).join('\n');

      // This should read the compiled index.html file when running from the
      // webpack bundle and the non-compiled index.html file when running
      // from babel-node
      fs.readFile(indexHTMLTemplatePath, 'utf8', (err, data) => {
        // Set a dummy user agent based on the request user agent.
        global.navigator = { userAgent: req.headers['user-agent'] };
        res.send(data.replace(/<\/head>/,
                              `${styleTags}</head>`)
                     .replace(/<div id="app">\s*<\/div>/,
                              `${bundlesHTML}<div id="app">${html}</div>`));
      });
    });
  });
};
