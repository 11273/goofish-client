import { MTOP_ENDPOINTS } from '../../constants';
import type { GoofishMtopResponse } from '../../types';
import type {
  ItemDetailRequest,
  ItemDetailResponse,
} from '../../types/mtop/item';
import { BaseMtopService } from '../common/base.mtop.service';

/**
 * 商品服务
 */
export class ItemService extends BaseMtopService {
  /**
   * 获取商品详情
   * @param params 请求参数
   * @returns 商品详情数据
   */
  public async getDetail(
    params: ItemDetailRequest
  ): Promise<GoofishMtopResponse<ItemDetailResponse>> {
    return this.request<ItemDetailResponse, ItemDetailRequest>({
      api: MTOP_ENDPOINTS.ITEM.DETAIL,
      data: params,
    });
  }
}
