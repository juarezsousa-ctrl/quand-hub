import {
  createFAQ,
  deleteFAQ,
  getAllFAQs,
  updateFAQ,
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
    const faqs = await getAllFAQs()
    return successResponse(faqs)
  } catch (error) {
    console.error('[API] Erro ao buscar FAQs:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}

export async function POST(request: Request) {
  try {
    const body = await parseJsonBody<Parameters<typeof createFAQ>[0]>(request)
    if (!body) return errorResponse(API_MESSAGES.ERROR.INVALID_DATA)

    const faq = await createFAQ(body)
    return createdResponse(faq, API_MESSAGES.SUCCESS.FAQ_CREATED)
  } catch (error) {
    console.error('[API] Erro ao criar FAQ:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}

export async function PUT(request: Request) {
  try {
    const body = await parseJsonBody<Parameters<typeof updateFAQ>[1] & { id?: string }>(request)
    if (!body) return errorResponse(API_MESSAGES.ERROR.INVALID_DATA)

    const { id, ...updates } = body
    
    if (!id) {
      return errorResponse('ID da FAQ não informado')
    }

    const faq = await updateFAQ(id, updates)
    if (!faq) return errorResponse(API_MESSAGES.ERROR.NOT_FOUND, 404)

    return successResponse(faq, API_MESSAGES.SUCCESS.FAQ_UPDATED)
  } catch (error) {
    console.error('[API] Erro ao atualizar FAQ:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}

export async function DELETE(request: Request) {
  try {
    const id = getSearchParams(request).get('id')
    
    if (!id) {
      return errorResponse('ID da FAQ não informado')
    }

    const deleted = await deleteFAQ(id)
    if (!deleted) return errorResponse(API_MESSAGES.ERROR.NOT_FOUND, 404)

    return successResponse({ id }, API_MESSAGES.SUCCESS.FAQ_DELETED)
  } catch (error) {
    console.error('[API] Erro ao remover FAQ:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}
