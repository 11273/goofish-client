import md5 from 'crypto-js/md5';
interface SignParams {
  appKey: string;
  t: string;
  data: string;
  token?: string;
}

/**
 * 生成 MD5 签名
 */
export function generateSign(params: SignParams): string {
  const { appKey, t, data, token } = params;
  const signStr = `${token || ''}&${t}&${appKey}&${data}`;

  return md5(signStr).toString();
}

/**
 * 生成时间戳
 */
export function getTimestamp(): string {
  return Date.now().toString();
}

/**
 * 解析 Cookie 字符串
 */
export function parseCookie(cookieStr: string): Record<string, string> {
  const cookies: Record<string, string> = {};

  if (!cookieStr || typeof cookieStr !== 'string') {
    return cookies;
  }

  cookieStr.split(';').forEach((item) => {
    const trimmedItem = item.trim();
    const equalIndex = trimmedItem.indexOf('=');

    if (equalIndex > 0) {
      const key = trimmedItem.substring(0, equalIndex);
      const value = trimmedItem.substring(equalIndex + 1);

      try {
        cookies[key] = decodeURIComponent(value);
      } catch {
        // 如果解码失败，使用原始值
        cookies[key] = value;
      }
    }
  });

  return cookies;
}

/**
 * 从 Cookie 中获取 token
 */
export function getTokenFromCookie(cookieStr: string): string {
  const cookies = parseCookie(cookieStr);
  const mH5Tk = cookies['_m_h5_tk'];

  if (!mH5Tk || typeof mH5Tk !== 'string') {
    return '';
  }

  // 提取 token 部分（下划线之前的部分）
  const underscoreIndex = mH5Tk.indexOf('_');
  return underscoreIndex > 0 ? mH5Tk.substring(0, underscoreIndex) : mH5Tk;
}
