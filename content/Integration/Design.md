---
title: Design
summary:
date: 2020-05-18 15:53:37 +0100
updated: 2025-07-23 10:21:39 +0900
tags: integration
---

## 디자인 아이디어

- 내가 좋아하는 이미지
	- 오뚝이, 나무, 오타니, 야마모토, 
	- 여유, 관심, 사랑, 유머, 용기, 표현력, 솔직함, 적극성
	- 몰입, 편집, 정리, 밸런스, 간결, 오뚝이 | 변증법 | 전체 | 하루 | 피드백 | 순환
	- 초록색, 노란색, 빨간색, 보라색
	- 그림자 명암, 그라데이션, 로고에 대한 시대상을 따라간다?
	- css로 명암을 요새는 어떻게 표현하나
- 로고, 톤, 앱이름, 설명의 일관성
- 톤은 맞추되 깊이감을 만든다
- 디자인 시스템 만들어보기
	- 레퍼런스를 모은다
	- 명암
	- 그라데이션
	- 원근감 입체감
	- shadcn ui 가 사실 더 좋다
- 디자인
	- 위계가 중요하다
		- 크기
		- 컬러
		- 레이아웃
		- 질감
		- 뎁스 (원근, 아웃포커싱)
		- 여백
		- 움직임
		- 크게 했다가 작게했다가 크게하는 식의 리듬을 넣을 수도 있다
	- 디자인 : 컨셉 -> 설계 -> 구도 -> 배치 -> 색감
	- 미니멀한 인테리어나 건축을 디자인에 접목하면 좋을 것 같다
	- 브라운톤 또는 화이트톤
	- 라이트모드에서는 더 진한게 객체인데 다크모드에서는 더 연한게 객체다 이게 맞나
	- 크기(굵기) 위치 색깔의 레이어드
	- 색에서 명도가 글자에서 굵기이려나
- 디자인 시스템
	- 최신 css 적극 활용
	- shadcn ui나 https://www.chainlift.io/liftkit
	- https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- 디자인 아이디어
	- 톤은 맞추되 깊이감을 만든다
	- 크기(굵기) 위치 색깔의 레이어드
	- 색에서 명도가 글자에서 굵기이려나
- 시대를 관통하는 디자인들을 모으고 싶다
	- 의자나 가구같은 빈티지
	- 디터람스의 미니멀 디자인
	- 뼈대가 먼저다
- 흰색, 검은색, 키컬러, 투명도
- 자연적인 요소
	- 곡선
	- 음영
	- 기능을 디자인으로 표시
- 기승전결, 색약, 컬러스케일, 육하원칙

#### 내 제품의 디자인 시스템을 만든다
- [Design](Design.md)
- 키컬러
- 인스타에 올릴 사진에 대한 감각
- 앱도 마찬가지로 같은 테마를 갖도록

![](Pasted%20image%2020260221002755.png)
![](Pasted%20image%2020260221002808.png)
![](Pasted%20image%2020260208003137.png)
![](Pasted%20image%2020260208003139.png)


## Basic

- 그림자 - 없애서 심플하게 가고 싶은데 자연은 모두 명암이 있다
- 요소 간의 간격
- 곡률 - 곡선은 자연의 아름다운 요소
- 시스템 컬러가 있기 때문에 다크/화이트를 메인으로 하되 키 컬러는 살짝만 넣는다
- 모바일 퍼스트

#### 접근성 챙기기

인터넷 상에서는 장애인과 비장애인의 경계가 없다 (커뮤니케이션에 있어서),
접근성 기능이 제한되어 있다면 아예 접근할 수가 없게 된다.
접근성은 최소기능이 아니라 필수기능이어야 한다.
벽이 아니라 다리가되고, 다리보다는 평평한 길이 되어야 한다.

