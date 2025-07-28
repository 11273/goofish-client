// ========== 搜索请求参数 ==========

export interface SearchParams {
  // 页码
  pageNumber: number;
  // 搜索关键词
  keyword: string;
  // 是否来自筛选
  fromFilter: boolean;
  // 每页数量
  rowsPerPage: number;
  // 排序值：desc（降序）| asc（升序）
  sortValue: 'desc' | 'asc';
  // 排序字段：create（创建时间）| price（价格）| distance（距离）
  sortField: 'create' | 'price' | 'distance';
  // 自定义距离
  customDistance?: string;
  // GPS信息
  gps?: string;
  // 属性值字符串
  propValueStr?: {
    searchFilter?: string;
  };
  // 自定义GPS
  customGps?: string;
  // 搜索请求来源页面
  searchReqFromPage?: string;
  // 额外筛选值
  extraFilterValue?: string;
  // 用户位置JSON
  userPositionJson?: string;
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

// ========== 搜索建议 ==========

export interface SearchSuggest {
  keywords: string[];
}

// ========== 热门搜索词 ==========

export interface HotWords {
  list: HotWord[];
}

export interface HotWord {
  word: string;
  heat: number;
  trend: 'up' | 'down' | 'stable';
}

// ========== 高级搜索参数 ==========

export interface AdvancedSearchParams extends SearchParams {
  // 分类ID
  category?: string;
  // 价格范围
  priceMin?: number;
  priceMax?: number;
  // 地区
  location?: string;
  // 成色
  condition?: string;
  // 品牌
  brand?: string;
  // 是否包邮
  freeShipping?: boolean;
  // 是否支持验货
  supportInspection?: boolean;
  // 发布时间（天数）
  publishDays?: number;
}

// ========== 搜索筛选选项 ==========

export interface SearchFilterOptions {
  // 成色选项
  conditions: FilterOption[];
  // 品牌选项
  brands: FilterOption[];
  // 功能状态选项
  functionStatus: FilterOption[];
  // 分类选项
  categories: FilterOption[];
}

export interface FilterOption {
  id: string;
  name: string;
  value: string | number;
  count?: number;
}
