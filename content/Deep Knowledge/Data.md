---
title: 데이터베이스와 데이터
summary:
date: 2021-02-27 20:53:34 +0100
updated: 2021-12-04 13:05:43 +0900
tags: deep_knowledge
---

## Database

- Data management: File - RDB - NoSQL
- ACID
- Atomicity
- Consistency
- Isolation
- Durability
- How would you find the most expensive queries
- NoSQL, for document and relational db
- NoSQL, CAP theorem
- N+1 Problem

#### 대용량 작업
- 람다에서 한번에 많은 요청을 비동기로 하게 될 때 최대요청량을 제한 (p-limit)
- 대용량의 검색이 필요할 때 무조건 paging 또는 iterator 또는 stream을 써야 메모리 문제가 발생하지 않는다는 것
- select 시 10만 건 이상이 조회되는 경우 피하기 위해 stream 이나 paging 필요함
	- paging도 10만건 넘는 대용량에서는 성능이 딸려서 기간 제한을 두거나 카운트를 안하고 다음 페이지, 마지막 페이지로만 이동하게 시킴
	- 메모리가 한정적이기 때문에 select를 계속 들고 있어도 안되고 조작도 힘듬
- 스프링에서 메모리가 계속 쌓이는 원인 중 2차캐시를 사용 중이면 old 메모리를 gc가 잘 회수해가지 못한다. gc가 잘 동작하도록 유도해줘야 한다
	- 일단 2차캐시 끄니까 메모리 사용량이 줄어듬. 계속 쌓이던게 잘 안없어져서 계속 늘어남


## Redis

- http://highscalability.com/blog/2019/9/3/top-redis-use-cases-by-core-data-structure-types.html
- Chained Linked List에는 약점이 있습니다. 한 Bucket 안에 데이터가 많아지면 결국 탐색 속도가 느려집니다. 이를 위해서 Redis는 특정 사이즈가 넘을 때 마다 Bucket을 두 배로 확장하고, Key들을 rehash하게 됩니다.
  - https://tech.kakao.com/2016/03/11/redis-scan/
- hash를 쓰면 일정 크기 이하까지는 ziplist라는 형태로 저장된다
- 메모리 사용이 많아져서 swap을 쓰게 되면 접근하는데 속도가 떨어진다
- maxmemory 확인
- keys, flushall 보다 scan 사용

#### data structure [[redis]]

- set vs hash vs strings in article
- ? which type fit for index file -- hash?
- true,false type -> bitmap 1.2M 10,000,000
	- [source](t.ly/KqGO)

#### redis hash crud

json data

- HMSET -> HSET
- HMGET
- HSCAN

## elasticsearch

- Argument
  - cluster, node, replica
  - index
  - documents with properties
- Search
  - get
  - search(match)
  - term
  - should, must, must not
- Type
  - completion
  - keyword
  - custom
  - text
  - date
- 증분 색인

#### elasticsearch

기본

- 인덱스 생성 후, 그 안에 도큐먼트를 넣는다
- Type, Id는 뭐지
  - Type은 원래 인덱스 안에서 카테고리 역할이었는데 없어질 예정이라고 한다.
  - 고정값으로 생각해도 되겠다(\_doc) 6.7 버전에서 \_doc으로 고정되었다
  - Id는 도큐먼트를 인식할 수 있는 값, db에서 primary key 같은 느낌
- 맵핑 - 데이터 형태 지정
- 쿼리를 안넣으면 전체검색이 된다는데? - ok
- 토크나이저와 아날라이저를 구분, analyzer가 tokenizer를 포함할 수 있다 +
  synonym도 포함 한다
- index 끼리 shard 할 수 있고, routing 하는 기능이 있다

정보

- tokenizer 설치 후 리스타트 해줘야 한다.
- 인덱스 수정은 힘들고, 새로 만들어서 리인덱싱 해줘야 한다.
- elasticsearch로 데이터를 관리하는 것은 우선순위 큐를 이용하는 것과 비슷한
  느낌이다. es에 넣으면 내부에서 기대하는 로직을 수행하고, 결과값을 기대했던대로
  받는다.
