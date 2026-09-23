import * as jose from 'jose';

const ISSUER = 'https://auth.vksecure.dev';

// In production, load PRIVATE_KEY / PUBLIC_KEY from ENV.
// For initialization and local dev, we generate or mock a KeyPair.
let secretKey: Uint8Array;

function getSecretKey(): Uint8Array {
  if (!secretKey) {
    const secret = process.env.JWT_SECRET || 'vk-auth-dev-secret-key-32-characters-long!';
    secretKey = new TextEncoder().encode(secret);
  }
  return secretKey;
}

export interface JWTPayload {
  sub: string; // User ID
  email: string;
  name: string;
  aud?: string; // Application Client ID
}

export async function createAccessToken(payload: JWTPayload): Promise<string> {
  return await new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(payload.aud || 'vk_app_default')
    .setExpirationTime('15m') // 15-minute access token lifespan
    .sign(getSecretKey());
}

export async function verifyAccessToken(token: string): Promise<jose.JWTVerifyResult | null> {
  try {
    return await jose.jwtVerify(token, getSecretKey(), {
      issuer: ISSUER,
    });
  } catch {
    return null;
  }
}
