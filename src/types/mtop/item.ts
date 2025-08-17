/**
 * 商品详情请求参数
 */
export interface ItemDetailRequest {
  /** 商品ID */
  itemId: string;
}

/**
 * 买家信息
 */
export interface B2cBuyerDO {
  /** 购买资格活动列表 */
  buyQualificationActList: unknown[];
  /** 是否首单用户 */
  isFirstOrderUser: boolean;
  /** 是否7天内新用户 */
  isNewUserIn7Day: boolean;
  /** 是否收藏 */
  favored: boolean;
}

/**
 * 商品图片信息
 */
export interface ItemImageInfo {
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

/**
 * 商品标签扩展信息
 */
export interface ItemLabelExt {
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

/**
 * 商品跟踪参数
 */
export interface ItemTrackParams {
  /** 商品ID */
  itemId: string;
  /** 卖家ID */
  sellerId: string;
  /** 服务参数 */
  idlelabel_serviceUtParams: string;
  /** 买家桶ID */
  buyerBucketId: string;
  /** 卖家桶ID */
  sellerBucketId: string;
  /** 标签桶ID */
  idlelabel_bucketId: string;
  /** 不显示跟踪参数 */
  idlelabel_unShowTrackParams: string;
}

/**
 * 野营客户信息
 */
export interface CampingCustomerDO {
  /** 是否野营 */
  isCamping: boolean;
}

/**
 * SPU底部栏项目
 */
export interface SpuBottomBarItem {
  /** 跟踪参数 */
  trackParams: {
    bucket_id: string;
    category_id: string;
    item_id: string;
  };
  /** 标题 */
  title: string;
  /** 目标URL */
  targetUrl: string;
}

/**
 * 商品分类信息
 */
export interface ItemCatDTO {
  /** 分类ID */
  catId: number;
  /** 叶子ID */
  leafId: number;
  /** 根渠道分类ID */
  rootChannelCatId: number;
  /** 是否建议显示 */
  sugShow: boolean;
  /** 三级渠道分类ID */
  level3ChannelCatId: number;
  /** 淘宝分类ID */
  tbCatId: number;
  /** 渠道分类ID */
  channelCatId: number;
  /** 二级渠道分类ID */
  level2ChannelCatId: number;
}

/**
 * CPV标签
 */
export interface CpvLabel {
  /** 值对象 */
  valueObject: string;
  /** 值ID */
  valueId: number;
  /** 属性名称 */
  propertyName: string;
  /** 值名称 */
  valueName: string;
  /** 属性ID */
  propertyId: number;
}

/**
 * 促销价格信息
 */
export interface PromotionPriceDO {
  /** 是否预留 */
  reserved: boolean;
  /** 附加映射 */
  additionMap: Record<string, unknown>;
}

/**
 * 慈善标签
 */
export interface CharitableTag {
  /** 图标高度 */
  iconHeight: string;
  /** 图标宽度 */
  iconWidth: string;
  /** 图标URL */
  iconUrl: string;
}

/**
 * 安全指南
 */
export interface SecuGuide {
  /** 安全标题 */
  secuTitle: string;
  /** 安全图标 */
  secuIcon: string;
  /** 安全内容 */
  secuContent: string;
  /** 底部上下文 */
  secuBtmContext: string;
  /** 底部 */
  secuBtm: string;
  /** 底部URL */
  secuBtmUrl: string;
  /** 安全主体 */
  secuBody: string;
}

/**
 * 分享数据
 */
export interface ShareData {
  /** 分享举报URL */
  shareReportUrl: string;
  /** 分享帮助URL */
  shareHelpUrl: string;
  /** 分享信息JSON字符串 */
  shareInfoJsonString: string;
}

/**
 * 商品详情信息
 */
export interface ItemDO {
  /** 是否无图商品 */
  noPicItem: boolean;
  /** 分享数据 */
  shareData: ShareData;
  /** 模板ID */
  templateId: number;
  /** 是否值得购买相似推荐 */
  worthBuySimilarFeeds: boolean;
  /** 跟踪参数 */
  trackParams: ItemTrackParams;
  /** 用户输入话题 */
  userInputTopics: unknown[];
  /** 已售价格 */
  soldPrice: string;
  /** 野营客户信息 */
  campingCustomerDO: CampingCustomerDO;
  /** 商品标签扩展列表 */
  itemLabelExtList: ItemLabelExt[];
  /** 质量URL */
  qualityUrl: string;
  /** 交易横幅 */
  tradeBanners: unknown[];
  /** 浏览次数 */
  browseCnt: number;
  /** 价格相关标签 */
  priceRelativeTags: unknown[];
  /** 价格单位 */
  priceUnit: string;
  /** 图片信息列表 */
  imageInfos: ItemImageInfo[];
  /** 标题是否用户输入 */
  titleIsUserInput: boolean;
  /** 推荐标签列表 */
  recommendTagList: unknown[];
  /** 淘宝支持交易 */
  tbSupportTrade: boolean;
  /** SPU底部栏项目 */
  spuBottomBarItem: SpuBottomBarItem;
  /** CRO控制 */
  croControl: unknown[];
  /** 商品ID */
  itemId: number;
  /** 创建日期键 */
  GMT_CREATE_DATE_KEY: string;
  /** 是否慈善商品 */
  charitableItem: boolean;
  /** UI商品服务列表 */
  uiItemServiceDOList: unknown[];
  /** PC支持交易 */
  pcSupportTrade: boolean;
  /** 通用标签 */
  commonTags: unknown[];
  /** 描述 */
  desc: string;
  /** 描述标签颜色 */
  descTagColor: string;
  /** 商品类型 */
  itemType: string;
  /** 简单商品 */
  simpleItem: boolean;
  /** 原价 */
  originalPrice: string;
  /** 运费 */
  transportFee: string;
  /** 商品状态字符串 */
  itemStatusStr: string;
  /** CPV标签列表 */
  cpvLabels: CpvLabel[];
  /** 富文本描述 */
  richTextDesc: string;
  /** 想要数量单位 */
  wantCntUnit: string;
  /** 标题 */
  title: string;
  /** 促销价格信息 */
  promotionPriceDO: PromotionPriceDO;
  /** 创建订单URL */
  createOrderUrl: string;
  /** 互动收藏数 */
  interactFavorCnt: number;
  /** 商品状态 */
  itemStatus: number;
  /** 渠道UMP创建订单URL */
  channelUmpCreateOrderUrl: string;
  /** 慈善标签 */
  charitableTag: CharitableTag;
  /** 描述相关标签 */
  descRelativeTags: unknown[];
  /** SPU话题 */
  spuTopics: unknown[];
  /** 是否默认价格 */
  defaultPrice: boolean;
  /** 数量 */
  quantity: number;
  /** 价格文本标签 */
  priceTextTags: unknown[];
  /** 是否议价 */
  bargained: boolean;
  /** 收藏数 */
  collectCnt: number;
  /** 喜欢数 */
  favorCnt: number;
  /** 举报URL */
  reportUrl: string;
  /** CPV话题 */
  cpvTopics: unknown[];
  /** 创建时间 */
  gmtCreate: number;
  /** 交易访问类型 */
  tradeAccessType: number;
  /** 想要数量 */
  wantCnt: number;
  /** 是否默认图片 */
  defaultPicture: boolean;
  /** 安全指南 */
  secuGuide: SecuGuide;
  /** 商品分类信息 */
  itemCatDTO: ItemCatDTO;
  /** 分类ID */
  categoryId: number;
  /** 直播间创建订单URL */
  liveRoomCreateOrderUrl: string;
}

/**
 * B2C卖家信息
 */
export interface B2cSellerDO {
  /** 卖家统计信息列表 */
  sellerStatisticsInfoList: unknown[];
  /** 身份标签 */
  identityTags: unknown[];
  /** 等级标签 */
  levelTags: unknown[];
  /** 卖家业务标签 */
  sellerBizTags: unknown[];
  /** 用户注册天数 */
  userRegDay: number;
  /** 卖家信息标签 */
  sellerInfoTags: unknown[];
}

/**
 * 卖家商品
 */
export interface SellerItem {
  /** 商品ID */
  itemId?: number;
  /** 链接 */
  link: string;
  /** 字体大小 */
  fontSize: number;
  /** 图标URL */
  iconUrl: string;
  /** 文本 */
  text?: string;
  /** 类型 */
  type: string;
}

/**
 * 闲鱼信用标签
 */
export interface IdleFishCreditTag {
  /** 图标高度 */
  iconHeight: string;
  /** 跟踪参数 */
  trackParams: {
    sellerLevel: string;
    pageUserId: string;
  };
  /** 图标宽度 */
  iconWidth: string;
  /** 图标URL */
  iconUrl: string;
  /** 附加映射 */
  additionMap: Record<string, unknown>;
  /** Lottie URL */
  lottieUrl: string;
  /** 排序 */
  order: number;
}

/**
 * 卖家评价信息
 */
export interface RemarkDO {
  /** 卖家默认评价数 */
  sellerDefaultRemarkCnt: number;
  /** 卖家好评数 */
  sellerGoodRemarkCnt: number;
  /** 卖家差评数 */
  sellerBadRemarkCnt: number;
}

/**
 * 芝麻等级信息
 */
export interface ZhimaLevelInfo {
  /** 等级代码 */
  levelCode: string;
  /** 等级名称 */
  levelName: string;
}

/**
 * 身份标签
 */
export interface IdentityTag {
  /** 图标高度 */
  iconHeight: string;
  /** 跟踪参数 */
  trackParams: {
    appearTrackName: string;
    trackCtrlName: string;
  };
  /** 图标宽度 */
  iconWidth: string;
  /** 链接 */
  link: string;
  /** 图标URL */
  iconUrl: string;
  /** 文本 */
  text: string;
  /** 类型 */
  type: string;
  /** 附加映射 */
  additionMap: Record<string, unknown>;
  /** 排序 */
  order: number;
}

/**
 * 等级标签
 */
export interface LevelTag {
  /** 图标高度 */
  iconHeight: string;
  /** 跟踪参数 */
  trackParams?: {
    sellerLevel: string;
    pageUserId: string;
  };
  /** 图标宽度 */
  iconWidth: string;
  /** 图标URL */
  iconUrl: string;
  /** 附加映射 */
  additionMap: Record<string, unknown>;
  /** Lottie URL */
  lottieUrl?: string;
  /** 排序 */
  order: number;
}

/**
 * 卖家信息
 */
export interface SellerDO {
  /** AOI类型 */
  aoiType: string;
  /** 城市 */
  city: string;
  /** 签名 */
  signature: string;
  /** 用户注册天数 */
  userRegDay: number;
  /** 已售数量 */
  hasSoldNumInteger: number;
  /** 发布城市 */
  publishCity: string;
  /** 昵称 */
  nick: string;
  /** 卖家统计信息列表 */
  sellerStatisticsInfoList: unknown[];
  /** 卖家ID */
  sellerId: number;
  /** 闲鱼信用标签 */
  idleFishCreditTag: IdleFishCreditTag;
  /** 最后访问时间 */
  lastVisitTime: string;
  /** 24小时内回复率 */
  replyIn24hRatioDouble: number;
  /** 30天平均回复时间 */
  avgReply30dLong: number;
  /** 卖家业务标签 */
  sellerBizTags: unknown[];
  /** 24小时回复率 */
  replyRatio24h: string;
  /** 回复间隔 */
  replyInterval: string;
  /** 注册时间 */
  registerTime: number;
  /** 头像URL */
  portraitUrl: string;
  /** 卖家类型字符串 */
  sellerTypeString: null;
  /** 评价信息 */
  remarkDO: RemarkDO;
  /** 芝麻认证 */
  zhimaAuth: boolean;
  /** 卖家商品 */
  sellerItems: SellerItem[];
  /** 卖家信息标签 */
  sellerInfoTags: unknown[];
  /** 商品数量 */
  itemCount: number;
  /** 芝麻等级信息 */
  zhimaLevelInfo: ZhimaLevelInfo;
  /** 唯一名称 */
  uniqueName: string;
  /** 闲鱼摘要 */
  xianyuSummary: string;
  /** 身份标签 */
  identityTags: IdentityTag[];
  /** 等级标签 */
  levelTags: LevelTag[];
}

/**
 * B2C商品信息
 */
export interface B2cItemDO {
  /** 价格相关标签 */
  priceRelativeTags: unknown[];
  /** 优惠标签 */
  benefitLabels: unknown[];
  /** 价格文本标签 */
  priceTextTags: unknown[];
  /** 优惠标签 */
  benefitTags: unknown[];
  /** 是否需要折叠标题 */
  needCollapseTitle: boolean;
  /** 描述相关标签 */
  descRelativeTags: unknown[];
  /** 模板ID */
  templateId: number;
  /** 活动信息 */
  activityInfo: Record<string, unknown>;
  /** 通用标签 */
  commonTags: unknown[];
  /** 浏览次数 */
  browseCnt: number;
}

/**
 * UI倒计时信息
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UiCountDownInfoDO {}

/**
 * B2C UI闲置详情配置
 */
export interface B2cUiIdleDetailConfigDO {
  /** 启用显示其他卖家信息指南 */
  enableShowOthersSellInfoGuide: boolean;
  /** 需要群组信息 */
  needGroupInfo: boolean;
  /** 需要商品指南信息 */
  needItemGuideInfo: boolean;
  /** 支持交易提示 */
  supportTradeTips: boolean;
  /** 显示卖家其他商品 */
  showSellerOtherItems: boolean;
  /** 启用显示快速询问体验 */
  enableShowQuickAskExp: boolean;
  /** 需要鱼塘信息 */
  needFishPoolInfo: boolean;
  /** 启用显示出价信息 */
  enableShowBidInfo: boolean;
  /** 需要实人信息 */
  needShirenInfo: boolean;
  /** 需要芝麻信息 */
  needZhimaInfo: boolean;
  /** 启用显示简单出售 */
  enableShowSellSimple: boolean;
  /** 扩展用户想要单位 */
  extendUserWantUnit: boolean;
  /** 启用NFGC服务 */
  enableNfgcService: boolean;
  /** 显示管理员 */
  showManager: boolean;
  /** 扩展价格单位 */
  extendPriceUnit: boolean;
  /** 启用跳转闲鱼号 */
  enableJumpXyh: boolean;
  /** 扩展描述商品类型 */
  extendDescItemType: boolean;
  /** 扩展卖家统计信息 */
  extendSellerStatisticInfo: boolean;
  /** 启用NFR服务 */
  enableNfrService: boolean;
  /** 启用SDR服务 */
  enableSdrService: boolean;
  /** 启用卖家VIP标志 */
  enableSellerVipLogo: boolean;
  /** 扩展卖家信息标签 */
  extendSellerInfoTags: boolean;
  /** 命中202109新详情 */
  hit202109NewDetail: boolean;
  /** 扩展卖家证书 */
  extendSellerCertificate: boolean;
  /** 扩展卖家等级标签 */
  extendSellerLevelTags: boolean;
}

/**
 * 商业信息
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CommerceDO {}

/**
 * UI模板信息
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UiTemplateDO {}

/**
 * 业务标志信息
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BizFlagDO {}

/**
 * 经纪人信息
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BrokerDO {}

/**
 * UI发布信息
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UiPostDO {}

/**
 * 互动信息
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InteractDO {}

/**
 * 详细跟踪参数
 */
export interface DetailTrackParams {
  /** 奖章ID */
  medal_id: string;
  /** 目标类型 */
  target_type: string;
  /** 标签桶ID */
  idlelabel_bucketId: string;
  /** 买家选项 */
  buyerOptions: string;
  /** 目标ID */
  target_id: string;
  /** 买家ID */
  buyerId: string;
  /** 卖家在买家选项 */
  sellerInBuyOptions: string;
  /** 详情SPI版本 */
  detailSpiVersion: string;
  /** 商品ID */
  itemId: string;
  /** 卖家选项 */
  sellerOptions: string;
  /** 卖家ID */
  sellerId: string;
  /** 详情重定向发布URL */
  detailRedirectPublishUrl: string;
  /** 服务参数 */
  idlelabel_serviceUtParams: string;
  /** 买家桶ID */
  buyerBucketId: string;
  /** 渠道分类ID */
  channelCatId: string;
  /** 主图 */
  mainPic: string;
  /** 卖家桶ID */
  sellerBucketId: string;
  /** 买家在卖家桶ID */
  buyerInSellBucketId: string;
  /** 买家在卖家选项 */
  buyerInSellOptions: string;
  /** 卖家在买家桶ID */
  sellerInBuyBucketId: string;
  /** 分类ID */
  categoryId: string;
  /** 不显示跟踪参数 */
  idlelabel_unShowTrackParams: string;
}

/**
 * 海鲜信息
 */
export interface SeafoodDO {
  /** 桶 */
  bucket: string;
  /** 用户数量 */
  userNum: string;
  /** 商品名称 */
  goodName: string;
}

/**
 * 配置信息
 */
export interface ConfigInfo {
  /** 导航栏关注按钮 */
  navBarFollowButton: string;
  /** SKU横幅显示 */
  skuBannerShow: string;
  /** 显示转售列表 */
  showResellList: string;
  /** 跳转闲鱼号 */
  jumpXyh: string;
  /** 命中闲鱼信用AB */
  hitIdleFishCreditAb: string;
  /** 支付指南蒙层 */
  paymentGuideMask: string;
}

/**
 * 灵活工作信息
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FlexibleJobInfoDO {}

/**
 * 买家信息
 */
export interface BuyerDO {
  /** 购买资格活动列表 */
  buyQualificationActList: unknown[];
  /** 是否首单用户 */
  isFirstOrderUser: boolean;
  /** 是否7天内新用户 */
  isNewUserIn7Day: boolean;
  /** 是否店铺用户 */
  isShopUser: boolean;
  /** 是否收藏 */
  favored: boolean;
  /** 是否首单安全保障用户 */
  IS_FIRST_ORDER_SAFE_GUARD_USER_KEY: boolean;
  /** 是否超级收藏 */
  isSuperFavored: boolean;
  /** 买家ID */
  buyerId: number;
  /** 关注状态 */
  attentionState: number;
  /** 是否已收藏 */
  isCollected: boolean;
}

/**
 * 商品详情响应数据
 */
export interface ItemDetailResponse {
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
  /** UI倒计时信息 */
  uiCountDownInfoDO: UiCountDownInfoDO;
  /** B2C UI闲置详情配置 */
  b2cUiIdleDetailConfigDO: B2cUiIdleDetailConfigDO;
  /** 商业信息 */
  commerceDO: CommerceDO;
  /** UI模板信息 */
  uiTemplateDO: UiTemplateDO;
  /** 业务标志信息 */
  bizFlagDO: BizFlagDO;
  /** 经纪人信息 */
  brokerDO: BrokerDO;
  /** UI发布信息 */
  uiPostDO: UiPostDO;
  /** 互动信息 */
  interactDO: InteractDO;
  /** 跟踪参数 */
  trackParams: DetailTrackParams;
  /** 海鲜信息 */
  seafoodDO: SeafoodDO;
  /** 配置信息 */
  configInfo: ConfigInfo;
  /** 服务器时间 */
  serverTime: string;
  /** 灵活工作信息 */
  flexibleJobInfoDO: FlexibleJobInfoDO;
  /** 买家信息 */
  buyerDO: BuyerDO;
}
