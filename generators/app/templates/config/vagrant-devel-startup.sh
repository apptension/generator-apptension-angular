#!/usr/bin/env bash

sudo apt-get update
sudo apt-get install -y g++

# Install NodeJS
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
npm config set registry http://registry.npmjs.org/

cd /vagrant
npm install -g gulp bower
npm install --no-optional
