## Downloading a Docker Image

    docker pull <image_name>

## Get the list of docker images

    docker images

## Create a Container

    docker run <container_name>:<version>

## Start/Stop a Container

    docker start <container_id>
    docker stop <container_is>

## Docker Logs

    docker logs <container_id>

## Getting Interactive Terminal of a containner

    docker exec -it <container_id> /bin/bash

## list running containers

    docker ps

## network Id's

        docker network ls

## Create docker network

        docker network create --driver bridge <network_name>

### flags

    -a : shows all containers

    -p <HostPost>:<containerPort> : Port Binding

    -d : detached mode (run in background)

    --name <container_name> : name of the container

    -e : add environment variables

    --net <network_name> : network name

# Examples

## Creating Mongo Container

    docker run -d -p 27017:27017 --name mongo -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password --net network_name mongo:latest
