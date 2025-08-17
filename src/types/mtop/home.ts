/**
 * 首页Feed请求参数
 */
export interface HomeFeedRequest {
  /** 商品ID，用于分页定位 */
  itemId?: string;
  /** 每页大小 */
  pageSize?: number;
  /** 页码 */
  pageNumber?: number;
  /** 机器ID */
  machId?: string;
}

/**
 * 商品图片信息
 */
export interface ItemImage {
  /** 图片高度 */
  heightSize: number;
  /** 是否主图 */
  major: boolean;
  /** 图片类型 */
  type: number;
  /** 图片地址 */
  url: string;
  /** 图片宽度 */
  widthSize: number;
}

/**
 * 商品价格信息
 */
export interface PriceInfo {
  /** 原价 */
  oriPrice: string;
  /** 价格前缀 */
  preText: string;
  /** 当前价格 */
  price: string;
  /** 价格后缀（如闲鱼币抵扣信息） */
  sufText?: string;
}

/**
 * 用户信息
 */
export interface UserInfo {
  /** 用户头像 */
  avatar: string;
  /** 跟踪参数 */
  trackParams: {
    trackName: string;
  };
  /** 用户昵称 */
  userNick: string;
}

/**
 * 首页标签数据
 */
export interface HomeTagData {
  /** 背景色 */
  bgColor?: string;
  /** 文字颜色 */
  color: string;
  /** 边框半径 */
  borderRadius?: string;
  /** 字体大小 */
  size: string;
  /** 标签ID */
  labelId: string;
  /** 边框左内边距 */
  borderPaddingLeft?: string;
  /** 行高 */
  lineHeight: string;
  /** 边框右内边距 */
  borderPaddingRight?: string;
  /** 标签类型 */
  type: string;
  /** 标签内容 */
  content: string;
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

/**
 * 首页标签配置
 */
export interface HomeTagConfig {
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
  /** 是否相互标签业务组 */
  mutualLabelBizGroup: string;
}

/**
 * 首页标签项
 */
export interface HomeTagItem {
  /** 标签数据 */
  data: HomeTagData;
  /** 用户跟踪参数 */
  utParams: {
    args: Record<string, string>;
    arg1: string;
  };
}

/**
 * 首页标签区域
 */
export interface HomeTagRegion {
  /** 标签列表 */
  tagList: HomeTagItem[];
  /** 配置 */
  config: HomeTagConfig;
}

/**
 * 首页Fish标签集合
 */
export interface HomeFishTags {
  /** 第一行标签 */
  r1?: HomeTagRegion;
  /** 第二行标签 */
  r2?: HomeTagRegion;
  /** 第三行标签 */
  r3?: HomeTagRegion;
  /** 第四行标签 */
  r4?: HomeTagRegion;
}

/**
 * 标题摘要
 */
export interface TitleSummary {
  /** 标题文本 */
  text: string;
}

/**
 * 商品卡片数据
 */
export interface ItemCardData {
  /** 属性映射 */
  attributeMap: Record<string, string>;
  /** 拍卖类型 */
  auctionType: string;
  /** 业务类型 */
  bizType: string;
  /** 城市 */
  city: string;
  /** 详情参数 */
  detailParams: Record<string, unknown>;
  /** 不喜欢跟踪参数 */
  dislikeTrackParams: Record<string, unknown>;
  /** Fish标签 */
  fishTags: HomeFishTags;
  /** 热点信息 */
  hotPoint: {
    text: string;
    topTags: unknown[];
  };
  /** 商品图片列表 */
  images: ItemImage[];
  /** 是否用户命中标签新样式 */
  isUserHitLabelNewStyle: boolean;
  /** 商品ID */
  itemId: string;
  /** 标签自定义业务参数 */
  labelCustomBizParam: Record<string, string>;
  /** 日志器 */
  logger: Record<string, unknown>;
  /** 主图信息 */
  mainPicInfo: ItemImage;
  /** 是否需要粉丝价 */
  needFansPrice: boolean;
  /** 是否需要促销价 */
  needPromotionPrice: boolean;
  /** 价格信息 */
  priceInfo: PriceInfo;
  /** 是否放置详情参数 */
  putDetailParams: boolean;
  /** 重定向URL */
  redirectUrl: string;
  /** 标题摘要 */
  titleSummary: TitleSummary;
  /** 跟踪参数 */
  trackParams: Record<string, unknown>;
  /** 用户信息 */
  user: UserInfo;
}

/**
 * 商品卡片
 */
export interface ItemCard {
  /** 卡片数据 */
  cardData: ItemCardData;
  /** 卡片类型 */
  cardType: number;
}

/**
 * 首页Feed响应数据
 */
export interface HomeFeedResponse {
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
