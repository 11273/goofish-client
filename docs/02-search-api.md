# 搜索接口文档

> 详细介绍 Goofish SDK 的商品搜索功能，包括搜索参数、筛选条件和返回数据结构。

## 🔍 接口概述

搜索服务提供了强大的商品搜索功能，支持关键词搜索、多维度筛选、排序等功能。

**API 端点**：`mtop.taobao.idlemtopsearch.pc.search`

## 📝 基础使用

### 简单搜索

```typescript
import { Goofish } from "goofish-sdk";

const client = new Goofish({ cookie: "your-cookie" });

// 基础关键词搜索
const result = await client.api.search.search({
  keyword: "iPhone 15",
  pageNumber: 1,
  rowsPerPage: 30,
});

console.log("搜索结果:", result.data.resultList);
```

### 高级搜索

```typescript
import { SortField, SortValue, QuickFilter, PublishDays } from "goofish-sdk";

const result = await client.api.search.search({
  keyword: "Nintendo Switch",
  pageNumber: 1,
  rowsPerPage: 20,

  // 排序配置
  sortField: SortField.PRICE, // 按价格排序
  sortValue: SortValue.ASC, // 升序排列

  // 筛选条件
  filter: {
    // 价格范围：1000-3000元
    priceRange: {
      from: 1000,
      to: 3000,
    },

    // 发布时间：7天内
    publishDays: PublishDays.SEVEN_DAYS,

    // 快速筛选：个人闲置 + 包邮
    quickFilters: [QuickFilter.PERSONAL, QuickFilter.FREE_POSTAGE],
  },

  // 地理位置筛选
  locationFilter: {
    divisionList: [
      {
        province: "广东省",
        city: "深圳市",
      },
    ],
    excludeMultiPlacesSellers: true,
  },
});
```

## 📋 搜索参数详解

### 基础参数

| 参数          | 类型     | 必填 | 默认值 | 说明            |
| ------------- | -------- | ---- | ------ | --------------- |
| `keyword`     | `string` | ✅   | -      | 搜索关键词      |
| `pageNumber`  | `number` | ❌   | `1`    | 页码，从 1 开始 |
| `rowsPerPage` | `number` | ❌   | `30`   | 每页商品数量    |

### 排序参数

| 参数        | 类型        | 可选值                                                 | 说明     |
| ----------- | ----------- | ------------------------------------------------------ | -------- |
| `sortField` | `SortField` | `PRICE` `CREATE` `REDUCE` `POSITION` `MODIFY` `CREDIT` | 排序字段 |
| `sortValue` | `SortValue` | `ASC` `DESC` `CREDIT_DESC`                             | 排序方式 |

#### 排序字段说明

```typescript
enum SortField {
  PRICE = "price", // 价格
  CREATE = "create", // 发布时间
  REDUCE = "reduce", // 降价幅度
  POSITION = "pos", // 位置距离
  MODIFY = "modify", // 修改时间
  CREDIT = "credit", // 信用
}
```

#### 排序方式说明

```typescript
enum SortValue {
  ASC = "asc", // 升序
  DESC = "desc", // 降序
  CREDIT_DESC = "credit_desc", // 信用降序
}
```

### 筛选条件

#### 价格筛选

```typescript
filter: {
  priceRange: {
    from: 100,        // 最低价格
    to: 500,         // 最高价格（可选，不填表示不限）
  }
}
```

#### 发布时间筛选

```typescript
enum PublishDays {
  ONE_DAY = '1',        // 1天内
  THREE_DAYS = '3',     // 3天内
  SEVEN_DAYS = '7',     // 7天内
  FOURTEEN_DAYS = '14', // 14天内
}

filter: {
  publishDays: PublishDays.SEVEN_DAYS,
}
```

#### 快速筛选

```typescript
enum QuickFilter {
  PERSONAL = 'filterPersonal',              // 个人闲置
  APPRAISE = 'filterAppraise',             // 验货宝
  GAME_ACCOUNT = 'gameAccountInsurance',    // 验号担保
  FREE_POSTAGE = 'filterFreePostage',      // 包邮
  HIGH_LEVEL_SELLER = 'filterHighLevelYxpSeller', // 超赞鱼小铺
  NEW = 'filterNew',                       // 全新
  INSPECTED = 'inspectedPhone',            // 严选
  ONE_KEY_RESELL = 'filterOneKeyResell',   // 转卖
}

filter: {
  quickFilters: [
    QuickFilter.PERSONAL,
    QuickFilter.FREE_POSTAGE,
  ],
}
```

### 地理位置筛选

```typescript
locationFilter: {
  // 地区列表
  divisionList: [{
    province: '北京市',    // 省份
    city: '北京市',        // 城市
    area: '朝阳区',        // 区域（可选）
  }],

  // 是否排除多地卖家
  excludeMultiPlacesSellers: false,

  // 额外地区信息
  extraDivision: '全国',
}
```

### GPS 定位搜索

