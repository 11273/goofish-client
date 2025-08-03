export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

// 日志级别配置
const LOG_LEVEL_CONFIG = {
  ERROR: { emoji: '❌', consoleMethod: 'error' },
  WARN: { emoji: '⚠️', consoleMethod: 'warn' },
  INFO: { emoji: 'ℹ️', consoleMethod: 'log' },
  DEBUG: { emoji: '🔍', consoleMethod: 'log' },
} as const;

// 栈追踪深度常量
const STACK_DEPTH = {
  DIRECT_CALL: 4, // 直接调用 logger.info() 等
  REQUEST_CALL: 5, // 调用 logger.request() 或 logger.response()
} as const;

// HTTP 状态配置
const HTTP_STATUS = {
  ERROR_THRESHOLD: 400,
  SUCCESS_ICON: '✓',
  ERROR_ICON: '✗',
  REQUEST_ICON: '→',
  RESPONSE_ICON: '←',
} as const;

// 时间格式选项
export type TimeFormat = 'full' | 'time' | 'iso' | 'timestamp' | 'none';

export interface LoggerOptions {
  /** 日志级别 */
  level?: LogLevel;
  /** 日志前缀 */
  prefix?: string;
  /** 时间格式 */
  timeFormat?: TimeFormat;
  /** 是否显示调用位置 */
  showLocation?: boolean;
  /** 位置信息最大文件名长度 */
  maxFileNameLength?: number;
}

/**
 * 闲鱼 SDK 日志工具类
 */
export class Logger {
  private options: Required<LoggerOptions>;
  private inspect: ((object: unknown, options?: object) => string) | null =
    null;

  // 默认配置
  private static readonly DEFAULT_OPTIONS = {
    level: LogLevel.INFO,
    prefix: 'Goofish-SDK',
    timeFormat: 'time' as TimeFormat,
    showLocation: true,
    maxFileNameLength: 20,
  } as const;

  // Logger 内部文件标识，用于过滤调用栈
  private static readonly INTERNAL_PATTERNS = [
    'Logger.',
    'logger.',
    '/logger.',
    '\\logger.',
  ] as const;

