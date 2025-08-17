<!-- 📦 依赖更新 PR 模板 | Dependencies Update PR Template -->

## 📦 依赖更新 | Dependencies Update

### 🔗 相关信息 | Related Information

- 自动更新 PR | Automated update PR
- 安全更新 | Security update
- 功能依赖 | Feature dependency
- 其他 | Other: ******\_******

### 📋 更新清单 | Update Summary

#### 更新类型 | Update Type

- [ ] 🔒 安全更新 | Security updates
- [ ] ✨ 功能更新 | Feature updates
- [ ] 🐛 Bug 修复更新 | Bug fix updates
- [ ] 📚 开发依赖更新 | Dev dependencies update
- [ ] 🔧 构建工具更新 | Build tools update
- [ ] 📊 定期维护更新 | Regular maintenance update

#### 依赖类别 | Dependency Categories

- [ ] 生产依赖 | Production dependencies
- [ ] 开发依赖 | Development dependencies
- [ ] Peer 依赖 | Peer dependencies
- [ ] 可选依赖 | Optional dependencies

### 📊 具体更新 | Specific Updates

#### 主要依赖更新 | Major Dependencies

```diff
- package-name: ^1.0.0
+ package-name: ^2.0.0
```

#### 次要依赖更新 | Minor Dependencies

```diff
- package-name: ^1.1.0
+ package-name: ^1.2.0
```

#### 补丁依赖更新 | Patch Dependencies

```diff
- package-name: ^1.1.1
+ package-name: ^1.1.2
```

### ⚠️ 破坏性变更分析 | Breaking Changes Analysis

#### 主要版本更新 | Major Version Updates

- **包名 | Package**:
- **从 | From**:
- **到 | To**:
- **破坏性变更 | Breaking Changes**:
- **迁移需求 | Migration Requirements**:

#### 影响评估 | Impact Assessment

- [ ] 无破坏性变更 | No breaking changes
- [ ] 已验证兼容性 | Compatibility verified
- [ ] 需要代码调整 | Code adjustments needed
- [ ] 需要 API 更新 | API updates required

### 🔒 安全更新 | Security Updates

#### 安全漏洞修复 | Security Vulnerability Fixes

- **CVE 编号 | CVE ID**:
- **严重程度 | Severity**:
- **影响描述 | Impact Description**:
- **修复版本 | Fixed in Version**:

#### 安全审计 | Security Audit

- [ ] 运行了 `npm audit` | Ran `npm audit`
- [ ] 解决了高危漏洞 | Resolved high-severity vulnerabilities
- [ ] 解决了中等漏洞 | Resolved medium-severity vulnerabilities
- [ ] 查看了所有警告 | Reviewed all warnings

### 🧪 兼容性测试 | Compatibility Testing

#### 测试环境 | Test Environments

- [ ] Node.js 14.x
- [ ] Node.js 16.x
- [ ] Node.js 18.x
- [ ] Node.js 20.x
- [ ] 其他 | Other: ******\_******

#### 功能测试 | Functionality Tests

- [ ] 所有现有测试通过 | All existing tests pass
- [ ] 核心功能验证 | Core functionality verified
- [ ] API 兼容性确认 | API compatibility confirmed
- [ ] 示例代码测试 | Example code tested

#### 性能测试 | Performance Testing

- [ ] 构建时间测试 | Build time testing
- [ ] 运行时性能测试 | Runtime performance testing
- [ ] 包大小影响评估 | Bundle size impact assessment

### 📈 性能影响 | Performance Impact

#### 包大小变化 | Bundle Size Changes

- **之前 | Before**: \_\_\_ KB
- **之后 | After**: \_\_\_ KB
- **变化 | Change**: +/- **_ KB (_** %)

#### 构建性能 | Build Performance

- **构建时间变化 | Build time change**:
- **内存使用变化 | Memory usage change**:

### 🔧 配置更新 | Configuration Updates

#### 构建配置 | Build Configuration

- [ ] tsconfig.json 更新 | tsconfig.json updated
- [ ] webpack 配置更新 | webpack config updated
- [ ] eslint 配置更新 | eslint config updated
- [ ] 其他配置文件 | Other config files

#### 脚本更新 | Scripts Update

- [ ] package.json scripts 更新 | package.json scripts updated
- [ ] CI/CD 配置更新 | CI/CD configuration updated
- [ ] 文档脚本更新 | Documentation scripts updated

### 📚 文档更新 | Documentation Updates

#### 需要更新的文档 | Documentation to Update

- [ ] README.md 依赖要求 | README.md dependency requirements
- [ ] 安装指南 | Installation guide
- [ ] 迁移指南 | Migration guide
- [ ] CHANGELOG.md | CHANGELOG.md
- [ ] API 文档 | API documentation

#### 示例代码 | Example Code

- [ ] 示例代码仍然有效 | Example code still works
- [ ] 新功能示例添加 | New feature examples added
- [ ] 弃用功能警告 | Deprecated feature warnings

### 🚨 风险评估 | Risk Assessment

#### 更新风险等级 | Update Risk Level

- [ ] 低风险 - 仅补丁更新 | Low risk - patch updates only
- [ ] 中等风险 - 次要版本更新 | Medium risk - minor version updates
- [ ] 高风险 - 主要版本更新 | High risk - major version updates
- [ ] 关键风险 - 核心依赖重大变更 | Critical risk - major core dependency changes

#### 回滚计划 | Rollback Plan

- [ ] 已测试回滚流程 | Rollback process tested
- [ ] 备份了当前版本 | Current version backed up
- [ ] 制定了应急方案 | Emergency plan prepared

### 📋 检查清单 | Checklist

#### 依赖管理 | Dependency Management

- [ ] 检查了所有依赖的更新日志 | Checked all dependency changelogs
- [ ] 验证了许可证兼容性 | Verified license compatibility
- [ ] 移除了未使用的依赖 | Removed unused dependencies
- [ ] 更新了依赖锁定文件 | Updated lockfiles

#### 质量保证 | Quality Assurance

- [ ] 代码质量检查通过 | Code quality checks pass
- [ ] 所有测试套件通过 | All test suites pass
- [ ] 构建流程成功 | Build process succeeds
- [ ] 包发布测试通过 | Package publishing test passes

#### 安全检查 | Security Checks

- [ ] 安全扫描通过 | Security scan passes
- [ ] 漏洞评估完成 | Vulnerability assessment completed
- [ ] 依赖审计清洁 | Dependency audit clean

### 🏷️ 发布信息 | Release Information

#### 版本影响 | Version Impact

- [ ] 补丁版本 | Patch version
- [ ] 次要版本 | Minor version
- [ ] 主要版本 | Major version

#### 发布时机 | Release Timing

- [ ] 立即发布 | Release immediately
- [ ] 等待更多更新 | Wait for more updates
- [ ] 计划发布 | Scheduled release

### 📝 变更摘要 | Change Summary

#### 主要变更 | Major Changes

#### 用户影响 | User Impact

#### 开发者影响 | Developer Impact

### 🔗 参考链接 | References

- 依赖更新日志 | Dependency changelogs:
- 安全公告 | Security advisories:
- 迁移指南 | Migration guides:
- 相关 Issues | Related issues:
