import { IM_CONFIG, IM_ENDPOINTS } from '../../constants';
import type {
  ImAckDiffRequest,
  ImAckDiffResponse,
  ImRegisterRequest,
  ImRegisterResponse,
  ImSyncStatusRequest,
  ImSyncStatusResponse,
  WsResponse,
} from '../../types';
import { BaseImService } from '../common/base.im.service';

/**
 * 认证服务
 * 提供认证相关功能
 */
export class AuthService extends BaseImService {
  /**
   * 注册 IM 服务
   * @returns 注册响应
   */
  public async register(
    params?: ImRegisterRequest
  ): Promise<WsResponse<ImRegisterResponse>> {
    // 注册 IM 服务
    const registerResponse = await this.request<
      ImRegisterResponse,
      ImRegisterRequest
    >({
      lwp: IM_ENDPOINTS.AUTH.REGISTER,
      headers: {
        'cache-header': params?.['cache-header'] || IM_CONFIG.CACHE_HEADER,
        'app-key': params?.['app-key'] || IM_CONFIG.APP_KEY,
        token: params?.token,
        ua: params?.ua || IM_CONFIG.USER_AGENT,
        dt: params?.dt || IM_CONFIG.DATA_TYPE,
        wv: params?.wv || IM_CONFIG.WS_VERSION,
        sync: params?.sync || IM_CONFIG.SYNC,
        did: params?.did || this.config.im?.deviceId,
      },
    });

    // 同步消息状态以及确认同步差异（必须调用，否则收不到消息）
    const syncStatusResponse = await this.getSyncStatus();
    await this.ackDiff(syncStatusResponse.body as ImAckDiffRequest);

    // 返回注册响应
    return registerResponse;
  }

  /**
   * 获取同步状态
   * 用于同步消息，必须调用此接口才能收到消息通知
   * @param params 请求参数（可选，默认 topic 为 "sync"）
   * @returns 同步状态响应
   */
  public async getSyncStatus(
    params?: Partial<ImSyncStatusRequest>
  ): Promise<WsResponse<ImSyncStatusResponse>> {
    const body: ImSyncStatusRequest = {
      topic: params?.topic || 'sync',
    };

    return this.request<ImSyncStatusResponse, ImSyncStatusRequest[]>({
      lwp: IM_ENDPOINTS.AUTH.SYNC_STATUS,
      body: [body],
    });
  }

  /**
   * 确认同步差异
   * 在获取同步状态后调用，用于确认同步差异
   * @param params 请求参数（通常使用 getSyncStatus 的响应数据）
   * @returns 确认响应
   */
  public async ackDiff(
    params: ImAckDiffRequest
  ): Promise<WsResponse<ImAckDiffResponse>> {
    return this.request<ImAckDiffResponse, ImAckDiffRequest[]>({
      lwp: IM_ENDPOINTS.AUTH.ACK_DIFF,
      body: [params],
    });
  }
}
