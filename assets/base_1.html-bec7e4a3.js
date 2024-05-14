import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as l,c as i,e as a}from"./app-ff1d42f3.js";const d={},n=a(`<h3 id="常见多表查询方式" tabindex="-1"><a class="header-anchor" href="#常见多表查询方式" aria-hidden="true">#</a> 常见多表查询方式？</h3><h4 id="分类" tabindex="-1"><a class="header-anchor" href="#分类" aria-hidden="true">#</a> 分类</h4><ul><li><p>连接查询</p><ul><li><p>内连接（等值连接）</p><ul><li>显式内连接</li><li>隐式内连接</li></ul></li><li><p>外连接</p><ul><li>左外连接</li><li>右外连接</li><li>全外连接</li></ul></li><li><p>自连接</p></li></ul></li><li><p>子查询</p><ul><li>按照查询结果 <ul><li>标量子查询(子查询结果为单个值)</li><li>列子查询(子查询结果为一列)</li><li>行子查询(子查询结果为一行)</li><li>表子查询(子查询结果为多行多列)</li></ul></li><li>按照位置 <ul><li>WHERE之后</li><li>FROM之后</li><li>SELECT之后</li></ul></li></ul></li><li><p>联合查询</p><ul><li>union all: 查询出来的结果，仅仅进行简单的合并，并未去重。</li><li>union: 联合查询，会对查询出来的结果进行去重处理。</li></ul></li></ul><h4 id="部分解释" tabindex="-1"><a class="header-anchor" href="#部分解释" aria-hidden="true">#</a> 部分解释</h4><h5 id="_1-内连接" tabindex="-1"><a class="header-anchor" href="#_1-内连接" aria-hidden="true">#</a> 1.内连接</h5><p>​ 内连接查询的是两张表交集部分的数（只返回两个表中连接字段相等的行。）</p><p>显式内连接：使用关键字<code>inner join</code>或者<code>join</code></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select *
from table1
         inner join table2 on table1.id = table2.id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>隐式内连接：使用逗号<code>,</code>连接两张表</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select *
from table1,
     table2
where table1.id = table2.id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-外连接" tabindex="-1"><a class="header-anchor" href="#_2-外连接" aria-hidden="true">#</a> 2.外连接</h5><p>​ 左外连接：左外连接查询的是左表的所有数据和两张表交集部分的数据（返回包括左表中的所有记录和右表中连接字段相等的记录）</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select *
from table1
         left outer join table2 on table1.id = table2.id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​ 右外连接：右外连接查询的是右表的所有数据和两张表交集部分的数据（返回包括右表中的所有记录和左表中连接字段相等的记录）</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select *
from table1
         right outer join table2 on table1.id = table2.id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​ 全外连接：返回左右表中所有的记录和左右表中连接字段相等的记录</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select *
from table1 full outer join table2
on table1.id = table2.id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>⚠️注意事项:</p><p>​ 左外连接和右外连接是可以相互替换的，只需要调整在连接查询时SQL中，表结构的先后顺序就可以了。而我们在日常开发使用时，更偏向于左外连接。</p></blockquote><h5 id="_3-自连接" tabindex="-1"><a class="header-anchor" href="#_3-自连接" aria-hidden="true">#</a> 3.自连接</h5><p>​ 顾名思义，就是自己连接自己，也就是把一张表连接查询多次。对于自连接查询，可以是内连接查询，也可以是外连接查询。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select *
from table1 t1
         inner join table1 t2 on t1.id = t2.id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>⚠️注意事项:</p><p>​ 在自连接查询中，必须要为表起别名，要不然我们不清楚所指定的条件、返回的字段，到底是哪一张表的字段。</p></blockquote><h5 id="_4-子查询" tabindex="-1"><a class="header-anchor" href="#_4-子查询" aria-hidden="true">#</a> 4.子查询</h5><p>SQL语句中嵌套SELECT语句，称为嵌套查询，又称子查询。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT *
FROM t1
WHERE column1 = (SELECT column1 FROM t2);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25),s=[n];function r(c,t){return l(),i("div",null,s)}const m=e(d,[["render",r],["__file","base_1.html.vue"]]);export{m as default};
