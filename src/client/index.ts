import type { GoofishConfig } from '../types';
import { Goofish } from './goofish.client';

// 导出主类
export { Goofish } from './goofish.client';

// 导出类型
export type { GoofishConfig } from '../types';

/**
 * 创建闲鱼客户端实例
 * @param cookie - 用户认证 Cookie
 * @param options - 其他配置选项
 * @example
 * ```typescript
 * // 快速创建
 * const client = createClient('your-cookie');
 *
 * // 完整配置
 * const client = createClient('your-cookie', {
 *   baseURL: 'https://custom-api.com',
 *   timeout: 20000,
 *   debug: true
 * });
 * ```
 */
export function createClient(
  cookie?: string,
  options?: Omit<GoofishConfig, 'cookie'>
): Goofish {
  return new Goofish({
    cookie: cookie || '',
    ...options,
  });
}
