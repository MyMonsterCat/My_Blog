---
title: 垃圾回收相关知识
category: Java
tag:
  - Java
  - JVM
order: 3
comment: false
---

## 1.如何判断对象可以回收

### 引用计数法

优点: **原理简单，判断效率高**

> 其效率高体现在
>
> - 回收没有延迟性，无需等到内存不够的时候才开始回收，运行时根据对象计数器是否为 0，可以直接回收
> - 在垃圾回收过程中，应用无需挂起；如果申请内存时，内存不足，则立刻报 OOM 错误
> - 区域性，更新对象的计数器时，只是影响到该对象，不会扫描全部对象

弊端:

- 循环引用时，两个对象的计数都为1，导致两个对象都无法被释放，会引发内存泄漏
- 每次对象被引用时，都需要去更新计数器，有一点时间开销
- 浪费 CPU 资源，即使内存够用，仍然在运行时进行计数器的统计。

<img src="https://monster-note.oss-cn-hangzhou.aliyuncs.com/img/jvm/202303300959630.png" alt="引用计数法" style="zoom: 67%;" />

### 可达性分析算法

> 也可以称为根搜索算法、追踪性垃圾收集

原理: 通过 GC Roots 作为起始点进行搜索（GC Roots 是一组活跃的引用，不是对象，放在 GC Roots Set 集合）

- 能够到达到的对象都是存活的（只有能够被根对象集合直接或者间接连接的对象才是存活对象），换言之该对象是可达的
- 如果目标对象没有任何引用链相连，则是不可达的，就意味着该对象己经死亡，可以标记为垃圾对象。

