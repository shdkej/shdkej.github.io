---
title   : 10만 유저 동시 접속 가능하게 하기
summary : Golang, Kubernetes를 이용해 10만 유저 접속 서버 만들기
date    : 2021-03-09 13:25:01 +0100
updated : 2021-06-03 11:17:38 +0900
tags    :
parent  : [[Blogging]]
---

## 한 대의 PC로 10만 접속자 유지가 가능한가 (에코 서버의 경우)
안된다면 최소 몇대의 PC가 필요한가 (사양)

#### 왜 10만인가
토트넘 경기 SPOTV 유튜브 동시접속자 수를 봤을 때 10만명대였다. 물론 훨씬 많아질
수 있지만 해외 축구 경기 시청자가 이 정도는 된다.


## 소켓, 포트, 커넥션이라는 용어가 헷갈린다
커넥션 마다 소켓을 65535개를 만들 수 있다고 한다
- https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.hala001/maxsoc.htm

커넥션은 뭐고 소켓은 뭔가? 포트 - 커넥션 - 소켓?
- 포트는 65535 까지 열린다
    - 왜 포트는 65535가 최대인가?
      - tcp connection spec에서 source 쪽에 16bit, dest쪽에 16bit가 규격으로 정해져있다
      - https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_segment_structure

포트 안에 커넥션이 65535가 다시 되는건가?
- 커넥션은 발신지 IP:PORT와 수신지 IP:PORT를 가진 것을 말한다.
  - 소켓이 이것이라고 하는 사람도 있다. 그러면 소켓과 커넥션이 같은 것인가?
  - https://serverfault.com/questions/639027/increase-nginx-active-connection-more-than-65535
  - 구체적으로 들어가니까 커넥션이 16bit 규격이라는 출처가 없어서 헷갈려졌다
- 즉, 수신지가 한 곳(포트)이라면, 포트 수 제한에 따라 클라이언트 한 대에서 커넥션은 65535개가 한계다.

클라이언트를 따로 둔다면 서버에서는 한 포트에 65535 이상의 소켓을 만들 수 있나?
ulimit 할 때 100,000으로 해도 100,000개의 접속이 안된다는 이야기인가
- ulimit은 프로세스 자원 한도
- 이게 소켓도 포함한다는 이야기도 있다
- 리눅스 등 유닉스에서 소켓이 파일과 같은 취급을 받는다고 한다

~~아니면 소켓 하나에 커넥션을 65535를 만들 수 있다는 것인가?~~
- 10만 유저를 원하는 것이니 10만 TCP 소켓을 받아들이는 것이 되므로, 여기서 소켓=포트=커넥션이 된다.
- 소켓 하나에 여러 유저를 담는다는 것이 가능한가?

즉, 소켓은 포트를 할당 받고, 커넥션은 포트마다 식별되기 때문에
모두 다른 의미이지만, 일반적으로 소켓, 포트, 커넥션의 상한은 모두 같은 것 같다.
- 서버측에서는 클라이언트 포트와 상관없이 소켓만 열어주기에 포트와 소켓의 상한이
  달라진다. 클라이언트와 다르게 서버는 65535 커넥션 이상을 받을 수 있다

TCP 소켓 하나당 HTTP 연결 하나만 하나?
- HTTP/1 에서는 그랬으나 HTTP/2에서는 하나의 TCP에 여러 HTTP가 가능하다고 한다
- 하지만 10만의 각 유저를 받아들인다는 것은 별개의 소켓을 연다는 의미다.
  - 일단 웹소켓은 고려하지 말고 TCP 소켓으로 가능한지 확인
  - 그러면 10만 소켓을 열고 유지하는게 가능하다면 그것만 먼저 테스트해봐야겠다

open - bind - listen - close
- 소켓은 수신자, 송신자가 각각 열고(open), 수신자는 포트를 바인딩(bind) 하고,
접속을 받는다(listen).
- 송신자는 연 소켓을 이용해서 접속을 한다.

하나의 포트로 여러 소켓을 열 수 있다
- 프로세스가 통신을 위해 포트를 할당 받는데 이 포트로 여러 소켓을 연다
- 송신쪽은 하나의 포트에 하나의 소켓을 할당해서 접속하지만 수신쪽은 하나의
  포트에 여러 소켓을 열어서 접속을 받는다.

