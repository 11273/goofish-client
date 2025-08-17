// Mtop 协议相关配置
export const MTOP_CONFIG = {
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
  SPM_PRE: 'a21ybx.undefined.0.0',
  LOG_ID: '',
} as const;

// Mtop API 端点
export const MTOP_ENDPOINTS = {
  // 首页相关
  HOME: {
    // 猜你喜欢
    FEED: 'mtop.taobao.idlehome.home.webpc.feed',
  },
  // 用户相关
  USER: {
    // 用户导航
    NAV: 'mtop.idle.web.user.page.nav',
    // 用户头部
    HEAD: 'mtop.idle.web.user.page.head',
  },
  // 搜索相关
  SEARCH: {
    // 搜索
    SEARCH: 'mtop.taobao.idlemtopsearch.pc.search',
  },
  // 商品相关
  ITEM: {
    // 商品详情
    DETAIL: 'mtop.taobao.idle.pc.detail',
  },
  // 订单相关
  ORDER: {},
  // 消息相关
  MESSAGE: {},
} as const;

// Mtop 令牌相关
export const MTOP_TOKEN = {
  // 令牌错误代码
  ERROR_CODES: [
    'FAIL_SYS_TOKEN_EMPTY',
    'FAIL_SYS_TOKEN_ILLEGAL',
    'FAIL_SYS_SESSION_EXPIRED',
  ],
  // 令牌 cookie 名称
  COOKIE_NAME: '_m_h5_tk',
  // 令牌 cookie 正则
  COOKIE_REGEX: /_m_h5_tk=([^_]+)_/,
} as const;
