# 快速开始

欢迎使用 Goofish Client！这是一个功能强大的 TypeScript Client，为开发者提供便捷的二手交易平台接口调用能力。

## 环境要求

- Node.js >= 14.0.0
- TypeScript >= 4.5.0（可选）

## 安装

选择你喜欢的包管理器：

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

## 基本使用

### 1. 导入 Client

```typescript
import { Goofish, LogLevel } from "goofish-client";
```

### 2. 认证方式

Client 提供两种认证方式：

#### 使用已有 Cookie

如果你已经有 Cookie，可以直接创建客户端：

```typescript
const client = new Goofish({
  cookie: "cookie2=xxxx", // 用户认证信息
  level: LogLevel.INFO, // 日志级别
});
```

#### 二维码登录（推荐）

如果没有 Cookie，可以使用二维码登录自动获取。Client 提供两种二维码生成方法：

- 前往[二维码登录](./authentication.md#二维码登录)章节查看详细流程

### 3. 进行 API 调用

#### 搜索商品

```typescript
// 搜索商品
const searchResult = await client.api.mtop.search.search({
  keyword: "iPhone",
  pageNumber: 1,
  rowsPerPage: 20,
});

console.log("搜索结果:", searchResult.data.resultList);
```

#### 使用 IM 功能（可选）

```typescript
// 1. 获取 IM Token
const tokenRes = await client.api.mtop.im.getLoginToken();

// 2. 连接 WebSocket
await client.wsClientIm.connect();

// 3. 注册 IM 服务
await client.api.im.auth.register({
  token: tokenRes.data.accessToken,
});

// 4. 监听消息
client.api.im.message.onFormattedMessage((msg) => {
  console.log("收到消息:", msg);
});

// 5. 获取会话列表
const conversations = await client.api.im.conversation.listNewestPagination({
  startTimeStamp: Date.now(),
  limitNum: 20,
});

console.log("会话数量:", conversations.body.userConvs.length);
```

## 完整使用流程

### 示例 1：搜索商品流程

下面是一个完整的端到端示例，从二维码登录开始到成功搜索商品：

#### 代码示例

```typescript
import { Goofish, QRCodeStatus, LogLevel } from "goofish-client";

/**
 * Goofish 客户端快速开始示例
 * 完整演示从二维码登录到搜索商品的全流程
 */
async function quickStart() {
  try {
    // ========== 第一步：初始化客户端 ==========
    // 创建 Goofish 客户端实例，设置日志级别为 INFO
    const client = new Goofish({
      level: LogLevel.INFO,
    });
    console.log("🚀 Goofish 快速开始示例\n");

    // ========== 第二步：生成登录二维码 ==========
    console.log("📱 正在生成登录二维码...");

    // 调用二维码生成接口，获取二维码数据
    const qrResult = await client.api.passport.qr.generate();

    // 检查二维码是否生成成功
    if (!qrResult.content.success) {
      throw new Error("二维码生成失败");
    }

    // 获取二维码的关键参数，用于后续查询登录状态
    const { t, ck } = qrResult.content.data;

    // 显示二维码
    console.log("请将下列链接转换为二维码，并使用闲鱼APP扫描:");
    console.log(qrResult.content.data.codeContent);
    console.log("\n⏳ 等待扫码确认...\n");

    // ========== 第三步：轮询等待用户扫码 ==========
    let attempts = 0;
    const maxAttempts = 60; // 最多等待60次，每次3秒，共180秒

    while (attempts < maxAttempts) {
      // 等待3秒后再次查询
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // 查询二维码状态
      const queryResult = await client.api.passport.qr.query({ t, ck });
      const status = queryResult.content.data.qrCodeStatus;

      // 显示当前状态
      console.log(`状态检查 [${attempts + 1}/${maxAttempts}]: ${status}`);

      // 根据不同状态处理
      if (status === QRCodeStatus.CONFIRMED) {
        // 用户已确认登录，更新客户端的 Cookie
        const cookie = client.getCookiePassport();
        client.updateCookieMtop(cookie);
        console.log("✅ 登录成功！\n");
        break;
      } else if (
        // 处理失败状态：已取消、已过期、错误
        [
          QRCodeStatus.CANCELED,
          QRCodeStatus.EXPIRED,
          QRCodeStatus.ERROR,
        ].includes(status)
      ) {
        throw new Error(`登录失败: ${status}`);
      }

      attempts++;
    }

    // 检查是否超时
    if (attempts >= maxAttempts) {
      throw new Error("登录超时，请重试");
    }

    // ========== 第四步：验证登录状态 ==========
    console.log("👤 正在验证登录状态...");

    // 获取用户信息以验证登录是否成功
    const userInfo = await client.api.mtop.user.getUserHead();

    // 检查接口返回和登录状态
    if (userInfo?.data?.baseInfo?.self) {
      console.log(
        `✅ 登录验证成功！欢迎: ${userInfo.data.module.base.displayName} (${userInfo.data.module.base.introduction})\n`
      );
    } else {
      throw new Error("登录验证失败");
    }

    // ========== 第五步：搜索商品示例 ==========
    console.log("🔍 正在搜索商品...");

    // 调用搜索接口，搜索关键词为 "iPhone"
    const searchResult = await client.api.mtop.search.search({
      keyword: "iPhone", // 搜索关键词
      pageNumber: 1, // 页码（从1开始）
      rowsPerPage: 5, // 每页显示数量
    });

    // ========== 第六步：处理并显示搜索结果 ==========
    if (
      searchResult.ret[0] === "SUCCESS::调用成功" &&
      searchResult.data?.resultList
    ) {
      const items = searchResult.data.resultList;
      console.log(`✅ 搜索成功！找到 ${items.length} 个商品:\n`);

      // 遍历并显示每个商品的信息
      items.forEach((item, index) => {
        // 提取商品信息
        const content = item.data.item.main.exContent;

        // 拼接价格文本（价格可能包含多个部分，如 "¥" + "99"）
        const priceText = content.price.map((p) => p.text).join("");

        // 显示商品信息：序号、标题、价格、地区
        console.log(`${index + 1}. ${content.title}`);
        console.log(`   💰 ${priceText} | 📍 ${content.area || "未知地区"}\n`);
      });
    } else {
      console.log("❌ 搜索失败:", searchResult.ret[0]);
    }

    console.log("🎉 示例运行完成！");

    // 返回客户端实例，便于后续操作
    return client;
  } catch (error) {
    // 统一错误处理
    console.error("\n❌ 发生错误:", error.message);
    throw error;
  }
}

quickStart();
```

#### 流程说明

这个完整示例包含以下主要步骤：

##### 🔐 第一步：二维码登录

- 创建未认证的客户端
- 生成二维码并显示
- 轮询检查扫码状态
- 自动获取并设置 Cookie

##### ✅ 第二步：验证登录状态

- 调用用户接口验证登录
- 获取用户基本信息
- 确认认证状态正常

##### 🔍 第三步：搜索商品

- 使用认证后的客户端搜索
- 展示搜索结果详情
- 验证 API 调用成功

##### 📊 第四步：扩展使用

- 演示其他 API 接口调用
- 展示完整的功能流程

### 示例 2：IM 即时通讯流程

下面是一个完整的 IM 使用示例，展示如何初始化 IM、获取会话列表和监听消息：

#### 代码示例

```typescript
import { Goofish, LogLevel } from "goofish-client";

/**
 * IM 即时通讯完整示例
 * 演示 IM 初始化、会话管理和消息监听
 */
async function imQuickStart() {
  try {
    // ========== 第一步：初始化客户端（开启 IM 能力）==========
    const client = new Goofish({
      cookie: "cookie2=xxxx", // 你的登录凭证
      level: LogLevel.INFO,
      im: {
        // 可选：自定义 IM 配置
        autoReconnect: true, // 自动重连
        heartbeatInterval: 10000, // 心跳间隔 10 秒
      },
    });

    console.log("🚀 IM 快速开始示例\n");

    // ========== 第二步：获取 IM 登录 Token ==========
    console.log("🔑 正在获取 IM Token...");
    const tokenRes = await client.api.mtop.im.getLoginToken();
    console.log("✅ Token 获取成功\n");

    // ========== 第三步：连接 WebSocket ==========
    console.log("🔌 正在连接 WebSocket...");
    await client.wsClientIm.connect();
    console.log("✅ WebSocket 连接成功\n");

    // ========== 第四步：注册 IM 服务 ==========
    console.log("📝 正在注册 IM 服务...");
    await client.api.im.auth.register({
      token: tokenRes.data.accessToken,
    });
    console.log("✅ IM 服务注册成功\n");

    // ========== 第五步：获取会话列表 ==========
    console.log("📋 正在获取会话列表...");
    const conversations =
      await client.api.im.conversation.listNewestPagination({
        startTimeStamp: Date.now(),
        limitNum: 10,
      });

    console.log(`✅ 获取到 ${conversations.body.userConvs.length} 个会话\n`);

    // 显示会话信息
    conversations.body.userConvs.forEach((conv, index) => {
      const conversationId =
        conv.singleChatUserConversation?.singleChatConversation.cid;
      const lastMsg = conv.lastMessage;
      console.log(`${index + 1}. 会话 ID: ${conversationId}`);
      console.log(`   最后消息: ${lastMsg?.content?.text || "无"}\n`);
    });

    // ========== 第六步：监听格式化消息（推荐）==========
    console.log("👂 开始监听消息...\n");

    client.api.im.message.onFormattedMessage((msg) => {
      console.log("📨 收到新消息:", msg);
    });

    // ========== 第七步：监听 WebSocket 事件 ==========
    client.wsClientIm.on("close", () => {
      console.log("❌ WebSocket 连接已断开");
    });

    client.wsClientIm.on("reconnect", (attempt) => {
      console.log(`🔄 WebSocket 重连成功，第 ${attempt} 次`);
    });

    client.wsClientIm.on("error", (error) => {
      console.error("❌ WebSocket 错误:", error.message);
    });

    console.log("✅ IM 初始化完成，开始监听消息...");
    console.log("💡 提示：发送消息到你的闲鱼账号以测试消息接收\n");

    // 保持程序运行（实际应用中根据需要处理）
    return client;
  } catch (error) {
    console.error("\n❌ 发生错误:", error.message);
    throw error;
  }
}

imQuickStart();
```

#### 流程说明

这个完整的 IM 示例包含以下主要步骤：

##### 🔧 第一步：配置 IM 客户端

- 创建带 IM 配置的客户端实例
- 设置自动重连和心跳间隔
- 配置日志级别

##### 🔑 第二步：获取 IM Token

- 调用 Mtop 接口获取 IM 登录凭证
- Token 用于 WebSocket 认证

##### 🔌 第三步：建立 WebSocket 连接

- 连接到 IM WebSocket 服务器
- 自动处理连接状态

##### 📝 第四步：注册 IM 服务

- 使用 Token 完成 IM 注册
- 自动完成同步初始化

##### 📋 第五步：获取会话列表

- 获取最新的会话列表
- 支持分页加载
- 显示会话详情

##### 👂 第六步：监听消息

- 监听格式化后的消息（推荐）
- 实时接收新消息推送
- 自动解析消息内容

##### 🔄 第七步：处理连接事件

- 监听连接状态变化
- 处理断线重连
- 错误处理和日志记录

## 配置选项

### 基础配置

详细配置前往: [核心配置类型](../reference/types.md#核心配置类型)

```typescript
const client = new Goofish({
  // 必需配置
  cookie: "cookie2=xxxx",

  // 可选配置
  level: LogLevel.INFO,

  // MTOP 接口配置
  mtop: {
    timeout: 10000, // 请求超时时间
    baseURL: "custom_url", // 自定义基础URL（通常不需要）
  },

  // 请求头配置
  headers: {
    userAgent: "custom_ua", // 自定义User-Agent
  },
});
```

### 日志级别

- `LogLevel.ERROR` - 只显示错误信息
- `LogLevel.WARN` - 显示警告和错误信息
- `LogLevel.INFO` - 显示一般信息、警告和错误
- `LogLevel.DEBUG` - 显示所有日志信息

## 错误处理

Client 使用标准的 Promise 错误处理机制：

```typescript
try {
  const result = await client.api.mtop.search.search({
    keyword: "iPhone",
  });
  console.log("搜索结果:", result);
} catch (error) {
  // 处理网络错误或其他异常
  console.error("请求异常:", error);
}
```

## TypeScript 支持

Client 提供完整的 TypeScript 类型定义：

```typescript
import type { SearchOptions, SearchResponse } from "goofish-client";
import { SortField, SortValue } from "goofish-client";

const searchParams: SearchOptions = {
  keyword: "iPhone",
  pageNumber: 1,
  rowsPerPage: 20,
  sortField: SortField.PRICE,
  sortValue: SortValue.ASC,
};
```

::: warning 注意
TypeScript 类型定义主要覆盖成功响应的数据结构。对于错误场景和失败状态，建议参考官方 API 文档进行处理。
:::

## 下一步

### 认证相关

- [身份认证指南](./authentication.md) - 了解详细的认证流程和最佳实践
- [认证接口文档](../api/authentication.md) - 查看完整的二维码登录 API

### API 使用

- [首页接口](../api/home.md) - 查看首页 Feed API 文档
- [搜索接口](../api/search.md) - 查看搜索 API 文档
- [商品接口](../api/item.md) - 查看商品详情 API 文档
- [用户接口](../api/user.md) - 查看用户 API 文档
- [收藏接口](../api/favor.md) - 查看收藏管理 API 文档
- [订单接口](../api/order.md) - 查看订单管理 API 文档
- [IM 接口](../api/im.md) - 查看 IM 即时通讯 API 文档
- [使用示例](../examples/home.md) - 查看详细的使用示例

### 扩展开发

- [自定义扩展指南](./custom-extensions.md) - 学习如何扩展 Client 功能

## 常见问题

### 1. 如何获取 Cookie？

有三种方式获取 Cookie：

1. **二维码登录**（推荐）

   - 使用 Client 的二维码登录功能自动获取
   - 参考上面的 [二维码登录](#二维码登录推荐) 示例

2. **浏览器开发者工具**

   - 登录目标网站
   - F12 → Network → 找到请求 → 复制 Cookie

3. **环境变量**
   - 将 Cookie 保存到环境变量中使用
   - 详见 [身份认证](./authentication.md) 文档

### 2. 登录状态检查

```typescript
// 检查登录是否成功
const userNav = await client.api.mtop.user.getUserNav();

if (userNav.ret[0] === "SUCCESS::调用成功" && userNav.data?.login) {
  console.log("用户已登录:", userNav.data.nick);
} else {
  console.log("用户未登录，需要重新认证");
}
```

### 3. 支持哪些环境？

Client 支持以下环境：

- Node.js 服务端应用（Node.js >= 14.0.0）
- Electron 桌面应用
- Next.js 服务端渲染
- Nuxt.js 服务端渲染

### 3. 如何启用调试模式？

设置日志级别为 `LogLevel.DEBUG` 即可启用详细的调试信息：

```typescript
const client = new Goofish({
  cookie: "cookie2=xxxx",
  level: LogLevel.DEBUG,
});
```