```typescript
// GPS 坐标搜索
gps: {
  latitude: 39.9042,     // 纬度
  longitude: 116.4074,   // 经度
},

// 自定义距离范围（单位：米）
customDistance: '5000',

// 用户当前位置信息
userPosition: {
  province: '北京市',
  city: '北京市',
  district: '朝阳区',
},
```

## 📊 返回数据结构

### 响应概览

```typescript
interface SearchResponse {
  appBar: Record<string, unknown>; // 应用栏数据
  filterBar: FilterBar; // 筛选栏数据
  needDecryptKeys: string[]; // 需要解密的字段
  resultInfo: ResultInfo; // 结果统计信息
  resultList: SearchResultItem[]; // 商品列表
  resultPrefixBar: unknown[]; // 结果前缀栏
  tabList: unknown[]; // 标签页列表
  topList: unknown[]; // 置顶列表
}
```

### 商品信息结构

```typescript
interface SearchResultItem {
  data: {
    item: {
      main: {
        // 基本信息
        targetUrl: string; // 商品详情链接

        exContent: {
          itemId: string; // 商品ID
          title: string; // 商品标题
          area: string; // 地区
          price: PriceComponent[]; // 价格信息
          picUrl: string; // 商品图片
          picWidth: number; // 图片宽度
          picHeight: number; // 图片高度

          // 用户信息
          userNickName: string; // 卖家昵称
          userAvatarUrl: string; // 卖家头像

          // 商品详细参数
          detailParams: {
            itemId: string; // 商品ID
            title: string; // 标题
            userNick: string; // 用户昵称
            soldPrice: string; // 售价
            isVideo: string; // 是否有视频
            itemType: string; // 商品类型
          };

          // 商品标签
          fishTags: {
            r1?: TagGroup; // 第一行标签
            r2?: TagGroup; // 第二行标签
            r3?: TagGroup; // 第三行标签
            // ... 更多标签行
          };
        };
      };
    };
  };
}
```

### 价格信息

```typescript
interface PriceComponent {
  text: string; // 价格文本，如 "¥1299"
  textColor: string; // 文本颜色
  textSize: number; // 文本大小
  bold: boolean; // 是否加粗
  type: string; // 组件类型
}
```

### 商品标签

```typescript
interface TagGroup {
  tagList: Tag[]; // 标签列表
  config: TagConfig; // 标签配置
}

interface Tag {
  data: {
    // 文本标签
    content?: string; // 标签内容
    color?: string; // 文字颜色
    size?: string; // 字体大小

    // 图片标签
    url?: string; // 图片链接
    width?: string | number; // 宽度
    height?: string | number; // 高度

    // 样式属性
    bgColor?: string; // 背景颜色
    borderRadius?: string; // 圆角
  };
}
```

## 💡 使用示例

### 示例 1：搜索附近的个人闲置商品

```typescript
const nearbyItems = await client.api.search.search({
  keyword: "相机",
  gps: {
    latitude: 39.9042,
    longitude: 116.4074,
  },
  customDistance: "10000", // 10公里内
  filter: {
    quickFilters: [QuickFilter.PERSONAL],
  },
  sortField: SortField.POSITION, // 按距离排序
});
```

### 示例 2：搜索价格区间内的全新商品

```typescript
const newItems = await client.api.search.search({
  keyword: "MacBook",
  filter: {
    priceRange: {
      from: 5000,
      to: 15000,
    },
    quickFilters: [QuickFilter.NEW],
    publishDays: PublishDays.SEVEN_DAYS,
  },
  sortField: SortField.PRICE,
  sortValue: SortValue.ASC,
});
```

### 示例 3：解析商品信息

```typescript
const result = await client.api.search.search({
  keyword: "iPhone",
  rowsPerPage: 10,
});

result.data.resultList.forEach((item, index) => {
  const product = item.data.item.main.exContent;

  console.log(`商品 ${index + 1}:`);
  console.log(`  标题: ${product.title}`);
  console.log(`  价格: ${product.price[0]?.text || "价格面议"}`);
  console.log(`  卖家: ${product.userNickName}`);
  console.log(`  地区: ${product.area}`);
  console.log(`  商品ID: ${product.itemId}`);
  console.log(`  详情链接: ${item.data.item.main.targetUrl}`);
  console.log("---");
});
```

## ⚠️ 注意事项

1. **请求频率**：建议控制请求频率，避免触发限流
2. **关键词限制**：某些敏感关键词可能无法搜索
3. **地理位置**：GPS 搜索需要提供准确的坐标信息
4. **分页处理**：大量数据请分页获取，避免单次请求过多数据

## 🐛 常见问题

### Q: 为什么搜索结果为空？

A: 检查关键词是否正确，cookie 是否有效，以及是否触发了平台限制。

### Q: 如何获取更多搜索结果？

A: 增加 `rowsPerPage` 参数值，或者使用分页获取更多数据。

### Q: 地理位置搜索不准确怎么办？

A: 确保 GPS 坐标准确，并适当调整 `customDistance` 参数。

---

> 🔍 **搜索技巧**：合理使用筛选条件可以大大提高搜索结果的准确性和相关性。
