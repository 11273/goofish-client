/**
 * 订单状态枚举
 */
export enum OrderStatus {
  /** 全部 */
  ALL = 'ALL',
  /** 待付款 */
  NOT_PAY = 'NOT_PAY',
  /** 待发货 */
  NOT_SHIP = 'NOT_SHIP',
  /** 待收货 */
  SHIPPED = 'SHIPPED',
  /** 待评价 */
  NOT_RATE = 'NOT_RATE',
  /** 退款中 */
  REFUND = 'REFUND',
}

/**
 * 买到的订单列表请求参数
 */
export interface BoughtListRequest {
  /** 页码，从1开始 */
  pageNumber: number;
  /** 订单状态 */
  orderStatus: OrderStatus;
}

/**
 * 订单通用数据
 */
export interface OrderCommonData {
  /** 屏蔽类型 */
  blockType: string;
  /** 符合风险 */
  conformRisk: string;
  /** 商品ID */
  itemId: string;
  /** 订单详情URL */
  orderDetailUrl: string;
  /** 订单ID */
  orderId: string;
  /** 订单ID字符串 */
  orderIdStr: string;
  /** 对方用户ID */
  peerUserId: string;
  /** 是否卖家 */
  seller: string;
  /** 交易状态枚举 */
  tradeStatusEnum: string;
  /** UT参数 */
  utArgs: Record<string, unknown>;
}

/**
 * 订单详情信息
 */
export interface OrderDetailInfo {
  /** 商品图片 */
  auctionPic: string;
  /** 商品标题 */
  auctionTitle: string;
  /** 是否来自微信小程序 */
  fromWxMiniProgram: string;
  /** 订单标签 */
  orderTags: unknown[];
}

/**
 * 订单价格信息
 */
export interface OrderPriceInfo {
  /** 商品价格描述 */
  auctionPriceDesc: string;
  /** 购买数量 */
  buyAmount: string;
  /** 价格 */
  price: string;
}

/**
 * 订单内容数据
 */
export interface OrderContentData {
  /** 详情信息 */
  detailInfo: OrderDetailInfo;
  /** 价格信息 */
  priceInfo: OrderPriceInfo;
}

/**
 * 订单内容
 */
export interface OrderContent {
  /** 数据 */
  data: OrderContentData;
  /** 渲染类型 */
  render: string;
}

/**
 * 用户标签
 */
export interface OrderUserTag {
  /** 图片URL */
  imageUrl?: string;
}

/**
 * 用户信息
 */
export interface OrderUserInfo {
  /** 跳转URL */
  jumpUrl: string;
  /** 红花图标 */
  redFlowerIcon: string;
  /** 标签列表 */
  tags: OrderUserTag[];
  /** 用户头像 */
  userIcon: string;
  /** 用户ID */
  userId: string;
  /** 用户昵称 */
  userNick: string;
}

/**
 * 订单头部数据
 */
export interface OrderHeadData {
  /** 创建时间 */
  createTime: string;
  /** 状态显示消息 */
  statusViewMsg: string;
  /** 用户信息 */
  userInfo: OrderUserInfo;
}

/**
 * 订单头部
 */
export interface OrderHead {
  /** 数据 */
  data: OrderHeadData;
  /** 渲染类型 */
  render: string;
}

/**
 * 点击事件数据
 */
export interface OrderButtonClickEventData {
  /** 代码 */
  code?: string;
  /** URL */
  url?: string;
  /** 是否刷新 */
  refresh?: string;
}

/**
 * 点击事件UT参数
 */
export interface OrderButtonClickEventUtParam {
  /** 参数1 */
  arg1: string;
  /** 其他参数 */
  args?: Record<string, unknown>;
}

/**
 * 按钮点击事件
 */
export interface OrderButtonClickEvent {
  /** 数据 */
  data: OrderButtonClickEventData;
  /** 类型 */
  type: string;
  /** UT参数 */
  utParam: OrderButtonClickEventUtParam;
}

/**
 * 订单按钮
 */
export interface OrderButton {
  /** 按钮是否禁用 */
  buttonDisable?: string;
  /** 点击事件 */
  clickEvent: OrderButtonClickEvent;
  /** 是否展开 */
  expanded?: string;
  /** 按钮名称 */
  name: string;
  /** 按钮样式 */
  style?: string;
  /** 交易动作 */
  tradeAction: string;
}

/**
 * 订单通知VO
 */
export interface OrderNoticeVO {
  /** 点击事件 */
  clickEvent: OrderButtonClickEvent;
  /** 图标 */
  icon: string;
  /** 标题 */
  title: string;
  /** 类型 */
  type: string;
}

/**
 * 订单尾部数据
 */
export interface OrderTailData {
  /** 按钮列表 */
  btnList: OrderButton[];
  /** 通知VO */
  noticeVO?: OrderNoticeVO;
}

/**
 * 订单尾部
 */
export interface OrderTail {
  /** 数据 */
  data: OrderTailData;
  /** 渲染类型 */
  render: string;
}

/**
 * 买到的订单项
 */
export interface BoughtOrder {
  /** 通用数据 */
  commonData: OrderCommonData;
  /** 内容 */
  content: OrderContent;
  /** 头部 */
  head: OrderHead;
  /** 尾部 */
  tail: OrderTail;
}

/**
 * 买到的订单列表响应数据
 */
export interface BoughtListResponse {
  /** 订单列表 */
  items: BoughtOrder[];
  /** 最后一行 */
  lastEndRow: string;
  /** 是否有下一页 */
  nextPage: string;
  /** 总数量 */
  totalCount: string;
}
