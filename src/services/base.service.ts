import type { HttpClient } from '../core/http';
import type { GooFishConfig } from '../client/goofish.client';
import type {
  RequestOptions,
  BuildParamsOutput,
  GooFishResponse,
} from '../types';
import { generateSign } from '../utils';

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
    return `${this.config.baseURL}/${this.config.apiPrefix}/${api}/${this.config.v}/`;
  }

  /**
   * 构建请求参数
   */
  protected buildParams(api: string, data: string): BuildParamsOutput {
    const t = Date.now();
    return {
      appKey: this.config.appKey,
      jsv: this.config.jsv,
      dataType: this.config.dataType,
      type: this.config.type,
      sessionOption: this.config.sessionOption,
      t,
      v: this.config.v,
      accountSite: this.config.accountSite,
      timeout: this.config.timeout,
      api,
      sign: generateSign({
        appKey: this.config.appKey,
        t: t.toString(),
        data: data.toString(),
        // TODO
        token: '',
      }),
      spm_cnt: this.config.spmCnt,
    };
  }

  /**
   * 发送请求
   */
  protected async request<TResponse, TData = unknown>(
    options: RequestOptions<TData>
  ): Promise<GooFishResponse<TResponse>> {
    const url = this.buildUrl(options.api);
    const data = JSON.stringify(options.data || {});
    const params = this.buildParams(options.api, data);
    const method = options.method || 'POST';

    try {
      // 发送请求
      const response = await this.http.request<GooFishResponse<TResponse>>({
        url,
        method,
        data: { data },
        params,
        headers: {
          Origin: this.config.origin,
          Referer: this.config.referer,
          'Content-Type': this.config.contentType,
          'User-Agent': this.config.userAgent,
        },
        timeout: this.config.timeout,
        ...options.config,
      });

      // 处理响应
      return this.handleResponse<TResponse>(response);
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  }

  /**
   * 处理响应
   */
  private handleResponse<T>(response: GooFishResponse<T>): GooFishResponse<T> {
    // const retString = response.ret?.[0];

    // if (!retString) {
    //   throw new Error('Invalid response format');
    // }
    // // 成功
    // if (retString.includes('SUCCESS')) {
    //   return response.data;
    // }

    return response;
  }

  /**
   * 处理错误
   */
  private handleError(error: unknown): Error {
    // if (error instanceof Error && 'response' in error) {
    //   const message =
    //     (error as { response: { data: { message: string } } }).response.data
    //       ?.message || 'Request failed';
    //   return new Error(message);
    // }

    return error instanceof Error ? error : new Error('Unknown error');
  }
}
