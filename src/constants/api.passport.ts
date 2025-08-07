// Passport 认证服务配置
export const PASSPORT_CONFIG = {
  // 请求配置
  BASE_URL: 'https://passport.goofish.com',
  APP_NAME: 'xianyu',
  FROM_SITE: '77',
} as const;

// Passport API 端点
export const PASSPORT_ENDPOINTS = {
  // 二维码相关
  QR: {
    // 生成二维码
    GENERATE: '/newlogin/qrcode/generate.do',
    // 查询二维码
    QUERY: '/newlogin/qrcode/query.do',
  },
} as const;
