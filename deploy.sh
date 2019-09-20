#!/bin/bash
yarn build &&
cd public
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:qbmzc/qbmzc.github.io.git master