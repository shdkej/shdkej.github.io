---
title: Software
summary: Language, Web
date: 2020-04-06 14:37:26 +0100
updated: 2025-07-23 10:07:33 +0900
tags: fundamental
---

## 소프트웨어

- 사람 - 소프트웨어 - 사람
- 제작자 - 소프트웨어 - 유저
- 소프트웨어 - 유저
- 물건 - 유저

결국 사람이 기준이다. 소프트웨어는 개발자, 소프트웨어 자체, 유저에게 모두 영향을 받고 미친다

#### 소프트웨어는 현대의 도구다

소프트웨어는 망치 같은 도구가 될 수도 있고 하나의 작은 우주가 될 수도 있다.
필요한 것을 공간, 시간의 제약 없이 쓸 수 있는 도구
메타도구
먹을 것이 필요하면 소프트웨어를 통해 먹을 것을 구하고
공부를 하기 위해 소프트웨어를 통해 공부할 것을 구하고

메타적이다는 것이 추상적이고 더 상위개념 같지만 실제 문제해결을 하는 것이
아니라는 생각이 들기도 한다
사용자에게 직관적인 사용이 되어야 한다

#### 소프트웨어는 변경을 위해서 있다

종이에 쓰면 수정이 힘든 것에 비해 소프트웨어의는 변경이 자유롭다

선택 전에 기준을 세우는 것에 고민을 하고, 기준점에만 들어온다면 빠르게 선택한다
기준은 목표점이 되고, 피드백을 만들어준다

#### 계속 관리해주지 않아도 유지되는 소프트웨어가 만들어질 수 있을까

#### 컨셉을 가진 소프트웨어

풀속성 포켓몬만 모으는 사람처럼 컨셉을 가지면 재밌겠다
근데 시야가 좁아지고, 특정한 영역에 고립되는 것은 조심해야겠다

#### Algorithm vs Program
- Algorithm: Mathematically complete composition.
- Program: Combination of Algorithm.

#### 소프트웨어, 서비스에서 무료로 제공되어야 하는 부분과 돈을 받아야 하는 부분

기능의 90%는 무료로 제공하고 10%는 유료로 제공해야 한다는 의견이 있다.

- 유튜브의 광고 정책과 컨텐츠 소비의 가치에 대해
  - 유튜브가 동영상의 광고를 임의로 넣고 있다.
    컨텐츠 제공자는 광고를 안넣고 싶다고 해도 유튜브에서 강제로 넣는 것이다.

#### software to make money

소프트웨어나 컨텐츠에 돈을 안쓰려고 하는 경향이 있다
내가 소프트웨어로 돈을 벌어야 하는데 돈을 안쓰면 내 소프트웨어도 가치를 인정받기 어렵다
소프트웨어에 돈을 쓰기 싫어하는 이 생각을 어떻게 바꿔야 할까

앞으로는 개인 맞춤형 서비스가 인기를 끌 것 같다. 그치만 개인은 돈을 안쓰려고 한다

#### 맨투맨 서비스

#### 개인 맞춤형 서비스

인구 감소 - 내수 시장 축소 - 개인 맞춤형 서비스 - 데이터 많으면 유리
데이터를 많이 갖고 있는 회사는?
네이버, 카카오,
사용자가 많은 회사
삼성, 애플, 통신사
정보를 모으고 있는 회사

#### 변화를 감지하는 시간 200ms
지연됐다고 느끼는 시간은 이 시간 이후.
애플은 의도적으로 버튼 동작 타이밍을 200ms에 맞췄다

## Agile

product build in one day. design to deploy

#### TL;DR

- **Individuals and interactions** over processes and tools
- **Working software** over comprehensive documentation
- **Customer collaboration** over contract negotiation
- **Responding to change** over following a plan

* https://www.agilealliance.org/agile101/the-agile-manifesto/

#### 애자일의 완성도

다 완성된 후에 보여주는 완성도보다 구현한 것을 계속 확인받으면서 수정해나가는
완성도가 높다

- 서비스를 기획하는 상황이라면 도메인 전문가가 고객의 역할을 할 수 있겠다.
  기획자가 도메인 전문가가 될 수도 있고

고객은 잘 되고 있는지는 알고 싶어하지만, 계속 물어보는 것은 원하지 않는다


## Concurrency

- Race conditions
- Deadlocks
- Testing Concurrency

#### 동시성 병렬성 블록킹

