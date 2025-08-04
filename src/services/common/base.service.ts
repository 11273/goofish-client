import type { HttpClient } from '../../core/http';
import type { Logger } from '../../utils';
import type { GoofishConfig } from '../../types';

/**
 * 通用基础服务类
 * 提供所有服务的基础功能
 */
export abstract class BaseService {
  protected http: HttpClient;
  protected logger: Logger;
  protected config: GoofishConfig;

  constructor(http: HttpClient, config: GoofishConfig, logger: Logger) {
    this.http = http;
    this.logger = logger;
    this.config = config;
  }
}
