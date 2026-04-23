// =============================================================================
// Standardized API Response Helpers
// =============================================================================

import { NextResponse } from 'next/server'
import { API_MESSAGES } from '@/src/application/config/constants'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

// -----------------------------------------------------------------------------
// Success Responses
// -----------------------------------------------------------------------------

export function successResponse<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    message,
  })
}

export function createdResponse<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status: 201 }
  )
}

export function paginatedResponse<T>(
  data: T[],
  page: number,
  pageSize: number,
  total: number
): NextResponse<PaginatedResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  })
}

// -----------------------------------------------------------------------------
// Error Responses
// -----------------------------------------------------------------------------

export function errorResponse(
  message: string,
  status: number = 400
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status }
  )
}

export function notFoundResponse(
  message: string = API_MESSAGES.ERROR.NOT_FOUND
): NextResponse<ApiResponse> {
  return errorResponse(message, 404)
}

export function validationErrorResponse(
  errors: Record<string, string>
): NextResponse<ApiResponse<Record<string, string>>> {
  return NextResponse.json(
    {
      success: false,
      error: API_MESSAGES.ERROR.INVALID_DATA,
      data: errors,
    },
    { status: 422 }
  )
}

export function serverErrorResponse(
  message: string = API_MESSAGES.ERROR.INTERNAL_ERROR
): NextResponse<ApiResponse> {
  return errorResponse(message, 500)
}

export function unauthorizedResponse(
  message: string = API_MESSAGES.ERROR.UNAUTHORIZED
): NextResponse<ApiResponse> {
  return errorResponse(message, 401)
}

// -----------------------------------------------------------------------------
// Request Helpers
// -----------------------------------------------------------------------------

export async function parseJsonBody<T>(request: Request): Promise<T | null> {
  try {
    return await request.json()
  } catch {
    return null
  }
}

export function getSearchParams(request: Request): URLSearchParams {
  const url = new URL(request.url)
  return url.searchParams
}

export function getPaginationParams(request: Request): { page: number; pageSize: number } {
  const params = getSearchParams(request)
  return {
    page: Math.max(1, parseInt(params.get('page') || '1', 10)),
    pageSize: Math.min(100, Math.max(1, parseInt(params.get('pageSize') || '10', 10))),
  }
}
