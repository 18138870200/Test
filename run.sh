#!/bin/bash

address=$(ifconfig eth0 | grep "inet addr" | cut -d ':' -f 2 | cut -d ' ' -f 1)
port=$1
if [ "$port" == "" ]; then
	port=8100
fi

echo $address $port
ionic serve --address=$address --nolivereload --port=$port

