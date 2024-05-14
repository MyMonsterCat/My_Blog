export const RedisSidebar = [

    {
        text: "一、前言",
        prefix: "/advance/redis/",
        collapsible: true,
        children: [
            {
                text: "Redis介绍",
                link: "README.md",
            },
        ],
    },

    {
        text: "二、基础篇",
        prefix: "/advance/redis/base",
        collapsible: true,
        children: [
            {
                text: "常用命令",
                link: "how_select",
            }
        ],
    },
    {
        text: "三、应用篇",
        prefix: "/advance/redis/use",
        collapsible: true,
        children: [
            {
                text: "redis常用场景",
                link: "index_interview",
            }
        ],
    },
    {
        text: "四、高级篇",
        prefix: "/advance/redis/senior",
        collapsible: true,
        children: [
            {
                text: "分布式缓存",
                link: "distributed_cache",
            },
            {
                text: "多级缓存",
                link: "multi_level_cache",
            }
        ],
    },

];
