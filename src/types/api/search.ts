// ========== 搜索请求参数 ==========
/**
 * 排序方式
 */
export enum SortValue {
  /** 降序 */
  DESC = 'desc',
  /** 升序 */
  ASC = 'asc',
  /** 信用降序 */
  CREDIT_DESC = 'credit_desc',
}
/**
 * 排序字段
 */
export enum SortField {
  /** 价格 */
  PRICE = 'price',
  /** 发布时间 */
  CREATE = 'create',
  /** 降价幅度 */
  REDUCE = 'reduce',
  /** 位置距离 */
  POSITION = 'pos',
  /** 修改时间 */
  MODIFY = 'modify',
  /** 信用 */
  CREDIT = 'credit',
}
/**
 * 快速筛选类型
 */
export enum QuickFilter {
  /** 个人闲置 */
  PERSONAL = 'filterPersonal',
  /** 验货宝 */
  APPRAISE = 'filterAppraise',
  /** 验号担保 */
  GAME_ACCOUNT = 'gameAccountInsurance',
  /** 包邮 */
  FREE_POSTAGE = 'filterFreePostage',
  /** 超赞鱼小铺 */
  HIGH_LEVEL_SELLER = 'filterHighLevelYxpSeller',
  /** 全新 */
  NEW = 'filterNew',
  /** 严选 */
  INSPECTED = 'inspectedPhone',
  /** 转卖 */
  ONE_KEY_RESELL = 'filterOneKeyResell',
}
/**
 * 发布天数筛选
 */
export enum PublishDays {
  /** 1天内 */
  ONE_DAY = '1',
  /** 3天内 */
  THREE_DAYS = '3',
  /** 7天内 */
  SEVEN_DAYS = '7',
  /** 14天内 */
  FOURTEEN_DAYS = '14',
}
// ============ 接口类型 ============
// 这些是复合类型，作为接口内联或独立都可以，但要保持一致性
/**
 * GPS坐标
 */
export interface GPSCoordinate {
  /** 纬度 */
  latitude: number;
  /** 经度 */
  longitude: number;
}
/**
 * 搜索参数
 */
