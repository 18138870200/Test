#!/bin/bash

port="$1"
if [ "$port" == "" ]; then
	port=8101
fi

sudo docker run -d -ti --name cmos-integrated-promotion-app -p "$port":"$port" -p 32726:35729 -v "$PWD/":/app:rw hub.docker.vpclub.cn/vpclub/ionic:latest ./run.sh "$port"
