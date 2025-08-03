import { GooFish } from '../src';
// 自定义日志级别示例
import { logger, LogLevel } from '../src/utils/logger';

async function testWithLogging() {
  // 创建客户端实例，启用调试模式
  const client = new GooFish({
    level: LogLevel.DEBUG,
  });
  try {
    // 获取用户导航信息
    const userNavResult = await client.api.user.getUserNav();
    logger.info('用户导航信息:', userNavResult);

    // 获取用户头部信息
    // const userHeadResult = await client.api.user.getUserHead();
    // logger.info('用户头部信息:', userHeadResult);

    // 搜索商品
    const searchResult = await client.api.search.search({
      keyword: '手机',
      pageNumber: 1,
      rowsPerPage: 10,
    });

    logger.info('搜索结果:', searchResult);
  } catch (error) {
    console.error('请求失败:', error);
  }
}

testWithLogging();
