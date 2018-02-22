#!/bin/bash
set -x

# We'll need to set up our credentials
mkdir -p ../intuimath-credentials/config/app/

echo <<< EOL
credentials:
  accessKeyId: ${AWS_ACCESS_KEY_ID}
  secretAccessKey: ${AWS_SECRET_ACCESS_KEY}
development:
  NODE_ENV: production
staging:
  NODE_ENV: production
production:
  NODE_ENV: production
EOL >> ../intuimath-credentials/config/app/env.yml

yarn install
yarn build:dll
yarn build
yarn serverless-deploy
