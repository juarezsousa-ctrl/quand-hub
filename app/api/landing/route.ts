import { getLandingContent } from '@/src/application/services/landing.service'
import { API_MESSAGES } from '@/src/application/config/constants'
import { errorResponse, successResponse } from '@/src/infrastructure/api/response'

export async function GET() {
  try {
    const content = await getLandingContent()

    if (!content.cohort || !content.settings) {
      return errorResponse('Conteúdo da landing page não encontrado', 404)
    }

    return successResponse({
      cohort: content.cohort,
      settings: content.settings,
      freeClasses: content.classes,
      benefits: content.benefits,
      faqs: content.faqs,
      testimonials: content.testimonials,
    })
  } catch (error) {
    console.error('[API] Erro ao carregar dados da landing:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}
