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

## 首页相关类型

### HomeFeedRequest

首页 Feed 请求参数：

```typescript
/**
 * 首页Feed请求参数
 */
interface HomeFeedRequest {
  /** 商品ID，用于分页定位 */
  itemId?: string;
  /** 每页大小 */
  pageSize?: number;
  /** 页码 */
  pageNumber?: number;
  /** 机器ID */
  machId?: string;
}
```

### HomeFeedResponse

首页 Feed 响应数据：

```typescript
/**
 * 首页Feed响应数据
 */
interface HomeFeedResponse {
  /** 是否异步 */
  asyn: boolean;
  /** 卡片列表 */
  cardList: ItemCard[];
  /** Feed数量 */
  feedsCount: number;
  /** 是否有下一页 */
  nextPage: boolean;
  /** 服务器时间 */
  serverTime: string;
}
```

### ItemCard

商品卡片：

```typescript
/**
 * 商品卡片
 */
interface ItemCard {
  /** 卡片数据 */
  cardData: ItemCardData;
  /** 卡片类型 */
  cardType: number;
}
```

### ItemCardData

商品卡片数据：

```typescript
/**
 * 商品卡片数据
 */
interface ItemCardData {
  /** 商品ID */
  itemId: string;
  /** 标题摘要 */
  titleSummary: TitleSummary;
  /** 价格信息 */
  priceInfo: PriceInfo;
  /** 城市 */
  city: string;
  /** 用户信息 */
  user: UserInfo;
  /** 商品图片列表 */
  images: ItemImage[];
  /** 主图信息 */
  mainPicInfo: ItemImage;
  /** Fish标签 */
  fishTags: HomeFishTags;
  /** 业务类型 */
  bizType: string;
  /** 拍卖类型 */
  auctionType: string;
  /** 属性映射 */
  attributeMap: Record<string, string>;
  /** 详情参数 */
  detailParams: Record<string, unknown>;
  /** 跟踪参数 */
  trackParams: Record<string, unknown>;
  /** 不喜欢跟踪参数 */
  dislikeTrackParams: Record<string, unknown>;
  /** 重定向URL */
  redirectUrl: string;
  /** 是否需要粉丝价 */
  needFansPrice: boolean;
  /** 是否需要促销价 */
  needPromotionPrice: boolean;
  /** 热点信息 */
  hotPoint: {
    text: string;
    topTags: unknown[];
  };
  /** 是否用户命中标签新样式 */
  isUserHitLabelNewStyle: boolean;
  /** 标签自定义业务参数 */
  labelCustomBizParam: Record<string, string>;
  /** 日志器 */
  logger: Record<string, unknown>;
  /** 是否放置详情参数 */
  putDetailParams: boolean;
}
```

### ItemImage

商品图片信息（首页）：

```typescript
/**
 * 商品图片信息
 */
interface ItemImage {
  /** 图片地址 */
  url: string;
  /** 图片高度 */
  heightSize: number;
  /** 图片宽度 */
  widthSize: number;
  /** 是否主图 */
  major: boolean;
  /** 图片类型 */
  type: number;
}
```

### PriceInfo

商品价格信息：

```typescript
/**
 * 商品价格信息
 */
interface PriceInfo {
  /** 当前价格 */
  price: string;
  /** 原价 */
  oriPrice: string;
  /** 价格前缀 */
  preText: string;
  /** 价格后缀（如闲鱼币抵扣信息） */
  sufText?: string;
}
```

### UserInfo

用户信息（首页）：

```typescript
/**
 * 用户信息
 */
interface UserInfo {
  /** 用户昵称 */
  userNick: string;
  /** 用户头像 */
  avatar: string;
  /** 跟踪参数 */
  trackParams: {
    trackName: string;
  };
}
```

### TitleSummary

标题摘要：

```typescript
/**
 * 标题摘要
 */
interface TitleSummary {
  /** 标题文本 */
  text: string;
}
```

### HomeFishTags

首页 Fish 标签集合：

