const e=JSON.parse('{"key":"v-f23e6af6","path":"/advance/mysql/buffer_pool/buffer_pool.html","title":"揭开 Buffer Pool  的面纱","lang":"zh-CN","frontmatter":{"description":"今天就聊 MySQL 的 Buffer Pool，发车！ 为什么要有 Buffer Pool？ 虽然说 MySQL 的数据是存储在磁盘里的，但是也不能每次都从磁盘里面读取数据，这样性能是极差的。 要想提升查询性能，加个缓存就行了嘛。所以，当数据从磁盘中取出后，缓存内存中，下次查询同样的数据的时候，直接从内存中读取。 为此，Innodb 存储引擎设计了一...","head":[["meta",{"property":"og:url","content":"https://monstercat.cn/advance/mysql/buffer_pool/buffer_pool.html"}],["meta",{"property":"og:site_name","content":"MonsterCat"}],["meta",{"property":"og:title","content":"揭开 Buffer Pool  的面纱"}],["meta",{"property":"og:description","content":"今天就聊 MySQL 的 Buffer Pool，发车！ 为什么要有 Buffer Pool？ 虽然说 MySQL 的数据是存储在磁盘里的，但是也不能每次都从磁盘里面读取数据，这样性能是极差的。 要想提升查询性能，加个缓存就行了嘛。所以，当数据从磁盘中取出后，缓存内存中，下次查询同样的数据的时候，直接从内存中读取。 为此，Innodb 存储引擎设计了一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-14T10:10:41.000Z"}],["meta",{"property":"article:author","content":"Monster"}],["meta",{"property":"article:modified_time","content":"2024-05-14T10:10:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"揭开 Buffer Pool  的面纱\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-05-14T10:10:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Monster\\",\\"url\\":\\"https://monstercat.cn\\",\\"email\\":\\"1264833435@qq.com\\"}]}"]]},"headers":[{"level":2,"title":"为什么要有 Buffer Pool？","slug":"为什么要有-buffer-pool","link":"#为什么要有-buffer-pool","children":[{"level":3,"title":"Buffer Pool 有多大？","slug":"buffer-pool-有多大","link":"#buffer-pool-有多大","children":[]},{"level":3,"title":"Buffer Pool 缓存什么？","slug":"buffer-pool-缓存什么","link":"#buffer-pool-缓存什么","children":[]}]},{"level":2,"title":"如何管理 Buffer Pool？","slug":"如何管理-buffer-pool","link":"#如何管理-buffer-pool","children":[{"level":3,"title":"如何管理空闲页？","slug":"如何管理空闲页","link":"#如何管理空闲页","children":[]},{"level":3,"title":"如何管理脏页？","slug":"如何管理脏页","link":"#如何管理脏页","children":[]},{"level":3,"title":"如何提高缓存命中率？","slug":"如何提高缓存命中率","link":"#如何提高缓存命中率","children":[]},{"level":3,"title":"脏页什么时候会被刷入磁盘？","slug":"脏页什么时候会被刷入磁盘","link":"#脏页什么时候会被刷入磁盘","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1715681441000,"updatedTime":1715681441000,"contributors":[{"name":"Monster","email":"1264833435@qq.com","commits":1}]},"readingTime":{"minutes":15.43,"words":4629},"filePathRelative":"advance/mysql/buffer_pool/buffer_pool.md","localizedDate":"2024年5月14日","autoDesc":true,"excerpt":""}');export{e as data};
