> 整理：Monster，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/IvBt3tB_IWZgPjKv5WGS4A)。

# 原理

### 18.说一下 RocketMQ 的整体工作流程？

简单来说，RocketMQ 是一个分布式消息队列，也就是`消息队列`+`分布式系统`。

作为消息队列，它是`发`\-`存`\-`收`的一个模型，对应的就是 Producer、Broker、Cosumer；作为分布式系统，它要有服务端、客户端、注册中心，对应的就是 Broker、Producer/Consumer、NameServer

所以我们看一下它主要的工作流程：RocketMQ 由 NameServer 注册中心集群、Producer 生产者集群、Consumer 消费者集群和若干 Broker（RocketMQ 进程）组成：

1.  Broker 在启动的时候去向所有的 NameServer 注册，并保持长连接，每 30s 发送一次心跳
2.  Producer 在发送消息的时候从 NameServer 获取 Broker 服务器地址，根据负载均衡算法选择一台服务器来发送消息
3.  Conusmer 消费消息的时候同样从 NameServer 获取 Broker 地址，然后主动拉取消息来消费

![RocketMQ整体工作流程](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-ec571bd4-fa24-4ada-87ab-f761a7dfdf3f.jpg)

### 19.为什么 RocketMQ 不使用 Zookeeper 作为注册中心呢？

Kafka 我们都知道采用 Zookeeper 作为注册中心(当然也开始逐渐去 Zookeeper)，RocketMQ 不使用 Zookeeper 其实主要可能从这几方面来考虑：

1.  基于可用性的考虑，根据 CAP 理论，同时最多只能满足两个点，而 Zookeeper 满足的是 CP，也就是说 Zookeeper 并不能保证服务的可用性，Zookeeper 在进行选举的时候，整个选举的时间太长，期间整个集群都处于不可用的状态，而这对于一个注册中心来说肯定是不能接受的，作为服务发现来说就应该是为可用性而设计。
2.  基于性能的考虑，NameServer 本身的实现非常轻量，而且可以通过增加机器的方式水平扩展，增加集群的抗压能力，而 Zookeeper 的写是不可扩展的，Zookeeper 要解决这个问题只能通过划分领域，划分多个 Zookeeper 集群来解决，首先操作起来太复杂，其次这样还是又违反了 CAP 中的 A 的设计，导致服务之间是不连通的。
3.  持久化的机制来带的问题，ZooKeeper 的 ZAB 协议对每一个写请求，会在每个 ZooKeeper 节点上保持写一个事务日志，同时再加上定期的将内存数据镜像（Snapshot）到磁盘来保证数据的一致性和持久性，而对于一个简单的服务发现的场景来说，这其实没有太大的必要，这个实现方案太重了。而且本身存储的数据应该是高度定制化的。
4.  消息发送应该弱依赖注册中心，而 RocketMQ 的设计理念也正是基于此，生产者在第一次发送消息的时候从 NameServer 获取到 Broker 地址后缓存到本地，如果 NameServer 整个集群不可用，短时间内对于生产者和消费者并不会产生太大影响。

> **什么是CAP理论？**
>
> CAP理论告诉我们C、A、P三者不能同时满足，最多只能满足其中两个（这样说其实是太绝对的，请参考[分布式必备理论基础：CAP和BASE](https://mp.weixin.qq.com/s/0weRsF8N66_e9Idwx0lbIQ)）
>
> <img src="assets/arch-cap-1.png" alt="img" style="zoom:50%;" />
>
> - `一致性 (Consistency)`: 一个写操作返回成功，那么之后的读请求都必须读到这个新数据；如果返回失败，那么所有读操作都不能读到这个数据。所有节点访问同一份最新的数据。
> - `可用性 (Availability)`: 对数据更新具备高可用性，请求能够及时处理，不会一直等待，即使出现节点失效。
> - `分区容错性 (Partition tolerance)`: 能容忍网络分区，在**网络断开**的情况下，被分隔的节点仍能正常对外提供服务。

### 20.Broker 是怎么保存数据的呢？

RocketMQ 主要的存储文件包括 CommitLog 文件、ConsumeQueue 文件、Indexfile 文件。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-b6d13d4d-c417-43b4-bfe1-12724777888c.jpg)

消息存储的整体的设计：

![消息存储整体设计-来源官网](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-ddbf8773-1d71-4d1a-a186-46f6985b621e.jpg)

