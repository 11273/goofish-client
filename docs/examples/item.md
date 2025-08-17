# 商品详情功能示例

本文档提供商品详情 API 的基础使用示例。

## 基础使用

### 获取商品详情

```typescript
import { Goofish } from "goofish-client";

const client = new Goofish({ cookie: "cookie2=xxxx" });

const result = await client.api.mtop.item.getDetail({
  itemId: "95xxxxxxxxx334",
});

console.log(result);
```

### 提取基本信息

```typescript
const response = await client.api.mtop.item.getDetail({
  itemId: "95xxxxxxxxx334",
});

if (response.ret[0] === "SUCCESS::调用成功") {
  const itemDetail = response.data;

  console.log("商品标题:", itemDetail.itemDO.title);
  console.log("商品价格:", itemDetail.itemDO.soldPrice);
  console.log("商品描述:", itemDetail.itemDO.desc);
  console.log("卖家昵称:", itemDetail.sellerDO.nick);
  console.log("浏览次数:", itemDetail.itemDO.browseCnt);
  console.log("收藏次数:", itemDetail.itemDO.collectCnt);
}
```

## 实用示例

### 商品信息格式化

```typescript
function formatItemDetail(itemDetail: ItemDetailResponse) {
  const { itemDO, sellerDO } = itemDetail;

  return {
    // 基本信息
    id: itemDO.itemId,
    title: itemDO.title,
    description: itemDO.desc,

    // 价格信息
    price: {
      current: itemDO.soldPrice,
      original: itemDO.originalPrice,
      shipping: itemDO.transportFee,
    },

    // 统计信息
    stats: {
      views: itemDO.browseCnt,
      favorites: itemDO.collectCnt,
      wants: itemDO.wantCnt,
    },

    // 商品状态
    status: {
      code: itemDO.itemStatus,
      text: itemDO.itemStatusStr,
      online: itemDO.itemStatus === 0,
    },

    // 图片列表
    images: itemDO.imageInfos.map((img) => ({
      url: img.url,
      isMain: img.major,
      dimensions: {
        width: img.widthSize,
        height: img.heightSize,
      },
    })),

    // 卖家信息
    seller: {
      id: sellerDO.sellerId,
      nickname: sellerDO.nick,
      city: sellerDO.city,
      avatar: sellerDO.portraitUrl,
      signature: sellerDO.signature,
      soldCount: sellerDO.hasSoldNumInteger,
      replyRate: sellerDO.replyRatio24h,
      replyTime: sellerDO.replyInterval,
      lastSeen: sellerDO.lastVisitTime,
    },

    // 时间信息
    createTime: new Date(itemDO.gmtCreate),
    serverTime: itemDetail.serverTime,
  };
}

// 使用示例
const response = await client.api.mtop.item.getDetail({
  itemId: "95xxxxxxxxx334",
});

if (response.ret[0] === "SUCCESS::调用成功") {
  const formattedItem = formatItemDetail(response.data);
  console.log(formattedItem);
}
```

### 图片处理

```typescript
function processItemImages(itemDetail: ItemDetailResponse) {
  const images = itemDetail.itemDO.imageInfos;

  // 获取主图
  const mainImage = images.find((img) => img.major);

  // 获取所有图片
  const allImages = images.map((img) => ({
    url: img.url,
    isMain: img.major,
    width: img.widthSize,
    height: img.heightSize,
    // 生成不同尺寸的图片URL
    thumbnail: `${img.url}_200x200q90.jpg`,
    medium: `${img.url}_640x640q90.jpg`,
  }));

  return {
    mainImage,
    allImages,
    imageCount: images.length,
  };
}
```

### 商品标签处理

```typescript
function processItemLabels(itemDetail: ItemDetailResponse) {
  const labels = itemDetail.itemDO.itemLabelExtList;

  return labels.map((label) => ({
    id: label.labelId,
    text: label.text,
    type: label.labelType,
    source: label.from,
    categoryId: label.channelCateId,
    // 解析属性
    properties: parseProperties(label.properties),
  }));
}

function parseProperties(properties: string) {
  // 解析属性字符串，格式如: "20879##成色:10941990949##轻微穿着痕迹"
  const parts = properties.split("##");
  const result: Record<string, string> = {};

  for (let i = 1; i < parts.length; i += 2) {
    if (parts[i] && parts[i + 1]) {
      const [key] = parts[i].split(":");
      result[key] = parts[i + 1];
    }
  }

  return result;
}
```

### 卖家信用评估

