import { BaseMtopService } from '../common/base.mtop.service';
import { MTOP_ENDPOINTS } from '../../constants';
import {
  OrderStatus,
  type BoughtListRequest,
  type BoughtListResponse,
} from '../../types/mtop/order';
import type { GoofishMtopResponse } from '../../types';

/**
 * 订单服务实现
 */
export class OrderService extends BaseMtopService {
  /**
   * 获取买到的订单列表
   * @param params 请求参数，包含分页信息和订单状态
   * @returns 订单列表，包含订单详细信息、商品、卖家等数据
   */
  public async getBoughtList(
    params: BoughtListRequest = {
      pageNumber: 1,
      orderStatus: OrderStatus.ALL,
    }
  ): Promise<GoofishMtopResponse<BoughtListResponse>> {
    return this.request<BoughtListResponse, BoughtListRequest>({
      api: MTOP_ENDPOINTS.ORDER.BOUGHT_LIST,
      data: params,
    });
  }

  /**
   * 获取全部订单
   * @param pageNumber 页码，默认为1
   * @returns 全部订单列表
   */
  public async getAllOrders(
    pageNumber = 1
  ): Promise<GoofishMtopResponse<BoughtListResponse>> {
    return this.getBoughtList({
      pageNumber,
      orderStatus: OrderStatus.ALL,
    });
  }

  /**
   * 获取待付款订单
   * @param pageNumber 页码，默认为1
   * @returns 待付款订单列表
   */
  public async getUnpaidOrders(
    pageNumber = 1
  ): Promise<GoofishMtopResponse<BoughtListResponse>> {
    return this.getBoughtList({
      pageNumber,
      orderStatus: OrderStatus.NOT_PAY,
    });
  }

  /**
   * 获取待发货订单
   * @param pageNumber 页码，默认为1
   * @returns 待发货订单列表
   */
  public async getUnshippedOrders(
    pageNumber = 1
  ): Promise<GoofishMtopResponse<BoughtListResponse>> {
    return this.getBoughtList({
      pageNumber,
      orderStatus: OrderStatus.NOT_SHIP,
    });
  }

  /**
   * 获取待收货订单
   * @param pageNumber 页码，默认为1
   * @returns 待收货订单列表
   */
  public async getShippedOrders(
    pageNumber = 1
  ): Promise<GoofishMtopResponse<BoughtListResponse>> {
    return this.getBoughtList({
      pageNumber,
      orderStatus: OrderStatus.SHIPPED,
    });
  }

  /**
   * 获取待评价订单
   * @param pageNumber 页码，默认为1
   * @returns 待评价订单列表
   */
  public async getUnratedOrders(
    pageNumber = 1
  ): Promise<GoofishMtopResponse<BoughtListResponse>> {
    return this.getBoughtList({
      pageNumber,
      orderStatus: OrderStatus.NOT_RATE,
    });
  }

  /**
   * 获取退款中订单
   * @param pageNumber 页码，默认为1
   * @returns 退款中订单列表
   */
  public async getRefundOrders(
    pageNumber = 1
  ): Promise<GoofishMtopResponse<BoughtListResponse>> {
    return this.getBoughtList({
      pageNumber,
      orderStatus: OrderStatus.REFUND,
    });
  }
}
