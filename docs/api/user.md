# 用户接口

提供用户信息获取和状态管理相关的 API 接口。

## 接口概览

| 方法                            | API 路径                       | 描述             |
| ------------------------------- | ------------------------------ | ---------------- |
| [`getUserNav()`](#getusernav)   | `mtop.idle.web.user.page.nav`  | 获取用户导航信息 |
| [`getUserHead()`](#getuserhead) | `mtop.idle.web.user.page.head` | 获取用户头部信息 |

## getUserNav()

获取用户导航信息，包含登录状态和基础用户数据。主要用于检查用户登录状态。

**API 路径：** `mtop.idle.web.user.page.nav`

### 接口定义

#### 参数

无参数

#### 响应

实际响应被 [`GoofishMtopResponse`](../reference/types.md#goofishmtopresponse) 统一包裹：

```typescript
GoofishMtopResponse<UserNavResponse>;
```

其中 `UserNavResponse` 的结构为：

```typescript
interface UserNavResponse {
  /** 模块数据 */
  module: UserNavModule;
}

interface UserNavModule {
  /** 用户基础信息 */
  base: UserNavBase;
}

interface UserNavBase {
  /** 未付款订单数量 */
  buyerNotPayCount: number;
  /** 购买次数 */
  purchaseCount: number;
  /** 显示名称 */
  displayName: string;
  /** 头像URL */
  avatar: string;
  /** 出售次数 */
  soldCount: number;
  /** 关注者数量 */
  followers: string;
  /** 关注数量 */
  following: string;
  /** 收藏数量 */
  collectionCount: number;
}
```

完整的响应类型定义请参考：[UserNavResponse](../reference/types.md#usernavresponse) | [GoofishMtopResponse](../reference/types.md#goofishmtopresponse)

### 使用示例

#### 基础使用

```typescript
import { Goofish } from "goofish-client";

const client = new Goofish({ cookie: "cookie2=xxxx" });

const userNav = await client.api.mtop.user.getUserNav();

console.log(userNav);
```

## getUserHead()

获取用户头部信息，包含更详细的用户状态和配置信息。

**API 路径：** `mtop.idle.web.user.page.head`

### 接口定义

#### 参数

无参数

#### 响应

实际响应被 [`GoofishMtopResponse`](../reference/types.md#goofishmtopresponse) 统一包裹：

```typescript
GoofishMtopResponse<UserHeadResponse>;
```

其中 `UserHeadResponse` 的结构为：

```typescript
interface UserHeadResponse {
  /** 基础信息 */
  baseInfo: UserHeadBaseInfo;
  /** 模块数据 */
  module: UserHeadModule;
}

interface UserHeadModule {
  /** 店铺信息 */
  shop: UserHeadShop;
  /** 社交信息 */
  social: UserHeadSocial;
  /** 标签页信息 */
  tabs: UserHeadTabs;
  /** 基础信息 */
  base: UserHeadBase;
}
```

完整的响应类型定义请参考：[UserHeadResponse](../reference/types.md#userheadresponse) | [GoofishMtopResponse](../reference/types.md#goofishmtopresponse)

### 使用示例

#### 基础使用

```typescript
import { Goofish } from "goofish-client";

const client = new Goofish({ cookie: "cookie2=xxxx" });

const userHead = await client.api.mtop.user.getUserHead();

console.log(userHead);
```

## TypeScript 支持

```typescript
import type {
  UserNavResponse,
  UserHeadResponse,
  GoofishMtopResponse,
} from "goofish-client";

// 类型安全的用户信息获取
const userNav: GoofishMtopResponse<UserNavResponse> =
  await client.api.mtop.user.getUserNav();
const userHead: GoofishMtopResponse<UserHeadResponse> =
  await client.api.mtop.user.getUserHead();
```
