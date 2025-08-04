// API 基础配置
export const API_CONFIG = {
  ORIGIN: 'https://www.goofish.com',
  REFERER: 'https://www.goofish.com',
  CONTENT_TYPE: 'application/x-www-form-urlencoded',
  USER_AGENT:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
} as const;

// API 端点映射
export const API_ENDPOINTS = {
  // 用户相关
  USER: {
    // 用户导航（包含用户名、头像、关注、粉丝等信息）
    NAV: 'mtop.idle.web.user.page.nav',
    // 用户头部（包含用户ID、用户信息、宝贝发布、信用信息等更详细的数据）
    HEAD: 'mtop.idle.web.user.page.head',
  },

  // 商品相关
  ITEM: {},

  // 搜索相关
  SEARCH: {
    // 搜索商品
    SEARCH: 'mtop.taobao.idlemtopsearch.pc.search',
  },

  // 订单相关
  ORDER: {},

  // 消息相关
  MESSAGE: {},
} as const;

// 令牌错误代码
export const TOKEN_ERROR_CODES = [
  'FAIL_SYS_TOKEN_EMPTY',
  'FAIL_SYS_TOKEN_ILLEGAL',
  'FAIL_SYS_SESSION_EXPIRED',
] as const;

// 令牌 cookie 名称
export const TOKEN_COOKIE_NAME = '_m_h5_tk';

// 令牌 cookie 正则
export const TOKEN_COOKIE_REGEX = /_m_h5_tk=([^_]+)_/;
