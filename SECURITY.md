# 安全政策 | Security Policy

## 🛡️ 支持的版本 | Supported Versions

我们致力于为当前主要版本提供安全支持。请始终使用最新版本以获得最佳安全性。

| 版本 | 支持状态 |
| --- | --- |
| 1.1.x | ✅ 支持 |
| 1.0.x | ⚠️ 有限支持 |
| < 1.0 | ❌ 不支持 |

## 🔒 安全声明 | Security Statement

**⚠️ 重要提醒：本项目为非官方第三方库，使用前请仔细阅读以下安全声明。**

### 数据安全

- 本库不会收集、存储或传输您的个人信息
- 所有认证凭证（如 Cookie）仅在本地使用
- 请妥善保管您的登录凭证，避免泄露

### 使用风险

- 本库为逆向工程产物，可能随时失效
- 使用本库可能违反目标平台的服务条款
- 不当使用可能导致账号被限制或封禁
- 请确保遵守当地法律法规

## 🐛 报告安全漏洞 | Reporting Security Vulnerabilities

如果您发现了安全漏洞，请**不要**在公开的 Issue 中报告。请通过以下方式联系我们：

### 首选方式

- **GitHub 私有漏洞报告**: [安全咨询](https://github.com/11273/goofish-client/security/advisories)
- **电子邮件**: 发送至项目维护者 (详见 package.json 中的 author 信息)

### 报告内容

请在报告中包含以下信息：

- 漏洞的详细描述
- 重现步骤
- 潜在的影响范围
- 建议的修复方案（如有）
- 您的联系方式

### 响应时间

- **确认收到**: 48 小时内
- **初步评估**: 7 天内
- **修复发布**: 根据严重程度，通常在 14-30 天内

## 🔐 安全最佳实践 | Security Best Practices

### 对于开发者

1. **凭证管理**

   ```typescript
   // ✅ 推荐：从环境变量读取
   const client = new Goofish({
     cookie: process.env.GOOFISH_COOKIE
   });
   
   // ❌ 避免：硬编码凭证
   const client = new Goofish({
     cookie: "cookie2=your_actual_cookie_here"
   });
   ```

2. **日志安全**

   ```typescript
   // ✅ 生产环境使用较低日志级别
   const client = new Goofish({
     level: LogLevel.WARN  // 避免泄露敏感信息
   });
   ```

3. **错误处理**

   ```typescript
   try {
     const result = await client.api.mtop.search.search(params);
   } catch (error) {
     // ✅ 记录错误但不暴露敏感信息
     console.error('Search failed:', error.message);
   }
   ```

### 对于用户

1. **定期更新**: 始终使用最新版本
2. **凭证保护**: 不要在代码中硬编码认证信息
3. **权限最小化**: 只获取必要的数据
4. **监控使用**: 定期检查账号活动
5. **备用方案**: 准备账号被限制时的应对策略

## 📋 安全检查清单 | Security Checklist

### 部署前检查

- [ ] 移除所有硬编码的凭证
- [ ] 设置适当的日志级别
- [ ] 验证网络请求的目标地址
- [ ] 检查依赖包的安全更新
- [ ] 确保错误处理不泄露敏感信息

### 运行时监控

- [ ] 监控异常的请求频率
- [ ] 检查认证失败的情况
- [ ] 观察账号状态变化
- [ ] 记录重要操作日志

## 🚨 已知安全考虑 | Known Security Considerations

### 网络安全

- 所有请求通过 HTTPS 发送
- 使用官方API端点
- 自动处理重定向和证书验证

### 认证安全

- Cookie 仅在请求头中传输
- 支持二维码登录以提高安全性
- 不存储明文密码

### 依赖安全

- 定期更新依赖包
- 使用 `npm audit` 检查已知漏洞
- 最小化依赖数量

## ⚖️ 免责声明 | Disclaimer

**本项目仅供学习和研究目的使用。**

- 本库为第三方开发的非官方客户端
- 与目标平台无任何官方关联
- 使用本库的风险由用户自行承担
- 项目维护者不对使用本库产生的任何后果负责
- 请确保您的使用符合相关平台服务条款及适用法律法规

## 📞 联系我们 | Contact

- **GitHub Issues**: [问题反馈](https://github.com/11273/goofish-client/issues)
- **GitHub Discussions**: [社区讨论](https://github.com/11273/goofish-client/discussions)
- **Security Reports**: [安全报告](https://github.com/11273/goofish-client/security)

---

**最后更新**: 2025年8月

感谢您帮助我们保持 Goofish Client 的安全！🙏
