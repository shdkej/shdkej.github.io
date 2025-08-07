---
title   : Container
summary : Docker, Kubernetes
date    : 2020-12-17 22:01:56 +0100
updated : 2025-07-23 10:01:55 +0900
tags    : deep_knowledge
---

# Container

#### docker strength
- isolation process
- no dependency
- portable
- light-weight

#### Docker image vs compose
- image vs volume
    - test with volume, deploy with image

#### docker logs
- make stdout
  - `echo "test" >> /proc/1/fd/1`
- `--log-opt`
  - `max-size`
  - `max-file`

Fluentd와 Eleasticsearch를 이용해서 로그 수집 및 검색

표준출력(stdout)으로 로그를 출력하도록 두고, 이를 수집하도록 한다.

nginx는 stdout으로 출력되도록 설정이 필요하다
- 1.19.8 버전을 쓰는 지금은 stdout으로 출력되도록 설정되어있다.

#### container
libcontainer 개발로 kernel에서 namespaces, cgroups 등을 직접 실행
LXC -> runC 컨테이너 런타임 변경. OCI 준수
그 외 rkt, cri-o 등이 있음

LXC는 다른 호스트에서 실행했을 때 설정 차이로 동일하게 돌아가지 않는 경우가
있었다고 한다.
도커도 버전 다르면 안돌아간다.

Container 구동 원리
- `chroot` - 입력받은 디렉토리를 루트로 하여 격리된 환경을 만들어준다
- cgroups - 시스템 리소스를 격리할 수 있다(cpu, memory, network, disk)
- overlayFS - 프로세스 간 파일 시스템 분리
    - image layer + container layer(컨테이너 안에서 수정되는 파일들)
- namespace - `unshare` 프로세스 간 시스템 자원들을 격리하는 기능
    - cgroup - `-C`
    - user - `-U`
    - mnt - `-m`
    - ipc - `-i` 프로세스 간 통신. 같은 네임스페이스 안에 있어야 통신 가능
    - pid - `-p` 컨테이너 안에서는 프로세스 번호를 새롭게 받는다
    - uts - `-u` hostname 격리
    - net - `ip netns add <ns name>` 네트워크 규칙들을 새롭게 받는다
- https://speakerdeck.com/devinjeon/containerbuteo-dasi-salpyeoboneun-kubernetes-pod-dongjag-weonri?slide=29

네임스페이스와 컨테이너, 네트워크까지 잘 정리된 링크
- https://www.44bits.io/ko/keyword/linux-namespace

#### Docker의 위기?
- container is light-weight and portable more than virtual machine image
- but it can same work that PC's work
- Can exist more than light-weight task from docker?

- OCI(Open Container Initiative)
- Container Runtime
- Image Download -> Extract Image -> Execute Container
- Container has cgroups, namespace, networking
- alternative to Buildah, skopeo, podman
  - docker is one big process. It can make single point of failure.
  - divide docker position by 3.

#### Dockerfile
- 바이너리를 도커파일에서 받을 때 체크섬을 검증하는 내용을 적으면 이미지의 신뢰성이 올라간다
- 루트 대신 사용자 추가하는 내용을 디폴트로 한다
    - `RUN useradd sam`
    - `USER sam`
    - 간단하다
- docker.sock은 호스트의 도커 컨테이너 관리를 장악할 수 있다
- dockerfile에 locale, time 등 설정 해두는게 좋지 않을까

#### docker compose에서 빌드 단계의 이미지를 쓸 수 있을까
Dockerfile은 멀티 빌드로 해놓고 배포시에는 마지막 빌드 이미지를 쓰지만
개발 시에는 빌드한 것으로 쓰고 싶은데
```
build
  context: ./
  target: build
```
build에 target으로 이름 맞춰주면 된다.

#### docker-compose를 이용해 이미지를 바로 배포하는 것과 Dockerfile을 쓰는 것
dockerfile 없이 이미지로만 할 때의 문제점?
- 어떤 것을 바꿨는지 추적하기 힘들다
- 설치파일들 찾기 힘들다
- docker layer와 image size를 줄일수록 배포가 빨라지는 도커의 장점을 이용못한다.

dockerfile로 하면 쿠버네티스 사용 시 이미지 빌드를 또 해줘야 하잖아?
이미지로 올리는 경우는 왜 이미지로 올리는거지?

볼륨을 해도 커밋 시 볼륨된 내용은 적용 안되고, 기존 이미지가 갖고 있던대로 된다

dockerfile에서 copy를 한 폴더를 외부에서 수정 후 내부에 들어가면 수정되어 있나?
- No

build - docker file to image
docker-compose up 을 하면 이미지를 새로 부른다? volume

dockerfile -> image -> pods
build -> push -> kubernetes apply(set image)

개발환경에서는 볼륨을 해서 compose로 개발하고
배포 시에는 Dockerfile을 이미지화해서 배포한다
개발디렉토리는 Dockerfile에도 COPY에 있어야하고, compose에도 볼륨을 한다.
개발환경에서 쓰는 이미지는 배포 시 쓰는 이미지와 같은 것을 사용한다.
이미지 빌드는 CD pipeline을 통해서 한다. 이미지 혼동을 막기 위해
- [ ] 이미지를 기반으로 작업을 하면 이미지가 업데이트 되었는데 이전 버전으로
      작업하던 사람들은?
