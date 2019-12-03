---
layout: article
title:  Docker命令集
---

![](https://geekflare.com/wp-content/uploads/2019/09/docker-architecture-609x270.png)


## 仓库

```
login
logout
pull
push
search
```

docker pull mysql:5.7.19

docker login https://domian



## 镜像

```
images
rmi
tag
build
history
commit

save
load

import
checkpoint
image
manifest
trust
```

docker build -t runoob/centos:6.7 .

docker rmi IMAGE_ID

docker rmi $(docker images -q)

docker commit 3ea7a99a0025 ubuntu/ruby:v2

docker load < my_image.tar.gz

docker history ubuntu:16.04

```
docker save my_image:my_tag | gzip > my_image.tar.gz
cat my_container.tar.gz | docker import - my_image:my_tag
docker export my_container | gzip > my_container.tar.gz
```


## 容器

```
ps
cp
inspect
top
attach
events
logs
wait
export
port
container
deploy
update
rename

diff
status
```

docker ps -a

docker logs CONTAINER_ID

docker logs -f 3f2e

docker attach 1e560fca3906 

docker stats <container>

## 容器生命周期

```
run
start
stop
restart
kill
rm
pause
unpause
create
exec
```

docker run -t -i mysql:5.7.19 /bin/bash

docker run -i -t -p 7000:22 centos:centos7 /bin/bash

docker run -d  --net host -p 50001:22 my:my /usr/sbin/sshd -D

docker kill $(docker ps -q)

资源限制:
```
docker run -it -c 512 agileek/cpuset-test 
docker run -it --cpuset-cpus=0,4,6 agileek/cpuset-test 

docker run -it -m 300M ubuntu:14.04 /bin/bash 

docker run --pids-limit=64

```

docker exec -it b69121863a75 /bin/bash

docker rm CONTAINER_ID

docker rm  $(docker ps -a -q)

```
docker ps -a | grep 'weeks ago' | awk '{print $1}' | xargs docker rm
docker rm -v $(docker ps -a -q -f status=exited)
```


## 网络

docker network create -d bridge test-net

docker network rm

docker network ls

docker network inspect

docker network connect

docker network disconnect


docker network create --subnet 203.0.113.0/24 --gateway 203.0.113.254 iptastic

docker run --rm -it --net iptastic --ip 203.0.113.2 nginx



docker network rm $(docker network ls -q) //clean up orphaned networks


## 卷

docker volume create

docker volume rm

docker volume ls

docker volume inspect

docker volume rm $(docker volume ls -qf dangling=true)  //clean up orphaned volumes

## 其他
```
info
version
system
config
plugin
secret
service
```

docker --version


## 集群

```
swarm
compose
node
stack
```

docker-swarm --version

docker-compose --version

docker-compose up -d

docker-compose down

docker-compose stop


![](https://jrebel.com/wp-content/uploads/2016/03/Docker-cheat-sheet-by-RebelLabs.png)

