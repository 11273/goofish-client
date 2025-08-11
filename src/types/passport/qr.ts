/**
 * 二维码生成响应
 */
export interface QrGenerateResponse {
  /** 时间戳 */
  t: number | string;
  /** 二维码内容URL */
  codeContent: string;
  /** cookie值 */
  ck: string;
  /** 结果码 */
  resultCode: number;
  /** 是否处理完成 */
  processFinished: boolean;
  /** 登录令牌（从codeContent中提取） */
  lgToken?: string;
}
/**
 * 二维码生成参数
 */
export interface QRCodeGenerateParams {
  /** 应用名称 */
  appName?: string;
  /** 来源站点 */
  fromSite?: string;
  /** 应用入口 */
  appEntrance?: string;
  /** 跨站请求伪造令牌 */
  _csrf_token?: string;
  /** 用户标识令牌 */
  umidToken?: string;
  /** 用户代理 */
  hsiz?: string;
  /** 业务参数 */
  bizParams?: string;
  /** 是否为主页 */
  mainPage?: boolean;
  /** 是否为移动设备 */
  isMobile?: boolean;
  /** 语言 */
  lang?: string;
  /** 返回URL */
  returnUrl?: string;
  /** 用户代理 */
  'bx-ua'?: string;
  /** 用户标识令牌 */
  'bx-umidtoken'?: string;
  /** 是否加载 */
  bx_et?: string;
  /** 用户标识标签 */
  umidTag?: string;
}
/**
 * 二维码状态枚举
 */
export enum QRCodeStatus {
  /** 新生成 */
  NEW = 'NEW',
  /** 已扫描 */
  SCANED = 'SCANED',
  /** 已确认 */
  CONFIRMED = 'CONFIRMED',
  /** 已取消 */
  CANCELED = 'CANCELED',
  /** 已过期 */
  EXPIRED = 'EXPIRED',
  /** 错误 */
  ERROR = 'ERROR',
}

/**
 * 二维码查询请求数据
 */
export interface QRCodeQueryData {
  /** 时间戳 */
  t: string;
  /** cookie值 */
  ck: string;
  /** 用户代理 */
  ua?: string;
  /** 应用名称 */
  appName?: string;
  /** 应用入口 */
  appEntrance?: string;
  /** 跨站请求伪造令牌 */
  _csrf_token?: string;
  /** 用户标识令牌 */
  umidToken?: string;
  /** 用户代理hash */
  hsiz?: string;
  /** 业务参数 */
  bizParams?: string;
  /** 是否为主页面 */
  mainPage?: string;
  /** 是否为移动端 */
  isMobile?: string;
  /** 语言 */
  lang?: string;
  /** 返回URL */
  returnUrl?: string;
  /** 来源站点 */
  fromSite?: string;
  /** 用户标识标签 */
  umidTag?: string;
  /** 导航语言 */
  navlanguage?: string;
  /** 导航用户代理 */
  navUserAgent?: string;
  /** 导航平台 */
  navPlatform?: string;
  /** 是否为iframe */
  isIframe?: string;
  /** 文档引用页 */
  documentReferer?: string;
  /** 默认视图 */
  defaultView?: string;
  /** 设备ID */
  deviceId?: string;
  /** 页面跟踪ID */
  pageTraceId?: string;
  /** bx用户代理 */
  'bx-ua'?: string;
  /** bx用户标识令牌 */
  'bx-umidtoken'?: string;
  /** bx加载状态 */
  bx_et?: string;
}

/**
 * 二维码查询参数
 */
export interface QRCodeQueryParams {
  /** 时间戳 */
  t: number | string;
  /** cookie值 */
  ck: string;
  /** 用户代理 */
  ua?: string;
  /** 应用名称（如果不传会使用默认配置） */
  appName?: string;
  /** 应用入口 */
  appEntrance?: string;
  /** 跨站请求伪造令牌 */
  _csrf_token?: string;
  /** 用户标识令牌 */
  umidToken?: string;
  /** 用户代理hash */
  hsiz?: string;
  /** 业务参数 */
  bizParams?: string;
  /** 是否为主页面 */
  mainPage?: boolean;
  /** 是否为移动端 */
  isMobile?: boolean;
  /** 语言 */
  lang?: string;
  /** 返回URL */
  returnUrl?: string;
  /** 来源站点（如果不传会使用默认配置） */
  fromSite?: string;
  /** 用户标识标签 */
  umidTag?: string;
  /** 导航语言 */
  navlanguage?: string;
  /** 导航用户代理 */
  navUserAgent?: string;
  /** 导航平台 */
  navPlatform?: string;
  /** 是否为iframe */
  isIframe?: boolean;
  /** 文档引用页 */
  documentReferer?: string;
  /** 默认视图 */
  defaultView?: string;
  /** 设备ID */
  deviceId?: string;
  /** 页面跟踪ID */
  pageTraceId?: string;
  /** bx用户代理 */
  'bx-ua'?: string;
  /** bx用户标识令牌 */
  'bx-umidtoken'?: string;
  /** bx加载状态 */
  bx_et?: string;
}

/**
 * 二维码查询响应数据
 */
export interface QrQueryResponse {
  /** 二维码状态 */
  qrCodeStatus: QRCodeStatus;
  /** 结果码 */
  resultCode: number;
  /** 标题消息（错误时显示） */
  titleMsg?: string;
}
