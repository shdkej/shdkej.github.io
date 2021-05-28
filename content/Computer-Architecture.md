---
title   : Computer Architecture
summary : 🖥️ CPU, Memory, OS, Kernel
date    : 2020-03-16 22:40:45 +0100
updated : 2020-11-11 10:25:05 +0100
tags    : strong_base
---

## CPU
Transistor -> Flipflop -> IC -> CPU or RAM
- AND OR XOR
- ARU MBR MAR -- John von neumann
- low level - Assembly - complier - high level language
- low level (CISC - intel, RISC - arm)
- USER want to running program: HDD -> RAM -> CPU (process) -> OUTPUT
- really running CPU with RAM and process scheduler

#### Process, Thread
in 1970, computer has only 1 process, can run one program. process can make
  run multiple program. but people need multi-work. so multi-processing
  invented.

[[Software#History]]

-----------------------------------------------------------------------

## MEMORY
- why cpu is fast, memory is slow
- Data - Code text
- Heap - Global variable
- Stack - region variable
- [[Data_Structure]]

#### memory management
- memory leak
- internal fragmentation: 100 size but only use 99. 1 is fragmentation.
- External fragmentation: 100 -- 100 -- 0 -- 100 -- 100, 0 is fragmentation.
- Paging: memory separate to static size(it called page) by logical memory in
 physical memory.
- Segmentation: memory separate dynamic size. even though physical location.

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

-----------------------------------------------------------------------

## Binary
이진수 활용법
- 정해진 크기가 있는 배열의 유무 감별
 - 0010000
- 보수
- xor

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
