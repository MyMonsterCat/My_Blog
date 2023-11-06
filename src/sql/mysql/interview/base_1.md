### 常见多表查询方式？

#### 分类

- 连接查询

    - 内连接（等值连接）
        - 显式内连接
        - 隐式内连接

    - 外连接
        - 左外连接
        - 右外连接
        - 全外连接

    - 自连接

- 子查询

    - 按照查询结果
        - 标量子查询(子查询结果为单个值)
        - 列子查询(子查询结果为一列)
        - 行子查询(子查询结果为一行)
        - 表子查询(子查询结果为多行多列)
    - 按照位置
        - WHERE之后
        - FROM之后
        - SELECT之后

- 联合查询

    - union all: 查询出来的结果，仅仅进行简单的合并，并未去重。
    - union: 联合查询，会对查询出来的结果进行去重处理。

#### 部分解释

##### 1.内连接

​ 内连接查询的是两张表交集部分的数（只返回两个表中连接字段相等的行。）

显式内连接：使用关键字`inner join`或者`join`

```mysql
select *
from table1
         inner join table2 on table1.id = table2.id
```

隐式内连接：使用逗号`,`连接两张表

```mysql
select *
from table1,
     table2
where table1.id = table2.id
```

##### 2.外连接

​ 左外连接：左外连接查询的是左表的所有数据和两张表交集部分的数据（返回包括左表中的所有记录和右表中连接字段相等的记录）

```mysql
select *
from table1
         left outer join table2 on table1.id = table2.id
```

​ 右外连接：右外连接查询的是右表的所有数据和两张表交集部分的数据（返回包括右表中的所有记录和左表中连接字段相等的记录）

```mysql
select *
from table1
         right outer join table2 on table1.id = table2.id
```

​ 全外连接：返回左右表中所有的记录和左右表中连接字段相等的记录

```mysql
select *
from table1 full outer join table2
on table1.id = table2.id
```

> ⚠️注意事项:
>
> ​ 左外连接和右外连接是可以相互替换的，只需要调整在连接查询时SQL中，表结构的先后顺序就可以了。而我们在日常开发使用时，更偏向于左外连接。

##### 3.自连接

​ 顾名思义，就是自己连接自己，也就是把一张表连接查询多次。对于自连接查询，可以是内连接查询，也可以是外连接查询。

```mysql
select *
from table1 t1
         inner join table1 t2 on t1.id = t2.id
```

> ⚠️注意事项:
>
> ​ 在自连接查询中，必须要为表起别名，要不然我们不清楚所指定的条件、返回的字段，到底是哪一张表的字段。

##### 4.子查询

SQL语句中嵌套SELECT语句，称为嵌套查询，又称子查询。

```mysql
SELECT *
FROM t1
WHERE column1 = (SELECT column1 FROM t2);
```
