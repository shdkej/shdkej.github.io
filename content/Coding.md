---
title   : Coding Rule?
summary : Coding Convention, Design Principle
date    : 2020-03-16 21:13:05 +0100
updated : 2021-05-27 14:49:47 +0900
tags    : strong_base
---

## 요약
코딩을 어떻게 하면 좋은 코드가 나올까? SOLID, DRY, YAGNI 등 많은 코딩, 디자인
가이드가 있다.
-----------------------------------------------------------------------

## SOLID
**Abstraction, One Behavior class, Encapsulation**
- S 하나의 클래스는 한 가지 일만, 변경하기 위한 이유는 하나만 갖고 있어야 한다.
- O 확장에는 열려있고, 변화에는 닫혀 있어야 한다
- L 하위 클래스는 기존 클래스와 치환되어도 동작 해야 한다
- I 인터페이스를 작게 하고, 클라이언트가 사용 안하는 함수는 공급도 안하게 한다.
- D 추상화에 의존해라. 구체적인 것 말고.

#### Single reason
변경하기 위한 이유는 버그 수정이나 리팩토링일 때가 아니라 디자인 설계 시의 얘기

#### DIP를 통해 외부 라이브러리 대신 임의의 객체를 만들어 테스트하기 용이해진다.
테스트 시에 외부 API의 기능을 테스트하는게 아니라 내 구현을 테스트한다.


## OOP
- **Encapsulation, Composition, Inheritance, Delegation, Polymorphism, Open recursion**
- same Input, should same output
- Encapsulation = Module?
    - Encapsulation is hide the value

#### 폴리모피즘
객체 생성 시 고정된 객체를 만드는 것이 아니라 기준만 만들고 실제 구현은 각
상황에 맞게 수정할 수 있게 하는 것

인터페이스나 추상클래스를 이용하여 상속해 여러 객체를 하나의 기준으로 만드는 것
그리고 이를 이용하여 오버라이딩 하여 각 객체에 맞게 재구현할 수 있는 것

하나의 객체를 다양한 방법으로 사용할 수 있게 하는 것

#### coupling vs cohesion
내부에서의 변수들의 활용이 잘되면 응집도가 높다고 한다
클래스의 변수를 메소드가 여러개 잘 사용하면 응집도가 높다고 볼 수 있다
각 객체 간 연결이 느슨하게 되있으면 결합도가 낮다고 한다


## Functional Programming
불변성


## Coding Convention
회사의 컨벤션 룰을 따르자. lint도 설정하고

- python -- underscore
- golang -- camel
- `-` vs `_`
- `tab` vs `space`


## Clean Code
- Robert C. Martin
- https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29

- Meaningful naming


## TDD
- at least make test code.
- Test, Log(error handling), API

