# 搜索功能示例

本文档提供搜索 API 的基础使用示例。

## 基础搜索

### 简单搜索

```typescript
import { Goofish } from "goofish-client";

const client = new Goofish({ cookie: "cookie2=xxxx" });

const result = await client.api.mtop.search.search({
  keyword: "iPhone 14",
  pageNumber: 1,
  rowsPerPage: 20,
});

console.log(result);
```

### 分页搜索

```typescript
const result = await client.api.mtop.search.search({
  keyword: "iPhone 14",
  pageNumber: 1,
  rowsPerPage: 30,
});
console.log(result);
```

## 高级搜索

### 价格筛选

```typescript
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
```

### 地理位置搜索

```typescript
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

### 时间筛选

```typescript
const recentItems = await client.api.mtop.search.search({
  keyword: "相机",
  filter: {
    publishDays: "7",
  },
  sortField: "create",
  sortValue: "desc",
});
```

## 错误处理示例

### 基础错误处理

```typescript
try {
  const result = await client.api.mtop.search.search({
    keyword: "iPhone",
  });

  if (result.ret[0] === "SUCCESS::调用成功") {
    // 处理成功结果
    console.log(result.data);
  } else {
    // 处理业务错误
    console.error("搜索失败:", result.message);
  }
} catch (error) {
  // 处理网络错误
  console.error("请求异常:", error.message);
}
```

## 数据处理示例

### 商品信息提取

```typescript
interface SearchResultItem {
  data: {
    item: {
      main: {
        exContent: {
          itemId: string; // 商品ID
          title: string; // 商品标题
          price: Array<{
            // 价格信息
            text: string;
          }>;
          area: string; // 地区
          picUrl: string; // 图片URL
          userNickName: string; // 卖家昵称
        };
        targetUrl: string; // 详情页链接
      };
    };
  };
}

function extractItemInfo(items: SearchResultItem[]) {
  return items.map((item) => {
    const content = item.data.item.main.exContent;
    return {
      id: content.itemId,
      title: content.title,
      price: content.price.map((p) => p.text).join(""),
      area: content.area,
      image: content.picUrl,
      seller: content.userNickName,
      detailUrl: item.data.item.main.targetUrl,
    };
  });
}
```

## 搜索参数说明

### 排序字段 (sortField)

- `"price"` - 按价格排序
- `"create"` - 按创建时间排序
- `"pos"` - 按距离排序

### 排序方向 (sortValue)

- `"asc"` - 升序
- `"desc"` - 降序

### 发布时间 (publishDays)

- `"1"` - 最近 1 天
- `"3"` - 最近 3 天
- `"7"` - 最近 7 天
- `"14"` - 最近 14 天
