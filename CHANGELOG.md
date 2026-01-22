# 更新日志

所有重要的项目更改都将记录在此文件中。

此项目遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范。



## [1.3.2](https://github.com/11273/goofish-client/compare/v1.3.1...v1.3.2) (2026-01-22)

### ✨ Features | 新功能

* **goofish:** auto-generate cna if cookie is missing to fix search API error ([c7073e5](https://github.com/11273/goofish-client/commit/c7073e5e2388e84040080a50e7d4061aed8daa37))
* **item:** update item type definitions ([c7c7dd8](https://github.com/11273/goofish-client/commit/c7c7dd843961a91fbb3e1f9c278f59e2d0a30dd7))

### 📝 Documentation | 文档

* **item:** update documentation for item types ([7f59a3b](https://github.com/11273/goofish-client/commit/7f59a3b030b42481d87d7fb63b29673be6157bc9))

## [1.3.1](https://github.com/11273/goofish-client/compare/v1.3.0...v1.3.1) (2026-01-04)

## [1.3.0](https://github.com/11273/goofish-client/compare/v1.2.0...v1.3.0) (2026-01-04)

### ✨ Features | 新功能

* 添加即时通讯（IM）功能，包含消息发送、接收及会话管理，更新文档和示例代码 ([1389b68](https://github.com/11273/goofish-client/commit/1389b68e921d72588f981656be1f0752a4b2660e))

### 🎫 Chores | 其他更新

* add ESLint configuration for TypeScript and update tsconfig and tsup settings for Node.js environment ([7769875](https://github.com/11273/goofish-client/commit/7769875b5e6777b5306dcde25963d94d31ccdbc0))
* add VSCode settings for automatic formatting on save ([5f27795](https://github.com/11273/goofish-client/commit/5f27795544ca09660b25ff14cc540a728c047bf2))

## [1.2.0](https://github.com/11273/goofish-client/compare/v1.1.3...v1.2.0) (2025-10-13)

### ✨ Features | 新功能

* 添加收藏管理功能，更新文档和类型定义 ([fe09b88](https://github.com/11273/goofish-client/commit/fe09b8874cbca370f50e50e2f325e03bc5692c11))
* 添加订单相关功能及文档，包含订单状态和请求响应类型 ([fccba6b](https://github.com/11273/goofish-client/commit/fccba6b3d43086b1384e5a4f5aabd87039e4fc5f))

### 📝 Documentation | 文档

* 在 package.json 中添加 SECURITY.md 和 CONTRIBUTING.md 文件 ([c21b25f](https://github.com/11273/goofish-client/commit/c21b25fceab539d9565d16e84032ebaf413e564c))
* 更新pr模板，优化提交规范 ([bc62661](https://github.com/11273/goofish-client/commit/bc62661b7f1971946d8f4b24d40b7cda11772959))

### 🔧 Continuous Integration | CI 配置

* issue_template ([31b9bb9](https://github.com/11273/goofish-client/commit/31b9bb98f3d4397e3ec4891fb3a30804b7ddac0f))

## [1.1.3](https://github.com/11273/goofish-client/compare/v1.1.2...v1.1.3) (2025-08-17)

### ✨ Features | 新功能

* 更新用户头部信息接口文档，补充接口请求数据获取他人数据 ([a4f9c6d](https://github.com/11273/goofish-client/commit/a4f9c6dbaf9f3a6af3e4bf8aea8dbcad5c716749))
* 添加商品服务和商品信息接口 ([d7807a3](https://github.com/11273/goofish-client/commit/d7807a3398dd6719b470c59dd0dd850f234bf982))

### 📝 Documentation | 文档

* 修复文档中出现的问题 ([228f21a](https://github.com/11273/goofish-client/commit/228f21a67049ad8137b3d20770ba04ef3e33b3df))

## [1.1.2](https://github.com/11273/goofish-client/compare/v1.1.1...v1.1.2) (2025-08-17)

### ✨ Features | 新功能

* 首页猜你喜欢接口接入 ([a3a942b](https://github.com/11273/goofish-client/commit/a3a942b30e730cb999a46cd5554a64c46d6f29a6))

### 📝 Documentation | 文档

* 更新 README 和文档链接，添加 API 方法提示及贡献指南 ([c713218](https://github.com/11273/goofish-client/commit/c713218ececeee7437bdae92eccee94d2efbc611))
* 更新 VitePress 配置中的 logo 路径，移除 goofish-client 目录前缀 ([b8286be](https://github.com/11273/goofish-client/commit/b8286be9d4ab228ffb0e0ca73adb8dae99d95997))
* 更新 VitePress 配置中的图标路径，移除 goofish-client 目录前缀 ([7c0be7b](https://github.com/11273/goofish-client/commit/7c0be7b01857e54a10822fae375739843b54374d))
* 更新首页接口和示例文档，添加首页推荐功能 ([8c8d386](https://github.com/11273/goofish-client/commit/8c8d38636a41c56f53deae5e059d67d94f71bff1))

## [1.1.1](https://github.com/11273/goofish-client/compare/v1.1.0...v1.1.1) (2025-08-17)

### ✨ Features | 新功能

* 添加单个请求示例 ([84f2d75](https://github.com/11273/goofish-client/commit/84f2d7592bf1effb4f01458249a09997e9c00919))

### 📝 Documentation | 文档

* 更新 VitePress 配置中的图标路径，调整为 goofish-client 目录下的资源 ([#2](https://github.com/11273/goofish-client/issues/2)) ([122cfba](https://github.com/11273/goofish-client/commit/122cfbaac3ce8d8ef66b5caf958e7d7af8cc0d68))

### 🔧 Continuous Integration | CI 配置

* codeql config ([e15e45f](https://github.com/11273/goofish-client/commit/e15e45fc5bd58ba6538567929049ff0d6e32bb03))

### 🎫 Chores | 其他更新

* 更新 ESLint 配置 ([9229cf3](https://github.com/11273/goofish-client/commit/9229cf30e07b47216b4cccde7ce2d4966d2574e4))
* 禁用源映射以减少包大小，并在 .npmignore 中添加源映射文件的忽略规则 ([5e161c6](https://github.com/11273/goofish-client/commit/5e161c66b75c53878f33df8474bb34fc4e90f965))

## [1.1.0](https://github.com/11273/goofish-client/compare/v1.0.1...v1.1.0) (2025-08-17)

### 📝 Documentation | 文档

* README.md ([ab2395a](https://github.com/11273/goofish-client/commit/ab2395a1bee5a827e01b54612653082f74e0b3f0))
* 在 README.md 中添加贡献者信息、GitHub 统计和星标历史图表 ([17dc819](https://github.com/11273/goofish-client/commit/17dc819a6e41dac3007145157b70532b4ff4f222))
* 更新 README.md 中的视图徽章链接 ([e8da923](https://github.com/11273/goofish-client/commit/e8da9233cf46dfaac67607bd136064a0d1063a4a))
* 更新 README.md 和文档首页，优化徽章链接，添加指向相关页面的链接 ([c1bb02e](https://github.com/11273/goofish-client/commit/c1bb02e7be5e526b06b98f54d4b4ed3b0b2523e9))
* 更新 README.md 和文档首页，添加项目描述和徽章，优化布局 ([f5c9bc4](https://github.com/11273/goofish-client/commit/f5c9bc4bead8e4420aa58af8bdc8b891969d6056))
* 更新文档中的二维码生成相关描述，优化示例代码和配置选项，修正版权信息 ([0ef7f87](https://github.com/11273/goofish-client/commit/0ef7f8707c697ebca31d736f75e1e870c2872670))
* 更新默认配置文档中的路径格式 ([5f1f465](https://github.com/11273/goofish-client/commit/5f1f46540af602339eb292fd3a496cba6597b2de))
* 清理 README.md 中的多余空行，添加许可证部分并更新发布工作流中的 GitHub 令牌 ([535b859](https://github.com/11273/goofish-client/commit/535b859c50ac912b84b7c13f2e157e14ac00d2ac))

### 🎫 Chores | 其他更新

* package.json ([13ef9d7](https://github.com/11273/goofish-client/commit/13ef9d7c415c04f183bab34b42fcae0c024b9634))
* 修改 .release-it.json 配置，禁用自动发布到 npm，并添加发布前的提示信息 ([b2d7af8](https://github.com/11273/goofish-client/commit/b2d7af8d8d760f371c3591e49047a3b130f4070b))
* 更新 package.json，添加新依赖项并修改文档中的术语 ([f534f67](https://github.com/11273/goofish-client/commit/f534f671808fd99e848dac414b0c620e9de4c613))
* 更新 tsconfig.json 添加 DOM 支持，优化 deploy.yml 中的 npm ci 命令 ([cc754ed](https://github.com/11273/goofish-client/commit/cc754edfde7d88d5846708f057caed2e3938bfb4))
* 更新发布工作流中的 GitHub 令牌，使用 PAT_TOKEN 替代原有的 GITHUB_TOKEN ([5f099d8](https://github.com/11273/goofish-client/commit/5f099d83836c1077c2d9eb61e60345dfac786519))
* 更新许可证为GNU通用公共许可证第3版，并在README和文档中添加徽章以显示项目状态和信息 ([518d6db](https://github.com/11273/goofish-client/commit/518d6db0d4e66da578d6b7b653244d281cab4d22))
* 移除 deploy.yml 中的 NODE_ENV 环境变量 ([59b78c8](https://github.com/11273/goofish-client/commit/59b78c87b8d9ecbcfce915db29c80ef4606a62e8))
* 移除二维码渲染方法 render()，统一使用 generate() 方法生成二维码，并更新相关文档 ([a11efbe](https://github.com/11273/goofish-client/commit/a11efbe1fd9add9679f72cded6f61049192d509e))

## 1.0.1 (2025-08-16)

### ✨ Features | 新功能

* init goofish-sdk ([8ee8040](https://github.com/11273/goofish-client/commit/8ee8040f01c53ff6ba65f1caaac18ea64e6113e5))
* vitepress 文档适配 ([4517276](https://github.com/11273/goofish-client/commit/451727611f4161f124c2f4ab97bfc84dd9d2eceb))
* 二维码接口适配 ([bfac6e2](https://github.com/11273/goofish-client/commit/bfac6e2d88eb5aaff3b8246cda4d5522b2ffd597))
* 二维码生成接口，分离协议（100%） ([d3aa543](https://github.com/11273/goofish-client/commit/d3aa543e0200234d7a0deda7b8ffb13115e32b7b))
* 分离协议（50%） ([0ad05f9](https://github.com/11273/goofish-client/commit/0ad05f9de12c7ecc148c3eb9f3d37da325a94e1c))
* 完善接口参数 ([01182ce](https://github.com/11273/goofish-client/commit/01182ceba1457ced4c30bf5692a669633e3267e7))
* 完善搜索功能等其他信息 ([ec87f0e](https://github.com/11273/goofish-client/commit/ec87f0e6afdf0c588784e6b239885d6172f60bf4))
* 搜索方法并优化部分异常 ([6ed32dd](https://github.com/11273/goofish-client/commit/6ed32dd781dbc872c4d4072da120fae458a7c62a))
* 生成二维码 ([0e7f025](https://github.com/11273/goofish-client/commit/0e7f0258055c0ddd4e006d03236287182dea9e34))
* 用户信息相关接口与优化 ([e07ad8d](https://github.com/11273/goofish-client/commit/e07ad8dc7be28ad6a2e2b33869cd241d8e874a67))

### 👷‍ Build System | 构建

* 构建流程规范 ([d752c03](https://github.com/11273/goofish-client/commit/d752c03b8c0939b9471ac2ebed662e5106b5a911))

### 💅 Polish | 优化

* 优化日志工具 ([263fc0a](https://github.com/11273/goofish-client/commit/263fc0a3a2cb8dfba5971dbc3d980e94bef2a8f2))
* 优化部分功能 ([cd584f8](https://github.com/11273/goofish-client/commit/cd584f8ea543c4532c0b1c42a3dd548ec6b7d1da))
* 基本信息调整 ([62df50b](https://github.com/11273/goofish-client/commit/62df50be7f4ae4d54ad4b15229dbb7e653e3d856))
* 登录流程优化 ([8942a07](https://github.com/11273/goofish-client/commit/8942a076e4b61ae26bfc17ec16f70ac57d211dfd))
