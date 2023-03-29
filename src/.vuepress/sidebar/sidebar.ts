import {sidebar} from "vuepress-theme-hope";
import {java} from "./java";

export const zhSidebar = sidebar({

    // 应该把更精确的路径放置在前边
    "/development-tool/": "structure",

    "/books/": "structure",

    "/java/": java,

    "/computer/": "structure",

    "/sql/": "structure",

    "/frame/": "structure",

    "/mq/": "structure",

    "/cloud/": "structure",

    "/distributed-architecture/": "structure",

    "/docker/": "structure",

    "/about/": "structure",


    // "/": [
    //     {
    //         text: "Java",
    //         icon: "java",
    //         collapsible: true,
    //         prefix: "java/",
    //         children: [
    //             {
    //                 text: "基础",
    //                 prefix: "base/",
    //                 icon: "basic",
    //                 children: [
    //                     "base01",
    //                 ],
    //             },
    //
    //             {
    //                 text: "JVM",
    //                 prefix: "jvm/",
    //                 icon: "virtual_machine",
    //                 collapsible: true,
    //                 children: [
    //                     "memory-area",
    //                 ],
    //             },
    //         ],
    //     },
    // ],
});