- 검색 기능은 Lucene이 담당하고 elasticsearch는 클러스터의 기능을 담당한다.

궁금한 것

- [x] 쿼리에 어떤 것들을 쓸 수 있는지, must, should,
- [x] 분석기 설정한 인덱스에서 검색했는데 결과가 동일함
- [ ] 초기화를 elasticsearch에서 할지, api server에서 할지??
- [ ] update할 때 기존에 것에 추가하는 작업이 안됨
- [x] 전체 검색이 전체를 검색 안한다. 카운트는 정상적으로 세는데 hit는 하다
      마나? default size가 10이었다.

#### synonym and user dictionary

userdict.txt 와 synonyms.txt를 준비해두고 인덱스 생성

```
> curl -X PUT "localhost:9200/analyze?pretty" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "analysis": {
      "tokenizer": {
        "nori_user_dict": {
          "type": "nori_tokenizer",
          "decompound_mode": "mixed",
          "user_dictionary": "userdict.txt"
        }
      },
      "analyzer": {
        "korean_analyzer": {
          "filter": [
            "pos_filter_speech", "nori_readingform",
            "lowercase", "synonym", "remove_duplicates"
          ],
          "tokenizer": "nori_user_dict"
        }
      },
      "filter": {
        "synonym" : {
          "type" : "synonym_graph",
          "synonyms_path" : "synonyms.txt"
        },
        "pos_filter_speech": {
          "type": "nori_part_of_speech",
          "stoptags": [
            "E", "J", "SC", "SE", "SF", "SP", "SSC", "SSO", "SY", "VCN", "VCP",
            "VSV", "VX", "XPN", "XSA", "XSN", "XSV"
          ]
        }
      }
    }
  }
}'
```

#### elasticsearch

user dictionary가 수정되면 다시 읽어야 하고, 인덱스를 close, open 해야 한다
user dictionary는 인식하지 못하는 단어를 인식하게 하는 것이고

- 신조어, 고유명사의 경우에 추가
  synonyms는 인식한 단어들 중에 다른 단어도 같이 검색되게 하는 것
- 사릉해, 얼굴-와꾸 등 기존 단어가 있는데 추가 검색이 필요한 경우 추가

#### elastic search

security

- don't bind to a public ip
- proxy all client requests to elastic search
- disable dynamic scripting(pre 5.x version)

design
index management patterns

- monolith
- rolling indexes(time based events)

query
term, bool

- smallest number of terms as possible
- use filter context for static, non-full-text term queries
- scripts will show down your searches

? how to manage score? (weight)


## 클릭하우스

- 분석용 데이터를 저장하기 좋은 데이터베이스
- Postgres에서 저장한 트랜잭션 데이터를 분석을 위해 옮기는게 일반적인 사용 방법
- 그래서 CDC 도구를 이용해서 rdb에서 옮기는 것도 구성할 수 있음
- 실시간 복제 : postgres -> cdc -> kafka -> clickhouse
- 배치성 복제 : postgres -> airflow -> clickhouse
- aws athena가 이 역할을 할 수 있다고 한다. 좋은데?
	- 실시간성이면 클릭하우스가 성능면이나 비용면이나 나을 것이고
	- 배치성으로 구해도 괜찮으면 athena로도 감당 가능 할 것 같다


---

## 데이터 관리방법

과거의 기록이 필요할 때 찾아지려면?
조선시대의 기록이 책의 형식으로 남아있는데 사료를 남기는 것의 중요성이 여기서 인식이 된다
그 중 직급을 적어놓은 책이 있는데 이 책은 직급에 해당하는 사람이 바뀌게 되면 책을 다시 써야될 것 같다
아니면 특정한 직급만 모아놓은 책을 만들 수도 있을텐데 관리를 다르게 해야되고 여러번 같은 내용을 작성하게 된다
데이터를 남기는 것의 중요성은 인식되었는데 책에는 한계가 있다
블록체인과 데이터를 어떻게 이용하면 데이터를 쉽게 관리할 수 있을까

