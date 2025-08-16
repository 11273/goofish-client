// ========== Client ==========
export * from './client';

// ========== Core ==========
export * as Core from './core';

// ========== Services ==========
export * as Services from './services';

// ========== Types ==========
export * as Types from './types';

// ========== Constants ==========
export * as Constants from './constants';

// ========== Utils ==========
export * as Utils from './utils';

// ========== Managers ==========
export * as Managers from './managers';

// ========== 全部直接导出 ==========

// Client 模块导出
export { Goofish, createClient } from './client';
export type { GoofishConfig } from './client';

// Core 模块导出
export {
  AuthManager,
  authManager,
  HttpClient,
  createCookieInterceptor,
  createLogInterceptor,
} from './core';
export type { LogInterceptor, CookieInterceptor } from './core';

// Services 模块导出
export {
  BaseService,
  BaseMtopService,
  BasePassportService,
  SearchService,
  UserService,
  QrService,
} from './services';

// Types 模块导出 - 常用类型和接口
export type {
  SearchOptions,
  SearchResponse,
  SearchResultItem,
  GPSCoordinate,
  QRCodeGenerateParams,
  QRCodeQueryParams,
  QrGenerateResponse,
  QrQueryResponse,
  UserNavResponse,
  UserHeadResponse,
  GoofishMtopResponse,
  GoofishPassportResponse,
  GoofishMtopRequestConfig,
  GoofishPassportRequestConfig,
  RequestOptions,
  HttpClientConfig,
  HttpRequestConfig,
  BuildParamsOutput,
  QRStringRenderOptions,
  QRDataURLRenderOptions,
  QRRenderOptions,
} from './types';

// Types 模块导出 - 枚举
export {
  QRCodeStatus,
  SortField,
  SortValue,
  QuickFilter,
  PublishDays,
} from './types';

// Constants 模块导出
export {
  PASSPORT_CONFIG,
  PASSPORT_ENDPOINTS,
  API_CONFIG,
  MTOP_CONFIG,
  MTOP_ENDPOINTS,
  MTOP_TOKEN,
  ITEM_STATUS,
  ORDER_STATUS,
  ITEM_CATEGORIES,
  SORT_TYPES,
  PAGINATION,
  PRICE_RANGES,
  ERROR_CODES,
  ERROR_MESSAGES,
  RETRY_ERROR_CODES,
  TOKEN_ERROR_CODES,
} from './constants';

// Utils 模块导出
export {
  logger,
  Logger,
  LogLevel,
  generateSign,
  getTimestamp,
  parseCookie,
  getTokenFromCookie,
  CookieUtils,
  CookieStore,
  cookieStore,
} from './utils';
export type { LoggerOptions, TimeFormat, Cookie } from './utils';

// Managers 模块导出
export { TokenManager } from './managers';