수신 쪽 뿐 아니라 송신 쪽도 당연히 소켓을 열어야 한다
그러면 내가 테스트할 때는 1/2 만 테스트 할 수 있는 것인가?
- 연결 시 송신 포트가 열리는게 맞다
- 근데 서버에서는 포트 하나로 받고, 소켓을 여러개 연다.
- 내부에서 성능 테스트 할 시 vm을 이용해서 추가 접속자를 만들어야 한다.

서버에서 접속자를 받아들이기 위해 소켓을 열고
TCP를 통해 포트 간 연결로가 만들어지고
사용자는 포트를 지나 소켓 하나에 접속하게 된다

포트 하나를 유지하는데 메모리 필요량은?
- sysctl net.ipv4.tcp_mem 에서는 92724 123633  185448로 되있다
    - tcp_wmem, tcp_rmem은 tcp_mem과 어떤 연관이 있나
    - wmem + rmem = mem 인가, 아니면 최대치를 제한하는건가
    - wmem,rmem은 개별 소켓값, mem은 전체 소켓 사이즈에 대한 값이라고 한다
    - mem은 byte 단위가 아니라 페이지 단위다. (1 page = 4KB)
- buffer size가 소켓의 사이즈

> https://meetup.toast.com/posts/53
- 속도를 늘리기 위해 window scaling을 활성화 시켜서 받을 수 있는 크기를 키우고,
  소켓의 버퍼 사이즈도 늘린다고 한다.(한번에 많은 데이터를 처리 가능하므로)
- net.core, net.ipv4.tcp 에서 메모리 사이즈가 별도로 있다
- net.core는 커널 자체 소켓의 버퍼 크기, tcp는 tcp 소켓의 버퍼 크기
- rmem은 읽기용, wmem은 쓰기용 버퍼
- 내 경우에는 테스트를 원활하게 하려고 사이즈를 최대한 줄이지만, 실제 사용시에는
  속도를 위해 넉넉하게 잡아야겠다

tcp_rmem값 설정 시 2048 4096 185448 이런 식으로 되있는데
평소엔 가운데 값을 사용하다가
tcp_mem값의 중간 값에 해당되는 값보다 높아지면 min값을 쓰게 된다


내 메모리가 4기가 남았고, 네트워크 대역폭이 300Mbps라면
4kB의 소켓으로 4kB의 데이터를 보내는 것은 (300*10^6) / (4000*8) = 9375 만큼 동시에 할 수 있다
- 이 숫자를 보니 i/o timeout, connect reset, host unreachable이 된 것이 네트워크
  문제였겠다 싶다.

랜카드 성능이랑 네트워크 대역폭을 어떻게 확인하지?
- RTL8723BE 라는 랜카드 사용 중이고, 300Mbps 까지 동시에 처리 가능한 것 같다
- 인터넷 대역폭은 100Mbps 인가
    - `iperf`로 확인 가능
    - 로컬 - 로컬 29.1Gb. TCP window size 서버 128KB, 클라이언트 2.5MB
    - 로컬 - vagrant 405Mb
    - vagrant - vagrant 1.67Gb
    - 초당 128KB를 405Mb는 (405 * 10^6) / (128*8*10^3) = 395
    - https://dejavuqa.tistory.com/306
- 3276 byte 미만


#### TCP의 성능?
- TCP 소켓 연결까지 걸리는 시간 (접속자가 많아지면 응답이 느려지나?)
- TCP는 연결된 시간에 따라 최대 속도를 늘려나간다. 처음에는 제한되있다가
  확인응답을 받으면 제한 속도를 점점 풀어준다.
  급작스러운 부하와 혼잡을 방지하기 위해서고, 신뢰성을 그만큼 신경쓴다는 얘기다.
- 확인응답은 연결의 신뢰성을 위해 있는데, 보낼 데이터에 실어서 같이 보냄으로써
  효율적으로 보내려고 하지만, 이 때문에 보낼 데이터를 찾는 지연시간이
  정해져있다.

