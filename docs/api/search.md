# 搜索接口

提供商品搜索和筛选相关的 API 接口。

## 接口概览

| 方法                  | API 路径                           | 描述     |
| --------------------- | ---------------------------------- | -------- |
| [`search()`](#search) | `mtop.taobao.idle.web.item.search` | 商品搜索 |

## search()

执行商品搜索，支持关键词搜索、价格筛选、地理位置筛选等多种条件。

**API 路径：** `mtop.taobao.idle.web.item.search`

### 接口定义

#### 参数

必填参数：

```typescript
interface SearchOptions {
  /** 搜索关键词（必需） */
  keyword: string;

  /** 页码，默认: 1 */
  pageNumber?: number;

  /** 每页数量，默认: 30 */
  rowsPerPage?: number;

  /** 排序方式 */
  sortValue?: SortValue;

  /** 排序字段 */
  sortField?: SortField;

  // ... 其他可选参数
}
```

完整的参数类型定义请参考：[SearchOptions](../reference/types.md#searchoptions) | [SortValue](../reference/types.md#sortvalue) | [SortField](../reference/types.md#sortfield) | [QuickFilter](../reference/types.md#quickfilter) | [PublishDays](../reference/types.md#publishdays)

#### 响应

实际响应被 [`GoofishMtopResponse`](../reference/types.md#goofishmtopresponse) 统一包裹：

```typescript
GoofishMtopResponse<SearchResponse>;
```

其中 `SearchResponse` 的主要结构为：

```typescript
interface SearchResponse {
  /** 应用栏 */
  appBar: Record<string, unknown>;
  /** 筛选栏 */
  filterBar: FilterBar;
  /** 需要解密的字段 */
  needDecryptKeys: string[];
  /** 结果信息 */
  resultInfo: ResultInfo;
  /** 搜索结果列表 */
  resultList: SearchResultItem[];
  /** 结果前缀栏 */
  resultPrefixBar: unknown[];
  /** 标签列表 */
  tabList: unknown[];
  /** 顶部列表 */
  topList: unknown[];
}
```

完整的响应类型定义请参考：[SearchResponse](../reference/types.md#searchresponse) | [SearchResultItem](../reference/types.md#searchresultitem) | [GoofishMtopResponse](../reference/types.md#goofishmtopresponse)

### 使用示例

#### 基础使用

```typescript
import { Goofish } from "goofish-client";

const client = new Goofish({ cookie: "cookie2=xxxx" });

// 简单搜索
const result = await client.api.mtop.search.search({
  keyword: "iPhone 14",
  pageNumber: 1,
  rowsPerPage: 20,
});

console.log(result);
```

#### 高级筛选

```typescript
// 价格筛选
const priceFiltered = await client.api.mtop.search.search({
  keyword: "MacBook",
  filter: {
    priceRange: {
      from: 5000,
      to: 15000,
    },
  },
  sortField: "price",
  sortValue: "asc",
});

// 时间筛选
const timeFiltered = await client.api.mtop.search.search({
  keyword: "相机",
  filter: {
    publishDays: "7", // 最近7天
  },
  sortField: "create",
  sortValue: "desc",
});

// 地理位置搜索
const locationSearch = await client.api.mtop.search.search({
  keyword: "自行车",
  gps: {
    latitude: 39.9042,
    longitude: 116.4074,
  },
  customDistance: "5000", // 5公里范围
  sortField: "pos",
});
```

#### 分页搜索

```typescript
const result = await client.api.mtop.search.search({
  keyword,
  pageNumber: 1,
  rowsPerPage: 30,
});
```

### 参数详解

#### 排序相关枚举

所有排序相关的枚举类型请参考：[SortField](../reference/types.md#sortfield) | [SortValue](../reference/types.md#sortvalue) | [PublishDays](../reference/types.md#publishdays) | [QuickFilter](../reference/types.md#quickfilter)

### TypeScript 支持

```typescript
import type { SearchOptions, SearchResponse } from "goofish-client";
import { SortField, SortValue, QuickFilter, PublishDays } from "goofish-client";

const options: SearchOptions = {
  keyword: "iPhone",
  pageNumber: 1,
};

const response: GoofishMtopResponse<SearchResponse> =
  await client.api.mtop.search.search(options);
```