- 동시성 : 하나의 코어가 여러 작업을 조금씩 하는 것, = 비동기, 전체 동작시간은 같지만 효율성 증가됨
- 병렬성 : 코어나 스레드를 여러개 두어 여러 작업을 한번에 하는 것, 시간은 줄어들지만 비용이 증가
- 동기 : 하나의 코어가 하나의 작업만 하는 것
  멀티스레드라도 동기적으로 할 수 있다
- 블록킹 : 제어권을 계속 가지고 있는 것
- 논블록킹 : 비동기와 비슷한데 제어권을 하나의 작업이 가지고 있지 않게 하여 여러 작업이 제어권을 가질 수 있게 하는 것으로 비동기가 되면 논블록킹이 따라오는게 일반적이다
- 비동기인데 블록킹이면 작업이 여러개 진행되어 다른 작업이 먼저 완료되어도 제어권을 가지고 있는 작업이 늦게 끝나면 먼저 완료된 작업이 아무런 이득이 없다.

이것들은 I/O에 대한 것으로 CPU나 memory에서 작업을 어떻게 할지에 대한 것이다.

넌블록킹 알고리즘이라는게 있는데
멀티쓰레딩에서 하나의 쓰레드가 오류가 나거나 멈췄을 때 다른 쓰레드에 영향을 주지 않게 하는 것을 말한다.

golang에서 goroutine은 비동기로 기본 동작하고, for 문으로 goroutine을 여러개
만들면 병렬적으로 동작한다

비동기라는 말이 동기화가 안된, 실시간이 아니라는 말로도 쓰인다
비동기 통신으로 상대방을 신경 쓰지 않고 전달해놓는 것. 문자메시지.
동기는 전화

#### 비동기 프로그램의 실행 처리 사례

사용자가 입력을 주는 부분 A
반응 해야 하는 부분 B
B는 A에다가 함수를 전달해놓고
A가 특정한 상황이 되면 B를 실행시키도록 하면
B는 루프를 돌면서 응답을 확인하지 않아도 A에 의해 실행 될 수 있다
(SetTimeOut 이나 while 루프를 돌 필요가 없다)
여기에 더해 중간에 메시지 큐를 이용하면
A와 B가 서로 연결되어 있지 않아도 메시지 큐에서 데이터를 받아서
응답을 할 수 있게 된다
A - 메시지 큐 - B
이렇게 되면 의존성도 떨어지고 속도가 빠른 메시지 큐로 인해 더 좋은 응답을 할 수 있게 된다

## pointer vs reference

- pointer is address of value
- reference is refer to value, share the address. (shallow copied object)
- pointer can re-assign, ref cannot. just same type, value, address.
- pointer has its own memory address, ref shares the same address.
- in python, it is shallow copy vs deep copy
- in Golang,
  - pointer is a variable which stores the address of another variable
  - reference is a variable which refers to another variable

```
a := 1
b := 2
ap = &a
a = 3
// ap value = 3
ap2 := ap
*ap = 5
// ap2 value = 5
ap = &b
// ap value = 2
// ap2 value = 5
```

- https://spf13.com/post/go-pointers-vs-references/


## Design Pattern

Singleton

- 여러곳에서 하나의 객체만을 사용해야할 때 사용
- ex) theme, globalconfig

Strategy

- 객체들을 모듈화해서 수정이나 추가 시 전체코드를 건드리기보다 각각의 모듈만 건드리게끔 유도. 모듈을 만든 후 모듈 셋팅용 함수를 만들어서 수정은 한 곳에서만 하도록 구현

Command

- 모듈화를 하는 것은 strategy와 같으나 strategy는 하나의 기능을 여러방식으로 구현하는 것이라면 이것은 기능 자체를 여러개 만드는 개념

Adapter

- 추상화를 시켜서 형태가 다른(인자를 다르게 받는) 객체를 기존 객체를 부르듯이 부를 수 있게 하는 것
- ex) 외부 라이브러리 사용 시

두 클래스나 객체에서 맞지 않는 부분을 연결 시켜야 할 때 서로 호환되도록 할 때 사용한다
랩핑해주는것과 비슷한 것 같다
인터페이스 자체를 수정하지 않고 클래스를 추가하여 그 클래스를 사용하게 함으로써 기존의 코드를 그대로 사용할 수 있다
대신 코드는 좀 더 지저분해질 것이다

Proxy

