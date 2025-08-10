import { BasePassportService } from '../common/base.passport.service';
import { PASSPORT_ENDPOINTS } from '../../constants';
import * as QRCode from 'qrcode';
import type {
  GoofishPassportResponse,
  QRCodeGenerateParams,
  QrGenerateResponse,
  QRRenderOptions,
  QRStringRenderOptions,
  QRDataURLRenderOptions,
} from '../../types';

/**
 * 二维码服务实现
 */
export class QrService extends BasePassportService {
  // 默认二维码配置
  private defaultOptions: QRRenderOptions = {
    outputFormat: 'string',
    stringOptions: {
      type: 'terminal',
    },
  };

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
      },
    });
  }

  /**
   * 渲染二维码为各种格式
   * @param params 二维码生成参数
   * @param options 渲染选项
   * @returns 根据 outputFormat 返回对应格式的二维码
   */
  public async render({
    params,
    options,
  }: {
    params?: QRCodeGenerateParams;
    options?: QRRenderOptions;
  } = {}): Promise<string> {
    const response = await this.generate(params);
    const qrContent = response.content.data.codeContent;

    // 确定输出格式
    const outputFormat =
      options?.outputFormat || this.defaultOptions.outputFormat;

    switch (outputFormat) {
      case 'string': {
        const stringOpts = {
          ...this.defaultOptions.stringOptions,
          ...options?.stringOptions,
        } as QRStringRenderOptions;
        return QRCode.toString(qrContent, stringOpts);
      }

      case 'dataURL':
      default: {
        const dataURLOpts = {
          ...this.defaultOptions.dataURLOptions,
          ...options?.dataURLOptions,
        } as QRDataURLRenderOptions;
        return QRCode.toDataURL(qrContent, dataURLOpts);
      }
    }
  }
}
