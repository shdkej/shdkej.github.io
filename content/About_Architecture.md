---
title   :
summary :
date    : 2021-05-20 20:33:31 +0100
updated : 2021-06-01 19:13:10 +0900
tags    :
parent  : [[index]]
---

## Devops
what is benefit of devops
- makes team source useful.
- developer think only source version control system(git, etc)
- easy deploy, easy rollback, feedback

- DevOps' goal is for a small team of developers to implement functions
independently, verify accuracy in a production-like environment, and distribute
code quickly and securely to the production environment.

DevOps gonna make fast to deploy
SRE gonna maintaining production to reliability

Devops goal
* Build automation
* Quickly release
* Test automation
* Feed back

[[Software#Devops came from agile 2009]]
[[Information#데브옵스의 목표는]]

데브옵스는 린, 에자일의 연장선
예전에 제품 출시까지 오래 걸리고 회사 전체가 움직이던 것이 리스크가 있고
느려서 시대에 뒤처진다는 것에서 대응

개발과 운영을 분리된 것이 아니라 제품 출시에 있어서 같이 진행되어야 하는 것으로 보고 통합하는 문화

각 팀으로 분리하는 것이 아니라 같은 팀으로 묶여서 협업하는 문화
- 개발자가 운영도 하는 업무의 확장으로 느끼지 않고, 제품 전반적인 관리를 참여하는 문화가 되도록 해야겠다
- 사용자와 interaction을 늘리는 것인데, 현실적으로 개발자가 마케팅을 같이 하는 것은 무리가 있다. 개발과 마케팅의 간극을 줄이고, 응집력을 높이게 하는 것이 DevOps engineer의 역할일 것 같다.

인프라, CI/CD 파이프라인을 구성 및 관리하고 개발을 편하게 하기 위한 도구들을 개발하고 관리하는 포지션
- 개발자들이 개발에만 집중하고 빠르고 편하게 개발할 수 있도록 돕는다
- 개발자들이 개발에만 집중하지만 고객과의 interaction은 가깝게 느낄 수 있도록 한다.

사람과 사람을 장벽 없이 연결 시키는 작업
- 제품 개발에 참여하는 인원들 간의 장애물을 낮추기 위해 노력

데브옵스는 다른 영역도 취미로 하는게 좋겠다
다른 작업을 편하게 해주는게 대브옵스의 목표라고 생각.

가볍고, 의존성 없고, 쉬운 설정 및 이동이 가능하며, 피드백 루프를 개발 프로세스에
잘 녹여내는 시스템 구축을 지향하며, 개발에만 집중할 수 있는 환경을 만들기 위해
 고민하고 있습니다.

사용자가 신뢰할 수 있는 제품 경험과 개발자가 신뢰할 수 있는 개발환경 구축을
만들고 싶습니다.

확장하기 쉽고 자동화 된 개발 환경을 구축해 개발 시에는 서버 신경 안쓰고 쉽게
배포할 수 있도록 구성하려 하고 있습니다.

- 사용자에게 바로 영향이 가는 서버를 운영할 때 데브옵스는 어떻게 해야 할까
- 데브옵스는 포지션으로서 존재할 필요가 있는가?
- 데브옵스는 qa엔지니어와 가깝나 백엔드와 가깝나

작은 기업에서는 기획,개발,qa,데브옵스를 나누지 않을 것이고
규모가 커져야 qa엔지니어의 필요성을 느끼는 듯하다
서버가 코드화되면서 개발자가 서버를 관리하기 쉬워졌다
그래서 백엔드가 서버도 관리할 수 있게 되었는데 백엔드와 데브옵스를 분리할
필요가 있을까?
프론트가 nodejs와 함께 백엔드를 할 수 있게 되었는데 그런 풀스택 개발자는
엔터프라이즈에서도 먹히잖아?

규모가 커짐에 따라 세부적으로 역할을 나누는 것이 일반적이지만
데브옵스는 엔지니어의 역할 확장으로서 존재해도 되지 않을까?
프론트든 백엔드든 qa이든 서버가 어차피 코드화되어 있다면 같이 신경쓰는게 오히려 관리가 쉽지 않을까?
세분화되고 분리되면 고도화하기 좋긴 하겠다

#### devops
개발과 운영의 통합은 종속성, 의존성이 아니라 조화다
각 마이크로 서비스도 데이터영역과 서비스 영역이 서로 의존하는게 아니라 조화를 이루게
하면 되겠다

#### serverless
데브옵스를 문화로써 받아들인다면.
모두 serverless로 만들어서 마이크로서비스화하는게 서버관리 리소스를 없앨 수
있고,
그럼에도 서버가 필요한 작업은 모놀리스하게 만든다.
중앙 집적 리소스 서버에서 모든 자원을 관리한다.

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

#### microservice
- 마이크로서비스에서 문제가 생긴 지점을 바로 확인할 방법은?

#### 마이크로 서비스
라이브러리를 쓰듯이 다른 서비스들을 사용하면 성능 상의 손해가 있다
마이크로아키텍처는 관리할 지점이 늘어나는 단점이 있지 않나

- 메시지 기반의 비동기 통신
- 사가 패턴 - 데이터 일관성 유지를 위해
- 도메인 주도 설계
- 이벤트 소싱 패턴

- API
- 서비스 메시
- 서비스 디스커버리
- 메시지 처리
- 서킷 브레이커

- API gateway, 서비스 메시, 서비스 디스커버리 차이는?
  - 서비스 메시 안에 서비스 디스커버리가 보통 내장되있다
  - api gateway는 외부에서의 접속, 서비스 메시는 내부의 네트워크 관리

왜 마이크로 서비스인가
- 마이크로 서비스를 위해서는 필연적으로 서비스 간 커뮤니케이션이 필요하고,
  비동기 통신과 동기 통신을 잘 구분해서 사용해야 한다.
  - 동기는 API를 이용해서, 비동기는 메시지 큐를 이용해서.
  - 각 서비스 간 데이터를 메시지 큐에 발행하고 구독하는 식으로 데이터 공유,
    이벤트 처리가 가능하다.
- 마이크로 서비스를 일일이 관리하기 보다 서비스 디스커버리를 이용해서 자유롭게
  생성과 운영이 되게 해야겠다
- 단일고장점이 없도록 노드를 여러 개 두어 관리하는 것이 좋겠다.

- 큰 팀을 작은 팀으로 나누면 팀 간 대화에 장벽이 생기고, 안개가 생긴다. 다른
  팀의 영역에는 안들어가려고 하고, 그 쪽에서 일어난 일이 전달이 안될 때가
  많아진다. 어떻게 이 장벽을 없앨 수 있을까
- 핵가족에 이어 1인가구가 늘어남에 따라 대가족일 때는 자연스럽게 알 수 있던
  것들이 이제는 공부를 해야 알 수 있게 되었다.
- 수평적인 연결망이 만들어져서 정보공유를 할 수 있게 해야한다. 회사에서 팀장이
  있고 팀장회의를 하는 것과 비슷한 느낌이지만 수평적인 관계의 연결망으로.
  (현재의 커뮤니티가 이 역할을 하고 있는 것일까? Web 2.0)

#### 서비스메시
규칙기반의 부하분산으로
배포(테스트에 배포)와 릴리즈(프로덕션에 배포)를 분리하기 좋다고 한다

텔레메트리 관리
- 네트워크 트래픽 관련 지표 수집 및 추적

#### SOA, MSA, DDD
service oriented architecture
- 중간에 enterprise service bus를 둬서 서비스 간 공유를 하려고 했으나, 당시
  시대상 팀 구조가 변화에 재빠르게 대응하지 못했고, MSA와 비슷한 목표를 가졌으나
  성공하지 못했다.
- MSA의 핵심은 통신 처리이고, 이 처리 흐름을 만들어내는 서비스 메시가 등장했다.
  마이크로 서비스는 서비스의 수가 많고, 이를 관리하는 방법이 필요하다

#### serverless
serverless에 배포 전 로컬 테스트.
배포 후 자동 테스트
배포 후 에러 처리

-----------------------------------------------------------------------

서버 부하 분산 - haproxy and zookeeper
- 로드 밸런싱 후 헬스체크 해서 이상 발생시 자동 재실행 스크립트 실행
- 서버 증설 확장 용이
- 다운되도 대응 가능(failover)


#### 메시지 큐
sqs에 실패처리용 큐를 하나 만들어서 거기에 담아서 에러를 확인한다

#### Observability를 높이기 위해서는 어떻게 해야할까
- 피드백을 받기 위해
- 문제가 일어나기 전에 예측하기 위해?
- 분산 환경에서 모니터링이 한눈에 되어야 한다
- Metrics, Events, Logs, Traces 를 한눈에 확인한다
- 예측하지 못한 문제를 찾으려고 한다
- [제어이론](https://ko.wikipedia.org/wiki/제어이론)에서
  **관측 가능성(observability)**이란, 시스템의 **출력 변수(output variable)**를
  사용하여 **상태 변수(state variable)**에 대한 정보를 알아낼 수 있는지를
  나타내는 용어이다. 시스템의 출력 변수를 사용하여 특정 상태 변수에 대한 정보를
  알아낼 수 있을 때 그 상태 변수는 **관측 가능하다(observable)**고 하며,
  시스템의 모든 상태 변수가 관측 가능할 때 그 시스템은 관측 가능하다고 한다.
- 메트릭이란? 최적의 네트워크 경로 또는 측정 가능한 단위(평가지표)

서버를 가상화해서 사용 시 서버는 추상화가 되고 서버의 상태를 일일이 확인할 필요가 없다. 문제가 생기면 없애고 새로 만들면 되기 때문에.

근데 문제가 생겼는지 확인하려면 기준점이 있어야 하고, 기준이 설정되어 있지 않다면 문제가 발생했는지 알 수 없다

정상 상태를 정의하고, 비정상 상태로 만든 후 정상 상태로 돌리는 것을 통해
Observability를 높인다.
이것을 카오스 엔지니어링이라고 한다.

예측하는 것이 아니라 관찰할 수 있도록 만든 후 관찰 하는 것.

#### etc
깃랩의 문서 관리방법을 도입해서 문서 최신 상태 유지 및 지속적 업그레이드

깃헙 사이즈 및 패키지 사이즈 확인

소프트웨어 피드백 루프

한눈에 파악

Observability
post mortem
무엇을 보여줄 수 있는가
무엇을 해결해야 하는가
어떤 문제가 생길 것 같은가
이 문제가 발생했는지를 내가 설정하지 않아도 알 수 있으려면 바로 observability가 필요하다

#### architecture
단일고장점이 없는 아키텍처라면
새로운 기술을 도입하는 것이 쉽게 될 수 있겠다

hdd로 구축된 서버에서 한대만 ssd로 교체해서 상황을 지켜보고, 문제가 있어도 다른
서버에서 커버할 수 있다면 문제점 파악하는데에 도움이 되겠다

소프트웨어 자체의 에러가 전체에 영향을 미치지 못하도록 하면 다른 것으로 교체하면
그만이라서 관리하기 쉽겠다

3대의 서버를 켜놓고 1대씩 리부팅을 해도 나머지 2대가 있어서 괜찮다면 오래 켜놔서
생기는 문제를 막을 수 있듯이
일부러 1대씩 계속 재부팅되도록 하고, 상태저장이 필요 없도록 하면 os의 문제에서
조금은 자유로워지지 않을까
재부팅하면 캐시가 다시 쌓여야하는 부분은 확인해봐야겠다

3대의 서버를 한 묶음으로 추가 자원이 필요하면 이 묶음이 여러개가 되도록 하면
확장성 문제도 해결되지 않을까?
쿠버네티스에서는 이를 지원해준다

쿠버네티스는 고가용성, 확장성, 배포를 바로 할 수 있게 해줘서 좋다
서버는 필연적으로 고가용성과 확장성과 배포가 필요하다
추가로 모니터링, 로깅도 세트다

#### 대규모 서버에서 겪는 문제
데이터
CPU
네트워크

데이터의 동기화
cpu 병목
네트워크 병목

load average를 확인하고
sar을 통해 cpu 문제인지 io문제인지 확인한다

#### architecture process organization
![triangle](img/triangle.png)
출처: https://kihoonkim.github.io/2018/03/25/Microservices%20Architecture/first-msa-retro/

#### mlops
first-order-model: gif를 이용해서 사진을 특정 동작을 하도록 구현한다
build-model: 간단한 모델 생성 파일
keras-flask-deploy-webapp: 간단한 플라스크 구동 앱. h5파일을 빌드하고 실행한다
cnn: cactus recognizer, cnn 모델 생성 파일 있다

build-model을 이용해서 모델을 빌드하고 keras-flask-deploy-webapp으로 실행한다

! keyerror: sample_weight_mode 에러가 뜬다
- model.save()와 model.save_weight 차이가 뭔데

keras-deploy는 지금 텐서플로 모델을 불러와서 실행하고 있다.
커스텀 모델을 실행 가능하도록 설정 필요하다

! h5 마다 다 차이가 있어서 실행이 잘 안된다.

tensorflow Serving server라는게 있어서 모델을 여기에 저장해놓고
플라스크에서 호출해서 쓸 수 있다
그냥 모델을 플라스크 서버에 저장할 수도 있지만, 분리도 가능하다
- [serving server](https://towardsdatascience.com/deploying-keras-models-using-tensorflow-serving-and-flask-508ba00f1037)
- pb 파일만 사용 가능, h5를 pb로 변환 가능

weight가 뭐고
weight, losses, optimizers를 h5 파일 안에 넣는단다
저 값들이 있으면 예측모델이 되는건가

#### When many people come to site. how to keep working server
1. allow maximum people, others redirect to queue.
2. scale out

#### 섀시
에러 체크, 로깅, 헬스체크, 회로 차단 등 마이크로서비스에 필요한 것들을 만들어놓은 것을 이용하자는 마이크로서비스 섀시라는 개념이 이미 있었다
go-kit, micro 참고
- 외부화(엔드포인트 적용)
- 헬스체크
- 모니터링 지표 뽑기
- 서비스 디스커버리
- 회로 차단
- 분산 추적
- 로깅(액션 기록)
- 보안
이 기능들을 메인로직에 적을 필요없이 섀시를 적용시키면 자동으로 기능이 수행된다

그리고 서비스 메시는 섀시의 진화 형태가 될 것인데, 현재는 일부 기능만 구현하고 있고, 아직 완전 대체제는 아니다
istio, linkerd

istio에서 분산 추적을 하려면 app: deployname 을 라벨링 해줘야 한다

#### 마이크로서비스에서 두 서비스에서 불러온 데이터를 어떻게 합칠까
두 서비스면 그냥 호출하는데서 부르면 되겠지만
rdbms에서 하던 조인처럼 자유자재로 하기에는 성능이 안나온다

CQRS의 쿼리를 이 상황에 쓰던가
아니면 쿼리를 모아서 rdbms로 모으는 추가적인 리소스를 이용해서 해결?

#### CQRS
쿼리와 커맨드를 분리했다.
쿼리는 CRUD의 Read의 개념이고
커맨드는 나머지 CUD의 개념이다.
Read를 조합해서 나머지 명령을 하는 경우가 많고,
Read 작업이 다른 작업과 사용되는 빈도에도 차이가 있기도 하다.
마이크로 서비스에서 특히 다른 DB에서 가져올 때 조합하기 위해 이렇게 분리하면 좋을 것 같다

이 개념에서는 애초에 모델, 서비스 자체에서 쿼리와 커맨드를 분리해서 다른 서비스로 만들라고 한다


사가
애그리거트
쿼리
api

log data 나 db table 등을
초기에 설계해서 쭉 써야하는 것보다는
변경에 유연했으면 좋겠다
변경에는 근거가 필요하지만, 실제로 변경할때는 쉽게 할 수 있도록
마이그레이션이 쉽지 않다

변경에 유연한 것들은 무엇이 있을까


관리요소가 많아지면 일관성이 깨지기 쉽다
마니크로서비스는 내 생활방식과 다르다

코드가 많아지면 고쳐야하는 지점이 늘어난다


마이크로서비화도 무한정 많이 할게 아니라 탈출지점을 만드는게 좋겠다
한 팀이 감당할 서비스를 생각해서


분산 데이터
분산 서비스
분산 환경을 컨트롤하는 게 필요하다

복잡성도 분산 환경에서 있고 분산이 곧 개별적인 인간 세상과 닮은 소프트웨어의 구조


마이크로서비스의 경계설정
데이터 쿼리 트랜잭션
데이터 모아서 처리하기

마이크로서비스는 데이터가 뿔뿔이 흩어져있다고 느낄 수 있다
신경써야할 요소가 많아진다고 볼 수 있다
넷플릭스는 이것을 어떻게 관리하지?

모놀리스로 개발하다보면 기존에 것에 계속 추가해야하고 수정해야한다.
새로운 기능이 필요하면 기존 구조를 건드려야 할 수도 있다
이것을 막기 위해 마이크로서비스를 쓰지만
관리포인트는 줄일 수 있어야 한다.

#### 마이크로서비스
포인트
- 단일 고장 지점을 없앤다
- 의존 영역을 분리한다
- 빠르고 가벼운 사이즈를 유지한다

이를 어렵게 하는 요소
- API endpoint가 많아져서 이를 일일이 관리하기 힘들어 API Gateway라는 것을 이용하려 하는데 이 API gateway가 단일 고장점이 되버린다
- 흩어져 있는 데이터 여러개를 합쳐서 사용해야 할 경우가 있다
- 처음에는 작은 사이즈지만 요구사항이 늘어남에 따라 사이즈는 필연적으로 커진다.

이에 대한 마이크로서비스의 대응방법
- sidecar 패턴으로 API gateway를 없애고 각 서비스에 연결점을 붙인다
- SAGA, CQRS
- 사이즈가 커지면 다시 분리한다.

#### 마이크로서비스
미이크로서비스간 데이터 통합과 작업 일관성 유지를 위해 다른 서비스가 필요한데
이를 커밋과 적용으로 나누는 방식으로 할 수 있고
사가 패턴을 이용해 해결할 수도 있다

#### microservice
쿠버네티스의 구조처럼 마이크로서비스를 구현하면 되지 않을까

데이터를 다 분리해놓고 중앙에 모아서 처리하다가 요청이 자주 오간다 싶으면
연결하는 길을 추가?

한 마이크로서비스의 단위를 로직 - 데이터베이스 - 사이드카로 놓고 사용
이 마이크로서비스를 관리하는 툴을 생각해본다

중앙에 데이터들이 하나로 묶인다
한 마이크로서비스에 요청이 오면 그 응답으로 메시지를 보낸다
메시지는 중앙, 관리자에게 전달되고, 관리자는 피드백으로 중앙에는 업데이트로
이용된다

#### 마이크로서비스 잘 구축해보고 싶다 (이벤트 처리)
카프카 이용하는 마이크로서비스 예제 보고싶다
- github.com/gilbutITbook/007035
- github.com/gilbutITbook/006947

#### micro crud
service - crud-service - extension

crud : api <- logic <- library

crud를 해주는 엔드포인트만 나와있고, 내부는 감춰진다
엔드포인트가 정해져있으면, 나머지끼리 통신하는데 이용한다
logic이 api안에 포함되고, logic은 api를 몰라도되고, 외부 라이브러리를 통한
구현도 로직을 모르게 한다. 일방통행

crud 모델을 일반화해서 범용적으로 쓸 수 있도록 하고, extension을 붙여 확장한다
ID, Name, Date, Content, Tag 로 구성하고, Content에 다시 내용을 구겨넣는다.
필요한 곳에서 알아서 쓴다?

#### microservice
한 부분의 변화를 위해 다른 부분을 신경 쓰지 않아야 한다.
한 부분의 변화가 다른 부분에 영향을 주지 않아야 한다.

#### microservice는 무엇인가
kubernetes로 여러개의 서비스로 쪼개면 microservice인가?
micro로 서비스를 만들면 microservice인가?
monolith와 구분되는 microservice의 특징은 각 서비스가 개별 데이터베이스를 갖는
것인데, micro는 어떤 구성 방식인가

#### infra와 source를 분리
쿠버네티스 테스트 레포지토리와 myspace 레포지토리를 분리하고
Myspace의 폴더가 곧 프로젝트 목록이 되도록 구성

1. Basic 폴더를 만들어서 이를 복사해서 쓰도록한다
2. Argocd에서 폴더를 등록한다
3. 배포 완료

인프라 코드도 개발자가 관리하도록 하기 위함.
개발 코드는 컨테이너 이미지 배포하기까지 자동

Prefix로 infra 서비스와 비즈니스 서비스 구분

argocd를 github action에서 실행한다면
소스코드와 인프라코드가 분리되있는데
소스코드 변경을 인프라가 어떻게 알아차릴 수 있지?

소스코드 변경 후 인프라를 다시 건드리면 안된다
인프라는 인프라대로 관리되고, 소프트웨어 업데이트는 소스코드에서 따로 처리되야 한다

인프라 변경 시 변경될 것은 쿠버네티스 셋팅, 서버 셋팅
소스 변경 시 변경될 것은 소프트웨어 버전, 세부 설정

둘 다 쿠버네티스 어플라이를 해야되는 건 같다.

인프라 생성 시 argocd 등록 되도록 하고, 그게 소스코드를 보도록 하면 될까?
1. 레포지토리 생성
2. 도커 빌드
3. 인프라 레포에서 폴더 생성
4. argocd 싱크 등록을 1 레포지토리로 등록
5. 레포지토리 업데이트
6. argocd 동작

## 프로젝트 아키텍처
넷플릭스 모델 - 전체가 하나로 묶여있다
네이버 모델 - 각 역할별로 분리되있다
리디북스 모델 - 데이터가 묶여있다

#### 그동안의 아키텍처 모델
- 3 layer
- MVC - MVVC - MTV
- 네트워크 레이어
- 12 Factor app
- MSA
- DDD
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- https://ahnheejong.name/articles/package-structure-with-the-principal-of-locality-in-mind/
- https://mingrammer.com/translation-structuring-applications-in-go/
- https://geminikim.medium.com/지속-성장-가능한-소프트웨어를-만들어가는-방법-97844c5dab63

#### library
모든 코드를 라이브러리화 하면 각 라이브러리를 호출하는 어댑터를 만들게 되면 너무
비대해진다.
그렇다고 어댑팅 안하면 라이브러리 수정 시 여기 저기서 바꿔야 된다.
그렇다고 라이브러리를 일관된 형태로 유지하자면 그것도 쉽지 않다

lib1
- file

source1
- main
- lib1-adapter

source2
- main
- source1-adapter
- lib1-adapter

이런 구조가, 라이브러리 변경 시

lib1
- file-v2 // 변경

source1
- main
- lib1-adapter // 변경

source2
- main
- source1-adapter
- lib1-adapter // 변경

수정이 전체에 영향을 미치면 안된다.

#### 개발 시작
1. 가장 간단한 실행을 위한 설계
2. 폴더 만들기
- note

3. 구현해야 하는 것 적고 결과값 적기
- note/main_test.go

4. 테스트 통과시키기
- note
  -  main.go
  -  main_test.go

5. 기능 추가를 위해 설계
6. 파일 추가
7. 반복

그러다가 어느 시점이 되면 아래 정도의 복잡성이 생긴다
note
- logic1
  - main.go
  - data.go
  - adapter.go
- logic2
- api
  - http.go
  - grpc.go
- lib

이런 구조에서 더 복잡성이 필요해지면 분리하기 좋다는 신호다

그래서 저 코드 구조가 반복되면 확장이 된다
인프라는 저 구조를 쉽게 컨트롤하도록 구성된다

인프라 - 서비스 - 데이터의 구조로 한 인프라가 구성되고
이것이 다시 프렉탈로 반복된다

인프라에서 api, logging를 지원해주면 더 좋겠다

#### library 호출
마이크로서비스의 library를 한곳에 모아서 보여주고
쉽게 호출해 쓸 수 있도록 해야한다.
어떻게?

## code design
main - 메인에서 동작만 나타낸다. 구현은 다른 파일에서 한다
```
func main() {
  init()
  get()
  set()
  health()
  doSomething()
}
```
http_server - http로 렌더링하는 작업만 수행한다
logic - 인터페이스를 받아서 인터페이스를 구현한다
```
type s struct {

}
func (s struct) init() {

}
```

#### 외부 라이브러리 분리
외부 라이브러리를 분리하려고 하는데, 그러면 폴더 구조가 어떻게 되는거지

- cmd
- lib1
- ilb2
- logic1
- logci2

이런 식으로 되는 건가

- cmd
- logic1
  - lib1
  - lib2
- logic2
  - lib1
  - lib2

이것보다는 나은 것 같은데 위의 구조에서 라이브러리와 메인 로직의 구분이 안된다


- cmd
- logic1

일단 내 로직이 메인이다
cmd에서는 이를 한 눈에 보기 좋게 한다
여기서 이제 라이브러리가 들어간다

- cmd
- logic1
  - db_logic
- db

이렇게 하면 메인에서 구현에 필요한 것을 db에서 받아서 실행하도록 해야한다

외부 라이브러리가 여러 개 중에 하나를 선택할 수도 있다

- cmd
- logic1
  - db_logic
- db
  - redis
  - RDBMS

이렇게 하려면 db를 다시 추상화해야한다

...
- db
  - redis/
  - RDBMS/
  - db.go

근데 이렇게 하면 외부 라이브러리를 구현하는 작업이 다시 되야 되서 별로다

클라이언트 프로그램은 마이크로서비스일 필요 없을 거 같다?

메인은 전체 흐름
에러 처리는 내부에서 처리?
메인 파일은 의미가 있어야 하고, 세부 구현은 적지 않도록...
```
func main() {
    if err := initHTTPServer(); err != nil { log.Println(err) }
    if err = addHealthCheck(); err != nil { log.Println(err) }
    if err = addLogic(); err != nil { log.Println(err) }
    if err = addLoggig(); err != nil { log.Println(err) }
    if err = runHTTPServer(); err != nil { log.Println(err) }
}
```
