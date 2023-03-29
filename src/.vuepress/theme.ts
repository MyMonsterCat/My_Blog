import {hopeTheme} from "vuepress-theme-hope";
import {zhNavbar} from "./navbar/navbar.js";
import {zhSidebar} from "./sidebar/sidebar.js";

export default hopeTheme({
    hostname: "http://monstercat.cn",

    author: {
        name: "Monster",
        url: "http://monstercat.cn",
        email: "1264833435@qq.com"
    },

    fullscreen: true,

    iconAssets: "//at.alicdn.com/t/c/font_3981663_1jdvdcv2fsii.css",

    favicon: "/favicon.png",
    logo: "/favicon.png",
    logoDark: "/logo.png",

    darkmode: "toggle",

    repo: "https://github.com/MyMonsterCat/note",
    repoLabel: "GitHub",
    repoDisplay: true,

    pageInfo: [
        "Author",
        "Category",
        "Tag",
        "Date",
        "Original",
        "Word",
        "ReadingTime",
    ],

    themeColor: {
        blue: "#2196f3",
        red: "#f26d6d",
        green: "#3eaf7c",
        orange: "#fb9b5f",
    },

    navbarLayout: {
        start: ["Brand"],
        center: ["Search"],
        end: ["Links", "Outlook", "Repo"],
    },

    locales: {
        "/": {
            navbar: zhNavbar,

            sidebar: zhSidebar,

            footer: '<a href="http://beian.miit.gov.cn" target="_blank"> 鲁ICP备2021006500号</a> | <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43010402000915" ><img src="/beian.png" style="padding: 0 5px"/>湘公网安备 43010402000915号</a>',
            copyright: "MIT Licensed | Copyright © 2020-present Monster",
            displayFooter: true,

            metaLocales: {
                editLink: "在 GitHub 上编辑此页",
            },
        },
    },

    plugins: {
        comment: {
            provider: "Waline",
            serverURL: "https://mywaline-mymonstercat.vercel.app/"
        },

        // all features are enabled for demo, only preserve features you need here
        mdEnhance: {
            align: true,
            attrs: true,
            chart: true,
            codetabs: true,
            demo: true,
            echarts: true,
            figure: true,
            flowchart: true,
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
            presentation: {
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

        // uncomment these if you want a pwa
        // pwa: {
        //   favicon: "/favicon.ico",
        //   cacheHTML: true,
        //   cachePic: true,
        //   appendBase: true,
        //   apple: {
        //     icon: "/assets/icon/apple-icon-152.png",
        //     statusBarColor: "black",
        //   },
        //   msTile: {
        //     image: "/assets/icon/ms-icon-144.png",
        //     color: "#ffffff",
        //   },
        //   manifest: {
        //     icons: [
        //       {
        //         src: "/assets/icon/chrome-mask-512.png",
        //         sizes: "512x512",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-mask-192.png",
        //         sizes: "192x192",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-512.png",
        //         sizes: "512x512",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-192.png",
        //         sizes: "192x192",
        //         type: "image/png",
        //       },
        //     ],
        //     shortcuts: [
        //       {
        //         name: "Demo",
        //         short_name: "Demo",
        //         url: "/demo/",
        //         icons: [
        //           {
        //             src: "/assets/icon/guide-maskable.png",
        //             sizes: "192x192",
        //             purpose: "maskable",
        //             type: "image/png",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        // },
    },
});
