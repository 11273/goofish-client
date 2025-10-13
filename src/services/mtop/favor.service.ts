import { BaseMtopService } from '../common/base.mtop.service';
import { MTOP_ENDPOINTS } from '../../constants';
import {
  FavorType,
  type FavorItemListRequest,
  type FavorItemListResponse,
} from '../../types/mtop/favor';
import type { GoofishMtopResponse } from '../../types';

/**
 * 收藏服务实现
 */
export class FavorService extends BaseMtopService {
  /**
   * 获取收藏商品列表
   * @param params 请求参数，包含分页信息和收藏类型
   * @returns 收藏商品列表，包含商品基本信息、价格、卖家等数据
   */
  public async getFavorItemList(
    params: FavorItemListRequest = {
      pageNumber: 1,
      rowsPerPage: 20,
      type: FavorType.DEFAULT,
    }
  ): Promise<GoofishMtopResponse<FavorItemListResponse>> {
    return this.request<FavorItemListResponse, FavorItemListRequest>({
      api: MTOP_ENDPOINTS.FAVOR.ITEM_LIST,
      data: params,
    });
  }

  /**
   * 获取全部收藏商品
   * @param pageNumber 页码，默认为1
   * @param rowsPerPage 每页条数，默认为20
   * @returns 全部收藏商品列表
   */
  public async getAllFavorItems(
    pageNumber = 1,
    rowsPerPage = 20
  ): Promise<GoofishMtopResponse<FavorItemListResponse>> {
    return this.getFavorItemList({
      pageNumber,
      rowsPerPage,
      type: FavorType.DEFAULT,
    });
  }

  /**
   * 获取降价宝贝
   * @param pageNumber 页码，默认为1
   * @param rowsPerPage 每页条数，默认为20
   * @returns 降价宝贝列表
   */
  public async getReducedPriceItems(
    pageNumber = 1,
    rowsPerPage = 20
  ): Promise<GoofishMtopResponse<FavorItemListResponse>> {
    return this.getFavorItemList({
      pageNumber,
      rowsPerPage,
      type: FavorType.REDUCE,
    });
  }

  /**
   * 获取有效宝贝
   * @param pageNumber 页码，默认为1
   * @param rowsPerPage 每页条数，默认为20
   * @returns 有效宝贝列表
   */
  public async getValidItems(
    pageNumber = 1,
    rowsPerPage = 20
  ): Promise<GoofishMtopResponse<FavorItemListResponse>> {
    return this.getFavorItemList({
      pageNumber,
      rowsPerPage,
      type: FavorType.VALID,
    });
  }

  /**
   * 获取失效宝贝
   * @param pageNumber 页码，默认为1
   * @param rowsPerPage 每页条数，默认为20
   * @returns 失效宝贝列表
   */
  public async getInvalidItems(
    pageNumber = 1,
    rowsPerPage = 20
  ): Promise<GoofishMtopResponse<FavorItemListResponse>> {
    return this.getFavorItemList({
      pageNumber,
      rowsPerPage,
      type: FavorType.INVALID,
    });
  }
}
