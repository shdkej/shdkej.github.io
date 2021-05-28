---
title   : Data Structure
summary :
date    : 2020-03-25 08:02:32 +0100
updated : 2020-11-07 16:39:55 +0100
tags    : strong_base
---

## How to choice Data Structure
- how to access
- memory space
- ordered
- concurrency
- duplicates
- mutable

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
# b address = 0x000080
# c address = 0x000000000040
# d address = 0x0000000000c0
```

#### Linked lists
- So linked list is for solve this problem. -> reduce ADD, REMOVE time.
 - but linked list need time to find behavior.
 - add, remove O(1), search O(n) -> search O(n) means it is add to be O(n) as well
 - linked list is based on Trees
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
[[Computer-Architecture#MEMORY]]
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

## Algorithm
- sort, search
- 무결성,복잡도 분석, 그래프 알고리즘, np-완비
#### DFS
#### BFS
#### Using Hash Tables
#### Variables/Pointers manipulation
#### reverse linked list (duplicates, removing duplicates)
#### Binary search
#### sorting fundamentals
- runtime of a sort, time space complexity
  - quicksort (1959 by tony hoare)
  - mergesort (1945 by von neumann)
  - bubblesort

#### Greedy algorithms

#### Recursion
#### Divide and conquer
- quick, merge sort

#### Dynamic Programming and memoization
- save previous result, O(n)
- solving to make problem to subproblem, it's like a divide and conquer, but
  difference is DP use result many time, but DaC use one time.
  DP for memoization, DaC for problem divide(n/2).
- DP can use in overlapping subproblem(fibonacci)
- memoization need lots of space complexiety, sliding window can make better.

#### Graph traversal
- Dijkstra algorithm : find shortest way in graph (if negative exist, can't use)
  checked-way queue, distance array, remain-way queue

## Others
- [[Golang]]
  - array
    - length is static, only one type
  - slice
    - length is dynamic
  - map
- [[Python]]
  - list []
    - mutable, ordered, can add duplicates, any types
  - dictionary {}
    - cannot nested, key set immutable value to hash, key is unique
  - tuple ()
    - immutable
  - set
    - unordered, unique,
- Redis
  - string
  - list
  - set
  - hash
  - sorted set
  - bitmap

## reference
- https://docs.python.org/3/tutorial/datastructures.html