- **CommitLog**：消息主体以及元数据的存储主体，存储 Producer 端写入的消息主体内容,消息内容不是定长的。单个文件大小默认 1G, 文件名长度为 20 位，左边补零，剩余为起始偏移量，比如 00000000000000000000 代表了第一个文件，起始偏移量为 0，文件大小为 1G=1073741824；当第一个文件写满了，第二个文件为 00000000001073741824，起始偏移量为 1073741824，以此类推。消息主要是顺序写入日志文件，当文件满了，写入下一个文件。

CommitLog 文件保存于`${Rocket_Home}/store/commitlog` 目录中，从图中我们可以明显看出来文件名的偏移量，每个文件默认 1G，写满后自动生成一个新的文件。

![CommitLog](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-a76f7365-8a8c-4b91-9505-9d427cf3bde4.jpg)

- **ConsumeQueue**：消息消费队列，引入的目的主要是提高消息消费的性能，由于 RocketMQ 是基于主题 topic 的订阅模式，消息消费是针对主题进行的，如果要遍历 commitlog 文件中根据 topic 检索消息是非常低效的。

Consumer 即可根据 ConsumeQueue 来查找待消费的消息。其中，ConsumeQueue（逻辑消费队列）作为消费消息的索引，保存了指定 Topic 下的队列消息在 CommitLog 中的起始物理偏移量 offset，消息大小 size 和消息 Tag 的 HashCode 值。

ConsumeQueue 文件可以看成是基于 Topic 的 CommitLog 索引文件，故 ConsumeQueue 文件夹的组织方式如下：topic/queue/file 三层组织结构，具体存储路径为：$HOME/store/consumequeue/{topic}/{queueId}/{fileName}。同样 ConsumeQueue 文件采取定长设计，每一个条目共 20 个字节，分别为 8 字节的 CommitLog 物理偏移量、4 字节的消息长度、8 字节 tag hashcode，单个文件由 30W 个条目组成，可以像数组一样随机访问每一个条目，每个 ConsumeQueue 文件大小约 5.72M；

![Comsumer Queue](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-c8b22760-35c2-436b-81ed-be49a107357b.jpg)

- **IndexFile**：IndexFile（索引文件）提供了一种可以通过 key 或时间区间来查询消息的方法。Index 文件的存储位置是： {fileName}，文件名 fileName 是以创建时的时间戳命名的，固定的单个 IndexFile 文件大小约为 400M，一个 IndexFile 可以保存 2000W 个索引，IndexFile 的底层存储设计为在文件系统中实现 HashMap 结构，故 RocketMQ 的索引文件其底层实现为 hash 索引。

![IndexFile文件示意图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-f06f306b-fd87-48ff-b1cb-e39750d308e7.jpg)

总结一下：RocketMQ 采用的是混合型的存储结构，即为 Broker 单个实例下所有的队列共用一个日志数据文件（即为 CommitLog）来存储。

RocketMQ 的混合型存储结构(多个 Topic 的消息实体内容都存储于一个 CommitLog 中)针对 Producer 和 Consumer 分别采用了数据和索引部分相分离的存储结构，Producer 发送消息至 Broker 端，然后 Broker 端使用同步或者异步的方式对消息刷盘持久化，保存至 CommitLog 中。

只要消息被刷盘持久化至磁盘文件 CommitLog 中，那么 Producer 发送的消息就不会丢失。正因为如此，Consumer 也就肯定有机会去消费这条消息。当无法拉取到消息后，可以等下一次消息拉取，同时服务端也支持长轮询模式，如果一个消息拉取请求未拉取到消息，Broker 允许等待 30s 的时间，只要这段时间内有新消息到达，将直接返回给消费端。

这里，RocketMQ 的具体做法是，使用 Broker 端的后台服务线程—ReputMessageService 不停地分发请求并异步构建 ConsumeQueue（逻辑消费队列）和 IndexFile（索引文件）数据。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-80af9918-2d4b-4b43-b83a-d44bfc0f30bc.jpg)

### 21.说说 RocketMQ 怎么对文件进行读写的？

RocketMQ 对文件的读写巧妙地利用了操作系统的一些高效文件读写方式——`PageCache`、`顺序读写`、`零拷贝`。

- PageCache、顺序读取

