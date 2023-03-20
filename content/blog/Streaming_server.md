---
title   :
summary :
date    : 2021-04-12 12:26:27 +0100
updated : 2021-04-12 12:26:40 +0100
tags    :
parent  : [[Blogging]]
---

#### 동영상 스트리밍
ffmpeg: 서버의 동영상을 읽어들인다
영상 - 인코딩 - 미디어 서버 - 전송 서버 - 동영상 플레이어 - 시청자
영상 - ffmpeg - rstp 서버 - 브라우저(http) - 시청자
인코딩 시 압축 H.264/AAC H.265 코덱 사용
인코딩 - 압축 - 송출 - 미디어서버에서 트랜스코딩(받은 영상의 화질 등을 변환 가능하게 하는 것) - HLS 변환
HLS: HTTP Live Streaming. M3U8을 이용해 작게 영상을 쪼개 시청자에게 전달

전송 서버(CDN) 을 활용해서 캐싱하여 서버의 부하를 줄인다
스트리밍 서버에서 인코딩 및 트랜스코딩은 굉장히 부하가 많이 들어가는 작업이라 서버 나눠주는게 좋겠다
업로드 대역폭이 출력 비트레이트의 두 배 정도는 되야 안정적이겠다
버벅거린다면 출력 해상도와 비트레이트를 낮춰야 한다.

#### 동영상 서버
스트리밍 서버 구축
RTSP
webRTC
ffmpeg
SRT

gRPC로 할 수 있나?

카카오
네이버
유튜브
폰헙
축구불법중계
스포티비

동영상 플레이와 스트리밍은 다르네

https://butteryoon.github.io/dev/2020/11/11/ffplay_restream.html
https://webnautes.tistory.com/m/1427
https://jeffrey-oh.tistory.com/346
https://eine.tistory.com/entry/HLS%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%9D%BC%EC%9D%B4%EB%B8%8C-%EB%9D%BC%EB%94%94%EC%98%A4-%EB%B0%A9%EC%86%A1-%EC%9B%B9-%EC%95%B1-%EA%B0%9C%EB%B0%9C%EA%B8%B0-1
https://m.blog.naver.com/woliver/221833439445

https://medium.com/naver-cloud-platform/%EC%9D%B8%ED%84%B0%EB%84%B7-%EB%9D%BC%EC%9D%B4%EB%B8%8C-%EB%B0%A9%EC%86%A1%EC%9D%80-%EC%96%B4%EB%96%A4-%EA%B8%B0%EC%88%A0%EB%A1%9C-%EB%A7%8C%EB%93%A4%EC%96%B4%EC%A7%88%EA%B9%8C%EC%9A%94-98423dc7fcd4

https://www.popit.kr/%EB%9D%BC%EC%9D%B4%EB%B8%8C-%EB%B9%84%EB%94%94%EC%98%A4-%EC%84%9C%EB%B9%84%EC%8A%A4-%EA%B5%AC%EC%B6%95%EC%9D%84-%EC%9C%84%ED%95%9C-%EB%85%B8%ED%95%98%EC%9A%B0-1%ED%9A%8C/

https://www.youtube.com/watch?v=aiGIlxV7WIE


서버
- https://github.com/ossrs/srs-docker
- https://github.com/aler9/rtsp-simple-server#docker
- 서버를 구동시키고 ffmpeg로 동영상을 서버에 제공하면 서버가 스트리밍한다


HLS - http live streaming 애플이 개발한 http 기반 스트리밍 프로토콜
`.m3u8` 확장자의 파일에 `.ts` 확장자의 파일이 저장되어 있고, ts 하나에 10초 정도
분량의 영상이 저장되어 있고, 이를 하나씩 받아서 연속적으로 재생하여 동영상을
재생하는 방식

[wavve 사태로 보는 m3u8](https://jybaek.tistory.com/894)
- wavve는 HLS를 사용 중

HLS로 스트리밍 하기 위해 먼저 동영상 파일을 m3u8로 변환한다
- ffmpeg 를 이용해 변환한다
- 스트리밍 영상을 변환할 수 있나?
