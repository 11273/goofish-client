import type { SearchOptions } from '../../../types/mtop/search';

/**
 * 内部搜索请求参数
 */
export interface InternalSearchParams {
  // 分页
  pageNumber: number;
  // 关键词
  keyword: string;
  // 是否从筛选条件
  fromFilter: boolean;
  // 每页数量
  rowsPerPage: number;
  // 搜索来源
  searchReqFromPage: 'pcSearch';
  // 搜索筛选
  propValueStr: { searchFilter: string };
  // 地区筛选
  extraFilterValue: string;
  // 用户位置
  userPositionJson: string;
  // 排序
  sortValue: string;
  // 排序字段
  sortField: string;
  // 自定义距离
  customDistance: string;
  // GPS
  gps: string;
  // 自定义GPS
  customGps: string;
}

/**
 * 搜索参数构建器
 */
export class SearchParamsBuilder {
  // 默认配置
  private static readonly DEFAULT_CONFIG = {
    pageNumber: 1,
    rowsPerPage: 30,
    searchReqFromPage: 'pcSearch' as const,
    emptyString: '',
    emptyObject: '{}',
  };

  /**
   * 构建内部请求参数
   */
  public static build(params: SearchOptions): InternalSearchParams {
    return {
      // 基础参数
      ...this.buildBaseParams(params),
      // 排序参数
      ...this.buildSortParams(params),
      // GPS参数
      ...this.buildGPSParams(params),
      // 筛选参数
      propValueStr: { searchFilter: this.buildSearchFilter(params.filter) },
      // 地区筛选
      extraFilterValue: this.buildExtraFilterValue(params.locationFilter),
      // 用户位置
      userPositionJson: this.buildUserPositionJson(params.userPosition),
    };
  }

  /**
   * 构建基础参数
   */
  private static buildBaseParams(
    params: SearchOptions
  ): Pick<
    InternalSearchParams,
    | 'pageNumber'
    | 'keyword'
    | 'fromFilter'
    | 'rowsPerPage'
    | 'searchReqFromPage'
    | 'customDistance'
  > {
    return {
      pageNumber: params.pageNumber || this.DEFAULT_CONFIG.pageNumber,
      keyword: params.keyword,
      fromFilter: this.hasFilter(params),
      rowsPerPage: params.rowsPerPage || this.DEFAULT_CONFIG.rowsPerPage,
      searchReqFromPage: this.DEFAULT_CONFIG.searchReqFromPage,
      customDistance: params.customDistance || this.DEFAULT_CONFIG.emptyString,
    };
  }

  /**
   * 构建排序参数
   */
  private static buildSortParams(
    params: SearchOptions
  ): Pick<InternalSearchParams, 'sortValue' | 'sortField'> {
    return {
      sortValue: params.sortValue || this.DEFAULT_CONFIG.emptyString,
      sortField: params.sortField || this.DEFAULT_CONFIG.emptyString,
    };
  }

  /**
   * 构建GPS参数
   */
  private static buildGPSParams(
    params: SearchOptions
  ): Pick<InternalSearchParams, 'gps' | 'customGps'> {
    if (params.gps) {
      const gpsString = `${params.gps.latitude},${params.gps.longitude}`;
      return {
        gps: gpsString,
        customGps: gpsString,
      };
    }

    return {
      gps: this.DEFAULT_CONFIG.emptyString,
      customGps: this.DEFAULT_CONFIG.emptyString,
    };
  }

  /**
   * 构建搜索筛选参数
   */
  private static buildSearchFilter(filter?: SearchOptions['filter']): string {
    if (!filter) {
      return this.DEFAULT_CONFIG.emptyString;
    }

    const parts: string[] = [];

    if (filter.priceRange) {
      const { from, to = '' } = filter.priceRange;
      parts.push(`priceRange:${from},${to}`);
    }

    if (filter.publishDays) {
      parts.push(`publishDays:${filter.publishDays}`);
    }

    if (filter.quickFilters?.length) {
      parts.push(`quickFilter:${filter.quickFilters.join(',')}`);
    }

    return parts.map((part) => `${part};`).join('');
  }

  /**
   * 构建地区筛选参数
   */
  private static buildExtraFilterValue(
    locationFilter?: SearchOptions['locationFilter']
  ): string {
    if (!locationFilter) {
      return this.DEFAULT_CONFIG.emptyObject;
    }

    return JSON.stringify({
      divisionList: locationFilter.divisionList || [],
      excludeMultiPlacesSellers: locationFilter.excludeMultiPlacesSellers
        ? '1'
        : '0',
      extraDivision: locationFilter.extraDivision || '',
    });
  }

  /**
   * 构建用户位置参数
   */
  private static buildUserPositionJson(
    userPosition?: SearchOptions['userPosition']
  ): string {
    if (!userPosition) {
      return this.DEFAULT_CONFIG.emptyObject;
    }

    return JSON.stringify(userPosition);
  }

  /**
   * 是否存在筛选条件
   */
  private static hasFilter(params: SearchOptions): boolean {
    return !!(
      params.sortValue ||
      params.sortField ||
      params.filter ||
      params.locationFilter
    );
  }
}
