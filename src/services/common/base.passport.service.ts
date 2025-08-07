import type { HttpClient } from '../../core/http';
import type { GoofishConfig, GoofishPassportResponse } from '../../types';
import type { RequestOptions } from '../../types';
import { logger } from '../../utils/logger';
import { BaseService } from './base.service';

export abstract class BasePassportService extends BaseService {
  constructor(http: HttpClient, config: GoofishConfig) {
    super(http, config);
  }

  /**
   * 发送 Passport 请求
   */
  protected async request<TResponse, TData = unknown>(
    options: RequestOptions<TData>
  ): Promise<GoofishPassportResponse<TResponse>> {
    try {
      const response = await this.http.request<
        GoofishPassportResponse<TResponse>
      >({
        url: options.api,
        method: options.method || 'POST',
        data: options.data,
        params: {
          appName: this.config.passport.appName,
          fromSite: this.config.passport.fromSite,
          ...options.params,
        },
        ...options.config,
      });

      logger.debug('✅ Passport 请求成功:', response.data);
      return response.data;
    } catch (error) {
      logger.error('❌ Passport 请求失败:', error);
      throw error;
    }
  }
}
