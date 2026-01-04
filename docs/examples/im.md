# IM 功能示例

本文档提供 IM（即时通讯）模块的完整使用示例。

## 基础使用

### 完整的 IM 初始化和消息监听

```typescript
import { Goofish, LogLevel } from "goofish-client";

async function imExample() {
  // 1. 创建客户端实例（开启 IM 能力）
  const client = new Goofish({
    cookie: "cookie2=xxxx",
    level: LogLevel.INFO,
    im: {
      // 可选：自定义 IM 配置
      autoReconnect: true,
      heartbeatInterval: 10000,
    },
  });

  console.log("🚀 IM 示例开始\n");

  // 2. 获取 IM 登录 Token
  const loginTokenResponse = await client.api.mtop.im.getLoginToken();
  console.log("✅ IM 登录 Token 获取成功");

  // 3. 连接 WebSocket
  await client.wsClientIm.connect();
  console.log("✅ WebSocket 连接成功");

  // 4. 注册 IM 服务
  const registerResponse = await client.api.im.auth.register({
    token: loginTokenResponse.data.accessToken,
  });
  console.log("✅ IM 服务注册成功");

  // 5. 监听格式化后的消息（推荐）
  client.api.im.message.onFormattedMessage((message) => {
    console.log("📨 收到格式化消息:", message);
  });

  console.log("👂 开始监听消息...");
}

imExample();
```

## 会话管理

### 获取会话列表

```typescript
// 获取最新的会话列表
const conversations = await client.api.im.conversation.listNewestPagination({
  startTimeStamp: Date.now(),
  limitNum: 20,
});

console.log("会话数量:", conversations.body.userConvs.length);

// 遍历会话
conversations.body.userConvs.forEach((conv) => {
  const conversationId =
    conv.singleChatUserConversation?.singleChatConversation.cid;
  console.log("会话 ID:", conversationId);
});
```

### 分页加载会话

```typescript
// 第一页
const firstPage = await client.api.im.conversation.listNewestPagination({
  startTimeStamp: Number.MAX_SAFE_INTEGER,
  limitNum: 10,
});

// 第二页（使用上一页的 nextCursor）
const secondPage = await client.api.im.conversation.listNewestPagination({
  startTimeStamp: firstPage.body.nextCursor,
  limitNum: 10,
});

console.log(`第一页: ${firstPage.body.userConvs.length} 个会话`);
console.log(`第二页: ${secondPage.body.userConvs.length} 个会话`);
```

## 消息发送

### 发送文本消息（推荐）

```typescript
// 获取第一个会话信息
const conversations = await client.api.im.conversation.listNewestPagination({
  startTimeStamp: Date.now(),
  limitNum: 1,
});

const firstConv = conversations.body.userConvs[0];
const conversationId =
  firstConv.singleChatUserConversation?.singleChatConversation.cid;
const conversationType = firstConv.type;
const pairFirst =
  firstConv.singleChatUserConversation?.singleChatConversation.pairFirst;
const pairSecond =
  firstConv.singleChatUserConversation?.singleChatConversation.pairSecond;

// 发送文本消息
const sendResult = await client.api.im.message.sendTextMessage({
  text: "你好，这是一条测试消息",
  conversationId,
  conversationType,
  receivers: [pairFirst, pairSecond],
});

console.log("✅ 消息发送成功:", sendResult);
```

### 发送自定义消息

```typescript
import { v4 as uuidv4 } from "uuid";

// 使用底层 API 发送自定义消息
const sendResult = await client.api.im.message.sendByReceiverScope({
  message: {
    uuid: uuidv4(),
    cid: conversationId,
    conversationType: 1,
    content: {
      contentType: 101,
      custom: {
        type: 1,
        data: "BASE64_ENCODED_DATA", // 你的自定义数据（Base64 编码）
      },
    },
  },
  receivers: {
    actualReceivers: ["receiver-user-id"],
  },
});
```

