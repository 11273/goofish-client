# 身份认证指南

> 详细介绍 Goofish SDK 的身份认证机制和登录方式。

## 🔐 认证概述

Goofish SDK 使用 cookie 作为身份认证凭证。在使用 SDK 的各项功能前，您需要先获取有效的登录 cookie。

## 🚪 登录方式

### 1. 二维码登录（推荐）⭐

二维码登录是最安全便捷的登录方式，无风控风险。

#### 特点

- ✅ 安全性高，无风控风险
- ✅ 操作简单，手机扫码即可
- ✅ 登录成功率高
- ✅ 适合长期使用

#### 使用流程

1. 生成登录二维码
2. 使用手机咸鱼 App 扫描二维码
3. 确认登录
4. 获取 cookie 用于 SDK 初始化

```typescript
// 示例：使用二维码登录获取的 cookie
const client = new Goofish({
  cookie: "cookie2=xxxxxxxxx; _m_h5_tk=xxxxxxxxx;",
  level: LogLevel.INFO,
});
```

> **注意**：具体的二维码登录实现代码正在开发中，敬请期待。

### 2. 短信登录

短信登录通过手机号码和验证码完成登录。

#### 特点

- ⚠️ 15 分钟内限制 3 次验证码获取
- ⚠️ 适合临时使用
- ⚠️ 可能存在频率限制

#### 限制说明

- 每 15 分钟最多获取 3 次短信验证码
- 超出限制需等待时间窗口重置
- 建议合理安排验证码获取时机

```typescript
// 示例：短信登录流程（待实现）
// TODO: 实现短信登录接口
```

### 3. 账号密码登录

使用用户名和密码进行登录。

#### 密码登录特点

- ❌ 容易触发风控验证码
- ❌ 可能需要额外的人机验证
- ❌ 不推荐在自动化场景中使用

#### 风控说明

- 频繁的密码登录可能触发平台风控
- 需要处理图形验证码、滑块验证等
- 登录成功率相对较低

```typescript
// 示例：密码登录流程（待实现）
// TODO: 实现密码登录接口，包含验证码处理
```

## 🔄 Token 管理

SDK 内置了智能的 Token 管理机制：

### 自动刷新

- 自动检测 Token 过期
- 无感知刷新 Token
- 失败后自动重试请求

### Cookie 更新

```typescript
// 手动更新 cookie
client.updateCookie("new-cookie-string");

// 获取当前配置
const config = client.getConfig();
console.log("当前 cookie:", config.cookie);
```

### Token 错误处理

```typescript
import { TOKEN_ERROR_CODES } from "goofish-sdk";

// SDK 会自动处理以下 Token 错误：
// - FAIL_SYS_TOKEN_EMPTY: Token 为空
// - FAIL_SYS_TOKEN_ILLEGAL: Token 非法
// - FAIL_SYS_SESSION_EXPIRED: 会话过期
```

## 🍪 Cookie 格式

### 标准格式

```
cookie2=xxxxxxxx; _m_h5_tk=xxxxxxxx_xxxxx; other_cookies=value;
```

### 关键字段

- `cookie2`: 用户会话标识
- `_m_h5_tk`: API 调用 Token
- 其他可选字段：`cna`, `isg`, `l` 等

### 获取方式

1. **浏览器开发者工具**

   - 登录咸鱼网页版
   - F12 打开开发者工具
   - 查看 Network 面板请求头中的 Cookie

2. **抓包工具**
   - 使用 Charles、Fiddler 等工具
   - 抓取登录后的请求
   - 提取 Cookie 字段

## ⚠️ 安全注意事项

### Cookie 保护

- 🔒 妥善保管 Cookie，避免泄露
- 🔒 定期更新 Cookie，避免长期使用同一个
- 🔒 不要在公共环境中暴露 Cookie

### 使用建议

- ✅ 使用环境变量存储 Cookie
- ✅ 为不同环境配置不同的登录凭证
- ✅ 监控 Cookie 有效性，及时更新

```typescript
// 推荐：使用环境变量
const client = new Goofish({
  cookie: process.env.GOOFISH_COOKIE,
  level: LogLevel.INFO,
});
```

## 🐛 常见问题

### Q: 如何判断 Cookie 是否有效？

A: 尝试调用任意 API，如果返回认证错误，说明 Cookie 已失效。

```typescript
try {
  const result = await client.api.user.getUserNav();
  console.log("Cookie 有效");
} catch (error) {
  console.error("Cookie 可能已失效:", error);
}
```

### Q: Cookie 多久会过期？

A: Cookie 的有效期取决于平台策略，通常在几天到几周不等。建议定期检查和更新。

### Q: 可以同时使用多个 Cookie 吗？

A: 每个 SDK 实例只能使用一个 Cookie。如需使用多个账户，请创建多个 SDK 实例。

```typescript
const client1 = new Goofish({ cookie: "cookie1" });
const client2 = new Goofish({ cookie: "cookie2" });
```

## 🔮 未来计划

- [ ] 实现二维码登录完整流程
- [ ] 添加短信登录支持
- [ ] 优化 Token 刷新机制
- [ ] 增加登录状态监控
- [ ] 支持多账户管理

---

> 💡 **提示**：推荐使用二维码登录方式，安全性最高且操作简单。如有其他登录需求，请关注项目更新。
