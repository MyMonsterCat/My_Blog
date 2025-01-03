import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([

    {
        text: "Chat",
        // icon: "log",
        link: "https://chat.monstercat.cn/"
    },

    {
        text: "计算机基础",
        icon: "computer",
        prefix: "/computer",
        children: [
            {text: "数据结构与算法", icon: "data-structure", link: "/data-structure/"},
            {text: "计算机网络", icon: "network", link: "/network/"},
            {text: "操作系统", icon: "os", link: "/os/"},
            {text: "计算机组成原理", icon: "composition-principle", link: "/composition-principle/"},
        ],
    },

    {
        text: "Java",
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
                text: "Java高级",
                prefix: "/java/senior",
                children: [
                    {text: "JVM", icon: "jvm", link: "/jvm/"},
                    {text: "并发编程", icon: "juc", link: "/juc/"},
                    {text: "网络编程", icon: "io", link: "/netty/"},
                    {text: "新特性", icon: "new-features", link: "/new-features/"},
                ],
            },
            {
                text: "开发框架",
                icon: "frame",
                prefix: "/java/senior/frame",
                children: [
                    {text: "Spring", icon: "spring", link: "/spring/"},
                    {text: "SpringMvc", icon: "spring", link: "/springMvc/"},
                    {text: "SpringBoot", icon: "spring", link: "/springBoot/"},
                    {text: "常用类库", icon: "class-libraries", link: "/class-libraries/"},
                    {text: "单元测试", icon: "test", link: "/test/"},
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

        ],
    },

    {
        text: "常用组件",
        icon: "cloud",
        prefix: "/advance",
        children: [
            {
                text: "MySQL",
                icon: "mysql-base",
                link: "/mysql/README.md",
            },

            {
                text: "Redis",
                icon: "redis",
                link: "/redis/README.md",
            },

            {
                text: "Nginx",
                icon: "nginx",
                link: "/nginx/nginx.md"
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
                text: "持续集成与容器化",
                icon: "docker",
                prefix: "/docker",
                children: [
                    {text: "Docker", icon: "docker", link: "/jvm/"},
                ],
            },
        ],
    },

    {
        text: "人工智能",
        icon: "ai",
        prefix: "/ai",
        children: [
            {text: "OCR", icon: "ocr", link: "/github/rapid-ocr.md"},
        ],
    },

    {
        text: "工具",
        icon: "mq",
        prefix: "/tool",
        children: [
            {
                text: "UML",
                icon: "",
                link: "/uml.md"
            },
            {
                text: "LeeCode",
                icon: "",
                link: "https://leetcode.cn/problemset/"
            },
        ],
    },
    {
        text: "面经",
        icon: "interview",
        link: "/interview/redis.md",
    },

    // {
    //     text: "考试",
    //     icon: "exam",
    //     prefix: "/exam",
    //     children: [
    //         {text: "软考", icon: "soft", link: "/soft/"},
    //         {text: "考研", icon: "graduate", link: "/graduate/"},
    //     ],
    // },

    // {
    //     text: "网站相关",
    //     icon: "about",
    //     prefix: "/about",
    //     children: [
    //         {text: "关于作者", icon: "author", link: "/author"},
    //         {text: "更新计划", icon: "plan", link: "/plan"},
    //     ],
    // },
]);
