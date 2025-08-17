# 认证接口

提供用户身份认证相关的 API 接口，主要用于二维码登录流程。

::: warning 注意
此模块仅适用于 Passport 登录流程，前往 [身份认证](../guide/authentication.md) 了解更多。
:::

## 接口概览

| 方法                      | API 路径                               | 描述                  |
| ------------------------- | -------------------------------------- | --------------------- |
| [`generate()`](#generate) | `passport.taobao.qr.generateQRCode`    | 生成二维码数据（URL） |
| [`query()`](#query)       | `passport.taobao.qr.queryQRCodeStatus` | 查询二维码状态        |

## generate()

生成用于登录的二维码数据，返回二维码 URL 和相关参数。

::: warning 注意
此方法只返回二维码的 URL 数据，**不是**直接可显示的二维码。返回的 `codeContent` 是一个 URL，需要使用二维码生成库将其转换为二维码图片。
:::

**API 路径：** `passport.taobao.qr.generateQRCode`

### 接口定义

#### 参数

```typescript
interface QRCodeGenerateParams {
  /** 应用名称 */
  appName?: string;
  /** 来源站点 */
  fromSite?: string;
  /** 应用入口，默认: 'web' */
  appEntrance?: string;
  /** 跨站请求伪造令牌 */
  _csrf_token?: string;
  /** 用户标识令牌 */
  umidToken?: string;
  /** 用户代理 */
  hsiz?: string;
  /** 业务参数 */
  bizParams?: string;
  /** 是否为主页，默认: false */
  mainPage?: boolean;
  /** 是否为移动设备，默认: false */
  isMobile?: boolean;
  /** 语言，默认: 'zh_CN' */
  lang?: string;
  /** 返回URL */
  returnUrl?: string;
  /** 用户代理 */
  "bx-ua"?: string;
  /** 用户标识令牌 */
  "bx-umidtoken"?: string;
  /** 是否加载，默认: 'not_loaded' */
  bx_et?: string;
  /** 用户标识标签，默认: 'SERVER' */
  umidTag?: string;
}
```

完整的参数类型定义请参考：[QRCodeGenerateParams](../reference/types.md#qrcodegenerateparams)

<details>
<summary>📋 点击查看参数详细说明</summary>

| 参数名         | 类型      | 必需 | 默认值         | 描述             |
| -------------- | --------- | ---- | -------------- | ---------------- |
| `appName`      | `string`  | ❌   | -              | 应用名称         |
| `fromSite`     | `string`  | ❌   | -              | 来源站点         |
| `appEntrance`  | `string`  | ❌   | `'web'`        | 应用入口         |
| `_csrf_token`  | `string`  | ❌   | -              | 跨站请求伪造令牌 |
| `umidToken`    | `string`  | ❌   | -              | 用户标识令牌     |
| `hsiz`         | `string`  | ❌   | -              | 用户代理         |
| `bizParams`    | `string`  | ❌   | -              | 业务参数         |
| `mainPage`     | `boolean` | ❌   | `false`        | 是否为主页       |
| `isMobile`     | `boolean` | ❌   | `false`        | 是否为移动设备   |
| `lang`         | `string`  | ❌   | `'zh_CN'`      | 语言             |
| `returnUrl`    | `string`  | ❌   | -              | 返回 URL         |
| `bx-ua`        | `string`  | ❌   | -              | 用户代理         |
| `bx-umidtoken` | `string`  | ❌   | -              | 用户标识令牌     |
| `bx_et`        | `string`  | ❌   | `'not_loaded'` | 是否加载         |
| `umidTag`      | `string`  | ❌   | `'SERVER'`     | 用户标识标签     |

</details>

#### 响应

实际响应被 [`GoofishPassportResponse`](../reference/types.md#goofishpassportresponse) 统一包裹：

```typescript
GoofishPassportResponse<QrGenerateResponse>;
```

其中 `QrGenerateResponse` 的结构为：

```typescript
interface QrGenerateResponse {
  /** 时间戳 */
  t: number | string;
  /** 二维码内容URL */
  codeContent: string;
  /** cookie值 */
  ck: string;
  /** 结果码 */
  resultCode: number;
  /** 是否处理完成 */
  processFinished: boolean;
  /** 登录令牌（从codeContent中提取） */
  lgToken?: string;
}
```

完整的响应类型定义请参考：[QrGenerateResponse](../reference/types.md#qrgenerateresponse) | [GoofishPassportResponse](../reference/types.md#goofishpassportresponse)

### 使用示例

#### 基础使用

```typescript
import { Goofish } from "goofish-client";

const client = new Goofish({});

// 生成二维码数据（使用默认参数）
const result = await client.api.passport.qr.generate();

if (result.content.success) {
  const { t, ck, codeContent } = result.content.data;

  console.log("二维码内容:", codeContent);
  console.log("查询参数:", { t, ck });
} else {
  console.error("二维码生成失败");
}
```

#### 自定义参数

```typescript
// 自定义生成参数
const result = await client.api.passport.qr.generate({
  appEntrance: "mobile",
  lang: "en_US",
  isMobile: true,
  returnUrl: "https://example.com/callback",
});
```

## query()

查询二维码的扫描和确认状态，用于轮询检查登录进度。

**API 路径：** `passport.taobao.qr.queryQRCodeStatus`

### 接口定义

#### 参数

必填参数：

```typescript
interface QRCodeQueryParams {
  /** 时间戳（从generate获取，必需） */
  t: number | string;
  /** 校验密钥（从generate获取，必需） */
  ck: string;
  // ... 其他可选参数
}
```

完整的参数类型定义请参考：[QRCodeQueryParams](../reference/types.md#qrcodequeryparams)

<details>
<summary>📋 点击查看参数详细说明</summary>

| 参数名            | 类型             | 必需 | 默认值         | 描述                         |
| ----------------- | ---------------- | ---- | -------------- | ---------------------------- |
| `t`               | `number\|string` | ✅   | -              | 时间戳（从 generate 获取）   |
| `ck`              | `string`         | ✅   | -              | 校验密钥（从 generate 获取） |
| `ua`              | `string`         | ❌   | -              | 用户代理                     |
| `appName`         | `string`         | ❌   | -              | 应用名称                     |
| `appEntrance`     | `string`         | ❌   | `'web'`        | 应用入口                     |
| `_csrf_token`     | `string`         | ❌   | -              | 跨站请求伪造令牌             |
| `umidToken`       | `string`         | ❌   | -              | 用户标识令牌                 |
| `hsiz`            | `string`         | ❌   | -              | 用户代理 hash                |
| `bizParams`       | `string`         | ❌   | -              | 业务参数                     |
| `mainPage`        | `boolean`        | ❌   | `false`        | 是否为主页面                 |
| `isMobile`        | `boolean`        | ❌   | `false`        | 是否为移动端                 |
| `lang`            | `string`         | ❌   | `'zh_CN'`      | 语言                         |
| `returnUrl`       | `string`         | ❌   | -              | 返回 URL                     |
| `fromSite`        | `string`         | ❌   | -              | 来源站点                     |
| `umidTag`         | `string`         | ❌   | `'SERVER'`     | 用户标识标签                 |
| `navlanguage`     | `string`         | ❌   | -              | 导航语言                     |
| `navUserAgent`    | `string`         | ❌   | -              | 导航用户代理                 |
| `navPlatform`     | `string`         | ❌   | -              | 导航平台                     |
| `isIframe`        | `boolean`        | ❌   | `true`         | 是否为 iframe                |
| `documentReferer` | `string`         | ❌   | -              | 文档引用页                   |
| `defaultView`     | `string`         | ❌   | `'password'`   | 默认视图                     |
| `deviceId`        | `string`         | ❌   | -              | 设备 ID                      |
| `pageTraceId`     | `string`         | ❌   | -              | 页面跟踪 ID                  |
| `bx-ua`           | `string`         | ❌   | -              | bx 用户代理                  |
| `bx-umidtoken`    | `string`         | ❌   | -              | bx 用户标识令牌              |
| `bx_et`           | `string`         | ❌   | `'not_loaded'` | bx 加载状态                  |

</details>

#### 响应

实际响应被 [`GoofishPassportResponse`](../reference/types.md#goofishpassportresponse) 统一包裹：

```typescript
GoofishPassportResponse<QrQueryResponse>;
```

其中 `QrQueryResponse` 的结构为：

```typescript
interface QrQueryResponse {
  /** 二维码状态 */
  qrCodeStatus: QRCodeStatus;
  /** 结果码 */
  resultCode: number;
  /** 标题消息（错误时显示） */
  titleMsg?: string;
}
```

完整的响应类型定义请参考：[QrQueryResponse](../reference/types.md#qrqueryresponse) | [QRCodeStatus](../reference/types.md#qrcodestatus) | [GoofishPassportResponse](../reference/types.md#goofishpassportresponse)

### 使用示例

#### 基础查询

```typescript
import { Goofish, QRCodeStatus } from "goofish-client";

// 查询二维码状态（基础用法）
async function checkQRStatus(t: string, ck: string) {
  const queryResult = await client.api.passport.qr.query({ t, ck });
  const status = queryResult.content.data.qrCodeStatus;

  switch (status) {
    case QRCodeStatus.NEW:
      console.log("等待扫描");
      return "waiting";

    case QRCodeStatus.SCANED:
      console.log("已扫描，等待确认");
      return "scanned";

    case QRCodeStatus.CONFIRMED:
      console.log("登录成功");
      return "success";

    case QRCodeStatus.CANCELED:
      console.log("用户取消登录");
      return "canceled";

    case QRCodeStatus.EXPIRED:
      console.log("二维码已过期");
      return "expired";

    default:
      console.log("二维码状态异常");
      return "error";
  }
}
```

## Cookie 管理

登录成功后，可以通过以下方法管理 Cookie：

```typescript
// 获取Passport Cookie
const passportCookie = client.getCookiePassport();

// 更新Mtop客户端的Cookie
client.updateCookieMtop(passportCookie);

// 验证Cookie有效性
const userNav = await client.api.mtop.user.getUserNav();

console.log(userNav);
```

## TypeScript 支持

```typescript
import type {
  QRCodeGenerateParams,
  QrGenerateResponse,
  QRCodeQueryParams,
  QrQueryResponse,
  QRCodeStatus,
} from "goofish-client";

// 类型安全的二维码操作
const generateParams: QRCodeGenerateParams = {
  appEntrance: "web",
  lang: "zh_CN",
};

const queryParams: QRCodeQueryParams = {
  t: "xxx",
  ck: "xxx",
};
```
