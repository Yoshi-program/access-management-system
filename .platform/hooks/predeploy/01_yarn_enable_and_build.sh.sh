#!/bin/bash
corepack enable
yarn install
yarn install --cwd server
yarn build