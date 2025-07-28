// src/core/interceptor.ts

import type {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

/**
 * 认证拦截器
 */
export const authInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  return config;
};

/**
 * 错误处理拦截器
 */
export const errorInterceptor = (error: AxiosError): never => {
  throw error;
};

/**
 * 响应数据转换拦截器
 */
export const transformInterceptor = (
  response: AxiosResponse
): AxiosResponse => {
  return response;
};

/**
 * 日志拦截器
 */
export const logInterceptor = {
  request: (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    console.log(
      `[API] ${config.method?.toUpperCase()} ${config.url}`,
      config.data
    );
    return config;
  },

  response: (response: AxiosResponse): AxiosResponse => {
    console.log(`[API] Response:`, response.data);
    return response;
  },

  error: (error: AxiosError): never => {
    console.error(`[API] Error:`, error.response?.data || error.message);
    throw error;
  },
};
