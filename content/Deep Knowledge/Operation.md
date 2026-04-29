
## 운영

#### 장애 대응
- 인식
- 보고
- 롤백
- 복구
- 피드백

#### Postmortem
대응 후 회고

#### 종료시점을 내가 통제하면 관리가 편해진다
- uvicorn에 종료카운트랑
- karpenter에 expireAfter가 있고, jwtToken 같은 보안쪽에도 만료시간이 정해져있다

#### DevOps vs SRE
DevOps gonna make fast to deploy
SRE gonna maintaining production to reliability

#### SRE
To upgrade site reliability

1. Monitoring
   - Monitoring various content
   - Make automation
2. Performance check

Quick recovery scenario

- Check error 5xx, when error occurred rollback to prev version. And reporting
  error situation. Which are link, behavior, data, code line, build package,
  (commit source)


#### 성과 측정과 개선
- DevOps 성과 지표
	- DORA Metrics
		- Deployment Frequency
		- Lead Time
		- MTTR
		- Change Failure Rate

#### edge case
- 로그 폭발
- 권한 남용
- 시스템 다운
- 네트워크 혼잡

#### 운영까지의 고려
되돌릴 수 있는가
복구할 수 있는가
관리할 사람을 구할 수 있는가
버전관리

#### 프로덕션에 필요한 속성

보안, 개별 설정을 유연하게 하는 것, 관측성
- 되돌릴 수 있는가
- 복구할 수 있는가
- 수습이 가능한가
- 인수인계할 때 무리가 없는가 (사람을 구할 수 있는가)
- 안정성

#### Program
- code with log, test, api
- CI with lint, test, performance, dependency
- CD with deploy
- Monitoring with check node, api, log, performance

#### Need Extra Component
- M/L
- Elasticsearch
- [[Information#무질서한 원숭이(Chaos Monkey)]]

#### reboot report

load average 확인 후 cpu bound인지 memory bound인지 disk i/o문제인지 확인하는 것처럼
문제 감지되면 확인된 기록들을 캡처해서 리포트로 보내주고 재부팅하도록 설정
소프트웨어 로그, 시스템로그도 같이 캡처

#### 구성보다 관습, CoC

설정을 일일이 하기보다 관습적으로 따르게 하고, 설정이 필요할 때만 설정을 하는 방식

같은 약자로 Code of Conduct(행동 규범)이 있어 헷갈릴 수 있다.

#### 오토스케일링
- cpu나 메모리가 70% 이상이면 1대씩 늘리고 30% 미만이면 1대씩 줄이는 방식
- 근데 cpu와 메모리가 한번에 100%가 되는 경우가 왕왕 있음

#### 대규모 서버에서 겪는 문제
- 데이터 : 데이터의 동기화
- CPU : cpu 병목
- 네트워크 : 네트워크 병목

load average를 확인하고 sar을 통해 cpu 문제인지 io문제인지 확인한다

#### 대용량 트래픽
WAS에서 문제가 생길 때 다중화로 해결이 힘든 이유
- 다른 WAS를 찾아야 한다.
- 로그인 정보를 전달해줘야 한다. (세션 클러스터링 필요)
  - 그에 따른 관리 지점 증가

데이터베이스 다중화 힘든 이유
- 동기화

---
