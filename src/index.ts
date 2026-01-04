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
export { Goofish } from './client';

// Core 模块导出
export {
  AuthManager,
  authManager,
  HttpClient,
  WsClient,
  createCookieInterceptor,
  createLogInterceptor,
} from './core';
export type { LogInterceptor, CookieInterceptor } from './core';

// Services 模块导出
export {
  BaseService,
  BaseMtopService,
  BasePassportService,
  BaseImService,
  SearchService,
  UserService,
  ImService,
  QrService,
  LoginService,
  ConversationService,
  MessageService,
} from './services';

// Types 模块导出 - 常用类型和接口
export type {
  // 搜索相关
  SearchOptions,
  SearchResponse,
  SearchResultItem,
  GPSCoordinate,
  // 认证相关
  QRCodeGenerateParams,
  QRCodeQueryParams,
  QrGenerateResponse,
  QrQueryResponse,
  LoginParams,
  LoginResponse,
  LoginData,
  // 用户相关
  UserNavResponse,
  UserHeadResponse,
  UserPageHeadRequest,
  UserQueryRequest,
  UserQueryResponse,
  UserInfo,
  // 首页相关
  HomeFeedRequest,
  HomeFeedResponse,
  ItemCard,
  ItemCardData,
  // 商品相关
  ItemDetailRequest,
  ItemDetailResponse,
  ItemDO,
  SellerDO,
  // 收藏相关
  FavorItemListRequest,
  FavorItemListResponse,
  FavorItem,
  // 订单相关
  BoughtListRequest,
  BoughtListResponse,
  BoughtOrder,
  // 响应类型
  GoofishMtopResponse,
  GoofishPassportResponse,
  // 配置类型
  GoofishConfig,
  GoofishMtopRequestConfig,
  GoofishPassportRequestConfig,
  GoofishImConfig,
  RequestOptions,
  HttpClientConfig,
  HttpRequestConfig,
  BuildParamsOutput,
  // WebSocket 相关
  WsClientConfig,
  WsMessage,
  WsResponse,
  // IM 认证相关
  ImLoginTokenRequest,
  ImLoginTokenResponse,
  ImRegisterRequest,
  ImRegisterResponse,
  ImSyncStatusRequest,
  ImSyncStatusResponse,
  ImAckDiffRequest,
  ImAckDiffResponse,
  // IM 消息相关
  Message,
  MessageContent,
  SendMessageRequest,
  SendMessageResponse,
  MessageListRequest,
  MessageListResponse,
  // IM 会话相关
  Conversation,
  ConversationListNewestPaginationRequest,
  ConversationListNewestPaginationResponse,
  ConversationDetailRequest,
  ConversationDetailResponse,
  CreateConversationRequest,
  CreateConversationResponse,
  // IM 发送消息相关
  SendMessageByReceiverScopeRequest,
  SendMessageByReceiverScopeResponse,
  SendMessageContent,
  SendMessageBody,
  ReceiverScope,
  // IM 解码消息相关
  DecodedMessage,
  FormattedMessage,
  DecodedMessageContent,
  MessageDetail,
  // IM 同步相关
  SyncPushPackage,
  SyncPushBody,
  DecodedSyncItem,
} from './types';

// Types 模块导出 - 枚举
export {
  // 认证枚举
  QRCodeStatus,
  // 搜索枚举
  SortField,
  SortValue,
  QuickFilter,
  PublishDays,
  // 收藏枚举
  FavorType,
  // 订单枚举
  OrderStatus,
  // IM 枚举
  MessageType,
  ConversationType,
  // WebSocket 枚举
  WsReadyState,
} from './types';

// Constants 模块导出
export {
  PASSPORT_CONFIG,
  PASSPORT_ENDPOINTS,
  API_CONFIG,
  MTOP_CONFIG,
  MTOP_ENDPOINTS,
  MTOP_TOKEN,
  IM_CONFIG,
  IM_ENDPOINTS,
  IM_MTOP_ENDPOINTS,
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
  encryptPassword,
} from './utils';
export type { LoggerOptions, TimeFormat, Cookie } from './utils';

// Managers 模块导出
export { TokenManager } from './managers';
