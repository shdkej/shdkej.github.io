---
title   : WEB
summary :
date    : 2021-03-22 21:41:28 +0100
updated : 2021-12-04 13:39:01 +0900
tags    : deep_knowledge
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
- 웹에서 센서를 추가해서 감지한다
[[Design]]


[침하하로 옮기면 침착맨님 글썼는지 상시 체크해야되겠네요..? : 네이버 카페]([https://m.cafe.naver.com/ca-fe/web/cafes/29646865/articles/243917?fromList=true#:~:text=%EB%B0%A9%EC%9E%A5%EB%8B%98%EC%9D%B4%20%EA%B8%80%EC%93%B8%EB%95%8C%EB%A7%88%EB%8B%A4%20%ED%95%B8%EB%93%9C%ED%8F%B0%EC%97%90%20%ED%91%B8%EC%8B%9C%EC%95%8C%EB%A6%BC](https://m.cafe.naver.com/ca-fe/web/cafes/29646865/articles/243917?fromList=true#:~:text=%EB%B0%A9%EC%9E%A5%EB%8B%98%EC%9D%B4%20%EA%B8%80%EC%93%B8%EB%95%8C%EB%A7%88%EB%8B%A4%20%ED%95%B8%EB%93%9C%ED%8F%B0%EC%97%90%20%ED%91%B8%EC%8B%9C%EC%95%8C%EB%A6%BC))
- "방장님이 글쓸때마다 핸드폰에 푸시알림"


#### 웹페이지에서 있으면 좋은 편의성 UI  
- 위 아래, 댓글로 가는 네비게이션  
- 사이드 바

#### 데스크탑, 모바일 일관된 UI vs 한 환경에 집중
- 보여주는 컨텐츠 개수를 많이해서 일관되게 (유튜브)
- 모바일에 특화 (무신사)

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

#### nodejs
싱글 스레드로 동작하는 방식이라 PM2라는 라이브러리를 이용해 멀티 코어를 쓰도록
할 수 있다.

싱글 스레드로 비동기 동작을 한다. 말이 안되는 것 같지만 이벤트 루프 등의
알고리즘을 이용해서 효율적인 성능을 보이고 있다.

#### 노드 비동기 원리 확인
- 싱글 스레드
- 이벤트루프
- 프로세스 큐
- 브라우저 API

비동기는 이벤트루프가 큐에다가 넣어서 실행하도록 한다.
- [ ] 그래서 큐 안에서 순차적으로 실행? ㅇㅇ
- 게다가 큐는 스택이 모두 비워진 후에 스택에 넣어서 실행된다고 한다.
- 스택이 비어있어야 큐에 있던 게 실행된다면 비동기가 어떻게 효율적으로 동작될 수 있지?

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

#### SSR, CSR
SSR의 장점이 SEO인 이유는?
서버에서 렌더링 된 값을 크롤러가 읽을 수 있기 때문에?
그러면 csr은 어떻게 크롤러가 데이터를 가져갈 수 있게 하지?
react에서 ssr 설정하는 방법은? 어렵다는데? ssr 설정하면 검색이 잘되나? 왜?

크롤러 개발할 때 생각해보면 자바스크립트를 따로 읽지 않고 그려져있는 html 태그를 읽는게 기본이다. 그래서 페이지에 진입해서 자바스크립트가 안돌아가면 그 내용을 읽을 수 없다. 그래서 CSR이 SEO에 안좋다는 이야기가 있었던 것 같다.

gatsby, nextjs는 ssr, csr을 모두 지원하는데, ssr을 적용하는건 어떤 과정이지?
gatsby는 ssg, nextjs는 ssr을 메인으로 개발되었다.

#### csr 사이트 단점
뒤로가기 인식 잘 못한다.
- github, disquiet

#### 웹 성능
컨텐츠 타입에 따른 속도 차이가 있나? 가장 빠른 것은?
base64로 하면 더 빨라지려나?

#### 웹 개발자로서
browserstack 처럼 브라우저 대응에 관심가져야겠다
리액트의 아쉬운부분을 개선하고싶다
go로 웹
브라우저 디펜던시가 낮은 것으로 구성하고 싶다


## 앱의 장점을 웹에서 표현하기

#### 왜 앱에서만 되는 이벤트를 해서 앱 설치를 유도하는걸까?
앱에 기능을 많이 준비해놨으니까?
사용자가 앱에서 돈을 많이 써서?
앱에 있으면 사용시간이 늘어난다는 통계데이터가 있나?
- https://brunch.co.kr/@growthlead/6

+사용자 행동을 바탕으로 알림 발송 가능
+젊은 사용자의 경우 앱에 접근하여 소비하는 것이 활성화되어있고 소비도 많음

앱 유도 -> 웹에서 클릭하면 앱으로 연결해주는 서비스들이 있다.

#### 노년의 웹사이트 접근을 쉽게 하는 방법은?  
회원가입하고 비밀번호 찾는게 귀찮아서 하기 힘들어 한다  
공인인증서는 거의 못한다고 봐야 되나  
웹사이트 여기 저기를 왔다갔다 하는 부분이 힘들 것 같다. (은행사이트 갔다가 다시 돌아와서 쓰는거)  
원하는 페이지로 접근을 하기 어려울 것 같다  
예전의 시스템에서는 원하는 것을 얻기 위해 어떻게 했나  
그렇다고 음성인식을 넣는다고 그걸 잘 이용할지 의문이다. 인터렉션을 못 느낄 것 같은데

dagger 는 로컬에서 테스트하고 사용할 수 있다?


#### 웹에서 안좋은 경험
로그인을 하고 뒤로가기하면 나타날 화면은?
- 로그인 되었습니다라고 알림 띄워줘서 다시 뒤로가기 하지 않도록 넛지하기?

뒤로가기 했을 때 팝업 이전 화면으로 가는 것
팝업은 x를 눌러야 하게 되어있는 것
팝업인지 페이지 이동인지 사용자가 알 수 없을 수 있다

#### reference
유튜브 댓글 버튼 이펙트 잘 만든듯 - 다크모드에서 마우스 갖다 댔을 때 느낌이 좋음

## Cloud
#### Route53
DNS
- Domain Name System
- 호스트 이름을 IP로 번역해주는 것 (google.com => 172.217.18.36)
- Domain Registrar - Route53, GoDaddy
- DNS Records - A(ipv4), AAAA(ipv6), CNAME(다른 호스트네임), NS(DNS 주소)
- Zone File
- Name Server - 
- Top Level Domain : .com, .us, .in
- Second Level Domain - amazon.com, google.com, ...
- Sub Domain - www
- 웹브라우저 -> 웹서버 -> 로컬 DNS -> .com DNS -> example.com DNS 
개요
- 퍼블릭 호스팅 존, 프라이빗 호스팅 존 설정 가능
- 프라이빗 호스팅 존도 퍼블릭 처럼 같은 가격
TTL
CNAME vs Alias
- CNAME은 다른 서브도메인을 매핑 가능
- Alias는 aws 의 주소를 매핑 가능 (EC2의 DNS name에는 매핑 안됨)
라우팅 정책
- 심플
- 가중치
- 지연 시간 기반 (route53에서 미리 측정한 값?)

#### CloudFront
개요
- CDN
- 엣지에 콘텐츠가 캐시된다
- aws의 216개의 엣지로케이션 모두를 사용한다
- DDoS를 막아준다
- Origins (연결 가능한 리소스)
	- S3 bucket
	- Custom Origin (HTTP)
- 프라이빗 VPC에 접속할 수 없음 (ALB를 통해 우회 가능)
캐싱 및 캐싱 정책
- header
- query string
- cookies
- none, whitelist, include all-except, all
캐시 무효화
- 백엔드가 변경되도 cloudfront는 알 수 없음
- TTL이 끝나야 백엔드를 다시 치기 때문
- 그래서 캐시 무효화가 필요함
- 근데 무효화를 언제 실행할 것인가 -> 백엔드가 배포되면 수동으로?
오리진으로서의 ALB
- 프라이빗 VPC에는 Edge Location이 접근할 수 없고 Edge Location의 보안그룹도 열어줘야 함
- 그래서 ALB를 이용해서 EC2는 프라이빗으로 두고 ALB를 연결하게 할 수 있다
지리적 제한
- 접속 허용 국가, 제한 국가 설정 가능
Signed URL/쿠키
고급개념
- 가격
	- price class all 모든 리전을 사용하고 가장 퍼포먼스가 좋지만 비싸다
	- price class 200 200개만 쓰는데 조금 싸다
	- price class 100 100개만 쓰는데 조금 싸다
- 멀티 오리진
- field level encryption
Real Time Logs
- kinesis datastream을 통해 실시간 로깅을 할 수 있음
- api 요청에 대해 몇%만 로그를 남길지 설정할 수 있음