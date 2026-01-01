#!/bin/bash

USERHOME="/Users/seongho-noh"
IHOME="$USERHOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/Main"
GITHOME="$USERHOME/workspace/shdkej.github.io"

cp -r "$IHOME/1.Fundamental/" "$GITHOME/content/Fundamental/"
cp -r "$IHOME/2.Deep Knowledge/" "$GITHOME/content/Deep Knowledge/"
cp -r "$IHOME/3.Integration/" "$GITHOME/content/Integration/"
cp -r "$IHOME/4.Communication/" "$GITHOME/content/Communication/"
cp -r "$IHOME/5.Human/" "$GITHOME/content/Human/"
cp -r "$IHOME/6.Health/" "$GITHOME/content/Health/"
cp -r "$IHOME/7.Idea/" "$GITHOME/content/Idea/"
cp -r "$IHOME/8.Meta/" "$GITHOME/content/Meta/"
cp -r "$IHOME/blog/" "$GITHOME/content/blog/"
cp "$IHOME/Portfolio.md" "$GITHOME/content/Portfolio.md"
