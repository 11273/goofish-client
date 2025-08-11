import { Goofish, LogLevel } from '../src';
import { SortField, SortValue } from '../src/types/mtop/search';
import { QRCodeStatus } from '../src/types/passport/qr';
import { logger } from '../src/utils/logger';

async function main() {
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
  // 生成二维码
  // const qrResult1 = await client.api.passport.qr.generate();
  // logger.info('二维码生成结果1:', qrResult1);

  const qrResult2 = await client.api.passport.qr.render();
  logger.info('二维码生成结果2:\n', qrResult2.response);
  logger.info('二维码生成结果2:\n', qrResult2.qrCode);

  // 二维码查询示例
  try {
    const queryResult = await client.api.passport.qr.query({
      t: qrResult2.response.content.data.t,
      ck: qrResult2.response.content.data.ck,
    });

    logger.info('二维码查询结果:', queryResult);

    // 处理不同的二维码状态
    const qrStatus = queryResult.content.data.qrCodeStatus;
    switch (qrStatus) {
      case QRCodeStatus.NEW:
        logger.info('二维码已生成，等待扫描');
        break;
      case QRCodeStatus.SCANED:
        logger.info('二维码已被扫描，等待确认');
        break;
      case QRCodeStatus.CONFIRMED:
        logger.info('二维码已确认，登录成功');
        break;
      case QRCodeStatus.CANCELED:
        logger.info('二维码已取消');
        break;
      case QRCodeStatus.EXPIRED:
        logger.info('二维码已过期');
        break;
      case QRCodeStatus.ERROR:
        logger.error('二维码出现错误');
        break;
      default:
        logger.info('未知的二维码状态:', qrStatus);
    }
  } catch (error) {
    logger.error('二维码查询失败:', error);
  }
}
main();
