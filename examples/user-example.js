const { Goofish, LogLevel } = require('goofish-client');

async function getUserInfo() {
  try {
    // 创建 Client 实例
    const client = new Goofish({
      cookie: 'cookie2=xxxx',
      level: LogLevel.INFO,
    });

    console.log('📋 获取用户导航信息...');

    // 获取用户导航信息（包含基本信息）
    const userNav = await client.api.mtop.user.getUserNav();

    console.log('userNav :>> ', userNav);
    console.log('\n👤 获取用户头部信息...');

    // 获取用户头部信息（更详细的信息）
    const userHead = await client.api.mtop.user.getUserHead();

    console.log('userHead :>> ', userHead);
  } catch (error) {
    console.error('❌ 发生错误:', error.message);
  }
}

// 运行示例
getUserInfo();
