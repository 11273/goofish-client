import { IM_CONFIG, IM_ENDPOINTS } from '../../constants';
import type {
  ConversationListNewestPaginationRequest,
  ConversationListNewestPaginationResponse,
  CreateItemConversationRequest,
  CreateSingleConversationRequest,
  CreateSingleConversationResponse,
  WsResponse,
} from '../../types';
import { BaseImService } from '../common/base.im.service';

/**
 * 会话服务
 * 提供会话管理相关功能
 */
export class ConversationService extends BaseImService {
  /**
   * 获取会话列表
   * @param params 请求参数
   * @returns 会话列表
   */
  public async listNewestPagination(
    params: ConversationListNewestPaginationRequest
  ): Promise<WsResponse<ConversationListNewestPaginationResponse>> {
    return this.request<ConversationListNewestPaginationResponse>({
      lwp: IM_ENDPOINTS.CONVERSATION.LIST_NEWEST_PAGINATION,
      body: [params.startTimeStamp, params.limitNum],
    });
  }

  /**
   * 创建单聊会话（底层接口）
   *
   * 对应闲鱼 Web 端点击「聊一聊」后发出的 WebSocket 请求
   * `/r/SingleChatConversation/create`。
   *
   * 调用前需要先完成 `register()`（见 AuthService），
   * 否则服务端会拒绝请求。
   *
   * 注意：`pairFirst` / `pairSecond` 必须是 `<userId>@<domain>` 格式，
   * 且两个 userId 按数字升序排列。若不确定，可使用更友好的
   * {@link createItemConversation}。
   *
   * @param params 请求体
   * @returns 新建的单聊会话
   */
  public async createSingleConversation(
    params: CreateSingleConversationRequest
  ): Promise<WsResponse<CreateSingleConversationResponse>> {
    const body = {
      pairFirst: params.pairFirst,
      pairSecond: params.pairSecond,
      bizType: params.bizType ?? IM_CONFIG.DEFAULT_BIZ_TYPE,
      extension: {
        itemId: '',
        orderId: '',
        source: '',
        ...params.extension,
      },
      ctx: {
        appVersion: params.ctx?.appVersion ?? IM_CONFIG.DEFAULT_APP_VERSION,
        platform: params.ctx?.platform ?? IM_CONFIG.DEFAULT_PLATFORM,
      },
    };

    return this.request<CreateSingleConversationResponse>({
      lwp: IM_ENDPOINTS.CONVERSATION.CREATE_SINGLE,
      body: [body],
    });
  }

  /**
   * 基于商品创建与卖家的单聊会话（推荐使用）
   *
   * 等价于闲鱼 Web 端「聊一聊」按钮背后的业务：
   * - 将 `selfUserId` 与 `peerUserId` 按数字升序排列
   * - 分别拼接 `@<domain>`（默认 `@goofish`）
   * - 使用 `bizType = "1"`（IM）、`extension` 携带 `itemId/orderId/source`
   * - 调用 {@link createSingleConversation}
   *
   * @param params 便捷参数
   * @returns 新建（或已存在）的单聊会话
   */
  public async createItemConversation(
    params: CreateItemConversationRequest
  ): Promise<WsResponse<CreateSingleConversationResponse>> {
    const [firstId, secondId] = [
      String(params.selfUserId),
      String(params.peerUserId),
    ].sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

    return this.createSingleConversation({
      pairFirst: `${firstId}@${IM_CONFIG.DOMAIN}`,
      pairSecond: `${secondId}@${IM_CONFIG.DOMAIN}`,
      bizType: params.bizType,
      extension: {
        itemId: params.itemId != null ? String(params.itemId) : '',
        orderId: params.orderId != null ? String(params.orderId) : '',
        source: params.source ?? '',
      },
      ctx: params.ctx,
    });
  }
}