  constructor(options: LoggerOptions = {}) {
    this.options = {
      ...Logger.DEFAULT_OPTIONS,
      ...options,
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
   * 补零函数
   */
  private padZero(num: number, length: number = 2): string {
    return num.toString().padStart(length, '0');
  }

  /**
   * 格式化时间
   */
  private formatTime(): string {
    if (this.options.timeFormat === 'none') {
      return '';
    }

    const now = new Date();

    switch (this.options.timeFormat) {
      case 'full': {
        // 完整日期时间: 2024-01-20 15:30:45.123
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
        // ISO 格式: 2024-01-20T15:30:45.123Z
        return now.toISOString() + ' ';

      case 'timestamp':
        // Unix 时间戳（毫秒）: 1705737045123
        return now.getTime() + ' ';

      case 'time':
      default: {
        // 仅时间: 15:30:45.123
        const hours = this.padZero(now.getHours());
        const minutes = this.padZero(now.getMinutes());
        const seconds = this.padZero(now.getSeconds());
        const milliseconds = this.padZero(now.getMilliseconds(), 3);

        return `${hours}:${minutes}:${seconds}.${milliseconds} `;
      }
    }
  }

  /**
   * 获取调用位置信息
   */
  private getCallLocation(stackDepth: number): string {
    if (!this.options.showLocation) {
      return '';
    }

    try {
      const err = new Error();
      const stack = err.stack || '';
      const lines = stack.split('\n');

      // 查找合适的调用栈行
      let targetLine = '';
      let foundIndex = 0;

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        // 跳过 Logger 内部的调用
        const isInternalCall = Logger.INTERNAL_PATTERNS.some((pattern) =>
          line?.includes(pattern)
        );

        if (!isInternalCall) {
          if (foundIndex === stackDepth - 3) {
            targetLine = line || '';
            break;
          }
          foundIndex++;
        }
      }

      if (!targetLine) {
        return '';
      }

      // 解析文件路径和行号
      const match = targetLine.match(
        /(?:at\s+)?(?:.*?\s+)?(?:\()?([^:\s]+):(\d+):(\d+)\)?/
      );

      if (match) {
        let filePath = match[1];
        const line = match[2];
        const column = match[3];

        // 提取文件名（去掉路径）
        const fileName = filePath?.split(/[/\\]/).pop() || filePath;

        return `(${fileName}:${line}:${column})`;
      }

      // 如果无法解析，尝试简单提取
      const simpleMatch = targetLine.match(/([^/\\:\s]+\.[jt]s):(\d+)/);
      if (simpleMatch) {
        return `(${simpleMatch[1]}:${simpleMatch[2]})`;
      }

      return '';
    } catch {
      return '';
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
   * 设置是否显示调用位置
   */
  setShowLocation(show: boolean): void {
    this.options.showLocation = show;
  }

  /**
   * 通用日志方法（支持多参数）
   */
  log(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.INFO)) {
      this.output('INFO', STACK_DEPTH.DIRECT_CALL, ...args);
    }
  }

  /**
   * 错误日志（支持多参数）
   */
  error(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      this.output('ERROR', STACK_DEPTH.DIRECT_CALL, ...args);
    }
  }

  /**
   * 警告日志（支持多参数）
   */
  warn(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.WARN)) {
      this.output('WARN', STACK_DEPTH.DIRECT_CALL, ...args);
    }
  }

  /**
   * 信息日志（支持多参数）
   */
  info(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.INFO)) {
      this.output('INFO', STACK_DEPTH.DIRECT_CALL, ...args);
    }
  }

  /**
   * 调试日志（支持多参数）
   */
  debug(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      this.output('DEBUG', STACK_DEPTH.DIRECT_CALL, ...args);
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
    const message = `${
      HTTP_STATUS.REQUEST_ICON
    } ${method.toUpperCase()} ${url}`;

    if (this.options.level >= LogLevel.DEBUG) {
      this.output('DEBUG', STACK_DEPTH.REQUEST_CALL, message, {
        data,
        headers,
        params,
      });
    } else {
      this.output('INFO', STACK_DEPTH.REQUEST_CALL, message);
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
    const statusIcon =
      status >= HTTP_STATUS.ERROR_THRESHOLD
        ? HTTP_STATUS.ERROR_ICON
        : HTTP_STATUS.SUCCESS_ICON;
    const time = duration ? ` (${duration}ms)` : '';
    const message = `${
      HTTP_STATUS.RESPONSE_ICON
    } ${statusIcon} ${status} ${method.toUpperCase()} ${url}${time}`;

    if (status >= HTTP_STATUS.ERROR_THRESHOLD) {
      this.output('ERROR', STACK_DEPTH.REQUEST_CALL, message, data);
    } else if (this.options.level >= LogLevel.DEBUG) {
      this.output('DEBUG', STACK_DEPTH.REQUEST_CALL, message, data);
    } else {
      this.output('INFO', STACK_DEPTH.REQUEST_CALL, message);
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
  private output(
    levelName: keyof typeof LOG_LEVEL_CONFIG,
    stackDepth: number,
    ...args: unknown[]
  ): void {
    const config = LOG_LEVEL_CONFIG[levelName];
    const time = this.formatTime();
    const location = this.getCallLocation(stackDepth);
    const prefix =
      `[${this.options.prefix}] ${time}${config.emoji} ${location}`.trim();

    // 获取对应的 console 方法
    const consoleFn =
      config.consoleMethod === 'error'
        ? console.error
        : config.consoleMethod === 'warn'
        ? console.warn
        : console.log;

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
   * 创建子 logger（带额外前缀）
   */
  child(childPrefix: string): Logger {
    return new Logger({
      ...this.options,
      prefix: `${this.options.prefix}:${childPrefix}`,
    });
  }
}

// 导出默认实例
export const logger = new Logger();
