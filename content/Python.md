---
title   : Python
summary : Beautiful, Explicit, Simple, Complex than complicated.
date    : 2020-05-06 12:40:23 +0100
updated : 2020-11-14 20:29:21 +0100
tags    : deep_knowledge
---

## The Zen of Python
- *Beautiful* is better than ugly.
- *Explicit* is better than implicit.
- *Simple* is better than _complex_.
- *Complex* is better than complicated.
- Special cases aren't special enough to break the rules.
- Although *practicality* beats purity.

## Key Point
- what is an object, class
 - module is not class. module can't do inheritance
 - but module can contains class
- generators (how to use, when is useful), yield
- super, self
- python2, 3 difference
- interpreter, dynamic type
- floor division?
- immutable, mutable
- what is the 3 worst defects python
 - interpreter(and dynamic assignment), I like interpreter, but It has limit
 - don't use python2 with 3 하위 호환성
 - in web browser, nodejs is better
- GIL
- debugging
- namespace
- wrapper

python
	- what is python? What are the benefits of using python?
		○ object
		○ modules
		○ threads
	- What is PEP 8?
		○ coding convention
	- What is pickling and unpickling?
	- How Python is interpreted
	- How memory is managed in python
		○ Python memory is managed by python private heap
	- Find bugs or perform static analysis tool
		○ Pychecker
	- What are Python decorators?
	- What is the difference between list and tuple?
	- How are arguments passed by value or by reference
	- What is Dict and List comprehensions are?
	- What is the built-in type does python provides?
		○ List, Sets, Dictionaries
		○ Strings, Tuples, Numbers
	- What is namespace in Python?
	- What is lambda in Python?
	- Why lambda forms in python does not have statements?
	- Runtime return?
	- What is a pass in Python
	- What are the generators in Python?
	- What is docstring in Python?
	- How can you copy an object in python
		○ Copy() or deepcopy()
	- What is the difference between xrange and range?
	- What is module and package in python
	- Mention what are the rules for local and global variables in python
	- How can you share global variables across modules
	- Mention the use of // operator in python?

pypy compiler
- JIT (just in time)
- Rpython
 - static python compiler

## More
#### 파이썬 self
- 인스턴스
 - a = Test()
 할 때 생기는 a
- 네임스페이스
 - 클래스 생성 시 파이썬 기본 함수 목록에 저장된다
 이것이 네임스페이스
 클래스 내부의 인자는 네임스페이스 안에 딕셔너리 형태로 저장됨
 - 인스턴스 생성시에도 네임스페이스에 저장된다
 - 확인
```py
dir()
#['Test', '__builtins__', '__doc__', '__loader__', …]
```

- self 는 해당 객체의 인스턴스를 가르킨다
- 주소값이 들어간다고 보면 될 것 같다
```py
class Test():
 def test():
  print("test1")
 def test2(self):
  print("test2")
 print(id(self))
 Test.test()
 a = Test()
 print(a.test())
 #self인자가 없다고 에러 발생
 print(a.test2())
 #test2
 #test2의 주소값 출력
 print(Test.test())
 #a.test()와 달리 에러 발생 안함
 #test1
```

#### 한글 사용
맨 위에 `#-*- coding:utf-8 -*-` 입력

#### Built-in functions
- https://docs.python.org/3/library/functions.html
- abs max min pow sum round divmod
- all any filter map sorted zip
- enumerate range len
- chr hex ord oct
- id input isinstance open dir eval
- str tuple type list int
#### requests

```py
import requests
data = {'id':'12','password':'12'}
URL = 'url'
res = requests.post(URL,data=data)
```

#### 파일 입출력
F = open('C:\test.txt')
F.read() - 전체 입력
F.readline() - 한 줄만 입력
F.readlines() - 반환값이 리스트
.split()

#### 정규식
import re
.compile
.sub(pattern,replace,string,count,flag) - 찾아바꾸기
.search
.match
.findall
.group

#### lambda python pandas parsing csv
- https://stackoverflow.com/questions/39303912/tfidfvectorizer-in-scikit-learn-valueerror-np-nan-is-an-invalid-document

#### reminder recommend python
- Filtering method
 - Demographic Filtering
 - Content Based Filtering
 - Collaborative Filtering- https://www.kaggle.com/ibtesama/getting-started-with-a-movie-recommendation-system
- ? find visualization system about csv file for weight manage
- upload lambda with pandas, scikit-learn
 - https://medium.com/@korniichuk/lambda-with-pandas-fd81aa2ff25e

#### 비동기 프로그래밍
- asyncio
 - get_event_loop() - asyncio 시작
 - loop.run_until_complete() - 이벤트 루프 시작
- 그린 스레드
- 스케쥴링을 하드웨어가 아닌 애플리케이션 코드가 대신한다.
- Gevent 는 그린스레드 + eventlet 이다
- 비동기 프로그래밍 = non-blocking i/o ?


#### python @classmethod @staticmethod
- classmethod has class argument
- staticmethod hasn't self. but can use statically

#### *args, **kwargs
- It is convention args is used to how many argument don’t you know
- Kwargs is used to how many argument don’t you know key:value data type as dictionary
- It is no need correct name it can use *man, **dkdke

#### numpy
- array

#### singleton in python
여러 상황에서 하나의 객체를 부를 때 동일한 객체를 부르기 위해 싱글턴패턴을 사용하는데 자바에서는 스태틱으로 정적할당을 해주는데 파이썬에서는 어떻게 하지?
- @staticmethod

싱글턴을 안쓰고 그냥 정적변수 또는 전역변수로 써도 같은 역할을 할 수 있지만 싱글턴은 더욱 확장 가능한 객체로 꾸밀 수 있다

#### if need initial python dependency using this
RUN pip3 install --no-cache-dir pandas sklearn requests
RUN pip3 freeze > requirments.txt

## Defects

## WTF
```py
a = 1
b = 1
# a address = 0x94ce80
# b address = 0x94ce80
```

```py
a = []
b = []
# a address = 0x7feaaaea6540
# b address = 0x7feaaaea65c0
b = [1,2,3]
# b address = 0x7feaaaea65e0
d = []
# d address = 0x7feaaaea65c0
b.append([0,1,2,3,4,5,6,7,8,9])
# b address over d ???
```
