---
title   : Golang
summary :
date    : 2020-05-06 13:00:28 +0100
updated : 2021-04-14 14:18:48 +0100
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

#### golang has no class

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

#### golang
golang library, 실행파일, 서버

build
run
install - build 시 캐시
mod init <directory>
- go test 하면 모듈 업데이트 된다
- - go mod tidy 안쓰는 모듈 정리
클론 한 패키지 처음 세팅 시 js에서는 npm install 해서 바로 셋팅된다
go에서는 go mod tidy 하고, test ./... 해서 셋팅한다

package 명이 main 인 것은 빌드 시 실행파일로 생성된다
라이브러리는 폴더명과 같이 package 명을 입력해준다
실행파일에서도 라이브러리를 가져다 쓸텐데, 같은 프로젝트에서 만든 라이브러리라면
상대주소 말고 GOPATH/src 밑의 주소를 입력해준다

main 파일을 여러 개 만들고 싶어하는 사람들이 많아서 cmd라는 폴더 안에 폴더를 또
만들어서 여러 개의 실행파일을 만들게 레이아웃을 제안하고 있다

-----------------------------------------------------------------------

- redis
  - https://medium.com/@gilcrest_65433/basic-redis-examples-with-go-a3348a12878e
- mux handler <-> http handler what's different
- update nav css
- html render
  - static
  - template
  - setting static -> using link `style.css` -> `/style.css`
  - ! go module upgrade fail
  - blackfriday not match path
    - `gopkg.in/russross` -> `github.com/russross`
    - https://github.com/russross/blackfriday/issues/491
  - path.Join("app/index.html") not found
- ! cannot access app directory in docker
  - current directory is /src/app, and execute server using ../server.go
   Then, if i want use app-folder directory is ./ or absolute directory
- use struct in same directory other file
  - `go run a.go b.go` or `go run *.go` or `go install`-run binary

## wasm
`GOOS=js GOARCH=wasm go build -o main.wasm main.go`

- ! dial TCP: Protocol not available
  - WASM app don't allow HTTP
  - how to access Redis - server
- test -> upload mdfile -> show post
  - how to automation upload
- what's different between wasm and was
  - javascript to wasm language
- get file
  - https://github.com/mattn/golang-wasm-example/blob/master/main.go
  - render local path -> URL
- use for HTTP Get
  - use goroutine
  - https://github.com/golang/go/issues/26382
- which protocol use to render post? WASM or HTTP
- what is strength for WASM
  - use server language in browser
  - client-side rendering
- how to use wasm power
  - compiler
  - game
  - calculator
- tinygo
 - ! Uncaught (in promise) TypeError: WebAssembly.instantiate(): Import #0 module="wasi_unstable" error: module is not an object or function
  - TODO
- https://github.com/golang/go/wiki/WebAssembly

#### defer
defer should have know when close.
Object return something?
defer is so great idea
wow...
it can more light code
after error
go has good error handling method
- in python, try catch finally

calling g
printing g 0
printing g 1
printing g 2
printing g 3
panicking
//4
//defer in g 4
defer in g 3
defer in g 2
defer in g 1
defer in g 0
recovered in f
//returned normally from g
returned normally from f

#### golang context
context는 어떨때 사용하면 좋을까
DB풀 유지하는데는 사용 안하고
API 쓰는데는 사용하는 것 같은데...
- 보안 정보, 분석 정보, 데드라인, 취소 신호, 프로세스 경계 정보등을 가진다
- 대부분 함수 첫번째 인자로 전달
- 구조체에 넣지 말고 함수 인자로 전달
- 커스텀 타입으로 만들지말고 그냥 표준을 써라
- https://medium.com/@laeshiny/go-code-review-comments-%EC%A0%95%EB%A6%AC-47d05fdb49f6

## Defects
