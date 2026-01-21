# 商品接口

提供商品详情相关的 API 接口。

## 接口概览

| 方法                        | API 路径                     | 描述         |
| --------------------------- | ---------------------------- | ------------ |
| [`getDetail()`](#getdetail) | `mtop.taobao.idle.pc.detail` | 获取商品详情 |

## getDetail()

获取指定商品的详细信息，包括商品基本信息、卖家信息、买家信息、图片等完整数据。

**API 路径：** `mtop.taobao.idle.pc.detail`

### 接口定义

#### 参数

必填参数：

```typescript
interface ItemDetailRequest {
  /** 商品ID（必需） */
  itemId: string;
}
```

完整的参数类型定义请参考：[ItemDetailRequest](../reference/types.md#itemdetailrequest)

#### 响应

实际响应被 [`GoofishMtopResponse`](../reference/types.md#goofishmtopresponse) 统一包裹：

```typescript
GoofishMtopResponse<ItemDetailResponse>;
```

其中 `ItemDetailResponse` 的主要结构为：

```typescript
interface ItemDetailResponse {
  /** B2C买家信息 */
  b2cBuyerDO: B2cBuyerDO;
  /** 商品信息 */
  itemDO: ItemDO;
  /** B2C卖家信息 */
  b2cSellerDO: B2cSellerDO;
  /** 卖家信息 */
  sellerDO: SellerDO;
  /** B2C商品信息 */
  b2cItemDO: B2cItemDO;
  /** 买家信息 */
  buyerDO: BuyerDO;
  /** 服务器时间 */
  serverTime: string;
  // ... 其他字段
}

interface ItemDO {
  /** 商品ID */
  itemId: number;
  /** 商品标题 */
  title: string;
  /** 商品描述 */
  desc: string;
  /** 已售价格 */
  soldPrice: string;
  /** 卖出数量 */
  soldCnt: number;
  /** 原价 */
  originalPrice?: string;
  /** 最小价格 */
  minPrice?: string;
  /** 最大价格 */
  maxPrice?: string;
  /** 运费 */
  transportFee: string;
  /** 商品状态 */
  itemStatus: number;
  /** 浏览次数 */
  browseCnt: number;
  /** 收藏次数 */
  collectCnt: number;
  /** 想要次数 */
  wantCnt: number;
  /** 图片信息列表 */
  imageInfos: ItemImageInfo[];
  /** 商品标签扩展列表 */
  itemLabelExtList: ItemLabelExt[];
  /** SKU 列表（多规格商品） */
  skuList?: SkuDO[];
  /** 验货宝信息 */
  appraiseInfo?: AppraiseInfo;
  /** 创建时间 */
  gmtCreate: number;
  // ... 其他字段
}

interface AppraiseInfo {
  /** 验货宝版本 */
  yhbVersion: string;
  /** 服务详情标题 (如: "验货宝") */
  serviceDetailTitle: string;
  /** 服务描述 */
  serviceDescription: string;
  /** 服务承诺项 */
  servicePromiseItems: string[];
  // ... 其他字段
}

interface SkuDO {
  /** SKU ID */
  skuId: number;
  /** 价格（分） */
  priceInCent: number;
  /** 属性列表（如：颜色、尺寸） */
  propertyList: SkuProperty[];
  /** 数量 */
  quantity: number;
}

interface SellerDO {
  /** 卖家ID */
  sellerId: number;
  /** 昵称 */
  nick: string;
  /** 城市 */
  city: string;
  /** 签名 */
  signature: string;
  /** 头像URL */
  portraitUrl: string;
  /** 已售数量 */
  hasSoldNumInteger: number;
  /** 回复率 */
  replyRatio24h: string;
  /** 回复间隔 */
  replyInterval: string;
  /** 最后访问时间 */
  lastVisitTime: string;
  // ... 其他字段
}
```

完整的响应类型定义请参考：[ItemDetailResponse](../reference/types.md#itemdetailresponse) | [ItemDO](../reference/types.md#itemdo) | [SellerDO](../reference/types.md#sellerdo) | [GoofishMtopResponse](../reference/types.md#goofishmtopresponse)

### 使用示例

#### 基础使用

```typescript
import { Goofish } from "goofish-client";

const client = new Goofish({ cookie: "cookie2=xxxx" });

// 获取商品详情
const result = await client.api.mtop.item.getDetail({
  itemId: "95xxxxxxxxx334",
});

console.log(result);
```

#### 提取关键信息

```typescript
// 获取商品详情并提取关键信息
const response = await client.api.mtop.item.getDetail({
  itemId: "95xxxxxxxxx334",
});

if (response.ret[0] === "SUCCESS::调用成功") {
  const { itemDO, sellerDO } = response.data;

  console.log({
    // 商品基本信息
    title: itemDO.title,
    price: itemDO.soldPrice,
    originalPrice: itemDO.originalPrice,
    description: itemDO.desc,

    // 商品状态
    browseCnt: itemDO.browseCnt,
    collectCnt: itemDO.collectCnt,
    wantCnt: itemDO.wantCnt,

    // 图片信息
    images: itemDO.imageInfos.map((img) => ({
      url: img.url,
      major: img.major,
      width: img.widthSize,
      height: img.heightSize,
    })),

    // 卖家信息
    seller: {
      nick: sellerDO.nick,
      city: sellerDO.city,
      avatar: sellerDO.portraitUrl,
      soldCount: sellerDO.hasSoldNumInteger,
      replyRate: sellerDO.replyRatio24h,
    },
  });
}
```

### 参数详解

#### 商品 ID 获取

商品 ID 可以通过以下方式获取：

1. **搜索接口**: 通过搜索 API 获取商品列表，从中提取商品 ID
2. **首页接口**: 通过首页 Feed API 获取推荐商品的 ID
3. **商品链接**: 从闲鱼商品链接中解析出商品 ID

```typescript
// 从搜索结果获取商品ID
const searchResult = await client.api.mtop.search.search({
  keyword: "iPhone",
});

const itemIds = searchResult.data.resultList.map(
  (item) => item.data.item.main.exContent.itemId
);

// 获取第一个商品的详情
const detail = await client.api.mtop.item.getDetail({
  itemId: itemIds[0],
});
```

### 错误处理

```typescript
try {
  const result = await client.api.mtop.item.getDetail({
    itemId: "95xxxxxxxxx334",
  });

  if (result.ret[0] === "SUCCESS::调用成功") {
    // 处理成功结果
    console.log(result.data);
  } else {
    // 处理业务错误
    console.error("获取商品详情失败:", result.message);
  }
} catch (error) {
  // 处理网络错误
  console.error("请求异常:", error.message);
}
```

### TypeScript 支持

```typescript
import type { ItemDetailRequest, ItemDetailResponse } from "goofish-client";

const params: ItemDetailRequest = {
  itemId: "95xxxxxxxxx334",
};

const response: GoofishMtopResponse<ItemDetailResponse> =
  await client.api.mtop.item.getDetail(params);
```

### 注意事项

1. **登录状态**: 此接口需要用户登录状态，请确保已设置有效的 Cookie
2. **商品状态**: 商品可能已下架或删除，请检查响应状态
3. **数据完整性**: 部分字段可能为空，建议在使用前进行空值检查
4. **请求频率**: 建议控制请求频率，避免过于频繁的调用
5. **数据时效性**: 商品信息会实时更新，包括价格、库存等
