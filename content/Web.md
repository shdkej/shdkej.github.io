---
title   : WEB
summary :
date    : 2021-03-22 21:41:28 +0100
updated : 2021-07-10 11:55:29 +0900
tags    :
---

## Web
- 통신 시스템의 데이터 보관 및 전송 필요성 대두
- 하이퍼링크 구현 (문서간 이동)
- 웹 구현 (문서 뿐 아니라 더 많은 데이터 이동)
- 플래시, 액티브엑스 대두 (웹의 기능 외의 것들 구현하는 플러그인)
- 무거움과 보안 문제 대두
- 자바스크립트 대두

액티브엑스는 C++로 만들어졌고
플래시는 액션스크립트로 만들어졌다고 한다
그 후 위에 둘은 없어지고 자바스크립트로 그것들의 구현을 대체하게 되었다.
그리고 지금 웹 어셈블리라는 프로그래밍 언어 활용이 가능한 방식이 대두되고 있다.
웹 어셈블리는 대세가 될 수 있을까? 대세가 되지 않더라도 역할을 구축할 수 있을까?

#### 웹으로 할 수 없는 것
백그라운드에서 실시간 데이터 입력받아 적용하기
예) 집에 들어오면 바깥 조명 확인해서 불켜주는 것
- PWA(progressive web app) makes it possible.

#### web should support this
- dark mode
- accessibility
- i18n
- link to new tab
- session manage
- history back button (undo button)
- '컨텐츠로 건너뛰기'를 만들어서 접근성을 높여야 한다
[[Design]]

#### 새로 고침 시에 어떤 동작을 하게 해야 할까
뭔가를 추가하는 동작을 한다면 새로 고침 시에 그 동작을 다시 하게 하면 안된다

뒤로가기를 할때는 작업하던 상황이 그대로 유지되야 한다

#### mobile view, web view
노트북에서 반쪽으로 브라우저를 띄우면 보기 불편한 웹페이지들이 많다
모바일 친화적인 곳은 보여지는 것이 웹보다 적은 경우도 있고
웹 친화적인 곳은 모바일 사이즈를 고려하지 않아 짤려 보여서 좌우로 계속 스크롤
해야하는 경우가 생긴다.

#### 브라우저
- 사용자 인터페이스(ui)
- 브라우저 엔진(chrome v8)
- 렌더링 엔진(webkit, gecko, blink)
- 네트워킹, 자바스크립트 해석기, 데이터 저장소

#### 렌더링 엔진
통상 8KB 조각 단위로 렌더링 수행
HTML 파싱 - 렌더 트리 구성 - 트리 배치 - 트리 그리기

#### browser
웹브라우저 엔진은 js용 쓰레드가 1개만 도는데 대신 web api라는게 따로 구현되어 있고 비동기작업을 처리하고 태스크큐에 보내 다시 js 쓰레드로 보내는 방식으로 비동기를 구현했다

Web api는 쓰레드를 여러개 쓴다. File, timer, ajax 등을 컨트롤한다.
Js thread
Web api - task queue - js thread?

#### html5 article 태그는 독자적인 내용을 담고 있을 때 사용한다고 한다
다른 곳에서 참조할 때 article 안에 있는 내용을 가져다 써도 그 내용만으로도 말이
되는 내용이 들어간다는 것이다
예를 들어 애플 읽기모드로 들어가면 article 안에 있는 내용만 읽어들여 읽기에
집중하게 해준다.

이와 비슷하게 section이라는 태그가 있는데 이는 영역을 구분할 때 쓰면 좋다. 예를
들어 목차 영역 만드는 곳에 써서 접근성(스크린 모드) 사용 시 본문에만 집중하게
안내해줄 수 있다.
비슷한 것들로
aside, nav, header, footer 등이 있다
이를 semantic(의미론적인) 태그라고 한다

## static site generator
React 등으로 개발 후 html 정적 페이지로 만들어서 가볍게 서버를 돌릴 수 있도록
해준다.
- gatsby
  - I'm choice this
  - it is graphql friendly
- jekyll
- nextjs

#### speed
- server side rendering
- client side rendering
- seo
- speed with first access or second access
- client side is good to second access(moving page to page)
- server side is good to first access(find webpage, and access webpage)

#### SSR CSR
둘 다 html로 만들어놓을 수는 있다.
서버에서 만들어진 html을 전달하고 javascript를 나중에 불러온다
SSR은 매 호출마다 새로 요청하고, CSR은 한번 로딩하면 다시 호출 안한다.
- 요청이 생기면 데이터는 다시 호출할 수도 있다.

구글에서 검색 후 빠르게 페이지 확인하고 다른 블로그로 넘어갈 때 CSR 페이지는
느리다.

커뮤니티 사이트에 CSR을 적용하면 페이지당 이동속도가 빠를까? 글쎄 아닐 것 같다.
- 새로운 글이 계속 생겨 서버에서 계속 데이터를 받아와야 한다.
- 클라이언트에서 모두 로딩해야 하는데, 그러면 처음 속도가 미친듯이 느릴 것이다.

useEffect는 브라우저에서 로딩해서 동작할텐데

nextjs는 처음엔 SSR, 로딩 후에는 CSR로 동작해서 두 장점을 모두 가져온다.
