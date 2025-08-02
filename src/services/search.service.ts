import { BaseService } from './base.service';
import { API_ENDPOINTS } from '../constants';
import type { SearchParams, SearchResponse } from '../types/api/search';

/**
 * 搜索服务实现
 */
export class SearchService extends BaseService {
  /**
   * 搜索商品
   */
  public async search(params: SearchParams): Promise<SearchResponse> {
    const requestData: SearchParams = {
      pageNumber: params.pageNumber || 1,
      keyword: 'chuu上衣',
      fromFilter: false,
      rowsPerPage: 30,
      sortValue: 'desc',
      sortField: 'create',
      customDistance: '',
      gps: '',
      propValueStr: {},
      customGps: '',
      searchReqFromPage: 'pcSearch',
      extraFilterValue: '{}',
      userPositionJson: '{}',
    };

    return this.request<SearchParams, SearchResponse>({
      api: API_ENDPOINTS.SEARCH.SEARCH,
      data: requestData,
    });
  }
}
