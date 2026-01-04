# IM 接口

IM（Instant Messaging）模块提供了基于 WebSocket 的即时通讯能力，包括：

- **IM Token 获取（Mtop）**
- **IM WebSocket 认证**
- **会话列表获取**
- **消息发送与接收**

---

## 接口概览

### Mtop 接口

| 方法                                       | API 路径                                      | 描述               |
| ------------------------------------------ | --------------------------------------------- | ------------------ |
| `getLoginToken()`                          | `mtop.taobao.idlemessage.pc.login.token`      | 获取 IM 登录 Token |

### WebSocket 接口（通过 `client.api.im.*` 使用）

| 服务                      | 方法                                        | WebSocket 路径                              | 描述                         |
| ------------------------- | ------------------------------------------- | ------------------------------------------- | ---------------------------- |
| `client.api.im.auth`      | `register()`                                | `/reg`                                      | 注册 IM 服务并完成同步       |
| `client.api.im.auth`      | `getSyncStatus()`                           | `/r/SyncStatus/getState`                    | 获取同步状态                 |
| `client.api.im.auth`      | `ackDiff()`                                 | `/r/SyncStatus/ackDiff`                     | 确认同步差异                 |
| `client.api.im.conversation` | `listNewestPagination()`                 | `/r/Conversation/listNewestPagination`      | 获取会话列表（分页）         |
| `client.api.im.message`   | `sendByReceiverScope()`                     | `/r/MessageSend/sendByReceiverScope`        | 按接收者范围发送消息         |
| `client.api.im.message`   | `sendTextMessage()`                         | `/r/MessageSend/sendByReceiverScope`        | 快速发送文本消息（封装上面） |
| `client.api.im.message`   | `onSyncPush()` / `onFormattedMessage()`    | `/s/sync`（推送）                            | 监听同步推送 / 格式化消息    |

此外，还可以直接使用底层 WebSocket 客户端：

- `client.wsClientIm: WsClient`

---

## 配置

### Goofish 配置中的 IM 部分

`GoofishConfig` 新增了可选的 `im` 配置，用于控制 IM 相关行为：

```typescript
interface GoofishConfig {
  // ...
  im?: GoofishImConfig;
}

interface GoofishImConfig {
  // WebSocket URL（默认：wss://wss-goofish.dingtalk.com/）
  wsUrl?: string;
  // 应用密钥（默认：IM 内置 APP_KEY）
  appKey?: string;
  // 设备 ID（默认：内部自动生成 UUID+时间戳）
  deviceId?: string;
  // 是否自动重连（默认：true）
  autoReconnect?: boolean;
  // 心跳间隔（毫秒，默认：10000）
  heartbeatInterval?: number;
  // 重连间隔（毫秒，默认：3000）
  reconnectInterval?: number;
  // 最大重连次数（默认：5）
  maxReconnectAttempts?: number;
  // 请求超时时间（毫秒，默认：20000）
  requestTimeout?: number;
}
```

当未显式提供某些字段时，内部会使用 `IM_CONFIG` 中的默认值。

---

## 快速开始

### 1. 初始化客户端并开启 IM 能力

```typescript
import { Goofish, LogLevel } from "goofish-client";

const client = new Goofish({
  cookie: "cookie2=xxxx",
  level: LogLevel.DEBUG,
  im: {
    // 可选：覆盖默认配置
    wsUrl: "wss://wss-goofish.dingtalk.com/",
    autoReconnect: true,
  },
});
```

### 2. 获取 IM 登录 Token（Mtop）

```typescript
const tokenResponse = await client.api.mtop.im.getLoginToken();

// 类型：GoofishMtopResponse<ImLoginTokenResponse>
// ImLoginTokenResponse 包含：
// - accessToken
// - accessTokenExpiredTime
// - refreshToken
const token = tokenResponse.data.accessToken;
```

### 3. 建立 WebSocket 连接

