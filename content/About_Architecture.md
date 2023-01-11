---
title   : 아키텍처
summary :
date    : 2021-05-20 20:33:31 +0100
updated : 2021-12-04 13:31:43 +0900
tags    : develop
---

## [[확장성]]

## [[아키텍처]]
> 정책과 세부사항으로, 룰과 가이드를 구분.
> 아키텍처의 목표는 정책과 세부사항을 적절히 구분해 세부사항의 결정은 최대한 미룰
> 수 있게 하는 것
>> 클린 아키텍처

아키텍처 구축의 목표점은 없다
**좋은 기준점을 만들어서 그 기준점을 계속 개선해나가는 것이 최선**

이런 관점에서 쿠버네티스, react, graphql, backend를 어떻게 구성해야하나?
정책과 세부사항이 너무 많으면 기준점을 잘 지켜나갈 수 있을까?

선택과 집중, 유연하고 융합적인 환경 - 두 가치를 어떻게 잘 융합할 수 있을까

분산화 하는 것이 시대의 흐름

심플하게 유지. 0에서 10은 심플이 아니다. 100에서 10이 심플

제한이 필요하다

큰 그림 > 작은 그림

비즈니스 로직에서 추상화를 어디까지 하는게 좋을까
과한 추상화는 실체가 없다는 느낌을 줄 수 있겠다.
어디까지 추상화를 할지는 어떤 목적으로 프로그램을 만드느냐에 따라 조정된다
모든 것이 추상화되고 가변적일 필요는 없다
Mysql tip 글에서 DB 모델링 시 지나친 추상화를 하지 말라는 조언이 있었다.
- 언어를 넘어서는 추상화
    - 포팅을 쉽게 할 정도의 추상화

설정가능해야하고 플러그인 방식으로 동작

## [[MSA]]
## [[Devops]]
## 프로젝트를 [[모듈]]로 구성
## [[분산]]

-----------------------------------------------------------------------

## SRE
To upgrade site reliability
1. Monitoring
    * Monitoring various content
    * Make automation
2. Performance check

Quick recovery scenario
* Check error 5xx, when error occurred rollback to prev version. And reporting
  error situation. Which are link, behavior, data, code line, build package,
  (commit source)

#### 서비스 사용자 수용량 확인
서비스가 빠른지 확인 방법 Throughput, Latency
- Throughput 시간당 처리량 TPS, RPS 등
    - 병목 발생한다
- Latency 응답 지연 시간
    - 모든 서비스 지연시간이 영향을 준다

부하발생시키기

## 아키텍처 레퍼런스

#### 시퀀스    
어두운 도서관 입구에서 시작해서  
가장 중심인 곳은 가장 밝은 판테온 형태의 밝은 전시관이 있다


[[2022-05-01#빨강 - 핑크 - 보라]]


#### 패턴화  
가드레일을 만들되 자유도를 느낄 수 있도록  

젤다의전설  
오픈형월드게임


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
