import { BaseMtopService } from '../common/base.mtop.service';
import { MTOP_ENDPOINTS } from '../../constants';
import type { UserNavResponse, UserHeadResponse } from '../../types/mtop/user';
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
   * @returns 用户头部信息，包含用户ID、用户信息、宝贝发布、信用信息等更详细的数据
   */
  public async getUserHead(): Promise<GoofishMtopResponse<UserHeadResponse>> {
    return this.request<UserHeadResponse>({
      api: MTOP_ENDPOINTS.USER.HEAD,
      data: {
        self: true,
      },
    });
  }
}
