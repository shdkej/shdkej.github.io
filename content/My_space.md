---
title   : My Space
summary :
date    : 2021-04-14 14:00:48 +0100
updated : 2021-04-21 15:11:09 +0100
tags    :
parent  : [[Blogging]]
---

## 확장 가능하고 변경이 쉬운 환경 구축하기.
배포는 인프라에서 처리한다.

## kubernetes cloud host
월 5천원 정도만 쓰는 인스턴스 하나 구해서 페이팔 연동, 피씨에서 접속
어떤 호스트, 어떤 인스턴스를 쓸지
네트워크, 디스크 가격은 어떻게 되는지 확인.
쿠버네티스 돌려서 테스트 하는 것까지 블로그 글 작성

1. aws, gcp
2. cpu, ram
3. 네트워크 설정
4. 쿠버네티스 구동(단독형으로 쓸까...)

클라우드 페이팔 연동해서 n26 매달 빠져나가게 설정
한달 5유로 정도면 100개월 사용 가능

price of 3 nodes
aws(RAM 1G): 0.72
gcp(f1-micro RAM 0.6): 1 free, 2 0.36
gcp(e2-micro RAM 1G): 0.60
- network more. disk 1G free

How many pod can run in 1 cpu 512 ram
- kubernetes use 1GB ram

Build Kubernetes server hybrid

- Check cloud fee
- Run Logging monitoring app
- kubernetes test
- 롤링 업데이트 롤백 테스트
- 카나리 배포 테스트
- 기본 디플로이먼트 실행 후 스트레스 테스트 - cpu 500m, ram 500m 설정 시 nginx 성능 테스트
- auto scaling 배포 후 스트레스 테스트 - 위의 디플로이먼트를 auto scaling 할 시 중단이 없는지 테스트
- 쿠버네티스 성능 테스트
  - 블로그 포스트 작성
- 페일오버, 이중화 확인
- Mlops 서버에 배포
  - 모델 바꾸고 푸시하면 바로 업데이트 되도록
- 고 gRPC 서버 배포
  - 푸시하면 배포

#### digital ocean 으로 쿠버네티스 구축
필요한 정보
- do api token
- 스페이스를 만들어야 한다
- s3 endpoint, region

compute instance가 droplet 이라는 명칭으로 되어있다. aws에서 ec2 인것처럼
block storage는 뭐지

TLqkf space access key가 안맞다고 계속 에러난다
- Tlqfk .terraform 에 데이터가 저장되어있어서 그랬다. 삭제 후 진행하니 된다

테라폼 13 버전 위부터 provider 에서 required_provider로 바꿔야하고,
14버전에서는 source="digitalocean/digitalocean" 으로 설정해줘야 한다


kubernetes를 DIY로 하는 것은 3노드를 사용하면 15$/month
kubernetes 서비스를 제공하는 것을 사용하면 10$/month
자체 쿠버네티스 서비스를 사용할 때 추가요금 내는게 없는지 확인해봐야겠다
- 한 노드당 10$였다.. ㅋㅋ

provision file 에서 ssh key 퍼미션 400으로 바꿔줘야 한다
ansible에서 로컬 네트워크로 전달이 안된다
- python interpreter 설정 해줘야 한다

- [X] argocd 깔고,
- [X] 모니터링 깔고,
- [X] 로드밸런서 깔고,
1. 모니터링으로 상태 확인 해야한다.
2. 모니터링 서버는 로드밸런서로 접속 잘되게 설정한다
3. argocd로 배포할 때 상태를 본다.

마스터 서버를 hosts에 등록해놔야겠다
로드밸런서를 cloud에서 생성 안해도 로드밸런서가 켜질까?

grafana를 구동하는데 리소스가 많이 든다
- grafana가 문제가 아니라 k3s를 돌리는 것만으로도 0.9G 메모리를 먹었다.

traefik이 디폴트로 깔려있다.
- dashboard를 쓰도록 configmap을 설정한다
- scale을 0으로 했다가 1로 해서 리스타트한다.
- port forwarding을 해주니까 로컬에서 localhost로 접속이 된다??
    - kubectl port forwarding 은 입력하는 호스트를 인식해서 실행되나보다

grafana 올린거에 service를 찾아서 ingress 붙여주니까 잘 된다

- traefik으로 name based routing을 하니까 접속은 되는데 사진은 못받아왔다
    - grafana도 잘되는 걸로 봐서는 ingress가 단일 주소만 받아오는건 아닌듯
- [X] digital ocean dns 세팅해서 휴대폰으로 접속 확인
    - cloudflare 를 terraform으로 올려서 dns를 쓰도록 해야겠다

- [ ] 상태 모니터링 알림 추가
- [ ] 배포 시 상태 추적해서 오버로드 발생하면 바로 알림 오는지 확인
- [ ] 알림 받으면 바로 롤백하는 것도 해본다

내부 시스템은 내부적으로만 traefik으로 설정해놓으면 되겠다
grafana.system 정도로 /etc/hosts만 다 설정해주면 로컬용으로 쓸 수 있겠다

- [ ] golang으로 api 서버 만들어서 telegram 보내는 것도 등록
    - 추상화 잘 해서 telegram을 바로 slack으로 대체 할 수 있도록
- [ ] jenkins 설치 후 pr 테스트

#### 확장 가능한 최소한의 인프라
3노드 쿠버네티스
로드밸런서
로그 수집
모니터링
api
feedback
ci/cd tool

+ 사용하는 서비스
kafka, redis, mongodb, hadoop, rdbms

#### 개인 서버 구축
Iaac로 되어야 한다
원할 때 접속, 배포가 쉽게 되어야 한다
재구축이 바로 되어야 한다
서버를 돌리고 있는데 서버가 지저분해져서 다시 쌓아올리고 싶을 때 원하는 상태로 바로 만들 수 있어야 한다
    - vagrant kubernetes setting need too many time
쿠버네티스 안에서 돌리고 에러 한눈에 확인 필요
쿠버네티스는 어디서 돌리지? 일단 베이그런트로
카오스 몽키가 로그 서버도 멈추게 할 수 있나?
각 앱들을 쿠버네티스 파일로 만들고 IaaC가 되도록
로컬, 클라우드 확인


## Tool
k3s
- tool
- service
- infra

tool
- n8n
- tailscale

service
- note server - redis
- wiki - postgres
- searching - elasticsearch

infra
- grafana
- prometheus
- traefik
- argocd
