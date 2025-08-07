import { Goofish, LogLevel } from '../src';
import { SortField, SortValue } from '../src/types/mtop/search';
import { logger } from '../src/utils/logger';

async function testWithLogging() {
  // 创建客户端实例，启用调试模式
  const client = new Goofish({
    level: LogLevel.INFO,
    // 获取用户信息和搜索通用
    cookie: 'cookie2=xxx;',
    // 获取搜索结果能用
    // cookie: 'cna=xxx;',
  });
  /*
  try {
    // 获取用户导航信息
    const userNavResult = await client.api.mtop.user.getUserNav();
    logger.info('用户导航信息:', userNavResult);

    // 获取用户头部信息
    const userHeadResult = await client.api.mtop.user.getUserHead();
    logger.info('用户头部信息:', userHeadResult);

    // 搜索商品
    const searchResult = await client.api.mtop.search.search({
      pageNumber: 1,
      keyword: 'N150',
      rowsPerPage: 30,
      sortValue: SortValue.DESC,
      sortField: SortField.CREATE,
    });

    logger.info(
      '搜索结果:',
      searchResult?.data?.resultList?.[0]?.data?.item?.main?.exContent
        ?.detailParams
    );
  } catch (error) {
    console.error('请求失败:', error);
  }
  */

  const qrResult = await client.api.passport.qr.generate();
  logger.info('二维码生成结果:', qrResult);
}

testWithLogging();
