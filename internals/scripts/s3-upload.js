const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const s3EasyDeploy = require('s3-easy-deploy');
const yargs = require('yargs');
const AWS = require('aws-sdk');

const argv =
  yargs
    .command('s3-upload.js CONFIG', 'upload to s3')
    .demandOption('config').argv;
const s3UploadConfig = JSON.parse(fs.readFileSync(argv.config));

// Copy build files to static
shell.cp('-R', 'build', path.join(s3UploadConfig.source, 'static'));

process.env.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || s3UploadConfig.accessKeyId;
process.env.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || s3UploadConfig.secretAccessKey;

// Clean out build javascript objects in the static/ directory
const s3Controller = new AWS.S3({ apiVersion: '2006-03-01' });
s3Controller.listObjects({
  Bucket: s3UploadConfig.bucket,
  MaxKeys: 1000,
}).promise().then(data =>
  Promise.all(
    data.Contents.map(d => d.Key)
      .filter(k =>
        k.endsWith('.js') ||
        k.endsWith('.gz') ||
        k.endsWith('.json)')
      )
      .map(k => s3Controller.deleteObject({
        Bucket: s3UploadConfig.bucket,
        Key: k
      }).promise().then(() => console.log('Dropped object', k)))
  )
).then(() =>
  s3EasyDeploy.deploy({
    publicRoot: s3UploadConfig.source,
    bucket: s3UploadConfig.bucket,
    region: s3UploadConfig.region,
    acl: 'public-read',
    metadata: [
      {
        match: /^.*$/,
        tags: {
          'Cache-Control': 'max-age=60'
        }
      }
    ]
  })
).then(() => console.log('Deployent to S3 bucket done')).catch(e => console.error(e));

