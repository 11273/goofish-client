import { BasePassportService } from '../common/base.passport.service';
import { PASSPORT_ENDPOINTS } from '../../constants';
import type {
  GoofishPassportResponse,
  QRCodeGenerateParams,
  QrGenerateResponse,
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
    return this.request<QrGenerateResponse>({
      api: PASSPORT_ENDPOINTS.QR.GENERATE,
      method: 'GET',
      params: {
        appEntrance: params?.appEntrance || 'web',
        _csrf_token: params?._csrf_token,
        umidToken: params?.umidToken,
        hsiz: params?.hsiz,
        bizParams: params?.bizParams,
        mainPage: params?.mainPage ?? false,
        isMobile: params?.isMobile ?? false,
        lang: params?.lang || 'zh_CN',
        returnUrl: params?.returnUrl || '',
        'bx-ua': params?.bxUa,
        'bx-umidtoken': params?.bxUmidtoken,
        bx_et: params?.bx_et || 'not_loaded',
        umidTag: params?.umidTag || 'SERVER',
        // 展开其他自定义参数
      },
    });
  }
}
