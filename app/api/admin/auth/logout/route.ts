import { API_MESSAGES } from '@/src/application/config/constants'
import { successResponse, serverErrorResponse } from '@/src/infrastructure/api/response'
import { ADMIN_SESSION_COOKIE_NAME } from '@/src/infrastructure/auth/session'

export async function POST() {
  try {
    const response = successResponse({ ok: true }, API_MESSAGES.SUCCESS.LOGGED_OUT)

    response.cookies.set(ADMIN_SESSION_COOKIE_NAME, '', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 0,
    })

    return response
  } catch (error) {
    console.error('[AUTH] Erro ao finalizar sessão:', error)
    return serverErrorResponse()
  }
}
