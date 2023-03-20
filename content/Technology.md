---
title   : Technology
summary : IT 전반의 기술들에 대한 관심
date    : 2020-05-06 19:15:00 +0100
updated : 2021-12-04 12:27:04 +0900
tags    : develop
---

## [[Linux]]

## 전자회로의 역사
전자회로는 능동소자를 활용한 회로. 다이오드,트랜지스터,저항,콘덴서 등
반도체의 발전과 함께 전자회로는 발전해나갔다.[^1]
[^1]:(http://www.amkor.co.kr/archives)

트랜지스터
- 접합형, BJT, 전계효과(FET), 박막 트랜지스터(FET), MOSFET, CMOS

능동소자 중 반도체 소자의 대표적인 소자로 트랜지스터가 있다.
그 전 반도체 원리의 시효는 진공관이다.

ㅇ 진공관의 원리

장거리 통신을 위해 전기신호를 이용한 통신을 시도
중간중간 신호를 증폭시킬 필요가 있었고 증폭기능을 위해 진공관 개발
진공관은 부피가 크고 전기도 많이 먹는다.

플레밍에 의해 다이오드(이극진공관) 개발 - 1904년
트랜지스터 발명 - 1947년
- 벨 연구소 연구원들(월터 브래튼, 존 바딘(접점 트랜지스터),윌리엄 쇼클리(접촉 트랜지스터))

집적회로 발명 - 1958년 텍사스 인스트루먼트사
- [집적회로 발전단계](http://m.blog.daum.net/dasomcap/891)

ㅇ집적회로 분류
- TTL
- CMOS
- ROM
- RAM

ㅇ 트랜지스터 원리
ㅇ 집적회로 원리
ㅇ 트랜지스터의 소형화와 방법

ㅇ 트랜지스터 -1 바이폴라 접합 트랜지스터(BJT)
쌍극성 트랜지스터

ㅇ 트랜지스터 -2 전계효과 트랜지스터(FET)
단극성 트랜지스터
- JFET
- MOSFET
참고 : [http://www.bloter.net/archives/218176](http://www.bloter.net/archives/218176)

CPU 의 발전 (intel)
1971 - 4004, 108kHz, 2300개의 트랜지스터, 10마이크로 공정
1972 - 8008, 500kHz, 3500 10
1982 - 8086, , 13만 4천 1.5
1985 - 386
1989 - 486, 25MHz,120만개 1
1993 - 펜티엄 발표
1995 - 펜티엄프로, 0.6
1997 - 펜티엄2,233MHz,750만개 0.35 - 셀러론의 기반
1999 - 펜티엄3,500MHz,950만개 0.25 - 작동속도 상승, 전력 공급 상승, 열 상승
펜티엄3 2세대 3세대 4세대 거쳐 1.4GHz, 0.13 - AMD와의 경쟁 시작
2002 - 펜티엄4, 2~3.06GHz , 90nm - 대신 전력소비량이 130W에 달함
2005 - 코어2(듀얼코어도 됨) ,1GHz, 65W, 65nm - 작동속도를 낮췄으나 실제 성능은 펜티엄4와 비슷
2008 - 코어2 2세대 45nm 2GHz, 60W - 누설전류 심화 -> High-K 소재 사용
- i3,i5,i7 브랜드 시작, 45nm,
2010 - 32nm[클락데일 i5] ->2011 샌디브릿지-> 2012 22nm 코어 3세대[아이비브릿지]
->4세대 하스웰 (전력소비량 감소 집중)
2013 - 14nm 진입을 위해 3D 핀펫 기술 도입
2015 - 14nm , 19억개의 트랜지스터, 브로드웰

## Functional_Programming
#### haskell
- basic function
 - head [2, 3, 4] -- 2,  [2] -- 2
 - tail [2, 3, 4] -- [3, 4], [2] -- []
 - init [2, 3, 4] -- [2, 3], [2] -- []
 - last [2, 3, 4] -- 4,  [2] -- 2
 - take 2 [2, 3, 4] -- [2, 3]
 - drop 2 [2, 3, 4] -- [4]
 - !!
 - product
 - ++
 - reverse
 - length
- function rule
 - f a+b -- f(a) + b
 - f a b -- f(x, y) -- not working -- using with currying
 - f (a,b) -- f(a,b)
 - f (a+b) -- f(a+b)
 - f (g x) -- f(g(x))
 - f x (g y) -- f(x g(y))
 - f x * g y -- f(x) * g(y)
```
sum ns `div` length ns
= div (sum ns) (length ns)
```
- Currying
- `add :: Int -> (Int -> Int)` = `add :: Int -> Int -> Int`


#### First Object(Class) Citizen
#### High-order function
#### Pure function
#### Immutable
#### declarative
#### Currying
#### Memoization
#### Composition
#### Recursion
#### Monad

#### etc
모나드에서 한 함수의 출력이 다음의 입력이 되는 것은
[디미터 법칙](../About_Development#지금의 메소드 체이닝과 디미터 법칙의 차이)을 위반하는 전형적인 사례가 아닌가!?

고계함수는 독립적이다? 함수를 받아야하는 지점에서 이미 종속적인 것 아닌가?

클로저를 쓴 함수에서, 어떻게 외부함수가 클로저에 변수를 할당할 수 있는거지?

순수함수를 쓴다고 해서 스레드 세이프하지는 않은 것 같다
```
# 순수함수 아님
func PlusOne(i int) int {
    return i += 1
}
# 순수함수 맞음
func PlusOne(i int) int {
    return i + 1
}
```
여기서 i를 공유하면 값이 원하는 대로 나오지 않을 수 있다.
- 순수함수는 오로지 입력값에 의해서만 동작하므로 충돌 조건이 없다고 한다

그래서 불변 객체를 쓰고, 새로운 객체를 만들어서 해결하려고 한다
그렇다면 왜 순수함수가 중요할까?
1. 사이드 이펙트가 없다
2. 결정성이 있다 (= 멱등성이 있다)
3. 테스트가 쉽다

#### docker haskell
- docker-compose need start point
- Dockerfile need build image
- how to make easy build
- haskell init spent too long time but docker not executable..

## Block chain
- 분산경제포럼
코인은 한계가 있어보인다.
블록체인 이슈 PoS vs DPoS
모든 구성원에게 투표권한을 주느냐, 간접 투표로 하느냐
[[블록체인] 개발자를 위한 블록체인 로드맵](https://hamait.tistory.com/951)
암호화 기술의 개방(DES)
프라이버시 보호 운동 -> 사이퍼펑크(암호(cipher) + 사이버펑크(악동))

#### 데이비드 차움
- 금융거래 암호화를 통해 개인의 프라이버시를 보호하려 시도
- 익명성 가진 결제수단의 부작용 인지. 조건을 제시

- 각 개인이 행한 결제에 대해 제 삼자는 알 수 없어야 한다
- 예외적 상황 하에서는 신원에 대한 자료를 제공할 수 있어야 한다
- 도난당한 것으로 보고된 결제 수단에 대해서는 사용을 중지할 수 있어야 한다

#### 분산 대 탈중앙화
분산
- 여러가지 일을 나눠 처리
- 일을 나눠서 하므로 속도 상승, 고가용성 확보
  지배 개체가 있음

탈중앙화
- 여러가지 일을 반복해서 처리
- 신뢰성 상승
- 모든 개체가 동등

하지만 실제 세계에서 개개인의 의견을 듣는다면 모든 사람의 의견이 모아질 수 없기 때문에
여러 사람들의 의견을 모아 말해주는 의원을 뽑는 간접 민주주의 형식이
나온 것 처럼 블록체인도 대표를 뽑을 수 밖에 없을 것 같다
- 그렇다면 대표를 뽑는 방법은? 한국 의회를 보면 의회의 힘이 너무 강하다
    - 스웨덴의 국회의원을 뽑는 방식과 국회의원의 마음가짐을 확인해보자

[[Think#스웨덴 국회]]

디지털화의 효용 대 블록체인의 효용 구분해야 한다

블록체인의 오해
- 거래 비용 절감 (중앙 기관 없이 거래 가능하기 때문에)
    - 오히려 중개업자가 양산되어 수수료가 더 나오고 있는 실정이다
    - 동일한 작업을 할 때 에너지가 더 소비된다 (중복 작업을 하기 때문에)
- 데이터 활용 (위변조가 어렵기에 안전하고, 접근 권한 설정이 가능하다)
    - 대신 모든 데이터가 노출된 상태다(암호화 되어있더라도)
- 사용성이 떨어진다
- 노드, 피어, 트랜잭션

블록체인은 신뢰가 존재하지 않는 네트워크에서도 신뢰할 수 있는 기록을 작성할 수 있는 방법을 연구하는 분야

#### 하이퍼레저 패브릭
이더리움과 다른 프라이빗 블록체인
오더링시스템 하에서
네트워크를 설정하고 CA를 설정하여 시작하고
그룹을 생성한다
그룹간에는 컨소시움을 구성할 수 있고
컨소시움간에 채널을 만들어 통신이 가능하며
채널 내부에서 거래가 이루어진다
채널 안에서 장부 생성이 가능하며
피어라는 단일체를 만들어서 거래하게 된다
피어는 체인코드를 입력하고 검증하는 역할을 하게 된다
검증은 체인코드의 보증정책을 설정해서 따르게 한다
이제 클라이언트 어플리케이션에서 입력을 받아 체인코드를 통해 검증하고 이 검증된 내용은 오더링 서비스를 통해 블록을 만들어 각 피어에 접속된다. 그 후 보증정책을 통과하면 장부에 기록되고 채널에 블록연결되게 된다

#### 블록체인의 암호화폐는 익명이어야 하나?
- 정보공개는 하지만 탈중앙화되어 자유롭게 거래하는 것에 의의가 있는게 아닌가?
- p2p는 누군가는 내 것을 남에게 주어야 한다 그리고 그것은 거부감이 들 수 있다
○ 이 것을 어떻게 다르게 생각 할 수 있을까
○ 보상이 추가된다 나의 자원은 비워놓고 중앙에서 가져다 쓰기를 원할 수 있다 사용자는 그냥 중앙에서 내려받기를 원하지 내 자원이 사용되기를 원하지 않는다
- p2p 특성상 노드들이 오프라인 상태일 경우가 발생하는데 이 때 공격에 대비하기 위해 비잔틴문제해결 알고리즘의 얘기가 나오게 되었군

#### 블록체인을 회사 안의 플랫폼으로 사용하는 경우
신뢰성은 다소 포기하는 것인가?
블록체인에서 신뢰성은 서로 감시한다는 것에서 오는데 회사가 블록체인을 운영한다면
감시할 주체가 없지 않은가?

#### 블록체인과 공개 된 정보
블록체인은 중앙 관리가 없고 각 노드들이 서로 감시하는 방식으로 보안이 유지되는
컨셉인데 공개 돼있다고 해도 감지하는 시스템이 있어야 알 수 있지 아무리 노드가
많아도 아무도 안 지켜볼 수도 있다. 인터넷에 수많은 데이터가 있어도 알려져야 그
정보가 사람들에게 닿는거지 그냥 있다고 누가 알 수 있는 것이 아니다
블록체인은 보안성이 있는 것인가?
- 변조가 되면 자신의 해시와 변조된 해시가 다르기 때문에 감지가 된다
- 위조 시 앞, 뒤의 노드를 같이 변조해야 한다. 그래서 51% 이상해야 탈취가 되는데 그
정도 자원을 얻으려면 필요한 비용이 훨씬 많이 들게 하여 51% 공격을 무의미하게
만든다.

채굴과 똑같은 방식인 척 위장한 트랜잭션을 구분해낼 수 있나?
- 머클 트리

#### 코인 대신 nft?
nft를 가진 사람들만 이용할 수 있는 것을 제공해서
nft를 회원권의 개념으로 쓴다고 충섭님께 들었다
일리있다. 전자적인 회원권
기존의 회원권과 차이가 없고 오버 테크놀러지라 생각했는데 필요한 곳도 있을 수도...?

#### Blockchain
키워드
- 공개키 개인키
- 해시함수
- 머클트리
    - 자식 중 하나만 변경되어도 감지가능
    - 최상위의 노드만 확인하면 됨
- 비대칭 암호화 기법
- ECDSA
- 작업증명
- 지분증명
    - BFT 기반
    - 체(간)기반
    - 소수의 검증집단을 두게되면 익명성이 사라진다?
- DPOS 위임지분증명
- 비트코인은 18년말 난이도가 101배 정도 상승할 것으로 설계되었으나 실제로는
  7조배 상승.
- 탈중앙화는 목적이 아니라 수단이다.
- 불록체인을 개발하고 유지하는 것에도 비용이 들고 관리도 필요하다.

전산으로 데이터를 공유하는 곳 (은행, 민원센터) 에서는 익명성과 정보의 신뢰성이
큰 효과를 볼거 같은데

비트코인은 처음의 코인과 나중에 얻는 코인이 다른 에너지가 사용되었는데 처음에
얻은 것의 가치가 힘들게 얻은 것과 동일하다는 것은 이상하지 않은가?
- 시간이라는 가치가 밸런스를 맞춰주나?

## Drone
보조배터리
드론 몸통
모터 4개
변속기
클린플라이트 ( 자이로 센서 확인 가능 앱)
자력계
가속도계
자이로
GPS
기압계
연동

관성측정장치(IMU)

스마트폰과 연동해 기울임 인식 기능

호버링

저가 드론의 FC는 어떻게 자이로센서 모터 등을 값싸게 구성할 수 있는가

FC의 제작 ? 방법은?

참고 사이트
- [부품 사이트](Hobbydirector.com)
- [헤파이토스 - DIY 선구자](http://blog.naver.com/dkwltmdgus)
- [상세구현자](http://sensibilityit.tistory.com/category/드론)
- Multiwii < 드론 상태제어 프로그램
- [스마트폰 자이로센서 확인 시험 소스 사이트](http://bbulog.tistory.com/18)
- [드론 토탈](anadronestarting.com)
- [졸업작품 만든사람](http://hs36.tistory.com/42)
- [FC 종류](http://teamgds.tistory.com/78)
- [드론 부품 구매](http://mechasolution.com)
- [강의](http://opensource.kofac.re.kr/edu/detail_view.do?aIdx=100)
- Blynk << 아두이노,라즈베리파이 연동 센서 조절 앱
- [멀티위 가이드](https://www.openmakerlab.co.kr/single-post/2016/04/14/Open-Maker-Lab-Board%EB%A1%9C-250%EC%BF%BC%EB%93%9C%EC%BD%A5%ED%84%B0-%EB%A7%8C%EB%93%A4%EA%B8%B0)
- [소스 배포자 Daniel Heo](http://blog.naver.com/PostView.nhn?blogId=peter_jinsoo&logNo=220327320784&parentCategoryNo=&categoryNo=&viewDate=&isShowPopularPosts=false&from=postView)
- [소스](https://blog.naver.com/ejtkddl/220401728787)
- [코코아팹](https://kocoafab.cc/tutorial/view/596)
- [자동주행 성공자](http://blog.naver.com/lbiith/220915662242)
- [카메라 프로그램 오픈 소스](http://zoneminder.readthedocs.io/en/latest/installationguide/index.html)
- [안드로이드 센서 확인](http://bitsoul.tistory.com/121)

#### 부품 구매
연결 조립
모터 구동 확인
센서값을 받아와서 ESC에 값 전달 모터 구동 확인
비행 테스트
조종 테스트 - 라즈베리파이 <-> 휴대폰 직접 연결 가능 -> 통신 부분...
호버링 기능
안전 착륙 기능
GPS 위치 인식

#### 제어
PID 제어 + 필터 > ESC
필터 - DMP, Complementary Filtering, Kalman Filtering
Kalman Filter 는 복잡성에 비해 정확도가 떨어진다고 한다.
PID 제어 주기
PWM Update Rate 확인
Pwm 신호 출력
스마트폰 제어
Wire < I2C 라이브러리
기본적으로 모터들이 똑같은 입력을 받아도 출력값이 다를 수 있다
ESC 캘리브레이션 해줘야 되고
사용자의 입력값
Xu xd
Yl yr
Zu zd
센서의 출력값
AcX,AcY,AcZ
GyX,GyY,GyZ
I2C 교환 값
센서 값 초기화값
(센서 값들을 시간별로 더한 후 평균값을 구한다)
SumAcX
baseAcX
센서 계산값
Accel_x = AcX - baseAcX
Accel_xz,accel_yz
Accel_angle_y,accel_angle_x
Gyro_x
센서 보정값
- 1 필터 (칼만,DMP)
- 가속도+자이로 값 전달 (안정적으로)
    - -> 센서의 평균값을 구하고 필터 공식을 대입해 출력값 구한다.
- 2 PID
- 최종 출력값을 안정되게 보내주는 제어방법
- K = 사용자가 임의의 값을 넣는 것 같다 (?)
- P : K * err -> P= Kp * err
- I : K * err의 적분값 -> I+=Ki*err*dt
- D : K * err의 미분값 -> D=-Kd*(dInput/dt)
- P+I+D 값을 ESC에 보내준다.
- Err = Setpoint - input ( setpoint ? )
- dErr = err - prevErr -> dInput = input - prevInput
- Roll,PitchmYaw 각각 PID 값을 구한다.

Roll
Pitch
Yaw

센서값 초기화 -> 센서 평균값 추출 -> 센서 계산값 -> 필터값 적용 -> PID 적용 -> 모터

#### 부품 구매
드론 제작 시작
라즈베리파이로 똑똑한 드론 만들기 프로젝트

모터
변속기
가속도/자이로 센서
GPS 센서
프레임
전원 공급 배터리 ( 보조배터리 ) - ( 남는 배터리로 보조배터리 제작 )
라즈베리파이
공기계 휴대폰 ( 카메라 사용 )
조종용 휴대폰 - 앱 제작 필요

우려되는 점
1. 라즈베리파이가 모터를 구동할 파워를 가질 수 있는가
2. 보조배터리로 전원공급이 가능할까

------

구성
라즈베리파이 - MPU-6500 (칼만 필터,PID 제어)
ㄴ 변속기 - 모터
ㄴ 배터리
+ 휴대폰 카메라 ( 그냥 장착 )
MPU-6500 으로 읽은 위치 값을 변속기에 출력값으로 넣어 컨트롤.

-------

호버링 기능
좌표위치 이동
휴대폰 카메라 연동

-------

모터 변속기 센서 프레임 구매 필요
라즈베리파이의 전력 사용 한계값 구하고
그에 맞는 모터와 변속기를 구매한다.
모터는 전체 드론 무게를 고려해서 구매한다.
450mm 급 드론 예상
900g 이내
휴대폰 150g
모터 25g x 4
변속기
배터리
라즈베리파이&센서&배선 100g 이내
프레임
변속기 20A,6A,12A
모터 보다 허용 A 높은 걸로 (최소 5A 더)
A(전류)는 모터가 회전하는데 필요한 전류량
낮은 A로 도는 모터는 아마 힘이 약하겠지
모터 속도, 토크, 무게, 전압, 전류,
프로펠러 지름이 크면 속도를 높이거나 낮추기 어려워 좀 더 안정적이다.
배터리는 모터4개의 전류를 모두 공급 해줄수 있는 배터리여야 하는데
모터
변속기
배터리
프로펠러
센서
몸체

V 11 A 2/5 W 25
V 11 A 20 W 28

구상 중.. 킷도 괜찮겠다 싶다..
http://daduino.co.kr/product/detail.html?product_no=1237&cate_no=78&display_group=1

[motor reference](http://blog.naver.com/79k3le5ze/10110646393)


## ML
#### 인공지능
기계도 학습에 의해서 정보를 습득하고 공부한다
데이터 라벨링을 해서 빅데이터를 이용해 공부를 시킨다
학습은 뇌세포의 연결강화 - 도널드 헵 -> 가중치(weight) 개념의 토대
인공지능 신경망은 뇌를 모델로 했다. (사람이 기준이다)

현재까지 해결된 문제들
- 한 방향의 학습모델은 XOR 문제를 해결하지 못한다
    - Output을 Input에 다시 적용
    - 역전파 알고리즘
    - CNN
- 신경망이 깊어지면 예전 신경망 데이터가 날아간다 (Vanishing Gradient)
    - 초기화가 중요하고, 초기화의 효율성이 좋아져야 한다.
    - 자비어 초기화
- 학습을 많이 시키면 오히려 부정확해진다

인공지능 연구목적
- 인간 능력 증진
- 사람이 어떻게 사고하는지 이해하기 위해

> 출처: 야사와 만화로 배우는 인공지능

#### workflow
- 데이터 클리닝
- 데이터 축소
- 데이터변환
- 정규화
- 더미 코딩
- 평가지표
- 평가방법
- 데이터분리
- k 겹 교차검증

#### 구성 요소
placeholder
Variable
Matmul
Nn.relu
Nn.softmax

파일에서 데이터 불러오는 방법

일단 입력데이터를 만들어내야 한다

leaner regression - 선형 회귀
- 비례 관계에 있다고 여겨지는 사건 예측 할 때 사용 가능

cost function

gradient descent algorithm
- 제일 좋은 가중치를 얻어낸다

convex function

sigmoid

#### MLOps
continuous training model
continuous deploy model
easy update test model

training
serving

#### mlops
first-order-model: gif를 이용해서 사진을 특정 동작을 하도록 구현한다
build-model: 간단한 모델 생성 파일
keras-flask-deploy-webapp: 간단한 플라스크 구동 앱. h5파일을 빌드하고 실행한다
cnn: cactus recognizer, cnn 모델 생성 파일 있다

build-model을 이용해서 모델을 빌드하고 keras-flask-deploy-webapp으로 실행한다

! keyerror: sample_weight_mode 에러가 뜬다
- model.save()와 model.save_weight 차이가 뭔데

keras-deploy는 지금 텐서플로 모델을 불러와서 실행하고 있다.
커스텀 모델을 실행 가능하도록 설정 필요하다

! h5 마다 다 차이가 있어서 실행이 잘 안된다.

tensorflow Serving server라는게 있어서 모델을 여기에 저장해놓고
플라스크에서 호출해서 쓸 수 있다
그냥 모델을 플라스크 서버에 저장할 수도 있지만, 분리도 가능하다
- [serving server](https://towardsdatascience.com/deploying-keras-models-using-tensorflow-serving-and-flask-508ba00f1037)
- pb 파일만 사용 가능, h5를 pb로 변환 가능

weight가 뭐고
weight, losses, optimizers를 h5 파일 안에 넣는단다
저 값들이 있으면 예측모델이 되는건가

#### ml devops
data composing
data preprocessing
model build to `.h5`

loading model
route page

#### predicting data
DNN
csv
make model
load model
continuous update data
continuous update model
backtesting
delivery to server

regression for predict
classification for choice one of the fruit

#### Machine Learning framework
- tensorflow
- torch
- keras
- scikit learn

#### tensorflow
- tensorboard in docker
 - `--bind_all`

#### GAN
진짜데이터를 기준으로
제네레이터가 진짜데이터와 비슷한 것을 계속 생성하고
검사자는 진짜데이터와 제네레이터 데이터를 비교해서 진짜를 찾는과정인데
제네레이터는 작업을 하면 할수록 진짜와 비슷한 작업물을 만들 수 있고
검사자는 더 잘 구분할 수 있게 된다
데이터가 충분치 않을 때 사용하면 원하는 데이터를 얻어낼 수 있다

## 축구관련 프로그래밍
축구정보 웹 페이지 제작
승부예측페이지?
팀 두개를 선택하면 내가 짠 로직으로 승패를 예측하는 페이지 제작해보자
파싱 가능한 데이터목록 필요
+ 내가 생각하는 승부의 포인트
역배확률 높은 경기 목록 띄우기

비프로 - 축구 비디오 분석 회사

## 스포츠 테크놀로지 업체
- WHOOP
- Volt Athletics
- Moov
- 국제스포츠연구센터 CIES

#### 이전의 경기상황을 미루어 현재의 결과를 유추해내는 프로그램 제작
- 주요선수의 부재
- 원정 경기 이후 일정
- 선수들의 컨디션 고려
- 국가대항전 후 리그 경기 승률 구하고
- 챔스 경기 후 리그 경기 승률

## IoT
Iot 가 사람들의 삶을 어떻게 변화시켜 줄 수 있을까
Iot는 어떤 환경을 만들어 줄 수 있을까

#### protocol
- zigbee
- BLE
- WIFI
- 비콘

#### Item
- 회사 사무실용 IOT 구상
- 모듈화
- 무선 LAN - LoRa

#### Iot 적용 가능 분야
- 사무실
- 공장
- 학교
- 집
- 도로
- 가방
- 수면
- 가스
- 에어컨

## arm의 장점
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

## Rust
## Typescript

## Oauth2
브라우저, 사용자, 서버, Oauth 제공자

서버는 브라우저에 Oauth를 표시한다
사용자는 브라우저에 Oauth 버튼을 누른다
브라우저는 서버에 사용자 정보를 주면서 신호를 준다
서버는 Oauth 제공자에게 사용자 정보를 준다
Oauth 제공자는 사용자에게 코드를 보낸다
사용자는 서버에 코드를 보낸다
서버는 Oauth 제공자에게 코드와 사용자 정보를 보낸다
Oauth 제공자는 확인 후 서버에 토큰을 준다

사용자 -> 서버 -> Oauth (사용자 정보)
사용자 <--------- Oauth (코드)
사용자 -> 서버 -> Oauth (사용자 정보 + 코드)
          서버 <- Oauth (인증 후 토큰 제공)

서버가 바뀌어도 사용자는 자신이 원래 하던 일을 그대로 할 수 있나?

#### oauth2.0
- 로그인
- 토큰 획득
- 토큰 및 아이디로 내부 저장
- 토큰을 사용자 헤더에 갖도록 하기

토큰 확인
사용자 확인
요청 동작 실행

## agile
product build in one day. design to deploy

## 데이터 분석
데이터 출처 이해
`# 보통 csv 파일로 받는다`
데이터 크기 확인
```
data = pd.read_csv(file_path)
data.info()
```
데이터 구성 요소(키, 몸무게) 확인

속성 탐색 (데이터로 무엇을 얻어낼지 생각)
구성 요소 간의 상관 관계 탐색
분석
시각화

pandas

분석 결과의 타당성을 검증하기 위해 분석 대상 간 통계적 차이를 검정하는 과정이
필요하다
- [ ] 통계적 차이가 뭐지?

1. 텍스트 마이닝: 데이터 파싱 - 시각화
2. 미래 예측 (회귀 분석)

arima
의사결정 트리
랜덤 포레스트
XGBoost
heuristic

머신러닝을 위한 데이터
https://archive.ics.uci.edu/ml/index.php

## react function vs class
function 안에 function을 쓰면 렌더링 할 때 다시 렌더링해서 성능 저하 우려가 있다
`useCallback`이라는 함수를 쓰면 재렌더링을 막아준다.
근데 아예 밖으로 빼도 된다.
- https://stackoverflow.com/questions/46138145/functions-in-stateless-components
- useState, useEffect, useCallback 등이 지원된다

class component는 this나 props를 넘겨주는 작업이 있어서 거추장스럽다
기존에는 react의 lifecycle을 사용하려면 class를 써야했는데, hooks(useEffect
등)이 등장하면서 해결되었고, 함수형 컴포넌트를 권장하고 있다.


## android
- flutter 설치, android studio 설치
- flutter 플러그인 설치
- https://flutter-ko.dev/docs/get-started/codelab
- 첫 실행 시 license 에러
    - android 설치 시 java도 설치하므로 java home을 따로 설치 안하고 sdk
      command-line tools를 설치한다.
    - https://www.androidhuman.com/2021-06-02-flutter_android_license_noclassdeffound
- flutter doctor

## TV의 통신은 안정적인 이유?
tv도 어차피 컴퓨터가 각 가정에 송신하는 것 아닌가?
근데 방송국 서버실이 그렇게 구축되있다면 모바일도 서버용량에는 문제가 없을 것 같은데 끊김이 있고 성능이 왔다갔다 한다.

tv는 어떻게 그렇게 안정적으로 송신할 수 있지?

둘다 전파로 변환해서 쏘는건 마찬가지인데

안테나에 송신하는 장치로 보내기만 하면 나머지는 송신시스템이 알아서 하는건가?
모바일은 왜 그렇게 안되지?
방송국은 24시간 연결되있는 주파수가 있어서 되고 모바일은 계속 신호를 새로 잡아야해서 그런걸까


#### 스마트 워치가 수면 측정 하는 원리
가속계, 적외선 기술
가속계: 움직임을 판단해 잠에 들었는지 확인
적외선 PPG: 심박수와 심박변이도 확인

깊은 수면 시 심박수 감소, 심박변이 폭 줄어듬

정확도 50%. 깊은 수면은 비교적 정확, 얕은 수면은 안맞을 수 있음