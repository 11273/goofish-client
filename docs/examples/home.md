# 首页功能示例

本文档提供首页猜你喜欢 API 的基础使用示例。

## 基础使用

### 获取默认 Feed 数据

```typescript
import { Goofish } from "goofish-client";

const client = new Goofish({ cookie: "cookie2=xxxx" });

const result = await client.api.mtop.home.getFeed();

console.log(result);
```

### 自定义参数获取

```typescript
const result = await client.api.mtop.home.getFeed({
  pageSize: 20,
  pageNumber: 1,
  itemId: "",
  machId: "",
});

console.log(result);
```

## 分页加载

### 基础分页

```typescript
// 第一页
const firstPage = await client.api.mtop.home.getFeed({
  pageNumber: 1,
  pageSize: 30,
});

// 第二页
const secondPage = await client.api.mtop.home.getFeed({
  pageNumber: 2,
  pageSize: 30,
});

console.log(`第一页商品数量: ${firstPage.data.cardList.length}`);
console.log(`第二页商品数量: ${secondPage.data.cardList.length}`);
```
