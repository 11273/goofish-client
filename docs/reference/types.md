# TypeScript 类型参考

本文档提供了 Goofish Client 中所有 TypeScript 类型的详细说明和使用指南。

## 重要声明

> ⚠️ **类型定义覆盖范围**  
> 本 Client 的 TypeScript 类型定义主要覆盖**成功响应**的数据结构。对于错误场景和失败状态，类型定义可能不够完整。建议开发者：
>
> 1. 在开发时启用 `LogLevel.DEBUG` 查看实际响应数据结构
> 2. 进行适当的空值检查和错误处理
> 3. 参考官方 API 文档获取最新的错误码和失败状态信息

## 通用响应类型

### GoofishMtopResponse

MTOP API 的统一响应格式：

```typescript
/**
 * Mtop API 响应基础结构
 */
interface GoofishMtopResponse<T = unknown> {
  api: string;
  data: T;
  ret: string[];
  v: string;
  traceId?: string;
}
```

### GoofishPassportResponse

Passport API 的统一响应格式：

```typescript
/**
 * Passport API 响应基础结构
 */
interface GoofishPassportResponse<T = unknown> {
  content: {
    data: T;
    status: number;
    success: boolean;
  };
  hasError: boolean;
}
```

## 核心配置类型

### GoofishConfig

Client 的主要配置接口：

```typescript
/**
 * 配置
 */
interface GoofishConfig {
  // 基本配置
  level: LogLevel;
  cookie: string;

  // 请求配置 mtop
  mtop: GoofishMtopRequestConfig;

  // 请求配置 passport
  passport: GoofishPassportRequestConfig;

  // 请求头
  headers: GoofishRequestHeaders;
}
```

### GoofishMtopRequestConfig

MTOP 请求配置：

```typescript
/**
 * Mtop 请求配置
 */
interface GoofishMtopRequestConfig {
  // API 配置
  baseURL: string;
  // API 前缀
  apiPrefix: string;
  // 应用密钥
  appKey: string;
  // JavaScript 版本
  jsv: string;
  // 超时时间
  timeout: number;
  // 数据类型
  dataType: string;
  // 请求类型
  type: string;
  // 会话选项
  sessionOption: string;
  // 版本号
  v: string;
  // 账户站点
  accountSite: string;
  // SPM 计数
  spmCnt: string;
  // SPM 前缀
  spmPre: string;
  // 日志 ID
  logId: string;
}
```

### GoofishPassportRequestConfig

Passport 请求配置：

```typescript
/**
 * Passport 请求配置
 */
interface GoofishPassportRequestConfig {
  // API 配置
  baseURL: string;
  // 应用名称
  appName: string;
  // 来源站点
  fromSite: string;
}
```

### GoofishRequestHeaders

请求头配置：

```typescript
/**
 * 请求头
 */
interface GoofishRequestHeaders {
  // User-Agent
  userAgent: string;
  // Origin
  origin: string;
  // Referer
  referer: string;
  // Content-Type
  contentType: string;
}
```

## 搜索相关类型

### SearchOptions

搜索参数配置：

```typescript
/**
 * 搜索参数
 */
interface SearchOptions {
  /** 搜索关键词 */
  keyword: string;

  /** 页码，默认: 1 */
  pageNumber?: number;

  /** 每页数量，默认: 30 */
  rowsPerPage?: number;

  /** 排序方式 默认：综合 */
  sortValue?: SortValue;

  /** 排序字段 */
  sortField?: SortField;

  /** 自定义距离范围（单位：米） */
  customDistance?: string;

  /** GPS坐标 */
  gps?: GPSCoordinate;

  /** 搜索筛选条件 */
  filter?: {
    /** 价格范围 */
    priceRange?: {
      /** 最低价格 */
      from: number;
      /** 最高价格，不填表示不限 */
      to?: number;
    };
    /** 发布时间筛选 */
    publishDays?: PublishDays;
    /** 快速筛选项 */
    quickFilters?: QuickFilter[];
  };

  /** 地区筛选 */
  locationFilter?: {
    /** 地区列表 */
    divisionList?: Array<{
      /** 省份 */
      province?: string;
      /** 城市 */
      city?: string;
      /** 区域 */
      area?: string;
    }>;
    /** 是否排除多地卖家，默认: false */
    excludeMultiPlacesSellers?: boolean;
    /** 额外地区信息，如"全国" */
    extraDivision?: string;
  };

  /** 用户当前位置信息 */
  userPosition?: {
    /** 省份 */
    province: string;
    /** 城市 */
    city: string;
    /** 区/县 */
    district?: string;
  };
}
```

