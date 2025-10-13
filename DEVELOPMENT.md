# 开发者指南

本文档提供项目的开发、构建和发布流程说明。

## 🚀 快速开始

### 克隆项目

```bash
git clone https://github.com/11273/goofish-client.git
cd goofish-client
```

### 安装依赖

```bash
npm install
```

### 运行示例

```bash
npm run example
```

## 📦 常用命令

### 开发相关

```bash
# 启动开发模式（监听文件变化自动构建）
npm run dev

# 类型检查
npm run typecheck

# 代码检查
npm run lint

# 代码检查并自动修复
npm run lint:fix
```

### 构建相关

```bash
# 开发构建
npm run build

# 生产构建（会压缩代码）
npm run build:prod
```

### 文档相关

```bash
# 启动文档开发服务器
npm run docs:dev

# 构建文档
npm run docs:build

# 预览构建后的文档
npm run docs:preview
```

## 🚢 发布流程

### 方式一：GitHub Actions 发布（推荐）⭐

**适用场景：** 正式版本发布，完全自动化

**步骤：**

1. 访问 GitHub 仓库页面
2. 点击 `Actions` → `Release` → `Run workflow`
3. 选择版本类型：
   - **patch** - Bug 修复（1.2.0 → 1.2.1）
   - **minor** - 新功能（1.2.0 → 1.3.0）
   - **major** - 破坏性变更（1.2.0 → 2.0.0）
4. 点击 `Run workflow`

**自动完成的任务：**

- ✅ 类型检查和代码检查
- ✅ 生产构建
- ✅ 版本号更新
- ✅ 生成 CHANGELOG
- ✅ 创建 Git tag
- ✅ 推送到 GitHub
- ✅ 创建 GitHub Release
- ✅ 发布到 npm（使用 NPM_TOKEN，无需 OTP）

### 方式二：本地发布

**适用场景：** 测试发布流程或快速发布

**步骤：**

```bash
# 预览发布（不会真正执行）
npm run release:preview

# 发布 patch 版本
npm run release:patch

# 发布 minor 版本
npm run release:minor

# 发布 major 版本
npm run release:major

# 发布 beta 版本
npm run release:beta

# 发布 alpha 版本
npm run release:alpha
```

**注意事项：**

- 本地发布需要提供 npm OTP（双因素认证码）
- 发布命令会自动执行：typecheck → lint → build → git commit → git tag → npm publish
- 发布过程中会提示确认每个步骤

### 方式三：手动发布到 npm

**如果需要补发或重新发布：**

```bash
# 1. 构建项目
npm run build:prod

# 2. 发布到 npm（需要 OTP）
npm publish --otp=<你的6位验证码> --access public

# 3. 发布 beta 版本（不会覆盖 latest 标签）
npm publish --tag beta --otp=<验证码> --access public
```

### 版本撤回

**24 小时内且无人依赖：**

```bash
# 完全删除指定版本
npm unpublish goofish-client@1.2.0 --otp=<验证码>
```

**24 小时后或已被依赖：**

```bash
# 标记为弃用（推荐）
npm deprecate goofish-client@1.2.0 "此版本存在问题，请升级到 v1.2.1" --otp=<验证码>
```

## 📁 项目结构

```
goofish-client/
├── .github/
│   └── workflows/          # GitHub Actions 配置
│       ├── deploy.yml      # 文档部署
│       └── release.yml     # 发布工作流
├── src/                    # 源代码目录
│   ├── client/             # 客户端主类
│   ├── constants/          # 常量定义（API地址、错误码等）
│   ├── core/               # 核心功能（HTTP、认证、拦截器）
│   ├── managers/           # 管理器（Token管理等）
│   ├── services/           # 服务层
│   │   ├── common/         # 基础服务类
│   │   ├── mtop/           # 闲鱼 MTOP API 服务
│   │   └── passport/       # 登录认证服务
│   ├── types/              # TypeScript 类型定义
│   └── utils/              # 工具函数
├── dist/                   # 构建输出目录
├── docs/                   # 文档源文件
│   ├── api/                # API 参考文档
│   ├── examples/           # 使用示例
│   ├── guide/              # 指南文档
│   └── reference/          # 参考文档
├── examples/               # 示例代码
└── tests/                  # 测试文件（待完善）
```

