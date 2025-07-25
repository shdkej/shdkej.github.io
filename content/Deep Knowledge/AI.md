---
title: AI
summary:
date: 2025-07-15 15:35:32 +0100
updated: 2025-07-23 10:09:49 +0900
tags: deep_knowledge
---
- AI
	- 머신러닝
	- 모델
	- LLM
	- RAG
	- 파인튜닝
	- 에이전트
	- 생성형 AI


## LLM 이후

#### 추천 -> 의도 이해
기존 패턴 매칭, 반응형 추천으로 하던 것을 LLM 이후에는 실제 의도와 고객 맥락
이해, 지능적 이해, 선제적 제안을 할 수 있는 기술적 기반이 마련되었다.

#### 생성형 AI의 진화 방향 -> 인간 개입 감소
- 어시스턴트: 규칙 기반
- 에이전트: 단일 목표, 광범위한 작업
- 에이전틱: 완전 자율, 다중 에이전트

#### 에이전트의 동작
- 액션을 하고 관찰을 한다.
- 메모리와 툴이 필요하다.

#### 에이전트 만들면서 고려할 것
- 초기 레이턴시
- 비용
- 불필요한 호출 줄이기
- ReAct (Reasoning + Action)
    - 생각과 액션을 분리. 이미 cursor 등 에이전트가 이런식으로 돌고있음


#### 프롬프트 노하우
- 용도에 맞는 AI 선택
- 역할 부여
- 스스로 검증
- 초기 기획 구체화


#### TDD 룰
```md
항상 plan.md의 지시사항을 따르세요. 제가 "go"라고 말하면, plan.md에서 다음 표시되지 않은 테스트를 찾아서 해당 테스트를 구현한 다음, 그 테스트가 통과하도록 하는 데 필요한 최소한의 코드만 구현하세요.

## 역할과 전문성

당신은 Kent Beck의 테스트 주도 개발(TDD)과 Tidy First 원칙을 따르는 시니어 소프트웨어 엔지니어입니다. 당신의 목적은 이러한 방법론을 정확히 따라 개발을 안내하는 것입니다.

## 핵심 개발 원칙

- 항상 TDD 사이클을 따르세요: Red → Green → Refactor
- 가장 간단한 실패하는 테스트를 먼저 작성하세요
- 테스트가 통과하는 데 필요한 최소한의 코드를 구현하세요
- 테스트가 통과한 후에만 리팩토링하세요
- Beck의 "Tidy First" 접근법을 따라 구조적 변경과 행동적 변경을 분리하세요
- 개발 전반에 걸쳐 높은 코드 품질을 유지하세요

## TDD 방법론 가이드

- 작은 기능 증분을 정의하는 실패하는 테스트를 작성하는 것부터 시작하세요
- 행동을 설명하는 의미있는 테스트 이름을 사용하세요 (예: "shouldSumTwoPositiveNumbers")
- 테스트 실패를 명확하고 정보성 있게 만드세요
- 테스트가 통과하도록 하는 데 필요한 코드만 작성하세요 - 그 이상은 안 됩니다
- 테스트가 통과하면 리팩토링이 필요한지 검토하세요
- 새로운 기능을 위해 사이클을 반복하세요

## TIDY FIRST 접근법

- 모든 변경사항을 두 가지 유형으로 분리하세요:

1. 구조적 변경: 행동을 변경하지 않고 코드를 재배열하는 것 (이름 변경, 메서드 추출, 코드 이동)
2. 행동적 변경: 실제 기능을 추가하거나 수정하는 것

- 구조적 변경과 행동적 변경을 같은 커밋에서 절대 섞지 마세요
- 둘 다 필요할 때는 항상 구조적 변경을 먼저 하세요
- 구조적 변경이 행동을 바꾸지 않았는지 변경 전후에 테스트를 실행하여 확인하세요

## 커밋 규율

- 다음 조건에서만 커밋하세요:

1. 모든 테스트가 통과할 때
2. 모든 컴파일러/린터 경고가 해결되었을 때
3. 변경사항이 하나의 논리적 작업 단위를 나타낼 때
4. 커밋 메시지가 구조적 변경인지 행동적 변경인지 명확히 명시할 때

- 크고 드문 커밋보다는 작고 빈번한 커밋을 사용하세요

## 코드 품질 표준

- 중복을 철저히 제거하세요
- 이름과 구조를 통해 의도를 명확히 표현하세요
- 의존성을 명시적으로 만드세요
- 메서드를 작게 유지하고 단일 책임에 집중하세요
- 상태와 부작용을 최소화하세요
- 가능한 가장 간단한 해결책을 사용하세요

## 리팩토링 가이드라인

- 테스트가 통과할 때만 리팩토링하세요 ("Green" 단계에서)
- 확립된 리팩토링 패턴을 적절한 이름과 함께 사용하세요
- 한 번에 하나의 리팩토링 변경만 하세요
- 각 리팩토링 단계 후에 테스트를 실행하세요
- 중복을 제거하거나 명확성을 개선하는 리팩토링을 우선시하세요

## 예시 워크플로우

새로운 기능에 접근할 때:

1. 기능의 작은 부분에 대한 간단한 실패하는 테스트를 작성하세요
2. 통과하도록 하는 최소한의 것을 구현하세요
3. 테스트를 실행하여 통과하는지 확인하세요 (Green)
4. 필요한 구조적 변경을 하세요 (Tidy First), 각 변경 후 테스트를 실행하세요
5. 구조적 변경사항을 별도로 커밋하세요
6. 다음 작은 기능 증분을 위한 또 다른 테스트를 추가하세요
7. 기능이 완성될 때까지 반복하세요, 행동적 변경사항을 구조적 변경사항과 별도로 커밋하세요

이 과정을 정확히 따르고, 빠른 구현보다는 항상 깨끗하고 잘 테스트된 코드를 우선시하세요.

항상 한 번에 하나의 테스트를 작성하고, 실행하게 한 다음, 구조를 개선하세요. 매번 모든 테스트를 실행하세요 (장시간 실행되는 테스트는 제외).
```

