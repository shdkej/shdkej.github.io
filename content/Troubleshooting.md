---
title   : Trouble Shooting
summary :
date    : 2020-06-23 22:39:25 +0100
updated : 2020-11-13 21:40:15 +0100
tags    : share_source
---

#### jupyter notebook
- install not working
 - `pip3 install jupyter` -> jupyter notebook not working
 - `sudo apt-get install jupyter-notebook` done
- ! tensorflow numpy version
 - pip install "nump<<1.17"
 - https://github.com/tensorflow/tensorflow/issues/30427

#### linux wifi hard blocked after suspend(lid off)
- `/etc/default/grub`
 - `GRUB_CMDLINE_LINUX_DEFAULT="acpi_osi=! acpi_osi='Windows 2009' quiet splash"`
- `sudo grub-mkconfig -o /boot/grub/grub.cfg`
- https://www.reddit.com/r/MSILaptops/comments/8vk878/ubuntu_wifi_hardware_disabled_after_suspend/e2t1f67/

#### raspberry pi network TODO
- can't connect wifi
- seem to be a hardware problem, when I used to a raspbian occurred the same problem.
 cannot access wifi before connecting ethernet

#### vagrant coreos
- clone
- assign etcd url
- user-data setting
- config setting
- http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter15/02
- ! vagrant-iginition version with fog-core
 - `wget -c https://releases.hashicorp.com/vagrant/2.0.3/vagrant_2.0.3_x86_64.deb`
 - `sudo dpkg -i vagrant_2.0.3_x86_64.deb`
 - conflicting dependencies fog-core (~> 1.43.0) and fog-core (= 1.45.0)
 - https://github.com/dotless-de/vagrant-vbguest/issues/292

#### Github officially support https
- ! Unavailable for your site because your domain is not properly configured to support HTTPS
 - change dns
 - 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
 - or recreate CNAME file
  - https://github.community/t5/GitHub-Pages/The-quot-Enforce-HTTPS-quot-Button-Isn-t-Working/td-p/11050

#### vagrant
- ! uid not match
 - `rm -r .vagrant`

- If want access each other. Set private network


#### !sdcard cant recognized problem
 - `diskpart`
 - `select disk <disk number>`
 - `clean`
 - Using SDFormatter, format

#### terraform init
- ! if storage exist. but occurred error bucket doesn't exist
 - `terraform init -reconfigure`
 - https://stackoverflow.com/questions/59053993/failed-to-get-existing-workspaces-querying-cloud-storage-failed-storage-bucke

#### ! Kibana error
 - default host cannot found
  - Need elasticsearch environment docker. setting
 - elasticsearch read only problem
  - maybe hdd space not enough then lock.
 - cannot install sample

#### ansible
- how to prevent to try kubectl init twice
- ! Failed to get information on remote file (./join-command): sudo: a password is required
  - `become: false`
- ! E:Malformed entry 1 in list file /etc/apt/sources.list.d/kubernetes.list.list (Component), E:The list of sources could not be read
 - repo: deb https://apt.kubernetes.io/ kubernetes-xenial main
 - space bar check...

- ! Vagrant access
    - /etc/ansible/hosts
    <ip> ansible_user <> ansible_pass <password>
    - apt install sshpass
- ! Install denied
    ```
    # Ansible_book.yml
    become: true
    become_method: sudo
    ```
- Install docker

#### ubuntu bluetooth multiple device connect problem TODO
- https://www.martinrosselle.com/bluetooth-connectivity-issues-on-ubuntu-and-how-to-fix/
 - fail

#### kubernetes ingress TODO
- ! external-ip <pending> lock

#### kubernetes helm
- cannot connect traefik dashboard in vagrant
- ! Error: unknown flag: --service-account
 - tiller was removed helm version 3

#### kubernetes execute tty
- ! Error from server: no preferred addresses found; known addresses: []

#### my server terraform GCP AWS
- Letsencrypt need IP test, it means I need to change DNS before server change
- Letsencrypt
 - ! failed authorization procedure
  - my mistake. my DNS to set to Cloudflare

- ! Github page build failed
 - site directory some problem -- nono
 - tags file don't allow -- delete tags file (ctags file by gutentags)

#### Jenkins
- ! when plugin install occurred ioexception error
 - image `jenkins` -> `jenkins/jenkins`
 - https://github.com/jenkinsci/docker/issues/785
- make easy pipeline
- github -> jenkins -> docker
- use http? and ssh?

