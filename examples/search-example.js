const { Goofish, LogLevel } = require('goofish-client');

async function searchItems() {
  try {
    // 创建 Client 实例
    const client = new Goofish({
      // cookie: 'cookie2=xxxx',
      level: LogLevel.INFO,
    });

    console.log('🔍 开始搜索商品...');

    // 搜索商品 - 基本搜索
    const searchResult = await client.api.mtop.search.search({
      keyword: 'iPhone', // 搜索关键词
      pageNumber: 1, // 页码（从1开始）
      rowsPerPage: 5, // 每页显示数量
    });

    console.log('searchResult :>> ', searchResult);
  } catch (error) {
    console.error('❌ 发生错误:', error.message);
  }
}

// 运行示例
searchItems();
