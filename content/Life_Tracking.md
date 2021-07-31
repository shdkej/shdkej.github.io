---
title   : Life Tracking
summary : 어떻게 살고 있는지 알고 싶다
date    : 2020-12-20 14:46:34 +0100
updated : 2021-07-22 18:02:29 +0900
tags    :
parent  : [[Blogging]]
---

## life Tracking
shortcut setting
news, post, e-book viewer composing
행동을 데이터화해서 기록을 남기는 방법 알아보기

#### manage point
- [ ] file, music, source-file
- [X] photo,
- [ ] note,
- [X] calendar,
- [X] reminder,
- [X] todo(pomodoro),
- [ ] log(internet),
- [ ] bookmark,
- [ ] movie
- [ ] book
- [ ] coding
- [ ] place, map - google timeline
- [X] money,
- [ ] health,
- [ ] sleep
- [ ] food

- note, file, photo -> cloud
- pomodoro -> todo -> note -> cloud
pdf를 관리하는 것은 플렉슬로 하면 될까
저장한 웹페이지 관리 어떻게 하지 -> drive

보관을 무슨 기준으로 하지?
모두 보관해놓으면 눈에 안띄어서 까먹지 않을까?
보관하지 않을 기준은?

#### exclude
- water
- read article
- watch tv

#### 캘린더에 그날의
- 식단
- 가계부
- 갔던 장소
- 검색 기록
- 일기
- health
- 이벤트
- todo, reminder

#### less manage things.
- I want to reduce item that i should have manage something.
- need manage things in computer.
 - mail
 - docker
 - system resource
 - github
 - note

## 하루 한줄 요약
컴퓨터 한 시간
움직인 시간

#### daily tracking
누적데이터를 리스트에 적고 옆에 그 날 추가된 것을 표시하는 식으로 해야
추세가 확인되어서 좋을 것 같다
일별로 할까 주별로 할까
데이터 모으는 것은 일별로 하고 주별로 보여주게 하면 좋을까
일단 데이터를 모아야 한다

sleep
- 자고 일어나면 데이터 생성된다
- 수면 완료를 누르면 메시지를 보낸다 (캘린더에 쓴다)
- 메시지를 읽어서 csv에 쓴다
- csv를 읽어서 정리한다

- primenap을 이용해 월말에 csv를 내보내고 화면 캡처를 한다
- csv를 읽어 보고서에 등록한다

- [ ] 내 수면 사이클 주기는?

phone
- DriveSync, FolderSync 앱을 이용해서 구글드라이브와 연동

- 장소, 컨디션, 날씨, 사진
    - 20/12/11: 🛌 9.0 💻 6.1 📱 3.1 🥢 2600 🦶 6900 📚 160 🎞️ 1 💵 40,000 🚀 +26
    - 20/12/10: 🛌 9.0 💻 6.1 📱 3.1 🥢 2600 🦶 6900 📚 160 🎞️ 1 💵 40,000 🚀 +26
+ 읽은 책 이름, 영화 제목, 먹은 음식, 작업 내용

캘린더에 기록되면 -> 스프레드시트에 쓰기

#### daily tracking
뭘 먹었는지 기록하기에는 사진을 찍는게 제일 간편할 것 같은데
사진으로 하루를 요약하면 한눈에 보기 힘들지 않을까?

사진은 구글킵에 넣으면 출처 입력 된다
웹 캡쳐본은 구글킵에 넣는다
찍은 사진은 구글포토에 들어간다
미래에 할 것들을 모아두는 곳은 노션

구글포토
구글드라이브 - 로컬위키폴더, 로컬워킹스페이스
            백업 - 원드라이브
                휴대폰폴더
구글캘린더
구글킵
지메일
피들리
깃헙

사진, 파일, 문서, 북마크
하나의 소스에서 모든 것을 관리하고 싶은데
노션에서 구글드라이브도 되고, 사진도 되고, 텍스트도 되고, 달력도 된다
근데 노트를 연동하거나 블로그 포스트로 바로 올리는 것은 안된다
북마크를 크롬에서 바로 검색할 수는 없다

카테고리를 줄이려니까 또 따로 뺐으면 좋겠는 카테고리가 걸린다
정보탭으로만 구성하려고 했는데, 음식정보, 생활정보, 집정보는 따로 모아서
보고싶어진다.

> every file organize
> - file - onedrive
> - *image - clutter*
> - *photo - google photo*
> - text note - onedrive
> - *todolist - app*
> - *bookmark - google*

> note specification
> constant
> planning
> archive
> update
> list

> make link each file

#### todo with timer
인박스에 있던 것을 진행중으로 옮기면 타이머를 돌리게 하기
완료로 옮기면 타이머 종료
중지/다시시작 필요

INBOX.md 에 있는 파일에서 단축키 입력하면 작업 시작
작업을 시작하면 캘린더에 올리기. 시간 현재시간 추가
캘린더와 텍스트 동시에 생성해서 텍스트파일은 리포트로 만들어야 함
    - 캘린더를 파싱해서 텍스트파일로 만들면 되지 않을까?

작업 완료 시 어떻게 표시할까

#### task management in vim
command td
quick add task to calendar
pomodoro start
> it can be check start time. but how can track finish time?

task, doing, done
write task category?
develop: do something
personal: write something

use to verb: read something, write something, do something, develop something

#### sleep tracker
smart alarm
sound check
movement check
report, export

alarm
특정시간에 한번만 알려주는 알람
수면시작을 누르면 일어나는 시간 계산해주는 알람
아침 알람 시 천천히 일어날 수 있도록 해주는 알람

todo 등록하면 자동 리마인더
집에 오면 리마인더

#### 메시지 100% 수신하기
이메일
휴대폰
메신저
업무 시에는 메신저를 통일 시킨다
개인적으로는 이메일을 대표적인 수단으로 설정한다.
리마인더를 이메일로 보낸다

#### quantified self
이런게 있었다
생각하던 데일리 트래킹을 이미 하고 있는 사람들이 있었다
- https://quantifiedself.com/show-and-tell/

#### 류비셰프의 시간 관리법
https://johngrib.github.io/wiki/book-lyubishev/

#### rss로 안되는 업데이트 알림 받는 방법 확인
좋아하는 작가의 신작
- 알라딘, 리디북스에서 신간 알림 됨
일반 도서, IT 도서 신간 알림 봇 있음
내가 쓰는 소프트웨어 릴리즈 소식

난 사진도 많이 안찍고 sns도 많이 안해서 정보가 적고 잘 모여있는 편인데도 한 곳에
모으기가 힘들다
