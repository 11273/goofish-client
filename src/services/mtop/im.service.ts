import { IM_CONFIG, IM_MTOP_ENDPOINTS } from '../../constants';
import type {
  GoofishMtopResponse,
  ImLoginTokenRequest,
  ImLoginTokenResponse,
} from '../../types';
import { generateUUID } from '../../utils';
import { BaseMtopService } from '../common/base.mtop.service';

/**
 * IM 服务（Mtop 接口）
 * 用于获取 IM 登录 Token 等
 */
export class ImService extends BaseMtopService {
  /**
   * 获取 IM 登录 Token
   * @param params 请求参数（可选，如果不传则使用配置中的默认值）
   * @returns IM 登录 Token
   */
  public async getLoginToken(
    params?: Partial<ImLoginTokenRequest>
  ): Promise<GoofishMtopResponse<ImLoginTokenResponse>> {
    const data: ImLoginTokenRequest = {
      appKey: params?.appKey || this.config.im?.appKey || IM_CONFIG.APP_KEY,
      deviceId:
        params?.deviceId ||
        this.config.im?.deviceId ||
        `${generateUUID()}-${Date.now()}`,
    };

    return this.request<ImLoginTokenResponse, ImLoginTokenRequest>({
      api: IM_MTOP_ENDPOINTS.LOGIN_TOKEN,
      data,
    });
  }
}
