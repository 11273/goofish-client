# 首页接口

提供首页猜你喜欢功能相关的 API 接口。

## 接口概览

| 方法                    | API 路径                               | 描述               |
| ----------------------- | -------------------------------------- | ------------------ |
| [`getFeed()`](#getfeed) | `mtop.taobao.idlehome.home.webpc.feed` | 获取首页 Feed 数据 |

## getFeed()

获取首页猜你喜欢 Feed 数据，支持分页加载。

**API 路径：** `mtop.taobao.idlehome.home.webpc.feed`

### 接口定义

#### 参数

所有参数都是可选的，系统会提供默认值：

```typescript
interface HomeFeedRequest {
  /** 商品ID，用于分页定位（可选） */
  itemId?: string;

  /** 每页大小，默认: 30 */
  pageSize?: number;

  /** 页码，默认: 1 */
  pageNumber?: number;

  /** 机器ID（可选） */
  machId?: string;
}
```

完整的参数类型定义请参考：[HomeFeedRequest](../reference/types.md#homefeedrequest)

#### 响应

实际响应被 [`GoofishMtopResponse`](../reference/types.md#goofishmtopresponse) 统一包裹：

```typescript
GoofishMtopResponse<HomeFeedResponse>;
```

其中 `HomeFeedResponse` 的主要结构为：

```typescript
interface HomeFeedResponse {
  /** 是否异步 */
  asyn: boolean;
  /** 商品卡片列表 */
  cardList: ItemCard[];
  /** Feed数量 */
  feedsCount: number;
  /** 是否有下一页 */
  nextPage: boolean;
  /** 服务器时间 */
  serverTime: string;
}

interface ItemCard {
  /** 卡片数据 */
  cardData: ItemCardData;
  /** 卡片类型 */
  cardType: number;
}

interface ItemCardData {
  /** 商品ID */
  itemId: string;
  /** 标题摘要 */
  titleSummary: {
    text: string;
  };
  /** 价格信息 */
  priceInfo: {
    price: string;
    preText: string;
    sufText?: string;
  };
  /** 城市 */
  city: string;
  /** 用户信息 */
  user: {
    userNick: string;
    avatar: string;
  };
  /** 商品图片列表 */
  images: ItemImage[];
  /** Fish标签 */
  fishTags: HomeFishTags;
  // ... 其他字段
}
```

完整的响应类型定义请参考：[HomeFeedResponse](../reference/types.md#homefeedresponse) | [ItemCard](../reference/types.md#itemcard) | [GoofishMtopResponse](../reference/types.md#goofishmtopresponse)

### 使用示例

#### 基础使用

```typescript
import { Goofish } from "goofish-client";

const client = new Goofish({ cookie: "cookie2=xxxx" });

// 获取首页默认Feed数据
const result = await client.api.mtop.home.getFeed();

console.log(result);
```

### 参数详解

#### 分页参数

- `pageNumber`: 页码，从 1 开始，默认为 1
- `pageSize`: 每页返回的商品数量，默认为 30，建议范围：10-50

#### 定位参数

- `itemId`: 商品 ID，用于分页定位，可以基于上一页最后一个商品的 ID 来获取下一页数据
- `machId`: 机器标识，用于个性化推荐，可选参数

### TypeScript 支持

```typescript
import type { HomeFeedRequest, HomeFeedResponse } from "goofish-client";

const params: HomeFeedRequest = {
  pageSize: 20,
  pageNumber: 1,
};

const response: GoofishMtopResponse<HomeFeedResponse> =
  await client.api.mtop.home.getFeed(params);
```

### 注意事项

1. **登录状态**: 此接口需要用户登录状态，请确保已设置有效的 Cookie
2. **请求频率**: 建议控制请求频率，避免过于频繁的调用
3. **数据更新**: Feed 数据会根据用户行为和时间实时更新
4. **分页策略**: 建议使用`pageNumber`进行分页，`itemId`用于特定场景的定位
