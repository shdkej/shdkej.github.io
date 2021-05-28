---
title   : Tool
summary :
date    : 2020-08-25 14:48:57 +0100
updated : 2021-05-23 20:22:17 +0900
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

## Redis
- http://highscalability.com/blog/2019/9/3/top-redis-use-cases-by-core-data-structure-types.html
- Chained Linked List에는 약점이 있습니다. 한 Bucket 안에 데이터가 많아지면 결국 탐색 속도가 느려집니다. 이를 위해서 Redis는 특정 사이즈가 넘을 때 마다 Bucket을 두 배로 확장하고, Key들을 rehash하게 됩니다.
    - https://tech.kakao.com/2016/03/11/redis-scan/
- hash를 쓰면 일정 크기 이하까지는 ziplist라는 형태로 저장된다
- 메모리 사용이 많아져서 swap을 쓰게 되면 접근하는데 속도가 떨어진다
- maxmemory 확인
- keys, flushall 보다 scan 사용

#### data structure [[redis]]
- set vs hash vs strings in article
- ? which type fit for index file -- hash?
- true,false type -> bitmap 1.2M 10,000,000
  - [source](t.ly/KqGO)

#### redis hash crud
json data
- HMSET -> HSET
- HMGET
- HSCAN

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

#### elasticsearch
기본
- 인덱스 생성 후, 그 안에 도큐먼트를 넣는다
- Type, Id는 뭐지
    - Type은 원래 인덱스 안에서 카테고리 역할이었는데 없어질 예정이라고 한다.
    - 고정값으로 생각해도 되겠다(_doc) 6.7 버전에서 _doc으로 고정되었다
    - Id는 도큐먼트를 인식할 수 있는 값, db에서 primary key 같은 느낌
- 맵핑 - 데이터 형태 지정
- 쿼리를 안넣으면 전체검색이 된다는데? - ok
- 토크나이저와 아날라이저를 구분, analyzer가 tokenizer를 포함할 수 있다 +
  synonym도 포함 한다
- index 끼리 shard 할 수 있고, routing 하는 기능이 있다

정보
- tokenizer 설치 후 리스타트 해줘야 한다.
- 인덱스 수정은 힘들고, 새로 만들어서 리인덱싱 해줘야 한다.
- elasticsearch로 데이터를 관리하는 것은 우선순위 큐를 이용하는 것과 비슷한
  느낌이다. es에 넣으면 내부에서 기대하는 로직을 수행하고, 결과값을 기대했던대로
  받는다.
- 검색 기능은 Lucene이 담당하고 elasticsearch는 클러스터의 기능을 담당한다.

궁금한 것
- [X] 쿼리에 어떤 것들을 쓸 수 있는지, must, should,
- [X] 분석기 설정한 인덱스에서 검색했는데 결과가 동일함
- [ ] 초기화를 elasticsearch에서 할지, api server에서 할지??
- [ ] update할 때 기존에 것에 추가하는 작업이 안됨
- [X] 전체 검색이 전체를 검색 안한다. 카운트는 정상적으로 세는데 hit는 하다
      마나? default size가 10이었다.

#### synonym and user dictionary
userdict.txt 와 synonyms.txt를 준비해두고 인덱스 생성
```
> curl -X PUT "localhost:9200/analyze?pretty" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "analysis": {
      "tokenizer": {
        "nori_user_dict": {
          "type": "nori_tokenizer",
          "decompound_mode": "mixed",
          "user_dictionary": "userdict.txt"
        }
      },
      "analyzer": {
        "korean_analyzer": {
          "filter": [
            "pos_filter_speech", "nori_readingform",
            "lowercase", "synonym", "remove_duplicates"
          ],
          "tokenizer": "nori_user_dict"
        }
      },
      "filter": {
        "synonym" : {
          "type" : "synonym_graph",
          "synonyms_path" : "synonyms.txt"
        },
        "pos_filter_speech": {
          "type": "nori_part_of_speech",
          "stoptags": [
            "E", "J", "SC", "SE", "SF", "SP", "SSC", "SSO", "SY", "VCN", "VCP",
            "VSV", "VX", "XPN", "XSA", "XSN", "XSV"
          ]
        }
      }
    }
  }
}'
```

#### elasticsearch
user dictionary가 수정되면 다시 읽어야 하고, 인덱스를 close, open 해야 한다
user dictionary는 인식하지 못하는 단어를 인식하게 하는 것이고
- 신조어, 고유명사의 경우에 추가
synonyms는 인식한 단어들 중에 다른 단어도 같이 검색되게 하는 것
- 사릉해, 얼굴-와꾸 등 기존 단어가 있는데 추가 검색이 필요한 경우 추가

#### elastic search
security
- don't bind to a public ip
- proxy all client requests to elastic search
- disable dynamic scripting(pre 5.x version)

design
index management patterns
- monolith
- rolling indexes(time based events)

query
term, bool
- smallest number of terms as possible
- use filter context for static, non-full-text term queries
- scripts will show down your searches

? how to manage score? (weight)

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
