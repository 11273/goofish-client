/**
 * 会话类型枚举
 */
export enum ConversationType {
  /** 单聊 */
  SINGLE = 'single',
  /** 群聊 */
  GROUP = 'group',
}

/**
 * 消息内容
 */
export interface MessageContent {
  /** 自定义消息内容 */
  custom?: {
    /** 摘要 */
    summary: string;
    /** 数据（Base64编码） */
    data: string;
    /** 标题 */
    title: string;
    /** 类型 */
    type: number;
    /** 降级内容 */
    degrade: string;
  };
  /** 内容类型 */
  contentType: number;
}

/**
 * 消息发送者
 */
export interface MessageSender {
  /** 用户ID */
  uid: string;
  /** 标签 */
  tag: number;
}

/**
 * 消息扩展信息
 */
export interface MessageExtension {
  /** 提醒内容 */
  reminderContent?: string;
  /** 接收者 */
  receiver?: string;
  /** 发送者用户ID */
  senderUserId?: string;
  /** 扩展JSON */
  extJson?: string;
  /** 关闭推送接收者 */
  closePushReceiver?: string;
  /** 提醒通知 */
  reminderNotice?: string;
  /** 发送者用户类型 */
  senderUserType?: string;
  /** 关闭未读数 */
  closeUnreadNumber?: string;
  /** 详细通知 */
  detailNotice?: string;
  /** 红点提醒样式 */
  redReminderStyle?: string;
  /** 会话类型 */
  sessionType?: string;
  /** 提醒URL */
  reminderUrl?: string;
  /** 业务标签 */
  bizTag?: string;
  /** 提醒标题 */
  reminderTitle?: string;
  /** 红点提醒 */
  redReminder?: string;
  /** 更新头像 */
  updateHead?: string;
}

/**
 * 消息详情
 */
export interface Message {
  /** 扩展信息 */
  extension: MessageExtension;
  /** 消息ID */
  messageId: string;
  /** 未读数 */
  unreadCount: number;
  /** 消息已读状态设置 */
  msgReadStatusSetting: number;
  /** 创建时间 */
  createAt: number;
  /** 消息内容 */
  content: MessageContent;
  /** 消息标签 */
  mtags: Record<string, unknown>;
  /** 会话类型 */
  conversationType: number;
  /** 显示样式 */
  displayStyle: number;
  /** 红点策略 */
  redPointPolicy: number;
  /** 记录状态 */
  recordStatus: number;
  /** 可搜索内容 */
  searchableContent: {
    /** 摘要 */
    summary: string;
  };
  /** 发送者 */
  sender: MessageSender;
  /** 接收者列表 */
  receivers: unknown[];
  /** 接收者数量 */
  receiverCount: number;
  /** 会话ID */
  cid: string;
}

/**
 * 撤回功能配置
 */
export interface RecallFeature {
  /** 显示撤回状态设置 */
  showRecallStatusSetting: number;
}

/**
 * 用户扩展信息
 */
export interface UserExtension {
  /** 是否需要推送 */
  needPush?: string;
}

/**
 * 最后一条消息
 */
export interface LastMessage {
  /** 已读状态 */
  readStatus: number;
  /** 用户扩展信息 */
  userExtension: UserExtension;
  /** 撤回功能 */
  recallFeature: RecallFeature;
  /** 消息详情 */
  message: Message;
  /** 消息状态 */
  msgStatus: number;
}

/**
 * 单聊会话扩展信息
 */
export interface SingleChatExtension {
  /** 扩展用户类型 */
  extUserType?: string;
  /** 商品标题 */
  itemTitle?: string;
  /** 分类名称 */
  squadName_2206615177550?: string;
  /** 扩展用户ID */
  extUserId?: string;
  /** 商品主图 */
  itemMainPic?: string;
  /** 分类名称（动态字段，根据用户ID生成） */
  // squadName_[userId]?: string;
  /** 所有者用户类型 */
  ownerUserType?: string;
  /** 商品ID */
  itemId?: string;
  /** 商品特性 */
  itemFeatures?: string;
  /** 商品卖家ID */
  itemSellerId?: string;
  /** 分类ID（动态字段，根据用户ID生成） */
  // squadId_[timestamp]?: string;
  /** 所有者用户ID */
  ownerUserId?: string;
  /** 其他动态字段 */
  [key: string]: string | undefined;
}

/**
 * 单聊会话信息
 */
export interface SingleChatConversation {
  /** 扩展信息 */
  extension: SingleChatExtension;
  /** 配对第一方 */
  pairFirst: string;
  /** 业务类型 */
  bizType: string;
  /** 消息已读状态设置 */
  msgReadStatusSetting: number;
  /** 创建时间 */
  createAt: number;
  /** 会话ID */
  cid: string;
  /** 配对第二方 */
  pairSecond: string;
}

