import type { AdminSession } from '@/src/domain/entities'
import { API_MESSAGES } from '@/src/application/config/constants'
import {
  getAuthSetupStatus,
  getRequiredAuthConfig,
  type AuthSetupStatus,
} from '@/src/infrastructure/auth/config'
import { verifyPassword, isSupportedPasswordHash } from '@/src/infrastructure/auth/password'

export interface AdminLoginInput {
  email: string
  password: string
}

export interface AdminLoginResult {
  success: boolean
  session?: AdminSession
  error?: string
  setupStatus: AuthSetupStatus
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function getAdminAuthSetupStatus(): AuthSetupStatus {
  return getAuthSetupStatus()
}

export async function authenticateAdmin(input: AdminLoginInput): Promise<AdminLoginResult> {
  const setupStatus = getAuthSetupStatus()

  if (!setupStatus.isConfigured) {
    return {
      success: false,
      error: API_MESSAGES.ERROR.AUTH_NOT_CONFIGURED,
      setupStatus,
    }
  }

  const config = getRequiredAuthConfig()
  const email = normalizeEmail(input.email)
  const password = input.password

  if (!email || !password || !isSupportedPasswordHash(config.adminPasswordHash)) {
    return {
      success: false,
      error: API_MESSAGES.ERROR.INVALID_CREDENTIALS,
      setupStatus,
    }
  }

  const isEmailValid = email === config.adminEmail
  const isPasswordValid = await verifyPassword(password, config.adminPasswordHash)

  if (!isEmailValid || !isPasswordValid) {
    return {
      success: false,
      error: API_MESSAGES.ERROR.INVALID_CREDENTIALS,
      setupStatus,
    }
  }

  const issuedAt = Math.floor(Date.now() / 1000)
  const expiresAt = issuedAt + config.sessionTtlSeconds

  return {
    success: true,
    session: {
      email,
      role: 'super_admin',
      provider: 'credentials',
      issuedAt,
      expiresAt,
    },
    setupStatus,
  }
}
