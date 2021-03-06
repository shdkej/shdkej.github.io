---
title   : 개발 단상
summary :
date    : 2020-11-11 15:55:34 +0100
updated : 2021-07-13 14:00:48 +0900
tags    : develop
---

## 소프트웨어
사람 소프트웨어 사람
제작자 소프트웨어 유저
소프트웨어 - 유저
물건 - 유저

결국 사람이 기준이다

소프트웨어는
개발자, 소프트웨어 자체, 유저에게 모두 영향을 받고 미친다

#### 소프트웨어는 현대의 도구다
소프트웨어는 망치 같은 도구가 될 수도 있고 하나의 작은 우주가 될 수도 있다
필요한 것을 공간, 시간의 제약 없이 쓸 수 있는 도구
메타도구
먹을 것이 필요하면 소프트웨어를 통해 먹을 것을 구하고
공부를 하기 위해 소프트웨어를 통해 공부할 것을 구하고

메타적이다는 것이 추상적이고 더 상위개념 같지만 실제 문제해결을 하는 것이
아니라는 생각이 들기도 한다
사용자에게 직관적인 사용이 되어야 한다

#### 소프트웨어는 변경을 위해서 있다
종이에 쓰면 수정이 힘든 것에 비해 소프트웨어의는 변경이 자유롭다

선택 전에 기준을 세우는 것에 고민을 하고, 기준점에만 들어온다면 빠르게 선택한다
기준은 목표점이 되고, 피드백을 만들어준다

#### 컴퓨터
컴퓨터의 단점
- 눈 앞에 있어야 한다. (컴퓨터 앞에서는 공간의 제약이 없어지지만)
- 프로그램별 호환성, 종속성을 신경 써야한다. (에버노트의 데이터를 노션에
  옮기려면 번거롭다)
- 디스플레이에 따라 정보가 제한적이고, 답답하고, 한 눈에 보기 힘들어진다.

장점
- 변경이 가능하다. (종이는 새로운 종이가 필요한데)
- 점진적 개발이 가능하다
- 검색 기능

기계는 그냥 해달라는 대로 해주는 것에 그칠 뿐이지만
사람은 그 요구사항을 경험적, 직관적으로 판단해서 소비자와 같이 만들 수 있다

이 부분이 사람의 장점일 것 같다
이 점은 서로 존중하면 시너지가 될 것이고, 이익만 좇는다면 등쳐먹는 것이 되겠다

#### 인쇄를 통해 정보를 많은 사람이 전달 받을 수 있게 됐다
그리고 웹을 통해 더 많은 전달


## 개발
1. 확장성을 생각한다. (가독성, 모듈)
2. 요구사항을 퀄리티 있게 개발한다
3. 엣지 케이스를 확인한다 (최악의 상황을 대비한다)

## Digital, Development
- 디지털의 역할
- 불편함은 줄이고 원하는 것은 쉽게 얻을 수 있도록 하는 것?

#### story, history
소프트웨어에는 스토리가 있다
처음 만들게된 계기부터 요구사항에 따른 새로운 기능과 기존 기능의 변화 등
이런 스토리를 책으로 읽고 싶다

#### server architecture to using some company service
특정 서비스에 종속되는 것을 조심하고 다양한 기술을 써봐야겠다
처음에는 특정기술에 의존하는 것이 영속성이 없어서 서버아키텍처에 포함하면 안되지 않을까 싶었지만 기술적으로 파악하고 사용하고 종속되지 않도록 해야겠다
앞으로도 새로운 기술을 계속 써야하기에 지금 있는 기술을 두루두루 다뤄봐야겠다
그러나 내 서버 아키텍처는 단순하고 가벼웠으면 좋겠는데 여러 기술을 사용하면 복잡해질 수 밖에 없는데 이를 계속 생각하고 있다

#### 개발자는 멋진 직업이다
코드를 어떻게 짜면 좋을지에 대한 추상적인 탐구로 코드의 질을 높일 수 있다
하지만 실제 코드를 짜면서 그것이 모두 되지 않는다는 것 또한 실전에서 바로 느낄 수 있다
이상적인 그림도 크게 그릴 수 있고
현실적인 경험도 할 수 있는,
책을 통해 발전 가능하지만 책에만 갇혀있지 않는 실존적인 직업임이 멋지다.

다른 개발자의 후기나 경험담이 인터넷에 자료가 많다
나도 잘 공유해야지

#### 개발에서의 추상화
현실 세계를 컴퓨터 세계의 언어로 바꾸는 것

#### 어려운 작업을 추상화해서 사용하기 좋도록 해야한다
내가 어렵게 배웠어도 그것을 누군가는 다시 사용해야하고, 유지보수 해야한다.
그러면 그 전에 배운 작업을 추상화해서 쉽게 사용할 수 있도록 해야한다.

#### development
한 아키텍처에 너무 많은 것을 넣으려고 하다가 이도저도 아니게 되겠다
처음에 집중할 목표를 잡고 작게 작게 처리해 나가야 하겠다

개인이 제작하는 프로그램에는 규모의 한계가 있다
프로토타입 수준의 프로그램이 제작될 따름인데 개인 프로젝트의 의미는 무엇일까?
스스로 기술 발전을 할 수 있다. 기술 발전을 해서 무엇을 하나. 기술 협력을 통해 기술 발전에 기여한다
회사가 아닌 다른 기술 발전 기여 통로를 만들어야겠다

작은 양의 코드를 수정하는데도 정리가 안되어 무엇을 건드려야 할지 막막해지는
순간이 있었다. 작은 크기로 함수들을 쪼개놓았는데 그 함수들이 여러개가 되다 보니
길을 잃은 것 같다. 어떻게 길을 찾아야 할까
[[Architecture]]

#### 프로그래밍과 글쓰기의 상관관계
코드를 읽는 것은 책을 읽는 것과 비슷한 것 같다. 한 줄 씩 읽다보면 내용이 보인다
그런데 요즘의 프로그래밍 흐름은 책 읽는 방식과 달라지고 있다. 함수형 프로그래밍의 대두와 객체지향형 프로그램에서 부터 시작된 코드의 클래스화, 모듈화, 소형화가 코드의 가독성을 좋게 해주고 유지보수에 이점이 있다고 받아들여지고 있다

