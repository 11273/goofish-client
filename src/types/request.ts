import type { AxiosRequestConfig, Method } from 'axios';
/**
 * 基础请求选项
 */
export interface RequestOptions<TData> {
  /** API 接口名称 */
  api: string;

  /** 请求方法 */
  method?: Method;

  /** 请求数据 */
  data?: TData;

  /** API 版本，默认 1.0 */
  version?: string;

  /** 是否需要签名，默认 true */
  needSign?: boolean;

  /** 是否自动刷新 Token，默认 true */
  autoRefreshToken?: boolean;

  /** 重试次数，默认 3 */
  retryTimes?: number;

  /** 自定义 Axios 配置 */
  config?: AxiosRequestConfig;

  /** 扩展配置 */
  extra?: Record<string, unknown>;
}
/**
 * 内部请求选项（合并了默认值）
 */
export interface InternalRequestOptions<TData>
  extends Required<Omit<RequestOptions<TData>, 'data' | 'config' | 'extra'>> {
  data?: TData;
  config?: AxiosRequestConfig;
  extra?: Record<string, unknown>;
}

/**
 * HTTP 客户端配置
 */
export interface HttpClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  /** 原生 Axios 配置 */
  axiosConfig?: AxiosRequestConfig;
}

/**
 * 扩展的请求配置
 */
export interface HttpRequestConfig extends AxiosRequestConfig {
  /** 跳过错误处理 */
  skipErrorHandler?: boolean;
}
/**
 * buildParams 方法的返回值类型
 */
export interface BuildParamsOutput {
  /** 应用密钥 */
  appKey: string;
  /** JavaScript 版本 */
  jsv: string;
  /** 数据类型 */
  dataType: string;
  /** 请求类型 */
  type: string;
  /** API 版本 */
  version: string;
  /** 会话选项 */
  sessionOption: string;
  /** 时间戳 */
  t: number;
  /** 版本号 */
  v: string;
  /** 账户站点 */
  accountSite: string;
  /** 超时时间 */
  timeout: number;
  /** API 接口名称 */
  api: string;
  /** 请求签名 */
  sign: string;
  /** SPM 计数 */
  spm_cnt: string;
}