```typescript
function evaluateSellerCredit(sellerDO: SellerDO) {
  const {
    hasSoldNumInteger,
    replyRatio24h,
    zhimaAuth,
    identityTags,
    levelTags,
  } = sellerDO;

  // 销售信用评分
  const salesScore = Math.min(hasSoldNumInteger * 2, 100);

  // 响应信用评分
  const replyRate = parseFloat(replyRatio24h.replace("%", ""));
  const responseScore = replyRate;

  // 认证信用评分
  let authScore = 0;
  if (zhimaAuth) authScore += 30;
  if (identityTags.length > 0) authScore += 20;
  if (levelTags.length > 0) authScore += 10;

  const totalScore = (salesScore + responseScore + authScore) / 3;

  return {
    totalScore: Math.round(totalScore),
    breakdown: {
      sales: salesScore,
      response: responseScore,
      auth: authScore,
    },
    level: totalScore >= 80 ? "高" : totalScore >= 60 ? "中" : "低",
    badges: {
      zhimaAuth,
      identityVerified: identityTags.length > 0,
      hasLevel: levelTags.length > 0,
    },
  };
}
```

## 错误处理示例

### 基础错误处理

```typescript
async function getItemDetailSafely(itemId: string) {
  try {
    const result = await client.api.mtop.item.getDetail({ itemId });

    if (result.ret[0] === "SUCCESS::调用成功") {
      return {
        success: true,
        data: result.data,
      };
    } else {
      return {
        success: false,
        error: result.message || "获取商品详情失败",
        code: result.ret[0],
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || "网络请求失败",
      code: "NETWORK_ERROR",
    };
  }
}

// 使用示例
const result = await getItemDetailSafely("95xxxxxxxxx334");
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

### 批量获取商品详情

```typescript
async function getBatchItemDetails(itemIds: string[]) {
  const results = await Promise.allSettled(
    itemIds.map((id) => client.api.mtop.item.getDetail({ itemId: id }))
  );

  return results.map((result, index) => {
    if (
      result.status === "fulfilled" &&
      result.value.ret[0] === "SUCCESS::调用成功"
    ) {
      return {
        itemId: itemIds[index],
        success: true,
        data: result.value.data,
      };
    } else {
      return {
        itemId: itemIds[index],
        success: false,
        error:
          result.status === "rejected"
            ? result.reason.message
            : result.value.message,
      };
    }
  });
}

// 使用示例
const itemIds = ["95xxxxxxxxx334", "950699239335", "950699239336"];
const batchResults = await getBatchItemDetails(itemIds);

batchResults.forEach((result) => {
  if (result.success) {
    console.log(`商品 ${result.itemId}:`, result.data.itemDO.title);
  } else {
    console.error(`商品 ${result.itemId} 获取失败:`, result.error);
  }
});
```

## 数据缓存示例

### 简单内存缓存

```typescript
class ItemDetailCache {
  private cache = new Map<
    string,
    {
      data: ItemDetailResponse;
      timestamp: number;
    }
  >();

  private readonly TTL = 5 * 60 * 1000; // 5分钟

  async getItemDetail(itemId: string): Promise<ItemDetailResponse | null> {
    const cached = this.cache.get(itemId);

    if (cached && Date.now() - cached.timestamp < this.TTL) {
      return cached.data;
    }

    try {
      const result = await client.api.mtop.item.getDetail({ itemId });

      if (result.ret[0] === "SUCCESS::调用成功") {
        this.cache.set(itemId, {
          data: result.data,
          timestamp: Date.now(),
        });
        return result.data;
      }
    } catch (error) {
      console.error("获取商品详情失败:", error);
    }

    return null;
  }

  clearExpired(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp >= this.TTL) {
        this.cache.delete(key);
      }
    }
  }
}

// 使用示例
const cache = new ItemDetailCache();
const itemDetail = await cache.getItemDetail("95xxxxxxxxx334");
```

## 完整示例

### 商品详情页面组件

```typescript
interface ItemDetailPageProps {
  itemId: string;
}

async function ItemDetailPage({ itemId }: ItemDetailPageProps) {
  const result = await getItemDetailSafely(itemId);

  if (!result.success) {
    return {
      error: result.error,
      code: result.code,
    };
  }

  const itemDetail = formatItemDetail(result.data);
  const sellerCredit = evaluateSellerCredit(result.data.sellerDO);
  const images = processItemImages(result.data);
  const labels = processItemLabels(result.data);

  return {
    item: itemDetail,
    seller: {
      ...itemDetail.seller,
      credit: sellerCredit,
    },
    images: images,
    labels: labels,
    recommendations: [], // 可以结合搜索API获取相关推荐
  };
}

// 使用示例
const pageData = await ItemDetailPage({ itemId: "95xxxxxxxxx334" });
console.log(pageData);
```
