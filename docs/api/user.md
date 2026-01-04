# 用户接口

提供用户信息获取和状态管理相关的 API 接口。

## 接口概览

| 方法                            | API 路径                                  | 描述                   |
| ------------------------------- | ----------------------------------------- | ---------------------- |
| [`getUserNav()`](#getusernav)   | `mtop.idle.web.user.page.nav`            | 获取用户导航信息       |
| [`getUserHead()`](#getuserhead) | `mtop.idle.web.user.page.head`           | 获取用户头部信息       |
| [`queryUser()`](#queryuser)     | `mtop.taobao.idlemessage.pc.user.query`  | 按会话查询用户基础信息 |

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

获取用户头部信息，包含更详细的用户状态和配置信息。支持查看自己或其他用户的信息。

**API 路径：** `mtop.idle.web.user.page.head`

### getUserHead 接口定义

#### 请求参数

```typescript
interface UserPageHeadRequest {
  /** 是否为本人，默认: true */
  self: boolean;
  /** 用户ID（当self为false时需要） */
  userId?: string;
}
```

完整的参数类型定义请参考：[UserPageHeadRequest](../reference/types.md#userpageheadrequest)

#### 响应数据

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
  /** 店铺信息（查看他人信息时可能为空） */
  shop?: UserHeadShop;
  /** 社交信息 */
  social: UserHeadSocial;
  /** 标签页信息 */
  tabs: UserHeadTabs;
  /** 基础信息 */
  base: UserHeadBase;
}
```

完整的响应类型定义请参考：[UserHeadResponse](../reference/types.md#userheadresponse) | [GoofishMtopResponse](../reference/types.md#goofishmtopresponse)

### getUserHead 使用示例

#### 查看自己的信息

```typescript
import { Goofish } from "goofish-client";

const client = new Goofish({ cookie: "cookie2=xxxx" });

// 查看自己的信息（默认方式）
const myInfo = await client.api.mtop.user.getUserHead();

// 或者显式指定查看自己
const myInfoExplicit = await client.api.mtop.user.getUserHead({
  self: true,
});

console.log(myInfo);
```

#### 查看他人的信息

```typescript
// 查看其他用户的信息
const otherUserInfo = await client.api.mtop.user.getUserHead({
  self: false,
  userId: "38xxxxxx950", // 目标用户的ID
});

console.log("用户昵称:", otherUserInfo.data.module.base.displayName);
console.log("用户位置:", otherUserInfo.data.module.base.ipLocation);
console.log("粉丝数量:", otherUserInfo.data.module.social.followers);
console.log("关注数量:", otherUserInfo.data.module.social.following);
```

#### 提取用户信息

```typescript
// 获取用户头部信息并提取关键数据
const response = await client.api.mtop.user.getUserHead({
  self: false,
  userId: "38xxxxxx950",
});

if (response.ret[0] === "SUCCESS::调用成功") {
  const { baseInfo, module } = response.data;

  const userInfo = {
    // 基础信息
    userId: baseInfo.kcUserId,
    isMyself: baseInfo.self,
    encryptedId: baseInfo.encryptedUserId,

    // 个人信息
    nickname: module.base.displayName,
    avatar: module.base.avatar.avatar,
    location: module.base.ipLocation,
    introduction: module.base.introduction,

    // 社交信息
    followers: module.social.followers,
    following: module.social.following,
    followStatus: module.social.followStatus, // 1-已关注，0-未关注

    // 统计信息
    itemCount: module.tabs.item.number,
    rateCount: module.tabs.rate.number,

    // 信用标签
    creditTags: module.base.ylzTags.map((tag) => ({
      role: tag.attributes.role, // seller 或 buyer
      level: tag.attributes.level,
      text: tag.text,
      icon: tag.icon,
    })),

    // 用户标签
    tags: {
      realNameVerified: baseInfo.tags.real_name_certification_77,
      zhimaAuth: baseInfo.tags.idle_zhima_zheng,
      isUpgraded: baseInfo.tags.xianyu_user_upgrade,
    },
  };

  console.log(userInfo);
}
```

### 参数详解

#### 查看他人信息的注意事项

1. **用户 ID 获取**: 可以从搜索结果、商品详情页的卖家信息等途径获取用户 ID
2. **隐私设置**: 某些用户可能设置了隐私保护，部分信息可能不可见
3. **权限限制**: 查看他人信息需要登录状态，请确保 Cookie 有效
4. **数据差异**: 查看他人信息时，`shop`字段可能为空，`baseInfo.self`为 false

#### 关注状态说明

- `followStatus: 0` - 未关注
- `followStatus: 1` - 已关注

## TypeScript 支持

```typescript
import type {
  UserNavResponse,
  UserHeadResponse,
  UserPageHeadRequest,
  UserQueryRequest,
  UserQueryResponse,
  GoofishMtopResponse,
} from "goofish-client";

// 类型安全的用户信息获取
const userNav: GoofishMtopResponse<UserNavResponse> =
  await client.api.mtop.user.getUserNav();

// 查看自己的信息
const myInfo: GoofishMtopResponse<UserHeadResponse> =
  await client.api.mtop.user.getUserHead();

// 查看他人信息
const params: UserPageHeadRequest = {
  self: false,
  userId: "38xxxxxx950",
};
const otherUserInfo: GoofishMtopResponse<UserHeadResponse> =
  await client.api.mtop.user.getUserHead(params);

// 按会话查询用户信息（IM 场景常用）
const queryParams: UserQueryRequest = {
  sessionId: "conversation-or-session-id",
};
const userQueryRes: GoofishMtopResponse<UserQueryResponse> =
  await client.api.mtop.user.queryUser(queryParams);
```

### 注意事项

1. **登录状态**: 所有用户接口都需要用户登录状态，请确保已设置有效的 Cookie
2. **数据结构**: 查看他人信息时，某些字段可能为空或不可见
3. **请求频率**: 建议控制请求频率，避免过于频繁的调用
4. **隐私保护**: 尊重用户隐私，合理使用获取的用户信息

## queryUser()

按会话维度查询用户信息，常用于 IM 会话中根据 `sessionId` 反查用户详情。

**API 路径：** `mtop.taobao.idlemessage.pc.user.query`

### 请求参数

```typescript
interface UserQueryRequest {
  /** 类型，可选，默认 0 */
  type?: number;
  /** 会话类型，可选，默认 1 */
  sessionType?: number;
  /** 会话ID */
  sessionId: string;
  /** 是否为会话所有者，可选，默认 false */
  isOwner?: boolean;
}
```

### 响应数据

实际响应被 [`GoofishMtopResponse`](../reference/types.md#goofishmtopresponse) 统一包裹：

```typescript
GoofishMtopResponse<UserQueryResponse>;
```

其中 `UserQueryResponse` 的结构为：

```typescript
interface UserInfoExt {
  /** 用户勋章 */
  userMedal?: string;
}

interface UserInfo {
  /** 扩展信息 */
  ext: UserInfoExt;
  /** 闲鱼昵称 */
  fishNick: string;
  /** 头像 */
  logo: string;
  /** 昵称（可能加密） */
  nick: string;
  /** 用户类型 */
  type: number;
}

interface UserQueryResponse {
  /** 需要解密的键 */
  needDecryptKeys: string[];
  /** 需要解密的键V2 */
  needDecryptKeysV2: string[];
  /** 用户信息 */
  userInfo: UserInfo;
}
```

### 使用示例

```typescript
import type {
  UserQueryRequest,
  UserQueryResponse,
  GoofishMtopResponse,
} from "goofish-client";

// 从 IM 会话中获取到的 sessionId
const params: UserQueryRequest = {
  sessionId: "xxxxxx",
};

const res: GoofishMtopResponse<UserQueryResponse> =
  await client.api.mtop.user.queryUser(params);

console.log("用户昵称:", res.data.userInfo.fishNick);
console.log("头像:", res.data.userInfo.logo);
console.log("勋章:", res.data.userInfo.ext.userMedal);
```

### 适用场景

1. **IM 会话详情**: 根据会话 ID 获取对端用户详细信息
2. **多端联动**: 结合会话数据与用户资料进行展示
3. **权限判断**: 通过 `isOwner` 标记区分会话所有者视角
