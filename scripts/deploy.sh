#!/bin/bash
progress() {
  while true
  do
    echo -n "."
    sleep 5
  done
}

text=$(cat <<EOL
{
  "bucket": "intuitive-math",
  "source": "rendered/",
  "region": "us-west-2",
  "accessKeyId": "${AWS_ACCESS_KEY_ID}",
  "secretAccessKey": "${AWS_SECRET_ACCESS_KEY}"
}
EOL
)

echo "${text}" > ./s3.config.json

progress &
PROGRESS=$!

npm install
npm run snapshot
npm run s3:deploy

kill $PROGRESS >/dev/null 2>&1
