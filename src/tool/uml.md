---
title: 程序猿常用画图知识及工具
category: 开发工具
tag:

- UML

---

::: info

本文参考和转载文章

[亿图图示官方](https://www.zhihu.com/org/yi-tu-tu-shi)、[ProcessOn官方](https://www.zhihu.com/org/processon-51)、[程序员需要掌握的几种图](https://www.jianshu.com/p/77d00c4af9ad)、[需要哪些设计图](https://www.jianshu.com/p/77d00c4af9ad)、[画流程图常用的工具](https://zhuanlan.zhihu.com/p/136128308)

:::

> 图是一种用来说明的工具，所以只要是你认为能更好的说明你的意图，任何图都是可以的。
>
> 最终要做的是软件而不是图表，不要为了做图而做图，最后本末倒置，毕竟图标的目的是方便沟通
>
> 在绘制任何图形之前，都应该先弄清楚图形的概念、组成元素以及绘制规范

> ### 一般软件生命周期中需要画图的地方
>
> ![](https://raw.githubusercontent.com/MyMonsterCat/md_image/main/%E5%9F%BA%E7%A1%80/HTTPS/%E6%B5%81%E7%A8%8B.jpg)
>
> 业务流程图:做项目之前要搞清楚业务是怎样流转的，不要上来去想要实现什么功能。经过几次开会讨论，找相关领域专家探讨(
> 确认各个环节怎样操作)。
>
> 功能图:
>
一般情况下产品或系统的总功能可分解为若干分功能，各分功能又可进一步分解为若干二级分功能，如此继续，直至各分功能被分解为功能单元为止。这种由分功能或功能单元按照其逻辑关系连成的结构称为功能结构。分功能或功能单元的相互关系可以用图来描述，表达分功能或功能单元相互关系或从属关系的图称为功能结构图。功能图不要有专业术语，比如查询订单，修改订单审核状态等。要换成查看有哪些订单，对订单审核等。

------

# 流程图

## 定义

​ 流程图=流程+图。

> 所谓流程，IS09000系列国际标准中将流程定义为一组将输入转化为输出的相互群或相互作用的活动。流程有六个要素构成，分别是流程的输入资源、流程中的若干活动、活动的相互作用、输出结果、顾客、最终流程创造的价值。

一个流程会将这6个要素有序串联起来，而流程图则是承载上述程序的图形载体。

根据流程图“流动”信息的不同，又可以细分为产品流程图、数据流程图、程序流程图等，比如：

- 页面流程图，呈现的是页面跳转顺序；
- 数据流程图，用于表达数据的流转。

## 符号规范

**流程图中的每个符号都有着特定含义**。

画流程图的时候如果弄错了，整幅流程图的专业性就会大打折扣。

面是几个重要且最常用的符号，需要牢记！

![img](https://pic4.zhimg.com/80/v2-51c2474511d797de0c16b5a3d559470b_720w.jpg)

## 结构规范

流程图有三大结构，分别是顺序结构、选择结构和循环结构。

**1）顺序结构**

这种结构最简单，各个步骤是按先后顺序执行的。如图，A、B、C是三个连续的步骤，它们是按顺序执行的，即完成上一个框中指定的操作才能再执行下一个动作。

![img](https://pic2.zhimg.com/80/v2-ead8d8e97b424fe7da23a30448344139_720w.jpg)顺序结构

**2） 选择结构**

选择结构又称分支结构，用于判断给定的条件，根据判断的结果判断某些条件，根据判断的结果来控制程序的流程。

![img](https://pic4.zhimg.com/80/v2-9491d93ad8c3021f9270069d1c09fe37_720w.jpg)选择结构

**3）循环结构**

循环结构又称为重复结构，指在程序中需要反复执行某个功能而设置的一种程序结构。它由循环体中的条件，判断继续执行某个功能还是退出循环。

根据判断条件，循环结构又可细分为以下两种形式：先判断后执行的循环结构（当型结构），和先执行后判断的循环结构（直到型结构）。

![img](https://pic1.zhimg.com/80/v2-a3153e0d91ea2900c1e8f09455d93a58_720w.jpg)

## 路径规范

除了符号规划、结构规划，绘制流程图过程中还要注意一些约定俗成的路径规划，比如

1）绘制流程图时，为了提高流程图的逻辑性，应**遵循从左到右、从上到下的顺序排列**。

2）一个流程从开始符开始，以结束符结束。开始符号只能出现一次，而结束符号可出现多次。若流程足够清晰，可省略开始、结束符号。

3）同一流程图内，符号大小需要保持一致，同时连接线不能交叉，连接线不能无故弯曲。

4）流程处理关系为并行关系的，需要将流程放在同一高度。

5）处理流程须以单一入口和单一出口绘制，**同一路径的指示箭头应只有一个**。

![img](https://pic2.zhimg.com/80/v2-ea29f330cc7940f9ae59a721719ad319_720w.jpg)

## 案例

![img](https:////upload-images.jianshu.io/upload_images/6943526-00d600de88c10ddf.png?imageMogr2/auto-orient/strip|imageView2/2/w/324/format/webp)

​ 计算机语言只是一种工具。光学习语言的规则还不够，最重要的是学会针对各种类型的问题，拟定出有效的解决方法和步骤即算法。有了正确而有效的算法，可以利用任何一种计算机高级语言编写程序，使计算机进行工作。因此，设计算法是程序设计的核心。

​ 对同一个问题，可以有不同的解题方法和步骤。

​    *
*`例如，求1+2+3+…+100，可以先进行1+2，再加3，再加4，一直加到100，也可采取100+(1+99)+(2+98)+…+(49+51)+50＝100+50+49×100＝5050。`**

​ 还可以有其它的方法。当然，方法有优劣之分。有的方法只需进行很少的步骤，而有些方法则需要较多的步骤。一般说，希望采用方法简单，运算步骤少的方法。因此，为了有效地进行解题，不仅需要保证算法正确，还要考虑算法的质量，选择合适的算法。

​ 一个计算问题的解决过程通常包含下面几步:

```swift
 a.确立所需解决的问题以及最后应达到的要求。必须保证在任务一开始就对它有详细而确切的了解，避免模棱两可和含混不清之处。

  b.分析问题构造模型。在得到一个基本的物理模型后，用数学语言描述它，例如列出解题的数学公式或联立方程式，即建立数学模型。

  c.选择计算方法。如定积分求值问题，可以用矩形法、梯形法或辛普生法等不同的方法。因此用计算机解题应当先确定用哪一种方法来计算。专门有一门学科“计算方法”，就是研究用什么方法最有效、最近似地实现各种数值计算的，换句话说，计算方法是研究数值计算的近似方法的。

  d.确定算法和画流程图。在编写程序之前，应当整理好思路，设想好一步一步怎样运算或处理，即为“算法”。把它用框图画出来，用一个框表示要完成的一个或几个步骤，它表示工作的流程，称为流程图。它能使人们思路清楚，减少编写程序中的错误。

  f.编写程序。

  g.程序调试，即试算。一个复杂的程序往往不是一次上机就能通过并得到正确的结果的，需要反复试算修改，才得到正确的可供正式运行的程序。

  h.正式运行得到必要的运算结果。 
```

**传统流程图**

​ 用图表示的算法就是流程图。流程图是用一些图框来表示各种类型的操作，在框内写出各个步骤，然后用带箭头的线把它们连接起来，以表示执行的先后顺序。用图形表示算法，直观形象，易于理解。

​ 美国国家标准化协会ANSI曾规定了一些常用的流程图符号，为世界各国程序工作者普遍采用。最常用的流程图符号见图。

```swift
  a.处理框（矩形框），表示一般的处理功能。
  
  b.判断框（菱形框），表示对一个给定的条件进行判断，根据给定的条件是否成立决定如何执行其后的操作。它有一个入口，二个出口。
  
  c.输入输出框（平行四边形框）。
  
  d.起止框（圆弧形框），表示流程开始或结束。
  
  f.连接点（圆圈），用于将画在不同地方的流程线连接起来。如图中有两个以1标志的连接点(在连接点圈中写上“l”)则表示这两个点是连接在一起的，相当于一个点一样。用连接点，可以避免流程线的交叉或过长，使流程图清晰。
  
  g.流程线（指向线），表示流程的路径和方向。
  
  h.注释框, 是为了对流程图中某些框的操作做必要的补充说明，以帮助阅读流程图的人更好地理解流程图的作用。它不是流程图中必要的部分，不反映流程和操作。
```

![img](https:////upload-images.jianshu.io/upload_images/6943526-38b07850d8d2fbce.gif?imageMogr2/auto-orient/strip|imageView2/2/w/171/format/webp)

​ 流程图不仅可以指导编写程序，而且可以在调试程序中用来检查程序的正确性。如果框图是正确的而结果不对，则按照框图逐步检查程序是很容易发现其错误的。流程图还能作为程序说明书的一部分提供给别人，以便帮助别人理解你编写程序的思路和结构。

# 泳道图

**泳道图也叫跨职能流程图**
，旨在展示工作流中每个步骤涉及的流程和职能部门。泳道流程图是一种特殊的图表，展示出一个商业过程之间的关系，并展示为那个过程负责的功能板块。泳道流程图专注于价值活动之间的逻辑关系，更好地展示每个价值活动的责任。

**泳道图绘制的场景非常清晰：**
流程图是描述一个事件过程的步骤，当这个过程涉及许多不同人、不同部门或不同功能区域时，很难跟踪每个步骤的负责人。解决此问题的有效方法是用泳道图把流程图分栏，这样能清晰地了解任务转交的流程。

![img](https://pic3.zhimg.com/80/v2-1c8853ec6328daa3a14ef9742d451c4a_720w.jpg)

这是一个部门维度的泳道图。该跨职能流程图是展示了商城运营流程和负责各个子流程的功能单位（部门）之间的关系，一栏代表一个职能单位。代表流程中步骤的形状放在负责这些步骤的职能单位相应的一栏中。

一般情况下，可以通过3个维度来确定泳道图类型：

**部门维度：**通过部门或者责任来区分，明确每个部门/人负责完成的任务环节。

**阶段维度：**通过任务阶段来区分。

**活动维度：**在不同的阶段，每一个网格中的活动都应该有相对应的部门来实施。

![](https://pic1.zhimg.com/v2-3b35c86c629a20dd79623207031e2a34.jpg)

------

# UML

> ​
>
统一建模语言（UML）是一种开放的方法，用于说明、可视化、构建和编写一个正在开发的、面向对象的、软件密集系统的制品的开放方法。UML展现了一系列最佳工程实践，这些最佳实践在对大规模，复杂系统进行建模方面，特别是在软件架构层次已经被验证有效。

![](https://pic2.zhimg.com/v2-db8567cfd5a24814a33b1ecdf94e14ff_r.jpg?source=1940ef5c)

## 用例图

用例图是编写需求说明时经常用到的需求表达方式，用于向开发、测试同事说明需求中用户与系统功能单元之间的关系。

用例图的三大组成元素：**参与者**、**用例**、**参与者与用例之间的关系。**

> 参与者：不是特指人，是指系统以外的，在使用系统或与系统交互中所扮演的角色。因此参与者可以是人，可以是事物，也可以是时间或其他系统等等。
>
> **用例：**是对包括变量在内的一组动作序列的描述，系统执行这些动作，并产生传递特定参与者的价值的可观察结果。
>
> 关系：参与者与用例之间的关系主要包括关联、归纳（泛化）、包含、拓展和依赖。

接下来将重点讲第三部分：参与者与用例之间的关系，主要分为4中：**关联、归纳（泛化）、包含、拓展和依赖**。

### 1）关联关系

**关系说明：**表示参与者与用例之间的关系

**表示方法：**带箭头的实线，箭头指向用例。

**举例说明：**用户登录系统

![img](https://pic2.zhimg.com/80/v2-830ec9e117f74c4d1a9dc1776bead9b2_720w.jpg?source=1940ef5c)

### 2）归纳（泛化）关系

**关系说明：**表示参与者与参与者之间、用例与用例之间的关系。一个用例可以被特别列举为一个或多个子用例，这被称为用例泛化。

**表示方法：**带空心箭头的实线，箭头指向被泛化（被继承）的用例，即基础用例/父用例。
*（注意：泛化关系的箭头不是指向被泛化，而是指向被继承。泛化和继承是不同的方向。泛化是从下到上的抽象过程，继承是从上到下，从一般到特殊的过程。）*

**举例说明：**VIP会员和普通用户，归纳为用户；账号登录与微信登录，也可归纳为登录系统。

![img](https://pic1.zhimg.com/80/v2-27fcca6ef7b16bdcf2cdf676d9adf7a3_720w.jpg?source=1940ef5c)

### 3）包含关系

**关系说明：**表示用例与用例之间的关系，其中一个用例（基础用例）的行为包含了另一个用例（包含用例）的行为。

**表示方法：**虚线箭头+include字样，箭头指向被包含的用例

**举例说明：**用户在账号登录过程中，包括输入账号、输入密码、确认登录等操作

![img](https://pic1.zhimg.com/80/v2-d5d0914418cbeb28d987f7f2673febd2_720w.jpg?source=1940ef5c)

### 4）拓展关系

关系说明：表示用例与用例之间的关系；用于拓展用例对基础用例的增强；**拓展用例是在特定条件出现时，才会被执行的用例。**

表示方法：虚线箭头+extend字样，箭头指向被扩展的用例（即基础用例）

举例说明：用户在登录过程中忘记了密码

![img](https://pic2.zhimg.com/80/v2-e05e2ae3afe5ffea1836352c547f3c13_720w.jpg?source=1940ef5c)

## 类图

UML类图，UML中的一种重要图形，是在面向对象语言用中用来表示一个类。

如下图所示（它由两部分组成，类，类之间的关系）：

![img](https://pic3.zhimg.com/80/v2-61af74fe4b611c85c740cececb18e4ae_720w.jpg)

### 1）类

**类是具有相似结构、行为和关系的一组对象的描述符，是面向对象系统中最重要的构造块。**

如下图所示，就表示一个类：

![img](https://pic1.zhimg.com/80/v2-c589911333aded1c962e2f0958e5041c_720w.jpg)

三个格子从上至下分别表示：

- 类名称（如果是接口，就使用斜体表示）
- 类的特性（一般是类的字段和属性，可以没有）
- 类的操作（一般是类的方法或行为）

它们前边的符号有以下几类：

- “+”表示public
- “-”表示private
- “#”表示protected

### 2）类的关系

**除了类，类图中还有一个重要元素，即类之间的关系。**

根据类的关系的不同，具体可分为6种：

**（1）依赖关系**（用虚箭线表示）

所谓依赖关系，就是构造这个类的时候，需要依赖其他的类，比如：动物依赖水和氧气。如下图所以：

![img](https://pic3.zhimg.com/80/v2-e5af6625d202f3220b7333692dabad42_720w.jpg)

**（2）继承、泛化关系**（用带空心三角形的实线表示）

继承（泛化）关系，它指定了子类如何特化父类的所有特征和行为。例如：鸟是动物的一种，企鹅、鸭、大雁是鸟的一种。

![img](https://pic3.zhimg.com/80/v2-d25ab9c2f2e8064317cd090b751f6702_720w.jpg)

**（3）实线关系**（用带空心三角形的虚线表示）

一种类与接口的关系，表示类是接口所有特征和行为的实现。它有两种表示方法：

第一种，矩形表示法，

- 顶端有interface
- 第一行：接口名称
- 第二行：接口方法

![img](https://pic4.zhimg.com/80/v2-88addbc8cbfe20bb0c038bee5f151617_720w.jpg)

第二种，棒棒糖表示法

- 圆圈旁为接口名称
- 接口方法在实现类中出现

![img](https://pic3.zhimg.com/80/v2-40c356695078c5da3ea6f0b6e5b1ea7e_720w.jpg)

**（4）关联关系**（用实箭线表示）

所谓关联关系，就是这个类有一个属性是其他类。

![img](https://pic2.zhimg.com/80/v2-cdb23e214bf7320b7a563c7e08ace379_720w.jpg)

**（5）聚合关系**（用带空心菱形的实线表示）

聚合关系是关联关系的一种，是强的关联关系 ；

特点： 部分对象的生命周期并不由整体对象来管理。也就是说，当整体对象已经不存在的时候，部分的对象还是可能继续存在的。比如：一只大雁脱离了雁群，依然是可以继续存活的。

![img](https://pic3.zhimg.com/80/v2-60d6df1daf28778e9c82e4b097a453a6_720w.jpg)

**（6）组合关系**（用带实心菱形的实线表示）

组合关系同样是关联关系的一种，是比聚合关系还要强的关系。

特点：在组合中，部分与整体生命期一致，部分与组合同时创建并同时消亡 。比如：鸟与翅膀的关系。

![img](https://pic2.zhimg.com/80/v2-0b9bf5c1582e824c61741a99fff0f915_720w.jpg)

## 对象图

### 1）对象图概念

对象图是表示在某一时刻一组对象以及它们之间关系的图形。

对于复杂的数据结构，有时候很难对其进行抽象成类表达之间的关系，一般就会使用对象图。

说到对象图，就不得不提到UML的另一种图形——类图，两者几乎使用一套完全相同的标识。不同在于对象图显示类的多个对象实例，而不是实际的类。一个对象图是类图的一个实例。由于对象存在生命周期，因此对象图只能在系统某一时间段存在（这一点从定义上也不难看出）。

### 类图和对象图的关系及异同

> 两者的关系：对象图可以看做是类图的实例，用来表达各个对象在某一时刻的状态。
>
> 两者的异同：
>
> ​    **类图**：用于描述系统中所包含的类以及它们之间的相互关系。
>
> ​    **对象图**：用于描述某一时刻的一组对象及它们之间的关系。
>
> ​    **主要表现为两者建模元素的异同**
>
> ![img](https://pic3.zhimg.com/80/v2-75055f4796ac722ae6f73d8729278f4e_720w.jpg)

### 2）对象图的组成元素

对象图中的建模元素主要有对象和链。

- **对象**

对象是类的实例，是一个封装了状态和行为的实体。对象通过其类型、名称和状态区别于其他对象而存在。

> 对象名：在矩形框的顶端显示。
> 类型：具体的类目
> 状态：由对象的所有属性以及运行时的当前值组成。
> 表示法：在对象名后跟一个冒号加上类型名，并且使用下划线与类进行区分。

![img](https://pic4.zhimg.com/80/v2-5781fd061e72edc029d85271baf23c43_720w.jpg)

- **链**

链是类之间的关联关系的实例，是两个或多个对象之间的独立连接。因此，链在对象图中的作用类似于关联关系在类图中的作用。

之前专栏对UML类图的4种关联关系进行过详细拆解，这里同样不再赘述，有需要的可以移步查看▼

[亿图图示：干货！3分钟掌握UML类图zhuanlan.zhihu.com![图标](https://pic3.zhimg.com/v2-e5af6625d202f3220b7333692dabad42_180x120.jpg)](https://zhuanlan.zhihu.com/p/267298708)

在对象图中，链同样使用一根实线段来表示。

链主要用来导航。链一端的一个对象可以得到另一位置上的一个或一组对象，然后向其发送消息。

### 3）对象图实例

![img](https://pic2.zhimg.com/80/v2-abd1c4281fd9351d7149c5cf1971cd61_720w.jpg)

### 4）对象图的建模过程

对象图的建模过程如下（以亿图图示绘制为例）：

**1）确定好对象及对象状态，可以参照相应的类图**；

打开亿图图示，依次选择“新建>软件>UML图>+”，新建一张空白画布，画布左侧会自动出现绘制UML所需的符号，选择合适的对象符号，然后拖拽至画布上即可；

![img](https://pic2.zhimg.com/80/v2-4b146341f45a5bd8d0c380006c817bc1_720w.jpg)

![img](https://pic2.zhimg.com/80/v2-49284e7ea5d9b6a8a47a2f8609b757e1_720w.jpg)

**2）建立链（即确定类间的关系），如依赖、泛化、关联和实现**；

其实就是连线，选中其中一个对象图形，其边框上会显示蓝边的空心圆，确定连接点后则会变成红色实心圆点，连接起来非常方便。

![img](https://pic1.zhimg.com/80/v2-6014a163dedfb7098bafc3c66c7f1398_720w.jpg)

3）针对交互在某特定时刻各对象的状态，使用对象图为这些对象建模；

4）建模时，系统分析师要根据建模的目标，绘制对象的关键状态和关键对象之间的连接关系。

## 包图

包图通常用于描述系统的逻辑架构——层、子系统、包等。层可以建模为UML包。UML包用一大一小两个矩形组合而成。如果内部显示了其成员，则包名称标在上面的小矩形内，否则可以标在包内。

![img](https://pic4.zhimg.com/80/v2-169d56a94213f86426c50d564f1e7ff3_720w.jpg?source=1940ef5c)

包拥有的元素**：类、接口、组件、节点、协作、用例、图以及其他包。**包的可见性用来控制包外界的元素对包内元素的可访问权限。这种可见性它分为3种，即公有访问、保护访问和私有访问。

包之间可以有两种关系：**依赖、泛化**。

## 部署图

​ 部署图是用来显示系统中软件和硬件的物理架构。使用部署图不仅可以显示**运行时系统的结构**，还能够传达构成应用程序的硬件和软件元素的配置和部署方式。

​ 一个系统模型只有一个部署图，它通常用来帮助理解分布式系统。

### 1）节点（Node）& 节点实例（Node Instance）

节点是存在与运行时的代表计算机资源的物理元素，可以是硬件也可以是运行其上的软件系统，比如64主机、Windows server
2008操作系统、防火墙等。

一般用立方体表示，如下图：

![img](https://pic1.zhimg.com/80/v2-b6c612c1423ad512edf5271a049468cc_720w.jpg)

**注**：处理器是带阴影的立方体，设备是不带阴影的立方体

区别于节点，节点实例的名称会有下划线，并且节点类型前会有冒号（注：冒号前面可以有示例名称也可以没有示例名称），如下图：

![img](https://pic1.zhimg.com/80/v2-43b7f8465326c05f7b7b7155c16bf65c_720w.jpg)

### 2）构件（Artifact）

构件是软件开发过程中的产物，包括过程模型（比如用例图、设计图等等）、源代码、可执行程序、设计文档、测试报告、需求原型、用户手册等等。

构件表示如下，带有关键字«artifact»和文档图标：

![img](https://pic2.zhimg.com/80/v2-dbe0f13718901d0f42f4b2d3628fa569_720w.jpg)

### 3）连接（Association）

节点之间的连线表示系统之间进行交互的通信路径，这个通信路径称为连接。如下图所示，连接中可以标注上网络协议：

![img](https://pic1.zhimg.com/80/v2-d31e40e4f8b3ea220badf1b5cacf1e3c_720w.jpg)

### 4）部署图实例

![img](https://pic1.zhimg.com/80/v2-abcfde046fb0e50bc65283ae1f0638e0_720w.jpg)

​ 部署图的组成元素：**结点、构件**（因此部署图也经常和构件图一起使用）、**接口、连接**。

![img](https://pic2.zhimg.com/80/v2-fa5a0d8f20e6150cf8e06b65ef01215e_720w.jpg?source=1940ef5c)

## 顺序图

顺序图，又名序列图、时序图。用于描述对象之间的传递消息的时间顺序（包括发送消息、接收消息、处理消息、返回消息等）。

顺序图的组成元素：**对象、生命线、消息**，其中消息又分为**同步消息、异步消息、返回消息、自关联消息**。

### 1） 什么是时序图？

时序图是UML交互图中的一类，又名序列图、顺序图。

用于描述对象之间的传递消息的时间顺序（包括发送消息、接收消息、处理消息、返回消息等）。

![img](https://pic2.zhimg.com/80/v2-9a624a7fec6e682647916efb8170d179_720w.jpg)

### 2） 时序图的组成元素

**1）对象**

对象代表时序图中的对象在交互中所扮演的角色，一般使用矩形表示。

如果对象位于时序图的顶部，说明在交互开始时对象就已经存在了。如果对象的位置在中间部分，说明对象是在交互的过程中被创建的。*
*当一个对象被删除或自我删除时，在其生命线**（生命线详见下方）**终止点处放置 “ X”标识**。

**2）生命线**

生命线代表时序图中的对象在一段时期内的存在。时序图中每个对象底部中心都有一条垂直的虚线，这就是对象的生命线。

对象间的消息存在于两条虚线间。

**3）消息**

两个对象之间的单路通信，从发送方指向接收方。

消息的传递一般有以下几种方式：

**同步消息**：消息的发送者把控制传递给消息的接收者，然后停止活动，等待消息的接收者放弃或者返回控制。

**注意**：发送人需要等待消息的响应。带实心箭头的实线表示

![img](https://pic2.zhimg.com/80/v2-93176f58fffa870e3414f41283accd85_720w.jpg)

**异步消息**：消息发送者通过消息把信号传递给消息的接收者，然后继续自己的活动，不等待接受者返回消息或者控制。

**注意**：发送人不需要等待消息的响应。带线型箭头的实线表示

![img](https://pic2.zhimg.com/80/v2-f0b7a486257de7d9bdb57694d7de98b1_720w.jpg)

**返回消息**：返回消息表示从过程调用返回

带线型箭头的虚线表示。

![img](https://pic3.zhimg.com/80/v2-44f13b2d78dfd65390fecd5d48ef4122_720w.jpg)

**自关联消息**： 自身调用自身的方法，即自我调用的同步消息

![img](https://pic1.zhimg.com/80/v2-ec36050f8d48b116dfa3799b763cfc38_720w.jpg)

### 3） 如何绘制时序图？

时序图绘制具体分为以下5步：

1. 确定交互过程的上下文；
2. 识别参与过程的交互**对象**；
3. 为每个对象设置**生命线**；
4. 从初始**消息**开始，依次画出随后消息；
5. 考虑消息的嵌套，标示消息发生时的时间点。

### 流程图、顺序图、状态图他们三者分别解决什么样的问题？

> **流程图**：用于表示完成某件事情中的**各个活动过程**，其中最重要的部分是“处理 process”单元；
>
> **顺序图**：用于表示程序执行时**各个对象的交互过程**（这些对象会按调用时间顺序排序）；
>
> **状态图**：描述一个特定对象的所有可能状态，以及由于各种事件的发生而引起的状态之间的转移，其最主要的就是程序目前的状态，每一个状态总结记录程序由开始到目前所有接到的输入。
>
> 这么描述可能还不够清晰，下面我将从流程图VS顺序图，以及流程图VS状态图，对这三者的优势和局限性作进一步解读：
>
> ## 流程图 VS 顺序图
>
> 这是push流程的一张顺序图：
>
> ![img](https://pic1.zhimg.com/80/v2-a6a4712a34ae76dcfa0c685dc33062a0_720w.jpg?source=1940ef5c)
>
> 它直观地反应了push程序执行的过程，各个对象之间的调用顺序是怎样的一目了然。
>
> 这还属于比较简单的顺序图。如果是下面这类复杂的，甚至一个方法里面有很多分支语句的，那用顺序图肯定是很不好画了。
>
> ![img](https://pic1.zhimg.com/80/v2-465a17fa69037559d9cc1541dab6fa16_720w.jpg?source=1940ef5c)
>
> 因此，一般情况下分析程序中的方法用流程图更好，它可以很好的反应各种复杂的逻辑。
>
> ## 流程图 VS 状态图
>
> 这是表示电梯运行状态的一张状态图：
>
> ![img](https://pic4.zhimg.com/80/v2-9fd6ffffca375eec2cca17cff74004a2_720w.jpg?source=1940ef5c)状态图：电梯运行的三种状态
>
> 如果用流程图来表示上述状态图，就需要做的处理单元比较多，这种情况下状态图明显在结构上要比流程图要更简单。
>
> 流程图和状态图的差别在于，**流程图更在意动作是如何完成的，状态图更重视动作的完成，相较不在意是哪一个程序完成的**。
>
> 因此，当状态图中某一个状态下少考虑了哪一个输入事件，我们可以很快地检查出来，但如果在流程图上，我们就无法分辨了。
>
> 因此，**状态图比较适合对象导向的程序，流程图则比较适合描述程序导向或是数据处理的程序**。

## 通信图/协作图

通信图描述的是对象和对象之间的调用关系，体现的是一种组织关系。

通信图组成元素：**对象、链接、消息**。

通信图和时序图有点类似。但时序图着重于时间顺序，而通信图则关注的是对象之间的组织关系，通信图中的时间顺序可以从消息序号中获得。在语义上这两个图是等价的可以互相转换而不会丢失信息。

如果强调时间和顺序，则使用序列图；如果强调上下级关系，则选择协作图；这两种图合称为交互图

## 状态机图

状态机图描述一个对象在其生命周期中的各种状态以及状态的转换。

状态机主要由**状态、转换、事件、动作、活动**5部分组成。

> 顺序图、通信图：描述**多个对象**间的交互。
> 状态机图：描述**单个对象**的状态及引起状态变化的原因。

用一个简化的图来表示三者的差别就是：

![img](https://pic4.zhimg.com/80/v2-880cef6fd8f39bf4591c17d5fe44b815_720w.jpg?source=1940ef5c)

## 活动图

活动图描述活动的顺序，展现从一个活动到另一个活动的控制流，它本质上是一种流程图。

组成元素：**起点、终点、活动名称、判断条件、分支与合并、接收信号、发送信号、泳道**（其实和流程图很相像）

------

# E-R图

## 什么是E-R图？

E-R图又称实体关系图，是一种提供了实体，属性和联系的方法，用来描述现实世界的概念模型。通俗点讲就是，当我们理解了实际问题的需求之后，需要用一种方法来表示这种需求，概念模型就是用来描述这种需求。

比如学生生活中的校园卡系统数据库、公交卡系统数据库等等，都离不来实体关系图。

![img](https://pic1.zhimg.com/80/v2-aa5b23c846a00489f578c83a32394a88_720w.jpg)

- **E-R图中的基本元素（以上面的学生饭卡E-R图为例）：**

**① 实体**

​ 实际问题中客观存在的并且可以相互区别的事物称为实体。实体是现实世界中的对象，可以具体到人，事，物。比如：上图中的饭卡、学生、办公室、食堂、超市。

**② 属性**

​ 实体所具有的某一个特性称为属性，在E-R图中属性用来描述实体。比如上图中的学生，可以用“姓名”、“院系”、“班级”、“手机号”进行属性描述。

![img](https://pic3.zhimg.com/80/v2-8826929ae43cabf4f2525cc9392d719a_720w.jpg)属性

**③ 实体集**

​ 具有相同属性的实体的集合称为实体集。例如：全体学生就是一个实体集，（983573，李刚，男，2000/12/12）是学生实体集中的一个实体。

**④ 键**

​ 在描述实体集的所有属性中，可以唯一标识每个实体的属性称为键。键也是属于实体的属性，作为键的属性取值必须唯一且不能“空置”。比如：不重复的学生号，就可以作为学生的“键”。

**⑤ 实体型**

​ 具有相同的特征和性质的实体一定有相同的属性，用实体名及其属性名集合来抽象和刻画同类实体称为实体型，其表示格式为：实体名（属性1，属性2，……）

**⑥ 联系**

​ 世界上任何事物都不是孤立存在的，事物内部和事物之间都有联系的，实体之间的联系通常有3种类型：一对一联系，一对多联系，多对多联系。

## E-R图的绘图规范

在ER图中有如下四个成分：

**① 矩形框：**表示实体，在框中记入实体名。

![img](https://pic3.zhimg.com/80/v2-70fc3732982cdc6b3ce6d0f0c26f066a_720w.jpg)

**② 菱形框：**表示联系，在框中记入联系名。

![img](https://pic3.zhimg.com/80/v2-cbd03d00b0af1f8dcaab4c3996fd4226_720w.jpg)

**③ 椭圆形框**：表示实体或联系的属性，将属性名记入框中。对于主属性名，则在其名称下划一下划线。

![img](https://pic4.zhimg.com/80/v2-c21280847e6c651a9ecf4fd2df867c13_720w.jpg)

**④ 连线：**实体与属性之间；实体与联系之间；联系与属性之间用直线相连，并在直线上标注联系的类型。（对于一对一联系，要在两个实体连线方向各写1；
对于一对多联系，要在一的一方写1，多的一方写N；对于多对多关系，则要在两个实体连线方向各写N，M。)

![img](https://pic3.zhimg.com/80/v2-ecea8319cff84dc92aa05ad8b287b73a_720w.jpg)

## E-R图的具体绘制流程

前面了解完E-R图的定义、组成元素以及绘制规范，我们这部分具体介绍E-R图的绘制步骤，大致可以分为以下5步：

- 确定所有的实体集合；
- 选择实体集应包含的属性；
- 确定实体集之间的联系；
- 确定实体集的关键字，用下划线在属性上表明关键字的属性组合；
- 确定联系的类型，在用线将表示联系的菱形框联系到实体集时，在线旁注明是1或n(多）来表示联系的类型。

------

# 一些推荐

[一些精彩的流程图](https://www.zhihu.com/question/274117517/answer/1953912666)

------

# 画图工具

| 名称 | 特点 | 安装 | 收费 |
| :---------: | :---------------------------------------------------------: | :--: | :-----------------------: |
| Visio | office系列，可以和word办公软件结合起来使用，只支持Windows | 是 | 是，标准版永久2638，1设备 |
| XMind | 基于java开发，安装包小，多平台支持 | 是 | 是，384一年，5设备 |
| MindManager | 同Office无缝集成，多平台支持，安装包大 | 是 | 是，1081一年，多设备 |
| ProcessOn | 方便快捷，优雅强大，文件备份，模板丰富，免费账号只能9个文件 | 否 | 是，259元 / 人 / 年 |
| draw.io | 支持网页版，持续更新 | 是 | 永久免费 |

> **~~推荐使用draw.io~~**
>
><div class="btn-center">
>{% btn 'https://github.com/jgraph/drawio-desktop/releases/tag/v14.6.13',客户端下载,far fa-hand-point-right,outline orange larger %}
>{% btn 'https://app.diagrams.net/',Web端在线编辑,far fa-hand-point-right,outline green larger %}
></div>

> 推荐使用ProcessOn，在线画图快捷方便真的香！！！













