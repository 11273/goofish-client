---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Goofish Client"
  text: "现代化的二手交易平台 Client"
  tagline: "TypeScript 优先，功能强大，高度可扩展"
  image:
    src: /phone.png
    alt: Goofish Client
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 查看示例
      link: /examples/home
    - theme: alt
      text: GitHub
      link: https://github.com/11273/goofish-client

features:
  - icon: 🚀
    title: TypeScript 优先
    details: 完整的类型定义，提供卓越的开发体验和类型安全保障，支持智能提示和错误检查

  - icon: 🔍
    title: 功能丰富
    details: 支持首页Feed、商品搜索、用户信息获取、二维码登录等核心功能，满足各种业务需求

  - icon: 🛡️
    title: 稳定可靠
    details: 内置错误处理、重试机制、日志系统和性能监控，确保生产环境稳定运行

  - icon: 📖
    title: 文档完善
    details: 详细的 API 文档、丰富的使用示例、最佳实践指南和故障排除说明

  - icon: 🔧
    title: 高度可配置
    details: 灵活的配置选项，支持多环境部署、自定义拦截器和扩展功能

  - icon: ⚡
    title: 性能优化
    details: 支持请求缓存、连接池、批量操作等性能优化特性，提升应用效率
---

:::tip 项目信息

<div class="status-badges">

  <h1>Goofish Client</h1>
  <p>一个非官方的闲鱼客户端库，支持商品搜索等功能。</p>

