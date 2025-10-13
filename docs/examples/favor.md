# 收藏功能示例

本文档提供收藏商品 API 的基础使用示例。

## 基础使用

### 获取全部收藏商品

```typescript
import { Goofish } from "goofish-client";

const client = new Goofish({ cookie: "cookie2=xxxx" });

const result = await client.api.mtop.favor.getAllFavorItems();

console.log(result);
```

### 获取不同类型的收藏商品

```typescript
import { Goofish, FavorType } from "goofish-client";

const client = new Goofish({ cookie: "cookie2=xxxx" });

// 获取全部收藏
const allItems = await client.api.mtop.favor.getAllFavorItems();
console.log("全部收藏:", allItems.data?.items?.length);

// 获取降价宝贝
const reducedItems = await client.api.mtop.favor.getReducedPriceItems();
console.log("降价宝贝:", reducedItems.data?.items?.length);

// 获取有效宝贝
const validItems = await client.api.mtop.favor.getValidItems();
console.log("有效宝贝:", validItems.data?.items?.length);

// 获取失效宝贝
const invalidItems = await client.api.mtop.favor.getInvalidItems();
console.log("失效宝贝:", invalidItems.data?.items?.length);
```

### 自定义参数获取

```typescript
import { FavorType } from "goofish-client";

const result = await client.api.mtop.favor.getFavorItemList({
  pageNumber: 1,
  rowsPerPage: 20,
  type: FavorType.DEFAULT,
});

console.log(result);
```

## 分页加载

### 基础分页

```typescript
// 第一页
const firstPage = await client.api.mtop.favor.getAllFavorItems(1, 20);

// 第二页
const secondPage = await client.api.mtop.favor.getAllFavorItems(2, 20);

console.log(`第一页商品数量: ${firstPage.data?.items?.length || 0}`);
console.log(`第二页商品数量: ${secondPage.data?.items?.length || 0}`);
```

### 智能分页加载

```typescript
async function loadAllFavorItems() {
  let pageNumber = 1;
  const pageSize = 20;
  let allItems = [];
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await client.api.mtop.favor.getAllFavorItems(
        pageNumber,
        pageSize
      );

      if (response.ret[0] === "SUCCESS::调用成功") {
        const { items, nextPage } = response.data;

        allItems = allItems.concat(items);
        hasMore = nextPage;
        pageNumber++;

        console.log(`加载第 ${pageNumber - 1} 页，获得 ${items.length} 个商品`);

        // 避免请求过快
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        console.error("获取收藏列表失败:", response.ret);
        break;
      }
    } catch (error) {
      console.error("请求异常:", error);
      break;
    }
  }

  console.log(`总计加载 ${allItems.length} 个收藏商品`);
  return allItems;
}

// 使用示例
const allFavorItems = await loadAllFavorItems();
```

## 数据处理

### 提取关键信息

```typescript
const response = await client.api.mtop.favor.getAllFavorItems();

if (response.ret[0] === "SUCCESS::调用成功") {
  const favorItems = response.data.items.map((item) => ({
    // 基本信息
    id: item.id,
    title: item.title,

    // 价格信息
    currentPrice: item.price,
    originalPrice: item.originalPrice,
    reducedAmount: item.reducePrice,

    // 卖家信息
    sellerNick: item.userNick,
    sellerAvatar: item.userAvatar,

    // 位置信息
    location: `${item.province} ${item.city} ${item.area}`,

    // 状态信息
    isValid: item.itemStatus > 0,
    isFavored: item.favored,
    favorCount: item.favorNum,
    wantCount: item.wantUv,

    // 时间信息
    favorTime: item.favorTime,

    // 图片信息
    mainImage: item.picUrl,
    allImages: item.imageUrls,
  }));

  console.log("处理后的收藏商品:", favorItems);
}
```

### 按状态分类

```typescript
const response = await client.api.mtop.favor.getAllFavorItems();

if (response.ret[0] === "SUCCESS::调用成功") {
  const items = response.data.items;

  // 按商品状态分类
  const categorized = {
    valid: items.filter((item) => item.itemStatus > 0),
    invalid: items.filter((item) => item.itemStatus <= 0),
    reduced: items.filter(
      (item) => item.reducePrice && parseFloat(item.reducePrice) > 0
    ),
    freeShipping: items.filter((item) => item.freeShip),
    bargainable: items.filter((item) => item.bargain),
  };

  console.log("有效商品:", categorized.valid.length);
  console.log("失效商品:", categorized.invalid.length);
  console.log("降价商品:", categorized.reduced.length);
  console.log("包邮商品:", categorized.freeShipping.length);
  console.log("可议价商品:", categorized.bargainable.length);
}
```

