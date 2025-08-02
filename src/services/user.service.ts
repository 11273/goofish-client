import { BaseService } from './base.service';
import { API_ENDPOINTS } from '../constants';
import type { UserNavResponse, UserHeadResponse } from '../types/api/user';
import type { GooFishResponse } from '../types';

/**
 * 用户服务实现
 */
export class UserService extends BaseService {
  /**
   * 获取用户导航信息
   * @returns 用户导航信息，包含用户名、头像、关注、粉丝等基本信息
   */
  public async getUserNav(): Promise<GooFishResponse<UserNavResponse>> {
    return this.request<UserNavResponse>({
      api: API_ENDPOINTS.USER.NAV,
    });
  }

  /**
   * 获取用户头部信息
   * @returns 用户头部信息，包含用户ID、用户信息、宝贝发布、信用信息等更详细的数据
   */
  public async getUserHead(): Promise<GooFishResponse<UserHeadResponse>> {
    return this.request<UserHeadResponse>({
      api: API_ENDPOINTS.USER.HEAD,
    });
  }
}
