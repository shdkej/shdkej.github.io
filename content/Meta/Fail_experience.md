---
title: Fail Experience
summary: How to prevent failure again
date: 2020-05-06 14:18:40 +0100
updated: 2021-12-02 23:16:33 +0900
tags: meta
---

# Fail Experience

- Before setting check state
  - Time is enough
  - If had problem, there's haven't backup. Big problem
- Two more thing I do at once. It is hard. Don't do that
- 내용을 안보고 복붙만 했다
- 데이터를 신경을 안썼다
- 테스트 후 원복을 제대로 안했다
- 코드 수정 후 확인을 하지 않았다
- c 드라이브에 있던 mx 드라이브가 포맷으로 날라갔다
  - onetab also dropped..
    > 또 멍청...
- I have removed onenote document directory. then can't sync onenote.
- 방울토마토를 떨어뜨렸다. 걸쳐진 물건이 움직이는 것을 신경안쓰는 탓..
- go wasm 테스트하다가 붙여놓은 코드 제대로 확인안하고 돌려서 컴터 뻗음
  - whenever import external library go to freeze
- forgotten food's expire date

#### nvme 를 사서 호환성이 떨어진다

기존 노트북과 새로 살 노트북에 모두 사용하기 위해 m.2를 찾은 것인데
nvme와 sata의 차이를 찾아보고 둘의 작동방식이 다름을 알았음에도 이렇게 호환이
안될 것이라고는 생각하지 못했다. 무언가 어댑터가 있을거라는 막연한 생각만 있었다
역시 또 끝까지 생각 안하고 막연하게 나둬서 문제가 되었다.

#### 내가 생각한 것을 내 삶에 적용 못시키고 있었다

알고리즘에 대한 지식을 쌓길 바랬으면
알고리즘에 대해 자료를 모으고
측정가능한 목표지점을 세웠어야 했는데 전혀 그러지 않았다

## 백업 전략을 세워야 한다

오늘 미디어 폴더가 날아갔다
앞으로 이런 사태가 일어났을 때 이를 되돌리는 방법을 만들어야 한다
미디어 파일은 용량이 너무 커서 백업을 하면 디스크를 두배로 먹게될 것이다
두배로 먹되 최신의 백업만 남겨도 될 것이다
개발용 폴더는 수시로 백업이 되야하고 최신 뿐만 아니라 일정 기간별로 기록도 남아 있어야 한다
워크스페이스는 github에 저장하고 drive에도 백업한다
개발환경파일 등은 어떻게 관리해야 할까

#### 마음에 걸린다

벽에 벽지가 약하다는 것을 간과하고 양면테이프로 돼있는 걸이를 벽에 걸어서 벽지가 찢어졌다

음식물쓰레기를 버리는 곳에 뒀는데 다음 날 그 봉투가 뜯어져서 바닥에 널려있었다. 근데 내가 뜯은게 아니라고 그냥 모르는 척 했다. 내가 챙겼어야 할 부분이었다.

#### 일을 큰 그림에서 바라보기

상황: 분명 잘 동작하는 건지 확인하는 질문을 받았음에도, 다시 확인해보지 않고 직감적으로 맞다고 얘기하고 그냥 넘어갔다

잘못된 점: 질문에 제대로 고민을 하지 않고 대충 답하고 넘어감

고칠 점: 질문을 받으면 고민을 하고 확인을 하고 대답한다.

일에만 몰두하지 말고 주변을 돌아보기

## problem solving

- faced problem
- return to before change
- change each one
- find exactly problem
- solve

