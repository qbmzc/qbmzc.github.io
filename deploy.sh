#!/bin/bash
yarn build &&
cd docs/.vuepress/dist
git init
git add -A
git commit -m 'deploy'
# deploy to gitee
git push -f git@gitee.com:snowyan/snowyan.git master
