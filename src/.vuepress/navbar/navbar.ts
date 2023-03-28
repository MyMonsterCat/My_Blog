import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([
    {text: "Java相关", icon: "java", link: "/home.md"},
    {text: "计算机基础", icon: "jisuanji", link: "/computer/"},
    {text: "开发工具", icon: "gongju", link: "/development-tool/"},
    {text: "技术书籍", icon: "telbook", link: "/books/"},
    {
        text: "网站相关",
        icon: "wangzhan",
        children: [
            {text: "关于作者", icon: "zuozhe", link: "/about-the-author/"},
            {text: "更新计划", icon: "jihua", link: "/timeline/"},
        ],
    },
]);