- 호출하는 시점을 proxy가 실행된 후에만 실행되게하여 무거운 작업 시 가벼운 것들을 먼저 보여주게 할 수 있다
- //코드는 의존성이 없지만 proxy라는 구조는 다른 객체를 포함하는 구조라서 그다지 매력적이지 않다. 다른 방법으로 무거운 작업을 딜레이할 방법은? Promis 콜백처럼

#### abstraction and automation

design -> implement -> test -> deploy -> update

- If I am a backend engineer
  Am I need test the kubernetes? or just local test and push? \* how to divide development environment and production?
  yes. developer should have test everything. no limit.

commit -> docker test -> confirm commit -> push -> lint and test
confirm PR -> deploy -> send report

## procedure, declarative

if else를 쓰는 절차적인 방식을, 어떤 인자가 필요하니 이게 없으면 만들어라 라는
선언적 방식으로 바꿔 관리를 쉽게 한다

함수가 한가지 일만 하는지 확인하는 방법은 추상화 수준이 일관된지 확인한다

## 변수에 get, set을 설정한다고 객체가 되는게 아니라

추상화를 통해 구현은 감추고 추상화 된 인터페이스를 보게 해야 클래스를 사용한다고 할 수 있다

#### 객체는 내부구조를 숨겨야 한다고 한다

변수를 프라이빗으로 하고 함수로 제어하는 것이 변수를 직접 조종하는 것보다 나은 이유

- 변수에 특정한 속성을 넣어줘야 할 때 get 함수만 수정하면 변수 값을 쉽게 변경 할 수 있다
- 다른 객체가 직접 값에 접근을 못하게 해서 원하는 동작을 지킬 수 있다.

#### 사용자가 직접 호출하는 api는 최대한 추상적으로 하고

api는 인터페이스를 호출하고 인터페이스는 유닛함수를 호출하고
유닛함수는 외부라이브러리와 분리시킨다?

#### Plus

- 가벼워야 한다. 그래서 외부 API나 라이브러리를 안쓰고 싶었다
  - no dependency, low coupling
- 안전한 동작 - 회사일을 하면서
- 하나하나의 시스템이 완성도 높은 시스템으로 구성할 수 있도록
- 엘리베이터의 안정성이 보장되는 것처럼 (보장된다는 것이 100%는 아니다) 프로그램도 안정성이 보장되어야 한다.
  - 엘리베이터는 하나의 제품 자체로만 구동한다. (자연 환경의 변수는 있다)
    그런데 프로그램은 OS, Kernal, 사용자의 기존 작업 환경 등이 영향을 끼친다.
  - 그저 동작하는 프로그램만으로는 부족하다 테스트코드를 만듬으로서 안정성을 높일 수 있다. 또 다른 방법은 무엇이 있을까
- Transparent
- 확장 시 확장하는 그 자체만 코드가 작성되어야 하고 기존의 코드를 건드리면 좀 별로다
- 외부 모듈 사용 시에는 코드를 분리한다. 호출하는 함수와 실제 동작하는 함수로
- 함수 인자는 최대한 적게 받는다
- 함수 인자로 받지 않은 데이터는 수정하지 않는다 (순수 함수)
- 객체를 먼저 정의하고, 그에 맞춰 코딩한다
- 객체 변경이 필요할 때 큰 객체는 포인터로 넘기고 작은 값은 인자로 넘기는게 좋겠다
- 변수,함수 앞에 접두어를 붙이는 것이 나쁜가? 직관적이고 그렇게 더럽히지 않는 것 같다
  - int 형은 i를 붙이고 인터페이스는 I를 붙이고
  - 변수에 접두어 붙이니 지저분해보임
- 내부변수로 만들어서 내부에서 변경시키는 것
  인자로 전달해서 변경 시키는 것
  내부변수로 하고 겟, 셋으로 감싸는 것
  어느것이 제일 좋을까
- 추상화가 낮은 함수를 만들면 그 함수를 쓰는 곳과 구분이 되었으면 좋겠다
  같은 클래스 안에 있어야 한다면 어떻게 구분할 수 있을까
- 개인 프로젝트는 라이브러리를 쓰기 보다 구현을 하고 싶다
- 소프트웨어 사용을 하다보면 데이터는 계속 쌓일텐데 그 때마다 디스크를 늘리는건 아쉽다
- 원하는 개발을 위해 기준을 세워놓아 흔들림 없이 목표를 이루어 나가야한다
- 내 개발을 위한 철학을 만들어 두고, 내 것 뿐만 아니라 회사일을 할 때도 쓰는
  개발 최저 기준도 만들어놓는다
