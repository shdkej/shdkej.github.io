---
title: Infra
summary:
date: 2025-05-06 19:57:59 +0100
updated: 2025-07-23 10:10:00 +0900
tags: deep_knowledge
---
## 인프라 레벨

#### 최소한의 인프라
- 정적 페이지
- CDN
- S3 저장소
- 람다
- API Gateway

#### 규모가 커짐에 따라 안정적인 운영을 위한 추가 인프라
- 데이터베이스
- 캐시
- 오토스케일러

#### 강력하게 탄탄한 인프라
- 메시지 큐


## About Cloud
#### 모든것을 위한 클라우드는 없다
- 그럼 트리 구조로 선택 가능한가
- 회귀 가능한 요소는 어떤게 있을까
- 집약 세분화 집약 세분화
- 비용
- 사용자
- 시간
- 공간

#### 정적페이지로 최대한 만들어서 cdn 이용하기
스테이트리스 한건 정적으로, 스테이트풀한건 서버를 사용해야 한다

#### 클라우드는 편리하지만 내부를 통제할 수 없다

클라우드에서는 시스템 자원 관리는 클라우드에 맡김으로써 하드웨어의 효율화에 대한 고민은 생략된다. (캐시와 CPU, DISK 간의 구성에 대해 신경을 못쓴다). 이 부분의 최적화는 생략하는 대신 내 서비스가 잘 실행되느냐에 집중할 수 있다.

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


#### NAT gateway 비용이 은근 많이 나올 수 있음
- 프라이빗망의 인스턴스가 퍼블릭에 접근해야 하는 경우 통신됨
- S3에 업로드/다운로드가 많이 일어난다면 비용 폭탄
	- S3 전용 VPC Endpoint를 쓰면 무료라고 한다
	- S3와 DynamoDB는 Gateway 형식의 Endpoint. VPC당 20개 쓸 수 있음

## Serverless

채팅서비스에서의 람다가 적합하지 않을 수도 있겠다
처음엔 인스턴트성이 강해서 필요할때만 켜지는게 효율적이다 생각했는데
콜드스타트 문제로 처음 응답이 느릴 수 있고
그걸 해결하고자 계속 켜지게하면 사용시간이 늘면서 비용이 늘고 람다를 쓰는 의미가 없어질 수도 있다
GPT도 동일하게 말해준다. 지속실행이 어렵고, 사용자가 많아지면 비용이 급증하고, 웹소켓 상태 관리가 어렵고 높은 지연시간이 있다
- Lambda는 **요청당 비용**이 발생하므로, 사용자마다 개별 Lambda가 떠 있으면 **비용 부담이 큼**

그래서 fargate를 쓰는게 대안이고 redis pub/sub도 써서 메시지 브로드캐스팅용으로 쓰기를 제안한다

데이터베이스는 
- 실시간 메시지 전송은 Elasticache
- 채팅 로그 단순 저장은 DynamoDB, (유저 정보도 여기 저장하지 못할 이유가 없다)
- 채팅방/유저 데이터 관리는 RDS

#### 람다를 기가 막히게 사용하고 싶다 + 큐와 함께

왜 람다가 좋으냐

람다를 써도 될까 람다를 쓰면 안되는 경우

pLimit
팬아웃
큐와의 조합

콜드스타트는 여전히 느리고,
어느순간 트래픽이 폭증하면서 온디멘드와 별반 차이가 없어졌고,
오만 수단을 다 동원해도 배포가 너무 느림

#### 서버리스를 선호
아키텍처를 그릴 때 서버리스로 가능한지 먼저 확인한다
서버리스로 할 수 없는 특징이 없다면 서버리스로 시도한다
관리포인트가 줄어드는점
모듈화가 되어서 다른 서비스 연결이 잘 되는점
가벼운점
작업의 실행을 보장할 수 있다

서버리스로 하기 어려운 특징이 어떤게 있냐면
이번회사를 다니면서 백엔드 서버가 딱 있으니까 좋다고 느낀게 있었다
쿼리로 데이터 관리할 수 있는 점 - 트랜잭션
머신러닝처럼 컴퓨팅 성능이 중요한 경우
실시간성이 중요한 서비스

그래서 람다의 한계를 배우게 된다
- 지속 연결이 필요하면 못 쓴다
- 빠른 응답이 필요하면 못 쓴다

fargate도 서버리스 컨테이너 서버이기 때문에 서버리스를 쓰는거긴 하다

서버가 필요한 작업
- 데이터베이스에 접근
- api 핸들링 (클라이언트에서 가능할듯)
- 모니터링?

