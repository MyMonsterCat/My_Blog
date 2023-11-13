import {sidebar} from "vuepress-theme-hope";
import {JavaSideBar} from "./java";
import {MySQLSidebar} from "./advance-sql";
import {AboutSideBar} from "./about";

export const zhSidebar = sidebar({

    // 应该把更精确的路径放置在前边
    "/java/": JavaSideBar,

    "/computer/": "structure",

    "/advance/sql/": MySQLSidebar,

    "/tool": "structure",

    "/about/": AboutSideBar,
});
