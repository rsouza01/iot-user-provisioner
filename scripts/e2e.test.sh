#!/usr/bin/env bash

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

npm run start:dev &


# Tearing down
docker-compose down