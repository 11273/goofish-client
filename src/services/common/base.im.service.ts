import type { HttpClient } from '../../core';
import type { WsClient } from '../../core/ws';
import type { GoofishConfig } from '../../types';
import type { WsMessage, WsResponse } from '../../types/common/ws';
import { BaseService } from './base.service';

/**
 * IM 服务基类
 * 提供基于 WebSocket 的 IM 服务通用功能
 */
export abstract class BaseImService extends BaseService {
  protected ws: WsClient;

  constructor(ws: WsClient, http: HttpClient, config: GoofishConfig) {
    super(http, config);
    this.ws = ws;
  }

  /**
   * 发送 WebSocket 请求并等待响应
   */
  protected async request<TResponse, TData = unknown>(options: {
    lwp: string;
    headers?: Record<string, unknown>;
    body?: TData;
  }): Promise<WsResponse<TResponse>> {
    const message: WsMessage = {
      lwp: options.lwp,
      headers: options.headers || {},
      body: options.body,
    };

    return await this.ws.send<TResponse>(message);
  }

  /**
   * 发送消息（不等待响应）
   */
  protected sendRaw(options: {
    lwp: string;
    headers?: Record<string, unknown>;
    body?: unknown;
  }): void {
    const message: WsMessage = {
      lwp: options.lwp,
      headers: options.headers || {},
      body: options.body,
    };

    this.ws.sendRaw(message);
  }

  /**
   * 监听消息
   */
  protected onMessage<T>(handler: (message: WsResponse<T>) => void): void {
    this.ws.on('message', (message: WsResponse<unknown>) => {
      handler(message as WsResponse<T>);
    });
  }

  /**
   * 移除消息监听
   */
  protected offMessage<T>(handler: (message: WsResponse<T>) => void): void {
    this.ws.off('message', (message: WsResponse<unknown>) => {
      handler(message as WsResponse<T>);
    });
  }

  /**
   * 获取 WebSocket 客户端
   */
  protected getWsClient(): WsClient {
    return this.ws;
  }
}