export interface SearchOptions {
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

// ========== 搜索响应类型 ==========

export interface SearchResponse {
  appBar: Record<string, unknown>;
  filterBar: FilterBar;
  needDecryptKeys: string[];
  resultInfo: ResultInfo;
  resultList: SearchResultItem[];
  resultPrefixBar: unknown[];
  tabList: unknown[];
  topList: unknown[];
}

// ========== 筛选栏 ==========

export interface FilterBar {
  filterBarCellDO: unknown[];
  hidden: boolean;
  showFilterBarWithCpv: boolean;
  showWantBuy: boolean;
}

// ========== 结果信息 ==========

export interface ResultInfo {
  forceUseTppRepair: boolean;
  hasNextPage: boolean;
  loadingTextList: string[];
  maxPrice: string;
  minPrice: string;
  scrollParams: ScrollParams;
  searchResControlFields: SearchResControlFields;
  showLoginGuideBar: boolean;
  singleControl: boolean;
  sqiControlFields: SqiControlFields;
  subTitle: string;
  trackParams: TrackParams;
  useWaterFall: boolean;
}

export interface ScrollParams {
  androidSpeed: string;
  androidUseNew: string;
  iOSUseNew: string;
  iOSSpeed: string;
  iOSSpeedCoeff: string;
}

export interface SearchResControlFields {
  backupType: string;
  hasItems: boolean;
  maxPrice: number;
  minPrice: number;
  nextPage: boolean;
  numFound: number;
  rn: string;
  searchId: string;
  sellingOrder: string;
  similar: boolean;
  srpFeedsItemsDataEmpty: boolean;
  staticticsV2String: string;
  userSubscribeNewArrivalNums: number;
  userSubscribePriceReduceNums: number;
}

export interface SqiControlFields {
  abid: number;
  aiTipSelected: boolean;
  allowMatchActivity: boolean;
  allowUserTppRepairEmptyRes: boolean;
  canShowUserSubscribeTips: boolean;
  cpvNavigatorDo: CpvNavigatorDo;
  docNumWhenFirstPage: number;
  enableNewPubRank: boolean;
  fetchItemLabelClient: boolean;
  filterPersonal: boolean;
  forceEraseSearchKeywords: boolean;
  forceForbidAdItems: boolean;
  forceNotBookInetnt: boolean;
  forceOnlyCallYuXiaoPuOrPlayboyItems: boolean;
  forceOnlyIdleCoinItems: boolean;
  forceSrpFeedsEmpty: boolean;
  forceYoupinItems: boolean;
  fromMini: boolean;
  fromNewPublishPage: boolean;
  fromPc: boolean;
  hasFilterWhenFirstPage: boolean;
  hasMachRulesWhenFirstPage: boolean;
  hasNewArrival: boolean;
  hasSortWhenFirstPage: boolean;
  hideExcludeMultiPlaces: boolean;
  hitAdvanceSearchDelete: boolean;
  hitBackgroundMaterial: boolean;
  hitBasePanel: boolean;
  hitChannelSourceFromNavMat: boolean;
  hitFilterPersonalHousePanel: boolean;
  hitFilterPersonalPanel: boolean;
  hitGraphSearchSubscribeCpv: boolean;
  hitLevel1Kfc: boolean;
  hitLevel4Kfc: boolean;
  hitLevel5Kfc: boolean;
  hitLevel6Kfc: boolean;
  hitLevelDealPriceKfc: boolean;
  hitRelatedWordInterfereMat: boolean;
  hitRigorousNewStylePanel: boolean;
  hitToBuyPage: boolean;
  hitl2l3SensitiveWordInterfereMat: boolean;
  ignoreEmptyAlarm: boolean;
  iosCouponsForbid: boolean;
  lessItem: boolean;
  machDataBecauseAutoFailover: boolean;
  materialFromAds: boolean;
  moduleBucketMap: Record<string, unknown>;
  myFollowChannelCallAllItemAutoFailover: boolean;
  myFollowSearch: boolean;
  objectTransferFromClient: boolean;
  onePackSellEnabled: boolean;
  openDesign: boolean;
  personalChannelCallAllItemAutoFailover: boolean;
  personalSearchShowRecommendQuery: boolean;
  poiLocations: unknown[];
  poiType: string;
  privacyOptionEnabled: boolean;
  recallCouponItems: boolean;
  recallSkuStockItems: boolean;
  researchFlag: boolean;
  researchQuery: string;
  searchFeedsDataFrom: string;
  showUserSubscribeButtonTip: boolean;
  showUserSubscribeEmptyResTip: boolean;
  showUserSubscribeLessResTip: boolean;
  singleControlInner: boolean;
  sourceScene: string;
  sqiCloseAlimamaAd: boolean;
  sqiCloseIdleAd: boolean;
  supportRecallSubscribePriceReduce: boolean;
  tppDataBecauseAutoFailover: boolean;
  unBlockItemPool: unknown[];
  userInputOriginalSearchKeywords: string;
}

// ========== CPV导航 ==========

export interface CpvNavigatorDo {
  fromClient: boolean;
  tabList: CpvTab[];
}

export interface CpvTab {
  cardType: number;
  order: number;
  pid: string;
  pname: string;
  pvTermList: PvTerm[];
  showPlace: string;
  trackParams: Record<string, unknown>;
}

export interface PvTerm {
  checked: boolean;
  order?: number;
  pid: string;
  pname: string;
  pvTermList: unknown[];
  request: {
    vid: number;
    tbCateId: string | null;
    pid: number;
    keyword: string | null;
    idleCateId: number;
  };
  trackParams: Record<string, unknown>;
  vid: string;
  vname: string;
}

// ========== 搜索结果项 ==========

export interface SearchResultItem {
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

export interface SearchItemMain {
  clickParam: ClickParam;
  exContent: ExContent;
  targetUrl: string;
}

export interface ClickParam {
  arg1: string;
  args: Record<string, unknown>;
  page: string;
}

export interface ExContent {
  area: string;
  detailPageType: string;
  detailParams: DetailParams;
  fishTagCustomParam: {
    feedStyle202208: string;
    feedStyle202304: string;
  };
  fishTags: FishTags;
  hideUserInfo: boolean;
  isAliMaMaAD: boolean;
  isAuction: boolean;
  itemId: string;
  jump2XianYuHao: Jump2XianYuHao;
  picHeight: number;
  picUrl: string;
  picWidth: number;
  placeholderColor: string;
  price: PriceComponent[];
  priceTag: unknown[];
  richTitle: RichTitle[];
  showVideoIcon: boolean;
  stuffStatusTagHeight: number;
  stuffStatusTagUrl: string;
  stuffStatusTagWidth: number;
  title: string;
  titleRowType: string;
  titleSpan: TitleSpan;
  useFy25NewStyleLabel: boolean;
  userActiveUrl: string;
  userAvatarUrl: string;
  userFishShopLabel: UserFishShopLabel;
  userIdentityShow: string;
  userIsUseFishShopCard: boolean;
  userNickName: string;
  want: string;
}

export interface DetailParams {
  picWidth: string;
  itemId: string;
  itemType: string;
  picHeight: string;
  userNick: string;
  soldPrice: string;
  isVideo: string;
  title: string;
}

export interface FishTags {
  r1?: TagGroup;
  r2?: TagGroup;
  r3?: TagGroup;
  r4?: TagGroup;
  r5?: TagGroup;
}

export interface TagGroup {
  tagList: Tag[];
  config: TagConfig;
}

export interface Tag {
  data: TagData;
  utParams: {
    args: Record<string, unknown>;
    arg1: string;
  };
}

export interface TagData {
  // 文本标签
  content?: string;
  color?: string;
  size?: string;
  labelId?: string;
  lineHeight?: string;
  bold?: string;
  type?: string;
  marginLeft?: string;
  marginRight?: string;