#### Refactoring is like a revision

#### program is different with journaling
program haven't finish, journaling is.
so program is need refactoring anytime.
it is no defeat. it is strength.

## 객체 지향은 어떤 요구로 나오게 되었는가
복잡한 구조에서는 객체지향의 상속, 추상이 도움이 되더라

절차지향적이던 코드는 책을 쓰는 것과 비슷했다
객체지향이 나오면서 책을 쓰는 것과는 달라졌지만
작가가 퇴고하는 것과 리팩토링하는 부분은 비슷했다
하지만 작가는 퇴고 후 출판된 책은 더 이상 수정하려 하지 않고 독자에게로 넘겨준다
이 점은 코딩과의 차이점인데, 코딩도 이처럼 완료되는 시점을 만들 수 있을까.
리눅스의 sed나 기본 명령어들은 자주 업데이트하지 않으며, 오랫동안 업데이트 되지 않았지만 여전히 쓰이는 코드들이 있다.
그러나 프로그램 전반의 생태계는 빠르게 변하고 있어서 사용자가 원활하게 쓸 수 있도록 하기 위해서는 끝없는 수정이 불가피하다.

## 코드는 절차지향에서 객체지향으로 오면서 책과 쓰이는 방식이 달라졌지만
읽기 좋아야 한다는 점은 여전히 중요한 가치다

읽기 좋은 코드는 책처럼 쓰여진 코드가 아닐까
객체화 된 코드를 어떻게 책처럼 읽히도록 할 수 있을까

코드는 파일, 폴더, 프로젝트의 구조로 되어있다
참조해야 되는 객체가 있는 파일은 같은 폴더에 있을 수도, 외부에 있을 수도 있다

#### 프로그래머라고 이야기하면 수학 잘한다고 생각하는 경우가 있는데
수학은 전혀 못하지만 컴퓨터를 좋아하면 프로그래머가 될 수 있는 것 같다
컴퓨터에서 뭔가를 내가 만들어 동작시킨다는 것이 재밌기 때문이다

#### software to make money
소프트웨어나 컨텐츠에 돈을 안쓰려고 하는 경향이 있다
내가 소프트웨어로 돈을 벌어야 하는데 돈을 안쓰면 내 소프트웨어도 가치를 인정받기 어렵다
소프트웨어에 돈을 쓰기 싫어하는 이 생각을 어떻게 바꿔야 할까

#### Safety programming
- Inner network only is safe? Every service has lots problem
- And it has used to user and responsive complain
- After that. Service is better than previous one.
- How to make program to same as it.
- Only accept have a certificate paper user system. Is it security?
[[Coding]]

#### 기술 공부
기술이 어떻게 나오게 되었는지에 대한 역사를 알면 그 기술에 대해 이해력이 높아지고 기억이 잘 된다
- 링크드리스트

기술의 단점을 확인하고 대체 기술을 확인한다
- json

내가 안쓰는 기술이라도 그 기술의 큰 특징은 알아두면 좋겠다
- 스프링, 안드로이드, 프론트엔드 프레임워크

#### algorithm
- it has solution that I didn't think.
- 알고리즘의 유형은 다양하고, 이미 최적의 알고리즘이 있다.
- 그 알고리즘을 생각해내서 만들어내면 좋겠지만 답을 찾아야 한다는 생각때문에
 생각이 막히는 느낌이 들 때가 있다.
- 이 유형은 푸는 방식이 따로 있을건데.. 라는 생각때문에 알고리즘 풀기가 잘
 안된다
- 답을 봐도 풀이가 이해 안되는 경우도 있고, 상세한 설명을 들어야 하는 경우가
 있다.
- 일단 문제를 많이 경험하고, 답을 풀려고 하기보다는 하나씩 접근하고, 30분 정도
 고민해도 답이 안나오면 빨리 풀이를 보는게 좋을 수도 있다.
- algorithm has two grade. one is basic, the other hand is for fun.

#### algorithm 예외 체크
발생 상황이 적은 것 체크. 발생 상황을 한정시킨다
유일하면서 최소 정보를 가진 것으로 정리하기

#### A/S, after service
a/s can announce to me that what I missed, and what can I grow.
a/s is just doing the same work. not to be known.
sometimes when before the same work. it is good to evolve knowledge. but cannot control what I want.
it makes me spent time a lot. and annoying.
a/s is need

#### 다음 세대는 모두가 프로그래밍을 할 수 있는 세대가 될 것이다.
그렇다면 직업적 프로그래머와 그들과의 차이점은 무엇이 될 수 있을까
원하는 프로그램을 구상하고 구현하는 것은 코딩교육과 노코드 프레임워크로 어느정도 구현할 수 있을 것이다 (물론 더 나은 교육이 나올 수 있지만)
대규모 엔터프라이즈는 개개인이 접근할 수 없으니 이 영역만 남게 될까?
퀄리티의 차이를 논할 수는 없을 것이다.
프레임워크가 발전하면서 오히려 더 깔끔한 코드가 나올 수도 있기 때문에.

#### 개발자의 기본은 어떤 것이 있을까
주호민의 위펄래쉬를 보면 정말로 기본이 안된 만화들이 나온다
주호민작가가 말하는 만화의 기본은 말풍선, 폰트, 정렬, 채색, 스토리텔링, 연출 등인데 가독성을 위한 부분이다.
어떤식으로 연출하느냐에 대한 세부가 아니고 독자가 알아볼 수 있나 없냐의 부분만 얘기해주는데 정말 응모자의 고유영역은 안건들이고 잘 설명한다
기존의 만화에서 사용되던 관용표현을 쓰는 것을 기반에 두지만 하나씩 변화하는 것을 좋게 보는 점도 있다.
말풍선의 위치는 독자들이 원래 읽는 방식대로 하는 걸로 하는게 맞고 바뀌면 안좋다는 부분 공감.
독자의 시점에서 어떻게 보는지를 생각한다.

개발자의 기본은 어떤 것이 있을까
개발단.
개발된 프로그램의 독자는 유저
코드단.
코드의 독자는 개발자
개발자들이 공통으로 생각하는대로 코드를 짜면 코드 이해하기 좋을 것이다

