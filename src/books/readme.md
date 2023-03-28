# 中台参考文档==2022年3月3日==

[TOC]

## 一、中台理念

### 1.1 存在的问题（传统开发+公司现状）

>公司现状存在的问题：
>
>1.烟囱式开发，开发时间久周期长，无法及时响应市场
>
>2.公司内外发展冲突，业务初期我们面向的是整个监测领域，但是随着市场的扩张，我们的这套系统需要面向其他领域推广，比如椒花水库项目、南岳景区。快速迭代是硬指标。
>
>3.后台在建设中不断通过模块化设计来追求服务稳定性，这种设计模式反而会导致系统越来越庞大，同时这样的后台变得越来越没法去快速响应前台业务调整所带来的改变。即模块无法复用。
>
>传统开发存在的问题：
>
>- 由于每个项目组互相独立，没有专门的基础技术研发人员去统一技术框架。
>- 重复造轮子，没有技术深入沉淀，导致学习培训成本很高
>- 功能片面，不通用，服务框架讲求通用性，尽量让整个公司使用同一套规范以方便维护，但很多框架只实现了某些特定场景的功能，无法通用化（例如两个系统都有文档导出功能，但是都与业务强关联，导致无法通用）
>- 与主流脱节，无法分享微服务化、容器化、服务网格化的红利

### 1.2 目标是什么

> - 解决前后台模式弊端、快速响应市场。
>
> - 可拆解业务模块复用功能。
>
> - 实现技术栈统一、功能服务化

### 1.3 什么是中台

> - 中台是为了在前端的业务发生变化和进行新业务探索时提供最高效的业务支撑能力，它的核心本质就是向前台业务提供服务共享，目标是更好地支持前台业务方进行规模化创新或大规模试错，从而更好地响应市场需求，从技术角度来看，中台就是将每一个复用的模块作为一个独立的应用进行开发与上线，再通过服务调度实现复用
> - 中台可以划分为技术中台、业务中台、数据中台，技术中台以统一技术栈为主，业务中台以业务拆分服务化，数据中台是面向数据的架构，根据分析结果，调整业务方向辅助决策。

### 1.4 中台建设思路

​	下图整个PAAS层就是我们的中台，底层由技术中台为基础，中层是数据中台，上层是业务中台。在业务架构图中，中台通过服务共享给SAAS层，也就是前台，提供业务代码、技术代码的复用。从而提高开发效率。

