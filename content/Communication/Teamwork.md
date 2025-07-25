---
title   : Teamwork
summary : 여러 사람들과 일할 때의 기술과 배움
date    : 2020-08-08 11:18:22 +0100
updated : 2025-07-23 10:01:02 +0900
tags    : communication
---

## Convention
회사별 룰
- 코딩 컨벤션
- 빌드룰
- 커밋룰
    - versionning
- 이슈관리룰
- 문서작성룰
- 핫픽스룰

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

#### 코드리뷰 어려운점

어떤 이슈를 해결하기 위한것인지 파악해야함
바뀐 파일들이 많으면 순서가 있으면 좋겠음
너무 많은 PR을 만들면 머지를 해야할게 많아져서 귀찮아져서 하나의 PR로 만드는데 이렇게 되면 변경사항이 너무 많아져서 놓치는 부분이 생길 수 밖에 없다

- 배포가 브랜치 단위라서 PR이 묶인다?

## API document
[[Document]]

#### 그 기술을 도입하기 위해 회의한 회의록이나 고려사항들을 볼 수 있을까


## 코드 파악하기
특정 부분을 돌려보고 디버깅 해보기
특정 부분을 수정하려면 어떻게해야할지 생각해보기

#### 업무 할당 받으면
1. 일단 그림 그려보고 실행 목록 세워보기
    - 1-1. 레퍼런스 확인하기
2. 구현하기
    - 2-2. 문서화 확인
3. 커밋으로 작업 내용 공유

#### 코드 파악 시 힘든 점
아키텍처가 일관성을 가지는게 제일 중요할 것 같다.
- 분기를 어디서 할지 결정하는게 시간이 걸린다.
- 기존 작업하던 대로 진행하고 싶은데, 그 참고할 데이터를 바로 못찾겠다

#### 작업 흐름
- 최소의 실행 가능한 것만 있는 뼈대를 찾아서 가져온다
    - create-react-app이 그런 것을 한다.
    - 나는 node-react-docker-compose를 이용한다
    - cookiecutter라는 파이썬 툴도 있다.
- 필요한 기능과 리소스를 가져온다
- 배포하면서 확인한다


## oss 메인테이너를 생각하면
다른 기여자들에게 응대하는 일이 많은 시간을 차지한다.
회사에서 다른 팀과 커뮤니케이션하는 것 이상으로 많은 메시지가 들어온다.
커뮤니케이션도 개발의 일부지만, 기존의 정보를 잘 활용해서 같은 질문에 계속
대답해야 하는 것은 줄이도록 하는 방법이 필요하다.
[[Feedback]]
[[Open_Source]]

#### gitlab communication Top Tips
1. 모든 소통은 영어로 한다. 1:1 일때도, 대화내용을 누군가에게 전달해야 할 때가 있다
2. 웬만하면 비동기로 대화를 한다(채팅, 이메일, PR, 이슈, 슬랙 알림). 채팅으로
   인한 인터럽트 없이 일 할 수 있어야 한다.
3. 이슈에 대해 토의하거나, PR은 다른 무엇보다 중요하다. 만약 급한 응답이
   필요하다면 이슈나 PR의 링크와 함께 챗을 보내고, 거기에 질문을 남겨라. 하지만
   바로 응답하지는 않을 수도 있다. 슬랙에 대한 자세한 내용은 따로 정리돼있다.
4. 채팅 대신 이메일 쓰고 싶으면 써도 된다. 근데 내부용 이메일로 짧은 메시지만
   작성해서 써라. 채팅할 때처럼
5. 너도 항상 일하고 있지는 않을거다. 근무 시간 외에 응답이 올거라는 기대도 없다.
6. 동기적 소통도 좋을 때가 있다. 하지만 동기적인 상황을 기본으로 놓지는 말자.
   화상 통화를 하는게 바로 문제가 해결될 때가 있지만, 화상통화에 대한 가이드를
   참조해라
7. 질문 많이 하는건 너무 좋다. 계속 질문해줘라. 그리고 많은 사람들이 볼 수 있게
   이슈나 전체 대화방에 올려줘라. 1:1 챗이나 이메일 말고.
   뭔가를 핸드북에서 찾다가 못찾겠으면 핸드북 링크와 함께 어떤 것을 못찾겠다는
   것을 공유해줘라.
8. 누군가가 너에게 핸드북 링크를 주면 이는 답변이 이미 문서화 되어있었다는
   것이다. 니가 답을 찾거나 완벽한 답변일 필요없다. 명확해지기 위해 편하게
   질문해라.
9. 답변이 아직 문서화되지 않았으면, 즉시 PR 만들어서 핸드북에 올려줘라. 이건
   질문에 답변해 준 사람이 그 대답 한 번으로 다른 비슷한 질문들에 대한 예가 될 수
   있어서 좋다. PR은 도와줘서 고맙다고 말하기에 가장 좋은 수단이다.
