// API 响应基础结构
export interface GoofishResponse<T = unknown> {
  api: string;
  data: T;
  ret: string[];
  v: string;
  traceId?: string;
}

// 错误响应的 data 结构
export interface ErrorResponseData {
  url?: string; // 重定向URL（通常是登录页）
  h5url?: string; // 移动端URL
  dialogSize?: {
    // 对话框尺寸
    width: string;
    height: string;
  };
}

// 错误响应类型
export interface GoofishErrorResponse
  extends GoofishResponse<ErrorResponseData> {
  dialogSize?: {
    width: string;
    height: string;
  };
}

// 响应状态判断辅助类型
export interface ResponseStatus {
  success: boolean;
  needLogin: boolean;
  errorCode?: string;
  errorMessage?: string;
}

// 错误码枚举
export enum ErrorCode {
  SUCCESS = 'SUCCESS',
  TOKEN_EXPIRED = 'FAIL_SYS_TOKEN_EXOIRED',
  // 可以添加更多错误码
}

// API 错误类型
export interface GoofishError {
  code: string;
  message: string;
  api?: string;
  data?: unknown;
}

// 请求配置
export interface GoofishRequestConfig {
  // 是否需要签名
  needSign?: boolean;
  // 是否自动刷新token
  autoRefreshToken?: boolean;
  // 重试次数
  retryTimes?: number;
  // 自定义请求头
  headers?: Record<string, string>;
  // 是否显示loading
  showLoading?: boolean;
}

// 扩展 AxiosRequestConfig
import type { AxiosRequestConfig } from 'axios';

export interface GoofishAxiosRequestConfig extends AxiosRequestConfig {
  goofish?: GoofishRequestConfig;
}