在 RocketMQ 中，ConsumeQueue 逻辑消费队列存储的数据较少，并且是顺序读取，在 page cache 机制的预读取作用下，Consume Queue 文件的读性能几乎接近读内存，即使在有消息堆积情况下也不会影响性能。而对于 CommitLog 消息存储的日志数据文件来说，读取消息内容时候会产生较多的随机访问读取，严重影响性能。如果选择合适的系统 IO 调度算法，比如设置调度算法为“Deadline”（此时块存储采用 SSD 的话），随机读的性能也会有所提升。

页缓存（PageCache)是 OS 对文件的缓存，用于加速对文件的读写。一般来说，程序对文件进行顺序读写的速度几乎接近于内存的读写速度，主要原因就是由于 OS 使用 PageCache 机制对读写访问操作进行了性能优化，将一部分的内存用作 PageCache。对于数据的写入，OS 会先写入至 Cache 内，随后通过异步的方式由 pdflush 内核线程将 Cache 内的数据刷盘至物理磁盘上。对于数据的读取，如果一次读取文件时出现未命中 PageCache 的情况，OS 从物理磁盘上访问读取文件的同时，会顺序对其他相邻块的数据文件进行预读取。

- 零拷贝

另外，RocketMQ 主要通过 MappedByteBuffer 对文件进行读写操作。其中，利用了 NIO 中的 FileChannel 模型将磁盘上的物理文件直接映射到用户态的内存地址中（这种 Mmap 的方式减少了传统 IO，将磁盘文件数据在操作系统内核地址空间的缓冲区，和用户应用程序地址空间的缓冲区之间来回进行拷贝的性能开销），将对文件的操作转化为直接对内存地址进行操作，从而极大地提高了文件的读写效率（正因为需要使用内存映射机制，故 RocketMQ 的文件存储都使用定长结构来存储，方便一次将整个文件映射至内存）。

##### 说说什么是零拷贝?

在操作系统中，使用传统的方式，数据需要经历几次拷贝，还要经历用户态/内核态切换。

![传统文件传输示意图-来源《图解操作系统》](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-35fd884c-8d1b-4d04-8f09-23ed2f945b23.jpg)

1.  从磁盘复制数据到内核态内存；
2.  从内核态内存复制到用户态内存；
3.  然后从用户态内存复制到网络驱动的内核态内存；
4.  最后是从网络驱动的内核态内存复制到网卡中进行传输。

所以，可以通过零拷贝的方式，**减少用户态与内核态的上下文切换**和**内存拷贝的次数**，用来提升 I/O 的性能。零拷贝比较常见的实现方式是**mmap**，这种机制在 Java 中是通过 MappedByteBuffer 实现的。

![mmap示意图-来源《图解操作系统》](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-3ebab020-e411-4239-b91e-72147190c7b1.jpg)

### 22.消息刷盘怎么实现的呢？

RocketMQ 提供了两种刷盘策略：同步刷盘和异步刷盘

- 同步刷盘：在消息达到 Broker 的内存之后，必须刷到 commitLog 日志文件中才算成功，然后返回 Producer 数据已经发送成功。
- 异步刷盘：异步刷盘是指消息达到 Broker 内存后就返回 Producer 数据已经发送成功，会唤醒一个线程去将数据持久化到 CommitLog 日志文件中。

**Broker** 在消息的存取时直接操作的是内存（内存映射文件），这可以提供系统的吞吐量，但是无法避免机器掉电时数据丢失，所以需要持久化到磁盘中。

刷盘的最终实现都是使用**NIO**中的 MappedByteBuffer.force() 将映射区的数据写入到磁盘，如果是同步刷盘的话，在**Broker**把消息写到**CommitLog**映射区后，就会等待写入完成。

异步而言，只是唤醒对应的线程，不保证执行的时机，流程如图所示。

![异步刷盘](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-10a2361b-5e23-462f-86bf-1a9bce2342e5.jpg)

### 23.能说下 RocketMQ 的负载均衡是如何实现的？

RocketMQ 中的负载均衡都在 Client 端完成，具体来说的话，主要可以分为 Producer 端发送消息时候的负载均衡和 Consumer 端订阅消息的负载均衡。

##### Producer 的负载均衡