- [W3C 접근성 검사기](https://jigsaw.w3.org/css-validator/)
- [WAVE 접근성 검사기](https://wave.webaim.org/)
- [네이버 접근성 센터](https://nuli.navercorp.com/education/disabilityType)
- [명암비 조합 파인더](https://app.contrast-finder.org/?lang=ko)
- [웹 접근성 가이드라인](http://web-accessibility.carnegiemuseums.org/code/navigation/)

#### 스크린리더가 네비게이션을 읽지 않도록 해야한다

#### 텍스트로 만든 링크 자체가 의미가 가지게 만들어야 한다

#### 컬러만으로 의미를 전달하려고 하면 색맹에게 불편하다

#### 글자마크(글자로 되어있는 메뉴) 가벼운 그림으로 표시하는게 국가 상관없이 이해할 수 있겠다

#### Typography

#### Should have make fail return button

#### 목록 창에서 페이징과 자동 로딩기능 필요

#### 로빈 윌리엄스의 4대 기본 원칙
- 근접성 - 서로 관련된 항목들은 가까이 배치 (정보의 조직화)
- 정렬 - 보이지 않는 선(그리드)를 설정해서 질서를 부여
- 반복 - 일관성
- 대비 - 정보의 위계 설정

#### 사용자 경험 및 시선 유도 규칙
- 시각적 위계 - 사용자가 무엇을 먼저 봐야하는지 순서를 정해준다
- F-패턴 - 좌에서 우로, 위에서 아래로 보는 규칙이 있다
- Z-패턴 - 글자를 Z자 형태로 시선을 이동하며 훑어본다
- 게슈탈트 심리학 - 인간이 시각 정보를 그룹화하여 인식하려고 하는 것을 적용한 법칙

## Color

텔레비전 모니터나 조명 등에서, 다른 색의 불빛을 겹쳐 새로운 색을 만드는 가산혼합의 삼원색은, 통상 빨강·초록·파랑의 삼색이다.
그림물감 혼합, 칼라 인쇄로 색 잉크 감산혼합의 경우의 삼원색은, 시안, 마젠타·노랑이다.
![Color](../img/origin_color.jpeg)

가산혼합

- 빨강 `#FF0000`
- 초록 `#00FF00`
- 파랑 `#0000FF`

감산혼합

- 시안 `#00FFFF`
- 마젠타 `#FF00FF`
- 노랑 `#FFFF00`

#### 색상환
![https://kr.pinterest.com/pin/500321839837436132/](색상환CMYK_ai.jpeg)


- [색 쓰는 법](https://www.youtube.com/watch?v=GMAsjQGAAGM)
	- 단색 -> 유사색 -> 보색 -> 분할 보색
	- 기본은 단색에 채도, 명도만 바꿔줘도 괜찮아보임
	- 그라디언트 쓸 때 유사색 쓰면 괜찮아보임
	- 빨강,노랑,초록은 단색으로 쓰기 안좋다고 피하는게 좋다고 한다. 다른색을 좀 섞어줘도 됨


## Font

- 굴림은 산세리프. 꽉 찬 글씨. 둥글둥글한 글씨
	- 한글에서는 구리게 보인다
	- 똑같은 자음의 크기가 글자마다 달라진다
	- 가상의 동일한 사각형 안에 꽉꽉 채워 넣으려고 해서 글자 간격이 멀어진다
	- 마이크로소프트가 기본글꼴로 지정했었다
	- 기본글꼴이어서 너무 자주보는 것도 문제다.
	- 2008년 이후 윈도우 기본글꼴이 맑은 고딕이 되었다.
	- 복고 느낌, 가독성이 높다고 볼 수도 있다. 큼직큼직해서

- [What are those system fonts?](https://css-tricks.com/snippets/css/system-font-stack/)

## Darkmode

- Don't use a perfect black
- low 채도(Saturation), 명도(Brightness)
- text, background contrast ratio minimum 15.1:1
- depth, visual hierarchy
- `background: #000; color: #fff;`

## [[Video]]

## in WEB

#### what is good?

- round vs non-round
- shadow
- font-size

#### side toc convert size

15" full-size 1900 half-size 950
content full-size 1170
middle-size 750
mobile-size 780

gitlab convert line 990
subicura convert line 1100
evan moon convert line 770

i want when 15" monitor half size view is ... index view is better?
--> toc size 20%, screen < 1200

#### anchor offset

```
:target::before {
 content: '';
 display: block;
 height:  180px;
 margin-top: -180px;
}
```

- https://stackoverflow.com/questions/10732690/offsetting-an-html-anchor-to-adjust-for-fixed-header

#### font-size

font-size 19 < x < 28
medium 21px mobile:18px
brunch

- line-height

#### 그림 속 색깔

무채색 속 하나의 유채색을 집어넣으면 색이 더 부각되고 멋져보인다

#### 웹페이지를 영화의 미장센처럼 꾸민다?

사진처럼 꾸민다?
인류가 가장 친숙한 2d 평면 시각체는 무엇?
2d가 좋을까 3d가 좋을까

시간, 공간적 특성을 담는다
그리드로 다양한 환경에 구애받지 않도록 한다

## Reference

- https://csslayout.io/patterns/
- [디자인 시스템을 구성하는 방법](https://medium.com/guleum/디자인-시스템을-구성하는-방법-beefa8214884)
- [디자인 시각적 요소들](https://brunch.co.kr/@shaun/40)
- [웹폰트](https://wit.nts-corp.com/2017/02/13/4258)
- [안전하게 따라 할 수 있는 비주얼 디자인 규칙들](https://news.hada.io/topic?id=8573)
