export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

export type TimeFormat = 'full' | 'time' | 'iso' | 'timestamp' | 'none';

export interface LoggerOptions {
  level?: LogLevel;
  prefix?: string;
  timeFormat?: TimeFormat;
}

// 日志级别配置
const LOG_LEVEL_CONFIG = {
  ERROR: { emoji: '[ERR]', consoleMethod: 'error' },
  WARN: { emoji: '[WRN]', consoleMethod: 'warn' },
  INFO: { emoji: '[INF]', consoleMethod: 'log' },
  DEBUG: { emoji: '[DBG]', consoleMethod: 'log' },
} as const;

// HTTP 状态配置
const HTTP_STATUS = {
  ERROR_THRESHOLD: 400,
  SUCCESS_ICON: '✓',
  ERROR_ICON: '✗',
  REQUEST_ICON: '→',
  RESPONSE_ICON: '←',
} as const;

/**
 * 闲鱼 Client 日志工具类
 */
export class Logger {
  private options: Required<LoggerOptions>;
  private inspect: ((object: unknown, options?: object) => string) | null =
    null;

  // 默认配置
  private static readonly DEFAULT_OPTIONS = {
    level: LogLevel.INFO,
    prefix: 'Goofish-Client',
    timeFormat: 'time' as TimeFormat,
  } as const;

  constructor(options: LoggerOptions = {}) {
    this.options = {
      ...Logger.DEFAULT_OPTIONS,
      ...options,
    };
    this.loadInspect();
  }

  /**
   * 动态加载 inspect 方法
   */
  private loadInspect(): void {
    try {
      if (typeof process !== 'undefined' && process.versions?.node) {
        const util = require('util') as {
          inspect?: (object: unknown, options?: object) => string;
        };
        if (util?.inspect) {
          this.inspect = util.inspect;
        }
      }
    } catch {
      // 忽略错误
    }
  }

  /**
   * 补零函数
   */
  private padZero(num: number, length: number = 2): string {
    return num.toString().padStart(length, '0');
  }

