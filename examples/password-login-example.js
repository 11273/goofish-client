const { Goofish, LogLevel } = require('goofish-client');

async function passwordLogin() {
  try {
    // 创建 Client 实例
    const client = new Goofish({
      // 过滑块验证码的cookie，cookie具有时效性，需要定期更新
      cookie: 'x5sec=',
      level: LogLevel.INFO,
    });

    console.log('🚀 开始账号密码登录...\n');

    // 准备登录参数
    const loginParams = {
      loginId: '13800138000', // 必填：登录ID（账户名或邮箱或手机号）
      password2: '123456', // 必填：密码
      keepLogin: true, // 可选：是否保持登录
    };

    const loginResult = await client.api.passport.login.login(loginParams);
    console.log('🔐 登录结果:', loginResult);
  } catch (error) {
    console.error('❌ 登录发生错误:', error.message);
    throw error;
  }
}
passwordLogin();
