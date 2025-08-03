# 用户接口文档

> 详细介绍 Goofish SDK 的用户信息相关接口，包括用户导航信息和用户详细信息获取。

## 👤 接口概述

用户服务提供了获取当前登录用户信息的功能，包括基础导航信息和详细的用户数据。

## 📋 可用接口

| 接口方法        | API 端点                       | 描述                 |
| --------------- | ------------------------------ | -------------------- |
| `getUserNav()`  | `mtop.idle.web.user.page.nav`  | 获取用户导航信息     |
| `getUserHead()` | `mtop.idle.web.user.page.head` | 获取用户头部详细信息 |

## 🧭 用户导航信息

### 基础使用

```typescript
import { Goofish } from "goofish-sdk";

const client = new Goofish({ cookie: "your-cookie" });

// 获取用户导航信息
const navResult = await client.api.user.getUserNav();
console.log("用户导航信息:", navResult.data);
```

### 用户导航接口详情

**方法名**：`getUserNav()`  
**API 端点**：`mtop.idle.web.user.page.nav`  
**请求方式**：POST  
**需要登录**：是

### 返回数据结构

用户导航信息包含以下基本数据：

```typescript
interface UserNavResponse {
  // 用户基本信息
  userInfo: {
    userId: string; // 用户ID
    nickName: string; // 用户昵称
    avatarUrl: string; // 头像链接
    realName?: string; // 真实姓名（如果有）
  };

  // 统计信息
  statistics: {
    followCount: number; // 关注数
    fanCount: number; // 粉丝数
    publishCount: number; // 发布宝贝数
    soldCount: number; // 已卖出数量
  };

  // 导航菜单
  navItems: Array<{
    title: string; // 菜单标题
    url: string; // 跳转链接
    icon?: string; // 图标链接
    badge?: number; // 徽章数字
  }>;

  // 用户状态
  userStatus: {
    isVerified: boolean; // 是否已认证
    creditLevel: string; // 信用等级
    vipLevel?: string; // VIP等级
  };
}
```

### 使用示例

```typescript
const navInfo = await client.api.user.getUserNav();

if (navInfo.ret[0] === "SUCCESS::调用成功") {
  const userData = navInfo.data;

  console.log("用户信息:");
  console.log(`  昵称: ${userData.userInfo.nickName}`);
  console.log(`  用户ID: ${userData.userInfo.userId}`);
  console.log(`  关注数: ${userData.statistics.followCount}`);
  console.log(`  粉丝数: ${userData.statistics.fanCount}`);
  console.log(`  发布数: ${userData.statistics.publishCount}`);
  console.log(`  信用等级: ${userData.userStatus.creditLevel}`);
} else {
  console.error("获取用户导航信息失败:", navInfo.ret);
}
```

## 👤 用户详细信息

### 基础使用

```typescript
// 获取用户头部详细信息
const headResult = await client.api.user.getUserHead();
console.log("用户详细信息:", headResult.data);
```

### 用户详情接口详情

**方法名**：`getUserHead()`  
**API 端点**：`mtop.idle.web.user.page.head`  
**请求方式**：POST  
**需要登录**：是  
**请求参数**：

```typescript
{
  self: true; // 固定参数，获取自己的信息
}
```

### 用户详情返回数据结构

用户详细信息包含更丰富的数据：

```typescript
interface UserHeadResponse {
  // 详细用户信息
  userDetail: {
    userId: string; // 用户ID
    nickName: string; // 用户昵称
    avatarUrl: string; // 头像链接
    realName?: string; // 真实姓名
    signature?: string; // 个人签名
    location?: string; // 所在地区
    joinDate?: string; // 注册时间
  };

  // 详细统计数据
  detailStatistics: {
    // 商品相关
    publishCount: number; // 发布宝贝总数
    soldCount: number; // 已卖出数量
    onSaleCount: number; // 在售商品数量
    wantCount: number; // 想要数量

    // 社交相关
    followCount: number; // 关注数
    fanCount: number; // 粉丝数
    praiseCount: number; // 获赞数

    // 交易相关
    dealCount: number; // 成交次数
    dealAmount?: number; // 成交金额
  };

  // 信用信息
  creditInfo: {
    creditLevel: string; // 信用等级
    creditScore: number; // 信用分数
    badges: Array<{
      // 信用徽章
      name: string;
      icon: string;
      description: string;
    }>;
  };

  // 认证信息
  verificationInfo: {
    isRealNameVerified: boolean; // 实名认证
    isPhoneVerified: boolean; // 手机认证
    isEmailVerified: boolean; // 邮箱认证
    isIdCardVerified: boolean; // 身份证认证
  };

  // 商铺信息
  shopInfo?: {
    shopId: string; // 商铺ID
    shopName: string; // 商铺名称
    shopLevel: string; // 商铺等级
    shopDescription: string; // 商铺描述
  };
}
```

### 使用示例

