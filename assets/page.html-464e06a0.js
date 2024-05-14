import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as o,e as l}from"./app-ff1d42f3.js";const p={},a=l('<h1 id="从数据页的角度看-b-树" tabindex="-1"><a class="header-anchor" href="#从数据页的角度看-b-树" aria-hidden="true">#</a> 从数据页的角度看 B+ 树</h1><p>大家背八股文的时候，都知道 MySQL 里 InnoDB 存储引擎是采用 B+ 树来组织数据的。</p><p>这点没错，但是大家知道 B+ 树里的节点里存放的是什么呢？查询数据的过程又是怎样的？</p><p>这次，我们<strong>从数据页的角度看 B+ 树</strong>，看看每个节点长啥样。</p><figure><img src="https://monster-note.oss-cn-hangzhou.aliyuncs.com/img/sql/mysql/202307041527268.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><h2 id="innodb-是如何存储数据的" tabindex="-1"><a class="header-anchor" href="#innodb-是如何存储数据的" aria-hidden="true">#</a> InnoDB 是如何存储数据的？</h2><p>MySQL 支持多种存储引擎，不同的存储引擎，存储数据的方式也是不同的，我们最常使用的是 InnoDB 存储引擎，所以就跟大家图解下InnoDB<br> 是如何存储数据的。</p><p>记录是按照行来存储的，但是数据库的读取并不以「行」为单位，否则一次读取（也就是一次 I/O 操作）只能处理一行数据，效率会非常低。</p><p>因此，<strong>InnoDB 的数据是按「数据页」为单位来读写的</strong>，也就是说，当需要读一条记录的时候，并不是将这个记录本身从磁盘读出来，而是以页为单位，将其整体读入内存。</p><p>数据库的 I/O 操作的最小单位是页，<strong>InnoDB 数据页的默认大小是 16KB</strong>，意味着数据库每次读写都是以 16KB 为单位的，一次最少从磁盘中读取<br> 16K 的内容到内存中，一次最少把内存中的 16K 内容刷新到磁盘中。</p><p>数据页包括七个部分，结构如下图：</p><figure><img src="https://monster-note.oss-cn-hangzhou.aliyuncs.com/img/sql/mysql/202307041527358.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><p>这 7 个部分的作用如下图：</p><figure><img src="https://monster-note.oss-cn-hangzhou.aliyuncs.com/img/sql/mysql/202307041527064.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><p>在 File Header 中有两个指针，分别指向上一个数据页和下一个数据页，连接起来的页相当于一个双向的链表，如下图所示：</p><figure><img src="https://monster-note.oss-cn-hangzhou.aliyuncs.com/img/sql/mysql/202307041527957.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><p>采用链表的结构是让数据页之间不需要是物理上的连续的，而是逻辑上的连续。</p><p>数据页的主要作用是存储记录，也就是数据库的数据，所以重点说一下数据页中的 User Records 是怎么组织数据的。</p><p><strong>数据页中的记录按照「主键」顺序组成单向链表</strong>，单向链表的特点就是插入、删除非常方便，但是检索效率不高，最差的情况下需要遍历链表上的所有节点才能完成检索。</p><p>因此，数据页中有一个<strong>页目录</strong>，起到记录的索引作用，就像我们书那样，针对书中内容的每个章节设立了一个目录，想看某个章节的时候，可以查看目录，快速找到对应的章节的页数，而数据页中的页目录就是为了能快速找到记录。</p><p>那 InnoDB 是如何给记录创建页目录的呢？页目录与记录的关系如下图：</p><figure><img src="https://monster-note.oss-cn-hangzhou.aliyuncs.com/img/sql/mysql/202307041527355.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><p>页目录创建的过程如下：</p><ol><li>将所有的记录划分成几个组，这些记录包括最小记录和最大记录，但不包括标记为“已删除”的记录；</li><li>每个记录组的最后一条记录就是组内最大的那条记录，并且最后一条记录的头信息中会存储该组一共有多少条记录，作为 n_owned<br> 字段（上图中粉红色字段）</li><li>页目录用来存储每组最后一条记录的地址偏移量，这些地址偏移量会按照先后顺序存储起来，每组的地址偏移量也被称之为槽（slot），*<br><em>每个槽相当于指针指向了不同组的最后一个记录</em>*。</li></ol><p>从图可以看到，<strong>页目录就是由多个槽组成的，槽相当于分组记录的索引</strong>。然后，因为记录是按照「主键值」从小到大排序的，所以*<br> *我们通过槽查找记录时，可以使用二分法快速定位要查询的记录在哪个槽（哪个记录分组），定位到槽后，再遍历槽内的所有记录，找到对应的记录<br> **，无需从最小记录开始遍历整个页中的记录链表。</p><p>以上面那张图举个例子，5 个槽的编号分别为 0，1，2，3，4，我想查找主键为 11 的用户记录：</p><ul><li>先二分得出槽中间位是 (0+4)/2=2 ，2号槽里最大的记录为 8。因为 11 &gt; 8，所以需要从 2 号槽后继续搜索记录；</li><li>再使用二分搜索出 2 号和 4 槽的中间位是 (2+4)/2= 3，3 号槽里最大的记录为 12。因为 11 &lt; 12，所以主键为 11 的记录在 3 号槽里；</li><li>这里有个问题，<strong>「槽对应的值都是这个组的主键最大的记录，如何找到组里最小的记录」</strong>？比如槽 3 对应最大主键是 12<br> 的记录，那如何找到最小记录 9。解决办法是：通过槽 3 找到 槽 2 对应的记录，也就是主键为 8 的记录。主键为 8 的记录的下一条记录就是槽<br> 3 当中主键最小的 9 记录，然后开始向下搜索 2 次，定位到主键为 11 的记录，取出该条记录的信息即为我们想要查找的内容。</li></ul><p>看到第三步的时候，可能有的同学会疑问，如果某个槽内的记录很多，然后因为记录都是单向链表串起来的，那这样在槽内查找某个记录的时间复杂度不就是<br> O(n) 了吗？</p><p>这点不用担心，InnoDB 对每个分组中的记录条数都是有规定的，槽内的记录就只有几条：</p><ul><li>第一个分组中的记录只能有 1 条记录；</li><li>最后一个分组中的记录条数范围只能在 1-8 条之间；</li><li>剩下的分组中记录条数范围只能在 4-8 条之间。</li></ul><h2 id="b-树是如何进行查询的" tabindex="-1"><a class="header-anchor" href="#b-树是如何进行查询的" aria-hidden="true">#</a> B+ 树是如何进行查询的？</h2><p>上面我们都是在说一个数据页中的记录检索，因为一个数据页中的记录是有限的，且主键值是有序的，所以通过对所有记录进行分组，然后将组号（槽号）存储到页目录，使其起到索引作用，通过二分查找的方法快速检索到记录在哪个分组，来降低检索的时间复杂度。</p><p>但是，当我们需要存储大量的记录时，就需要多个数据页，这时我们就需要考虑如何建立合适的索引，才能方便定位记录所在的页。</p><p>为了解决这个问题，<strong>InnoDB 采用了 B+ 树作为索引</strong>。磁盘的 I/O 操作次数对索引的使用效率至关重要，因此在构造索引的时候，我们更倾向于采用“矮胖”的<br> B+ 树数据结构，这样所需要进行的磁盘 I/O 次数更少，而且 B+ 树 更适合进行关键字的范围查询。</p><p>InnoDB 里的 B+ 树中的<strong>每个节点都是一个数据页</strong>，结构示意图如下：</p><figure><img src="https://monster-note.oss-cn-hangzhou.aliyuncs.com/img/sql/mysql/202307041528044.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><p>通过上图，我们看出 B+ 树的特点：</p><ul><li>只有叶子节点（最底层的节点）才存放了数据，非叶子节点（其他上层节）仅用来存放目录项作为索引。</li><li>非叶子节点分为不同层次，通过分层来降低每一层的搜索量；</li><li>所有节点按照索引键大小排序，构成一个双向链表，便于范围查询；</li></ul><p>我们再看看 B+ 树如何实现快速查找主键为 6 的记录，以上图为例子：</p><ul><li>从根节点开始，通过二分法快速定位到符合页内范围包含查询值的页，因为查询的主键值为 6，在[1, 7)范围之间，所以到页 30<br> 中查找更详细的目录项；</li><li>在非叶子节点（页30）中，继续通过二分法快速定位到符合页内范围包含查询值的页，主键值大于 5，所以就到叶子节点（页16）查找记录；</li><li>接着，在叶子节点（页16）中，通过槽查找记录时，使用二分法快速定位要查询的记录在哪个槽（哪个记录分组），定位到槽后，再遍历槽内的所有记录，找到主键为<br> 6 的记录。</li></ul><p>可以看到，在定位记录所在哪一个页时，也是通过二分法快速定位到包含该记录的页。定位到该页后，又会在该页内进行二分法快速定位记录所在的分组（槽号），最后在分组内进行遍历查找。</p><h2 id="聚簇索引和二级索引" tabindex="-1"><a class="header-anchor" href="#聚簇索引和二级索引" aria-hidden="true">#</a> 聚簇索引和二级索引</h2><p>另外，索引又可以分成聚簇索引和非聚簇索引（二级索引），它们区别就在于叶子节点存放的是什么数据：</p><ul><li>聚簇索引的叶子节点存放的是实际数据，所有完整的用户记录都存放在聚簇索引的叶子节点；</li><li>二级索引的叶子节点存放的是主键值，而不是实际数据。</li></ul><p>因为表的数据都是存放在聚簇索引的叶子节点里，所以 InnoDB 存储引擎一定会为表创建一个聚簇索引，且由于数据在物理上只会保存一份，所以聚簇索引只能有一个。</p><p>InnoDB 在创建聚簇索引时，会根据不同的场景选择不同的列作为索引：</p><ul><li>如果有主键，默认会使用主键作为聚簇索引的索引键；</li><li>如果没有主键，就选择第一个不包含 NULL 值的唯一列作为聚簇索引的索引键；</li><li>在上面两个都没有的情况下，InnoDB 将自动生成一个隐式自增 id 列作为聚簇索引的索引键；</li></ul><p>一张表只能有一个聚簇索引，那为了实现非主键字段的快速搜索，就引出了二级索引（非聚簇索引/辅助索引），它也是利用了 B+<br> 树的数据结构，但是二级索引的叶子节点存放的是主键值，不是实际数据。</p><p>二级索引的 B+ 树如下图，数据部分为主键值：</p><figure><img src="https://monster-note.oss-cn-hangzhou.aliyuncs.com/img/sql/mysql/202307041528887.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><p>因此，<strong>如果某个查询语句使用了二级索引，但是查询的数据不是主键值，这时在二级索引找到主键值后，需要去聚簇索引中获得数据行，这个过程就叫作「回表」，也就是说要查两个<br> B+ 树才能查到数据。不过，当查询的数据是主键值时，因为只在二级索引就能查询到，不用再去聚簇索引查，这个过程就叫作「索引覆盖」，也就是只需要查一个<br> B+ 树就能找到数据。</strong></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>InnoDB 的数据是按「数据页」为单位来读写的，默认数据页大小为 16 KB。每个数据页之间通过双向链表的形式组织起来，物理上不连续，但是逻辑上连续。</p><p>数据页内包含用户记录，每个记录之间用单向链表的方式组织起来，为了加快在数据页内高效查询记录，设计了一个页目录，页目录存储各个槽（分组），且主键值是有序的，于是可以通过二分查找法的方式进行检索从而提高效率。</p><p>为了高效查询记录所在的数据页，InnoDB 采用 b+ 树作为索引，每个节点都是一个数据页。</p><p>如果叶子节点存储的是实际数据的就是聚簇索引，一个表只能有一个聚簇索引；如果叶子节点存储的不是实际数据，而是主键值则就是二级索引，一个表中可以有多个二级索引。</p><p>在使用二级索引进行查找数据时，如果查询的数据能在二级索引找到，那么就是「索引覆盖」操作，如果查询的数据不在二级索引里，就需要先在二级索引找到主键值，需要去聚簇索引中获得数据行，这个过程就叫作「回表」。</p><p>关于索引的内容还有很多，比如索引失效、索引优化等等，这些内容我下次在讲啦！</p><hr>',59),t=[a];function r(s,e){return i(),o("div",null,t)}const h=n(p,[["render",r],["__file","page.html.vue"]]);export{h as default};