### SearchResponse

搜索响应数据：

```typescript
interface SearchResponse {
  appBar: Record<string, unknown>;
  filterBar: FilterBar;
  needDecryptKeys: string[];
  resultInfo: ResultInfo;
  resultList: SearchResultItem[];
  resultPrefixBar: unknown[];
  tabList: unknown[];
  topList: unknown[];
}
```

### SearchResultItem

搜索结果项：

```typescript
interface SearchResultItem {
  data: {
    item: {
      main: SearchItemMain;
    };
    template: Template;
    templateSingle: Template;
  };
  style: string;
  type: string;
}
```

### GPSCoordinate

GPS 坐标：

```typescript
/**
 * GPS坐标
 */
interface GPSCoordinate {
  /** 纬度 */
  latitude: number;
  /** 经度 */
  longitude: number;
}
```

### 搜索枚举类型

#### SortValue

排序方式：

```typescript
/**
 * 排序方式
 */
enum SortValue {
  /** 降序 */
  DESC = "desc",
  /** 升序 */
  ASC = "asc",
  /** 信用降序 */
  CREDIT_DESC = "credit_desc",
}
```

#### SortField

排序字段：

```typescript
/**
 * 排序字段
 */
enum SortField {
  /** 价格 */
  PRICE = "price",
  /** 发布时间 */
  CREATE = "create",
  /** 降价幅度 */
  REDUCE = "reduce",
  /** 位置距离 */
  POSITION = "pos",
  /** 修改时间 */
  MODIFY = "modify",
  /** 信用 */
  CREDIT = "credit",
}
```

#### QuickFilter

快速筛选类型：

```typescript
/**
 * 快速筛选类型
 */
enum QuickFilter {
  /** 个人闲置 */
  PERSONAL = "filterPersonal",
  /** 验货宝 */
  APPRAISE = "filterAppraise",
  /** 验号担保 */
  GAME_ACCOUNT = "gameAccountInsurance",
  /** 包邮 */
  FREE_POSTAGE = "filterFreePostage",
  /** 超赞鱼小铺 */
  HIGH_LEVEL_SELLER = "filterHighLevelYxpSeller",
  /** 全新 */
  NEW = "filterNew",
  /** 严选 */
  INSPECTED = "inspectedPhone",
  /** 转卖 */
  ONE_KEY_RESELL = "filterOneKeyResell",
}
```

#### PublishDays

发布天数筛选：

```typescript
/**
 * 发布天数筛选
 */
enum PublishDays {
  /** 1天内 */
  ONE_DAY = "1",
  /** 3天内 */
  THREE_DAYS = "3",
  /** 7天内 */
  SEVEN_DAYS = "7",
  /** 14天内 */
  FOURTEEN_DAYS = "14",
}
```

## 用户相关类型

### UserNavResponse

用户导航响应：

```typescript
interface UserNavResponse {
  /** 模块数据 */
  module: UserNavModule;
}

interface UserNavModule {
  /** 用户基础信息 */
  base: UserNavBase;
}

interface UserNavBase {
  /** 未付款订单数量 */
  buyerNotPayCount: number;
  /** 购买次数 */
  purchaseCount: number;
  /** 显示名称 */
  displayName: string;
  /** 头像URL */
  avatar: string;
  /** 出售次数 */
  soldCount: number;
  /** 关注者数量 */
  followers: string;
  /** 关注数量 */
  following: string;
  /** 收藏数量 */
  collectionCount: number;
}
```

### UserHeadResponse

用户头部响应：

```typescript
interface UserHeadResponse {
  /** 基础信息 */
  baseInfo: UserHeadBaseInfo;
  /** 模块数据 */
  module: UserHeadModule;
}

interface UserHeadBaseInfo {
  /** 加密用户ID */
  encryptedUserId: string;
  /** iOS验证状态 */
  iosVerify: boolean;
  /** KC用户ID */
  kcUserId: string;
  /** 是否为本人 */
  self: boolean;
  /** 用户标签 */
  tags: Record<string, boolean>;
  /** 用户类型 */
  userType: number;
}

interface UserHeadModule {
  /** 店铺信息 */
  shop: UserHeadShop;
  /** 社交信息 */
  social: UserHeadSocial;
  /** 标签页信息 */
  tabs: UserHeadTabs;
  /** 基础信息 */
  base: UserHeadBase;
}
```

## 二维码相关类型

### QrGenerateResponse

二维码生成响应：

```typescript
/**
 * 二维码生成响应
 */
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

### QRCodeGenerateParams

二维码生成参数：

```typescript
/**
 * 二维码生成参数
 */
