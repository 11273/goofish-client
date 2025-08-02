import type { HttpClient } from '@/core/http';
import type { GooFishConfig } from '@/client/goofish.client';
import type { GooFishResponse, RequestOptions } from '@/types';

export abstract class BaseService {
  protected http: HttpClient;
  protected config: GooFishConfig;

  constructor(http: HttpClient, config: GooFishConfig) {
    this.http = http;
    this.config = config;
  }

  /**
   * 构建完整的 API URL
   */
  protected buildUrl(api: string): string {
    return `${this.config.baseURL}${this.config.apiPrefix}/${api}/${this.config.version}/`;
  }

  /**
   * 发送请求
   */
  protected async request<TResponse, TData = unknown>(
    options: RequestOptions<TData>
  ): Promise<TResponse> {
    const url = this.buildUrl(options.api);
    const method = options.method || 'POST';

    try {
      // 发送请求
      const response = await this.http.request<GooFishResponse<TResponse>>({
        url,
        method,
        data: options.data,
        ...options.config,
      });

      // 处理响应
      return this.handleResponse(response);
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  }

  /**
   * 处理响应
   */
  private handleResponse<T>(response: GooFishResponse<T>): T {
    const retString = response.ret?.[0];

    if (!retString) {
      throw new Error('Invalid response format');
    }
    // 成功
    if (retString.includes('SUCCESS')) {
      return response.data;
    }

    return response.data;
  }

  /**
   * 处理错误
   */
  private handleError(error: unknown): Error {
    if (error instanceof Error && 'response' in error) {
      const message =
        (error as { response: { data: { message: string } } }).response.data
          ?.message || 'Request failed';
      return new Error(message);
    }

    return error instanceof Error ? error : new Error('Unknown error');
  }
}
