---
title   : Tool
summary :
date    : 2020-08-25 14:48:57 +0100
updated : 2021-10-15 23:25:27 +0900
tags    : deep_knowledge
---

## prometheus
- node-exporter
    - collect system metrics
- alert-manager

#### ELK vs TICK
- ELK -- log metrics
- TICK -- system metrics
- what is prometheus, loki,

#### grafana alert
monitoring 서버도 테스트 서버용과 프로덕션 서버용을 따로 두나?

alert를 만드려면 graph여야하고, $variable 로 되있는 템플릿을 쓸 수 없다.
alert를 만들고 싶은 graph를 복사해서 variable을 고치고 사용하면 된다.

sensu는 어떤 기능들을 제공해주고 있지?

grafana daily report
- enterprise 기능이었다. 오픈소스로 구현된 것도 있을 것이다

## TICK
- too heavy
- I want to find lightweight visualistic monitoring service
- go to prometheus

## Benchmark
1. 구글개발자도구 audits

[[Architecture]]

#### nginx alternative
- [openlitespeed](https://openlitespeed.org/)

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

#### 테라폼만 쓸지 서버리스를 같이 쓸지 고민중
서버리스는 개별적인 앱을 빠르게 빌드하고 다시 만들 때 가볍게 사용하기 좋고
테라폼은 좀 더 넓게 공유되는 자원을 관리할 때 쓰기 좋다

서버리스는 앱을 빠르게 띄우기 좋고 테라폼은 인프라 셋팅하기에 좋다
https://www.serverless.com/blog/definitive-guide-terraform-serverless/

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
- `letsencrypt -d <domain> -m <email> -n(all agree) --agree-tos`
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

#### github action terraform
- how to hide secret file
  - gcp credential file

#### ! change backend bucket
need delete `.terraform` dir, and `terraform init`

#### AWS Dynamodb terraform
- attribute need index
- any key can write, if exist with attribute

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

#### serverless
- json으로 invoke 안됨
- nltk 다운로드 후 파일 못읽음
- konlpy 사용 시 java환경 필요한데 안됨

## vault
- install file
- move bin directory

#### vault in gcp
1. run docker ``
    - what is different with server-mode and another
2. add ssh
3. save file
4. read file

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

## aws lambda cronjob
- using cloudwatch event rule, event target, lambda permission
- more option cloudwatch log group, cloudwatch log subscription filter
- https://www.thedevcoach.co.uk/terraform-lambda-scheduled-event/

#### serverless aws sqs lambda
- sqs to lambda message parsing
- event['Records'][0]['body']
- lambda python requests
- cannot version 3.8, can 3.6

## devdash
- google analytic settings
- enable google report api
- export project json

#### cloud
- L/B free cloud
    - nothing
- GCP app engine 28/d free
    - it can be scaling

#### Current Used infra
- telegrambot(serverless)
- monitoring
- content based recommend(need s3 csv file)(terraform)
- s3 hosting(terraform)
- netlify(wiki homepage)
- github pages
- cloudflare
- empty
 - ec2
 - gce
 - gcp app engine
 - heroku
- oracle 2대

## 카프카와 다른 메시지큐
카프카는 분산, 고가용성, 고속에 특화
근데 무겁다

가벼운데 고가용성만 지원되면 좋겠다

## gRPC
(Remote Procedure Call)

gRPC 4가지 스트리밍 방식
* 단일
* 서버 스트리밍
* 클라이언트 스트리밍
* 양방향 스트리밍

3가지 stub
* Blocking stub
* (Async) stub
* Future stub

gRPC가 필요한 이유
- CORBA 등 과거의 RPC는 높은 복잡도, 높은 학습곡선, 낮은 개발생산성이 문제였다
- RESTful이 낮은 복잡도, 낮은 학습곡선 등으로 잘 사용하게 됨
- 그러나 게임 등에서는 성능상의 이유로 위의 CORBA 등이 사용되고 있었음.
- 구글에서 Stubby를 만들고 gRPC는 오픈소스 버전

Binary Protocol - Text Protocol(REST)
HTTP/2 base
- Connection Multiplexing
- Header Compression
- 양방향 Streamming

Browser에서 지원해야 함
데이터가 Binary라 바로 읽기 힘듬

#### grpc
- protoc 설치: `apt install -y protobuf-comiler`
- buf 설치: https://docs.buf.build/installation/
- `buf.yaml`로 디펜던시 설치
    - `buf beta mod update`
- `buf.gne.yaml`로 proto 파일 변환
- 생성된 swagger.json 을 브라우저에서 보려면 swagger-ui를 설치해야 한다

#### grpc
gateway에 grpc를 어떻게 등록시키나를 놓쳤는데
알고보니 grpc서버를 따로 실행하고 gateway에 포트를 알려줘서 접근하게 하는
방식이었다.

grpc gateway에서 루트 url은 지원을 안한다. 따로 http server에서 작업을 해줘야
한다.


#### grpc
데이터 아웃풋을 배열로 출력할 때 배열만으로 출력이 안되고 메시지 형태로 된다
name: [arr1,arr2]
그래서 받는 쪽에서 name을 골라서 받아야 되는데 이러면 안된다

람다는 reponse body 안에 다 넣어놓는 방식을 쓴다

array 안에서 이름 말고 다른 방식으로 값을 가져오는 방법은?
각 값마다 일일이 찾는 방법 밖에 없나...
- marshal, unmarshal

grpc message에 담는 방법 외에 google http body를 이용해서 담을 수 있다.
`import "google/api/httpbody.proto";`
`returns (google.api.HttpBody)`

#### grpc
1. object.proto 파일 생성
2. buf.gen.yaml 파일 생성 // proto-gen-go로 할 수 있지만 설정 일일이 하기 번거롭다
    ```
    version: v1beta1
    plugins:
      - name: go
        out: ./pb
        opt:
          - paths=source_relative
      - name: go-grpc
        out: ./pb
        opt:
          - paths=source_relative
    ```
3. buf generate
4. server.go 로 proto에서 정의한 함수 구현

#### grpc 구현 시
client도 같이 구현해야하나??
그러면 메인 로직에서 CRUD 만들고, server에서 CRUD 만들고, client에서 또 만들어야
한다. ㄷㄷㄷ

서버는 자신의 마이크로서비스에서 실행하도록 하고, 클라이언트는 임포트해서 가져다
쓰도록 되어있다.

#### grpc 통신 속도 확인
grpc가 아니어도 되지만 grpc로 하면 속도를 확보할 수 있다.
- [ ] grpc호출하려면 grpc호출 로직을 짜야하나? 간단하게 호출할 수 있는 방법은?

#### reference
- https://devjin-blog.com/golang-grpc-server-4/
- https://deepbaksu.github.io/2021/05/01/how-to-REST-from-gRPC/
- https://tech.buzzvil.com/handbook/grpc/

## text preprocessing
- 단어 빈도 수 체크
- 조사 제거
- 불용어 제거

## react table
react-table (검색, 정렬)
react-table-filter (각 열별로 겹치는 이름 필터 가능)
- https://blog.logrocket.com/complete-guide-building-smart-data-table-react/

#### api gateway
api gateway를 쓰게되면 운영서버에서 띄운 것을 이용해서 테스트를 해도 되나?
로컬에서 개발자마다 띄워야되면 너무 귀찮을 것 같은데 그렇다고 아예 안쓸 수도 없고.

운영 환경의 docker container를 개발할 때 가져와서 쓰고
새로운 옵션이 필요하면 운영 환경에 풀 리퀘스트를 하도록 하면 점진적 개선이
되겠다
kubernetes nginx ingress 확인 해보기
istio와 비교
- [X] nginx도 api gateway라고 할 수 있나?
    - 있겠다. kong도 nginx기반으로 만들어진 것 같다.

api gateway or istio
- 응답이 body 안에 담긴다. body를 읽어서 판단한다

#### kong reference
kong을 yaml로 관리하는게 있는데, decK
이 yml이 인식하는 것들이 어떤게 있는지 api가 어딧는지 모르겠다

decK를 쓰는게 아니라 kong 자체 declarative 설정이 있다.

admin api 페이지에 나열되있긴 한데, 보기 힘들다

#### kong grpc gateway
kong으로 grpc 서버에 접속해서 grpc gateway를 만들 수 있다.
