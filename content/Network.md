---
title   : Network
summary : 📡 Protocol(TCP, HTTP), IP, DNS, L/B
date    : 2020-03-16 22:40:07 +0100
updated : 2021-09-16 20:52:54 +0900
tags    : strong_base
---

## internet
1990 World Wide Web

#### WWW
- data networks
- hypertext = text displayed on a electronic devices (with hyperlinks)
- X windows system? = X11
- https://home.cern/science/computing/birth-web/short-history-web

## TCP, UDP
- TCP - 4계층, IP - 3계층
- TCP: get Data, send serialize and check destination
- IP: Make Data(packet)

#### 왜 1byte는 8bit 일까
처음에는 1byte를 6,7,8 정해진 것 없이 각 업체마다 다르게 사용했다
ASCII가 128개의 문자를 표현할 수 있어서 이게 기준이 된 것이라는 설이 유력하다 (2^7=128)

#### TCP network
대역폭은 BDP(Bandwidth Delay Product)라는 것과 관계있는데
BDP = 대역폭 * RTT(round-trip time)
RTT는 이동 시간 정도로 생각하면 될 것 같다
100Mbps 대역폭의 지연시간 2초인 곳에서 BDP는 25MB((100bit / 8)byte * 2)이고, 이것이 네트워크 경로에
전달중인 데이터의 양이다.

즉 대역폭 = BDP / RTT 가 된다

근데 인터넷 망에서 BDP는 충분히 크다고 한다
BDP가 크다는게 무슨 뜻인지 잘 이해가 안된다

#### tcp 혼잡제어
송수신용 윈도우 크기(데이터 전달 크기) 정보는 tcp 헤더에 실려간다.
하지만 네트워크 크기가 윈도우 크기보다 적을 경우를 대비해서 손실을
최소화 하고자 혼잡제어를 하게 된다

느린 시작과 혼잡 회피라는 과정을 거친다.
느린 시작은 임계점이 설정되있고, 이 지점까지 혼잡 윈도우의 크기를
2배씩 늘리면서 네트워크 대역을 확인하는 동작이고,
혼잡 회피는 느린 시작에서 대역을 확인 못할 경우도 있기에 윈도우 크기를 1씩
늘려가며 진행하는 동작이다.

## Browser - Server
- URI - DNS - IP - TCP - HTTP - RESPONSE

#### client - server in web
1. 주소 입력
2. 주소값 DNS 검색
3. DNS에서 IP 확인
4. IP 주소로 TCP 연결 (HTTP/2까지)
5. HTTPS 암호화 (TLS/SSL)
6. HTTPS 패킷 전송
7. 서버 패킷 획득
8. HTTPS 암호화 해독
9. 서버 응답
10. HTTPS 암호화
11. 클라이언트에 전송
12. 브라우저에서 암호화 해제
13. 페이지 로딩
14. TCP 연결 해제

## WWW
- Tim Berners-Lee, his team wanted to share document to other physicist in internet
- include URIs, HTTP, HTML

## HTTP
- HTTP/0.9 Only has GET, only accept hypertext content
- HTTP/1
  - HTTP 1.0 GET, HEAD, POST,
  - Header ideas from MIME(email)
  - session handled only one client request. So other requests wait.
- HTTP/1.1
  - HTTP 1.1 OPTIONS, GET, HEAD, POST, PUT, DELETE
  - first version 1997. revised 1999.
  - Add Authentication
  - allows client send a single TCP session.
  - can ask part of resource.
- HTTP/2
  - create encrypt key
  - Multiplexed Streams
  - Stream Prioritization
  - Server Push
  - Header Compression
- HTTP/3

#### keep alive
http/1 은 기본으로 지속 커넥션이 설정되어 있다
Connection: close 를 명시해줘서 빨리 소켓이 닫히는지 확인해보자

keep-alive는 1.1에서 빠졌다고 한다.
대신 지속 커넥션이 고안되었다고 한다

커넥션을 유지하기 위해서는 content length가 설정되있거나 청크 전송 인코딩으로 되있어야 한다

