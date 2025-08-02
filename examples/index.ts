/**
 * 示例：搜索商品
 */

import { GooFish } from '../src';
// 自定义日志级别示例
import { LogLevel } from '../src/utils/logger';

async function testWithLogging() {
  // 创建客户端实例，启用调试模式
  const client = new GooFish({
    level: LogLevel.DEBUG,
  });

  try {
    // 搜索商品 - 会自动记录请求响应日志
    const result = await client.search.search({
      keyword: '手机',
      pageNumber: 1,
      rowsPerPage: 10,
    });

    // console.log('搜索结果:', result);
  } catch (error) {
    console.error('搜索失败:', error);
  }
}

testWithLogging();
