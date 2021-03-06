---
title   : Computer Architecture
summary : ๐ฅ๏ธ CPU, Memory, OS, Kernel
date    : 2020-03-16 22:40:45 +0100
updated : 2021-07-14 17:15:51 +0900
tags    : strong_base
---

## Summary
๋์คํฌ์ ์๋ ํ๋ก๊ทธ๋จ์ ๋ฉ๋ชจ๋ฆฌ๋ก ๋ถ๋ฅด๊ณ ,
๋ฉ๋ชจ๋ฆฌ์ ์๋ ๋ฐ์ดํฐ๋ฅผ CPU๊ฐ ์ฝ์ด๊ฐ๋ฉด์ ํ๋ก๊ทธ๋จ์ด ๋์ํ๋ค.

## CPU
๋ถ ๋์ -> ํฐ ๋ธ์ด๋ง
Transistor -> Flipflop -> IC -> CPU or RAM
- AND OR XOR
- ARU MBR MAR -- John von neumann

low level - Assembly - complier - high level language
- low level (CISC - intel, RISC - arm)
    - ๊ธฐ๊ณ์ด๋ CPU์ 1:1 ๊ด๊ณ๋ผ ์ด์๋ธ๋ฆฌ์ด๊ฐ ๊ธฐ๊ณ์ด ๊ตฌ์กฐ์ ๋ง์ถฐ ๋ณํ๋๋ฉด CPU๋ ๋์ํ๋ค.
- USER want to running program: HDD -> RAM -> CPU (process) -> OUTPUT
- really running CPU with RAM and process scheduler

#### process
๋์คํฌ์ ์ ์ฅ๋ ํ๋ก๊ทธ๋จ์ด ์ฝ๋์ ๋ฐ์ดํฐ๋ฅผ ๊ฐ๊ณ  ์๋ค.
์ด๋ฅผ ์คํ์ํค๋ฉด ํ๋ก์ธ์ค๋ฅผ RAM์ ์ ์ฌํ๋ฉด์ ์ฝ๋์ ๋ฐ์ดํฐ๋ฅผ ๊ฐ์ ธ์ค๊ณ , ์คํ๊ณผ
ํ์ ํ ๋น ๋ฐ๋๋ค.
์ฝ๋๋ฅผ ์ฝ๋ ๊ฒ์ CPU์์ ๋ฉ๋ชจ๋ฆฌ๋ฅผ ๋ถ๋ฌ์ ๋ช๋ น์ ์ํํ๋ค.

#### Process, Thread
in 1970, computer has only 1 process, can run one program. process can make
  run multiple program. but people need multi-work. so multi-processing
  invented.

[[Software#History]]

-----------------------------------------------------------------------

## MEMORY
- Code - Code text, ๊ธฐ๊ณ์ด(Machine Code) ex) RISC
- Data - Global, Const variable
- Stack - region(local) variable, function
- Heap - dynamic variable
    - ํ ์์ญ์ malloc์ผ๋ก ์์ฑํ ๋์  ๋ณ์๊ฐ ๋ค์ด๊ฐ๊ณ  ์ด ์ฃผ์๊ฐ์ ์์ด๋ฒ๋ฆฌ๋ฉด ๋ฉ๋ชจ๋ฆฌ
    ๋ฆญ์ด ๋ฐ์ํ๋ค๊ณ  ํ๋ค. (๋ค๋ฅธ ์ธ์ด์์๋ new๋ก ํ ๋นํ๊ธฐ๋ ํจ)

[[Data_Structure]]

#### memory management
- memory leak
- internal fragmentation: 100 size but only use 99. 1 is fragmentation.
- External fragmentation: 100 -- 100 -- 0 -- 100 -- 100, 0 is fragmentation.
- Paging: memory separate to static size(it called page) by logical memory in
 physical memory.
- Segmentation: memory separate dynamic size. even though physical location.

#### ๋ฉ๋ชจ๋ฆฌ์ cpu ์บ์๋ ๊ตฌ์กฐ๊ฐ ๋ค๋ฅด๋ค
๋ฉ๋ชจ๋ฆฌ๋ dram, ์บ์๋ sram
cpu์ ๋ฉ๋ชจ๋ฆฌ์ ๋ฐ์  ์๋๊ฐ ์ฐจ์ด๋์ ์ง๊ธ๋ ์ฐจ์ด๊ฐ ์๋ค

๋ฉ๋ชจ๋ฆฌ๋ cpu์ ๋นํด ๋ฐ์ดํฐ ๋ณด๊ด์ด ํ์ํ๋ค

## Cache
- SRAM(static) ์ผ๋ก ๋ง๋ค์ด์ง๋ค
- ์ผ๋ฐ์ ์ผ๋ก ์ฌ์ฉ๋๋ RAM์ DRAM์ด๋ค (dynamic random access memory)
- ์บ์๋ ํค:๋ฒจ๋ฅ ํ์์ ํด์ํ์ด๋ธ๋ก ๊ตฌ์ฑ๋์ด ์์ด์ ์๊ฐ๋ณต์ก๋๊ฐ O(1)์ด๋ค

#### cache
- batch
- if need store log to db, firstly store log to redis, and batch to db

## IPC
socket, file handling, pipe, message queue, semaphore, shared memory

#### Disk I/O

#### ์ธ๋งํฌ์ด(์ ํธ๊ธฐ)
it's like a counter for check the processor is working.
by dijkstra for multiprocessor's deadlock
it looks like golang's waitgroup

mutex is binary semaphore for thread.
GIL is mutex for python to prevent use object by multi thread.
- ๋ฉํฐ ์ค๋ ๋ ์ฌ์ฉ ์ ์ค๋ ๋๋ค์ ๊ฐ์ญ์ ๋ง๊ธฐ ์ํด Mutex๋ผ๋ ํค๋ฅผ ์ด์ฉํ์ฌ ์ ๊ทผ์ ์ ์ดํ๋ค.
- ํ ์ค๋ ๋๊ฐ mutex๋ฅผ lock ์ํค๋ฉด lock์ ํด์ ํ  ๋๊น์ง ๋ค๋ฅธ ์ค๋ ๋๋ ์์์ ํ์ง ๋ชปํ๊ฒ ํด์ค๋ค.

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
