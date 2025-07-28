// ========== Client ==========
export { GooFish } from './client/goofish.client';
export type { GooFishConfig } from './client/goofish.client';

// ========== Services ==========
// 如果你想让用户能单独使用服务
export { SearchService } from './services/search.service';

// ========== Types ==========
export * as Types from './types';

// ========== Helpers ==========
import { GooFish, type GooFishConfig } from './client';

/**
 * 创建闲鱼 SDK 实例
 */
export function createGooFish(config: GooFishConfig): GooFish {
  return new GooFish(config);
}

/**
 * 快速开始（仅需 cookie）
 */
export function quickStart(cookie: string): GooFish {
  return new GooFish({ cookie });
}