#### 회사 데이터

데이터는 계속 쌓인다
필요없는 데이터를 정리해도 데이터는 쌓인다
데이터를 가공하는 것은 나중에 하더라도 최대한 많은 정보를 모으면 추후에 도움이
될 수 있다 - 추후를 대비하는 것은 코딩을 할 때는 당장 안쓰면 앞으로도 안쓴다고 하지만
데이터는 또 다른 것일까
데이터를 어떻게 보관하고 가공하고 관리할까
현재 이용되는 데이터, 잠재적으로 필요한 데이터, 남겨진 데이터
가득 쌓여있는 데이터를 안전하게 보관해야 되서 또 사본도 저장해야 한다
백업과 압축

잘 보관하려면 여러 위치에 여러 번 저장하면 될 것 같다.
그리고 격리된 장소에.

데이터를 잘 쓴다는 것은 무엇일까
원하는 데이터를 빠르게 가져올 수 있으면 될까

하둡 등 데이터 관리 툴은 어떤 가치를 주도록 설계 되있을까

데이터를 저장하는 형식은 어떤 것이 좋을까
csv, json, 순수 텍스트
순수 텍스트를 json으로 변환해서 사용할 수 있긴 있다
json을 순수 텍스트로 가공하기는 쉽지만
순수 텍스트를 json으로 가공하려면 신경을 써야 한다

#### computer and data

- big data make compute better work
- but I want make something that without data

#### 데이터, 메모리, 기억, 히스토리

## input 소스는 계속 쌓이는데 처리도 바로 하지 못하고

처리하려고 접근을 해도 바로 처리가 안되는 것이 있다.
이 지연상태가 답답함을 만든다
처리를 하면 어떻게 처리를 해야할까
일일이 모든 글의 리뷰를 남기면 좋겠지만 쉽지 않다

## 연상력

하나의 물체를 볼 때 여러 영역의 것들을 연상하고 연결하는 능력
연상력과 기억력
관련 영역에 있는 것을 연상하는 것도 중요
관련 영역에 없는 것을 연상하는 것도 중요
타이머를 개발한다고 했을 때
시계의 기능이 어떤 것이 있는지도 연상해보고
시계바늘을 또 다른 영역과 연상해보고

## memory