Producer 端在发送消息的时候，会先根据 Topic 找到指定的 TopicPublishInfo，在获取了 TopicPublishInfo 路由信息后，RocketMQ 的客户端在默认方式下 selectOneMessageQueue()方法会从 TopicPublishInfo 中的 messageQueueList 中选择一个队列（MessageQueue）进行发送消息。具这里有一个 sendLatencyFaultEnable 开关变量，如果开启，在随机递增取模的基础上，再过滤掉 not available 的 Broker 代理。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-5f254411-502b-4bd3-89b5-d3157964617b.jpg)

所谓的"latencyFaultTolerance"，是指对之前失败的，按一定的时间做退避。例如，如果上次请求的 latency 超过 550Lms，就退避 3000Lms；超过 1000L，就退避 60000L；如果关闭，采用随机递增取模的方式选择一个队列（MessageQueue）来发送消息，latencyFaultTolerance 机制是实现消息发送高可用的核心关键所在。

##### Consumer 的负载均衡

在 RocketMQ 中，Consumer 端的两种消费模式（Push/Pull）都是基于拉模式来获取消息的，而在 Push 模式只是对 pull 模式的一种封装，其本质实现为消息拉取线程在从服务器拉取到一批消息后，然后提交到消息消费线程池后，又“马不停蹄”的继续向服务器再次尝试拉取消息。如果未拉取到消息，则延迟一下又继续拉取。在两种基于拉模式的消费方式（Push/Pull）中，均需要 Consumer 端知道从 Broker 端的哪一个消息队列中去获取消息。因此，有必要在 Consumer 端来做负载均衡，即 Broker 端中多个 MessageQueue 分配给同一个 ConsumerGroup 中的哪些 Consumer 消费。

1.  Consumer 端的心跳包发送

在 Consumer 启动后，它就会通过定时任务不断地向 RocketMQ 集群中的所有 Broker 实例发送心跳包（其中包含了，消息消费分组名称、订阅关系集合、消息通信模式和客户端 id 的值等信息）。Broker 端在收到 Consumer 的心跳消息后，会将它维护在 ConsumerManager 的本地缓存变量—consumerTable，同时并将封装后的客户端网络通道信息保存在本地缓存变量—channelInfoTable 中，为之后做 Consumer 端的负载均衡提供可以依据的元数据信息。

2.  Consumer 端实现负载均衡的核心类—RebalanceImpl

在 Consumer 实例的启动流程中的启动 MQClientInstance 实例部分，会完成负载均衡服务线程—RebalanceService 的启动（每隔 20s 执行一次）。

通过查看源码可以发现，RebalanceService 线程的 run()方法最终调用的是 RebalanceImpl 类的 rebalanceByTopic()方法，这个方法是实现 Consumer 端负载均衡的核心。

rebalanceByTopic()方法会根据消费者通信类型为“广播模式”还是“集群模式”做不同的逻辑处理。这里主要来看下集群模式下的主要处理流程：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-7cbfd097-5186-47ba-9641-687bc9381d0b.jpg)

(1) 从 rebalanceImpl 实例的本地缓存变量—topicSubscribeInfoTable 中，获取该 Topic 主题下的消息消费队列集合（mqSet）；

(2) 根据 topic 和 consumerGroup 为参数调用 mQClientFactory.findConsumerIdList()方法向 Broker 端发送通信请求，获取该消费组下消费者 Id 列表；

(3) 先对 Topic 下的消息消费队列、消费者 Id 排序，然后用消息队列分配策略算法（默认为：消息队列的平均分配算法），计算出待拉取的消息队列。这里的平均分配算法，类似于分页的算法，将所有 MessageQueue 排好序类似于记录，将所有消费端 Consumer 排好序类似页数，并求出每一页需要包含的平均 size 和每个页面记录的范围 range，最后遍历整个 range 而计算出当前 Consumer 端应该分配到的的 MessageQueue。

![Cosumer分配](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-6d1c69e7-5245-495f-8f8d-b5e48162df6f.jpg)

(4) 然后，调用 updateProcessQueueTableInRebalance()方法，具体的做法是，先将分配到的消息队列集合（mqSet）与 processQueueTable 做一个过滤比对。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-c84236ed-77a6-45e9-b086-4927d72ce21a.jpg)

