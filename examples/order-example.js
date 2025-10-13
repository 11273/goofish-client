/**
 * 订单功能使用示例
 */

const { Goofish } = require('goofish-client');

// 初始化客户端（需要有效的cookie）
const client = new Goofish({
  cookie: 'cookie2=xxx',
});

async function orderExamples() {
  try {
    console.log('=== 订单功能示例 ===\n');

    // 1. 获取全部订单
    console.log('1. 获取全部订单：');
    const allOrders = await client.api.mtop.order.getAllOrders();
    console.log('成功:', allOrders.data?.items);

    // 2. 获取待付款订单
    console.log('2. 获取待付款订单：');
    const unpaidOrders = await client.api.mtop.order.getUnpaidOrders();
    console.log('待付款订单数量:', unpaidOrders.data?.items);
    console.log('');

    // 3. 获取待发货订单
    console.log('3. 获取待发货订单：');
    const unshippedOrders = await client.api.mtop.order.getUnshippedOrders();
    console.log('待发货订单数量:', unshippedOrders.data?.items);
    console.log('');

    // 4. 获取待收货订单
    console.log('4. 获取待收货订单：');
    const shippedOrders = await client.api.mtop.order.getShippedOrders();
    console.log('待收货订单数量:', shippedOrders.data?.items);
    console.log('');

    // 5. 获取待评价订单
    console.log('5. 获取待评价订单：');
    const unratedOrders = await client.api.mtop.order.getUnratedOrders();
    console.log('待评价订单数量:', unratedOrders.data?.items);
    console.log('');

    // 6. 获取退款中订单
    console.log('6. 获取退款中订单：');
    const refundOrders = await client.api.mtop.order.getRefundOrders();
    console.log('退款中订单数量:', refundOrders.data?.items);
    console.log('');

  } catch (error) {
    console.error('请求失败:', error.message);
    if (error.response) {
      console.error('响应状态:', error.response.status);
      console.error('响应数据:', error.response.data);
    }
  }
}

// 运行示例
orderExamples();