```typescript
const headInfo = await client.api.user.getUserHead();

if (headInfo.ret[0] === "SUCCESS::调用成功") {
  const userData = headInfo.data;

  console.log("用户详细信息:");
  console.log(`  昵称: ${userData.userDetail.nickName}`);
  console.log(`  用户ID: ${userData.userDetail.userId}`);
  console.log(`  个人签名: ${userData.userDetail.signature || "暂无"}`);
  console.log(`  所在地区: ${userData.userDetail.location || "未知"}`);

  console.log("\n统计信息:");
  console.log(`  发布商品: ${userData.detailStatistics.publishCount}`);
  console.log(`  已卖出: ${userData.detailStatistics.soldCount}`);
  console.log(`  在售商品: ${userData.detailStatistics.onSaleCount}`);
  console.log(`  关注数: ${userData.detailStatistics.followCount}`);
  console.log(`  粉丝数: ${userData.detailStatistics.fanCount}`);

  console.log("\n信用信息:");
  console.log(`  信用等级: ${userData.creditInfo.creditLevel}`);
  console.log(`  信用分数: ${userData.creditInfo.creditScore}`);

  console.log("\n认证状态:");
  console.log(
    `  实名认证: ${
      userData.verificationInfo.isRealNameVerified ? "已认证" : "未认证"
    }`
  );
  console.log(
    `  手机认证: ${
      userData.verificationInfo.isPhoneVerified ? "已认证" : "未认证"
    }`
  );
} else {
  console.error("获取用户详细信息失败:", headInfo.ret);
}
```

## 🔄 接口对比

| 特性       | getUserNav() | getUserHead() |
| ---------- | ------------ | ------------- |
| 数据详细度 | 基础信息     | 详细信息      |
| 响应速度   | 较快         | 较慢          |
| 数据量     | 较小         | 较大          |
| 使用场景   | 导航栏显示   | 个人中心详情  |
| 统计信息   | 基础统计     | 详细统计      |
| 认证信息   | 简单状态     | 详细认证状态  |

## 💡 最佳实践

### 1. 合理选择接口

```typescript
// 场景1：导航栏显示用户基本信息
async function loadUserNav() {
  const navInfo = await client.api.user.getUserNav();
  // 显示昵称、头像、基础统计
}

// 场景2：个人中心页面
async function loadUserProfile() {
  const headInfo = await client.api.user.getUserHead();
  // 显示详细信息、完整统计、认证状态
}
```

### 2. 错误处理

```typescript
async function getUserInfo() {
  try {
    const [navResult, headResult] = await Promise.all([
      client.api.user.getUserNav(),
      client.api.user.getUserHead(),
    ]);

    // 处理成功响应
    if (navResult.ret[0].startsWith("SUCCESS")) {
      console.log("导航信息获取成功");
    }

    if (headResult.ret[0].startsWith("SUCCESS")) {
      console.log("详细信息获取成功");
    }
  } catch (error) {
    console.error("获取用户信息失败:", error);

    // 检查是否是认证问题
    if (error.message.includes("TOKEN")) {
      console.log("请检查登录状态");
    }
  }
}
```

### 3. 数据缓存

```typescript
class UserService {
  private navCache: any = null;
  private headCache: any = null;
  private cacheTime = 5 * 60 * 1000; // 5分钟缓存

  async getUserNavCached() {
    if (
      this.navCache &&
      Date.now() - this.navCache.timestamp < this.cacheTime
    ) {
      return this.navCache.data;
    }

    const result = await client.api.user.getUserNav();
    this.navCache = {
      data: result,
      timestamp: Date.now(),
    };

    return result;
  }
}
```

## 🔍 数据解析示例

### 解析用户等级

```typescript
function parseUserLevel(creditLevel: string): string {
  const levelMap: Record<string, string> = {
    A: "信用极好",
    B: "信用优秀",
    C: "信用良好",
    D: "信用一般",
    E: "信用较差",
  };

  return levelMap[creditLevel] || "未知等级";
}

const headInfo = await client.api.user.getUserHead();
const levelText = parseUserLevel(headInfo.data.creditInfo.creditLevel);
console.log("信用等级:", levelText);
```

### 格式化统计数据

```typescript
function formatCount(count: number): string {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}万`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}

const navInfo = await client.api.user.getUserNav();
const stats = navInfo.data.statistics;

console.log(`关注 ${formatCount(stats.followCount)}`);
console.log(`粉丝 ${formatCount(stats.fanCount)}`);
```

## ⚠️ 注意事项

1. **登录状态**：所有用户接口都需要有效的登录 cookie
2. **数据敏感性**：用户详细信息包含敏感数据，请妥善处理
3. **请求频率**：避免频繁调用用户接口，建议使用缓存
4. **权限限制**：只能获取当前登录用户的信息，无法获取其他用户信息

## 🐛 常见问题

### Q: 为什么获取用户信息失败？

A: 检查 cookie 是否有效，确保已正确登录。

### Q: 如何获取其他用户的信息？

A: 当前接口只支持获取自己的信息，获取其他用户信息需要其他 API。

### Q: 数据更新频率如何？

A: 用户信息通常实时更新，但建议使用适当的缓存机制避免频繁请求。

---

> 👤 **提示**：用户信息接口返回的数据结构可能会根据平台更新而变化，建议在使用时做好容错处理。
