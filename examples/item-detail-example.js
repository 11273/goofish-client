const { Goofish } = require('goofish-client');

async function getItemDetail() {
  const client = new Goofish({
    // cookie: 'cookie2=xxx',
  });

  try {
    // 获取商品详情
    const response = await client.api.mtop.item.getDetail({
      itemId: '950xxxxxx34',
    });

    if (response.ret[0] === 'SUCCESS::调用成功') {
      const itemDetail = response.data;

      console.log('商品标题:', itemDetail.itemDO.title);
      console.log('商品价格:', itemDetail.itemDO.soldPrice);
      console.log('商品描述:', itemDetail.itemDO.desc);
      console.log('卖家昵称:', itemDetail.sellerDO.nick);
      console.log('浏览次数:', itemDetail.itemDO.browseCnt);
      console.log('收藏次数:', itemDetail.itemDO.collectCnt);
      console.log(
        '图片列表:',
        itemDetail.itemDO.imageInfos.map((img) => img.url)
      );

      return itemDetail;
    } else {
      console.error('接口调用失败:', response.ret);
    }
  } catch (error) {
    console.error('获取商品详情失败:', error);
  }
}

// 使用示例
getItemDetail();
