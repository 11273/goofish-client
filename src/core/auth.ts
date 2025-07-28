export class AuthManager {
  private cookie?: string;
  private token?: string;

  setCookie(cookie: string): void {
    this.cookie = cookie;
  }

  getCookie(): string | undefined {
    return this.cookie;
  }

  // 获取认证头
  getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};

    if (this.cookie) {
      headers['Cookie'] = this.cookie;
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // 检查是否已认证
  isAuthenticated(): boolean {
    return !!this.cookie || !!this.token;
  }
}

export const authManager = new AuthManager();
