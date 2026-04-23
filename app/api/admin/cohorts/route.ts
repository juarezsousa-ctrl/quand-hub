import {
  createCohort,
  getAllCohorts,
  setActiveCohort,
  updateCohort,
} from '@/src/application/services/admin.service'
import { API_MESSAGES } from '@/src/application/config/constants'
import {
  createdResponse,
  errorResponse,
  parseJsonBody,
  successResponse,
} from '@/src/infrastructure/api/response'

export async function GET() {
  try {
    const cohorts = await getAllCohorts()
    return successResponse(cohorts)
  } catch (error) {
    console.error('[API] Erro ao buscar turmas:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}

export async function POST(request: Request) {
  try {
    const body = await parseJsonBody<Parameters<typeof createCohort>[0]>(request)
    if (!body) return errorResponse(API_MESSAGES.ERROR.INVALID_DATA)

    const cohort = await createCohort(body)
    return createdResponse(cohort, API_MESSAGES.SUCCESS.COHORT_CREATED)
  } catch (error) {
    console.error('[API] Erro ao criar turma:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}

export async function PUT(request: Request) {
  try {
    const body = await parseJsonBody<Parameters<typeof updateCohort>[1] & { id?: string }>(request)
    if (!body) return errorResponse(API_MESSAGES.ERROR.INVALID_DATA)

    const { id, ...updates } = body
    
    if (!id) {
      return errorResponse('ID da turma não informado')
    }

    const cohort = await updateCohort(id, updates)
    if (!cohort) return errorResponse(API_MESSAGES.ERROR.NOT_FOUND, 404)

    return successResponse(cohort, API_MESSAGES.SUCCESS.COHORT_UPDATED)
  } catch (error) {
    console.error('[API] Erro ao atualizar turma:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await parseJsonBody<{ id?: string }>(request)
    if (!body) return errorResponse(API_MESSAGES.ERROR.INVALID_DATA)

    const { id } = body
    
    if (!id) {
      return errorResponse('ID da turma não informado')
    }

    const cohorts = await setActiveCohort(id)
    return successResponse(cohorts, API_MESSAGES.SUCCESS.COHORT_UPDATED)
  } catch (error) {
    console.error('[API] Erro ao ativar turma:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}
