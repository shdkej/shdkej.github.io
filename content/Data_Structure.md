---
title   : Data Structure
summary :
date    : 2020-03-25 08:02:32 +0100
updated : 2021-09-17 00:31:08 +0900
tags    : strong_base
---

## How to choice Data Structure
- how to access
- memory space
- ordered
- concurrency
- duplicates
- mutable
- read, write frequency
- size
- 데이터 분포, 입출력빈도

## Base
#### search, add, remove, sort
#### Data Type
- int, char, long
- memory assign to fix size

```c
// C
int a = 1
int b = 2
// a address = 0x0000
// b address = 0x0004
```

#### Arrays
- memory address sequentially called by fixed size
 - in Python, but flexible list
- add or remove element then other element need shift. it is slow.
- search O(1), add, remove O(n)
- also called by List
- von neumann used array in 1945, for merge sort

```c
// C
int a[2]
int b[2]
// a address = 0x0000
// b address = 0x0008
```

```py
# python
a = 1
b = 2
c = []
d = []
# a address = 0x000080
# b address = 0x000080 a == b
# c address = 0x000000000040
# d address = 0x0000000000c0 c size is 80
```

#### Linked lists
- So linked list is for solve this problem. -> reduce ADD, REMOVE time.
  - but linked list need time to find behavior.
  - add, remove O(1)
  - but search O(n) -> search O(n) means it is add to be O(n) as well
  - linked list is based on Trees
- list has limit extend size (delete, insert)
- benefit: insert time
- disadvantages: finding. n(th) node takes time to n[O(n)]

```py
class Node:
 def __init__(self, data):
  self.data = data
  self.next = None

class LinkedList:
 def __init__(self):
  node =
```

```go
type Node struct {
 data int
 next Node
}
```

```
a1 = new Node(5)
a1.insertAfter(10)
insertAfter(int item) {
  next = new Node(item, next)
}
//a1 => item 5, next (item 10, next)
```

#### Hash Table
- Hash by Hash function
- Collision management is key issue
- If hash function is good, then search speed is O(1), most quick

#### Graphs
- edge, vertex(point)

#### Binary trees

#### Maps
- why need map type?

