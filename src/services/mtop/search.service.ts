import { BaseMtopService } from '../common/base.mtop.service';
import { API_ENDPOINTS } from '../../constants';
import type { SearchOptions, SearchResponse } from '../../types/mtop/search';
import { SearchParamsBuilder } from './builders/search-params.builder';
import type { GoofishResponse } from '../../types';

/**
 * 搜索服务实现
 */
export class SearchService extends BaseMtopService {
  /**
   * 搜索商品
   * @param params 搜索参数
   * @returns 搜索结果
   */
  public async search(
    params: SearchOptions
  ): Promise<GoofishResponse<SearchResponse>> {
    const internalParams = SearchParamsBuilder.build(params);

    return this.request<SearchResponse>({
      api: API_ENDPOINTS.SEARCH.SEARCH,
      data: internalParams,
    });
  }
}
