---
layout: article
title:  Kubernetes命令集
---

![](/images/k8s-arch.png)


## 组件 

```
kube-apiserver
etcd
kube-scheduler
kube-controller-manager

cloud-controller-manager

kubelet
kube-proxy
Container Runtime
DNS
Web UI
Container Resource Monitoring	
Cluster-level Logging
kubectl
kubeadm
kubefed
```

## 版本列表

```
1.16
1.15
1.14
1.13
1.12
```

## 短名映射

```
csr certificatesigningrequests
cs	componentstatuses
cm	configmaps
ds	daemonsets
deploy	deployments
ep	endpoints
ev	events
hpa      	horizontalpodautoscalers
ing	ingresses
limits	limitranges
ns	namespaces
no	nodes
pvc	persistentvolumeclaims
pv	persistentvolumes
po	pods
pdb	poddisruptionbudgets
psp	podsecuritypolicies
rs	replicasets
rc	replicationcontrollers
quota	resourcequotas
sa	serviceaccounts
svc	services
```

## 命令

```
Basic Commands (Beginner):
  create         Create a resource from a file or from stdin.
  expose         使用 replication controller, service, deployment 或者 pod并暴露它作为一个 新的 Kubernetes Service
  run            在集群中运行一个指定的镜像
  set            为 objects 设置一个指定的特征

Basic Commands (Intermediate):
  explain        查看资源的文档
  get            显示一个或更多 resources
  edit           在服务器上编辑一个资源
  delete         Delete resources by filenames, stdin, resources and names, orby resources and label selector

Deploy Commands:
  rollout        Manage the rollout of a resource
  scale          Set a new size for a Deployment, ReplicaSet or ReplicationController
  autoscale      自动调整一个 Deployment, ReplicaSet, 或者ReplicationController 的副本数量

Cluster Management Commands:
  certificate    修改 certificate 资源.
  cluster-info   显示集群信息
  top            Display Resource (CPU/Memory/Storage) usage.
  cordon         标记 node 为 unschedulable
  uncordon       标记 node 为 schedulable
  drain          Drain node in preparation for maintenance
  taint          更新一个或者多个 node 上的 taints

Troubleshooting and Debugging Commands:
  describe       显示一个指定 resource 或者 group 的 resources 详情
  logs           输出容器在 pod 中的日志
  attach         Attach 到一个运行中的 container
  exec           在一个 container 中执行一个命令
  port-forward   Forward one or more local ports to a pod
  proxy          运行一个 proxy 到 Kubernetes API server
  cp             复制 files 和 directories 到 containers和从容器中复制 files 和 directories.
  auth           Inspect authorization

Advanced Commands:
  diff           Diff live version against would-be applied version
  apply          通过文件名或标准输入流(stdin)对资源进行配置
  patch          使用 strategic merge patch 更新一个资源的 field(s)
  replace        通过 filename 或者 stdin替换一个资源
  wait           Experimental: Wait for a specific condition on one or many
resources.
  convert        在不同的 API versions 转换配置文件
  kustomize      Build a kustomization target from a directory or a remote url.

Settings Commands:
  label          更新在这个资源上的 labels
  annotate       更新一个资源的注解
  completion     Output shell completion code for the specified shell (bash orzsh)

Other Commands:
  api-resources  Print the supported API resources on the server
  api-versions   Print the supported API versions on the server, in the form of"group/version"
  config         修改 kubeconfig 文件
  plugin         Provides utilities for interacting with plugins.
  version        输出 client 和 server 的版本信息
```



## 配置

kubectl config view

kubectl config get-contexts

kubectl config set-credentials kubeuser/foo.kubernetes.com --username=kubeuser --password=kubepassword



## 创建

kubectl create deployment nginx --image=nginx 

kubectl run --rm mytest --image=yauritux/busybox-curl -it

kubectl apply -f ./my-manifest.yaml

kubectl explain pods,svc 



## 查看

kubectl exec -it mytest -- ls -l /etc/hosts

kubectl exec -ti nginx-app-5jyvm -- /bin/sh

kubectl get all --all-namespaces

kubectl get services     

kubectl describe nodes
                     
kubectl get pods --all-namespaces            

kubectl get pods -o wide                     

kubectl get deployment my-dep                

kubectl get pods                             

kubectl get pod my-pod -o yaml               

kubectl get pod my-pod -o yaml --export 


## 更新

kubectl set image deployment nginx nginx=nginx:1.9.1

kubectl rollout history deployment/frontend                    

kubectl rollout undo deployment/frontend                       

kubectl rollout undo deployment/frontend --to-revision=2       

kubectl rollout status -w deployment/frontend  

kubectl rollout pause deployment nginx

kubectl rollout resume deployment nginx

kubectl rollout undo deployment nginx --to-revision 3

kubectl label pods my-pod new-label=awesome                     

kubectl annotate pods my-pod icon-url=http://goo.gl/XXBTWq      

kubectl autoscale deployment foo --min=2 --max=10               


kubectl patch node k8s-node-1 -p '{"spec":{"unschedulable":true}}'

kubectl scale --replicas=3 rs/foo 

kubectl delete -f ./pod.json

kubectl delete pod -l env=test

kubectl delete pvc -l app=wordpress

kubectl delete all -all

## 和pod交互

kubectl logs my-pod                                

kubectl logs -l name=myLabel                       

kubectl logs my-pod --previous                     

