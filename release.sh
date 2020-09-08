#!/usr/bin/env bash
MSG=$1

if [ "${MSG}" == "" ]; then
    echo "usage release.sh commit-message"
    exit 1
fi
git status
git add .
git commit -m ${MSG}
git push
git checkout release
git merge master
git push
git checkout master
