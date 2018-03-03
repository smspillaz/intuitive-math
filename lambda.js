const serverless = require('serverless-http');
const app = require('./server/server');

module.exports = {
  handler: serverless(app, {
    binary: ['image/png', 'image/jpeg', 'image/x-icon'],
  }),
};