웹 연결 시 TCP 소켓을 열어 HTTP 데이터를 교환하는데 TCP 소켓은 교환 중에
계속 열려 있나, 보낼 때 따로 받을 때 따로 여는가?
- 아니다. 연결 한 상태로 주고 받는다.
- 그렇다면 웹사이트에 접속되있는 시간이 오래 되면 커넥션은 계속 유지된 상태인가?
  아니면 각 요청마다 새로 연결하는가?
    - 타임아웃도 설정되어있고, 유지하려면 유지할 수도 있다.
    - 기본 설정은 유지 상태로 있지만 오래 사용 안하면 닫힌다.
- 일반적인 블로그라면 페이지를 요청할 때만 접속하고 해제할 것 같고, 모니터링
  웹사이트처럼 화면을 업데이트 해줘야 하는 사이트라면 서버에서 pull을 하던지
  해서 접속을 유지할 것일 것 같다.
  pulling 하는 것은 계속 접속 된 상태를 유지하기 위해서인가? 아니면 접속을
  새로 하기 위해서인가?  커넥션을 유지하는게 속도에서 효율적일 것 같은데
- keep-alive는 어떻게 동작?
    - keep-alive는 1.1에서는 지속 커넥션으로 구현되었고,

#### 정리
포트는 65535의 제한이 있다
소켓은 한 포트에 여러 소켓이 가능하다
커넥션은 수신IP:수신PORT+송신IP:송신PORT의 구조를 가져서 포트 수에 제한된다
소켓은 제한이 없다
- 커넥션당 소켓이 65535가 최대라고 하는 IBM 페이지는 무슨 뜻이지

한 서버에서 받을 수 있는 연결은 서버에서 한 포트로, 클라이언트는 여러 곳에서
온다면 제한이 없다
- [ ] 근데 소켓은 포트에 할당되어야 한다. 어떻게 소켓이 한 포트에 할당되고
      동시에 통신이 가능한거지?
    - 비동기로 동작하는 것인가!?

대신 서버의 CPU, MEMORY, 네트워크 대역폭에 제한된다
하나의 소켓의 크기 = 3KB?
- https://migratorydata.com/2013/06/20/12-million-concurrent-connections-with-migratorydata-websocket-server/
그러면 메모리에는 소켓의 크기만큼, 네트워크에는 데이터량만큼 차지한다?

단순 접속만으로도 CPU를 많이 먹는다
실제 사용 시에는 최대 5만 접속자를 받고 (네트워크 안정)
CPU를 적절하게 쓰는 정도로만 접속자를 받고 서버 대수를 늘려야겠다.


## 100,000 user load test
- 목표 : 동시에 십만 유저가 접속하는 상황에서 반응 속도 및 정상 동작 확인
- 조건 : 동시에 십만 커넥트가 유지되어야 한다
- PC   : i5, 4 core, 2.4Ghz (i5-3440u) cpu, 8GB ram, 우분투

상황
- 에코를 잘 반환하는지 테스트
- 비디오 10초 정도를 잘 재생 후 정상 리턴하는지 테스트

방법:
- docker에서 띄웠을 때 고 웹서버가 얼마나 버티는지 확인
- kubernetes에서 띄웠을 때 확인

Client 테스트 코드
```go
const LIMIT = 10000

func main() {
    ch := make(chan int, LIMIT)
    connect()
    <-ch
    log.Println("Done")
}

func connect() {
    for i; i<LIMIT; i++ {
        go load()
        ch <- i
    }(i)
}

func load() {
    res, err := http.Get("http://localhost:8080")
    if err != nil {
        log.Println(err)
    }
    defer res.Body.Close()
    body, err := ioutil.ReadAll(res.Body)
    return string(body)
}
```

Server 테스트 코드
```go
func main() {
    http.HandleFunc("/", Handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func Handler(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    io.WriteString(w, `2`)
}
```

- 자세한 테스트 코드는 > https://github.com/shdkej/stress-test


#### 상황1. 에코를 잘 반환하는지 테스트
에코테스트에서 비동기로 소켓열어서 접속하는 것이 정확한 값도 반환 안하고, 시간도
들쑥날쑥한다. 그 이유는?

서버에서 소켓을 여는 시간이 오래 걸리나?
서버를 여러 개 만들어서 접속해봐야겠다

~~waitgroup 없이 해도 되지 않나?
여러 서버를 띄워놓고 접속할 때 wg에 막히면 동시 접속이 안되잖아?
wg을 접속한 후에 막아놓으면 되겠다~~

