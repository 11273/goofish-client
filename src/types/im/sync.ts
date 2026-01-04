/**
 * IM 同步消息相关类型定义
 */

/**
 * 同步推送包
 */
export interface SyncPushPackage {
  /** 最大高优先级时间戳 */
  maxHighPts?: number;
  /** 开始序列号 */
  startSeq?: number;
  /** 结束序列号 */
  endSeq?: number;
  /** 最小创建时间 */
  minCreateTime?: number;
  /** 消息数据列表 */
  data?: SyncMessageData[];
  /** 最大时间戳 */
  maxPts?: number;
  /** 是否有更多 */
  hasMore?: number;
  /** 时间戳 */
  timestamp?: number;
}

/**
 * 同步消息数据
 */
export interface SyncMessageData {
  /** 业务类型 */
  bizType?: number;
  /** Base64 编码的数据 */
  data?: string;
  /** 流 ID */
  streamId?: string;
  /** 对象类型 */
  objectType?: number;
}

/**
 * 同步扩展模型
 */
export interface SyncExtensionModel {
  /** 重连类型 */
  reconnectType?: number;
  /** 故障转移 */
  failover?: number;
  /** 指纹 */
  fingerprint?: number;
}

/**
 * 同步推送消息体
 */
export interface SyncPushBody {
  /** 同步推送包 */
  syncPushPackage?: SyncPushPackage;
  /** 同步扩展模型 */
  syncExtensionModel?: SyncExtensionModel;
}

/**
 * 解码后的业务消息（待实现具体解码逻辑）
 */
export interface DecodedBusinessMessage {
  /** 原始 Base64 数据 */
  raw: string;
  /** 解码后的数据 */
  decoded?: unknown;
  /** 业务类型 */
  bizType?: number;
  /** 对象类型 */
  objectType?: number;
  /** 流 ID */
  streamId?: string;
  /** 解码错误（如果有） */
  error?: string;
}

/**
 * 解码后的同步消息数据
 */
export interface DecodedSyncItem {
  /** 原始数据 */
  raw: SyncMessageData;
  /** 解码后的数据 */
  decoded?: unknown;
  /** 解码错误（如果有） */
  error?: unknown;
}
