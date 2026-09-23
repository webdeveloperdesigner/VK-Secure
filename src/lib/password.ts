import { hash, verify } from '@node-rs/argon2';

// Argon2id Hashing Options
const ARGON_OPTIONS = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, ARGON_OPTIONS);
}

export async function verifyPassword(password: string, hashString: string): Promise<boolean> {
  try {
    return await verify(hashString, password, ARGON_OPTIONS);
  } catch {
    return false;
  }
}
