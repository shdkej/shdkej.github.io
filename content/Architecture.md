---
title   : 🚀 Server Infra Architecture
summary : 변화, 정리, 순환, 측정
date    : 2020-05-07 20:51:37 +0100
updated : 2021-10-23 21:22:04 +0900
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
- 새로운 툴이 관리점은 줄이고, 편의기능은 늘릴 수 있으면 좋겠다.

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
[[Container#docker-compose를 이용해 이미지를 바로 배포하는 것과 Dockerfile을 쓰는 것]]

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

#### CSP
Communicating Sequential Processes
golang의 groutine의 동작 방식이자, 네트워크로 연결되있는 자원들이 서로 통신할 때
효과적인 모델.
마이크로서비스에서 수많은 서비스들 간의 연결과 복잡성을 관리하기 위한
hashicorp의 선택

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

#### 대규모 서버에서 겪는 문제
데이터
CPU
네트워크

데이터의 동기화
cpu 병목
네트워크 병목

load average를 확인하고
sar을 통해 cpu 문제인지 io문제인지 확인한다

#### 대용량 트래픽
WAS에서 문제가 생길 때 다중화로 해결이 힘든 이유
- 다른 WAS를 찾아야 한다.
- 로그인 정보를 전달해줘야 한다. (세션 클러스터링 필요)
    - 그에 따른 관리 지점 증가

데이터베이스 다중화 힘든 이유
- 동기화

#### 의사 결정 트리로 시스템 모니터링 하면 되려나
load average yes
- cpu bound
- io bound

load average no
- network
근데 이러면 dfs로 전체탐색을 해야하겠네

#### reference
- https://andromedarabbit.net/무엇을-모니터링할-것인가/
    - AWS, Kubernetes 등에서의 모니터링 파라미터
- https://www.mimul.com/blog/linux-server-operations/
    - 리눅스 시스템 상태 확인 스크립트
- [CPU 지표](https://brunch.co.kr/@leedongins/75)
- [리눅스 60초 안에 상황 파악하기](https://luavis.me/server/linux-performance-analysis)

-----------------------------------------------------------------------


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

#### SSH
#### TLS
ssh 생성해서 관리하고 github과 연동하는 것을 자연스럽게 할 수 있어야겠다
ci 이용 시나 push할 때 ssh permission을 확인하려는 목적인가?

.known_hosts
.authorized_keys

public 과 private.
private 는 목적지. 서버에서만 가지고 있는다
public 은 접속자. 클라이언트가 자유롭게 갖는다

ci 툴에서 서버는 ci 서버가 되는 것인가? 클라이언트가 내가 되고?
- ci 툴이 접속자고, github 저장소가 서버가 되어서, 서버에서 pub키를 가지고
  접속자가 private key를 가진다

클라우드 서비스에서는 노트북에서 생성한 ssh 를 cloud instance에 넘기고 내가 다시
public이 되어서 접근하는 것인가?
private는 미리 aws에 올려놓고 그것을 가져다 쓰도록 하면 좋겠다

포맷을 대비해서 ssh key를 파일로 갖고 있으려고 하는데 private key를 갖고 있어도
되나?

공개키를 서버에 등록해서 클라이언트가 비밀키를 가지고 있는다?

authorized_keys에 공개 키를 복사해 넣으면, 접속하는 곳에서 비밀키를 물어본다

aws 에서도 pub키를 서버에 보내고, 비밀키는 노트북에 둔다

.pem 파일은 뭐지

ssh 는 다른 컴퓨터에 접근할 때 키를 만들어서
상대 컴퓨터에 공개키를 제공해서 내가 들어간다고 알려주면 된다?
상대 컴퓨터가 내 공개키를 가지고 있다는 것은 내 접속을 허용하겠다는 의미다?
그럼 해커가 공개키를 쑤셔넣으면 보안이 뚫리는건가?

공개키, 대칭키
- 공개키는 비밀키를 공유하지 않아도 된다는 점에서의 장점이 있다.
- 대신 공개키를 가지고 있으면 누구나 정보를 볼 수 있다?
- 공개키로 암호화한 것은 비밀키가 없으면 볼 수 없다.
- 공개키 방식만으로는 서버에서 클라이언트에 안전하게 정보를 전달할 수 없다.
    - 비밀키가 해독을 해야하는데, 서버는 정보를 전달하는 쪽이니까.

공개키로 암호화 된 것을 복호화 할 수 있다. 그래서 공개키 방식은 파일의 안전을
보장해주지는 않는다. 하지만 그 파일의 신원을 확인해줄 수 있다.

RSA는 결과값을 가지고 있어도 원래의 값을 알 수 없는 소수의 소인수분해의 어려움을
통해 강력한 보안성을 가진다.
이게 TLS에서 어떻게 쓰이는거지?
비밀키가 원래의 값이고 공개키가 결과값인가?
- TLS = RSA + 대칭키
- HTTPS는 HTTP + TLS

SSH 와 TLS를 같은 원리로 생각했다.
ssh에도 public_key와 private_key가 있지 않은가
TLS에는 crt와 key가 있다,

해시 함수 MD5, SHA <-> 대칭키 AES, 공개키 RSA

GPG - 개인용 메시지를 암호화하려고 할 때 쓴다
- 내 공개키는 마구 뿌린다
- 그러면 내 공개키를 이용해 만든 데이터는 내 비밀키로만 열 수 있다.
- 내 공개키를 갖고 있다고 내 정보에 접근할 수는 없나? 수신용인가?
- 주인장의 사이트에 공개키가 올려져 있어도 그것이 조작된 것일 수도 있다. 그래서
  CA 업체에서 이를 검증한다.

- [X] SSH에서 pub키는 gpg키처럼 마구 공유해도 되는게 아니지 않나? pub키만 있으면
      서버에 마음대로 접속할 수 있는데
      - pub키가 서버가 갖는 키고, 클라이언트는 private key를 갖는다.
      - 그래서 pub키가 많이 퍼지면 클라이언트는 많은 곳을 갈 수 있다.
      authorized_keys, known_hosts
    - authorized_keys에는 pub키가 들어간다. 서버측에.

비밀키도 어차피 키를 지켜야한다는 것은 하나의 비밀키를 공유하고 그것을 지키는
것과 똑같다. 근데 비밀키를 공유한 적이 있냐 없냐의 차이로 보안성의 차이가 있다.

- [ ] HTTPS도 공개키 방식처럼 암호화를 개인키로 하면 비밀키로 복호화를 해야하는 방식인가?
- [ ] 공개키는 누구나 가질 수 있다. 비밀키로 암호화 한 것을 공개키로 누구나 열 수
   있다면 내용이 지켜지지는 않을 것 같다.
   - 그래서 End-2-End 암호화도 신경 써야 한다.
   - HTTPS에서 인증서로 신원을 확인하고, 그 통신에서 확인한 랜덤값으로 다시 키를
     만들어서 그 키로 데이터를 암호화한다.
   - 클라이언트가 처음 접속할 때 보내준 공개키로 랜덤키를 암호화해서 서버에
     주고, 그 키로 정보를 공유한다. 즉, 처음 만들었던 인증서는 신원확인용이다.
        - 신원 확인은 제 3자가 한다. (CA 업체)
   - 즉, HTTPS는 공개키 방식과 대칭키(암호) 방식을 모두 쓴다.
   - https://bravenamme.github.io/2019/12/03/https-2/
- [ ] 비밀키를 서버가 갖고, 공개키는 아무나 갖는다. 근데 CI에서 비밀키를 가지는
   것은 어떻게 생각해야하지? 브라우저에서는 서버가 비밀키를 갖는다.
    - 비밀키를 클라이언트가 갖는다. CI secret에 비밀키를 입력하면 builder에
      접근할 수 있게 된다. pub키는 어떻게 등록했더라? 다시 동영상 봐야겠다.
        - pub키를 deploy key에 넣고 private key를 secret에 넣었다
          github도 이렇게 되나? 되네


#### HTTPS
- [ ] 서버가 자신임을 증명해야 하는 이유는?
    - 클라이언트는 어차피 불량한 사이트에 들어가도 작업이 정상적으로 될텐데.
    - 중간에 길을 꺾어서 자신에게 결제하게 하는 것은 막을 수 있겠다.
    - 중간에 데이터 탈취를 못하게 하는 역할이 주 역할인가?
- [ ] HTTPS는 국가에서 막기 힘든 이유는?

#### OAuth
[[Technology#Oauth2]]

#### security
- [vault](https://www.slideshare.net/DoyoonKim30/20-vault-107929281)
- [jwt](https://lazyhoneyant.tistory.com/m/7)
ssh
session

#### user 세션 관리
하나의 서버를 스케일 아웃해서 여러 대로 만들어놓으면 유저 정보가 어느 곳에는
있고, 어디에는 없는 상황이 벌어진다. 이를 해결하는 방법이 몇개 있는데.

sticky
- 유저가 처음 접속한 서버에 계속 접속하도록 유지하는 방법.
- 서버 과부하가 일어날 수 있다.
- 서버가 뻗으면 데이터를 잃기 때문에 단일 실패지점이 된다.

clustering
- 각 서버끼리 데이터를 공유해서 동기화하는 방식
- 데이터 동기화를 하는데 자원이 많이 소비될 수 있다.

따로 세션 서버를 두는 방식
- 접속 시 세션 서버에서 데이터를 불러와서 검증하는 방식
- 관리 지점이 증가한다.
- OAuth가 이를 대신해준다.
    - 대신 유저 정보를 따로 관리해서 이용할 수 있어야 한다. 서비스 개선을 위해.

https://chagokx2.tistory.com/93

---------------------------------------------------------------------

## Distributed Systems

#### how to test
#### when would you use request/reply and publish/subscribe

## cloud
클라우드는 편리하지만 내부를 통제할 수 없다
- AWS, GCP, AZURE
- server -> lambda -> dynamodb -> server
- web, db, lambda, mq
- cognito
- cloud program micro service - use app engine
- lambda <-> sns server <-> web server

#### cloud
클라우드에서는 시스템 자원 관리는 클라우드에 맡김으로써 하드웨어의 효율화에 대한
고민은 생략된다. (캐시와 CPU, DISK 간의 구성에 대해 신경을 못쓴다)
이 부분의 최적화는 생략하는 대신 내 서비스가 잘 실행되느냐에 집중할 수 있다.

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

-----------------------------------------------------------------------

## Production

#### 프로덕션에 필요한 속성
보안, 개별 설정을 유연하게 하는 것, 관측성
  
- 되돌릴 수 있는가  
- 복구할 수 있는가  
- 수습이 가능한가
- 인수인계할 때 무리가 없는가 (사람을 구할 수 있는가)
- 안정성  


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

서버 부하 분산 - haproxy and zookeeper
- 로드 밸런싱 후 헬스체크 해서 이상 발생시 자동 재실행 스크립트 실행
- 서버 증설 확장 용이
- 다운되도 대응 가능(failover)

#### 서비스가 커져감에 따라 직접 구현해야하는 기능
깃 레포지토리 > gitlab이 자체 서버 구축 가능하다
ci 툴

서비스로 제공되는 소프트웨어들
최소한 이중화가 되도록 해야한다

#### reboot report
load average 확인 후 cpu bound인지 memory bound인지 disk i/o문제인지 확인하는 것처럼
문제 감지되면 확인된 기록들을 캡처해서 리포트로 보내주고 재부팅하도록 설정
소프트웨어 로그, 시스템로그도 같이 캡처

#### 구성보다 관습, CoC
설정을 일일이 하기보다 관습적으로 따르게 하고, 설정이 필요할 때만 설정을 하는 방식

같은 약자로 Code of Conduct(행동 규범)이 있어 헷갈릴 수 있다.

#### 자동화
자동화는 오류를 일으키기 쉽다
조심히 도입해야한다

메타적으로

흐름만 만들고 세부사항은 자동화해서 알아서 일하게 한다

service output이 feedback이 되도록

- 테스트 문서 자동화
- 모니터링 문서화
- api 문서화

#### 자동화의 문제점 (자동화보다는 일괄적용의 문제점 일 수 있겠다)
자동이 자동으로 잘 동작안하는 걸 자주 보고
스마트가 스마트하지 않았고
한번에가 한번에 되지 않았다
전체를 스크립트를 짜서 변환시키는 것도 항상 실패하는 것들이 나온다.

#### 메시지 큐
sqs에 실패처리용 큐를 하나 만들어서 거기에 담아서 에러를 확인한다.
메시지큐에서 실패한 것들을 받으면 람다를 실행하게 해서 오류처리 할 수 있다


## AWS
연결된 서비스 : serverless, cloud, gcp, azure, container

### 신규 업데이트 확인
- 신규 업데이트 확인
	- aws blog
	- aws reinvent

### 네트워크
- [[Network]]
- 격리
	- vpc
- 외부 연결

### 컴퓨팅
- 서버
- 컨테이너

### 스토리지
- fully management service
	- rds
	- aurora
- serverless
	- [[Architecture]]

### 기타
