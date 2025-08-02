import { HttpClient } from '@/core/http';
import {
  createErrorInterceptor,
  createLogInterceptor,
} from '@/core/interceptor';
import { SearchService } from '@/services/search.service';
import { API_CONFIG } from '@/constants';
import { Logger, LogLevel } from '@/utils/logger';

export interface GooFishConfig {
  // 基本配置
  level?: LogLevel;
  cookie?: string;

  // API 配置
  baseURL?: string;
  apiPrefix?: string;
  apiKey?: string;
  jsv?: string;
  timeout?: number;
  dataType?: string;
  type?: string;
  userAgent?: string;
  version?: string;
  sessionOption?: string;
}

export class GooFish {
  // HTTP
  private readonly http: HttpClient;

  // 日志器
  private readonly logger: Logger;

  // 服务实例
  public search!: SearchService;

  // 配置
  public readonly config: Required<GooFishConfig>;

  constructor(config: GooFishConfig) {
    this.config = {
      level: config.level || LogLevel.INFO,
      cookie: config.cookie || '',
      baseURL: config.baseURL || API_CONFIG.BASE_URL,
      apiPrefix: config.apiPrefix || API_CONFIG.API_PREFIX,
      apiKey: config.apiKey || API_CONFIG.APP_KEY,
      jsv: config.jsv || API_CONFIG.JSV,
      timeout: config.timeout || API_CONFIG.TIMEOUT,
      dataType: config.dataType || API_CONFIG.DATA_TYPE,
      type: config.type || API_CONFIG.TYPE,
      userAgent: config.userAgent || API_CONFIG.USER_AGENT,
      version: config.version || API_CONFIG.VERSION,
      sessionOption: config.sessionOption || API_CONFIG.SESSION_OPTION,
    };

    // 创建 Logger
    this.logger = new Logger({
      level: this.config.level,
    });

    // 创建 HTTP 客户端
    this.http = new HttpClient({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': this.config.dataType,
        'User-Agent': this.config.userAgent,
      },
    });

    // 设置拦截器
    this.setupInterceptors();

    // 初始化服务
    this.initServices(this.config);

    // 设置初始 cookie
    this.http.setCookie(this.config.cookie);

    // 打印日志
    this.logger.debug('GooFish 初始化完成', {
      config: this.config,
    });
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
    // 认证拦截器（如果有需要可以扩展）
    // const authInterceptor = createAuthInterceptor({
    //   getToken: () => this.getAuthToken(),
    // });
    // axios.interceptors.request.use(authInterceptor);
    // 日志拦截器
    const logInterceptor = createLogInterceptor(this.logger);
    axios.interceptors.request.use(logInterceptor.request);
    axios.interceptors.response.use(
      logInterceptor.response,
      logInterceptor.error
    );
    // 错误处理拦截器
    const errorInterceptor = createErrorInterceptor({
      onNetworkError: (error) => {
        this.logger.error('网络错误', error);
      },
      onUnauthorized: (error) => {
        this.logger.error('认证失败', error);
      },
      onServerError: (error) => {
        this.logger.error('服务器错误', error);
      },
    });
    axios.interceptors.response.use(undefined, errorInterceptor);
  }

  /**
   * 初始化服务
   */
  private initServices(config: GooFishConfig): void {
    this.search = new SearchService(this.http, config);
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
