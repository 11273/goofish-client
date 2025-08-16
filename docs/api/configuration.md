# 配置参考

Goofish Client 提供了丰富的配置选项，可以根据不同的使用场景进行定制。

## 基础配置

### GoofishConfig 接口

```typescript
interface GoofishConfig {
  /** 日志级别 */
  level: LogLevel;
  /** 用户认证Cookie */
  cookie: string;
  /** MTOP请求配置 */
  mtop: GoofishMtopRequestConfig;
  /** Passport请求配置 */
  passport: GoofishPassportRequestConfig;
  /** 请求头配置 */
  headers: GoofishRequestHeaders;
}
```

完整的配置类型定义请参考：[GoofishConfig](../reference/types.md#goofishconfig)

### 子配置接口

```typescript
interface GoofishMtopRequestConfig {
  /** API 配置 */
  baseURL: string;
  /** API 前缀 */
  apiPrefix: string;
  /** 应用密钥 */
  appKey: string;
  /** JavaScript 版本 */
  jsv: string;
  /** 超时时间 */
  timeout: number;
  /** 数据类型 */
  dataType: string;
  /** 请求类型 */
  type: string;
  /** 会话选项 */
  sessionOption: string;
  /** 版本号 */
  v: string;
  /** 账户站点 */
  accountSite: string;
  /** SPM 计数 */
  spmCnt: string;
  /** SPM 前缀 */
  spmPre: string;
  /** 日志 ID */
  logId: string;
}

interface GoofishPassportRequestConfig {
  /** API 配置 */
  baseURL: string;
  /** 应用名称 */
  appName: string;
  /** 来源站点 */
  fromSite: string;
}

interface GoofishRequestHeaders {
  /** User-Agent */
  userAgent: string;
  /** Origin */
  origin: string;
  /** Referer */
  referer: string;
  /** Content-Type */
  contentType: string;
}
```

完整的配置类型定义请参考：[GoofishMtopRequestConfig](../reference/types.md#goofishmtoprequestconfig) | [GoofishPassportRequestConfig](../reference/types.md#goofishpassportrequestconfig) | [GoofishRequestHeaders](../reference/types.md#goofishrequestheaders)

## 默认配置

默认配置值请参考源码中的 `src/constants/` 目录。主要默认值包括：

- **MTOP API**: `https://h5api.m.taobao.com`
- **Passport API**: `https://passport.taobao.com`
- **AppKey**: `12574478`
- **Timeout**: `10000ms`

## 基础使用

### 最小配置

```typescript
import { Goofish } from "goofish-client";

// 只需要Cookie即可使用（其他配置使用默认值）
const client = new Goofish({
  cookie: "cookie2=xxxx",
});
```

### 完整配置

```typescript
import { Goofish, LogLevel } from "goofish-client";

const client = new Goofish({
  cookie: "cookie2=xxxx",
  level: LogLevel.INFO,

  mtop: {
    // 只覆盖需要修改的配置，其他使用默认值
    timeout: 15000, // 15秒超时
    baseURL: "https://custom-api.example.com",
  } as Partial<GoofishMtopRequestConfig>,

  headers: {
    userAgent: "MyApp/1.0.0",
  } as Partial<GoofishRequestHeaders>,
});
```

## 日志配置

### LogLevel 枚举

```typescript
enum LogLevel {
  ERROR = 0, // 只显示错误
  WARN = 1, // 显示警告和错误
  INFO = 2, // 显示信息、警告和错误
  DEBUG = 3, // 显示所有日志
}
```

### 日志使用

```typescript
// 开发环境：详细日志
const devClient = new Goofish({
  cookie: "cookie2=xxxx",
  level: LogLevel.DEBUG,
});

// 生产环境：只记录警告和错误
const prodClient = new Goofish({
  cookie: "cookie2=xxxx",
  level: LogLevel.WARN,
});
```

## 网络配置

### 超时设置

```typescript
const client = new Goofish({
  cookie: "cookie2=xxxx",
  mtop: {
    timeout: 5000, // 5秒超时
  },
});
```

### 自定义 URL

```typescript
// 自定义API地址
const client = new Goofish({
  cookie: "cookie2=xxxx",
  mtop: {
    baseURL: "https://custom-api.example.com",
    apiPrefix: "/api/v1",
  } as Partial<GoofishMtopRequestConfig>,
  passport: {
    baseURL: "https://custom-passport.example.com",
  } as Partial<GoofishPassportRequestConfig>,
});
```

## TypeScript 支持

```typescript
import type {
  GoofishConfig,
  GoofishMtopRequestConfig,
  GoofishPassportRequestConfig,
  GoofishRequestHeaders,
  LogLevel,
} from "goofish-client";

const config: GoofishConfig = {
  cookie: "cookie2=xxxx",
  level: LogLevel.INFO,
};

const client = new Goofish(config);
```

## 最佳实践

### 1. 安全存储

```typescript
// ✅ 推荐：使用环境变量
const client = new Goofish({
  cookie: process.env.GOOFISH_COOKIE,
});

// ❌ 不推荐：硬编码敏感信息
const client = new Goofish({
  cookie: "cookie2=xxxx", // 不要在代码中硬编码
});
```

### 2. 多环境配置

```typescript
const environments = {
  development: {
    level: LogLevel.DEBUG,
    mtop: { timeout: 30000 },
  },
  production: {
    level: LogLevel.WARN,
    mtop: { timeout: 8000 },
  },
};

const env = process.env.NODE_ENV || "development";
const client = new Goofish({
  cookie: process.env.GOOFISH_COOKIE,
  ...environments[env],
});
```

这个配置参考文档提供了较多的配置选项说明和最佳实践，帮助开发者根据不同场景优化 Client 的使用。
