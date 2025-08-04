// 用户导航响应数据类型
export interface UserNavBase {
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

export interface UserNavModule {
  /** 用户基础信息 */
  base: UserNavBase;
}

export interface UserNavResponse {
  /** 模块数据 */
  module: UserNavModule;
}

// 用户头部响应数据类型
export interface UserHeadBaseInfo {
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

export interface UserHeadShop {
  /** 店铺等级 */
  level: string;
  /** 是否显示电话号码 */
  showPhoneNumber: boolean;
  /** 下一等级所需分数 */
  nextLevelNeedScore: number;
  /** 好评率 */
  praiseRatio: number;
  /** 评价数量 */
  reviewNum: number;
  /** 等级跳转链接 */
  levelJumpUrl: string;
  /** 超级展示 */
  superShow: boolean;
  /** 分数 */
  score: number;
  /** 是否显示升级通知 */
  showUpgradeNotification: boolean;
  /** 商品置顶限制 */
  itemToppingLimit: number;
}

export interface UserHeadSocial {
  /** 关注状态 */
  followStatus: number;
  /** 关注者数量 */
  followers: string;
  /** 关注数量 */
  following: string;
}

export interface UserHeadTab {
  /** 数量 */
  number: number | string;
  /** 名称 */
  name: string;
}

export interface UserHeadTabs {
  /** 商品标签 */
  item: UserHeadTab;
  /** 评价标签 */
  rate: UserHeadTab;
}

export interface UserHeadAvatar {
  /** 头像URL */
  avatar: string;
}

export interface UserHeadYlzTagAttributes {
  /** 角色 */
  role: string;
  /** 等级 */
  level: number;
}

export interface UserHeadYlzTag {
  /** 属性 */
  attributes: UserHeadYlzTagAttributes;
  /** 代码 */
  code: string;
  /** 图标URL */
  icon: string;
  /** Lottie动画URL */
  lottie: string;
  /** 文本 */
  text: string;
  /** 类型 */
  type: string;
  /** 链接 */
  url: string;
}

export interface UserHeadBase {
  /** IP位置 */
  ipLocation: string;
  /** 显示名称 */
  displayName: string;
  /** 头像信息 */
  avatar: UserHeadAvatar;
  /** 芝麻信用标签 */
  ylzTags: UserHeadYlzTag[];
  /** 个人介绍 */
  introduction: string;
}

export interface UserHeadModule {
  /** 店铺信息 */
  shop: UserHeadShop;
  /** 社交信息 */
  social: UserHeadSocial;
  /** 标签页信息 */
  tabs: UserHeadTabs;
  /** 基础信息 */
  base: UserHeadBase;
}

export interface UserHeadResponse {
  /** 基础信息 */
  baseInfo: UserHeadBaseInfo;
  /** 模块数据 */
  module: UserHeadModule;
}
