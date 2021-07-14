---
title   : Golang
summary :
date    : 2020-05-06 13:00:28 +0100
updated : 2021-07-14 10:11:06 +0900
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

#### go http
ServeHTTP와 핸들러에 대한 이해

![http](./img/http.svg)

mux = multiplexer
- 멀티플렉서는 패턴 처리를 여러개 한다는 의미다

Listen - (Handler - ServeHTTP) - Serve?
- mux = handler, 서버가 serve를 할 때 mux를 받는데, 안넣으면 디폴트 mux를 쓴다.
- mux는 ServeHTTP를 구현해야 한다.
- handler interface는 http 패키지에서 정의되있는 것을 보면 ServeHTTP를 갖는
  인터페이스다. 그래서 ServeHTTP만 가지고 있으면 핸들러로 쳐준다.

그러면 ServeHTTP는 어떤 동작을 해야 하는가
- mux라 함은 입력값을 받아서 응답을 해주는 것이다.
- URL을 받아 적합한 연결통로를 찾아서 넘겨준다.
- ServeHTTP의 역할이 mux의 역할
- 요청을 패턴이 일치하는 핸들러를 찾아서 전달해주는 것.

handler, handle, handleFunc, handlerFunc 차이 확인
- handler는 ServeHTTP를 구현하는 interface, response request 활용 가능
- handle은 패턴과 handler를 받아서 쓰는 handler의 wrapper 느낌
- handleFunc는 ServeHTTP를 구현한 객체들을 일일이 생성하는 것이
  불편해서 만들어졌다고 하는데, 잘 모르겠다
    - handleFunc는 두번째 인자로 받는 func을 ServeHTTP가 실행하도록 해놓은
      것 뿐이다. (이 func는 writer와 request를 인자로 가져야 하긴 한다)
    - ServeHTTP가 writer와 request를 가져야 하니까 헷갈렸다.
- handle과 handleFunc는 둘다 패턴과 핸들러를 받아 처리한다.
- handle은 handler를 받고, handleFunc는 일반함수를 handler로 wrapping 해준다.
- handleFunc이 패턴과 함수를 처리한다. http에서는 디폴트 mux에
  연결해준다.
- handlerFunc는 일반 함수를 handler 함수로 wrapping 해준다

```go
http.HandleFunc("/", func())
http.ListenAndServe(":8080", nil)

http.Handle("/", handler)
http.ListenAndServe(":8080", nil)
```
즉 요청을 받으면 ServeHTTP가 실행되고 그 뒤에 원하는 비즈니스 로직을 돌린다.
- gin 내부를 확인해봐도 ServeHTTP가 라우팅으로 연결해주고 있다.
- https://dejavuqa.tistory.com/314

## Library
#### graphql-go
gqlgen

Need update just 2 file
1. `resolver.go` -- implement function
    or `schema.resolvers.go`
2. `schema.graphqls` -- data structure setting

auto generate to gqlgen
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
#### 고 모듈에서 버전관리가 별로다
시멘틱 버저닝을 지원하지 않고 패키지에 v2처럼 버저닝을 하기를 권장한다.
js에서는 package.json으로 자체 모듈 버저닝뿐 아니라 의존성 관리도 유연하게 할 수 있다.
그래서 시멘틱 버저닝과 체인지로그 관리도 쉽게 할 수 있는데, go는 안된다.

#### 패키지 관리
Golang을 예로 들면, 1.x 버전을 사용하고 있는데 2.x버전이 나오면 자동 업데이트를
하면 안되고 그렇다고 그냥 방치하거나 수시로 들어가서 확인하는 것도 번거롭다.
그렇다면 자신의 레파지토리에 있는 라이브러리들을 읽어서 업데이트 하라고 알림
같은게 오면 좋겠다. 아 그러면 CI 작업 시에 알려주면 되겠다.
npm에서는 패키지 설치할 때 알려줄 수 있다. 근데 이러면 설치랑 업데이트가 섞여서
알아보기 힘들지 않을까

Go에서 패키지 배포를 해봐야겠다
note-server/server와
note-server/data-store를 한 레파지토리에서 따로 임포트해서 쓸 수 있을까?
아니면 data-store를 가져오면 딴 것도 같이 가져와질까?
- 상위 레벨에서 깃 레파지토리를 가져온다. 버전도 함께.

고의 장점이 깃에만 올라가있으면 가져올 수 있다는 것이다.

#### vs rust


## Reference
- [Go에서 DIP](https://simplear.tistory.com/24)
- [common mistakes in go](http://devs.cloudimmunity.com/gotchas-and-common-mistakes-in-go-golang/?ref=hackernoon.com)
- [Go Hacking.md](https://novemberde.github.io/golang/2021/04/05/Golang-HACKING.html)
- [ultimate-go](https://github.com/ultimate-go-korean/translation)
- [Golang과 Clean Architecture](https://blog.puppyloper.com/menus/Golang/articles/Golang%EA%B3%BC%20Clean%20Architecture)
- [Go error handling](https://dave.cheney.net/2016/04/27/dont-just-check-errors-handle-them-gracefully)
    - (번역) http://cloudrain21.com/golang-graceful-error-handling
- [Go Standard Layout](https://github.com/golang-standards/project-layout/blob/master/README_ko.md)
- http://www.dogfootlife.com/archives/452
- https://umi0410.github.io/blog/golang/go-mutex-semaphore/
