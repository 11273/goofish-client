const { Goofish, LogLevel } = require('goofish-client');

/**
 * IM 模块使用示例
 * 演示如何使用 IM 相关功能
 */
async function imSimpleExample() {
  try {
    const client = new Goofish({
      // cookie: 'xxx', // 请替换为实际的 cookie
      level: LogLevel.WARN,
    });

    console.log('🚀 IM 示例开始\n');

    const loginTokenResponse = await client.api.mtop.im.getLoginToken();
    console.log('✅ IM 登录 Token 获取成功:', loginTokenResponse);

    await client.wsClientIm.connect();

    console.log('📝 正在注册 IM 服务...');
    const registerResponse = await client.api.im.auth.register({
      token: loginTokenResponse.data.accessToken,
    });
    console.log('✅ IM 服务注册成功:', registerResponse);

    console.log('\n📋 正在获取会话列表...');
    const conversations1 = await client.api.im.conversation.listNewestPagination({
      startTimeStamp: Number.MAX_SAFE_INTEGER,
      limitNum: 1,
    });

    console.log('✅ 获取会话列表第一页成功:', conversations1.body.userConvs);

    // 获取第一个会话信息
    const firstConv = conversations1.body.userConvs[0];
    const conversationId = firstConv.singleChatUserConversation?.singleChatConversation.cid;

    const userQuery = await client.api.mtop.user.queryUser({
      sessionId: conversationId.replace('@goofish', ''),
    });

    console.log('✅ 获取用户信息成功:', userQuery.data);

    /*
    // 发送测试消息到第一个会话
    console.log('\n📤 正在发送测试消息...');
    const conversationType = firstConv.type;
    const pairFirst = firstConv.singleChatUserConversation?.singleChatConversation.pairFirst;
    const pairSecond = firstConv.singleChatUserConversation?.singleChatConversation.pairSecond;
    try {
      const sendResult = await client.api.im.message.sendTextMessage({
        text: '你好',
        conversationId,
        conversationType,
        receivers: [pairFirst, pairSecond],
      });
      console.log('✅ 消息发送成功:', sendResult);
    } catch (sendError) {
      console.error('❌ 消息发送失败:', sendError.message);
    }
      */

    /*
    const conversations2 = await client.api.im.conversation.listNewestPagination({
      startTimeStamp: conversations1.body.nextCursor,
      limitNum: 1,
    });
  
    console.log('✅ 获取会话列表第二页成功:', conversations2.body.userConvs.length);
  
    const userQuery2 = await client.api.mtop.user.queryUser({
      sessionId: conversations2.body.userConvs[0].singleChatUserConversation?.singleChatConversation.cid.replace('@goofish', ''),
    });
    console.log('✅ 获取用户信息成功:', userQuery2.body.userInfo);
    */

    console.log('\n👂 开始监听消息...');

    // 方式1：监听格式化后的消息（推荐）
    client.api.im.message.onFormattedMessage((message) => {
      console.log('📨 收到格式化消息:', {
        messageId: message.messageId,
        senderId: message.senderId,
        text: message.text,
        timestamp: message.timestamp,
        content: message.content,
      });
    });

    // 方式2：监听同步推送消息（包含原始数据和解码数据）
    // client.api.im.message.onSyncPush((message) => {
    //   console.log('📨 收到同步推送:', JSON.stringify(
    //     message,
    //     (_, value) =>
    //       typeof value === 'bigint' ? value.toString() : value,
    //     2
    //   ));
    // });

    // 方式3：监听所有原始 WebSocket 消息（包含心跳等）
    // client.wsClientIm.on('message', (message) => {
    //   console.log('📨 原始消息:', message);
    // });
  } catch (error) {
    console.error('\n❌ 发生错误:', error.message);
    console.error(error);
  }
}

imSimpleExample();


