import type { QRCodeRenderersOptions } from 'qrcode';

// 基于官方文档支持的字符串输出类型
type QRStringType = 'terminal' | 'svg' | 'utf8';

// 数据URL输出类型
type QRDataURLType = 'image/png' | 'image/jpeg' | 'image/webp';

// 字符串输出选项（用于 toString 方法）
export interface QRStringRenderOptions extends QRCodeRenderersOptions {
  type: QRStringType;
  // Terminal 特有选项（仅当 type 为 'terminal' 时有效）
  small?: boolean;
}

// DataURL 输出选项（用于 toDataURL 方法）
export interface QRDataURLRenderOptions extends QRCodeRenderersOptions {
  // 数据 URL 类型
  type?: QRDataURLType;
  // JPEG/WebP 渲染选项
  rendererOpts?: {
    quality?: number;
  };
}

// 统一的渲染选项
export type QRRenderOptions =
  | {
      outputFormat: 'string';
      stringOptions: QRStringRenderOptions;
      dataURLOptions?: never; // 禁止同时设置
    }
  | {
      outputFormat: 'dataURL';
      dataURLOptions?: QRDataURLRenderOptions;
      stringOptions?: never; // 禁止同时设置
    };
