import { NextRequest, NextResponse } from 'next/server'
import { API_MESSAGES } from '@/src/application/config/constants'
import { ADMIN_SESSION_COOKIE_NAME, verifyAdminSessionToken } from '@/src/infrastructure/auth/session'

const ADMIN_LOGIN_PATH = '/admin/login'
const ADMIN_API_AUTH_PREFIX = '/api/admin/auth'

function buildLoginRedirect(request: NextRequest) {
  const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url)
  const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`

  if (request.nextUrl.pathname !== ADMIN_LOGIN_PATH) {
    loginUrl.searchParams.set('next', nextPath)
  }

  return NextResponse.redirect(loginUrl)
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminPage = pathname.startsWith('/admin')
  const isAdminApi = pathname.startsWith('/api/admin')
  const isAuthApi = pathname.startsWith(ADMIN_API_AUTH_PREFIX)
  const isLoginPage = pathname === ADMIN_LOGIN_PATH

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next()
  }

  if (isAuthApi) {
    return NextResponse.next()
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value
  const session = token ? await verifyAdminSessionToken(token) : null

  if (!session) {
    if (isAdminApi) {
      return NextResponse.json(
        {
          success: false,
          error: API_MESSAGES.ERROR.UNAUTHORIZED,
        },
        { status: 401 }
      )
    }

    if (isLoginPage) {
      return NextResponse.next()
    }

    return buildLoginRedirect(request)
  }

  if (isLoginPage) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
