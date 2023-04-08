---
title: Java反射机制与策略模式
category: Java
tag:
  - Java
  - 面向对象
order: 2
---

> 该文章偏基础，如果您已掌握以下几个问题，请查看更多感兴趣文章~
>
> - 获取Class实例的方式有哪些
> - 谈谈你对Class类的理解
> - 什么时候会发生类初始化
> - 创建Class对应运行时类的对象时需要注意什么
> - 在工程或module的src目录下有名为”jdbc.properties”的配置文件，文件内容为：name=Tom。如何在程序中通过代码获取Tom这个变量值。请使用代码实现。
> - 双亲委派机制
> - 动态代理
> - 策略模式+反射去除冗余if

## 一、反射的概述

### 1.关于反射的理解

Reflection（反射)是被视为``动态语言``的关键，反射机制允许程序在执行期借助于Reflection API取得任何类的内部信息，并能直接操作任意对象的内部属性及方法。

加载完类之后，在堆内存的方法区中就产生了一个Class类型的对象（一个类只有一个Class对象），这个对象就包含了完整的类的结构信息。我们可以通过这个对象看到类的结构。这个对象就像一面镜子，透过这个镜子看到类的结构，所以，我们形象的称之为：
反射

**框架 = 反射 + 注解 + 设计模式**。

> **动态语言**：是一类在运行时可以改变其结构的语言：例如新的函数、对象、甚至代码可以被引进，已有的函数可以被删除或是其他结构上的变化。通俗点说就是
> 在运行时代码可以根据某些条件改变自身结构。
> 主要动态语言：Object-C、C#、JavaScript、PHP、Python、Erlang。
>
>**静态语言**:与动态语言相对应的，运行时结构不可变的语言就是静态语言。如Java、C、C++
>
>Java不是动态语言，但Java可以称之为“准动态语言”。即Java有一定的动态性，我们可以利用反射机制、字节码操作获得类似动态语言的特性。

### 2.体会反射机制的“动态性”

> 在 Java 中的反射机制是指在运行状态中，对于任意一个类都能够知道这个类所有的属性和方法；并且对于任意一个对象，都能够调用它的任意一个方法；这种动态获取信息以及动态调用对象方法的功能称为
> Java 语言的反射机制。