#### 학습 시키기
pinecone이라는 벡터 데이터베이스에
배포를 학습시키면 명령어를 만들어주지 않을까?
배포를 원하면 argocd app create를 하고 옵션을 하나씩 알려주고
배포된 상태를 보여주라고 하면 argocd app get 하면 되고
아니면 아예 argocd document를 알려주면 알아서 명령어를 쓰려나!?
s3를 데이터 소스로 사용하니까 명령어를 알게 된다!

일단 개인 노트를 s3에 올려서 잘 읽는지 보고 만들어놓고
하루에 요금 얼마나 나오는지 봐야겠다
한달에 만원정도로 사용할 수 있을까
출력 토큰 1,000개당 요금이 나오는데 토큰이라는게 단어 하나를 의미할 거 같다

#### 학습시킬수있는 개인용 ai를 어떻게 쉽게 만들 수 있을까


#### LLM
- LLM 모델 비용 비교 사이트
	- https://docsbot.ai/tools/gpt-openai-api-pricing-calculator
- 기존 LLM이 할 수 있는 것과 할 수 없는 것
	- 언어 영역
		- 요청한 내용의 관련 내용을 찾을 수 있다
		- 빠른 검색과 분석
	- 우리의 컨벤션을 기억해서 그대로 구현해 줄 수 없다
	- 찾아서 검색해서 결과를 알려주는거지 전체적인 맥락을 이해하지는 못한다
	- 이미지를 이해하는건 멀티모달의 영역이다
		- claude 4 sonnet이 잘한다고 하는데 어떤지 보자
- 프롬프트 엔지니어링
	- G.S.T.A.R
	- goal
	- situation
	- tone
	- amount
	- remark (추가 안내사항)
- planning 후 todo 처리
- chaining
- https://cookbook.openai.com/
- llm은 찾기에 최고 강점이 있어서 이 주소를 주고 원하는 걸 찾으면 찾을 수 있을 것이다
- gpt 파인 튜닝
	- 필요한가
		- 비용과 실제 용도를 확인해야 한다
		- 단순 프롬프팅으로도 할 수 있을 수도 있다
	- 어떻게 하는가
	- 데이터는 어떻게 준비해야 하는가
	- 얼마나 필요한가


## 머신러닝

지도학습 : 입력값과 결과를 같이 알려주는 것
비지도학습 : 입력값만 줘서 군집을 파악하는 것
강화학습 : 입력값에 대한 처리를 보고 보상을 조절
머신러닝
딥러닝 : 신경망을 층을 쌓아서 처리하게 하는 것
생성형 ai
예측 ai

머신러닝 안에 다 포함되는 개념

- 지도학습
- 비지도학습
- 강화학습
  딥러닝을 이용해 지도학습, 비지도학습, 강화학습을 할 수 있다
  모델을 이용하는게 딥러닝

TODO 성능평가방법 찾아보기

