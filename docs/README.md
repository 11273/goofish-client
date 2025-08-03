# Goofish SDK 文档中心

> 欢迎使用 Goofish SDK 官方文档！这里包含了完整的使用指南、API 参考和最佳实践。

## 📚 文档导航

### 🚀 快速开始

- **[00-快速开始](./00-getting-started.md)** - 安装、配置和基础使用

### 🔐 身份认证

- **[01-身份认证](./01-authentication.md)** - 登录方式、Cookie 管理、Token 处理

### 📖 API 文档

- **[02-搜索接口](./02-search-api.md)** - 商品搜索、筛选、排序功能
- **[03-用户接口](./03-user-api.md)** - 用户信息获取、统计数据

### 📝 开发参考

- **[04-API 参考](./04-api-reference.md)** - 完整的 API 接口说明
- **[05-常量配置](./05-constants.md)** - 所有常量、枚举值查询表

## 🗂️ 按功能分类

### 核心功能

| 功能     | 文档                           | API 端点                               |
| -------- | ------------------------------ | -------------------------------------- |
| 商品搜索 | [搜索接口](./02-search-api.md) | `mtop.taobao.idlemtopsearch.pc.search` |
| 用户信息 | [用户接口](./03-user-api.md)   | `mtop.idle.web.user.page.nav`          |
| 用户详情 | [用户接口](./03-user-api.md)   | `mtop.idle.web.user.page.head`         |

### 登录认证

| 方式       | 推荐度     | 说明                 | 状态      |
| ---------- | ---------- | -------------------- | --------- |
| 二维码登录 | ⭐⭐⭐⭐⭐ | 安全便捷，无风控风险 | 🚧 开发中 |
| 短信登录   | ⭐⭐⭐     | 15 分钟 3 次限制     | 📋 规划中 |
| 密码登录   | ⭐         | 容易触发风控         | 📋 规划中 |

## 🔍 快速查询

### 常用枚举值

```typescript
// 搜索排序
SortField.PRICE; // 按价格排序
SortField.CREATE; // 按发布时间排序
SortValue.ASC; // 升序
SortValue.DESC; // 降序

// 商品筛选
QuickFilter.PERSONAL; // 个人闲置
QuickFilter.FREE_POSTAGE; // 包邮
QuickFilter.NEW; // 全新

// 发布时间
PublishDays.ONE_DAY; // 1天内
PublishDays.SEVEN_DAYS; // 7天内
```

### API 端点速查

```typescript
// 搜索相关
"mtop.taobao.idlemtopsearch.pc.search"; // 商品搜索

// 用户相关
"mtop.idle.web.user.page.nav"; // 用户导航
"mtop.idle.web.user.page.head"; // 用户详情
```

## 📋 使用流程

### 1. 安装和配置

```bash
npm install goofish-sdk
```

### 2. 获取登录凭证

推荐使用二维码登录获取 Cookie（开发中）

### 3. 初始化客户端

```typescript
import { Goofish, LogLevel } from "goofish-sdk";

const client = new Goofish({
  cookie: "your-cookie-here",
  level: LogLevel.INFO,
});
```

### 4. 使用 API

```typescript
// 搜索商品
const searchResult = await client.api.search.search({
  keyword: "iPhone",
  pageNumber: 1,
});

// 获取用户信息
const userInfo = await client.api.user.getUserNav();
```

## ⚠️ 重要提示

1. **Cookie 安全**：请妥善保管您的登录 Cookie，不要泄露
2. **请求频率**：合理控制 API 调用频率，避免触发限制
3. **错误处理**：始终检查 API 响应状态并处理异常
4. **版本更新**：建议定期更新到最新版本

## 🛠️ 开发工具

### 调试模式

```typescript
const client = new Goofish({
  level: LogLevel.DEBUG, // 启用详细日志
  cookie: "your-cookie",
});
```

### 错误排查

1. 检查 Cookie 是否有效
2. 确认请求参数格式正确
3. 查看详细错误日志
4. 参考常见问题解答

## 🔗 相关链接

- **GitHub 仓库**：[https://github.com/11273/goofish-sdk](https://github.com/11273/goofish-sdk)
- **问题反馈**：[Issues](https://github.com/11273/goofish-sdk/issues)
- **NPM 包**：[goofish-sdk](https://www.npmjs.com/package/goofish-sdk)

## 📄 许可证

本项目基于 [GPL-3.0](../LICENSE) 许可证开源。

---

> 💡 **提示**：建议按顺序阅读文档，从快速开始到具体的 API 使用。如有疑问，请查看相应的详细文档或提交 Issue。
