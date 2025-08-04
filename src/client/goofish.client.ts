import { HttpClient } from '../core/http';
import {
  createCookieInterceptor,
  createLogInterceptor,
} from '../core/interceptor';
import { SearchService } from '../services/mtop/search.service';
import { UserService } from '../services/mtop/user.service';
import { API_CONFIG, MTOP_CONFIG } from '../constants';
import { Logger, LogLevel } from '../utils/logger';
import { CookieStore } from '../utils/cookie';
import { CookieUtils } from '../utils/cookie';
import type { GoofishConfig } from '../types';

/**
 * TODO
 * 1. logger 设计不合理，不应该传递给每个服务，应该在客户端统一管理
 * 2. cookieStore、cookie 不同协议隔离，以及一个总的可以互相共用
 * 3. new HttpClient 没有隔离
 */
export class Goofish {
  // HTTP
  private readonly http: HttpClient;

  // 日志器
  private readonly logger: Logger;

  // Cookie 存储
  private readonly cookieStore: CookieStore;

  // 服务实例
  public readonly api: {
    // Mtop 服务
    mtop: {
      // 搜索服务
      search: SearchService;
      // 用户服务
      user: UserService;
    };
  };

  // 配置
  public readonly config: GoofishConfig;

  constructor(config: Partial<GoofishConfig>) {
    this.config = {
      level: config.level || LogLevel.INFO,
      cookie: config.cookie || '',

      // Mtop 配置
      mtop: {
        baseURL: config.mtop?.baseURL || MTOP_CONFIG.BASE_URL,
        apiPrefix: config.mtop?.apiPrefix || MTOP_CONFIG.API_PREFIX,
        appKey: config.mtop?.appKey || MTOP_CONFIG.APP_KEY,
        jsv: config.mtop?.jsv || MTOP_CONFIG.JSV,
        timeout: config.mtop?.timeout || MTOP_CONFIG.TIMEOUT,
        dataType: config.mtop?.dataType || MTOP_CONFIG.DATA_TYPE,
        type: config.mtop?.type || MTOP_CONFIG.TYPE,
        sessionOption: config.mtop?.sessionOption || MTOP_CONFIG.SESSION_OPTION,
        v: config.mtop?.v || MTOP_CONFIG.V,
        accountSite: config.mtop?.accountSite || MTOP_CONFIG.ACCOUNT_SITE,
        spmCnt: config.mtop?.spmCnt || MTOP_CONFIG.SPM_CNT,
        spmPre: config.mtop?.spmPre || MTOP_CONFIG.SPM_PRE,
        logId: config.mtop?.logId || MTOP_CONFIG.LOG_ID,
      },

      // 请求头配置
      headers: {
        origin: config.headers?.origin || API_CONFIG.ORIGIN,
        referer: config.headers?.referer || API_CONFIG.REFERER,
        contentType: config.headers?.contentType || API_CONFIG.CONTENT_TYPE,
        userAgent: config.headers?.userAgent || API_CONFIG.USER_AGENT,
      },
    };

    // 创建 Logger
    this.logger = new Logger({
      level: this.config.level,
    });

    // 创建 HTTP 客户端
    this.http = new HttpClient({
      baseURL: this.config.mtop.baseURL,
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
      mtop: {
        search: new SearchService(this.http, this.config, this.logger),
        user: new UserService(this.http, this.config, this.logger),
      },
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