- Clean code / low coupling / module / single responsible
- safety / light weight / divide / api, test, log, error handling
- high performance, optimization, multi-function
- 라이브러리 재사용성이 좋도록 한다
  라이브러리 사용 시 내부를 몰라도 되도록 해야한다
- grpc로 또는 http로 다른 자원에 접근하고
- 내부 코드는 바로바로 갖다 쓸 수 있으면 좋겠다(golang처럼)
- 소프트웨어를 만들고나면 실패지점을 일부로 계속 찾아서 안정성을 높여야겠다
- 모든 코드는 레거시가 된다. 레거시는 걷어내야 하는게 아니라 쌓이는 유산이다
  그래서 코드를 재사용하기 좋게 만들어야 한다

## 직렬화

압축
http header content type

base64
바이너리 데이터를 아스키 데이터로 변환하는 것
이미지 파일 같은 데이터를 json으로 옮긴 후 바로 실행하려면 utf8 호환 등 안맞는
경우가 있는데
base64로 인코딩해놓으면 범용성 있게 사용 가능하다

#### json

- marshal: 논리적 구조를 바이트로
- unmarshal: 바이트를 논리적 구조로
- encode: 언어 내부 구조를 json 형태의 스트림으로
- decode: json을 언어 내부 구조로

표준 입출력은 encode/decode를 이용하면 마샬보다 빠르다
(http response, file, stdout)

## 람다 아키텍처

1억건의 데이터가 매일 쌓인다면 이것을 조회할 때 오래 걸린다

이를 해결하기 위해 매일 하루를 요약한 테이블을 만들면 1년의 데이터가 365줄로 요약된다
근데 실시간 데이터는 반영이 안되므로 이를 위해 실시간 데이터를 계속 업데이트 해준다

기존 테이블에 실시간 테이블이 붙는 방식

하둡이 배치처리를 하는 방식이라 빅데이터에 쓰인다

## JPA

ORM이 코드의 객체성과 DB의 관계성을 매꾸기 위해 나왔다고 한다.
그래서 DB를 item.getName() 이런 식으로 호출할 수 있게 되었다.
마이크로서비스에서 다른 서비스의 데이터를 item.getName() 처럼 가져오려고 했던게
ORM에서 이미 나온 생각이었다.

API gateway가 이를 구현해서 호출하도록 하면 모놀리스 그대로 마이크로서비스화 되지
않을까?

C#의 Linq는 SQL문처럼 작성하고 선언형으로 작성함으로서 함수형 아키텍처의 이점을
가져가려고 한다.

## 동적 컨텐츠 vs 정적 컨텐츠

동적

- 채팅
- 데이터 변경(주식)

블로그 글도 정적이지만 변경 되긴 한다. 근데 새로 빌드하는 것보다 새로 띄우는게
더 빨라서 주식 정보의 경우에는 동적으로 변경되는게 효율적이다.

#### Go micro를 보면 실행시키기 위해 몇줄이 필요한데

그러지말고 start만 하면 기본 실행 되고
셋팅은 coc로 설정하면 설정되고 그냥 쓸 수 있게 하는게 좋을 것 같다

개인적으로 쓰는 프로그램은 기본적으로 많은 기능이 있는 것은 안쓰고 싶다. 가볍고 단순하지만 추가적으로 기능을 추가하는 쪽이 좋을 것 같다
그래서 웨일도 별로다
웨일은 크롬과 똑같은 엔진을 쓰지만 기본 기능이 주렁주렁 달려있다.
한번씩 기본 기능들이 좀 많아서 기능의 혜택을 받았으면 좋겠다는 생각이 들었는데, 그냥 가벼운 쪽이 더 컨트롤하기 좋아서 낫겠다 싶다

플러그인의 단점이 일일이 찾아봐야 기능을 쓸 수 있다는 것인데, 이 부분을 개선할 필요가 있다

#### micro

grpc는 내가 모르는 코드를 너무 많이 생성한다. micro도 마찬가지
나는 오히려 cookiecutter처럼 내가 알지만 매번 만들기 귀찮은 것을 쉽게 만들어주는
것을 원한다. create-react-app처럼.
kubernetes는... 점차 속속들이 알아나가야지...

