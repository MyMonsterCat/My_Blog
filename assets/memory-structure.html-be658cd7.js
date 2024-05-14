import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as r,c as a,e as t}from"./app-ff1d42f3.js";const i={},c=t('<h3 id="内存概述" tabindex="-1"><a class="header-anchor" href="#内存概述" aria-hidden="true">#</a> 内存概述</h3><p>内存结构是 JVM 中非常重要的一部分，是非常重要的系统资源，是硬盘和 CPU 的桥梁，承载着操作系统和应用程序的实时运行，又叫运行时数据区</p><p>JVM 内存结构规定了 Java 在运行过程中内存申请、分配、管理的策略，保证了 JVM 的高效稳定运行</p><h2 id="程序计数器" tabindex="-1"><a class="header-anchor" href="#程序计数器" aria-hidden="true">#</a> 程序计数器</h2><p>作用：用于保存JVM中下一条所要执行的指令的地址</p><p>特点</p><ul><li>线程私有</li><li>CPU会为每个线程分配时间片，当当前线程的时间片使用完以后，CPU就会去执行另一个线程中的代码</li><li>程序计数器是每个线程所私有的，当另一个线程的时间片用完，又返回来执行当前线程的代码时，通过程序计数器可以知道应该执行哪一句指令</li><li>不会存在内存溢出</li></ul>',7),o=[c];function l(n,s){return r(),a("div",null,o)}const _=e(i,[["render",l],["__file","memory-structure.html.vue"]]);export{_ as default};
