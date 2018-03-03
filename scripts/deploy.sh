#!/bin/bash
progress() {
  while true
  do
    echo -n "."
    sleep 5
  done
}

# We'll need to set up our credentials
mkdir -p ../intuimath-credentials/config/app/

text=$(cat <<EOL
credentials:
  accessKeyId: ${AWS_ACCESS_KEY_ID}
  secretAccessKey: ${AWS_SECRET_ACCESS_KEY}
development:
  NODE_ENV: production
staging:
  NODE_ENV: production
production:
  NODE_ENV: production
EOL
)

echo "${text}" >> ../intuimath-credentials/config/app/env.yml

progress &
PROGRESS=$!

yarn install
yarn build:dll
yarn build:client
yarn build:serverless
yarn serverless-deploy

kill $PROGRESS >/dev/null 2>&1
