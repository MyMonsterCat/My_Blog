const e=JSON.parse('{"key":"v-4e804e63","path":"/advance/mysql/base/how_select.html","title":"执行一条 select 语句，期间发生了什么？","lang":"zh-CN","frontmatter":{"description":"学习 SQL 的时候，大家肯定第一个先学到的就是 select 查询语句了，比如下面这句查询语句： 但是有没有想过，MySQL 执行一条 select 查询语句，在 MySQL 中期间发生了什么？ 带着这个问题，我们可以很好的了解 MySQL 内部的架构，所以这次小林就带大家拆解一下 MySQL 内部的结构，看看内部里的每一个“零件”具体是负责做什么的...","head":[["meta",{"property":"og:url","content":"https://monstercat.cn/advance/mysql/base/how_select.html"}],["meta",{"property":"og:site_name","content":"MonsterCat"}],["meta",{"property":"og:title","content":"执行一条 select 语句，期间发生了什么？"}],["meta",{"property":"og:description","content":"学习 SQL 的时候，大家肯定第一个先学到的就是 select 查询语句了，比如下面这句查询语句： 但是有没有想过，MySQL 执行一条 select 查询语句，在 MySQL 中期间发生了什么？ 带着这个问题，我们可以很好的了解 MySQL 内部的架构，所以这次小林就带大家拆解一下 MySQL 内部的结构，看看内部里的每一个“零件”具体是负责做什么的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-14T10:10:41.000Z"}],["meta",{"property":"article:author","content":"Monster"}],["meta",{"property":"article:modified_time","content":"2024-05-14T10:10:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"执行一条 select 语句，期间发生了什么？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-05-14T10:10:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Monster\\",\\"url\\":\\"https://monstercat.cn\\",\\"email\\":\\"1264833435@qq.com\\"}]}"]]},"headers":[{"level":2,"title":"MySQL 执行流程是怎样的？","slug":"mysql-执行流程是怎样的","link":"#mysql-执行流程是怎样的","children":[]},{"level":2,"title":"第一步：连接器","slug":"第一步-连接器","link":"#第一步-连接器","children":[]},{"level":2,"title":"第二步：查询缓存","slug":"第二步-查询缓存","link":"#第二步-查询缓存","children":[]},{"level":2,"title":"第三步：解析 SQL","slug":"第三步-解析-sql","link":"#第三步-解析-sql","children":[{"level":3,"title":"解析器","slug":"解析器","link":"#解析器","children":[]}]},{"level":2,"title":"第四步：执行 SQL","slug":"第四步-执行-sql","link":"#第四步-执行-sql","children":[{"level":3,"title":"预处理器","slug":"预处理器","link":"#预处理器","children":[]},{"level":3,"title":"优化器","slug":"优化器","link":"#优化器","children":[]},{"level":3,"title":"执行器","slug":"执行器","link":"#执行器","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1715681441000,"updatedTime":1715681441000,"contributors":[{"name":"Monster","email":"1264833435@qq.com","commits":1}]},"readingTime":{"minutes":20.14,"words":6043},"filePathRelative":"advance/mysql/base/how_select.md","localizedDate":"2024年5月14日","autoDesc":true,"excerpt":""}');export{e as data};