#### AWS API
- Error: Error creating API Gateway Integration: BadRequestException: Invalid HTTP endpoint specified for URI
 - `""` delete
- Error: Error creating API Gateway Method: ConflictException: Method already exists for this resource
 - https://learn.hashicorp.com/terraform/aws/lambda-api-gateway
- {"message":"Missing Authentication Token"}
 - need aws signature
 - https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-use-postman-to-call-api.html

- ! API cannot access
 - using `{proxy+}` all access
 - but root access need more method, integration
- ! lambda update
 - need s3 to recreate
- ! s3 notification access fail
 - SNS topic policy name. I had change s3 bucket name, need to change policy

#### grafana prometheus
- prometheus not working
- ! err="opening storage failed: found unsequential head chunk files 194 and 257"
 - prometheus docker-compose cannot volume folder, need each file

#### gatsby troubleshooting
- ! WebpackError: Minified React error #130; visit https://reactjs.org/docs/error-decoder.html?invariant=1 30&args[]=object&args[]= for the full message or use the non-minified dev environment for full errors and additional helpful warnings.
 - gatsby-ssr.js problem

#### WSL REACT
docker compose volume 안되는 현상
ln -s /mnt/c /c
cp -R myproject /c/Users/myproject
permission deny
/etc/wsl.conf
`enabled = true \ options = 'metadata,umask=22,fmask=11'`
[https://github.com/docker/for-win/issues/2151](https://github.com/docker/for-win/issues/2151)
server nodemon error
Dockerfile에 막아뒀던 copy를 안풀었음3000 포트로 접속 안됨
vm에서 포트포워딩 해줘야 함
또는 docker ip로 접속 (192.168.99.100)
server로 접속 시 에러
버튼 누르면 동작

#### 이클립스
점 찍어서 자동으로 안뜨면
Window-preferences-java-editor-content assist-advanced-java proposals 활성화

#### python lambda korean broken
- sns -> lambda -> sqs -> lambda2
- sns -> lambda ok
- lambda ok
- lambda -> sqs (?)
 - lambda log in cloudwatch
 - yes, this send unicode.
 - when it sends sqs. ascii broken
 - problem in receive list -> convert string
  - receive body is string, so I've tried string split, but it need json dump
- sqs -> lambda2 ok (send message test ok)
- lambda2 ok (korean input test ok)

#### ! wasm rack
- if i want to add package (ex. grpc, aws-cli), go wasm not working. cpu over
 usage and freezing.

#### vimwiki
- tag
 - ! `[[ ctrl+x ctrl+o` enter not working, instead using `ctrl+o,n`
- wiki autocomplete enter not working
 - shift+enter working
- previous link get
 - `nnoremap <leader>l i<c-r>="[" . expand("#") . "]" . "(./" . expand("#") . ")"<cr><esc>`
 - https://www.reddit.com/r/vim/comments/f5gi2g/vim_notetaking_automatic_link_creation_between/
- omnicomplete(autocomplete) enter not working
- instead using `<S-CR>`
- Down arrow select content
 - `:inoremap <Down> <C-R>=pumvisible() ? "\<lt>C-N>" : "\<lt>Down>"<CR>`

#### ! docker 실행 안될 시 hypervisor 끄기
- `bcdedit /set hypervisorlaunchtype off`
- 파워셀에서 명령어를 실행해야 하고 관리자 모드여야 한다

#### ! Docker wsl <-> window 통신 하려면 추가 필요
```
export DOCKER_HOST=tcp://192.168.99.100:2376
export DOCKER_TLS_VERIFY=1
export DOCKER_CERT_PATH="/mnt/c/Users/shdke/.docker/machine/machines/default"
export DOCKER_MACHINE_NAME="default"
export COMPOSE_CONVERT_WINDOWS_PATHS="true"
```

#### ! GitHub Pages is temporarily down for maintenance.
it's really just temporarily down

#### ! docker 8080 cannot access
- docker-compose command go run server.go --> run is ok. but can't connect
- different command and run server.go in docker --> run and connect ok

#### ! golang test not working
package name
folder
go env
gopath
- `import . "."` problem

#### ! chsh -s not working
 - don't need sudo. but need password.

#### ! git - error: ref does not point to a valid object
```
git for-each-ref --format="%(refname)" | while read ref; do
    git show-ref --quiet --verify $ref 2>/dev/null || git update-ref -d $ref
done
```
from https://stackoverflow.com/questions/6265502/getting-rid-of-does-not-point-to-a-valid-object-for-an-old-git-branch
