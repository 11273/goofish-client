import { IM_ENDPOINTS } from '../../constants';
import type {
  DecodedMessage,
  DecodedSyncItem,
  FormattedMessage,
  SendMessageByReceiverScopeRequest,
  SendMessageByReceiverScopeResponse,
  SyncPushBody,
  WsResponse,
} from '../../types';
import { decodeImData } from '../../utils/msgpack';
import { formatMessage } from '../../utils/format-message';
import { BaseImService } from '../common/base.im.service';

/**
 * 消息服务
 * 提供消息发送接收等功能
 */
export class MessageService extends BaseImService {
  /**
   * 发送消息（按接收者范围）
   * @param params 发送消息请求参数
   * @returns 发送结果
   */
  public async sendByReceiverScope(
    params: SendMessageByReceiverScopeRequest
  ): Promise<WsResponse<SendMessageByReceiverScopeResponse>> {
    return this.request<SendMessageByReceiverScopeResponse>({
      lwp: IM_ENDPOINTS.MESSAGE.SEND,
      body: [params.message, params.receivers],
    });
  }

  /**
   * 发送文本消息
   * @param params 发送文本消息请求参数
   * @returns 发送结果
   */
  public async sendTextMessage(params: {
    /** 消息文本 */
    text: string;
    /** 会话 ID */
    conversationId: string;
    /** 会话类型 */
    conversationType: number;
    /** 接收者列表 */
    receivers: string[];
  }): Promise<WsResponse<SendMessageByReceiverScopeResponse>> {
    const message = {
      message: {
        uuid: `-${Date.now()}${Math.floor(Math.random() * 10)}`,
        cid: params.conversationId,
        conversationType: params.conversationType,
        content: {
          contentType: 101,
          custom: {
            type: 1,
            data: Buffer.from(
              JSON.stringify({ contentType: 1, text: { text: params.text } }),
              'utf8'
            ).toString('base64'),
          },
        },
        redPointPolicy: 0,
        extension: {
          extJson: '{}',
        },
        ctx: {
          appVersion: '1.0',
          platform: 'web',
        },
        mtags: {},
        msgReadStatusSetting: 1,
      },
      receivers: {
        actualReceivers: params.receivers,
      },
    };
    console.log('🚀 message', JSON.stringify(message));
    return this.sendByReceiverScope(message);
  }

  /**
   * 监听同步推送消息（原始数据 + 解码数据）
   * @param handler 消息处理器
   */
  public onSyncPush(
    handler: (
      message: WsResponse<
        SyncPushBody & {
          decodedItems?: DecodedSyncItem[];
        }
      >
    ) => void
  ): void {
    this.onMessage<SyncPushBody>((message) => {
      if (message.lwp !== IM_ENDPOINTS.PUSH.SYNC) return;

      const decodedItems: DecodedSyncItem[] = [];

      const items = message.body?.syncPushPackage?.data;

      if (Array.isArray(items)) {
        for (const item of items) {
          try {
            if (item?.data) {
              const decoded = decodeImData(item.data);
              decodedItems.push({ raw: item, decoded });
            }
          } catch (err) {
            decodedItems.push({ raw: item, error: err });
          }
        }
      }

      handler({
        ...message,
        body: {
          ...message.body,
          decodedItems,
        },
      });
    });
  }

  /**
   * 监听格式化后的消息（推荐使用）
   * @param handler 消息处理器
   */
  public onFormattedMessage(
    handler: (message: FormattedMessage) => void
  ): void {
    this.onSyncPush((syncMessage) => {
      const items = syncMessage.body?.decodedItems;
      if (!items) return;

      for (const item of items) {
        if (item.decoded && !item.error) {
          try {
            const formatted = formatMessage(item.decoded as DecodedMessage);
            handler(formatted);
          } catch {
            // 忽略格式化错误
          }
        }
      }
    });
  }

  /**
   * 监听接收到的消息
   * @param handler 消息处理器
   */
  public onMessage<T>(handler: (message: WsResponse<T>) => void): void {
    super.onMessage(handler);
  }

  /**
   * 取消监听消息
   * @param handler 消息处理器
   */
  public offMessage<T>(handler: (message: WsResponse<T>) => void): void {
    super.offMessage(handler);
  }
}
