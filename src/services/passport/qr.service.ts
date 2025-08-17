import { BasePassportService } from '../common/base.passport.service';
import { PASSPORT_ENDPOINTS } from '../../constants';
import type {
  GoofishPassportResponse,
  QRCodeGenerateParams,
  QrGenerateResponse,
  QRCodeQueryParams,
  QRCodeQueryData,
  QrQueryResponse,
} from '../../types';

/**
 * 二维码服务实现
 */
export class QrService extends BasePassportService {
  /**
   * 生成二维码
   * @returns 二维码生成结果
   */
  public async generate(
    params?: QRCodeGenerateParams
  ): Promise<GoofishPassportResponse<QrGenerateResponse>> {
    const requestData: Partial<QRCodeGenerateParams> = {
      appEntrance: params?.appEntrance || 'web',
      _csrf_token: params?._csrf_token,
      umidToken: params?.umidToken,
      hsiz: params?.hsiz,
      bizParams: params?.bizParams,
      mainPage: params?.mainPage ?? false,
      isMobile: params?.isMobile ?? false,
      lang: params?.lang || 'zh_CN',
      returnUrl: params?.returnUrl,
      'bx-ua': params?.['bx-ua'],
      'bx-umidtoken': params?.['bx-umidtoken'],
      bx_et: params?.bx_et || 'not_loaded',
      umidTag: params?.umidTag || 'SERVER',
    };
    return this.request<QrGenerateResponse>({
      api: PASSPORT_ENDPOINTS.QR.GENERATE,
      method: 'GET',
      params: requestData,
    });
  }

  /**
   * 查询二维码状态
   * @param params 二维码查询参数
   * @returns 二维码状态查询结果
   */
  public async query(
    params: QRCodeQueryParams
  ): Promise<GoofishPassportResponse<QrQueryResponse>> {
    // 构建请求数据，将参数转换为字符串格式以匹配API要求
    const queryData: QRCodeQueryData = {
      t: params.t.toString(),
      ck: params.ck,
      appEntrance: params.appEntrance || 'web',
      mainPage: (params.mainPage ?? false).toString(),
      isMobile: (params.isMobile ?? false).toString(),
      lang: params.lang || 'zh_CN',
      returnUrl: params.returnUrl,
      umidTag: params.umidTag || 'SERVER',
      isIframe: (params.isIframe ?? true).toString(),
      defaultView: params.defaultView || 'password',
      deviceId: params.deviceId,
      bx_et: params.bx_et || 'not_loaded',
      ua: params.ua,
      _csrf_token: params._csrf_token,
      umidToken: params.umidToken,
      hsiz: params.hsiz,
      bizParams: params.bizParams,
      navlanguage: params.navlanguage,
      navUserAgent: params.navUserAgent,
      navPlatform: params.navPlatform,
      documentReferer: params.documentReferer,
      pageTraceId: params.pageTraceId,
      'bx-ua': params['bx-ua'],
      'bx-umidtoken': params['bx-umidtoken'],
    };

    return this.request<QrQueryResponse>({
      api: PASSPORT_ENDPOINTS.QR.QUERY,
      method: 'POST',
      data: queryData,
      config: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    });
  }
}
