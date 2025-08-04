import axios from 'axios';
import type {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  CancelTokenSource,
} from 'axios';

import type {
  HttpClientConfig,
  HttpRequestConfig,
} from '../types/common/request';

/**
 * HTTP 客户端
 */
export class HttpClient {
  private readonly axios: AxiosInstance;

  constructor(config: HttpClientConfig) {
    // 创建 Axios 实例
    this.axios = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      ...config.axiosConfig,
    });

    // 设置默认错误处理
    this.setupErrorHandler();
  }

  /**
   * 设置错误处理
   */
  private setupErrorHandler(): void {
    this.axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        // 直接抛出原始错误
        return Promise.reject(error);
      }
    );
  }

  /**
   * 发送请求
   */
  async request<T = unknown>(
    config: HttpRequestConfig
  ): Promise<AxiosResponse<T>> {
    return await this.axios.request<T>(config);
  }

  /**
   * 获取 Axios 实例（用于高级场景）
   */
  getAxios(): AxiosInstance {
    return this.axios;
  }

  /**
   * 创建取消令牌
   */
  createCancelToken(): CancelTokenSource {
    return axios.CancelToken.source();
  }

  /**
   * 设置 Cookie
   */
  setCookie(cookie: string): void {
    this.axios.defaults.headers.common['Cookie'] = cookie;
  }

  /**
   * 获取 Cookie
   */
  getCookie(): string | undefined {
    return this.axios.defaults.headers.common['Cookie'] as unknown as
      | string
      | undefined;
  }

  /**
   * 设置 Header
   */
  setHeader(key: string, value: string): void {
    this.axios.defaults.headers.common[key] = value;
  }

  /**
   * 获取 Header
   */
  getHeader(key: string): string | undefined {
    return this.axios.defaults.headers.common[key] as unknown as
      | string
      | undefined;
  }
}