## 用户信息查询

### 根据会话 ID 查询用户信息

```typescript
// 从会话中获取用户信息
const conversations = await client.api.im.conversation.listNewestPagination({
  startTimeStamp: Date.now(),
  limitNum: 1,
});

const firstConv = conversations.body.userConvs[0];
const conversationId =
  firstConv.singleChatUserConversation?.singleChatConversation.cid;

// 查询用户信息
const userQuery = await client.api.mtop.user.queryUser({
  sessionId: conversationId.replace("@goofish", ""),
});

console.log("用户信息:", userQuery.data);
```

## 消息监听

### 方式 1：监听格式化消息（推荐）

```typescript
// 监听格式化后的消息，直接获取可用的消息结构
client.api.im.message.onFormattedMessage((message) => {
  console.log("收到消息:", message);
```

### 方式 2：监听同步推送消息

```typescript
// 监听同步推送消息（包含原始数据和解码数据）
client.api.im.message.onSyncPush((message) => {
  console.log("同步推送:", message);
});
```

### 方式 3：监听原始 WebSocket 消息

```typescript
// 监听所有原始 WebSocket 消息（包含心跳等）
client.wsClientIm.on("message", (message) => {
  console.log("原始消息:", message);
});
```

## WebSocket 事件监听

### 连接状态监听

```typescript
// 监听连接打开
client.wsClientIm.on("open", () => {
  console.log("✅ WebSocket 已连接");
});

// 监听连接关闭
client.wsClientIm.on("close", () => {
  console.log("❌ WebSocket 已断开");
});

// 监听错误
client.wsClientIm.on("error", (error) => {
  console.error("❌ WebSocket 错误:", error);
});

// 监听重连
client.wsClientIm.on("reconnect", (attempt) => {
  console.log(`🔄 重连成功，第 ${attempt} 次`);
});

// 监听重连失败
client.wsClientIm.on("reconnect-failed", () => {
  console.log("❌ 重连失败，已达到最大次数");
});
```

## 高级用法

### 自定义 IM 配置

```typescript
const client = new Goofish({
  cookie: "cookie2=xxxx",
  level: LogLevel.INFO,
  im: {
    // WebSocket URL（默认：wss://wss-goofish.dingtalk.com/）
    wsUrl: "wss://wss-goofish.dingtalk.com/",
    // 应用密钥（默认：IM 内置 APP_KEY）
    appKey: "your-app-key",
    // 设备 ID（默认：自动生成）
    deviceId: "your-device-id",
    // 是否自动重连（默认：true）
    autoReconnect: true,
    // 心跳间隔（毫秒，默认：10000）
    heartbeatInterval: 10000,
    // 重连间隔（毫秒，默认：3000）
    reconnectInterval: 3000,
    // 最大重连次数（默认：5）
    maxReconnectAttempts: 5,
    // 请求超时时间（毫秒，默认：20000）
    requestTimeout: 20000,
  },
});
```

### 手动断开和重连

```typescript
// 手动断开连接
client.wsClientIm.disconnect();

// 手动重新连接
await client.wsClientIm.connect();
```

### 查看连接状态

```typescript
// 检查是否已连接
console.log("是否已连接:", client.wsClientIm.connected);

// 获取连接状态
console.log("连接状态:", client.wsClientIm.readyState);

// 获取待处理请求数
console.log("待处理请求数:", client.wsClientIm.pendingRequestCount);

// 获取待发送消息队列长度
console.log("待发送消息队列长度:", client.wsClientIm.queueLength);
```

## 错误处理

### 基础错误处理

