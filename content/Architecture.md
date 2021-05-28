---
title   : Infra Architecture
summary : 🚀 Server Infra Architecture
date    : 2020-05-07 20:51:37 +0100
updated : 2020-11-25 14:30:30 +0100
tags    : strong_base
---

## Goal
* Design
    - [[Information#좋은 아키텍트는 세부사항에 대한 결정을 가능한 한 오랫동안 미룰 수 있는 방향으로 정책을 설계한다.]]

* Fail Fast

* Readability
    - 어떤 항목을 봐야 이것이 잘 진행되는지를 확인 할 수 있어야 한다

* Evolve
    - check feedback
    - 변화의 기록을 챙겨야 한다 (following changed thing)
    - User experience searchable website

* Strength
    - local loading file time > 0.4s
    - external network time > 0.4s

* Safety
    - 백업 잘 해야 한다. 백업 전략을 세워야 한다
    - auto scaling
    - auto recovery
        - When many people come to site. how to keep working server
    - 시스템 구성을 하나하나 검증하며 도입하기

* Communication
    - 서비스는 관리자가 관리하지말고 사용자가 관리할 수 있게 하면 좋겠다

* Light-weight
    - 고효율 저비용
    - 재사용성

- 복잡도는 낮추고 싶고 서비스는 많이 만들고 싶다
하나의 서비스가 종속성이 없어야 한다
- [[Think#server architecture to using some company service]]
- [[Coding#Goal]]

## Summary
- code with log, test, api
- CI with lint, test, performance, dependency
- CD with deploy
- Monitoring with check node, api, log, performance

## Problem
- 소프트웨어에서 피드백을 어떻게 만들면 좋을까
    - how to make feedback loop with develop environment
- how to make easy deploy to lambda
- serverless vs kubernetes
- how to split microservice
- everything i want to use, but how to? and how to monitoring?
- *how to see infra at once*
    - how to know what kind of service is running?
    - 어떤 지표를 관리해야할지 생각하기
    - 다양한 데이터들을 어떻게 조합해서 보여줄 것인가
- announcing change log
    - when is good to split repository?
- how to manage docker image?
    - docker-compose with volume? just image?
- 단순한 동작을 여러겹으로 겹치면 깔끔하고 보기도 좋지 않을까?
- I want to see well-designed programming
- [[Decision#I have a problem -> How I solve the problem#decision]]
- github is unstable. how about git?
    - Obviously, git is local running program, but is there no problem? I don't
      think so.
- terraform, git
    - aws, gcp distribute
    - aws codedeploy, github action
- What is the difference between design and architecture?
	- Architecture is abstract
	- Design is concrete
	- Architecture about why, what
	- Design about how
- 회사 서버 홈페이지가 느려졌다
모든 로딩이 늦게 된다
원인 파악을 어떻게 해야 될까
- 로그를 코드에 일일이 넣어야 하나? 다른 방법이 있나?
  Log write in file? Or there’s any other options?

#### Need Component
- MQ
- M/L
- Elasticsearch
- [[Information#무질서한 원숭이(Chaos Monkey)]]
- new software to kubernetes cluster

## Check Point
수시 배포
- 결과를 빠르게 확인 가능
- 에러 확률 증가 - 빠른 롤백으로 위험도 낮출 수 있음

주간 배포
- 너무 큰 배포 단위가 될 수 있음
- 테스트 상태의 결과와 실제 결과가 다를 수 있음
- 배포일자에 에러 집중

강제성을 얼만큼 할껀지, 자율성을 얼만큼 할껀지

업무가 가능한지 아닌지 판단할 방법
- 업무를 받으면 어떻게 시작하면 좋을지? 관계가 어떻게 되있는지 알아야 하는데..

SOLID - Open Closed Principle
변화를 최소화 하기 위해 변화 예상가능한 부분을 설계시 나눠놓아야 한다는 원칙인데
그 기준선을 어떻게 설정하느냐가 중요할 것 같다

monorepo vs microrepo

divide code / config file

-----------------------------------------------------------------------

## Architecture
실시간 데이터 받는 웹앱
머신러닝 웹앱
모니터링 서버
대시보드 서버
메일 서버
dns 서버
vpn 서버
ssl 서버
테스팅 서버
ci 서버
cd 서버
스프링 프로젝트 서버
오두 서버
노트 서버
카오스 몽키
텔레그램 서버
로그 서버
검색 엔진
파일 보관
라이센스 보관
Ftp 서버
Nas 서버
미디어 서버
스토리지 서버
웹서버
db 서버
DB 내용 백업 및 내부 복구 기능(pitr)

backup
ad 이용 폴더 관리
일반 pc에 윈도우서버 설치 후 공유기 vpn사용
vpn 사용시 랜선 연결 시 보다 속도 비교
보안관리
- 보안 프로그램 설치
- 자체 보안망 구축
- 네트워크 연결 화이트리스트 관리
웹과 서버 공유 레벨을 정해서 웹에서도 웬만큼 자료확인 가능하도록
확장 용이한 서버 구매
또는 요즘 뜨고있는 클라우드 서버
배포 자동화 구성
Failover
이중화
관리자 없이 돌아가게끔
프록시 서버 구성 -> 아파치 웹서버로 이용하면 됨
Dmz 존 ip
내부 ip 구성

서버 부하 분산 - haproxy and zookeeper
- 로드 밸런싱 후 헬스체크 해서 이상 발생시 자동 재실행 스크립트 실행
- 서버 증설 확장 용이
- 다운되도 대응 가능(failover)

nas서버를 하나 구할지?
- nas 중비용 간편한 기능지원 파일저장용으로 적합 라이센스 안됨 vpn 지원
- 전용서버 고비용
- 일반pc 저비용 파일저장속도

인트라넷 인터넷 구성
- 인트라넷 : 웹서버에서 접속 차단해서 하는 방법
- vpn 구성해서 연결된 서버만 접속되게 하는 방법
- 리눅스 pptpd, 윈도우 기본 설정 가능

-----------------------------------------------------------------------

## CI
- pipeline
- coding convention
- test
- review
- feedback
- pull request with report?
- code profiling
	* lint, coding convention check - static code analyse
		* security check(synk)
        * codefactor
        * codecov
    * [size limit check](https://github.com/andresz1/size-limit-action)
	* check test. check coverage
	* pull request and code review
	* build
	* version marking

## test
#### server stress test
- redis i/o test
- go http server
- kubernetes pod
- simple http server stress test

1. find report
2. manual test
    - make test code
      - while
      - concurrent
    - curl
      - `ulimit -n` -> 1024 (default) -> `ulimit -n 10000`
      - `while true; do curl localhost; done`

- it depends on CPU, memory

#### stage test
#### E2E test
- End to end test

-----------------------------------------------------------------------

## CD
- hotfix
- integration each other
- how to test connection with each other services
- 스테이지 서버
- rolling deploy -- kubernetes support

#### imagine of erp CI/CD
local docker test
commit -> push -> deploy -> docker image update
- what if production has error?
- how to make fast hot-fix?
	* fixing with a test case

#### Feedback
* Measure Code, server(package), user experience to github issue
* Code static is reported in CI cycle.
* package is reported in CD cycle
* Error time, count, environment,

#### Code static analyze content
* Dead branch check (long time)
* Lint check
* Security check
* Dependency check
* Execute time check

#### deploy make easy
- one directory to push
- many program related
- update to be small
- test to be all
- quick rollback

## Monitoring
- urgent
- important

#### Monitoring Component
- 접속자 수
- 톰캣 응답시간
- 톰캣 처리시간
- DB 관련
- 접속자 로그
- 접속한 어플리캐이션
- 접속한 페이지
- 부하율 로그
- 노드 살아 있는지 체크
- 웹로그도 되고
- 알람도 되고
- 자원 모니터링도 되는 것으로
- Docker 모니터링도 되면 좋겠다
- 트래픽 관리
- 웹 요청량
- GCDN
- 사람들이 어떤 메뉴를 많이 쓰는지 확인
- static code analysis
- cpu, memory, disk, network usage in node, process

#### 트래픽을 측정하는 방법?
tps
접속자 수
resource usage
page view
api count
loading time
response time

-----------------------------------------------------------------------

## Database
- Data management: File - RDB - NoSQL
- ACID
 - Atomicity
 - Consistency
 - Isolation
 - Durability
- How would you find the most expensive queries
- NoSQL, for document and relational db
- NoSQL, CAP theorem
- N+1 Problem

#### NoSQL

## Distributed Systems
#### how to test
#### when would you use request/reply and publish/subscribe

## Security
- how to manage ssh key?
  1. make every each computer
  2. keep other storage

[[Linux#서버 보안 설정]]

#### jwt, oauth, session
- token can make easy check current users count?

## suggestion
- recently update document
- related document with this document
- related document with interests

## cloud
- AWS, GCP, AZURE
- server -> lambda -> dynamodb -> server
- web, db, lambda, mq
- cognito
- cloud program micro service - use app engine
- lambda <-> sns server <-> web server

#### aws free tier
- anytime
  - lambda 1M
  - dynamodb 25G
  - CloudWatch 10
  - CodePipeline, Code commit
  - MQ
- 12 month
  - EC2 750h/m
  - S3 5G
  - ElasticCache
  - Load Balancing

## SRE
To upgrade site reliability
1. Monitoring
* Monitoring various content
* Make automation
3. Performance check

Quick recovery scenario
* Check error 5xx, when error occurred rollback to prev version. And reporting error situation. Which are link, behavior, data, code line, build package, (commit source)

## micro service
- every node make end-point, http, grpc
    - need documentation
- flexible micro service
    - it can be split and compose
- logging and visualization

## Scenario
3개의 실제서버를 구성해놓고
오토 스케일링 하도록 한다
업데이트시 롤링 업데이트를 기반으로 하는데
하나를 카나리로 설정한 다음 서버별 접속 링크를 제공해서 접속현황과 실제 테스트를 진행할 수 있게 한다

개발서버 - 실제서버
단계로 바로 갈 수 있게 하고
개발서버에서 각 파트가 다른파트에 영향을 최대한 안주도록 한다

깃 푸시하면 도커로 테스트하고 풀리퀘스트 머지를 하면 바로 실제서버로 가게하거나 배포 시기를 정해놓는다면 배포큐에 쌓아놓는다

#### Migration to own devops pipeline
1. Check Github repository
2. Dockerization
3. Manual test
4. Make CI test pipeline
5. Make package
6. Make kubernetes environment
7. Deploy pipeline
8. Make feed back loop
9. Make everything to automation

#### without stage server
I want to make only 2 stages environment
development & production

what is problem
- staging server need exist?
- production safe
- production server has problem
- managing critical data
- real world simulation

if in kubernetes. staging server is not problem. just one more pods?

is it over-resource?
CD pipeline can replace staging server?

- gitflow
- master, dev, release, stage, hotfix -- too much
- dev, test, stage, prod -- too much
- multi stage is require?

can parsing data from every node?

#### event driven architecture
- in micro service, each service need send some event.
- if not implement event, can parse some data?
- http server <- event producer -> queue
 DB
 lambda
- lambda can assign http or sqs. how to get data?