- [ ] 최초 작업 시 이미지가 없어서 compose를 실행 못시키니, 빌드 파이프라인을 먼저 만든다?

내가 원하는게 디렉토리 전체를 덮어쓰는게 아니라 일부만 수정하는 거라서 좀 꼬였다
- [ ] 일일이 COPY를 해야 하나? compose에서는 어떻게?

```
Dockerfile
COPY /app /app

---

docker-compose.yml
volume: /app:/app
```
app 폴더의 내용을 수정 후 docker build나 compose up을 하면 동일한 상태가 된다.

서버 설치: vagrant up (git pull -> [docker-compose up or kubectl apply])
서버 수정: git pull -> docker-compose up -> 수정 -> 테스트 -> git push -> 서버 적용

서버 개발: git pull -> docker-compose up -> 수정 -> 테스트 -> git push
서버 업데이트: git pull -> docker-compose up

실서버에서도 볼륨으로 돌릴까? 순수 이미지로만 돌릴까?
실서버에서도 수정을 하고 싶은데 다른 회사들은 어떻게 하지? 실서버는 안건드리는게
좋으려나?
그러면 compose.yml을 두개를 만들어야 하나
실서버에서도 그냥 볼륨을 하면 어떨까?

실서버에서 수정을 하는게 편하지만 절대로 하면 안된다고 권고한다
번거롭더라도 재빌드 재배포를 하라고 한다
그렇다면 핫픽스를 최대한 빨리 배포할 수 있도록 해야 하는데
쿠버네티스에는 명령어 하나로 되돌릴 수 있다
깃헙 액션으로 바로 되돌릴 수 있어야 한다
핫픽스 or 롤백

배포는 ansible로 github action 하면 되겠다
근데 ansible로 하면 서버 private key가 필요한게 번거롭다
그렇다고 vault서버에서 가져오는 것도 private key를 관리해야되서 번거롭다
보안은 번거롭지만 해야되긴 한다

#### 배포 뼈대 만들기
kubernetes 버전
docker image 버전

최소 docker image로 빌드하고, 여유가 있으면 kubernetes를 이용
CI로 간단 검증
CD는 ansible 또는 argoCD
핫픽스룰을 따로 만들어 둔다.
push를 하면 검증을 한다
1. commit, 2. merge, 3. hotfix

- [ ] 빌드 요청은 어떻게?
- [ ] 버저닝은 어떻게?

#### docker image
alpine, stretch, slim, buster
buster, stretch는 debian용
alpine은 alpine linux로 만든 것
slim은 그 이미지를 실행하기 위한 최소한의 설치파일만 있는 것

근데 slim보다 alpine이 더 이미지 크기는 작다?

#### docker compose execute bash
- `entrypoint: /bin/bash` failed
- `tty:true; stdin_open:true` success
- `docker-compose run app bash` success

#### docker cmd vs entrypoint
커맨드 툴을 도커명령어에서 바로 실행하려고 하면
CMD로 하면 안되고 ENTRYPOINT로 하면 된다
`docker run hanspell-cli -h`

대신 ENTRYPOINT를 쓰면 -it /bin/sh 는 인식을 못한다

#### docker 간 통신
- compose 에서 네트워크 명시적으로 설정해줘서 compose에 설정한 이름으로 통신하면 된다고 한다
- --network host 를 써도 된다고 한다
- docker buildx build --network host --platform linux/arm64 -t goodby .
- https://marshallku.com/dev/deploy-rust-with-docker

# Kubernetes
A person has a very small component, and it composes of one architecture.
the kuberetes seem to be this.
and I want to make software like this architecture.
strong small component to flexible architecture.
kubernetes makes easy to a devops works
about deploy, scaling, update, healthcheck, orchestration
but devops works is not clear.

- `kubectl run curl --image=radial/busyboxplus:curl -i --tty`
- pods cluster inside curl pod

keep focusing only bisuness logic
- 1. monitoring - feedback - update logic
- 2. data management
- production deploy behavior make easy
  - update and rollback
  - scale up and down

https://github.com/dennyzhang/cheatsheet-kubernetes-A4/blob/master/README.org
- ClusterIP vs NodePort vs Ingress
- service account?
- cluster role?
- cluster? - node
- daemon set?
  - it makes every node to make pods
  - example: every node can have logstash

#### resource
- pods
- replicaset
- deployment
- service

컨테이너 리소스
- pod, deployment

보안 리소스
- rolebinding

설정 리소스
- configmap

#### api
- master
    - kube-apiserver
    - kube-scheduler
    - kube-controller
    - kubelet
    - kube-proxy
    - etcd
- node
    - kubelet
    - kube-proxy

