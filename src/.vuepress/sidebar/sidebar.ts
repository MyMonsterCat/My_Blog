import {sidebar} from "vuepress-theme-hope";
import {ComputerSideBar} from "./01computer";
import {JavaSideBar} from "./02java";
import {MySQLSidebar} from "./03advance/mysql";
import {RedisSidebar} from "./03advance/redis";
import {AiSideBar} from "./04ai";
import {ToolSideBar} from "./05tool";
import {InterviewSideBar} from "./06interview";
import {AboutSideBar} from "./07about";

export const zhSidebar = sidebar({

    // 应该把更精确的路径放置在前边
    "/computer/": ComputerSideBar,

    "/java/": JavaSideBar,

    "/advance/mysql/": MySQLSidebar,
    "/advance/redis/": RedisSidebar,

    "/ai/": AiSideBar,

    "/tool": ToolSideBar,

    "/interview": InterviewSideBar,

    "/about/": AboutSideBar,
});


