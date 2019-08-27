const fs = require('fs');
const path = require('path');

const { run } = require('react-snap');

const app = require('../server/server');
const port = require('../server/port');

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = process.env.HOST || 'localhost';
const host = customHost || null; // Let http.Server use its default IPv6/4 host

const server = app.listen(port, host, (err) => {
  if (err) {
    return console.error(err.message);
  }

  const buildDir = 'build';
  const outputDir = 'rendered';

  try {
    fs.unlinkSync(path.join(outputDir, '200.html'));
  } catch (e) {
    console.error(e);
  }

  return run({
    externalServer: true,
    source: buildDir,
    destination: outputDir,
    port,
  }).then(() => {
    server.close();
    process.exit(0);
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });
});
