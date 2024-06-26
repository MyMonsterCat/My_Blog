### 事务是什么

> 事务是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系 统提交或撤销操作请求，即这些操作要么同时成功，要么同时失败。

#### 事务的四大特性？

- 原子性：事务是不可分割的最小单元，要么全部成功，要么全部失败
- 一致性：事务执行前后，数据保持一致
- 隔离性：事务之间互不影响
- 持久性：事务一旦提交，数据将持久化到数据库

#### 并行事务导致的问题

- 脏读：一个事务读取到了另一个事务未提交的数据
- 不可重复读：一个事务先后读取同一条记录，但两次读取的结果不一致
- 幻读：一个事务按照条件查询数据时，没有对应的数据行，但是在插入数据时，又发现这行数据 已经存在，好像出现了 "幻影"。

#### 事务的隔离级别

|        隔离级别         | 脏读 | 不可重复读 | 幻读 |
|:-------------------:|:--:|:-----:|:--:|
|  Read uncommitted   | ✅  |   ✅   | ✅  |
|   Read committed    | ❌  |   ✅   | ✅  |
| Repeatable Read(默认) | ❌  |   ❌   | ✅  |
|    Serializable     | ❌  |   ❌   | ❌  |

### 事务的隔离级别是靠什么保证的

简单来说：原子性、一致性、持久性是通过redo_log + undo_log实现的，隔离性是通过锁 + MVCC实现的
复杂来说：要想回答这个问题，必须先清楚MySQL的结构，MySQL可分为连接层、服务层、引擎层、存储层。

❗️此处为附图

> 连接层：负责连接管理、授权认证、安全等等。
>
> 服务层：负责查询解析、分析、优化、缓存、内置函数、存储过程、触发器、视图等等。
>
> 引擎层：负责MySQL中数据的存储和提取，服务器通过API和存储引擎进行通信。不同的存储引擎具有不同的功能，
>
> 存储层：将数据(如: redolog、undolog、数据、索引、二进制日志、错误日志、查询 日志、慢查询日志等)存储在文件系统之上，并完成与存储引擎的交互。

MySQL默认为InnoDB引擎，其存储结构是由 表-段-区-页-行 组成的

> ❗️这里介绍表-段-区-页-行

❗️这里介绍体系结构

**redo_log**: 重做日志，记录的是事务提交时数据页的物理修改，用来实现事务的持久性。当事务提交之后会把所有修改信息都存到该日志文件中,
用 于在刷新脏页到磁盘,发生错误时, 进行数据恢复使用。一般由==重做日志缓冲(redo log buffer)以及重做日志文件(redo log file)
==两部分组成，前者是在内存中，后者在磁盘中