노트에 모든것을 기억하려고 하면 기억하려는 능력을 발달시키지 않으려 한다
플라톤의 대화에도 이런 이야기가 있다고 한다
[[Information#About write to a paper]]

#### 하루키는 생각을 노트로 안적는다고 한다

김중혁 작가도 그렇게 한다고 본 것 같다
중요한 생각이라면 다시 생각날 것이라 생각한다고 한다
하지만 나는 모든 것을 적으려고 한다
적어서 누적된 것을 보면 잊었던 것이 떠오르니까

#### 기억 기록

기억을 단련하면 좋다
근데 잊어버린 기억이 너무 많다
공부를 해도 시간이 지나면 까먹는다
기록에 의존하지 않고 잘 이용해야 한다

#### 내가 모르는 것들, 재밌는 것들이 그곳에 무수히 있다고 생각되었고 그것들을 놓치고 싶지 않았다

지금도 마찬가지고, 분명 저곳에는 내가 원하는 것이 수없이 많이 있을 것이기 때문에 찾고 또 찾아도 채울 수 없는, 다 찾을 수 없는 것이다. 하지만 못찾은 것들이 너무 아쉽고 뒤처진다는 느낌도 든다.
새로운 정보, 좋은 정보를 얻고 싶은데 모두 가질 수는 없다. 하지만 가질 수 있을거란 미련이 계속 생긴다

#### 1에서 20까지 있을 때 7번을 보고있으면 마음이 초조해진다

나머지 것들이 뭔가 있을 것 같아서
그렇다고 7번이 마음에 들었는데 넘어가면 7번을 잊을까봐 걱정된다

#### 좋은 정보를 다 알고 싶다는 것은 욕심이다

조절해야한다

새로운 분야의 정보를 습득하는 것과
깊게 파고들 때의 공부 방식은 다른가?

가치판단이 필요한 경우?
정보 전달을 목적으로 하면 가치 판단이 없는 것이 나은 것 같다
경험 공유의 목적이라면 가치 판단이 있어도 될까

#### 웹서핑과 인박스

웹서핑을 통해 의외의 발견을 하면 기분이 좋다
하지만 인박스에 많은 것이 남아있고 웹서핑은 효율이 떨어지기 때문에 우선순위를 생각할 필요가 있다
그때그때 하고싶은게 있고
그냥 웹서핑으로 내가 뭘하고싶은지 찾고 싶을때가 있고
인박스에 넣어놓은 것을 볼 때도 있다

#### 맞춤형 서비스와 정보 공유

개인 맞춤 서비스는 감시도구가 많을 수록 잘 써질 수 밖에 없다
주의해야 한다

정보 조직
어떤것을 보여주느냐에 제작자의 판단이 안들어갈 수 없다
투명한 정보제공은 가능한가?

모든 서비스는 사람이 만들기에 만든 사람의 영향이 들어간다
블록체인도 개발자가 피할 수 없는 이득을 가지게 되어있다

#### 중첩 구조보다

같은 구조인데 연결을 확인할 수 있는 구조가 좋을 것 같다

태그도 그렇고, 그래프도 그렇다.

마이크로서비스에서 데이터 연결 시 연결용 필드만 추가해서 연결해서 호출할 수 있도록 하면 좋겠다

- 근데 RDBMS의 관계 1:N, N:M 구조를 잘 구현하려면 그냥 RDBMS를 쓰는게 낫지
  않을까

Clean Architecture에서도 나오듯이 순환 참조 구조가 되면 복잡해진다.

DAG라는 데이터 형식으로 관리하는 방식이 있다.

## Search

#### permutations

data = 서피스 프로, 서피스프로
search 서피스 프로 -> result = 2 object?
reaching in bottom line,
rendering comment object

#### 기본 기능

- 검색어에 -<키워드> +<키워드> 를 사용 가능하도록
- 유의어 검색

---

#### graphql

유저와 제품이 있으면
제품은 하나의 유저를 가지기 때문에 제품과 유저는 묶일 수 밖에 없다?
그러면 마이크로서비스에서 유저와 제품은 하나가 되어야 하나?

백엔드에서 만든 로직을 클라이언트에서 일부분만 가져다 쓰는 것이 장점인가?
백엔드에서 대충 던져줘도 클라이언트에서 조합해서 쓰는 것은 안되나?

user를 가져오고 그 user의 ID를 이용해서 comment를 가져오려고 한다.
user 안에 comment가 있는게 아니라 comment안에 user가 있어서 반대로 찾으려고
한다.

#### board 상태 수정

텍스트만 허용되던 댓글창에 이미지와 동영상을 받아들이게 하려면
1년 정도 이내의 글들에 한해 텍스트 필드를 확장시키는 작업을 하고,
댓글의 속성을 변경하면 될까

텍스트 필드를 변경하는 동안에 다른 사람이 접근하면 문제가 생기나?

## 하둡 하나로 단일 진실 원천을 만드려고 하는 것

cqrs에 하둡을 쿼리용 디비로 두고
각 서비스가 커맨드를 한다?
서비스에 캐시 - 서비스 - 디비를 둬도 될까
캐시의 위치 더 좋은데가 있을까.

이 아키텍처에서
검색 기능을 추가할 때 쿼리만 가져오면 되나?
유저들의 기록을 바탕으로 제품 추천도 해줄 수 있나?

- 어떤 데이터 영역이 문제를 일으킨게 전체에 영향을 주기 때문에 마이크로서비스가
  나왔다. 그러면 하둡은 서비스와는 별개로 백업용으로 운영되어야 하려나...

#### 단일 원천

진실의 원천
오컴의 면도날
추론의 건전성

#### 데이터 저장소는 Bigquery이고 이를 불러오는 것은 다른 툴에서 할 수 있다

툴을 다른걸 쓰더라도 데이터는 같은 것을 쓸 수 있도록 할 수 있다
