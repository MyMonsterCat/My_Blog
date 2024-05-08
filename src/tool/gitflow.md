---
title: Git工作流-Gitflow
category: Git
tag:

- Git

---

::: info
本文参考和转载文章

[Gitflow工作流程](https://blog.csdn.net/happydeer/article/details/17618935)
:::

# Git工作流-Gitflow

## 分支管理

### 常用分支概览

- master：稳定的最新版本分支，线上版本
- hotfix：用于维护的分支
- release：用于（测试）发布的分支
- develop：用于集成的分支
- feature：用于功能开发的分支

示例图如下：

![gitflow](https://monster-note.oss-cn-hangzhou.aliyuncs.com/img/202303291531137.png)

### 分支管理具体说明

1. 中云监测平台长期存在两个分支master跟develop分支。Master分支上的最新代码永远是版本发布状态。Develop则是最新的开发进度。
2.
Hotfix分支是用来做线上紧急BUG,命名一般为hotfix-xxx。xxx对应版本号,例如，master分支上最新版本为3.5.0，此时线上环境出现bug需要修改代码重新部署时，应在master分支上新建一个紧急分支，分支名称命名为hotfix-3.5.1。问题修复后，合并回master和develop分支。Master此时最新代码对应版本为master-3.5.1。
3. Release 分支用来做版本发布的预发布分支，建议命名为 release-xxx。例如在软件 1.0.0 版本的功能全部开发完成，提交测试之后，从
   develop 检出release-1.0.0 ,测试中出现的小问题，在 release 分支进行修改提交，测试完毕准备发布的时候，代码会合并到 master
   和 develop，master 分支合并后会打上对应版本标签 v1.0.0, 合并后删除自己，这样做的好处是，在测试的时候，不影响下一个版本功能并行开发。（具体场景会使用此分支）
4. Feature 分支用来做分模块功能开发，建议命名为feature-xxx,模块完成之后，会合并到 develop 分支，然后删除

## 命名规则

- hotfix-xxx
- release-xxx
- feature-xxx

​ 其中xxx为对应的版本号或者模块名称

## 标签规则

hotfix合并入master时，标签为xxx-

## 流程举例说明

​ 举一个例子，以高支模版本和V4.6.2版本并行开发为例。lc和zp负责高支模，lzy负责4.6.2

1. 基于develop模块新建两个新分支，分别命名为feature-v4.6.2和feature-gzm
2. lzy开发完毕v4.6.2，将代码合并到develop（开发完毕后才能合并），加入此时高支模还没有开发完成
3. v4.6.2可以进行测试了，从develop模块克隆新分支，命名为release-v4.6.2，在此分支上进行测试，在这个分支上只能进行修复bug，做一些文档工作或者跟发布相关的任务
4. v4.6.2测试完毕，合并release-v4.6.2分支入develop分支，最后删除release-v4.6.2
5. feature-gzm分支重复234的过程
6. v4.6.2上线后，develop合并入master，某天发现了一个线上bug，基于master分支新建hotfix-v4.6.2分支用于解决线上bug，解决完毕后，合并入master和develop分支

## 常见问题

### 为什么单独出一个发布分支？

> ​ 使用专门的一个分支来为发布做准备的好处是，在一个团队（lzy）忙于当前的发布的同时，另一个团队（lc、zp）可以继续为接下来的一次发布开发新功能。
>
> ​ 这也有助于清晰表明开发的状态，比如说，团队在汇报状态时可以轻松使用这样的措辞，“这星期我们要为发布4.0版本做准备。”从代码仓库的结构上也能直接反映出来。命名规则为：release-xxx
>
> ​ 一旦创建了这个分支并把它推向中央仓库，这次产品发布包含的功能也就固定下来了。任何还处于开发状态的功能只能等待下一个发布周期。

### 为什么单独出一个hotfix分支？

> ​ 这种为解决紧急问题专设的绿色通道，让团队不必打乱当前的工作流程，也不必等待下一次的产品发布周期。你可以把用于维护的分支看成是依附于master的一种特别的发布分支。

### master的作用

> ​ master只是用于保存官方的发布历史，而develop分支才是用于集成各种功能开发的分支。使用版本号为master上的所有提交打标签（tag）也很方便

## 常见操作场景

开发新模块，需建立分支并且提交代码

```shell
# 注意此时是基于develop新建的
git checkout -b feature-xxx develop 
# git三部曲
git status
git add <some-file>
git commit
```

功能开发完成后合并入develop分支

```shell
git pull origin develop
git checkout develop
git merge feature-xxx
git push
# 合并后即可删除
git branch -d feature-xxx
```

新模块提交测试

```shell
git checkout -b release-xxx develop
```

测试完毕，需要上线

```shell
# 合并入develop
git checkout develop
git merge release-xxx
git push
# 合并入master
git checkout master
git merge release-xxx
git push
#
git branch -d release-0.1
# 打标签
git tag -a xxx -m"Initial public release" master
git push --tags
```

正式环境需要改bug

```shell
# 新建分支
git checkout -b hotfix-xxx master
# 改完bug后,合并入develop
git checkout develop
git merge hotfix-xxx 
git push
# 合并入master
git checkout master
git merge develop
git push
# 删除bug分支
git branch -d iotfix-xxx
```
