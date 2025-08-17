# 身份认证

Goofish Client 提供多种身份认证方式，满足不同场景的接入需求。

## 认证方式概览

| 认证方式    | 状态      | 描述                     |
| ----------- | --------- | ------------------------ |
| Cookie 认证 | ✅ 已支持 | 使用现有 Cookie 直接认证 |
| 二维码登录  | ✅ 已支持 | 扫码获取 Cookie 认证     |
| 账号密码    | ✅ 已支持 | 用户名密码登录           |
| 短信验证    | 🚧 规划中 | 手机号验证登录           |

## Cookie 认证

### 基础用法

```typescript
import { Goofish } from "goofish-client";

const client = new Goofish({
  cookie: "cookie2=xxxx_string_here",
});

// 验证Cookie有效性
const userNav = await client.api.mtop.user.getUserNav();

console.log("响应结果：", userNav);
```

### Cookie 格式

Cookie 应包含必要的认证信息，典型格式：

```
cookie2=xxxx;
```

### Cookie 获取方法

1. **浏览器开发者工具**

   - 登录目标网站
   - F12 → Network → 找到请求 → 复制 Cookie

2. **二维码登录**（推荐）
   - 前往[二维码登录](../guide/authentication.md#二维码登录)章节查看详细流程

### Cookie 管理

所有协议都有自己的 Cookie，需要根据协议进行管理。

```typescript
// Mtop协议
const client = new Goofish();
// 获取Cookie
const cookie = client.getCookieMtop();
// 更新Cookie
client.updateCookieMtop("cookie2=xxxx; t=xxxx; _tb_token_=xxxx");
```

```typescript
// Passport协议
const client = new Goofish();
// 获取Cookie
const cookie = client.getCookiePassport();
// 更新Cookie
client.updateCookiePassport("cookie2=xxxx; t=xxxx; _tb_token_=xxxx");
```

## 二维码登录

### 基础流程

```typescript
import { Goofish, QRCodeStatus } from "goofish-client";

async function loginWithQR() {
  // 1. 创建客户端（无需 Cookie）
  const client = new Goofish({});

  try {
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

    // 3. 轮询等待用户扫码确认
    let attempts = 0;
    const maxAttempts = 60; // 最多等待5分钟

    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const queryResult = await client.api.passport.qr.query({ t, ck });
      const status = queryResult.content.data.qrCodeStatus;

      console.log(`状态检查 [${attempts + 1}]: ${status}`);

      if (status === QRCodeStatus.CONFIRMED) {
        // 4. 获取 Cookie 并设置到客户端
        const cookie = client.getCookiePassport();
        client.updateCookieMtop(cookie);

        console.log("登录成功！");
        return client;
      } else if (
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

    throw new Error("登录超时");
  } catch (error) {
    console.error("登录失败:", error.message);
    throw error;
  }
}

// 使用二维码登录
const client = await loginWithQR();
const cookie = client.getCookiePassport();
client.updateCookieMtop(cookie);
console.log("登录已完成，更新Cookie: ", cookie);
```

详细的二维码登录 API 请参考：[认证接口](../api/authentication.md)

## 认证状态管理

### 检查登录状态

```typescript
// 通过调用API检查登录状态
const userNav = await client.api.mtop.user.getUserNav();
console.log("响应结果：", userNav);
```

### Cookie 更新

```typescript
// 更新现有客户端的Cookie
client.updateCookieMtop(newCookie);
```

## 错误处理

- 接口调用原生返回错误，请根据错误码进行处理
- 接口调用成功，但返回数据为空，请根据返回数据进行处理

## 账号密码登录

### 基础流程

```typescript
import { Goofish, LogLevel } from "goofish-client";

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

    return client;
  } catch (error) {
    console.error("❌ 登录发生错误:", error.message);
    throw error;
  }
}
```

详细的账号密码登录 API 请参考：[认证接口](../api/authentication.md#login)

## 扩展性设计

当前版本支持 Cookie、二维码登录和账号密码登录，后续版本将支持：

### 短信验证登录（规划中）

## 安全建议

1. **Cookie 安全存储**

   - 自行实现使用环境变量存储敏感信息
   - 避免在代码中硬编码 Cookie

2. **定期更新**

   - Cookie 有时效性，建议定期检查有效性
   - 登录失效时及时重新认证

3. **错误处理**
   - 实现完善的错误处理机制
   - 对认证失败进行适当的重试