#### Why Test?
- code make concrete
- [The Art of Software Testing](https://drive.google.com/file/d/13r0fkQbcbd_2DG34l9Mm5VMRk8ewIImS/view?usp=sharing)

#### test
- boundary check

#### BDD, DDD

#### unit testing, system testing
- https://www.geeksforgeeks.org/difference-between-unit-testing-and-system-testing/
- unit testing
 - single module base,
- system testing
 - depends specific requirement, totally test

#### Refactoring
- 변화는 향상을 가져온다. 마치 책의 퇴고처럼
- 작가가 퇴고를 거듭하며 더 좋은 글이 되는 것처럼 리팩토링을 통해 더 나은 코드를 만들 수 있다
- 리팩토링을 두려워하지 말자

#### 유닛 테스트
유닛 테스트를 어노테이션을 만들어서 입력값만 지정해서 원하는 출력값이 나오는지
확인하면 테스트와 실제 코드가 같이 있게 되어 좋지 않을까?
결과의 멱등성을 유도하는 방향으로 함수를 작성하고.
```
@Test(input1:'1',input2:'2')
def add(a int, b int):
    return a + b
```
복잡한 로직이 필요하거나, 함수 실행 전에 선언해야하는 것들이 있으면 처리가
힘들겠다.
```
Square s = Square{}
s.SetLength(5)

class Square():
    len = ''
    @Test(what input can in here?)
    def SetLength(i int):
        len = i
```

테스트코드를 먼저 적고 테스트 코드만 통과할 정도의 함수만 작성하고 문제가 생기면
추가하는 방식으로 한다

- 주먹구구와 점진적 개선의 차이는 뭘까

#### 기능이 전반적으로 바뀌는 경우 a/b 테스트를 해야한다
블루 그린 배포를 하던지 해서 배포 방식을 상황에 맞게 설정해야겠다

#### Load vs Performance vs Stress test
Reliability, Stability, Response time, Scalability

Performance Test
- it includes Load test and Stress test
- 사용자가 원하는 조건이 있을 때 만족할 수 있는지 확인하기 위해 사용

Load Test
- how much can handle resource of cpu, memory
- verifies whether the application can handle the expected load.

Stress Test
- find the breaking point(maximum point)

> https://stackify.com/load-testing-vs-performance-testing-vs-stress-testing/

#### stage test
#### E2E test
- End to end test

#### Acceptance test
인수 테스트? (인수/인계할 때 그 인수?) 고객이 인수하는? 수락으로 해석해도 되겠다
측정할 수 있는 기준을 마련한다는 것

인수테스트를 기반으로 유닛테스트를 조정할 수 있겠다

기획 -> 기능 -> 스토리 -> 시나리오 -> 테스트


## Error Handling
- Exception File, Network

```
#whitelist?
def do_something:
 if do_something:
  return false

 return true

err = do_something
if err: generateError
```

- 엣지 케이스를 확인한다
- 정상적일 때가 아니라 최악의 상황을 생각한다

#### 에러 처리
예외로 볼것인가 에러로 볼것인가(회복 가능한가 아닌가)
호출자가 에러처리를 할 것인가, 유닛에서 에러처리를 할 것인가
유닛 함수는 리턴값을 항상 가지게 한다

하마님의 블로그 참고
https://hamait.tistory.com/1027?category=250996

포프님의 영상 다시 참조해본다
- caller 에서는 에러가 뜬 것만 확인하고 내부를 알려고 할 필요 없다

에러를 밑단에서 처리하면 프로그램이 뻗을지 말지를 호스트가 선택할 수 없다
에러를 호스트가 처리하면 밑단에서 스택이 잔뜩 쌓여서 호스트에 전달되어야 한다

에러 처리를 어떻게 할지 호스트가 결정해야한다?
밑에서 처리하고 로그만 남긴다?
문제가 생겼는데 에러만 남고 아무 이상이 없으면 문제
문제가 별게 아닌데 정지되도 문제

최대한 정지 없이 문제를 회복해서 진행시켜야 한다

#### 빠른 리턴 vs 리턴은 한 곳에서만
golang의 에러 처리 방식 vs 책 클린 코드에서 나온 리턴을 마지막에만 두자는 얘기

-----------------------------------------------------------------------

#### Language Design Principle
[C](Software#History)
[[Python#The Zen of Python]]
[[Golang#Philosophy]]

#### Internal Link
[[Architecture#Goal]]
[[Project#Project start]]
[[Think#개발의 목표]]
[[Information#비판 대신 진취적 개선에 에너지를 쏟는다.]]
[[Think#Safety programming]]
[[Think#가려움을 해결한 방법 1]]
[[Architecture#Check Point]]
[[Technology#Functional_Programming]]

## Reference
- https://en.wikipedia.org/wiki/SOLID
- https://en.wikipedia.org/wiki/Object-oriented_programming
- https://www.freecodecamp.org/news/object-oriented-programming-concepts-21bb035f7260/
- https://chodragon9.github.io/blog/easy-code/
- https://github.com/rwaldron/idiomatic.js/blob/master/translations/ko_KR/readme.md
