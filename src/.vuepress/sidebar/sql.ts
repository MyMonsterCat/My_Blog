export const MySQLSidebar = [
    {
        text: "一、基础篇",
        prefix: "/sql/mysql/base/",
        collapsible: true,
        children: [
            {
                text: "执行一条 SQL 查询语句，期间发生了什么？",
                link: "how_select",
            },
            {
                text: "MySQL 一行记录是怎么存储的？",
                link: "row_format",
            },
        ],
    },
    {
        text: "二、索引篇",
        prefix: "/sql/mysql/index/",
        collapsible: true,
        children: [
            {
                text: "索引常见面试题",
                link: "index_interview",
            },
            {
                text: "从数据页的角度看 B+ 树",
                link: "page",
            },
            {
                text: "为什么 MySQL 采用 B+ 树作为索引？",
                link: "why_index_chose_bpuls_tree",
            },
            {
                text: "MySQL 单表不要超过 2000W 行，靠谱吗？",
                link: "2000w",
            },
            {
                text: "索引失效有哪些？",
                link: "index_lose",
            },
            {
                text: "MySQL 使用 like “%x“，索引一定会失效吗？",
                link: "index_issue",
            },
            {
                text: "count(\*) 和 count(1) 有什么区别？哪个性能最好？",
                link: "count",
            },
        ],
    },
    {
        text: "三、事务篇",
        prefix: "/sql/mysql/transaction/",
        collapsible: true,
        children: [
            {
                text: "事务隔离级别是怎么实现的？",
                link: "mvcc",
            },
            {
                text: "MySQL 可重复读隔离级别，完全解决幻读了吗？",
                link: "phantom",
            },
        ],
    },
    {
        text: "四、锁篇",
        prefix: "/sql/mysql/lock/",
        collapsible: true,
        children: [
            {
                text: "MySQL 有哪些锁？",
                link: "mysql_lock",
            },
            {
                text: "MySQL 是怎么加锁的？",
                link: "how_to_lock",
            },
            {
                text: "update 没加索引会锁全表?",
                link: "update_index",
            },
            {
                text: "MySQL 记录锁+间隙锁可以防止删除操作而导致的幻读吗？",
                link: "lock_phantom",
            },
            {
                text: "MySQL 死锁了，怎么办？",
                link: "deadlock",
            },
            {
                text: "字节面试：加了什么锁，导致死锁的？",
                link: "show_lock",
            },
        ],
    },
    {
        text: "五、日志篇",
        prefix: "/sql/mysql/log/",
        collapsible: true,
        children: [
            {
                text: "undo log、redo log、binlog 有什么用？",
                link: "how_update",
            },
        ],
    },
    {
        text: "六、内存篇",
        prefix: "/sql/mysql/buffer_pool/",
        collapsible: true,
        children: [
            {
                text: "揭开 Buffer_Pool 的面纱",
                link: "buffer_pool",
            },
        ],
    },
];
export const RedisSidebar = [];