![](https://teamblog-1254331889.cos.ap-guangzhou.myqcloud.com/monster/202303021645858.png)

核心思路：

- 一期项目以技术中台和业务中台为主。不做数据中台的原因是，现阶段打造数据中台成本太高，收益太低

- 通过技术栈的统一完成技术中台的构建

- 开发共享服务平台，共享服务，达到功能复用的目的

- 持续的功能服务化，也就是公司技术沉淀，业务沉淀的过程。



> 总结来说：<font color = red>实现技术栈的统一 + 服务共享</font>

### 1.5 使用中台带来的其他好处

- 服务器经济效益

![](https://teamblog-1254331889.cos.ap-guangzhou.myqcloud.com/monster/202303021629124.png)

- 开发人员可以无缝衔，在各项目组开发

## 二、技术框架的统一

### 2.1 技术框架设计理念

> ZD微服务一站式解决方案，提供：架构指南、容器优先/兼容Spring与Service Mesh的框架、最佳实践及DevOps标准化流程。

通过前面的分析知道，当前我们：**缺少一体化的研发流程支撑** 导致各项目规范不统一、发布效率低、容器化问题频出

所以技术框架的核心设计理念是：

> 提供微服务架构指南 + 扩展主流微服务框架 + 标准化DevOps流程

### 2.2 技术框架能做什么

前台技术框架以及规范，请前往下面地址查看

> 地址为：http://192.168.10.18:8081/zd-f2e/zd-f2e-spec

以下内容针对后台技术框架

> **提供微服务架构指南**
>
> - 项目要上微服务，其架构思想是前提，ZD采用用最标准的、方便后续拓展的开发模型
>
> **扩展主流微服务框架**
>
> - 全面，尽量重用市场已有能力实现，减少框架自身的维护成本
> - 轻量，原则上不引入高侵入性的三方框架/类库
> - 可替换，只做扩展，尽量不修改基础框架代码，开发人员完全可以直接基于基础框架开发
> - 主流，整合流行的微服务框架
>
> 实现上我们选择 `Spring Boot` 这一业界主流框架，对上兼容 `Spring Cloud` 与 `Service Mesh`。
>
> **标准化DevOps流程**
>
> 我们在DevOps上另辟蹊径，以Maven为核心构建，其优点在于：
>
> 1. Maven是行业标准，并且兼容除JVM外的其它语言环境，可支撑所有主流项目
> 2. 可在本地执行完成DevOps开发流程，也可与CI/CD工具整合提供测试/生产等环境的DevOps
> 3. 对CI/CD工具的依赖度低、开源、标准化，无厂商绑定

#### 1⃣️ 提供微服务架构指南

##### 统一版本管理

​	提供了[zd-starter-parent](http://192.168.10.18:8081/zd/zd-starter-parent/-/blob/master/pom.xml)，里面指定了Spring Boot 版本、mybatis-plus版本等等

##### 统一项目结构

​	基于[COLA-4.0](https://blog.csdn.net/significantfrank/article/details/110934799)的思想，但并不采取cola4.0的方式，在其基础上使用了最适合本项目的结构，推荐的项目结构如下所示

```ABAP
**** Project                 		// 构建工程
|- moduleA                      // 源码目录
|-  |- **-api                		// 接口层，开放HTTP接口
|-  |- |-api										// api
|-  |- |-vo											// vo
|-  |- **-app                		// 业务逻辑以及DTO转换相关模块
|-  |- |-ao											// ao
|-  |- |-service								// service
|-  |- |-converter							// 转换层
|-  |- **-common             		// 通用常量、异常、工具类等模块
|-  |- **-dao                		// 数据访问层模块
|-  |- |-entity									//数据库实体
|-  |- |-mapper									//mapper
|-  |- **-dto                		// script模块
|-  |- start                    // 项目启动
|-  |- |-**Application					//启动类
|-  |- |-application.yaml				//启动配置
|- pom.xml   
|- docs                         // 文档工程，所有团队共同维护，md方案，后文会介绍
|-  |- **.md
|-  |- images
|- pom.xml                      // 构建工程的POM
|- .gitignore
|- README.md 
```

​	你不必自己手动去创建项目结构，提供了快速搭建项目的脚手架

> 1. 👉[点击跳转查看详细使用说明](http://192.168.10.18:8081/zd/archetype)
> 2. 👉[点击跳转查看参考视频](https://sp-model-1254331889.cos.ap-guangzhou.myqcloud.com/sp-doc/%E5%8F%82%E8%80%83%E8%A7%86%E9%A2%91/2.2.1%E8%84%9A%E6%89%8B%E6%9E%B6%E7%94%9F%E6%88%90.mp4)

##### 统一开发规范

​	后台开发规范

>- [Java开发手册(黄山版)](https://sp-model-1254331889.cos.ap-guangzhou.myqcloud.com/sp-doc/2.1%20%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83/Java%E5%BC%80%E5%8F%91%E6%89%8B%E5%86%8C%28%E9%BB%84%E5%B1%B1%E7%89%88%29.pdf)
>- [包管理规范V1.0](https://sp-model-1254331889.cos.ap-guangzhou.myqcloud.com/sp-doc/2.1%20%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83/%E5%8C%85%E7%AE%A1%E7%90%86%E8%A7%84%E8%8C%83V1.0.pdf)
>- [单元测试规范-V1.0](https://sp-model-1254331889.cos.ap-guangzhou.myqcloud.com/sp-doc/2.1%20%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83/%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E8%A7%84%E8%8C%83-V1.0.pdf)
>- [异常处理方案](https://sp-model-1254331889.cos.ap-guangzhou.myqcloud.com/sp-doc/2.1%20%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83/%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86%E6%96%B9%E6%A1%88.pdf)
>- [服务接口规范-V1.0](https://sp-model-1254331889.cos.ap-guangzhou.myqcloud.com/sp-doc/2.1%20%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83/%E6%9C%8D%E5%8A%A1%E6%8E%A5%E5%8F%A3%E8%A7%84%E8%8C%83-V1.0.pdf)
>- [第三方组件使用规范-V1.0](https://sp-model-1254331889.cos.ap-guangzhou.myqcloud.com/sp-doc/2.1%20%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83/%E7%AC%AC%E4%B8%89%E6%96%B9%E7%BB%84%E4%BB%B6%E4%BD%BF%E7%94%A8%E8%A7%84%E8%8C%83-V1.0.pdf)
>- [腾讯云服务器资源管理规范](https://sp-model-1254331889.cos.ap-guangzhou.myqcloud.com/sp-doc/2.1%20%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83/%E8%85%BE%E8%AE%AF%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E8%A7%84%E8%8C%83.pdf)
>- [镜像版本命名](https://sp-model-1254331889.cos.ap-guangzhou.myqcloud.com/sp-doc/2.1%20%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83/%E9%95%9C%E5%83%8F%E7%89%88%E6%9C%AC%E5%91%BD%E5%90%8D.pdf)

#### 2⃣️ 扩展主流微服务框架

##### 提供拓展模块

`zd-starter-parent` 中已包含各模块的版本，引用模块依赖时可省略版本号。

| 模块名              | 核心功能                    | 地址                                                         |
| :------------------ | :-------------------------- | ------------------------------------------------------------ |
| zd-starter-parent   | 父Pom模块                   | [点击跳转](http://192.168.10.18:8081/zd/zd-starter-parent)   |
| cache-component     | 分布式缓存                  | [点击跳转](http://192.168.10.18:8081/zd/zd-framework/-/tree/master/cache-component) |
| dict-component      | 系统字典                    | [点击跳转](http://192.168.10.18:8081/zd/zd-framework/-/tree/master/dict-component) |
| elasticsearch-start | elasticsearch组件client封装 | [点击跳转](http://192.168.10.18:8081/zd/zd-framework/-/tree/master/elasticsearch-start) |
| metadata-module     | 物模型METADATA 基础包       | [点击跳转](http://192.168.10.18:8081/zd/zd-framework/-/tree/master/metadata-module) |
| mybatis-starter     | mybatis增强                 | [点击跳转](http://192.168.10.18:8081/zd/zd-framework/-/tree/master/mybatis-starter) |
| oss-starter         | 对象存储                    | [点击跳转](http://192.168.10.18:8081/zd/zd-framework/-/tree/master/oss-starter) |
| redis-start         | REDIS 组件                  | [点击跳转](http://192.168.10.18:8081/zd/zd-framework/-/tree/master/redis-start) |
| sp-principal-info   | 用户信息组件                | [点击跳转](http://192.168.10.18:8081/zd/zd-framework/-/tree/master/sp-principal-info) |
| sdk-core            | SDK接入基础包               | [点击跳转](http://192.168.10.18:8081/zd/zd-framework/-/tree/master/sp-sdk-core) |
| test-starter        | 单元测试支持                | [点击跳转](http://192.168.10.18:8081/zd/zd-framework/-/tree/master/test-starter) |
| web-component       | web组件                     | [点击跳转](http://192.168.10.18:8081/zd/zd-framework/-/tree/master/web-component) |
| rocketmq-start      | rocketmq组件                | [点击跳转](http://192.168.10.18:8081/zd/zd-framework/-/tree/master/rocketmq-starter) |
| data-collect        | 数据采集                    | [点击跳转](http://192.168.10.18:8081/zd/zd-framework/-/tree/master/data-collect) |

##### 提供常用工具集

常用工具由 [ZD-Common](http://192.168.10.18:8081/zd/zd-common.git ) 包提供，功能如下

> - Json与Java对象互转，支持泛型
> - 定时器操作，定时和周期性任务
> - 常用文件操作，根据不同情况获取文件内容、Glob匹配等
> - 常用字段操作，各类字段验证、身份证提取、UUID创建等
> - 常用时间处理，常规时间格式化模板
> - 主流文件MIME整理，MIME分类
> - 脚本处理
> - 响应处理及分页模型

##### 代码质量检查

① 安装Alibaba Java Coding Guidelines插件

​	略

② 使用代码质量检查插件

​	已集成 `Sonar` 插件，并和SonarQube连接，只需要在maven中配置 `sonar.host.url` 为目标地址， 然后执行 `mvn clean verify sonar:sonar -P qa -Dsonar.login=<用户名> -Dsonar.password=<密码>` 即可。也可以设置 `sonar.forceAuthentication=false` ，但要注意安全管控。

使用 `<maven.test.skip>true</maven.test.skip>` 可跳过特定模块的测试，`<sonar.skip>true</sonar.skip>` 可跳过特定模块的Sonar检查。



##### 其他推荐配置

**A.数据验证**

集成了`Spring validate` 机制，支持针对 `URL` 及 `Bean` 的验证。

> - 在 java bean 中添加各项validation，支持标准`javax.validation.constraints`包下的诸如：`NotNull` 
> - 在Controller中添加 `@Validated` 注解 ( Spring还支持@Vaild，但这一注解不支持分组 )
> - 支持Spring原生分组校验
> - `URL` 类型的验证必须在类头添加 `@Validated` 注解
> - `ZD` 框架内置了 `CreateGroup` `UpdateGroup` 两个验证组，验证组仅是一个标识，可为任何java对象

**B.测试支持**

​	良好的单元测试可以保证代码的高质量，单测的重要原则是内聚、无依赖，好的单测应该是"函数化"的——结果的变化只与传入参数有关。 但实际上我们会的代码往往会与数据库、缓存、MQ等外部工具交互，这会使单测的结果不可控，通常的解决方案是使用Mock，但这无行中引入了单测撰写的成本， `ZD`使用"内嵌式"工具解决，数据库使用 `H2` ，Redis使用 `embedded redis` ，由于 `ZD` 集群的 `Cache` `Map` `Lock` `MQ` 都支持 `Redis` 实现，所以可以做到对主流操作的全覆盖。

```xml
// 依赖
<dependency>
    <groupId>com.zcloud.veight</groupId>
    <artifactId>test-starter</artifactId>
</dependency>
```

```yml
// 配置
dew:
  cluster: #所有集群操作都使用reids模拟
    cache: redis
    lock: redis
    map: redis
    mq: redis

spring:
  redis:
    host: 127.0.0.1
    port: 6379
  datasource:
    driver-class-name: org.h2.Driver
    url: jdbc:h2:mem:test
```

**C.`@Validated` 注解**

- 在Spring Controller类里，`@Validated` 注解初使用会比较不易上手，在此做下总结

  1. 对于基本数据类型和String类型，要使校验的注解生效，需在该类上方加 `@Validated` 注解
  2. 对于抽象数据类型，需在形式参数前加`@Validated`注解

  Spring对抽象数据类型校验抛出异常为`MethodArgumentNotValidException`，http状态码为400，对基本数据类型校验抛出异常为`ConstraintViolationException`，http状态码为500，dew对这两种异常做了统一处理，http状态码均返回200，code为400

**D.`jackson` 对于 `Java8` 时间转换（ `SpringMVC` 以 `jackson` 接收 `json` 数据）**

1. 对于 `LocalDateTime` 类型，需在参数上加 `@JsonFormat` 注解，如下：`@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")`
2. `LocalDate,LocalTime,Instant` 等，无需配置可自行转换`jackson` 对于 `LocalDateTime` 类型的支持与其他三种类型不具有一致性，这是 `jackson` 需要优化的一个点

**E. 缓存处理**

`Spring Cache` 提供了很好的注解式缓存，但默认没有超时，需要根据使用的缓存容器特殊配置

Redis缓存过期时间设置

```java
@Bean
RedisCacheManager cacheManager() {
    final RedisCacheManager redisCacheManager = new RedisCacheManager(redisTemplate);
    redisCacheManager.setUsePrefix(true);
    redisCacheManager.setDefaultExpiration(<过期秒数>);
    return redisCacheManager;
}
```

**F. jdbc 批量插入性能问题**

如果不开启rewriteBatchedStatements=true，那么jdbc会把批量插入当做一行行的单条处理，也就没有达到批量插入的效果

jdbc配置示例

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://127.0.0.1:3306/zd?useUnicode=true&characterEncoding=utf-8&rewriteBatchedStatements=true
    username: root
    password: 123456
```

#### 3⃣️ 标准化DevOps流程

##### harbor镜像服务

>[👉 点击查看使用说明](https://sp-model-1254331889.cos.ap-guangzhou.myqcloud.com/sp-doc/%E5%8F%82%E8%80%83%E8%A7%86%E9%A2%91/2.2.1%E8%84%9A%E6%89%8B%E6%9E%B6%E7%94%9F%E6%88%90.mp4)

##### kubesphere

> [👉 点击查看使用说明](https://sp-model-1254331889.cos.ap-guangzhou.myqcloud.com/sp-doc/3.2%E5%AE%B9%E5%99%A8%E5%8C%96/%E6%89%93%E5%8C%85%E9%95%9C%E5%83%8F%E5%88%B0harbor.pdf)

##### CI/CD

> [👉 流水线教学视频](https://sp-model-1254331889.cos.ap-guangzhou.myqcloud.com/sp-doc/%E5%8F%82%E8%80%83%E8%A7%86%E9%A2%91/2.2.3-1%E6%B5%81%E6%B0%B4%E7%BA%BF.mp4)

### 2.3 示例demo

> [👉 部署案例视频教学](https://sp-model-1254331889.cos.ap-guangzhou.myqcloud.com/sp-doc/%E5%8F%82%E8%80%83%E8%A7%86%E9%A2%91/2.2.3-1%E6%B5%81%E6%B0%B4%E7%BA%BF.mp4)

## 三、服务共享



​	通过前面的了解，中台是达到功能复用，所以中台建设过程中的产物、成果需要以一种展现方式让公司内部人员知道、使用。这种方式可以是文档，也可以是一个仓库等等，任何方式都可以，只要是能达到信息共享、使用的目的，所以我们开发了服务共享平台（sp）。所以共享服务平台广义上可以理解为一个内容发布，能力共享平台。其实这个平台本身不重要，我们关注点不应该在共享服务平台本身，而是共享服务平台背后的中台。

​	但是SP作为中台最直观的体现，有必要对它进行了解，才能更深入理解中台的能力与不足。

### 3.1 总体设计



<img src="https://teamblog-1254331889.cos.ap-guangzhou.myqcloud.com/monster/202303030915731.png" style="zoom:50%;" />

> 共享服务平台主要做一件重要的事情，流量转发。通过流量我们就可以理解这个平台做了什么。
>
> 蓝色线条这部分是平台用户流量。面向公司内部用户，还有软件、硬件等细分角色。这块流量只是操作平台本身的一些功能。
>
> 黑色部分流量是应用流量，这里的应用指代我们业务架构中上层应用平台范围内的系统。这部分流量通过应用网关 去使用共享的业务服务，因为是应用层使用，所以流量会大很多，整个系统性能瓶颈也就在应用网关这里。

> 如想深入了解SP的设计，请前往查看：http://192.168.10.18:8081/seven-colorful-stone/sp

### 3.2 有哪些服务，如何使用



<img src="https://teamblog-1254331889.cos.ap-guangzhou.myqcloud.com/monster/202303030919528.png" alt="共享服务架构图" style="zoom:50%;" />

#### IOT和设备中心

​	iot是底层服务，设备中心是在其基础上的二开，他们的功能本质上都是一样的。向下支持连接海量设备，采集设备数据上云；向上提供云端API，服务端可通过调用云端API将指令下发至设备端，实现远程控制。

> 文档地址：https://doc.sp.zdjcyun.com/IOT%E5%92%8C%E8%AE%BE%E5%A4%87%E4%B8%AD%E5%BF%83/

#### 监测中心

​	监测中心作为工程监测领域的主要业务载体，负责创建监测对象，测项，测点等主要业务对象。管理监测对象中测点、测项以及设备属性之间的关联关系。应用系统接入监测中心后，可完成从创建监测对象和测点到设置测点所监测的测项、绑定对应设备的整个业务场景。

> 文档地址：https://doc.sp.zdjcyun.com/%E7%9B%91%E6%B5%8B%E4%B8%AD%E5%BF%83/

#### 告警中心

​	接受监测中心的数据，并按照制定的规则进行判定，如果是超阈值数据，告警中心会将生成的超阈值数据发布到消息队列，其他业务中心可订阅消费

> 文档地址：https://doc.sp.zdjcyun.com/%E5%91%8A%E8%AD%A6%E4%B8%AD%E5%BF%83/%E8%AE%BE%E8%AE%A1%E8%AF%B4%E6%98%8E.html

#### 项目中心

​	项目中心提供统一化管理公司项目的功能。

> 文档地址：https://doc.sp.zdjcyun.com/%E9%A1%B9%E7%9B%AE%E4%B8%AD%E5%BF%83/

#### 监测数据中心

- 接收外部(IOT采集，外部导入等)采集数据，数据预处理，标准监测数据存储与提供
- 从IOT服务获取到设备采集数据，经过一些算法进行处理之后，将数据转换为其他业务中心可直接使用的监测数据

> 文档地址：https://doc.sp.zdjcyun.com/%E7%9B%91%E6%B5%8B%E6%95%B0%E6%8D%AE%E4%B8%AD%E5%BF%83/%E8%AE%BE%E8%AE%A1%E8%AF%B4%E6%98%8E.html

#### 深度学习服务

​	深度学习服务本质上是为了方便开发者使用公司深度学习服务，它提供了 使用数据训练模型 和 使用模型预测数据 两大功能，可用来预测传感器未来一段时间内的数据。

> 文档地址：https://doc.sp.zdjcyun.com/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E6%9C%8D%E5%8A%A1/

#### 通知服务

​	通知服务，即通知+服务，通知意味着发送各种类型的消息，服务意味着服务提供方需提供并维护统一的接口，确保发送通知（消息）的稳定性、实时性等。

> 文档地址: https://doc.sp.zdjcyun.com/%E9%80%9A%E7%9F%A5%E6%9C%8D%E5%8A%A1/%E8%AE%BE%E8%AE%A1%E8%AF%B4%E6%98%8E.html

#### 视频服务

​	使用视频服务可以将摄像头接入到公司内管理。

> 文档地址：https://doc.sp.zdjcyun.com/%E8%A7%86%E9%A2%91%E6%9C%8D%E5%8A%A1/

#### 定时任务服务

- 一个分布式任务调度平台，其核心设计目标是开发迅速、学习简单、轻量级、易扩展，开箱即用
- 一方面是为了精简系统降低冗余依赖，另一方面是为了提供系统的可控度与稳定性

> 文档地址：https://doc.sp.zdjcyun.com/%E5%AE%9A%E6%97%B6%E4%BB%BB%E5%8A%A1%E6%9C%8D%E5%8A%A1/%E8%AE%BE%E8%AE%A1%E8%AF%B4%E6%98%8E.html

### 3.3 示例demo

> 接入深度学习服务的示例：http://192.168.10.18:8081/Monster/model-sdk-test

1.引入maven坐标，配置client

```java
@Configuration
public class ModelClientConf {

    @Bean
    public ModelClient modelClient(){
        return new ModelClient("xxxx", "xxxxxx");
    }
}
```

2.直接使用即可

```java
  @PostMapping("/createTrainTask")
  @ApiOperation(value = "新增训练任务")
  @ApiOperationSupport(order = 11)
  public FileValidResult createTrainTask(@Valid CreateTrainCmd cmd) throws Exception {
      return modelClient.createTrainTask(cmd);
  }
```