go http 서버 기본 스펙 체크해봐야겠다
동시 접속 허용 기준이 있는지, 사양이 있는지

docker 안과 밖의 응답이 다를까?
- 딱히 다르지 않다

! too many open files
- socket이 부족한 것. ulimit -n 10000 해주면 된다
! device or resource busy
! i/o timeout
! cannot assign requested address
- nginx로 로컬에서 5만 접근 시 발생

! connection reset by peer
- 서버에서 입력을 받는 커넥션을 shutdown해서 끊었다는 뜻이다
  끊겨서 닫히려고 하는 커넥션에 다시 데이터를 보내서 생긴다.
- TIME_WAIT 상태의 소켓이 남아있어도 문제가 되는지 확인해봐야겠다
    - time_wait의 max값을 줄여서 소켓이 적게 남게 해봤는데 변화없음
    - time_wait를 reuse할 수 있게 했지만 변화없음

! network is unreachable

유저 수 별 진행 상황
- 5천 접속까지 cpu도 풀로 사용 안하고 끝났다. 단순 echo 서버일 경우
- 1만 접속까지는 무난하게 받아들인다. ulimit 만 넉넉하게 풀어줬다
- 15,000 부터는 접속이 씹힌다
  - 여기서 추가 접속자를 허용하려면 어떻게 하면 될까. 2만 접속자는 되게 하고 싶다
- 5000씩 4번 접속하는 것이랑 한번에 2만 접속을 여는 것이랑 비교
  - 5천씩 하니까 2만 접속 확인은 됐다
  - 2만 접속은 된다.
  - 2만 접속 시에 소켓 수에 걸려서 TIME_WAIT를 기다린다고 씹히는 것 같다.
  - 근데 그러면 3만에서도 똑같이 동작해야 되는 것 아닌가?
    - TIME_WAIT는 같은 커넥션이 왔을 때 섞이는 것을 방지하기 위해 일정 시간 유지
      된다.
- `watch -n1 "wc -l /proc/net/tcp"` 열려있는 tcp 소켓 수 모니터링
  - 이것보다 `watch ss -s` 가 더 확실하게 보여준다
- `watch -n1 "netstat -an | grep 8080 | grep TIME_WAIT | awk '{print \$5'} | sort | uniq -c | sort -k 1,1r"`
- 3만에서 connection reset 에러가 발생했다
  - 65535가 맥시멈 소켓이라 안되는 것 같다
  - file descripter를 늘려보자 -> file descripter 늘리는게 ulimit
  - virtual machine을 이용해서 클라이언트 포트를 늘려서 테스트해보자
  - virtual machine으로 띄워서 3만씩 접속 시키면 포트 유지 되는지 확인
    - vagrant 에서는 1만 접속도 삐걱거린다. 네트워크에 한단계가 더 생겨서 그런가
    - nework is unreachable 발생
    - client 에서는 소켓을 모두 열었는데 접근을 못한다
  - nginx는 3만 처리를 한다
    - /etc/nginx/nginx.conf 의 worker_connections 를 10만으로 올린다
    - 4만 처리도 했다. 5만에서 i/o timeout 에러 발생
    - 3만 쯤 처리하려니 cpu를 풀로 사용해서 노트북에 부하를 많이 주는 것 같다
    - localhost로 하면 4만을 처리했고, 외부아이피로 하면 금방 에러를 뱉는다
    - 엥? 근데 로컬에서만 테스트하면 3만이 최대여야하는데?
- **tcp 옵션을 변경**한 후 go server에서도 4만 접속이 됐다
    - 서버측에서는 포트를 안열고 소켓만 여니까 클라이언트 포트만 확보되면 소켓
      수만큼 접근 가능하다. 소켓 수는 file descripter 설정값만큼 늘릴 수 있다
    - 4만 5천에서 i/o timeout 발생. cpu 한계인 것 같은데...


nodejs로 테스트
- TCP port open 자체는 10만까지 되었는데, 실제 접속자가 그만큼 되었는지 알 수가
  없다. 어떻게 확인하지? atomic increment를 해야할까, goroutine의 개수를 보는게
  나을까
- 처음 생각은 서버는 가볍게 놔두고 응답받은 클라이언트를 확인하는 것이었는데,
  클라이언트에서만 확인하니까 동작중에 멈추게 되면 서버가 얼마나 받고 멈췄는지
  확인하고 싶었다.


