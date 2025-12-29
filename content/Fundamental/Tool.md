---
title   : Linux, GIT, ETC
summary : fundamental tool
date    : 2020-05-06 19:57:59 +0100
updated : 2025-08-01 07:14:21 +0900
tags    : fundamental
---

# Linux

## bash script cheatsheet

- echo with color: `GREEN='\033[0;32m'`, `NOCOLOR='\033[0m'`
- check package installed: `if ! dpkg -s $PACKAGES >/dev/null 2>&1; then`
- check command with argument: `x=''`, `if [ -z ${1+x} ] then` //$1 = first argument
- check file exist: `if [ -e <file> ] then`
- check root: `if [ "$(whoami)" != "root" ] then`
- check input:

```
echo -n "please input"
read INPUT
if [ -z $INPUT ] then
```

- break when error occurred: `set -u -e`
- error occurred but prevent break: `<some command> || echo "failed"`
- allow every question: `yes | <some command>`
- write text to file: `echo <text> >> <file>`
- date: `$(date '+%F=%H=%M')`
- delete old file: `find <dir> -name "*.png" -type f -mtime +3 -delete`

## linux environment script (startup files)

interactive shell - terminal console

1. /etc/profile
2. ~/.profile
3. ~/.bash_profile
4. ~/.bash_login

interactive non-login shell
~/.bashrc
zshrc

non-interactive shell - script

#### hammerspoon 파일을 dotfile에 추가
- 기존 파일을 dotfile로 옮기고
- `ln -s 절대경로/file 옮길위치/파일명`

## ubuntu korean

alt_r can't recognized.
so, need change alt_r -> hangul
`/usr/share/X11/xkb/keycodes/evdev`

```
//<\RALT\> = 108; \ 는 빼고
...
//<\HNGL\> = 130;
<\HNGL\> = 108;
```

#### kubuntu korean setting

- kubuntu default korean failed
  - this layout is not korean
- fcfix failed
- uim byeoru success
  - `sudo apt-get install uim uim-byeoru`
  - language settings -> uim
  - execute uim > set default, remove global option, set byeoru on/off to hangul

## Linux distro

- base ubuntu, but it is no beauty -> kubuntu, but it is no light-weight -> mx-linux
- mx linux is not user-friendly, back to the ubuntu

#### distros

mx linux
deepin
chrome
backslash

#### linux set environment problem

- vim 8.1 >
- vim doesn't support python. -python
- zsh chsh
- oh-my-zsh can't recognize
- source
- big size of workspace
- touchpad behavior
- windows key behavior
- need set start bar

## curl

폴더 다운로드

- wget -r http://download/images
  특정 폴더에 다운로드
- wget -P /home/user/Downloads 'http://image.url.png'

## sudo

/etc/group 에 root 에 사용자 추가
/etc/sudoers 권한 수정 후 root ALL=(ALL:ALL) ALL 밑에 사용자 추가

## search large file

du -h --max-depth=1 /
du -h / | sort -rh | head -n 10
용량 큰 거 10개만 출력

## 한국 시간 맞추기

- ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

## backup

- 전체 시스템 백업
  - `tar -cvpzf backcup.tar.gz --exclude=/proc --exclude=/lost+found --exclude=/backup.tar.gz --exclude=/mnt --exclude=/sys /`
- 홈 디렉토리만 백업
  - `tar -cvpzf backuphome.tar.gz --one-file-system /home`
  - `tar 옵션 압축한파일명 압축할경로`
- 옵션
  - c : tar로 묶음
  - v : 압축과정 화면 추력
  - p : 파일 권한 저장
  - z : gzip으로 압축,해제
  - f : 파일 이름 지정
  - C : 경로 지정
  - x : tar 압축 해제
- 복구
  - `tar -xvpfz backuphome.tar.gz`

backup.sh 스크립트 짜기

- 압축

```
#!/bin/bash
//tar -옵션 /백업할디렉토리/백업파일명 /백업할 대상
tar -czpf /backup/backup.'date +%Y%m%d%H%M%S'.tgz
```

- 날짜 형식 쓰는 법
  - `$(date +"%Y-%d-%m")`
- 10일 지난 파일 삭제
  - `find /backup/ -type f -mtime +10 | sort | xargs rm -f`

자동화 설정
crontab 에 내용 입력

- `-l` 현재 등록된 작업보기
- `-e` 편집하기
- minute hour day month week(0=Sunday, 1=Monday)
- `sqldump` 후 백업 추가

## iptables

조건

- --source(s) 출발지 IP주소
- --destination(d) 도착지 IP주소
- --protocol(p) 특정 프로토콜(tcp,udp)
- --In-interface(i) 입력 인터페이스
- --out-interface(o) 출력 인터페이스
- --state 연결 상태와 매칭
- --string 애플리케이션 계층 데이터 바이트 순서와 매칭
- --comment 주석
- --syn(y) syn패킷 허용 여부
- --table(t) 처리될 테이블
- --jump(j) 규칙에 맞는 패킷을 어떻게 처리할지
- --match(m) 특정 모듈과의 매치
- -A 새 규칙 추가
- -D 규칙 삭제
- -C 패킷 테스트
- -R 새 규칙으로 교체
- -I 새 규칙 삽입
- -L 규칙 출력
- -F 규칙 모두 삭제
- -N 새 chain 을 만든다
- -X chain 삭제
- -P 기본정책을 변경한다

KEYWORD

- ACCEPT 받는다
- DROP 버린다
- REJECT
- LOG
- RETURN
- NEW 새로운 연결을 요청하는 패킷
- ESTABLISHED 기존 패킷
- RELATED 기존 연결이고 새로 연결 요청하는 패킷
- INVALID 어디에도 속하지 않은 패킷

## 서버 보안 설정

ssh 보안

- `/etc/ssh/sshd_config`
- ip 제한
- 포트 변경
- root 접속 제한
- Fail2ban 설치 ( 로그인 시도 아이피 차단 프로그램 )

#### ssh

- `sudo apt remove -y openssh-server`
- `sudo apt-get install -y openssh-server`
- `sudo su`
- Port 수정
- #PasswordAuthentication yes
- `sudo service ssh --full-restart`

> ssh에서는 인터넷 끊기면 세션 끊기는데 mosh에서는 세션 유지된다고 한다