#### 기본이란 무엇인가
대학 커리큘럼?
사람들이 자주 쓰는 것들?
제작자의 가이드?
기술의 기반과 역사?
의도
혼합된 개념을 이루는 단일 개념

프로운동선수는 프로데뷔무대에서 기라성같은 선수들과 비슷한 퀄리티를 가진 채로
무대에 선다

개발자는?

## 가방의 본질은 수납
수납하기 위해 만들어졌다

개발자는? 컴퓨터는?
컴퓨터는 계산을 위해 만들어졌다. 인간이 귀찮게 안해도 되도록
개발자는 소프트웨어를 만드는 사람
인간이 귀찮게 안해도 되도록 컴퓨터가 일하도록 만드는 프로그램을 만드는 사람
소프트웨어란

처음 만들어진 소프트웨어는 수학문제를 풀기위한 것
문서 작업용으로 많이 쓰였었고
지금은 여러 물리적 공간을 연결해서 접근이 쉽게 해준다(배민, 우버)
공간, 시간의 제약을 줄이는 것에 뛰어나다(인터넷 예약)
계산을 빨리 해준다(머신러닝)

중요할 때 이상동작 하지 않는 신뢰성, 안정성
고장나면 바로 교체할 수 있는 모듈화
망치에 고무를 둘러서 사용성을 증가시키는 것

## 개발자가 게임의 테마와 진행방식, 어떤 점에 중점을 줄지 생각하지 않고 기획자가 하게 된다
그러면 개발자의 역할은 무엇일까
개발과 기획을 나누는게 맞을까, 큰 서비스를 할 때는 나뉘게 되겠지만 개발자가 기획을 하지 못하는 것은 아니다
엔지니어의 영역

구현하려는 것을 깔끔하게 구현하기 - 여기서 개발자의 의견이 더해질수는 있지만 메인은 아니다
구현한 것이 오류를 일으키지 않게 하기

사람과 기계를 연결하는 일
기계 - 컴퓨터 - OS - 작업환경
사람이 할 수 있는 것을 쉽게 하게 해주는 일
사람이 할 수 없는 것을 하게 해주는 일

주고 싶은 가치는 따로 있을 것 같다
사람의 편의, 효율을 늘리는 것
효율을 크게 늘릴수록 좋은 소프트웨어인가?

전체 소프트웨어 레벨에서는 효율성 증가를 목적으로 두고 각 소프트웨어는 각 기계처럼 각자의 목표가 있겠다
하나의 소프트웨어는 하나의 기계와 같다
식기세척기는 식기를 잘 세척하는 것이 목표다
앨런튜링
리누스토발즈
리차드스톨먼

소프트웨어는 커널, OS, 프로그래밍 언어, 화면에 종속된다 + 네트워크 + 사용하는 서비스 + api

