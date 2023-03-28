import {sidebar} from "vuepress-theme-hope";
import {aboutTheAuthor} from "./about-the-author";
import {books} from "./books";

export const zhSidebar = sidebar({

    // 应该把更精确的路径放置在前边
    "/books/": books,
    "/about-the-author/": aboutTheAuthor,
    "/java/jvm/": "structure",

    "/": [
        {
            text: "Java",
            icon: "java",
            collapsible: true,
            prefix: "java/",
            children: [
                {
                    text: "基础",
                    prefix: "base/",
                    icon: "basic",
                    children: [
                        "base01",
                    ],
                },

                {
                    text: "JVM",
                    prefix: "jvm/",
                    icon: "virtual_machine",
                    collapsible: true,
                    children: [
                        "memory-area",
                    ],
                },
            ],
        },
        {
            text: "计算机基础",
            icon: "computer",
            prefix: "computer/",
            collapsible: true,
            children: [
                {
                    text: "计算机网络",
                    prefix: "network/",
                    icon: "network",
                    children: [
                        "other-network-questions",
                    ],
                },
            ],
        },
    ],
});