interface QRCodeGenerateParams {
  /** 应用名称 */
  appName?: string;
  /** 来源站点 */
  fromSite?: string;
  /** 应用入口 */
  appEntrance?: string;
  /** 跨站请求伪造令牌 */
  _csrf_token?: string;
  /** 用户标识令牌 */
  umidToken?: string;
  /** 用户代理 */
  hsiz?: string;
  /** 业务参数 */
  bizParams?: string;
  /** 是否为主页 */
  mainPage?: boolean;
  /** 是否为移动设备 */
  isMobile?: boolean;
  /** 语言 */
  lang?: string;
  /** 返回URL */
  returnUrl?: string;
  /** 用户代理 */
  "bx-ua"?: string;
  /** 用户标识令牌 */
  "bx-umidtoken"?: string;
  /** 是否加载 */
  bx_et?: string;
  /** 用户标识标签 */
  umidTag?: string;
}
```

### QrQueryResponse

二维码查询响应：

```typescript
/**
 * 二维码查询响应数据
 */
interface QrQueryResponse {
  /** 二维码状态 */
  qrCodeStatus: QRCodeStatus;
  /** 结果码 */
  resultCode: number;
  /** 标题消息（错误时显示） */
  titleMsg?: string;
}
```

### QRCodeQueryParams

二维码查询参数：

```typescript
/**
 * 二维码查询参数
 */
interface QRCodeQueryParams {
  /** 时间戳 */
  t: number | string;
  /** cookie值 */
  ck: string;
  /** 用户代理 */
  ua?: string;
  /** 应用名称（如果不传会使用默认配置） */
  appName?: string;
  /** 应用入口 */
  appEntrance?: string;
  /** 跨站请求伪造令牌 */
  _csrf_token?: string;
  /** 用户标识令牌 */
  umidToken?: string;
  /** 用户代理hash */
  hsiz?: string;
  /** 业务参数 */
  bizParams?: string;
  /** 是否为主页面 */
  mainPage?: boolean;
  /** 是否为移动端 */
  isMobile?: boolean;
  /** 语言 */
  lang?: string;
  /** 返回URL */
  returnUrl?: string;
  /** 来源站点（如果不传会使用默认配置） */
  fromSite?: string;
  /** 用户标识标签 */
  umidTag?: string;
  /** 导航语言 */
  navlanguage?: string;
  /** 导航用户代理 */
  navUserAgent?: string;
  /** 导航平台 */
  navPlatform?: string;
  /** 是否为iframe */
  isIframe?: boolean;
  /** 文档引用页 */
  documentReferer?: string;
  /** 默认视图 */
  defaultView?: string;
  /** 设备ID */
  deviceId?: string;
  /** 页面跟踪ID */
  pageTraceId?: string;
  /** bx用户代理 */
  "bx-ua"?: string;
  /** bx用户标识令牌 */
  "bx-umidtoken"?: string;
  /** bx加载状态 */
  bx_et?: string;
}
```

### QRCodeStatus

二维码状态枚举：

```typescript
/**
 * 二维码状态枚举
 */
enum QRCodeStatus {
  /** 新生成 */
  NEW = "NEW",
  /** 已扫描 */
  SCANED = "SCANED",
  /** 已确认 */
  CONFIRMED = "CONFIRMED",
  /** 已取消 */
  CANCELED = "CANCELED",
  /** 已过期 */
  EXPIRED = "EXPIRED",
  /** 错误 */
  ERROR = "ERROR",
}
```

## 请求相关类型

### RequestOptions

基础请求选项：

```typescript
/**
 * 基础请求选项
 */
interface RequestOptions<TData> {
  /** API 接口名称 */
  api: string;

  /** 请求方法 */
  method?: Method;

  /** 请求数据 */
  data?: TData;

  /** 请求参数 */
  params?: Record<string, unknown>;

  /** API 版本，默认 1.0 */
  version?: string;

  /** 是否需要签名，默认 true */
  needSign?: boolean;

  /** 是否自动刷新 Token，默认 true */
  autoRefreshToken?: boolean;

  /** 重试次数，默认 3 */
  retryTimes?: number;

  /** 自定义 Axios 配置 */
  config?: AxiosRequestConfig;

  /** 扩展配置 */
  extra?: Record<string, unknown>;
}
```

### InternalRequestOptions

内部请求选项：

```typescript
/**
 * 内部请求选项（合并了默认值）
 */
interface InternalRequestOptions<TData>
  extends Required<Omit<RequestOptions<TData>, "data" | "config" | "extra">> {
  data?: TData;
  config?: AxiosRequestConfig;
  extra?: Record<string, unknown>;
}
```

## 日志相关类型

### LogLevel

日志级别枚举：

```typescript
/**
 * 日志级别枚举
 */
