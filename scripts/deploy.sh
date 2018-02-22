#!/bin/bash

# We'll need to set up our credentials
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
EOL >> ../intuimath-config/config/app/env.yml

yarn install
yarn build:dll
yarn build
yarn serverless-deploy