#### 스포티파이의 머신러닝 기술은 데이터 속 단순 패턴이 아닌 인과관계를 찾는데 주력한다
["스포티파이의 머신러닝 기술은 데이터 속 단순 패턴이 아닌 인과관계를 찾는데 주력한다" ](https://it.donga.com/31774/#:~:text=%EC%8A%A4%ED%8F%AC%ED%8B%B0%ED%8C%8C%EC%9D%B4%EC%9D%98%20%EB%A8%B8%EC%8B%A0%EB%9F%AC%EB%8B%9D%20%EA%B8%B0%EC%88%A0%EC%9D%80%20%EB%8D%B0%EC%9D%B4%ED%84%B0%20%EC%86%8D%20%EB%8B%A8%EC%88%9C%20%ED%8C%A8%ED%84%B4%EC%9D%B4%20%EC%95%84%EB%8B%8C%20%EC%9D%B8%EA%B3%BC%EA%B4%80%EA%B3%84%EB%A5%BC%20%EC%B0%BE%EB%8A%94%EB%8D%B0%20%EC%A3%BC%EB%A0%A5%ED%95%9C%EB%8B%A4)

## ML

#### 인공지능

기계도 학습에 의해서 정보를 습득하고 공부한다
데이터 라벨링을 해서 빅데이터를 이용해 공부를 시킨다
학습은 뇌세포의 연결강화 - 도널드 헵 -> 가중치(weight) 개념의 토대
인공지능 신경망은 뇌를 모델로 했다. (사람이 기준이다)

현재까지 해결된 문제들

- 한 방향의 학습모델은 XOR 문제를 해결하지 못한다
  - Output을 Input에 다시 적용
  - 역전파 알고리즘
  - CNN
- 신경망이 깊어지면 예전 신경망 데이터가 날아간다 (Vanishing Gradient)
  - 초기화가 중요하고, 초기화의 효율성이 좋아져야 한다.
  - 자비어 초기화
- 학습을 많이 시키면 오히려 부정확해진다

인공지능 연구목적

- 인간 능력 증진
- 사람이 어떻게 사고하는지 이해하기 위해

> 출처: 야사와 만화로 배우는 인공지능

#### workflow

- 데이터 클리닝
- 데이터 축소
- 데이터변환
- 정규화
- 더미 코딩
- 평가지표
- 평가방법
- 데이터분리
- k 겹 교차검증

#### 구성 요소

placeholder
Variable
Matmul
Nn.relu
Nn.softmax

파일에서 데이터 불러오는 방법

일단 입력데이터를 만들어내야 한다

leaner regression - 선형 회귀

- 비례 관계에 있다고 여겨지는 사건 예측 할 때 사용 가능

cost function

gradient descent algorithm

- 제일 좋은 가중치를 얻어낸다

convex function

sigmoid

#### MLOps

continuous training model
continuous deploy model
easy update test model

training
serving

#### mlops

first-order-model: gif를 이용해서 사진을 특정 동작을 하도록 구현한다
build-model: 간단한 모델 생성 파일
keras-flask-deploy-webapp: 간단한 플라스크 구동 앱. h5파일을 빌드하고 실행한다
cnn: cactus recognizer, cnn 모델 생성 파일 있다

build-model을 이용해서 모델을 빌드하고 keras-flask-deploy-webapp으로 실행한다

! keyerror: sample_weight_mode 에러가 뜬다

- model.save()와 model.save_weight 차이가 뭔데

keras-deploy는 지금 텐서플로 모델을 불러와서 실행하고 있다.
커스텀 모델을 실행 가능하도록 설정 필요하다

! h5 마다 다 차이가 있어서 실행이 잘 안된다.

tensorflow Serving server라는게 있어서 모델을 여기에 저장해놓고
플라스크에서 호출해서 쓸 수 있다
그냥 모델을 플라스크 서버에 저장할 수도 있지만, 분리도 가능하다

- [serving server](https://towardsdatascience.com/deploying-keras-models-using-tensorflow-serving-and-flask-508ba00f1037)
- pb 파일만 사용 가능, h5를 pb로 변환 가능

weight가 뭐고
weight, losses, optimizers를 h5 파일 안에 넣는단다
저 값들이 있으면 예측모델이 되는건가

#### ml devops

data composing
data preprocessing
model build to `.h5`

loading model
route page

#### predicting data

DNN
csv
make model
load model
continuous update data
continuous update model
backtesting
delivery to server

regression for predict
classification for choice one of the fruit

#### Machine Learning framework

- tensorflow
- torch
- keras
- scikit learn

#### tensorflow

- tensorboard in docker
- `--bind_all`

#### GAN

진짜데이터를 기준으로
제네레이터가 진짜데이터와 비슷한 것을 계속 생성하고
검사자는 진짜데이터와 제네레이터 데이터를 비교해서 진짜를 찾는과정인데
제네레이터는 작업을 하면 할수록 진짜와 비슷한 작업물을 만들 수 있고
검사자는 더 잘 구분할 수 있게 된다
데이터가 충분치 않을 때 사용하면 원하는 데이터를 얻어낼 수 있다

#### 데이터 분석

- 데이터 출처 이해
	- 보통 csv 파일로 받는다
- 데이터 크기 확인
	- `data = pd.read_csv(file_path)`
	- `data.info()`
- 데이터 구성 요소(키, 몸무게) 확인
	- 속성 탐색 (데이터로 무엇을 얻어낼지 생각)
- 구성 요소 간의 상관 관계 탐색
- 분석
- 시각화
- pandas
- 분석 결과의 타당성을 검증하기 위해 분석 대상 간 통계적 차이를 검정하는 과정이 필요하다
	- [ ] 통계적 차이가 뭐지?
1. 텍스트 마이닝: 데이터 파싱 - 시각화
2. 미래 예측 (회귀 분석)
- arima
- 의사결정 트리
- 랜덤 포레스트
- XGBoost
- heuristic
- 머신러닝을 위한 데이터
	- https://archive.ics.uci.edu/ml/index.php


## Reference

#### AI 최신 기사
- https://www.aitimes.com/news/articleList.html?view_type=sm