enum LogLevel {
  /** 只显示错误 */
  ERROR = 0,
  /** 显示警告和错误 */
  WARN = 1,
  /** 显示信息、警告和错误 */
  INFO = 2,
  /** 显示所有日志 */
  DEBUG = 3,
}
```

## 类型守卫和工具类型

### 类型守卫

用于运行时类型检查的工具函数：

```typescript
/**
 * 检查是否为成功的MTOP响应
 */
function isSuccessMtopResponse<T>(
  response: GoofishMtopResponse<T>
): response is GoofishMtopResponse<T> & {
  ret: ["SUCCESS::调用成功"];
  data: T;
} {
  return response.ret[0] === "SUCCESS::调用成功" && response.data !== undefined;
}

/**
 * 检查是否为成功的Passport响应
 */
function isSuccessPassportResponse<T>(
  response: GoofishPassportResponse<T>
): response is GoofishPassportResponse<T> & {
  content: { success: true; data: T };
} {
  return (
    response.content.success === true && response.content.data !== undefined
  );
}

/**
 * 检查是否为有效的搜索结果
 */
function hasSearchResults(
  response: GoofishMtopResponse<SearchResponse>
): response is GoofishMtopResponse<SearchResponse> & {
  ret: ["SUCCESS::调用成功"];
  data: SearchResponse & { resultList: SearchResultItem[] };
} {
  return (
    isSuccessMtopResponse(response) &&
    Array.isArray(response.data.resultList) &&
    response.data.resultList.length > 0
  );
}
```

### 工具类型

```typescript
/**
 * 提取商品基本信息的工具类型
 */
type ProductBasicInfo = Pick<
  ExContent,
  "itemId" | "title" | "price" | "area" | "picUrl" | "userNickName"
>;

/**
 * 可选的搜索参数
 */
type OptionalSearchParams = Partial<Omit<SearchOptions, "keyword">>;

/**
 * 搜索结果项的简化类型
 */
type SimpleSearchResult = {
  id: string;
  title: string;
  price: string;
  area: string;
  image: string;
  seller: string;
  detailUrl: string;
};
```

## 使用示例

### 类型安全的 API 调用

```typescript
import {
  Goofish,
  SearchOptions,
  SearchResponse,
  SortField,
  SortValue,
  isSuccessMtopResponse,
  hasSearchResults,
  GoofishMtopResponse,
} from "goofish-client";

async function typeSafeSearch(client: Goofish, keyword: string) {
  // 类型安全的搜索参数
  const searchOptions: SearchOptions = {
    keyword,
    pageNumber: 1,
    rowsPerPage: 20,
    sortField: SortField.PRICE,
    sortValue: SortValue.ASC,
  };

  try {
    // API调用
    const response: GoofishMtopResponse<SearchResponse> =
      await client.api.mtop.search.search(searchOptions);

    // 类型守卫检查
    if (hasSearchResults(response)) {
      // TypeScript 知道这里 response.data.resultList 一定存在且不为空
      response.data.resultList.forEach((item) => {
        const info = item.data.item.main.exContent;
        console.log(
          `${info.title} - ${info.price.map((p) => p.text).join("")}`
        );
      });

      return response.data.resultList;
    } else if (isSuccessMtopResponse(response)) {
      // 成功但没有结果
      console.log("搜索成功但没有找到商品");
      return [];
    } else {
      // 错误响应
      console.error("搜索失败:", response.ret);
      throw new Error("搜索失败");
    }
  } catch (error) {
    console.error("搜索异常:", error);
    throw error;
  }
}
```

## 最佳实践

1. **始终使用类型守卫**：避免直接访问可能不存在的属性
2. **处理边界情况**：检查数组长度、对象属性存在性
3. **使用工具类型**：提取常用的类型组合
4. **错误处理**：对于可能失败的操作，始终添加错误处理
5. **调试模式**：在开发时启用 `LogLevel.DEBUG` 查看实际数据结构

::: warning 重要提醒

- 类型定义会随着平台 API 的更新而变化
- 建议定期检查和更新类型定义
- 对于复杂的业务逻辑，建议添加运行时验证
- 生产环境中请妥善处理所有可能的错误场景
  :::

## 相关链接

- [API 配置](../api/configuration.md) - 了解配置选项
- [搜索接口](../api/search.md) - 搜索相关类型的详细说明
- [用户接口](../api/user.md) - 用户相关类型的详细说明
- [认证接口](../api/authentication.md) - 二维码登录相关类型的详细说明
