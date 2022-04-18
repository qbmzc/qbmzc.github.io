#!/bin/bash
yarn build &&
cd docs/.vuepress/dist
git init
git remote add origin git@gitee.com:snowyan/snowyan.git
git add -A
git commit -m 'deploy'
# deploy to gitee
git push --force origin master