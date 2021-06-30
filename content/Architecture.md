---
title   : 🚀 Server Infra Architecture
summary : 변화, 정리, 순환, 측정
date    : 2020-05-07 20:51:37 +0100
updated : 2021-06-20 18:19:31 +0900
tags    : strong_base
---

## Goal
인프라 구축 및 배포를 쉽고 빠르게, 피드백을 잘 받아 점진적으로 발전하는 환경

#### More
- 변하지 않을 것과 변할 것을 정해놓고 조정한다.
- check feedback
    - 어떤 항목을 봐야 이것이 잘 진행되는지를 확인 할 수 있어야 한다
    - 변화의 기록을 챙겨야 한다 (following changed thing)
- local loading file time > 0.4s
- external network time > 0.4s. - total 0.8s
- 백업 잘 해야 한다. 백업 전략을 세워야 한다
- auto scaling
- auto recovery
- 시스템 구성을 하나하나 검증하며 도입하기
- 재사용성
- 복잡도는 낮추고 싶고 서비스는 많이 만들고 싶다
- 배포용 이미지를 만든다.
  배포용 이미지는 항상 처음부터 새로 빌드되어야 한다.
  덮고 덮는 방식은 불확실성을 증가시킨다.
- 도메인을 생각하자. 도메인이 디자인을 만든다.
- Fail_Fast
- 고효율 저비용

- 덮는 방식인 프레임워크보다 붙이는 방식인 어댑터 방식이 좋다
- 내부적으로는 효율을 최대로 하되
  사람들은 쫙빠진 것보다 넉넉한 것을 더 좋아하는 점을 생각한다
- User experience searchable website
- 서비스는 관리자가 관리하지말고 사용자가 관리할 수 있게 하면 좋겠다
- 기능을 제공해주지 말고 모듈로 만들 수 있게 하고 여러 개 선택할 수 있도록 한다

