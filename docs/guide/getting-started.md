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

::: info 二维码生成方法对比
**方法一：`qr.generate()`**

- 只获取二维码数据（URL 格式）
- 需要自行将 URL 转换为二维码图片显示
- 适合需要自定义二维码显示的场景

**方法二：`qr.render()`（推荐）**

- 直接生成可显示的二维码
- 支持多种输出格式（控制台文本、SVG、图片等）
- 适合快速开发和调试
  :::

推荐使用 `render()` 方法，可以直接在控制台显示二维码：

- 前往[二维码登录](./authentication.md#二维码登录)章节查看详细流程

### 3. 进行 API 调用

```typescript
// 搜索商品
const searchResult = await client.api.mtop.search.search({
  keyword: "iPhone",
  pageNumber: 1,
  rowsPerPage: 20,
});

console.log("搜索结果:", searchResult.data.resultList);
```

## 完整使用流程

下面是一个完整的端到端示例，从二维码登录开始到成功搜索商品：

### 代码示例

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

    // 调用二维码渲染接口，生成可在终端显示的二维码
    const qrResult = await client.api.passport.qr.render({
      params: {}, // 二维码参数（默认即可）
      options: {
        outputFormat: "string", // 输出格式为字符串
        stringOptions: {
          type: "terminal", // 终端显示模式
          small: false, // 使用小尺寸二维码
        },
      },
    });

    // 检查二维码是否生成成功
    if (!qrResult.response.content.success) {
      throw new Error("二维码生成失败");
    }

    // 获取二维码的关键参数，用于后续查询登录状态
    const { t, ck } = qrResult.response.content.data;

    // 显示二维码
    console.log("请使用闲鱼APP扫描下方二维码:");
    console.log(qrResult.qrCode);
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

### 流程说明

这个完整示例包含四个主要步骤：

#### 🔐 第一步：二维码登录

- 创建未认证的客户端
- 生成二维码并显示
- 轮询检查扫码状态
- 自动获取并设置 Cookie

#### ✅ 第二步：验证登录状态

- 调用用户接口验证登录
- 获取用户基本信息
- 确认认证状态正常

#### 🔍 第三步：搜索商品

- 使用认证后的客户端搜索
- 展示搜索结果详情
- 验证 API 调用成功

#### 📊 第四步：扩展使用

- 演示其他 API 接口调用
- 展示完整的功能流程

## 配置选项

### 基础配置

详细配置前往: [客户端配置](../reference/types.md#客户端配置)

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

- [搜索接口](../api/search.md) - 查看搜索 API 文档
- [用户接口](../api/user.md) - 查看用户 API 文档
- [使用示例](../examples/search.md) - 查看详细的使用示例

### 扩展开发

- [自定义扩展指南](./custom-extensions.md) - 学习如何扩展 Client 功能

## 常见问题

### 1. 如何获取 Cookie？

有三种方式获取 Cookie：

1. **二维码登录**（推荐）

   - 使用 Client 的二维码登录功能自动获取
   - 参考上面的 [方式二 - 二维码登录](#方式二---二维码登录推荐) 示例

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

- Node.js 服务端应用
- 浏览器环境（需要处理跨域）
- Electron 应用
- React Native 应用

### 3. 如何启用调试模式？

设置日志级别为 `LogLevel.DEBUG` 即可启用详细的调试信息：

```typescript
const client = new Goofish({
  cookie: "cookie2=xxxx",
  level: LogLevel.DEBUG,
});
```
