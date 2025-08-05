import type { HttpClient } from '../../core/http';
import type { GoofishConfig } from '../../types';
import type {
  RequestOptions,
  BuildParamsOutput,
  GoofishResponse,
  HttpRequestConfig,
} from '../../types';
import { generateSign } from '../../utils';
import { TokenManager } from '../../managers';
import { logger } from '../../utils/logger';
import { BaseService } from './base.service';

export abstract class BaseMtopService extends BaseService {
  constructor(http: HttpClient, config: GoofishConfig) {
    super(http, config);

    // 初始化 token
    if (config.cookie) {
      TokenManager.updateFromCookie(config.cookie);
    }
  }

  /**
   * 构建请求参数
   */
  protected buildParams(api: string, data: string): BuildParamsOutput {
    const t = Date.now();

    const params = {
      appKey: this.config.mtop.appKey,
      jsv: this.config.mtop.jsv,
      dataType: this.config.mtop.dataType,
      type: this.config.mtop.type,
      sessionOption: this.config.mtop.sessionOption,
      t,
      v: this.config.mtop.v,
      accountSite: this.config.mtop.accountSite,
      timeout: this.config.mtop.timeout,
      api,
      sign: generateSign({
        appKey: this.config.mtop.appKey,
        t: t.toString(),
        data,
        token: TokenManager.getToken(),
      }),
      spm_cnt: this.config.mtop.spmCnt,
      spm_pre: this.config.mtop.spmPre,
      log_id: this.config.mtop.logId,
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
        Origin: this.config.headers.origin,
        Referer: this.config.headers.referer,
        'Content-Type': this.config.headers.contentType,
        'User-Agent': this.config.headers.userAgent,
      },
      timeout: this.config.mtop.timeout,
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
      logger.info('🔄 Token 自动刷新并重试，重试原因:', response.data.ret);

      if (TokenManager.updateFromHeaders(response.headers)) {
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
        logger.error('Token 刷新失败', response.data);
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
    return `${this.config.mtop.baseURL}/${this.config.mtop.apiPrefix}/${api}/${this.config.mtop.v}/`;
  }
}