#### 쿠버네티스는 os와 클라우드를 추상화할 수 있나?
서비스의 장애가 os에 영향을 미쳐도 서비스를 격리하면 문제가 해결될 수 있나?
그렇다면 '쿠버네티스', '마이크로서비스', '데이터'가 소프트웨어의 큰 줄기가 될 수 있다
원래는 인프라, 서비스, 데이터인 것을 쿠버네티스가 인프라를 완전 대체?

#### kubernetes volume
특정 노드의 폴더를 사용할 때는 hostPath를 사용할 수 있다.
근데 노드 상관 없이 폴더를 써야하는 경우가 대부분일 것이다

#### 쿠버네티스 네트워크의 이해
팟들끼리의 통신은 veth 을 통해서 하게 된다 eth0 -> docker0 -> veth0
그리고 eth0이 어떤 veth0과 연결되어 있는지 라우팅 테이블이 존재한다
하지만 팟은 언제든 사라졌다가 다시 생겨날 수 있어서 이를 추상화하는 레이어가 하나 필요하고 이것을 service로 만들었다
(IP 네트워크는 보통 자신의 host에서 목적지를 찾지 못하면 상위 게이트웨이로 전달하도록 동작)
service는 리눅스 커널 기능인 netfilter와 iptables를 이용한다
kube-proxy라는 녀석도 같이 동작에 관여하는데 얘는 netfilter에 규칙을 수정하는 역할만 하고 실제 동작은 netfilter에서 이루어진다
클러스터 외부에서 트래픽을 내부로 전달하고 싶다면 로드밸런서를 이용한다
외부에서 요청이 오면 NodePort를 거쳐서 내부 Node의 ip를 찾게 되고 이것이 다시 netfilter를 거쳐서 팟을 찾을 수 있게 된다
하지만 NodePort를 확장한 LoadBalancer Service도 제약사항이 있는데 한개의 로드밸런서가 여러 서비스를 연결하지 못한다는 점이다.
그래서 ingress가 나왔다
ingress는 그래서 한개의 로드밸런서로 여러 서비스를 유연하게 설정할 수 있게 해준다
ingress는 ingress-controller가 동작하게 해야하고, 각 클라우드 플랫폼 마다 ingress-controller 구현체가 있다

#### deploy
- 배포와 릴리즈를 분리
  쿠버네티스에 apply를 해도 실제 서버에 바로 적용되는게 아니라 서비스 메시에서
  릴리즈를 관리 -> istio를 이용
- 서비스 키고 시간이 지나면 api 접속이 안됨
- istio, monitoring, argocd 켜놨는데 어디가 리소스 많이 먹는지 알고 싶다

#### deployment kill
deployment 정지시키려면 scale --replicas=0 으로 해야되나보다
- pod을 삭제하는 건 kill로 한다

#### kubernetes test
- local test, production build pipeline
- local test with only dockerfile
- local test with same with production
- In msa. need kubernetes?
- In msa. github repo is seperated?
- developer can build docker image?
- how to provide docker image to developer?
- when developer push updated source. pipeline is
    - kubernetes apply?
- build with tags?
    - git tag 1.0.0
    - git push origin --tags
- hpa
- service
- minikube

#### 쿠버네티스 클러스터 중에 마스터가 자원을 많이 쓰나, 노드가 많이쓰나?
master
- api server, etcd 등 기본적으로 자원을 많이 사용한다.

서비스가 빡세게 돌면 노드가 많이쓰나?

쿠버네티스 로그 서비스 추가해서
노드 하나를 일부러 끄면 로그 잘 남는지 확인하고
죽은 서버를 살릴 수 있을지 확인

ram 1기가 서버에 ram 0.5를 쓰는 서비스를 6개를 레플리카하면 동작하나?
- 자원 한도 넘어가면 파드를 안 만든다.

글러스터fs 와 db 레플리케이션을
쿠버네티스에서 편하게 할 수 있는 방법이 있나?

클러스터를 한번씩 껐다 켜서 리프레시 했을때 안좋은점이 있을까?
없다면 접속자 적은 시간을 뽑아서 한 서버씩 재부팅 해줘야겠다
페일오버 테스트도 되고, os도 리프레시 되지 않을까

걱정되는 점은 한쪽 노드에 팟들이 몰려있다가 다시 돌아갈 때 과부하 걸리지 않을지

#### 쿠버네티스는 어떻게 복잡성을 관리하는가
- ingress -> service -> deployment 식의 계층적 추상화
- namespace 격리
- controller pattern - 이건 좀 더 찾아보자
	- 각 리소스별 전용 컨트롤러가 상태 관리
	- 단일 책임 원칙으로 복잡성 분산
	- Reconciliation Loop로 일관된 동작 보장
- Operator pattern
	- 도메인 특화 로직을 CRD로 추상화
	- 인간의 운영 지식을 코드로 전환
- 그치만 쿠버네티스도 한계가 있다
	- 노드 수 제한도 있고
	- API 서버가 초당 수천개 요청에서 성능 저하하는 처리량 한계도 있다
	- 컨트롤 플레인은 사용량이 선형적으로 증가할 수 밖에 없다
- 또한 복잡성의 새로운 차원이 있다
	- 네트워킹 오버헤드 (CNI 성능 이슈)
	- 스토리지 관리 복잡성 증가
	- 보안 정책의 기하급수적 복잡성
	- 디버깅과 트러블슈팅의 어려움
