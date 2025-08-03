import type { HttpClient } from '../core/http';
import type { GooFishConfig } from '../client/goofish.client';
import type {
  RequestOptions,
  BuildParamsOutput,
  GooFishResponse,
  HttpRequestConfig,
} from '../types';
import { generateSign, type Logger } from '../utils';

// 常量定义
const TOKEN_ERROR_CODES = [
  'FAIL_SYS_TOKEN_EMPTY',
  'FAIL_SYS_TOKEN_ILLEGAL',
  'FAIL_SYS_SESSION_EXPIRED',
] as const;
const TOKEN_COOKIE_REGEX = /_m_h5_tk=([^_]+)_/;

export abstract class BaseService {
  protected http: HttpClient;
  protected config: GooFishConfig;
  protected logger: Logger;
  private token: string = '';

  constructor(http: HttpClient, config: GooFishConfig, logger: Logger) {
    this.http = http;
    this.config = config;
    this.logger = logger;
  }

  /**
   * 从响应头中提取并更新 token
   */
  private updateTokenFromHeaders(headers: Record<string, unknown>): boolean {
    const setCookieHeaders = headers['set-cookie'];
    this.logger.debug('🔄 设置cookie响应头:', setCookieHeaders);
    if (!setCookieHeaders) return false;

    const cookies = Array.isArray(setCookieHeaders)
      ? setCookieHeaders
      : [setCookieHeaders];
    const tokenCookie = cookies.find((cookie: string) =>
      cookie.includes('_m_h5_tk=')
    );

    if (tokenCookie && typeof tokenCookie === 'string') {
      const match = tokenCookie.match(TOKEN_COOKIE_REGEX);
      const newToken = match?.[1];
      if (newToken && newToken !== this.token) {
        this.token = newToken;
        return true;
      }
    }

    return false;
  }

  /**
   * 检查是否为 token 错误
   */
  private isTokenError<TResponse>(
    response: GooFishResponse<TResponse>
  ): boolean {
    if (!response.ret) return false;
    const retString = response.ret[0];
    if (!retString) return false;

    const errorCode = retString.split(
      '::'
    )[0] as (typeof TOKEN_ERROR_CODES)[number];
    return TOKEN_ERROR_CODES.includes(errorCode);
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
        data,
        token: this.token,
      }),
      spm_cnt: this.config.spmCnt,
    };
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
  ): Promise<GooFishResponse<TResponse>> {
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
    const response = await this.http.request<GooFishResponse<TResponse>>(
      requestConfig
    );

    // 检查是否需要刷新 token 并重试
    if (this.isTokenError(response.data)) {
      this.logger.info(
        '🔄 Token 自动刷新并重试，重试原因:',
        response.data.ret?.[0]
      );
      const tokenUpdated = this.updateTokenFromHeaders(response.headers);
      this.logger.debug('🔄 Token 刷新结果:', {
        tokenUpdated,
        token: this.token,
      });

      if (tokenUpdated) {
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
          GooFishResponse<TResponse>
        >(retryConfig);

        return retryResponse.data;
      } else {
        this.logger.error('Token 刷新失败', response.data);
      }
    }

    // 正常响应，尝试更新 token（如果有新的）
    this.updateTokenFromHeaders(response.headers);

    return response.data;
  }

  /**
   * 构建完整的 API URL
   */
  protected buildUrl(api: string): string {
    return `${this.config.baseURL}/${this.config.apiPrefix}/${api}/${this.config.v}/`;
  }
}
