## 进阶

### 9.如何保证消息的可用性/可靠性/不丢失呢？

消息可能在哪些阶段丢失呢？可能会在这三个阶段发生丢失：生产阶段、存储阶段、消费阶段。

所以要从这三个阶段考虑：

![消息传递三阶段](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-692a920d-621f-4b36-87f8-edb53e7f5cd9.jpg)

##### 生产

在生产阶段，主要**通过请求确认机制，来保证消息的可靠传递**。

- 1、同步发送的时候，要注意处理响应结果和异常。如果返回响应 OK，表示消息成功发送到了 Broker，如果响应失败，或者发生其它异常，都应该重试。
- 2、异步发送的时候，应该在回调方法里检查，如果发送失败或者异常，都应该进行重试。
- 3、如果发生超时的情况，也可以通过查询日志的 API，来检查是否在 Broker 存储成功。

##### 存储

存储阶段，可以通过**配置可靠性优先的 Broker 参数来避免因为宕机丢消息**，简单说就是可靠性优先的场景都应该使用同步。

- 1、消息只要持久化到 CommitLog（日志文件）中，即使 Broker 宕机，未消费的消息也能重新恢复再消费。
- 2、Broker 的刷盘机制：同步刷盘和异步刷盘，不管哪种刷盘都可以保证消息一定存储在 pagecache 中（内存中），但是同步刷盘更可靠，它是 Producer 发送消息后等数据持久化到磁盘之后再返回响应给 Producer。

![同步刷盘和异步刷盘-图片来源官网](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-61a3b092-1329-4738-bef9-6eb7ae429c26.jpg)

- 3、Broker 通过主从模式来保证高可用，Broker 支持 Master 和 Slave 同步复制、Master 和 Slave 异步复制模式，生产者的消息都是发送给 Master，但是消费既可以从 Master 消费，也可以从 Slave 消费。同步复制模式可以保证即使 Master 宕机，消息肯定在 Slave 中有备份，保证了消息不会丢失。

##### 消费

从 Consumer 角度分析，如何保证消息被成功消费？

- Consumer 保证消息成功消费的关键在于确认的时机，不要在收到消息后就立即发送消费确认，而是应该在执行完所有消费业务逻辑之后，再发送消费确认。因为消息队列维护了消费的位置，逻辑执行失败了，没有确认，再去队列拉取消息，就还是之前的一条。

### 10.如何处理消息重复的问题呢？

RocketMQ 可以保证消息一定投递，且不丢失，但无法保证消息不重复消费。

因此，需要在业务端做好消息的幂等性处理，或者做消息去重。

![三分恶面渣逆袭：幂等和去重](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-05c0538b-abfa-4bb0-973f-6b92555a6e5b.jpg)

幂等性是指一个操作可以执行多次而不会产生副作用，即无论执行多少次，结果都是相同的。可以在业务逻辑中加入检查逻辑，确保同一消息多次消费不会产生副作用。

例如，在支付场景下，消费者消费扣款的消息，对一笔订单执行扣款操作，金额为100元。

如果因网络不稳定等原因导致扣款消息重复投递，消费者重复消费了该扣款消息，但最终的业务结果要保证只扣款一次，金额为100元。如果扣款操作是符合要求的，那么就可以认为整个消费过程实现了消息幂等。

消息去重，是指在消费者消费消息之前，先检查一下是否已经消费过这条消息，如果消费过了，就不再消费。

业务端可以通过一个专门的表来记录已经消费过的消息 ID，每次消费消息之前，先查询一下这个表，如果已经存在，就不再消费。

```java
public void processMessage(String messageId, String message) {
    if (!isMessageProcessed(messageId)) {
        // 处理消息
        markMessageAsProcessed(messageId);
    }
}

private boolean isMessageProcessed(String messageId) {
    // 查询去重表，检查消息ID是否存在
}

private void markMessageAsProcessed(String messageId) {
    // 将消息ID插入去重表
}
```

#### 如何保证消息的幂等性？

![勇哥：消费幂等](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20240726172003.png)