#### Stack, Queue, Heap
[[Computer_Architecture#MEMORY]]
메모리에서의 용어, 자료구조에서의 용어가 각각 있다.
- 스택
 - 동적
 - 스택은 프로그램이 자동으로 사용하는 임시 메모리 영역
 - 지역변수는 스택에 저장
 - 버퍼메모리 사용시 스택은 후입선출
 - 함수를 호출한 후에 원래 자리로 돌아오려면 원래 자리를 저장해 둬야 되는데 그곳이 스택
- 힙
 - 정적
 - 전역변수와 static 변수 등은 메모리의 데이터 영역에 저장됨
 - 힙은 프로그래머가 스스로 할당한 메모리 영역
 - 버퍼메모리 사용시 힙은 선입선출

자료구조에서의 스택,큐
- 스택 : 후입선출하는 구조, 깊이 우선 탐색
- 큐 : 선입 선출, 너비 우선 탐색
  - list isn't good make queue. delete need moving every node. it is slow O(n)
- 힙 : 완전 이진 트리

## Algorithm
- sort, search
- 무결성,복잡도 분석, 그래프 알고리즘, np-완비

#### DFS

#### BFS
```py
def bfs(graph, root):
    visited = set()
    queue = deque([root])
    while queue:
        child = queue.popleft()
        for neighbour in graph[child]:
            if neighbour not in visited:
                visited.add(neighbour)
                queue.append(neighbour)
```

#### Using Hash Tables
#### Variables/Pointers manipulation
#### reverse linked list (duplicates, removing duplicates)
#### Binary search
#### sorting fundamentals
- quicksort (1959 by tony hoare)
- mergesort (1945 by von neumann)
  - 나누고 합치는 정렬
  - 가장 작게 나누고 정렬 후 한 단위씩 합치면서 재정렬한다. O(n log n)
- bubblesort
  - 맨 앞부터 인접한 두 원소 비교 후 큰 숫자를 뒤로 옮기면서 맨 뒤에 제일
    큰 숫자가 가게 된다. 맨 앞까지 전체 순회 반복.
    간단하지만 성능상 별로 좋지 않다 O(n^2)

#### Greedy algorithms

#### Recursion
#### Divide and conquer
- quick, merge sort

#### Dynamic Programming and memoization
- save previous result, O(n)
- solving to make problem to subproblem, it's like a Divide and Conquer, but
  difference is DP use result many time, but DaC use one time.
  DP for memoization, DaC for problem divide(n/2).
- DP can use in overlapping subproblem(fibonacci)
- memoization need lots of space complexiety, sliding window can make better.

#### Graph traversal
- Dijkstra algorithm : find shortest way in graph (if negative exist, can't use)
  checked-way queue, distance array, remain-way queue

다익스트라 (음수 있으면 안됨)
벨먼 포드 (음수 확인은 가능)
a*(에이스타) - 다익스트라 개선버전

#### 순열, 조합

#### Binary
이진수 활용법
- 정해진 크기가 있는 배열의 유무 감별
  - 0010000
- 보수
- xor
- 피자 토핑처럼 특정한 요소를 선택할지에 사용

#### 쿼드 트리 뒤집기
```
# xxwww bxwxw bbbww xxxww bbbww wwbb
# w -> w
# xbwwb -> xwbbw

# 한 글자씩 계산해서 뒤집어서 더한다
func reverse(character *char) string {
  char head = *character
  ++character
  if (head == 'b' || head == 'w') {
    return head
  }

  upperLeft = reverse(character)
  upperRight = reverse(character)
  lowerLeft = reverse(character)
  lowerRight = reverse(character)

  return "x" + lowerLeft + lowerRight + upperLeft + upperRight
}

```

#### 알고리즘
수행 시간 - 입력의 크기 등이 영향을 미친다

인덱스로 로직을 처리하는 작업에서 배열의 길이가 1개인 것을 놓치면 안되겠다
끝에 있는 것도 체크를 잘 해야겠다
범위를 검사하는 것은 2가지만 체크하면 된다

a에서 b를 모두 감싸던지, a에서 b 안에 들어와 있던지


1/10 * 3 과 3/10을 비교하면 실수부분 계산이 정확하지 않아서 다르다고 나온다
10^20/x *x == 10^20을 하면 약분부터 하지 않기 때문에 계산 값이 큰 것부터 계산된다

#### 우선순위 큐
힙은 완전이진트리의 형태를 말함
힙의 구현이 우선순위 큐의 구현이 될 수 있다

우선순위 큐를 왜 쓰는지 이해가 안됐는데
우선순위가 있는 값을 삽입할 때 그 위치를 파악하려면 전체 리스트를 순회하는 것이
불합리해서
차라리 우선순위를 바로 계산하는 형태로 만들어서 삽입 시간을 빠르게 하기
위해서라고 한다

일리가 있다

근데 이게 데이터를 미리 다 받아둔 다음 한번에 정렬하는 것과 비교하면 어떤 상황에
써야할지 감이 안온다
우선순위 큐가 가장 효율적인 상황은?
애초에 우선순위 큐를 리스트로 구현가능하다
근데 삽입시간을 줄이는 목적을 위해 힙을 이용해서 우선순위 큐를 구현하는 것이
좋을 것 같다

데이터의 크기가 너무 클 경우


우선순위 큐는 사실 기본 자료구조를 이용한 집합판인 것 같다
탐색에 트리가 효율적이고, 일반적으로 괜찮은 속도를 보여주는 이진검색을 이용해
이진 트리를 이용하기로 생각한 형태이다
자료구조의 정리판 같은 느낌이다

힙이 어차피 배열로 구현된다


## Others
#### Golang
[[Golang]]
- array
  - length is static, only one type
- slice
  - length is dynamic
- map

#### Python
[[Python]]
- list []
  - mutable, ordered, can add duplicates, any types
- dictionary {}
  - cannot nested, key set immutable value to hash, key is unique
- tuple ()
  - immutable
- set
  - unordered, unique,

#### Redis
- string
- list
- set
- hash
- sorted set
- bitmap

#### 정렬
삽입정렬은 랜덤배치에 약하다

퀵 정렬에서 피봇 값을 어떻게 설정하느냐에 따라 분할하는 횟수가 달라지기 때문에
최대한 절반에 가까운 분할이 되도록 하면 좋다

- 분할하는 횟수가 많아지면 그만큼 작업시간이 길어진다. 각 부분의 크기가 한
  원소씩만 줄어들게 되면 n 만큼 정렬을 수행해야 되서 분할의 의미가 퇴색된다.

#### 분할정복
언제 분할 정복 사용이 가능한가?

완전 탐색이 필요한 경우 동적계획법을 사용한다

#### 재귀 vs 분할 정복 vs 동적 계획법
재귀는 10가지에서 1가지 씩 적게 하면서 더해가면서 풀이

분할 정복은 반씩 나눠서 풀이 후 결과만 합치기
- 분할 정복에서 분할을 어떻게 하느냐에 따라 중복으로 계산하면서 시간 소모하는
  경우가 있다
    - 그래서 중복되지 않도록 분할한다
- quick sort, merge sort가 대표적인 분할 정복 패러다임 이용 방식

동적 계획법은 분할 정복과 비슷하게 문제를 분할하지만 중복되는 것을 허용하고 이를
저장해두고 사용한다(메모이제이션).

#### algorithm
B+ tree, Red-Black tree
trie
문자열 알고리즘
priority queue

#### linked list
데이터의 변화가 많을 때는 링크드 리스트가 좋다?
딕셔너리와 비교해보면?
순서가 있으면 링크드 리스트가 낫겠다
모든 자료구조는 리스트와 링크드리스트로 구현된다
딕셔너리도 내부는 리스트로 구현되어 있나?
ordered list와 링크드리스트로 구현된다고 한다

해시테이블은 같은 해시값이 있으면 그 안에 리스트로 내용이 들어가고 한 해시값에 여러 내용이 있으면 리스트연산과 똑같은 검색속도를 가지게된다
왜 굳이 해시화해서 넣는거지? 그냥 딕셔너리로 하면 안되나?

아 해시테이블은 공간을 절약하는 것도 신경 쓴 것이다
딕셔너리로 한다면 공간이 무한정 늘어나게 되고
해시테이블은 한정된 공간 안에 효율적으로 골고루 넣어서 찾을 수 있도록 하기 위함이다

#### 인덱스
인덱스는 where절에서 특정 키워드를 검색하려고 할 때 그 키워드를 찾는걸 빠르게
해줘서 사용한다
딕셔너리, 해시테이블 같다

select name from student where number=1
이렇게 검색하면 인덱스가 없으면 student에서 선형으로 number가 1인 것을 찾는데
인덱스를 쓰면 number가 1인 것을 바로 찾을 수 있다

db 인덱스 탐색용으로 B트리가 주로 이용된다
B트리는 바이너리 트리와 다르게
노드의 수를 2개로 제한하지 않고 특정한 m 값을 정해서 만든다
그리고 이 m값을 페이지 캐시의 크기로 한다

일반 검색 시 선형시간이 걸리지만 인덱스를 만들면 로그시간으로 줄어들어 인덱스가
빠른 것이다

B트리를 개선해 B+트리를 이용한다

DB 인덱스를 효과적으로 설정하는 방법 - 고려해야 할 4가지
https://yurimkoo.github.io/db/2020/03/14/db-index.html
[mysql] 인덱스 정리 및 팁
https://jojoldu.tistory.com/243

##### 해시 테이블
해시 테이블이 검색 속도가 O(1)인 이유가 명확하게 설명하기 힘들다.
어레이에서도 인덱스번호로 접근하면 O(1)이 되나?
키값을 찾으면 거기에 바로 접근할 수 있다는 것이라면 맞아야 할 것이다.

메모리에 저장되는건 어차피 똑같은 주소크기를 차지할텐데

맞는 것 같다
대신 어레이의 사이즈를 좀 넉넉하게 하는 것 같다.
그리고 키에 해당하는 값을 아무대나 집어넣으면 공간적으로 비효율적이라서 해시함수를 이용해 특정 공간 안에 모은다. 검색하려면 해시함수를 거쳐서 메모리에 도달한다.
키값이 해시를 통해 인덱스로 변환되는 것인가.
어레이[1] 속도가 더 빠르겠네?
- [ ] 실험 필요

#### 검색 엔진
인덱스로 각 단어를 분리 -> 연결된 단어 검색 불가
구문 쿼리로 단어 간 연결성 검사 -> 동음이의어 등 원하는 것을 정확히 찾았는지 확인 불가
적합성 검사 -> 이를 고도화해야 함

구문쿼리에서 여러 문장을 하나의 키로 하는게 아니라 키는 각 단어로 해놓고 값에다가 위치를 추가해서 계산한다
적합성 검사는 랭킹을 매기는게 아니라 단어 사이의 거리를 구해서 가까운지 확인하는 것이다

랭킹 메기는 방법은
그 페이지가 링크된 횟수를 구해서 점수를 메긴다
단순히 링크된 횟수만 구하면 좋고 나쁘고를 구분 없이 구하게 되어, 링크한 사이트의 링크횟수를 다시 구해서 그 사이트의 신뢰성도 체크한다
구글은 이 방식의 장점을 포함한 무작위 서퍼 알고리즘이라는 것을 기반으로 발전했다


## reference
- https://docs.python.org/3/tutorial/datastructures.html
