## 메인
- [리더](Teamwork.md)
	- [기획자](Product.md)
	- [개발자](Software.md) - [디자인](Design.md)
	- [마케터](Marketing.md)
	- [운영자](Architecture.md)

#### 전략
약한고리를 강화한다
고객을 찾고 목소리 들어보기
정보 저장 방식 세팅하기
- 인스타 스레드 게시물
- 사진과 프롬프트
- 블로그 글

- 상세
	- 마케터는 스스로 피드백에 대해 습득하고 적용하고 수정한다
	- https://x.com/integer_han/status/2023927108859461901?ct=rw-th
	- 운영자도 자동으로 계속 운영 현황을 파악하고 이상 상황을 개선한다
	- 마케팅은 브랜드 DNA 를 가지고 한다. 디자인 시스템도 이용한다

## 계속 관리해야할 에이전트 파일
- 브랜드
- 디자인 시스템
- 리더 에이전트
- 4개의 공동작업자 에이전트
- Core LLM 파일
- 인프라 문서

#### AI 에이전트 세팅
구루들의 페르소나로 작성한 베이스 에이전트로 돌린다
- 기획 미야모토 시게루?
- 마케팅 세스고딘?
- 운영에 쿠버네티스 창시자 

프로덕트 산출물 - BRAND(O) 를 미리 만들어서 이걸 참고해서 진행
- 브랜드 아이덴티티
- 핵심 메시지 (문제 정의 및 핵심 목표)
- 요구사항 문서 PRD
- 유저 페르소나 가이드
- STP 전략 보고서 (시장세분화, 타겟팅, 포지셔닝)

개발 산출물 - TECH SPEC(O)을 미리 만들어서 이걸 참고해서 진행
- 디자인 시스템(O)
- 아키텍처 다이어그램
- 디비 ERD
- API 명세
- UI UX 스토리보드

히스토리 관리
- 결정 사항 기록 문서
- 가설 문서
- 캠페인 전략
- 사후 분석 보고서
- 서비스 위키

운영 방법
- 공통 대시보드
- 이슈 티켓 관리
- 각 문서가 서로 연결되고 업데이트 되어야한다
	- 연결되는 부분의 우아한 처리를 어떻게 처리하면 좋을까
	- 기획자가 가설제시를 한다치면 그 가설을 생각한 맥락을 문서로 뽑게하고 개발자나 마케터가 그걸 활용할 때 맥락을 참고할 수 있게
- 문서만 보고도 시스템을 다시 만들 수 있는 상태
- stateless
	- 맥락이 문서안에 있어야한다
	- Code as doc
- prd의 모듈화. 전체를 몰라도 기능구현
	- prd를 루트를 하나를 두고 기능별로 쪼개라고 한다 msa처럼. Epic이라는 큰 기능을 폴더로 두고 작게 쪼갤수록 좋다고 한다. 루트는 원페이저로
	- 그러면 prd는 요구사항 정의서의 역할을 할 수 있고 추적표로 마무리치면 되겠다
	- PRD 상단 5줄은 why와 비전을 명시해두고 prd를 기반으로 요구사항 정의서 요구사항 추적표를 완성 시키는 흐름으로 가면 완성도를 챙길 수 있을 듯
	- 요소
		- 목적, 기능
		- prd에도 가설과 선택이 들어간다
		- edge case 정의와 user story를 녹인다
		- ux 흐름을 담는다
		- 고려해야할 기술적 제약을 명시한다
		- 타겟과 상세구현? 
- 간단한 버튼 수정 같은 건 이슈 티켓 정도로 갈무리
- 디자인 시 디자인 룰 참조하게
- 개발 전 완성되는 문서와 만들면서 생기는 문서 구분

#### claude code 전역 세팅
- ~/.claude에 전역설정
	- ~/.claude/settings.json
	- ~/.claude.josn 도 있다
- skills
	- superclaude
	- skill-creator
	- stitch
- agents
	- superclaude
- commands
	- superclaude
- plugin - settings.json에서 설정
	- frontend-design
	- python, typescript lsp
	- code-simplify
	- asana
	- confluence
	- slack
	- playwright
- mcp
	- context7
	- playwright
	- sequential-thinking
	- stitch
	- magic - UI 도구