#### HTTP/1.1 REQUEST
- Request Line
  - GET /index.html HTTP/1.1
- Header
  - General : Date, Connection(open/close/keep-alive), Upgrade-Insecure-Request
  - Request : Host, From, Accept(text/html), User-Agent(Mozilla/4.0)
  - Entity : Content-Type(application/json), Content-Length
- Message Body

#### HTTP/1.1 RESPONSE
- Status
  - HTTP/1.1 200 OK
- Header
  - General : Date, Connection(open/close), Keep-Alive
  - Response : Server(Apache/1.3), Accept_ranges(bytes)
  - Entity : Content-Type, Content-Length, Last-Modified
- Message Body
  - generally HTML document

#### HTTP/2 Frames
- Header divide and composed to frame
- Frame has header, body.
- header type divide by request. etc) Type=HEADERS, Type=DATA

데이터 프레임이라는 틀 안에서 데이터가 이동하고
이를 스트림으로 통신하도록 되어있고
기존에는 안되던 서버에서 푸시하는 것도 가능해졌다
바이너리로 전송된다고 한다

HTTP/2 != HTTPS. but HTTP/2 include HTTPS

#### REST API
- Use HTTP GET, POST, PUT, DELETE
- Use Response code to indicate status(200, 400, etc)

HTTP에서 GET 뿐만 아니라 PUT, DELETE도 멱등하기를 기대한다

그런데 서버에서 DELETE 처리를 할 때 내부에서 뭔가 계산 작업을 하게 되면 같은 값을 받아도 계산처리가 된 후에 동작해버릴 수 있다
멱등하게 동작하도록 신경써야겠다

x 를 누르면 DELETE /comment/1 로 되어야지
DELETE /comment/(현재 문서의 첫번째) 가 되면 안된다

## 프록시 서버

사용자 필터링

HTTP의 TRACE 메서드는 프록시에서 웹서버로 전송 시 일어나는 변화를 추적하는데 사용하기 좋다

#### 웹서버에서 처리할 것
내부 로직

#### 로드밸런서에서 처리할 것
SSL 적용
배포 후 접속량 조절
큐로 접속자 리스트 관리
정적 호스팅
캐싱
정적 데이터, 응답 압축
접속자 로그
트래픽 제어

접속 대기자 관리

## 네트워크 과부하
nic 이중화

라우터의 한계
30만 패킷/초
패킷이 300바이트라면 1Gbps

500호스트
1서브넷 arp테이블
브로드캐스팅 패킷 트래픽이 증가. cpu 소비. 패킷 손실


## API
- WebSocket
- HTTP
- JSON?

#### gRPC
- unary
- server side stream
- client side stream
- bidirectional stream

#### graphql
- server-side cache?

## Network Machine
- L1: 장비간 근거리 묶어주는 [전송로]
 - Ethernet Cable
 - 이더넷 방식 구조중 CSMA/CD 가 좋더라
 - MAC - 48bit 8:8:8 8:8:8
- L2: 1-3계층을 연결해주는 (Repeater, Switch)
- L3: 최적의 경로를 선택한다 (Router)
- L4: 세분화해서 트래픽 관리 L3와 비슷하지만 데이터 전송을 보장한다. (L/B)
- L5 - 논리적인 연결 서비스

## Load Balance
#### L4 L7
L4는 포트 기반 (aws에서는 NLB)
L7은 포트 + 페이로드 기반, 즉 기능이 더 많은 기기 (aws에서 ALB)

#### LB
내부 서비스는 로드밸런스 포트만 열어두고 로드밸런서에서 필터링?
그래도 똑같나;
로드밸런서에서 커트하는 옵션을 넣어야 하네;

로드밸런서에는 리스너, 타겟 그룹이라는게 항상 따라온다

분명 ELB가 있고, NLB, ALB는 나중에 나온 것 같은데, 그런 얘기가 안나온다

