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
  generateSign,
  Goofish,
  logger,
  LogLevel,
  TokenManager,
} from "goofish-client";

class ExtendedGoofish extends Goofish {
  /**
   * 访问底层 Mtop HTTP 客户端
   */
  get mtopHttp() {
    return this.httpClientMtop;
  }

  /**
   * 访问底层 Passport HTTP 客户端
   */
  get passportHttp() {
    return this.httpClientPassport;
  }

  /**
   * 获取 Mtop 配置
   */
  get mtopConfig() {
    return this.config.mtop;
  }

  /**
   * 自定义 Mtop 接口示例：获取首页猜你喜欢
   */
  async getHomeFeed() {
    const api = "mtop.taobao.idlehome.home.webpc.feed";
    const version = "1.0";
    const timestamp = Date.now().toString();

    const data: Record<string, number | string> = {
      itemId: "",
      pageSize: 30,
      pageNumber: 1,
      machId: "",
    };
    const sign = generateSign({
      appKey: this.mtopConfig.appKey,
      t: timestamp,
      data: JSON.stringify(data),
      token: TokenManager.getToken(),
    });
    const params = {
      jsv: this.mtopConfig.jsv,
      appKey: this.mtopConfig.appKey,
      t: timestamp,
      sign,
      v: version,
      type: this.mtopConfig.type,
      dataType: this.mtopConfig.dataType,
      timeout: this.mtopConfig.timeout,
      sessionOption: this.mtopConfig.sessionOption,
      accountSite: this.mtopConfig.accountSite,
      spm_cnt: this.mtopConfig.spmCnt,
      spm_pre: this.mtopConfig.spmPre,
      log_id: this.mtopConfig.logId,
      api,
    };

    const response = await this.mtopHttp.request({
      method: "POST",
      url: `/h5/${api}/${version}/`,
      params,
      data: { data: JSON.stringify(data) },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // 自行管理令牌，一般只需要加这一行即可
    TokenManager.updateFromHeaders(response.headers);

    return response.data;
  }
}

async function main() {
  // 使用扩展客户端
  const client = new ExtendedGoofish({
    level: LogLevel.DEBUG,
  });

  // 调用自定义接口
  try {
    // 首次会获取令牌，第二个接口才能正常请求
    await client.getHomeFeed();
    // 真实接口
    const homeFeed = await client.getHomeFeed();
    logger.info("首页猜你喜欢:", homeFeed);
  } catch (error) {
    logger.error("获取首页猜你喜欢失败:", error.response.status);
  }
}

main();
```

### 扩展 Passport 接口

```typescript
import { Goofish } from "goofish-client";

class ExtendedPassportClient extends Goofish {
  /**
   * 自定义 Passport 接口示例：生成二维码
   */
  async generateQrcode() {
    const response = await this.httpClientPassport.request({
      method: "POST",
      url: "/newlogin/qrcode/generate.do",
      data: {
        appName: this.config.passport.appName,
        fromSite: this.config.passport.fromSite,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  }
}

async function main() {
  const client = new ExtendedPassportClient({
    cookie: "cookie2=xxxx",
  });

  const response = await client.generateQrcode();
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
