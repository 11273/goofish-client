/**
 * Mtop API 响应基础结构
 */
export interface GoofishMtopResponse<T = unknown> {
  api: string;
  data: T;
  ret: string[];
  v: string;
  traceId?: string;
}

/**
 * Passport API 响应基础结构
 */
export interface GoofishPassportResponse<T = unknown> {
  content: {
    data: T;
    status: number;
    success: boolean;
  };
  hasError: boolean;
}
