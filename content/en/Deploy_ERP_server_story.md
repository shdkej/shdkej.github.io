---
title   : How I build an ERP server
summary : docker is love
date    : 2020-03-23 13:59:35 +0100
updated : 2020-11-28 15:44:14 +0100
tags    :
---

## Architecture
- Odoo(python, jQuery) -- postgresql -- nginx -- nagios
- with docker-compose

#### Why choose this tool?
- Odoo - python, include orm, well documentation, open source
- Postgresql - data save to file. that's good with docker migration
- Nginx - https, reverse proxy
- Nagios - light weight, lots of modules, well documentation
- Docker

## Quick Guide
odoo
docker -> docker-compose.yml

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

## missed items
- CI/CD
- Test Code
- HAproxy
- ip setting automatic to vagrant
- repository split
- docker build to image
