const e=JSON.parse('{"key":"v-2c0f5dc6","path":"/advance/mysql/lock/show_lock.html","title":"字节面试：加了什么锁，导致死锁的？","lang":"zh-CN","frontmatter":{"description":"之前收到读者面试字节时，被问到一个关于 MySQL 的问题。 如果对 MySQL 加锁机制比较熟悉的同学，应该一眼就能看出会发生死锁，但是具体加了什么锁而导致死锁，是需要我们具体分析的。 接下来，就跟聊聊上面两个事务执行 SQL 语句的过程中，加了什么锁，从而导致死锁的。 准备工作 先创建一张 t_student 表，假设除了 id 字段，其他字段都是...","head":[["meta",{"property":"og:url","content":"https://monstercat.cn/advance/mysql/lock/show_lock.html"}],["meta",{"property":"og:site_name","content":"MonsterCat"}],["meta",{"property":"og:title","content":"字节面试：加了什么锁，导致死锁的？"}],["meta",{"property":"og:description","content":"之前收到读者面试字节时，被问到一个关于 MySQL 的问题。 如果对 MySQL 加锁机制比较熟悉的同学，应该一眼就能看出会发生死锁，但是具体加了什么锁而导致死锁，是需要我们具体分析的。 接下来，就跟聊聊上面两个事务执行 SQL 语句的过程中，加了什么锁，从而导致死锁的。 准备工作 先创建一张 t_student 表，假设除了 id 字段，其他字段都是..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-14T10:10:41.000Z"}],["meta",{"property":"article:author","content":"Monster"}],["meta",{"property":"article:modified_time","content":"2024-05-14T10:10:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"字节面试：加了什么锁，导致死锁的？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-05-14T10:10:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Monster\\",\\"url\\":\\"https://monstercat.cn\\",\\"email\\":\\"1264833435@qq.com\\"}]}"]]},"headers":[{"level":2,"title":"准备工作","slug":"准备工作","link":"#准备工作","children":[]},{"level":2,"title":"开始实验","slug":"开始实验","link":"#开始实验","children":[]},{"level":2,"title":"为什么会发生死锁？","slug":"为什么会发生死锁","link":"#为什么会发生死锁","children":[{"level":3,"title":"Time 1 阶段加锁分析","slug":"time-1-阶段加锁分析","link":"#time-1-阶段加锁分析","children":[]},{"level":3,"title":"Time 2 阶段加锁分析","slug":"time-2-阶段加锁分析","link":"#time-2-阶段加锁分析","children":[]},{"level":3,"title":"Time 3 阶段加锁分析","slug":"time-3-阶段加锁分析","link":"#time-3-阶段加锁分析","children":[]},{"level":3,"title":"Time 4 阶段加锁分析","slug":"time-4-阶段加锁分析","link":"#time-4-阶段加锁分析","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"读者问答","slug":"读者问答","link":"#读者问答","children":[]}],"git":{"createdTime":1715681441000,"updatedTime":1715681441000,"contributors":[{"name":"Monster","email":"1264833435@qq.com","commits":1}]},"readingTime":{"minutes":7.78,"words":2334},"filePathRelative":"advance/mysql/lock/show_lock.md","localizedDate":"2024年5月14日","autoDesc":true,"excerpt":""}');export{e as data};
