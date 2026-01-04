import { IM_ENDPOINTS } from '../../constants';
import type {
  ConversationListNewestPaginationRequest,
  ConversationListNewestPaginationResponse,
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
}
