---
title   : Python
summary : Beautiful, Explicit, Simple, Complex than complicated.
date    : 2020-05-06 12:40:23 +0100
updated : 2021-12-04 13:54:06 +0900
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
- interpreter, dynamic type
- floor division?
- [GIL](Computer_Architecture#GIL is mutex for python to prevent use object by multi thread.)
- debugging
- wrapper
- what is python? What are the benefits of using python?
    - object
    - modules
    - threads
- How Python is interpreted
- How memory is managed in python
    - Python memory is managed by python private heap
- What are Python decorators?
- What is the difference between list and tuple?
- What is Dict and List comprehensions are?
- Why lambda forms in python does not have statements?
- Runtime return?
- What is a pass in Python
- What is docstring in Python?
- How are arguments passed by value or by reference
- How can you share global variables across modules


[[Software#pointer vs reference]]
[[Data_Structure#Python]]

#### compiler
CPython
- 기본적으로 python 설치 후 실행하면 이 컴파일러로 실행된다
- 파이썬은 C로 구현되기 때문에 C로 구현된 컴파일러로 제작되었다
- C언어로 작성된 컴파일러가 파이썬 코드를 읽어 바이트코드로 컴파일하여
  인터프리터로 실행한다
- 파이썬에서 C를 이용하는 라이브러리(e.g. NumPy)들이 있는데 이것들을 실행하는데는
  CPython을 써야 했었다.
- https://lgphone.tistory.com/m/128?category=913302

Cython이라는 C로 변환 후 컴파일하는 컴파일러도 있다.

PyPy
- python으로 구현된 컴파일러
- JIT (just in time)
  - 인터프리터의 단점을 보완하기 위해 나온 방식
  - 인터프리터 방식으로 실행하다가 (적절한 시점에) 네이티브 코드로 변경하여
    캐싱해 직접 실행
  - meta-tracing
  - https://j.mearie.org/post/5125952364/why-is-pypy-faster-than-cpython
- RPython
  - static python compiler
  - 파이썬의 동적인 부분을 없애 정적인 결과물로 만들어 속도 향상을 한다
  - 인터프리터를 만드는 컴파일러
- RPython이 만든 인터프리터를 이용해 실행함으로써 읽는 코드의 상태가 다르다.
  - 인터프리팅 자체의 속도가 빨라진다
- RPython + JIT로 속도 향상을 이루었다

#### 파이썬 self
super, self
- 인스턴스
  - `a = Test()`
    할 때 생기는 a
- 네임스페이스
  - 클래스 생성 시 파이썬 기본 함수 목록에 저장된다
   이것이 네임스페이스
   클래스 내부의 인자는 네임스페이스 안에 딕셔너리 형태로 저장됨
  - 인스턴스 생성시에도 네임스페이스에 저장된다
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
#### Python concept with id() function.
Everything is an Object in Python
- Even function and class, id()

variable Assignment and Aliasing
- `hello = 'Hello world'`
- `world = hello`
- hello's id equal with world's id

`==` operator, `is` operator
- `==` compares the value
- `is` compares the identities(i.e. memory addresses)

integer caching
- -5 ~ 255 are caching

shallow and deep copies
- shallow copy make new object.
- deep copy make new object and if layer has a nested layer, recursively copy

a = 1000 을 해놓고 a+=1을 하면 a의 주소는 변한다
다시 a = 1000 을 하면 1000의 주소는 할당해제 되고 가비지컬랙터가 수거해가서
새로운 주소가 할당된다
할당되었다는 것은 메모리를 차지하고 있다는 것.
가비지 컬렉터가 수거해가나? 언제? del 명령어가 있다
-5 에서 256이 기본적으로 할당되어 있어서 아이디가 고정되는 것

#### shallow copy, deep copy
파이썬은 기본적으로 대입 연산 시 값이 아닌 레퍼런스를 참조한다.
- 그냥 대입하면 레퍼런스를 참조해버리는데, 참조를 원하지 않을 때 copy를 쓴다
- 배열형 객체가 아니라면 새로운 값 입력 시 객체가 변경되므로 copy를 쓸 일이 없다

deep copy와 shallow copy의 차이는 중첩된 배열처럼 중첩된 구조에서 차이를 보인다.
```py
import copy
a = [[1,2,3],[4,5,6]]
b = a
c = copy.copy(a)
d = copy.deepcopy(a)
id(a) # 0x0000
id(b) # 0x0000
id(c) # 0x0600 임의의 값. a와 다르다는 의미
id(d) # 0x0800 임의의 값. a와 다르다는 의미

a[0][0] = 0
print(a) # [ [0,2,3], [4,5,6] ]
print(b) # [ [0,2,3],[4,5,6] ]
print(c) # [ [0,2,3],[4,5,6] ] 중첩 된 곳을 참조해버렸다
print(d) # [ [1,2,3],[4,5,6] ]

a[0] = [1]
print(a) # [ [1],[4,5,6] ]
print(b) # [ [1],[4,5,6] ]
print(c) # [ [0,2,3],[4,5,6] ]
print(d) # [ [1,2,3],[4,5,6] ]
```
copy.copy() 는 [:]와 동일하다

is 는 객체를 확인하고, ==은 값을 확인한다

#### Built-in functions
- https://docs.python.org/3/library/functions.html
- abs max min pow sum round divmod
- all any filter map sorted zip
- enumerate range len
- chr hex ord oct
- id input isinstance open dir eval
- str tuple type list int

## Miscellaneous
#### 한글 사용
맨 위에 `#-*- coding:utf-8 -*-` 입력

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
```
import re
.compile
.sub(pattern,replace,string,count,flag) - 찾아바꾸기
.search
.match
.findall
.group
```

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

#### 표준 라이브러리
파이썬 itertools Collection Counter Dequeue

#### numpy
- array

#### singleton in python
여러 상황에서 하나의 객체를 부를 때 동일한 객체를 부르기 위해 싱글턴패턴을 사용하는데 자바에서는 스태틱으로 정적할당을 해주는데 파이썬에서는 어떻게 하지?
- @staticmethod

싱글턴을 안쓰고 그냥 정적변수 또는 전역변수로 써도 같은 역할을 할 수 있지만 싱글턴은 더욱 확장 가능한 객체로 꾸밀 수 있다

#### if need initial python dependency using this
RUN pip3 install --no-cache-dir pandas sklearn requests
RUN pip3 freeze > requirments.txt

#### pickling and unpickling?
python 객체를 직렬화해서 파일에 저장하고 이용하는 것
- serialize해서 TCP 등으로 전송하기 좋다
- 여러 파일 간 공유하기 좋다
- 프로그램 상태를 저장해서 쓸 수 있다
- https://www.geeksforgeeks.org/understanding-python-pickling-example/
- http://t.ly/xAQL

#### json dumps, loads
dumps - python object -> json
loads - json -> python object

## Defects
what is the 3 worst defects python
- interpreter(and dynamic assignment), I like interpreter, but It has limit
- don't use python2 with 3 하위 호환성
- in web browser, nodejs is better

## WTF
https://github.com/satwikkansal/wtfpython
```py
a = 1
b = 1
# a address = 0x94ce80
# b address = 0x94ce80
```
파이썬에서 -5 부터 256까지는 객체로서 미리 할당되어있다

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

## Reference
- [generator](https://realpython.com/introduction-to-python-generators/)
-[yield](https://stackoverflow.com/questions/231767/what-does-the-yield-keyword-do/231855#231855)
- [한글 인코딩](https://redscreen.tistory.com/163)