  /**
   * 格式化时间
   */
  private formatTime(): string {
    if (this.options.timeFormat === 'none') return '';

    const now = new Date();

    switch (this.options.timeFormat) {
      case 'full': {
        const year = now.getFullYear();
        const month = this.padZero(now.getMonth() + 1);
        const day = this.padZero(now.getDate());
        const hours = this.padZero(now.getHours());
        const minutes = this.padZero(now.getMinutes());
        const seconds = this.padZero(now.getSeconds());
        const milliseconds = this.padZero(now.getMilliseconds(), 3);
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds} `;
      }
      case 'iso':
        return now.toISOString() + ' ';
      case 'timestamp':
        return now.getTime() + ' ';
      case 'time':
      default: {
        const hours = this.padZero(now.getHours());
        const minutes = this.padZero(now.getMinutes());
        const seconds = this.padZero(now.getSeconds());
        const milliseconds = this.padZero(now.getMilliseconds(), 3);
        return `${hours}:${minutes}:${seconds}.${milliseconds} `;
      }
    }
  }

  /**
   * 设置日志级别
   */
  setLevel(level: LogLevel): void {
    this.options.level = level;
  }

  /**
   * 设置时间格式
   */
  setTimeFormat(format: TimeFormat): void {
    this.options.timeFormat = format;
  }

  /**
   * 通用日志方法
   */
  log(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.INFO)) {
      this.output('INFO', ...args);
    }
  }

  /**
   * 错误日志
   */
  error(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      this.output('ERROR', ...args);
    }
  }

  /**
   * 警告日志
   */
  warn(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.WARN)) {
      this.output('WARN', ...args);
    }
  }

  /**
   * 信息日志
   */
  info(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.INFO)) {
      this.output('INFO', ...args);
    }
  }

  /**
   * 调试日志
   */
  debug(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      this.output('DEBUG', ...args);
    }
  }

  /**
   * HTTP请求日志
   */
  request(config: {
    method?: string;
    url?: string;
    data?: unknown;
    headers?: Record<string, unknown>;
    params?: Record<string, unknown>;
    cookie?: string;
  }): void {
    const { method = 'GET', url = '' } = config;
    const message = `${
      HTTP_STATUS.REQUEST_ICON
    } ${method.toUpperCase()} ${url}`;

    if (this.options.level >= LogLevel.DEBUG) {
      this.output('DEBUG', message, config);
    } else if (this.options.level >= LogLevel.INFO) {
      this.output('INFO', message);
    }
  }

  /**
   * HTTP响应日志
   */
  response(config: {
    method?: string;
    url?: string;
    status?: number;
    data?: unknown;
    duration?: number;
    setCookie?: string[];
  }): void {
    const { method = 'GET', url = '', status = 200, duration } = config;
    const statusIcon =
      status >= HTTP_STATUS.ERROR_THRESHOLD
        ? HTTP_STATUS.ERROR_ICON
        : HTTP_STATUS.SUCCESS_ICON;
    const time = duration ? ` (${duration}ms)` : '';
    const message = `${
      HTTP_STATUS.RESPONSE_ICON
    } ${statusIcon} ${status} ${method.toUpperCase()} ${url}${time}`;

    if (status >= HTTP_STATUS.ERROR_THRESHOLD) {
      this.output('ERROR', message, config);
    } else if (this.options.level >= LogLevel.DEBUG) {
      this.output('DEBUG', message, config);
    } else if (this.options.level >= LogLevel.INFO) {
      this.output('INFO', message, config);
    }
  }

  /**
   * 检查是否应该记录日志
   */
  private shouldLog(level: LogLevel): boolean {
    return level <= this.options.level;
  }

  /**
   * 内部输出方法
   */
  private output(
    levelName: keyof typeof LOG_LEVEL_CONFIG,
    ...args: unknown[]
  ): void {
    const config = LOG_LEVEL_CONFIG[levelName];
    const time = this.formatTime();
    const prefix = `[${this.options.prefix}] ${time}${config.emoji}`.trim();

    const consoleFn =
      config.consoleMethod === 'error'
        ? console.error
        : config.consoleMethod === 'warn'
        ? console.warn
        : console.log;

    const processedArgs = this.processArgs(args);

    if (processedArgs.length > 0 && typeof processedArgs[0] === 'string') {
      consoleFn(`${prefix} ${processedArgs[0]}`, ...processedArgs.slice(1));
    } else {
      consoleFn(prefix, ...processedArgs);
    }
  }

  /**
   * 处理参数，确保对象能完整显示
   */
  private processArgs(args: unknown[]): unknown[] {
    if (!this.inspect) return args;

    return args.map((arg) => {
      if (typeof arg === 'object' && arg !== null && this.inspect) {
        return this.inspect(arg, {
          depth: null,
          colors: true,
          maxArrayLength: null,
          breakLength: 80,
          compact: false,
        });
      }
      return arg;
    });
  }

  /**
   * 创建子 logger
   */
  child(childPrefix: string): Logger {
    return new Logger({
      ...this.options,
      prefix: `${this.options.prefix}:${childPrefix}`,
    });
  }
}

// ===== 全局日志管理 =====
class LoggerManager {
  private static globalLogger: Logger;
  private static moduleLoggers: Map<string, Logger> = new Map();

  static initialize(options: LoggerOptions = {}): void {
    LoggerManager.globalLogger = new Logger({
      level: LogLevel.INFO,
      prefix: 'Goofish-Client',
      timeFormat: 'time',
      ...options,
    });
  }

  static getLogger(): Logger {
    if (!LoggerManager.globalLogger) {
      LoggerManager.initialize();
    }
    return LoggerManager.globalLogger;
  }

  static getModuleLogger(moduleName: string): Logger {
    if (!LoggerManager.moduleLoggers.has(moduleName)) {
      const baseLogger = LoggerManager.getLogger();
      const moduleLogger = baseLogger.child(moduleName);
      LoggerManager.moduleLoggers.set(moduleName, moduleLogger);
    }
    return LoggerManager.moduleLoggers.get(moduleName)!;
  }

  static setLevel(level: LogLevel): void {
    const logger = LoggerManager.getLogger();
    logger.setLevel(level);
    LoggerManager.moduleLoggers.forEach((moduleLogger) => {
      moduleLogger.setLevel(level);
    });
  }
}

// ===== 公共接口 =====

/**
 * 全局 logger 对象 - 主要使用接口
 */
export const logger = {
  // 基础日志方法
  log: (...args: unknown[]): void => LoggerManager.getLogger().log(...args),
  error: (...args: unknown[]): void => LoggerManager.getLogger().error(...args),
  warn: (...args: unknown[]): void => LoggerManager.getLogger().warn(...args),
  info: (...args: unknown[]): void => LoggerManager.getLogger().info(...args),
  debug: (...args: unknown[]): void => LoggerManager.getLogger().debug(...args),

  // HTTP 专用方法
  request: (config: {
    method?: string;
    url?: string;
    data?: unknown;
    headers?: Record<string, unknown>;
    params?: Record<string, unknown>;
    cookie?: string;
  }): void => LoggerManager.getLogger().request(config),

  response: (config: {
    method?: string;
    url?: string;
    status?: number;
    data?: unknown;
    duration?: number;
    setCookie?: string[];
  }): void => LoggerManager.getLogger().response(config),

  // 配置方法
  setLevel: (level: LogLevel): void => LoggerManager.setLevel(level),
  setTimeFormat: (format: TimeFormat): void =>
    LoggerManager.getLogger().setTimeFormat(format),

  // 创建子 logger
  child: (childPrefix: string): Logger =>
    LoggerManager.getLogger().child(childPrefix),

  // 初始化方法
  init: (options: LoggerOptions): void => LoggerManager.initialize(options),
} as const;