kubectl logs my-pod -c my-container                

kubectl logs -l name=myLabel -c my-container       

kubectl logs my-pod -c my-container --previous     

kubectl logs -f my-pod                             

kubectl logs -f my-pod -c my-container             

kubectl logs -f -l name=myLabel --all-containers   

kubectl run -i --tty busybox --image=busybox -- sh 

kubectl run nginx --image=nginx --restart=Never -n mynamespace                                        

kubectl run nginx --image=nginx --restart=Never    --dry-run -o yaml > pod.yaml

kubectl attach my-pod -i                           

kubectl port-forward my-pod 5000:6000              

kubectl exec my-pod -- ls /                        

kubectl exec my-pod -c my-container -- ls /        

kubectl top pod POD_NAME --containers              


## 和节点集群交互

kubectl cordon my-node                                               

kubectl drain my-node                                                

kubectl uncordon my-node                                             

kubectl top node my-node                                             

kubectl cluster-info                                                 

kubectl cluster-info dump                                            

kubectl cluster-info dump --output-directory=/path/to/cluster-state  


## 资源配额

kubectl get resourcequota

kubectl get limitrange

kubectl set resources deployment nginx -c=nginx --limits=cpu=200m

kubectl set resources deployment nginx -c=nginx --limits=memory=512Mi


## 网络

kubectl port-forward redis-134 6379:6379

kubectl port-forward deployment/redis-master 6379:6379

kubectl get NetworkPolicy



## Api-RES

kubectl api-resources

```
bindings                                                                      true         Binding
componentstatuses                 cs                                          false        ComponentStatus
configmaps                        cm                                          true         ConfigMap
endpoints                         ep                                          true         Endpoints
events                            ev                                          true         Event
limitranges                       limits                                      true         LimitRange
namespaces                        ns                                          false        Namespace
nodes                             no                                          false        Node
persistentvolumeclaims            pvc                                         true         PersistentVolumeClaim
persistentvolumes                 pv                                          false        PersistentVolume
pods                              po                                          true         Pod
podtemplates                                                                  true         PodTemplate
replicationcontrollers            rc                                          true         ReplicationController
resourcequotas                    quota                                       true         ResourceQuota
secrets                                                                       true         Secret
serviceaccounts                   sa                                          true         ServiceAccount
services                          svc                                         true         Service
mutatingwebhookconfigurations                  admissionregistration.k8s.io   false        MutatingWebhookConfiguration
validatingwebhookconfigurations                admissionregistration.k8s.io   false        ValidatingWebhookConfiguration
customresourcedefinitions         crd,crds     apiextensions.k8s.io           false        CustomResourceDefinition
apiservices                                    apiregistration.k8s.io         false        APIService
controllerrevisions                            apps                           true         ControllerRevision
daemonsets                        ds           apps                           true         DaemonSet
deployments                       deploy       apps                           true         Deployment
replicasets                       rs           apps                           true         ReplicaSet
statefulsets                      sts          apps                           true         StatefulSet
tokenreviews                                   authentication.k8s.io          false        TokenReview
localsubjectaccessreviews                      authorization.k8s.io           true         LocalSubjectAccessReview
selfsubjectaccessreviews                       authorization.k8s.io           false        SelfSubjectAccessReview
selfsubjectrulesreviews                        authorization.k8s.io           false        SelfSubjectRulesReview
subjectaccessreviews                           authorization.k8s.io           false        SubjectAccessReview
horizontalpodautoscalers          hpa          autoscaling                    true         HorizontalPodAutoscaler
cronjobs                          cj           batch                          true         CronJob
jobs                                           batch                          true         Job
certificatesigningrequests        csr          certificates.k8s.io            false        CertificateSigningRequest
leases                                         coordination.k8s.io            true         Lease
events                            ev           events.k8s.io                  true         Event
daemonsets                        ds           extensions                     true         DaemonSet
deployments                       deploy       extensions                     true         Deployment
ingresses                         ing          extensions                     true         Ingress
networkpolicies                   netpol       extensions                     true         NetworkPolicy
podsecuritypolicies               psp          extensions                     false        PodSecurityPolicy
replicasets                       rs           extensions                     true         ReplicaSet
ingresses                         ing          networking.k8s.io              true         Ingress
networkpolicies                   netpol       networking.k8s.io              true         NetworkPolicy
runtimeclasses                                 node.k8s.io                    false        RuntimeClass
poddisruptionbudgets              pdb          policy                         true         PodDisruptionBudget
podsecuritypolicies               psp          policy                         false        PodSecurityPolicy
clusterrolebindings                            rbac.authorization.k8s.io      false        ClusterRoleBinding
clusterroles                                   rbac.authorization.k8s.io      false        ClusterRole
rolebindings                                   rbac.authorization.k8s.io      true         RoleBinding
roles                                          rbac.authorization.k8s.io      true         Role
priorityclasses                   pc           scheduling.k8s.io              false        PriorityClass
csidrivers                                     storage.k8s.io                 false        CSIDriver
csinodes                                       storage.k8s.io                 false        CSINode
storageclasses                    sc           storage.k8s.io                 false        StorageClass
volumeattachments                              storage.k8s.io                 false        VolumeAttachment

```

![](/images/k8s-1.png)

![](/images/k8s-2.png)


[大视图](https://res.cloudinary.com/jimmysong/image/upload/images/kubernetes-kubectl-cheatsheet-blog.png)
