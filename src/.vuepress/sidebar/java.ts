export const JavaSideBar = [
    {
        text: "✍️ Java基础知识",
        children: [
            {
                text: "面向对象基础",
                collapsible: true,
                prefix: "/java/base/object-oriented",
                children: [
                    "reflex-mechanism",
                ],
            },
            {
                text: "Java集合",
                collapsible: true,
                prefix: "/java/base/jihe",
                children: [
                    "jihe-all",
                    "jihe-collection",
                    "jihe-map",
                ],
            },
        ],
    },
    {
        text: "✍️ Java进阶知识",
        children: [
            {
                text: "JVM相关",
                collapsible: true,
                prefix: "/java/senior/jvm",
                children: [
                    "memory-structure",
                    "gc",
                ],
            },
            {
                text: "并发编程",
                collapsible: true,
                prefix: "/java/senior/juc",
                children: [
                    "base01",
                ],
            },
        ],
    },
];
