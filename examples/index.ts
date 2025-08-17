import { Goofish, QRCodeStatus, LogLevel } from 'goofish-client';
/**
 * Goofish 客户端快速开始示例
 * 完整演示从二维码登录到搜索商品的全流程
 */
async function quickStart() {
  try {
    // ========== 第一步：初始化客户端 ==========
    // 创建 Goofish 客户端实例，设置日志级别为 INFO
    const client = new Goofish({
      level: LogLevel.INFO,
    });
    console.log('🚀 Goofish 快速开始示例\n');

    // ========== 第二步：生成登录二维码 ==========
    console.log('📱 正在生成登录二维码...');

    // 调用二维码生成接口，获取二维码数据
    const qrResult = await client.api.passport.qr.generate();

    // 检查二维码是否生成成功
    if (!qrResult.content.success) {
      throw new Error('二维码生成失败');
    }

    // 获取二维码的关键参数，用于后续查询登录状态
    const { t, ck } = qrResult.content.data;

    // 显示二维码
    console.log('请将下列链接转换为二维码，并使用闲鱼APP扫描:');
    console.log(qrResult.content.data.codeContent);
    console.log('\n⏳ 等待扫码确认...\n');

    // ========== 第三步：轮询等待用户扫码 ==========
    let attempts = 0;
    const maxAttempts = 60; // 最多等待60次，每次3秒，共180秒

    while (attempts < maxAttempts) {
      // 等待3秒后再次查询
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // 查询二维码状态
      const queryResult = await client.api.passport.qr.query({ t, ck });
      const status = queryResult.content.data.qrCodeStatus;

      // 显示当前状态
      console.log(`状态检查 [${attempts + 1}/${maxAttempts}]: ${status}`);

      // 根据不同状态处理
      if (status === QRCodeStatus.CONFIRMED) {
        // 用户已确认登录，更新客户端的 Cookie
        const cookie = client.getCookiePassport();
        client.updateCookieMtop(cookie);
        console.log('✅ 登录成功！\n');
        break;
      } else if (
        // 处理失败状态：已取消、已过期、错误
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

    // 检查是否超时
    if (attempts >= maxAttempts) {
      throw new Error('登录超时，请重试');
    }

    // ========== 第四步：验证登录状态 ==========
    console.log('👤 正在验证登录状态...');

    // 获取用户信息以验证登录是否成功
    const userInfo = await client.api.mtop.user.getUserHead();

    // 检查接口返回和登录状态
    if (userInfo?.data?.baseInfo?.self) {
      console.log(
        `✅ 登录验证成功！欢迎: ${userInfo.data.module.base.displayName} (${userInfo.data.module.base.introduction})\n`
      );
    } else {
      throw new Error('登录验证失败');
    }

    // ========== 第五步：搜索商品示例 ==========
    console.log('🔍 正在搜索商品...');

    // 调用搜索接口，搜索关键词为 "iPhone"
    const searchResult = await client.api.mtop.search.search({
      keyword: 'iPhone', // 搜索关键词
      pageNumber: 1, // 页码（从1开始）
      rowsPerPage: 5, // 每页显示数量
    });

    // ========== 第六步：处理并显示搜索结果 ==========
    if (
      searchResult.ret[0] === 'SUCCESS::调用成功' &&
      searchResult.data?.resultList
    ) {
      const items = searchResult.data.resultList;
      console.log(`✅ 搜索成功！找到 ${items.length} 个商品:\n`);

      // 遍历并显示每个商品的信息
      items.forEach((item, index) => {
        // 提取商品信息
        const content = item.data.item.main.exContent;

        // 拼接价格文本（价格可能包含多个部分，如 "¥" + "99"）
        const priceText = content.price.map((p) => p.text).join('');

        // 显示商品信息：序号、标题、价格、地区
        console.log(`${index + 1}. ${content.title}`);
        console.log(`   💰 ${priceText} | 📍 ${content.area || '未知地区'}\n`);
      });
    } else {
      console.log('❌ 搜索失败:', searchResult.ret[0]);
    }

    console.log('🎉 示例运行完成！');

    // 返回客户端实例，便于后续操作
    return client;
  } catch (error) {
    // 统一错误处理
    console.error('\n❌ 发生错误:', error.message);
    throw error;
  }
}

quickStart();
