const e=JSON.parse('{"key":"v-02f52dba","path":"/java/base/object-oriented/reflex-mechanism.html","title":"Java反射机制与策略模式","lang":"zh-CN","frontmatter":{"title":"Java反射机制与策略模式","category":"Java","tag":["Java","面向对象"],"order":2,"description":"该文章偏基础，如果您已掌握以下几个问题，请查看更多感兴趣文章~ - 获取Class实例的方式有哪些 - 谈谈你对Class类的理解 - 什么时候会发生类初始化 - 创建Class对应运行时类的对象时需要注意什么 - 在工程或module的src目录下有名为”jdbc.properties”的配置文件，文件内容为：name=Tom。如何在程序中通过代码获...","head":[["meta",{"property":"og:url","content":"https://monstercat.cn/java/base/object-oriented/reflex-mechanism.html"}],["meta",{"property":"og:site_name","content":"MonsterCat"}],["meta",{"property":"og:title","content":"Java反射机制与策略模式"}],["meta",{"property":"og:description","content":"该文章偏基础，如果您已掌握以下几个问题，请查看更多感兴趣文章~ - 获取Class实例的方式有哪些 - 谈谈你对Class类的理解 - 什么时候会发生类初始化 - 创建Class对应运行时类的对象时需要注意什么 - 在工程或module的src目录下有名为”jdbc.properties”的配置文件，文件内容为：name=Tom。如何在程序中通过代码获..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-08T09:22:40.000Z"}],["meta",{"property":"article:author","content":"Monster"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"面向对象"}],["meta",{"property":"article:modified_time","content":"2023-04-08T09:22:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java反射机制与策略模式\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-08T09:22:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Monster\\",\\"url\\":\\"https://monstercat.cn\\",\\"email\\":\\"1264833435@qq.com\\"}]}"]]},"headers":[{"level":2,"title":"一、反射的概述","slug":"一、反射的概述","link":"#一、反射的概述","children":[{"level":3,"title":"1.关于反射的理解","slug":"_1-关于反射的理解","link":"#_1-关于反射的理解","children":[]},{"level":3,"title":"2.体会反射机制的“动态性”","slug":"_2-体会反射机制的-动态性","link":"#_2-体会反射机制的-动态性","children":[]}]},{"level":2,"title":"二、 Class类","slug":"二、-class类","link":"#二、-class类","children":[{"level":3,"title":"2.1 Class类的理解","slug":"_2-1-class类的理解","link":"#_2-1-class类的理解","children":[]},{"level":3,"title":"2.2 获取Class实例的几种方式","slug":"_2-2-获取class实例的几种方式","link":"#_2-2-获取class实例的几种方式","children":[]},{"level":3,"title":"2.3 总结：创建类的对象的方式","slug":"_2-3-总结-创建类的对象的方式","link":"#_2-3-总结-创建类的对象的方式","children":[]},{"level":3,"title":"2.4 Class实例可以是哪些结构的说明","slug":"_2-4-class实例可以是哪些结构的说明","link":"#_2-4-class实例可以是哪些结构的说明","children":[]}]},{"level":2,"title":"三、了解ClassLoader","slug":"三、了解classloader","link":"#三、了解classloader","children":[{"level":3,"title":"3.1 类的加载过程","slug":"_3-1-类的加载过程","link":"#_3-1-类的加载过程","children":[]},{"level":3,"title":"3.2 类的加载器的作用","slug":"_3-2-类的加载器的作用","link":"#_3-2-类的加载器的作用","children":[]},{"level":3,"title":"3.3 类的加载器的分类","slug":"_3-3-类的加载器的分类","link":"#_3-3-类的加载器的分类","children":[]},{"level":3,"title":"3.4 Java类编译、运行的执行的流程","slug":"_3-4-java类编译、运行的执行的流程","link":"#_3-4-java类编译、运行的执行的流程","children":[]},{"level":3,"title":"3.5 使用Classloader加载src目录下的配置文件","slug":"_3-5-使用classloader加载src目录下的配置文件","link":"#_3-5-使用classloader加载src目录下的配置文件","children":[]}]},{"level":2,"title":"四、反射应用","slug":"四、反射应用","link":"#四、反射应用","children":[{"level":3,"title":"4.1 创建运行时类的对象","slug":"_4-1-创建运行时类的对象","link":"#_4-1-创建运行时类的对象","children":[]},{"level":3,"title":"4.2 获取运行时类的完整结构","slug":"_4-2-获取运行时类的完整结构","link":"#_4-2-获取运行时类的完整结构","children":[]},{"level":3,"title":"4.3 调用运行时类的指定结构","slug":"_4-3-调用运行时类的指定结构","link":"#_4-3-调用运行时类的指定结构","children":[]},{"level":3,"title":"4.4 动态代理","slug":"_4-4-动态代理","link":"#_4-4-动态代理","children":[]}]},{"level":2,"title":"五、反射实战：利用反射+策略模式去除过多的if","slug":"五、反射实战-利用反射-策略模式去除过多的if","link":"#五、反射实战-利用反射-策略模式去除过多的if","children":[]}],"git":{"createdTime":1680945760000,"updatedTime":1680945760000,"contributors":[{"name":"Monster","email":"1264833435@qq.com","commits":1}]},"readingTime":{"minutes":17.78,"words":5333},"filePathRelative":"java/base/object-oriented/reflex-mechanism.md","localizedDate":"2023年4月8日","autoDesc":true,"excerpt":""}');export{e as data};