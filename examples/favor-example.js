/**
 * 收藏功能使用示例
 */

const { Goofish } = require('goofish-client');

// 初始化客户端（需要有效的cookie）
const client = new Goofish({
  // cookie: 'cookie2=xxx',
});

async function favorExamples() {
  try {
    console.log('=== 收藏功能示例 ===\n');

    // 1. 获取全部收藏商品（第一页）
    console.log('1. 获取全部收藏商品：');
    const allFavorItems = await client.api.mtop.favor.getAllFavorItems();
    console.log('成功:', allFavorItems?.data?.items);


    // 2. 获取降价宝贝
    console.log('2. 获取降价宝贝：');
    const reducedItems = await client.api.mtop.favor.getReducedPriceItems();
    console.log('成功:', reducedItems?.data?.items);

    // 3. 获取有效宝贝
    console.log('3. 获取有效宝贝：');
    const validItems = await client.api.mtop.favor.getValidItems();
    console.log('成功:', validItems?.data?.items);

    // 4. 获取失效宝贝
    console.log('4. 获取失效宝贝：');
    const invalidItems = await client.api.mtop.favor.getInvalidItems();
    console.log('成功:', invalidItems?.data?.items);

    // 5. 自定义分页获取收藏列表
    console.log('5. 自定义分页获取收藏列表（第2页，每页10条）：');
    const customFavorItems = await client.api.mtop.favor.getFavorItemList({
      pageNumber: 2,
      rowsPerPage: 10,
      type: 'DEFAULT',
    });
    console.log('成功:', customFavorItems?.data?.items);

  } catch (error) {
    console.error('请求失败:', error.message);
    if (error.response) {
      console.error('响应状态:', error.response.status);
      console.error('响应数据:', error.response.data);
    }
  }
}

// 运行示例
favorExamples();
