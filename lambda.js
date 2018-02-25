const serverless = require('serverless-http');
const app = require('./server/server');

exports.handler = serverless(app);
