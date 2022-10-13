---
title: tomcat
date: 2019-07-20
tags:
 - tomcat
 - docker
categories:
 - work
prev: jmm.md
next: ../08/010913

---
![a](https://fastly.jsdelivr.net/gh/qbmzc/images/2021/202111231225363.png)

<!-- more -->

## 基本部署

[地址](https://tomcat.apache.org/)

下载之后解压

将war包放到`webapps`下

配置文件在`<tomcat>/conf`下，端口配置在`server.xml`

启动 `<tomcat>/bin`下的 `startup.sh`

## 开启远程管理

版本为`tomcat9.*`

首先添加用户权限，编辑 `<tomcat>/conf/tomcat-users.xml`

```xml
<role rolename="manager-gui"/>
<user username="tomcat" password="s3cret" roles="manager-gui"/>
```

注意对于`tomcat9`来说，不能同时赋予用户`manager-script`和`manager-gui`角色。

因为管理`webapp`只允许本地管理,远程登陆不可以

修改`<tomcat>/webapps/manager/META-INF/context.xml`,第一个方法是注释掉地址限制

```xml
<Context antiResourceLocking="false" privileged="true" >

<Valve className="org.apache.catalina.valves.RemoteAddrValve"

allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1" />
 <Manager sessionAttributeValueClassNameFilter="java\.lang\.(?:Boolean|Integer|Long|Number|String)|org\.apache\.catalina\.filters\.CsrfPreventionFilter\$LruCache(?:\$1)?|java\.util\.(?:Linked)?HashMap"/>
</Context>
#修改为
<Context antiResourceLocking="false" privileged="true" >

<!--

<Valve className="org.apache.catalina.valves.RemoteAddrValve"

allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1" />
-->
<Manager sessionAttributeValueClassNameFilter="java\.lang\.(?:Boolean|Integer|Long|Number|String)|org\.apache\.catalina\.filters\.CsrfPreventionFilter\$LruCache(?:\$1)?|java\.util\.(?:Linked)?HashMap"/>
</Context>
```

第二个方法，添加允许的地址`\d+\.\d+\.\d+\.\d+`

```xml
<Context antiResourceLocking="false" privileged="true" >
          <Valve className="org.apache.catalina.valves.RemoteAddrValve"
         allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1|\d+\.\d+\.\d+\.\d+"/>
  <Manager sessionAttributeValueClassNameFilter="java\.lang\.(?:Boolean|Integer|Long|Number|String)|org\.apache\.catalina\.filters\.CsrfPreventionFilter\$LruCache(?:\$1)?|java\.util\.(?:Linked)?HashMap"/>
</Context>
```



## docker部署

### 开发环境

查找容器

```bash
docker search tomcat 
```

拉取镜像

``` bash      
docker pull  tomcat # 默认latest版本的
```

启动

```bash
docker run -p 8888:8080 tomcat -d 
```

成功后可以访问`<ip>:8888`

#### 挂载执行

```bash
docker run -d -v /usr/docker_file/Demo.war:/usr/local/tomcat/webapps/Demo.war -p 8888:8080 tomcat  
```
如果是部署多个web项目，这里可以选择挂载目录即可，例如：

```bash
docker run -d -v /home/zc/www/webapps:/usr/local/tomcat/webapps -p 8888:8080 tomcat  
```


### 生产环境

#### 制作新的镜像

`vim Dockerfile`

```bash
FROM tomcat:latest    #你的 tomcat的镜像
MAINTAINER congco    #作者
COPY Demo.war   /usr/local/tomcat/webapps  #放置到tomcat的webapps目录下
```

生成新的镜像

```bash
docker build -t demo:v0.1 . #注意后面的. 镜像名称自己命名
```

启动新的镜像

```bash
docker run -p 8888:8080 demo
```

## 遇到的问题以及解决方案

tomcat的版本，9.*版本中某些配置文件做了改动