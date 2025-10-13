# 收藏接口

提供用户收藏商品的获取和管理相关的 API 接口。

## 接口概览

| 方法                                              | API 路径                               | 描述             |
| ------------------------------------------------- | -------------------------------------- | ---------------- |
| [`getFavorItemList()`](#getfavoritemlist)         | `mtop.taobao.idle.web.favor.item.list` | 获取收藏商品列表 |
| [`getAllFavorItems()`](#getallfavoritems)         | `mtop.taobao.idle.web.favor.item.list` | 获取全部收藏商品 |
| [`getReducedPriceItems()`](#getreducedpriceitems) | `mtop.taobao.idle.web.favor.item.list` | 获取降价宝贝     |
| [`getValidItems()`](#getvaliditems)               | `mtop.taobao.idle.web.favor.item.list` | 获取有效宝贝     |
| [`getInvalidItems()`](#getinvaliditems)           | `mtop.taobao.idle.web.favor.item.list` | 获取失效宝贝     |

## getFavorItemList()

获取收藏商品列表的基础方法，支持自定义分页和收藏类型筛选。

**API 路径：** `mtop.taobao.idle.web.favor.item.list`

### 接口定义

#### 参数

```typescript
interface FavorItemListRequest {
  /** 页码，从1开始 */
  pageNumber: number;
  /** 每页条数 */
  rowsPerPage: number;
  /** 收藏类型 */
  type: FavorType;
}

enum FavorType {
  /** 全部 */
  DEFAULT = "DEFAULT",
  /** 降价宝贝 */
  REDUCE = "REDUCE",
  /** 有效宝贝 */
  VALID = "VALID",
  /** 失效宝贝 */
  INVALID = "INVALID",
}
```

完整的参数类型定义请参考：[FavorItemListRequest](../reference/types.md#favoritemlistrequest) | [FavorType](../reference/types.md#favortype)

#### 响应

实际响应被 [`GoofishMtopResponse`](../reference/types.md#goofishmtopresponse) 统一包裹：

```typescript
GoofishMtopResponse<FavorItemListResponse>;
```

其中 `FavorItemListResponse` 的主要结构为：

```typescript
interface FavorItemListResponse {
  /** 收藏商品列表 */
  items: FavorItem[];
  /** 扩展信息 */
  ext: Record<string, unknown>;
  /** 需要解密的键 */
  needDecryptKeys: string[];
  /** 需要解密的键V2 */
  needDecryptKeysV2: string[];
  /** 服务器解密键 */
  serverDecryptKeys: string[];
  /** 是否有下一页 */
  nextPage: boolean;
  /** 总数量 */
  totalCount: number;
  /** 服务器时间 */
  serverTime: string;
}

interface FavorItem {
  /** 商品ID */
  id: string;
  /** 长商品ID */
  longItemId: number;
  /** 商品标题 */
  title: string;
  /** 当前价格 */
  price: string;
  /** 原价 */
  originalPrice?: string;
  /** 降价金额 */
  reducePrice?: string;
  /** 主图URL */
  picUrl: string;
  /** 图片URL列表 */
  imageUrls: string[];
  /** 用户昵称 */
  userNick: string;
  /** 用户头像 */
  userAvatar: string;
  /** 用户ID */
  userId: number;
  /** 省份 */
  province: string;
  /** 城市 */
  city: string;
  /** 区域 */
  area: string;
  /** 商品状态 */
  itemStatus: number;
  /** 拍卖类型 */
  auctionType: string;
  /** 是否可议价 */
  bargain: boolean;
  /** 是否包邮 */
  freeShip: boolean;
  /** 是否已收藏 */
  favored: boolean;
  /** 收藏数量 */
  favorNum: number;
  /** 收藏时间 */
  favorTime: string;
  /** 想要数量 */
  wantUv: number;
  // ... 其他字段
}
```

完整的响应类型定义请参考：[FavorItemListResponse](../reference/types.md#favoritemlistresponse) | [FavorItem](../reference/types.md#favoritem) | [GoofishMtopResponse](../reference/types.md#goofishmtopresponse)

### 使用示例

#### 基础使用

```typescript
import { Goofish, FavorType } from "goofish-client";

const client = new Goofish({ cookie: "cookie2=xxxx" });

// 获取第一页全部收藏商品
const favorList = await client.api.mtop.favor.getFavorItemList({
  pageNumber: 1,
  rowsPerPage: 20,
  type: FavorType.DEFAULT,
});

console.log(favorList);
```

#### 获取降价宝贝

```typescript
const reducedItems = await client.api.mtop.favor.getFavorItemList({
  pageNumber: 1,
  rowsPerPage: 20,
  type: FavorType.REDUCE,
});

console.log("降价商品数量:", reducedItems.data?.items?.length);
```

#### 提取收藏商品信息

```typescript
// 获取收藏列表并提取商品信息
const response = await client.api.mtop.favor.getFavorItemList({
  pageNumber: 1,
  rowsPerPage: 20,
  type: FavorType.DEFAULT,
});

if (response.ret[0] === "SUCCESS::调用成功") {
  const { items, totalCount, nextPage } = response.data;

  // 提取商品信息
  const favorItems = items.map((item) => ({
    // 基本信息
    id: item.id,
    longId: item.longItemId,
    title: item.title,

    // 价格信息
    price: {
      current: item.price,
      original: item.originalPrice,
      reduced: item.reducePrice,
    },

    // 卖家信息
    seller: {
      nick: item.userNick,
      avatar: item.userAvatar,
      userId: item.userId,
    },

    // 位置信息
    location: {
      province: item.province,
      city: item.city,
      area: item.area,
    },

    // 图片信息
    images: {
      main: item.picUrl,
      list: item.imageUrls,
    },

    // 状态信息
    status: {
      itemStatus: item.itemStatus,
      favored: item.favored,
      favorNum: item.favorNum,
      wantUv: item.wantUv,
    },

    // 时间信息
    favorTime: item.favorTime,

    // 商品属性
    properties: {
      auctionType: item.auctionType,
      bargain: item.bargain,
      freeShip: item.freeShip,
    },
  }));

  console.log(
    `获取到 ${favorItems.length} 个收藏商品，总计 ${totalCount} 个，还有更多: ${nextPage}`
  );
  console.log(favorItems);
}
```

## getAllFavorItems()

获取全部收藏商品的便捷方法，默认获取第一页 20 条数据。

### 接口定义

#### 参数

```typescript
getAllFavorItems(pageNumber?: number, rowsPerPage?: number)
```

- `pageNumber` (可选): 页码，默认为 1
- `rowsPerPage` (可选): 每页条数，默认为 20

#### 响应

与 `getFavorItemList()` 相同。

### 使用示例

```typescript
// 使用默认参数
const allItems = await client.api.mtop.favor.getAllFavorItems();

// 自定义分页
const customItems = await client.api.mtop.favor.getAllFavorItems(2, 10);
```

## getReducedPriceItems()

获取降价宝贝的便捷方法。

### 接口定义

#### 参数

```typescript
getReducedPriceItems(pageNumber?: number, rowsPerPage?: number)
```

- `pageNumber` (可选): 页码，默认为 1
- `rowsPerPage` (可选): 每页条数，默认为 20

### 使用示例

```typescript
const reducedItems = await client.api.mtop.favor.getReducedPriceItems();
console.log("降价商品:", reducedItems.data?.items);
```

## getValidItems()

获取有效宝贝的便捷方法。

### 接口定义

#### 参数

```typescript
getValidItems(pageNumber?: number, rowsPerPage?: number)
```

- `pageNumber` (可选): 页码，默认为 1
- `rowsPerPage` (可选): 每页条数，默认为 20

### 使用示例

```typescript
const validItems = await client.api.mtop.favor.getValidItems();
console.log("有效商品:", validItems.data?.items);
```

## getInvalidItems()

获取失效宝贝的便捷方法。

### 接口定义

#### 参数

```typescript
getInvalidItems(pageNumber?: number, rowsPerPage?: number)
```

- `pageNumber` (可选): 页码，默认为 1
- `rowsPerPage` (可选): 每页条数，默认为 20

### 使用示例

```typescript
const invalidItems = await client.api.mtop.favor.getInvalidItems();
console.log("失效商品:", invalidItems.data?.items);
```

### 分页加载示例

```typescript
// 分页加载收藏商品
async function loadFavorItems(
  type = FavorType.DEFAULT,
  pageNumber = 1,
  pageSize = 20
) {
  try {
    const response = await client.api.mtop.favor.getFavorItemList({
      pageNumber,
      rowsPerPage: pageSize,
      type,
    });

    if (response.ret[0] === "SUCCESS::调用成功") {
      const { items, totalCount, nextPage, serverTime } = response.data;

      return {
        items,
        total: totalCount,
        hasMore: nextPage,
        serverTime,
        currentPage: pageNumber,
      };
    } else {
      throw new Error(response.message || "获取收藏列表失败");
    }
  } catch (error) {
    console.error("加载收藏商品失败:", error);
    throw error;
  }
}

// 使用示例
const page1 = await loadFavorItems(FavorType.DEFAULT, 1, 20);
console.log(`第1页: ${page1.items.length} 个商品，还有更多: ${page1.hasMore}`);

if (page1.hasMore) {
  const page2 = await loadFavorItems(FavorType.DEFAULT, 2, 20);
  console.log(`第2页: ${page2.items.length} 个商品`);
}
```

### 参数详解

#### 收藏类型说明

- `FavorType.DEFAULT` - 全部收藏商品
- `FavorType.REDUCE` - 降价宝贝（价格有下降的商品）
- `FavorType.VALID` - 有效宝贝（仍在售卖的商品）
- `FavorType.INVALID` - 失效宝贝（已下架或删除的商品）

#### 分页参数

- `pageNumber`: 页码，从 1 开始，默认为 1
- `rowsPerPage`: 每页返回的商品数量，默认为 20，建议范围：10-50

#### 商品状态说明

- `itemStatus`: 商品状态码，不同数值代表不同状态
  - 正数：正常在售
  - 负数：各种下架状态（如 -98 表示已下架）

### TypeScript 支持

```typescript
import type {
  FavorItemListRequest,
  FavorItemListResponse,
  FavorItem,
  FavorType,
  GoofishMtopResponse,
} from "goofish-client";

// 类型安全的收藏商品获取
const params: FavorItemListRequest = {
  pageNumber: 1,
  rowsPerPage: 20,
  type: FavorType.DEFAULT,
};

const response: GoofishMtopResponse<FavorItemListResponse> =
  await client.api.mtop.favor.getFavorItemList(params);

// 处理收藏商品数据
const items: FavorItem[] = response.data?.items || [];
```

### 注意事项

1. **登录状态**: 收藏接口需要用户登录状态，请确保已设置有效的 Cookie
2. **请求频率**: 建议控制请求频率，避免过于频繁的调用
3. **数据实时性**: 收藏列表数据可能存在延迟，商品状态以实际商品页面为准
4. **分页策略**: 建议使用 `pageNumber` 进行分页，合理设置 `rowsPerPage` 大小
5. **错误处理**: 建议添加适当的错误处理逻辑，处理网络异常和 API 错误

### 错误处理示例

```typescript
try {
  const favorList = await client.api.mtop.favor.getAllFavorItems();

  if (favorList.ret[0] !== "SUCCESS::调用成功") {
    console.error("获取收藏列表失败:", favorList.ret);
    return;
  }

  // 处理成功结果
  console.log("收藏商品:", favorList.data?.items);
} catch (error) {
  console.error("请求异常:", error.message);

  if (error.response) {
    console.error("响应状态:", error.response.status);
    console.error("响应数据:", error.response.data);
  }
}
```
