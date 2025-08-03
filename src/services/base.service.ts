import type { HttpClient } from '../core/http';
import type { GoofishConfig } from '../client/goofish.client';
import type {
  RequestOptions,
  BuildParamsOutput,
  GoofishResponse,
  HttpRequestConfig,
} from '../types';
import { generateSign, type Logger } from '../utils';
import { TokenManager } from '../managers';

export abstract class BaseService {
  protected http: HttpClient;
  protected config: GoofishConfig;
  protected logger: Logger;

  constructor(http: HttpClient, config: GoofishConfig, logger: Logger) {
    this.http = http;
    this.config = config;
    this.logger = logger;

    // 初始化 token
    if (config.cookie) {
      TokenManager.updateFromCookie(config.cookie, logger);
    }
  }

  /**
   * 构建请求参数
   */
  protected buildParams(api: string, data: string): BuildParamsOutput {
    const t = Date.now();

    const params = {
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
        data,
        token: TokenManager.getToken(),
      }),
      spm_cnt: this.config.spmCnt,
      spm_pre: this.config.spmPre,
    };

    return params;
  }

  /**
   * 构建请求配置
   */
  private buildRequestConfig<TData>(
    url: string,
    method: string,
    data: string,
    params: BuildParamsOutput,
    options: RequestOptions<TData>
  ): HttpRequestConfig {
    return {
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
      withCredentials: true,
      ...options.config,
    };
  }

  /**
   * 发送请求（带自动重试）
   */
  protected async request<TResponse, TData = unknown>(
    options: RequestOptions<TData>
  ): Promise<GoofishResponse<TResponse>> {
    const url = this.buildUrl(options.api);
    const data = JSON.stringify(options.data || {});
    const method = options.method || 'POST';

    // 构建请求参数
    const params = this.buildParams(options.api, data);
    const requestConfig = this.buildRequestConfig(
      url,
      method,
      data,
      params,
      options
    );
    // 发送请求
    const response = await this.http.request<GoofishResponse<TResponse>>(
      requestConfig
    );

    // 检查是否需要刷新 token 并重试
    if (TokenManager.isTokenError(response.data)) {
      this.logger.info('🔄 Token 自动刷新并重试，重试原因:', response.data.ret);

      if (TokenManager.updateFromHeaders(response.headers, this.logger)) {
        // 使用新 token 重新构建参数并重试
        const retryParams = this.buildParams(options.api, data);
        const retryConfig = this.buildRequestConfig(
          url,
          method,
          data,
          retryParams,
          options
        );

        const retryResponse = await this.http.request<
          GoofishResponse<TResponse>
        >(retryConfig);

        return retryResponse.data;
      } else {
        this.logger.error('Token 刷新失败', response.data);
      }
    }

    // 正常响应，尝试更新 token（如果有新的）
    TokenManager.updateFromHeaders(response.headers);

    return response.data;
  }

  /**
   * 构建完整的 API URL
   */
  protected buildUrl(api: string): string {
    return `${this.config.baseURL}/${this.config.apiPrefix}/${api}/${this.config.v}/`;
  }
}
