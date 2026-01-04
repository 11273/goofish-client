// IM WebSocket 相关配置
export const IM_CONFIG = {
  // WebSocket URL
  WS_URL: 'wss://wss-goofish.dingtalk.com/',
  // SECONDARY_WS_URL: 'wss://msgacs.m.taobao.com/accs/auth',

  // 应用配置
  APP_KEY: '444e9908a51d1cb236a27862abc769c9',

  // User Agent
  USER_AGENT:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 DingTalk(2.2.0) OS(Mac OS/10.15.7) Browser(Chrome/141.0.0.0) DingWeb/2.2.0 IMPaaS DingWeb/2.2.0',

  // WebSocket 版本
  WS_VERSION: 'im:3,au:3,sy:6',

  // 数据类型
  DATA_TYPE: 'j',

  // 心跳间隔（毫秒）
  HEARTBEAT_INTERVAL: 10000,

  // 重连配置
  RECONNECT_INTERVAL: 3000,
  MAX_RECONNECT_ATTEMPTS: 5,

  // 请求超时时间（毫秒）
  REQUEST_TIMEOUT: 20000,

  // 缓存头
  CACHE_HEADER: 'app-key token ua wv',

  // 同步
  SYNC: '0,0;0;0;',
} as const;

// IM API 端点（WebSocket 路径）
export const IM_ENDPOINTS = {
  // 认证相关
  AUTH: {
    // 注册
    REGISTER: '/reg',
    // 心跳
    HEARTBEAT: '/!',
    // 同步状态
    SYNC_STATUS: '/r/SyncStatus/getState',
    // 确认同步差异
    ACK_DIFF: '/r/SyncStatus/ackDiff',
  },
  // 会话相关
  CONVERSATION: {
    // 获取会话列表
    LIST_NEWEST_PAGINATION: '/r/Conversation/listNewestPagination',
  },
  // 消息相关
  MESSAGE: {
    // 发送消息
    SEND: '/r/MessageSend/sendByReceiverScope',
  },
  // 推送相关
  PUSH: {
    // 同步推送
    SYNC: '/s/sync',
  },
} as const;

// IM Token 获取端点（Mtop）
export const IM_MTOP_ENDPOINTS = {
  // 获取 IM 登录 Token
  LOGIN_TOKEN: 'mtop.taobao.idlemessage.pc.login.token',
} as const;
