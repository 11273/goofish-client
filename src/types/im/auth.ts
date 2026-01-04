/**
 * IM 登录 Token 请求参数
 */
export interface ImLoginTokenRequest {
  /** 应用密钥 */
  appKey: string;
  /** 设备 ID */
  deviceId: string;
}

/**
 * IM 登录 Token 响应数据
 */
export interface ImLoginTokenResponse {
  /** Token */
  accessToken: string;
  /** 访问令牌过期时间：86400000 */
  accessTokenExpiredTime: string;
  /** 刷新令牌 */
  refreshToken: string;
}

/**
 * IM 注册请求参数
 */
export interface ImRegisterRequest {
  /** 应用密钥 */
  'app-key'?: string;
  /** Token */
  token: string;
  /** User Agent */
  ua?: string;
  /** WebSocket 版本 */
  wv?: string;
  /** 数据类型 */
  dt?: string;
  /** 同步参数 */
  sync?: string;
  /** 设备 ID */
  did?: string;
  /** 消息 ID */
  mid?: string;
  /** 缓存头 */
  'cache-header'?: string;
}

/**
 * IM 注册响应数据
 */
export interface ImRegisterResponse {
  /** IP 摘要 */
  'ip-digest'?: string;
  /** 数据类型 */
  dt?: string;
  /** 注册会话 ID */
  'reg-sid'?: string;
  /** IP 区域摘要 */
  'ip-region-digest'?: string;
  /** 注册用户 ID */
  'reg-uid'?: string;
  /** 消息 ID */
  mid?: string;
  /** 真实 IP */
  'real-ip'?: string;
  /** 会话 ID */
  sid?: string;
  /** 单元名称 */
  unitName?: string;
  /** Cookie */
  cookie?: string;
  /** 时间戳 */
  timestamp?: number;
  /** 是否来自中国 */
  isFromChina?: boolean;
}

/**
 * IM 同步状态请求参数
 */
export interface ImSyncStatusRequest {
  /** 主题（固定为 "sync"） */
  topic: string;
}

/**
 * IM 同步状态响应数据
 */
export interface ImSyncStatusResponse {
  /** 管道 */
  pipeline?: string;
  /** tooLong2Tag */
  tooLong2Tag?: string;
  /** 频道 */
  channel?: string;
  /** 主题 */
  topic?: string;
  /** 高优先级时间戳 */
  highPts?: number;
  /** 时间戳 */
  pts?: number;
  /** 序列号 */
  seq?: number;
  /** 时间戳 */
  timestamp?: number;
}

/**
 * IM 确认同步差异请求参数
 */
export interface ImAckDiffRequest {
  /** 管道 */
  pipeline: string;
  /** tooLong2Tag */
  tooLong2Tag?: string;
  /** 频道 */
  channel: string;
  /** 主题 */
  topic: string;
  /** 高优先级时间戳 */
  highPts: number;
  /** 时间戳 */
  pts: number;
  /** 序列号 */
  seq: number;
  /** 时间戳 */
  timestamp: number;
}

/**
 * IM 确认同步差异响应数据
 */
export interface ImAckDiffResponse {
  /** 同步扩展模型 */
  syncExtensionModel?: {
    /** 指纹 */
    fingerprint?: number;
  };
  /** 同步额外类型 */
  syncExtraType?: {
    /** 类型 */
    type?: number;
  };
}