[[blog/Deploy_ERP_server_story#missed items]]



# Uncategorized


## 이곳은 1년 이상 보관하지 말자. 옮길 수 없으면 지운다.


#### 도서정가제 하는이유 반발하는 이유
하는이유
할인을 할 힘이 있는 대형유통사 때문에 지역서점이 망할 수 밖에 없다
가격할인 경쟁으로 이어지면 창작자가 피해를 보게 된다

반발하는 이유
시행 후 지역서점이 살아났느냐? 아니다
지금을 보면 전체적인 판매량은 감소하고 책 값은 상승했다
책을 많이 보지 않는 현실과 함께
책이 팔리지 않음으로써 인쇄를 적게 하고 그럼으로써 단가가 상승하게 되었다

자본주의 시장에서 지역서점이 경쟁력을 갖추지 못하면 도태되는 것인가
대기업의 경쟁력을 지역서점을 이길 수 없는 한계가 있는 것인가

대형·온라인 서점이 도서 매입가는 정가의 50~65% 수준이지만, 중·소형 서점은 이를 70~75%에 매입한다

작가들은 도서정가제를 응원하는 쪽
> “내 첫 번째 정체성은 작가가 아니라 독자다. 도서정가제 없는 세계를 겪어봤기에 당시로 돌아가는 게 무섭다”면서 “도서정가제가 없었던 때는 베스트셀러 순위에 느닷없이 그날 많이 할인된 책들이 올라가기도 하고 생태계가 완전히 붕괴됐다. 출판사는 신작을 내는 데 부담을 겪고 그렇게 다들 몸을 사리다 보니까 젊은 작가들, 뭔가 다른 것을 말하고 싶은 출판인들이 설 땅이 점점 좁아졌다”고 돌이켰다. “다 무너지고 있다고 생각될 때 도입된 게 도서정가제”라며 “그 제도를 만들어놓으니까 신기하게도 1인 출판, 모험적인 책들, 대안적 목소리들, 작가들, 서점들이 자발적으로 살아났다. 지금 정부는 시민의 자발성에 빚지고 있는데, 자라날 수 있는 씨앗이 좀 더 길게 자라도록 해야 한다”고 강조했다.
>> 도서정가제에 대한 한강 작가의 입장

#### 메시와 보드진. 구단의 영역에 대한 과도한 침범 vs 정당한 불만 표출
바르셀로나의 보드진은 몇년마다 투표를 통해 선출된다
지금 선출된 보드진은 결과를 안좋게 보여줬고 감독은 계속 교체되었다.
심지어 팀내 프랜차이즈 스타가 보드진에 불만을 품고 이적을 요청하기에 이르렀다
감독은 계속 바뀌고 선수단도 안정적으로 꾸리지 못한(아르투르를 피아니치와 스왑딜을 한 것에 팬들의 불만) 보드진이 현재 상태에 대한 책임을 왜 지지 않는 것일까
보드진의 삽질이 없었다면 메시라는 선수 한 명이 구단을 좌지우지하는 상황이 구단을 운영하는 보드진에게 영향을 끼칠 수 없다는 반론이 재기될 수도 있겠으나 지금까지 보드진은 과도한 보호막 안에 있었다는 생각이 훨씬 크다

#### 정부가 무난하게 성적을 내면, 투명성을 요구하게 되고,
투명성은 다시 성적을 낮추고, 다시 숨긴채 일이나 잘하라고 한다

테러감시라는 명목하에 감시를 하게 된다

주요인물을 조사하면 그 관련된 사람을 조사하고 다시 또 관련된 사람을 조사하면 수가 엄청나다
그 사람들은 찾기 전에는 그냥 모래였지만 찾겠다는 의도가 생기면 검색망에 걸리게된다

#### 듀랑고는 과금정책을 줄이고 컨텐츠에 집중하는 이상향을 꿈꿨지만 유저들은
게임이 망한 후 재미없다고 한다. 서버문제와 노가다식의 게임진행방식이 문제가 있었고 리니지는 과금으로 욕먹지만 잘나가고 있다
온라인게임에서는 모두를 위한 평등한 게임은 모두를 만족시킬 수 없는 환상에 불과한 것일까
https://m.fmkorea.com/best/2991103061

#### 닌텐도 게임은 버그가 없나?
예전 콘솔게임은 업데이트도 안되는데 버그를 어떻게 잡았나?
- 버그가 없지 않다
- 하지만 이 버그를 이용해 게임 매니아들이 또 다른 컨텐츠로 이용한다.


---

1학년 입학하는 아이에게는 어떤 말이 도움이될까 어떤게 의미없을까
- 별거 없다

해방
무엇에 대한 해방
나는 해방되어있나?
내가 무엇의 노예일까

밸런스를 찾고 지금 하던것을 계속 하고 일을 은퇴할때까지 하면 충분히 먹고살고 할수 있다
그런데 그렇게 살면 충분할까
밸런스를 쫓는 삶 그걸로 충분할까
그냥 살다보면 조금씩 성장하는 삶 그걸로 충분할까

인간경험이 많은 것에 자격지심
연애에 자격지심
있는걸 인정하고 넘어서면 된다

개똥이라는 이름에서 다정함을 느끼는 황인찬

정보과잉 속 영어를 배움으로써 얻는 정보량
책을 읽음으로써 얻는 정보량을 생각하면 영어를 배우지 말아야 할 것은 아니다

남성다움과 자상함

농담은 상대방이 진짜 결핍을 가지고 있는것에는 하면 안된다
상대방이 잘할거같은걸 괜히 놀리는건 농담이 된다
근데 그러려면 상대를 알아야 한다


SQS 속성, 특징 값 확인
DynamoDB 속성, 특징 값 확인




## 08-11



#### [[ㄴㄴ]]
##### 글이 되기 전 꼭지
자기 PR vs 과시
과시와 자기 pr은 뭐가 다를까
말하지 않아서 서운할 수 있는 경우

##### 자기 PR vs 과시
과시와 자기 pr은 뭐가 다를까

과시는 우쭐대는 것처럼 보이고 자기pr은 정보를 준다
과시는 가진것을 드러내는 것이고 자기pr은 자신을 드러내는 것
베니스의 상인에서 금궤 고르기 장면
애플의 디자인
미즈노 러닝슈즈

그릇이 크다는건 자신을 과시하지 않아도 드러나는 것이라고 생각했다. 근데 맞나?

디자인만 다른 상품, 조잡함, 번지르르

겸손과 브랜딩
관종과 셀럽
있어빌리티

##### 자기 PR의 시대 (Public Relation)
면접에서의 자기소개와 자기PR - 사실나열과 강점활용

##### 자기 자랑 vs 자기 PR
수치심
내가 가진 장점을 어필
진정성
표현과도 얽혀있군, 표현력

권력욕, 인정욕구
나는 그래서 사실은
내가 얘기 안해도 나의 업적을 다른 사람이 말해서 알아줬으면 좋겠다
내 업적을 다른 사람이 또 다른 사람에게 얘기해주면 기분이 짱 좋다
나도 다른 사람 업적을 다른 다른 사람에게 말해줘야겠다

진광불휘 - 참된 빛은 번쩍이지 않는다
https://www.kihoilbo.co.kr/news/articleView.html?idxno=1029105

나는 어떻게 자기 PR을 하면 되는지 알지 못하는데 이걸 본문에 주요 내용으로 담으려고 했다
그러니까 글이 안써지지.. 그러면 이걸 알아가는 과정을 본문에 담고 어떤 차이가 있는지 확인하는 것까지 내가 할 수 있는데 그것만으로는 하나의 글이 되기엔 부족하다. 이걸 어떻게 마무리지으면 좋을까

#### 말을 할 때와 안할 때
대화할 때 얘기를 어디까지하고 어떤 건 안 할지에 대한 것을 자기 PR과 연관지어 생각했었는데 자기PR과는 완전 다른 영역이었다. 자기 PR은 강점을 드러내는 것이고 대화할 때는 그러기 위해 하는게 아니다. 그냥 말하다가 흘러나올 수는 있지만 그러기 위해 하는게 아니다. 그렇다면 대화는 뭘까

말 안하기의 장단점
장점
- 무슨 생각을 하고 있는지 알 수 없다
- 말한게 잘못 됐을 때 비난의 구실은 없다
- 섣불리 말하지 않아서 생각을 더 할 수 있다
단점
- 무슨 생각을 하고 있는지 알 수 없다
- 아무 얘기도 안해서 비난의 구실이 될 수 있다
- 말할 타이밍을 놓쳐서 더 말 할 기회가 없을 수 있다


몸을 사리는 것
말을 아껴서 다른 사람이 나에 대해 말하는 것을 막기
말을 해서 다른 사람이 내 이야기를 다른 사람에게 하는 것
나를 낮추었더니 다른 사람이 나를 깎아 내리는 경우
말을 해서 내가 다른 사람과 연결 되는 것

잘난척을 하지 않으려고
아는 척 하지 않으려고
아는게 있어도 말하지 않았다
그럼 무엇을 말 할 수 있을까

짝짓기를 하는 대부분의 동물 사회에서 과시는 해도 괜찮고 하지 않아도 괜찮은 선택의 문제가 아니라 필수다.
https://economist.co.kr/article/view/ecn202002020016

처음 봤을 때 대시는 성공률이 낮지만
어느 정도 안면이 트고 난 후에 기회가 있을 때 단숨에 대시하는 건 천천히 하는 것보다 효과가 좋을 것 같다


#### 천천히 시작하기의 장단점
시간이 없어서 단번에 하려고 하면 일이 잘 안된다
천천히 하나씩 시작하면 토끼와 거북이처럼 결과가 더 나아진다
관건은 처음 시작할 때 하는 양을 늘리는 것? 다시 한번에 하려는 것처럼 되버릴 수도 있다


---

instagram shnohshnoh

슬랙에는 깃랩 연동되는게 이미 만들어져있을거같은데 찾아봐야겟다


운영배포하는거 한번 보고
언젠가는 자동화할수 있을지..


## 11-18
- [ ] export
	- api 호출이 가능한 html 만들기
	- https://dev-bak.tistory.com/40
		- html에서 호출은 가능할 거 같다.
	- 템플릿을 html 화 하면서 한번에 바꿔주는 라이브러리도 있지 않을까
	- html 을 만들어놓고 거기에 변수만 넣어주고
	- api도 html로 호출할 수 있게 해서
	- s3에 템플릿이랑 변수를 합쳐서 업로드하게 하면
	- 되지 않을까
- 템플릿을 만들어서 템플릿 페이지로 이동시켰을 때 화면구성이 뜨도록
	- 뼈대가 있고
	- 안에 switch로 템플릿을 선택하고
	- 값들을 변수로 넣는다
- serverless nextjs 를 써서 그냥 라우팅 쓰는게 낫지 않을까
	- serverless nextjs가 next13 부터는 지원을 안해줘서 대안이 필요
	- sst 라는게 있다
	- https://sst.dev/examples/how-to-create-a-nextjs-app-with-serverless.html

## 11-05

- [x] 메인 배경화면 띄우기
	- 리로드 되면 styled component 값이 바뀌어서 image 링크랑 연결이 안됨
- [ ] export 폰트 파일 막기
- [ ] 버튼 누르면 코드로 export 시키기
	- next export를 코드로 실행시키는 코드가 17년도꺼라 지금은 임포트가 안되는데 뭔가 임포트할 방법이 있을 거 같은데 찾아보는중

## 11-03

serverless-nextjs 를 쓰면 api도 람다로 자동으로 배포해주나?
https://github.com/serverless-nextjs/serverless-next.js

## 10-28
TODO
- [x] s3 주소 스테이징과 연결하기
- [ ] 프론트 -> html -> s3 -> 호스팅 확인
	- renderToHtml nextjs 서버에 요청하는 듯
	- ReactDOMServer 리액트 기능인듯
![[Pasted image 20231028130238.png]]
https://react.dev/reference/react-dom/server/renderToStaticMarkup#rendering-a-non-interactive-react-tree-as-html-to-a-string

![[Pasted image 20231028152718.png]]
https://github.com/vercel/next.js/issues/2954
- next export를 코드로도 할 수 있는 듯

프론트 작업
- [x] s3 업로드
	- cors에 막힘
	- s3에 cors 설정 추가해줬지만 에러 계속 뜸
	- 버킷 이름을 잘못 입력해줘서 그런거였다
- 프론트에서 백엔드 api 호출
	- 무료 호스팅 서버는 CNAME 설정이 유료라서 설정을 못해서 thingdong.kr 에서 리다이렉트 되게 했는데
	- react fetch를 쓰면 리다이렉트 되는 응답은 받기가 힘들다
	- 터미널에서 리다이렉트 응답을 받을 수 있는지는 확인해보니 된다
		- `curl -L https://sta.thingdong.kr`
	- 운영에서는 필요없는 동작이지만...
	- 에러에 cors가 뜬다. 백엔드에 cors 설정 추가해주면 될듯.
	- 근데 cloudfront에서 header에 뭔가 넣어줘서 해결할 수 있을까?

- [x] s3에 각각의 파일을 숏 url 주소로 매핑하는거 확인
- cloudfront에 origin access를 추가하니까
- 생성된 cloudfront에 origin 설정이 s3가 뜬다
- https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/tutorial-s3-cloudfront-route53-video-streaming.html
1. cloudfront에서 origin access 추가
2. cloudfront - distribution 추가
	1. s3를 선택하고 위에서 만든 origin access를 연결
3. another domain name 등록 후 route 53 에 연결



## 10-27

s3 주소 dns와 연결
- 가비아로 주소 구매
- route 53의 ns 주소를 가비아에 연결
- s3 버킷이름을 도메인주소로 만들어서 route 53에 연결
- 권한 설정 해줘야 함 403 에러 발생
- 그래도 일단 가비아 ns가 aws걸로 변경된 것 자체는 확인이 된 듯
- `{ "Version": "2012-10-17", "Statement": [ { "Sid": "PublicReadGetObject", "Effect": "Allow", "Principal": "*", "Action": "s3:GetObject", "Resource": "arn:aws:s3:::wedding.thingdong.kr/*" } ] }`
- policy 이걸로 해주니 접속 잘됨


www 주소 연결 안됨
- nhost로 띄운 사이트의 주소로 CNAME으로 연결 시 접속이 안됨
- alb로 redirect 시켜주도록 설정해봤으나 안됨
- 왜 안되지?
- nslookup 으로 찔러보면 같은곳을 가르키긴 함
- s3 로 리다이렉트 된다고 해서 리다이렉트 되는 주소로 버킷을 만들어서 해봤는데 s3가 route 53에 안뜸
- cloudfront로 s3를 연결해서 해봤지만 cloudfront 리소스도 안뜸
- cloudfront 주소를 cname으로 바로 연결해봤지만 안됨
- DNS_PROBE_FINISHED_NXDOMAIN 에러 뜸
- https://docs.aws.amazon.com/ko_kr/Route53/latest/DeveloperGuide/routing-to-cloudfront-distribution.html
- cloudfront 에서 another domain names를 thingdong.kr로 설정하니까 뜬다.
- 루트 도메인과 서브도메인 각각 등록 필요
	- `thingdong.kr`
	- `*.thingdong.kr`


## 10-21
- liquibase diff 적용
	- intellij에 gradle 설정을 intellij use 로 바꾸고
	- plugin 설치하니까 된다
- [x] redoc 적용 및 사용 예제 만들기
- [x] db 에러 없애기
	- dialect 바꿔주니까 됨
	- 스테이지는 비밀번호 리셋하니 됨


`OpenAPI spec`는 RESTful API 설계를 위한 업계 표준 사양을 나타내고
`Swagger`는 OpenAPI Spec 에 맞게 디자인하고 문서화하고 빌드하기 위한 도구들의 모음
(open api 로 띄어쓰면 공공 api를 뜻함)

> `OAS(OpenAPI Specification)`는 REST 명세 포맷으로 널리 사용되고 있는 포맷 중 하나이며, 프로그래밍 언어에 종속되지 않습니다. OAI(OpenAPI Initiative)에서 만들어졌고, [OAS(https://openapis.org)](https://openapis.org/)에서 커뮤니티가 주도적으로 만들어가는 명세 포맷입니다.

`OAS(OpenAPI Specification)`는 json 이나 yml 형식으로 기술해야 하며 OAS 파일을 읽어서 디플로이 해주는 도구(Ex: swagger-ui)를 사용하면 아래와 같이 브라우저에서 편리하게 API 문서를 볼 수 있습니다.

`OAS(OpenAPI Specification)`는 예전에는 Swagger spec으로 불렸으며 3.0부터 [OpenAPI 3.0 Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md)라는 이름으로 표준화되었습니다.

Swagger 3.0 접속 주소 : [http://localhost:8080/swagger-ui/](http://localhost:8080/swagger-ui/)  
Swagger 2.0 접속 주소 : [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

- @Tag(name, description) - 컨트롤러 설명
- @Operation(summary = "", description = "") : 특정 API의 요약과 설명을 지정합니다.
- @ApiResponse : API 결과에 따른 코드와 설명을 추가합니다. (with @ApiResponses)
- @Parameter(name = "loginId", description = "로그인 유저 ID 값", example = "3", required = true)
- @Length(max = 20, message = "사용자 닉네임은 20글자 이하로 입력해야 합니다.")


swagger 주소 : http://localhost:8080/swagger-ui/index.html
redoc 주소 : http://localhost:8080/dist/redoc/index.html

https://hogwart-scholars.tistory.com/entry/Spring-Boot-SpringDoc%EA%B3%BC-Swagger%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-API-%EB%AC%B8%EC%84%9C%ED%99%94-%EC%9E%90%EB%8F%99%ED%99%94%ED%95%98%EA%B8%B0


```
// springdoc  
implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.0.2")
```

```kotlin
import io.swagger.v3.oas.annotations.OpenAPIDefinition  
import io.swagger.v3.oas.annotations.info.Info  
import org.springdoc.core.models.GroupedOpenApi  
import org.springframework.context.annotation.Bean  
import org.springframework.context.annotation.Configuration  
  
@OpenAPIDefinition(info = Info(title = "띵동", description = "Wedding Invitation API 명세", version = "v1"))  
@Configuration  
class SpringDocConfig {  
@Bean  
fun openApi(): GroupedOpenApi {  
val paths = arrayOf("/v1/**")  
return GroupedOpenApi.builder()  
.group("띵동 API v1")  
.pathsToMatch(*paths)  
.build()  
}  
}
```

```html
<!DOCTYPE html>  
<html>  
<head>  
<title>ReDoc</title>  
<!-- needed for adaptive design -->  
<meta charset="utf-8" />  
<meta name="viewport" content="width=device-width, initial-scale=1">  
<link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">  
<!-- ReDoc doesn't change outer page styles -->  
<style> body { margin: 0; padding: 0; } </style>  
</head>  
<body>  
<div id="redoc-container"></div>  
<script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>  
<script>  
window.onload = function () {  
var url = window.location.origin + "/v3/api-docs";  
Redoc.init(url, { scrollYOffset: 50 }, document.getElementById('redoc-container'))  
}  
</script>  
</body>  
</html>
```

```kotlin
import org.springframework.context.annotation.Configuration  
import org.springframework.web.servlet.config.annotation.EnableWebMvc  
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry  
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer  
  
  
@Configuration  
@EnableWebMvc  
class WebMvcConfig : WebMvcConfigurer {  
override fun addResourceHandlers(registry: ResourceHandlerRegistry) {  
registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/")  
registry.addResourceHandler("/*.worker.js").addResourceLocations("classpath:/static/")  
registry.addResourceHandler("/js/**").addResourceLocations("classpath:/static/js/")  
registry.addResourceHandler("/fonts/**").addResourceLocations("classpath:/static/fonts/")  
registry.addResourceHandler("/css/**").addResourceLocations("classpath:/static/css/")  
registry.addResourceHandler("/favicon.ico").addResourceLocations("classpath:/")  
// index.html 파일 경로  
registry.addResourceHandler("/dist/**").addResourceLocations("classpath:/dist/")  
}  
}
```

## 09-24

## 정적 페이지 자동 호스팅

사전작업
- s3 버킷 생성
- 해당 페이지 html 생성
	- 일단 완성된 html을 만들수는 없으니 글자만 있는 html을 가져와서 전달
- 필요 시 route53에 s3 연결 (s3 주소를 route53 주소와 맞춰야 함)

1. 버튼 누르기
2. s3에 정적호스팅 사용으로 html 업로드
3. db에 주소, 만료시간, 숏링크 저장

#### s3 비용은 어떻게 과금되는가
저장공간 GB 당 $0.023
데이터 송/수신 GB 당 $0.09
토이프로젝트 수준에서는 월 1GB 사용이 거의 안나올거라 없다고 봐도 될 듯


#### 백엔드에 구현하는게 좋을까 프론트에 구현하는게 좋을까
s3에 업로드하고 db에 데이터 저장
어차피 프론트, 백엔드를 거쳐야하는데
html을 생성하고 업로드 하는건 프론트에서 하는게 편하겠다
db에 저장하는건 백엔드에서 하는게 정석이긴 하다



## 08-26

#### 몽키 세팅
개발 환경 docker로 올릴 수 있게 세팅
스테이지 프리티어 찾아서 서버 올리고 주소 확보

- 디비 연결
- 테스트 디비 설정
- 자바 메모리 과다사용 확인
	- https://community.fly.io/t/deployment-of-java-spring-api-using-dockerfile/6708/3


## 08-18
디비스터디

데이터 모델링의 이해
데이터 모델의 성능
SQL 기본
SQL 활용
SQL 최적화 기본 원리




## 08-12
- 몽키
- AWS DA
- SQLD
- 상태체크

#### 몽키
- rds
    - docker
- ec2
- 배포관련 세팅
    - 스테이지 있이 ㄱㄱ
- 레퍼런스 조사

배포 파이프라인
- 개발
	- 로컬에서 도커 띄워서 실행
- 스테이지
	- EC2 프론트, 백엔드, RDS, CDN, ecs 를 써보면 좋겠다. fargate도 있네
	- ec2만 쓸 때랑, ecs를 쓸 때 비용 비교
	- fargate 
		- ecs를 ec2에 띄울 수도 있고 fargate로 띄울 수도 있다
		- 동일한 리소스를 사용하면 fargate가 더 비쌈
		- fargate는 운영에서 사용한만큼 사용되게 하고 스테이지는 ec2 최소사양으로 구성?
		- 네트워크에 제약이 있는 듯 하다
	- ecs 위에 있는 것을 개발자가 쉽게 볼 수 있을까?
		- 존재하는 리소스 : 이미지, 컨테이너
	- code deploy를 써야할까? github action으로 하자
	- 프론트는 서버를 띄우지 않고도 사용할 수 있을 거 같은데
		- 메인페이지는 정적페이지
		- 에디터화면은... 필요하겠다
	- terraform vs cdk typescript
		- https://tech.inflab.com/202202-aws-cdk-to-terraform/
			- 실제 리소스와 비교 방법이 cdk에 약하다?
			- cdk로 구성하면 더 복잡하다?
		- https://tech.inflab.com/202202-aws-cdk-to-terraform/
			- terraform만 aws에서 코드로 import가 가능하다?
		- https://www.linkedin.com/pulse/5-reasons-why-startups-should-choose-aws-cdk-over-terraform
		- cdk를 typescript로 작성할 수 있다는 점에서 매력적이었지만 aws에 종속적이라는 점에서 별로다
		- terraform에서 sg, vpc 만드는 부분을 모듈을 쓰면 간단하게 될까
		- https://wan2.land/posts/2022/09/30/aws-cdk-to-terraform/

![[Pasted image 20230812134203.png]]

k8s를 위한 cdkk8s라는것도 있다
gcp는 cdk가 따로 없는 듯 하고 cdk for terraform을 이용해서 terraform을 거쳐서 사용은 할 수 있는 것 같다
cdk for terraform 은 terraform에서 만든 건가 보다

#### 람다로 배치 돌리기
람다가 디비에 접근해서 배치를 실행시켜주면 배포가 편해질까?


## 06-25

- [ ] 캠페인 연동 시 문제가 생길만한 부분이 있을까
	- 캠페인 모니터링 로직
	- 캠페인이고, lastSendAt이 이전시간이고, 메시지상태 3000, 메시지리절트 상태 1000
	- 이렇게 되면 캠페인이 연동이 됐는지 여부는 알 수가 없다
		- 그래서 연동이 안된걸 몰랐다
		- 연동이 되야하는걸 다 됐는지 알려면?
- [ ] CKA 자격증 
	- kuberntes cheat sheet


## 05-15

docker dagger plus

nextjs - tailwind
hasura
rds
beanstalk


어따 배포하지
- docker container
- 데이터
	- minio 를 거쳐 s3?
	- postgres rds
https://free-for.dev/#/?id=docker-related

자바를 jar로 배포하는게 나을까 docker로 배포하는게 나을까
jar를 container로 감싸게 되는데
실행하는 코드를 dockerfile 안에 넣어놓을 수 있다


인프라를 코드로 관리하는 것이 꼭 필요한 것이 아닐 수 있다
- 관리 차원에서 관리해야하는 부분이 많아진다고 꺼려할 수 있다
	- 근데 장기적인 관점에서 관리를 한 곳에서 할 수 있어서 좋을텐데

gitlab에서 eb client 쓸 방법
https://suuntree.tistory.com/331

