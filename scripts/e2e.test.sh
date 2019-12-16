#!/usr/bin/env bash

clear

# Make sure the port is not already bound 
if ss -lnt | grep -q :$SERVER_PORT; then 
    echo "Another process is already listening to port $SERVER_PORT" 
    exit 1; 
fi

# Make sure we are creating clean images
docker rm -f $(docker ps -a -q)

# Set the environment (Database, MQTT, etc)
docker-compose -f ./scripts/docker-compose.yml up -d

# Wait until mongo logs that it's ready (or timeout after 60s)
COUNTER=0
while !(nc -z localhost 27017) && [[ $COUNTER -lt 60 ]] ; do
    sleep 2
    let COUNTER+=2
    echo "Waiting for mongo to initialize... ($COUNTER seconds so far)"
done

# TEST Mongo: nc -v localhost 27017
echo "Connected in  ($COUNTER seconds so far)"

# Start the server (production-mode) in background
npm run start &

# Test if the server is up and running
RETRY_INTERVAL=0.2 
until ss -lnt | grep -q :$SERVER_PORT; do 
    sleep $RETRY_INTERVAL 
done

# Run the End-to-End tests
npx dotenv -e .env cucumber-js -- ./test/e2e/features/**/*.feature --require-module ts-node/register --require ./test/e2e/steps/**/*.steps.ts

# Kill everyting SIGTERM signal
kill -15 0

# Tear down
docker-compose down