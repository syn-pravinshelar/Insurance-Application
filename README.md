# Insurance-Application

## Prerequisite

- You will need docker installed on your machine.
- You will need Node installed on your machine

## Docker creation

1. Create a build from Dockerfile

   > docker build -t synechron/node-web-app .

2. Run the docker image

   > docker run -p 3000:3000 -d synechron/node-web-app

## Executing on browser

Open link in browser http://localhost:3000/

## NPM Scripts for easier development

Clean out existing Docker containers and re-build and run

> npm run cleandockers && npm run builddocker && npm run docker
