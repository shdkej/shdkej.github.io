---
title   : Linux
summary :
date    : 2020-05-06 19:57:59 +0100
updated : 2021-07-02 18:48:30 +0900
tags    : develop
---

## Directory
- `/`
- `/bin` - 기본 명령어가 저장된 디렉토리
- `/sbin` - ifconfig 등 시스템관리자용 명령어가 저장된 디렉토리
- `/home` - 사용자의 홈 디렉토리
    - `useradd` 명령어로 새 사용자를 생성하면 생성자와 같은 이름의 디렉토리 생성됨
- `/tmp` - 공용디렉토리, 임시 작업 디렉토리
- `/lib` - 커널 모듈 파일,라이브러리 파일 존재
- 커널이 필요로 하는 파일들이 존재
- `/usr` - 일반사용자들이 주로 사용하는 디렉토리
    - 일반 사용자용 명령어는 /usr/bin 에 위치한다.
- `/var` - 일시적으로 저장하기 위한 디렉토리
    - 내용이 수시로 변경될 수 있는 파일
- `/dev` - 디바이스 파일 ( CD-ROM 등 )
- `/etc` - 시스템 설정 파일이 존재하는 디렉토리
- `/boot`
- `/proc`

## bash script cheatsheet
* echo with color: `GREEN='\033[0;32m'`, `NOCOLOR='\033[0m'`
* check package installed: `if ! dpkg -s $PACKAGES >/dev/null 2>&1; then`
* check command with argument: `x=''`, `if [ -z ${1+x} ] then` //$1 = first argument
* check file exist: `if [ -e <file> ] then`
* check root: `if [ "$(whoami)" != "root" ] then`
* check input:
```
echo -n "please input"
read INPUT
if [ -z $INPUT ] then
```
* break when error occurred: `set -u -e`
* error occurred but prevent break: `<some command> || echo "failed"`
* allow every question: `yes | <some command>`
* write text to file: `echo <text> >> <file>`
* date: `$(date '+%F=%H=%M')`
* delete old file: `find <dir> -name "*.png" -type f -mtime +3 -delete`

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

## automatically run command when turn on the computer
/etc/rc.local
/etc/init.d/rc.local

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
- Listen_addresses = '*'
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
- select * from dept; //확인
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
- select * from dept where dname = 'it';
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
기본 파티션 분할
- `/boot` : 부팅 파일들 저장. 첫번째 파티션으로. 부팅 빨라짐. 100~500MB
- `/`
- `/tmp` : 웹파일들 저장됨. 보안문제로 분할 필요
- `swap` : 가상메모리로 사용되는 부분 . 사용자의 메모리의 2배 정도로 설정

LVM
- 논리 볼륨 매니저
- 기존 파티션으로 분할 해 놓으면 용량 부족이나 증설 시 복잡한데 이를 이용하면 바로 구현할 수 있다.

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

## GIT
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
7. 터미널에서 명령어 입력(아마도 위에 체크하는 부분과 동일한 듯)
    - `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux`
    - `Enable-windowsOptionalFeature -Online -FeatureName VirtualMachinePlatform`
8. store에서 우분투 설치
    - or in terminal (ubuntu 1804) `Invoke-WebRequeset -Uri https://aka.ms/wsl-ubuntu-1804 -OutFile ~/Ubuntu1804.zip -UseBasicParsing`
    - or in terminal (ubuntu 1604) `Invoke-WebRequest -Uri https://aka.ms/wsl-ubuntu-1604 -OutFile Ubuntu.appx -UseBasicParsing`
    - `Add-AppxPackage .\Ubuntu.appx`
    - `Expand-Archive ~/Ubuntu.zip C:\Distros\Ubuntu`
9. 확인
    - `wsl -l -v`

> 원래 wsl이 설치되고 2로 업그레이드 시켜줘야 하는데 win10 home이라서 그런지 최신버전으로 업데이트해서 그런지 2로 바로 적용됨

#### standard stream
- stdin
- stdout
- stderr

#### SIGTERM
- 종료 신호. 일반적으로 ctrl+z, ctrl+c 등을 눌렀을 때 신호가 발생하게 되있다
- 각 프로그래밍 언어에서 시그널 호출이 가능하다
- SIGINT, SIGKILL 등도 있는데, SIGKILL은 즉각 종료되지만
  SIGTERM은 신호를 받아서 내부 처리가 가능하다. graceful shutdown을 구현하는
  등으로 활용 가능하다

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
set mouse pointer speed
    - `sudo apt-get install xkbset`
    - `xkbset ma 60 10 10 5 10`

## linux copy and paste in terminal with mouse
drag copy area -> mouse center button click in terminal window

## ssh key-gen
`ssh-keygen -t rsa`

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

#### TLS
```
openssl req -X509 -nodes -days 365 -newkey rsa:2048 \
    -out ingress-tls.crt \
    -keyout ingress-tls.key \
    -subj "/CN=example.com/O=ingress-tls"
```

#### ssh-keygen
ssh-keygen 으로 키 만들고 pbcopy로 복사

ssh 생성해서 관리하고 github과 연동하는 것을 자연스럽게 할 수 있어야겠다
ci 이용 시나 push할 때 ssh permission을 확인하려는 목적인가?

.known_hosts
.authorized_keys

public 과 private.
private 는 목적지. 서버에서만 가지고 있는다
public 은 접속자. 클라이언트가 자유롭게 갖는다

ci 툴에서 서버는 ci 서버가 되는 것인가? 클라이언트가 내가 되고?
- ci 툴이 접속자고, github 저장소가 서버가 되어서, 서버에서 pub키를 가지고
  접속자가 private key를 가진다

