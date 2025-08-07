---
title: My Space
summary: 나의 시스템을 계속 운영한다
date: 2021-04-14 14:00:48 +0100
updated: 2021-06-01 16:26:55 +0900
tags:
parent:
  - Blogging
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

- [x] argocd 깔고,
- [x] 모니터링 깔고,
- [x] 로드밸런서 깔고,

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
- [x] digital ocean dns 세팅해서 휴대폰으로 접속 확인

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

- 사용하는 서비스
  kafka, redis, mongodb, hadoop, rdbms

#### 개인 서버 구축

Iaac로 되어야 한다
원할 때 접속, 배포가 쉽게 되어야 한다
재구축이 바로 되어야 한다
서버를 돌리고 있는데 서버가 지저분해져서 다시 쌓아올리고 싶을 때 원하는 상태로 바로 만들 수 있어야 한다 - vagrant kubernetes setting need too many time
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


#### 버전 확인해서 업데이트 필요
- eks
- nginx
- autoscaler
- terraform
- lb controller

---

나의 Kubernetes 시스템 운영

- mcp 돌리고
- langconnect 라는거 돌려볼까
- n8n 돌리고
- 버전 관리 계속 체크하게 해보고
- keda
- karpenter
- grafana loki prometheus
- 키값 vault로 관리
- argocd 또는 spinaker 테스트 환경

EKS는 클러스터 운영비만 최소 월 $72 라서 무리가 있다
여기에 ALB도 달면 월 20달러가 더 나온다
eksctl을 쓰면 간단한 yaml로 eks를 띄울 수 있다

```yaml
# cluster.yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
  name: my-cluster
  region: ap-northeast-2

nodeGroups:
  - name: ng-1
    instanceType: t3.small
    desiredCapacity: 1
    volumeSize: 20
```

- 내가 쓰는 툴의 버전 업과 변경 사항을 알려주는 ai 알림
  - my_space의 항목들을 모니터링 하면 되겠네
  - terraform
  - eks
  - nodejs
  - kubernetes
  - grafana / loki / prometheus
- 서비스 초창기에는 ECS를 쓰다가 사이즈가 커지면 EKS로 옮기면 안되나? EKS가 해주는게 뭐지
  - kubernetes 설정
  - 내 환경은 kubernetes여야 다루는 걸 익힐 수 있다
- EKS 버전 업 시 테스트 전략 1. 테라폼으로 테스트 클러스터 생성 2. 현재 워크로드 복제 - `kubectl get all --namespace={app} -o yaml > backup.yaml` - `kubectl apply -f backup.yaml --namespace {app}` 3. 테스트 자동화 실행 - k6나 curl healthcheck, e2e 테스트 4. 업그레이드 시뮬레이션 - eksctl upgrade cluster 5. addon 호환성 확인 - vpc-cni - coredns - kube-proxy - ebs-csi - kubectl plugin 중에 convert라는게 있는데 버전 업그레이드 시 manifest를 변경해주는 커맨드 - kubescape라는 클러스터 검사 프로그램도 있음
  kubectl
  X
  kube-apiserver
  X
  controller-manager, kube-scheduler
  X-1
  kubelet, kube-proxy

#### docker compose 대신 minikube를 개발환경으로 쓰면서 연습?

그러면 docker는 아는데 kubernetes를 모르는 개발자들은 접근이 힘들다.

- 데브시스터즈에서는 관리페이지를 만들어서 클릭으로 쉽게 접근 가능하게 했다.
  - https://www.slideshare.net/seungyongoh3/ndc17-kubernetes
  - 근데 과제를 받아서 이걸 바로 실행할 수 있게 제출하려면 도커 컴포즈가
    간단하다. 컴포즈를 써야하는 경우와 아닌 경우를 어떻게 구분할까
- 카카오에서도 관리페이지에서 요청해서 중앙 자원을 사용하는 식으로 개발 인프라를 구성
- 개발 시에도 AWS 자원을 써야하니까 중앙 요청식이 관리에도 수월하지 않을까

오픈소스로 공유할 때 이미지만 만들어놓고 yaml 설정파일만 있으면 쿠버네티스를
안쓰는 사람이 쉽게 접근할 수 있을까?

- 쿠버네티스를 쓰더라도 Dockerfile은 필요하니까 compose를 굳이 제공하지 않아도
  괜찮을까
- 내가 compose 명령어 쓰는게 편해서 쓰려는거지 모두에게 편하지는 않을 수도 있다.

이게 DevOps에서 오히려 멀어지는 길이 아닐까

