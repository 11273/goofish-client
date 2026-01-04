import { BaseMtopService } from '../common/base.mtop.service';
import { MTOP_API_VERSIONS, MTOP_ENDPOINTS } from '../../constants';
import type {
  UserNavResponse,
  UserHeadResponse,
  UserPageHeadRequest,
  UserQueryRequest,
  UserQueryResponse,
} from '../../types/mtop/user';
import type { GoofishMtopResponse } from '../../types';

/**
 * 用户服务实现
 */
export class UserService extends BaseMtopService {
  /**
   * 获取用户导航信息
   * @returns 用户导航信息，包含用户名、头像、关注、粉丝等基本信息
   */
  public async getUserNav(): Promise<GoofishMtopResponse<UserNavResponse>> {
    return this.request<UserNavResponse>({
      api: MTOP_ENDPOINTS.USER.NAV,
    });
  }

  /**
   * 获取用户头部信息
   * @param params 请求参数，可指定查看自己或他人信息
   * @returns 用户头部信息，包含用户ID、用户信息、宝贝发布、信用信息等更详细的数据
   */
  public async getUserHead(
    params: UserPageHeadRequest = { self: true }
  ): Promise<GoofishMtopResponse<UserHeadResponse>> {
    return this.request<UserHeadResponse, UserPageHeadRequest>({
      api: MTOP_ENDPOINTS.USER.HEAD,
      data: params,
    });
  }
  /**
   * 查询用户信息
   * @param params 请求参数，包含会话类型、会话ID等信息
   * @returns 用户信息
   */
  public async queryUser(
    params: UserQueryRequest
  ): Promise<GoofishMtopResponse<UserQueryResponse>> {
    const api = MTOP_ENDPOINTS.USER.QUERY;
    return this.request<UserQueryResponse, UserQueryRequest>({
      api,
      version: MTOP_API_VERSIONS[api],
      data: {
        type: params.type || 0,
        sessionType: params.sessionType || 1,
        sessionId: params.sessionId,
        isOwner: params.isOwner || false,
      },
    });
  }
}
