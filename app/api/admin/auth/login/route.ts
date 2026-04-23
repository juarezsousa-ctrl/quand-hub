import { NextRequest } from 'next/server'
import { API_MESSAGES } from '@/src/application/config/constants'
import { authenticateAdmin, type AdminLoginInput } from '@/src/application/services/auth.service'
import {
  errorResponse,
  parseJsonBody,
  successResponse,
  unauthorizedResponse,
} from '@/src/infrastructure/api/response'
import {
  createAdminSessionToken,
  getSessionCookieMaxAge,
  getSessionCookieOptions,
} from '@/src/infrastructure/auth/session'

export async function POST(request: NextRequest) {
  try {
    const body = await parseJsonBody<AdminLoginInput>(request)

    if (!body) {
      return errorResponse(API_MESSAGES.ERROR.INVALID_DATA)
    }

    const result = await authenticateAdmin(body)

    if (!result.success || !result.session) {
      const status = result.setupStatus.isConfigured ? 401 : 503
      return (
        status === 401
          ? unauthorizedResponse(result.error ?? API_MESSAGES.ERROR.INVALID_CREDENTIALS)
          : errorResponse(result.error ?? API_MESSAGES.ERROR.AUTH_NOT_CONFIGURED, status)
      )
    }

    const token = await createAdminSessionToken(result.session)
    const response = successResponse(
      {
        user: {
          email: result.session.email,
          role: result.session.role,
          provider: result.session.provider,
        },
      },
      API_MESSAGES.SUCCESS.AUTHENTICATED
    )

    const cookie = getSessionCookieOptions(getSessionCookieMaxAge())

    response.cookies.set(cookie.name, token, cookie.options)
    return response
  } catch (error) {
    console.error('[AUTH] Erro ao autenticar admin:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}
