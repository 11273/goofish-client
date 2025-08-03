# Goofish SDK - 快速开始

> 一个功能强大的咸鱼平台 SDK，支持商品搜索、用户信息获取等核心功能。

## 📦 安装

```bash
npm install goofish-sdk
# 或
yarn add goofish-sdk
# 或
pnpm add goofish-sdk
```

## 🚀 快速上手

### 基础使用

```typescript
import { Goofish, LogLevel } from "goofish-sdk";

// 创建客户端实例
const client = new Goofish({
  level: LogLevel.INFO,
  cookie: "your-cookie-here", // 登录后的 cookie
});

// 搜索商品
const searchResult = await client.api.search.search({
  keyword: "iPhone",
  pageNumber: 1,
  rowsPerPage: 30,
});

// 获取用户信息
const userInfo = await client.api.user.getUserNav();
```

### 配置选项

```typescript
const client = new Goofish({
  // 日志级别
  level: LogLevel.DEBUG, // ERROR | WARN | INFO | DEBUG

  // 登录凭证
  cookie: "your-cookie-string",

  // 可选的自定义配置
  baseURL: "https://h5api.m.goofish.com",
  timeout: 20000,
  userAgent: "custom-user-agent",
});
```

## 🔐 身份认证

> **重要提示**：使用 SDK 前需要先获取登录 cookie。

SDK 支持多种登录方式：

1. **二维码登录（推荐）** ⭐
   - 安全便捷，无风控风险
   - 手机扫码即可完成登录
2. **短信登录**

   - 15 分钟内限制 3 次验证码获取
   - 适合临时使用

3. **账号密码登录**
   - 容易触发风控验证码
   - 不推荐使用

详细的登录流程请参考：[身份认证文档](./01-authentication.md)

## 📋 主要功能

| 功能模块    | 描述                         | 文档链接                           |
| ----------- | ---------------------------- | ---------------------------------- |
| 🔍 商品搜索 | 支持关键词搜索、筛选排序     | [搜索接口文档](./02-search-api.md) |
| 👤 用户信息 | 获取用户基本信息、统计数据   | [用户接口文档](./03-user-api.md)   |
| 🔐 身份认证 | 登录状态管理、Token 自动刷新 | [认证文档](./01-authentication.md) |

## 🛠️ 开发工具

### 日志调试

```typescript
import { Logger, LogLevel } from "goofish-sdk";

// 启用调试日志
const client = new Goofish({
  level: LogLevel.DEBUG,
  cookie: "your-cookie",
});

// 手动创建日志器
const logger = new Logger({ level: LogLevel.DEBUG });
logger.info("自定义日志消息");
```

### 错误处理

```typescript
try {
  const result = await client.api.search.search({
    keyword: "test",
  });
} catch (error) {
  console.error("请求失败:", error);
}
```

## 📚 更多资源

- [API 接口参考](./04-api-reference.md)
- [常量和配置](./05-constants.md)
- [GitHub 仓库](https://github.com/11273/goofish-sdk)
- [问题反馈](https://github.com/11273/goofish-sdk/issues)

## ⚠️ 注意事项

1. **Cookie 安全性**：请妥善保管您的登录 cookie，不要泄露给他人
2. **请求频率**：请合理控制请求频率，避免触发平台限制
3. **数据使用**：请遵守平台服务条款，合理使用数据
4. **版本兼容**：建议定期更新到最新版本以获得最佳体验

## 📄 许可证

本项目基于 [GPL-3.0](../LICENSE) 许可证开源。
