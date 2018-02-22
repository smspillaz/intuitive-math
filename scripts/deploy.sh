#!/bin/bash

yarn install
yarn build:dll
yarn build
yarn serverless-deploy
