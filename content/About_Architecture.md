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
