import { BaseService } from './base.service';
import { API_ENDPOINTS } from '../constants';
import type { SearchOptions, SearchResponse } from '../types/api/search';
import { SearchParamsBuilder } from './builders/search-params.builder';
import type { GooFishResponse } from '../types';

/**
 * 搜索服务实现
 */
export class SearchService extends BaseService {
  /**
   * 搜索商品
   * @param params 搜索参数
   * @returns 搜索结果
   */
  public async search(
    params: SearchOptions
  ): Promise<GooFishResponse<SearchResponse>> {
    const internalParams = SearchParamsBuilder.build(params);

    return this.request<SearchResponse>({
      api: API_ENDPOINTS.SEARCH.SEARCH,
      data: internalParams,
    });
  }
}
