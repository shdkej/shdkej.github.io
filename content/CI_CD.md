---
title   : CI/CD 구성 연습
summary : 정적 소스 체크와 Ansible, Terraform, ArgoCD 를 이용한 배포
date    : 2021-03-09 13:25:01 +0100
updated : 2021-07-14 15:52:27 +0900
tags    :
parent  : [[Blogging]]
---

## 개요
상황 1. 개인 프로젝트로 go web server를 구축하여 원격 서버에 배포

상황 2. 10인 개발팀이 개발은 compose로 진행하고 배포를 argocd로 배포

상황 3. 3명의 개발자가 terraform으로 인프라 관리 및 배포

- [ ] 배포와 릴리즈 분리


## 전체적인 흐름
개발
- Git Commit
- Git Push

개발자가 해야할 일
- 기능 개발
- 오류 수정
- 새로운 아키텍처 추가

CI
- 정적 분석
- 테스트 실행
- 패키징

CD
- 배포

ci/cd 선택요소
- pr or push
- 브랜치명
- 스킵
- 배포 형태

흐름
기능 브랜치 해서 푸시하면 ci 실행
머지하면 cd 실행
마스터에 푸시 막기


#### 제한
- 커밋 전 체크 1초
- 풀 리퀘스트 후 테스트 시간 10분
- 머지 후 배포 10초