10. 뭔가에 언급한게 있다면 링크도 같이 넣어줘라.
11. 모든 회사의 데이터는 공유 가능한 것이 기본이다. 개인 파일 만들어 쓰지 말고
    이슈에 댓글 달아주는게 낫다.
12. 누군가 질문을 하면 마감시간을 알려주거나 답변을 해라. 'OK', '할게', '나중에
    할게'는 아무런 도움이 안된다. 작은 일이면 2분 정도 들여서 해버려라. 다른
    사람이 빨리 그걸 잊어버리게. 큰 일이라면 다시 알려주고 다른 방식을 찾아보게
    해라.
13. 이슈에 참조로 누군가를 거는건 좋은데, 참조만으로는 누군가가 그걸 보지 않을
    수 있다. 참조된 사람이 읽고 뭔가 더 액션을 안 취할 수 있다. 명확하게
    @누구누구로 불러서 뭐가 필요한지 얘기해라
14. 내부적인 얘기라고 개별적인 그룹 만들어서 얘기하는걸 피해라.
    - 방해되고 (새 그룹에 새 메시지가 가니까)
    - 찾을 수 없고
    - 공유되지 않고 (사람을 추가할 수 없다)
    - 각 그룹마다 주제가 달라서 주제를 까먹는다.
    - 기록이 사라진다.
15. 고객 한 명을 위해서이더라도 채널 만드는 것은 좋다. 이름 형식을 지키고,
    내부적인 룰을 지켜라.
16. 문맥이 많지 않도록 소통해라. 명료하게, gitlab은 전부 재택이고, 전 세계에
    흩어져있다. 문맥에 대한 정보를 최대한 제공하고, 혼란을 피하자. 관련해서,
    우리는 유비쿼터스 언어를 쓴다.
17. 개념을 이야기 할 때, 가설에 너무 기대는 것을 조심하자.

- [ ] + 핸드북 부분, MR 부분 더 확인해보자

#### 정보 불균형
3명이 같이 프로젝트를 진행하다가 1명이 없을 때 기능에 대한 얘기가 진행되면
그 한 명은 나머지 2명보다 정보가 차이가 나게 된다. 3명 뿐이라면 1명을 위해
최대한 내용을 전달하자는 노력을 하겠지만, 이게 회사 단위가 되면 정보 비대칭은 더
심해지고.
근데 애초에 회사에서는 전체 내용 중에 일부만 정리해서 전달한다.

#### 라이브러리 찾기
개발자가 새로운 기능 구현 시 프로젝트 구조를 파악하면서 내가 구현해야하는 것에
필요한 라이브러리를 찾아서 쓴다는게 가능한가? X 불가. 해변에서 바늘찾기. 그래서
메타적으로 관리하는 페이지가 있어야 한다. 아니, 그런 관리 페이지가 있어도 찾기가
어려운데!

#### 실수를 기회로
온보딩을 하면 기본적인 흐름을 파악 할 수는 있다.
근데 온보딩에도 빈 곳이 많을 수 밖에 없고, 애매한 부분을 만났을 때 상사에게
질문하는 것이 기본이겠지만, 일단 생각나는대로 해보고 그것을 다음 신입사원은 그런
고민을 안하도록 고치는 것이 더 현실적이고 나은 방법 같다.
넛지를 잘 만들던가, 온보딩을 강화하던가.

#### github workflow
github issues: ghi 로 확인
git commit - changelog - release: 한번에 가능
github pull request: cli로 가능
github actions: action-cli로 실시간 확인 가능

issue 확인하거나 등록하고, 커밋하고, 풀리퀘스트 올리면 액션 실행되고
액션 모니터링 하면서 확인되면 코드리뷰 신청 가는거 확인
코드리뷰 완료되면 머지까지 한 곳에서 확인


## 서비스의 구조와 팀의 구조가 닮는다

#### 같은 영역에 있는 개발자들끼리 한 동영상으로 같이 스터디

#### 리더가 되면
퇴근할때는 인사없이 퇴근하도록

> 여러분의 조직에서는 실패를 공유하고 있습니까. 만약 리더가 “나는 수치로 나타난 성과만 보고 직원들을 평가하겠다”고 선언한다면, 어떤 부하가 자신의 실수와 실패를 동료와 공유하겠습니까.

공개된 자리에서 잘못을 목격하면 그 자리에서 뭐라하기 보다는 나중에 그것을 지적해주고 주변에 아무도 없으면 그 자리에서 얘기해준다

사장이 모든 결정 권한을 갖지 않고 역할별로 권한을 갖게 될 경우에
각 역할에서 했던 결과가 좋지 못할 경우 그것을 제지하는 것은 결국 사장(또는 인사)이 아닌가?

