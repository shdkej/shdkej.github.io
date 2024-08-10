---
title: 컴퓨터 사이언스
summary: 🖥️ CPU, Memory, OS, Kernel
date: 2020-03-16 22:40:45 +0100
updated: 2021-08-29 00:16:56 +0900
tags: strong_base
---

## Summary

디스크에 있는 프로그램을 메모리로 부르고,
메모리에 있는 데이터를 CPU가 읽어가면서 프로그램이 동작한다.

## CPU

불 대수 -> 폰 노이만
Transistor -> Flipflop -> IC -> CPU or RAM

- AND OR XOR
- ARU MBR MAR -- John von neumann

low level - Assembly - complier - high level language

- low level (CISC - intel, RISC - arm)
  - 기계어는 CPU와 1:1 관계라 어셈블리어가 기계어 구조에 맞춰 변환되면 CPU는 동작한다.
- USER want to running program: HDD -> RAM -> CPU (process) -> OUTPUT
- really running CPU with RAM and process scheduler

#### process

디스크에 저장된 프로그램이 코드와 데이터를 갖고 있다.
이를 실행시키면 프로세스를 RAM에 적재하면서 코드와 데이터를 가져오고, 스택과
힙을 할당 받는다.
코드를 읽는 것은 CPU에서 메모리를 불러와 명령을 수행한다.

#### Process, Thread

in 1970, computer has only 1 process, can run one program. process can make
run multiple program. but people need multi-work. so multi-processing
invented.

[[Software#History]]

---

## MEMORY

#### C 언어가 메모리를 사용하는 방식

- Code - Code text, 기계어(Machine Code) ex) RISC
- Data - Global, Const variable
- Stack - region(local) variable, function
- Heap - dynamic variable
  - 힙 영역에 malloc으로 생성한 동적 변수가 들어가고 이 주소값을 잃어버리면 메모리
    릭이 발생한다고 한다. (다른 언어에서는 new로 할당하기도 함)

자바는 JVM 위에서 동작하고 메모리 동작 방식이 다르다.

파이썬, javascript 같은 인터프리터 언어도 동작이 다르다.

[[Data_Structure]]

#### memory management

- memory leak
- internal fragmentation: 100 size but only use 99. 1 is fragmentation.
- External fragmentation: 100 -- 100 -- 0 -- 100 -- 100, 0 is fragmentation.
- Paging: memory separate to static size(it called page) by logical memory in
  physical memory.
- Segmentation: memory separate dynamic size. even though physical location.

#### 메모리와 cpu 캐시는 구조가 다르다

메모리는 dram, 캐시는 sram
cpu와 메모리의 발전 속도가 차이나서 지금도 차이가 있다

메모리는 cpu에 비해 데이터 보관이 필요하다

## Cache

- SRAM(static) 으로 만들어진다
- 일반적으로 사용되는 RAM은 DRAM이다 (dynamic random access memory)
- 캐시는 키:벨류 타입의 해시테이블로 구성되어 있어서 시간복잡도가 O(1)이다

#### cache

- batch
- if need store log to db, firstly store log to redis, and batch to db

## IPC

socket, file handling, pipe, message queue, semaphore, shared memory

#### Disk I/O

#### 세마포어(신호기)

it's like a counter for check the processor is working.
by dijkstra for multiprocessor's deadlock
it looks like golang's waitgroup

mutex is binary semaphore for thread.
GIL is mutex for python to prevent use object by multi thread.

- 멀티 스레드 사용 시 스레드들의 간섭을 막기 위해 Mutex라는 키를 이용하여 접근을 제어한다.
- 한 스레드가 mutex를 lock 시키면 lock을 해제할 때까지 다른 스레드는 작업을 하지 못하게 해준다.

#### IOCP(input/output Completion Port)

epoll
kqueue
it is for asynchronization I/O.
every computer use I/O for computing.
nowadays computer has multiple processor. So windows has IOCP, linux has epoll.
networking also used with socket generally.

## OS

- multics - unix - minix - linux
- zenix - Macintosh - windows
- unix, mac, windows are not first os. but it is now most used OS.

#### In OS, micro kernel vs monolithic kernel

- unix, linux = monolithic. base on kernel
- micro kernel is base on each process. and communicate with other messenger
- micro kernel can use general hardware. linux made for 1 target hardware.
  it is good to use more hardware performance. but it depends on 1 hardware.
  micro kernel's problem is don't use hardware performance efficiently.
  micro kernel has portability.

[[Software#desktop os history]]
