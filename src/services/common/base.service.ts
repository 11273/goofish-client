import type { HttpClient } from '../../core/http';
import type { GoofishConfig } from '../../types';

/**
 * 通用基础服务类
 * 提供所有服务的基础功能
 */
export abstract class BaseService {
  protected http: HttpClient;
  protected config: GoofishConfig;

  constructor(http: HttpClient, config: GoofishConfig) {
    this.http = http;
    this.config = config;
  }
}
