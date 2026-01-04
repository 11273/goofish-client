/**
 * WebSocket 客户端配置
 */
export interface WsClientConfig {
  /** WebSocket URL */
  wsUrl?: string;
  /** 自动重连 */
  autoReconnect?: boolean;
  /** 重连间隔（毫秒） */
  reconnectInterval?: number;
  /** 最大重连次数 */
  maxReconnectAttempts?: number;
  /** 心跳间隔（毫秒） */
  heartbeatInterval?: number;
  /** 请求超时时间（毫秒） */
  requestTimeout?: number;
  /** 自定义请求头 */
  headers?: Record<string, string>;
}

/**
 * WebSocket 消息结构（请求）
 */
export interface WsMessage {
  /** 路径/方法 */
  lwp?: string;
  /** 请求头 */
  headers?: Record<string, unknown>;
  /** 请求体 */
  body?: unknown;
  /** 状态码（用于响应） */
  code?: number;
}

/**
 * WebSocket 响应结构
 */
export interface WsResponse<T = unknown> {
  /** 响应头 */
  headers: Record<string, unknown>;
  /** 状态码 */
  code?: number;
  /** 路径/方法（服务端推送消息会包含） */
  lwp?: string;
  /** 响应体 */
  body?: T;
}

/**
 * WebSocket 连接状态
 */
export enum WsReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

/**
 * WebSocket 事件类型
 */
export interface WsEventMap {
  /** 连接建立 */
  open: () => void;
  /** 连接关闭 */
  close: (event: { code: number; reason: string }) => void;
  /** 发生错误 */
  error: (error: Error) => void;
  /** 收到消息 */
  message: (data: WsResponse) => void;
  /** 重连成功 */
  reconnect: (attempt: number) => void;
  /** 重连失败 */
  'reconnect-failed': () => void;
  /** 心跳 */
  heartbeat: () => void;
}

/**
 * 待处理请求
 */
export interface PendingRequest<T = unknown> {
  resolve: (value: WsResponse<T>) => void;
  reject: (reason: Error) => void;
  timeout: ReturnType<typeof setTimeout>;
}

/**
 * WebSocket 连接选项
 */
export interface WsConnectOptions extends WsClientConfig {
  /** 连接 URL */
  url?: string;
}