#### Is developer an engineer?
[[Creator#예술가와 엔지니어의 차이]]
- 실제 문제를 해결해야 한다

#### 세계화와 각 나라의 관습
- 읽는 방향은 국가별로 일관성이 있다
- 만화에서 좌에서 우로 본다는 관습적인 속성을 이용해서 말풍선을 배치한다
- 일본만 해도 읽는 방향이 반대인데, 만화라는 컨텐츠는 이동 시 수정이 필요하다
- 애초에 쓰는 언어가 다르긴 하지만...

#### Design First is Good
But, Don't be loose. Quick Response. small thing first

#### 이미 나와있는 기술은 써먹으면 된다
근데 FC의 기술은 분석하고자 한다
분류가 다른가? FC를 분석하려는 목적, 종착지는 어디인가

## module
부피가 아주 커지면 모듈화로 분리하는게 좋다

작은 모듈은 무수히 많이 만들게 허용한다
그 모듈들은 하나의 추상적인 객체가 된다
- 스테이지 서버를 없애는 것

#### why module is worth
- 작은 수정에 많은 업데이트 시간이 걸린다
- 동시에 여러 작업을 하기 어렵다

#### 작은 것으로 쪼개어도 해결되지 않는 문제
세계를 개인의 합이라고 생각할 수 있는데
개인을 안다고 세계를 다 알 수는 없다
개인이 모여 그룹이 되고 그룹이 모여 더 큰 그룹이 되면
개인의 행동양식과는 다른 결과가 나올 수 있다

경제학에서 개인의 경제행위를 연구하는 것만으로는 시장을 다 알 수 없어 거시경제라는 개념이 나왔다
기업은 개인의 판단과 다른 판단을 할 수 있다

작은 단위를 합쳐 크게 만들면 또 다른 변화가 만들어진다

#### 모듈
집에 살 때 한 부분이 고장났다고 집 전체를 바꿀 수 없는 것처럼 각 부분이 잘 분리되야한다
집에 있는 가구들이나, 집 자체에 결함이 생기면 전체를 고치기보다 부품만 교체하기를 원한다.
라즈베리파이가 100대 있으면, 각 역할별로 나눠져 있어도, 고쳐야하는 요소가 많아져서 번거롭다.

## 변하는 것과 변하지 않는 것
변하지 않는 것은 없지만 빠르게 변하는 것과 천천히 변하는 것은 나눠져 있다
아키텍처를 구성할 때 천천히 변하는 것을 잘 분리하여 빨리 변하는 것에 더 집중하고 천천히 변하는 것은 잘 유지할 수 있도록 하면 좋겠다

아이폰의 뒷면

## 새 기술 도입
- 문제 되었던 사례
- 바랐던 모습
- 바뀐 모습

## 개인 맞춤형 서비스
인구 감소 - 내수 시장 축소 - 개인 맞춤형 서비스 - 데이터 많으면 유리
데이터를 많이 갖고 있는 회사는?
네이버, 카카오,
사용자가 많은 회사
삼성, 애플, 통신사
정보를 모으고 있는 회사

#### 맨투맨 서비스

## 개발을 하는 경우
일단 재밌어 보이면 해보는 경우
목차화를 해서 전체 흐름을 잡고 해보는 경우
해야할 목표가 있어서 그것을 해야할 경우
문제해결을 위해 문제정의를 하고 처리하는 경우

#### 가려움을 해결한 방법 1
프로그램이 세이프티하게 돌아갈 수 있느냐에 대한 확신이 없었다
분명히 동작을 하다가 안전하지 않은 상황이 닥칠 것 같다는 불안감이 있었다
그리고 프로그램이 깔끔하게 잘 짜졌다는 생각이 전혀 들지 않았다
이런 문제들이 계속 나를 압박하고 있을 때…
리팩토링을 다시 생각하게 되었고,
안전에 대한 부분은 문제가 될만한 부분들을 예측해서 에러가 발생하게 되면 초기상태로
최대한 돌리는 방식으로 프로그램을 수정하기로 했다.
일단 해야될 것들을 다 작성한 후, 리팩토링을 지속적으로 해서 더 나은 프로그램을 만들어야 한다
한번에 작성되는 프로그램은 없는 것 같다
기존 프로그램은 동작 중 에러가 발생할 경우 초기상태로 되돌리는 코드가 있었으며,
동작 전에도 위치를 확인함으로써 제품의 불량이 나는 것을 최우선적으로 막은 것 같다
이를 계속 신경써야 하고, 리팩토링도 열심히 해야한다.

-----------------------------------------------------------------------

## VS
#### 자연의 프랙탈
소프트웨어는 자연의 섭리대로 따라가는게 좋을까
소프트웨어의 장점인 인조적인 것을 쭉 밀고가는게 좋을까

OS가 처음 만들어질 때 사람 기준으로 구성하는 것과 새롭게 컴퓨터 자체 기준을
정립해나가는 것이 대립되었었고, 지금에서는 휴지통, 내 폴더 등 사람 기준이 널리
사용되고 있다.

#### 실제 물체의 속성으로 구현하는 게 좋을까 (테트리스의 블록을 구현) (추상화)
vs 분해해서 나열하는 것이 좋을까 (테트리스의 모든 속성을 쭉 코드화)

#### 바퀴 재발명 vs 자체 기술 구축

#### 타이어를 다시 발명할 필요는 없다
관심분야에 집중한다
하나에 온전히 집중할 필요가 있다
[[Reference#레퍼런스를 참고한다]]
[[Standard#manual의 장점]]

#### 가비지 컬랙터
가비지 컬랙터에게 맡겨놨던 짐들은 언젠가 다시 내가 감당해야 한다
vs
추상화를 통해 신경 쓸 부분을 줄임으로써 더 나은 프로그램이 된다

#### 한 곳만 깊게 파는 개발자와 넓고 얕게 파는 개발자에 대하여
예술적으로 소프트웨어를 만들고 싶은 개발자와 공학적으로 소프트웨어를 만드는 개발자

#### 직군별로 나눈 팀과 소프트웨어 단위로 나눈 팀
대기업에서는 파트가 아주 세부적으로 나눠져 있다
- 차에서 브레이크를 담당하는 팀이 있고, 엔진을 담당하는 팀이 따로 있을 것이다.
  데브옵스의 통합과 세부적인 전문화는 대척점에 있는 것인가? 둘 다 공생 가능한
  것인가?

자원이 쌓이면 모니터링 할 지표도 많아지고 알람도 많이 오는데 어떻게 감당하지?
- 그래서 조직이 커지면 각 영역이 분리되고 고도화된다

#### 소프트웨어의 단순성과 완전성

#### 컴퓨터가 기존 인간 시스템(휴지통) vs 컴퓨터 자체의 새로운 시스템

#### 개인정보보호 vs 데이터활용
개인정보를 개방해서 회사에서 활용하게 하는게 나을까
정보를 잘 숨기는게 나을까

회사에 내 개인정보를 넘긴다는게 거부감이 들고 신뢰가 생기지 않을텐데

데이터가 있어야 맞춤형 서비스가 가능해진다
개인정보를 어떻게 받을 수 있을까

#### FLoC
개인정보보호를 위해 구글에서 FLoC 라는 개념을 도입해 개인을 그룹으로 묶어 데이터를 관리한다고 한다
좋은데?

#### stable
안정적인 프로그램 구동을 위해 라이프 사이클을 파악해서 무조건 그 라이프 사이클
안에서 돌게 하면 한 라이프 사이클만 안정성이 확보되면 나머지도 안정성이 생긴다
vs
그 라이프 사이클 자체가 제대로 구별된 것이 맞는지도 알 수 없고, 한 라이프
사이클이 맞다고 나머지도 다 맞다고 할 수도 없다

#### 업무 중 문제가 발생했을 때 해결이 안되면
다른 업무를 일시 정지하고 다같이 해결하기
vs 각자 해결하기
다같이 해결하면 다른 사람들이 그 문제에 대해 알게 되고, 문제를 더 키우지 않을 수
있다
대신 작업이 중단되기 때문에 손실이 생긴다.

각자 해결하고 레포트를 작성한다면 그것을 모르는 사람이 있을 것이고, 같은 문제를
반복하게 된다.

도요타에서는 생산라인에서 다같이 해결하는 방식을 쓴다고 한다.
생산라인이라는 환경에만 효과적인 방법일까?

#### 전담팀 vs 융합팀
데브옵스는 되고 풀스택 개발자는 안된다?

팀이 기능별로 나누어져 있다면 기능이 커지면 팀이 다시 분리된다
외부 툴을 이용하다가 그 기능이 한 팀이 다룰 수 있을만큼 회사의 규모가 커지면 직접 개발한다
싱어송라이터, 제작/촬영 감독을 같이하는 것처럼 개발도 여러 영역을 맡을 수 있다
현업에서 한 포지션을 맡고 있지만 다른 분야에 조언을 잘 해주는 사람들도 있다.

근데 영세한 회사에서 풀스택을 고용해 노동착취를 한다는 시선도 있다.
사이즈가 작을 때는 둘 다 할 수 있긴 하다.

농심에서 면, 스프팀 따로 있는 것

sm의 잘하는 사람이 잘하는 것을 하고 한 곳에 집중하는 방식과 아이유처럼 노래를 하다가 작곡도 하고 작사도 하는 방식.
제네럴리스트와 스페셜리스트 사례는 많은 영역에서 같이 있는 고민인 것 같다.
음악 측에서는 작곡이라는게 절대적 우위가 있는게 아니라서 가수가 작곡을 충분히 할 수 있을 거 같다고 생각하는데, 소프트웨어도 마찬가지일 것 같다.
문제는 큰 기업에서는 규모 문제로 집중화가 불가피할 것 같다는 것인데.

#### 규모별 대응법이 다르다?
스타트업과 대기업은 일하는 방식이 달라야 하고, 팀의 구조도 다르다?
간단하게 구축 가능한 서비스를 큰 아키텍처를 미리 생각해서 구상할 필요 없다?
닭 잡는 칼로 소를 잡을 수 없다?
휴대폰 충전 케이블로 노트북을 충전할 수 없는 것처럼?

기술이 발전하면서 노트북 충전기가 간소화되거나 휴대폰 충전기가 발전해서 둘 다를
만족시키는 충전기가 나올 수 있다.
스타트업이 상대하는 고객과 대기업이 상대하는 고객은 다르지 않다.
절묘하게 하나로 통합되는 경우도 있고, 각 케이스가 완전히 구분되서 합쳐지지 않는
경우도 있다.

#### 전체적으로 떠오른 것이 생기면 기능 상관없이 구현하는 방식
vs 한 작업에만 집중하여 개발하는 방식
둘 다 되게 하려면?

####그동안의 리소스를 이용하는 것 vs 리소스와 별개로 새로운 것을 만드는 것
쌓고 쌓는 방식은 혼잡성을 증가시키고 옛날 것이 묻힌다

모듈 방식은 마이크로서비스. 이 또한 혼잡성을 증가시킨다

## 소프트웨어에서 창의성이 발휘되어야할 영역
원래 사용자들이 사용하던 방식, 기대하는 방식은 유지되어야 한다
뒤로가기를 누르면 이전 페이지로 가야 하고, 메뉴의 위치와 생김새는 기존의 틀과
다르면 유저가 헷갈려 한다

-----------------------------------------------------------------------

## Problem
- 소프트웨어에서 피드백을 어떻게 만들면 좋을까
    - how to make feedback loop with develop environment
- how to make easy deploy to lambda
- serverless vs kubernetes
- how to split microservice
- everything i want to use, but how to? and how to monitoring?
- *how to see infra at once*
    - how to know what kind of service is running?
    - 어떤 지표를 관리해야할지 생각하기
    - 다양한 데이터들을 어떻게 조합해서 보여줄 것인가
- 단순한 동작을 여러겹으로 겹치면 깔끔하고 보기도 좋지 않을까?
- I want to see well-designed programming
- terraform, git
    - aws, gcp distribute
    - aws codedeploy, github action
- 회사 서버 홈페이지가 느려졌다
  모든 로딩이 늦게 된다
  원인 파악을 어떻게 해야 될까
- 로그를 코드에 일일이 넣어야 하나? 다른 방법이 있나?
  Log write in file? Or there’s any other options?
- Linux, windows, mac
  Each other download package different
  It is ok? or Download by Git is better?
- All source code build to docker
  Docker run to ansible
  Ansible run to local(vagrant), remote(terraform)
- how to use for good inheritance
  module, capsule, inherited,
  object in python. variables referenced object.

#### 같이 일하고 싶은 개발자
- 사람을 잘 이해하는 개발자
- 배움을 계속 하는 사람
- 대화가 잘되는 사람
- 문제해결을 잘하는 사람
- 긍정적인 사람(건강한 사람)
- 다른 영역도 잘 이해하는 사람
- 읽기 좋은 코드를 쓰는 사람
- 서비스에 애착이 있는 사람
- 코드에 이유가 있는 사람

#### 예외 상황을 잘 다뤄야 실력
어려운 문제일수록 작게, 점진적으로 풀어가야하는데
알고리즘 문제를 이렇게 풀어보고 싶다

## develop
- 어떻게 구동되는지
- 어떻게 효율화할건지
- 어떻게 보기 좋게할건지
- 어떻게 피드백이 잘 되게 할건지

#### 정해진 요구사항을 빠르게 구현하는 것도 프로그래머의 능력 중 하나겠다
고객의 어렴풋하고 추상적인 계획을 구체화 시킬 수 있어야 한다
- 요구사항
- 다이어그램
- 테스트코드
- 동작하는 함수

#### 작업 하다가 쉬고 싶을 때 집중력이 높은 상태에서 깨지는 것이 안좋지만,
고장 난 테스트를 작성해서 다시 돌아 왔을 때 시작지점이 되게 할 수 있겠다

#### 테스트 케이스를 처음부터 최대한 적으려다 포모도로 프로젝트가 망했다.
필요한 기능을 확인하는 용도로 먼저 쓰고, 살을 붙여 나가는 방식으로 하자

함수는 하나의 동작
클래스는 하나의 변경 이유를 가진 객체
폴더는 하나의 의미
프로젝트는 하나의 목표

#### 코드 호출 그래프 보여주는 툴 찾기
- python: pycallgraph

#### Python HowDoI 라이브러리
라이브러리 사용자가 쓰지 않는 함수는 함수명 앞에 _(언더바)를 붙이고, 테스트 시
사용자가 쓰는 함수만을 통해 테스트한다고 한다

#### twelve factor app
https://12factor.net/ko/
웹앱처럼 서비스로 사용되는 소프트웨어에서 이 요구사항 12가지를 챙겨서 만들자는
방법론

#### 메소드 체이닝
기차 충돌
빌더 패턴
디미터의 법칙
함수형 패러다임

객체 자신 또는 내부의 정보로 이루어진 체이닝은 괜찮다?

객체 간 상태 변경 필요 시 어떻게 하는것이 효과적인가?
주인공이 적을 공격 했을 때
역할과 하는 일(책임)을 분리한다
주인공은 공격하는 일만 하고, 적은 이벤트에 대응하기만 하면 된다?
공격이 제대로 되었는지는 어디서 판단? 또 다른 객체?

흐름이 없는 코드, 상태가 없는 코드

#### 지금의 메소드 체이닝과 디미터 법칙의 차이
디미터 법칙은 호출한 객체의 함수가 다른 객체를 불러 처음 호출한 객체와 다른
객체를 부르기 위한 것이 되어버린 메소드 체이닝이 복잡도를 높이는 점을 지적한다
지금의 메소드 체이닝은 메소드가 기존에 호출했던 객체를 반환함으로써 가독성을
높이는 효과를 위해 사용되고 있다

## typescript
한 파일 안에 타입을 적어놓음으로써 변수 타입 확인을 쉽게 할 수 있다?
파일이 필요한 내용만 최소한 있는 것이 좋을까
관련 내용은 참조할 수 있게 같이 있는게 좋을까

## 컨셉을 가진 소프트웨어
풀속성 포켓몬만 모으는 사람처럼 컨셉을 가지면 재밌겠다
근데 시야가 좁아지고, 특정한 영역에 고립되는 것은 조심해야겠다

## 작업 처리라는게 이전에 8시간 만에 되었다고 다음에도 8시간에 되는 것이 아니다
7시간 동안 생각하다가 1시간만에 구현되도 8시간이고, 1시간 생각 후 2시간 동안 구현하다가 망해서 다시 3시간 생각하고 3시간 구현을 다시 해야 할 수도 있다.

업무에 분명히 데드라인이 있으면 해결의지가 강해져서 완수될 가능성은 높아지지만
안풀려서 데드라인 앞에서 급하게 정리한다고 적당히 수습해야 할 때도 있다

적당히 수습을 잘하는 것이 능력일까? 데드라인을 잘 설정하는 것이 능력일까?
둘 다 능력이 아니고 맞춰나가는 것이다.

마무리는 없으니 짧은 단계를 순환시켜서 계속 발전시키는 방향으로 가면 좋겠다

공수에 맞추지 말고 사이클 마감 시간의 기준으로 설정하면 되겠다
8시간 공수면 한 사이클에 끝날수도 있고 3 사이클을 돌릴 수도 있고.

일정 산출 기준을 이전 작업으로 잡고 할 수도, 내 기준으로 할 수도.

#### 정리, 정돈하는 것 자체가 가치를 가질 수 있다
큐레이션, 주식 정보 모음, 청소업체,
넓게 보면 작가, 사진작가 등 작가들도 세상에 떠있는 단어들을 잘 정리한 사람이라고
볼 수도 있지 않을까
세상에 없던 가치를 만들어낼 때도 있지만.

프리미어프로 같은 사람들이 많이 쓰는 도구를 쓰는 사람들이 왜 그 툴을 쓰는지 알면 되겠다

소프트웨어에서는 한 동작을 바꿀 때 다른 동작이 영향을 적게 받게 하는 것이 좋다

## 계속 관리해주지 않아도 유지되는 소프트웨어가 만들어질 수 있을까

## 닌텐도 게임은 버그가 없나?
예전 콘솔게임은 업데이트도 안되는데 버그를 어떻게 잡았나?
- 버그가 없지 않다

#### 깃헙과 오픈소스
오픈소스화를 한다고 정보가 알려지지 않는다
데이터는 찾으려는 의도가 있어야 찾을 수 있다

#### 확장성
50 유저를 상대로 운영하고 있지만 10만 유저를 상대할때도 문제가 생기지 않게
염두에 두고 수정한다. 하지만 임시방편으로 해결할 때도 있다.
그런 임시방편을 잘 리스트화해서 처리를 잘 해야겠다

#### 물건 정리와 클래스 설계가 비슷하다.
수많은 물건에 쌓인 집을 종류별, 용도별 정리하는 것

#### 변증법과 피드백이 닮았다

#### 웹 기반 노트의 한계
노션은 처음 로딩시간 때문에 답답함이 느껴진다
오프라인일 때 노트 접근이 안된다


## 쿠팡이 자체적으로 만든 서킷브레이커와 api gateway
직접 만든 사람들이 관리할 때는 잘 돌아가겠지만 사람이 바뀌면 기존 서비스보다 잘 돌아갈지는 의문이 든다
메뉴얼이나 구조가 잘 만들어져있으면 더 쉽게 관리가 되겠지만.

에러 감지 시스템에서 반복되는 오인식은 정인식이 되었을 때 무심코 넘기게 하는 사람이라서 생기는 문제가 있다
기계의 문제 + 사람의 문제이긴 하다

사람이 유연한 대처가 가능하지만 사람에게 어느 역할까지 맡겨야 좋을지는 모르겠다.
사람과 기계가 잘 상호작용이 이루어져야 할텐데

#### 블록체인 회사에 들어가서 일을 하게 되면
관리보다 코어 프로그램을 발전시키기 위한 개발을 하게 될텐데
내가 아는 지식으로 기존의 프로그램보다 더 나은 알고리즘을 만들 수 있을까?
수학적인 지식 없이?
블록체인에서 자원을 얻어가는 것만을 방지하기 위해(자발적인 참여를 위해) 코인같은 보상이 나오게 되었는데
보상 대신 다른 방법이 없을까?

#### 코드 줄 수가 적을수록 관리할 포인트가 줄어든다
1000페이지의 코드보다는 100페이지의 코드가 관리하기 쉽다
하지만 압축적이고 은밀한 코드를 남발하는 것보다는 풀어 쓰는 편이 낫다
추상화를 잘 쓰면 좋지만 난독화가 되지 않아야 한다
의미가 감추어지면 안된다
추상화 속에 전제조건이나 종속성이 숨을 수 있겠다
테스트코드를 먼저 적고 테스트 코드만 통과할 정도의 함수만 작성하고 문제가 생기면
추가하는 방식으로 한다
주먹구구와 점진적 개선의 차이는 뭘까
\> 임기응변은 규범에 맞추어 자신을 제대로 세울 수 있는 경지를 완수한 사람에게나 가능한, 최후의 경지 - 공자

#### 다양하지만 넘치지 않는 함수
다양한 케이스를 커버할 정도로 추상화시켜야 하지만 요구받지 않은 사항까지
예상해서 만들면 안된다

한 함수가 여러 상황은 커버하지만
당장은 필요없는 함수는 만들 필요 없다라고 하면 좀 쉽네

제네릭 프로그래밍과 정적 타입 언어가 동적 언어와 비슷한 걸 하려는 것 같다

#### 업무일지는 업데이트 단위로 한 페이지를 작성하고
업데이트 이후 한 페이지의 내용을 재검토해야 한다
실제로 사용해보면서 테스트해야 한다
하지만 업데이트 후 기존동작도 이상없는지 확인해야 한다
사이드이펙트가 없도록 설계하는 것이 좋겠다
관계있는 부분을 바로 알 수 있으면 좋겠다
업데이트 후 체크리스트를 잘 관리하면 일이 수월해 질 것이다

커밋할 때 빔으로 켜서 Todo에서 메모하던걸 붙여넣으면 좋겠다

-----------------------------------------------------------------------

## 사람은 주체다
소프트웨어는 객체로 이루어진다

소프트웨어는 객체로 남아있어도 되는 것인가?
객체가 주체가 되려면 어떻게 해야하나

#### 피드백을 해달라고 할 때 해줄 수 있는 여유
주니어가 도메인에 대한 정보, 업무 노하우, 관련지식, 여태의 경험을 공유해달라고 할 때
딱 정리해서 알려줄 수 있도록 하면 좋겠다

#### 스페셜리스트, 제네럴리스트
한 도메인에 오래 있어서 전문가가 되는거라면 나는 전문가가 안되겠다.
한 분야의 스페셜리스트보다는 제네럴리스트가 되겠다.
예전부터 스페셜리스트, 제네럴리스트에 대한 얘기는 있었는데 도메인에 묶인 전문가의 얘기를 듣고 그럴싸하게 생각해버렸다

어디에 둬도 애매한 사람이 아니라 어디에 둬도 잘하는 사람이 되야겠다

#### 넓게 두루두루 하려는 개발자 vs 한 곳만 깊게 파는 개발자
백엔드도 제대로 못하면서 이것 저것 다 하려고 한다 vs 여러 분야를 다 내가
신경쓰고 싶다
풀스택 개발자를 말도 안되는 것이라고 한다
백엔드와 프론트엔드만 하는 사람들보다 못하는 이도 저도 안되는 사람이라고 한다
엉성하다고 한다
기획자와 개발자를 나눔으로써 더 큰 소프트웨어가 된단다
좁은 곳에 집중해야 깊게 팔 수 있단다

개발자가 제품에도 신경을 써야 한다
코딩만 하면 안된다고 한다

그러면 기획자와 개발자는 나눠도 되고 코딩과 일련의 작업은 나누면 안되는 것인가?
그럴리가 없다

T자 커리어가 개발자들 사이에서 나오고 있다. 깊이 하나를 박아놓고 양 옆도 넓히는
것
좁고 깊은 것이 효율적이라는 일련의 공감대가 있기 때문에 이런 이야기가 나온
것이겠지
좁게 깊게 파되, 넓이도 가져갈 수 있는 방법은?


좁은 영역이라는 것의 경계는?
글씨를 잘 써서 글씨만 대신 써주는 사람이 있다고 한다
사람은 경계가 없고 모두 개별적으로 인식해야 할 것 같다

말을 아끼는 것이 좋다고 생각했었는데 자기 어필은 해야 할 것 같다
아는 것을 떠벌리고 싶진 않은데 내가 할 수 있는 것은 알려야 한다

원하는 것이 있을 때 정확히 원하는 것을 얻지 못할 때 타협하는 것이
도망치는 것이 아니라 쫓을 수 없는 완벽이라는 지향점을 놓아주는 것이어야 한다.

현재에 충실하되, 미래를 대비

#### 개발자는 이직을 하면 그 빈자리가 큰 구멍이 될까 아니면 누군가 대체할 수 있을까
내가 없으면 안돌아가도 문제고
누구나 나를 대체할 수 있어도 문제다

사람이 100% 대체되는 것은 불가능 하지만.

Geeknews에서 나를 대체 가능하게끔 일을 하자는 글을 봤는데 아주 마음에 들었다.
내 지식을 문서화하고, 내 경험을 다른 사람과 나눔으로써 나에게도 객관적인 지식이
쌓이고, 회사에도 객관적인 지식이 쌓인다는 태도였다.
- https://news.hada.io/topic?id=4442&utm_source=weekly&utm_medium=email&utm_campaign=202125

#### github workflow
github issues: ghi 로 확인
git commit - changelog - release: 한번에 가능
github pull request: cli로 가능
github actions: action-cli로 실시간 확인 가능

issue 확인하거나 등록하고, 커밋하고, 풀리퀘스트 올리면 액션 실행되고
액션 모니터링 하면서 확인되면 코드리뷰 신청 가는거 확인
코드리뷰 완료되면 머지까지 한 곳에서 확인

## 4k + 정보 탐색 + 역사 확인 + IoT = 초능력자
염력 - IoT로 가능
순간이동 - VR 또는 4k 영상으로 간접체험 + 교통수단의 발전으로 초고속 이동
동물과의 대화 - 왜 하는거지
투명인간 - 불법
시간여행 - 역사 이야기
변신술 - 인터넷 세상
독심술 - 정보 탐색으로 추론
공중부양 - 공간의 자유도를 높이는 것 -> 순간이동과 비슷 -> VR

#### 의사 결정 트리로 시스템 모니터링 하면 되려나
load average yes
- cpu bound
- io bound

load average no
- network
근데 이러면 dfs로 전체탐색을 해야하겠네

#### dash(-) vs underscore(_)
dash
- 타이핑이 쉽다
- 일반인에게 익숙하다

underscore
- 파일 시스템에서 공백 대신 종종 사용된다
- 띄어쓰기와 비슷해보인다

둘 다 camelCase, PascalCase 보다 직관적이다
그럼에도 golang은 camel,Pascal을 쓰고
파이썬은 underscore가 특별한 예약어다.

#### space vs tab
- tab can line cleary
- space little more light

#### 3개의 의견
서로를 견제하며, 지원하고, 공유하는 구조가 좋은 가치를 만들기에
좋은 구조인 것 같다
쿠버네티스를 이렇게 사용할 수 있을까

#### 먼거리에 이동 속도가 가장 빠른 비행기.
프랑스에서는 가까운 거리에서는 비행기 이동을 금지하게 되었다
기술 발전이 인간을 이롭게 하지만, 기후에 안좋은 영향을 미치지 않도록 신경써야한다
소프트웨어에서 탄소배출은 어떤 관계가 있을까
전기를 소모한다.
저전력 머신에서 돌아가면 될까
저전력을 많이 만들면 총 사용량은 비슷할건데
한 서비스가 쓰는 리소스를 줄이면 한 피씨에 사용되는 서비스가 많아질 수 있다

#### 이 세상 모든 것은 연결되어있다
소프트웨어에서도 종속성이 없을 수 없다
의존성이 항상 필요하다

효율적인 구성으로 족쇄가 되지 않아야 한다

그리고 모든 연결은 상호간 약속이 되있어야 소통이 원활해진다
HTTP 프로토콜, ITU 주파수 대역 등의 규약은 제약이 아니라 통신을 원활하게 하기
위한 약속이고, 이를 통해 효과적으로 통신할 수 있게 된다

그룹을 대표하는 대표를 뽑아서 소통하는 것이 인류의 해답 - 간접 민주주의
그룹의 대표가 그룹을 정말로 잘 이해해야 한다. 그것이 현실의 문제점


## Regacy

#### 기존 리소스 활용 최대화
프로젝트 관리 툴 있다
고객 관리 대시보드 있다
회사 직원 관리 대시보드 있다
깃헙 관리 대시보드 있다
프로젝트들을 관리하는 대시보드도 있다

프로젝트를 하면서 쌓인 리소스를 활용하고 싶다
메타 프로젝트 관리 툴도 분명 있을 것이다
근데 없다. 잘 안찾아진다
소스코드도 활용하고, 서비스로 만들어진 것도 다시 활용할 수 있고
기존 서비스에 접근해서 쓸 수도 있고
간단한 함수를 가져와서 쓸 수도 있고
설정파일 가져와 쓸 수 있고
컨테이너 이미지 가져와 쓸 수 있고

#### 레거시의 가치, 소중함과 한계
개발자는 방금 작성한 코드도 모두 레거시로 느껴진다

기존의 프로그램을 개선하는 것보다 아예 새로 짜는 것을 좋아한다
하지만 새로 짜는 것이 기존 코드를 넘어서기는 아주 힘든 일이 될 수도 있다
새로 짜는 것은 자기 마음껏 할 수 있는 부분이 늘지만 기존의 문제 해결을 모두 따라가야 하는 작업량의 압박도 있다
모든 것을 새로 시작하는 것은 깔끔하고, 얽매는 것도 없어 마음이 편하다는 밝은 면이 있지만, 또 다른 레거시를 쌓는 작업이 될 수 있다

레거시는 계속 쌓이게 되고, 그래서 처음부터 클린 코드를 염두에 두고 짜는 것이 좋은 소프트웨어를 위해서는 필요하다

소프트웨어 개발에서 프로그래밍은 여러 축 중 한 축이고 코딩은 프로그래밍의 한 축이다
코딩이 프로그래밍의 전부는 아니지만 중요한 부분이고, 잘해야 되는 부분이다.
코더라고 비난하기도 하지만 코딩이라도 잘하는 사람이 더러운 코드를 짜는
아키텍처보다는 나을 수도 있겠다
코딩에만 몰두하고 디자인에는 신경 안쓰는 것도 문제지만 코드를 쉽게 생각하고,
코드도 못짜면서 다른 부분을 하려고 하냐고 하는 것은 개발에 대한 회의를 일으킨다

#### original program vs new program
어떤 것을 위해 프로그램이 만들어지면 그것에서 더 필요한 기능을 느끼고 새로
기능을 추가하여 프로그램을 만들어 기존 프로그램보다 매력적이게 된 프로그램이
있고
원래 프로그램이 믹강한 기술을 가지고 있어 새로 생긴 것들이 영향력을 못 일으키는
경우도 있다.

전자인 경우에서 새로운 기능을 가진 프로그램을 어떻게 찾고 어떻게 기능을 써볼 수
있을까? 계속 모니터링 할 수도 없는 노릇인데... 키워드로 알림을 만들어 놓아야
하려나

#### 생각난걸 바로 만들고 점점 개선시키려면
바로 만드는 것이 빨라야 한다 -> 템플릿
개선 -> 변화하기 쉬운 간단한 형태여야 한다


#### 구글은 그들의 사이드 프로젝트를 어떻게 관리하나?
그냥 사람들 입소문으로 전달하나
레포지토리에 묶여있나
새로운 툴을 만들어서 관리하나

검색 시 너무 많은 데이터가 문제라면
필터를 많이 만들어서 노이즈를 제거하고 필터를 조금씩 푼다

적은 데이터라면 비슷한 영역을 캐치한다

#### 어떻게 정보를 공유하고 확산하는 것이 효과적일까
건물 붕괴 사고 후 법이 개정되면 하도급 업체까지 그 정보를 다 알 수 있을까?
새로운 무엇인가가 나오면 그것에 대해 어떻게 알 수 있을까? 관리자가 따로 있다면
그 사람은 새로운 것을 계속 확인해야하니까 알 수 있다고 해도 일반 노동자들이 그
새로운 정보를 계속 확인하지는 않을 것 같다. 그렇다고 정부 사이트에 새로운
소식들을 계속 올린다면 정부페이지만 확인하면 된다는 인식을 가지고 확인할 수
있겠지만 정부 사이트에 올라오는 글들이 너무 많아지면 정작 자신에게 필요한 정보를
못 찾을 수도 있다.

#### 안좋은 레거시의 예
윈도우

#### 개발자의 8가지 체격훈련
야구선수에게는 체력, 구질관리, 운

개발: 논리력, 연상력, 문해력, 관찰력, 집중력, 호기심

#### go 에서 외부공개함수는 대문자로 시작하는데
메인로직 외에는 공개하지 않도록 짜야겠다

근데 인터페이스로 만들면 다 공개해야되는거 아닌가
- 인터페이스로 쓰는건 공개하고, 인터페이스 함수 내에 있는 것은 감추면 되겠다
