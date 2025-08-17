const { Goofish } = require('goofish-client');

/**
 * 首页Feed数据示例
 */
async function homeFeedExample() {
  // 创建客户端实例
  const client = new Goofish({
    cookie: 'cookie2=xxx', // 设置你的cookie
  });

  try {
    // 获取首页Feed数据
    const feedData = await client.api.mtop.home.getFeed({
      pageSize: 30, // 每页数量
      pageNumber: 1, // 页码
    });

    if (feedData.data.cardList.length > 0) {
      feedData.data.cardList.forEach((item) => {
        console.log('商品信息:', {
          itemId: item.cardData.itemId,
          title: item.cardData.titleSummary.text,
          price: item.cardData.priceInfo.price,
          city: item.cardData.city,
          userNick: item.cardData.user.userNick,
          imageCount: item.cardData.images.length,
        });
      });
    }
  } catch (error) {
    console.error('获取首页数据失败:', error.message);
  }
}

homeFeedExample();
