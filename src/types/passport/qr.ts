/**
 * 二维码生成响应
 */
export interface QrGenerateResponse {
  /** 时间戳 */
  t: number;
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
  appName: string;
  /** 来源站点 */
  fromSite: string;
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
  bxUa?: string;
  /** 用户标识令牌 */
  bxUmidtoken?: string;
  /** 是否加载 */
  bx_et?: string;
  /** 用户标识标签 */
  umidTag?: string;
}
/**
 * 二维码查询数据
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
  /** 用户代理 */
  hsiz?: string;
  /** 业务参数 */
  bizParams?: string;
  /** 用户标识标签 */
  umidTag?: string;
}
