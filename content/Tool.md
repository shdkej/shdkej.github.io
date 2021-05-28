---
title   : Tool
summary :
date    : 2020-08-25 14:48:57 +0100
updated : 2020-11-24 00:57:27 +0100
tags    : deep_knowledge
---

## prometheus
- node-exporter
    - collect system metrics
- alert-manager

## TICK
- too heavy
- I want to find lightweight visualistic monitoring service
- go to prometheus

## Benchmark
1. 구글개발자도구 audits

[[Architecture]]

#### nginx alternative
- [openlitespeed](https://openlitespeed.org/)

## Container

#### docker strength
- isolation process
- no dependency
- portable
- light-weight

#### container serverless
- knative, lstio, open-faas
- heroku getting started test

#### Docker image vs compose
- image vs volume
    - test with volume, deploy with image

#### docker logs
- make stdout
 - `echo "test" >> /proc/1/fd/1`

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

#### docker compose execute bash
- `entrypoint: /bin/bash` failed
- `tty:true; stdin_open:true` success
- `docker-compose run app bash` success

## kubernetes
person has very small component, and it compose to one architecture.
the kuberetes seem to be this.
and I want to make software like this architecture.
strong small component to flexible architecture.
kubernetes makes easy to a devops works
about deploy, scaling, update, healthcheck, orchestration
but devops works is not clear.

- pods
- replicaset
- deployment
- service

- `kubectl run curl --image=radial/busyboxplus:curl -i --tty`
- pods cluster inside curl pod

- keep focusing only bisuness logic
- 1. monitoring - feedback - update logic
- 2. data management
- production deploy behavior make easy
 - update and rollback
 - scale up and down

- https://github.com/dennyzhang/cheatsheet-kubernetes-A4/blob/master/README.org
- ClusterIP vs NodePort vs Ingress
- service account?
- cluster role?
- cluster? - node
- daemon set?
 - it makes every node to make pods
 - example: every node can have logstash

#### kubernetes load balancer
metallb

#### kubernetes in different network
kubernetes network need fully connected state.
I want to connect gcp and aws instance.
how to?
how to work kubernetes network?
etcd, dns, kubeadm, kubectl,
containerd, cri-o

#### kubernetes supports cluster
- < 5000 nodes
- < 150000 pods
- < 300000 containers
- < 100 pods per node

#### kubernetes test
- [X] terraform provisioner ip can't get
- [X] join k3s node to master
- [ ] join gcp, oracle cluster to master
- [ ] ansible to remote exec

#### kubernetes test troubleshooting
- goroutine 10000 access can't accept
- if without goroutine. socket open only 1
- else. socket open a lot
    - local ulimit check, not pod's ulimit

- if deployment scale 4, service port forward to all?

- deployments fail -> check describe pods

#### test
- how to test account system?
    - check send complete
    - check response code

Spinnaker - build tool
Envoy - proxy, c/b, networkk tool

#### kubernetes
- stress test per process
    - `while true; do curl http://localhost; done`
    - hpa
        - when do switching, connection is waiting?
    - how to destroy one pod
    - recovery time in replicaset
- image to rollup, rollback
- ci/cd

#### kubernetes test
- image size is matter for performance?

1. build image
`docker build shdkej/imagename:tag .`
`docker login`
`docker push shdkej/imagename:tag`
3. deployment, service
`kubectl apply -f file.yml`
4. test
`kubectl run -it curl --image=radial/busyboxplus:curl `
`curl http://deploy-name:port`
1. port forward
`kubectl port-forward svc/svc-name 8080:8080`
2. client run
3. check some signal
4. report how many success is

case 1. normal string output check - 100000 user
    - for 10000 -> 24s
    - for 100000 -> 1m30s
    - goroutine 100000
        - server can't accept
case 2. stream output check

#### helm k3s Kubernetes cluster unreachable error
set `export KUBECONFIG=/etc/rancher/k3s/k3s.yaml`
https://github.com/rancher/k3s/issues/1126

#### eks vs ec2 autoscale and setting kubernetes vs kubernetes hpa

#### kubernetes
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

#### kompose
- `curl -L https://github.com/kubernetes/kompose/releases/download/v1.21.0/kompose-linux-amd64 -o kompose`
- `chmod +x kompose`
- `sudo mv ./kompose /usr/local/bin/kompose`

#### k3s
- token `/var/lib/rancher/k3s/server/node-token`
- join
 - `curl -sfL http://get.k3s.io | K3S_URL=https://192.168.0.50:6443 \ K3S_TOKEN=join_token_we_copied_earlier sh -`

#### knative istio
- before use knative, install istio first.
- istio install
 - istiocli `curl -L https://istio.io/downloadIstio | sh -`
 - cli in `bin/istiocli`
 - `istioctl install --set profile=demo`

## Redis
- http://highscalability.com/blog/2019/9/3/top-redis-use-cases-by-core-data-structure-types.html
- Chained Linked List에는 약점이 있습니다. 한 Bucket 안에 데이터가 많아지면 결국 탐색 속도가 느려집니다. 이를 위해서 Redis는 특정 사이즈가 넘을 때 마다 Bucket을 두 배로 확장하고, Key들을 rehash하게 됩니다.
 - https://tech.kakao.com/2016/03/11/redis-scan/

## elasticsearch
- Argument
 - cluster, node, replica
 - index
 - documents with properties
- Search
 - get
 - search(match)
 - term
 - should, must, must not
- Type
 - completion
 - keyword
 - custom
 - text
 - date
- 증분 색인

## ansible
- https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-ansible-on-ubuntu-18-04
- setting /etc/ansible/hosts
- terraform provision execute only during create

#### ansible command vs shell
command isn't running in $HOME, shell is
command can't use operations like <,>,|,&
command is more secure.
https://blog.confirm.ch/ansible-modules-shell-vs-command/

#### ansible
- ansible-galaxy
- setting `/etc/ansible/hosts` file or make hosts file with `-i`
    - it need `,`
```
[webserver]
server_ip
# <work_directory>/hosts
```
- hosts test `ansible webserver -m ping -i hosts --private-key <private-key> -u <user>`
 - https://alex.dzyoba.com/blog/terraform-ansible/
- how to connect with pub file

## Nginx letsencrypt
- DNS setting
- install letsencrypt
- `letsencrypt certonly --standalone`
- setting Nginx
- run Nginx

## terraform vs serverless
- note-reminder has terraform trigger option.
- it's not good..

## terraform
- Need update when changing a provisioner
- ! resource "null_resource" -> null
 - Do `terraform init`

- terraform taint aws_instance.example-server
 - aws_instance recreate when terraform apply
 - terraform null_resource is better then an instance make to a taint
  - https://github.com/gruntwork-io/terratest/blob/master/examples/terraform-remote-exec-example/main.tf
 - null resource need `terraform init`
- recreate instance with same eip
- !WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!
 - clear `~/.ssh/known_hosts` or recreate ssh key `ssh-keygen -R <host IP>`
 - https://www.ssh.com/ssh/keygen/
- ! aws_instance remote-exec ssh connection not working
 - user = "root" -> user = "ubuntu"
- letsencrypt -d <domain> -m <email> -n(all agree) --agree-tos
 - https://github.com/ployst/docker-letsencrypt/issues/18

- gcp metadata need ${}
 - `ssh-keys = "username:${file("<PATH>")}"`
- Event Handling with sns, sqs
- https://dev.to/frosnerd/event-handling-in-aws-using-sns-sqs-and-lambda-2ng
- lambda function to python
- save s3

- ! s3 access-denied problem
 - bucket name not allow var. I have just input text
 - var allow. but name is global. it is really name exist problem.
- ! s3_bucket_notification invalid argument
 - 1. create SNS 2.create S3 bucket 3. Policy 4. notification
 - sns - aws_iam_policy - condition - values - (bucket arn -> bucket name...)
- every apply update s3, using `etag`

#### terraform ansible
- for provision `sleep 120;` is good to waiting ec2 instance creation
- ansible-playbook to make with ip, ip + `,`
- terraform has `depends_on`

#### use module. For different folders can use once.

## serverless
- install `curl -o- -L https://slss.io/install | bash`
- !Error: spawn /home/sh/.serverless/bin/xdg-open ENOENT
 - no install xdg-open. manual install and copy to serverless/bin directory
- !"service" property is missing in serverless.yml
 - get started is sucks
 - run `serverless` for first setting

#### serverless
- python requirements
    - need install plugin serverless-python-requirements

## vault
- install file
- move bin directory

## google calendar api
1. credential.json 생성
2. `pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib`
3. 코드 실행
4. 인증
5. token.pickle 생성되고 코드 실행됨
- https://developers.google.com/calendar/quickstart/python

## nagios
Docker로 설치 후
`/opt/nagios/etc/` 설정파일 설정
- `/etc/resource` : 환경변수 설정파일
- object/Commend
- object/contacts
- object/template
- object/windows
- nagios

window 는 nsclient 설치
- 서버에서 command.cfg 파일에서 check_nt 부분 비밀번호 명시
- Telegram 연동 소스 받아서 설정

#### for docker monitoring
`chown nagios /var/run/docker.sock`

#### nagios 비밀번호 변경
- `htpasswd -c /opt/nagios/etc/htpasswd.users nagiosadmin`
- 콘솔로 비밀번호 입력
