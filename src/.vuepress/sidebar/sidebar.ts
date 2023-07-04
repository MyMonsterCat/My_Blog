import {sidebar} from "vuepress-theme-hope";
import {JavaSideBar} from "./java";
import {MySQLSidebar} from "./sql";
import {AboutSideBar} from "./about";

export const zhSidebar = sidebar({

    // 应该把更精确的路径放置在前边
    "/development-tool/": "structure",

    "/books/": "structure",

    "/java/": JavaSideBar,

    "/computer/": "structure",

    "/sql/": MySQLSidebar,

    "/frame/": "structure",

    "/mq/": "structure",

    "/cloud/": "structure",

    "/distributed-architecture/": "structure",

    "/docker/": "structure",

    "/about/": AboutSideBar,


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
