const { Goofish, LogLevel } = require('goofish-client');

/**
 * IM「主动发起会话」示例
 *
 * 场景：买家在商品详情页点击「聊一聊」，PC Web 会向 IM WebSocket
 *     下发 `/r/SingleChatConversation/create`，创建（或复用）一条
 *     与卖家之间的单聊会话。
 *
 * SDK 提供两个方法：
 *   1. `client.api.im.conversation.createItemConversation()`：推荐，
 *      传入 `selfUserId / peerUserId / itemId` 即可。
 *   2. `client.api.im.conversation.createSingleConversation()`：底层方法，
 *      需要自行构造 `pairFirst / pairSecond`。
 */
async function createConversationExample() {
  const client = new Goofish({
    // cookie: 'xxx', // 请替换为真实 cookie
    level: LogLevel.INFO,
  });

  // 1. 获取当前用户 userId（用于构造 pair）
  const nav = await client.api.mtop.user.getUserHead({ self: true });
  const selfUserId = nav.data.baseInfo.kcUserId;
  console.log('🙋 当前登录 userId:', selfUserId);

  // 2. 获取 IM Token 并建立 WebSocket 连接
  const loginToken = await client.api.mtop.im.getLoginToken();
  await client.wsClientIm.connect();

  // 3. 注册 IM 服务（必须，否则后续请求会被拒绝）
  await client.api.im.auth.register({
    token: loginToken.data.accessToken,
  });
  console.log('✅ IM 注册成功');

  // 4. 基于商品创建会话（推荐方式）
  //    这两个值通常来自商品详情页或者搜索结果：
  //    - peerUserId：商品卖家的 userId
  //    - itemId：商品 ID
  const peerUserId = '221xxxxxxx03'; // TODO: 替换为真实卖家 ID
  const itemId = '1008xxxxx7995'; // TODO: 替换为真实商品 ID

  const createResp = await client.api.im.conversation.createItemConversation({
    selfUserId,
    peerUserId,
    itemId,
  });
  console.log('✅ 会话创建成功:', createResp.body);

  const singleChat = createResp.body.singleChatConversation;
  const conversationId = singleChat.cid; // e.g. "xxxx_yyyy@goofish"
  const pairFirst = singleChat.pairFirst;
  const pairSecond = singleChat.pairSecond;

  // 5. 立刻发送第一条消息（可选）
  const sendResult = await client.api.im.message.sendTextMessage({
    text: '你好，请问还在吗？',
    conversationId,
    conversationType: 1,
    receivers: [pairFirst, pairSecond],
  });
  console.log('✅ 首条消息发送成功:', sendResult);
}

createConversationExample().catch((err) => {
  console.error('❌ 发生错误:', err);
});
