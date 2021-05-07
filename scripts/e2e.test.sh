#!/usr/bin/env bash

trap "exit 0" INT TERM

clear

echo -ne "Checking port $SERVER_PORT..." 
# Make sure the port is not already bound 
if ss -lnt | grep -q :$SERVER_PORT; then 
    echo "Another process is already listening to port $SERVER_PORT" 
    exit 1; 
fi
echo "done." 

# Make sure we are creating clean images
if [ ! -z "$(docker ps -a -q)" ]
then
    echo -ne "Cleaning docker images...." 
    docker rm -f $(docker ps -a -q) > /dev/null 2>&1
    echo "done." 
fi

# Set the environment (Database, MQTT, etc)
echo -ne "Building docker-compose stack..." 
docker-compose -f ./scripts/docker-compose.yml up -d  > /dev/null 2>&1
echo "done!" 

# Wait until mongo logs that it's ready (or timeout after 60s)
COUNTER=0
while !(nc -z localhost 27017) && [[ $COUNTER -lt 60 ]] ; do
    sleep 2
    let COUNTER+=2
    echo "Waiting for mongo to initialize... ($COUNTER seconds so far)..."
done

# TEST Mongo: nc -v localhost 27017
echo "Connected to Mongo local server in $COUNTER seconds so far."

# Start the server (production-mode) in background
echo -ne "Building the application in production-mode..." 
npm run build:prod

echo -ne "Starting the server in background..." 
npm run start > /dev/null 2>&1 &  

# Test if the server is up and running
RETRY_INTERVAL=0.2 
until ss -lnt | grep -q :$SERVER_PORT; do 
    sleep $RETRY_INTERVAL 
done
echo "done."

# Run the End-to-End tests
echo "Starting end to end tests (it may take a while)..." 
npx dotenv -e .env cucumber-js -- ./test/e2e/features/**/*.feature --require-module ts-node/register --require ./test/e2e/steps/**/*.steps.ts

# Tear down
echo -ne "Destroying docker-compose stack..." 
docker-compose -f ./scripts/docker-compose.yml down  > /dev/null 2>&1
echo "done."


# Kill everyting SIGTERM signal
# echo -ne "Killing group processes..." 
# kill -15 0
#pkill -P $$

#Finishing
echo "Exiting..."
exit 0
