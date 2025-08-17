import { createPublicKey, publicEncrypt, constants } from 'crypto';

/**
 * RSA 配置常量
 */
const RSA_CONFIG = {
  /** RSA 模数 */
  modulus:
    'd3bcef1f00424f3261c89323fa8cdfa12bbac400d9fe8bb627e8d27a44bd5d59dce559135d678a8143beb5b8d7056c4e1f89c4e1f152470625b7b41944a97f02da6f605a49a93ec6eb9cbaf2e7ac2b26a354ce69eb265953d2c29e395d6d8c1cdb688978551aa0f7521f290035fad381178da0bea8f9e6adce39020f513133fb',
  /** RSA 指数 */
  exponent: '10001',
};

/**
 * 加密密码
 * @param password 密码
 * @returns 加密后的密码
 */
export function encryptPassword(password: string): string {
  const { modulus, exponent } = RSA_CONFIG;
  const publicKey = createPublicKey({
    key: {
      kty: 'RSA',
      n: Buffer.from(modulus, 'hex').toString('base64url'),
      e: Buffer.from(
        exponent.length % 2 === 0 ? exponent : '0' + exponent,
        'hex'
      ).toString('base64url'),
    },
    format: 'jwk',
  });

  return publicEncrypt(
    {
      key: publicKey,
      padding: constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(password)
  ).toString('hex');
}