클라우드 서비스에서는 노트북에서 생성한 ssh 를 cloud instance에 넘기고 내가 다시
public이 되어서 접근하는 것인가?
private는 미리 aws에 올려놓고 그것을 가져다 쓰도록 하면 좋겠다

포맷을 대비해서 ssh key를 파일로 갖고 있으려고 하는데 private key를 갖고 있어도
되나?

공개키를 서버에 등록해서 클라이언트가 비밀키를 가지고 있는다?

authorized_keys에 공개 키를 복사해 넣으면, 접속하는 곳에서 비밀키를 물어본다

aws 에서도 pub키를 서버에 보내고, 비밀키는 노트북에 둔다

.pem 파일은 뭐지

ssh 는 다른 컴퓨터에 접근할 때 키를 만들어서
상대 컴퓨터에 공개키를 제공해서 내가 들어간다고 알려주면 된다?
상대 컴퓨터가 내 공개키를 가지고 있다는 것은 내 접속을 허용하겠다는 의미다?
그럼 해커가 공개키를 쑤셔넣으면 보안이 뚫리는건가?

공개키, 대칭키
- 공개키는 비밀키를 공유하지 않아도 된다는 점에서의 장점이 있다.
- 대신 공개키를 가지고 있으면 누구나 정보를 볼 수 있다?
- 공개키로 암호화한 것은 비밀키가 없으면 볼 수 없다.
- 공개키 방식만으로는 서버에서 클라이언트에 안전하게 정보를 전달할 수 없다.
    - 비밀키가 해독을 해야하는데, 서버는 정보를 전달하는 쪽이니까.

공개키로 암호화 된 것을 복호화 할 수 있다. 그래서 공개키 방식은 파일의 안전을
보장해주지는 않는다. 하지만 그 파일의 신원을 확인해줄 수 있다.

RSA는 결과값을 가지고 있어도 원래의 값을 알 수 없는 소수의 소인수분해의 어려움을
통해 강력한 보안성을 가진다.
이게 TLS에서 어떻게 쓰이는거지?
비밀키가 원래의 값이고 공개키가 결과값인가?
- TLS = RSA + 대칭키
- HTTPS는 HTTP + TLS

SSH 와 TLS를 같은 원리로 생각했다.
ssh에도 public_key와 private_key가 있지 않은가
TLS에는 crt와 key가 있다,

해시 함수 MD5, SHA <-> 대칭키 AES, 공개키 RSA

GPG - 개인용 메시지를 암호화하려고 할 때 쓴다
- 내 공개키는 마구 뿌린다
- 그러면 내 공개키를 이용해 만든 데이터는 내 비밀키로만 열 수 있다.
- 내 공개키를 갖고 있다고 내 정보에 접근할 수는 없나? 수신용인가?
- 주인장의 사이트에 공개키가 올려져 있어도 그것이 조작된 것일 수도 있다. 그래서
  CA 업체에서 이를 검증한다.

- [X] SSH에서 pub키는 gpg키처럼 마구 공유해도 되는게 아니지 않나? pub키만 있으면
      서버에 마음대로 접속할 수 있는데
      - pub키가 서버가 갖는 키고, 클라이언트는 private key를 갖는다.
      - 그래서 pub키가 많이 퍼지면 클라이언트는 많은 곳을 갈 수 있다.
      authorized_keys, known_hosts
    - authorized_keys에는 pub키가 들어간다. 서버측에.

비밀키도 어차피 키를 지켜야한다는 것은 하나의 비밀키를 공유하고 그것을 지키는
것과 똑같다. 근데 비밀키를 공유한 적이 있냐 없냐의 차이로 보안성의 차이가 있다.

- [ ] HTTPS도 공개키 방식처럼 암호화를 개인키로 하면 비밀키로 복호화를 해야하는 방식인가?
- [ ] 공개키는 누구나 가질 수 있다. 비밀키로 암호화 한 것을 공개키로 누구나 열 수
   있다면 내용이 지켜지지는 않을 것 같다.
   - 그래서 End-2-End 암호화도 신경 써야 한다.
   - HTTPS에서 인증서로 신원을 확인하고, 그 통신에서 확인한 랜덤값으로 다시 키를
     만들어서 그 키로 데이터를 암호화한다.
   - 클라이언트가 처음 접속할 때 보내준 공개키로 랜덤키를 암호화해서 서버에
     주고, 그 키로 정보를 공유한다. 즉, 처음 만들었던 인증서는 신원확인용이다.
        - 신원 확인은 제 3자가 한다. (CA 업체)
   - 즉, HTTPS는 공개키 방식과 대칭키(암호) 방식을 모두 쓴다.
   - https://bravenamme.github.io/2019/12/03/https-2/
- [ ] 비밀키를 서버가 갖고, 공개키는 아무나 갖는다. 근데 CI에서 비밀키를 가지는
   것은 어떻게 생각해야하지? 브라우저에서는 서버가 비밀키를 갖는다.
    - 비밀키를 클라이언트가 갖는다. CI secret에 비밀키를 입력하면 builder에
      접근할 수 있게 된다. pub키는 어떻게 등록했더라? 다시 동영상 봐야겠다.
        - pub키를 deploy key에 넣고 private key를 secret에 넣었다
          github도 이렇게 되나? 되네


#### HTTPS
- [ ] 서버가 자신임을 증명해야 하는 이유는?
    - 클라이언트는 어차피 불량한 사이트에 들어가도 작업이 정상적으로 될텐데.
    - 중간에 길을 꺾어서 자신에게 결제하게 하는 것은 막을 수 있겠다.
    - 중간에 데이터 탈취를 못하게 하는 역할이 주 역할인가?
- [ ] HTTPS는 국가에서 막기 힘든 이유는?


## cleaning a big size file in all git commit
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