```typescript
try {
  // 获取 IM Token
  const tokenResponse = await client.api.mtop.im.getLoginToken();

  // 连接 WebSocket
  await client.wsClientIm.connect();

  // 注册 IM 服务
  await client.api.im.auth.register({
    token: tokenResponse.data.accessToken,
  });

  console.log("✅ IM 初始化成功");
} catch (error) {
  console.error("❌ IM 初始化失败:", error.message);

  // 根据错误类型进行处理
  if (error.code === "ECONNREFUSED") {
    console.error("无法连接到 WebSocket 服务器");
  } else if (error.response) {
    console.error("API 请求失败:", error.response.status);
  }
}
```

### 消息发送错误处理

```typescript
try {
  const sendResult = await client.api.im.message.sendTextMessage({
    text: "测试消息",
    conversationId: "xxx",
    conversationType: 1,
    receivers: ["user-id"],
  });

  console.log("✅ 消息发送成功");
} catch (error) {
  console.error("❌ 消息发送失败:", error.message);

  // 可以根据错误信息进行重试或其他处理
  if (error.message.includes("timeout")) {
    console.log("消息发送超时，尝试重新发送...");
  }
}
```

## 完整示例

### 端到端 IM 应用示例

```typescript
import { Goofish, LogLevel } from "goofish-client";

async function completeImExample() {
  try {
    // 1. 初始化客户端
    const client = new Goofish({
      cookie: "cookie2=xxxx",
      level: LogLevel.INFO,
      im: {
        autoReconnect: true,
      },
    });

    // 2. 获取 Token 并连接
    const tokenRes = await client.api.mtop.im.getLoginToken();
    await client.wsClientIm.connect();
    await client.api.im.auth.register({
      token: tokenRes.data.accessToken,
    });

    console.log("✅ IM 初始化完成");

    // 3. 获取会话列表
    const conversations =
      await client.api.im.conversation.listNewestPagination({
        startTimeStamp: Date.now(),
        limitNum: 20,
      });

    console.log(`📋 获取到 ${conversations.body.userConvs.length} 个会话`);

    // 4. 监听消息
    client.api.im.message.onFormattedMessage((message) => {
      console.log(`📨 [${message.senderId}]: ${message.text}`);

      // 自动回复示例
      if (message.text === "ping") {
        const conv = conversations.body.userConvs.find((c) =>
          c.singleChatUserConversation?.singleChatConversation.cid.includes(
            message.senderId
          )
        );

        if (conv) {
          client.api.im.message.sendTextMessage({
            text: "pong",
            conversationId:
              conv.singleChatUserConversation?.singleChatConversation.cid,
            conversationType: conv.type,
            receivers: [
              conv.singleChatUserConversation?.singleChatConversation
                .pairFirst,
              conv.singleChatUserConversation?.singleChatConversation
                .pairSecond,
            ],
          });
        }
      }
    });

    // 5. 监听连接状态
    client.wsClientIm.on("close", () => {
      console.log("❌ 连接已断开");
    });

    client.wsClientIm.on("reconnect", (attempt) => {
      console.log(`🔄 重连成功，第 ${attempt} 次`);
    });

    console.log("👂 开始监听消息...");

    // 保持程序运行
    await new Promise(() => {});
  } catch (error) {
    console.error("❌ 发生错误:", error.message);
  }
}

completeImExample();
```

## 注意事项

1. **必须先完成注册** - 要正常接收 IM 推送，必须通过 `register()` 完成注册与同步
2. **保持连接心跳** - 默认会根据 `heartbeatInterval` 自动发送心跳，建议保持开启
3. **合理配置重连策略** - 根据业务需要调整 `reconnectInterval` 与 `maxReconnectAttempts`
4. **错误处理** - 建议监听 `wsClientIm` 的 `error`、`close`、`reconnect-failed` 事件
5. **消息去重与幂等** - 同步推送可能包含多条消息，业务侧应根据 `messageId` 做好幂等处理

## 相关文档

- [IM API 文档](../api/im.md) - 查看完整的 IM 接口文档
- [用户接口文档](../api/user.md) - 查看用户信息查询接口
- [配置参考](../api/configuration.md) - 查看 IM 配置选项
