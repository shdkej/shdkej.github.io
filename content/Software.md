---
title   : Software
summary : Language, Web
date    : 2020-04-06 14:37:26 +0100
updated : 2020-11-22 16:15:37 +0100
tags    : deep_knowledge
---

## Agile
#### TL;DR
* **Individuals and interactions** over processes and tools
* **Working software** over comprehensive documentation
* **Customer collaboration** over contract negotiation
* **Responding to change** over following a plan

#### Reference
- https://www.agilealliance.org/agile101/the-agile-manifesto/

## Software
- Algorithm: Mathematically complete composition.
- Program: Combination of Algorithm.

#### Software power
I want to buy macbook for sidebar. Macbook doesn’t have touchscreen and not much big screen and not much lightweight. But i want to buy macbook. That’s amazing.
Bear app is also good. It makes me want to buy ios.
Software can makes money.

#### 소프트웨어, 서비스에서 무료로 제공되어야 하는 부분과 돈을 받아야 하는 부분
기능의 90%는 무료로 제공하고 10%는 유료로 제공해야 한다는 의견이 있다.
- 유튜브의 광고 정책과 컨텐츠 소비의 가치에 대해
  - 유튜브가 동영상의 광고를 임의로 넣고 있다. 컨텐츠 제공자는 광고를 안넣고 싶다고 해도 유튜브에서 강제로 넣는 것이다.

## Web
통신 시스템의 데이터 보관 및 전송 필요성 대두
하이퍼링크 구현 (문서간 이동)
웹 구현 (문서 뿐 아니라 더 많은 데이터 이동)
플래시, 액티브엑스 대두 (웹의 기능 외의 것들 구현하는 플러그인)
무거움과 보안 문제 대두
자바스크립트 대두

액티브엑스는 C++로 만들어졌고
플래시는 액션스크립트로 만들어졌다고 한다
그 후 위에 둘은 없어지고 자바스크립트로 그것들의 구현을 대체하게 되었다.
그리고 지금 웹 어셈블리라는 프로그래밍 언어 활용이 가능한 방식이 대두되고 있다.
웹 어셈블리는 대세가 될 수 있을까? 대세가 되지 않더라도 역할을 구축할 수 있을까?

#### 웹으로 할 수 없는 것
백그라운드에서 실시간 데이터 입력받아 적용하기
예) 집에 들어오면 바깥 조명 확인해서 불켜주는 것
- PWA(progressive web app) makes it possible.

#### web should support this
- dark mode
- accessibility
- i18n
- link to new tab
- session manage
- history back button (undo button)
- [[Design]]

#### javascript callback
콜백함수
- 함수의 호출 시점을 사용자가 아닌 프로그램으로(시스템에서) 결정하는 함수

클로저
- 자신을 호출한 함수 범위의 변수와 자신 내부의 지역변수를 모두 사용할 수 있는 상태

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
로 작성 시 첫번째 function은 성공했을 시 실행되고, 두번째 function은 실패했을 시 실행되게 된다

- fulfill, pending 등의 상태가 있으며, 상태에 따라 실행 가능해진다
- promise 를 호출하려면 리턴이 promise 이거나 promise로 생성되어야 한다

에로우 표현법
- `=>` 로 표현해서 `function(){return}` 을 명시하지 않도록 해주는 표현법
- `var x = (y) => y*y;`
- this 는 호출된 스코프에서 상속받는다

## Concurrency
- Race conditions
- Deadlocks
- Testing Concurrency

#### 비동기 프로그램의 실행 원리
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

#### 동시성 병렬성 블록킹
동시성 : 하나의 코어가 여러 작업을 조금씩 하는 것, = 비동기, 전체 동작시간은 같지만 효율성 증가됨
병렬성 : 코어를 여러개 두어 여러 작업을 한번에 하는 것, 시간은 줄어들지만 비용이 증가
동기 : 하나의 코어가 하나의 작업만 하는 것
블록킹 : 제어권을 계속 가지고 있는 것
논블록킹 : 비동기와 비슷한데 제어권을 하나의 작업이 가지고 있지 않게 하여 여러 작업이 제어권을 가질 수 있게 하는 것으로 비동기가 되면 논블록킹이 따라오는게 일반적이다
비동기인데 블록킹이면 작업이 여러개 진행되어 다른 작업이 먼저 완료되어도 제어권을 가지고 있는 작업이 늦게 끝나면 먼저 완료된 작업이 아무런 이득이 없다.

이것들은 I/O에 대한 것으로 CPU나 memory에서 작업을 어떻게 할지에 대한 것이다.

넌블록킹 알고리즘이라는게 있는데
멀티쓰레딩에서 하나의 쓰레드가 오류가 나거나 멈췄을 때 다른 쓰레드에 영향을 주지 않게 하는 것을 말한다.

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
여러곳에서 하나의 객체만을 사용해야할 때 사용
ex) theme, globalconfig

Strategy
객체들을 모듈화해서 수정이나 추가 시 전체코드를 건드리기보다 각각의 모듈만 건드리게끔 유도. 모듈을 만든 후 모듈 셋팅용 함수를 만들어서 수정은 한 곳에서만 하도록 구현

Command
모듈화를 하는 것은 strategy와 같으나 strategy는 하나의 기능을 여러방식으로 구현하는 것이라면 이것은 기능 자체를 여러개 만드는 개념

