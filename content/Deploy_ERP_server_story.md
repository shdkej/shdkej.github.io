---
title   : ERP 서버 개발 스텝 바이 스텝 & 회고
summary : odoo와 docker-compose를 이용한 erp 서버 구축
date    : 2020-03-23 13:59:35 +0100
updated : 2020-11-28 20:44:27 +0100
tags    :
---

## 목표
회사의 내부 전산 작업화를 위해 ERP 서버를 구축해
데이터를 한 곳에 모으고, 추적하고, 관리하기

docker-compose.yml 파일 하나로 구성
- odoo -- postgresql -- nginx -- nagios 형태가 된다

## Step by Step
### Docker를 사용해서 어떤 환경에서도 쉽고 빠르게 서버를 관리
docker 에 대해서는 [subicura님의 블로그](https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html)에 잘 정리되어 있어서 이것을 보면 바로
사용가능할 것 같다.

우분투 기준 설치 방법
```
apt install -y docker.io
usermod -aG docker $USER

curl -L https://github.com/docker/compose/releases/download/1.24.0/docker-compose-`uname -s`-`uname -m` -o /usr/bin/docker-compose
chmod 755 /usr/bin/docker-compose
chmod +x /usr/bin/docker-compose
```

오픈소스 ERP 프레임워크를 이용해서 필요한 것에만 집중하고 빠르게 개발
python 기반의 odoo 이용
javascript, c++, php 기반의 다른 프레임워크도 있었지만 파이썬을 써보고 싶고,
MVC 구조에 모듈로 잘 구성되어 있고 지원해주는 기능이 많아서 odoo 사용

docker 이미지도 제공되어 있어 바로 사용 가능

DB는 mysql, mssql, postgresql을 두고 봤을 때 postgresql이 docker에서 볼륨상태를
그대로 옮기기 좋다고 하여 사용.

`docker-compose.yml` 기본 뼈대
```
version: '3'
services:
  erp:
    image: odoo:10.0

  db:
    image: postgres:9.4
```

### docker compose 로 여러 서비스 같이 관리한다
포트, 아이디, 비밀번호 설정 등 추가적인 설정을 더해줬다

```
version: '3'
services:
  erp:
    image: odoo:10.0
    depens_on:
      - db # db 실행 후 erp 서버 실행하도록 설정
    ports:
      - "8069:8069"
    environment:
      - HOST=db
      - USER=odoo
      - PASSWORD=odoo
    volumes:
      - odoo-data:/var/lib/odoo
      - ./addons:/addions_external
    working_dir: /usr/lib/python2.7/dist-packages/odoo/addons

  db:
    image: postgres:9.4
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=odoo
      - POSTGRES_PASSWORD=odoo
    volumes:
      - db-data:/var/lib/postgresql/data

volumes: # 세미콜론(:) 뒤에 공백으로 해두면 docker에서 임의의 위치에 폴더를 잡는다
  odoo-data:
  db-data:
```

`docker-compose up` 을 해주면 odoo와 postgresql을 돌릴 수 있다.
브라우저를 띄워서 `localhost:8069` 입력하고 조금 기다리면 화면이 뜬다

![erp_first_page](img/erp_first_page.png)

여기까지만 해도 프로그램 자체는 띄울 수 있다
그런데 각 상황에 맞게 수정을 해줘야 하는데,
각 프로그램의 관리 파일을 찾아서 볼륨을 시켜주는 작업을 해야 한다.

### 수정하고 지웠다가 다시 실행해보기
처음 아이디와 비밀번호는 admin으로 입력하면 로그인이 된다.

`http://localhost:8069/web/database/manager` 에 접속하면 db를 새로 만들거나
수정할 수 있다

이제 odoo를 입맛대로 수정하기 위해서는 addons 폴더에 있는 내용을
addons_external 폴더로 이동 후에 수정하던지, 새로 만들어서 사용하면 된다

project 모듈로 한 번 테스트 해보자
바로 확인하기 위해 views 쪽을 수정해본다.

![before_update](img/before_update.png)

```
> docker exec -it --user root odoo_erp_1 /bin/bash

$ apt-get update && apt-get install -y vim # 문서 편집기 설치
$ mv project /addons_external
$ vi /etc/odoo/odoo.conf
  addons_path = /mnt,extra-addons,/usr/lib/python2.7/dist-packages/odoo/addons 뒤에 /addons_external 추가
  addons_path = /mnt,extra-addons,/usr/lib/python2.7/dist-packages/odoo/addons,/addons_external
$ exit

> vi /addons_external/project/views/project_views.xml
> docker restart odoo_erp_1
```

![after_update](img/after_update.png)

