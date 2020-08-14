FROM node:12.4-alpine

LABEL maintainer="Team Synechron"

RUN mkdir /app
WORKDIR /app

COPY package.json package.json

RUN npm install && mv node_modules /node_modules
RUN npm install -g nodemon

COPY src .

ENV NODE_ENV=production
ENV DATABASE=mongodb://mongodb:27017/synechron
ENV PORT=80

EXPOSE 80

CMD [ "nodemon", "app.js" ]