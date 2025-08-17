import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Goofish Client",
  description:
    "现代化的二手交易平台 TypeScript Client，提供完整的 API 接口和类型定义",
  lang: "zh-CN",
  base: "/goofish-client/", // GitHub Pages 部署路径

  head: [
    // Favicon 配置
    [
      "link",
      { rel: "icon", href: "/goofish-client/shop.webp", type: "image/webp" },
    ],
    [
      "link",
      {
        rel: "icon",
        href: "/goofish-client/favicon.ico",
        type: "image/x-icon",
      },
    ],
    [
      "link",
      { rel: "apple-touch-icon", href: "/goofish-client/icon-144-144.png" },
    ],

    // Meta 标签
    ["meta", { name: "theme-color", content: "#3c82f6" }],
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:locale", content: "zh-CN" }],
    [
      "meta",
      {
        name: "og:title",
        content: "Goofish Client | 现代化二手交易平台开发工具包",
      },
    ],
    ["meta", { name: "og:site_name", content: "Goofish Client" }],
    ["meta", { name: "og:image", content: "/goofish-client/logo.png" }],
    [
      "meta",
      { name: "og:url", content: "https://github.com/11273/goofish-client" },
    ],
  ],

  themeConfig: {
    logo: { src: "/goofish-client/shop.webp", width: 24, height: 24 },

    // 页面内导航配置
    outline: {
      level: [2, 4], // 显示 h2 到 h4 的标题
      label: "页面导航",
    },

    nav: [
      { text: "首页", link: "/" },
      { text: "快速开始", link: "/guide/getting-started" },
      {
        text: "指南",
        items: [
          { text: "快速开始", link: "/guide/getting-started" },
          { text: "身份认证", link: "/guide/authentication" },
          { text: "自定义扩展", link: "/guide/custom-extensions" },
        ],
      },
      {
        text: "API 文档",
        items: [
          { text: "搜索接口", link: "/api/search" },
          { text: "用户接口", link: "/api/user" },
          { text: "认证接口", link: "/api/authentication" },
          { text: "配置参考", link: "/api/configuration" },
        ],
      },
      {
        text: "示例",
        items: [
          { text: "搜索示例", link: "/examples/search" },
          { text: "认证示例", link: "/examples/authentication" },
        ],
      },
    ],

    sidebar: [
      {
        text: "📚 开始使用",
        collapsed: false,
        items: [
          { text: "🚀 快速开始", link: "/guide/getting-started" },
          { text: "🔐 身份认证", link: "/guide/authentication" },
          { text: "🔧 自定义扩展", link: "/guide/custom-extensions" },
        ],
      },
      {
        text: "📖 API 接口",
        collapsed: false,
        items: [
          { text: "🔍 搜索接口", link: "/api/search" },
          { text: "👤 用户接口", link: "/api/user" },
          { text: "🔐 认证接口", link: "/api/authentication" },
          { text: "⚙️ 配置参考", link: "/api/configuration" },
        ],
      },
      {
        text: "💡 使用示例",
        collapsed: false,
        items: [
          { text: "🔍 搜索示例", link: "/examples/search" },
          { text: "🔐 认证示例", link: "/examples/authentication" },
        ],
      },
      {
        text: "📋 参考资料",
        collapsed: false,
        items: [
          { text: "📄 文档总览", link: "/README" },
          { text: "🔷 TypeScript 类型", link: "/reference/types" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/11273/goofish-client" },
    ],

    footer: {
      message: "基于 GPL-3.0 许可证发布",
      copyright: "Copyright © 2025 Goofish Client",
    },

    editLink: {
      pattern: "https://github.com/11273/goofish-client/edit/main/docs/:path",
      text: "在 GitHub 上编辑此页面",
    },

    search: {
      provider: "local",
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                },
              },
            },
          },
        },
      },
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",

    // 自定义样式
    algolia: undefined, // 禁用 Algolia 搜索，使用本地搜索
  },

  // Markdown 配置
  markdown: {
    lineNumbers: true,
    headers: {
      level: [0, 0],
    },
  },

  // 构建配置
  vite: {
    server: {
      port: 3000,
      host: true,
    },
  },
});
