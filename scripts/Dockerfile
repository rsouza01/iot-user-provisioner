# FROM node:12-alpine

# # Debug purposes - do not remove
# # RUN apk add --no-cache bash

# ARG NPM_TOKEN

# RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

# WORKDIR /home/node/app

# COPY --chown=node:node package*.json ./
# COPY --chown=node:node ./scripts/.npmrc-template ./.npmrc

# USER node

# RUN npm install && npm cache clean --force

# RUN rm -f .npmrc

# COPY --chown=node:node ./build/ .

# CMD [ "node", "index.js"]


FROM node:14-alpine AS iot-user-api-builder

RUN apk update
RUN apk add gettext

ARG NPM_TOKEN=${NPM_TOKEN}

WORKDIR /usr/src/app

RUN npm uninstall -g tsc
RUN npm install -g typescript

COPY package*.json ./
COPY ./scripts/.npmrc-template .

RUN envsubst '$NPM_TOKEN' < .npmrc-template > .npmrc && \
    npm i && \
    npm cache clean --force && \
    rm -f .npmrc && \
    rm -f .npmrc-template

COPY . .

RUN tsc -p .

# Our Second stage, that creates an image for production
FROM node:14-alpine AS iot-user-api-production

RUN apk update
RUN apk add gettext
ARG NPM_TOKEN=${NPM_TOKEN}

RUN npm install pm2 -g

WORKDIR /app

COPY --from=iot-user-api-builder /usr/src/app/dist ./dist

COPY ./scripts/.npmrc-template .
RUN envsubst '$NPM_TOKEN' < .npmrc-template > .npmrc && \
    npm i && \
    npm cache clean --force && \
    rm -f .npmrc && \
    rm -f .npmrc-template

EXPOSE 3000
CMD ["pm2-runtime","/app/dist/index.js"]