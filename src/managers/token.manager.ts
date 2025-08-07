// managers/token.manager.ts
import { CookieUtils } from '../utils/cookie';
import type { Logger } from '../utils';
import { MTOP_TOKEN } from '../constants';
import type { GoofishMtopResponse } from '../types';

export class TokenManager {
  private static token: string = '';

  static getToken(): string {
    return this.token;
  }

  static setToken(value: string): void {
    this.token = value;
  }

  /**
   * 从 Cookie 字符串更新 token
   */
  static updateFromCookie(cookie: string, logger?: Logger): boolean {
    const cookies = CookieUtils.parseCookieHeader(cookie);
    const tokenCookie = cookies[MTOP_TOKEN.COOKIE_NAME] || '';

    if (tokenCookie && tokenCookie !== this.token) {
      this.token = tokenCookie.split('_')[0] || '';
      logger?.debug('🔄 Token updated from cookie:', this.token);
      return true;
    }
    return false;
  }

  /**
   * 从响应头更新 token
   */
  static updateFromHeaders(
    headers: Record<string, unknown>,
    logger?: Logger
  ): boolean {
    const setCookieHeaders = headers['set-cookie'];
    if (!setCookieHeaders) return false;

    const cookies = Array.isArray(setCookieHeaders)
      ? setCookieHeaders
      : [setCookieHeaders];
    const tokenCookie = cookies.find(
      (cookie: unknown) =>
        typeof cookie === 'string' &&
        cookie.includes(`${MTOP_TOKEN.COOKIE_NAME}=`)
    );

    if (tokenCookie && typeof tokenCookie === 'string') {
      const match = tokenCookie.match(MTOP_TOKEN.COOKIE_REGEX);
      const newToken = match?.[1];

      if (newToken && newToken !== this.token) {
        this.token = newToken;
        logger?.debug('🔄 Token updated from headers:', this.token);
        return true;
      }
    }

    return false;
  }

  /**
   * 检查是否为 token 错误
   */
  static isTokenError<TResponse>(
    response: GoofishMtopResponse<TResponse>
  ): boolean {
    const errorCode = response.ret?.[0]?.split('::')[0];
    return MTOP_TOKEN.ERROR_CODES.includes(
      errorCode as (typeof MTOP_TOKEN.ERROR_CODES)[number]
    );
  }
}