#### 람다의 약점
- 느린 시작
- 모노리스에 비해 통신의 비용이 든다(마이크로서비스라면 비슷)

로컬 테스트와 배포된 람다 간에 연결성을 높여보도록 구성해봐야겠다

serverless에 배포 전 로컬 테스트.
배포 후 자동 테스트
배포 후 에러 처리

#### 서버리스 프레임워크 단점
- 도큐먼트
- 어떤 입력값을 쓸 수 있는지 나와있는 문서가 없다
	- cloudformation 값을 참고 할 수 있음

#### 람다를 큰 규모로 사용할 때 뼈대를 잡아주는 프레임워크
- [middy](https://middy.js.org/)
- [aws powertools](https://docs.powertools.aws.dev/lambda/typescript/latest/)


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

## VPC

외부 - VPC - AZ - subnet - instance - route table - igw (subnet을 퍼블릭으로 만들어주는 것과 같은 효과) - nat gateway (subnet이 private 상태로 인터넷 연결) - NACL (control ALLOW and DENY) - security group (control only ALLOW)
VPC Flow Logs

- 네트워크 트래픽 정보를 캡쳐한 것을 볼 수 있다
- VPC 안에서 개별로 설정

VPC Peering

- VPC 끼리 통신할 수 있도록 해주는 것

VPC Endpoints

- 외부에 있는 S3에서 VPC Endpoint를 통해서 다른 VPC에 있는 프라이빗 인스턴스에 접근 가능

ENI

- 실질적으로 인스턴스와 Security group, VPC 등이 연결되는 네트워크 인터페이스 장비라고 보면 될 듯

## IAM

IAM = Identity and Access Management, Global Service
Root account created by default
Users - people within your organization, can be grouped
Groups only contain users, not other groups
Users don't have to belong to a group, and user can belong to multiple groups
account id에다가 alias를 달 수 있다 fnckop 처럼
fnckop에 iam 유저로 로그인하면 account id를 같은 걸 쓴다

IAM: Permissions
policies(정책) - contains effect, action, resource, (principal), (sid)
정책은 최소 권한의 원칙으로 관리하는 걸 권장함. 유저가 딱 필요한 권한만 주는 것
정책은 그룹에도 걸 수 있고, 유저에도 걸 수 있음
principal은 account/user/role 중에 특정 대상에만 적용하게 하기 위한 조건

- 근데 그러면 정책 자체가 특정 대상에 걸리는건데 principal이 필요한가?
- 리소스 기반 정책이 있고, 자격 증명 기반 정책이 있다.
- principal은 리소스 기반 정책에 필요하고, 유저나 그룹에 거는건 자격 증명 기반 정책

#### IAM Guidelines & Best Practices

Don't use the root account except for AWS account setup
One physical user = One AWS user
Assign users to groups and assign permissions to groups

Shared Responsibility Model for IAM
AWS가 책임지는 것

- 인프라
- 설정과 취약점 분석
- 컴플라이언스 검증

유저가 책임져야 하는 것

- 유저, 롤, 정책 등에 대한 관리 및 모니터링
- MFA를 사용하는 것
- 키를 자주 바꿔주는 것
- 적절한 권한을 설정하는 것
- 접근에 대한 분석, 권한 리뷰

## Storage

glacier
https://bluese05.tistory.com/35
- 데이터 가져오고 검색하는게 좀 한계가 있어서 활용도는 떨어지는 듯

#### 메시지 큐

sqs에 실패처리용 큐를 하나 만들어서 거기에 담아서 에러를 확인한다.
메시지큐에서 실패한 것들을 받으면 람다를 실행하게 해서 오류처리 할 수 있다


## Hands-on
#### aws beanstalk eip 없이 접속하기
- vpc 연결 안된다고 떴던 에러 해결하면 될 듯
- 내 vpc 와 비교
- 라우팅 테이블에 igw 가 있는지 없는지가 다르다

여기에 igw 설정을 하지 않고도 사용할 수 있는 방법이 있을까?
지금 만약에 바로 igw를 연결하면 default vpc가 외부와 연결되서 보안이 다 뚫릴 것 같다.
근데 eb를 외부 igw 연결된 것만 생성 가능한 것도 이상하다.
vpc endpoint 라는 것을 이용하면 된다고 하는 것 같다

https://docs.aws.amazon.com/ko_kr/elasticbeanstalk/latest/dg/vpc-vpce.html

기본 요구사항은 vpc가 퍼블릭이면 igw가 연결되어 있어야 하고,
프라이빗이면 NAT 디바이스를 이용하라고 한다.

app-private 에 NAT 가 연결되어 있어서 이걸로 테스트해보면 되겠다.
로드밸런서와 인스턴스 둘 다 private으로? -> 된다

nat를 쓴다는 것 자체가 하나의 EIP 를 쓴다는 것이긴 하다.
NAT 없이 private으로 만들고 load balancer를 연결할 수 있을까?
beanstalk은 정말로 public에 대한 연결을 필수로 요구하는 것인가?
vpc endpoint를 써보자

## AWS 자격증

4종류 12개

1. 프렉티셔널 (기초)
2. Associate (일반)
3. Pro
4. Special (Pro와 같은 레벨)

Associate

- Developer
- Solutions Architect
- SysOps Administrator
  Pro
- DevOps
- Solutions Architect
  Special
- Advanced Networking

예제 사이트
https://www.examtopics.com/exams/amazon/aws-devops-engineer-professional/
덤프 문제 풀이
https://blog.naver.com/PostView.naver?blogId=asd7005201&logNo=222606780619&parentCategoryNo=&categoryNo=23&viewDate=&isShowPopularPosts=true&from=search

수험 가이드
https://gist.github.com/serithemage/df61aaf396046eff7244b6eaa8d58d4a

https://goddaehee.tistory.com/194

#### AWS Developer Associate

https://www.notion.so/aws-developer-associate-e91595fe733d494d99db3458e3535677

덤프

- https://dumps.kr/dumps/amazon-dva-c01/3
- https://www.examtopics.com/exams/amazon/aws-certified-developer-associate-dva-c02/view/
- https://www.knowledgehut.com/practice-tests/aws-certified-developer-associate-practice-test/Result/TWZCVHpBWktwK0JSS05pZkhvNVJxY2JDWkxFMzRPMmY=

#### SAA
- [강의](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/)
- [요약 2019 버전](https://github.com/serithemage/AWSCertifiedSolutionsArchitectUnofficialStudyGuide)

덤프
- https://dumps.kr/dumps/amazon-dva-c01
- https://www.examtopics.com/exams/amazon/aws-certified-developer-associate-dva-c02/view/

범위
- IAM
- EC2
- ELB, ASG
- RDS + Aurora + Elasticache
- Route 53
- S3
- CloudFront, AWS Global Accelerator
- AWS Storage Extras (snow family?, FSx?)
- SQS, SNS, Kinesis, Active MQ
- ECS, Fargate, ECR, EKS
- Lambda, Lambda@Edge, Dynamodb, API Gateway, Step Functions, Amazon Cognito
- Database (RDS, Aurora, ElastiCache, DynamoDB, S3, DocumentDB, Neptune, Keyspaces, OLDB, Timestream)
- Data Analytics (Athena, Redshift, Opensearch, EMR, QuickSight, Glue, Lake Formation, Kinesis Data Analytics, MSK)
- ML (Rekognition, Transcribe, Polly, Translate, Lex+Connect, Comprehend, Comprehend Medical, SageMaker, Forecast, Kendra, Personalize, Textract)
- Monitoring (CloudWatch - Metrics, Logs, Agent, Logs Agent, Alarms, EventBridge, CloudTrail)
- Security (KMS, SSM, Parameter Store, CloudHSM, Shield, WAF)
- VPC
- DR, Migration

EBS, EFS, FSx
- EBS : 하나의 인스턴스에 연결해서 사용, 단일 AZ에 저장, 볼륨 단위 관리, EFS 보다 빠름, 다른 인스턴스로 이동은 가능
- EFS : 자체적으로 사용 가능, 여러 AZ에 중복 저장, 파일 단위 관리, 자동 확장, NAS 쓰는 느낌
- EC2 생성 시 EBS는 기본으로 연결되고 EFS, FSx는 따로 생성되어있으면 연결 가능하다
- 인스턴스 스토어라는 휘발성 저장소도 있는데 특정 인스턴스 유형으로만 시작할때만 연결할 수 있음
- FSx : EFS 보다 고성능, 다양한 기능을 가진 서비스

다른 스토리지 서비스
- DataSync : 온프레미스에 저장된 데이터를 AWS로 옮겨줌
- Snowball : 초대용량 데이터를 옮길 때 AWS에서 지원해줌

Athena : S3에 저장되어 있는 로그를 쿼리할 수 있는 기능


---
## Test 전략

#### how to test

istio를 쓰면 플로우 모니터링 하긴 용이하다

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

## TEMP


iam 역할과 정책 비교
- 정책은 사용자, 역할, 그룹에 할당하는 실제 규칙
irsa
- IAM Roles for Service Accounts


#### 변경 파일만 검사하는 lint
- git diff
	- `git diff $(git merge-base origin/${base} origin/${head})..origin/${head} --name-only --diff-filter=d | grep -E '.(js|jsx|ts|tsx)$'`
	- git merge-base : base 브랜치와 타겟 브랜치의 공통 조상을 찾는다
	- -name-only : 파일 이름만 출력한다.
	- -diff-filter=d : 삭제된 파일은 제외한다
	- grep -E : 특정 확장자만 필터링
- github actions에서 fetch 기본값은 최신 커밋 하나만 가져오는 건데 공통조상을 찾기 위해 전체 히스토리를 가져옴


#### 인프라
* subnet, route table
	* route table에 변경할 서브넷이 aws에는 만들어져있고, 이를 테라폼으로 안가져와서 이걸 가져와서 route table에 적용할지, 바로 그냥 스트링으로 입력할지?
* 스테이징 서버 subnet 끼리 연결해줄 수 있도록 연결
* terraform import 로 aws에서 땡겨올 수 있다.
	* terraform으로 이름만 만들어서 import 하고 내용 입력해서 plan해서 쓸 수 있다.
	* plan 해서 aws랑 sync하고 원하는 상태로 변경.
	* 각 폴더가 루트라서 data.terraform_remote_import 써서 output 만들어서 데이터 받아온다.
		* 루트끼리 데이터 교환을 바로 못하나? 모듈에서는 됐던것 같은데
* AZ존 a, c에 비해 b, d가 잘 안되는 이슈가 있다.
	* 주로 a를 쓰고 c는 eks 하면서 조금씩 추가하고 있다.
* eks subnet 자동으로 만들어진 것들
	* 통신을 위한 포트가 랜덤으로 열려있음
	* nlb client는 0.0.0.0으로 열려있고 health는 특정 서브넷마다 할당 되있다. 왜그렇지?
		* 임의 설정 가능한지 어노테이션 확인
* NLB
	* 웹소켓 등 다른 프로토콜 쓸 수 있다
	* 빠르다
	* 바이패스로 지나가는 느낌이라 시큐리티 그룹으로 설정 못해준다
* 테라폼
	* 버전 업데이트에 따른 수정사항이 생기면 내가 바꾼 거랑 섞여서 보기 힘들다
* 인그레스 컨트롤러
	* class로 인그레스 어떤거 쓸지 선택, 디폴트 elb, nlb는 선택 필요
	* stable/nginx-ingress가 만료되서 새로 업데이트 해야한다
	* EKS 업데이트 시 인스턴스가 재생성 해야되서 elb에서 다시 수동으로 인스턴스를 잡아줘야하는 이슈가 있다
		* eks internal로 직접 만들어서 수동 설정하는게 있다
* kubectx 로 컨텍스트 설정
* 운영에서는 에러 뜨면 바로 반응 오는게 맞다
* elb - nlb 일 필요 없다
* ldap, saml #infra
	* aws login 등 할 때 마이크로소프트 saml 이용해서 중앙에서 권한 제어한다.
* browser에서
	* response-header에 content-security-policy로 컨텐츠 http 제한, https는 허용하는 식으로
* 새로운 k8s 리소스 생성하기
	* 1. helm create 하고 운영서버 데이터 적당히 옮긴다
	* 2. argocd 웹 들어가서 앱 생성
* NLB -> ALB
	* 주소 앞에 www를 붙이는 처리를 기존에는 apache 웹서버를 이용해서 했었는데, ALB에서 리다이렉트 처리가 가능해서 ALB를 사용하려 한다.
		* 관리포인트가 줄어든다
	* 문제는 ALB의 IP 주소가 한번씩 바뀌어서 NLB가 ALB를 못바라본다.
	* 그래서 람다를 이용해 NLB가 ALB를 찾을 수 있게 해주고 있다.
* monorepo with yarn workspace
	* 같은 프로젝트 안에 다른 서비스끼리 참조하면 임포트를 해줘야하나?
- 캐시
	- 캐시 전체 페이지 하고 있는데 비회원,회원 구분된 페이지에서 비회원화면이 캐시되있으면 회원이 접속해도 캐시된 화면 출력되는데 그래서 새로운 구분값이 추가되면 캐시페이지도 구분해줘야한다.
- 장애 : 서비스가 의도한 대로 동작하지 않는 모든 것
- 장애감지 - telegram 으로 alert megazone과 구축
- /var/log/mesages에 리눅스의 기본적인 로그가 남고 어떤 프로세스가 죽었는지 확인됨
- 인프라 모니터링 + APM 으로 요청 검사
- 빈스톡의 nginx 기본 설정이 잘 막혀있도록 설정되어있음


#### ec2 os 패치
- devops, sta running 으로 검색
- 인스턴스 백업
	- 이미지 및 템플릿 - 이미지 생성 = 스냅샷 생성
	- 이미지 이름은 인스턴스 이름 + BACKUP-날짜
	- 운영에서는 재부팅 안 함을 활성화
	- AMI 에 생성됨, 볼륨 생성됨, 스냅샷 생성됨
- 시연은 JUMPSERVER를 이용해서 접속해서 했음 
	- (근데 끊어져서 서버가 뻑난적이 있음. 접속이 끊어지면 안됨)
- os 확인 - centos
- sudo yum update -x docker* (docker 관련 리소스는 업데이트 안함)
	- docker는 업데이트를 안했는데도 도커가 재시작 되는 경우가 있음
	- 운영에서는 해당 인스턴스를 LB에서 빼주는게 안전
	- 도커는 업데이트 해도 되는데 파라미터 수정해줘야 함
- 리눅스 재시작
	- sudo shutdown -r now
- 패치 확인
	- last reboot
	- version 이 다르게 표시된 걸로 확인
- 도커 컨테이너 확인해서 실행 안되어있으면 실행
- /usr/lib/systemd/system/docker.service
	- ExecStart=/usr/bin/dockerd 이 줄에 -H 옵션이 붙어있다면
	- 뒤에 -H 붙이지 않는 걸로 수정해줘야 함
	- -H fd:// --containerd=/run/containerd/containerd.sock
- 수정파일 적용
	- sudo systemctl daemon-reload

EB Incorrect application version found on all instances. Expected version 에러
- 인스턴스 1개면 EC2 리부팅 해주면 다시 됨

#### eks
개발자 작업내역 로깅?
개발자별 권한관리

```
awslogs get /aws/lambda/lambda-func-fnc-stg-an2-send-email-nhn ALL \
  --start='1h ago' --watch \
  --profile ums-dev --aws-region ap-northeast-2
```



#### 점프서버
jumpserver 안쓰면 다른 ssh 툴로 접속해야 하나?
docker 업데이트 후 수정해야하는 것과 아닌 것의 차이는?
dockerfile은 어디에 있을까?

- 서버 접근 제어 솔루션
- 점프서버를 aws2020에 설치하여 사용
- 누가 언제 접속하고 어떤걸 했는지 로깅
- 동영상으로도 저장

#### 시스템 버전 업데이트 어떻게 할 것인가
#infra 
ec2, rds 업데이트
stg-eks 는 terraform
rds 는 aws console에서 수정 눌러서 업데이트
- 블루/그린 배포 추가된듯?
- mysql 5.6 -> 8로 업데이트 시 인스턴스 변경 필요한데 어떻게 하면 사이드이펙이 적을까

500에러
ALB에서 500 에러가 발생 가능하다
ELB는 가지고 있는 큐가 1024개 제한이 있다

#### RDS 디비 접속
#infra
서브넷이 private용으로 돼있는데
security group 만 풀어주면 접속이 되나? 아니면 서브넷도 풀어줘야 하나?
서브넷이 nat 만 열려있어서 그렇다. igw 연결 시켜줘야 했음.
근데 db-public을 만드는 방향으로 가야함


#### IAM
IAM 적용에는 시간이 걸린다 #infra 


#### 키네시스 로컬 테스트
- docker-compose 실행
- stream 생성
- 큐에 넣기
- 이터레이터 조회
	- 이터레이터로 레코드 조회
- 레코드 데이터 base64 디코딩
- 이터레이터 유효기간 때문에 처음에만 조회가 된다
- 이터레이터를 새로 받으면 ~ 된다
- 이터레이터를 먼저 환경변수에 세팅하고, 값을 넣으면 그 이터레이터로 조회가능

로컬 키네시스 테스트
- 이터레이터 하나 확인 (source get_records.sh 하면 환경변수에 저장 가능)
	- 키네시스로 전송
	- 레코드 확인 (레코드가 배열로 여러개 있음)
	- base64 디코딩
	- json 형식으로 변환
stderr, stdout 일 때 처리를 다르게 해줘야 하나..
#infra 

cdn -> 
cache, cdn을 둬서 사용자가 많아져도 부하를 줄일 수 있다
헤더를 한줄로 만들어서 람다로 분해해서 cdn에서 인식하게 한다
- 조작을 방지하기 위해
#infra

[[이벤트 드리븐]] #infra 

- 쿠버네티스
	- 인그레스로 연결 접속 허용하는 사람 설정
	- 인그레스 여러 개 사용하면서 적합한 것 사용

- lb용으로 서브넷 따로 따져있음
- 스테이지는 스팟인스턴스 사용
- 디비는 메모리많은걸 써서 캐시 잘 되게 함. 조인할때도 그렇고 메모리에 적재할때 부족하면 느려져서 많으면 좋음
- eks_manage_user 로 하면 생성할때만 설정가능해서 role로 관리하는게 나을수도
- proxy_protocol_v2 -> 클라이언트 ip 전달을 위해 헤더에 값 넣어주기 위한 설정 (https://purpleio.atlassian.net/wiki/spaces/PURPLEIO/pages/168067247/AWS+ELB+ALB+NLB+CLB+nginx+ingress+EC2)
	- nlb 는 ppv2 지원
	- alb 는 x-forwarded-for 헤더에 기본 지원
	- nlb 에 annotation 설정 해주면 됨
	- configMap 에도 설정
	- 타겟 그룹에 preserve client ip address 값에 따라
		- sg에 클라이언트 ip 를 열어줘야 할 수 있음
- 디비는 테라폼으로 같이 묶여있으면 지울때 날라가면 크리티컬
	- 그냥 테라폼코드를 지우면 삭제하는 동작을 해서 따로 안보게 하는 설정을 해줘야 함

blue, green은 statefulset 으로 되있는데 다른건 뭘로 되어있는지? <-> deployment
- deployment 대신 쓰는건데
- service를 다른걸 쓴다
- 파드가 죽다 살아나도 그 파드 그대로 사용된다

ec2에 설치된 오라클은 플러그인같은걸 쓰고 있었는데 RDS에서는 못써서, 근데 개선할 예정

lb controller
- ELB, NLB 를 쿠버네티스가 관리할 수 있게 해주는 컨트롤러
- ingress controller가 예전버전인데 이걸 써야 nlb - ingress 연결이 된다?
- https://docs.aws.amazon.com/ko_kr/eks/latest/userguide/alb-ingress.html

CLB에 비해 NLB 의 달라진 점은 어떤게 있지

버전을 variable로 다 빼도 될까?
- 차트별로 버전 확인하려면 어떤 리소스인지 봐야되서 왔다갔다 하기 번거로울 수 있다

locals랑 variables랑 뭐가 다르지
- locals 는 상수
- variables 는 terrafrom 명령어 칠 때 사용자가 변수 주입 가능
- output 은 모듈 외부에서 값 받아쓸 때 사용 가능

2023으로 만든거에 helm으로 만든거는 eks 위에서 안뜨나?
- argo를 먼저 띄워놓고 그걸로 띄우나? <-> 모니터링 같은 시스템 쪽은 argo로 배포 안해도 될텐데
- helm 자체가 eks 위에서 실행되긴 해야하는데

https://sineui.home.blog/2020/02/29/aws-eks-clb-alb%EB%A1%9C-%EC%9D%B4%EC%A0%84%ED%95%98%EA%B8%B0-1-%EB%B0%B0%EA%B2%BD/


#### argocd
처음 깔면 레포지토리 등록
gitlab에서 repository > deploy token 에서 토큰 생성 후에 등록
argocd에서 destination 추가

a 레코드로 하면 한번에 아이피를 찌르는데
cname 을 거치면 한번 더 쳐야 되서 a 레코드가 낫다

argocd에서 kubernetes namespace를 바꿀 때 ingress가 안지워지면 새로운 ingress가 안뜬다. 자동으로 안됨. service나 deployment도 안지워지고 새로운게 뜸



---

- [ ] kubernetes toleration, taint
	- taint
		- 노드에 설정
		- 팟이 할당 안되도록 하는 설정
		- 이름을 명시적으로 설정. (ex: system, normal, large)
		- tolerations와 함께 써서 특정 노드에만 뜨게 하기 위해 사용
	- tolerations
		- 팟에 설정
		- key, operator, value, effect 를 taint에 설정된 것과 같게 입력해주면
		- taint가 설정 되어 있어도 할당 되게 해줌
		- 만약 해당 taint값이 없으면 생성이 실패되나?
		- node selector와는 어떤 관계지
		- node affinity도 있음

route 53 연결 해줬는데 인증서가 kolonmall 이 없는걸로 연결되서 400으로 에러남
- 인증서 바꿔주면 시간 지나면 적용 됨. 캐시 남아있을 수 있음

ingress에 nodeSelector가 manage로 되어있던데 eks 만들때는 manage로 tag 걸어논게 없던데 이상없이 잘 떴음. manage는 기본으로 생성되는건가 아니면 이름 없으면 그냥 아무거나 붙는건가?

kop-api 띄우다가 image 없다고 에러 뜸
- ecr에 lifecycle policy에 50개까지만 저장한다고 설정되어있음

kop-web, kop-hybris beta 는 kop30-frontend 에서 ingress를 띄워서 연결해서 쓰고 있음

external dns를 helm으로 띄워서 팟이 인터벌 간격마다 확인하면서 dns 할당하는 역할을 함
주소 매핑할때는 kubernetes 에 어노테이션 달아주면 되는데, ingress에 hosts 등록되어있어도 되는 거 같다

keyv-cronjob
- 레디스에 쓸데없는 거 쌓인 거 지워주는 크론
- 무슨 라이브러리 쓰는게 있는데 그거때문에 데이터가 계속 쌓여서 메모리를 많이 차지해서 임시로 지워주게 처리함
- 그 라이브러리가 keyv 일 수 있음

레디스 elasticache 버전이랑 클라이언트 버전 맞춰주기

디비나 레디스같은 건 인바운드 열어줘야 할 수 있으니 확인

하이브리스도 레디스에 로그인 세션 저장해서 사용중

- aws cni 
	- container network interface
	- eks 가 아닌 기본 쿠버네티스를 띄울 때는 calico 등을 썼었는데 그것의 aws 버전

모니터링 테라폼 켤 때 aws cni 에서 ip 할당 안되는 에러 발생
인스턴스 마다 할당 가능한 ip 제한이 있다 - 근데 xlarge 정도면 충분한듯
aws cni 설정 중에 minimum ip 관련 설정이 있다
aws cni 설정을 지우고 띄워보니 뜬다
- [ ] warm 어쩌고 설정이 어떤 건지 확인
- [ ] 해당 ip 설정 어떻게 하면 좋을지 확인
- aws eks cni
	- 이 설정이 eks 설정 전체에 되는거라 minumum 설정 때문에 전체 ip가 부족했을 수 있을까?
	- warm ip
	- warm prefix target
		- 이걸 4로 했을 때의 의미는?
		- 이거 말고 다른 설정이 보통 안내되긴 하는데 잘 설정한거맞나?
		- ENABLE_PREFIX_DELEGATION 이 설정은 없어도 되나?
	- minimum ip target
		- 노드가 처음 나타날 때 최소 IP 할당 개수
	- l-ipamd
	- c6i.xlarge 58 - eni max pods
![[Pasted image 20231102182900.png]]
https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html

eni 할당 모드에 secondary ip mode와 prefix 모드가 있다
![[Pasted image 20231102170558.png]]
https://www.eksworkshop.com/docs/networking/prefix/
https://dobby-isfree.tistory.com/201
- secondary ip mode가 디폴트인데
- prefix 모드가 새로 나왔고 aws에서 권장하는 옵션
- prefix 모드로 하면 ip 할당에 api 호출이 필요없이 빠르게 된다고 한다.


https://aws.amazon.com/ko/about-aws/whats-new/2022/12/amazon-s3-automatically-enable-block-public-access-disable-access-control-lists-buckets-april-2023/
- s3 정책 수정되어서 최근 s3 버킷은 생성 시 ownership 유형 설정 추가 필요

loki 설치하니까 너무 팟이 많아서 인스턴스가 더 떠서 다 필요한 건지 확인
레플리카 줄여서 띄움

그라파나에서 로키 수동 등록

그라파나 ldap 로그인 다 허용되서 제한 필요


## 인프라 레퍼런스

#### 당근마켓 당근페이 인프라 구축 이야기

핀테크 기업으로서 보안 등 제약이 있는 상황에서 클라우드 서비스를 이용해야 했음

1. 로그인서비스를 어떻게 구성했는가
   - 계정 별로 환경 분리
   - 로그인 제한 -> 계정 별로 분리되어있지만 로그인은 대표계정에서 한다. cloudfnc와 동일하네
     - 로그인은 security라는 계정이고 이 계정은 로그인만을 위해서 사용하고, 이렇게 로그인하면 dev, sta, prod 계정에 접속이 가능하게 된다. 외부 접근권한이 있는 security가 탈취되어도 dev에 접근 못하게 되면 아무것도 할 수 없다는 식
   - 계정 탈취 시 여파 최소화
2. 서버 접근을 어떻게 할 것인가
   - teleport - ssh 접속 후 행동을 영상으로 녹화해서 보여준다
3. 애플리케이션 구성을 어떻게 할 것인가
   - kubernetes vs ec2
   - 쿠버네티스가 오버 엔지니어링이 아닐까 싶었지만
     같은 회사 다른 서비스에서 사용중이어서 조언을 얻을 수 있었고, 같은 팀의 팀원이 사용 경험이 있어서 충분히 도움을 받을 수 있는 환경이어서 사용하기로 했다
   - alb -> istio 변환 예정
4. 배포 파이프라인 구성을 어떻게 할 것인가
   - eks 에 맞는 도구를 찾으려고 했다
   - 툴에 대한 운영 경험이 있고 Github과 연계가 손쉽게 구성될 수 있는 기술 스택 선택
   - Github Actions, Argocd, Argocd pipeline
   - github 설치형을 n5.4xlarge 에 사용. 디스크 관리만 하면 무리없이 사용하기에 좋았음
5. 관측 시스템을 어떻게 구성할 것인가
   - 컨플라이언스 (보안) 문제로 SaaS 사용이 힘들었음 (Datadog, new relic 등)
   - ElasticStack, Prometheus, Grafana 로 직접 구축
   - FileBeat, Node Exporter 는 DaemonSet으로 올림
   - Prometheus Operator를 이용해 Prometheus를 구성함
   - AWS 리소스는 CloudWatch를 통해 모니터링
     - SNS -> AWS Chatbot을 통해 Slack 으로 발송. (이전에는 람다를 직접 구현했어야했음)
6. 성능 테스트를 어떻게 진행할 것인가
   - locust (kubernetes용인 klocust를 이용)
   - 테스트의 목적
     - 최대 성능을 측정하는 형태는 목적이 불분명
     - 10분 동안의 테스트를 통해 99퍼센타일 응답 시간이 100 ms 이내일 때의 최대 TPS를 구하려고 함 -> 99%가 진행됐을 때의 응답 시간이 100ms ?
     - 파드 하나당 400TPS 라는 수치를 얻게 됨
   - 테스트를 하면서 close_wait 소켓이 쌓이는 현상 발견. undertow를 netty로 변경

https://www.youtube.com/watch?v=8a2-b9X7Xno

#### 당근 채팅 시스템 아키텍처
큰 회사에서도 개발을 하는 인원은 적을 수 있고 최대한 매니지드 서비스를 이용하는 경향이 있다

dynamodb를 쓰면서 에러는 거의 안나서 안정적이었다
근데 쿼리를 잘 쓰기 어렵고 인덱스를 건 item만 가져올 수 있어서 인덱스를 잘 두어야하기 때문에 설계에 대해서 고민이 많이 필요함, Full scan은 안해야한다
채팅방 하나를 partition하나 정의
sort key는 message의 id로 설정

redis cluster로 stateless하게 웹소켓용으로 썼고 좋아보임


#### 람다를 이용한 아키텍처 모범 사례

> 서버 기반 아키텍처 모범 사례가 있습니다.(단일 장애 지점 제거, 배포 전 변경 사항 테스트, 중요한 데이터 암호화 등)
> - https://dc2348.tistory.com/6#:~:text=%EC%84%9C%EB%B2%84%20%EA%B8%B0%EB%B0%98%20%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98%20%EB%AA%A8%EB%B2%94%20%EC%82%AC%EB%A🙋‍♂️1%80%EA%B0%80%20%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4.(%EB%8B%A8%EC%9D%BC%20%EC%9E%A5%EC%95%A0%20%EC%A7%80%EC%A0%90%20%EC%A0%9C%EA%B1%B0%2C%20%EB%B0%B0%ED%8F%AC%20%EC%A0%84%20%EB%B3%80%EA%B2%BD%20%EC%82%AC%ED%95%AD%20%ED%85%8C%EC%8A%A4%ED%8A%B8%2C%20%EC%A4%91%EC%9A%94%ED%95%9C%20%EB%8D%B0%EC%9D%B4%ED%84%B0%20%EC%95%94%ED%98%B8%ED%99%94%20%EB%93%B1)

- 단순한 동작을 여러겹으로 겹치면 깔끔하고 보기도 좋지 않을까?
- 유닉스의 파이프라인처럼 api를 파이프라이닝 해서 원하는 값을 만들어도 괜찮을까
	- 함수형 프로그래밍을 이용해서 파이프라이닝 형태로 만들어주는 api를 만들어서 api로 api를 불러서 파이프라이닝 하는 것.


#### 시퀀스

어두운 도서관 입구에서 시작해서
가장 중심인 곳은 가장 밝은 판테온 형태의 밝은 전시관이 있다

[[2022-05-01#빨강 - 핑크 - 보라]]

#### 패턴화

가드레일을 만들되 자유도를 느낄 수 있도록

- 젤다의전설
- 오픈형월드게임

