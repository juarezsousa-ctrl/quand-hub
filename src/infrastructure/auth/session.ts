import { SignJWT, jwtVerify } from 'jose'
import type { AdminSession } from '@/src/domain/entities'
import { getRequiredAuthConfig } from './config'

export const ADMIN_SESSION_COOKIE_NAME = 'quand_hub_admin_session'

interface SessionTokenPayload {
  email: string
  role: AdminSession['role']
  provider: AdminSession['provider']
}

function getSecretKey(): Uint8Array {
  const { sessionSecret } = getRequiredAuthConfig()
  return new TextEncoder().encode(sessionSecret)
}

export function getSessionCookieMaxAge(): number {
  const { sessionTtlSeconds } = getRequiredAuthConfig()
  return sessionTtlSeconds
}

export async function createAdminSessionToken(session: AdminSession): Promise<string> {
  return new SignJWT({
    email: session.email,
    role: session.role,
    provider: session.provider,
  } satisfies SessionTokenPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(session.email)
    .setIssuedAt(session.issuedAt)
    .setExpirationTime(session.expiresAt)
    .sign(getSecretKey())
}

export async function verifyAdminSessionToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ['HS256'],
    })

    const email = typeof payload.email === 'string' ? payload.email : ''
    const role = payload.role === 'super_admin' ? payload.role : null
    const provider =
      payload.provider === 'credentials' ||
      payload.provider === 'google' ||
      payload.provider === 'microsoft'
        ? payload.provider
        : null
    const issuedAt = typeof payload.iat === 'number' ? payload.iat : 0
    const expiresAt = typeof payload.exp === 'number' ? payload.exp : 0

    if (!email || !role || !provider || !issuedAt || !expiresAt) {
      return null
    }

    return {
      email,
      role,
      provider,
      issuedAt,
      expiresAt,
    }
  } catch {
    return null
  }
}

export function getSessionCookieOptions(maxAge = getSessionCookieMaxAge()) {
  return {
    name: ADMIN_SESSION_COOKIE_NAME,
    options: {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge,
    },
  }
}