- 그래서 클러스터를 분리해야한다
	- 팀별 / 환경별
	- 그러면 분리된 클러스터도 관리를 쉽게 할 수 있어야 한다
	- 하나의 클러스터로 다 하려고 하는건 확장적이지 못하다


#### docker kubernetes istio
| docker   | kubernetes                        | istio                        |
| -------- | ---------------------             | ---------------------------  |
| 이식성   | 배포 (단일 배포점, 롤링 업데이트) | 서비스 메시                  |
| 고립성   | 로드 밸런싱                       | 어플리케이션 api 마다 프록시 |
| 가벼움   | 서비스 디스커버리                 | 서킷 브레이킹                |
| 헬스체크 | 스케일링                          | 카오스 테스트                |
| 페일오버 | 고가용성 확보(3 node)             |                              |
|          | 확장 시 서버 셋팅 자동화          |                              |
|          |                                   |                              |

롤백, 자원관리, 모니터링, 시크릿 관리

## Network Resource
#### nginx vs istio
- service -> Ingress
- istio Gateway -> Virtual Service -> Destination Rule

트래픽을 한 곳에서 다 처리하느냐, 각 서비스마다 분리해서 처리하느냐가 큰 차이
사이드카가 많아져서 생기는 중복 오버헤드가 많을까, 비대해진 하나의 객체가
오버헤드가 많을까
내부에 직접 통신하면서 트래픽을 제어할 수 있는 것은 장점
api gateway의 상위호환이 되려고 한다

istio
- 트래픽 모니터링 가능
- 트래픽을 제어할 수 있다
- 각 서비스마다 분리되어 있어서 단일 고장점이 아니다.
- retry 및 timeout 동작

nginx(api gateway)
- 단일 객체
- 트래픽 제어

#### nginx canary
```
metadata:
  annotations:
    nginx.ingress.kubernetes.io/canary: "true"
    nginx.ingress.kubernetes.io/canary-weight: "20"
```

#### kubernetes supports cluster
- < 5000 nodes
- < 150000 pods
- < 300000 containers
- < 100 pods per node

#### kubernetes access remote cluster
`scp <user>@<ip>:/home/vagrant/.kube/config ~/.kube/config`

#### kubernetes dns
kube-dns
coredns 1.12 버전부터 사용, 호환성을 위해 라벨링은 kube-dns로 되있다

`myapplication.namespace.svc.cluster.local` 형식으로 되있다
- https://jonnung.dev/kubernetes/2020/05/11/kubernetes-dns-about-coredns/

## Test
#### test
- how to test account system?
    - check send complete
    - check response code
- stress test per process
    - `while true; do curl http://localhost; done`
    - hpa
        - when do switching, connection is waiting?
    - how to destroy one pod
    - recovery time in replicaset
- image to rollup, rollback
- ci/cd

Spinnaker - build tool
Envoy - proxy, c/b, network tool

- [ ] image size is matter for performance?

1. build image
    - `docker build shdkej/imagename:tag .`
    - `docker login`
    - `docker push shdkej/imagename:tag`
3. deployment, service
    - `kubectl apply -f file.yml`
4. test
    - `kubectl run -it curl --image=radial/busyboxplus:curl `
    - `curl http://deploy-name:port`
1. port forward
    - `kubectl port-forward svc/svc-name 8080:8080`
2. client run
3. check some signal
4. report how many success is

case 1. normal string output check - 100000 user
    - for 10000 -> 24s
    - for 100000 -> 1m30s
    - goroutine 100000
        - server can't accept
case 2. stream output check


파드하나에 접속량을 몰아서 뻣는 경우 테스트
노드 하나에 몰아서 테스트
전체에 영향가게 테스트
api서버가 어떻게 부하를 받는지 확인


## Plugin
#### helm k3s Kubernetes cluster unreachable error
set `export KUBECONFIG=/etc/rancher/k3s/k3s.yaml`
https://github.com/rancher/k3s/issues/1126

#### eks vs ec2 autoscale and setting kubernetes vs kubernetes hpa

#### container serverless
- knative, lstio, open-faas

#### k3s
- token `/var/lib/rancher/k3s/server/node-token`
- join
    - `curl -sfL http://get.k3s.io | K3S_URL=https://192.168.0.50:6443 \ K3S_TOKEN=join_token_we_copied_earlier sh -`
- connect remotly
    - `scp root@ip:/etc/rancher/k3s/k3s.yaml ~/.kube/config`
    - replace 127.0.0.1 -> remote ip

#### k3s monitoring
- `kubectl apply -k github.com/premist/k3s-kube-prometheus/setup`
- `kubectl apply -k github.com/premist/k3s-kube-prometheus`

#### k3s helm
! Kubernetes cluster unreachable
- `export KUBECONFIG=/etc/rancher/k3s/k3s.yaml`
- or `kubectl config view --raw >~/.kube/config`

#### k3s connect remotely to the cluster
```
mkdir ~/.kube
scp <user@ip>:/etc/rancher/k3s/k3s.yaml ~/.kube/config
sed -i '' 's/127\.0\.0\.1/192\.168\.0\.22/g' ~/.kube/config
```

#### helm
chart.yml
value.yml
templates/
charts/

install `helm install <name> <chart>`
상태 보기 `helm status <name>`
업그레이드 `helm upgrade -f <value.yml> <name> <folder>`
지우기 `helm del <name>`

#### helm install from local
`helm install <name> <directory> --values <values.yaml>`
or just setting key
`helm install <name> <directory> --set <key=value,key2=value2>`

#### turn on and access to grafana in kubernetes nodes
- build kubernetes setup -- vagrant
- access nginx from just node
    - `kubectl create deployment --image nginx my-nginx`
    - `kubectl expose deployment my-nginx --port=80 --type=LoadBalancer`
- access from master node
- deploy grafana
- add kubernetes monitoring script

#### kubernetes load balancer
metallb

#### kubernetes network service test
istio
consul
load balancer

#### kubernetes tool
chaos-mesh
spinnaker
knative

#### deploy
deploy spinnaker

kubernetes는 github에서 돌아가야 한다. 근데 로컬에서도 똑같이 할 수 있어야 한다
github action에 종속되지 않고 CI를 하려면 스크립트를 호출하는 방식으로 해야하나
github action server와 비슷한 서버를 만들어서 에러 시 리다이렉트 해야하나
jenkins는 자체 서버를 돌리니까 이를 이용해야 하나

#### 인프라 관련 툴과 서비스 관련 툴을 분리하면 좋을 것 같다
- 모니터링, 로깅,
- 보안, 리버스 프록시
- 실제 로직 구동 앱
- 미들웨어(카프카)

#### 쿠버네티스 네임스페이스를 어떻게 분리할까
지금 istio, argocd, monitoring으로 나눠져있는데
그러면 monitoring에서 다른 네임스페이스를 참조할 수 있나?

production 과 development로 나누면 똑같은 파일로 두번 apply하면 되나?

#### kubernetes local image 사용하기
- `image` 밑에 `imagePullPolicy`를 `Never`로 설정한다
- minikube 사용 시 `eval $(minikube -p minikube docker-env)` 입력
- docker image를 새로 빌드해야한다.

#### RBAC
role-based access control
matching user - role

- ServiceAccount
- Role
- RoleBinding
- ClusterRole
- ClusterRoleBinding

Role과 ClusterRole의 차이
- Role은 네임스페이스 하나에만 할당되고 ClusterRole은 여러개가 되며, 허용범위가
  넓다.
- Cluster라 함은 Master와 Node의 범위다.

service account 생성
```
kind: ServiceAccount
metadata:
  name: developer1
  namespace: team1
```

허용할 api와 리소스, 명령어를 지정해준다
```
kind: Role
metadata:
  ...
rules:
- apiGroups: ['', 'apps']
  resources: ['pods', 'deployment']
  verbs: ['get', 'list']
```

롤 바인딩 파일에서 서비스 어카운트와 롤을 매칭해준다
```
kind: RoleBinding
metadata:
  ...
subjects:
- kind: ServiceAccount
  name: developer1
  apiGroup: ""
roleRef:
  kind: Role
  name: role-dev
  apiGroup: rbac.authorization.k8s.io
```

#### argocd
```
# kubernetes에 argocd 올리기
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'
## port 확인하거나 port-forward 해서 접속 가능


# 로그인이나 클라이언트 명령 처리 시 클라이언트 툴 설치
VERSION=$(curl --silent "https://api.github.com/repos/argoproj/argo-cd/releases/latest" | grep '"tag_name"' | sed -E 's/.*"([^"]+)".*/\1/')
curl -sSL -o /usr/local/bin/argocd https://github.com/argoproj/argo-cd/releases/download/$VERSION/argocd-linux-amd64
chmod +x /usr/local/bin/argocd

# 로그인 후 비밀번호 변경 (기본값은 파드 이름)
export ARGOCD_PASSWORD=`kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-server -o name | cut -d'/' -f 2`
argocd login <ARGOCD_SERVER>
argocd account update-password
```
```
echo "test1"
echo "test2"
echo "test3"
```

argocd 에서 helm 이용하기 `argocd app set <name> --values <value.yml>`

#### kubernetes monitoring
https://gruuuuu.github.io/cloud/monitoring-02/#
1. cluster role
2. configmap
3. prometheus deployment
4. node exporter daemonset & service
5. prometheus service

configmap... 필요한건가

#### istio
하나의 팟 관리를 위해 각 팟마다 관리용 팟을 생성하는 사이드카 패턴을 이용해서 각 서비스를 관리
관리용 팟이 들어오고 나가는 네트워크를 모두 처리함으로써 로깅, 모니터링,
디스커버리 모두 가능해진다
- 리소스 사용이 2배가 되겠네?
    - 경량 프록시라서 리소스가 2배는 아니다
- envoy를 이용해 프록시를 한다
- 파일럿을 통해 디스커버리, 로드밸런싱
- 시타델을 이용해 인증서, 키 관리

