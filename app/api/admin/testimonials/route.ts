import {
  createTestimonial,
  deleteTestimonial,
  getAllTestimonials,
  updateTestimonial,
} from '@/src/application/services/admin.service'
import { API_MESSAGES } from '@/src/application/config/constants'
import {
  createdResponse,
  errorResponse,
  getSearchParams,
  parseJsonBody,
  successResponse,
} from '@/src/infrastructure/api/response'

export async function GET() {
  try {
    const testimonials = await getAllTestimonials()
    return successResponse(testimonials)
  } catch (error) {
    console.error('[API] Erro ao buscar depoimentos:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}

export async function POST(request: Request) {
  try {
    const body = await parseJsonBody<Parameters<typeof createTestimonial>[0]>(request)
    if (!body) return errorResponse(API_MESSAGES.ERROR.INVALID_DATA)

    const testimonial = await createTestimonial(body)
    return createdResponse(testimonial, API_MESSAGES.SUCCESS.TESTIMONIAL_CREATED)
  } catch (error) {
    console.error('[API] Erro ao criar depoimento:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}

export async function PUT(request: Request) {
  try {
    const body = await parseJsonBody<Parameters<typeof updateTestimonial>[1] & { id?: string }>(request)
    if (!body) return errorResponse(API_MESSAGES.ERROR.INVALID_DATA)

    const { id, ...updates } = body
    
    if (!id) {
      return errorResponse('ID do depoimento não informado')
    }

    const testimonial = await updateTestimonial(id, updates)
    if (!testimonial) return errorResponse(API_MESSAGES.ERROR.NOT_FOUND, 404)

    return successResponse(testimonial, API_MESSAGES.SUCCESS.TESTIMONIAL_UPDATED)
  } catch (error) {
    console.error('[API] Erro ao atualizar depoimento:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}

export async function DELETE(request: Request) {
  try {
    const id = getSearchParams(request).get('id')
    
    if (!id) {
      return errorResponse('ID do depoimento não informado')
    }

    const deleted = await deleteTestimonial(id)
    if (!deleted) return errorResponse(API_MESSAGES.ERROR.NOT_FOUND, 404)

    return successResponse({ id }, API_MESSAGES.SUCCESS.TESTIMONIAL_DELETED)
  } catch (error) {
    console.error('[API] Erro ao remover depoimento:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}
