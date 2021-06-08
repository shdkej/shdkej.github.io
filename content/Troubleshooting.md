---
title   : Trouble Shooting
summary :
date    : 2020-06-23 22:39:25 +0100
updated : 2021-06-03 19:06:11 +0900
tags    :
---

# Disclaimer
This page has a lot of different area's problem. \
You should search your specific trouble with `Ctrl+F`.

#### jupyter notebook
- install not working
 - `pip3 install jupyter` -> jupyter notebook not working
 - `sudo apt-get install jupyter-notebook` done
- ! tensorflow numpy version
 - pip install "nump<<1.17"
 - https://github.com/tensorflow/tensorflow/issues/30427

#### linux wifi hard blocked after suspend(lid off)
- `/etc/default/grub`
  - `GRUB_CMDLINE_LINUX_DEFAULT="acpi_osi=! acpi_osi='Windows 2009' quiet splash"`
- `sudo grub-mkconfig -o /boot/grub/grub.cfg`
- https://www.reddit.com/r/MSILaptops/comments/8vk878/ubuntu_wifi_hardware_disabled_after_suspend/e2t1f67/

#### raspberry pi network TODO
- can't connect wifi
- seem to be a hardware problem, when I used to a raspbian occurred the same problem.
 cannot access wifi before connecting ethernet

#### vagrant coreos
- clone
- assign etcd url
- user-data setting
- config setting
- http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter15/02
- ! vagrant-iginition version with fog-core
 - `wget -c https://releases.hashicorp.com/vagrant/2.0.3/vagrant_2.0.3_x86_64.deb`
 - `sudo dpkg -i vagrant_2.0.3_x86_64.deb`
 - conflicting dependencies fog-core (~> 1.43.0) and fog-core (= 1.45.0)
 - https://github.com/dotless-de/vagrant-vbguest/issues/292

#### Github officially support https
- ! Unavailable for your site because your domain is not properly configured to support HTTPS
 - change dns
 - 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
 - or recreate CNAME file
  - https://github.community/t5/GitHub-Pages/The-quot-Enforce-HTTPS-quot-Button-Isn-t-Working/td-p/11050

#### vagrant
- ! uid not match
 - `rm -r .vagrant`

- If want access each other. Set private network


#### !sdcard cant recognized problem
 - `diskpart`
 - `select disk <disk number>`
 - `clean`
 - Using SDFormatter, format

#### terraform init
- ! if storage exist. but occurred error bucket doesn't exist
 - `terraform init -reconfigure`
 - https://stackoverflow.com/questions/59053993/failed-to-get-existing-workspaces-querying-cloud-storage-failed-storage-bucke

#### ! Kibana error
 - default host cannot found
  - Need elasticsearch environment docker. setting
 - elasticsearch read only problem
  - maybe hdd space not enough then lock.
 - cannot install sample

#### ansible
- how to prevent to try kubectl init twice
- ! Failed to get information on remote file (./join-command): sudo: a password is required
  - `become: false`
- ! E:Malformed entry 1 in list file /etc/apt/sources.list.d/kubernetes.list.list (Component), E:The list of sources could not be read
 - repo: deb https://apt.kubernetes.io/ kubernetes-xenial main
 - space bar check...

- ! Vagrant access
    - /etc/ansible/hosts
    `<ip> ansible_user <> ansible_pass <password>`
    - apt install sshpass
- ! Install denied
    ```
    # Ansible_book.yml
    become: true
    become_method: sudo
    ```
- Install docker

#### ubuntu bluetooth multiple device connect problem TODO
- https://www.martinrosselle.com/bluetooth-connectivity-issues-on-ubuntu-and-how-to-fix/
 - fail

#### my server terraform GCP AWS
- Letsencrypt need IP test, it means I need to change DNS before server change
- Letsencrypt
 - ! failed authorization procedure
  - my mistake. my DNS to set to Cloudflare

- ! Github page build failed
 - site directory some problem -- nono
 - tags file don't allow -- delete tags file (ctags file by gutentags)