쿠버네티스로 테스트
- 8개로 레플리카 만들어놓고 테스트
    - 일단 ingress로 접속하니까 골고루 접속된다.
    - 근데 1000 커넥션정도 되고 멈춘걸로 봐서 ulimit을 해줘야겠다
        - open files는 10만으로 적용되어있다. 근데 apr_socket_recv: Connection
          refused 뜨면서 연결 끊긴다.
            - ab 툴에서 connect reset by peer 뜨면 뜨는 에러인 것 같다.
    - pod가 죽지는 않는데 연결은 거부된다.
      ingress에서 차단하나? ingress는 부하를 어떻게 받나, pod에서 확인할 수
      없는데 어떻게 확인하지?
      ingress를 동작시키는게 뭐지?
        - traefik이 loadbalancer로 쓰이는 것 같다. (k3s)
        - ingress는 ingress controller로 동작하는데, k3s에서는 traefik이 하는 것
          같다.
    - traefik deployment를 3개로 확장하니까 확실히 트래픽을 더 잘 받는다. 근데
      메모리 사용량이 목적지보다 더 많이 먹는다
- [ ] hpa로 4개만 만들어 놓고 확장되는지 테스트
- **진행중**


#### 상황2. 10초 간 켜져있는 서버에서 클라이언트 접속 유지 시 테스트

- websocket으로 5만 성공. 에러를 fatal 안시키고 그냥 return 시켜서 된 것처럼
  보이는건지 확인 필요. 사용중인 소켓 50,000 확인
    - 메모리 대략 3기가 정도 사용됨
    - 49000 정도 확인된 거 보니 진짜 모두 동시접속이 되었다
- 51,000 에서 멈춤
- cannot assign requested address 라고 뜨는 것이 소켓이 부족해서 뜨는 것 같다
    - http://docs.likejazz.com/time-wait/
    - 빈 포트가 없고 부하가 많이 걸릴 때 발생할 수 있는 것 같다고 한다
    - reuse를 하면 된다고 하는데 나는 reuse 할 게 아니라 접속자를 늘려야 한다
- 59980을 찍고 더 이상 접속하지 않았다
    - 1024 - 61000, ip range만큼 딱 접속됐다.
    - cannot assign 에러가 났다
    - 보내는 데이터의 크기를 write에서 1로 바꿔서 줄여본다
    - 메모리가 부족하지는 않다
        - 메모리는 원상태 회복하는데 시간이 걸린다

일반 http에서 라즈베리파이랑 7만 커넥트는 됐는데 로컬에서 4만이 다 안되고 io
timeout 에러 남

동시 접속을 위해서는 서버 사양이 받쳐주어야 한다
그리고 소켓 수의 여유를 생각해 보통 5만 정도의 커넥션만 한 서버에서
받아들이는게 안정적이겠다

하지만 1대로 10만이 되는지는 알아보고싶다
이론적으로 10만 접속자는 가능한데, 5만 처리를 하려고 하니 안된다. vagrant에서
쓰는 소켓이 로컬에 영향을 주지는 않을텐데
- virtual box도 서버와 같은 영역에서 소켓을 사용한다.. virtual nic로 할당되는데
  왜 그렇지?

ip range가 한 서버가 받을 수 있는 동시 접속자 리밋이어야 하지 않을까?
아니라면 TCP TIME_WAIT 소켓이 무한정 열릴 수 있다는건데, 그렇지는 않을 것 같다
한 노트북에 서버를 분산해서 더 받을 수는 있겠지만, 한 서버가 받을 수 있는
사용자는 ip range, 즉 65535에 종속적일 것 같다.
connection이 서버IP:PORT+클라이언트IP:PORT라고 해서 클라이언트가 분산되면 무한정
받을 수 있지 않을까 싶었는데 그렇지 않은 것 같다