首先，消息必须携带业务唯一标识，可以通过雪花算法生成全局唯一 ID。

```java
Message msg = new Message(TOPIC /* Topic */,
             TAG /* Tag */,
               ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET) /* Message body */
             );
message.setKey("ORDERID_100"); // 订单编号
SendResult sendResult = producer.send(message);      
```

其次，在消费者接收到消息后，判断 Redis 中是否存在该业务主键的标志位，若存在标志位，则认为消费成功，否则执行业务逻辑，执行完成后，在缓存中添加标志位。

```java
public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
    try {
        for (MessageExt messageExt : msgs) {
           String bizKey = messageExt.getKeys(); // 唯一业务主键
           //1. 判断是否存在标志
           if(redisTemplate.hasKey(RedisKeyConstants.WAITING_SEND_LOCK + bizKey)) {
         			continue;
       		 }
         	 //2. 执行业务逻辑
           //TODO do business
           //3. 设置标志位
           redisTemplate.opsForValue().set(RedisKeyConstants.WAITING_SEND_LOCK + bizKey, "1", 72, TimeUnit.HOURS);
        }
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    } catch (Exception e) {
        logger.error("consumeMessage error: ", e);
        return ConsumeConcurrentlyStatus.RECONSUME_LATER;
    }
}
```

然后，利用数据库的唯一索引来防止业务的重复插入。

```sql
CREATE TABLE `t_order` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(64) NOT NULL COMMENT '订单编号',
  `order_name` varchar(64) NOT NULL COMMENT '订单名称',
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单表';
```

最后，在数据库表中使用版本号，通过乐观锁机制来保证幂等性。每次更新操作时检查版本号是否一致，只有一致时才执行更新并递增版本号。如果版本号不一致，则说明操作已被执行过，拒绝重复操作。

```java
public void updateRecordWithOptimisticLock(int id, String newValue, int expectedVersion) {
    int updatedRows = jdbcTemplate.update(
        "UPDATE records SET value = ?, version = version + 1 WHERE id = ? AND version = ?",
        newValue, id, expectedVersion
    );
    if (updatedRows == 0) {
        throw new OptimisticLockingFailureException("Record has been modified by another transaction");
    }
}
```

或者悲观锁机制，通过数据库的锁机制来保证幂等性。

```java
public void updateRecordWithPessimisticLock(int id) {
    jdbcTemplate.queryForObject("SELECT * FROM records WHERE id = ? FOR UPDATE", id);
    jdbcTemplate.update("UPDATE records SET value = ? WHERE id = ?", "newValue", id);
}
```

#### 雪花算法了解吗？

雪花算法是由 Twitter 开发的一种分布式唯一 ID 生成算法。

![技术派教程：雪花算法](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20240726174236.png)

雪花算法以 64 bit 来存储组成 ID 的4 个部分：

1. 最高位占1 bit，始终为 0，表示正数。
2. 中位占 41 bit，值为毫秒级时间戳；
3. 中下位占 10 bit，机器 ID（包括数据中心 ID 和机器 ID），可以支持 1024 个节点。
4. 末位占 12 bit，值为当前毫秒内生成的不同的自增序列，值的上限为 4096；

目前雪花算法的实现比较多，可以直接使用 Hutool 工具类库中的 `IdUtil.getSnowflake()` 方法来获取雪花 ID。

```java
long id = IdUtil.getSnowflakeNextId();
```

### 11.怎么处理消息积压？

发生了消息积压，这时候就得想办法赶紧把积压的消息消费完，就得考虑提高消费能力，一般有两种办法：

![消息积压处理](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-5d1ea064-1a37-4746-ad26-a18a1c8c344e.jpg)

- **消费者扩容**：如果当前 Topic 的 Message Queue 的数量大于消费者数量，就可以对消费者进行扩容，增加消费者，来提高消费能力，尽快把积压的消息消费玩。
- **消息迁移 Queue 扩容**：如果当前 Topic 的 Message Queue 的数量小于或者等于消费者数量，这种情况，再扩容消费者就没什么用，就得考虑扩容 Message Queue。可以新建一个临时的 Topic，临时的 Topic 多设置一些 Message Queue，然后先用一些消费者把消费的数据丢到临时的 Topic，因为不用业务处理，只是转发一下消息，还是很快的。接下来用扩容的消费者去消费新的 Topic 里的数据，消费完了之后，恢复原状。

