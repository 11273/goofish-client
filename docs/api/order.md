# 订单接口

提供用户购买订单的获取和管理相关的 API 接口。

## 接口概览

| 方法                                          | API 路径                          | 描述               |
| --------------------------------------------- | --------------------------------- | ------------------ |
| [`getBoughtList()`](#getboughtlist)           | `mtop.idle.web.trade.bought.list` | 获取买到的订单列表 |
| [`getAllOrders()`](#getallorders)             | `mtop.idle.web.trade.bought.list` | 获取全部订单       |
| [`getUnpaidOrders()`](#getunpaidorders)       | `mtop.idle.web.trade.bought.list` | 获取待付款订单     |
| [`getUnshippedOrders()`](#getunshippedorders) | `mtop.idle.web.trade.bought.list` | 获取待发货订单     |
| [`getShippedOrders()`](#getshippedorders)     | `mtop.idle.web.trade.bought.list` | 获取待收货订单     |
| [`getUnratedOrders()`](#getunratedorders)     | `mtop.idle.web.trade.bought.list` | 获取待评价订单     |
| [`getRefundOrders()`](#getrefundorders)       | `mtop.idle.web.trade.bought.list` | 获取退款中订单     |

## getBoughtList()

获取买到的订单列表的基础方法，支持自定义分页和订单状态筛选。

**API 路径：** `mtop.idle.web.trade.bought.list`

### 接口定义

#### 参数

```typescript
interface BoughtListRequest {
  /** 页码，从1开始 */
  pageNumber: number;
  /** 订单状态 */
  orderStatus: OrderStatus;
}

enum OrderStatus {
  /** 全部 */
  ALL = "ALL",
  /** 待付款 */
  NOT_PAY = "NOT_PAY",
  /** 待发货 */
  NOT_SHIP = "NOT_SHIP",
  /** 待收货 */
  SHIPPED = "SHIPPED",
  /** 待评价 */
  NOT_RATE = "NOT_RATE",
  /** 退款中 */
  REFUND = "REFUND",
}
```

完整的参数类型定义请参考：[BoughtListRequest](../reference/types.md#boughtlistrequest) | [OrderStatus](../reference/types.md#orderstatus)

#### 响应

实际响应被 [`GoofishMtopResponse`](../reference/types.md#goofishmtopresponse) 统一包裹：

```typescript
GoofishMtopResponse<BoughtListResponse>;
```

其中 `BoughtListResponse` 的主要结构为：

```typescript
interface BoughtListResponse {
  /** 订单列表 */
  items: BoughtOrder[];
  /** 最后一行 */
  lastEndRow: string;
  /** 是否有下一页 */
  nextPage: string;
  /** 总数量 */
  totalCount: string;
}

interface BoughtOrder {
  /** 通用数据 */
  commonData: OrderCommonData;
  /** 内容 */
  content: OrderContent;
  /** 头部 */
  head: OrderHead;
  /** 尾部 */
  tail: OrderTail;
}

interface OrderCommonData {
  /** 商品ID */
  itemId: string;
  /** 订单ID */
  orderId: string;
  /** 对方用户ID */
  peerUserId: string;
  /** 交易状态枚举 */
  tradeStatusEnum: string;
  // ... 其他字段
}
```

完整的响应类型定义请参考：[BoughtListResponse](../reference/types.md#boughtlistresponse) | [BoughtOrder](../reference/types.md#boughtorder) | [GoofishMtopResponse](../reference/types.md#goofishmtopresponse)

### 使用示例

#### 基础使用

```typescript
import { Goofish, OrderStatus } from "goofish-client";

const client = new Goofish({ cookie: "cookie2=xxxx" });

// 获取第一页全部订单
const orderList = await client.api.mtop.order.getBoughtList({
  pageNumber: 1,
  orderStatus: OrderStatus.ALL,
});

console.log(orderList);
```

#### 获取待付款订单

```typescript
const unpaidOrders = await client.api.mtop.order.getBoughtList({
  pageNumber: 1,
  orderStatus: OrderStatus.NOT_PAY,
});

console.log("待付款订单数量:", unpaidOrders.data?.items?.length);
```

#### 提取订单信息

```typescript
// 获取订单列表并提取关键信息
const response = await client.api.mtop.order.getBoughtList({
  pageNumber: 1,
  orderStatus: OrderStatus.ALL,
});

if (response.ret[0] === "SUCCESS::调用成功") {
  const { items, nextPage, totalCount } = response.data;

  // 提取订单信息
  const orders = items.map((order) => ({
    // 基本信息
    orderId: order.commonData.orderId,
    itemId: order.commonData.itemId,
    tradeStatus: order.commonData.tradeStatusEnum,

    // 商品信息
    item: {
      title: order.content.data.detailInfo.auctionTitle,
      image: order.content.data.detailInfo.auctionPic,
      price: order.content.data.priceInfo.price,
      amount: order.content.data.priceInfo.buyAmount,
    },

    // 卖家信息
    seller: {
      userId: order.head.data.userInfo.userId,
      nick: order.head.data.userInfo.userNick,
      avatar: order.head.data.userInfo.userIcon,
    },

    // 订单状态
    status: {
      message: order.head.data.statusViewMsg,
      createTime: order.head.data.createTime,
    },

    // 可用操作
    actions: order.tail.data.btnList.map((btn) => ({
      name: btn.name,
      action: btn.tradeAction,
      style: btn.style,
    })),
  }));

  console.log(
    `获取到 ${orders.length} 个订单，总计 ${totalCount} 个，还有更多: ${
      nextPage === "true"
    }`
  );
  console.log(orders);
}
```

## getAllOrders()

获取全部订单的便捷方法，默认获取第一页数据。

### 接口定义

#### 参数

```typescript
getAllOrders(pageNumber?: number)
```

- `pageNumber` (可选): 页码，默认为 1

#### 响应

与 `getBoughtList()` 相同。

### 使用示例

```typescript
// 使用默认参数
const allOrders = await client.api.mtop.order.getAllOrders();

// 自定义页码
const page2Orders = await client.api.mtop.order.getAllOrders(2);
```

## getUnpaidOrders()

获取待付款订单的便捷方法。

### 接口定义

#### 参数

```typescript
getUnpaidOrders(pageNumber?: number)
```

- `pageNumber` (可选): 页码，默认为 1

### 使用示例

```typescript
const unpaidOrders = await client.api.mtop.order.getUnpaidOrders();
console.log("待付款订单:", unpaidOrders.data?.items);
```

## getUnshippedOrders()

获取待发货订单的便捷方法。

### 接口定义

#### 参数

```typescript
getUnshippedOrders(pageNumber?: number)
```

- `pageNumber` (可选): 页码，默认为 1

### 使用示例

```typescript
const unshippedOrders = await client.api.mtop.order.getUnshippedOrders();
console.log("待发货订单:", unshippedOrders.data?.items);
```

## getShippedOrders()

获取待收货订单的便捷方法。

### 接口定义

#### 参数

```typescript
getShippedOrders(pageNumber?: number)
```

- `pageNumber` (可选): 页码，默认为 1

### 使用示例

```typescript
const shippedOrders = await client.api.mtop.order.getShippedOrders();
console.log("待收货订单:", shippedOrders.data?.items);
```

## getUnratedOrders()

获取待评价订单的便捷方法。

### 接口定义

#### 参数

```typescript
getUnratedOrders(pageNumber?: number)
```

- `pageNumber` (可选): 页码，默认为 1

### 使用示例

```typescript
const unratedOrders = await client.api.mtop.order.getUnratedOrders();
console.log("待评价订单:", unratedOrders.data?.items);
```

## getRefundOrders()

获取退款中订单的便捷方法。

### 接口定义

#### 参数

```typescript
getRefundOrders(pageNumber?: number)
```

- `pageNumber` (可选): 页码，默认为 1

### 使用示例

```typescript
const refundOrders = await client.api.mtop.order.getRefundOrders();
console.log("退款中订单:", refundOrders.data?.items);
```

### 分页加载示例

```typescript
// 分页加载订单
async function loadOrders(status = OrderStatus.ALL, pageNumber = 1) {
  try {
    const response = await client.api.mtop.order.getBoughtList({
      pageNumber,
      orderStatus: status,
    });

    if (response.ret[0] === "SUCCESS::调用成功") {
      const { items, nextPage, lastEndRow, totalCount } = response.data;

      return {
        items,
        hasMore: nextPage === "true",
        lastEndRow,
        totalCount,
        currentPage: pageNumber,
      };
    } else {
      throw new Error(response.message || "获取订单列表失败");
    }
  } catch (error) {
    console.error("加载订单失败:", error);
    throw error;
  }
}

// 使用示例
const page1 = await loadOrders(OrderStatus.ALL, 1);
console.log(`第1页: ${page1.items.length} 个订单，还有更多: ${page1.hasMore}`);

if (page1.hasMore) {
  const page2 = await loadOrders(OrderStatus.ALL, 2);
  console.log(`第2页: ${page2.items.length} 个订单`);
}
```

### 参数详解

#### 订单状态说明

- `OrderStatus.ALL` - 全部订单
- `OrderStatus.NOT_PAY` - 待付款订单（等待买家付款）
- `OrderStatus.NOT_SHIP` - 待发货订单（已付款，等待卖家发货）
- `OrderStatus.SHIPPED` - 待收货订单（已发货，等待买家确认收货）
- `OrderStatus.NOT_RATE` - 待评价订单（交易完成，等待评价）
- `OrderStatus.REFUND` - 退款中订单（正在退款流程中）

#### 分页参数

- `pageNumber`: 页码，从 1 开始，默认为 1

#### 订单状态枚举值

根据 `tradeStatusEnum` 字段，订单可能的状态包括：

- `trade_success` - 交易成功
- `refund_success` - 退款成功
- 其他状态根据实际业务场景确定

### TypeScript 支持

```typescript
import type {
  BoughtListRequest,
  BoughtListResponse,
  BoughtOrder,
  OrderStatus,
  GoofishMtopResponse,
} from "goofish-client";

// 类型安全的订单获取
const params: BoughtListRequest = {
  pageNumber: 1,
  orderStatus: OrderStatus.ALL,
};

const response: GoofishMtopResponse<BoughtListResponse> =
  await client.api.mtop.order.getBoughtList(params);

// 处理订单数据
const orders: BoughtOrder[] = response.data?.items || [];
```

### 注意事项

1. **登录状态**: 订单接口需要用户登录状态，请确保已设置有效的 Cookie
2. **请求频率**: 建议控制请求频率，避免过于频繁的调用
3. **数据实时性**: 订单数据可能存在延迟，订单状态以实际页面为准
4. **分页策略**: 建议使用 `pageNumber` 进行分页
5. **错误处理**: 建议添加适当的错误处理逻辑，处理网络异常和 API 错误

### 错误处理示例

```typescript
try {
  const orderList = await client.api.mtop.order.getAllOrders();

  if (orderList.ret[0] !== "SUCCESS::调用成功") {
    console.error("获取订单列表失败:", orderList.ret);
    return;
  }

  // 处理成功结果
  console.log("订单列表:", orderList.data?.items);
} catch (error) {
  console.error("请求异常:", error.message);

  if (error.response) {
    console.error("响应状态:", error.response.status);
    console.error("响应数据:", error.response.data);
  }
}
```
