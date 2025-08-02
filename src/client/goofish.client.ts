import { HttpClient } from '../core/http';
import {
  createErrorInterceptor,
  createLogInterceptor,
} from '../core/interceptor';
import { SearchService } from '../services/search.service';
import { API_CONFIG } from '../constants';
import { Logger, LogLevel } from '../utils/logger';

export interface GooFishConfig {
  // 基本配置
  level: LogLevel;
  cookie: string;

  // API 配置
  baseURL: string;
  apiPrefix: string;
  appKey: string;
  jsv: string;
  timeout: number;
  dataType: string;
  type: string;
  userAgent: string;
  version: string;
  sessionOption: string;
  v: string;
  accountSite: string;
  origin: string;
  referer: string;
  contentType: string;
  spmCnt: string;
}

export class GooFish {
  // HTTP
  private readonly http: HttpClient;

  // 日志器
  private readonly logger: Logger;

  // 服务实例
  public readonly api: {
    search: SearchService;
  };

  // 配置
  public readonly config: GooFishConfig;

  constructor(config: Partial<GooFishConfig>) {
    this.config = {
      level: config.level || LogLevel.INFO,
      cookie: config.cookie || '',
      baseURL: config.baseURL || API_CONFIG.BASE_URL,
      apiPrefix: config.apiPrefix || API_CONFIG.API_PREFIX,
      appKey: config.appKey || API_CONFIG.APP_KEY,
      jsv: config.jsv || API_CONFIG.JSV,
      timeout: config.timeout || API_CONFIG.TIMEOUT,
      dataType: config.dataType || API_CONFIG.DATA_TYPE,
      type: config.type || API_CONFIG.TYPE,
      version: config.version || API_CONFIG.VERSION,
      sessionOption: config.sessionOption || API_CONFIG.SESSION_OPTION,
      v: config.v || API_CONFIG.V,
      accountSite: config.accountSite || API_CONFIG.ACCOUNT_SITE,
      origin: config.origin || API_CONFIG.HEADERS_ORIGIN,
      referer: config.referer || API_CONFIG.HEADERS_REFERER,
      contentType: config.contentType || API_CONFIG.HEADERS_CONTENT_TYPE,
      userAgent: config.userAgent || API_CONFIG.HEADERS_USER_AGENT,
      spmCnt: config.spmCnt || API_CONFIG.SPM_CNT,
    };

    // 创建 Logger
    this.logger = new Logger({
      level: this.config.level,
    });

    // 创建 HTTP 客户端
    this.http = new HttpClient({
      baseURL: this.config.baseURL,
    });

    // 设置初始 cookie
    this.http.setCookie(this.config.cookie);

    // 初始化服务
    this.api = {
      search: new SearchService(this.http, this.config),
    };

    // 设置拦截器
    this.setupInterceptors();

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