```typescript
// 使用配置中的 wsUrl 连接（推荐）
await client.wsClientIm.connect();

// 也可以显式传入 URL
// await client.wsClientIm.connect("wss://wss-goofish.dingtalk.com/");
```

### 4. 注册 IM 服务（推荐入口）

```typescript
// 使用 IM Token 完成注册，内部会自动进行同步和差异确认
const registerResponse = await client.api.im.auth.register({
  token,
});

console.log("IM 注册成功:", registerResponse.body);
```

> `register()` 内部会自动调用 `getSyncStatus()` 和 `ackDiff()`，确保后续能正常收到消息推送。

---

## Mtop：ImService（`client.api.mtop.im`）

### `getLoginToken()`

**API 路径：** `mtop.taobao.idlemessage.pc.login.token`

#### 参数

```typescript
interface ImLoginTokenRequest {
  appKey: string;
  deviceId: string;
}
```

在实际调用中，`getLoginToken()` 会自动构造上述参数：

- `appKey`：优先使用 `params.appKey`，否则使用 `config.im?.appKey`，最后回落到内置 `IM_CONFIG.APP_KEY`
- `deviceId`：优先使用 `params.deviceId`，否则使用 `config.im?.deviceId`，最后自动生成 `UUID-时间戳`

#### 响应

```typescript
type GetLoginTokenResult = GoofishMtopResponse<ImLoginTokenResponse>;
```

---

## WebSocket 客户端：`WsClient` 与 `client.wsClientIm`

`Goofish` 内部创建了一个 `WsClient` 实例，通过只读属性 `wsClientIm` 暴露：

```typescript
const ws = client.wsClientIm;
```

### 主要方法

```typescript
// 连接（url 可选，不传则使用 config.im.wsUrl）
await ws.connect();

// 断开连接
ws.disconnect();

// 发送消息并等待响应
const res = await ws.send({
  lwp: "/r/Conversation/listNewestPagination",
  body: [{ startTimeStamp: Date.now(), limitNum: 20 }],
});

// 发送原始消息（不等待响应）
ws.sendRaw({
  lwp: "/!",
  headers: { mid: "1234567890 0" },
});
```

### 事件

```typescript
ws.on("open", () => {
  console.log("WebSocket 已连接");
});

ws.on("message", (data) => {
  console.log("收到原始消息:", data);
});

ws.on("reconnect", (attempt) => {
  console.log("重连成功，第", attempt, "次");
});

ws.on("reconnect-failed", () => {
  console.log("重连失败，已达到最大次数");
});
```

### 状态与统计

```typescript
ws.connected; // boolean - 是否已连接
ws.readyState; // WsReadyState
ws.pendingRequestCount; // 待处理请求数
ws.queueLength; // 待发送消息队列长度
```

---

## WebSocket：认证服务 `client.api.im.auth`

### `register(params?: ImRegisterRequest)`

**路径：** `/reg`

使用 IM Token 注册 IM 服务，并自动完成同步初始化。

```typescript
const tokenRes = await client.api.mtop.im.getLoginToken();

const registerRes = await client.api.im.auth.register({
  token: tokenRes.data.accessToken,
  // 其他字段可选，未传则使用 IM_CONFIG 与配置默认值
});
```

注册成功后，`AuthService` 会：

1. 调用 `getSyncStatus()` 获取同步状态
2. 调用 `ackDiff()` 确认同步差异

### `getSyncStatus(params?: Partial<ImSyncStatusRequest>)`

**路径：** `/r/SyncStatus/getState`

```typescript
const syncStatusRes = await client.api.im.auth.getSyncStatus({
  topic: "sync", // 不传时默认为 "sync"
});
```

### `ackDiff(params: ImAckDiffRequest)`

**路径：** `/r/SyncStatus/ackDiff`

通常使用 `getSyncStatus()` 的响应数据构造参数。

```typescript
const syncStatusRes = await client.api.im.auth.getSyncStatus();

await client.api.im.auth.ackDiff(
  syncStatusRes.body as ImAckDiffRequest
);
```

