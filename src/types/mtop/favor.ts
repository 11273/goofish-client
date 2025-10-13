/**
 * 收藏类型枚举
 */
export enum FavorType {
  /** 全部 */
  DEFAULT = 'DEFAULT',
  /** 降价宝贝 */
  REDUCE = 'REDUCE',
  /** 有效宝贝 */
  VALID = 'VALID',
  /** 失效宝贝 */
  INVALID = 'INVALID',
}

/**
 * 收藏商品列表请求参数
 */
export interface FavorItemListRequest {
  /** 页码，从1开始 */
  pageNumber: number;
  /** 每页条数 */
  rowsPerPage: number;
  /** 收藏类型 */
  type: FavorType;
}

/**
 * 收藏商品子标签
 */
export interface FavorItemSubTag {
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

/**
 * 收藏商品基本信息
 */
export interface FavorItem {
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

/**
 * 收藏商品列表响应数据
 */
export interface FavorItemListResponse {
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
