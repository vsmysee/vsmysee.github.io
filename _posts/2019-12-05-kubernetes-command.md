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

kubectl set image deployment/frontend www=image:v2   

kubectl rollout history deployment/frontend                    

kubectl rollout undo deployment/frontend                       

kubectl rollout undo deployment/frontend --to-revision=2       

kubectl rollout status -w deployment/frontend  

kubectl label pods my-pod new-label=awesome                     

kubectl annotate pods my-pod icon-url=http://goo.gl/XXBTWq      

kubectl autoscale deployment foo --min=2 --max=10               


kubectl patch node k8s-node-1 -p '{"spec":{"unschedulable":true}}'

kubectl scale --replicas=3 rs/foo 

kubectl delete -f ./pod.json

kubectl delete pod -l env=test

kubectl delete pvc -l app=wordpress

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
