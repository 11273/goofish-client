import type { LogLevel } from '../../utils';

/**
 * 配置
 */
export interface GoofishConfig {
  // 基本配置
  level: LogLevel;
  cookie: string;

  // 请求配置 mtop
  mtop: GoofishMtopRequestConfig;

  // 请求配置 passport
  passport: GoofishPassportRequestConfig;

  // IM 配置
  im?: GoofishImConfig;

  // 请求头
  headers: GoofishRequestHeaders;
}

/**
 * Mtop 请求配置
 */
export interface GoofishMtopRequestConfig {
  // API 配置
  baseURL: string;
  // API 前缀
  apiPrefix: string;
  // 应用密钥
  appKey: string;
  // JavaScript 版本
  jsv: string;
  // 超时时间
  timeout: number;
  // 数据类型
  dataType: string;
  // 请求类型
  type: string;
  // 会话选项
  sessionOption: string;
  // 版本号
  v: string;
  // 账户站点
  accountSite: string;
  // SPM 计数
  spmCnt: string;
  // SPM 前缀
  spmPre: string;
  // 日志 ID
  logId: string;
}

/**
 * Passport 请求配置
 */
export interface GoofishPassportRequestConfig {
  // API 配置
  baseURL: string;
  // 应用名称
  appName: string;
  // 来源站点
  fromSite: string;
}

/**
 * IM 配置
 */
export interface GoofishImConfig {
  // WebSocket URL
  wsUrl?: string;
  // 辅助 WebSocket URL
  // secondaryWsUrl?: string;
  // 应用密钥
  appKey?: string;
  // 设备 ID
  deviceId?: string;
  // 自动重连
  autoReconnect?: boolean;
  // 心跳间隔（毫秒）
  heartbeatInterval?: number;
  // 重连间隔（毫秒）
  reconnectInterval?: number;
  // 最大重连次数
  maxReconnectAttempts?: number;
  // 请求超时时间（毫秒）
  requestTimeout?: number;
}

/**
 * 请求头
 */
export interface GoofishRequestHeaders {
  // User-Agent
  userAgent: string;
  // Origin
  origin: string;
  // Referer
  referer: string;
  // Content-Type
  contentType: string;
}
