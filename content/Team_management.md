---
title   : Teamwork
summary :
date    : 2020-08-08 11:18:22 +0100
updated : 2021-05-05 20:10:32 +0100
tags    : communication
---

회사별 룰
- 코딩 컨벤션
- 빌드룰
- 커밋룰
    - versionning
- 이슈관리룰
- 문서작성룰
- 핫픽스룰

## Convention
## Commit
with semantic versioning
     and changelog

툴을 이용해서 커밋을 하면 컨벤션 지키기도 쉽고 관리도 쉬워지겠다
- standard-version - versioning, changelog, commit
    - 커밋을 인터랙티브하게 했으면 좋겠는데 그냥 설정파일 기반으로 한다
- semantic-release - standard-version + publishing(release)
- *git cz*
    - need package.json file
    - `echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc'`
    - `-a` option 넣으니 된다
    - 이건 커밋만 해주고 체인지로그는 안바꿔준다
        - 체인지로그와 버저닝은 github actions에서 해주는게 좋겠다
- git-chglog
    - need config file
- release-it - versioning, changelog, publishing(release)

#### Conventional commits
feat()
fix
docs
refactor
style
test
chore

```
feat(lang): add korean language

BREAKING CHANGE: new release (options)
```

feat은 minor, fix는 patch, BREAKING CHANGE는 major를 변경하는 식이다.

> https://www.conventionalcommits.org/ko/v1.0.0/

#### keep a changelog (change log convention)
Added
Changed
Deprecated
Removed
Fixed
Security

> https://keepachangelog.com/en/1.0.0/

#### semantic versioning
javascript 에서는 편의를 위한 라이브러리가 많이 있는데
golang에서도 각각 따로 구현되어있다
changelog를 자동 생성해주고
versioning을 도와주고 lint 해주고

- 푸시를 할 때 태그를 이용해서 버전을 직접 입력해줘야 하나?
    - default는 마지막 patch로 한다
    - CI로 설정해놓으면 commit 메시지를 읽고 자동 변경
    - 처음에 v0.0.0 태그와 latest 태그만 생성해준다
- changelog는 직접 입력하는건가?
    - commit message로 template을 정해서 적는다

keepachangelog template
bumper

## Code review
## API document

#### 그 기술을 도입하기 위해 회의한 회의록이나 고려사항들을 볼 수 있을까


## 코드 파악하기
특정 부분을 돌려보고 디버깅 해보기
특정 부분을 수정하려면 어떻게해야할지 생각해보기


## Team
#### 같은 영역에 있는 개발자들끼리 한 동영상으로 같이 스터디
