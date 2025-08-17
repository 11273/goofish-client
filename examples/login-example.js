const { Goofish, QRCodeStatus, LogLevel } = require('goofish-client');

async function login() {
  try {
    // 创建 Client 实例
    const client = new Goofish({
      level: LogLevel.INFO,
    });

    console.log('🚀 开始登录流程...\n');

    // 第一步：生成二维码
    console.log('📱 正在生成登录二维码...');
    const qrResult = await client.api.passport.qr.generate();

    if (!qrResult.content.success) {
      throw new Error('二维码生成失败');
    }

    const { t, ck } = qrResult.content.data;

    console.log('✅ 二维码生成成功！');
    console.log('请将下列链接转换为二维码，并使用闲鱼APP扫描:');
    console.log(qrResult.content.data.codeContent);
    console.log('\n⏳ 等待扫码确认...\n');

    // 第二步：轮询等待用户扫码
    let attempts = 0;
    const maxAttempts = 30; // 最多等待30次，每次3秒

    while (attempts < maxAttempts) {
      // 等待3秒
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // 查询二维码状态
      const queryResult = await client.api.passport.qr.query({ t, ck });
      const status = queryResult.content.data.qrCodeStatus;

      console.log(`状态检查 [${attempts + 1}/${maxAttempts}]: ${status}`);

      if (status === QRCodeStatus.CONFIRMED) {
        // 登录成功
        const cookie = client.getCookiePassport();
        client.updateCookieMtop(cookie);
        console.log('✅ 登录成功！');
        break;
      } else if (
        [
          QRCodeStatus.CANCELED,
          QRCodeStatus.EXPIRED,
          QRCodeStatus.ERROR,
        ].includes(status)
      ) {
        throw new Error(`登录失败: ${status}`);
      }

      attempts++;
    }

    if (attempts >= maxAttempts) {
      throw new Error('登录超时，请重试');
    }

    // 第三步：验证登录状态
    console.log('\n👤 验证登录状态...');
    const userInfo = await client.api.mtop.user.getUserHead();

    if (userInfo?.data?.baseInfo?.self) {
      console.log(
        `✅ 登录验证成功！欢迎: ${userInfo.data.module.base.displayName}`
      );
      console.log('🎉 登录流程完成！');
      return client; // 返回已登录的客户端
    } else {
      throw new Error('登录验证失败');
    }
  } catch (error) {
    console.error('❌ 登录发生错误:', error.message);
    throw error;
  }
}

// 运行示例
login();