/**
 * 会话用户扩展信息
 */
export interface ConversationUserExtension {
  /** 红点提醒样式 */
  redReminderStyle?: string;
  /** 红点提醒 */
  redReminder?: string;
}

/**
 * 单聊用户会话
 */
export interface SingleChatUserConversation {
  /** 是否可见 */
  visible: number;
  /** 修改时间 */
  modifyTime: number;
  /** 红点 */
  redPoint: number;
  /** 加入时间 */
  joinTime: number;
  /** 最后一条消息 */
  lastMessage: LastMessage;
  /** 单聊会话信息 */
  singleChatConversation: SingleChatConversation;
  /** 置顶排序 */
  topRank: number;
  /** 免打扰通知 */
  muteNotification: number;
  /** 用户扩展信息 */
  user_extension: ConversationUserExtension;
}

/**
 * 会话实体
 */
export interface Conversation {
  /** 单聊用户会话 */
  singleChatUserConversation?: SingleChatUserConversation;
  /** 会话类型 */
  type: number;
}

/**
 * 会话列表最新分页请求
 */
export interface ConversationListNewestPaginationRequest {
  /** 开始时间戳 */
  startTimeStamp: number;
  /** 限制数量 */
  limitNum: number;
}

/**
 * 会话列表最新分页响应
 */
export interface ConversationListNewestPaginationResponse {
  /** 是否有更多 */
  hasMore: number;
  /** 下一页游标 */
  nextCursor: number;
  /** 会话列表 */
  userConvs: Conversation[];
}

/**
 * 会话详情请求
 */
export interface ConversationDetailRequest {
  /** 会话 ID */
  conversationId: string;
}

/**
 * 会话详情响应
 */
export interface ConversationDetailResponse {
  /** 会话信息 */
  conversation: Conversation;
  /** 其他字段 */
  [key: string]: unknown;
}

/**
 * 创建单聊会话扩展字段
 * 对应闲鱼前端点击「聊一聊」后调用 /r/SingleChatConversation/create 时
 * 携带的 extension 字段
 */
export interface CreateSingleConversationExtension {
  /** 商品 ID（字符串形式） */
  itemId?: string;
  /** 订单 ID（字符串形式），无订单场景传空字符串 */
  orderId?: string;
  /** 来源标识（可选，空字符串即可） */
  source?: string;
  /** 其他业务扩展字段 */
  [key: string]: string | undefined;
}

/**
 * 创建单聊会话上下文
 */
export interface CreateSingleConversationContext {
  /** 应用版本号，默认 "1.0" */
  appVersion?: string;
  /** 平台标识，默认 "web" */
  platform?: string;
}

/**
 * 创建单聊会话请求（底层参数）
 *
 * pairFirst / pairSecond 必须是 `<userId>@<domain>` 格式，
 * 并且按照 userId 的数字大小升序排列。
 */
export interface CreateSingleConversationRequest {
  /** 会话参与方之一（userId 较小的一方），格式：`<userId>@<domain>` */
  pairFirst: string;
  /** 会话参与方之二（userId 较大的一方），格式：`<userId>@<domain>` */
  pairSecond: string;
  /** 业务类型，默认 "1" */
  bizType?: string;
  /** 业务扩展信息 */
  extension?: CreateSingleConversationExtension;
  /** 调用上下文 */
  ctx?: CreateSingleConversationContext;
}

/**
 * 创建单聊会话响应
 *
 * 结构与 `listNewestPagination` 返回的 `userConvs[].singleChatUserConversation`
 * 一致，便于与现有会话列表数据互通。
 */
export interface CreateSingleConversationResponse
  extends Partial<SingleChatUserConversation> {
  /** 单聊会话核心信息（创建成功时必然存在） */
  singleChatConversation: SingleChatConversation;
}

/**
 * 创建基于商品的单聊会话（便捷方法）的请求参数
 */
export interface CreateItemConversationRequest {
  /** 当前登录用户的 userId（数字字符串） */
  selfUserId: string | number;
  /** 对方用户 ID，例如商品卖家 ID */
  peerUserId: string | number;
  /** 商品 ID */
  itemId: string | number;
  /** 订单 ID（可选） */
  orderId?: string | number;
  /** 来源标识（可选） */
  source?: string;
  /** 业务类型，默认 "1" */
  bizType?: string;
  /** 调用上下文（可选） */
  ctx?: CreateSingleConversationContext;
}

/**
 * @deprecated 使用 {@link CreateSingleConversationRequest} 替代
 */
export type CreateConversationRequest = CreateSingleConversationRequest;

/**
 * @deprecated 使用 {@link CreateSingleConversationResponse} 替代
 */
export type CreateConversationResponse = CreateSingleConversationResponse;
