// ========== Client ==========
export { Goofish } from './client/goofish.client';
export type { GoofishConfig } from './client/goofish.client';

// ========== Services ==========
// 如果你想让用户能单独使用服务
export { SearchService } from './services/search.service';

// ========== Types ==========
export * as Types from './types';

// ========== Logger ==========
export { Logger, LogLevel, type LoggerOptions } from './utils/logger';

// ========== Helpers ==========
import { Goofish, type GoofishConfig } from './client';

/**
 * 创建闲鱼 SDK 实例
 */
export function createGoofish(config: GoofishConfig): Goofish {
  return new Goofish(config);
}

/**
 * 快速开始（仅需 cookie）
 */
export function quickStart(cookie: string): Goofish {
  return new Goofish({ cookie });
}
