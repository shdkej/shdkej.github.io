---
title: AI
summary:
date: 2025-07-15 15:35:32 +0100
updated: 2025-07-23 10:09:49 +0900
tags: deep_knowledge
---
![study_ai](../img/F4fl0tfacAAt-8z.jpeg.jpg)


- AI
	- 머신러닝
	- 모델
	- LLM
	- RAG
	- 파인튜닝
	- 에이전트
	- 생성형 AI
- LLM
	- RAG
	- Vector Store
	- MCP
	- Agent

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

#### GPT
generative pre-trained transformer
- 생성형
- 미리 학습된
- 이 데이터에서 규칙을 찾아 내 - 트랜스포머의 역할


#### 프롬프트 노하우
- 용도에 맞는 AI 선택
	- 자료 기반 AI 대화 : NotebookLM, Lilys AI
	- 범용 기반 AI 대화 : chatGPT, claude
	- 검색 기반 AI 대화 : perplexity
- 역할 부여
- 스스로 검증
- 초기 기획 구체화
- 프롬프팅
	- 3명의 전문가가 토론하는 라운드테이블 대화를 만들어줘
	- 주제 빠르게 배우는 로드맵을 알려줘 
	- 어려운 개념은 초등학생도 이해할 수 있게 알려줘
- 이미지 프롬프팅
	- 복잡한 디자인 배제
	- 프롬프트 명확한 지침
	- 잠재적 문제 최소화
	- https://sshong.com/blog/15161
- 프롬프팅
	- https://maily.so/airecipe/posts/8do78ydnrgq
	- 적극성을 제어해야한다. (AI가 알아서 하게 할지, 이것만 하게 할지)
	- 모르는 게 있어도 스스로 찾아라
	- 천천히, 깊게 생각해라 (ultra thinking)
	- gpt5는 기본적으로 "신중형" 성향이라 가능한 모든 맥락을 모으고 최대한 확실하게 답을 주려고 한다. 그래서 완전히 정확하지 않아도 된다고 명시해주면 수집 단계가 조금 빨리 넘어감
	- https://maily.so/airecipe/posts/32z8wgp1zn4
	- 깊이, 길이, 적극성을 조절한다
	- https://maily.so/airecipe/posts/8mo5pj9nz9p
	- 페르소나를 구체적으로 설정해줄수록 세밀한 답변을 받을 수 있다
	- 나의 상황을 솔직하게 공유
	- https://maily.so/airecipe/posts/w6ov6yy7zk5
	- 구현 잘된 이미지 프롬프트
