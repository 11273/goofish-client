# Goofish Client

🚨 **法律风险声明** 🚨

**本项目为非官方客户端库，通过逆向工程方式实现对闲鱼平台的接口调用。使用本库存在以下风险：**

1. **违反服务条款**：可能违反闲鱼平台的用户服务协议
2. **账号风险**：使用可能导致账号被限制或封禁
3. **法律风险**：在某些司法管辖区，逆向工程可能涉及法律问题
4. **不稳定性**：平台接口变更可能导致功能失效

**使用者需自行承担所有风险，开发者不承担任何法律责任。建议仅用于学习研究目的。**

---

非官方的闲鱼商品搜索客户端库，支持商品搜索等功能。

## 安装

```bash
npm install goofish-client
```

## 快速开始

```typescript
import { Goofish } from "goofish-client";

// 创建客户端实例
const client = new Goofish({
  cookie: "cookie2=xxxx",
  debug: true, // 启用调试模式以查看详细日志
});

// 搜索商品
const results = await client.search.search({
  keyword: "iPhone",
  pageNumber: 1,
  rowsPerPage: 10,
});

console.log(results);
```

## 日志功能

### 基础使用

SDK 内置了完整的日志系统，支持请求响应日志记录：

```typescript
// 启用调试模式，查看详细的请求响应日志
const client = new Goofish({
  cookie: "cookie2=xxxx",
  debug: true, // 启用后会显示详细的HTTP请求日志
});

// 普通模式，只显示基本信息
const client = new Goofish({
  cookie: "cookie2=xxxx",
  debug: false, // 默认值，只显示基本日志
});
```

### 自定义日志器

```typescript
import { createLogger, LogLevel } from "goofish-client";

// 创建自定义日志器
const logger = createLogger({
  debug: true,
  level: LogLevel.WARN, // 只显示警告和错误级别的日志
  prefix: "MyApp", // 自定义日志前缀
});

// 使用自定义日志器
logger.info("这是一条信息");
logger.warn("这是一条警告");
logger.error("这是一条错误");

// 记录HTTP请求
logger.logRequest({
  method: "POST",
  url: "/api/search",
  data: { keyword: "test" },
});
```

### 日志级别

- `LogLevel.ERROR` (0) - 只显示错误
- `LogLevel.WARN` (1) - 显示警告和错误
- `LogLevel.INFO` (2) - 显示信息、警告和错误
- `LogLevel.DEBUG` (3) - 显示所有日志

### 调试模式 vs 普通模式

**调试模式 (debug: true)**:

- 显示完整的请求 URL、方法、数据
- 显示详细的响应内容
- 显示请求耗时
- 自动过滤敏感信息（如 Cookie、Token 等）

**普通模式 (debug: false)**:

- 只显示基本的请求信息
- 显示请求成功/失败状态
- 不显示敏感数据

## API 参考

### Goofish

```typescript
interface GoofishConfig {
  baseURL?: string; // API基础URL
  timeout?: number; // 请求超时时间
  cookie?: string; // 用户Cookie
  debug?: boolean; // 是否启用调试模式
}
```

### 搜索服务

```typescript
interface SearchParams {
  keyword: string; // 搜索关键词
  pageNumber?: number; // 页码，默认1
  rowsPerPage?: number; // 每页条数，默认20
  fromFilter?: boolean; // 是否来自筛选，默认true
  sortValue?: string; // 排序方式，默认'desc'
  sortField?: string; // 排序字段，默认'create'
  customDistance?: string; // 自定义距离
  gps?: string; // GPS位置
  propValueStr?: object; // 属性值字符串
  customGps?: string; // 自定义GPS
  searchReqFromPage?: string; // 搜索来源页面
  extraFilterValue?: string; // 额外筛选值
  userPositionJson?: string; // 用户位置JSON
}
```

## 示例

查看 `examples/` 目录下的完整示例代码。

## 许可证

MIT
