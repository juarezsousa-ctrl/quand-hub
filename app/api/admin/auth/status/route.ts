import { getAdminAuthSetupStatus } from '@/src/application/services/auth.service'
import { successResponse, serverErrorResponse } from '@/src/infrastructure/api/response'

export async function GET() {
  try {
    return successResponse(getAdminAuthSetupStatus())
  } catch (error) {
    console.error('[AUTH] Erro ao consultar status da autenticação:', error)
    return serverErrorResponse()
  }
}