- 上图中 processQueueTable 标注的红色部分，表示与分配到的消息队列集合 mqSet 互不包含。将这些队列设置 Dropped 属性为 true，然后查看这些队列是否可以移除出 processQueueTable 缓存变量，这里具体执行 removeUnnecessaryMessageQueue()方法，即每隔 1s 查看是否可以获取当前消费处理队列的锁，拿到的话返回 true。如果等待 1s 后，仍然拿不到当前消费处理队列的锁则返回 false。如果返回 true，则从 processQueueTable 缓存变量中移除对应的 Entry；
- 上图中 processQueueTable 的绿色部分，表示与分配到的消息队列集合 mqSet 的交集。判断该 ProcessQueue 是否已经过期了，在 Pull 模式的不用管，如果是 Push 模式的，设置 Dropped 属性为 true，并且调用 removeUnnecessaryMessageQueue()方法，像上面一样尝试移除 Entry；
- 最后，为过滤后的消息队列集合（mqSet）中的每个 MessageQueue 创建一个 ProcessQueue 对象并存入 RebalanceImpl 的 processQueueTable 队列中（其中调用 RebalanceImpl 实例的 computePullFromWhere(MessageQueue mq)方法获取该 MessageQueue 对象的下一个进度消费值 offset，随后填充至接下来要创建的 pullRequest 对象属性中），并创建拉取请求对象—pullRequest 添加到拉取列表—pullRequestList 中，最后执行 dispatchPullRequest()方法，将 Pull 消息的请求对象 PullRequest 依次放入 PullMessageService 服务线程的阻塞队列 pullRequestQueue 中，待该服务线程取出后向 Broker 端发起 Pull 消息的请求。其中，可以重点对比下，RebalancePushImpl 和 RebalancePullImpl 两个实现类的 dispatchPullRequest()方法不同，RebalancePullImpl 类里面的该方法为空。

消息消费队列在同一消费组不同消费者之间的负载均衡，其核心设计理念是在一个消息消费队列在同一时间只允许被同一消费组内的一个消费者消费，一个消息消费者能同时消费多个消息队列。

### 24.RocketMQ 消息长轮询了解吗？

所谓的长轮询，就是 Consumer 拉取消息，如果对应的 Queue 如果没有数据，Broker 不会立即返回，而是把 PullReuqest hold 起来，等待 queue 有了消息后，或者长轮询阻塞时间到了，再重新处理该 queue 上的所有 PullRequest。

![长轮询简单示意图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-5a715dea-8e18-471e-9a74-e97299901658.jpg)

- PullMessageProcessor#processRequest

```
//如果没有拉到数据
case ResponseCode.PULL_NOT_FOUND:
// broker 和 consumer 都允许 suspend，默认开启
if (brokerAllowSuspend && hasSuspendFlag) {
    long pollingTimeMills = suspendTimeoutMillisLong;
    if (!this.brokerController.getBrokerConfig().isLongPollingEnable()) {
        pollingTimeMills = this.brokerController.getBrokerConfig().getShortPollingTimeMills();
    }

    String topic = requestHeader.getTopic();
    long offset = requestHeader.getQueueOffset();
    int queueId = requestHeader.getQueueId();
    //封装一个PullRequest
    PullRequest pullRequest = new PullRequest(request, channel, pollingTimeMills,
            this.brokerController.getMessageStore().now(), offset, subscriptionData, messageFilter);
    //把PullRequest挂起来
    this.brokerController.getPullRequestHoldService().suspendPullRequest(topic, queueId, pullRequest);
    response = null;
    break;
}
```

挂起的请求，有一个服务线程会不停地检查，看 queue 中是否有数据，或者超时。

- PullRequestHoldService#run()

```
@Override
public void run() {
    log.info("{} service started", this.getServiceName());
    while (!this.isStopped()) {
        try {
            if (this.brokerController.getBrokerConfig().isLongPollingEnable()) {
                this.waitForRunning(5 * 1000);
            } else {
                this.waitForRunning(this.brokerController.getBrokerConfig().getShortPollingTimeMills());
            }

            long beginLockTimestamp = this.systemClock.now();
            //检查hold住的请求
            this.checkHoldRequest();
            long costTime = this.systemClock.now() - beginLockTimestamp;
            if (costTime > 5 * 1000) {
                log.info("[NOTIFYME] check hold request cost {} ms.", costTime);
            }
        } catch (Throwable e) {
            log.warn(this.getServiceName() + " service has exception. ", e);
        }
    }

    log.info("{} service end", this.getServiceName());
}
```

> 整理：Monster，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/IvBt3tB_IWZgPjKv5WGS4A)。

