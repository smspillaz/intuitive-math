const fs = require('fs');
const path = require('path');

const Writer = require('react-snapshot/lib/Writer');
const Crawler = require('react-snapshot/lib/Crawler');

const app = require('../../server/server');
const port = require('../../server/port');

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = process.env.HOST || 'localhost';
const host = customHost || null; // Let http.Server use its default IPv6/4 host

const server = app.listen(port, host, err => {
  if (err) {
    return console.error(err.message);
  }

  const buildDir = 'build';
  const outputDir = 'rendered';
  const basename = '/';

  const buildDirPath = path.resolve(`./${buildDir}`);
  const outputDirPath = path.resolve(`./${outputDir}`);

  if (!fs.existsSync(buildDir)) {
    throw new Error(`No build directory exists at: ${buildDirPath}`);
  }
  const writer = new Writer(buildDirPath, outputDirPath);

  const crawler = new Crawler(`http://${host}:${port}${basename}`, 3000, {
    exclude: [],
    include: ['/'],
  });
  return crawler
    .crawl(({ urlPath, html }) => {
      if (!urlPath.startsWith(basename)) {
        console.log(
          `❗ Refusing to crawl ${urlPath} because it is outside of the ${basename} sub-folder`,
        );
        return;
      }
      const relativeUrlPath = urlPath.replace(basename, '/');
      let filename = relativeUrlPath;
      if (relativeUrlPath.endsWith('/')) {
        filename = `${relativeUrlPath}index.html`;
      } else if (path.extname(urlPath) === '') {
        filename = `${relativeUrlPath}.html`;
      }
      console.log(`✏️   Saving ${relativeUrlPath} as ${filename}`);
      writer.write(filename, html);
    })
    .then(() => server.close());
});