[[Information#좋은 아키텍트는 세부사항에 대한 결정을 가능한 한 오랫동안 미룰 수 있는 방향으로 정책을 설계한다.]]
[[Think#server architecture to using some company service]]

## Summary
- code with log, test, api
- CI with lint, test, performance, dependency
- CD with deploy
- Monitoring with check node, api, log, performance

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

강제성을 얼만큼 할지, 자율성을 얼만큼 할지

업무가 가능한지 아닌지 판단할 방법
- 업무를 받으면 어떻게 시작하면 좋을지? 관계가 어떻게 되있는지 알아야 하는데..

SOLID - Open Closed Principle
변화를 최소화 하기 위해 변화 예상가능한 부분을 설계시 나눠놓아야 한다는 원칙인데
그 기준선을 어떻게 설정하느냐가 중요할 것 같다

divide code / config file

자주 변하는 것과 자주 변하지 않는 것 고려하기
자주 변하지 않는 것은 신경 안써도 되도록 하기

디렉토리 단위를 기능별로 할지, 역할별로 할지
- 코드 분리 기준
  회사에서는 레이어별로 나눴다
  마이크로서비스에서는 기능별로 나눈다

monorepo vs microrepo
- 깊이 vs 넓이
- 디렉토리를 중첩시켜 한 레포 안에 둘지
- 디렉토리가 중첩되면 프로젝트를 분리 시켜 레포를 나눌지

개발은 docker compose로 운영은 kubernetes로 하도록 사람들을 유도할 수
있을까? 나는 이렇게 작업하고 있는가?

회사의 소프트웨어를 자체적으로 구축한 것을 쓰느냐, 잘 가져다 쓰느냐
- 나의 아키텍처를 너무 좋아하게 되면
  다른 아키텍처를 거부하게 되거나 보기 힘들어지지 않을까
- 내 아키텍처를 만들기보다 다른 사람들의 아키텍처를 받아들이는게 나을까
- [[About_Development#쿠팡이 자체적으로 만든 서킷브레이커와 api gateway]]

하나의 툴과 종속성
- 쿠버네티스의 기능을 모두 쓰는 것이 다른 도구를 줄일 수 있는 방법이다.
  근데 그러면 쿠버네티스에 종속성이 심하게 걸린다

팀 구조
- 프로젝트별 팀 vs TF 팀 vs 역할별 팀 vs 기능별 팀


-----------------------------------------------------------------------

## Monitoring
- urgent
- important

#### system
- 보안 (로그인 체크)
- load average
- error message
- memory
- disk
- network + time wait port
- https://www.mimul.com/blog/linux-server-operations/

#### web
- api response time
- 웹 요청량
- homepage health
- 접속자 로그
- 접속한 페이지
- 사람들이 어떤 메뉴를 많이 쓰는지 확인

#### 웹 성능 확인 지표
- DNS Lookup time
- tcp 연결 시간 (브라우저와 서버간 연결 시간)
- SSL 연결 시간
- 첫 번째 바이트 다운로드 시간
- 전체 다운로드 시간

#### 메인 모니터링 판넬에서 보여져야 할 것들
node 대수
cpu, memory 사용량
응답량
처리 시간
- cpu, memory, disk, network

#### monitoring
- application, framework, os, cloud 이 정도가 기본 관리 영역이겠다.
- 정상 상태를 추가해야한다. 범위를 정해서 이 정도면 정상인 범위로 놓고, 정상
  범위 내를 계속 건드려서 카오스 테스팅 하고, 범위 벗어난 값은 다 알림
  보내도록 해보면 좋겠다

#### etc
- 각 서비스 상태
- 노드 살아 있는지 체크
- 접속자 수
- 응답시간
- 처리시간
- DB 관련
- 접속한 어플리캐이션
- 부하율
- 알람
- docker up/total
- 트래픽 관리
- GCDN
- static code analysis
- lambda, ec2, s3, Dynamodb
- GCP

#### 트래픽을 측정하는 방법?
tps
접속자 수
resource usage
page view
api count
loading time
response time

#### 서버를 오래 켜놓았을 때 생기는 문제점
아파치에서 동시작업을 위해
자식 프로세스를 생성하도록 하고, 부모 프로세스와 메모리를 일정 부분 공유하면서
메모리를 절약하는데,
공유되는 메모리의 양이 시간이 지날수록 적어져서 자식 프로세스를 재시작
해줘야한다고 한다

이처럼 시간이 지남에 따라 성능 저하를 일으키는게 있으면 확인해봐야겠다

그야말로 켜놓고만 있었는데 성능이 안좋아지는 원인 중 하나였다

리눅스에서 jiffies 라는 변수가 32비트라 500일 정도 지나면 오버플로우 될 수
있었는데 최신 커널은 64비트로 할당되어 최신 커널을 쓰면 넉넉해진다

쿠버네티스단, 리눅스단, 기타 서비스단에서 체크 필요
주로 데이터가 쌓이거나 메모리 사용량이 쌓일 때 문제가 생긴다

#### 모니터링 범주
프로파일링
로깅
트레이싱
메트릭
알림
디버깅
추세 파악(트렌딩)
플러밍

#### 문제 분석과 재발 방지
예측하지 말고 측정한다

#### reference
- https://andromedarabbit.net/무엇을-모니터링할-것인가/
    - AWS, Kubernetes 등에서의 모니터링 파라미터
- https://www.mimul.com/blog/linux-server-operations/
    - 리눅스 시스템 상태 확인 스크립트
- [CPU 지표](https://brunch.co.kr/@leedongins/75)
- [리눅스 60초 안에 상황 파악하기](https://luavis.me/server/linux-performance-analysis)

-----------------------------------------------------------------------

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

#### double check, error handling, logging, security

#### reference
- [암호화 이것만 알면 된다](https://www.slideshare.net/ssuser800974/ss-76664853)

## cloud
클라우드는 편리하지만 내부를 통제할 수 없다
- AWS, GCP, AZURE
- server -> lambda -> dynamodb -> server
- web, db, lambda, mq
- cognito
- cloud program micro service - use app engine
- lambda <-> sns server <-> web server

#### ec2 인스턴스 리소스 요금 항목
인스턴스 유지하는데 비용은 표시된만큼 나오는데 사용하다보면 그 외에 추가 요금이
생긴다
public static ip
bandwidth (per GB)

#### aws 서버들 간 벤치마크
- https://dev.to/yaorenjie/benchmarks-of-aws-ec2-5-4-3-series-1kpl
- C (cpu) / M (general) / R (memory) 시리즈가 있고, 3, 4, 5세대로 발전하고 있다
- 싱글코어에서는 시리즈별 차이는 거의 없다
- AMD 서버는 CPU는 20% 빠르지만 메모리는 25% 느렸다

#### kubernetes 셋팅을 위한 cloud hosting 자원 종류
- control plane (aks, gke ...)
- compute instance (on demand, reserved, spot)
  - kubernetes cluster need at least 3.5GB of RAM
- load balancer
- disk storage
- container registry
- https://georgepaw.medium.com/how-to-run-the-cheapest-kubernetes-cluster-at-1-per-day-9287abb90cee

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

## 프로덕션에 필요한 속성
보안, 개별 설정을 유연하게 하는 것, 관측성

#### reboot report
load average 확인 후 cpu bound인지 memory bound인지 disk i/o문제인지 확인하는 것처럼
문제 감지되면 확인된 기록들을 캡처해서 리포트로 보내주고 재부팅하도록 설정
소프트웨어 로그, 시스템로그도 같이 캡처

#### 구성보다 관습
CoC
설정을 일일이 하기보다 관습적으로 따르게 하고, 설정이 필요할 때만 설정을 하는 방식

#### 서비스가 커져감에 따라 직접 구현해야하는 기능
깃 레포지토리 > gitlab이 자체 서버 구축 가능하다
ci 툴

서비스로 제공되는 소프트웨어들
최소한 이중화가 되도록 해야한다

#### 자동화
테스트 문서 자동화
모니터링 문서화
api 문서화
service output이 feedback이 되도록

#### component
db
backend: lambda
frontend: nettlify/now/surge
file: s3
image: cloudinary
con: ifttt
큐/캐시: redislabs
design: figma
domain
dns

오토스케일링 2~8개 파드로 유지
ingress - 내부 아이피 전달용
tls인증서, failover, 로깅, 모니터링
자동dns, ssl, 로드밸런싱: CloudFlare Proxy -> AWS L4 NLB
cdn
secret - kubeseal
clickhouse - 분석데이터
모든 인프라 코드를 한 곳에 저장해놓고 끌어다쓰기?
오류 추적
profiling - cProfile, snakeviz

#### CSP
Communicating Sequential Processes
golang의 groutine의 동작 방식이자, 네트워크로 연결되있는 자원들이 서로 통신할 때
효과적인 모델.
마이크로서비스에서 수많은 서비스들 간의 연결과 복잡성을 관리하기 위한
hashicorp의 선택

#### 단일 원천
진실의 원천
오컴의 면도날
추론의 건전성
