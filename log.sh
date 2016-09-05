#!/bin/bash
container_id=$(sudo docker ps | grep "ionic" | cut -d ':' -f 1 | cut -d ' ' -f 1)
echo $container_id
docker logs -f $container_id
