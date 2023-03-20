---
title   : EKS 맛보기
summary : 근데 이제 Terraform을 곁들인
date    : 2021-08-15 14:41:14 +0900
updated : 2021-08-17 22:18:42 +0900
tags    :
parent  : [[Blogging]]
---


## Terraform 을 이용해서 EKS 익히기
쿠버네티스 관리를 클라우드에 맡기고 쿠버네티스의 기능만 쓰게 해주는 EKS를 알아봅시다.

Terraform으로 EKS를 올리면서 구성요소는 어떤 것이 있는지 확인해보려고 해요.

#### 미리 셋팅 돼야하는 것들
- aws 계정과 credential (~/.aws/credentials)
- terraform 설치
- kubectl

#### EKS의 기본 리소스
- eks-cluster
- eks-worker-nodes
- vpc
- iam

#### 클러스터 생성
모듈을 사용하는 것보다 하나씩 리소스를 선언해보는게 기본 구조를 파악하기 위해
좋을 것 같아요.
- [terraform-provider](https://github.com/hashicorp/terraform-provider-aws/tree/main/examples/eks-getting-started) 에서는 테라폼이 제공해주는 소스로, 모듈 없이 뼈대를 알아볼
  수 있습니다.
- [terraform-aws-modules](https://github.com/terraform-aws-modules/terraform-aws-eks/tree/master/examples/basic) 에서는 모듈로 eks를 제공해주고 있습니다.
- [terraform 공식 가이드](https://learn.hashicorp.com/tutorials/terraform/eks)
- [terraform eks 리소스 document](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_cluster)

첫번째 예제(terraform-provider)를 참조해서 알아보도록 하겠습니다.
```
git clone https://github.com/terraform-providers/terraform-provider-aws.git
cd terraform-provider-aws/example/eks-getting-started
```

먼저 aws로 provider 설정이 돼있구요.
```
# providers.tf
terraform {
  required_version = ">= 0.12"
}

provider "aws" {
  region = var.aws_region
}
```

eks cluster라는 리소스가 있습니다.
필수 옵션으로 `name`, `role_arn`, `vpc_config` 가 있습니다.
```
# eks-cluster.tf
resource "aws_eks_cluster" "demo" {
  name = var.cluter-name
  role_arn = aws_iam_role.demo-cluster.arn
  vpc_config {
    subnet_ids = aws_subnet.demo[*].id
  }
}
```

`vpc_config` 안의 항목이 예제 소스에는 `security_group`도 있지만 `subnet_ids`만 필수입니다.

eks cluster에서 role과 vpc의 subnet을 필수로 요구했으니 따라가보도록 하겠습니다.

```
# eks-cluster.tf
resource "aws_iam_role" "demo-cluster" {
  name = "terraform-eks-demo-cluster"
  assume_role_policy = <<POLICY
  ...
POLICY
}

# vpc.tf
resource "aws_vpc" "demo" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "terraform-eks-demo-node",
    "kubernetes.io/cluster/${var.cluster-name}" = "shared",
  }
}

resource "aws_subnet" {
  count = 2

  cidr_block = "10.0.${count.index}.0/24"
  vpc_id = aws_vpc.demo.id

  # optional
  # availability_zone = data.aws_availability_zones.available.names[count.index]
  # map_public_ip_on_launch = true
}
```

여기에 iam role policy attachment와 az 설정, route table, gateway가 추가로
있지만 일단 뼈대만 확인하기 위해 없이 해보도록 하겠습니다.

하지만 worker node 는 왠지 있어야 할 것 같아 추가해보겠습니다
- 예제 소스에서 worker node가 따로있는 것을 통해 node를 따로 선언해야한다는 것을
  유추해 볼 수 있는데, document 만으로는 따로 만들어야 한다는 정보를 얻을 수
  없었습니다.

```
# eks-worker-nodes.tf
resource "aws_eks_node_group" "demo" {
  cluster_name = aws_eks_cluster.demo.name
  node_role_arn = aws_iam_role.demo-node.arn
  subnet_ids = aws_subnet.demo[*].id
  node_group_name = "demo" #optional

  scaling_config {
    desired_size = 1
    max_size = 1
    min_size = 1
  }
}
```

어떤 인스턴스를 쓰는지는 옵셔널이네요. 기본 인스턴스는 amazon linux로 eks용
이미지를 aws에서 제공해주는게 있다고 합니다.

마지막으로 가이드를 보다보니 kubeconfig를 output으로 빼서 로컬에서 커맨드를 날릴
수 있게 하는게 유용한 것 같아 output을 추가하겠습니다.
```
# output.tf
locals {
  kubeconfig = <<KUBECONFIG

apiVersion: v1
clusters:
- cluster:
    server: ${aws_eks_cluster.demo.endpoint}
    certificate-authority-data: ${aws_eks_cluster.demo.certificate_authority[0].data}
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: aws
  name: aws
current-context: aws
kind: Config
preferences: {}
users:
- name: aws
  user:
    exec:
      apiVersion: client.authentication.k8s.io/v1alpha1
      command: aws-iam-authenticator
      args:
        - "token"
        - "-i"
        - "${var.cluster-name}"
KUBECONFIG
}

output "kubeconfig" {
  value = local.kubeconfig
}
```

여길 보니 `aws_eks_cluster`의 `endpoint`, `certificate_authority`,
`var.cluster-name`를 변수로 가져오는군요.

#### 그럼 이제 뼈대를 올려보도록 하겠습니다.

! 시간당 $0.2 정도 든다고 합니다. 1시간 안에 끝내도록 해보겠습니다.
- 클러스터 관리에 시간당 $0.1,  EC2를 이용하기에 인스턴스 요금이 추가로 듭니다.

`terraform init, plan, apply`

생성이 오래걸려서 콘솔을 한 번 확인해봤습니다.
- 콘솔창에서 생성하는 구성을 보니 네트워크에서 엔드포인트를 설정하고, CNI,
  CoreDNS, kube-proxy 버전을 고르도록 돼있는 반면, terraform에서는 이 설정을
  안하게 되네요.

클러스터에 리소스를 만드는데 시간이 많이 걸립니다.

! 노드 그룹 생성 중 Ec2SubnetInvalidConfiguration 에러가 발생했습니다.
```
node group demo does not automatically assign public IP addresses to instances
launched into it. If you want your instances to be assigned a public IP address,
then you need to enable auto-assign public IP address for the subnet. See IP
addressing in VPC guide:
https://docs.aws.amazon.com/vpc/latest/userguide/vpc-ip-addressing.html#subnet-public-ip
```
- 서브넷에서 public IP assing을 할 수 있도록 하라는 것 같습니다. 마침 아까 vpc
  subnet에서 주석처리한 `map_public_ip_on_launch` 값이 있었습니다. 이 값을 다시
  설정해주니 노드그룹이 생성되었습니다.

이렇게 eks cluster와 vpc, subnet, iam만 설정하면 eks는 생성되는 것을 볼 수
있었습니다.

하지만 이것만으로는 아무 기능이 없고 실제 일을 하는 노드도 생성해야함을 알 수
있었습니다. 마찬가지로 실제 사용을 위해서는 추가적인 리소스가 더 필요할 것으로
보입니다. 그건 차차 사용하면서 필요할 때 추가해보도록 하겠습니다.

#### 쿠버네티스 동작 확인
다음 작업은 만들어진 클러스터를 이용해서 kubernetes에 pod를 생성해보도록
하겠습니다.


[aws 문서](https://aws.amazon.com/ko/blogs/startups/from-zero-to-eks-with-terraform-and-helm/)를
  [번역한 글](http://dveamer.github.io/backend/TerrafromAwsEks.html)을 참고해서 진행해보도록 하겠습니다.

`terraform output kubeconfig > ~/.kube/config`

`kubectl get node`로 확인
- 실패
- Unable to connec to the server, executable aws-iam-authenticator not found
- [aws-iam-authenticator](https://docs.aws.amazon.com/ko_kr/eks/latest/userguide/install-aws-iam-authenticator.html)를 설치해봅시다.
    - 네, 설치하고 환경변수 등록했더니 됩니다.

#### 오토스케일링을 통해 트래픽 대응 확인
서비스를 하나 띄워두고 HPA를 만들고 트래픽을 받아서 오토스케일링을 잘
하는지 확인해보도록 하겠습니다.

오토스케일링은 쿠버네티스 HPA 또는 EKS Cluster Autoscaler를 이용할 수 있습니다.

스케일링을 위해 metrics-server를 설치해야합니다.
- metrics-server 설치
  `kubectl apply -f  https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml`


[간단한 hpa 테스트 방법](https://kubernetes.io/ko/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/)을 참고해서
metric-server를 설치한 후 테스트해봅시다.

```
# 디플로이먼트 생성
kubectl apply -f https://k8s.io/examples/application/php-apache.yaml

# 오토스케일 설정
kubectl autoscale deployment php-apache --cpu-percent=50 --min=1 --max=10

# 부하 주기
kubectl run -i --tty load-generator --rm --image=busybox --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://php-apache; done"

```
![hpa](hpa.png)

간단하게 확인 작업은 됐습니다.

#### 이제 CA를 테스트해보겠습니다.
EKS Cluster Autoscaler는 설치가 필요합니다.

Cluster autoscaler를 따로 설치해야하는줄 알았는데, worker-node를 설치할 때
scaling config에 넣어준 옵션이 auto scaler를 위한 설정이었고, 자동 생성
되었습니다.


[이 예제](https://aws-eks-web-application.workshop.aws/ko/100-scaling/200-cluster-scaling.html)
를 참고해서 테스트해보겠습니다.
먼저 테라폼 eks-worker-node에서 max size를 늘려줍니다. 저는 10으로 했습니다.
그리고 파드를 100개 생성하고
kubectl create deployment autoscaler-demo --image=nginx
kubectl scale deployment autoscaler-demo --replicas=100

지켜봅니다.

`k get nodes -w`
`k get deploy autoscaler-demo -w`

! 저 예제 속에 있는 autoscaler discover가 안올라옵니다.
- terraform에서 수동으로 desired size를 2로 올리니 7개만 만들어진 파드가 23개로
올라갔습니다.
- CA는 좀 더 확인해봐야 할 것 같습니다. (진행중)

#### 추가로 해야 할 것들
ELB, NLB 등 로드밸런서 연결
- https://learnk8s.io/terraform-eks


## 정리
terraform destory를 해도 그 리전에 처음 네트워크를 만들게 되면 기본 네트워크로
설정되어 삭제가 안됩니다
비용은 따로 나오지 않으니 다음에 삭제해도 되고, 콘솔에서 직접 삭제해도 됩니다.

##### eks 선언 안했는데자동생성된거 확인
- 로드 밸런스
- 시큐리티그룹
- 라우팅 테이블


지금까지 EKS를 terraform 으로 빌드하고 EKS의 Cluster Autoscaler 기능을
테스트해봤습니다.

EKS가 어떤 리소스로 구성되어있고, CA는 어떻게 동작하는지 맛을 살짝 보았는데요.
관리를 클라우드에 맡기는게 얼마나 메리트가 있는지 확인을 좀 해봐야겠습니다.

#### 그 외 참고자료
- https://engineering.vcnc.co.kr/2019/02/eks-migration/
- https://suhwan.dev/2021/01/14/kubernetes-ops-components/
- https://www.slideshare.net/ssuser833a99/aws-ecs-eks-principle-enterprise-evangelist