Adapter
추상화를 시켜서 형태가 다른(인자를 다르게 받는) 객체를 기존 객체를 부르듯이 부를 수 있게 하는 것
ex) 외부 라이브러리 사용 시

두 클래스나 객체에서 맞지 않는 부분을 연결 시켜야 할 때 서로 호환되도록 할 때 사용한다
랩핑해주는것과 비슷한 것 같다
인터페이스 자체를 수정하지 않고 클래스를 추가하여 그 클래스를 사용하게 함으로써 기존의 코드를 그대로 사용할 수 있다
대신 코드는 좀 더 지저분해질 것이다

Proxy
호출하는 시점을 proxy가 실행된 후에만 실행되게하여 무거운 작업 시 가벼운 것들을 먼저 보여주게 할 수 있다
//코드는 의존성이 없지만 proxy라는 구조는 다른 객체를 포함하는 구조라서 그다지 매력적이지 않다. 다른 방법으로 무거운 작업을 딜레이할 방법은? Promis 콜백처럼

#### browser
웹브라우저 엔진은 js용 쓰레드가 1개만 도는데 대신 web api라는게 따로 구현되어 있고 비동기작업을 처리하고 태스크큐에 보내 다시 js 쓰레드로 보내는 방식으로 비동기를 구현했다

Web api는 쓰레드를 여러개 쓴다. File, timer, ajax 등을 컨트롤한다.
Js thread
Web api - task queue - js thread?

#### html5 article 태그는 독자적인 내용을 담고 있을 때 사용한다고 한다
다른 곳에서 참조할 때 article 안에 있는 내용을 가져다 써도 그 내용만으로도 말이
되는 내용이 들어간다는 것이다
예를 들어 애플 읽기모드로 들어가면 article 안에 있는 내용만 읽어들여 읽기에
집중하게 해준다.

이와 비슷하게 section이라는 태그가 있는데 이는 영역을 구분할 때 쓰면 좋다. 예를
들어 목차 영역 만드는 곳에 써서 접근성(스크린 모드) 사용 시 본문에만 집중하게
안내해줄 수 있다.
비슷한 것들로
aside, nav, header, footer 등이 있다
이를 semantic(의미론적인) 태그라고 한다

#### 코딩레벨
1
if, for, 함수 실행 순서
입력, 출력 테스트
2.
프로젝트
3.
배열 활용
4.
코드 실행 원리 이해
5.

...
동시성
병렬성
외부 api
os
디자인 패턴
도메인 이해
통신
데이터 구조
최적화

#### [ ] Sync logic
- PC 1
- Mobile 1
- laptop 1
- Data in cloud
- PC create note and save
- laptop create note
- cloud has 2 note
- mobile load 2 note
- PC edit note 1
- mobile edit note 1
- mobile save
- PC save
- what is note 1 content?

## History
c developed for system control make easy in 1972
c++ developed for c language make fit to object orient programming in 1980
c++ suggest object, class, inheritance, polymorphism, Abstraction, Encapsulation

python in 1990
Java in 1995

- hardware
- software
불 대수 - 0과 1로 논리 표현 가능
섀넌 - 0과 1로 회로 표현 가능
튜링 - 0과 1로 수학적 풀이 가능

#### history of IT
- transistor 1947
    - cpu made by texas Instruments(1958), intel(1971)
- programming languages assembly(1951) C(1972)
- OS GM(1956) multics, unix(1969)
- internel ARPANET 1963
 - data communication
 - information theory
 - tcp/ip 1982 tcp(1974)
 - dns 1983
- www 1990
 - http 1993 hypertext(1989)
- software engineering

#### Historical Company
- Bell, GM, Texas, ARPANET, CERN, IBM, MIT

#### desktop os history
- mac windows linux
- mac based nec, xerox
 - gui, mouse came from xerox
- xerox labs (paloalto r&d) 1970~
 - mouse, gui, ethernet, What you see is what you get, OOP
- at&t (bell labs)
 - transistor, unix, c, c++
- turing, neumann, dennis ritchie

#### history of array
- array in assembly
- memory
 - data, bss -> global variable, bss is not initialize variable
 - stack -> logical variable
- data make many at once

#### History of IT
mechanical machine -> computer -> program -> os -> programming language -> algorithm -> software development
	* for hard work to make easy and automatically

logical decision TRUE, FALSE -> 0, 1 -> Data can make to computer -> Information

*abstraction and automation*
design -> implement -> test -> deploy -> update

- If I am a backend engineer
Am I need test the kubernetes? or just local test and push?
	* how to divide development environment and production?
yes. developer should have test everything. no limit.

commit -> docker test -> confirm commit -> push -> lint and test
confirm PR -> deploy -> send report

#### Devops came from agile 2009
1993 kent beck developed with xp in Chrysler
2001 agile summit

## procedure, declarative
if else를 쓰는 절차적인 방식을 어떤 인자가 필요하니 이게 없으면 만들어라 라는 선언적 방식으로 바꿔 관리를 쉽게 한다

## Product Introduce, 제품 소개
한줄 소개
Demo
이미지와 동작과정(gui가 없으면 터미널 동작이라도)
메인 기능
경험 소개
비교
