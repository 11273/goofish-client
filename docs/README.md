# Goofish Client 文档总览

欢迎使用 Goofish Client！这是一个现代化、类型安全的 TypeScript Client，专为二手交易平台开发而设计。

## 📚 文档结构

### 🚀 开始使用

**快速上手指南，帮助你在几分钟内开始使用 Client**

- **[快速开始](./guide/getting-started.md)** - 安装、配置和第一个 API 调用
- **[身份认证](./guide/authentication.md)** - Cookie 认证和二维码登录

### 📖 API 接口

**完整的 API 接口文档，包含所有可用的方法和参数**

- **[搜索接口](./api/search.md)** - 商品搜索和筛选
- **[用户接口](./api/user.md)** - 用户信息获取和管理
- **[认证接口](./api/authentication.md)** - 二维码登录和会话管理
- **[配置参考](./api/configuration.md)** - 详细的配置选项说明

### 💡 使用示例

**丰富的实际使用示例，涵盖各种应用场景**

- **[搜索示例](./examples/search.md)** - 从简单搜索到复杂筛选
- **[认证示例](./examples/authentication.md)** - 完整的登录流程实现

### 📋 参考资料

**深入的技术参考和类型定义**

- **[TypeScript 类型](./reference/types.md)** - 完整的类型定义和使用指南

## 🎯 学习路径

### 初学者路径

1. **[快速开始](./guide/getting-started.md)** - 了解基础安装和配置
2. **[身份认证](./guide/authentication.md)** - 学习如何获取和使用认证信息
3. **[搜索示例](./examples/search.md)** - 通过实例学习搜索功能
4. **[API 接口文档](./api/search.md)** - 深入了解搜索 API 的所有功能

### 进阶开发者路径

1. **[配置参考](./api/configuration.md)** - 了解所有配置选项
2. **[TypeScript 类型](./reference/types.md)** - 深入理解类型系统

## 🔧 核心功能概览

### 搜索功能

```typescript
// 基础搜索
const results = await client.api.mtop.search.search({
  keyword: "iPhone 14",
  pageNumber: 1,
  rowsPerPage: 20,
});

// 高级筛选
import { PublishDays, QuickFilter } from "goofish-client";

const filtered = await client.api.mtop.search.search({
  keyword: "MacBook",
  filter: {
    priceRange: { from: 5000, to: 15000 },
    publishDays: PublishDays.SEVEN_DAYS,
    quickFilters: [QuickFilter.PERSONAL, QuickFilter.FREE_POSTAGE],
  },
  sortField: SortField.PRICE,
  sortValue: SortValue.ASC,
});
```

### 用户管理

```typescript
// 获取用户信息
const userNav = await client.api.mtop.user.getUserNav();
const userHead = await client.api.mtop.user.getUserHead();
```

### 身份认证

```typescript
// Cookie认证
const client = new Goofish({
  cookie: "cookie2=xxxx",
});

// 二维码登录
const qrResult = await client.api.passport.qr.generate();
// 扫描二维码...
const queryResult = await client.api.passport.qr.query({
  t: qrResult.content.data.t,
  ck: qrResult.content.data.ck,
});
```

## 🛠️ 开发工具

### 日志系统

```typescript
// 启用详细日志
const client = new Goofish({
  cookie: "cookie2=xxxx",
  level: LogLevel.DEBUG, // 显示所有日志
});

// 自定义日志器
const logger = new Logger({
  level: LogLevel.INFO,
  prefix: "MyApp",
});
```

### 类型安全

```typescript
import type { SearchOptions, SearchResponse } from "goofish-client";
import { SortField, SortValue } from "goofish-client";

// 类型安全的参数
const searchOptions: SearchOptions = {
  keyword: "iPhone",
  sortField: SortField.PRICE,
  sortValue: SortValue.ASC,
};

// 类型守卫
if (isSuccessResponse(result)) {
  // TypeScript 知道 result.data 一定存在
  result.data.resultList.forEach((item) => {
    console.log(item.data.item.main.exContent.title);
  });
}
```

## 🎨 最佳实践

### 1. 配置管理

```typescript
// 环境配置
const config = {
  development: {
    cookie: process.env.DEV_COOKIE,
    level: LogLevel.DEBUG,
  },
  production: {
    cookie: process.env.PROD_COOKIE,
    level: LogLevel.WARN,
  },
};

const client = new Goofish(config[process.env.NODE_ENV]);
```

### 2. 批量操作

```typescript
async function batchSearch(keywords: string[]) {
  const results = await Promise.allSettled(
    keywords.map((keyword) =>
      client.api.mtop.search.search({ keyword, rowsPerPage: 10 })
    )
  );

  return results
    .filter(
      (result): result is PromiseFulfilledResult<any> =>
        result.status === "fulfilled" && result.value.success
    )
    .map((result) => result.value.data);
}
```

## ⚠️ 重要提醒

### TypeScript 类型覆盖

> **类型定义主要覆盖成功响应场景**  
> 对于错误状态和失败场景，类型定义可能不够完整。建议：
>
> - 启用 `LogLevel.DEBUG` 查看实际响应数据
> - 进行适当的空值检查和错误处理
> - 参考官方 API 文档获取错误码信息

### 安全声明

> **本 Client 为第三方开发工具**  
> 仅供学习研究使用，使用前请确保遵守相关平台的服务条款。

## 🤝 社区资源

- **[GitHub Repository](https://github.com/11273/goofish-client)** - 源代码和问题反馈
- **[Issues](https://github.com/11273/goofish-client/issues)** - 错误报告和功能请求
- **[Discussions](https://github.com/11273/goofish-client/discussions)** - 社区讨论和交流

## 📝 文档贡献

如果你发现文档中的错误或有改进建议，欢迎：

1. 在 [GitHub Issues](https://github.com/11273/goofish-client/issues) 提交问题
2. 提交 Pull Request 改进文档
3. 在 [Discussions](https://github.com/11273/goofish-client/discussions) 分享使用经验

## 📄 版权信息

本文档采用 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 协议发布。

---

**祝你使用愉快！** 🎉

如果这个 Client 帮助到了你，请考虑给我们一个 ⭐ [Star](https://github.com/11273/goofish-client)！
