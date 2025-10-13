# 订单功能示例

本文档提供买到的订单 API 的基础使用示例。

## 基础使用

### 获取全部订单

```typescript
import { Goofish } from "goofish-client";

const client = new Goofish({ cookie: "cookie2=xxxx" });

const result = await client.api.mtop.order.getAllOrders();

console.log(result);
```

### 获取不同状态的订单

```typescript
import { Goofish, OrderStatus } from "goofish-client";

const client = new Goofish({ cookie: "cookie2=xxxx" });

// 获取全部订单
const allOrders = await client.api.mtop.order.getAllOrders();
console.log("全部订单:", allOrders.data?.items?.length);

// 获取待付款订单
const unpaidOrders = await client.api.mtop.order.getUnpaidOrders();
console.log("待付款订单:", unpaidOrders.data?.items?.length);

// 获取待发货订单
const unshippedOrders = await client.api.mtop.order.getUnshippedOrders();
console.log("待发货订单:", unshippedOrders.data?.items?.length);

// 获取待收货订单
const shippedOrders = await client.api.mtop.order.getShippedOrders();
console.log("待收货订单:", shippedOrders.data?.items?.length);

// 获取待评价订单
const unratedOrders = await client.api.mtop.order.getUnratedOrders();
console.log("待评价订单:", unratedOrders.data?.items?.length);

// 获取退款中订单
const refundOrders = await client.api.mtop.order.getRefundOrders();
console.log("退款中订单:", refundOrders.data?.items?.length);
```

### 自定义参数获取

```typescript
import { OrderStatus } from "goofish-client";

const result = await client.api.mtop.order.getBoughtList({
  pageNumber: 1,
  orderStatus: OrderStatus.ALL,
});

console.log(result);
```

## 分页加载

### 基础分页

```typescript
// 第一页
const firstPage = await client.api.mtop.order.getAllOrders(1);

// 第二页
const secondPage = await client.api.mtop.order.getAllOrders(2);

console.log(`第一页订单数量: ${firstPage.data?.items?.length || 0}`);
console.log(`第二页订单数量: ${secondPage.data?.items?.length || 0}`);
```

### 智能分页加载

```typescript
async function loadAllOrders() {
  let pageNumber = 1;
  let allOrders = [];
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await client.api.mtop.order.getAllOrders(pageNumber);

      if (response.ret[0] === "SUCCESS::调用成功") {
        const { items, nextPage } = response.data;

        allOrders = allOrders.concat(items);
        hasMore = nextPage === "true";
        pageNumber++;

        console.log(`加载第 ${pageNumber - 1} 页，获得 ${items.length} 个订单`);

        // 避免请求过快
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        console.error("获取订单列表失败:", response.ret);
        break;
      }
    } catch (error) {
      console.error("请求异常:", error);
      break;
    }
  }

  console.log(`总计加载 ${allOrders.length} 个订单`);
  return allOrders;
}

// 使用示例
const allOrders = await loadAllOrders();
```

## 数据处理

### 提取关键信息

```typescript
const response = await client.api.mtop.order.getAllOrders();

if (response.ret[0] === "SUCCESS::调用成功") {
  const orders = response.data.items.map((order) => ({
    // 基本信息
    orderId: order.commonData.orderId,
    itemId: order.commonData.itemId,
    tradeStatus: order.commonData.tradeStatusEnum,

    // 商品信息
    itemTitle: order.content.data.detailInfo.auctionTitle,
    itemImage: order.content.data.detailInfo.auctionPic,
    itemPrice: order.content.data.priceInfo.price,
    itemAmount: order.content.data.priceInfo.buyAmount,

    // 卖家信息
    sellerUserId: order.head.data.userInfo.userId,
    sellerNick: order.head.data.userInfo.userNick,
    sellerAvatar: order.head.data.userInfo.userIcon,

    // 订单状态
    statusMessage: order.head.data.statusViewMsg,
    createTime: order.head.data.createTime,

    // 可用操作
    availableActions: order.tail.data.btnList.map((btn) => ({
      name: btn.name,
      action: btn.tradeAction,
      style: btn.style,
    })),
  }));

  console.log("处理后的订单:", orders);
}
```

### 按状态分类

```typescript
const response = await client.api.mtop.order.getAllOrders();

if (response.ret[0] === "SUCCESS::调用成功") {
  const items = response.data.items;

  // 按交易状态分类
  const categorized = {
    success: items.filter(
      (item) => item.commonData.tradeStatusEnum === "trade_success"
    ),
    refunded: items.filter(
      (item) => item.commonData.tradeStatusEnum === "refund_success"
    ),
    hasPendingActions: items.filter(
      (item) =>
        item.tail.data.btnList.some((btn) => btn.expanded === "true") &&
        item.tail.data.btnList.length > 0
    ),
  });

  console.log("交易成功:", categorized.success.length);
  console.log("已退款:", categorized.refunded.length);
  console.log("有待处理操作:", categorized.hasPendingActions.length);
}
```

## 错误处理

### 基础错误处理

