import { BaseService } from '@/services/base.service';
import { API_ENDPOINTS } from '@/constants';
import type { SearchParams, SearchResponse } from '@/types/api/search';

export class SearchService extends BaseService {
  /**
   * 搜索商品
   */
  async search(params: SearchParams): Promise<SearchResponse> {
    const requestData = {
      pageNumber: params.pageNumber || 1,
      keyword: params.keyword,
      fromFilter: params.fromFilter || true,
      rowsPerPage: params.rowsPerPage || 20,
      sortValue: params.sortValue || 'desc',
      sortField: params.sortField || 'create',
      customDistance: params.customDistance || '',
      gps: params.gps || '',
      propValueStr: params.propValueStr || { searchFilter: '' },
      customGps: params.customGps || '',
      searchReqFromPage: params.searchReqFromPage || 'pcSearch',
      extraFilterValue: params.extraFilterValue || '{}',
      userPositionJson: params.userPositionJson || '{}',
    };

    return this.request<SearchResponse>({
      api: API_ENDPOINTS.SEARCH.ITEMS,
      data: requestData,
    });
  }
}
