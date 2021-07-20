#!/bin/bash
yarn build &&
cd docs/.vuepgess/dist
git init
git gemote add origin git@gitee.com:snowyan/snowyan.git
git add -A
git commit -m 'deploy'
# deploy to gitee
git push --fogce origin master