ELB라 불리우는 Classic Load Balancer는 l4/L7을 같이 지원하는데 현재 ALB보다는
기능이 적은 끔찍한 혼종이고,
NLB가 17/09/07에 나왔다.

## CDN (Content Delivery Network)
네트워크를 여러 군데 둬서 접근을 빨리하는게 핵심인 것 같다.
- 해외 접근 시 빠르게 하는 역할
- 이미지처럼 큰 파일을 서버와 분리해서 호출하여 트래픽 및 스토리지 절약
    - 근데 캐시 된 이미지가 본 서버의 이미지보다 빠르나? 똑같은 속도 아닌가?
    - CPU 캐시를 생각하면 캐시가 빠른게 당연한데, 그건 CPU 캐시 자체가
      디스크보다 빠르기 때문인데, 네트워크가 가까운 서버에서 가져와서 그런가?
      - 맞다. 네트워크 트래픽을 절약해서 속도를 빠르게 하겠다는 것이다.
- 디바이스를 인식해서 캐시된 이미지 중 하나만 선택해서 보낸다?
  - 온디맨드 이미지 리사이징
  - CDN의 기본 기능이라기보다는 내부 로직으로 계산해서 제공하는 방식
  - S3에 있는 이미지를 Lambda로 계산해서 선택해주는 방식
  - [개발 사례](https://blogs.akamai.com/kr/2018/12/qa-cdn-cdn.html)
  - [개발 사례2](https://engineering.vcnc.co.kr/2016/05/ondemand-image-resizing/)
  - [원리 및 예제](https://roka88.dev/102)
- nginx를 이용해 CDN을 구현할 수 있나보다.
- DNS를 CDN을 먼저 도착하도록 설정해서, CDN에서 본 서버로 트래픽을 전달할지,
  자신이 처리할지 선택할 수 있다.
- CDN을 거쳐서 본 서버에 들어오게 함으로써 필터링도 할 수 있다
  - 메인 서버에 접근 못하게 하거나, DDoS 를 흡수하거나
  - https://blogs.akamai.com/kr/2018/12/qa-cdn-cdn.html
  - 이건 근데 로드밸런서와 비슷한 역할이 될 수 있다. 로드밸런서의 역할을 대신함
- 본 서버를 파싱해 저장된 데이터를 부름으로써 본 서버의 부하를 줄이려는 것 같다
  - 부하도 줄고, 트래픽도 줄고
- 결국 서버를 여러 대 둬서 분산하는데 역할을 부여한 서버로, 스케일아웃과 조금
  다른, 하지만 서버의 증설이 필요한 것인 것 같다.

## ETC
CSMA/CD
세션계층이 뭐하는 계층이지
캡슐레이션 디캡슐레이션
프로토콜은 상대방의 주소를 알아야한다
DNS - 53포트 1024 이상이면 TCP , 이하면 UDP 로 나간다 ?
이더넷 프레임 구조 (전송되는 내용물의 구조)
브로드캐스트 도메인
콜리션 도메인
ICMP
VLAN
서브넷팅 : 네트워크영역을 나눠준다
VLSM : 호스트 영역의 갯수를 나누는 기술 --- 서브넷 하고 더 나누는 기술
슈퍼넷팅
회사의 맨 바깥 라우터에는 ISP 에 디폴트 연결이 되도록 해줘야 된다.
인터넷 연결쪽에 해줘야 인터넷 연결이 되기 때문에
루핑 - 스패닝트리프로토콜
Vlan
Vlan 이 왜 필요하지? 라우터로 안되나?
Vlan의 우선순위 설정시 여러대면?

시리얼은 오른쪽에서 왼쪽으로, 아래에서 위의 순서로 번호를 매긴다.
루프백 했을 때 신호 안오면 내 랜카드 불량이다

## Information Theory

#### 네트워크 대역폭 확인
- 내가 가입한 인터넷 속도
- 랜카드 스펙

#### Reference
- http://www.tcpipguide.com/free/t_HTTPOverviewHistoryVersionsandStandards-2.htm
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages
