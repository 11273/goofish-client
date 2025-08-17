# 认证功能示例

本文档提供身份认证 API 的基础使用示例。

## Cookie 认证

### 直接使用 Cookie

```typescript
import { Goofish } from "goofish-client";

const client = new Goofish({
  cookie: "cookie2=xxxx_string_here",
});

// 验证 Cookie 是否有效
const userNav = await client.api.mtop.user.getUserNav();
console.log("登录状态:", userNav.success && userNav.data?.login);
```

### 环境变量配置

```typescript
// .env 文件
// GOOFISH_COOKIE=cookie2=xxxx

const client = new Goofish({
  cookie: process.env.GOOFISH_COOKIE,
});
```

## 账号密码登录

### 基础账号密码登录

```javascript
const { Goofish, LogLevel } = require("goofish-client");

async function passwordLogin() {
  try {
    // 创建 Client 实例
    const client = new Goofish({
      // 过滑块验证码的cookie，cookie具有时效性，需要定期更新
      cookie: "x5sec=",
      level: LogLevel.INFO,
    });

    console.log("🚀 开始账号密码登录...\n");

    // 准备登录参数
    const loginParams = {
      loginId: "13800138000", // 必填：登录ID（账户名或邮箱或手机号）
      password2: "123456", // 必填：密码
      keepLogin: true, // 可选：是否保持登录
    };

    const loginResult = await client.api.passport.login.login(loginParams);
    console.log("🔐 登录结果:", loginResult);
  } catch (error) {
    console.error("❌ 登录发生错误:", error.message);
    throw error;
  }
}

passwordLogin();
```

### TypeScript 版本

```typescript
import { Goofish, LogLevel } from "goofish-client";
import type { LoginParams } from "goofish-client";

async function passwordLogin() {
  try {
    // 创建 Client 实例
    const client = new Goofish({
      // 过滑块验证码的cookie，cookie具有时效性，需要定期更新
      cookie: "x5sec=",
      level: LogLevel.INFO,
    });

    console.log("🚀 开始账号密码登录...\n");

    // 准备登录参数（类型安全）
    const loginParams: LoginParams = {
      loginId: "13800138000", // 必填：登录ID（账户名或邮箱或手机号）
      password2: "123456", // 必填：密码
      keepLogin: true, // 可选：是否保持登录
    };

    const loginResult = await client.api.passport.login.login(loginParams);
    console.log("🔐 登录结果:", loginResult);

    // 验证登录状态
    const userNav = await client.api.mtop.user.getUserNav();
    console.log("登录状态验证:", userNav.success && userNav.data?.login);

    return client;
  } catch (error) {
    console.error("❌ 登录发生错误:", error.message);
    throw error;
  }
}

passwordLogin();
```

### 完整参数示例

```typescript
import { Goofish, LogLevel } from "goofish-client";

async function passwordLoginWithFullParams() {
  const client = new Goofish({
    cookie: "x5sec=",
    level: LogLevel.INFO,
  });

  const loginParams = {
    // 必填参数
    loginId: "13800138000", // 登录ID（手机号/用户名/邮箱）
    password2: "123456", // 密码（会自动加密）

    // 可选参数
    keepLogin: true, // 是否保持登录
    isIframe: false, // 是否在iframe中
    documentReferer: "", // 文档引用页
    defaultView: "password", // 默认视图
    appName: "xianyu", // 应用名称
    appEntrance: "web", // 应用入口
    mainPage: false, // 是否为主页面
    isMobile: false, // 是否为移动端
    lang: "zh_CN", // 语言
    fromSite: "77", // 来源站点
    umidTag: "SERVER", // 用户标识标签
  };

  try {
    const loginResult = await client.api.passport.login.login(loginParams);

    if (loginResult.content.success) {
      console.log("✅ 登录成功");
      return client;
    } else {
      console.error("❌ 登录失败:", loginResult.content.data?.titleMsg);
      throw new Error(loginResult.content.data?.titleMsg || "登录失败");
    }
  } catch (error) {
    console.error("❌ 登录异常:", error.message);
    throw error;
  }
}
```

## 二维码登录

### 基础二维码登录

```typescript
import { Goofish, QRCodeStatus, LogLevel } from "goofish-client";

/**
 * Goofish 客户端快速开始示例
 * 完整演示从二维码登录
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

## 状态监控示例

### 二维码状态监控

```typescript
async function monitorQRStatus(t: string, ck: string) {
  const client = new Goofish({});

  const statusMap = {
    [QRCodeStatus.NEW]: "新建",
    [QRCodeStatus.SCANED]: "已扫描",
    [QRCodeStatus.CONFIRMED]: "已确认",
    [QRCodeStatus.CANCELED]: "已取消",
    [QRCodeStatus.EXPIRED]: "已过期",
    [QRCodeStatus.ERROR]: "错误",
  };

  try {
    const queryResult = await client.api.passport.qr.query({ t, ck });
    const status = queryResult.content.data.qrCodeStatus;

    console.log(`二维码状态: ${statusMap[status] || status}`);

    return status;
  } catch (error) {
    console.error("状态查询失败:", error.message);
    return QRCodeStatus.ERROR;
  }
}
```

### 登录状态检查

```typescript
async function checkLoginStatus(client: Goofish) {
  try {
    const userNav = await client.api.mtop.user.getUserNav();

    // 通过判断字段是否存在来判断是否登录
    // ...
  } catch (error) {
    console.error("检查登录状态失败:", error.message);
    return false;
  }
}
```

## Cookie 管理

### 更新 Cookie

```typescript
const client = new Goofish({ cookie: "initial_cookie" });

// 获取新的 Cookie
const newCookie = await getNewCookieFromLogin();

// 更新客户端 Cookie
client.updateCookieMtop(newCookie);

// 验证更新是否成功
const isValid = await checkLoginStatus(client);
console.log("Cookie更新", isValid ? "成功" : "失败");
```

### Cookie 有效性验证

```typescript
async function validateCookie(cookie: string): Promise<boolean> {
  const client = new Goofish({ cookie });

  try {
    const userNav = await client.api.mtop.user.getUserNav();

    // 通过判断字段是否存在来判断是否登录
    // ...
  } catch (error) {
    console.error("Cookie验证失败:", error.message);
    return false;
  }
}
```

## 完整登录工作流

### 登录流程

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

## 最佳实践

### 1. 账号密码登录

- **Cookie 管理**: 确保提供有效的滑块验证 Cookie
- **密码安全**: 密码会自动加密，无需手动处理
- **错误处理**: 实现完善的错误处理和重试机制
- **状态验证**: 登录后验证登录状态

```typescript
// 推荐的密码登录实现
async function securePasswordLogin() {
  const client = new Goofish({
    cookie: process.env.GOOFISH_COOKIE, // 使用环境变量
    level: LogLevel.INFO,
  });

  try {
    const result = await client.api.passport.login.login({
      loginId: process.env.LOGIN_ID, // 环境变量存储敏感信息
      password2: process.env.PASSWORD,
      keepLogin: true,
    });

    if (result.content.success) {
      // 更新Cookie
      const newCookie = client.getCookiePassport();
      client.updateCookieMtop(newCookie);

      // 验证登录状态
      const userNav = await client.api.mtop.user.getUserNav();
      if (userNav.success && userNav.data?.login) {
        console.log("✅ 登录验证成功");
        return client;
      }
    }

    throw new Error(result.content.data?.titleMsg || "登录失败");
  } catch (error) {
    console.error("❌ 登录失败:", error.message);
    throw error;
  }
}
```

### 2. Cookie 安全

- 使用环境变量存储 Cookie
- 避免在代码中硬编码敏感信息
- 定期更新过期的 Cookie

### 3. 状态检查

- 定期验证认证状态
- 处理认证过期的情况
- 实现自动重新登录机制

### 4. 用户体验

- 设置合理的超时时间
- 提供清晰的状态提示
- 实现优雅的错误处理
