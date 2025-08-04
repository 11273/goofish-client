// Passport 认证服务配置
export const PASSPORT_CONFIG = {
  // 请求配置
  BASE_URL: 'https://passport.goofish.com',
  TIMEOUT: 20000,
  APP_NAME: 'xianyu',
  FROM_SITE: '77',
  APP_ENTRANCE: 'web',
  MAIN_PAGE: false,
  IS_MOBILE: false,
  LANG: 'zh_CN',
  UMID_TAG: 'SERVER',
} as const;

// Passport API 端点
export const PASSPORT_ENDPOINTS = {
  // 二维码相关
  QR: {
    GENERATE: '/newlogin/qrcode/generate.do',
  },
} as const;

// Passport 相关常量
export const PASSPORT_CONSTANTS = {
  QR_POLL_INTERVAL: 2000,
  QR_TIMEOUT: 120000,
} as const;