일반 사용자 su 명령어 제한

- /bin/su 파일 접속 권한 설정
- /etc/pam.d/su 파일 auth required 주석 해제
- /etc/group 에 wheel(관리자 권한 대행 그룹) 에 원하는 유저 추가

계정관리

- Passwd 정책
- /etc/login.defs
- 그룹 권한
- 계정 권한
- 계정 에이징 설정
- Default 계정 삭제
- Umask 관리
- /etc/profile

파일 권한 관리

방화벽 관리

- /etc/sysconfig/iptables
- 방화벽 설정
  `-A INPUT -m state --state NEW -m udp -p udp --dport 53 -j ACCEPT`

파티션 분리

캐쉬 메모리 삭제

- Free -m 확인
- Sync && echo 3 > /proc/sys/vm/drop_caches 삭제
- Crontab 에 추가

## DB

Postgresql 설치

- `yum install -y postgresql-server`

기본 디렉터리

- /var/lib/pgsql/data
- Or /var/lib/postgresql/9.5/main/
- Data 저장 위치로 좋은 곳 -> /etc/stgresql/9.5/main/data

시작

- Postgres 계정으로 접속 후 진행
- Initdb
- Pg_ctl start
- Psql

2대 연동

- Wal 이라는 마스터서버의 로그를 만들어 스탠바이서버로 복사 후 스탠바이 서버에서 로그를 복원하는 방식으로 연동이 된다
- Wal 방식으로 log-shipping 방식과 streaming 방식이 있다.

#### db backup cronjob

`/etc/rc.local`

- `docker start postgres && docker start tomcat` 추가

```
crontab -e
* * * * * docker exec postgres pg_dumpall > /PGSQL_all.dump
docker cp postgres:/PGSQL_all.dump /home/pi/docker/postgres-pi/
```

#### Streaming

Master

- Replication 전용 유저 생성
- CREATE ROLE repluser WITH REPLICATION PASSWORD 'password' LOGIN;
- Pg_hba.conf 파일 편집(맨 밑에 추가)
- Host replication repluser 허용할IP md5
- Postgresql.conf 편집
- Listen_addresses = '\*'
- Wal_level = hot_standby
- Max_wal_senders = 2 wal 파일을 전송 할 수 있는 최대 서버 수
- Wal_keep_segments = 32 마스터 서버 디렉토리에 보관할 wal 의 갯수

Standby

- `sudo -u postgres /usr/pgsql-9.5/bin/pg_basebackup -h MASTER IP -D /var/lib/pgsql-9.5/data -U repluser -v -P --xlog-method=stream`
- `postgresql.conf`

```
Listen_addresses = '*'
Hot_standby = on
```

- `recovery.conf` 생성

```
Standby_mode = on
Primary_conninfo = 'host=MASTER IP port=5432 user=repluser password=passwrd'
```