- Kubernetes를 익혀야하나 말아야하나가 큰 경계선일 것 같다. kubernetes는 도구일 뿐인데...
- spinnaker를 쓰면 개발과 운영의 환경을 모두 관리할 수 있을까
- 회사에서 구축한 것을 이용하는 느낌보다는 집에서 혼자 구축해도 똑같은 환경을
  만드는 것이 의미가 있겠다.
- db, kafka가 필요할 때 쉽게 추가하는 환경이 필요한거지 kubernetes가 필요한건
  아니다.
- 웹화면에서 이미지를 클릭해서 주소를 얻으면 끝. 추가 설정을 넣을 수 있어야 한다.

근데 kubernetes는 그 세세한 부분을 설정할 수 있어서 사용되는데, 웹화면에서는
간단한 것만 요청하게 된다. 그걸로 충분할까?

자꾸 운영과 개발을 분리해 생각하려고 하면 안되고 DevOps 직무의 역할은 개발자가
운영을 쉽게하는 환경 그 자체를 만드는 것일 것 같다.

- 전체적인 환경을 개선하는 것에 신경을 쓰는거지, 전체 환경을 구축해서 그 안에서
  활동하게 하도록 하는게 아니다. 미묘하다.

github action은 github에 종속적이다. CI/CD도 범용적일 필요가 있다.
코드로 파이프라인을 구성할 수 있는 점은 좋지만 스크립트를 쓰는게 더 범용적일
것이다. 근데 그럼에도 각 서비스마다 제공하는 기능을 활용해야 할 때도 있다.

- docker는 의존적이지만 추상화할 생각을 안해봤다. 무슨 차이일까. 결과물은
  image라는 범용적이고 공통적인 것이라서? 그렇다면 CI도 빌드 결과물은 같다.
- git, docker는 되고 jenkins, kubernetes는 안되나
- terraform을 선택하면서 ansible, chef와 비교했는데 왜 terraform 이 선택됐나

#### 미니큐브 개발환경 셋업

원래 docker compose에서 디폴트로 스니펫 만들어서 쓰던걸 변환하는 작업부터
시작해서 볼륨 붙이고 내부 접속, 외부 접속하는 것까지 확인

운영 환경과 미니큐브를 유동적으로 사용할 수 있는지 확인

도커 이미지는 어차피 만들어야 하는데, yaml에서 끝내면 더 좋겠다


## 2025 세팅 다시하기
#### 07-24

- 모니터링 서버 띄우기까지만 일단 해보기
- 내일은 ssl 설정 해봐야겠다. cert-manager를 설정해야함. 일단 주석처리.
- ingress controller 부터 안뜨는데
	- rbac에서 pods 리소스 get 권한이 없었다고 함.
	- 근데 terraform으로 업데이트 안되서 kubectl patch로 수정됨
	- 아하. 노드가 부족하니까 거기서 계속 왔다갔다하면서 시간도 오래 걸리고 동작도 막힘
- 리소스가 적으니까 되게 다 막히고 잘 안된다
- 그냥 k3s 를 띄워서 하는게 나을수도


#### 07-23

- kube config 추가하기
	- `export KUBECONFIG=~/.kube/config:~/.kube/my-k8s-kubeconfig.yaml`
	- `kubectl config get-contexts`
	- `kubectx` 로 추가된거 선택
	- `k get node` 로 확인
- 앱을 띄우는걸 argocd로 할까 아니면 terraform으로 그냥 할까
	- n8n 같이 내가 소스 관리 안하는건 그냥 terraform으로 해도 될 듯
- https://github.com/digitalocean/container-blueprints/tree/main/DOKS-CI-CD
	- 이거도 해볼만 할듯 tekton을 CI로, argocd를 CD로, knative로 serverless
- 로드밸런서 추가
- 모니터링 telemetry 추가
- ha 추가할 때 비용 드나?
	- controlplane ha 는 $40 든다
- autoscale은 지원해주는데 안쓰려다가 일단 쓰고 모니터링 해본다
	- 이거 autoscale 옵션은 어딧지?
	- 이것도 terraform으로 설정하면 됐음
- nginx ingress controller는 따로 marketplace에서 깔아줘야한다
- signoz 설치
	- clickhouse도 설치해야하고 좀 리소스를 많이 먹는 듯 싶다
- nginx ingress controller로 설정하고 쓰는게 loadbalancer 1개로 쓸 수 있고 설정도 용이해서 좋음
	- ingress controller도 리소스를 쓰는거다
- dns 설정은 수동으로 해줘야겠지? -> 테라폼으로 확인
- ingress 경로 맞춰주기
- 내일은 노드들이랑 파드들 한눈에 모니터링 할 수 있게 해보고 싶다
