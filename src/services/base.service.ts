import type { HttpClient } from '@/core/http';
import { API_CONFIG } from '@/constants';
import type { GooFishResponse, RequestOptions } from '@/types';

export abstract class BaseService {
  protected http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * 构建完整的 API URL
   */
  protected buildUrl(
    api: string,
    version: string = API_CONFIG.VERSION
  ): string {
    return `${API_CONFIG.BASE_URL}${API_CONFIG.API_PREFIX}/${api}/${version}/`;
  }

  /**
   * 发送请求
   */
  protected async request<TResponse, TData = unknown>(
    options: RequestOptions<TData>
  ): Promise<TResponse> {
    const url = this.buildUrl(options.api, options.version);

    try {
      // 发送请求
      const response = await this.http.request<GooFishResponse<TResponse>>({
        url,
        method: options.method || 'POST',
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