#### Jenkins
- ! when plugin install occurred ioexception error
 - image `jenkins` -> `jenkins/jenkins`
 - https://github.com/jenkinsci/docker/issues/785
- make easy pipeline
- github -> jenkins -> docker
- use http? and ssh?

#### AWS API
- Error: Error creating API Gateway Integration: BadRequestException: Invalid HTTP endpoint specified for URI
 - `""` delete
- Error: Error creating API Gateway Method: ConflictException: Method already exists for this resource
 - https://learn.hashicorp.com/terraform/aws/lambda-api-gateway
- {"message":"Missing Authentication Token"}
 - need aws signature
 - https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-use-postman-to-call-api.html

- ! API cannot access
 - using `{proxy+}` all access
 - but root access need more method, integration
- ! lambda update
 - need s3 to recreate
- ! s3 notification access fail
 - SNS topic policy name. I had change s3 bucket name, need to change policy

#### grafana prometheus
- prometheus not working
- ! err="opening storage failed: found unsequential head chunk files 194 and 257"
 - prometheus docker-compose cannot volume folder, need each file

#### gatsby troubleshooting
- ! WebpackError: Minified React error #130; visit https://reactjs.org/docs/error-decoder.html?invariant=1 30&args[]=object&args[]= for the full message or use the non-minified dev environment for full errors and additional helpful warnings.
 - gatsby-ssr.js problem