[설치](https://www.lesstif.com/pages/viewpage.action?pageId=31850584)
[클러스터링](http://egloos.zum.com/histLinux/v/1227710)

## oracle DB

- lsnrctl start
- sqlplus /nolog
- connect sys/oracle as sysdba
- startup
- CREATE TABLE dept(deptno NUMBER(2),
  dname VARCHAR2(14),
  create_date date);
- desc dept;
- select \* from dept; //확인
- alter table dept
  Add (job_id varchar2(9)); -- 테이블에 추가
  -alter table dept
  Modify (job_id Number(2)); -- 테이블 수정
  -alter table dept
  RENAME COLUMN deptno TO no; -- 칼럼 이름 변경
  -alter table dept
- DROP COLUMN job_id; --- 칼럼 삭제
- DROP TABLE dept; -- 삭제
  -show recyclebin; -- 삭제 되면 recyclebin 으로 가고 이걸 볼 수 있다.
  -FLASHBACK TABLE dept TO BEFORE DROP; -- 되살리기
  -INSERT INTO dept(deptno,dname,create_date)
  VALUES(10,'maketing','15-feb-0'); --- 열 내용 추가
- select \* from dept where dname = 'it';
- UPDATE dept SET dname='accounting' --- 내용 수정
  WHERE deptno = 10 ; -- dept 의 deptno=10 인 쪽의 dname을 accounting 으로 변경
- CREATE TABLE dept(
  Deptno number(2) CONSTRAINT dept_deptno_pk PRIMARY KEY,
  Dname VARCHAR2(14) CONSTRAINT dept_dname_nn NOT NULL,
  Email VARCHAR2(30) CONSTRAINT dept_email_uk1 UNIQUE);
  ---> primary key 조건을 건 deptno 생성;
  not null 조건을 건 dname 생성;
  unique 조건을 건 email 생성; ---> primary key 는 not null과 unique 조건 포함됨;
  제약조건의 이름은 알아볼 수 있게 저렇게 해주는게 좋음

## DNS

name server 유형

- Primary : 주 네임서버
- Secondary : 백업 서버
- Cache only server : 지사용

설치 - `yum install -y bind*`

셋팅

- /etc/named.conf

```
Option
- Allow-query
- Zone
- Zone 에 도메인 이름 입력
- Type
- Hint 루트 네임서버
- Master 1차 네임서버
- Slave 2차 네임서버
- File 구체적인 dns 정보가 담긴 /var/named/domain.zone 파일의 위치를 넣는다.
- 마스터 - Allow-transfer {슬레이브 주소;};
- 슬레이브 - masters {마스터 주소;};
```

- /var/named/domain.zone

레코드

- SOA : zone파일의 시작. 도메인명을 적고 점을 꼭 찍는다. 도메인명과 관리자 이메일을 옆에 적는다. 네임서버가 인증 된 자료를 갖고 있음을 의미한다.
- NS : 해당 도메인에 대한 네임서버를 나타낸다 (?)
- A : 도메인에 IP를 부여한다.
- CNAME : 도메인에 대한 또 다른 이름이 가능하도록 한다.
- MX : 메일 라우팅 경로 조정
- PTR : ip 주소에 대해 도메인명을 매핑 (역방향)

#### 참고

`/etc/host.conf`

- DNS 주소값 찾을 때 어떤 DNS를 참조할지 정해놓는 파일
- `/etc/hosts` 등을 먼저 찾게 할 수 있다

`/etc/resolv.conf` - 호스트가 사용하려는 네임서버를 지정하는 파일

상대방 네트워크 찾아가는 순서

1. /etc/hosts
2. Cached dns data (방문했던 적 있는 곳인지)
3. DNS server query

- http://www.naver.com query
  - 10.0.2.200 -> 10.0.2.53:53 query -> root dns server query(힌트 정보만 알려준다)
  - .com dns server ip
  - .com dns server query
  - .com dns server answer
  - naver.com dns server ip
  - naver.com dns server
  - naver.com dns server
  - http://www.naver.com ip
  - to 10.0.2.200
  - http://www.naver.com ip
  - Browser -> ip address call

#### Setting

- `vi /etc/named.conf`

```
11 line: 10.0.2.53;
17 line: Allow-query : any;
36 line: name;[임의의 이름] 37 : type master; 38 : name.zone [임의의 이름.zonei]
```

- `service named start && chkconfig named on`
- `cd /var/named`
- `cp named.localhost [임의의 이름].zone -a`
- `service named restart`

And then,

- `vi sana.twice.zone`

```
IN SOA 도메인 ; 주소
//맨 밑에
NS
A 10.0.2.53
WWW
A 10.0.2.xx << 접속 할 주소 입력
```

```
//참고
$TTL 86400
@ IN SOA ns.abc.net. root.abc.net. (
    2007031500 ; 시리얼값 (년월일시간)으로 대부분 설정합니다.
    3H ; 2차 네임서버가 1차 네임서버에 접속하는 시간
    15M ; 접속 실패시 다시 시작할 시간 간격
    1W ; 1차 네임서버에 데이터가 없다면 1주 이후에 지워진다.
    1D ) ; 위에서 설정한 TTL값과 같은 의미
;

IN NS ns.abc.net. ; 도메인을 소유한 DNS의 도메인
IN MX 10 mail.abc.net. ; 메일을 보낼 도메인 또는 주소
IN A 123.123.123.123 ; 도메인이 찾아갈 IP주소
www IN A 123.123.123.123 ; [www.abc.net](http://www.abc.net) 도메인이 찾아갈 IP주소
mail IN A 123.123.123.123
* IN A 123.123.123.123 ; 모든 서브 도메인이 찾아갈 서버 IP
```

출처: (http://jobdahan.net/server_linux/895790)

## storage

설정
- /boot 만 100MB로 분리 후 나머지 LVM 으로 만든 후 LVM에서 /(루트), /home, /tmp 로 나눈다.
- fdisk /dev/sda
- 디스크 분할

nfs 설정
- /etc/exports 접속 허용할 PC 설정
- /공유폴더 허용IP(옵션) 허용IP(옵션) (복수 가능)
- 옵션
  - r w 읽기 쓰기
  - no-root-squash 루트 자격으로 접근 가능하도록 마운트
  - root-squash 루트 자격으로 접근해도 유저로 접근
  - noaccess 디렉토리 접근 못하게 한다
  - no_all_squash root를 제외하고 서버와 클라이언트의 사용자들을 하나의 권한을 가지도록 설정한다.
  - storage에서 포트 열어주고 web 등에서 마운트 시킨다
  - `mount -t nfs <storage IP>`: /디렉토리 /마운트 할 디렉토리

Storage 2대 연동? vs Storage 확장?

nfs 대신 glusterfs 를 쓰면 좋겠다

#### 디스크 설정

- 기본 설정에서 하드 추가
- 설치 시
  - 디스크 설정에서
  - create Custom Layout
  - create - standard - /boot -
  - Sda만 선택
  - 다시 Create
  - 또 create - LVM Physical Volume -
  - 전체 할당(Fill to maximum allowable size) - sdb만
  - Create - LVM Volume Group - 완료

#### quota

`yum -y quota`

- `vi /etc/fstab`
  /home Defaults 뒤에

```
usrjquota=aquota.user,grpjquota=aquota.
group,jqfmt=vfsv1
```

- `mount -o remount /home`
- `quotacheck -cugmv /home`
- `quotaon /home`
- `repquota /home`

```
fdisk /dev/sdc
N 새 설정
P 프라이머리
1 파티션 1
T 타입
8e LVM 으로 설정
W 저장
```

`pvcreate /dev/sdc1` 피지컬볼륨 생성

볼륨 그룹

- `vgcreate 볼륨명 /dev/sdc1` 볼륨그룹 생성
- `vgdisplay` 볼륨그룹 확인

로컬 볼륨 LV ( 논리 볼륨 )

- `lvcreate` `-l` (개수로 설정) `-L` (크기로 설정) `-n` (이름) 명령옵션
- `lvcreate -l 11517 -n` 로컬볼륨이름 볼륨그룹 이름
- `mkdir /volume`
- `mkfs.ext4 /dev/볼륨그룹/로컬볼륨`
- `mount /dev/볼륨그룹/로컬볼륨 /volume`

## Virtual box Ubuntu HDD 추가

virtual box에서 추가

- 파티션 잡아주기

```
fdisk -l
sudo fdisk /dev/sdb
n
엔터 엔터
w
//포맷
sudo mkfs.ext4 /dev/sdb1
//마운트
sudo mkdir /exthdd
sudo mount -t ext4 /dev/sdb1 /exthdd
//부팅 할 때 자동으로 마운트
ls -l /dev/disk/by-uuid > uuidtxt
```

uuid 내용을 `/etc/fstab` 에 저장

`reboot`

`df -h` 로 확인

#### virtual box ubuntu hdd 용량 확장

- `diskpart`로 vhd 용량 확장
- gpartition iso 설치
- gpartition으로 vhd 저장공간 설정
- lvm 으로 잡혀있다면 lvm 확장

확장

- `lvextend /dev/mapper/ubuntu--vg-root -l +2048`
- `resize2fs /dev/mapper/ubuntu--vg-root`

`df -h` 로 확인

#### How to expand VirtualBox's Virtual Hard Disk - N_CODER

https://pradeepgali.blogspot.com/2014/01/how-to-expand-virtualboxs-virtual-hard.html

## NFS 서비스

`vi /etc/exports`

- `/home/nfs-share 10.0.2.0/24(rw,sync,no_root_squash,no_all-squash)`

And then,

- `mkdir /home/nfs-share` //nfs-share 폴더에 디렉토리 생성
- `chown itwill.itwill /home/nfs-share -R` //사용자 권한 설정
- `service rpcbind start && chkconfig rpcbind on`
- `service nfs start && chkconfig nfs on`
- `yum install -y -q nfs*`
- `df -hT` << 마운트 됐는지 확인
- `ls -al /home` << 파일 확인;
  - 아이디와 비밀번호 설정을 안해놔서 권한 설정이 안되있음
- `useradd itwill`
- `passwd itwill`
- `umount 10.0.2.21:/home/nfs-share`
- `mount -t nfs 10.0.2.21:/home/nfs-share` 연결할 당시 계정 따라감

## FTP 서비스

- `vi etc/vsftpd`

```
12 : No
96 : 주석 제거 ( chroot <- 최상위디렉토리 한계설정 사용자가 접근 못하게 )
116 : use_localtime=YES < 우리나라 시간으로 맞춰줌;;
```

- `service vsftpd start`
- `chkconfig vsftpd on`

[DNS]

- `vi /etc/named.conf`

```
11 line: 10.0.2.53; 추가
         Allow-query : any; 추가
36 : name;
37 : type master;
38 : name.zone
```

- `service named start && chkconfig named on`
- `cd /var/named`

[WINDOW]
DNS 주소 10.0.2.53 으로 바꿔준다.

- `cp named.localhost name.zone -a`
- `service named restart`

## video recording

[obs-studio](https://obsproject.com/wiki/install-instructions#linux)

- `apt install ffmpeg`
- `sudo add-apt-repository ppa:obsproject/obs-studio`
- `sudo apt update`
- `sudo apt install obs-studio`
- filter setting
  - noise suppression -60dB

## WD Passport Unlock in linux

- https://github.com/0-duke/wdpassport-utils
- `sudo pip3 install git+https://github.com/0-duke/wdpassport-utils`
- `sudo wdpassport-utils.py -u -d /dev/sdb`

## linux battery

- status check
- `upower -i /org/freedesktop/UPower/devices/battery_BAT0`
- or `sudo tlp-stat -b`
- performance upgrade
- TLP

#### i3

- config file `~/.config/i3/config`
- network manager
- `nmcli device wifi connect <wifi-name> password <password>`

#### w3m

- `apt-get install w3m-img`
- need component
- history of search list > `~/.w3m/history`
- search shortcut

#### code-server

- code-server 설치하면 브라우저로 code 사용 가능
- code-server로 실행하면 코드를 불러와야함
- 볼륨 시키면 된다
- 프로젝트 볼륨 따로 설정, 볼륨 따로 되있어서 도커 죽어도 유지가능

#### WSL

1. windows 에 wsl 설치 후
2. vscode 설치 후 빌드환경 셋업
3. 윈도우 업데이트 (빌드번호 18xxx 이상)
4. 설정->업데이트 및 복구에서 개발자모드로 변경
5. 윈도우 기능에서 [서브 터미널 사용] 체크, [가상화 사용] 체크
6. 터미널에서 명령어 입력(아마도 위에 체크하는 부분과 동일한 듯)
   - `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux`
   - `Enable-windowsOptionalFeature -Online -FeatureName VirtualMachinePlatform`
7. store에서 우분투 설치
   - or in terminal (ubuntu 1804) `Invoke-WebRequeset -Uri https://aka.ms/wsl-ubuntu-1804 -OutFile ~/Ubuntu1804.zip -UseBasicParsing`
   - or in terminal (ubuntu 1604) `Invoke-WebRequest -Uri https://aka.ms/wsl-ubuntu-1604 -OutFile Ubuntu.appx -UseBasicParsing`
   - `Add-AppxPackage .\Ubuntu.appx`
   - `Expand-Archive ~/Ubuntu.zip C:\Distros\Ubuntu`
8. 확인
   - `wsl -l -v`

> 원래 wsl이 설치되고 2로 업그레이드 시켜줘야 하는데 win10 home이라서 그런지 최신버전으로 업데이트해서 그런지 2로 바로 적용됨

#### crontab not working

- `/etc/crontab` <-> `crontab -e`
- `/etc/crontab` is system cron
- `crontab -e` is user cron
- `crontab <filename>`

#### android mirroring app

- scrcpy
- `--bit-rate 2M --max-size 800` bitrate down
- `-S` turn screen off
- https://github.com/Genymobile/scrcpy
- kde connect
- `ufw allow 1714:1764/udp`
- `ufw allow 1714:1764/tcp`

#### replace all directory in linux using regex

- `find ./ -type f | xargs sed -i 's/  / /g'`[^1]

#### vim visual mode selection

- `vnoremap // y:Ag <C-R>=fnameescape(@")<CR><CR>`
- https://stackoverflow.com/questions/28011155/using-ack-vim-on-visual-selection

#### vim lag

- `:syntime on` -> move around -> `:syntime report`
- encode uri
- highlight matching pair
- lsp --> make on/off
- airline - git get head
- https://stackoverflow.com/questions/19030290/syntax-highlighting-causes-terrible-lag-in-vim

## external monitor

- `xrandr --newmode`
- `xrandr --addmode`
- `xrandr --output`
- `x11vnc -clip`

! xrandr: cannot find output 'VIRTUAL1'

- write to `/usr/share/X11/xorg.conf.d/20-intel.conf`

```
Section "Device"
    Identifier "intelgpu0"
    Driver "intel"
    Option "VirtualHeads" "1"
EndSection
```

! but 20-intel file make some problem
when entering full screen whatever. it is freezing.

## ipad as second monitor

1. create intel config file
2. reboot
3. `./ipad.sh -b -h`

## numpad as mouse pointer

setting -> assistive -> mouse keys
set mouse pointer speed - `sudo apt-get install xkbset` - `xkbset ma 60 10 10 5 10`

## linux copy and paste in terminal with mouse

drag copy area -> mouse center button click in terminal window

## ubuntu backup, snapshot

timeshift

## linux settings

shortcut - pomodoro alt+space
bluetooth with my phone

## linux text to image

```
echo "Hello world" | convert -size 360x360 xc:white -font "FreeMono" \
  -pointsize 12 -fill black -annotate +15+30 "@-" -trim \
  -bordercolor "#FFF" -border 10 +repage hello.gif
```

## font broken

- every font to square
- `sudo fc-cache --force --verbose`
- and reboot

## terminal app

- [terminal browser](https://www.brow.sh/docs/extensions/)

## vim window size

- `ctrl-w 10 +` window 10 line size up

## vim inoremap

- `imap <key> <C-O><complex-key>`
- `<C-O>` means insert mode to revert to normal mode momentarily
- https://vi.stackexchange.com/questions/13162/inoremap-nnoremap

## ubuntu font

- mv ttf file to `~/.fonts`
- terminal font list update `fc-cache -f -v`
- inconsolata

## python in vim

- `autocmd FileType python map <buffer> <F9> :w<CR>:exec '!python3' shellescape(@%, 1)<CR>`
- https://stackoverflow.com/questions/18948491/running-python-code-in-vim

## linux keyboard delay

- `xset r rate 200 30`
- https://wiki.archlinux.org/index.php/Xorg/Keyboard_configuration#Adjusting_typematic_delay_and_rate

## touchpad gesture

- browser tab close
- alt tab
- back, forward
- notification center

## crontab 에 스크립트 에러 없이 등록하기

`echo "0 */1   * * *   root    /home/sh/dotfiles/rclone.sh >/dev/null 2>&1" >> /etc/crontab`

#### 텍스트 분리
awk
sed
cut
grep은 가로에 텍스트가 있을 때
awk 는 컬럼 선택하기 쉬움
특정 줄만 뽑고 싶으면 awk 'NR\==1'
파이프라인 끝 명령어로 나온 출력값을 인자로 쓰고 싶으면 xargs

특정 컬럼만 뽑기
awk '{print $2}'

`lsof | grep tomcat | grep 'wrapper-m' | tail -n 1 | awk '{print $2}' | xargs kill -9`

## TLS

```
openssl req -X509 -nodes -days 365 -newkey rsa:2048 \
    -out ingress-tls.crt \
    -keyout ingress-tls.key \
    -subj "/CN=example.com/O=ingress-tls"
```

#### ssh key-gen

`ssh-keygen -t rsa`

mac에서는 ssh-keygen 으로 키 만들고 pbcopy로 복사 할 수 있다.

ubuntu에서는 xclip 이용

- `alias clipboard='xclip -selection clipboard'`

#### 라즈베리파이 와이파이 등록

- `/etc/network/interfaces`
- `/etc/wpa_supplicant/wpa_supplicant.conf`
  - 먼저 wpa_passphrase wifi명 wifi비밀번호
    입력해서 psk 값 얻은 후 복사해서
    conf 파일에 저장

#### ubuntu theme 꾸미기

- ~/.themes 또는 /usr/share/.themes 폴더 생성
- gnome look 사이트 들어가서 gnome-shell 또는 gtk3에서 원하는 테마 찾기
- 다운로드하여 압축 풀어서 폴더째로 .themes에 넣는다
- tweak에서 폴더이름 찾을 수 있다.

#### 리눅스에서 fzf로 파일명을 찾아서 삭제하려면

fzf | xargs rm 이런 식으로 쓴다

#### github without password

- 처음 클론할 때 설정하던지
  - `git clone `
- 이미 갖고 있는 프로젝트에서는 리모트 설정
  - `git remote set-url origin git@github.com/<username>/<repo>.git`
- https://zzpanqing.github.io/2017/02/28/github-push-without-username-and-password.html

#### 쉘명령어 앞에 &붙이면 백그라운드 작업

#### albert

mac의 alfred를 ubuntu에서 비슷하게 구현.
이걸로 문서와 북마크를 한 곳에서 검색할 수 있다.
근데 북마크를 한번씩 들여다보면서 뭐가 있는지 알때도 있는데 그것은 따로
구현해야한다
파일 내부 단어 검색이 안되는데 구현되면 좋겠다 > 근데 그러면 검색이 오래걸리겠다

#### markdown 줄 수 검색

wc -l \*.md | sort -rh | head -n 16

#### 변경 사항만 가져와서 빌드하기

```
git diff --name-only | grep 'packages' | sed 's,^\(.*\)/\(.*\)/\([^/]*\),\2,'

for o in $OUTPUT;
do
echo $o;
done;

---

FROM node:14.17.1 as build
ARG BUILD_CONTEXT

WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY ./packages/$BUILD_CONTEXT/package.json packages/$BUILD_CONTEXT/
RUN yarn install

COPY ./packages/$BUILD_CONTEXT packages/$BUILD_CONTEXT
RUN yarn build:$BUILD_CONTEXT

FROM nginx:stable-alpine
ARG BUILD_CONTEXT
COPY --from=build /app/packages/$BUILD_CONTEXT/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
---


FROM node:14.17.1 as build
ARG BUILD_CONTEXT
ARG BUILD

WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY ./packages/banadio-common packages/banadio-common
COPY ./packages/$BUILD_CONTEXT/package.json packages/$BUILD_CONTEXT/
COPY ./packages/$BUILD_CONTEXT packages/$BUILD_CONTEXT
RUN yarn install --production
RUN yarn build:$BUILD
---

FROM node:14.17.1-alpine
ARG BUILD_CONTEXT
ARG BUILD

RUN addgroup -g 1001 -S next
RUN adduser -S nextjs -u 1001

WORKDIR /app

COPY ./packages/banadio-common packages/banadio-common
COPY --from=build /[app/package.json](http://app/package.json) ./package.json
COPY --from=build --chown=nextjs:next /[app/packages/$BUILD_CONTEXT/.next](http://app/packages/$BUILD_CONTEXT/.next) packages/$BUILD_CONTEXT/.next
COPY --from=build /app/packages/$BUILD_CONTEXT/public packages/$BUILD_CONTEXT/public
COPY --from=build /[app/packages/$BUILD_CONTEXT/package.json](http://app/packages/$BUILD_CONTEXT/package.json) packages/$BUILD_CONTEXT/package.json
COPY --from=build /app/packages/$BUILD_CONTEXT/node_modules packages/$BUILD_CONTEXT/node_modules
RUN yarn workspace $BUILD_CONTEXT add next

USER nextjs

EXPOSE 3000
# CMD ["yarn", "start:BUILD"]
```

# GIT

사용자 정보 등록

- `git config --global user.name "shdkej"`
- `git config --global user.email shdkej@naver.com`
- `--global` : 절대적으로 설정된다. 프로젝트마다 다른 이름과 메일을 쓰려면 이 옵션을 뺀다
- commit 할 때마다 이 정보를 사용한다

git bash 홈 디렉토리 변경법

- `.bashrc` 파일을 만들어 원하는 위치를 입력한다
- bash 실행 - `vi ~/.bashrc`
- `$HOME` 환경변수를 바꾼다
- 바로가기 아이콘의 시작 위치를 바꾼다.

#### ADD - COMMIT - PUSH

- `git add {filename}`
- `git commit -m "comment"`
- `git remote add origin <원격 서버 주소>`
- `git push origin <branch-name>`
- `git pull` - 원격 저장소 내용 가져오기

#### Branch 관리

- 생성 : `git branch <branch-name>`
- 삭제 : `-d`
- Branch간 이동 : `git checkout <branch-name>`
- 목록
  - `git branch`
  - `-r` : 원격저장소의 branch 리스트를 보여준다
  - `-a` : 모든저장소를 보여준다.

[ ] 원격 저장소 branch 가져오기

#### push without login

- `ssh-keygen -t rsa -C "<git email>" -f $HOME/.ssh/<ssh name>`
- github web page -> settings -> SSH and GPG keys -> New SSH keys.
- `ssh -T git@github.com` # test to git
- `.git/config` > `url = git@github.com:<user>/<repository>.git`

#### git sensitive files delete

- https://stackoverflow.com/questions/872565/remove-sensitive-files-and-their-commits-from-git-history
- it also deleted file...

#### git hooks

- `cp .git/hooks/pre-commit.sample .git/hooks/pre-commit`
- need permission
- `chmod +x .git/hooks/pre-commit`

#### git ignore

- `git rm --cache (folder -r) <filename>`

#### git show

커밋 메시지, 수정된 파일 목록, 변경 내용 확인용

#### git simulation

https://learngitbranching.js.org/?locale=ko

#### git cheatsheet

상황별 스크립트를 만든다.
반복적으로 쓴다

지금 상황

- github flow로 진행
- master에 운영 소스
- 기능 브랜치 여러 개 진행 중
- 1. 기능 브랜치에 접근해서 내 작업을 진행
  - 기능 브랜치에 머지?
- 2. 내 브랜치를 만들어서 기능 브랜치를 땡겨오기?

꼬인 상황

- 기능 브랜치에 들어가서 작업 중
- 기능 브랜치의 최신 버전을 받기 위해 내 작업은 커밋을 만들어놓고 풀을 했다
- 가져온 최신 버전이 충돌을 일으켜서 HEAD^로 되돌아갔다.
- 충돌버전은 없어졌지만, 내 커밋도 없어졌다
- 다시 내가 작업하던 상태로 돌리고, 최신 커밋도 받고 싶다.
- 어떻게 하면 될까

  - 새 브랜치에서 기능 브랜치를 머지한다.
  - git fetch를 하고, rebase로 내 커밋을 마지막 커밋과 합치고, 작업한다.
  - 또는 rebase 대신 merge를 해서 분기를 보여줄 수 있다.
  - pull을 바로 해도 똑같이 동작한다. --rebase를 넣으면 merge 대신 rebase한다.
  - 내 문제는 pull을 하고 reset HEAD^ 한 부분에서 꼬임이 있었던 것 같다
  - 게다가 stash도 pop 했으니 뭔가 변화가 생겼을 것 같다.

- 리베이스는 어떻게 써야 효과적일까
  - 내가 기능 브랜치에서 빠져나와서 작업하고 리베이스 해서 합치면 되나!?
  - 그러면 마찬가지로 마스터만 남고 개발하던 흔적들은 합쳐지게 할 수 있겠다?
- 이전 커밋으로 갔다가 원래 위치로 돌아오는 법은?
  - log에서 돌아간 상태가 맨 위에 있게 되지 않나?
- 작업하다가 버그 픽스할 게 생기면 커밋해놓고 리베이스 -i 해서 쓸데없는 커밋은
  빼고 다른 라인으로 만들 수 있다. 그래도 그 커밋은 남아있어서 따로 올릴 수
  있겠지?
  - 그러면 그 커밋을 어떻게 조회하지? 브랜치 달라고 커밋 조회 가능한가?

git pull = git fetch(원격 저장소의 상태를 다운받고) + git merge(내 커밋을 원격저장소와 합친다)

#### cleaning a big size file in all git commit

bfg

```
docker run -it --rm \
    --volume "$PWD:/home/bfg/workspace" \
    koenrh/bfg \
    <COMMAND> //ex: --delete-files <filename>
              //    --strip-blobs-bigger-than 50M


git reflog expire --expire=now --all && git gc --prune=now --aggressive
```

other way - git filter-branch

#### git 브랜치 바꿔서 현재 수정 가져가기

수정을 했는데 브랜치를 바꿔서 커밋하고 싶은 경우가 있다

```
git stash
git stash branch <new-branch> stash@{0}
```

#### git ssh

`~/.ssh/config`에 특정 ssh key를 등록하면 id_rsa 대신 다른 키를 인식 시킬 수 있다

```
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github
```

#### git fatal: Not possible to fast-forward, aborting. 문제
- git config --unset 으로 잘 안됐음
- pull.ff 가 2개 설정돼있음
- git config --edit 으로 지워주니까 됨
- pull.rebase false가 default

#### git pull 했을 때 컨플릭트 나서 되돌리고 싶다면
`git merge --abort`


# ETC

## nginx alternative

- [openlitespeed](https://openlitespeed.org/)

## ansible

- https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-ansible-on-ubuntu-18-04
- setting /etc/ansible/hosts
- terraform provision execute only during create

#### ansible command vs shell

command isn't running in $HOME, shell is
command can't use operations like <,>,|,&
command is more secure.
https://blog.confirm.ch/ansible-modules-shell-vs-command/

#### ansible

- ansible-galaxy
- setting `/etc/ansible/hosts` file or make hosts file with `-i`
  - it need `,`

```
[webserver]
server_ip
# <work_directory>/hosts
```

- hosts test `ansible webserver -m ping -i hosts --private-key <private-key> -u <user>`
- https://alex.dzyoba.com/blog/terraform-ansible/
- how to connect with pub file

## Nginx letsencrypt

- DNS setting
- install letsencrypt
- `letsencrypt certonly --standalone`
- setting Nginx
- run Nginx

## terraform vs serverless

- note-reminder has terraform trigger option.
- it's not good..

#### 테라폼만 쓸지 서버리스를 같이 쓸지 고민중

서버리스는 개별적인 앱을 빠르게 빌드하고 다시 만들 때 가볍게 사용하기 좋고
테라폼은 좀 더 넓게 공유되는 자원을 관리할 때 쓰기 좋다

서버리스는 앱을 빠르게 띄우기 좋고 테라폼은 인프라 셋팅하기에 좋다
https://www.serverless.com/blog/definitive-guide-terraform-serverless/

## terraform

- Need update when changing a provisioner
- ! resource "null_resource" -> null

  - Do `terraform init`

- terraform taint aws_instance.example-server
  - aws_instance recreate when terraform apply
  - terraform null_resource is better then an instance make to a taint
    - https://github.com/gruntwork-io/terratest/blob/master/examples/terraform-remote-exec-example/main.tf
  - null resource need `terraform init`
- recreate instance with same eip
- !WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!
  - clear `~/.ssh/known_hosts` or recreate ssh key `ssh-keygen -R <host IP>`
  - https://www.ssh.com/ssh/keygen/
- ! aws_instance remote-exec ssh connection not working
  - user = "root" -> user = "ubuntu"
- `letsencrypt -d <domain> -m <email> -n(all agree) --agree-tos`

  - https://github.com/ployst/docker-letsencrypt/issues/18

- gcp metadata need ${}
- `ssh-keys = "username:${file("<PATH>")}"`
- Event Handling with sns, sqs
- https://dev.to/frosnerd/event-handling-in-aws-using-sns-sqs-and-lambda-2ng
- lambda function to python
- save s3

- ! s3 access-denied problem
  - bucket name not allow var. I have just input text
  - var allow. but name is global. it is really name exist problem.
- ! s3_bucket_notification invalid argument
  - 1. create SNS 2.create S3 bucket 3. Policy 4. notification
  - sns - aws_iam_policy - condition - values - (bucket arn -> bucket name...)
- every apply update s3, using `etag`

#### terraform ansible

- for provision `sleep 120;` is good to waiting ec2 instance creation
- ansible-playbook to make with ip, ip + `,`
- terraform has `depends_on`

#### use module. For different folders can use once.

#### github action terraform

- how to hide secret file
  - gcp credential file

#### ! change backend bucket

need delete `.terraform` dir, and `terraform init`

#### AWS Dynamodb terraform

- attribute need index
- any key can write, if exist with attribute

## serverless

- install `curl -o- -L https://slss.io/install | bash`
- !Error: spawn /home/sh/.serverless/bin/xdg-open ENOENT
  - no install xdg-open. manual install and copy to serverless/bin directory
- !"service" property is missing in serverless.yml
  - get started is sucks
  - run `serverless` for first setting

#### serverless

- python requirements
  - need install plugin serverless-python-requirements

#### serverless

- json으로 invoke 안됨
- nltk 다운로드 후 파일 못읽음
- konlpy 사용 시 java환경 필요한데 안됨

## vault

- install file
- move bin directory

#### vault in gcp

1. run docker ``
   - what is different with server-mode and another
2. add ssh
3. save file
4. read file

Vault가 강력한 암호화와 중앙화는 쓸모있지만 환경변수나 키를 다 관리하기에는 좀 불편한 것 같다
환경변수는 눈으로 확인해야 하는 값이기도 하고

#### 개발환경, 커맨드라인, CI/CD 환경, IaC에서 모두 활용 가능한 키밸류 관리 시스템이 갖고싶다
- Doppler - 상용서비스
- Infisical - 자체 호스팅 서비스
- Vault - 처음엔 이걸로 생각했지만 암호화 최적이고 좀 다루기 무겁다
	- 이게 근데 로그인 정보 관리 도구로 쓰기엔 편의성이 안되어있다

## google calendar api

1. credential.json 생성
2. `pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib`
3. 코드 실행
4. 인증
5. token.pickle 생성되고 코드 실행됨

- https://developers.google.com/calendar/quickstart/python

## nagios

Docker로 설치 후
`/opt/nagios/etc/` 설정파일 설정

- `/etc/resource` : 환경변수 설정파일
- object/Commend
- object/contacts
- object/template
- object/windows
- nagios

window 는 nsclient 설치

- 서버에서 command.cfg 파일에서 check_nt 부분 비밀번호 명시
- Telegram 연동 소스 받아서 설정

#### for docker monitoring

`chown nagios /var/run/docker.sock`

#### nagios 비밀번호 변경

- `htpasswd -c /opt/nagios/etc/htpasswd.users nagiosadmin`
- 콘솔로 비밀번호 입력

## aws lambda cronjob

- using cloudwatch event rule, event target, lambda permission
- more option cloudwatch log group, cloudwatch log subscription filter
- https://www.thedevcoach.co.uk/terraform-lambda-scheduled-event/

#### serverless aws sqs lambda

- sqs to lambda message parsing
- event['Records'][0]['body']
- lambda python requests
- cannot version 3.8, can 3.6

## devdash

- google analytic settings
- enable google report api
- export project json

#### cloud

- L/B free cloud
  - nothing
- GCP app engine 28/d free
  - it can be scaling

#### Current Used infra

- telegrambot(serverless)
- monitoring
- content based recommend(need s3 csv file)(terraform)
- s3 hosting(terraform)
- netlify(wiki homepage)
- github pages
- cloudflare
- empty
- ec2
- gce
- gcp app engine
- heroku
- oracle 2대

## 카프카와 다른 메시지큐

카프카는 분산, 고가용성, 고속에 특화
근데 무겁다

가벼운데 고가용성만 지원되면 좋겠다

## gRPC

(Remote Procedure Call)

gRPC 4가지 스트리밍 방식

- 단일
- 서버 스트리밍
- 클라이언트 스트리밍
- 양방향 스트리밍

3가지 stub

- Blocking stub
- (Async) stub
- Future stub

gRPC가 필요한 이유

- CORBA 등 과거의 RPC는 높은 복잡도, 높은 학습곡선, 낮은 개발생산성이 문제였다
- RESTful이 낮은 복잡도, 낮은 학습곡선 등으로 잘 사용하게 됨
- 그러나 게임 등에서는 성능상의 이유로 위의 CORBA 등이 사용되고 있었음.
- 구글에서 Stubby를 만들고 gRPC는 오픈소스 버전

Binary Protocol - Text Protocol(REST)
HTTP/2 base

- Connection Multiplexing
- Header Compression
- 양방향 Streamming

Browser에서 지원해야 함
데이터가 Binary라 바로 읽기 힘듬

#### grpc

- protoc 설치: `apt install -y protobuf-comiler`
- buf 설치: https://docs.buf.build/installation/
- `buf.yaml`로 디펜던시 설치
  - `buf beta mod update`
- `buf.gne.yaml`로 proto 파일 변환
- 생성된 swagger.json 을 브라우저에서 보려면 swagger-ui를 설치해야 한다

#### grpc

gateway에 grpc를 어떻게 등록시키나를 놓쳤는데
알고보니 grpc서버를 따로 실행하고 gateway에 포트를 알려줘서 접근하게 하는
방식이었다.

grpc gateway에서 루트 url은 지원을 안한다. 따로 http server에서 작업을 해줘야
한다.

#### grpc

데이터 아웃풋을 배열로 출력할 때 배열만으로 출력이 안되고 메시지 형태로 된다
name: [arr1,arr2]
그래서 받는 쪽에서 name을 골라서 받아야 되는데 이러면 안된다

람다는 reponse body 안에 다 넣어놓는 방식을 쓴다

array 안에서 이름 말고 다른 방식으로 값을 가져오는 방법은?
각 값마다 일일이 찾는 방법 밖에 없나...

- marshal, unmarshal

grpc message에 담는 방법 외에 google http body를 이용해서 담을 수 있다.
`import "google/api/httpbody.proto";`
`returns (google.api.HttpBody)`

#### grpc

1. object.proto 파일 생성
2. buf.gen.yaml 파일 생성 // proto-gen-go로 할 수 있지만 설정 일일이 하기 번거롭다
   ```
   version: v1beta1
   plugins:
     - name: go
       out: ./pb
       opt:
         - paths=source_relative
     - name: go-grpc
       out: ./pb
       opt:
         - paths=source_relative
   ```
3. buf generate
4. server.go 로 proto에서 정의한 함수 구현

#### grpc 구현 시

client도 같이 구현해야하나??
그러면 메인 로직에서 CRUD 만들고, server에서 CRUD 만들고, client에서 또 만들어야
한다. ㄷㄷㄷ

서버는 자신의 마이크로서비스에서 실행하도록 하고, 클라이언트는 임포트해서 가져다
쓰도록 되어있다.

#### grpc 통신 속도 확인

grpc가 아니어도 되지만 grpc로 하면 속도를 확보할 수 있다.

- [ ] grpc호출하려면 grpc호출 로직을 짜야하나? 간단하게 호출할 수 있는 방법은?

#### reference

- https://devjin-blog.com/golang-grpc-server-4/
- https://deepbaksu.github.io/2021/05/01/how-to-REST-from-gRPC/
- https://tech.buzzvil.com/handbook/grpc/

## text preprocessing

- 단어 빈도 수 체크
- 조사 제거
- 불용어 제거

## react table

react-table (검색, 정렬)
react-table-filter (각 열별로 겹치는 이름 필터 가능)

- https://blog.logrocket.com/complete-guide-building-smart-data-table-react/

## api gateway

api gateway를 쓰게되면 운영서버에서 띄운 것을 이용해서 테스트를 해도 되나?
로컬에서 개발자마다 띄워야되면 너무 귀찮을 것 같은데 그렇다고 아예 안쓸 수도 없고.

운영 환경의 docker container를 개발할 때 가져와서 쓰고
새로운 옵션이 필요하면 운영 환경에 풀 리퀘스트를 하도록 하면 점진적 개선이
되겠다
kubernetes nginx ingress 확인 해보기
istio와 비교

- [x] nginx도 api gateway라고 할 수 있나?
  - 있겠다. kong도 nginx기반으로 만들어진 것 같다.

api gateway or istio

- 응답이 body 안에 담긴다. body를 읽어서 판단한다

#### kong reference

kong을 yaml로 관리하는게 있는데, decK
이 yml이 인식하는 것들이 어떤게 있는지 api가 어딧는지 모르겠다

decK를 쓰는게 아니라 kong 자체 declarative 설정이 있다.

admin api 페이지에 나열되있긴 한데, 보기 힘들다

#### kong grpc gateway

kong으로 grpc 서버에 접속해서 grpc gateway를 만들 수 있다.

## husky를 쓰면 git hooks를 github에서 공유할 수 있다

근데 이것을 쓰면 써야하는 도구가 늘어남을 의미한다

#### dynamodb

"dynamodb의 프로비져닝된 용량(?) 부족에 따른 쓰로틀링 이슈를 겪으면서 dynamodb에 대한 회의"
[https://blog.rewuio.com/entry/%EA%B0%9C%EB%B0%9C%EC%9D%BC%EA%B8%B0-aurora-serverless#:~:text=dynamodb%EC%9D%98%20%ED%94%84%EB%A1%9C%EB%B9%84%EC%A0%B8%EB%8B%9D%EB%90%9C,dynamodb%EC%97%90%20%EB%8C%80%ED%95%9C%20%ED%9A%8C%EC%9D%98%EA%B0%80](https://blog.rewuio.com/entry/%EA%B0%9C%EB%B0%9C%EC%9D%BC%EA%B8%B0-aurora-serverless#:~:text=dynamodb%EC%9D%98%20%ED%94%84%EB%A1%9C%EB%B9%84%EC%A0%B8%EB%8B%9D%EB%90%9C,dynamodb%EC%97%90%20%EB%8C%80%ED%95%9C%20%ED%9A%8C%EC%9D%98%EA%B0%80)


## 동영상 스트리밍
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