이건 대체 뭔가...
- [12 milion concurrent](https://migratorydata.com/2013/06/20/12-million-concurrent-connections-with-migratorydata-websocket-server/)
- [a-milion-user](https://www.metabrew.com/article/a-million-user-comet-application-with-mochiweb-part-3)
- http://http-kit.github.io/600k-concurrent-connection-http-kit.html
    - 여기서 ifconfig eth0 up을 해서 한 서버에 여러 IP를 할당하는 방식을 썼다.
- [1m-go-tcp-server](https://github.com/smallnest/1m-go-tcp-server)
- [1m-go-websocket](https://github.com/eranyanay/1m-go-websockets)
- [nodejs-600k](https://blog.jayway.com/2015/04/13/600k-concurrent-websocket-connections-on-aws-using-node-js/)
    - websocket으로 M3.xlarge 머신으로 진행했다.
- [nodejs-custom-library](https://blog.caustik.com/2012/04/08/scaling-node-js-to-100k-concurrent-connections/)
    - 한 대의 머신으로 했는지 뭔지 모르겠다.

로컬에서 아이피를 할당해서 로드밸런서로 나누면 될까.
로드밸런서도 분산해야하겠다.
- `for i in `seq 200 230`; do sudo ifconfig eth0:$i 192.168.1.$i up ; done`
    - 아이피를 나누면 포트를 다르게 여나? - 되네...
- cloud에서 테스트할때는 ip 할당이 안된다. 추가로 ip를 요청해서 받아야 한다.

local port range를 줄였을 때는 최대 동시접속자 수가 변화가 없었는데, 메모리
사이즈를 반으로 줄이니까 6만 5천이었던 것이 8만까지 오픈이 되었다.

#### 상황3. HLS 서버로 테스트
[[Streaming_server]]
- 일단 스트리밍 서버에 대해서 파악 중

TODO

#### 성능 최적화
3만 접속 시에도 CPU가 과부하 걸리므로 3만 이하에서 성능최적화하는 것으로
테스트해야겠다
TPS를 올려본다.
- https://jojoldu.tistory.com/322
- 여기서 TPS가 8000까지 나온다


## 진행 중 확인한 것들
#### 서버 성능별 벤치마크
[자바로 aws ec2에서 open files 테스트 하는 블로그](https://woowabros.github.io/experience/2018/04/17/linux-maxuserprocess-openfiles.html)를 봤고 거기서는 최소사양으로는 1000커넥션 정도밖에 서버가 받아들이지 못했다
이에 더해 1만 커넥션은 컴퓨터 성능이 어느정도 필요하고 10만은 얼마나 필요한지 확인해보자

minikube로 로드밸런싱 켜서 서버 cpu500/ram100으로 설정 시 ha 동작 확인
- 일단 도커에서 cpu 0.5 ram 500m 으로 줄이면 1만 접속 전에 뻗는다
- api 서버가 뻗어버린다...

라즈베리파이 동접 1000에서 에러 33%, 평균 응답 시간 30ms 정도 나왔다고 한다
- http://egloos.zum.com/javalove/v/869037

rmtp 서버 스트레스 테스트
- https://idchowto.com/?p=46410
- 2 core, 4GB memory로 2000 접속 정도

aws benchmark
- https://detechter.com/nginx-vs-apache-on-ec2-performance-comparison/

(책) aws 부하테스트 입문
c4.large 200클라이언트 평균 응답시간 0.026, 처리량 7000
- https://dev.classmethod.jp/cloud/apache-jmeter-master-slave-100mil-req-min


#### 추가로 테스트 해봐야 할 것들
동영상 서버는 UDP로 동작 하는 것이라 생각했는데 HTTP는 TCP 기반인데 UDP로 하는게
의미가 있나? 어떻게 동작하는 거지?

10만 접속자가 동시에 들어오면 차례대로 들어왔을 때보다 느려진다?
- 서버 응답이 오래 걸릴 수록 비동기가 유리해지는 것 같다.

nginx나 프록시 서버가 들어가면 어떤 효과를 낼 수 있을까
- 서버를 늘리거나, 사양을 안늘려도 되게끔 할 수 있을까

socket select, poll, epoll

websocket을 사용하면?
- websocket is better than httpapi for streaming? even more grpc?
- websocket을 쓰면 연결된 상태에서의 데이터 처리에 특화되있어서 기본 http보다는
  좋다. grpc와는 비교가 필요하다

HTTP/2로 테스트

load test에 맞게 사용자 수를 늘리면서 테스트해서 몇명까지 되는지 보는게 맞겠는데

- [ ] 3만 접속 응답시간을 줄이는 것도 해보자
- [ ] kubernetes를 이용해 자원을 제한해서 테스트
- [ ] 내부, 외부 네트워크 테스트 벤치마크
- [ ] grpc streaming을 이용한 테스트

#### 동시 접속
동시 접속이 무엇인지 명확히 생각하지 않았다
1초 내에 접속하는게 동시 접속인가?
모두 연결된 상태를 유지하는게 동시 접속이라고 생각했다
스트리밍 서버에서는 매 시간마다 새로운 트랜젝션을 실행하게 된다
tps를 보는게 더 정확한 것일까
십만 개의 요청은 금방 처리하는데 십만 개의 소켓은 연결하는데 오래 걸린다

기업 성과 지표에서 하루 이용자 수는 보지만 최대 동시 접속자 수는 안보는게,
서버 개발자에게는 중요하지만 동시접속자는 서버를 증설하면 처리가 가능해진다
요즘 오토스케일러도 잘되있는데 한 서버에서 최대한 많은 동시접속자를 뽑아내려는게
시대를 역행하는 것 같는 느낌이 든다

#### os parameter
paramter setting
> [tcp_parameter](https://stackoverflow.com/questions/410616/increasing-the-maximum-number-of-tcp-ip-connections-in-linux)
> [tcp_parameter2](https://serverfault.com/questions/962874/how-to-reach-1m-concurrent-tcp-connections)
> [more parameter, syn](https://brunch.co.kr/@jehovah/23)
> [time_wait](https://brunch.co.kr/@alden/3)
> [tcp/ip](https://d2.naver.com/helloworld/47667)

시간당 처리량 (rps)를 고려한 테스트 필요
vagrant로 격리된 환경에서 접속 테스트 필요
cpu 사용량 안정된 범위 확인 필요
지금 하고 있는 것은 일반 PC에서 서버가 받아들일 수 있는 접속자 수 확인
이 다음은 1초에 몇 사용자를 받을 수 있는지 확인 필요
처리량은 늘리고 latency(응답시간)은 줄이면서 사용자를 많이 받도록 해야한다
시스템이 처리 가능한량을 확인하면 각 함수별 처리량도 확인

클라이언트에서 10초 접속하는게 의미가 있나? 서버에서 10초간 접속하도록 해야겠다
의미가 있긴 있다. 접속을 끊지 않고 유지하는 것을 확인하려고 했기 때문에

1만 접속자 테스트 시 응답시간 0.7초, cpu 30~40% 사용
fasthttp로 했을 시 응답시간 동일, cpu 20~30% 사용

ab로 테스트하는데, keepalive를 켜고 접속하니 응답시간이 더 짧다
ab는 동접 2만까지밖에 테스트 안된다

초기 윈도우 값 10으로 변경
- `ip route | while read p; do ip route change $p initcwnd 10 initrwnd 10; done`

유휴 상태 후 느린 시작 방지
- `sysctl -w net.ipv4.tcp_slow_start_after_idle=0`

킵 얼라이브가 연결 된 사용자 뿐 아니라, 다른 사용자를 받을 때도 효과가 있나?
킵 얼라이브 시간 늘리기
```
echo 600 > /proc/sys/net/ipv4/tcp_keepalive_time
echo 60 > /proc/sys/net/ipv4/tcp_keepalive_intvl
echo 20 > /proc/sys/net/ipv4/tcp_keepalive_probes
```

속도를 높이기 위해 wmem, rmem을 늘리고, 허용 수를 늘리려면 줄인다
- `net.core.wmem, rmem max, default`
- `net.ipv4.tcp_wmem, rmem`

윈도우 크기 상한은 16bit인데, 윈도우 크기 확장 가능
`sysctl -w net.inet.tcp.rfc1323`

- [windows over 65535 korean blog](https://www.sysnet.pe.kr/2/0/12435)

#### http option
`Accept-Encoding: gzip, deflate`


## reference
- (책) HTTP 완벽 가이드, 인사이트
- http://blog.naver.com/PostView.nhn?blogId=myca11&logNo=221389847130
- https://jangpd007.tistory.com/246
- [kernel problem](http://highscalability.com/blog/2013/5/13/the-secret-to-10-million-concurrent-connections-the-kernel-i.html)
- [c10k 문제](http://www.kegel.com/c10k.html)