내 만들어져있는 로직을 조금만 수정해서 마이크로서비스화 하는 것을 해봐야겠다
입력과 출력을 받는 형태만 갖추면 바로 찾아서 연결해서 쓰도록

#### 스프링 빈

주요 속성

- class (필수)
- id: bean의 고유 식별자. 이름에 의미 없음!?
- scope
- constructor-arg: 생성 시 생성자에 전달할 인수
- property: 생성 시 bean setter에 전달할 인수
  - ref
  - value
- init method
- destroy method

<context:annotation-config/> 를 쓰면 빈 설정을 어노테이션을 검색해 반영한다

#### 스프링 시큐리티

security:authentication-manager

- 인자로 받은 Authentication 객체가 유효하다면 Principal을 담고있는 이것을
  리턴한다.
  - security:authentication-provider
    manager가 직접 처리 안하고 provider에 위임한다.

#### 메소드 체이닝

기차 충돌
빌더 패턴
디미터의 법칙
함수형 패러다임

객체 자신 또는 내부의 정보로 이루어진 체이닝은 괜찮다?

객체 간 상태 변경 필요 시 어떻게 하는것이 효과적인가?
주인공이 적을 공격 했을 때
역할과 하는 일(책임)을 분리한다
주인공은 공격하는 일만 하고, 적은 이벤트에 대응하기만 하면 된다?
공격이 제대로 되었는지는 어디서 판단? 또 다른 객체?

흐름이 없는 코드, 상태가 없는 코드

#### 지금의 메소드 체이닝과 디미터 법칙의 차이

디미터 법칙은 호출한 객체의 함수가 다른 객체를 불러 처음 호출한 객체와 다른
객체를 부르기 위한 것이 되어버린 메소드 체이닝이 복잡도를 높이는 점을 지적한다
지금의 메소드 체이닝은 메소드가 기존에 호출했던 객체를 반환함으로써 가독성을
높이는 효과를 위해 사용되고 있다

#### go 에서 외부공개함수는 대문자로 시작하는데

메인로직 외에는 공개하지 않도록 짜야겠다

근데 인터페이스로 만들면 다 공개해야되는거 아닌가

- 인터페이스로 쓰는건 공개하고, 인터페이스 함수 내에 있는 것은 감추면 되겠다

#### Python HowDoI 라이브러리

라이브러리 사용자가 쓰지 않는 함수는 함수명 앞에 언더바를 붙이고, 테스트 시
사용자가 쓰는 함수만을 통해 테스트한다고 한다

#### 플러그인 만드는 법

비즈니스 로직이 바라보는 인터페이스가 있고,
이 인터페이스를 구현하는게 플러그인이라면.

플러그인의 예

- 크롬 확장 프로그램
  - 크롬의 정보를 불러와서 크롬에 표시하게 해준다.
- 그놈 확장 프로그램
  - 그놈 인터페이스의 값을 내 기능을 실행시키고 동작하게 한다.
- 비주얼 스튜디오 코드의 확장 프로그램
  - 원하는 기능을 실행하도록 해준다.

플러그인을 설치하면 기존의 흐름을 낚아채서 조절한 후 다시 갖다 놓는 그림이다.
그렇다면 플러그인을 실행하도록 하는 로직을 구현해놔야겠다

#### 특정한 값을 보고 분기해줄 때 어떻게하면 좋을까

어떤 알림인지 타입을 보고 결정하게 될텐데
타입에 맞는 핸들러를 매칭해줄때
스위치를 쓸까
배열에 지정해놓고 호출하는식으로 할까
클래스로 할 수 있을까?

타입을 보고 결정?

#### 개발 노하우

삭제는 딜리트가 아니라 isDelete를 true로 바꾸고
히스토리를 추가하는 작업

진짜 삭제가 필요한 경우는?

#### 프로그래밍 언어 추상화 단계

- 기계어 0101010
- 어셈블리어
- 명령형 코드 for
- 선언형 코드 filter()

#### iterator 함수 감싸기

iterator를 쓰는 함수는 내부가 for문을 돌리고 원하는 처리를 하는 동일한 구조로 되어있다
이걸 계속 반복해서 쓰기보다 감싼 함수에서 실행하게 하면 좋겠다

#### iterable, iterator 차이?

list 같이 요소를 순회할 수 있는 것을 iterable이라 한다
iterator도 iterable한 객체인데 iterator는 한 개씩 꺼내 쓰기 위한 것이라 iterable이 iterator는 아니다

