/**
 * 发送消息相关类型定义
 */

/**
 * 消息内容
 */
export interface SendMessageContent {
  /** 内容类型 */
  contentType: number;
  /** 自定义内容 */
  custom?: {
    /** 类型 */
    type: number;
    /** Base64 编码的数据 */
    data: string;
  };
}

/**
 * 消息扩展信息
 */
export interface SendMessageExtension {
  /** 扩展 JSON 字符串 */
  extJson?: string;
}

/**
 * 消息上下文
 */
export interface SendMessageContext {
  /** 应用版本 */
  appVersion?: string;
  /** 平台 */
  platform?: string;
}

/**
 * 消息主体
 */
export interface SendMessageBody {
  /** UUID（唯一标识） */
  uuid: string;
  /** 会话 ID */
  cid: string;
  /** 会话类型 */
  conversationType: number;
  /** 消息内容 */
  content: SendMessageContent;
  /** 红点策略 */
  redPointPolicy?: number;
  /** 扩展信息 */
  extension?: SendMessageExtension;
  /** 上下文 */
  ctx?: SendMessageContext;
  /** 消息标签 */
  mtags?: Record<string, unknown>;
  /** 消息已读状态设置 */
  msgReadStatusSetting?: number;
}

/**
 * 接收者范围
 */
export interface ReceiverScope {
  /** 实际接收者列表 */
  actualReceivers: string[];
}

/**
 * 发送消息请求参数（按接收者范围）
 */
export interface SendMessageByReceiverScopeRequest {
  /** 消息主体 */
  message: SendMessageBody;
  /** 接收者范围 */
  receivers: ReceiverScope;
}

/**
 * 发送消息响应（按接收者范围）
 */
export interface SendMessageByReceiverScopeResponse {
  /** 服务器时间戳 */
  'server-timestamp'?: string;
}
