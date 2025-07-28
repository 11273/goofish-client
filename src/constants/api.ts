// API 基础配置
export const API_CONFIG = {
  BASE_URL: 'https://h5api.m.goofish.com',
  API_PREFIX: '/h5',
  APP_KEY: '34839810',
  JSV: '2.7.2',
  TIMEOUT: 20000,
  DATA_TYPE: 'application/json',
  TYPE: 'originaljson',
  USER_AGENT:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  VERSION: '1.0',
  SESSION_OPTION: 'AutoLoginOnly',
} as const;

// API 端点映射
export const API_ENDPOINTS = {
  // 用户相关
  USER: {},

  // 商品相关
  ITEM: {},

  // 搜索相关
  SEARCH: {
    // 搜索商品
    ITEMS: 'mtop.taobao.idlemtopsearch.pc.search',
  },

  // 订单相关
  ORDER: {},

  // 消息相关
  MESSAGE: {},
} as const;