![](https://monster-note.oss-cn-hangzhou.aliyuncs.com/img/jvm/202303301013328.png)

:::tip 可以作为GC Root的对象

- 虚拟机栈（栈帧中的本地变量表）中引用的对象。- 方法区中类静态属性引用的对象，例如字符串常量池（string Table）里的引用
- 方法区中常量引用的对象
- 本地方法栈中JNI（即一般说的Native方法）引用的对象
- 同步锁 synchronized 持有的对象
- ...(详见书本3.2.2)

:::

## 2.引用类型

### 强引用

被强引用关联的对象不会被回收，只有所有 GCRoots 都不通过强引用引用该对象，才能被垃圾回收

- 强引用可以直接访问目标对象
- 虚拟机宁愿抛出 OOM 异常，也不会回收强引用所指向对象
- 强引用可能导致**内存泄漏**

```java
//  使用 new 一个新对象的方式来创建强引用
Object obj=new Object();
```

### 软引用

被软引用关联的对象只有在==内存不够==的情况下才会被回收

```java
// 使用 SoftReference 类来创建软引用
// list是强引用，而SoftReference和byte数组则是软引用
List<SoftReference<byte[]>>list=new ArrayList<>();
        SoftReference<byte[]>ref=new SoftReference<>(new byte[4*1024*1024]);
```

软引用一般和引用队列`ReferenceQueue`（也可以不和引用队列）联合使用（目的是**清理软引用**），使用的思路为：

- 如果软引用所引用对象被垃圾回收，JAVA虚拟机就会把这个软引用加入到与之关联的引用队列中
-
当JVM内存不够时，将该队列从队头的元素进行出队，即虚拟机会尽可能优先回收长时间闲置不用的软引用对象，对那些刚构建的或刚使用过的"
较新的"软对象会被虚拟机尽可能保留。

```java
  ReferenceQueue<String> referenceQueue=new ReferenceQueue<>();
        String str=new String("abc");
        SoftReference<String> softReference=new SoftReference<>(str,referenceQueue);

        str=null;
        // 软引用对象是在jvm内存不够的时候才会被回收，我们调用System.gc()方法只是起通知作用，JVM什么时候扫描回收对象是JVM自己的状态决定的。就算扫描到软引用对象也不一定会回收它，只有内存不够的时候才会回收。
        System.gc();
        // 所以这里还是能获取到abc
        System.out.println(softReference.get()); // abc
        // 手动清理软引用
        Reference<?extends String> reference=referenceQueue.poll();
        System.out.println(reference); //null
        // 当JVM内存不足时，JVM首先将软引用中的对象引用置为null，然后通知垃圾回收器进行回收：
        if(JVM内存不足){
        // 将软引用中的对象引用置为null
        str=null;
        // 通知垃圾回收器进行回收
        System.gc();
        }
```

**应用场景**：内存敏感的高速缓存

### 弱引用

被弱引用关联的对象一定会被回收，也就是说它只能存活到下一次垃圾回收发生之前。

```java
// 使用 WeakReference 类来实现弱引用
  String str=new String("abc");
          WeakReference<String> weakReference=new WeakReference<>(str);
        str=null;
```

弱引用的使用和软引用类似，也是和引用队列`ReferenceQueue`联合使用（也可以不和引用队列联合使用）

### 虚引用

- 虚引用顾名思义，就是形同虚设。一个对象是否有虚引用的存在，完全不会对其生存时间构成影响，也无法通过虚引用取得一个对象

- 如果一个对象仅持有虚引用，那么它就和没有任何引用一样，在任何时候都可能被垃圾回收器回收

- **为一个对象设置虚引用关联的唯一目的就是能在这个对象被回收时收到一个系统通知**

- 必须配合引用队列使用

```java
  String str=new String("abc");
        ReferenceQueue queue=new ReferenceQueue();
        // 创建虚引用，要求必须与一个引用队列关联
        PhantomReference pr=new PhantomReference(str,queue);
```

应用场景: 直接内存释放

![](https://monster-note.oss-cn-hangzhou.aliyuncs.com/img/jvm/202303301151216.png)

如上图，如果B对象不再引用ByteBuffer对象，ByteBuffer就会被回收。但是直接内存中的内存还未被回收。这时需要将虚引用对象放入引用队列中，然后调用它的clean方法来释放直接内存（详见
**内存结构->直接内存**章节）

```java
// ByteBuffer使用了实现类DirectByteBuffer
// DirectByteBuffer其构造函数使用了Cleaner类，而Cleaner类为虚引用
public class Cleaner extends PhantomReference<Object> {

}
```

### 终结器引用

-
所有的类都继承自Object类，Object类有一个finalize方法。当某个对象不再被其他的对象所引用时，会先将终结器引用对象放入引用队列中，然后根据终结器引用对象找到它所引用的对象，然后调用该对象的finalize方法。调用以后，该对象就可以被垃圾回收了
- 必须配合引用队列使用

~~懒得写，~~**详见书本3.2.4**

## 3.垃圾回收算法

### 理论：分代收集

> 详细介绍请参考书本3.3.1分代收集理论

Java堆一般会分为新生代和老年代两个区域，分别对这两个区域按照实际情况采取适当的收集算法。

### 三种回收算法的对比

| Mark-Sweep | Mark-Compact | Copying  |                       |
|------------|--------------|----------|-----------------------|
| 速度         | 中等           | 最慢       | 最快                    |
| 空间开销       | 少（但会堆积碎片）    | 少（不堆积碎片） | 通常需要活对象的 2 倍大小（不堆积碎片） |
| 移动对象       | 否            | 是        | 是                     |

### 标记-清除

<img src="https://monster-note.oss-cn-hangzhou.aliyuncs.com/img/jvm/202303301513239.png" style="zoom:50%;" />

定义：标记清除算法顾名思义，是指在虚拟机执行垃圾回收的过程中，先采用标记算法确定可回收对象，然后垃圾收集器根据标识清除相应的内容，给堆内存腾出相应的空间

> 这里的腾出内存空间并不是将内存空间的字节清0，而是记录下这段内存的起始结束地址，下次分配内存的时候，会直接覆盖这段内存

缺点：

- 执行效率不稳定，效率随对象数量增长而降低
- 容易产生大量的内存碎片，可能无法满足大对象的内存分配，一旦导致无法分配对象，那就会导致jvm启动gc，一旦启动gc，我们的应用程序就会暂停，这就导致应用的响应速度变慢

### 标记-整理

<img src="https://monster-note.oss-cn-hangzhou.aliyuncs.com/img/jvm/202303301513378.png" style="zoom:50%;" />

让所有存活的对象都向一端移动，然后直接清理掉端边界以外的内存

缺点：如果在老年代这种每次回收都有大量对象存活的区域，移动存活对象是种极大负担，同时也会触发STW

### 标记-复制

<img src="https://monster-note.oss-cn-hangzhou.aliyuncs.com/img/jvm/202303301522032.png" style="zoom:50%;" />

<img src="https://monster-note.oss-cn-hangzhou.aliyuncs.com/img/jvm/202303301523286.png" style="zoom:50%;" />



<img src="https://monster-note.oss-cn-hangzhou.aliyuncs.com/img/jvm/202303301523100.png" alt="img" style="zoom:50%;" />

流程：

- 将内存分为等大小的两个区域，FROM和TO（TO中为空）
- 先将被GC Root引用的对象从FROM放入TO中，再回收不被GC Root引用的对象
- 交换FROM和TO

优点：避免内存碎片的问题

缺点：占用双倍的内存空间（浪费了一半空间）。

## 4.HotSpot算法细节

参考链接：

[理解Java的强引用、软引用、弱引用和虚引用](https://juejin.cn/post/6844903665241686029)
