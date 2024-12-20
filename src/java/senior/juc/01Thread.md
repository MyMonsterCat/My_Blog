---
title: 线程基础
category: Java
tag:

- Java
- JUC

---

## 进程和线程

进程是资源分配的最小单位，进程是正在运行程序的实例

> 程序由指令和数据组成，但这些指令要运行，数据要读写，就必须将指令加载至 CPU，数据加载至内存。在指令运行过程中还需要用到磁盘、网络等设备。进程就是用来加载指令、管理内存、管理 IO 的，当一个程序被运行，从磁盘加载这个程序的代码至内存，这时就开启了一个进程

线程是资源调度的最小单位，一个进程内有若干个线程。

> 一个线程就是一个指令流，将指令流中的一条条指令以一定的顺序交给 CPU 执行

## 并行和并发

并行是同一时间内独立执行多个任务

并发是系统有处理多个任务的能力，但任一时刻内只有一个任务在执行（其实就是线程轮流使用CPU），即微观串行，宏观并行



## 创建线程的方式

共有四种方式可以创建线程，分别是：

- 继承Thread类
- 实现runnable接口
- 实现Callable接口（能够获取返回值）
- 线程池创建线程



## runnable和callable有什么区别

|          |  Runnable   |                Callable                |
| :------: |:-----------:| :------------------------------------: |
| 重写方法 |    run()    |                 call()                 |
|  返回值  |     /     | 配合FutureTask.get()获取，会阻塞主进程 |
|   异常   | 内部消化，不能继续上抛 |            call()可抛出异常            |



## 线程的run()和start()有什么区别？



start(): 用来启动线程，通过该线程调用run方法执行run方法中所定义的逻辑代码。start方法只能被调用一次。

run(): 封装了要被线程执行的代码，可以被调用多次。

也就是说，start() 方法的调用会告诉 JVM 准备好所有必要的新线程结构，分配其所需资源，并调用线程的 run() 方法在这个新线程中执行。

## 什么是守护线程

Java中的线程分为两类，分别为 daemon 线程（守护线程）和 user 线程（用户线程）。

在JVM 启动时会调用 main 函数，main函数所在的线程就是一个用户线程。同时JVM内部还启动了很多守护线程，比如垃圾回收线程。

当最后一个非守护线程束时，JVM会正常退出，而不管当前是否存在守护线程，也就是说守护线程是否结束并不影响 JVM退出。

换而言之，**只要有一个用户线程还没结束，正常情况下JVM就不会退出**。



## 线程有哪些常用的调度方法？