```typescript
/**
 * 首页Fish标签集合
 */
interface HomeFishTags {
  /** 第一行标签 */
  r1?: HomeTagRegion;
  /** 第二行标签 */
  r2?: HomeTagRegion;
  /** 第三行标签 */
  r3?: HomeTagRegion;
  /** 第四行标签 */
  r4?: HomeTagRegion;
}
```

### HomeTagRegion

首页标签区域：

```typescript
/**
 * 首页标签区域
 */
interface HomeTagRegion {
  /** 标签列表 */
  tagList: HomeTagItem[];
  /** 配置 */
  config: HomeTagConfig;
}
```

### HomeTagItem

首页标签项：

```typescript
/**
 * 首页标签项
 */
interface HomeTagItem {
  /** 标签数据 */
  data: HomeTagData;
  /** 用户跟踪参数 */
  utParams: {
    args: Record<string, string>;
    arg1: string;
  };
}
```

### HomeTagData

首页标签数据：

```typescript
/**
 * 首页标签数据
 */
interface HomeTagData {
  /** 标签内容 */
  content: string;
  /** 文字颜色 */
  color: string;
  /** 字体大小 */
  size: string;
  /** 标签ID */
  labelId: string;
  /** 行高 */
  lineHeight: string;
  /** 标签类型 */
  type: string;
  /** 背景色 */
  bgColor?: string;
  /** 边框半径 */
  borderRadius?: string;
  /** 边框左内边距 */
  borderPaddingLeft?: string;
  /** 边框右内边距 */
  borderPaddingRight?: string;
  /** 高度 */
  height?: string;
  /** 是否加粗 */
  bold?: string;
  /** 左边距 */
  marginLeft?: string;
  /** 右边距 */
  marginRight?: string;
  /** 宽度 */
  width?: string;
  /** 对齐方式 */
  alignment?: string;
  /** 图片地址 */
  url?: string;
}
```

### HomeTagConfig

首页标签配置：

```typescript
/**
 * 首页标签配置
 */
interface HomeTagConfig {
  /** 是否相互标签业务组 */
  mutualLabelBizGroup: string;
  /** 是否有分隔符 */
  hasDelimiter?: string;
  /** 分隔符颜色 */
  delimiterColor?: string;
  /** 分隔符高度 */
  delimiterHeight?: string;
  /** 分隔符位置 */
  delimiterPosition?: string;
  /** 分隔符宽度 */
  delimiterWidth?: string;
  /** 分隔符左边距 */
  delimiterMarginLeft?: string;
  /** 分隔符右边距 */
  delimiterMarginRight?: string;
}
```

## 商品相关类型

### ItemDetailRequest

商品详情请求参数：

```typescript
/**
 * 商品详情请求参数
 */
interface ItemDetailRequest {
  /** 商品ID */
  itemId: string;
}
```

### ItemDetailResponse

商品详情响应数据：

```typescript
/**
 * 商品详情响应数据
 */
interface ItemDetailResponse {
  /** B2C买家信息 */
  b2cBuyerDO: B2cBuyerDO;
  /** 商品信息 */
  itemDO: ItemDO;
  /** B2C卖家信息 */
  b2cSellerDO: B2cSellerDO;
  /** 卖家信息 */
  sellerDO: SellerDO;
  /** B2C商品信息 */
  b2cItemDO: B2cItemDO;
  /** 买家信息 */
  buyerDO: BuyerDO;
  /** UI倒计时信息 */
  uiCountDownInfoDO: UiCountDownInfoDO;
  /** B2C UI闲置详情配置 */
  b2cUiIdleDetailConfigDO: B2cUiIdleDetailConfigDO;
  /** 跟踪参数 */
  trackParams: DetailTrackParams;
  /** 海鲜信息 */
  seafoodDO: SeafoodDO;
  /** 配置信息 */
  configInfo: ConfigInfo;
  /** 服务器时间 */
  serverTime: string;
  /** 买家信息 */
  buyerDO: BuyerDO;
}
```

### ItemDO

商品详情信息：