odoo 가 아니더라도 volumes를 이용해서 수정할 폴더를 따로 빼놓고 수정할 내용은
그곳에 넣는 방식으로 하면 수정된 내용을 바로 적용하기 좋았다

지운 후 재실행 했을 때 작업했던 것이 남아있는지 확인해보자
```
docker-compose down
docker-compose up
```
이렇게 하면 위에서 docker exec 이후 수정했던 부분은 초기화 되므로 이 작업을
자동화 해주어야 한다.
그래서 docker-compose.yml 파일 하나로만 구성 하려던 계획대로 되지는 않았다
대신 확장성이 높아졌다.

### docker-compose 확장 및 개선
Dockerfile 을 docker-compose.yml 이 있던 위치에 저장
```
FROM odoo:10.0
USER root
RUN apt-get update && apt-get update -y vim
RUN sed -i "/addons_path/ s/$/,\/addons_external/" /etc/odoo/odoo.conf
RUN rm -rf /usr/lib/python2.7/dist-packages/odoo/addons/project
```

다시 docker-compose.yml 수정
```
services:
  erp:
    image: odoo:10.0
```
->
```
services:
  erp:
    build: ./
```
다시 `docker-compose up` 을 해서 확인 가능하다

다른 컴퓨터로 옮기기 위해서는 볼륨했던 것을 찾아서 옮겨주면 된다
```
docker volume ls
docker volume inspect <odoo-erp-data>
```
![docker volume ls](img/volumes.png)
```
docker-compose stop
sudo cp -r /var/lib/docker/volumes/odoo_test_odoo-erp-data/_data/ ./erp-data
sudo cp -r /var/lib/docker/volumes/odoo_test_odoo-db-data/_data/ ./db-data
```
기존 데이터를 가져오고

```
docker-compose up -d
docker-compose stop
sudo su
cp -r ./erp-data/_data/* /var/lib/docker/volumes/odoo_test_odoo-erp-data/_data
cp -r ./db-data/_data/* /var/lib/docker/volumes/odoo_test_odoo-db-data/_data
docker-compose start
```
다시 가져온 데이터를 원래 위치로 보내준다.

이렇게 하면 5개의 파일 및 폴더로 ERP 서버를 구동하게 된다
```
# 폴더 트리
addons/ # 수정할 프로젝트 파일들
docker-compose.yml
Dockerfile
erp-data/ # web 내부 데이터들
db-data/ # db 내부 데이터들
```

### 간단한 모니터링을 위해 nagios를 이용했다
- Nagios - light weight, lots of modules, well documentation


위 작성된 내용에 추가
```
services:
...
  nagios4:
    build:
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock" # docker process 모니터링
    ports:
      - "8080:80"
```

### 추가로 SSL 설정
```
services:
...
  nginx:
    build:
    volumes:
    ports:
```

