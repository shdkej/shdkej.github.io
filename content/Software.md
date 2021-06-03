---
title   : Software
summary : Language, Web
date    : 2020-04-06 14:37:26 +0100
updated : 2021-06-01 15:49:00 +0900
tags    : deep_knowledge
---

## Agile
#### TL;DR
* **Individuals and interactions** over processes and tools
* **Working software** over comprehensive documentation
* **Customer collaboration** over contract negotiation
* **Responding to change** over following a plan
- https://www.agilealliance.org/agile101/the-agile-manifesto/

#### 애자일의 완성도
다 완성된 후에 보여주는 완성도보다 구현한 것을 계속 확인받으면서 수정해나가는
완성도가 높다
- 서비스를 기획하는 상황이라면 도메인 전문가가 고객의 역할을 할 수 있겠다.
  기획자가 도메인 전문가가 될 수도 있고

고객은 잘 되고 있는지는 알고 싶어하지만, 계속 물어보는 것은 원하지 않는다

## Software
- Algorithm: Mathematically complete composition.
- Program: Combination of Algorithm.

#### 소프트웨어, 서비스에서 무료로 제공되어야 하는 부분과 돈을 받아야 하는 부분
기능의 90%는 무료로 제공하고 10%는 유료로 제공해야 한다는 의견이 있다.
- 유튜브의 광고 정책과 컨텐츠 소비의 가치에 대해
  - 유튜브가 동영상의 광고를 임의로 넣고 있다.
    컨텐츠 제공자는 광고를 안넣고 싶다고 해도 유튜브에서 강제로 넣는 것이다.

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

#### javascript callback
콜백함수
- 함수의 호출 시점을 사용자가 아닌 프로그램으로(시스템에서) 결정하는 함수

클로저
- 자신을 호출한 함수 범위의 변수와 자신 내부의 지역변수를 모두 사용할 수 있는 상태
- 자신을 호출한 함수 범위의 변수를 내부에서 사용할 수 있다는 것이 포인트
- 호출 시의 컨텍스트를 저장하고 싶을 때 사용한다
- js에서 커링을 구현할 때 사용된다

컨텍스트
- global context, function context, eval context
- 실행 컨텍스트

Promise
- 콜백함수를 깔끔하게 표현하는 방식
- function().then().catch().then() 의 형식으로 사용한다
- then() 안에서

```
then(function(){

},

function(){

})
```
- 로 작성 시 첫번째 function은 성공했을 시 실행되고,
  두번째 function은 실패했을 시 실행되게 된다
- fulfill, pending 등의 상태가 있으며, 상태에 따라 실행 가능해진다
- promise 를 호출하려면 리턴이 promise 이거나 promise로 생성되어야 한다

에로우 표현법
- `=>` 로 표현해서 `function(){return}` 을 명시하지 않도록 해주는 표현법
- `var x = (y) => y*y;`
- this 는 호출된 스코프에서 상속받는다

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

#### 'int' is not an object, 'Integer' is.
[파이썬 3에는 오버플로우가 없다?](t.ly/flKE)

## object
- first citizen function
    - callable like value
- value != object?
- class != object?
- int
    - int in c, int size is 4bytes = 2^32, it is fix.
- (Data) types
- int is class? types?
- type != object?

## C++ 50 계명 - 이것만은 기억하자.
[HAMA 블로그](https://hamait.tistory.com/1043?category=76104)

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

#### generic
c++ 템플릿
c# 제네릭

타입 고정을 하는 강타입 언어에서 여러 타입을 허용하게 하고 싶을 때 오버로딩을
통해 여러 함수를 만들어야 하는데 그렇기 되면 중복이 많아지므로 여러 타입을
받는 일반 클래스, 함수를 만드는 방식

정적 형지정을 동적 형언어처럼 쓰려고 만든건가 싶다

#### delegate
- 메소드와 동일한 타입의 델리게이트를 만든다 (매개변수, 리턴타입)
    - 제네릭(템플릿)을 이용해서 타입 일반화를 할 수 있다
- 콜백함수? 클로저 같은 느낌인가
- 클로저를 이용해서 커링 함수 만드는 것과 비슷하게 쓰인다
    - C#에서 람다나 클로저를 구현할 때 delegate를 이용해서 구현한다
- += -= 을 이용해서 함수를 연결 시킬 수 있다

#### abstraction and automation
design -> implement -> test -> deploy -> update

- If I am a backend engineer
Am I need test the kubernetes? or just local test and push?
	* how to divide development environment and production?
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

#### 사용자가 직접 호출하는 api는 최대한 추상적으로 하고
api는 인터페이스를 호출하고 인터페이스는 유닛함수를 호출하고
유닛함수는 외부라이브러리와 분리시킨다?

## code
- 코드만으로 얘기할 수 있도록 보기 좋은 코드
- 문서화는 중요하다 코드만 봐도 되게 하면 더 좋겠지만
- 주석 대신 프로그램만 읽어서 이해가 되도록
    - 하지만 주석은 필요하다
- 직관적으로 쓴다
- 코드가 간결해야 한다
- 클린코드를 지향하는 이유는 모든 서비스는 단번에 완성도를 100으로 만들 수 없고 유지보수와 기능추가가 반드시 필요하기 때문에 이를 편하게 하기 위함이다.

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
-  원하는 개발을 위해 기준을 세워놓아 흔들림 없이 목표를 이루어 나가야한다
- 내 개발을 위한 철학을 만들어 두고, 내 것 뿐만 아니라 회사일을 할 때도 쓰는
  개발 최저 기준도 만들어놓는다
- Clean code / low coupling / module / single responsible
- safety     / light weight / divide / api, test, log, error handling
- high performance, optimization, multi-function
- 라이브러리 재사용성이 좋도록 한다
  라이브러리 사용 시 내부를 몰라도 되도록 해야한다
- grpc로 또는 http로 다른 자원에 접근하고
- 내부 코드는 바로바로 갖다 쓸 수 있으면 좋겠다(golang처럼)
- 소프트웨어를 만들고나면 실패지점을 일부로 계속 찾아서 안정성을 높여야겠다
- 모든 코드는 레거시가 된다. 레거시는 걷어내야 하는게 아니라 쌓이는 유산이다
  그래서 코드를 재사용하기 좋게 만들어야 한다

## 함수를 거쳐서 호출하는 것과 바로 호출하는 것 속도 차이 비교
python
10000회 수행 시
함수를 타면 3ms,
함수를 안타면 2ms,
분기를 안타면 1ms,

1000000회 수행 시
함수를 타면 140ms,
함수를 타는데 할당 없이 바로 호출하면 130ms,
함수를 안타면 60ms,
분기를 안타면 40~80ms

golang
1000000회 수행 시
함수를 타면 0.46ms,

## when useful pointer?
- 큰 자료형을 옮길 때 객체를 넘기는 것보다 메모리 참조하도록 하는게 가볍다
- 메모리에 직접 접근해서 작업할 필요가 있는 경우가 있다

포인터에 직접 접근하여 데이터를 바꾸는 방식은 변수를 처음 할당만 하고
바꾸지 않는 함수형 프로그래밍 관점에서는 사이드이펙트가 큰 안좋은 방식이
아닌가? 함수형언어에서는 포인터가 없나?

- 함수형 언어는 불변성을 이용하는 것이고, 포인터는 포인터대로의 용도가 있다
- 트레이드 오프지, 어느 하나가 우수한 것이 아니다
- 포인터를 이용해서도 동시성을 구현해서 잘 이용한다

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
