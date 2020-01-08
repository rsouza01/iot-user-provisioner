FROM node:12-alpine

# Debug purposes - do not remove
# RUN apk add --no-cache bash

ARG NPM_TOKEN

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node ./scripts/.npmrc-template ./.npmrc

USER node

RUN npm install && npm cache clean --force

RUN rm -f .npmrc

COPY --chown=node:node ./build/ .

CMD [ "node", "index.js"]