```typescript
/**
 * 商品详情信息
 */
interface ItemDO {
  /** 商品ID */
  itemId: number;
  /** 商品标题 */
  title: string;
  /** 商品描述 */
  desc: string;
  /** 已售价格 */
  soldPrice: string;
  /** 原价 */
  originalPrice: string;
  /** 运费 */
  transportFee: string;
  /** 商品状态 */
  itemStatus: number;
  /** 商品状态字符串 */
  itemStatusStr: string;
  /** 浏览次数 */
  browseCnt: number;
  /** 收藏次数 */
  collectCnt: number;
  /** 想要次数 */
  wantCnt: number;
  /** 数量 */
  quantity: number;
  /** 图片信息列表 */
  imageInfos: ItemImageInfo[];
  /** 商品标签扩展列表 */
  itemLabelExtList: ItemLabelExt[];
  /** CPV标签列表 */
  cpvLabels: CpvLabel[];
  /** 富文本描述 */
  richTextDesc: string;
  /** 创建时间 */
  gmtCreate: number;
  /** 创建日期键 */
  GMT_CREATE_DATE_KEY: string;
  /** 分类ID */
  categoryId: number;
  /** 商品分类信息 */
  itemCatDTO: ItemCatDTO;
  /** 跟踪参数 */
  trackParams: ItemTrackParams;
  /** 安全指南 */
  secuGuide: SecuGuide;
  /** 慈善标签 */
  charitableTag: CharitableTag;
  // ... 其他字段
}
```

### SellerDO

卖家信息：

```typescript
/**
 * 卖家信息
 */
interface SellerDO {
  /** 卖家ID */
  sellerId: number;
  /** 昵称 */
  nick: string;
  /** 唯一名称 */
  uniqueName: string;
  /** 城市 */
  city: string;
  /** 发布城市 */
  publishCity: string;
  /** 签名 */
  signature: string;
  /** 头像URL */
  portraitUrl: string;
  /** 已售数量 */
  hasSoldNumInteger: number;
  /** 商品数量 */
  itemCount: number;
  /** 24小时回复率 */
  replyRatio24h: string;
  /** 30天平均回复时间 */
  avgReply30dLong: number;
  /** 回复间隔 */
  replyInterval: string;
  /** 最后访问时间 */
  lastVisitTime: string;
  /** 注册时间 */
  registerTime: number;
  /** 用户注册天数 */
  userRegDay: number;
  /** 芝麻认证 */
  zhimaAuth: boolean;
  /** 芝麻等级信息 */
  zhimaLevelInfo: ZhimaLevelInfo;
  /** 闲鱼信用标签 */
  idleFishCreditTag: IdleFishCreditTag;
  /** 身份标签 */
  identityTags: IdentityTag[];
  /** 等级标签 */
  levelTags: LevelTag[];
  /** 评价信息 */
  remarkDO: RemarkDO;
  /** 卖家商品 */
  sellerItems: SellerItem[];
  /** 闲鱼摘要 */
  xianyuSummary: string;
  // ... 其他字段
}
```

### ItemImageInfo

商品图片信息：

```typescript
/**
 * 商品图片信息
 */
interface ItemImageInfo {
  /** 是否主图 */
  major: boolean;
  /** 图搜URL */
  photoSearchUrl: string;
  /** 宽度 */
  widthSize: number;
  /** 高度 */
  heightSize: number;
  /** 类型 */
  type: number;
  /** 图片URL */
  url: string;
  /** 额外信息 */
  extraInfo: {
    raw: string;
    isT: string;
    isH: string;
  };
  /** 标签 */
  labels: unknown[];
}
```

### ItemLabelExt

商品标签扩展信息：

```typescript
/**
 * 商品标签扩展信息
 */
interface ItemLabelExt {
  /** 渠道分类ID */
  channelCateId: number;
  /** 标签ID */
  labelId: string;
  /** 标签类型 */
  labelType: string;
  /** 来源 */
  from: string;
  /** 标签文本 */
  text: string;
  /** 属性 */
  properties: string;
}
```

## 用户相关类型

### UserPageHeadRequest

用户页面头部请求参数：

```typescript
/**
 * 用户页面头部请求参数
 */
interface UserPageHeadRequest {
  /** 是否为本人 */
  self: boolean;
  /** 用户ID（当self为false时需要） */
  userId?: string;
}
```

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

## 认证相关类型

