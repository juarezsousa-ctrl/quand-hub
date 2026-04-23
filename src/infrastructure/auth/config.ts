const DEFAULT_SESSION_TTL_HOURS = 12

export interface AuthConfig {
  sessionSecret: string
  adminEmail: string
  adminPasswordHash: string
  sessionTtlSeconds: number
  providers: {
    credentials: boolean
    google: boolean
    microsoft: boolean
  }
}

export interface AuthSetupStatus {
  isConfigured: boolean
  missing: string[]
  bootstrap: {
    adminEmailConfigured: boolean
    adminPasswordHashConfigured: boolean
    sessionSecretConfigured: boolean
  }
  providers: {
    credentials: boolean
    google: boolean
    microsoft: boolean
  }
}

function readEnv(name: string): string {
  const value = process.env[name]?.trim() ?? ''

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1).trim()
  }

  return value
}

function getSessionTtlHours(): number {
  const rawValue = Number(process.env.ADMIN_SESSION_TTL_HOURS ?? DEFAULT_SESSION_TTL_HOURS)

  if (!Number.isFinite(rawValue) || rawValue <= 0) {
    return DEFAULT_SESSION_TTL_HOURS
  }

  return rawValue
}

export function getAuthSetupStatus(): AuthSetupStatus {
  const sessionSecret = readEnv('APP_SESSION_SECRET')
  const adminEmail = readEnv('ADMIN_EMAIL')
  const adminPasswordHash = readEnv('ADMIN_PASSWORD_HASH')
  const googleClientId = readEnv('AUTH_GOOGLE_CLIENT_ID')
  const googleClientSecret = readEnv('AUTH_GOOGLE_CLIENT_SECRET')
  const microsoftClientId = readEnv('AUTH_MICROSOFT_CLIENT_ID')
  const microsoftClientSecret = readEnv('AUTH_MICROSOFT_CLIENT_SECRET')

  const missing: string[] = []

  if (!sessionSecret) missing.push('APP_SESSION_SECRET')
  if (!adminEmail) missing.push('ADMIN_EMAIL')
  if (!adminPasswordHash) missing.push('ADMIN_PASSWORD_HASH')

  return {
    isConfigured: missing.length === 0,
    missing,
    bootstrap: {
      adminEmailConfigured: Boolean(adminEmail),
      adminPasswordHashConfigured: Boolean(adminPasswordHash),
      sessionSecretConfigured: Boolean(sessionSecret),
    },
    providers: {
      credentials: true,
      google: Boolean(googleClientId && googleClientSecret),
      microsoft: Boolean(microsoftClientId && microsoftClientSecret),
    },
  }
}

export function getRequiredAuthConfig(): AuthConfig {
  const status = getAuthSetupStatus()

  if (!status.isConfigured) {
    throw new Error(`AUTH_NOT_CONFIGURED:${status.missing.join(',')}`)
  }

  return {
    sessionSecret: readEnv('APP_SESSION_SECRET'),
    adminEmail: readEnv('ADMIN_EMAIL').toLowerCase(),
    adminPasswordHash: readEnv('ADMIN_PASSWORD_HASH'),
    sessionTtlSeconds: Math.round(getSessionTtlHours() * 60 * 60),
    providers: status.providers,
  }
}