서비스 메시가 있으면 서비스는 통신에 신경 쓸 필요가 없나?
- 통신은 메시지로 하고, 서비스 통신의 프록시를 해준다

istio 자체의 gateway를 이용해 라우팅 할 수 있다

#### istio 설치
```
curl -L https://istio.io/downloadIstio | sh -
cd istio-1.9.0
export PATH=$PWD/bin:$PATH
istioctl install --set profile=demo -y
```

side inject enable
```
kubectl label namespace default istio-injection=enabled
kubectl label namespace istio-system istio-injection=enabled
```
apply bookinfo
apply bookinfo-gateway
apply grafana, prometheus

```
export INGRESS_HOST=$(minikube ip)
export INGRESS_PORT=$(kubectl get svc istio-ingressgateway -n istio-system \
                    -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}')
export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT
```

- bookinfo 가 과부하를 일으킨다

#### istio routing /, /tag, /tag/:tag 값 적용시키기
- httpbin 이라는 서비스로 istio가 예제를 제공해주고 있다.
- 이걸로 테스트하니까 match로 지정해주지 않아도 하위 url도 다 전달해준다.
- 여기에 ingress를 달아주니까 주소기반으로 라우팅도 된다.
    - 같은 호스트로 인그레스를 달아주니까 두 서비스를 섞어서 라우팅해준다
- ingress에서 path를 /header로 지정해주면 /header로 찾아간다
    - 주소를 /v2로 해놓았을 때 v2라는 주소가 없으면 루트로 찾아가나?
        - /, /aaa가 설정되있으면 /ccc를 넣어도 / 가 있어서 /로 인식한다
    - whoami 서비스는 이상한 주소로 넣어도 다 받아주고, httpbin은 url
      못찾는다는 에러를 준다.
    - ingress에서 지정해주는 주소가 루트로 인식하는 줄 알았는데, 그게 아니라
      매칭을 해주는거였다.
        - traefik에서는 원하는 주소를 넣을 수 있어서 헷갈렸던 것 같다.
- ingress에서 여러 주소를 한 서비스에 넣으려면 콤마(,)로 구분하면 된다

#### knative istio
- before use knative, install istio first.

#### spinnaker
spinnaker 설치를 halyard를 통해서 해야 한다
```
mkdir -p ~/.hal/kube
cp ~/.kube/config ~/.hal/kube/config
chmod 755 ~/.hal/kube/config

docker run -p 8084:8084 -p 9000:9000 \
    --name halyard --rm \
    -v ~/.hal:/home/spinnaker/.hal \
    -it \
    us-docker.pkg.dev/spinnaker-community/docker/halyard:stable

docker exec -it halyard bash

### initial in container
$ source <(hal --print-bash-completion)
$ hal config provider kubernetes enable
$ hal config provider kubernetes account add <my-account> \
    --context $(kubectl config current-context)
$ hal config features edit --artifacts true
$ hal config deploy edit --type distributed --acount-name <my-account>
```

set persistent store
- we will use minio, why?
install minio
```
helm install minio -n spinnaker \
    --set accessKey=<access_key> \
    --set secretKey=<secret_key> \
    stable/minio
```

spinnaker deploy
```
$ hal deploy apply
! failed check for namespace/spinnaker is null
> kubectl get pod >> error >> no search file or directory '/home/sh/.minikube/'
>> cp -r ~/.minikube ~/.hal/

### open access ip
kubectl edit svc spin-deck -n spinnaker
# edit ClusterIP to NodePort,
# add nodePort: 30900

kubectl edit svc spin-gate -n spinnaker
# edit ClusterIP to NodePort,
# add nodePort: 30808

$ hal config security ui edit \
    --override-base-url "http://<HOST_IP>:30900"
$ hal config security api edit \
    --override-base-url "http://<HOST_IP>:30808"
$ hal deploy apply
```

connect to '<HOST_IP>:30900' in browser

#### kubernetes를 쓰면서 쉽게 실수하는 10가지
1. 리소스 설정 (cpu, memory)
2. 헬스 체크(liveness, readiness)의 차이에 따른 사용
3. 모든 서비스에 로드밸런서 달아버리는 것
4. 쿠버네티스가 모르는 자동확장(?)
5. 권한 관리 부재
6. Anti Affinity 설정(pod가 node에 분산해서 실행하지 않으므로 명시적 설정 필요)
7. PodDisruptionBudget 설정(pod 최소필요량(minAvailable))
8. 클러스터 공유(네임스페이스는 환경 분리가 안되므로 차라리 클러스터를 나눠라)
9. `externalTrafficPolicy: Cluster` 설정은 네트워크 지연을 일으킬 수 있다
10. 클러스터를 애완동물처럼 다루기 + 마스터에 너무 큰 부하주는 것
11. +1. latest tag 사용하는 것
- https://coffeewhale.com/kubernetes/mistake/2020/11/29/mistake-10/

#### kubernetes in VCNC
상용 kubernetes를 위한 추가 도구

