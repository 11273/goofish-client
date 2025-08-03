import { HttpClient } from '../core/http';
import {
  createCookieInterceptor,
  createLogInterceptor,
} from '../core/interceptor';
import { SearchService } from '../services/search.service';
import { UserService } from '../services/user.service';
import { API_CONFIG } from '../constants';
import { Logger, LogLevel } from '../utils/logger';
import { CookieStore } from '../utils/cookie';
import { CookieUtils } from '../utils/cookie';

export interface GoofishConfig {
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
  sessionOption: string;
  v: string;
  accountSite: string;
  origin: string;
  referer: string;
  contentType: string;
  spmCnt: string;
  spmPre: string;
}

export class Goofish {
  // HTTP
  private readonly http: HttpClient;

  // 日志器
  private readonly logger: Logger;

  // Cookie 存储
  private readonly cookieStore: CookieStore;

  // 服务实例
  public readonly api: {
    search: SearchService;
    user: UserService;
  };

  // 配置
  public readonly config: GoofishConfig;

  constructor(config: Partial<GoofishConfig>) {
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
      sessionOption: config.sessionOption || API_CONFIG.SESSION_OPTION,
      v: config.v || API_CONFIG.V,
      accountSite: config.accountSite || API_CONFIG.ACCOUNT_SITE,
      origin: config.origin || API_CONFIG.HEADERS_ORIGIN,
      referer: config.referer || API_CONFIG.HEADERS_REFERER,
      contentType: config.contentType || API_CONFIG.HEADERS_CONTENT_TYPE,
      userAgent: config.userAgent || API_CONFIG.HEADERS_USER_AGENT,
      spmCnt: config.spmCnt || API_CONFIG.SPM_CNT,
      spmPre: config.spmPre || API_CONFIG.SPM_PRE,
    };

    // 创建 Logger
    this.logger = new Logger({
      level: this.config.level,
    });

    // 创建 HTTP 客户端
    this.http = new HttpClient({
      baseURL: this.config.baseURL,
      axiosConfig: {
        withCredentials: true,
      },
    });

    // 创建 Cookie 存储
    this.cookieStore = new CookieStore();

    // 设置初始 cookie
    this.updateCookie(this.config.cookie);

    // 初始化服务
    this.api = {
      search: new SearchService(this.http, this.config, this.logger),
      user: new UserService(this.http, this.config, this.logger),
    };

    // 设置拦截器
    this.setupInterceptors();

    // 打印日志
    this.logger.debug('Goofish 初始化完成', {
      config: this.config,
    });
  }

  /**
   * 获取当前配置
   */
  getConfig(): Readonly<GoofishConfig> {
    return { ...this.config };
  }

  /**
   * 设置拦截器
   */
  private setupInterceptors(): void {
    const axios = this.http.getAxios();
    // Cookie 拦截器
    const cookieInterceptor = createCookieInterceptor(
      this.logger,
      this.cookieStore
    );
    axios.interceptors.request.use(cookieInterceptor.request);
    axios.interceptors.response.use(cookieInterceptor.response);
    // 日志拦截器
    const logInterceptor = createLogInterceptor(this.logger);
    axios.interceptors.request.use(logInterceptor.request);
    axios.interceptors.response.use(
      logInterceptor.response,
      logInterceptor.error
    );
  }

  /**
   * 更新 Cookie
   */
  updateCookie(cookie: string): void {
    const cookies = CookieUtils.parseCookieHeader(cookie);
    this.logger.debug('🔄 更新 cookie', cookies);
    Object.entries(cookies).forEach(([name, value]) => {
      this.cookieStore.set(name, value);
    });
  }

  /**
   * 直接访问 HTTP 客户端（高级用法）
   */
  get httpClient(): HttpClient {
    return this.http;
  }
}