![类的加载过程](https://raw.githubusercontent.com/MyMonsterCat/md_image/main/%E5%9F%BA%E7%A1%80/Java%E5%8F%8D%E5%B0%84%E6%9C%BA%E5%88%B6/fasnheliucheng.jpg)

## 二、 Class类

### 2.1 Class类的理解

> **类加载的过程**：程序经过javac命令以后，会生成一个或者多个字节码文件(.class结尾)
> ，然后我们使用java命令对某个字节码文件进行解释运行，这就相当于将某个字节码加载到内存中，这个过程就称为类的加载。
>
> 加载到内存中的类，我们就称为 运行时类。<font color=orange>此运行时类，就作为Class类的一个实例</font>
>
>  Class本身也是一个类，Class 对象只能由系统建立对象
>
> 一个加载的类在 JVM 中只会有一个Class实例
>
> 一个Class对象对应的是一个加载到JVM中的一个.class文件

### 2.2 获取Class实例的几种方式

#### ① 调用运行时类的属性：``.class``

```java
Class clazz1 = Person.class;
```

#### ②通过运行时类的对象，调用``getClass()``

```java
Person p1 = new Person();
Class clazz2 = p1.getClass();
```

#### ③调用Class的静态方法：``forName(String classPath``

```java
Class clazz3 = Class.forName("com.monster.java.Person");
```

#### ④使用类的加载器：``ClassLoader``

```java
ClassLoader classLoader = ReflectionTest.class.getClassLoader();
Class clazz4 = classLoader.loadClass("com.atguigu.java.Person");
```

### 2.3 总结：创建类的对象的方式

> - new + 构造器
>- 要创建Xxx类的对象，可以考虑：Xxx、Xxxs、XxxFactory、XxxBuilder类中查看是否有静态方法的存在。可以调用其静态方法，创建Xxx对象。
>- 通过反射

### 2.4 Class实例可以是哪些结构的说明

- class：外部类，成员(成员内部类，静态内部类)，局部内部类，匿名内部类
- interface：接口
- []：数组
- enum：枚举
- annotation：注解@interface
- primitive type：基本数据类型
- void

## 三、了解ClassLoader

### 3.1 类的加载过程

![类的加载过程](https://raw.githubusercontent.com/MyMonsterCat/md_image/main/%E5%9F%BA%E7%A1%80/Java%E5%8F%8D%E5%B0%84%E6%9C%BA%E5%88%B6/classjiazai.jpg)

![类的加载过程](https://raw.githubusercontent.com/MyMonsterCat/md_image/main/%E5%9F%BA%E7%A1%80/Java%E5%8F%8D%E5%B0%84%E6%9C%BA%E5%88%B6/shengmingzhouqi.jpg)

**加载**
：将class文件字节码内容加载到内存中，并将这些静态数据转换成方法区的运行时数据结构，然后生成一个代表这个类的java.lang.Class对象，作为方法区中类数据的访问入口（即引用地址）。所有需要访问和使用类数据只能通过这个Class对象。这个加载的过程需要类加载器参与。

**链接**：将Java类的二进制代码合并到JVM的运行状态之中的过程。

​        **验证**：确保加载的类信息符合JVM规范，例如：以cafe开头，没有安全方面的问题

​        **准备**：正式为类变量（static）分配内存并 设置类变量默认初始值的阶段，这些内存都将在方法区中进行分配

​        **解析**：虚拟机常量池内的符号引用（常量名）替换为直接引用（地址）的过程

**初始化**：

- 执行类构造器``<clinit>()``方法的过程。类构造器``<clinit>()``
  是由编译期自动收集类中所有类变量的赋值动作和静态代码块中的语句合并产生的。（类构造器是构造类信息的，不是构造该类对象的构造器）；

- 当初始化一个类的时候，如果发现其父类还没有进行初始化，则需要先触发其父类的初始化

- 虚拟机会保证一个类的``<clinit>()``方法在多线程环境中被正确加锁和同步

  > 问题：什么时候会发生类初始化 ?
  >
  > - **类的主动引用** （ 一定会发生类的初始化 ）
  >   - 当虚拟机启动，先初始化main方法所在的类
  >   - new一个类的对象
  >   - 调用类的静态成员（除了final常量）和静态方法
  >   - 使用java.lang.reflect包的方法对类进行反射调用
  >   - 当初始化一个类，如果其父类没有被初始化，则先会初始化它的父类
  > - **类的被动引用 **（ 不会发生类的初始化 ）
  >   - 当访问一个静态域时，只有真正声明这个域的类才会被初始化,当通过子类引用父类的静态变量，不会导致子类初始化
  >   - 通过数组定义类引用，不会触发此类的初始化
  >   - 引用常量不会触发此类的初始化（常量在链接阶段就存入调用类的常量池中了）

### 3.2 类的加载器的作用

> **类加载器**
> ，顾名思义，就是加载类到内存中。换点专业的话来说，将class文件字节码加载到内存中，并将这些静态数据转换为``方法区的运行时数据结构``
> ，然后在堆中生成一个代表这个类的java.lang.Class对象，作为方法区中类数据的访问入口



> **类缓存**：标准的JavaSE类加载器可以按要求查找类，但一旦某个类被加载到类加载器中，它将维持加载一段时间（也就是缓存一段时间）。不过JVM垃圾回收机制可以回收这些Class对象。

### 3.3 类的加载器的分类

![类的加载过程](https://raw.githubusercontent.com/MyMonsterCat/md_image/main/%E5%9F%BA%E7%A1%80/Java%E5%8F%8D%E5%B0%84%E6%9C%BA%E5%88%B6/jiazaiqifenlei.jpg)

> **双亲委派机制**：当某个类加载器需要加载某个`.class`文件时，它首先把这个任务委托给他的上级类加载器，递归这个操作，如果上级的类加载器没有加载，自己才会去加载这个类。

我们来看一下源码，重要步骤的注释说明已经写在了对应位置：

![](https://monster-note.oss-cn-hangzhou.aliyuncs.com/img/jvm/202304031027240.png)

> 双亲委派机制的**作用**：
>
> - `防止重复加载同一个.class`。简单而言，向上一级询问是否加载过了，如果加载过了就不用再加载一遍。保证数据安全
> - `保证核心.class不能被篡改`（沙箱安全机制）。简单而言，如果有人想想替换系统级别的类：String.java。篡改它的实现，在这种机制下这些系统的类已经被Bootstrap
    classLoader加载过了（当一个类需要加载的时候，最先去尝试加载的就BootstrapClassLoader），所以其他类加载器并没有机会再去加载，从一定程度上防止了危险代码的植入

### 3.4 Java类编译、运行的执行的流程

![类的加载过程](https://raw.githubusercontent.com/MyMonsterCat/md_image/main/%E5%9F%BA%E7%A1%80/Java%E5%8F%8D%E5%B0%84%E6%9C%BA%E5%88%B6/yunxingliucheng.jpg)

### 3.5 使用Classloader加载src目录下的配置文件

```java
	@Test
    public void test2() throws Exception {

        Properties pros =  new Properties();
        //此时的文件默认在当前的module下。
        //读取配置文件的方式一：
//        FileInputStream fis = new FileInputStream("jdbc.properties");
//        FileInputStream fis = new FileInputStream("src\\jdbc1.properties");
//        pros.load(fis);

        //读取配置文件的方式二：使用ClassLoader
        //配置文件默认识别为：当前module的src下
        ClassLoader classLoader = ClassLoaderTest.class.getClassLoader();
        InputStream is = classLoader.getResourceAsStream("jdbc1.properties");
        pros.load(is);

        String user = pros.getProperty("user");
        String password = pros.getProperty("password");
        System.out.println("user = " + user + ",password = " + password);
    }
```

## 四、反射应用

### 4.1 创建运行时类的对象

```java
Class<Person> clazz = Person.class;
Person obj = clazz.newInstance();
```

> **newInstance()**:调用此方法，创建对应的运行时类的对象。内部调用了运行时类的``空参的构造器``。

![Java空参构造](https://raw.githubusercontent.com/MyMonsterCat/md_image/main/%E5%9F%BA%E7%A1%80/Java%E5%8F%8D%E5%B0%84%E6%9C%BA%E5%88%B6/fansheyuanma.jpg)

我们来看下**newInstance()**的源码，它对运行时类的构造函数进行了查找，并且限制了``Member.DECLARED（值为1）``
，而1要求了构造器的权限，如下图所示。

![Java空参构造](https://raw.githubusercontent.com/MyMonsterCat/md_image/main/%E5%9F%BA%E7%A1%80/Java%E5%8F%8D%E5%B0%84%E6%9C%BA%E5%88%B6/MemberDeclare.png)

因此要想此方法正常的创建运行时类的对象，要求：

> - 运行时类必须提供``空参的构造器``
>
> - 空参的构造器的``访问权限得够``。通常，设置为public。

那么此时有个问题，**为什么在javabean中要求提供一个public的空参构造器**

> - 便于通过反射，创建运行时类的对象
> - 便于子类继承此运行时类时，默认调用super()时，保证父类有此构造器

此处要注意一点，**并不是没有无参的构造器就不能创建对象**。

### 4.2 获取运行时类的完整结构

我们可以通过反射，获取对应的运行时类中所有的属性、方法、构造器、父类、接口、父类的泛型、包、注解、异常等

```java
@Test
public void test1(){

    Class clazz = Person.class;

    //getFields():获取当前运行时类及其父类中声明为public访问权限的属性
    Field[] fields = clazz.getFields();

    //getDeclaredFields():获取当前运行时类中声明的所有属性。（不包含父类中声明的属性
    Field[] declaredFields = clazz.getDeclaredFields();
    
    //getMethods():获取当前运行时类及其所父类中声明为public权限的方法
    Method[] methods = clazz.getMethods();
    
    //getDeclaredMethods():获取当前运行时类中声明的所方法。（不包含父类中声明的方法
    Method[] declaredMethods = clazz.getDeclaredMethods();
    
    //getConstructors():获取当前运行时类中声明为public的构造器
    Constructor[] constructors = clazz.getConstructors();
    
     //getDeclaredConstructors():获取当前运行时类中声明的所的构造器
    Constructor[] declaredConstructors = clazz.getDeclaredConstructors();
    
     //获取运行时类的父类
     Class superclass = clazz.getSuperclass();
    
     //获取运行时类的带泛型的父类
     Type genericSuperclass = clazz.getGenericSuperclass();
    
    //获取运行时类实现的接口
     Class[] interfaces = clazz.getInterfaces();
    
    //获取运行时类的父类实现的接口
     Class[] interfaces1 = clazz.getSuperclass().getInterfaces();
    
    //获取运行时类所在的包
    Package pack = clazz.getPackage();
    
    //获取运行时类声明的注解
    Annotation[] annotations = clazz.getAnnotations();
    
    //获取运行时类的带泛型的父类的泛型
    Type genericSuperclass = clazz.getGenericSuperclass();
    ParameterizedType paramType = (ParameterizedType) genericSuperclass;
    Type[] actualTypeArguments = paramType.getActualTypeArguments();
//  System.out.println(actualTypeArguments[0].getTypeName());
    System.out.println(((Class)actualTypeArguments[0]).getName());

}
```

### 4.3 调用运行时类的指定结构

#### ①调用指定的属性

```java
    //创建运行时类的对象
		Class clazz = Person.class;
    Person p = (Person) clazz.newInstance();

    //1. getDeclaredField(String fieldName):获取运行时类中指定变量名的属性
    Field name = clazz.getDeclaredField("name");

    //2.保证当前属性是可访问的
    name.setAccessible(true);

    //3.获取、设置指定对象的此属性值
    name.set(p,"Tom");
```

#### ② 调用指定的方法

```java
	Class clazz = Person.class;

	//创建运行时类的对象
	Person p = (Person) clazz.newInstance();

	/*
     1.获取指定的某个方法 getDeclaredMethod():参数1 ：指明获取的方法的名称  参数2：指明获取的方法的形参列表
  */
	Method show = clazz.getDeclaredMethod("show", String.class);
	//  2.保证当前方法是可访问的
	show.setAccessible(true);

	/*
     3. 调用方法的invoke():参数1：方法的调用者  参数2：给方法形参赋值的实参
     invoke()的返回值即为对应类中调用的方法的返回值。
  */
	Object returnValue = show.invoke(p,"CHN"); //String nation = p.show("CHN");

	System.out.println("*************如何调用静态方法*****************");
	Method showDesc = clazz.getDeclaredMethod("showDesc");
	showDesc.setAccessible(true);
	//如果调用的运行时类中的方法没返回值，则此invoke()返回null
	Object returnVal = showDesc.invoke(Person.class);
	System.out.println(returnVal);//null
```

#### ③ 调用指定的构造器

```java
	 Class clazz = Person.class;

    // private Person(String name)
    /* 1.获取指定的构造器getDeclaredConstructor():参数：指明构造器的参数列表 */

    Constructor constructor = clazz.getDeclaredConstructor(String.class);

    //2.保证此构造器是可访问的
    constructor.setAccessible(true);

    //3.调用此构造器创建运行时类的对象
    Person per = (Person) constructor.newInstance("Tom");
    System.out.println(per);
```

### 4.4 动态代理

#### ① 代理模式的原理

> 使用一个代理将对象包装起来,
> 然后用``该代理对象取代原始对象。任何对原始对象的调用都要通过代理。代理对象决定是否以及何时将方法调用转到原始对象上``。

#### ② 静态代理

代码举例说明：实现Runnable接口的方法创建多线程

```java
Class MyThread implements Runnable{} //相当于被代理类

Class Thread implements Runnable{} //相当于代理类

main(){
    MyThread t = new MyThread();
    Thread thread = new Thread(t);
    thread.start();//启动线程；调用线程的run()
}
```

再简单举一个例子，赵老板（**被代理类**）有个秘书叫做钱秘书（**代理类**
），钱秘书负责安排赵老板的事情，比如今天开会，明天出差等等。某天，孙老板想要约赵老板出去谈生意，于是便联系了钱秘书，跟钱秘书商榷好在3天后跟赵老板商谈要是，最后钱秘书5个小时后将这件事询问了赵老板意见并回电话告诉孙老板三天后见（
**被代理类的调用要通过代理类，代理类可以决定什么时候将方法转到原始对象上**）。

看完这个例子，感觉代理也不错如此嘛，但是仔细想一想，如果某天赵老板新招了个李秘书，李秘书负责a方面，赵秘书负责b方面，那赵老板是不是告诉每个人自己新加了一个秘书叫李秘书，负责a方面，电话巴拉巴拉，a方面有事找李秘书巴拉巴拉，而李秘书是不是也要在接到预约赵老板a方面事情的电话时说自己不负责这方面呢。这也正是
**静态代理的缺点**

> 静态代理的缺点
>
> - 代理类和目标对象的类都是在编译期间确定下来，不利于程序的扩展。
>
> - 每一个代理类只能为一个接口服务，这样一来程序开发中必然产生过多的代理。

#### ③ 动态代理

**深入理解动态代理的思想**

既然我们知道了静态代理的缺点，即当下有两个问题需要我们去解决

> 问题一：**如何根据加载到内存中的被代理类，动态的创建一个代理类及其对象**。

> 问题二：**当通过代理类的对象调用方法a时，如何动态的去调用被代理类中的同名方法a**

还是通过赵老板的例子来说明，对于这两个问题，一个公司前台就完美解决了这个问题，也即赵老板的信息跟公司前台的电话是绑定的，也就是当我想预约赵老板的时候，先打给前台，前台询问你想找a方面的业务还是b方面的业务，然后帮你转接到负责这个业务的赵老板的秘书那里。

说道这里，想必你也已经理解了这个思想，其实这也就是**动态代理**的核心思想

> 动态代理是指客户通过代理类来调用其它对象的方法，并且是在程序运行时根据需要动态创建目标类的代理对象。

**动态代理相关API**

![](https://monster-note.oss-cn-hangzhou.aliyuncs.com/img/jvm/202304031029752.png)

**代码实现动态代理**

声明一个接口，即钱秘书和李秘书共同的职责，安排负责事情

```java
interface Human{

    String getBelief();

    void deal(String someThing);

}
```

实现被代理类(赵老板)

```java
class BossZhao implements Human{


    @Override
    public String getBelief() {
        return "我是赵老板";
    }

    @Override
    public void deal(String someThing) {
        System.out.println("我正在处理" + someThing);
    }
}
```

通过赵老板的信息拿到公司前台的电话，并被告知联系哪个秘书，与某个秘书进行商谈

```java
class ProxyFactory{
    //调用此方法，返回一个代理类的对象。解决问题一
    public static Object getProxyInstance(Object obj){//obj:被代理类的对象
        MyInvocationHandler handler = new MyInvocationHandler();

        handler.bind(obj);

  return Proxy.newProxyInstance(obj.getClass().getClassLoader(),obj.getClass().getInterfaces(),handler);
    }
}
```

秘书告知赵老板做某件事

```java
class MyInvocationHandler implements InvocationHandler{

    private Object obj;//需要使用被代理类的对象进行赋值

    public void bind(Object obj){
        this.obj = obj;
    }

    //当我们通过代理类的对象，调用方法a时，就会自动的调用如下的方法：invoke()。解决问题二
    //将被代理类要执行的方法a的功能就声明在invoke()中
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        //method:即为代理类对象调用的方法，此方法也就作为了被代理类对象要调用的方法
        //obj:被代理类的对象
        Object returnValue = method.invoke(obj,args);

        //上述方法的返回值就作为当前类中的invoke()的返回值。
        return returnValue;

    }
}
```

进行测试

```java
public class ProxyTest {

    public static void main(String[] args) {
        BossZhao bossZhao = new BossZhao();
        //proxyInstance:代理类的对象
        Human proxyInstance = (Human) ProxyFactory.getProxyInstance(bossZhao);
        //当通过代理类对象调用方法时，会自动的调用被代理类中同名的方法
        String belief = proxyInstance.getBelief();
        System.out.println(belief);//输出结果：我是赵老板
        proxyInstance.deal("a方面的事情");//输出结果：我正在处理a方面的事情
    }
}
```

不难想到，如果**在执行目标方法之前、之后插入一些通用处理**，那不就变成了**AOP**吗。

![Java空参构造](https://raw.githubusercontent.com/MyMonsterCat/md_image/main/%E5%9F%BA%E7%A1%80/Java%E5%8F%8D%E5%B0%84%E6%9C%BA%E5%88%B6/aop.jpg)

## 五、反射实战：利用反射+策略模式去除过多的if

[策略模式详细介绍请移步观看](http://c.biancheng.net/view/1378.html)

最近学习了一些设计模式以后，在实际的生产应用中总想着尝试用上一些设计模式，正好上次遇到了一个要分7个if判断的场景，经过权衡，最终决定采用反射+策略模式来去除过多的if判断。大致的思想为，先定义一个接口抽取出抽象方法，然后把每个if中的逻辑抽取出到各实现类中，接着将各实现类放入到枚举类中，最后根据要求通过反射查找相应的策略执行相应的逻辑。

**定义一个接口抽取出抽象方法**

```java
public interface RecordStrategy {
    /**
     * 策略方法-根据id获取更多的信息
     * 通过id去查询信息，封装到对应的VO里面并返回
     */
    Object moreInformation(String id);
}
```

**把每个if中的逻辑抽取出到各实现类中**

```java
//这里只展示其中一个实现类
public class AlarmPassStrategy implements RecordStrategy{

    @Override
    public Object moreInformation(String id) {
        //具体业务
    }
}

```

**将各实现类放入到枚举类中**

```java
/**
 * 事项策略枚举类
 */
public enum RecordEnum {

    CLEAR_ALARM_PASS("4-3", AlarmPassStrategy.class);

    /**
     * 存储事项类型（matterType - taskType）
     */
    private String type;
    
    /**
     * 对应事项类型具体的策略实现类
     */
    private Class clazz;

    RecordEnum(String type, Class clazz) {
        this.type = type;
        this.clazz = clazz;
    }

    public String getType() {
        return type;
    }

    public Class getClazz() {
        return clazz;
    }
    
}
```

**根据要求通过反射查找相应的策略执行相应的逻辑**

```java
/**
 * 策略管理类，通过反射动态获取额外数据
 */
public class StrategyManager {

    public static Map<String, Object> executeStrategy(BaseRecordCommonVO commonVO) {
        Map<String, Object> resultMap = new HashMap<>();
        // 组装类型 如3-1代表xxx
        Integer matterType = commonVO.getMatterType();
        Integer taskType = commonVO.getTaskType();
        String type = matterType + "-" + taskType;
        // 得到对应的策略类
        Class clazz = StrategySingleton.getInstance().getStrategy(type);

        if (clazz == null) {
            return resultMap;
        }
        
        // 获取任务id（通过任务id去获取额外信息）
        String taskId = commonVO.getTaskId();

        try {
            Method method = clazz.getDeclaredMethod("moreInformation", String.class);
            method.setAccessible(true);

            Object instance = clazz.newInstance();
            Object result = method.invoke(instance, taskId);

            resultMap.put("defaultMap", result);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultMap;
    }
}
```

本文参考文章或视频

[通俗易懂的双亲委派机制](https://blog.csdn.net/codeyanbao/article/details/82875064)

[java双亲委派机制及作用](https://www.jianshu.com/p/1e4011617650)

[尚硅谷java基础](http://www.atguigu.com/download_detail.shtml?v=129)

我是`Monster`，与你一起成长，那~下篇文章见O(∩_∩)O！
