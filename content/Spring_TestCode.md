---
title   :
summary :
date    : 2021-09-05 09:26:21 +0900
updated : 2021-09-05 10:32:13 +0900
tags    :
parent  : [[Blogging]]
---

# spring에서 테스트하기

## 왜 하는가

## 테스트를 위한 간단한 세팅

#### 작업환경
openjdk 1.8.0_282
ant 1.10.11

#### ant를 쓰는 상태에서 자동화 가능한지 확인

maven, gradle 아니고 ant로?
자동 리빌드 되게 할 수 있나?
docker로 띄워서 vscode에서 수정할 수 있나?
그 환경을 만들어서 할까, spring boot로 빠르게 올리고 maven도 그냥 쓸까

## 테스트 유틸과 버전

#### junit
junit4와 5 중에 5가 구버전도 지원해주는지 확인

junit5는 java8 이상

@Before -> @BeforeEach
@BeforeClass -> @BeforeAll
@After -> @AfterEach

#### mockito

@ExtendWith(MockitoExtension.class) 로 junit에서 mockito를 인식시켜줘야 함


## 테스트 시나리오

지금 하고 있는 업무에 바로 적용시킬 수 있는 케이스 위주로 탐색

#### 여러 분기들 중 특정 입력값일 때 그 분기대로 잘 가는지 확인

#### DAO - Service - Facade - Controller까지 흐름 확인하는 테스트

즉, mock db에서 데이터를 호출해서 url로 호출되는지 확인

#### javascript와 데이터 전달 테스트가 가능한지?

#### spring security 테스트!?

## 결론
(레거시 업그레이드는 힘들다..)
