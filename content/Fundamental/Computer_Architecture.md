---
title: 컴퓨터 사이언스
summary: 🖥️ CPU, Memory, OS, Kernel
date: 2020-03-16 22:40:45 +0100
updated: 2025-12-18 20:45:53
tags: fundamental
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

#### arm의 장점

저전력, 저소음

단점
호환성, 저성능

인텔도 저전력을 위해 뭔가 시도 중
하이브리드 코어로
4개의 저사양 코어와 1개의 고사양 코어를 같이 구성.

Apple does this strategy too.
little core, big core

- Arm 아키텍처가 저전력에 무조건 유리하다?
  코어당 클럭 수를 다르게 할 수 있어서?
  태블릿에 자주 쓰이는 AP는 arm
  PC에 자주 쓰이는 CPU는 인텔식 x64
  arm 아키텍처는 쿨러가 아예 필요 없다?

애플 실리콘은 인텔 cpu보다 더 성능이 좋은 arm cpu를 구현했다


## Linux Directory

- `/`
- `/bin` - 기본 명령어가 저장된 디렉토리
- `/sbin` - ifconfig 등 시스템관리자용 명령어가 저장된 디렉토리
- `/home` - 사용자의 홈 디렉토리
  - `useradd` 명령어로 새 사용자를 생성하면 생성자와 같은 이름의 디렉토리 생성됨
- `/tmp` - 공용디렉토리, 임시 작업 디렉토리
- `/lib` - 커널 모듈 파일,라이브러리 파일 존재
- 커널이 필요로 하는 파일들이 존재
- `/usr` - 일반사용자들이 주로 사용하는 디렉토리
  - 일반 사용자용 명령어는 /usr/bin 에 위치한다.
- `/var` - 일시적으로 저장하기 위한 디렉토리
  - 내용이 수시로 변경될 수 있는 파일
- `/dev` - 디바이스 파일 ( CD-ROM 등 )
- `/etc` - 시스템 설정 파일이 존재하는 디렉토리
- `/boot`
- `/proc`

## automatically run command when turn on the computer

/etc/rc.local
/etc/init.d/rc.local

## storage

기본 파티션 분할

- `/boot` : 부팅 파일들 저장. 첫번째 파티션으로. 부팅 빨라짐. 100~500MB
- `/`
- `/tmp` : 웹파일들 저장됨. 보안문제로 분할 필요
- `swap` : 가상메모리로 사용되는 부분 . 사용자의 메모리의 2배 정도로 설정

LVM

- 논리 볼륨 매니저
- 기존 파티션으로 분할 해 놓으면 용량 부족이나 증설 시 복잡한데 이를 이용하면 바로 구현할 수 있다.

#### standard stream

- stdin
- stdout
- stderr

#### SIGTERM

- 종료 신호. 일반적으로 ctrl+z, ctrl+c 등을 눌렀을 때 신호가 발생하게 되있다
- 각 프로그래밍 언어에서 시그널 호출이 가능하다
- SIGINT, SIGKILL 등도 있는데, SIGKILL은 즉각 종료되지만
  SIGTERM은 신호를 받아서 내부 처리가 가능하다. graceful shutdown을 구현하는
  등으로 활용 가능하다
