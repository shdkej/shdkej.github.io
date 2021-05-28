---
title   : Network
summary : 📡 Protocol(TCP, HTTP), IP, DNS, L/B
date    : 2020-03-16 22:40:07 +0100
updated : 2020-11-11 10:24:49 +0100
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

#### REST API
- Use HTTP GET, POST, PUT, DELETE
- Use Response code to indicate status(200, 400, etc)

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

## CDN

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

## Information Theory

#### Reference
- http://www.tcpipguide.com/free/t_HTTPOverviewHistoryVersionsandStandards-2.htm
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages
