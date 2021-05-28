---
title   : Golang
summary :
date    : 2020-05-06 13:00:28 +0100
updated : 2020-11-07 16:52:07 +0100
tags    : deep_knowledge
---

## Philosophy
- 패키지는 하나의 목적만을 달성합니다
- 에러는 명시적으로 처리합니다
- 빨리 반환하고 깊은 들여쓰기를 피합니다
- 동시성은 호출자에게 맡깁니다
- 고루틴 시작 전, 언제 멈출지 알아야 합니다
- 패키지 레벨 상태를 사용하지 않습니다
- 단순함은 중요합니다
- 패키지 API의 동작을 고정하기 위한 테스트를 작성합니다
- 느리다고 생각된다면, 벤치마크하여 이를 증명합니다
- 중용은 미덕입니다
- 유지보수성은 가치있습니다
- https://docs.python.org/3/library/functions.html

## Key point
- golang is concurrency friendly, I like it.
- garbage collection
- pointer vs reference
- interface
- goroutine

- defer - panic - recover : check source
- garbage collection

#### Specification
- new(File) and &File{} are equivalent

#### Auto Rebuild
- [CompileDaemon](https://github.com/githubnemo/CompileDaemon)
 - using docker cmd, complicit port
- [gin](https://github.com/codegangsta/gin)
 - Good Working

#### go folder management
- what is the better?
 - folder separate
 - only one folder

#### goroutine
if main function too short. it finish without running goroutine. so time.Sleep needed

## Library
#### graphql-go
- gqlgen
 - Need update just 2 file
 1. `resolver.go` -- implement function
  - or `schema.resolvers.go`
 2. `schema.graphqls` -- data structure setting
  - auto generate to gqlgen
   - `model.go`
   - `generated.go`

## [measure execution time in go](https://coderwall.com/p/cp5fya/measuring-execution-time-in-go)
-----------------------------------------------------------------------

## Defects
