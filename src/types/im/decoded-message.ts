/**
 * IM 解码后的消息类型定义
 */

/**
 * 解码后的消息内容
 */
export interface DecodedMessageContent {
  /** 内容类型 */
  contentType?: number;
  /** 文本内容 */
  text?: {
    text?: string;
  };
  /** @用户列表 */
  atUsers?: unknown[];
}

/**
 * 消息扩展信息
 */
export interface MessageExtJson {
  /** 快速回复 */
  quickReply?: string;
  /** 设备唯一标识 */
  utdid?: string;
  /** 消息ID */
  messageId?: string;
  /** UMID Token */
  umidToken?: string;
  /** 标签 */
  tag?: string;
}

/**
 * 消息业务标签
 */
export interface MessageBizTag {
  /** 来源ID */
  sourceId?: string;
  /** 消息ID */
  messageId?: string;
}

/**
 * 消息详细信息
 */
export interface MessageDetail {
  /** 应用版本 */
  _appVersion?: string;
  /** 平台 */
  _platform?: string;
  /** 业务标签（JSON字符串） */
  bizTag?: string;
  /** 客户端IP */
  clientIp?: string;
  /** 详细通知 */
  detailNotice?: string;
  /** 扩展JSON（JSON字符串） */
  extJson?: string;
  /** 端口 */
  port?: string;
  /** 提醒内容 */
  reminderContent?: string;
  /** 提醒通知 */
  reminderNotice?: string;
  /** 提醒标题 */
  reminderTitle?: string;
  /** 提醒URL */
  reminderUrl?: string;
  /** 发送者用户ID */
  senderUserId?: string;
  /** 发送者用户类型 */
  senderUserType?: string;
  /** 会话类型 */
  sessionType?: string;
  /** UMID */
  umid?: string;
  /** UMID Token */
  umidToken?: string;
  /** 设备唯一标识 */
  utdid?: string;
}

/**
 * 消息主体
 */
export interface MessageBody {
  /** 发送者ID */
  '1'?: string;
  /** 接收者ID */
  '2'?: string;
  /** 消息ID */
  '3'?: string;
  /** 未知字段 */
  '4'?: number;
  /** 时间戳 */
  '5'?: string;
  /** 消息内容 */
  '6'?: {
    /** 消息类型 */
    '1'?: number;
    /** 消息数据 */
    '3'?: {
      /** 字段1 */
      '1'?: string;
      /** 消息文本 */
      '2'?: string;
      /** 字段3 */
      '3'?: string;
      /** 字段4 */
      '4'?: number;
      /** 消息内容JSON（JSON字符串） */
      '5'?: string;
    };
  };
  /** 消息状态 */
  '7'?: number;
  /** 字段8 */
  '8'?: number;
  /** 字段9 */
  '9'?: number;
  /** 消息详细信息 */
  '10'?: MessageDetail;
  /** 字段12 */
  '12'?: number;
}

/**
 * 推送配置
 */
export interface PushConfig {
  /** 是否需要推送 */
  needPush?: string;
}

/**
 * 解码后的消息数据
 */
export interface DecodedMessage {
  /** 消息主体 */
  '1'?: MessageBody;
  /** 推送配置 */
  '3'?: PushConfig;
}

/**
 * 格式化后的消息（便于使用）
 */
export interface FormattedMessage {
  /** 消息ID */
  messageId?: string;
  /** 发送者ID */
  senderId?: string;
  /** 接收者ID */
  receiverId?: string;
  /** 消息文本 */
  text?: string;
  /** 时间戳 */
  timestamp?: string;
  /** 消息类型 */
  messageType?: number;
  /** 会话类型 */
  sessionType?: string;
  /** 消息内容（解析后的JSON） */
  content?: DecodedMessageContent;
  /** 扩展信息（解析后的JSON） */
  extJson?: MessageExtJson;
  /** 业务标签（解析后的JSON） */
  bizTag?: MessageBizTag;
  /** 提醒URL */
  reminderUrl?: string;
  /** 原始数据 */
  raw?: DecodedMessage;
}