#### 피자 2판 팀
서비스 당 10개 정도의 라이브러리 사용
- 아마존 팀은 피자 2판 팀으로 유명한데 팀이 일하는 방식과 팀간의 일하는 방식이
  실제로 어떻게 이루어지고 있는지 알고싶다

기능 단위로 팀이 분리가 되면
다른 기능에 대해 아이디어가 생겨도 개발하기 힘들다
직접하기 보다는 기존 팀이 하는 것이 더 좋을 것이다
그렇다면 아이디어를 기존 팀에 잘 전파하고 공유할 수 있어야 한다
이 소통창구는 라이브러리 공유에도 쓰일 수 있겠다

#### 직종별로 팀이 나눠져있다가
프로젝트가 시작되면 직종마다 사람이 와서 합쳐져서 뭉치도록 하면 되겠다

모두 프로젝트를 진행중이라면 전체 프로젝트 확인이 되는 것이고,
프로젝트가 끝나면 다음 프로젝트로 넘어갈 수도 있고.

이미 이렇게 일하고 있겠다.

이걸 자료 검색에도 이용할 수 있겠다
카테고리별로 분류 되있다가 어떤 다른 검색이 들어오면 그대로도 검색이 되도록
쿠팡이 첫페이지에서 카테고리를 보여주고 있는 것도 이런 생각이 이미 거친 것이겠다


프로젝트별로 각 부서에서 모여서 작업하는 방식이
TF를 구성해서 긴급사안에 대비하는 것과 비슷해보이는데
TF는 대게 겉만 파다가 끝나는 경우가 있다

어떻게 하면 효과적으로 TF팀이 일을 할까?
사례를 찾아보면 도움이 되겠다

#### 기능별로 팀을 나눈다
하나의 플랫폼이 있고, 그 안에 기능을 분리하여 팀도 기능에 맞춰서 분리하는 구조
기능의 고도화, 유지 및 관리에 유리할 것 같다. 소프트웨어의 사이즈도 적당히
제한될 수 있을 것 같다.
예를 들어 전자결제 플랫폼이라면,

마이크로서비스는 한 기능의 크기를 작게 하는 대신 기능별로 연결 시 오버헤드가
증가하고, 각 기능별로 상태를 확인하는 것도 오버헤드다

#### 전체를 보는 방법
전체를 보는 역할을 하는 사람을 따로 두어 관리하게 한다. ex 풍훤

타이거팀 https://bcho.tistory.com/992

문서를 효과적으로 관리하려면, 한 곳에 모으고, 계속해서 업데이트하고,
커뮤니케이션을 위한 문서만 만들도록 하면 효과적일 수 있겠다.

회사에서 리더가 일을 다 끌어안으면 안되고 잘 나눠야하는 것처럼 일상생활에서도 이런 방식으로 만들어나가야 할 것 같다


#### 리멤버 회사 서버/웹 팀이 일하는 방식
- https://blog.dramancompany.com/2020/12/리멤버-서버-웹-팀은-어떻게-일을-하는가/

테크 스택, 코드 퀄리티(리뷰, 테스트), 오버 커뮤니케이션, 문서화

테크 스택
- AWS, EC2, Auto scaling, Fargate
    - Code Build를 이용하여 테스트 분산처리
    - ELB prewarm으로 트래픽 대응
- Ruby on Rails
- React

코드 퀄리티
- 코드 리뷰
- 테스트 코드

업무구조
- 기능조직(서버, 웹, 디자인 등)
- 목적조직(광고, 커리어 등)
    - crew와 이를 도와주는 베이스캠프로 이루어짐

#### 업무의 만족도에 영향을 미치는 요소
- 물질적인 보상과 기회
- 일 자체가 불러일으키는 의욕과 흥미
- 복지, 근무환경, 조직들 사이의 위치
- 관리자와 리더의 능력

팀 전체가 참여하여 설정한 목표를 추구한다면, 결과물을 더 쉽게 얻을 수 있다.

#### 재택 근무가 가능한 업무와 아닌 업무가 있겠다
티켓별로 각자 일하면 되지 않을까 생각했는데, 연관된 사람들과 같이 해야하는 일이
있고, 생산직 같은 경우는 노동 시간이 곧 생산량이 되기도 한다.

매니저가 되면 구성원들의 상태를 확인하고 필요한 것들을 잘 연결 시켜 줘야 한다.

#### 일을 진행할 때

하려는 것과 왜 하려는지와 기대하는 것을 같이 전달해야 서로 오해가 줄어든다

#### 커뮤니케이션에 대한 불안

