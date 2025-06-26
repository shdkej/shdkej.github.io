---
title   : Open Source
summary : Open is powerful
date    : 2020-07-26 10:39:37 +0100
updated : 2021-07-14 17:59:41 +0900
tags    : communication
---

## 오픈소스 기여하기
- 오픈소스의 배경지식을 알아두는게 좋다
- 작은 부분에서 시작
- 먼저 흐름을 파악한다
- 디버그, 브레이크 포인트를 사용하여 호출 스택 확인
- 필요한 부분을 먼저 본다
- 구조를 그리면서 파악한다
- 나라면 어떻게 할지 생각한다
- 작성자의 습관, 방식을 파악한다
 - ( if문을 어떻게 사용하는지, 함수를 어떻게 사용하는지, 호출을 어떤식으로 하는지, 테스트를 어떻게 하는지)
- 비슷한 내용의 다른 것들을 찾아본다.
 - (레퍼런스 확인)

## Open-source - Contributed all people
there's license
almost free, but no everything is free.

## License
- MIT
- Apache
- GPL 사용한 프로그램을 모두 공개해달라는 적극적 오픈소스 요구의 목적
- LGPL 개선한 소스에 대해 공유해달라는 요청
- AGPL 서버에서 사용하더라도 공유해달라는 것
- 그 외 오픈소스를 쓴 것에 대해 명시하도록 요청

## 소프트웨어 개방의 단점
- 자신들만의 기술이 공개되어 다른 기업에서 이용하면 자신의 기업이 메리트가 없어짐
    - 핵심기술은 비공개로 하고 API만 개방하면 괜찮을까
- 허점을 들킬 수 있음

#### 장점
- 사용자 증가
- 생각지 못했던 기술이 더해져서 외연 확장
    - 직접 개발하지 않은 것들이 사용자 필요에 의해 개발될 수 있다

B2B, B2C 에 따라서 가치가 달라질까? B2B에서는 개방화를 할 필요가 없을까?

## 버저닝
versioning 할 때 1.2.x 로 해서 x부분은 오류 수정용으로 해서 하위호환성을 무조건 유지하도록 하면
버그 픽스도 되고, 업그레이드도 안해도 되도록 할 수 있지 않을까

사용할때는 1.2.x로 해놓으면 1.2.x 는 다 받을 수 있게 설정해놔야 한다.
- 시맨틱버저닝이 내가 생각하던대로 구성된 것이었다

하나의 기능에 버전이 하나 오르는 것까지는 납득된다
근데 하나의 기능이 많은 코드로 이루어지면 여러 커밋으로 이루어질텐데
그러면 커밋하고 PR한다고 버저닝이 되는게 아니라
실제 기능이 동작해야 버전이 올랐으면 좋겠다

#### 오픈소스 추천 사이트
- https://opensourcestash.com/
- https://free-for.dev/#/

[[Cleaning#Used Tool]]

## Reference
- [AWS와 Elastic 라이센스 분쟁 - by outsider](https://blog.outsider.ne.kr/1533)
- [AWS와 Elastic 라이센스 분쟁 - by opsnow](https://blog.opsnow.com/35)
- [오픈소스 릴리즈 팁](https://spoqa.github.io/2017/09/28/foss-release-tips.html)
- [오픈소스 구조와 모듈 파악하기](https://kdydesign.github.io/2020/10/19/open-source-flow/)
- [오픈소스 컨트리뷰터 찾기](https://www.sosconhistory.net/soscon2019/content/data/session/Day%201_1630_1.pdf)
- [오픈소스 개발기](https://deview.kr/data/deview/session/attach/1500_T1_박재성_깃헙%204.4K%20스타%20billboard.js%20메인테이너가%20들려주는%20오픈소스%20개발기.pdf)

인기 있는 오픈소스 프로젝트 만드는 팁 | GeekNews
[https://news.hada.io/topic?id=5379](https://news.hada.io/topic?id=5379)
