import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([
    {text: "Java相关", icon: "java", link: "/home.md"},
    {text: "计算机基础", icon: "computer", link: "/computer/"},
    {text: "开发工具", icon: "rank", link: "/development-tool/"},
    {text: "技术书籍", icon: "telbook", link: "/books/"},
    {
        text: "网站相关",
        icon: "ask",
        children: [
            {text: "关于作者", icon: "people", link: "/about-the-author/"},
            {text: "更新计划", icon: "config", link: "/timeline/"},
        ],
    },
]);
