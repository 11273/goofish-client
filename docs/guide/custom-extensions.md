# 自定义扩展指南

当官方 Client 还没有接入某些新接口时，你可以通过底层 HTTP 客户端构造自定义请求来扩展功能。

## 扩展方式概览

| 扩展方式                              | 适用场景                       | 复杂度 | 推荐指数   |
| ------------------------------------- | ------------------------------ | ------ | ---------- |
| [继承 HTTP 客户端](#继承-http-客户端) | 快速实现（推荐）               | ⭐⭐   | ⭐⭐⭐⭐⭐ |
| [继承客户端](#继承客户端)             | 高自定义需求，长期使用的新接口 | ⭐⭐⭐ | ⭐⭐⭐⭐   |

## 继承 HTTP 客户端

### 获取 HTTP 客户端

```typescript
import { Goofish } from "goofish-client";

const client = new Goofish({ cookie: "cookie2=xxxx" });

// 获取 Mtop  的 HTTP 客户端
const mtopHttp = client.httpClientMtop;
// 获取 Passport 的 HTTP 客户端
const passportHttp = client.httpClientPassport;

// 获取 Mtop 的配置信息
const mtopConfig = client.config.mtop;
// 获取 Passport 的配置信息
const passportConfig = client.config.passport;
```

### Mtop 接口调用示例

```typescript
import {
  BaseMtopService,
  Goofish,
  GoofishMtopResponse,
  SearchResponse,
} from "goofish-client";

class ExtendedGoofish extends BaseMtopService {
  /**
   * 获取首页推荐
   * @returns 首页推荐
   */
  public async getHomeFeed(): Promise<GoofishMtopResponse<SearchResponse>> {
    return this.request<SearchResponse>({
      api: "mtop.taobao.idlehome.home.webpc.feed",
      data: {
        itemId: "",
        pageSize: 30,
        pageNumber: 1,
        machId: "",
      },
    });
  }
}

async function main() {
  const client = new Goofish({ cookie: "cookie2=xxxx" });

  const extendedClient = new ExtendedGoofish(
    client.httpClientMtop,
    client.config
  );

  const response = await extendedClient.getHomeFeed();

  console.log(response);
}

main();
```

### Passport 接口调用示例

```typescript
import {
  BasePassportService,
  Goofish,
  GoofishPassportResponse,
  QrGenerateResponse,
} from "goofish-client";

export class ExtendedGoofish extends BasePassportService {
  /**
   * 生成二维码
   * @returns 二维码生成结果
   */
  public async generate(): Promise<
    GoofishPassportResponse<QrGenerateResponse>
  > {
    return this.request<QrGenerateResponse>({
      api: "/newlogin/qrcode/generate.do",
      method: "GET",
    });
  }
}

async function main() {
  const client = new Goofish({
    cookie: "cookie2=xxxx",
  });

  const extendedClient = new ExtendedGoofish(
    client.httpClientPassport,
    client.config
  );

  const response = await extendedClient.generate();

  console.log(response);
}

main();
```

## 继承客户端

### 扩展 Mtop 接口

```typescript
import {
  BaseMtopService,
  Goofish,
  logger,
  LogLevel,
} from "goofish-client";
import type { GoofishMtopResponse, HomeFeedResponse } from "goofish-client";

/**
 * 方式1：继承 BaseMtopService（推荐）
 * 这种方式可以直接使用 request 方法，自动处理签名、token 管理等
 */
class CustomMtopService extends BaseMtopService {
  /**
   * 自定义接口：获取首页猜你喜欢
   */
  async getHomeFeed(): Promise<GoofishMtopResponse<HomeFeedResponse>> {
    return this.request<HomeFeedResponse>({
      api: "mtop.taobao.idlehome.home.webpc.feed",
      version: "1.0",
      data: {
        itemId: "",
        pageSize: 30,
        pageNumber: 1,
        machId: "",
      },
    });
  }
}

async function main() {
  // 创建 Goofish 客户端
  const client = new Goofish({
    cookie: "cookie2=xxxx",
    level: LogLevel.DEBUG,
  });

  // 创建自定义服务实例
  const customService = new CustomMtopService(
    client.httpClientMtop,
    client.config
  );

  // 调用自定义接口
  try {
    const homeFeed = await customService.getHomeFeed();
    logger.info("首页猜你喜欢:", homeFeed);
  } catch (error) {
    logger.error("获取首页猜你喜欢失败:", error);
  }
}

main();
```

### 扩展 Passport 接口

```typescript
import {
  BasePassportService,
  Goofish,
} from "goofish-client";
import type { GoofishPassportResponse, QrGenerateResponse } from "goofish-client";

/**
 * 方式1：继承 BasePassportService（推荐）
 * 这种方式可以直接使用 request 方法
 */
class CustomPassportService extends BasePassportService {
  /**
   * 自定义接口：生成二维码
   */
  async generateQrcode(): Promise<GoofishPassportResponse<QrGenerateResponse>> {
    return this.request<QrGenerateResponse>({
      api: "/newlogin/qrcode/generate.do",
      method: "GET",
      data: {
        appName: this.config.passport.appName,
        fromSite: this.config.passport.fromSite,
      },
    });
  }
}

async function main() {
  // 创建 Goofish 客户端
  const client = new Goofish({
    cookie: "cookie2=xxxx",
  });

  // 创建自定义服务实例
  const customService = new CustomPassportService(
    client.httpClientPassport,
    client.config
  );

  // 调用自定义接口
  const response = await customService.generateQrcode();
  console.log(response);
}

main();
```

## 高级扩展

### 拦截器扩展

```typescript
import { Goofish, LogLevel } from "goofish-client";

const client = new Goofish({
  cookie: "cookie2=xxxx", // 用户认证信息
  level: LogLevel.INFO, // 日志级别
});

// 拦截 Mtop 请求
client.httpClientMtop.getAxios().interceptors.request.use((config) => {
  console.log("request", config);
  return config;
});

// 拦截 Mtop 响应
client.httpClientMtop.getAxios().interceptors.response.use((response) => {
  console.log("response", response);
  return response;
});

// 拦截 Passport 请求
client.httpClientPassport.getAxios().interceptors.request.use((config) => {
  console.log("request", config);
  return config;
});

// 拦截 Passport 响应
client.httpClientPassport.getAxios().interceptors.response.use((response) => {
  console.log("response", response);
  return response;
});
```

## 最佳实践

### 1. 接口兼容性

- 功能探测：在正式调用前先检测接口是否可用，避免不必要的错误
- 参数验证：严格验证接口参数，确保符合服务端要求

### 2. 性能优化

- 请求缓存：对频繁调用的接口实施缓存策略，减少网络请求
- 批量请求：将多个相关请求合并，减少 HTTP 连接开销
- 请求去重：避免短时间内发送相同请求，使用防抖或节流

### 3. 错误处理

- 错误分类：区分网络错误、业务错误和系统错误，采用不同处理策略
- 友好提示：将技术错误转换为用户可理解的提示信息
- 错误上报：建立错误监控机制，及时发现和修复问题

### 4. 安全考虑

- 敏感信息保护：不在代码中硬编码密钥、Cookie 等敏感信息
- 输入验证：对所有用户输入进行严格验证和过滤
- Token 管理：定期更新 Token，避免过期导致的请求失败

### 5. 代码组织

- 模块化设计：按业务功能组织代码，保持单一职责原则
- 类型安全：充分利用 TypeScript 的类型系统，减少运行时错误
- 文档完善：为每个自定义接口编写清晰的文档和使用示例

### 6. 监控与日志

- 请求日志：记录关键请求信息，便于问题排查
- 异常告警：设置关键指标告警，快速响应异常情况
- 日志分级：合理使用日志级别，避免日志过多或过少