#### iterator와 stream 비교

- iterator를 간결하게 쓰게 해주는게 stream

query로 필터링하는 것과 stream filter 비교

- 많은 양에서는 무조건 쿼리가 빠름
- 그동안 db 최적화가 아주 많이 이뤄졌기 때문
  iterator도 iterable하니까 map을 쓸 수 있지 않을까?


## software

#### twelve factor app

웹앱처럼 서비스로 사용되는 소프트웨어에서 이 요구사항 12가지를 챙겨서 만들자는 방법론

- https://12factor.net/ko/

1. 버전 컨트롤을 사용하자
2. 라이브러리 의존성을 명시적으로 선언하고 분리하자
3. 인증 정보, DB 설정, 각종 배포 설정을 환경 변수로 관리하자
4. 객체 저장소, DB, 캐시, 메시지 큐, 외부 API 서버 등을 구별 없이 서비스로 인식하자
5. 애플리케이션 빌드, 출시, 실행 단계를 엄격하게 분리하고 관리하자
6. 애플리케이션을 독립적인 무상태(stateless) 프로세스로 실행하자 (DB 사용. 로컬 Disk 사용 X)
7. 독립적인 포트를 바인딩하여 서비스로 공개하고 포트로 들어오는 요청을 처리하자
8. 이러한 프로세스 모델을 기반으로 수직적, 수평적 확장을 제공하자
9. 빠른 시작과 그레이스풀 셧다운을 통한 안정성 극대화를 하자
10. 개발, 테스트 및 정식 서비스 환경을 최대한 동일하게 유지하자
11. 각종 로그는 파일로 다루지 않고 앱이 실행되는 도중에 실시간으로 포착하자
12. 관리자 업무와 백 오피스 업무는 기존 애플리케이션 같은 환경에서 동일 형태로 취급하자

그리고 추가로 3가지를 더 고려하면 좋겠다고 이야기했다고 한다
텔레메트리(모니터링), 자동화, 보안

#### 서버리스

이벤트 소스 -> 함수 -> 서비스

#### 객체 지향은 어떤 요구로 나오게 되었는가

복잡한 구조에서는 객체지향의 상속, 추상이 도움이 되더라

절차지향적이던 코드는 책을 쓰는 것과 비슷했다
객체지향이 나오면서 책을 쓰는 것과는 달라졌지만
작가가 퇴고하는 것과 리팩토링하는 부분은 비슷했다
하지만 작가는 퇴고 후 출판된 책은 더 이상 수정하려 하지 않고 독자에게로 넘겨준다
이 점은 코딩과의 차이점인데, 코딩도 이처럼 완료되는 시점을 만들 수 있을까.
리눅스의 sed나 기본 명령어들은 자주 업데이트하지 않으며, 오랫동안 업데이트 되지 않았지만 여전히 쓰이는 코드들이 있다.
그러나 프로그램 전반의 생태계는 빠르게 변하고 있어서 사용자가 원활하게 쓸 수 있도록 하기 위해서는 끝없는 수정이 불가피하다.

#### 모놀리스도 정반합에서 합이었던 아키텍처
- [ ] 어떤 것을 보완하기 위해 모놀리스라는 아키텍처가 달성되었을까
3 layer 아키텍처를 만들다보니 모놀리스가 된 것인가


## 컴퓨터

#### 컴퓨터

컴퓨터의 단점

- 눈 앞에 있어야 한다. (컴퓨터 앞에서는 공간의 제약이 없어지지만)
- 프로그램별 호환성, 종속성을 신경 써야한다. (에버노트의 데이터를 노션에
  옮기려면 번거롭다)
- 디스플레이에 따라 정보가 제한적이고, 답답하고, 한 눈에 보기 힘들어진다.

장점

- 변경이 가능하다. (종이는 새로운 종이가 필요한데)
- 점진적 개발이 가능하다
- 검색 기능

기계는 그냥 해달라는 대로 해주는 것에 그칠 뿐이지만
사람은 그 요구사항을 경험적, 직관적으로 판단해서 소비자와 같이 만들 수 있다

이 부분이 사람의 장점일 것 같다
이 점은 서로 존중하면 시너지가 될 것이고, 이익만 좇는다면 등쳐먹는 것이 되겠다

#### Digital

- 디지털의 역할
- 불편함은 줄이고 원하는 것은 쉽게 얻을 수 있도록 하는 것?
