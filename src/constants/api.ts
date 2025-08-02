// API 基础配置
export const API_CONFIG = {
  // 请求配置
  BASE_URL: 'https://h5api.m.goofish.com',
  API_PREFIX: 'h5',
  APP_KEY: '34839810',
  JSV: '2.7.2',
  TIMEOUT: 20000,
  DATA_TYPE: 'json',
  TYPE: 'originaljson',
  SESSION_OPTION: 'AutoLoginOnly',
  V: '1.0',
  ACCOUNT_SITE: 'xianyu',
  SPM_CNT: 'a21ybx.undefined.0.0',

  // 请求头
  HEADERS_ORIGIN: 'https://www.goofish.com',
  HEADERS_REFERER: 'https://www.goofish.com',
  HEADERS_CONTENT_TYPE: 'application/x-www-form-urlencoded',
  HEADERS_USER_AGENT:
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
