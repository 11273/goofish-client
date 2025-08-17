import { MTOP_ENDPOINTS } from '../../constants';
import type { GoofishMtopResponse } from '../../types';
import type { HomeFeedRequest, HomeFeedResponse } from '../../types/mtop/home';
import { BaseMtopService } from '../common/base.mtop.service';

/**
 * 首页服务
 */
export class HomeService extends BaseMtopService {
  /**
   * 获取首页Feed数据
   * @param params 请求参数
   * @returns 首页猜你喜欢数据
   */
  public async getFeed(
    params: HomeFeedRequest = {}
  ): Promise<GoofishMtopResponse<HomeFeedResponse>> {
    const data: HomeFeedRequest = {
      itemId: params.itemId ?? '',
      pageSize: params.pageSize ?? 30,
      pageNumber: params.pageNumber ?? 1,
      machId: params.machId ?? '',
    };
    return this.request<HomeFeedResponse, HomeFeedRequest>({
      api: MTOP_ENDPOINTS.HOME.FEED,
      data,
    });
  }
}