![消息迁移扩容消费](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-69aa8004-45e9-4e41-b628-1d7ed6d94c92.jpg)

### 12.顺序消息如何实现？

RocketMQ 实现顺序消息的关键在于保证消息生产和消费过程中严格的顺序控制，即确保同一业务的消息按顺序发送到同一个队列中，并由同一个消费者线程按顺序消费。

![三分恶面渣逆袭：顺序消息](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-e3de6bb5-b5db-47af-8ae3-73aedd269f32.jpg)


#### 局部顺序消息如何实现？

局部顺序消息保证在某个逻辑分区或业务逻辑下的消息顺序，例如同一个订单或用户的消息按顺序消费，而不同订单或用户之间的顺序不做保证。

![三分恶面渣逆袭：部分顺序消息](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-14ab3700-8538-473e-bb66-8acfdd6a77a2.jpg)

#### 全局顺序消息如何实现？

全局顺序消息保证消息在整个系统范围内的严格顺序，即消息按照生产的顺序被消费。

可以将所有消息发送到一个单独的队列中，确保所有消息按生产顺序发送和消费。

![三分恶面渣逆袭：全局顺序消息](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-8e98ac61-ad47-4ed4-aac6-223201f9aae2.jpg)

### 13.如何实现消息过滤？

有两种方案：

- 一种是在 Broker 端按照 Consumer 的去重逻辑进行过滤，这样做的好处是避免了无用的消息传输到 Consumer 端，缺点是加重了 Broker 的负担，实现起来相对复杂。
- 另一种是在 Consumer 端过滤，比如按照消息设置的 tag 去重，这样的好处是实现起来简单，缺点是有大量无用的消息到达了 Consumer 端只能丢弃不处理。

一般采用 Cosumer 端过滤，如果希望提高吞吐量，可以采用 Broker 过滤。

对消息的过滤有三种方式：

![消息过滤](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-f2c8bf50-dc51-44c8-9d71-b8a22af199c4.jpg)

- 根据 Tag 过滤：这是最常见的一种，用起来高效简单

```java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("CID_EXAMPLE");
consumer.subscribe("TOPIC", "TAGA || TAGB || TAGC");
```

- SQL 表达式过滤：SQL 表达式过滤更加灵活

```java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name_4");
// 只有订阅的消息有这个属性a, a >=0 and a <= 3
consumer.subscribe("TopicTest", MessageSelector.bySql("a between 0 and 3");
consumer.registerMessageListener(new MessageListenerConcurrently() {
   @Override
   public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
       return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
   }
});
consumer.start();

```

- Filter Server 方式：最灵活，也是最复杂的一种方式，允许用户自定义函数进行过滤

### 14.延时消息了解吗？

电商的订单超时自动取消，就是一个典型的利用延时消息的例子，用户提交了一个订单，就可以发送一个延时消息，1h 后去检查这个订单的状态，如果还是未付款就取消订单释放库存。

RocketMQ 是支持延时消息的，只需要在生产消息的时候设置消息的延时级别：

```java
// 实例化一个生产者来产生延时消息
DefaultMQProducer producer = new DefaultMQProducer("ExampleProducerGroup");
// 启动生产者
producer.start();
int totalMessagesToSend = 100;
for (int i = 0; i < totalMessagesToSend; i++) {
    Message message = new Message("TestTopic", ("Hello scheduled message " + i).getBytes());
    // 设置延时等级3,这个消息将在10s之后发送(现在只支持固定的几个时间,详看delayTimeLevel)
    message.setDelayTimeLevel(3);
    // 发送消息
    producer.send(message);
}
```

但是目前 RocketMQ 支持的延时级别是有限的：

```java
private String messageDelayLevel = "1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h";
```

#### RocketMQ 怎么实现延时消息的？

简单，八个字：`临时存储`+`定时任务`。

