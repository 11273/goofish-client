import { unpackMultiple } from 'msgpackr';

/**
 * Base64URL → Base64
 */
function fromBase64Url(base64url: string): string {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');

  // padding 补齐
  const pad = base64.length % 4;
  if (pad) {
    base64 += '='.repeat(4 - pad);
  }

  return base64;
}

/**
 * 解码 IM data（完全对齐闲鱼协议）
 */
export function decodeImData(data: string): unknown {
  if (!data) return null;

  const base64 = fromBase64Url(data);
  const buffer = Buffer.from(base64, 'base64');

  const results: unknown[] = [];
  unpackMultiple(buffer, (v) => results.push(v));

  return results.length === 1 ? results[0] : results;
}