- 프롬프트
	- 이 작업을 잘 모르는 동료가 할 수 없다면 클로드도 못한다
	- 맥락 정보가 있으면 더 잘한다
	- 아래 프롬프트를 개선하기 위해 나한테 4가지 질문해줘 그것을 기반으로 프롬프트 만들어줘
	- 사고과정을 출력하게 해서 생각의 연쇄를 만들게 해야 진짜로 깊게 생각함. 단순한 것부터 복잡한 순으로
	    - 단계별로 생각해보자
	    - 이건 특정인의 사고연쇄과정을 물어보는 식으로도 쓸 수 있다. 전문인의 지식이 녹아있기 때문에.
	    - 근데 이걸 잘 뽑는 것도 프롬프팅을 잘 써야할 듯
	- [프롬프트 엔지니어링 가이드 사이트](https://www.promptingguide.ai/kr/introduction/examples)
	- https://docs.anthropic.com/ko/docs/build-with-claude/prompt-engineering/overview#vs
	- xml 형식처럼 열고 닫는 태그로 요청 구분
		- xml 이란 html처럼 미리 정해진 태그가 아니라 사용자가 지정할 수 있는 태그를 쓰는 마크업 언어
- 강조는 효과가 있다
	- ** Strict Rules! 반드시 이 룰은 지키게 됩니다. **
- AI는 거인의 어깨에 제대로 올라탈 수 있는 기회다
- 검색이 아닌 질문



#### 프롬프트를 쓰면서 오히려 더 배우게 된다
- 직관을 가지게 된 나의 사고과정을 스스로 다시 상기해서 프롬프트에 넣어주는 작업을 하게 된다
- 운영 안정성 검증도 프롬프트로 물어보면 된다
	- 코드 테크닉은 결국 필요하다
	- 서비스 중단 시 데이터 정합성 문제 없을 것인가
	- 데이터가 선형적으로 증가할 때 속도도 선형적으로 느려질 것인가
	- a/b 테스트 가능한가
	- 기능 플래그 사용으로 배포가 가능한가
	- 오래 걸리는 작업은 배치로
	- 상태와 무상태 구분
	- 모든 스키마를 json으로 처리하는건 인간이 보기 힘듬

#### AI 컨텍스트
- https://memoryhub.tistory.com/entry/AI-%EB%AA%A8%EB%8D%B8%EC%9D%98-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8-%EA%B8%B8%EC%9D%B4-%EC%99%84%EC%A0%84-%EB%B6%84%EC%84%9D-%F0%9F%A7%A0-GPT-4%EB%B6%80%ED%84%B0-Claude-Gemini-Llama%EA%B9%8C%EC%A7%80
- gpt4 turbo는 400페이지 분량의 책에 해당하는 정보까지 컨텍스트로 가질 수 있었음 (128K)
- gpt-4o는 128K
- gpt3는 1024였음
- gpt5는 400K, 24년 9월까지 데이터
- gemini 2.0은 2G
- claude 3.7, 4 sonnet은 200K
- 토큰 최대치에서는 성능이 제대로 안나오고 성능 포화점이 더 낮은 지점에서 존재하고 있음
- 토큰이 증가하면 비용도 증가한다

#### 벡터 스토어
- 들어온 정보와 유사한 정보를 검색해서 대답할 때 사용하는 기술
- 앞서 관련된 정보가 있으면 찾을 수 있다?
- 사실적인 정보를 쿼리할 수 있다?
- 청킹으로 컨텍스트 분리
	- 청킹 방법별 특징
	- 고정 크기 청킹
	- 시맨틱 청킹
	- 재귀적 청킹


#### 초지능 인공지능에 순응할 것인가
만약에 초지능 인공지능이 만들어지면 그 인공지능을 인간이 막을 수 있는 능력이 없다면
- 1. 인공지능에 순응한 채로 살아간다
- 2. 억제할 방법을 어떻게든 찾으려고 살아간다
- 나는 어떤 스탠스로 가야할까
- https://littlefoxdiary.tistory.com/105
- 지금은 플랜을 세우고 그걸 하나 하나 체크하는 식으로 AI를 돌리니까 제어가 가능하다

#### 프롬프트 아카이브
- TDD
- My Clean Architecture
	- 사이즈가 작을 때는 상관없고 좀 크게 갈거 같을 때 고려한다 아 프로젝트가 작아도 파일을 그 이름으로 만들면 되고 사이즈가 커지면 파일명대로 폴더로 만들어서 기능별로 분리해도 되겠다. 근데 람다니까 기능으로 또 나누면 되니까 파일레벨에서 다 끝나게 해도 좋을듯
- 프로덕션 레디 상태가 필요할 때 체크리스트로 몇개 뽑는다
	- 퍼포먼스, 보안, 모니터링, 안정성, 
	- 코드레벨에서는 로그 잘 남기고 피처플래그 잘 보고, 트랜잭션 확인만 하고 병렬처리만 신경쓰자
	- 이벤트 드리븐, 캐싱은 인프라에서 처리하고 싶은데 가능할까?

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


#### AI Stack
![ai_stack](ai_stack.png)
AI Stack
- https://www.youtube.com/watch?v=0HB6NIrRe2A
- Semiconductor
- cloud
- fm
- application

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