너무 바쁜것으로 보이는 리더
일일이 물어보기 죄송
진행상황은 보고 하고 싶은데 진행상황 정리가 잘 안됨


#### 비판 대신 진취적 개선에 에너지를 쏟는다.
> 개발자와 PO는 오버헤드를 감소시키면서, 속도와 품질을 향상시키기 위해 프로세스가 어떻게 수정되어야 하는지 논의한다. 우리가 한 것을 뒤돌아보고 비판하는 대신, 진취적으로 프로세스를 개선하는데 모든 에너지를 쏟는다. 방어적인 태도는 줄어들고, 협동력은 향상된다.
> - https://pitzcarraldo.medium.com/번역-잘-가요-스크럼-반가워요-칸반-e27d1db15699

#### 모험 지향적인 사람 vs 확실성 지향인 사람
- https://maily.so/nenep/posts/mjz65e7vrwk

#### 감독이 없는 팀이 잘 굴러가려면?
자본주의 위에 세워진 사회주의가 기존의 ceo들을 자리에서 물러아게 하면 혁명세력들이 그것을 차지하게 되는데 이들이 공장을 잘 운영할 수 있을까?
혁명가 중 우두머리에 의지하게 될까?
혁명가 중 우두머리를 세워놓되 견제를 쉽게 할 수 있게 하면 될까?
프로그래밍 팀에서 팀장이 없이 될까?
애자일이라는 프로젝트 진행 방법론에서도 이를 운영하는 애자일마스터가 존재하긴 한다
어느곳이든 다수의 의견을 모을 중심점은 있어야 하는가

사회주의를 보면 지나친 중앙통제는 실패한다
적절한 조절을 해야한다

[[Teamwork]]

#### Compare manager role in many field
Football coach
- 프로에서는 개인의 능력을 최대한 끌어내는것이 감독의 역할
물론 자신의 노하우를 알려주면서 더 배울 수 있지만 가르치는 역할은 아니다
- Movie director
- Software team leader
- My previous company pm

#### 이태섭 신부님
믿음을 주면 능력 발휘를 잘 할 수 있다
이태섭 신부의 믿음이 의사가 되는 원동력이 되었다
구체적으로 해답을 주면 한 걸음을 갈 수 있지만 방향을 잡아주면 오래 갈 수 있다.
선문답 같이 느껴질 수 있지만.


## 프로젝트 한 페이지에 관리

- 개요
- 전체 아키텍처
- 프로젝트 깃헙링크
- 구글드라이브 링크
- 아사나 링크
- 컨플루언스 링크
- 채팅에서 나왔던 내용
- aws 환경 링크
- 관련 사이트 링크 (nhn)

#### 새 프로젝트

새 프로젝트를 시작할 때 다시 0부터 시작하는 느낌이 들면 안된다
회사일을 하면서 노하우가 점점 쌓여야지 계속 0부터 시작하면 회사가 동작하는 방식과는 조금 다르다
시작할 때 이전 프로젝트의 히스토리를 찾아본다


#### 개발의 목표
개발을 하면 사용자가 원하는 것을 그대로 맞춰주는 것도 중요하지만
그대로 맞추는 것보다 사용자가 생각하는 이미지의 껍질을 깨뜨려 줄 신선한 이미지를 구현해낼 필요가 있다
그렇다고 내 것을 주장해야 되는게 아니라 사용자에게 좋다고 느껴지게 만들어야 한다
나는 좋다고 생각하는데 사용자가 마음에 들어하지 않으면 안된다
사용자에게 감동을 일으켜야 한다

> 영화의 전권을 쥐고 있는 사람은 어디까지나 감독이다. 감독이 "이 음악은 아니다"라고 말하면 내가 아무리 좋다고 주장해도 받아들여지지 않는다.
> 처음부터 다시 만들어야 한다. 그렇다고 감독이 말하고자 하는 이미지나 영상에 너무 집착해서도 안도니다. 감독의 이미지 안에서 무난한 작품을 만들면 작곡가로서 아무런 재미가 없지 않은가!
> 대부분의 감독은 풍부한 창조성을 가지고 있다. 그들은 자신의 내부에 있는 모든 창조 에너지를 쏟아부어 영화를 만든다.
> 따라서 영화음악을 만드는 사람도 그에 걸맞은 풍부한 창조성을 가지고 있어야 한다. 감독은 항상 자기 이미지의 껍질을 깨뜨려 줄 신선한 음악을 찾고 있기 때문이다.
>
> - 히사이시 조

#### Project start flow
1. System Design
    * Data Design
    * Analysis Point Design
    * Architecture Design
2. Scenario
    * Test code
3. Implement
4. Check
    * Feedback of Analysis Point
    * make Report
5. Refactoring

- 시장 파악
- 피드백 빨리
- 반복되는 경험은 미리 조사 가능
