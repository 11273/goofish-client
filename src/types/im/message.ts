/**
 * 消息类型枚举
 */
export enum MessageType {
  /** 文本消息 */
  TEXT = 'text',
  /** 图片消息 */
  IMAGE = 'image',
  /** 语音消息 */
  VOICE = 'voice',
  /** 视频消息 */
  VIDEO = 'video',
  /** 系统消息 */
  SYSTEM = 'system',
}

/**
 * 消息内容
 */
export interface MessageContent {
  /** 消息类型 */
  type: MessageType | string;
  /** 消息内容 */
  content: string;
  /** 扩展数据 */
  ext?: Record<string, unknown>;
}

/**
 * 消息实体
 */
export interface Message {
  /** 消息 ID */
  id: string;
  /** 会话 ID */
  conversationId: string;
  /** 发送者 ID */
  senderId: string;
  /** 接收者 ID */
  receiverId?: string;
  /** 消息内容 */
  content: MessageContent;
  /** 发送时间 */
  timestamp: number;
  /** 是否已读 */
  read?: boolean;
  /** 扩展字段 */
  [key: string]: unknown;
}

/**
 * 发送消息请求
 */
export interface SendMessageRequest {
  /** 会话 ID */
  conversationId: string;
  /** 消息内容 */
  content: MessageContent;
}

/**
 * 发送消息响应
 */
export interface SendMessageResponse {
  /** 消息 ID */
  messageId: string;
  /** 发送时间 */
  timestamp: number;
  /** 其他字段 */
  [key: string]: unknown;
}

/**
 * 消息列表请求
 */
export interface MessageListRequest {
  /** 会话 ID */
  conversationId: string;
  /** 页码 */
  pageNumber?: number;
  /** 每页数量 */
  pageSize?: number;
  /** 最后一条消息 ID（用于分页） */
  lastMessageId?: string;
}

/**
 * 消息列表响应
 */
export interface MessageListResponse {
  /** 消息列表 */
  messages: Message[];
  /** 是否有更多 */
  hasMore: boolean;
  /** 下一页的最后消息 ID */
  nextLastMessageId?: string;
}