## 📄 关键文件说明

### 配置文件

| 文件               | 说明                                |
| ------------------ | ----------------------------------- |
| `package.json`     | 项目配置、依赖管理、脚本命令        |
| `tsconfig.json`    | TypeScript 编译配置                 |
| `tsup.config.ts`   | 构建工具配置（生成 ESM 和 CJS）     |
| `eslint.config.js` | ESLint 代码检查规则                 |
| `.release-it.json` | 发布工具配置（版本管理、changelog） |

### 文档配置

| 文件                         | 说明                   |
| ---------------------------- | ---------------------- |
| `docs/.vitepress/config.mts` | VitePress 文档站点配置 |
| `docs/index.md`              | 文档首页               |

### 工作流配置

| 文件                            | 说明                              |
| ------------------------------- | --------------------------------- |
| `.github/workflows/release.yml` | 自动发布到 npm 和 GitHub Releases |
| `.github/workflows/deploy.yml`  | 自动部署文档到 GitHub Pages       |

### 核心源文件

| 文件                           | 说明                         |
| ------------------------------ | ---------------------------- |
| `src/index.ts`                 | 主入口文件，导出所有公共 API |
| `src/client/goofish.client.ts` | Goofish 客户端主类           |
| `src/core/http.ts`             | HTTP 请求封装                |
| `src/core/auth.ts`             | 认证管理                     |
| `src/services/mtop/*`          | 闲鱼业务 API 服务            |
| `src/types/*`                  | TypeScript 类型定义          |

## 💡 开发建议

### 提交代码前

```bash
# 1. 类型检查
npm run typecheck

# 2. 代码检查
npm run lint:fix

# 3. 构建测试
npm run build:prod
```

### 提交规范

遵循 [Conventional Commits](https://conventionalcommits.org/) 规范：

```bash
feat: 新功能
fix: Bug修复
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
perf: 性能优化
test: 测试相关
chore: 构建工具、依赖更新
```

示例：

```bash
git commit -m "feat: 添加订单详情API"
git commit -m "fix: 修复搜索参数编码问题"
git commit -m "docs: 更新API文档"
```

### 分支管理

```bash
# 创建功能分支
git checkout -b feature/your-feature-name

# 创建修复分支
git checkout -b fix/your-bug-fix

# 开发完成后，提交 PR 到 main 分支
```

### 代码风格

- ✅ 使用 TypeScript 严格模式
- ✅ 避免使用 `any` 类型
- ✅ 为公共 API 提供完整的类型定义和注释
- ✅ 避免硬编码，使用配置和常量
- ✅ 保持代码简洁易读

### 添加新 API

1. 在 `src/types/mtop/` 添加类型定义
2. 在 `src/services/mtop/` 添加服务实现
3. 在 `src/client/goofish.client.ts` 中暴露 API
4. 在 `examples/` 添加使用示例
5. 在 `docs/api/` 和 `docs/examples/` 更新文档

## 🔧 常见问题

### 构建失败

```bash
# 清理缓存重新构建
rm -rf dist node_modules package-lock.json
npm install
npm run build:prod
```

### 类型检查报错

```bash
# 删除缓存文件
rm -rf tsconfig.tsbuildinfo
npm run typecheck
```

### 发布时需要 OTP

**使用 GitHub Actions 发布可以避免 OTP 问题**

或者手动提供验证码：

```bash
npm publish --otp=<你的6位验证码> --access public
```

## 📚 相关资源

- [贡献指南](./CONTRIBUTING.md)
- [在线文档](https://11273.github.io/goofish-client/)
- [README](./README.md)
- [变更日志](./CHANGELOG.md)

---

有任何问题，欢迎在 [GitHub Issues](https://github.com/11273/goofish-client/issues) 提出。
