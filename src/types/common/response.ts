// API 响应基础结构
export interface GoofishResponse<T = unknown> {
  api: string;
  data: T;
  ret: string[];
  v: string;
  traceId?: string;
}

// 错误响应的 data 结构
export interface ErrorResponseData {
  url?: string; // 重定向URL（通常是登录页）
  h5url?: string; // 移动端URL
  dialogSize?: {
    // 对话框尺寸
    width: string;
    height: string;
  };
}

// 错误响应类型
export interface GoofishErrorResponse
  extends GoofishResponse<ErrorResponseData> {
  dialogSize?: {
    width: string;
    height: string;
  };
}

// 响应状态判断辅助类型
export interface ResponseStatus {
  success: boolean;
  needLogin: boolean;
  errorCode?: string;
  errorMessage?: string;
}