![三分恶面渣逆袭：线程常用调度方法](https://monster-note.oss-cn-hangzhou.aliyuncs.com/blog/juc/202412191558881.png)

## 线程之间状态的转换

### 操作系统层面

![](https://monster-note.oss-cn-hangzhou.aliyuncs.com/blog/juc/202412200901163.png)

- 【初始状态】仅是在语言层面创建了线程对象，还未与操作系统线程关联

- 【可运行状态】（就绪状态）指该线程已经被创建（与操作系统线程关联），可以由 CPU 调度执行

- 【运行状态】指获取了 CPU 时间片运行中的状态

​	当 CPU 时间片用完，会从【运行状态】转换至【可运行状态】，会导致线程的上下文切换

- 【阻塞状态】

​	如果调用了阻塞 API，如 BIO 读写文件，这时该线程实际不会用到 CPU，会导致线程上下文切换，进入【阻塞状态】

​	等 BIO 操作完毕，会由操作系统唤醒阻塞的线程，转换至【可运行状态】

​	与【可运行状态】的区别是，对【阻塞状态】的线程来说只要它们一直不唤醒，调度器就一直不会考虑调度它们

- 【终止状态】表示线程已经执行完毕，生命周期已经结束，不会再转换为其它状态

### Java层面

![](https://monster-note.oss-cn-hangzhou.aliyuncs.com/blog/juc/202412200904299.png)

假设现有一个线程，名称为`t`

#### **情况1 NEW --> RUNNABLE**

- 当调用`t.start()`时，线程状态由`NEW-->RUNNABLE`

#### **情况2 RUNNABLE --> WAITING**

线程用synchronized(obj) 获取了对象锁后

- 调用`obj.wait()`方式时

- 调用 `obj.notify()` ， `obj.notifyAll() `， `t.interrupt() `时
  - 竞争锁成功，t 线程从 `WAITING --> RUNNABLE`
  - 竞争锁失败，t 线程从 `WAITING --> BLOCKED`

#### 情况3 RUNNABLE --> WAITING

- 当前线程调用 `t.join() `方法时，当前线程从 `RUNNABLE --> WAITING`
- t 线程运行结束，或调用了当前线程的 `interrupt()` 时，当前线程从 `WAITING --> RUNNABLE`

#### 情况4 RUNNABLE --> WAITING

- 当前线程调用`LockSupport.park()` 方法会让当前线程从 `RUNNABLE --> WAITING`
- 调用 `LockSupport.unpark(目标线程)` 或调用了线程的 `interrupt()` ，会让目标线程从 `WAITING -->  RUNNABLE`

#### 情况5 RUNNABLE <--> TIMED_WAITING

t 线程用 synchronized(obj) 获取了对象锁后

- 调用 `obj.wait(long n)` 方法时，t 线程从 `RUNNABLE --> TIMED_WAITING`
- t 线程等待时间超过了 n 毫秒，或调用 `obj.notify()` ， `obj.notifyAll()` ， `t.interrupt()` 时
  - 竞争锁成功，t 线程从 `TIMED_WAITING --> RUNNABLE`
  - 竞争锁失败，t 线程从 `TIMED_WAITING --> BLOCKED`

#### 情况6 RUNNABLE <--> TIMED_WAITING

- 当前线程调用 t.join(long n) 方法时，当前线程从 `RUNNABLE --> TIMED_WAITING`
- 当前线程等待时间超过了n毫秒，或t线程运行结束，或调用了当前线程的 `interrupt()` 时，当前线程从 `TIMED_WAITING --> RUNNABLE`

#### 情况7 RUNNABLE <--> TIMED_WAITING

- 当前线程调用 Thread.sleep(long n) ，当前线程从 `RUNNABLE --> TIMED_WAITING`
- 当前线程等待时间超过了 n 毫秒，当前线程从 `TIMED_WAITING --> RUNNABLE`

#### 情况8 RUNNABLE <--> TIMED_WAITING

- 当前线程调用 LockSupport.parkNanos(long nanos) 或 LockSupport.parkUntil(long millis) 时，当前线程从 `RUNNABLE --> TIMED_WAITING`
- 调用 LockSupport.unpark(目标线程) 或调用了线程 的 interrupt() ，或是等待超时，会让目标线程从 `TIMED_WAITING--> RUNNABLE`

#### 情况9 RUNNABLE <--> BLOCKED

- t 线程用 synchronized(obj) 获取了对象锁时如果竞争失败，从 `RUNNABLE --> BLOCKED`
- 持 obj 锁线程的同步代码块执行完毕，会唤醒该对象上所有 BLOCKED 的线程重新竞争，如果其中 t 线程竞争 成功，从 `BLOCKED --> RUNNABLE` ，其它失败的线程仍然 BLOCKED

#### 情况10 RUNNABLE <--> TERMINATED

当前线程所有代码运行完毕，进入 TERMINATED

![](https://monster-note.oss-cn-hangzhou.aliyuncs.com/blog/juc/202412200909227.png)

## 线程之间是如何通信的？

<img src="https://monster-note.oss-cn-hangzhou.aliyuncs.com/blog/juc/202412200947551.png" style="zoom:50%;" />

### 1.volatile和synchronized关键字

主要依靠Java内存模型（JMM），JMM 决定了一个线程对共享变量的写入何时对另外一个线程可见：JMM线程之间的共享变量存储在主内存（main memory）中，每个线程都有一个私有的本地内存（local memory），本地内存中存储了共享变量的副本

![深入浅出 Java 多线程：JMM](https://monster-note.oss-cn-hangzhou.aliyuncs.com/blog/juc/202412191432408.png)

线程 A 与线程 B 之间如要通信的话，必须要经历下面 2 个步骤：

- 线程 A 把本地内存 A 中的共享变量副本刷新到主内存中。
- 线程 B 到主内存中读取线程 A 刷新过的共享变量，再同步到自己的共享变量副本中。

![深入浅出 Java 多线程：线程间通信](https://monster-note.oss-cn-hangzhou.aliyuncs.com/blog/juc/202412191434279.png)

### 2.等待/通知机制

可以通过Java内置的等待/通知机制（wait()/notify()）实现一个线程修改一个对象的值，而另一个线程感知到了变化，然后进行相应的操作。

### 3.管道输入/输出流

管道输入/输出流和普通的文件输入/输出流或者网络输入/输出流不同之处在于，它主要用于线程之间的数据传输，而传输的媒介为内存。

管道输入/输出流主要包括了如下4种具体实现：PipedOutputStream、PipedInputStream、 PipedReader和PipedWriter，前两种面向字节，而后两种面向字符。

### 4.使用Thread.join()

如果一个线程A执行了thread.join()语句，其含义是：当前线程A等待thread线程终止之后才从thread.join()返回。线程Thread除了提供join()方法之外，还提供了join(long millis)和join(long millis,int nanos)两个具备超时特性的方法。

### 5.使用ThreadLocal

ThreadLocal，即线程变量，是一个以ThreadLocal对象为键、任意对象为值的存储结构。这个结构被附带在线程上，也就是说一个线程可以根据一个ThreadLocal对象查询到绑定在这个线程上的一个值。

可以通过set(T)方法来设置一个值，在当前线程下再通过get()方法获取到原先设置的值。