```typescript
try {
  const orderList = await client.api.mtop.order.getAllOrders();

  if (orderList.ret[0] === "SUCCESS::调用成功") {
    console.log("获取成功:", orderList.data.items.length, "个订单");
  } else {
    console.error("API 返回错误:", orderList.ret);
  }
} catch (error) {
  console.error("请求异常:", error.message);
}
```

### 完整错误处理

```typescript
async function getOrdersWithErrorHandling() {
  try {
    const response = await client.api.mtop.order.getAllOrders();

    // 检查响应状态
    if (!response || !response.ret || response.ret.length === 0) {
      throw new Error("响应格式异常");
    }

    // 检查业务状态
    if (response.ret[0] !== "SUCCESS::调用成功") {
      const errorMsg = response.ret[0] || "未知错误";
      throw new Error(`业务错误: ${errorMsg}`);
    }

    // 检查数据完整性
    if (!response.data || !Array.isArray(response.data.items)) {
      throw new Error("响应数据格式异常");
    }

    return {
      success: true,
      data: response.data,
      message: "获取成功",
    };
  } catch (error) {
    console.error("获取订单列表失败:", error);

    // 根据错误类型返回不同信息
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        return { success: false, message: "登录状态已过期，请重新登录" };
      } else if (status >= 500) {
        return { success: false, message: "服务器异常，请稍后重试" };
      } else {
        return { success: false, message: `请求失败: ${status}` };
      }
    } else if (error.code === "ENOTFOUND") {
      return { success: false, message: "网络连接异常" };
    } else {
      return { success: false, message: error.message || "未知错误" };
    }
  }
}

// 使用示例
const result = await getOrdersWithErrorHandling();
if (result.success) {
  console.log("订单列表:", result.data.items);
} else {
  console.error("获取失败:", result.message);
}
```

## 实用工具函数

### 订单搜索

```typescript
async function searchOrders(keyword) {
  const response = await client.api.mtop.order.getAllOrders();

  if (response.ret[0] === "SUCCESS::调用成功") {
    const matchedOrders = response.data.items.filter((order) =>
      order.content.data.detailInfo.auctionTitle
        .toLowerCase()
        .includes(keyword.toLowerCase())
    );

    console.log(`找到 ${matchedOrders.length} 个包含 "${keyword}" 的订单`);
    return matchedOrders;
  }

  return [];
}

// 使用示例
const phoneOrders = await searchOrders("iPhone");
```

### 订单统计

```typescript
async function getOrderStatistics() {
  const response = await client.api.mtop.order.getAllOrders();

  if (response.ret[0] === "SUCCESS::调用成功") {
    const items = response.data.items;

    const stats = {
      total: items.length,
      success: items.filter(
        (item) => item.commonData.tradeStatusEnum === "trade_success"
      ).length,
      refunded: items.filter(
        (item) => item.commonData.tradeStatusEnum === "refund_success"
      ).length,

      // 金额统计
      totalAmount: items.reduce((sum, item) => {
        const price = parseFloat(item.content.data.priceInfo.price || "0");
        const amount = parseInt(item.content.data.priceInfo.buyAmount || "1");
        return sum + price * amount;
      }, 0),

      // 卖家分布
      sellers: items.reduce((sellers, item) => {
        const sellerNick = item.head.data.userInfo.userNick;
        sellers[sellerNick] = (sellers[sellerNick] || 0) + 1;
        return sellers;
      }, {}),
    };

    console.log("订单统计:");
    console.log(`总订单: ${stats.total} 个`);
    console.log(`交易成功: ${stats.success} 个`);
    console.log(`已退款: ${stats.refunded} 个`);
    console.log(`总金额: ${stats.totalAmount.toFixed(2)} 元`);
    console.log("卖家分布:", stats.sellers);

    return stats;
  }

  return null;
}

// 使用示例
const statistics = await getOrderStatistics();
```

### 订单操作提取

```typescript
async function getOrderActions() {
  const response = await client.api.mtop.order.getAllOrders();

  if (response.ret[0] === "SUCCESS::调用成功") {
    const ordersWithActions = response.data.items
      .map((order) => ({
        orderId: order.commonData.orderId,
        itemTitle: order.content.data.detailInfo.auctionTitle,
        statusMessage: order.head.data.statusViewMsg,
        actions: order.tail.data.btnList
          .filter((btn) => btn.expanded === "true")
          .map((btn) => ({
            name: btn.name,
            action: btn.tradeAction,
            style: btn.style,
            url: btn.clickEvent?.data?.url,
            code: btn.clickEvent?.data?.code,
          })),
      }))
      .filter((order) => order.actions.length > 0);

    console.log("有待处理操作的订单:");
    ordersWithActions.forEach((order) => {
      console.log(`订单 ${order.orderId}: ${order.itemTitle}`);
      console.log(`  状态: ${order.statusMessage}`);
      console.log(`  可用操作:`);
      order.actions.forEach((action) => {
        console.log(`    - ${action.name} (${action.action})`);
      });
    });

    return ordersWithActions;
  }

  return [];
}

// 使用示例
const ordersWithActions = await getOrderActions();
```
