import type {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import type { Logger } from '@/utils/logger';

// ===== 类型定义 =====
interface RequestConfigWithMetadata extends InternalAxiosRequestConfig {
  metadata?: {
    startTime: number;
    requestId?: string;
  };
}

// 日志拦截器
export interface LogInterceptor {
  request: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  response: (response: AxiosResponse) => AxiosResponse;
  error: (error: AxiosError) => never;
}

// 认证拦截器
export interface AuthConfig {
  getToken?: () => string | Promise<string>;
  tokenPrefix?: string;
}

// 重试拦截器
export interface RetryConfig {
  maxRetries?: number;
  retryDelay?: number;
  retryCondition?: (error: AxiosError) => boolean;
}

// ===== 日志拦截器工厂 =====
export function createLogInterceptor(logger: Logger): LogInterceptor {
  return {
    request: (
      config: InternalAxiosRequestConfig
    ): InternalAxiosRequestConfig => {
      // 记录开始时间和请求ID
      (config as RequestConfigWithMetadata).metadata = {
        startTime: Date.now(),
      };

      // 记录请求
      logger.request({
        method: config.method || '',
        url: config.url || '',
        data: config.data,
        headers: config.headers as Record<string, unknown>,
      });

      return config;
    },

    response: (response: AxiosResponse): AxiosResponse => {
      const config = response.config as RequestConfigWithMetadata;
      const duration = config.metadata?.startTime
        ? Date.now() - config.metadata.startTime
        : undefined;

      logger.response({
        method: response.config.method || '',
        url: response.config.url || '',
        status: response.status,
        data: response.data,
        duration: duration || 0,
      });

      return response;
    },

    error: (error: AxiosError): never => {
      if (error.response) {
        const config = error.config as RequestConfigWithMetadata;
        const duration = config?.metadata?.startTime
          ? Date.now() - config.metadata.startTime
          : undefined;

        logger.response({
          method: error.config?.method || '',
          url: error.config?.url || '',
          status: error.response.status,
          data: error.response.data,
          duration: duration || 0,
        });
      } else if (error.request) {
        logger.error('请求失败，无响应', {
          method: error.config?.method || '',
          url: error.config?.url || '',
          message: error.message,
        });
      } else {
        logger.error('请求配置错误', error.message);
      }

      throw error;
    },
  };
}

// ===== 认证拦截器工厂 =====
// export function createAuthInterceptor(logger: Logger, config: AuthConfig = {}) {
//   const { getToken, tokenPrefix = 'Bearer' } = config;
//   return async (
//     axiosConfig: InternalAxiosRequestConfig
//   ): Promise<InternalAxiosRequestConfig> => {
//     if (getToken) {
//       try {
//         const token = await getToken();
//         if (token) {
//           axiosConfig.headers.Authorization = `${tokenPrefix} ${token}`;
//         }
//       } catch (error) {
//         console.warn('获取 token 失败:', error);
//       }
//     }
//     return axiosConfig;
//   };
// }

// ===== 错误处理拦截器工厂 =====
export function createErrorInterceptor(handlers?: {
  onNetworkError?: (error: AxiosError) => void;
  onUnauthorized?: (error: AxiosError) => void;
  onServerError?: (error: AxiosError) => void;
}) {
  return (error: AxiosError): never => {
    if (!error.response) {
      // 网络错误
      handlers?.onNetworkError?.(error);
      throw new Error('网络连接失败，请检查网络设置');
    }

    const { status } = error.response;

    if (status === 401) {
      handlers?.onUnauthorized?.(error);
      throw new Error('认证失败，请重新登录');
    }

    if (status >= 500) {
      handlers?.onServerError?.(error);
      throw new Error('服务器错误，请稍后重试');
    }

    // 其他错误直接抛出
    throw error;
  };
}