### LoginParams

登录参数：

```typescript
/**
 * 登录参数
 */
interface LoginParams {
  /** 登录ID（手机号/用户名） */
  loginId: string;
  /** 加密后的密码 */
  password2: string;
  /** 是否保持登录 */
  keepLogin?: boolean;
  /** 是否在iframe中 */
  isIframe?: boolean;
  /** 文档引用页 */
  documentReferer?: string;
  /** 默认视图 */
  defaultView?: string;
  /** 用户代理字符串 */
  ua?: string;
  /** 用户标识获取状态值 */
  umidGetStatusVal?: string | number;
  /** 屏幕像素 */
  screenPixel?: string;
  /** 导航语言 */
  navlanguage?: string;
  /** 导航用户代理 */
  navUserAgent?: string;
  /** 导航平台 */
  navPlatform?: string;
  /** 应用名称 */
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
  /** 来源站点 */
  fromSite?: string;
  /** 用户标识标签 */
  umidTag?: string;
  // ... 其他字段
}
```

### LoginResponse

登录响应数据：

```typescript
/**
 * 登录响应数据
 */
interface LoginResponse {
  /** 标题消息（错误时显示） */
  titleMsg?: string;
  /** 结果码 */
  resultCode?: number;
}
```

### LoginData

登录数据（用于 POST 请求 body）：

```typescript
/**
 * 登录数据（用于POST请求body）
 */
interface LoginData {
  /** 登录ID（手机号/用户名） */
  loginId: string;
  /** 加密后的密码 */
  password2: string;
  /** 是否保持登录 */
  keepLogin?: string;
  /** 是否在iframe中 */
  isIframe?: string;
  /** 文档引用页 */
  documentReferer?: string;
  /** 默认视图 */
  defaultView?: string;
  // ... 其他字段（与LoginParams相似但字段类型为string）
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

### HttpClientConfig

HTTP 客户端配置：

```typescript
/**
 * HTTP 客户端配置
 */
interface HttpClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  /** 原生 Axios 配置 */
  axiosConfig?: AxiosRequestConfig;
}
```

### HttpRequestConfig

扩展的请求配置：

```typescript
/**
 * 扩展的请求配置
 */
interface HttpRequestConfig extends AxiosRequestConfig {
  /** 跳过错误处理 */
  skipErrorHandler?: boolean;
}
```

### BuildParamsOutput

buildParams 方法的返回值类型：

```typescript
/**
 * buildParams 方法的返回值类型
 */
