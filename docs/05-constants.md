# 常量和配置参考

> 详细列出 Goofish SDK 中使用的所有常量、配置项和枚举值，方便查询和使用。

## 📋 目录

- [API 配置](#-api-配置)
- [API 端点](#-api-端点)
- [Token 相关常量](#-token-相关常量)
- [枚举类型](#-枚举类型)
- [默认配置](#️-默认配置)
- [常量使用示例](#-常量使用示例)

## 🔧 API 配置

### 基础配置常量

```typescript
const API_CONFIG = {
  // 请求配置
  BASE_URL: "https://h5api.m.goofish.com", // API 基础地址
  API_PREFIX: "h5", // API 前缀路径
  APP_KEY: "34839810", // 应用密钥
  JSV: "2.7.2", // JavaScript 版本
  TIMEOUT: 20000, // 请求超时时间（毫秒）
  DATA_TYPE: "json", // 数据类型
  TYPE: "originaljson", // 请求类型
  SESSION_OPTION: "AutoLoginOnly", // 会话选项
  V: "1.0", // API 版本
  ACCOUNT_SITE: "xianyu", // 账户站点标识
  SPM_CNT: "a21ybx.undefined.0.0", // SPM 计数参数
  SPM_PRE: "a21ybx.undefined.0.0", // SPM 前缀参数
  LOG_ID: "", // 日志 ID（默认为空）

  // 请求头配置
  HEADERS_ORIGIN: "https://www.goofish.com", // 请求来源
  HEADERS_REFERER: "https://www.goofish.com", // 引用页面
  HEADERS_CONTENT_TYPE: "application/x-www-form-urlencoded", // 内容类型
  HEADERS_USER_AGENT:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", // 用户代理
} as const;
```

### 配置项说明

| 配置项           | 类型     | 默认值                        | 说明                 |
| ---------------- | -------- | ----------------------------- | -------------------- |
| `BASE_URL`       | `string` | `https://h5api.m.goofish.com` | API 服务器地址       |
| `API_PREFIX`     | `string` | `h5`                          | API 路径前缀         |
| `APP_KEY`        | `string` | `34839810`                    | 咸鱼应用密钥         |
| `JSV`            | `string` | `2.7.2`                       | JavaScript 版本号    |
| `TIMEOUT`        | `number` | `20000`                       | 请求超时时间（毫秒） |
| `DATA_TYPE`      | `string` | `json`                        | 响应数据格式         |
| `TYPE`           | `string` | `originaljson`                | 请求数据格式         |
| `SESSION_OPTION` | `string` | `AutoLoginOnly`               | 会话处理方式         |
| `V`              | `string` | `1.0`                         | API 版本号           |
| `ACCOUNT_SITE`   | `string` | `xianyu`                      | 账户所属站点         |

## 🔗 API 端点

### 端点映射表

```typescript
const API_ENDPOINTS = {
  // 用户相关接口
  USER: {
    // 用户导航信息（基础信息：用户名、头像、关注、粉丝等）
    NAV: "mtop.idle.web.user.page.nav",

    // 用户头部信息（详细信息：用户ID、统计数据、信用信息等）
    HEAD: "mtop.idle.web.user.page.head",
  },

  // 商品相关接口
  ITEM: {
    // TODO: 商品详情、商品管理等接口
  },

  // 搜索相关接口
  SEARCH: {
    // 商品搜索接口
    SEARCH: "mtop.taobao.idlemtopsearch.pc.search",
  },

  // 订单相关接口
  ORDER: {
    // TODO: 订单查询、订单管理等接口
  },

  // 消息相关接口
  MESSAGE: {
    // TODO: 消息列表、消息发送等接口
  },
} as const;
```

### 端点详细说明

#### 用户接口

| 端点        | MTOP 接口                      | 功能描述         | 文档链接                                       |
| ----------- | ------------------------------ | ---------------- | ---------------------------------------------- |
| `USER.NAV`  | `mtop.idle.web.user.page.nav`  | 获取用户导航信息 | [用户接口文档](./03-user-api.md#-用户导航信息) |
| `USER.HEAD` | `mtop.idle.web.user.page.head` | 获取用户详细信息 | [用户接口文档](./03-user-api.md#-用户详细信息) |

#### 搜索接口

| 端点            | MTOP 接口                              | 功能描述 | 文档链接                           |
| --------------- | -------------------------------------- | -------- | ---------------------------------- |
| `SEARCH.SEARCH` | `mtop.taobao.idlemtopsearch.pc.search` | 商品搜索 | [搜索接口文档](./02-search-api.md) |

## 🔐 Token 相关常量

### Token 错误代码

```typescript
const TOKEN_ERROR_CODES = [
  "FAIL_SYS_TOKEN_EMPTY", // Token 为空
  "FAIL_SYS_TOKEN_ILLEGAL", // Token 非法/无效
  "FAIL_SYS_SESSION_EXPIRED", // 会话已过期
] as const;
```

### Token Cookie 配置

```typescript
// Token Cookie 名称
const TOKEN_COOKIE_NAME = "_m_h5_tk";

// Token Cookie 提取正则表达式
const TOKEN_COOKIE_REGEX = /_m_h5_tk=([^_]+)_/;
```

### Token 相关说明

| 常量                 | 值                    | 说明                                |
| -------------------- | --------------------- | ----------------------------------- |
| `TOKEN_COOKIE_NAME`  | `_m_h5_tk`            | 存储 API Token 的 Cookie 名称       |
| `TOKEN_COOKIE_REGEX` | `/_m_h5_tk=([^_]+)_/` | 从 Cookie 字符串中提取 Token 的正则 |

## 📊 枚举类型

### 日志级别

```typescript
enum LogLevel {
  ERROR = 0, // 错误级别 - 只显示错误信息
  WARN = 1, // 警告级别 - 显示警告和错误
  INFO = 2, // 信息级别 - 显示一般信息、警告和错误
  DEBUG = 3, // 调试级别 - 显示所有日志信息
}
```

### 搜索排序相关

#### 排序方式

```typescript
enum SortValue {
  DESC = "desc", // 降序排列
  ASC = "asc", // 升序排列
  CREDIT_DESC = "credit_desc", // 按信用降序排列
}
```

#### 排序字段

```typescript
enum SortField {
  PRICE = "price", // 按价格排序
  CREATE = "create", // 按发布时间排序
  REDUCE = "reduce", // 按降价幅度排序
  POSITION = "pos", // 按距离位置排序
  MODIFY = "modify", // 按修改时间排序
  CREDIT = "credit", // 按信用等级排序
}
```

### 搜索筛选相关

#### 快速筛选选项

```typescript
enum QuickFilter {
  PERSONAL = "filterPersonal", // 个人闲置
  APPRAISE = "filterAppraise", // 验货宝
  GAME_ACCOUNT = "gameAccountInsurance", // 验号担保
  FREE_POSTAGE = "filterFreePostage", // 包邮
  HIGH_LEVEL_SELLER = "filterHighLevelYxpSeller", // 超赞鱼小铺
  NEW = "filterNew", // 全新
  INSPECTED = "inspectedPhone", // 严选
  ONE_KEY_RESELL = "filterOneKeyResell", // 转卖
}
```

#### 发布时间筛选

```typescript
enum PublishDays {
  ONE_DAY = "1", // 1天内发布
  THREE_DAYS = "3", // 3天内发布
  SEVEN_DAYS = "7", // 7天内发布
  FOURTEEN_DAYS = "14", // 14天内发布
}
```

## ⚙️ 默认配置

### SDK 默认配置

```typescript
const DEFAULT_CONFIG: GoofishConfig = {
  // 基本配置
  level: LogLevel.INFO,
  cookie: "",

  // API 配置（继承自 API_CONFIG）
  baseURL: API_CONFIG.BASE_URL,
  apiPrefix: API_CONFIG.API_PREFIX,
  appKey: API_CONFIG.APP_KEY,
  jsv: API_CONFIG.JSV,
  timeout: API_CONFIG.TIMEOUT,
  dataType: API_CONFIG.DATA_TYPE,
  type: API_CONFIG.TYPE,
  sessionOption: API_CONFIG.SESSION_OPTION,
  v: API_CONFIG.V,
  accountSite: API_CONFIG.ACCOUNT_SITE,
  origin: API_CONFIG.HEADERS_ORIGIN,
  referer: API_CONFIG.HEADERS_REFERER,
  contentType: API_CONFIG.HEADERS_CONTENT_TYPE,
  userAgent: API_CONFIG.HEADERS_USER_AGENT,
  spmCnt: API_CONFIG.SPM_CNT,
  spmPre: API_CONFIG.SPM_PRE,
  logId: API_CONFIG.LOG_ID,
};
```

### 搜索默认参数

```typescript
const DEFAULT_SEARCH_PARAMS = {
  pageNumber: 1, // 默认第一页
  rowsPerPage: 30, // 默认每页30条
  sortValue: undefined, // 默认综合排序
  sortField: undefined, // 默认排序字段
};
```

## 💡 常量使用示例

### 1. 使用配置常量

```typescript
import { API_CONFIG, API_ENDPOINTS } from "goofish-sdk";

// 自定义配置
const client = new Goofish({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT * 2, // 双倍超时时间
  userAgent: "Custom-Agent/1.0",
});

// 直接使用端点常量
console.log("搜索接口:", API_ENDPOINTS.SEARCH.SEARCH);
```

### 2. 使用枚举类型

```typescript
import { SortField, SortValue, QuickFilter, LogLevel } from "goofish-sdk";

// 搜索配置
const searchParams = {
  keyword: "iPhone",
  sortField: SortField.PRICE, // 按价格排序
  sortValue: SortValue.ASC, // 升序
  filter: {
    quickFilters: [
      QuickFilter.PERSONAL, // 个人闲置
      QuickFilter.FREE_POSTAGE, // 包邮
    ],
  },
};

// 日志配置
const client = new Goofish({
  level: LogLevel.DEBUG, // 调试模式
  cookie: "your-cookie",
});
```

### 3. Token 错误检查

```typescript
import { TOKEN_ERROR_CODES } from "goofish-sdk";

function isTokenError(ret: string[]): boolean {
  return ret.some((code) =>
    TOKEN_ERROR_CODES.some((errorCode) => code.includes(errorCode))
  );
}

// 使用示例
const response = await client.api.search.search({ keyword: "test" });
if (isTokenError(response.ret)) {
  console.log("需要重新登录");
}
```

### 4. 动态配置构建

```typescript
import { API_CONFIG } from "goofish-sdk";

// 环境相关配置
const config = {
  ...API_CONFIG,
  baseURL:
    process.env.NODE_ENV === "development"
      ? "https://dev-api.goofish.com"
      : API_CONFIG.BASE_URL,
  timeout: process.env.NODE_ENV === "development" ? 60000 : API_CONFIG.TIMEOUT,
};
```

## 🔍 常量查询表

### 快速查询：搜索筛选

| 中文名称   | 枚举值                          | 常量值                     |
| ---------- | ------------------------------- | -------------------------- |
| 个人闲置   | `QuickFilter.PERSONAL`          | `filterPersonal`           |
| 验货宝     | `QuickFilter.APPRAISE`          | `filterAppraise`           |
| 验号担保   | `QuickFilter.GAME_ACCOUNT`      | `gameAccountInsurance`     |
| 包邮       | `QuickFilter.FREE_POSTAGE`      | `filterFreePostage`        |
| 超赞鱼小铺 | `QuickFilter.HIGH_LEVEL_SELLER` | `filterHighLevelYxpSeller` |
| 全新       | `QuickFilter.NEW`               | `filterNew`                |
| 严选       | `QuickFilter.INSPECTED`         | `inspectedPhone`           |
| 转卖       | `QuickFilter.ONE_KEY_RESELL`    | `filterOneKeyResell`       |

### 快速查询：排序方式

| 中文名称 | 枚举值               | 常量值   | 说明           |
| -------- | -------------------- | -------- | -------------- |
| 价格排序 | `SortField.PRICE`    | `price`  | 按商品价格排序 |
| 发布时间 | `SortField.CREATE`   | `create` | 按发布时间排序 |
| 降价幅度 | `SortField.REDUCE`   | `reduce` | 按降价幅度排序 |
| 距离     | `SortField.POSITION` | `pos`    | 按位置距离排序 |
| 修改时间 | `SortField.MODIFY`   | `modify` | 按修改时间排序 |
| 信用     | `SortField.CREDIT`   | `credit` | 按信用等级排序 |

### 快速查询：MTOP 接口

| 功能     | MTOP 接口地址                          | SDK 方法                        |
| -------- | -------------------------------------- | ------------------------------- |
| 商品搜索 | `mtop.taobao.idlemtopsearch.pc.search` | `client.api.search.search()`    |
| 用户导航 | `mtop.idle.web.user.page.nav`          | `client.api.user.getUserNav()`  |
| 用户详情 | `mtop.idle.web.user.page.head`         | `client.api.user.getUserHead()` |

## ⚠️ 注意事项

1. **常量不可修改**：所有导出的常量都是只读的，不要尝试修改
2. **版本兼容性**：部分常量可能会随着平台更新而变化
3. **环境差异**：开发和生产环境可能需要不同的配置值
4. **安全性**：敏感配置（如 Cookie）不要硬编码在代码中

## 🔮 扩展说明

随着 SDK 功能的扩展，会不断添加新的常量和配置项：

- **商品管理相关常量**（规划中）
- **订单处理相关常量**（规划中）
- **消息通知相关常量**（规划中）
- **登录认证相关常量**（开发中）

---

> 📖 **使用建议**：建议收藏此页面作为开发时的快速参考，特别是枚举值和接口地址的查询。