## CI
- coding convention
- test
- code profiling
	* lint, coding convention check - static code analyse
		* security check(synk)
        * codefactor
        * codecov
        * 도커 이미지 보안 스캔하는 서비스 - docker bench for security
        * Find bugs or perform static analysis tool - pychecker, pylint
        * [semgrep](https://semgrep.dev/)
    * [size limit check](https://github.com/andresz1/size-limit-action)
	* check test. check coverage
- pull request with report
- pull request and code review
- build
- [version marking](Team_management#Conventional commits)

#### CI strategy
실패를 먼저 확인한다
- pull request를 보내고 테스트가 실패하는 것을 먼저 달게 하는 템플릿을 만든다

진행 결과를 코멘트해준다
- test
- 릴리즈 태그
- 변경된 파일(?)
- 배포 결과

#### CI cookbook
- 실패 시 메시지
    - `if: failure()`
- 스킵
    - commit이나 pr에 [ci skip] 또는 [skip ci]를 하면 자동 스킵
- 풀리퀘스트에 코멘트 달기
    - `uses: actions/github-script@0.3.0`
    - `script: github.issues.createComment()`
- 테스트 결과 코멘트 달기
    - coveralls 이용. coveralls bot을 레포에 초대해야한다. 잘 안붙는다
    - codecov 도 있다
    - `uses: romeovs/lcov-reporter-action@v0.2.16`  심플 커버리지 확인
- pull request, push 상황 체크
    - `on: ["push", "pull request"]`
- pull request 생성
    - `uses: repo-sync/pull-request@v2`
    - destination_branch, pr_title, pr_body 등 설정
- 변수 여러줄 저장하기
    ```
    go test -cover -v > output.txt
    body=$(cat output.txt)

    body="${body//'%'/'%25'}"
    body="${body//$'\n'/'%0A'}"
    body="${body//$'\r'/'%0D'}"

    echo "::set-output name=body::$body"
    ```
    - 파일에서 읽으려면 예약된 문자들을 입력해줘야 여러 줄로 인식이 됨
    ```
    echo ::set-output name=stdout::`go test -cover -v`
    ```
    - stdout을 바로 받으려면 이렇게만 해도 된다
- cache
    - actions/cache 이용
    - `if: steps.cache.outputs.cache-hit != 'true'` 로 체크
- terraform 구동
    - `uses: hashicorp/setup-terraform@v1`
    - terraform cloud 토큰 생성 후 이용 가능
- docker repository
    - github repository
    ```
    echo "${{ secrets.GITHUB_TOKEN }}" | docker login docker.pkg.github.com -u ${{ github.actor }} --password-stdin
    VERSION=$(echo "${{ github.ref }}" | sed -e 's,.*/\(.*\),\1,')
    docker push docker.pkg.github.com/${{ github.repository }}:$VERSION
    ```
    - dockerhub repository
    ```
    uses: docker/login-action@v1
    with:
        username:
        password:
    ```

- [github default context](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#github-context)
- [awesome-actions](https://github.com/sdras/awesome-actions)

#### jenkins
수동 배포도 되는 것이 장점
코드 분리 가능 (github action, circle ci는 불가)

#### pipeline
백엔드는 깃 폴더 내에서 작업하고
푸시하면 이미지가 만들어지고 파이프라인에 들어간다
디비나 다른 프로그램 사용이 필요할 때 바로바로 사용할 수 있어야 하고, 연결과 내부 확인이 바로 되어야 한다
개발과 테스트가 자유자재로 되어야 한다
개발을 하다가 테스트가 필요하면 바로 할 수 있어야 한다

프론트엔드도 깃 폴더 내에서 작업하고
백엔드의 데이터를 마음대로 가져올 수 있어야 한다
라이브러리 관리가 되어야 한다

커밋 전 확인할 것
- 커밋 시에 사전체크가 오래 걸리면 업무가 지연된다
커밋 후 확인할 것

직접 관리할 서버와 서비스를 이용하는 것은 어떻게 나눠야할까
젠킨스, 깃헙 액션

메인서버의 데이터를 바로 테스트용으로 카피할 수 있으면 좋겠다
그러려면 메인서버의 데이터 자체가 너무 비대해지면 안되겠다

세부설정을 할 수 있게 하되, 기본값은 실제 서버값으로 하면 테스트하기 좋지 않을까?
기본값으로 초기값을 하면 정확한 테스트가 안될 것 같다

테스트 서버의 자원을 로컬에서 할지 공용 풀에서 할지 선택하면 좋겠다

관리페이지 접속 -> 서비스 신청 -> 주소 할당

#### 커밋 시 동작 가능한 단위로 한다
한 동작마다? 한 단위마다?
처음 틀 만들 때는 빠른 개발을 위해 되는대로 작성해놓고 커밋만 따로 쪼개서 하고
싶은데 가능한가?

#### 기능에 문제 없는 것이 확인 된 단위로 커밋을 하고 싶다
기능에 문제가 있는지 없는지는 어떻게 확인할까
검사하기 좋은 아키텍처를 가지는 것도 중요하겠다
- 정적 테스트가 완료되면 문제 없다고 할 수 있게끔 해야겠다

CI를 커밋할 때 하는 것보다 PR을 할 때 하면 PR에 결과 표시해주면 한 곳에서 확인할 수 있어서 좋겠다

커밋할 때는 짧게 확인 가능한 위주로 테스트하고, PR에서 좀 더 진행하면 좋겠다

개발자들이 실제 작업하는 환경을 수시로 확인하는 작업이 필요하다

#### pr
pr마다 버전을 넣으면 금방 100을 넘을 것 같은데?
컨테이너 이미지 만들 때 버저닝 같이 하게 된다

#### meshkorea
젠킨스파일을 각 레파지토리에 추가해서 파일 하나로 CI/CD 작업을 연결한다
tag 기반으로 젠킨스에 훅을 보낸다
메뉴얼로 바로 배포하는 옵션도 있다
kubernetes 레포와 소스코드 레포를 분리했다
helm 의 values만 수정해서 관리할 수 있게 했다

#### devops
개발자로서 데브옵스라면 팀의 소스를 모두 풀링해서 서버에 올리는 것에 신경 쓸
것이고
문화로서 데브옵스라면 각 개발자가 서버에 쉽게 올릴 수 있도록 신경 쓸 것이다

동작은 어차피 서버에서 자동으로 하겠지만,
개발자가 서버에 어떻게 올릴지 설정을 하게 할지, 아니면 운영자가 설정을 할지의
선택요소가 남아있다

개발자가 피드백을 받으려면 개발자가 직접 설정해서 받는쪽이 나을 것 같다
프로덕션에서 테스트도 해봐야할 것이고,

개발자가 설정하되, 파일 하나로 할 수 있고 쉽게 할 수 있도록 해야겠다

#### workflow
운영쪽에서 개발코드를 지정할 수도 있고
개발코드쪽에서 운영쪽으로 푸시할 수도 있고

그러고보니 argocd를 실행하는 코드는 개발소스 레파지토리에 등록해서 써야하겠다
- 운영용 레파지토리에서 개발용쪽을 트리거 받는 방법도 있긴 하네
젠킨스파일처럼 파일 하나만 폴더에 추가해서
pr요청하면 그 파일이 서버에 훅을 보내서 특정 작업들을 실행하도록 한다

파일에는 세부 설정도 가능하지만 기능 on/off 정도만 해도 되도록 하면 좋지 않을까
argocd라고 적어놓으면 배포자동화가 되도록


코드 푸시하는 곳에서 이슈 리스트를 확인하고 코드를 내려받고, 푸시하면 리포트를
받아보게 되는 올인원 툴이 있으면 좋겠다
github action 추적도 되고

관리 쪽에서 개발소스를 컨텍해서 올리는게 더 안전성이 높지 않을까

## 정적 소스 분석
lint check
test
secure check
size check

상황 처리
- push, pull request, 특정 branche만 받기

테스트 결과 이슈에 남기기

현업에서 필요한 복잡한 CI/CD 구성을 알고 싶다
aws에서 복잡한 구조를 지원하는 것을 어필하기 위해 소개하는 문서가 있을 것 같은데

터미널에서 푸시를 하면 깃헙 사이트에 들어가야 진행 상황을 알 수 있다
그래서 슬랙을 써서 하는 회사들이 있는데
터미널에서 바로 인터랙티브하게 할 수 없을까
- actions-cli

#### report
- 소스 코드 정보
    - 신규로 추가한 라인 수, 변경된 라인 수, 소스 코드 파일 개수, 커밋 개수 등
- 소스 코드 정적 분석 데이터
- 소스 코드 빌드 데이터
    - 작업별 빌드/테스트 시간
    - 빌드 성공/실패율, 빌드 로그
    - 빌드 테스트 리포트, 패키지(APK) 정보, 버전 정보
    - 빌드 옵션, 메모리 덤프 데이터
    - 빌드 태스크 의존성 정보
- 빌드 시스템 정보
    - 사용자 시스템 정보(CPU, 메모리)
    - CPU 사용량, 메모리 사용량, 디스크 사용량
    - 빌드 대기 시간, 빌드 장비 활용 시간
- 패키지 크기
- https://engineering.linecorp.com/ko/blog/build-a-continuous-cicd-environment-based-on-data/

#### workflow
개발 전 - 개발 중 - 개발 후 관리
- 개발 전
    처음 프로젝트 시작 시 필요한 파일
    깃헙 워크플로우
    도커 컴포즈 파일
    깃 훅
  - workflows, pre-commit, PULL-REQUEST 파일 불러오기
  - synk 등 github third party 허가 등록
  - 특정 언어 템플릿이나 미들웨어 서버 필요 시 불러오기?
  - security 정보 등록
- 개발 중
  - git-cz 등 개발편의용 도구
  - workflows 실행으로 테스트 자동

처음에는 infra repo에서 가져와서 서비스를 배포하는데
서비스별로 별도의 infra가 필요해지면 쉽게 변경 가능해야할까? 아니면 굳이
안바꾸는 것을 권장해야할까?

스테이지 서버에서 테스트 후 프로덕션 서버로 카나리 배포, 롤링 업데이트를 하게
될텐데 이 설정들은 infra repo에 고정적으로 있으면 되나?

ci/cd에서 하는 것이 배포 위치 지정(dev, prod 지정),

-----------------------------------------------------------------------

## CD
- hotfix
- integration each other
- how to test connection with each other services
- 스테이지 서버
- rolling deploy -- kubernetes support

#### imagine of erp CI/CD
local docker test
commit -> push -> deploy -> docker image update
- what if production has error?
- how to make fast hot-fix?
	* fixing with a test case

#### Feedback
* Measure Code, server(package), user experience to github issue
* Code static is reported in CI cycle.
* package is reported in CD cycle
* Error time, count, environment,

#### Code static analyze content
* Dead branch check (long time)
* Lint check
* Security check
* Dependency check
* Execute time check

#### deploy make easy
- one directory to push
- many program related
- update to be small
- test to be all
- quick rollback

#### 배포
argocd에서 쿠버네티스 템플릿을 가지고 있고,
코드 레포지토리에서는 이미지만 빌드하도록 하면 좋을까

## 배포 자동화
- docker package
- maven package
- exe 파일로 package

- ansible로 로컬 배포
- terraform으로 클라우드 배포
- docker 패키징
- argocd

CD 로 로컬 서버에 배포하는 작업 보안 확인

-----------------------------------------------------------------------

### 상황 1
개인 프로젝트로 go web server를 구축하여 원격 서버에 배포

브랜치별 개발 - 푸시 - 정적 테스트 - 배포 - 릴리즈

릴리즈 된 것이 개발에 바로 피드백을 줘야 한다

테스트 실패

배포 실패

릴리즈 실패

릴리즈 시 특정 동작 문제 발생

이슈 보고

에러가 생각나서 긴급 수정

리소스 부족

외부 라이브러리 문제 발생


### 상황 2
10인 개발팀이 개발은 compose로 진행하고 배포를 argocd로 배포

권한 관리 (개발팀이 경영팀에 마음대로 들여다 볼 필요 없음)

휴먼 에러 방지


## 상황 3
3개의 실제서버를 구성해놓고
오토 스케일링 하도록 한다
업데이트시 롤링 업데이트를 기반으로 하는데
하나를 카나리로 설정한 다음 서버별 접속 링크를 제공해서 접속현황과 실제 테스트를 진행할 수 있게 한다

개발서버 - 실제서버
단계로 바로 갈 수 있게 하고
개발서버에서 각 파트가 다른파트에 영향을 최대한 안주도록 한다

깃 푸시하면 도커로 테스트하고 풀리퀘스트 머지를 하면 바로 실제서버로 가게하거나 배포 시기를 정해놓는다면 배포큐에 쌓아놓는다


#### edge case
로그 폭발
권한 남용
시스템 다운
네트워크 혼잡


#### reference
- https://blogs.oracle.com/developers/adventures-in-cicd-3-running-tests-publishing-test-reports
    - test, failure check,
- https://www.aaron-powell.com/posts/2020-03-23-approval-workflows-with-github-actions/
    - set version, create version file, approval workflows
- https://johnny-mh.github.io/post/standard-version-기반-서비스-배포프로세스
    - commitizen, standard-version, ci pr check, cdn 업로드(?)
    - frontend는 index.html만 배포하면 되겠다. 컨테이너보다 훨씬 가볍다
- https://shivanshs9.me/medium/do-github-acti on-like-a-pro-594bcb813b22
- https://ahnheejong.name/articles/web-developers-flutter-cicd-using-travis-ci/
- https://woowabros.github.io/experience/2018/06/26/bros-cicd.html
    - slack bot으로 배포 알림, 릴리즈 확인
- https://www.theteams.kr/teams/7242/post/70736
    - development, qa, deployment로 프로세스 구분
- https://www.slideshare.net/awskorea/cicd-aws-aws-aws-summit-seoul-2019
    - 소스 빌드 테스트 프로덕션으로 프로세스 구분
- https://roseline.oopy.io/dev/github-action-cahce
    - size-limit-check 해주는 js용 action이 있다
- https://velog.io/@hax0r/Node-프로덕트-퀄리티를-높이는-협업-방법-q29zo12w
    - commitlint, semantic release, husky 사용하자
- [Line](https://engineering.linecorp.com/ko/blog/line-ads-devops-culture/)
    - 기획, 코드, 빌드, 테스트, 릴리스, 배포, 운영, 모니터링
    - 기획 - confluence로 관리, kanban에 이슈 매칭, jira로 이슈 트래킹
    - 코드 - git-flow를 간소화해서 develop에 featrue를 붙여 개발 후 master에 병합
        - 코드리뷰 - 이슈트래커 번호, 1명의 승인 필요
    - 빌드, 테스트 - 언어별 기본 test, 요청 응답 테스트, 두 장비가 요청을 보내
      같은 결과를 보내는지 비교(api comparator)
        - PR 생성, 변경 시 단위 테스트
        - 상위 브런치에 머지했을 때 API 테스트
        - 특정 주기마다 테스트 반복
            - 단위 테스트 실패 시 머지 불가 조건
    - 릴리즈, 배포 - 위에서 검증 완료되었는지 한번 더 확인
        - kanban에서 confirm상태가 됐는지 확인하고 deploy로 상태 변경
        - 배포 전에 변경 공지를 등록하고 어떤 변경사항인지 관리자와 공유(메신저)
        - 배포 시작되면 전체 공유
        - 카나리로 배포, 1대에 배포 후 모니터링 되면 3분의 1부터 배포
            - 장애 발생 시 이전 상태로 재배포. PR revert, Tag 제거
- [banksalad](https://blog.banksalad.com/tech/become-an-organization-that-deploys-1000-times-a-day/)
    - pr 횟수를 모니터링, slack의 대화내용에서 파싱
    - git-flow를 간소화
    - gomplate
    - build - lint, test, docker image build
    - deploy용 bot을 만들어 사용
        - status, deploy, history 기능 지원

#### github이나 jenkins, travis에서 ci/cd 노하우를 공유할 것 같은데
찾아보자
- [travis ci blog](https://blog.travis-ci.com/)

#### ci cd pipeline
그러면 이번 장에서는 이런 현대의 서버 개발 환경이 어떻게 구성되는지를 살펴보기로 한다.
다음과 같은 시나리오를 생각해보자.
"개발자가 아침에 출근해서 책상 앞에 앉아서 노트북을 켜고 로그인을 한다. IDE 도구인
이클립스를 실행하면 이슈 트랙킹 도구와 연결되어 오늘 해야 할 일들이 자동으로 리스
트 업 된다. 개발자는 그중에서 하나의 태스크를 가져와서 내용을 확인한다. 해당 태스크
의 상태를 진행 중(In Progress) 상태로 바꾸고, 소스 코드 관리 시스템에서 최신 소스 코
드를 내려받는다. 로직을 구현하고, 코드를 검증하기 위해서 단위 테스트 코드를 작성하여
테스트까지 수행한 후 정상적으로 작동하는 것을 확인한 후에 다시 소스 코드 관리 시스템
에 코드를 반영 요청을 한다.
반영 요청을 즉시, 자신의 선배 개발자에게 통보가 되고 선배 개발자는 해당 개발자가 변
경한 코드의 내용을 형상관리 시스템에서 확인하고 시스템을 통해서 코드에 대한 피드백
을 적어 놓는다. 코드 상에 문제가 없으면 코드 반영을 허가하고 변경 부분은 전체 소스 관
리 시스템에 반영된다.
코드가 반영되면 중앙화된 자동 빌드 시스템에서 코드를 내려받아서 컴파일 및 테스트 서
버에 자동으로 배포하고, 이미 정의된 테스트를 수행한다. 테스트가 끝나면 전체 소스 코
드 줄 수 중에 어느 줄이 테스트가 되었는지, 전체 코드 중 테스트 된 줄 수의 비율 등을
자동으로 측정해서 리포트를 생성해 준다. 또한, 자동화된 규칙에 따라서 코드 상에 에러
처리가 안 된 부분이나 명명 규칙(Naming Rule)이 틀린 부분을 자동 검출하여 팀원에게
알려준다.
모든 빌드와 테스트가 끝나면 해당 코드는 스테이징 (Staging) 환경으로 자동 배포가 되
고, 변경 부분은 QA 팀에 의해서 테스트를 거친 후에, 매일 밤에 운영 시스템에 반영된다.
- (책) 조대협

#### etc
웹에서는 리액트를 쓰든, wasm를 쓰든 결국 최종 출력물은 HTML이다. + js,css

script 보다 workflows를 활용?

jenkins, github action, travis에 상관없이 ci를 실행하게 하려면 스크립트로
단계를 만드는게 좋을까? 근데 스크립트를 안쓰려고 ci툴을 쓰는건데...

workflow 실패 시 에러 메시지와 함께 피드백 주는 방법 확인

시맨틱 버저닝에서 버그 픽스와 피쳐 추가가 같이 있으면 버그 픽스 태그 따로, 피쳐
추가 태그 따로 올리는게 맞지 않나?