interface BuildParamsOutput {
  /** 应用密钥 */
  appKey: string;
  /** JavaScript 版本 */
  jsv: string;
  /** 数据类型 */
  dataType: string;
  /** 请求类型 */
  type: string;
  /** 会话选项 */
  sessionOption: string;
  /** 时间戳 */
  t: number;
  /** 版本号 */
  v: string;
  /** 账户站点 */
  accountSite: string;
  /** 超时时间 */
  timeout: number;
  /** API 接口名称 */
  api: string;
  /** 请求签名 */
  sign: string;
  /** SPM 计数 */
  spm_cnt: string;
  /** SPM 前缀 */
  spm_pre: string;
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

## 收藏类型

### FavorType

收藏类型枚举：

```typescript
enum FavorType {
  /** 全部 */
  DEFAULT = "DEFAULT",
  /** 降价宝贝 */
  REDUCE = "REDUCE",
  /** 有效宝贝 */
  VALID = "VALID",
  /** 失效宝贝 */
  INVALID = "INVALID",
}
```

### FavorItemListRequest

收藏商品列表请求参数：

```typescript
interface FavorItemListRequest {
  /** 页码，从1开始 */
  pageNumber: number;
  /** 每页条数 */
  rowsPerPage: number;
  /** 收藏类型 */
  type: FavorType;
}
```

### FavorItemListResponse

收藏商品列表响应：

```typescript
interface FavorItemListResponse {
  /** 收藏商品列表 */
  items: FavorItem[];
  /** 扩展信息 */
  ext: Record<string, unknown>;
  /** 需要解密的键 */
  needDecryptKeys: string[];
  /** 需要解密的键V2 */
  needDecryptKeysV2: string[];
  /** 服务器解密键 */
  serverDecryptKeys: string[];
  /** 是否有下一页 */
  nextPage: boolean;
  /** 总数量 */
  totalCount: number;
  /** 服务器时间 */
  serverTime: string;
}
```

### FavorItem

收藏商品详细信息：

```typescript
interface FavorItem {
  /** 商品ID */
  id: string;
  /** 长商品ID */
  longItemId: number;
  /** 商品标题 */
  title: string;
  /** 当前价格 */
  price: string;
  /** 原价 */
  originalPrice?: string;
  /** 降价金额 */
  reducePrice?: string;
  /** 主图URL */
  picUrl: string;
  /** 图片URL列表 */
  imageUrls: string[];
  /** 视频封面URL */
  videoCoverUrl?: string;
  /** 视频ID */
  videoid?: number;
  /** 用户昵称 */
  userNick: string;
  /** 用户头像 */
  userAvatar: string;
  /** 用户ID */
  userId: number;
  /** 芝麻信用等级 */
  zhimaLevel: number;
  /** 芝麻信用分数 */
  zhimaScore: number;
  /** 省份 */
  province: string;
  /** 城市 */
  city: string;
  /** 区域 */
  area: string;
  /** 分类ID */
  categoryId: number;
  /** 四级渠道分类 */
  channelCategoryLevel4?: number;
  /** 商品状态 */
  itemStatus: number;
  /** 拍卖类型 */
  auctionType: string;
  /** 是否可议价 */
  bargain: boolean;
  /** 是否包邮 */
  freeShip: boolean;
  /** 是否已收藏 */
  favored: boolean;
  /** 收藏数量 */
  favorNum: number;
  /** 超级收藏数量 */
  superFavorNum: number;
  /** 收藏数量 */
  collectNum: number;
  /** 评论数量 */
  commentNum: number;
  /** 想要数量 */
  wantUv: number;
  /** 浏览次数 */
  browseCount: number;
  /** 收藏时间 */
  favorTime: string;
  /** 首次修改时间 */
  firstModified?: string;
  /** 更新时间 */
  updateTime: string;
  /** 下架时间 */
  outStockTime?: string;
  /** 剩余秒数 */
  leftSecond: number;
  /** 是否已删除 */
  itemDeleted: boolean;
  /** 是否被小二删除 */
  deleteByXiaoer: boolean;
  /** 是否被小二入库 */
  instockByXiaoer: boolean;
  /** 商品详情类型 */
  itemDetailType: string;
  /** 是否简单商品 */
  simpleItem: boolean;
  /** 是否租赁商品 */
  rentItem: boolean;
  /** 是否转售 */
  resell: boolean;
  /** 是否闲鱼币商品 */
  idleCoinItem: boolean;
  /** 是否闲鱼币竞拍商品 */
  idleCoinBidItem: boolean;
  /** 是否闲鱼币立即购买商品 */
  idleCoinBuynowItem: boolean;
  /** 是否CC商品 */
  itemCC: boolean;
  /** 是否结构化房源 */
  structuredHouse: boolean;
  /** 是否需要扩展高度 */
  needExtendHeight: boolean;
  /** 是否位置感知 */
  locationAware: boolean;
  /** 是否已订阅 */
  subscribed: boolean;
  /** 是否评价 */
  appraise: boolean;
  /** 竞拍状态 */
  bidStatus: number;
  /** 服务状态 */
  serviceStatus: number;
  /** 离线状态 */
  offline: number;
  /** 桶ID */
  bucketId?: string;
  /** 卡片类型特殊定义 */
  cardTypeSpecialDefinition: number;
  /** 子标签 */
  subTags?: FavorItemSubTag[];
  /** 属性映射 */
  attributesMap?: Record<string, unknown>;
  /** 扩展信息 */
  ext?: Record<string, unknown>;
  /** 相似商品目标URL */
  similarityTargetUrl?: string;
  /** 想要目标URL */
  wantTargetUrl?: string;
  /** 用户标签URL来自服务器 */
  userTagUrlFromServer?: boolean;
}
```

### FavorItemSubTag

收藏商品子标签：

```typescript
interface FavorItemSubTag {
  /** 标签名称 */
  name: string;
  /** 搜索信息 */
  search?: {
    /** 省份 */
    province?: string;
    /** 城市 */
    city?: string;
  };
  /** 标签类型 */
  type: number;
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

### 首页 Feed 类型安全调用

```typescript
import {
  Goofish,
  HomeFeedRequest,
  HomeFeedResponse,
  GoofishMtopResponse,
  isSuccessMtopResponse,
} from "goofish-client";

async function getHomeFeedSafely(client: Goofish, params?: HomeFeedRequest) {
  // 类型安全的请求参数
  const request: HomeFeedRequest = {
    pageSize: params?.pageSize ?? 30,
    pageNumber: params?.pageNumber ?? 1,
    itemId: params?.itemId,
    machId: params?.machId,
  };

  try {
    // API调用
    const response: GoofishMtopResponse<HomeFeedResponse> =
      await client.api.mtop.home.getFeed(request);

    // 类型守卫检查
    if (isSuccessMtopResponse(response)) {
      // TypeScript 知道这里 response.data 一定存在
      const { cardList, feedsCount, nextPage } = response.data;

      // 提取商品信息
      const items = cardList.map((card) => ({
        itemId: card.cardData.itemId,
        title: card.cardData.titleSummary.text,
        price: {
          current: card.cardData.priceInfo.price,
          original: card.cardData.priceInfo.oriPrice,
        },
        seller: {
          nick: card.cardData.user.userNick,
          avatar: card.cardData.user.avatar,
        },
        images: card.cardData.images.map((img) => ({
          url: img.url,
          isMain: img.major,
        })),
        city: card.cardData.city,
        detailUrl: card.cardData.redirectUrl,
      }));

      return {
        success: true,
        data: {
          items,
          total: feedsCount,
          hasMore: nextPage,
        },
      };
    } else {
      // 错误响应
      return {
        success: false,
        error: response.ret[0] || "获取首页Feed失败",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "网络请求失败",
    };
  }
}
```

### 商品详情类型安全调用

```typescript
import {
  Goofish,
  ItemDetailRequest,
  ItemDetailResponse,
  GoofishMtopResponse,
  isSuccessMtopResponse,
} from "goofish-client";

async function getItemDetailSafely(client: Goofish, itemId: string) {
  // 类型安全的请求参数
  const request: ItemDetailRequest = {
    itemId,
  };

  try {
    // API调用
    const response: GoofishMtopResponse<ItemDetailResponse> =
      await client.api.mtop.item.getDetail(request);

    // 类型守卫检查
    if (isSuccessMtopResponse(response)) {
      // TypeScript 知道这里 response.data 一定存在
      const { itemDO, sellerDO } = response.data;

      // 提取商品信息
      const itemInfo = {
        id: itemDO.itemId,
        title: itemDO.title,
        price: itemDO.soldPrice,
        description: itemDO.desc,
        browseCnt: itemDO.browseCnt,
        collectCnt: itemDO.collectCnt,
        // 获取主图
        mainImage: itemDO.imageInfos.find((img) => img.major)?.url,
        // 获取所有图片
        images: itemDO.imageInfos.map((img) => ({
          url: img.url,
          isMain: img.major,
          width: img.widthSize,
          height: img.heightSize,
        })),
        // 卖家信息
        seller: {
          id: sellerDO.sellerId,
          nick: sellerDO.nick,
          city: sellerDO.city,
          avatar: sellerDO.portraitUrl,
          soldCount: sellerDO.hasSoldNumInteger,
          replyRate: sellerDO.replyRatio24h,
        },
      };

      return {
        success: true,
        data: itemInfo,
      };
    } else {
      // 错误响应
      return {
        success: false,
        error: response.ret[0] || "获取商品详情失败",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "网络请求失败",
    };
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

## 订单类型

### OrderStatus

订单状态枚举。

```typescript
enum OrderStatus {
  /** 全部 */
  ALL = "ALL",
  /** 待付款 */
  NOT_PAY = "NOT_PAY",
  /** 待发货 */
  NOT_SHIP = "NOT_SHIP",
  /** 待收货 */
  SHIPPED = "SHIPPED",
  /** 待评价 */
  NOT_RATE = "NOT_RATE",
  /** 退款中 */
  REFUND = "REFUND",
}
```

### BoughtListRequest

买到的订单列表请求参数。

```typescript
interface BoughtListRequest {
  /** 页码，从1开始 */
  pageNumber: number;
  /** 订单状态 */
  orderStatus: OrderStatus;
}
```

### BoughtListResponse

买到的订单列表响应数据。

```typescript
interface BoughtListResponse {
  /** 订单列表 */
  items: BoughtOrder[];
  /** 最后一行 */
  lastEndRow: string;
  /** 是否有下一页 */
  nextPage: string;
  /** 总数量 */
  totalCount: string;
}
```

### BoughtOrder

买到的订单详细信息。

```typescript
interface BoughtOrder {
  /** 通用数据 */
  commonData: OrderCommonData;
  /** 内容 */
  content: OrderContent;
  /** 头部 */
  head: OrderHead;
  /** 尾部 */
  tail: OrderTail;
}
```

### OrderCommonData

订单通用数据。

```typescript
interface OrderCommonData {
  /** 商品ID */
  itemId: string;
  /** 订单ID */
  orderId: string;
  /** 对方用户ID */
  peerUserId: string;
  /** 交易状态枚举 */
  tradeStatusEnum: string;
}
```

### OrderContent

订单内容信息。

```typescript
interface OrderContent {
  /** 数据 */
  data: {
    /** 详情信息 */
    detailInfo: OrderDetailInfo;
    /** 价格信息 */
    priceInfo: OrderPriceInfo;
  };
}

interface OrderDetailInfo {
  /** 商品标题 */
  auctionTitle: string;
  /** 商品图片URL */
  auctionPic: string;
  /** 其他详情字段 */
  [key: string]: unknown;
}

interface OrderPriceInfo {
  /** 价格 */
  price: string;
  /** 购买数量 */
  buyAmount: string;
  /** 其他价格字段 */
  [key: string]: unknown;
}
```

### OrderHead

订单头部信息。

```typescript
interface OrderHead {
  /** 数据 */
  data: {
    /** 用户信息 */
    userInfo: OrderUserInfo;
    /** 状态展示信息 */
    statusViewMsg: string;
    /** 创建时间 */
    createTime: string;
    /** 其他头部字段 */
    [key: string]: unknown;
  };
}

interface OrderUserInfo {
  /** 用户ID */
  userId: string;
  /** 用户昵称 */
  userNick: string;
  /** 用户头像URL */
  userIcon: string;
  /** 其他用户字段 */
  [key: string]: unknown;
}
```

### OrderTail

订单尾部信息。

```typescript
interface OrderTail {
  /** 数据 */
  data: {
    /** 按钮列表 */
    btnList: OrderButton[];
    /** 其他尾部字段 */
    [key: string]: unknown;
  };
}

interface OrderButton {
  /** 按钮名称 */
  name: string;
  /** 交易操作类型 */
  tradeAction: string;
  /** 样式 */
  style: string;
  /** 是否展开 */
  expanded: string;
  /** 点击事件 */
  clickEvent?: {
    /** 数据 */
    data?: {
      /** URL */
      url?: string;
      /** 代码 */
      code?: string;
      /** 其他事件数据 */
      [key: string]: unknown;
    };
  };
  /** 其他按钮字段 */
  [key: string]: unknown;
}
```

## 相关链接

- [API 配置](../api/configuration.md) - 了解配置选项
- [首页接口](../api/home.md) - 首页 Feed 相关类型的详细说明
- [搜索接口](../api/search.md) - 搜索相关类型的详细说明
- [商品接口](../api/item.md) - 商品详情相关类型的详细说明
- [用户接口](../api/user.md) - 用户相关类型的详细说明
- [收藏接口](../api/favor.md) - 收藏相关类型的详细说明
- [订单接口](../api/order.md) - 订单相关类型的详细说明
- [认证接口](../api/authentication.md) - 认证和二维码登录相关类型的详细说明