> 一般情况下直接调用 `register()` 即可完成上述两个步骤，无需手动调用。

---

## WebSocket：会话服务 `client.api.im.conversation`

### `listNewestPagination(params: ConversationListNewestPaginationRequest)`

**路径：** `/r/Conversation/listNewestPagination`

#### 请求参数

```typescript
interface ConversationListNewestPaginationRequest {
  /** 开始时间戳 */
  startTimeStamp: number;
  /** 限制数量 */
  limitNum: number;
}
```

#### 使用示例

```typescript
const res =
  await client.api.im.conversation.listNewestPagination({
    startTimeStamp: Date.now(),
    limitNum: 20,
  });

// 类型：WsResponse<ConversationListNewestPaginationResponse>
console.log("会话数量:", res.body?.userConvs.length);
```

---

## WebSocket：消息服务 `client.api.im.message`

### `sendByReceiverScope(params: SendMessageByReceiverScopeRequest)`

**路径：** `/r/MessageSend/sendByReceiverScope`

```typescript
const res = await client.api.im.message.sendByReceiverScope({
  message: {
    uuid: "your-uuid",
    cid: "conversation-id",
    conversationType: 1,
    content: {
      contentType: 101,
      custom: {
        type: 1,
        data: "BASE64_ENCODED_DATA",
      },
    },
  },
  receivers: {
    actualReceivers: ["receiver-user-id"],
  },
});
```

### `sendTextMessage(params)`

在 `sendByReceiverScope` 之上封装的快捷方法，用于发送纯文本消息。

```typescript
await client.api.im.message.sendTextMessage({
  text: "Hello, World!",
  conversationId: "conversation-id",
  conversationType: 1,
  receivers: ["receiver-user-id"],
});
```

### 监听同步推送：`onSyncPush()`

```typescript
client.api.im.message.onSyncPush((message) => {
  // message.body.syncPushPackage.data 中为原始同步数据
  // message.body.decodedItems 中为解码后的数据（包含错误信息）
  console.log("收到同步推送:", message.body?.decodedItems);
});
```

### 监听格式化消息：`onFormattedMessage()`

该方法基于内部的 `decodeImData` 与 `formatMessage`，直接提供结构化后的消息体，推荐在业务中使用。

```typescript
client.api.im.message.onFormattedMessage((msg) => {
  console.log("消息ID:", msg.messageId);
  console.log("发送者ID:", msg.senderId);
  console.log("文本内容:", msg.text);
  console.log("解析后的内容:", msg.content);
});
```

---

## TypeScript 支持

在 IM 模块中，以下类型已通过主入口导出，可直接使用：

```typescript
import type {
  ImLoginTokenRequest,
  ImLoginTokenResponse,
  ImRegisterRequest,
  ImRegisterResponse,
  ImSyncStatusRequest,
  ImSyncStatusResponse,
  ImAckDiffRequest,
  ImAckDiffResponse,
  ConversationListNewestPaginationRequest,
  ConversationListNewestPaginationResponse,
  SendMessageByReceiverScopeRequest,
  SendMessageByReceiverScopeResponse,
  WsClientConfig,
  WsMessage,
  WsResponse,
} from "goofish-client";
```

---

## 注意事项

1. **必须先完成注册**：要正常接收 IM 推送，必须通过 `register()` 完成注册与同步。
2. **保持连接心跳**：默认会根据 `heartbeatInterval` 自动发送心跳到 `/!`，建议保持开启。
3. **合理配置重连策略**：根据业务需要调整 `reconnectInterval` 与 `maxReconnectAttempts`。
4. **错误处理**：建议监听 `wsClientIm` 的 `error`、`close`、`reconnect-failed` 事件，做好异常与恢复逻辑。
5. **消息去重与幂等**：同步推送可能包含多条消息，业务侧应根据 `messageId` 做好幂等处理。

