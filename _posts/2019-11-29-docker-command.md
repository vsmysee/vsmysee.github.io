---
layout: article
title:  Docker命令集
---

![](/images/docker-arch.png)

![](https://docs.microsoft.com/en-us/virtualization/windowscontainers/deploy-containers/media/docker-on-linux.png)


## 版本列表

```
17
18
19
```

## 实践

```
容器应该短命
慎用 docker commit
每个容器一个程序
最少化Layer
注意继承和依赖
保持简洁
使用 COPY ，不要使用 ADD
```


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

docker push daocloud.io/zter/hello-world:v1


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

docker tag hello-world:latest hello-world:v2 //latest这种tag可以省略

docker build -t runoob/centos:6.7 .

docker build -t bitnami/kubectl:latest 'https://github.com/bitnami/bitnami-docker-kubectl.git#master:1.15/debian-9'

docker rmi IMAGE_ID

docker rmi $(docker images -q)

docker commit 3ea7a99a0025 ubuntu/ruby:v2

docker load < my_image.tar.gz

docker history ubuntu:16.04

docker image ls -f dangling=true //虚悬镜像

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

docker run --rm --name kubectl bitnami/kubectl:latest  version

docker run -d  --net host -p 50001:22 my:my /usr/sbin/sshd -D

docker run -it -v /Volumes/data:/data:rw node:8.16.2-jessie bash

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

Docker 启动时，会自动在主机上创建一个 docker0 虚拟网桥

Docker 的网络实现其实就是利用了 Linux 上的网络命名空间和虚拟网络设备（特别是 veth pair）

docker network create -d bridge test-net

docker network rm

docker network ls

docker network inspect

docker network connect

docker network disconnect


docker network create --subnet 203.0.113.0/24 --gateway 203.0.113.254 iptastic

docker run --rm -it --net iptastic --ip 203.0.113.2 nginx

docker run -it --rm --name busybox1 --network my-net busybox sh

docker network rm $(docker network ls -q) //clean up orphaned networks

-P 标记时，Docker 会随机映射一个 49000~49900 的端口到内部容器开放的网络端口

docker run -d -P training/webapp python app.py

多个容器之间需要互相连接，推荐使用 Docker Compose


## 卷

docker volume create

docker volume rm

docker volume ls

docker volume inspect

docker volume prune

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

