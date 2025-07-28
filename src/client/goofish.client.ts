import { HttpClient } from '@/core/http';
import {
  authInterceptor,
  errorInterceptor,
  logInterceptor,
} from '@/core/interceptor';
import { SearchService } from '@/services/search.service';
import { API_CONFIG } from '@/constants';

export interface GooFishConfig {
  baseURL?: string;
  timeout?: number;
  cookie?: string;
  debug?: boolean;
}

export class GooFish {
  // HTTP
  private readonly http: HttpClient;

  // 服务实例
  public search!: SearchService;

  // 配置
  public readonly config: GooFishConfig;

  constructor(config: GooFishConfig) {
    this.config = {
      baseURL: config.baseURL || API_CONFIG.BASE_URL,
      timeout: config.timeout || API_CONFIG.TIMEOUT,
      debug: config.debug || false,
      cookie: config.cookie || '',
    };

    // 创建 HTTP 客户端
    this.http = new HttpClient({
      baseURL: this.config.baseURL || '',
      timeout: this.config.timeout || 30000,
    });

    // 设置拦截器
    this.setupInterceptors();

    // 初始化服务
    this.initServices();

    // 设置初始 cookie
    this.http.setCookie(this.config.cookie || '');
  }

  /**
   * 获取当前配置
   */
  getConfig(): Readonly<GooFishConfig> {
    return { ...this.config };
  }

  /**
   * 设置拦截器
   */
  private setupInterceptors(): void {
    const axios = this.http.getAxios();

    // 请求拦截器
    axios.interceptors.request.use(authInterceptor);

    // 日志拦截器（仅在 debug 模式下）
    if (this.config.debug) {
      axios.interceptors.request.use(logInterceptor.request);
      axios.interceptors.response.use(
        logInterceptor.response,
        logInterceptor.error
      );
    }

    // 响应拦截器
    axios.interceptors.response.use((response) => response, errorInterceptor);
  }

  /**
   * 初始化服务
   */
  private initServices(): void {
    this.search = new SearchService(this.http);
  }

  /**
   * 更新 Cookie
   */
  updateCookie(cookie: string): void {
    if (!cookie || typeof cookie !== 'string') {
      throw new Error('Cookie must be a non-empty string');
    }

    this.config.cookie = cookie;
    this.http.setCookie(cookie);
  }

  /**
   * 直接访问 HTTP 客户端（高级用法）
   */
  get httpClient(): HttpClient {
    return this.http;
  }
}