  // 图片标签
  url?: string;
  width?: string | number;
  height?: string | number;
  alignment?: string;

  // 渐变标签
  gradientColors?: string[];
  gradientDirection?: string;
  gradientType?: string;
  borderRadius?: string;

  // 带背景的标签
  bgColor?: string;
  borderPaddingLeft?: string;
  borderPaddingRight?: string;

  // 左侧图片
  leftImage?: {
    url: string;
    width: string | number;
    height: string | number;
    marginLeft: string | number;
    marginRight: string | number;
  };
}

export interface TagConfig {
  mutualLabelBizGroup: string;
  delimiterColor?: string;
  delimiterHeight?: string;
  delimiterMarginLeft?: string;
  delimiterMarginRight?: string;
  delimiterPosition?: string;
  delimiterWidth?: string;
  hasDelimiter?: string;
}

export interface Jump2XianYuHao {
  clickParam: ClickParam;
  targetUrl: string;
}

export interface PriceComponent {
  bold: boolean;
  fontFamily: string;
  marginBottom: number;
  marginLeft: number;
  text: string;
  textColor: string;
  textSize: number;
  type: string;
}

export interface RichTitle {
  data: {
    height?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    url?: string;
    width?: number;
    bold?: boolean;
    fontWeight?: string;
    lineHeight?: number;
    text?: string;
    textColor?: string;
    textSize?: number;
  };
  type: 'Image' | 'Text';
}

export interface TitleSpan {
  bold: boolean;
  color: string;
  content: string;
  fontWeight: string;
  lineHeight: string;
  maxLines: number;
  size: number;
}

export interface UserFishShopLabel {
  config: TagConfig;
  tagList: Tag[];
}

export interface TrackParams {
  list_type: string;
  q: string;
  showstyle: string;
  rewq: string;
  bucketid: string;
  page: string;
  rn: string;
  type: string;
  sourcefrom: string;
  search_from_page: string;
  search_id: string;
  isActiveSearch: string;
  [key: string]: unknown;
}

export interface Template {
  name: string;
  url: string;
  version: string;
}
