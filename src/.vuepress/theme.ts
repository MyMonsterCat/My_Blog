import {hopeTheme} from "vuepress-theme-hope";
import {zhNavbar} from "./navbar/navbar.js";
import {zhSidebar} from "./sidebar/sidebar.js";

export default hopeTheme({
    hostname: "https://monstercat.cn",

    author: {
        name: "Monster",
        url: "https://monstercat.cn",
        email: "1264833435@qq.com"
    },

    fullscreen: true,

    iconAssets: "//at.alicdn.com/t/c/font_3981663_xnqvb4qjmxl.css",

    favicon: "/favicon.png",
    logo: "/favicon.png",
    logoDark: "/logo.png",

    darkmode: "toggle",

    repo: "https://github.com/MyMonsterCat",
    repoLabel: "GitHub",
    repoDisplay: true,

    pageInfo: false,
    breadcrumb: false,

    themeColor: true,

    navbarLayout: {
        start: ["Brand"],
        center: ["Outlook","Search"],
        end: [ "Links", "Repo"],
    },

    locales: {
        "/": {
            navbar: zhNavbar,

            sidebar: zhSidebar,

            footer: '<a href="https://beian.miit.gov.cn" target="_blank"> 鲁ICP备2021006500号</a> | <a target="_blank" href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43010402000915" ><img src="/beian.png" style="padding: 0 5px" alt="湘公网安备 43010402000915号"/>湘公网安备 43010402000915号</a>',
            copyright: "MIT Licensed | Copyright © 2020-present Monster",
            displayFooter: true,

            editLink: false,
            
        },
    },

    encrypt: {
        config: {
            "/about/recollect": ["lcmonster1203"],
        },
    },

    plugins: {
        comment: {
            provider: "Waline",
            serverURL: "https://mywaline-mymonstercat.vercel.app/"
        },
        // prismjs: {
        //     light: "ateliersulphurpool-light",
        // },
        // autoCatalog: false,
        // all features are enabled for demo, only preserve features you need here
        mdEnhance: {
            align: true,
            attrs: true,
            chart: true,
            codetabs: true,
            demo: true,
            echarts: true,
            figure: true,
            gfm: true,
            imgLazyload: true,
            imgSize: true,
            include: true,
            katex: true,
            mark: true,
            mermaid: true,
            playground: {
                presets: ["ts", "vue"],
            },
            revealJs: {
                plugins: ["highlight", "math", "search", "notes", "zoom"],
            },
            stylize: [
                {
                    matcher: "Recommended",
                    replacer: ({tag}) => {
                        if (tag === "em")
                            return {
                                tag: "Badge",
                                attrs: {type: "tip"},
                                content: "Recommended",
                            };
                    },
                },
            ],
            sub: true,
            sup: true,
            tabs: true,
            vPre: true,
            vuePlayground: true,
        },
    },
});
