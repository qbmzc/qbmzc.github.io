#!/bin/bash
yarn build &&
cd public
git init
git add -A
git commit -m 'deploy'
# gitee
git push -f git@gitee.com:snowyan/snowyan.git master
# github
git push -f git@github.com:qbmzc/qbmzc.github.io.git master