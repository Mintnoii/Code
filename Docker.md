------

###                                                           Docker笔记

> **经常有的问题：**计算机环境不同，不确定软件能否正常跑起来。本地可以跑，别人电脑上就跑不起来了；安装各种库、组件软件才能正常运行

> **使用虚拟机搭建软件的环境**
>
> ​	虚拟机占用资源多，需要使用部分电脑内存和存储空间，运行时其他程序无法使用这些资源，哪怕虚拟机的程序只需要1M
>
> ​	启动慢，等虚拟机完全启动后软件才能运行起来

>Docker把应用程序和应用程序相关的依赖，打包在一个文件里面，运行这个文件则生成一个虚拟容器



> **使用Docker**
>
> 使用docker时需要用户有root权限>>sudo,可以把当前登录的用户添加到docker用户组，避免每次都输入sudo

国内镜像仓库

> ```sh
> 網易
> https://c.163yun.com/hub
> DapCloud不需要登錄
> http://hub.daocloud.io/
> ```
>

###### 镜像的操作

```sh
#1.拉取镜像
docker pull 镜像名称[：tag]
docker pull mysql:5.7
```

```sh
#2.查看全部本地镜像
docker images
```

```sh
#3。删除本地镜像
docker rmi 镜像的标识
```

```sh
#4.镜像的导入导出
#将本地镜像导出
docker save -o [导出的路径/名称] 镜像id
#加载本地镜像
docker load -i 镜像文件
#修改镜像名称
docker tag 镜像id 新镜像名称:版本
```

###### 容器的操作

```sh
#1.运行容器
#常用运行参数解释：https://developer.aliyun.com/article/748427
#简单操作
docker run 镜像的标识|镜像名称[：tag]
#常用的参数
docker run -d -p 宿主机端口:容器端口 --name 容器名称 镜像的标识|镜像名称[:tag]
例：docker run -d \
  -p 33060:3306 \
  --name mysql-server \
  -v /home/taimi/mysql/data:/var/lib/mysql \
  -v /home/taimi/mysql/conf:/etc/mysql/conf.d \
  -e MYSQL_DATABASE="TAIMIROBOT" \
  -e MYSQL_USER="taimi" \
  -e MYSQL_PASSWORD="taimi" \
  -e MYSQL_ROOT_PASSWORD="root" \
  mysql:5.7 \
  --character-set-server=utf8 --collation-server=utf8_bin
# -i:即使没有连接也不迟标准输入报纸打开状态，一般与-t一起使用
# -t:分配一个伪终端
# -d:代表后台运行容器
# -p 宿主机端口:容器端口 为了映射当前Linux的端口和容器的端口
# --name 指定容器运行后的名字
# -e 添加环境变量
# -v 将容器内的目录映射到宿主机；任意一边修改两边都会生效
```

```sh
#2.查看正在运行的容器
docker ps [-qa]
docker container ls [-qa]
# -a:查看全部的容器，包括没有运行的
# -p:只查看容器的标识
```

```sh
#3.查看容器的日志
docker logs -f 容器id
# -f:可以滚动查看日志的最后几行
```

```sh
#4.进入容器内部
docker exec -it 容器id /bin/bash
```

```sh
#5.删除容器（删除容器前，需要先停止容器）
#停止指定容器
docker stop 容器id
#停止全部容器
docker stop $(docker ps -qa)
#删除指定容器
docker rm 容器id
#删除全部容器
docker rm $(docker ps -qa)
```

```sh
#6.启动容器
docker start 容器id
#7.提交镜像
docker commit -m "" 容器id 镜像名称[：tag]
```

##### 数据卷

> 为了部署jar包，需要使用到cp的命令将宿主机的war包复制到容器内部
>
> 数据卷：将宿主机的一个目录映射到容器的一个目录中
>
> 可以在宿主机中操作目录中的内容，那么容器内部映射的文件也会一起改变
>

```sh
#1.创建数据卷
docker volume create 数据卷名称
默认创建目录：/var/lib/docker/volumes/数据卷名称/_data
#2.查看数据卷的详细信息
docker volume inspect 数据卷名称
#3.查看 全部数据卷
docker volume ls
#4.删除数据卷
docker volume rm 数据卷名称
```

```sh
#5.应用数据卷
#当你映射数据卷是，如果数据卷不存在，Docker会自动创建，会将容器内部自带的文件存储在默认的存放路径中
docker run -v 数据卷名称:容器内部路径 镜像id
#指定一个路径作为数据卷存放位置，这个路径下是空的，需要手动放
docker run -v 宿主机路径:容器内部路径 镜像id
```

