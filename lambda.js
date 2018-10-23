const serverless = require('serverless-http');
const app = require('./server/server');

exports.handler = serverless(app, {
  binary: ['font/eot', 'font/opentype', 'font/otf', 'image/jpeg', 'image/png'],
});