ingress - ingress controller
- nginx vs aws nlb
- Class ELB는 동시에 많은 연결을 처리하려면 웜업이 필요하다
- nlb는 gRPC를 지원하지 않는다.
- 트래픽 흐름: NLB - NodePort - NGINX ingress controller - service
    - 외부 로드밸런서를 추가하는 것이 클러스터 오토스케일러를 추가하는 것처럼
      불가피한 것일까

AWS IAM을 사용하기 위해 kube2iam 사용 (19년 03월) -> EKS에서는 지원될 듯

로그
- fluentd를 daemonset으로 노드마다 실행해서 cloudwatch로 전송
- https://github.com/fluent/fluentd-kubernetes-daemonset

모니터링

https://engineering.vcnc.co.kr/2019/03/kubernetes-on-aws/

#### eks 참고사항
쿠버네티스 버전 업 시 전체 노드 새로 올린다?

EKS의 파드들이 IAM을 인증받는 방법은?
- kube2iam

EKS에서는 워커 노드 당 Pod 개수 제한이 있다 - flannel을 쓰면 해결되지만 기본은
제약이 있다.

ECS, fargate, lambda 차이는?
- Fargate: 서버리스 컨테이너

AZ, multi region도 지원해주나?

네트워크 구조
- Region - VPC(논리적) - subnet - AZ - route table - Security groups -
- vpc, subnet, route table 각각 cidr을 설정 가능하다?

nginx-ingress deprecate 됐고, ingress-nginx를 쓰게 된다.

eks에서도 kubernetes metrics-server를 통해서 오토스케일링 조절하나?
- cluster autoscaler라는게 있다

부하 테스트
`ab -c 200 -n 200 -t 30 http://$(kubectl get ingress/backend-ingress -o jsonpath='{.status.loadBalancer.ingress[*].hostname}')/contents/aws`

- [ ] provider "kubernetes"는 뭐지

#### 배포 후 롤백 테스트
지금 서버에 버전 두 개 만들어서 올리고 배포 후, 테스트하고 롤백하는 것 10초 컷
gif로 만들어보기

```
docker build -t <image:tag> .
docker push <image:tag>
kubectl set image deployment/<name> <name>=<image:tag> --record
kubectl rollout history deployment/<name>
```

띄워져 있어야하는 팟 개수 / 현재 개수 확인 바로 할 수 있는 방법은?
- `kubectl get deploy -A`

카오스 툴 띄워서 회복 잘 하는지 테스트
- 동작안함..ㅠㅠ

#### helm을 안쓰고 kubernetes로 가변적인 배포를 쉽게 할 수 없을까
helm에 install --values도 values 파일을 작성해야하는데, 이러면 그냥 kubernetes
snippet으로 만들어도 큰 차이는 없을 것 같다...
괜히 helm을 안깔아도 될 것 같은데

gist에 파일을 올려놓고, 설정파일에 이름을 넣어서 이름 확인해서 어떤 gist를
가져올지만 정해서 불러와서 실행시키면 되겠다.
gitkube라는 서비스도 있다. kubernetes 안에다가 리소스를 만들어놓고 감시하는
컨셉이다

이제 세부적인 설정이 필요해지면 어떻게 수정하지

#### 클러스터 네임스페이스 컨텍스트
- 컨텍스트 안에 클러스터, 사용자, 네임스페이스가 있음
- $KUBECONFIG 에 새로 생성한 config 파일을 넣으면 --kubeconfig config-demo 명령어를 안쳐줘도 됨

```bash
source <(kubectl completion zsh)  # 현재 셸에 zsh의 자동 완성 설정
echo '[[ $commands[kubectl] ]] && source <(kubectl completion zsh)' >> ~/.zshrc # 자동 완성을 zsh 셸에 영구적으로 추가한다.
```

##### 새로운 유저로 get pod 하기
- 인증서 등록
- config-demo 만들기
- role 만들기
- roleBinding 만들기
- CSR 만들기
- 인증서 approve 하기
- auth can-i 실행해서 확인

##### 인증서 재설정 필요
minikube 재시작 후 서버 포트 변경됨
- minikube context에서
- `openssl genrsa -out developer.key 2048`
- `openssl req -new -key developer.key -out developer.csr -subj "/CN=developer"`
- `k apply CSR.yaml`
- `k certificate approve developer`
- `k auth can-i list pods --as developer`

-----------------------------------------------------------------------

## Kubernetes External Library Installation
#### 설치
- `curl -s https://packages.cloude.google.com/apt/doc/apt-key.gpg | apt-key add -`
- `/etc/apt/sources.list.d/kubernetes.list` 파일에
  - `deb https://apt.kubernetes.io/ kubernetes-xenial main` 입력
- `apt-get update && apt-get install -y apt-transport-https curl`
- `apt-get install kubelet kubeadm kubectl`
- `sudo swapoff -a`
- `sed -i '9s/^/Environment="KUBELET_EXTRA_ARGS=--fail-swap-on=false"\n/' /etc/systemd/system/kubelet.service.d/10-kubeadm.conf`
- `sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab`

초기화
- `kubeadm init --pod-network-cidr=10.244.0.0/16 --ignore-preflight-errors Swap`

