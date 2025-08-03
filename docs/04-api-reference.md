# API 接口参考

> 完整的 Goofish SDK API 参考文档，包括所有接口、参数和响应格式。

## 📚 目录

- [客户端实例](#️-客户端实例)
- [搜索服务](#-搜索服务)
- [用户服务](#-用户服务)
- [通用响应格式](#-通用响应格式)
- [错误处理](#-错误处理)
- [类型定义](#️-类型定义)

## 🏗️ 客户端实例

### Goofish 类

主要的 SDK 客户端类，用于初始化和管理所有服务。

```typescript
class Goofish {
  constructor(config: Partial<GoofishConfig>);

  // 服务访问器
  readonly api: {
    search: SearchService;
    user: UserService;
  };

  // 方法
  getConfig(): Readonly<GoofishConfig>;
  updateCookie(cookie: string): void;
  get httpClient(): HttpClient;
}
```

### 配置接口

```typescript
interface GoofishConfig {
  // 基本配置
  level: LogLevel; // 日志级别
  cookie: string; // 登录 cookie

  // API 配置
  baseURL: string; // API 基础地址
  apiPrefix: string; // API 前缀
  appKey: string; // 应用密钥
  jsv: string; // JS 版本
  timeout: number; // 请求超时时间
  dataType: string; // 数据类型
  type: string; // 请求类型
  userAgent: string; // 用户代理
  sessionOption: string; // 会话选项
  v: string; // API 版本
  accountSite: string; // 账户站点
  origin: string; // 请求来源
  referer: string; // 引用页面
  contentType: string; // 内容类型
  spmCnt: string; // SPM 计数
  spmPre: string; // SPM 前缀
  logId: string; // 日志 ID
}
```

### 初始化示例

```typescript
// 基础初始化
const client = new Goofish({
  cookie: "your-cookie-string",
  level: LogLevel.INFO,
});

// 完整配置初始化
const client = new Goofish({
  level: LogLevel.DEBUG,
  cookie: "cookie2=xxx; _m_h5_tk=xxx;",
  baseURL: "https://h5api.m.goofish.com",
  timeout: 30000,
  userAgent: "Custom User Agent",
});
```

## 🔍 搜索服务

### SearchService 类

```typescript
class SearchService extends BaseService {
  search(params: SearchOptions): Promise<GoofishResponse<SearchResponse>>;
}
```

### search() 方法

**描述**：搜索商品  
**API 端点**：`mtop.taobao.idlemtopsearch.pc.search`

**参数**：

```typescript
interface SearchOptions {
  // 必填参数
  keyword: string; // 搜索关键词

  // 可选参数
  pageNumber?: number; // 页码（默认: 1）
  rowsPerPage?: number; // 每页数量（默认: 30）
  sortValue?: SortValue; // 排序方式
  sortField?: SortField; // 排序字段
  customDistance?: string; // 自定义距离范围（米）
  gps?: GPSCoordinate; // GPS 坐标
  filter?: SearchFilter; // 筛选条件
  locationFilter?: LocationFilter; // 地区筛选
  userPosition?: UserPosition; // 用户位置
}
```

**详细类型定义**：

```typescript
// GPS 坐标
interface GPSCoordinate {
  latitude: number; // 纬度
  longitude: number; // 经度
}

// 筛选条件
interface SearchFilter {
  priceRange?: {
    // 价格范围
    from: number; // 最低价格
    to?: number; // 最高价格
  };
  publishDays?: PublishDays; // 发布时间
  quickFilters?: QuickFilter[]; // 快速筛选
}

// 地区筛选
interface LocationFilter {
  divisionList?: Array<{
    province?: string; // 省份
    city?: string; // 城市
    area?: string; // 区域
  }>;
  excludeMultiPlacesSellers?: boolean; // 排除多地卖家
  extraDivision?: string; // 额外地区
}

// 用户位置
interface UserPosition {
  province: string; // 省份
  city: string; // 城市
  district?: string; // 区/县
}
```

**枚举类型**：

```typescript
// 排序方式
enum SortValue {
  DESC = "desc", // 降序
  ASC = "asc", // 升序
  CREDIT_DESC = "credit_desc", // 信用降序
}

// 排序字段
enum SortField {
  PRICE = "price", // 价格
  CREATE = "create", // 发布时间
  REDUCE = "reduce", // 降价幅度
  POSITION = "pos", // 位置距离
  MODIFY = "modify", // 修改时间
  CREDIT = "credit", // 信用
}

// 发布时间筛选
enum PublishDays {
  ONE_DAY = "1", // 1天内
  THREE_DAYS = "3", // 3天内
  SEVEN_DAYS = "7", // 7天内
  FOURTEEN_DAYS = "14", // 14天内
}

// 快速筛选
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

**响应格式**：

```typescript
interface SearchResponse {
  appBar: Record<string, unknown>; // 应用栏数据
  filterBar: FilterBar; // 筛选栏数据
  needDecryptKeys: string[]; // 需要解密的字段
  resultInfo: ResultInfo; // 结果统计信息
  resultList: SearchResultItem[]; // 商品列表
  resultPrefixBar: unknown[]; // 结果前缀栏
  tabList: unknown[]; // 标签页列表
  topList: unknown[]; // 置顶列表
}
```

## 👤 用户服务

### UserService 类

```typescript
class UserService extends BaseService {
  getUserNav(): Promise<GoofishResponse<UserNavResponse>>;
  getUserHead(): Promise<GoofishResponse<UserHeadResponse>>;
}
```

### getUserNav() 方法

**描述**：获取用户导航信息  
**API 端点**：`mtop.idle.web.user.page.nav`  
**参数**：无

**响应格式**：

```typescript
interface UserNavResponse {
  userInfo: {
    userId: string; // 用户ID
    nickName: string; // 用户昵称
    avatarUrl: string; // 头像链接
    realName?: string; // 真实姓名
  };
  statistics: {
    followCount: number; // 关注数
    fanCount: number; // 粉丝数
    publishCount: number; // 发布宝贝数
    soldCount: number; // 已卖出数量
  };
  navItems: Array<{
    title: string; // 菜单标题
    url: string; // 跳转链接
    icon?: string; // 图标链接
    badge?: number; // 徽章数字
  }>;
  userStatus: {
    isVerified: boolean; // 是否已认证
    creditLevel: string; // 信用等级
    vipLevel?: string; // VIP等级
  };
}
```

### getUserHead() 方法

**描述**：获取用户头部详细信息  
**API 端点**：`mtop.idle.web.user.page.head`  
**参数**：

```typescript
{
  self: true; // 固定参数
}
```

**响应格式**：

```typescript
interface UserHeadResponse {
  userDetail: {
    userId: string; // 用户ID
    nickName: string; // 用户昵称
    avatarUrl: string; // 头像链接
    realName?: string; // 真实姓名
    signature?: string; // 个人签名
    location?: string; // 所在地区
    joinDate?: string; // 注册时间
  };
  detailStatistics: {
    publishCount: number; // 发布宝贝总数
    soldCount: number; // 已卖出数量
    onSaleCount: number; // 在售商品数量
    wantCount: number; // 想要数量
    followCount: number; // 关注数
    fanCount: number; // 粉丝数
    praiseCount: number; // 获赞数
    dealCount: number; // 成交次数
    dealAmount?: number; // 成交金额
  };
  creditInfo: {
    creditLevel: string; // 信用等级
    creditScore: number; // 信用分数
    badges: Array<{
      name: string; // 徽章名称
      icon: string; // 徽章图标
      description: string; // 徽章描述
    }>;
  };
  verificationInfo: {
    isRealNameVerified: boolean; // 实名认证
    isPhoneVerified: boolean; // 手机认证
    isEmailVerified: boolean; // 邮箱认证
    isIdCardVerified: boolean; // 身份证认证
  };
  shopInfo?: {
    shopId: string; // 商铺ID
    shopName: string; // 商铺名称
    shopLevel: string; // 商铺等级
    shopDescription: string; // 商铺描述
  };
}
```

## 📨 通用响应格式

所有 API 接口都返回统一的响应格式：

```typescript
interface GoofishResponse<T> {
  api: string; // API 名称
  ret: string[]; // 返回状态码数组
  data: T; // 响应数据
  v: string; // 版本号
}
```

### 成功响应示例

```typescript
{
  "api": "mtop.taobao.idlemtopsearch.pc.search",
  "ret": ["SUCCESS::调用成功"],
  "data": {
    // 具体的响应数据
  },
  "v": "1.0"
}
```

### 错误响应示例

```typescript
{
  "api": "mtop.taobao.idlemtopsearch.pc.search",
  "ret": ["FAIL_SYS_TOKEN_ILLEGAL::令牌非法"],
  "data": null,
  "v": "1.0"
}
```

## ❌ 错误处理

### 错误类型

1. **Token 错误**：

   - `FAIL_SYS_TOKEN_EMPTY`：Token 为空
   - `FAIL_SYS_TOKEN_ILLEGAL`：Token 非法
   - `FAIL_SYS_SESSION_EXPIRED`：会话过期

2. **网络错误**：

   - 超时错误
   - 连接错误
   - 服务不可用

3. **参数错误**：
   - 必填参数缺失
   - 参数格式错误
   - 参数值超出范围

### 错误处理示例

```typescript
try {
  const result = await client.api.search.search({
    keyword: "test",
  });

  // 检查响应状态
  if (result.ret[0].startsWith("SUCCESS")) {
    console.log("请求成功:", result.data);
  } else {
    console.error("API 错误:", result.ret);
  }
} catch (error) {
  if (error.response) {
    // 服务器响应错误
    console.error("响应错误:", error.response.status);
  } else if (error.request) {
    // 网络请求错误
    console.error("网络错误:", error.message);
  } else {
    // 其他错误
    console.error("未知错误:", error.message);
  }
}
```

## 🏷️ 类型定义

### 日志级别

```typescript
enum LogLevel {
  ERROR = 0, // 错误
  WARN = 1, // 警告
  INFO = 2, // 信息
  DEBUG = 3, // 调试
}
```

### 请求配置

```typescript
interface RequestOptions<TData = unknown> {
  api: string; // API 端点
  data?: TData; // 请求数据
  method?: string; // HTTP 方法
  config?: Partial<HttpRequestConfig>; // 额外配置
}

interface HttpRequestConfig {
  url: string; // 请求URL
  method: string; // HTTP方法
  data?: any; // 请求体数据
  params?: any; // URL参数
  headers?: Record<string, string>; // 请求头
  timeout?: number; // 超时时间
  withCredentials?: boolean; // 是否携带凭证
}
```

### 构建参数输出

```typescript
interface BuildParamsOutput {
  appKey: string; // 应用密钥
  jsv: string; // JS版本
  dataType: string; // 数据类型
  type: string; // 请求类型
  sessionOption: string; // 会话选项
  t: number; // 时间戳
  v: string; // 版本号
  accountSite: string; // 账户站点
  timeout: number; // 超时时间
  api: string; // API名称
  sign: string; // 签名
  spm_cnt: string; // SPM计数
  spm_pre: string; // SPM前缀
  log_id: string; // 日志ID
}
```

## 🔗 常量引用

### API 端点

```typescript
const API_ENDPOINTS = {
  USER: {
    NAV: "mtop.idle.web.user.page.nav", // 用户导航
    HEAD: "mtop.idle.web.user.page.head", // 用户头部
  },
  SEARCH: {
    SEARCH: "mtop.taobao.idlemtopsearch.pc.search", // 商品搜索
  },
  // 更多端点...
};
```

### Token 相关

```typescript
const TOKEN_ERROR_CODES = [
  "FAIL_SYS_TOKEN_EMPTY", // Token为空
  "FAIL_SYS_TOKEN_ILLEGAL", // Token非法
  "FAIL_SYS_SESSION_EXPIRED", // 会话过期
];

const TOKEN_COOKIE_NAME = "_m_h5_tk"; // Token Cookie名称
const TOKEN_COOKIE_REGEX = /_m_h5_tk=([^_]+)_/; // Token提取正则
```

## 📖 使用建议

1. **类型安全**：使用 TypeScript 获得完整的类型提示
2. **错误处理**：始终检查响应状态和处理异常
3. **请求频率**：合理控制 API 调用频率
4. **配置管理**：使用环境变量管理敏感配置
5. **日志调试**：适当的日志级别有助于问题排查

---

> 📚 **参考提示**：此文档涵盖了 SDK 的所有公开 API，建议结合具体的使用场景文档一起阅读。