전체 소스는 [github](https://github.com/shdkej/odoo_gvm)에서 볼 수 있다

## 아쉬운 점
- CI/CD
- Test Code
- HAproxy
- ip setting automatic to vagrant
- repository split
- docker build to image

## Experience
- 요구사항을 협의하는 능력
- 기능알림
- Designer team send a draft to purchase team
- engineer need to show project progress
- manager need to show project cost

1. What did you do
I have build erp server using python based open source called odoo for 40 users
I build alone. I need easy build and management, so docker-compose is fit for me.

* problem
    * it's hard to communication with python and javascript
        * odoo has rpc. it solved this problem
    * data backup
    * manage data
Odoo라고 하는 Python 기반 오픈소스 ERP 웹 서비스를 이용하여 장비제조업체에서 ERP system을 구축 및 운영하였습니다.
40명의 직원이 사용하는 환경이고 혼자서 구축하는 상황이라 쉬운 구축과 관리에 적합한 방법을 원했고, Docker compose로 구축하였습니다.

구축 이후 회사 상황에 맞게 프로젝트 관리, 자재 관리, 전자결재 부분을 주로 개발하였습니다.
- After the build, I was developed and migrated part that project managing, purchase managing, approval system.

2. What kind of tool used?
mainly server used python open source server called odoo. It has many
module and well documentation. So i can easily and quickly migration for
company, And build with docker
DB는 postgresql을 사용하였는데, 기존에 mysql을 사용하려 했으나,
docker에서 DB 자체를 쉽게 이전하는 것은 파일형태로 데이터를 보관하고 있는 postgresql이 더 낫다는 블로그글을 참고하여 postgresql을 사용해보았고,
서버를 이동하고, 복구하는 경우가 많았는데, container는 새로 만들고 volume만 붙일 때 바로 데이터가 적용되어 따로 sqldump를 안해도 되어서 좋았습니다.
- I used to postgresql. I used before mysql, but docker is fit to postgresql,
 about server
모니터링을 위해 nagios를 사용했고, 그래서 가볍게 돌릴 수 있고, 여러 모듈들을 지원하여 host, docker, alarm 등을 잘 지원하여 적은 리소스로 많은 기능을 사용할 수 있었습니다.
- monitoring used to nagios, it's lightweight, lots of module. I can checked host, docker, alarm with small resource.

3. Talk about odoo
It doesn’t use django and flask. Using wsgi directly.
odoo에는 자체 ORM과 뷰 전용 템플릿이 있고, MVC 모델의 형태로 제작되어 초기에 빠른 파악에도 도움이 되었고, 역할이 분리되어 있어 수정, 관리하는데도 용이하여 쉽게 사용 가능했습니다.
- odoo has own orm, view template, design to MVC model, so It helps me to
 understand the structure and easily updated and managed cause it has separated roles.
- Why choose odoo
    - what is odoo
        - based on werkzeug wsgi
        - wsgi werkzeug?
           - wsgi(Web server gateway interface)
           - wsgi is communicate a web server between application
           - wsgi take environ(HTTP object) and start_response(callback function)
           - flask is implement wsgi to web framework using werkzeug
    - how to serve web server to web browser?
    - web server? was? wsgi?
        - web server handled http requests and responses only.
    - what is different between nginx, golang http server
    - how it works?
    - what is good?
    - what kind of different candidate there?
        - OrangeHRM, ERPNext, xTuple, Openbravo
    - python http backend?
        I want some option.
        + many module
        + easy configuration
        + look clear
        + least editing
        + open source
        + mobile friendly
        + at least once I used language (c,c++,java,python)
        - is it doesn't fast?

4. Did you have a build strategy?
Honestly no. I didn’t make CI/CD pipeline
I’m used test server and production server but I need test each one.
It was not friendly Test code. So this was my bad point
I should have make test code but I didn’t.

In these days. I know the test code and TDD is so great. I trying use TDD

5. How to manage your code?
I’ve build alone. So I didn’t have any annoying integration with using git.
No use other branch each task. But I wondered how to manage if
other person come. I founded Gitflow, but every company has
different strategy. I wanna use company’s rule

6. How do you think About TDD?
I love it. It was good to maintain concrete code. I wanna keep
using TDD my code.
It has problem about make test first, Need every unit
test, No good to beautiful architecture. But I loved point
is if i want change something. That is no dependency other
code. If i first looked. That ok if passed test. Don’t
need think about at once.
And program is keep running well.

7. How to communication with other team?
I think conversation makes better anything.
I wanna understand other opinion and composing my opinion with.
I know it is vey hard. But I try

## Question
- server infra
- Deploy
    - why didn't make CI/CD pipeline?
    - so, how to make CI/CD pipeline?
- develop option
    - how to make project management system?
    - It can issue tracking
    - see what projects are progressing
    - what works in project
- docker
    - what is docker
      - container management tool
      - container: os level virtualization process
    - how it works
    - how to use docker in company
      - set up web server, db, monitoring, l/b server in one file
      - when need change something, you can see only this file
- nginx
    - Load Balancing?
    - how to make efficient load balancing strategy
- postgresql
    - RDBMS optimization
    - scalability
    - ORM
- nagios
    - why choose nagios
        - other option
        + TICK
        + Grafana
        + munin
        + zabbix
        - module
        - there's a client program
    - what kind of item you monitored
        - [[Architecture#Monitoring Component]]
- backup
  - how to do backup
  - make backup list
    - odoo web server file(upload file, configure file)
    - db dump file
    - service file(nagios, nginx log)
    - server snapshot
  - save local and nas(using sftp)

## Trouble Shooting
- 17/10

 setting start
 , compony environment is c/c++
 i had found erp in c/c++, but there wasn't
 and i found a few of python base erp open source
 odoo is one of them

 that's have a lot of module and there was a community
 and i want speedy use this

 odoo support docker, and i can easy configure

 database using postgres

 i considered scalable, using nginx and prepare postgres ha(high available)
 but it was no need. firstly check 1 machine, it is enough

 monitoring system has a few item, TIC(telegraf, influxdb Grafana), ELK, nagios
 first i using TIC, but server spec is too low. then i want light app
 nagios is very simple monitoring app, that can check server status,
 notification. that's it. that's enough

 - multiple file upload
 - ajax, python response, html drag and drop

- 18

 update some module
 and i wondering how will be do that when drive dead
 then i need backup process

 and when server break, use to nginx proxy

 vagrant, kubernetes, jenkins,

- 19