Broker 收到延时消息了，会先发送到主题（SCHEDULE_TOPIC_XXXX）的相应时间段的 Message Queue 中，然后通过一个定时任务轮询这些队列，到期后，把消息投递到目标 Topic 的队列中，然后消费者就可以正常消费这些消息。

![延迟消息处理流程-图片来源见水印](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-e3b68480-8006-4cd6-892a-1c72f8b0fbcb.jpg)

### 15.怎么实现分布式消息事务的？半消息？

半消息：是指暂时还不能被 Consumer 消费的消息，Producer 成功发送到 Broker 端的消息，但是此消息被标记为 “暂不可投递” 状态，只有等 Producer 端执行完本地事务后经过二次确认了之后，Consumer 才能消费此条消息。

依赖半消息，可以实现分布式消息事务，其中的关键在于二次确认以及消息回查：

![RocketMQ实现消息事务](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-76df2fb9-0f3f-496d-88a8-aac79ad1102c.jpg)

1、Producer 向 broker 发送半消息

2、Producer 端收到响应，消息发送成功，此时消息是半消息，标记为 “不可投递” 状态，Consumer 消费不了。

3、Producer 端执行本地事务。

4、正常情况本地事务执行完成，Producer 向 Broker 发送 Commit/Rollback，如果是 Commit，Broker 端将半消息标记为正常消息，Consumer 可以消费，如果是 Rollback，Broker 丢弃此消息。

5、异常情况，Broker 端迟迟等不到二次确认。在一定时间后，会查询所有的半消息，然后到 Producer 端查询半消息的执行情况。

6、Producer 端查询本地事务的状态

7、根据事务的状态提交 commit/rollback 到 broker 端。（5，6，7 是消息回查）

8、消费者段消费到消息之后，执行本地事务。

### 16.死信队列知道吗？

死信队列用于存储那些无法被正常处理的消息，这些消息被称为死信（Dead Letter）。

![阿里云官方文档：死信队列](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20240726163831.png)

产生死信的原因是，消费者在处理消息时发生异常，且达到了最大重试次数。当消费失败的原因排查并解决后，可以重发这些死信消息，让消费者重新消费；如果暂时无法处理，为避免到期后死信消息被删除，可以先将死信消息导出并进行保存。

### 17.如何保证 RocketMQ 的高可用？

NameServer 因为是无状态，且不相互通信的，所以只要集群部署就可以保证高可用。

![NameServer集群](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-0ce789f4-7a47-4c24-ac08-76f0490298f7.jpg)

RocketMQ 的高可用主要是在体现在 Broker 的读和写的高可用，Broker 的高可用是通过`集群`和`主从`实现的。

![Broker集群、主从示意图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-76c5eb61-9605-4620-84fb-dc960f01de85.jpg)

Broker 可以配置两种角色：Master 和 Slave

- Master 角色的 Broker 支持读和写
- Slave 角色的 Broker 只支持读
- Master 会向 Slave 同步消息。

也就是说 Producer 只能向 Master 角色的 Broker 写入消息，Cosumer 可以从 Master 和 Slave 角色的 Broker 读取消息。

Consumer 的配置文件中，并不需要设置是从 Master 读还是从 Slave 读，当 Master 不可用或者繁忙的时候， Consumer 的读请求会被自动切换到从 Slave。有了自动切换 Consumer 这种机制，当一个 Master 角色的机器出现故障后，Consumer 仍然可以从 Slave 读取消息，不影响 Consumer 读取消息，这就实现了读的高可用。

如何达到发送端写的高可用性呢？在创建 Topic 的时候，把 Topic 的多个 Message Queue 创建在多个 Broker 组上（相同 Broker 名称，不同 brokerId 机器组成 Broker 组），这样当 Broker 组的 Master 不可用后，其他组 Master 仍然可用， Producer 仍然可以发送消息 RocketMQ 目前还不支持把 Slave 自动转成 Master ，如果机器资源不足，需要把 Slave 转成 Master ，则要手动停止 Slave 色的 Broker ，更改配置文件，用新的配置文件启动 Broker。