[![NPM Version](https://img.shields.io/npm/v/goofish-client?style=flat-square&color=blue&label=npm)](https://www.npmjs.com/package/goofish-client) [![GitHub Stars](https://img.shields.io/github/stars/11273/goofish-client?style=flat-square&color=yellow&label=stars)](https://github.com/11273/goofish-client) [![GitHub Forks](https://img.shields.io/github/forks/11273/goofish-client?style=flat-square&color=blue&label=forks)](https://github.com/11273/goofish-client) [![GitHub Issues](https://img.shields.io/github/issues/11273/goofish-client?style=flat-square&color=red&label=issues)](https://github.com/11273/goofish-client/issues) [![Views](https://komarev.com/ghpvc/?username=11273-goofish-client-page&label=Views&color=brightgreen&style=flat-square)](https://github.com/11273/goofish-client) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/11273/goofish-client/pulls) [![Build Status](https://img.shields.io/github/actions/workflow/status/11273/goofish-client/release.yml?style=flat-square&label=build)](https://github.com/11273/goofish-client)

[![License](https://img.shields.io/github/license/11273/goofish-client?style=flat-square&color=brightgreen&label=license)](https://github.com/11273/goofish-client/blob/main/LICENSE) [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://github.com/11273/goofish-client) [![Node.js](https://img.shields.io/badge/Node.js%2014%2B-43853d?style=flat-square&logo=node.js&logoColor=white)](https://github.com/11273/goofish-client) [![GitHub Last Commit](https://img.shields.io/github/last-commit/11273/goofish-client?style=flat-square&color=orange&label=last%20commit)](https://github.com/11273/goofish-client) [![Bundle Size](https://flat.badgen.net/packagephobia/publish/goofish-client)](https://bundlephobia.com/package/goofish-client) [![NPM Downloads](https://img.shields.io/npm/dm/goofish-client?style=flat-square&color=green&label=downloads)](https://www.npmjs.com/package/goofish-client)

</div>
:::

<style>
.status-badges {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.status-badges img {
  display: inline-block;
}
</style>

## 🎯 快速上手

::: code-group

```bash [npm]
npm install goofish-client
```

```bash [yarn]
yarn add goofish-client
```

```bash [pnpm]
pnpm add goofish-client
```

:::

```typescript
import { Goofish, LogLevel } from "goofish-client";

// 创建客户端实例
const client = new Goofish({
  cookie: "cookie2=xxxx",
  level: LogLevel.INFO,
});

// 获取首页Feed数据
const feedData = await client.api.mtop.home.getFeed({
  pageSize: 20,
  pageNumber: 1,
});

console.log(`获取到 ${feedData.data.cardList.length} 个商品`);

// 搜索商品
const results = await client.api.mtop.search.search({
  keyword: "iPhone 14",
  pageNumber: 1,
  rowsPerPage: 20,
});

console.log(`找到 ${results.data.resultList.length} 个商品`);
```

## 📚 核心功能

### 🏠 首页推荐

- **个性化推荐**：基于用户行为的智能 Feed 推荐
- **分页加载**：支持无限滚动和分页浏览
- **实时更新**：动态获取最新的商品推荐
- **丰富标签**：商品状态、卖家信用、价格标签等

### 🔍 智能搜索

- **关键词搜索**：支持复合关键词和模糊匹配
- **高级筛选**：价格区间、发布时间、商品状态等多维度筛选
- **智能排序**：按价格、时间、距离、信用等多种排序方式
- **地理位置**：基于 GPS 的附近商品搜索

### 🔐 身份认证

- **Cookie 认证**：支持现有 Cookie 快速认证
- **二维码登录**：完整的扫码登录流程
- **会话管理**：自动 Cookie 更新和状态监控
- **安全存储**：Cookie 安全存储和加密传输

### 👤 用户管理

- **用户信息**：获取用户基本资料和状态
- **导航数据**：用户导航和菜单信息
- **状态监控**：实时监控登录状态和会话有效性

### 🔧 高级扩展

- **自定义客户端**：扩展 HTTP 客户端功能
- **拦截器支持**：请求/响应拦截和处理
- **批量操作**：支持批量搜索和数据处理
- **性能监控**：内置性能分析和监控工具

## 🚀 快速开始指南

### 1. 基础安装

```bash
npm install goofish-client
```

### 2. 获取认证信息

选择以下任一方式获取认证：

```typescript
import { Goofish, LogLevel } from "goofish-client";

// 方式1: 使用已有Cookie
const client = new Goofish({
  cookie: "your_existing_cookie",
});

// 方式2: 二维码登录
const client = new Goofish({});
const loginResult = await client.api.passport.qr.generate();
// 扫描二维码后获取Cookie...
```

### 3. 开始使用

```typescript
// 获取首页推荐
const feedData = await client.api.mtop.home.getFeed({
  pageSize: 30,
  pageNumber: 1,
});

// 搜索商品
const products = await client.api.mtop.search.search({
  keyword: "MacBook Pro",
  filter: {
    priceRange: { from: 5000, to: 15000 },
  },
});

// 获取用户信息
const userInfo = await client.api.mtop.user.getUserNav();
```

## 📖 学习资源

:::tip

<div class="links-grid">

[🚀 **快速开始** - 5 分钟快速上手指南](/guide/getting-started)

[📚 **API 文档** - 完整的接口参考文档](/api/home)

[💡 **使用示例** - 实际应用场景演示](/examples/home)

</div>
:::

## 🤝 加入社区

- **[问题反馈](https://github.com/11273/goofish-client/issues)** - 报告 Bug 和功能建议
- **[社区讨论](https://github.com/11273/goofish-client/discussions)** - 技术交流和经验分享
- **[示例代码](https://github.com/11273/goofish-client/tree/main/examples)** - 完整的项目示例

:::warning 重要声明
本 Client 为第三方开发工具，仅供学习研究使用。使用前请确保遵守相关平台的服务条款。

TypeScript 类型定义主要覆盖成功响应场景，错误处理请参考官方文档。
:::

---

<div class="footer-info">
  <p>
    采用 <a href="https://github.com/11273/goofish-client/blob/main/LICENSE" target="_blank">GPL-3.0</a> 许可证 ·
    <a href="https://github.com/11273/goofish-client" target="_blank">GitHub</a> ·
    <a href="https://github.com/11273/goofish-client/blob/main/CHANGELOG.md">更新日志</a> ·
    <a href="./guide/contributing">贡献指南</a>
  </p>
</div>

<style>
.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.links-grid a {
  text-decoration: none;
  transition: opacity 0.2s;
}

.links-grid a:hover {
  opacity: 0.8;
}

.footer-info {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.footer-info a {
  color: var(--vp-c-brand);
}
</style>
