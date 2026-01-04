import type {
  DecodedMessage,
  DecodedMessageContent,
  FormattedMessage,
  MessageBizTag,
  MessageExtJson,
} from '../types';

/**
 * 格式化解码后的消息，将数字字段转换为有意义的字段名
 * @param decoded 解码后的消息
 * @returns 格式化后的消息
 */
export function formatMessage(decoded: DecodedMessage): FormattedMessage {
  const messageBody = decoded['1'];
  if (!messageBody) {
    return { raw: decoded };
  }

  const messageData = messageBody['6'];
  const detail = messageBody['10'];

  // 解析 JSON 字符串字段
  let content: DecodedMessageContent | undefined;
  let extJson: MessageExtJson | undefined;
  let bizTag: MessageBizTag | undefined;

  try {
    if (messageData?.['3']?.['5']) {
      content = JSON.parse(messageData['3']['5']);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    // 忽略解析错误
  }

  try {
    if (detail?.extJson) {
      extJson = JSON.parse(detail.extJson);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    // 忽略解析错误
  }

  try {
    if (detail?.bizTag) {
      bizTag = JSON.parse(detail.bizTag);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    // 忽略解析错误
  }

  return {
    messageId: messageBody['3'],
    senderId: messageBody['1'],
    receiverId: messageBody['2'],
    text: messageData?.['3']?.['2'],
    timestamp: messageBody['5'],
    messageType: messageData?.['1'],
    sessionType: detail?.sessionType,
    content,
    extJson,
    bizTag,
    reminderUrl: detail?.reminderUrl,
    raw: decoded,
  };
}
