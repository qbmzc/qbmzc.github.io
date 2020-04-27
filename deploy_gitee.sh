#!/bin/sh
yarn build &&
cd public
git init
git add -A
git commit -m 'deploy'
git push -f git@gitee.com:snowyan/snowyan.git master