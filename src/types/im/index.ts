// 认证相关类型
export type {
  ImLoginTokenRequest,
  ImLoginTokenResponse,
  ImRegisterRequest,
  ImRegisterResponse,
  ImSyncStatusRequest,
  ImSyncStatusResponse,
  ImAckDiffRequest,
  ImAckDiffResponse,
} from './auth';

// 消息相关类型
export { MessageType } from './message';
export type {
  MessageContent,
  Message,
  SendMessageRequest,
  SendMessageResponse,
  MessageListRequest,
  MessageListResponse,
} from './message';

// 会话相关类型
export { ConversationType } from './conversation';
export type {
  Conversation,
  ConversationListNewestPaginationRequest,
  ConversationListNewestPaginationResponse,
  ConversationDetailRequest,
  ConversationDetailResponse,
  CreateConversationRequest,
  CreateConversationResponse,
} from './conversation';

// 同步消息相关类型
export type {
  SyncPushPackage,
  SyncMessageData,
  SyncExtensionModel,
  SyncPushBody,
  DecodedBusinessMessage,
  DecodedSyncItem,
} from './sync';

// 解码后的消息类型
export type {
  DecodedMessageContent,
  MessageExtJson,
  MessageBizTag,
  MessageDetail,
  MessageBody,
  PushConfig,
  DecodedMessage,
  FormattedMessage,
} from './decoded-message';

// 发送消息相关类型
export type {
  SendMessageContent,
  SendMessageExtension,
  SendMessageContext,
  SendMessageBody,
  ReceiverScope,
  SendMessageByReceiverScopeRequest,
  SendMessageByReceiverScopeResponse,
} from './send-message';

// WebSocket 相关类型
export type { WsClientConfig, WsMessage, WsResponse } from '../common/ws';
