---
title   : Document
summary : 어떻게 하면 문서화를 잘 할 수 있을까
date    : 2020-08-04 20:50:58 +0100
updated : 2025-07-23 09:59:12 +0900
tags    : communication
---

## 문서화
#### 좋은 문서화

최신 상태가 유지되고 찾고 싶은 것이 바로 눈에 띄여야 한다.
접근하기 쉬워야하고 수정하기 쉬워야한다

[[Evolve#많은 양을 잘 관리하는 방법]]

#### tdd에 대한 얘기가 나오면 tdd가 잘 정리된 링크를 뽑아놓은 것을 딱 전달한다
- 그 개수는 3개를 넘지 않아서 바로 공유를 할 수 있다
- 그러면 비슷한 수준의 이야기가 진행될 수 있고 내 머리속에도 그 내용이 정리될 수 있다
#### documentation for
- document for developer
- document for client
- use standard

#### swagger
django rest framework에 api를 자동으로 문서화해주는 기능이 있다


## 사내 위키 잘 쓰는 법

#### 도큐먼트 중심으로 정보관리를 하고 기준을 세운다
정보의 집적을 위해 입력창구와 출력창구를 하나로 통일한다
입력창구가 하나여야 모두가 그 질문에 관심을 가질 수 있다
근데 입력창구가 하나면 접근하는 사람이 많아서 올라오는 글들이 많아지면 이전의
것들이 묻히는 문제가 있다

애초에 그 전에 질문하지 않으려는 것도 문제다

많아서 문제가 생기는 부분은 태그로 표시해서 필터링할 수 있도록 하면 될까?
없어서 문제가 생기는 부분은 질문이 없을리가 없으므로 유도를 해야한다

#### 컨플루언스 기능
고객 인터뷰 기록
새로운 기능에 대한 요구사항 작성
팀 내부 기술문서
릴리스 계획
팀 내부 회의

맥락도 적을 수 있도록 한다
외부 문서들을 첨부할 수 있어서 한 곳에서 모아서 볼 수 있다
디자인 목업을 확인할 수 있다
지라와 연동할 수 있다

문맥 사전을 만들지 않고 컨플루언스를 쓰면 될까?

#### 문서는 컨플루언스, 노션을 이용해 집적 가능한데
코드는 어떻게 집적하고 확인하고 사용할 수 있을까
javascript에서는 npm package로 모두 관리한다
golang에서는 modules
python에서는 pip
한 프로젝트 안에서 관리한다면 github에서 찾아볼 수는 있다.
근데 일일이 하나하나 찾아봐야 하고, 쉽게 찾고 쓸 수 있는 도구가 필요하다.
데이터는 이미 있다. 어떻게 찾고 사용하느냐가 중요하다
- 현재까지의 해결책은 머신러닝과 추천 알고리즘.
- 정말로 집적이 필요한가. p2p로 분산데이터를 확인할 수도 있다. ipfs는 어떻게
  전체를 조망할 수 있을까


## Trouble shooting
문서화를 어떻게 하면 동일문제 발생 시 문서만 보고 처리 가능한가?
에러명을 적고 설명을 적으면 비슷한 에러라도 다양한 원인, 같은 원인이지만 다른 에러가 날 수 있는데

#### 에러 리포팅
- 문서 안에서 댓글 다는 방식
- 윈도우의 리포트 방식
- 깃랩에서는 어떻게?

에러의 출처와 어떤 내용인지는 필수적으로 필요 할 것 같다.
에러가 들어오는 곳은 하나로 통일 되어야 할 것이다.

## readme
readme에 아키텍처 한눈에 보게 하고
각 폴더의 역할에 대한 설명 간단하게 적기

## 제품 소개
- 한줄 소개
- Demo
- 이미지와 동작과정(gui가 없으면 터미널 동작이라도)
- 메인 기능
- 경험 소개
- 비교

내가 만든 프로젝트들 패키지로 만들어놓고 서버에 배포하는 것까지 정리를 하고, 덧붙일 것은 나중에 덧붙이기. 도큐먼트, 패키지, API, 로그

[[Product]]

#### 제품 소개
- 데모사진
- 사양
- 실 사용 시나리오
- 장단점
- 내가 살 때 고려한 것

#### 사용 가이드를 프로그램 안에 넣어놔야겠다

일단 제품 링크 들어가면 무슨 일을 하는 툴인지 확인하고 실제 어떻게 동작하는지 보고 퀵 스타트로 간단한 예제 본다

#### 새로운 툴에 대해 아는 순서
- 이것의 정의 (이게 뭔지)
- 이게 왜 필요한지
- 어떻게 쓰는지

#### demo page
스크립트 실행하는 영상을 svg로 변환해서 깔끔하게 재생할 수 있는가보다

#### 제품 소개
어떤 실제적 사례가 있는지 소개

인터랙티브가 느껴져야겠다. 현재 활발하게 서비스 중인지. 곧 없어지진 않을지

다른 사람들이 만든 tutorial에서 내가 원하던 것 외에 또 사용하는 라이브러리가 있으면 거부감이 들어 쓰려고 하지 않았다. 최소한의 뼈대만으로 구현하고 싶어서 그랬다.

#### Many Official document's problems
- it's doesn't have experience.
- 공식 문서에는 없는 내용이 경험을 가미한 개인의 블로그글에서 있고, 그게 더 도움이 될 때가 있다
단순 역사 흐름 속에서 수많은 세부 내용과 운명을 가를 선택이 있고, 그 정보는 넓게 퍼져있다


## ETC
#### 코딩관련 글은 실제적 예제가 있으면 좋겠다
+ 개발 관련 문서는 소스버전관리프로그램과 연동되있어야 업데이트가 쉽겠다

#### 문서화
자동 문서화
Api, test scenario, monitoring point

수동 문서화
- 주요 시나리오
    - 내가 이런 부분을 신경써서 만들었다를 알려주고 신경 쓰지 못한 부분을 알 수 있다
- 아키텍처
- 모델
- 데모

메타 문서함
- 용어 사전
- 유의어 사전
- 년도별 묶음
- 인덱스 페이지

#### 라인의 문서화
신입 가이드
테크스펙
코드를 고치고 정기적으로 배포할 때의 절차
비상상황 행동 방침을 합의해놓은 팀 문서

느낌은 전수되지도 않고 일관되지도 않다
느낌이 아닌 원칙을 만들어 나가면 전수받고 같이 성장할 수 있다

[[Journal#Writing technique]]

#### google analytics
utm을 주소 뒤에 붙임으로써 어느 경로로 들어왔는지 확인할 수 있다.
개발자스럽다에서 여러 링크를 제공해주는데 그 링크에 utm으로 자신의 주소를
걸어놓으면 링크 주인은 개발자스럽다에서 들어왔다는 것을 확실히 알게된다.
나도 내 블로그에 걸어둔 링크에 저걸 넣어야하나 아니면 구글에서 알아서 해주나?

마케팅 측면에서 SNS에 홈페이지 주소를 올리고 UTM 정보를 적어서 어떻게 들어오는지
확인할 수 있다.

#### 국제화하는방법
일단 표시되는 글자를 파일을 읽도록 뺀다
파일에 한 언어 말고 여러 언어를 입력할 수 있도록 한다
파일을 직접 열어서 수정하지 않고 바로 수정할 수 있도록 한다

#### 세계화와 각 나라의 관습
- 읽는 방향은 국가별로 일관성이 있다
- 만화에서 좌에서 우로 본다는 관습적인 속성을 이용해서 말풍선을 배치한다
- 일본만 해도 읽는 방향이 반대인데, 만화라는 컨텐츠는 이동 시 수정이 필요하다
- 애초에 쓰는 언어가 다르긴 하지만...


#### 히스토리 문서
"히스토리
그러다가 일지 개념에서 발전한 히스토리 문서가 있으면 좋겠다고 생각을 하게 됐어요. 사실 사람들이 히스토리를 남기지 않는 이유는 그냥 귀찮아서가 아니에요. 남기고 싶어 하지만 어디다 어떤 사실을 남겨야 할지 모르기 때문에 망설이다가 잊어버리는 거예요.

그래서 처음에는 아주 단순하게, 특정 프로젝트를 진행하기 위해 해야 하는 것들을 날짜별 체크리스트로 만들었어요. 날짜마다 관련된 문서나 슬랙 대화 목록 등을 스크린샷을 찍어서 넣어뒀고요.


일지에서 히스토리로, 히스토리에서 문서로.

이렇게 작성한 체크리스트는 프로젝트 배포 이후에도 계속 유지를 했어요. 그리고 어떤 문제가 생겼다면 문제를 어떻게 인지했는지부터 해결했는지 문서로 정리해서 서브 문서로 만들어서 링크해놨습니다. 나중에 회사에 처음 와서 프로젝트를 새로 시작하시는 분들이나, 새로 팀을 이동해온 분들께 이 문서를 드렸더니 업무에 도움이 많이 됐다고 전해주셨고요.

그리고 이렇게 하면서 각각의 방법도 같이 문서를 남기면 좋겠다 싶었어요. 그래서 히스토리 문서에 각각의 방법에 대해 서브 문서를 만들어놨어요.

이렇게 히스토리를 남기는 방법에 대한 선례가 생겼잖아요. 그러니까 그 다음 프로젝트에서도 이걸 보고 따라하는 식으로 비슷한 스타일의 문서가 조금씩 추가되었습니다. 이 문서들만 쭉 읽어보기만 해도 새로운 분들한테 온보딩도 되고 히스토리를 알 수 있다는 점에서 굉장히 좋았습니다.

"
(https://www.inflearn.com/pages/weekly-inflearn-38-20211228#:~:text=%EB%AC%B8%EC%84%9C%EB%A1%9C%20%EB%A7%8C%EB%93%A4%EA%B8%B0%EB%8F%84%20%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4.%C2%A0-,%ED%9E%88%EC%8A%A4%ED%86%A0%EB%A6%AC,%EB%B6%84%EB%93%A4%ED%95%9C%ED%85%8C%20%EC%98%A8%EB%B3%B4%EB%94%A9%EB%8F%84%20%EB%90%98%EA%B3%A0%20%ED%9E%88%EC%8A%A4%ED%86%A0%EB%A6%AC%EB%A5%BC%20%EC%95%8C%20%EC%88%98%20%EC%9E%88%EB%8B%A4%EB%8A%94%20%EC%A0%90%EC%97%90%EC%84%9C%20%EA%B5%89%EC%9E%A5%ED%9E%88%20%EC%A2%8B%EC%95%98%EC%8A%B5%EB%8B%88%EB%8B%A4.%C2%A0%C2%A0,-%EC%A7%9D)


#### 코드의 메뉴얼
디자인 시스템
https://news.hada.io/topic?id=5597
