import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([

    {
        text: "首页",
        icon: "home",
        link: "/home.md"
    },

    {
        text: "开发工具",
        icon: "dev-tool",
        link: "/development-tool/"
    },

    {
        text: "技术书籍",
        icon: "book",
        link: "/books/"
    },

    {
        text: "Java相关",
        icon: "java",
        children: [
            {
                text: "Java基础",
                prefix: "/java/base",
                children: [
                    {text: "面向对象基础", icon: "oo", link: "/object-oriented/"},
                    {text: "集合", icon: "tool", link: "/jihe/"},
                ],
            },
            {
                text: "Java进阶",
                prefix: "/java/senior",
                children: [
                    {text: "JVM", icon: "jvm", link: "/jvm/"},
                    {text: "并发编程", icon: "juc", link: "/juc/"},
                    {text: "网络编程", icon: "io", link: "/netty/"},
                    {text: "新特性", icon: "new-features", link: "/new-features/"},
                ],
            },
        ],
    },
    {
        text: "计算机基础",
        icon: "computer",
        prefix: "/computer",
        children: [
            {text: "计算机网络", icon: "network", link: "/network/"},
            {text: "操作系统", icon: "os", link: "/os/"},
            {text: "数据结构", icon: "data-structure", link: "/data-structure/"},
            {text: "计算机组成原理", icon: "composition-principle", link: "/composition-principle/"},
        ],
    },
    {
        text: "数据库",
        icon: "sql",
        prefix: "/sql",
        children: [
            {text: "MySQL基础", icon: "mysql-base", link: "/mysql-base/"},
            {text: "MySQL进阶", icon: "mysql-senior", link: "/mysql-senior/"},
            {text: "Redis", icon: "redis", link: "/redis/"},
        ],
    },

    {
        text: "开发基础与框架",
        icon: "frame",
        prefix: "/frame",
        children: [
            {text: "Spring", icon: "spring", link: "/spring/"},
            {text: "SpringMvc", icon: "spring", link: "/springMvc/"},
            {text: "SpringBoot", icon: "spring", link: "/springBoot/"},
            {text: "常用类库", icon: "class-libraries", link: "/class-libraries/"},
            {text: "单元测试", icon: "test", link: "/test/"},
        ],
    },

    {
        text: "消息队列",
        icon: "mq",
        prefix: "/mq",
        children: [
            {text: "RocketMQ", icon: "rocketmq", link: "/rocketmq/"},
        ],
    },

    {
        text: "微服务",
        icon: "cloud",
        prefix: "/cloud",
        children: [
            {text: "SpringCloud", icon: "SpringCloudAlibaba", link: "/SpringCloud-Ali/"},
        ],
    },

    {
        text: "分布式架构",
        icon: "distributed-architecture",
        prefix: "/distributed-architecture",
        children: [
            {text: "分布式数据库", icon: "drds", link: "/drds/"},
        ],
    },

    {
        text: "持续集成与容器化",
        icon: "docker",
        prefix: "/docker",
        children: [
            {text: "Docker", icon: "docker", link: "/jvm/"},
        ],
    },

    {
        text: "网站相关",
        icon: "about",
        prefix: "/about",
        children: [
            {text: "关于作者", icon: "author", link: "/author"},
            {text: "更新计划", icon: "plan", link: "/plan"},
            {text: "拾忆", icon: "plan", link: "/recollect"},
        ],
    },
]);