네트워크 설치
- flannel
  - `kubectl apply -f https://github.com/coreos/flannel/raw/master/Documentation/kube-flannel.yml`
- calico
  - `kubectl apply -f https://docs.projectcalico.org/v3.10/manifests/calico.yaml`
- weave
  - `kubectl apply -f "[https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')](https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n'))"`

flannel 설치 시 coredns 안붙음.
calico로 설치
https://docs.projectcalico.org/v3.10/getting-started/kubernetes/

Slave node 접속
- `kubeadm join 192.168.0.3:6443 --token 8nt7ze.bm7pa8pi3t1jgr70\ --discovery-token-ca-cert-hash  sha256:4337d62bce67b7ebf55466da74dfa8deb7cda3632ce5054bcc24b1fe3fcf2bff`

token 생성 및 확인
- `kubeadm token create`
- `openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | openssl dgst -sha256 -hex | sed 's/^.* //'`

Node 제거
- `kubectl delete node <node-name>`

Master reset
- `kubeadm reset`

scale 늘리기
- `kubectl scale deploy <deploy_name> --replicas=10`

#### helm
kubernetes package manager

`curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get | cat > /tmp/helm_script.sh \ && chmod 755 /tmp/helm_script.sh && /tmp/helm_script.sh --version v2.8.2 helm init --upgrade`
출처: <https://sktelecom-oslab.github.io/Virtualization-Software-Lab/Helm/>

- `kubectl create serviceaccount --namespace kube-system tiller`
- `kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller`
- `helm init --service-account tiller --upgrade`
- `helm update repo`
- `helm install stable/redis --version 3.3.5`

repo 추가
- `helm repo add stable https://kubernetes-charts.storage.googleapis.com/`
출처: <https://stackoverflow.com/questions/43499971/helm-error-no-available-release-name-found>

helm init
- search
- install
- repo update
- list
- delete

#### Kompose
docker-compose to kubernetes yaml
출처: https://kubernetes.io/docs/tasks/configure-pod-container/translate-compose-kubernetes/#build-and-push-docker-images

```
curl -L https://github.com/kubernetes/kompose/releases/download/v1.21.0/kompose-linux-amd64 -o kompose
chmod +x kompose
sudo mv ./kompose /usr/local/bin/kompose
kompose up
kompose convert
kubectl apply -f <file>
kompose down
```

#### Statefulset PV SC
Statefulset을 사용하기 위해 pv를 만들어야 하고
pv를 만들기 위해서 storageclass가 필요

storageOS 설치
출처: <https://docs.storageos.com/docs/platforms/kubernetes/install/1.10>

SC default 설정
- `kubectl patch storageclass fast -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'`
출처: <https://proinlab.com/archives/2308>

SC default 해제
- `kubectl patch storageclass <your-class-name> -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'`

glusterfs pv pvc 예제
- https://teamsmiley.github.io/2019/06/29/kubernetes-glusterfs/
- https://docs.okd.io/latest/install_config/storage_examples/gluster_example.html


#### glusterfs 설치
gfs1, gfs2 라는 서버가 있다고 하자.
- 양쪽 서버에서 /etc/hosts에 host 이름 둘 다 적어준다
```
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:gluster/glusterfs-5
sudo apt-get update
sudo apt install glusterfs-server
sudo ufw allow proto any from <상대아이피> to <자신아이피>
sudo service glusterd start

sudo gluster peer probe gfs2 # gfs1에서는 gfs2를, gfs2에서는 gfs1을 둘 다 입력
sudo mkdir -p /gluster/fs
sudo gluster volume create vol replica 2 transport tcp gfs1:/gluster/fs gfs2:/gluster/fs force
# (루트 파티션에는 볼륨 설정 안하기를 권하고 있으나 강제로 가능)

sudo gluster volume start vol
sudo mkdir -p /mnt/gluster
sudo mount -t glusterfs <자신아이피>:/vol <마운트할 폴더> # (양쪽 서버에서 실행)
```
- /gluster/fs/ 는 파일 저장되는 공간
- /mnt/gluster 는 마운트 시켜서 사용하는 공간

/etc/fstab에 추가
- `gfs1:/vol /mnt/gluster glusterfs defaults,_netdev 0 0`

peer 추가 시
- `gluster volume add-brick glus_vol gluster5:/data1/gluster gluster6:/data1/gluster`
출처: <http://junhyung2.blogspot.com/2014/12/7-glusterfs.html>

volume 삭제
- `gluster volume remove-brick vol_dist vmlnx005:/data`
출처: <http://blog.syszone.co.kr/3038>

Glusterfs 로 data volume 구성.
볼륨형태
- Replication : 완전 복제
- Distributed : 분산 저장, 파일별로 분산
- Striped     : 완전 분산 저장, 하나의 파일도 분산, I/O 성능 향상, 하나의 서버가 죽으면 파일 유실

Volume2가 꺼졌다가 켜지면 동기화가 어떻게 되는지?

목표
- 스웜으로 두개를 킨 후 하나의 서버를 종료 시켜도 접속 가능하게
- DB 컨테이너 생성 시 볼륨을 시킨다

[[Troubleshooting#kubernetes]]