##### Docker自定义镜像

~~~sh
#1.创建一个Dockerfile文件，并且指定自定义镜像信息
# Dockerfile文件中常用的命令：
from：指定当前自定义镜像的依赖
copy：将相对路径下的内容复制到自定义镜像中
workdir：声明镜像的默认工作目录
cmd：需要执行的命令（在workdir目录下执行，cmd可以写多个，只以最后一个为准）
#2.将准备好的Dockerfile和相应的文件拖拽到Linux操作系统中，并通过Docker的命令制作镜像
docker build -t 镜像名称:[tag] .
~~~

##### Docker-Compose

> ~~~sh
> 之前运行一个镜像，需要添加大量的参数
> 可以通过Docker-Compose编写这些参数
> Docker-Compose可以帮助我们批量的管理容器。
> 只需要通过一个docker-compose.ymal文件 
> ~~~

##### 下载Docker-Compose

~~~sh
#1.去github官网下载docker-compose  1.21.1版本
#2.将下载好的文件拖拽到Linux系统中
#3.将DockerCompose文件的名称修改一下，给与Docker-Compose文件一个可执行权限
mv docker-compose-Linux-x86_64 docker-compose
sudo chmod 777 docker-compose
#4.方便后期操作，配置docker-compose环境变量
#将docker-compose文件移动到/usr/local/bin，修改/etc/profile/文件，给/usr/local/bin配置到PATH中
mv docker-compose /us/local/bin
vi /etc/profile
添加：export PATH=$JAVA_HOME:/usr/local/bin:$PATH
source /etc/profile
#5.测试一下
#在任意目录下输入docker-compose
~~~

##### docker-compose管理MySQL和Tomcat容器

> yml文件以key:value方式来指定配置信息
>
> 多个配置信息以换行+缩进的方式来区分
>
> 注意格式，不要使用制表符，:后需要空格

~~~yml
version: '3.1'
services:
	mysql:                 #服务的名称
      restart: always    #代表只要docker启动，那么这个容器就跟着一起启动
	  image: mysql:5.7.4 #指定镜像路径
      container_name: mysql #指定容器名称
      ports:
        - 3306:3306  #指定端口号的映射
      environment:
        MYSQL_ROOT_PASSWORD: root  #指定MySQL的ROOT用户登录密码
        TZ: Asia/Shanghai   #指定时区
      volumes: 
        - /opt/docker_mysql/data:/var/libn/mysql #映射数据卷
    tomcat: 
      restart: always    #代表只要docker启动，那么这个容器就跟着一起启动
	  image: 
      container_name: 
      ports:
        - 
      environment:
        TZ: Asia/Shanghai   #指定时区
      volumes: 
        - 
~~~

##### 使用docker-compose命令管理容器

> 在使用docker-compose的命令时，默认会在当前目录下找docker-compose.yml文件

~~~sh
#1.基于docker-compose.yml启动管理的容器
docker-compose up -d
#2.关闭并删除容器
docker-compose down
#3.开启或关闭已经存在的由docker-compose维护的容器
docker-compose start|stop|restart
#4.查看由docker-compose管理的容器
docker-compose ps
#5.查看日志 
docker-compose logs -f
~~~

##### docker-compose配合Dockerfile文件使用

> 使用docker-compose.yml文件一级Dockerfile文件在生成自定义镜像的同时启动当前镜像，并且由docker-compose去管理容器

~~~yml
# yml文件
version: '3.1'
services:
	mysql:                 #服务的名称
      restart: always    #代表只要docker启动，那么这个容器就跟着一起启动
	  build:             #构建自定义镜像
	    context: ../     #指定dockerfile文件路径 
	    dockerfile: Dockerfile  #指定dockerfile文件名称
	  image: ssss:0.1    #指定镜像路径
	  container_name:    #指定容器名称
      ports:             #端口映射
        - 
      environment:       #环境变量
        TZ: Asia/Shanghai   #指定时区
~~~

~~~sh
# Dockerfile
FROM XXXXXX
COPY 文件路径 /镜像路径
~~~

---

~~~sh
#可以直接启动基于docker-compose.yml以及Dockerfile文件的自定义镜像
docker-compose up -d
#如果自定义镜像不存在，会帮助我们构建出自定义镜像，如果自定义镜像已经存在，会直接运行这个自定义镜像
#重新构建自定义镜像
docker-compose build
#运行前，重新构建
docker-compose up -d --build
~~~





