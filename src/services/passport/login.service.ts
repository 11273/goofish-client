import { BasePassportService } from '../common/base.passport.service';
import type {
  GoofishPassportResponse,
  LoginParams,
  LoginResponse,
  LoginData,
} from '../../types';
import { encryptPassword } from '../../utils/password';
import { PASSPORT_ENDPOINTS } from '../../constants';

/**
 * 登录服务实现
 */
export class LoginService extends BasePassportService {
  /**
   * 账号密码登录
   * @param params 登录参数
   * @returns 登录结果
   */
  public async login(
    params: LoginParams
  ): Promise<GoofishPassportResponse<LoginResponse>> {
    // 构建请求数据，将参数转换为字符串格式以匹配API要求
    const loginData: Partial<LoginData> = {
      // 必填字段
      loginId: params.loginId,
      password2: encryptPassword(params.password2),

      // 可选字段，提供默认值
      keepLogin: (params.keepLogin ?? true).toString(),
      isIframe: (params.isIframe ?? false).toString(),
      documentReferer: params.documentReferer || '',
      defaultView: params.defaultView || 'password',
      appName: params.appName || 'xianyu',
      appEntrance: params.appEntrance || 'web',
      mainPage: (params.mainPage ?? false).toString(),
      isMobile: (params.isMobile ?? false).toString(),
      lang: params.lang || 'zh_CN',
      fromSite: params.fromSite || '77',
      umidTag: params.umidTag || 'SERVER',
      bx_et: params.bx_et || 'default_not_fun',

      // 直接传递的可选字段
      ua: params.ua,
      umidGetStatusVal: params.umidGetStatusVal?.toString(),
      screenPixel: params.screenPixel,
      navlanguage: params.navlanguage,
      navUserAgent: params.navUserAgent,
      navPlatform: params.navPlatform,
      _csrf_token: params._csrf_token,
      umidToken: params.umidToken,
      hsiz: params.hsiz,
      bizParams: params.bizParams,
      returnUrl: params.returnUrl,
      weiBoMpBridge: params.weiBoMpBridge,
      jsVersion: params.jsVersion,
      deviceId: params.deviceId,
      pageTraceId: params.pageTraceId,
      'bx-ua': params['bx-ua'],
      'bx-umidtoken': params['bx-umidtoken'],
    };

    return this.request<LoginResponse>({
      api: PASSPORT_ENDPOINTS.LOGIN.LOGIN,
      method: 'POST',
      params: loginData,
    });
  }
}
