---
title   : Coding Rule?
summary : Coding Convention, Design Principle
date    : 2020-03-16 21:13:05 +0100
updated : 2021-04-17 21:24:53 +0100
tags    : strong_base
---

## TL;DR
How can I get a good code? there's many rule. e.g. SOLID, DRY, YAGNI.
But there's too many rule. that's good though, pick 8 rules and keep reminding
to write code, so I summarized this 8 rules.

-----------------------------------------------------------------------

## SOLID
## TDD
## OOP
## Functional Programming
## Clean code
## Coding convention
## Error Handling
## Loging

## SOLID
**Abstraction, One Behavior class, Encapsulation**
- S One class should work one behavior and **Single reason to change**
 - reason to change is not bug-fix and refactoring. it's about design level
- O is Open to Expend, Close to Change
- L Sub class should run program that substitution with base class
- I interface make keep **small**. Don't provide method that client doesn't use.
- D depend upon **abstraction**, not concretion.

## OOP
- **Encapsulation, Composition, Inheritance, Delegation, Polymorphism, Open recursion**
- coupling vs cohesion
- same Input, should same output
- Encapsulation = Module?
    - Encapsulation is hide the value

#### 폴리모피즘 Polymorphism
객체 생성 시 고정된 객체를 만드는 것이 아니라 기준만 만들고 실제 구현은 각 상황에 맞게 수정할 수 있게 하는 것

인터페이스나 추상클래스를 이용하여 이를 상속해서 여러 객체를 하나의 기준으로 만드는 것
그리고 이를 이용하여 오버라이딩 하여 각 객체에 맞게 재구현할 수 있는 것

하나의 객체를 다양한 방법으로 사용할 수 있게 하는 것

## Functional Programming

## Coding Convention
Depends on Company rule. use lint in editor

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

#### BDD, DDD

#### unit testing, system testing
- https://www.geeksforgeeks.org/difference-between-unit-testing-and-system-testing/
- unit testing
 - single module base,
- system testing
 - depends specific requirement, totally test

#### Refactoring
- Change makes improve. like revision of writer's book
- Refactoring can make a more good code like Writer make revision is going to make
  a good word
- Don't be afraid of refactoring

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

```
function()
{
 HRESULT error = S_OK;
if(SUCCEEDED(Operation1()))
 {
  if(SUCCEEDED(Operation2()))
  {
   if(SUCCEEDED(Operation3()))
   {
    if(SUCCEEDED(Operation4()))
    {
    }
    else
    {
     error = OPERATION4FAILED;
    }
   }
   else
   {
    error = OPERATION3FAILED;
   }
  }
  else
  {
   error = OPERATION2FAILED;
  }
 }
 else
 {
  error = OPERATION1FAILED;
 }
return error;
}
-->
function()
{
	HRESULT error = S_OK;
 OPERATION = [1,2,3,4,5]
 for i in OPERATION {
  error = call(Operation + i)
  if error; return error;
 }
	return error;
}
Operation1() {
 if done {
  return true
 }
 return false
}
```

-----------------------------------------------------------------------

## ETC
- consider domain. domain is gonna make design.
- minimize change code when need change.
- code communication이 되도록 보기 좋은 코드 (Readability with code communication)
- 문서화는 중요하다 코드만 봐도 되게 하면 더 좋겠지만
- 주석 대신 프로그램만 읽어서 이해가 되도록
  - 하지만 주석은 필요하다
- 직관적으로 쓴다
- 코드가 간결해야 한다
- 클린코드를 지향하는 이유는 모든 서비스는 단번에 완성도를 100으로 만들 수 없고 유지보수와 기능추가가 반드시 필요하기 때문에 이를 편하게 하기 위함이다.
- 가벼워야 한다. 그래서 외부 API나 라이브러리를 안쓰고 싶었다
  - no dependency, low coupling
- 안전한 동작 - 회사일을 하면서
- 하나하나의 시스템이 완성도 높은 시스템으로 구성할 수 있도록
- 엘리베이터의 안정성이 보장되는 것처럼 (보장된다는 것이 100%는 아니다) 프로그램도 안정성이 보장되어야 한다.
  그저 동작하는 프로그램만으로는 부족하다 테스트코드를 만듦으로서 안정성을 높일 수 있다. 또 다른 방법은 무엇이 있을까
- Transparent
- 확장 시 확장하는 그 자체만 코드가 작성되어야 하고 기존의 코드를 건드리면 좀 별로다

#### Language Design Principle
[C](Software#History)
[[Python#The Zen of Python]]
[[Golang#Philosophy]]

#### Internal Links
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