#### WSL REACT
docker compose volume 안되는 현상
ln -s /mnt/c /c
cp -R myproject /c/Users/myproject
permission deny
/etc/wsl.conf
`enabled = true \ options = 'metadata,umask=22,fmask=11'`
[https://github.com/docker/for-win/issues/2151](https://github.com/docker/for-win/issues/2151)
server nodemon error
Dockerfile에 막아뒀던 copy를 안풀었음3000 포트로 접속 안됨
vm에서 포트포워딩 해줘야 함
또는 docker ip로 접속 (192.168.99.100)
server로 접속 시 에러
버튼 누르면 동작

#### 이클립스
점 찍어서 자동으로 안뜨면
Window-preferences-java-editor-content assist-advanced-java proposals 활성화

#### python lambda korean broken
- sns -> lambda -> sqs -> lambda2
- sns -> lambda ok
- lambda ok
- lambda -> sqs (?)
 - lambda log in cloudwatch
 - yes, this send unicode.
 - when it sends sqs. ascii broken
 - problem in receive list -> convert string
  - receive body is string, so I've tried string split, but it need json dump
- sqs -> lambda2 ok (send message test ok)
- lambda2 ok (korean input test ok)

#### ! wasm rack
- if i want to add package (ex. grpc, aws-cli), go wasm not working. cpu over
 usage and freezing.

#### vimwiki
- tag
 - ! `[[ ctrl+x ctrl+o` enter not working, instead using `ctrl+o,n`
- wiki autocomplete enter not working
 - shift+enter working
- previous link get
 - `nnoremap <leader>l i<c-r>="[" . expand("#") . "]" . "(./" . expand("#") . ")"<cr><esc>`
 - https://www.reddit.com/r/vim/comments/f5gi2g/vim_notetaking_automatic_link_creation_between/
- omnicomplete(autocomplete) enter not working
- instead using `<S-CR>`
- Down arrow select content
 - `:inoremap <Down> <C-R>=pumvisible() ? "\<lt>C-N>" : "\<lt>Down>"<CR>`

#### ! docker 실행 안될 시 hypervisor 끄기
- `bcdedit /set hypervisorlaunchtype off`
- 파워셀에서 명령어를 실행해야 하고 관리자 모드여야 한다

#### ! Docker wsl <-> window 통신 하려면 추가 필요
```
export DOCKER_HOST=tcp://192.168.99.100:2376
export DOCKER_TLS_VERIFY=1
export DOCKER_CERT_PATH="/mnt/c/Users/shdke/.docker/machine/machines/default"
export DOCKER_MACHINE_NAME="default"
export COMPOSE_CONVERT_WINDOWS_PATHS="true"
```

#### ! GitHub Pages is temporarily down for maintenance.
it's really just temporarily down

#### ! docker 8080 cannot access
- docker-compose command go run server.go --> run is ok. but can't connect
- different command and run server.go in docker --> run and connect ok

#### ! golang test not working
package name
folder
go env
gopath
- `import . "."` problem

#### ! chsh -s not working
 - don't need sudo. but need password.

#### ! git - error: ref does not point to a valid object
```
git for-each-ref --format="%(refname)" | while read ref; do
    git show-ref --quiet --verify $ref 2>/dev/null || git update-ref -d $ref
done
```
from https://stackoverflow.com/questions/6265502/getting-rid-of-does-not-point-to-a-valid-object-for-an-old-git-branch

#### go
- ! vim-go binary install failed, could not find 'golangci-lint'
    - golangci not support go get
- disable lint check
- ! could not find gopls -> reinstall gopls
- wasm function not defined
    - cache clear

## keyboard setting was initialized in zshrc sometimes
is it sudo's problem? no
when timeshift run, it's initialized

## npm global permission denied
```
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
```

#### docker로 클라이언트 테스트
172.17.0.1로 통신하면 로컬호스트로 되는데 포트 통신이 안된다.
- `--net="host"` 옵션을 run 시에 넣어준다
- `docker run --net="host" alpine sh`
- https://stackoverflow.com/questions/31324981/how-to-access-host-port-from-docker-container

! alpine에 go binary 실행 안되는 문제
- `CGO_ENABLED=0 go build client.go`
- 또는 `-tags static netgo` 를 넣어준다

#### go grpc
`protoc --go_out=. *.proto` 기본 proto 파일을 이용해 grpc 코드를 생성하는 방법
근데 이렇게만 하면 에러가 난다
proto 파일에 `option go_package = "<grpc package 경로>"` 입력해주고,
명령어에 `--go_opt=paths=source_relative` 붙여줘야 한다.
opt 안붙이면 경로를 현재 폴더 기준에서 새로 생성해버린다

## kubernetes
! kubernetes 접근이 안된다. api 서버가 나간건지, 서버 자체가 문제가
  있는건지 확인해야겠다. ssh 접속이 안된다.
- do 관리창에 서버 cpu, memory 상태는 계속 잘 출력되고 있다.
- 관리창에서 콘솔로 접근하니 outofmemory 에러가 떠있다.
    - 로그를 추가로 확인하는 방법을 찾아봐야겠다.
    - aws, gcp에서는 cloudwatch, stack driver가 에러를 보여준다
    - digital ocean도 모니터링 서비스가 있다.
- **outofmemory에 대해**
    - out of memory가 발생하면 메모리 확보를 위해 프로세스를 killing하는데,
      이 작업은 프로세스 생성시간, 메모리 사용량, 우선순위를 확인해서
      제거한다
      - https://medium.com/@EJSohn/out-of-memory-killer-%ED%9A%8C%ED%94%BC%ED%95%98%EA%B8%B0-9efc65f88c92
- **linux 시스템 log 확인 방법**
    - 어떤 자원이 메모리를 많이 먹었는지 확인
    - /var/log/syslog
    - dmesg - 부팅하는 동안의 메시지
- 일단 쿠버네티스 자원들을 제거해야겠는데, api server가 접속이 안되는데
  어떻게 정지시킬 수 있지?
    - 쿠버네티스 자체를 정지하는 방법. (정지 후 빨리 접속해서 다 딜리트 시킨다)
        - master
            - kube-apiserver
            - kube-scheduler
            - kube-controller
            - kubelet
            - kube-proxy
        - node
            - kubelet
            - kube-proxy
    - 마스터를 껐다 켜서 api server를 다시 돌게 할 수 있다
- k3s 서버를 찾아야하고, k3s 를 꺼도 다시 켜진다...
    - k3s kill all script가 k3s 설치 시 깔린다. `/usr/local/bin/k3s-killall.sh`
- kubernetes가 메모리를 많이 차지하는 것은 맞는데, 그러면 어떻게 해야하나
- 어떤 리소스가 많이 썼는지를 확인해야 한다.
    - `kubectl top pod --all-namespaces`
- istio monitoring을 위해 모니터링 서비스를 너무 많이 킨게 문제였던 것으로
  보인다. promethus가 메모리를 많이 사용한다.
  - argocd를 삭제해서 여유가 생긴 것도 있어서 argocd가 사용한 양이 얼만지
    확인해봐야겠다.
    - 메모리를 사용한 로그가 있나?
        - 메모리 자원 같은 로그를 남기려면 트래킹하는 서비스를 이용해야한다.
    - describe로 확인하려면 없애지 말았어야 한다.
- [X] node-1 이 unknown 상태다. 확인 필요
    - describe node 로 확인
    - cpu 사용량이 과도했다. 리부팅을 하면 되나? 리부팅 하지 않아도 살릴
      방법을 찾아야 한다.
        - `systemctl daemon-reload`, `systemctl restart kubelet` 실행할 수 있다
    - kubelet 의 로그를 확인해 볼 수 있다
        - `journalctl -u kubelet`

#### kubernetes ingress TODO
- ! `external-ip <pending> lock`

#### kubernetes helm
- cannot connect traefik dashboard in vagrant
- ! Error: unknown flag: --service-account
 - tiller was removed helm version 3

#### kubernetes execute tty
- ! Error from server: no preferred addresses found; known addresses: []

#### Trouble Shooting
재설치
```
kubeadm reset
systemctl stop kubelet
systemctl stop docker
rm -rf /var/lib/cni/
rm -rf /var/lib/kubelet/*
rm -rf /etc/cni/
ifconfig cni0 down
ifconfig flannel.1 down
ifconfig docker0 down
ip link delete cni0
ip link delete flannel.1
```

마스터 IP 변경되어 재설정
- `/etc/kubernetes` 및 관련 디렉토리 삭제
- `kubeadm reset`

마스터 IP 변경 시 삭제 후 실행했는데 IP 못 찾는 경우 발생
- `mkdir -p $HOME/.kube`
- `sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config`
- `sudo chown $(id -u):$(id -g) $HOME/.kube/config`
출처: <https://github.com/kubernetes/kubernetes/issues/50295>

kubectl get 시 connection refuse
- init 시 connection refuse

미니큐브 삭제
```
minikube stop
minikube delete
docker stop (docker ps -aq)
rm -r ~/.kube ~/.minikube
sudo rm /usr/local/bin/localkube /usr/local/bin/minikube
systemctl stop 'kubelet.mount'
sudo rm -rf /etc/kubernetes/
docker system prune -af --volumes
```
출처: <https://github.com/kubernetes/minikube/issues/1043>

connection refuse 8080
- `sudo cp /etc/kubernetes/admin.conf $HOME/`
- `sudo chown $(id -u):$(id -g) $HOME/admin.conf`
- `export KUBECONFIG=$HOME/admin.conf`
출처: <https://github.com/kubernetes/kubernetes/issues/44665>

connection refuse 6443
- `sudo -i`
- `swapoff -a`
- exit
- `strace -eopenat kubectl version`
켜지는 시간 걸린 거였음
출처: <https://discuss.kubernetes.io/t/the-connection-to-the-server-host-6443-was-refused-did-you-specify-the-right-host-or-port/552/4>

connection refuse 10248
- `kubeadm reset`
- add `Environment="KUBELET_EXTRA_ARGS=--fail-swap-on=false"` to
  `/etc/systemd/system/kubelet.service.d/10-kubeadm.conf`
- `systemctl daemon-reload`
- `systemctl restart kubelet`
- `kubeadm init`
출처: <https://github.com/kubernetes/kubernetes/issues/53333>


[WARNING IsDockerSystemdCheck]: detected "cgroupfs" as the Docker cgroup driver. The recommended driver is "systemd". Please follow the guide at [https://kubernetes.io/docs/setup/cri/](https://kubernetes.io/docs/setup/cri/"

port 10250 in use
- node에서도 kubeadm reset 을 해줘야 한다

mount fail 발생
- path를 맞게 안해줬다

apply 해줘야 새로 할당된 자원을 잡음

pod 이름 검색 쉽게하는법

실시간으로 올라가는거 확인
- `watch kubectl get pods --all-namespaces`
출처: <https://docs.projectcalico.org/v3.10/getting-started/kubernetes/>

네트워크 연결이 이상함
flannel과 weave가 겹친것 때문인지..
reset 해본다

coredns 연결 안됨
- flannel 에서 안됨 > 재설치 후 weave 사용

db 생성이 안됨
- 3서버에 glusterfs 설치

kubernetes에서 deployment로 만든 pod 에서 image가 이상한 곳에서 불러짐
이미지를 삭제하고 다시 만들었더니 이미지를 다른 곳에서 불러옴

웹 연결 안되는 현상
- 일단 오픈된 서버에서 앱으로는 들어가진다
- web과 db가 연결이 안된다
  - label 추가
  - app.kubernetes.io/part-of:<name> 를 전체에 추가

db 레플리카를 두개로 하면 데이터는 어떻게 되는가
replica 2로 하고 접속 시 db와 연결 안됨

web db 연결 안됨
- selector 설정함
- selector , template.metadata.lables.app 이 같아야 함

노드 NotReady
노드 리셋했다

web 접속 시 the database system is starting up
db 데이터 손상 재설치..

노드 추가 후 기존 노드에 있는 POD 옮기기
- kubectl cordon     <node-name>

노드에 포드 할당 안하도록 설정
- kubectl drain
- 안됨.. 기존 노드 삭제 했음

docker pull 안될 시
- 고정 ip 설정 시 dns 설정 안한 것이 원인 `dns-nameservers 8.8.8.8`


한번에 한 서버에만 들어가야 하는데 두 서버에 분산해서 신호가 들어간다
블루-그린 배포를 하면 해결은 되겠지만 롤링 업데이트를 테스트 해봐야 한다

내용 편집 중에 업데이트가 실행되어 서버가 옮겨지면 불안정하지 않은가?

블루-그린 배포시 배포하는 위치를 신경써야 하나?

filestore 도 공유가 되어야 한다
- 볼륨 되는 방식 확인

postgresql/data - kubernetes/postgres

새로 만들 때는 포드 안의 데이터가 밖으로 나오는 것인가
새로 만들 때도 기존 데이터가 포드안에 들어가는 것인가
새로운 포드를 만들면 기존 데이터가 붙는 것인가
새로운 포드에서 데이터를 지우면 기존의 데이터가 없어지는 것인가
상위 폴더 하위 폴더 영향이 있는가
- odoo/filestore, odoo/session 이 필요하면 odoo만 가져오면 되는가 두개를 다 명시해 줘야 하는가

- 권한 설정 해줘야 한다
root로 실행하거나 `runAsUser: 0`
파일을 odoo 에게 권한을 주거나 `chown odoo:odoo`

2 서버가 다운되면 1서버로 들어가져야 한다

재부팅 후 node 가 NotReady 상태가 됨
swapoff -a 하니까 됨

## ! Inactive registered OAuth URIs for your project
api oauth 창에서 redirect로 설정해놓은 주소들이 만료되었나보다.
현재 안쓰는 주소들이었고, 제거해줬다.

### ! golang fatal
- [X] elasticsearch가 처음 시작이 오래걸려서 서버가 커넥션을 못한다
커넥션을 못하면 서버가 중지되고 docker에 의해서 재시작 되었으면 좋겠는데
log.Fatal이 있어도 로그만 남기고 그냥 가만히 있는다
- Fatal은 되는데 docker가 정지하지 않는다
    - go run 으로 하면 도커가 꺼지지 않고, build해서 실행파일을 실행시키면 꺼진다.
