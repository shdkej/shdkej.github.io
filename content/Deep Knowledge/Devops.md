---
title: DevOps
summary:
date: 2021-12-04 13:02:50 +0900
updated: 2025-07-23 10:03:03 +0900
tags: deep_knowledge
---

## 데브옵스의 목표는
> 개발자로 구성된 소규모 팀이 기능을 독립적으로 구현하고, 프로덕션과 유사한 환경에서 정확성을 검증하며, 코드를 프로덕션 환경으로 빠르고 안전하게 배포하는 것이다.
> - Devops Handbook (https://johngrib.github.io/wiki/devops/)


- Infra - Cloud
- CI / CD
- Container
- Fail Tolerance / Chaos
- Monitoring

# DevOps

what is benefit of devops

- makes team source useful.
- developer think only source version control system(git, etc)
- easy deploy, easy rollback, feedback

DevOps' goal is for a small team of developers to implement functions
independently, verify accuracy in a production-like environment, and distribute
code quickly and securely to the production environment.

DevOps gonna make fast to deploy
SRE gonna maintaining production to reliability

Devops goal

- Build automation
- Quickly release
- Test automation
- Feed back

[[Software#Devops came from agile 2009]]
[[Information#데브옵스의 목표는]]

데브옵스는 린, 에자일의 연장선
예전에 제품 출시까지 오래 걸리고 회사 전체가 움직이던 것이 리스크가 있고
느려서 시대에 뒤처진다는 것에서 대응

개발과 운영을 분리된 것이 아니라 제품 출시에 있어서 같이 진행되어야 하는 것으로 보고 통합하는 문화

각 팀으로 분리하는 것이 아니라 같은 팀으로 묶여서 협업하는 문화

- 개발자가 운영도 하는 업무의 확장으로 느끼지 않고, 제품 전반적인 관리를 참여하는 문화가 되도록 해야겠다
- 사용자와 interaction을 늘리는 것인데, 현실적으로 개발자가 마케팅을 같이 하는 것은 무리가 있다. 개발과 마케팅의 간극을 줄이고, 응집력을 높이게 하는 것이 DevOps engineer의 역할일 것 같다.

인프라, CI/CD 파이프라인을 구성 및 관리하고 개발을 편하게 하기 위한 도구들을 개발하고 관리하는 포지션

- 개발자들이 개발에만 집중하고 빠르고 편하게 개발할 수 있도록 돕는다
- 개발자들이 개발에만 집중하지만 고객과의 interaction은 가깝게 느낄 수 있도록 한다.

사람과 사람을 장벽 없이 연결 시키는 작업

- 제품 개발에 참여하는 인원들 간의 장애물을 낮추기 위해 노력

데브옵스는 다른 영역도 취미로 하는게 좋겠다
다른 작업을 편하게 해주는게 대브옵스의 목표라고 생각

가볍고, 의존성 없고, 쉬운 설정 및 이동이 가능하며, 피드백 루프를 개발 프로세스에
잘 녹여내는 시스템 구축을 지향하며, 개발에만 집중할 수 있는 환경을 만들기 위해
고민하고 있습니다.

사용자가 신뢰할 수 있는 제품 경험과 개발자가 신뢰할 수 있는 개발환경 구축을
만들고 싶습니다.

확장하기 쉽고 자동화 된 개발 환경을 구축해 개발 시에는 서버 신경 안쓰고 쉽게
배포할 수 있도록 구성하려 하고 있습니다.

- 사용자에게 바로 영향이 가는 서버를 운영할 때 데브옵스는 어떻게 해야 할까
- 데브옵스는 포지션으로서 존재할 필요가 있는가?
- 데브옵스는 qa엔지니어와 가깝나 백엔드와 가깝나

작은 기업에서는 기획,개발,qa,데브옵스를 나누지 않을 것이고
규모가 커져야 qa엔지니어의 필요성을 느끼는 듯하다
서버가 코드화되면서 개발자가 서버를 관리하기 쉬워졌다
그래서 백엔드가 서버도 관리할 수 있게 되었는데 백엔드와 데브옵스를 분리할
필요가 있을까?
프론트가 nodejs와 함께 백엔드를 할 수 있게 되었는데 그런 풀스택 개발자는
엔터프라이즈에서도 먹히잖아?

규모가 커짐에 따라 세부적으로 역할을 나누는 것이 일반적이지만
데브옵스는 엔지니어의 역할 확장으로서 존재해도 되지 않을까?
프론트든 백엔드든 qa이든 서버가 어차피 코드화되어 있다면 같이 신경쓰는게 오히려 관리가 쉽지 않을까?
세분화되고 분리되면 고도화하기 좋긴 하겠다

개발과 운영의 통합은 종속성, 의존성이 아니라 조화다
각 마이크로 서비스도 데이터영역과 서비스 영역이 서로 의존하는게 아니라 조화를 이루게
하면 되겠다

#### create project

git init
remote add
add secret
add hooks
add workflows

#### DevOps한 백엔드를 위한 개발환경구축 가이드

필요한 리소스

- github repository + github flow
- minikube + 주소를 secret에 입력
- cookiecutter
- 개발 폴더

얻게 되는 것

- CI/CD
- monitoring
- logging
- security
- image

cookiecutter

- ci/cd pipeline
- ansible script
- grafana prometheus
- fluentd
- traefik
- some yaml for kubernetes

좀 더 생각해볼 것

- CoC 를 위해 설정을 쉽게 할 방법
  - 사용자 스펙을 읽어서 없으면 서버 스펙을 사용한다.
  - 서버 스펙은 사용자가 건드리지 않게 한다.
  - nagios도 이렇게 되있었고, vim이나 zsh등 커맨드라인 툴들도 이렇게 되있다.
    odoo도 파일을 만들어서 오버라이드 되게 해놨지만 기존 코드를 바로 건드릴
    수는 있었다.
- 내가 kustomize를 안쓰고 싶어하는 이유가 기존의 리소스를 활용하지 않고 독자적인
  것으로 만들어져서 너무 국소적이고, 나만 쓰게 될 것 같고, 새로운 것을
  외워야하는 느낌이 들어서인데, 회사용 툴을 만들게 되면 이런 느낌을 주지 않을까
- cookiecutter를 인프라용 레포지토리 템플릿으로 만들어서 쓰면 편하지 않을까
  - 프로젝트 생성 시마다 레포지토리를 만들 수도 있지만, 참조해서 쓸 수도
    있어야 할 것 같다. 즉, cookiecutter를 쓰지 않더라도 한 번 구축해놓은
    인프라를 다른 서비스를 개발할 때도 쓰도록 하는 것이 좋을 것이다.
  - 간단한 커맨드라인 툴을 만들어서 레포지토리의 버전을 읽어와서 적용하고 추가
    설정파일로 CoC가 되면 되겠다. 근데 이 커맨드라인 툴을 조심히 만들어야겠다.
  - CI workflow로 툴을 실행시키고 설정파일이 따로 없으면 내 인프라
    설정파일을 보도록?
  - 각자 설정해야만 하는 것: 서버 주소
  - 서비스 종류는 docker를 읽으면 되지 않을까
- 프론트엔드는 lerna, package.json 으로 create-app -> code -> ssg build -> deploy
  프로세스가 잘 돼있다.
  - 배포처(ex. netlify)에서 github 주소만 넣으면 끝이다.
- 개발 프로세스 전체 과정이 설정파일 하나로 파악되면 좋겠다.
- 기본 테스트 프로세스는 무조건 실행하도록 default로 돼있고, 추가로 원하는
  테스트도 할 수 있도록 돼야한다.
- private github 대신 github 같은 것을 실행하도록 해서 주소도 자동으로 얻게
  하려면 -> 개발자 간 공유가 힘들긴 하겠다.
- 일단 코드로 시스템을 구성할 수 있으면 어떻게든 변환할 수 있다.

#### process 그 다음을 생각해야겠다

- [ ] 개발자들의 퍼포먼스를 올리기 위해서 어떤 작업들이 필요할까
  - 이슈트래킹 서비스에 링크와 작업내용을 적고 github과 연동되어 github을
    안들어가고 이슈트래킹 서비스에서 인터랙티브하게 동작되면 좋지 않을까
- [ ] 옵저버빌리티를 어떻게 올려서 업무에 도움이 되게 할 수 있을까

#### 기업들이 데브옵스 채용 후의 상황 변화된 사례나 데브옵스들의 경험담을 보고싶다 :experience:

https://www.theteams.kr/teams/522/post/63940

- 데브옵스 채용이라기 보다는 문화를 바꾼 후 코드 관리에 집중함으로써 품질을
  높였다.

https://blog.kmong.com/크몽-모바일-데브옵스-960627d053cf?gi=c89f3ade7b36

- 경험보다는 어떤 것들을 하고 있는지 잘 정리돼있다.

https://www.bucketplace.co.kr/post/2020-07-23-오늘의-집사-서버-개발부터-운영까지-전부-다-맡겨-devops팀-리더-쟈니/

- 데브옵스 팀의 리더의 이야기

https://www.itworld.co.kr/news/155512

#### 이상적인 개발 프로세스

- 새로운 이커머스 시스템 요청이 들어왔다
- 기존의 라이브러리를 블럭처럼 추가해서 구현한다
- 약간의 업데이트가 필요해서 업데이트를 한다
- 이전의 소스에는 영향이 없다

#### 프론트와 백엔드의 협업은 어떻게 진행되지?

컨테이너로 각자 띄워서 하나? 그러면 백엔드가 업데이트되면 프론트는 언제 올리지?
클라이언트에서 graphql로 호출하는데,
데이터는 어디서 가져오나 - 테스트용 데이터를 고정해놓고 쓰나

- 그래서 CI가 나왔짜나
- 개발자가 docker compose를 다룰줄 알아야하겠다

#### 프론트엔드 서비스를 통합 포인트로 설정할 수 있나?

프론트엔드에서 마이크로서비스를 호출해서 인터랙티브할 수 있나?

네이버 검색 영역은 메인페이지와 분리되있지만 화면에는 같이 보인다. 이처럼
프론트엔드에서 호출할 수 있나?

#### 퀵 픽스와 롤백

퀵 픽스는 불합리한 것 같다
급하게 고쳐야한다면 다시 또 문제가 생길 수 있고
간단하게 고쳐진거라면 단계를 건너뛰고 올릴게 아니라 그냥 일반적인 플로우대로
진행하면 될거 같다
서버에 있는 걸 직접 고치는 것은 요즘에는 잘 안하니까...

큰 릴리즈를 했는데 에러가 발견되서 예전으로 되돌릴 수 없을때 퀵픽스를 하려고
하겠다
큰 릴리즈를 하고 처음에는 괜찮았다가 뒤늦게 문제가 발견되면 롤백보다는 빨리
조치를 하는게 낫겠다

#### 자주 쓰는 모듈을 이용해 프로젝트 진행 시 쓰게 되면

쓰면서 개선한 부분이 이전 프로젝트에 적용되야 할 수도 있고 안되야 할 수도 있다

- [ ] 전체 적용되도록 형태를 잡는다면 이전의 프로젝트에 적용하는 방법은?

#### 프로젝트 시작 시 꼭 필요한 것

모델 정의

모델 정의한 것을 서버리스로 배포.
그러면 각 모델의 연결은 어떻게?
람다로 한다면 제품 등록은 하나의 모델에 업데이트 하면 되는데, 불러올 때는 정보들이 묶여있는 상태로 불러야 호출 횟수를 줄일 수 있다.
근데 또 등록할 때 유저의 상태도 업데이트 하려면 등록도 두 개의 호출을 해야하긴 한다

#### server architecture to using some company service :행동:

특정 서비스에 종속되는 것을 조심하고 다양한 기술을 써봐야겠다
처음에는 특정기술에 의존하는 것이 영속성이 없어서 서버아키텍처에 포함하면 안되지
않을까 싶었지만 기술적으로 파악하고 사용하고 종속되지 않도록 해야겠다
앞으로도 새로운 기술을 계속 써야하기에 지금 있는 기술을 두루두루 다뤄봐야겠다
그러나 내 서버 아키텍처는 단순하고 가벼웠으면 좋겠는데 여러 기술을 사용하면
복잡해질 수 밖에 없는데 이를 계속 생각하고 있다

#### serverless

데브옵스를 문화로써 받아들인다면.
모두 serverless로 만들어서 마이크로서비스화하는게 서버관리 리소스를 없앨 수
있고,
그럼에도 서버가 필요한 작업은 모놀리스하게 만든다.
중앙 집적 리소스 서버에서 모든 자원을 관리한다.

서버가 필요한 작업

- 데이터베이스에 접근
- api 핸들링 (클라이언트에서 가능할듯)
- 모니터링?

람다의 약점

- 느린 시작
- 모노리스에 비해 통신의 비용이 든다(마이크로서비스라면 비슷)

로컬 테스트와 배포된 람다 간에 연결성을 높여보도록 구성해봐야겠다

serverless에 배포 전 로컬 테스트.
배포 후 자동 테스트
배포 후 에러 처리

#### Migration to own devops pipeline

1. Check Github repository
2. Dockerization
3. Manual test
4. Make CI test pipeline
5. Make package
6. Make kubernetes environment
7. Deploy pipeline
8. Make feed back loop
9. Make everything to automation

#### DevOps

DevOps is the union of people, process, and products to enable continuous
delivery of value to your end users.

- Deployment frequency - faster time to market
- Lower change failure rate - faster lend time for changes
- Increase Revenue
- Faster Mean time to recover

1. Plan
2. Develop + test
3. release
4. monitor + Lean

####

제품 제작 > 개발자 > 코딩
-> 한 사람이 편하게 감당할 수 있는 범위는??

#### Devops for machine learning

AI > ML > DL

Programming

- Algorithm + Data => Result

ML

- Result + Data => Algorithm
- Result + Data => Model
  Data => Predictions

Machine Leaning

- Prepare data -> Build and train -> Evaluate -> Prepare data

Planning

- Experimentation doesn't exclude planning
- Track work in the same tool as developers
- Provenance / Explainability

Source control

- Everything in source control
- canonical data sources
- ETL/ELT process in code
- Infrastructure as code

CI/CD

- Tests, linting, evaluation and scoring
- Training and experiment runs
- Artifact/model management
- Operationalization and deployment
- Commit - Triggered pipelines

Monitoring and Learning

- Retraining strategy
- Data triggers for CI/CD
- Don't forget performance
- Portability

Data - Preprocessing - Training - Test

How Training data work in production?

- Result is solid data?

How to add production data to training data?

## DevOps for ML

![devops_for_ml](img/devops_for_ml.png)
