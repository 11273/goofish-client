/**
 * 登录参数
 */
export interface LoginParams {
  /** 登录ID（手机号/用户名） */
  loginId: string;
  /** 加密后的密码 */
  password2: string;
  /** 是否保持登录 */
  keepLogin?: boolean;
  /** 是否在iframe中 */
  isIframe?: boolean;
  /** 文档引用页 */
  documentReferer?: string;
  /** 默认视图 */
  defaultView?: string;
  /** 用户代理字符串 */
  ua?: string;
  /** 用户标识获取状态值 */
  umidGetStatusVal?: string | number;
  /** 屏幕像素 */
  screenPixel?: string;
  /** 导航语言 */
  navlanguage?: string;
  /** 导航用户代理 */
  navUserAgent?: string;
  /** 导航平台 */
  navPlatform?: string;
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
  mainPage?: boolean;
  /** 是否为移动端 */
  isMobile?: boolean;
  /** 语言 */
  lang?: string;
  /** 返回URL */
  returnUrl?: string;
  /** 来源站点 */
  fromSite?: string;
  /** 用户标识标签 */
  umidTag?: string;
  /** 微博移动端桥接 */
  weiBoMpBridge?: string;
  /** JavaScript版本 */
  jsVersion?: string;
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
 * 登录数据（用于POST请求body）
 */
export interface LoginData {
  /** 登录ID（手机号/用户名） */
  loginId: string;
  /** 加密后的密码 */
  password2: string;
  /** 是否保持登录 */
  keepLogin?: string;
  /** 是否在iframe中 */
  isIframe?: string;
  /** 文档引用页 */
  documentReferer?: string;
  /** 默认视图 */
  defaultView?: string;
  /** 用户代理字符串 */
  ua?: string;
  /** 用户标识获取状态值 */
  umidGetStatusVal?: string;
  /** 屏幕像素 */
  screenPixel?: string;
  /** 导航语言 */
  navlanguage?: string;
  /** 导航用户代理 */
  navUserAgent?: string;
  /** 导航平台 */
  navPlatform?: string;
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
  /** 微博移动端桥接 */
  weiBoMpBridge?: string;
  /** JavaScript版本 */
  jsVersion?: string;
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
 * 登录响应数据
 */
export interface LoginResponse {
  /** 标题消息（错误时显示） */
  titleMsg?: string;
  /** 结果码 */
  resultCode?: number;
}
