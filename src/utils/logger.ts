export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

export interface LoggerOptions {
  /** 日志级别 */
  level?: LogLevel;
  /** 日志前缀 */
  prefix?: string;
  /** 是否显示时间 */
  showTime?: boolean;
}

/**
 * 闲鱼 SDK 日志工具类
 */
export class Logger {
  private options: Required<LoggerOptions>;
  private inspect: ((object: unknown, options?: object) => string) | null =
    null;

  constructor(options: LoggerOptions = {}) {
    this.options = {
      level: options.level ?? LogLevel.INFO,
      prefix: options.prefix ?? 'GooFish-SDK',
      showTime: options.showTime ?? false,
    };

    // 尝试加载 Node.js 的 util.inspect
    this.loadInspect();
  }

  /**
   * 动态加载 inspect 方法
   */
  private loadInspect(): void {
    try {
      // 检测是否在 Node.js 环境
      if (
        typeof process !== 'undefined' &&
        process.versions &&
        process.versions.node
      ) {
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
   * 设置日志级别
   */
  setLevel(level: LogLevel): void {
    this.options.level = level;
  }

  /**
   * 通用日志方法（支持多参数）
   */
  log(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.INFO)) {
      this.output('INFO', 'ℹ️ ', ...args);
    }
  }

  /**
   * 错误日志（支持多参数）
   */
  error(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      this.output('ERROR', '❌', ...args);
    }
  }

  /**
   * 警告日志（支持多参数）
   */
  warn(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.WARN)) {
      this.output('WARN', '⚠️ ', ...args);
    }
  }

  /**
   * 信息日志（支持多参数）
   */
  info(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.INFO)) {
      this.output('INFO', 'ℹ️ ', ...args);
    }
  }

  /**
   * 调试日志（支持多参数）
   */
  debug(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      this.output('DEBUG', '🔍', ...args);
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
  }): void {
    const { method = 'GET', url = '', data, headers, params } = config;
    const message = `→ ${method.toUpperCase()} ${url}`;

    if (this.options.level >= LogLevel.DEBUG) {
      this.debug(message, {
        data,
        headers,
        params,
      });
    } else {
      this.info(message);
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
  }): void {
    const { method = 'GET', url = '', status = 200, data, duration } = config;
    const statusIcon = status >= 400 ? '✗' : '✓';
    const time = duration ? ` (${duration}ms)` : '';
    const message = `← ${statusIcon} ${status} ${method.toUpperCase()} ${url}${time}`;

    if (status >= 400) {
      this.error(message, data);
    } else if (this.options.level >= LogLevel.DEBUG) {
      this.debug(message, data);
    } else {
      this.info(message);
    }
  }

  /**
   * 检查是否应该记录日志
   */
  private shouldLog(level: LogLevel): boolean {
    return level <= this.options.level;
  }

  /**
   * 内部输出方法（支持多参数）
   */
  private output(level: string, emoji: string, ...args: unknown[]): void {
    const time = this.options.showTime
      ? new Date().toLocaleTimeString('zh-CN', { hour12: false }) + ' '
      : '';

    const prefix = `[${this.options.prefix}] ${time}${emoji}`;
    const consoleFn = this.getConsoleFunction(level);

    // 处理参数，确保深层对象能正确显示
    const processedArgs = this.processArgs(args);

    // 输出日志
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
    // 如果没有 inspect 方法（浏览器环境），直接返回原始参数
    if (!this.inspect) {
      return args;
    }

    // Node.js 环境，使用 inspect 处理对象
    return args.map((arg) => {
      if (typeof arg === 'object' && arg !== null && this.inspect) {
        // 使用 inspect 确保深层对象完整显示
        return this.inspect(arg, {
          depth: null, // 显示所有层级
          colors: true, // 彩色输出
          maxArrayLength: null, // 显示完整数组
          breakLength: 80, // 每行字符数
          compact: false, // 不压缩显示
        });
      }
      return arg;
    });
  }

  /**
   * 获取控制台输出方法
   */
  private getConsoleFunction(level: string): typeof console.log {
    switch (level) {
      case 'ERROR':
        return console.error;
      case 'WARN':
        return console.warn;
      default:
        return console.log;
    }
  }
}
