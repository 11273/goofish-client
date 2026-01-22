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

/**
 * 生成 UUID
 */
export function generateUUID(): string {
  const chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid: string[] = [];
  const random = Math.random;

  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid[i] = '-';
    } else if (i === 14) {
      uuid[i] = '4';
    } else {
      const r = Math.floor(16 * random());
      const char = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      uuid[i] = char || '0'; // 提供默认值防止 undefined
    }
  }

  return uuid.join('');
}
/**
 * 生成指定长度的随机字符串
 */
export function generateSecureRandomString(length: number): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
