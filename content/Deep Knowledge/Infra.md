---
title: Infra
summary:
date: 2025-05-06 19:57:59 +0100
updated: 2025-07-23 10:10:00 +0900
tags: deep_knowledge
---

# Cloud

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


# Security


# SRE

To upgrade site reliability

1. Monitoring
   - Monitoring various content
   - Make automation
2. Performance check

Quick recovery scenario

- Check error 5xx, when error occurred rollback to prev version. And reporting
  error situation. Which are link, behavior, data, code line, build package,
  (commit source)

#### 서비스 사용자 수용량 확인

서비스가 빠른지 확인 방법 Throughput, Latency

- Throughput 시간당 처리량 TPS, RPS 등
  - 병목 발생한다
- Latency 응답 지연 시간
  - 모든 서비스 지연시간이 영향을 준다

부하발생시키기
