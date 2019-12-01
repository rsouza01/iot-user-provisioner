#!/bin/sh

docker run --name mongo_users_db -d -p 27017:27017 mongo --noauth --bind_ip=0.0.0.0