## 错误处理

### 基础错误处理

```typescript
try {
  const favorList = await client.api.mtop.favor.getAllFavorItems();

  if (favorList.ret[0] === "SUCCESS::调用成功") {
    console.log("获取成功:", favorList.data.items.length, "个商品");
  } else {
    console.error("API 返回错误:", favorList.ret);
  }
} catch (error) {
  console.error("请求异常:", error.message);
}
```

### 完整错误处理

```typescript
async function getFavorItemsWithErrorHandling() {
  try {
    const response = await client.api.mtop.favor.getAllFavorItems();

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
    console.error("获取收藏列表失败:", error);

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
const result = await getFavorItemsWithErrorHandling();
if (result.success) {
  console.log("收藏商品:", result.data.items);
} else {
  console.error("获取失败:", result.message);
}
```

## 实用工具函数

### 收藏商品搜索

```typescript
async function searchFavorItems(keyword) {
  const response = await client.api.mtop.favor.getAllFavorItems();

  if (response.ret[0] === "SUCCESS::调用成功") {
    const matchedItems = response.data.items.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
    );

    console.log(`找到 ${matchedItems.length} 个包含 "${keyword}" 的收藏商品`);
    return matchedItems;
  }

  return [];
}

// 使用示例
const phoneItems = await searchFavorItems("iPhone");
```

### 价格监控

```typescript
async function checkPriceReductions() {
  const response = await client.api.mtop.favor.getReducedPriceItems();

  if (response.ret[0] === "SUCCESS::调用成功") {
    const reducedItems = response.data.items.map((item) => ({
      id: item.id,
      title: item.title,
      currentPrice: parseFloat(item.price),
      originalPrice: parseFloat(item.originalPrice || item.price),
      reducedAmount: parseFloat(item.reducePrice || "0"),
      reductionPercent: item.originalPrice
        ? (
            ((parseFloat(item.originalPrice) - parseFloat(item.price)) /
              parseFloat(item.originalPrice)) *
            100
          ).toFixed(1)
        : "0",
    }));

    // 按降价幅度排序
    reducedItems.sort((a, b) => b.reducedAmount - a.reducedAmount);

    console.log("降价商品排行:");
    reducedItems.forEach((item, index) => {
      console.log(`${index + 1}. ${item.title}`);
      console.log(
        `   降价: ${item.reducedAmount}元 (${item.reductionPercent}%)`
      );
      console.log(`   现价: ${item.currentPrice}元`);
    });

    return reducedItems;
  }

  return [];
}

// 使用示例
const priceReductions = await checkPriceReductions();
```

### 收藏统计

```typescript
async function getFavorStatistics() {
  const response = await client.api.mtop.favor.getAllFavorItems();

  if (response.ret[0] === "SUCCESS::调用成功") {
    const items = response.data.items;

    const stats = {
      total: items.length,
      valid: items.filter((item) => item.itemStatus > 0).length,
      invalid: items.filter((item) => item.itemStatus <= 0).length,
      reduced: items.filter(
        (item) => item.reducePrice && parseFloat(item.reducePrice) > 0
      ).length,
      freeShipping: items.filter((item) => item.freeShip).length,
      bargainable: items.filter((item) => item.bargain).length,

      // 价格统计
      totalValue: items.reduce(
        (sum, item) => sum + parseFloat(item.price || "0"),
        0
      ),
      avgPrice:
        items.length > 0
          ? (
              items.reduce(
                (sum, item) => sum + parseFloat(item.price || "0"),
                0
              ) / items.length
            ).toFixed(2)
          : "0",

      // 城市分布
      cities: items.reduce((cities, item) => {
        cities[item.city] = (cities[item.city] || 0) + 1;
        return cities;
      }, {}),
    };

    console.log("收藏统计:");
    console.log(`总收藏: ${stats.total} 个`);
    console.log(`有效商品: ${stats.valid} 个`);
    console.log(`失效商品: ${stats.invalid} 个`);
    console.log(`降价商品: ${stats.reduced} 个`);
    console.log(`包邮商品: ${stats.freeShipping} 个`);
    console.log(`可议价商品: ${stats.bargainable} 个`);
    console.log(`总价值: ${stats.totalValue.toFixed(2)} 元`);
    console.log(`平均价格: ${stats.avgPrice} 元`);
    console.log("城市分布:", stats.cities);

    return stats;
  }

  return null;
}

// 使用示例
const statistics = await getFavorStatistics();
```
