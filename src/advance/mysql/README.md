# MySQL介绍

目前已经更新好的文章：

- **面试汇总篇**:point_down:

    - [基础面试题一](/advance/sql/mysql/interview/base_1.md)
    - [事务面试题](/advance/sql/mysql/interview/transaction.md)

下面的内容本文非原创，转自[小林Coding-《图解MySQL》](https://xiaolincoding.com/mysql/)，部分地方结合自己的理解与网上的资料可能有所更改，不做另行说明！

- **基础篇**:point_down:

	- [执行一条 SQL 查询语句，期间发生了什么？](/advance/sql/mysql/base/how_select.md)

- **索引篇** :point_down:

	- [索引常见面试题](/advance/sql/mysql/index/index_interview.md)
	- [从数据页的角度看 B+ 树](/advance/sql/mysql/index/page.md)
	- [为什么 MySQL 采用 B+ 树作为索引？](/advance/sql/mysql/index/why_index_chose_bpuls_tree.md)
	- [MySQL 单表不要超过 2000W 行，靠谱吗？](/advance/sql/mysql/index/2000w.md)
	- [索引失效有哪些？](/advance/sql/mysql/index/index_lose.md)
	- [MySQL 使用 like “%x“，索引一定会失效吗？](/advance/sql/mysql/index/index_issue.md)
	- [count(\*) 和 count(1) 有什么区别？哪个性能最好？](/advance/sql/mysql/index/count.md)

- **事务篇** :point_down:
	- [事务隔离级别是怎么实现的？](/advance/sql/mysql/transaction/mvcc.md)
	- [MySQL 可重复读隔离级别，完全解决幻读了吗？](/advance/sql/mysql/transaction/phantom.md)

- **锁篇** :point_down:
	- [MySQL 有哪些锁？](/advance/sql/mysql/lock/mysql_lock.md)
	- [MySQL 是怎么加锁的？](/advance/sql/mysql/lock/how_to_lock.md)
	- [update 没加索引会锁全表?](/advance/sql/mysql/lock/update_index.md)
	- [MySQL 记录锁+间隙锁可以防止删除操作而导致的幻读吗？](/advance/sql/mysql/lock/lock_phantom.md)
	- [MySQL 死锁了，怎么办？](/advance/sql/mysql/lock/deadlock.md)
	- [字节面试：加了什么锁，导致死锁的？](/advance/sql/mysql/lock/show_lock.md)

- **日志篇** :point_down:

	- [undo log、redo log、binlog 有什么用？](/advance/sql/mysql/log/how_update.md)

- **内存篇** :point_down:

	- [揭开 Buffer_Pool 的面纱](/advance/sql/mysql/buffer_pool/buffer_pool.md)

  ----
