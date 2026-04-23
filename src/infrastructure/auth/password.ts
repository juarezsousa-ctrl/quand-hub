import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const scrypt = promisify(scryptCallback)
const KEY_LENGTH = 64
const HASH_PREFIX = 'scrypt'
const HASH_SEPARATOR = ':'

function parsePasswordHash(passwordHash: string) {
  const normalizedHash = passwordHash.trim()

  if (normalizedHash.startsWith(`${HASH_PREFIX}${HASH_SEPARATOR}`)) {
    const [, salt, hash] = normalizedHash.split(HASH_SEPARATOR)
    return { salt, hash }
  }

  if (normalizedHash.startsWith(`${HASH_PREFIX}$`)) {
    const [, salt, hash] = normalizedHash.split('$')
    return { salt, hash }
  }

  return { salt: '', hash: '' }
}

function toBuffer(value: string): Buffer {
  return Buffer.from(value, 'hex')
}

export function isSupportedPasswordHash(passwordHash: string): boolean {
  const { salt, hash } = parsePasswordHash(passwordHash)
  return Boolean(salt && hash)
}

export async function createPasswordHash(password: string, salt = randomBytes(16).toString('hex')): Promise<string> {
  const derivedKey = (await scrypt(password.normalize('NFKC'), salt, KEY_LENGTH)) as Buffer
  return `${HASH_PREFIX}${HASH_SEPARATOR}${salt}${HASH_SEPARATOR}${derivedKey.toString('hex')}`
}

export async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  const { salt, hash } = parsePasswordHash(passwordHash)

  if (!salt || !hash) {
    return false
  }

  const derivedKey = (await scrypt(password.normalize('NFKC'), salt, KEY_LENGTH)) as Buffer
  const expectedBuffer = toBuffer(hash)

  if (derivedKey.length !== expectedBuffer.length) {
    return false
  }

  return timingSafeEqual(derivedKey, expectedBuffer)
}
