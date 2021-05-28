---
title   : Technology
summary :
date    : 2020-05-06 19:15:00 +0100
updated : 2020-11-27 00:01:50 +0100
tags    : deep_knowledge
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
- 분산
여러가지 일을 나눠 처리
일을 나눠서 하므로 속도 상승, 고가용성 확보
지배 개체가 있음
- 탈중앙화
여러가지 일을 반복해서 처리
신뢰성 상승
모든 개체가 동등
- 하지만 실제 세계에서 개개인의 의견을 듣는다면 모든 사람의 의견이 모아질 수 없기 때문에
여러 사람들의 의견을 모아 말해주는 의원을 뽑는 간접 민주주의 형식이
나온 것 처럼 블록체인도 대표를 뽑을 수 밖에 없을 것 같다
- 그렇다면 대표를 뽑는 방법은? 한국 의회를 보면 의회의 힘이 너무 강하다
 - 스웨덴의 국회의원을 뽑는 방식과 국회의원의 마음가짐을 확인해보자
 - [[Think#스웨덴 국회]]
- 디지털화의 효용 대 블록체인의 효용 구분해야 한다
- 블록체인의 오해
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

Hobbydirector.com < 부품 사이트
헤파이토스 << DIY 선구자 [http://blog.naver.com/dkwltmdgus](http://blog.naver.com/dkwltmdgus)
[http://sensibilityit.tistory.com/category/드론](http://sensibilityit.tistory.com/category/드론) << 상세구현자
Multiwii < 드론 상태제어 프로그램
[http://bbulog.tistory.com/18](http://bbulog.tistory.com/18)
스마트폰 자이로센서 확인 시험 소스 사이트

저가 드론의 FC는 어떻게 자이로센서 모터 등을 값싸게 구성할 수 있는가

FC의 제작 ? 방법은?

드론 토탈 < anadronestarting.com
[http://hs36.tistory.com/42](http://hs36.tistory.com/42) << 졸업작품 만든사람
[http://teamgds.tistory.com/78](http://teamgds.tistory.com/78) << FC 종류
[http://mechasolution.com](http://mechasolution.com) 드론 부품 구매
[http://opensource.kofac.re.kr/edu/detail_view.do?aIdx=100](http://opensource.kofac.re.kr/edu/detail_view.do?aIdx=100) < 강의
Blynk << 아두이노,라즈베리파이 연동 센서 조절 앱
[https://www.openmakerlab.co.kr/single-post/2016/04/14/Open-Maker-Lab-Board%EB%A1%9C-250%EC%BF%BC%EB%93%9C%EC%BD%A5%ED%84%B0-%EB%A7%8C%EB%93%A4%EA%B8%B0](https://www.openmakerlab.co.kr/single-post/2016/04/14/Open-Maker-Lab-Board%EB%A1%9C-250%EC%BF%BC%EB%93%9C%EC%BD%A5%ED%84%B0-%EB%A7%8C%EB%93%A4%EA%B8%B0)
멀티위 가이드
[http://blog.naver.com/PostView.nhn?blogId=peter_jinsoo&logNo=220327320784&parentCategoryNo=&categoryNo=&viewDate=&isShowPopularPosts=false&from=postView](http://blog.naver.com/PostView.nhn?blogId=peter_jinsoo&logNo=220327320784&parentCategoryNo=&categoryNo=&viewDate=&isShowPopularPosts=false&from=postView) <<소스 배포자 Daniel Heo
[https://blog.naver.com/ejtkddl/220401728787](https://blog.naver.com/ejtkddl/220401728787) << 소스
[https://kocoafab.cc/tutorial/view/596](https://kocoafab.cc/tutorial/view/596) 코코아팹
[http://blog.naver.com/lbiith/220915662242](http://blog.naver.com/lbiith/220915662242) 자동주행 성공자
카메라 프로그램 오픈 소스
[http://zoneminder.readthedocs.io/en/latest/installationguide/index.html](http://zoneminder.readthedocs.io/en/latest/installationguide/index.html)
안드로이드 센서 확인 [http://bitsoul.tistory.com/121](http://bitsoul.tistory.com/121)

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
-> 센서의 평균값을 구하고 필터 공식을 대입해 출력값 구한다.
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
[http://daduino.co.kr/product/detail.html?product_no=1237&cate_no=78&display_group=1](http://daduino.co.kr/product/detail.html?product_no=1237&cate_no=78&display_group=1)

#### motor reference
[http://blog.naver.com/79k3le5ze/10110646393](http://blog.naver.com/79k3le5ze/10110646393)

## 스포츠 테크놀로지 업체
- WHOOP
- Volt Athletics
- Moov
- 국제스포츠연구센터 CIES

## ML
- 데이터 클리닝
- 데이터 축소
- 데이터변환
- 정규화
- 더미 코딩
- 평가지표
- 평가방법
- 데이터분리
- k 겹 교차검증

placeholder
Variable
Matmul
Nn.relu
Nn.softmax

Nn 응용으로 간단한 승부예측 프로그램 생성해본다

Y_date = 승,무,패
X 조건 : 이전 경기와의 경기간격 + 이동거리, 팀 포인트, 상대전적, 선수 컨디션

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
- 무선 LAN
- LoRa

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

## Rust
## Typescript
