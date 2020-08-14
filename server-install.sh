#!/bin/bash

sudo apt-get update && sudo apt-get -y upgrade

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -

sudo apt -y update

sudo apt install -y nodejs

sudo npm install -y -g nodemon

sudo apt-get remove docker docker-engine docker.io containerd runc

sudo apt-get install -y apt-transport-https
sudo apt-get install -y ca-certificates
sudo apt-get install -y gnupg-agent
sudo apt-get install -y software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

sudo apt -y update

sudo apt-get install -y docker-ce
sudo apt-get install -y docker-ce-cli
sudo apt-get install -y containerd.io

