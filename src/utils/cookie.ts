// ===== Cookie 类型定义 =====
export interface Cookie {
  name: string;
  value: string;
  [key: string]: unknown; // 其他属性如 path, domain, expires 等
}

// ===== Cookie 工具类 =====
export class CookieUtils {
  /**
   * 解析 Set-Cookie 字符串
   */
  static parse(cookieStr: string): Cookie | null {
    if (!cookieStr) return null;

    const parts = cookieStr.split(';').map((p) => p.trim());
    const [nameValue, ...attrs] = parts;

    if (!nameValue || !nameValue.includes('=')) {
      return null;
    }

    const [name, ...valueParts] = nameValue.split('=');
    const value = valueParts.join('='); // 处理值中包含 = 的情况

    const cookie: Cookie = {
      name: name?.trim() || '',
      value: decodeURIComponent(value.trim()),
    };

    // 解析其他属性
    attrs.forEach((attr) => {
      const [key, val] = attr.split('=').map((s) => s.trim());
      if (key) {
        cookie[key.toLowerCase()] = val || true;
      }
    });

    return cookie;
  }

  /**
   * 解析 Cookie 请求头 (name1=value1; name2=value2)
   */
  static parseCookieHeader(cookieHeader: string): Record<string, string> {
    const cookies: Record<string, string> = {};

    if (!cookieHeader) return cookies;

    cookieHeader.split(';').forEach((cookie) => {
      const [name, ...valueParts] = cookie.trim().split('=');
      if (name && valueParts.length > 0) {
        try {
          cookies[name] = decodeURIComponent(valueParts.join('='));
        } catch {
          cookies[name] = valueParts.join('=');
        }
      }
    });

    return cookies;
  }

  /**
   * 格式化为 Cookie 请求头
   */
  static formatCookieHeader(cookies: Record<string, string>): string {
    return Object.entries(cookies)
      .map(([name, value]) => `${name}=${encodeURIComponent(value)}`)
      .join('; ');
  }
}

// ===== Cookie 存储类 =====
export class CookieStore {
  private cookies = new Map<string, string>();

  /**
   * 获取 cookie 值
   */
  get(name: string): string | undefined {
    return this.cookies.get(name);
  }

  /**
   * 设置 cookie
   */
  set(name: string, value: string): void {
    this.cookies.set(name, value);
  }

  /**
   * 从 Set-Cookie 头设置 cookies
   */
  setFromHeaders(headers: string | string[]): void {
    const headerArray = Array.isArray(headers) ? headers : [headers];

    headerArray.forEach((header) => {
      const cookie = CookieUtils.parse(header);
      if (cookie) {
        this.cookies.set(cookie.name, cookie.value);
      }
    });
  }

  /**
   * 删除 cookie
   */
  delete(name: string): boolean {
    return this.cookies.delete(name);
  }

  /**
   * 清空所有 cookies
   */
  clear(): void {
    this.cookies.clear();
  }

  /**
   * 获取所有 cookies
   */
  getAll(): Record<string, string> {
    const result: Record<string, string> = {};
    this.cookies.forEach((value, name) => {
      result[name] = value;
    });
    return result;
  }

  /**
   * 获取 Cookie 请求头字符串
   */
  getCookieHeader(): string {
    return CookieUtils.formatCookieHeader(this.getAll());
  }

  /**
   * 获取 cookie 数量
   */
  size(): number {
    return this.cookies.size;
  }

  /**
   * 是否存在某个 cookie
   */
  has(name: string): boolean {
    return this.cookies.has(name);
  }
}

// ===== 创建一个全局默认实例 =====
export const cookieStore = new CookieStore();
