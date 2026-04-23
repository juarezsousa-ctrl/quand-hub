// =============================================================================
// Lead by ID API
// =============================================================================

import { 
  successResponse, 
  notFoundResponse, 
  errorResponse,
  parseJsonBody,
} from '@/src/infrastructure/api/response'
import { 
  getLeadById, 
  updateLead, 
  deleteLead,
  type UpdateLeadInput,
} from '@/src/application/services/lead.service'
import { API_MESSAGES } from '@/src/application/config/constants'

interface RouteParams {
  params: Promise<{ id: string }>
}

// -----------------------------------------------------------------------------
// GET /api/leads/[id] - Get a single lead
// -----------------------------------------------------------------------------

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const lead = await getLeadById(id)
    
    if (!lead) {
      return notFoundResponse()
    }

    return successResponse(lead)
  } catch (error) {
    console.error('[API] Error fetching lead:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}

// -----------------------------------------------------------------------------
// PATCH /api/leads/[id] - Update a lead
// -----------------------------------------------------------------------------

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await parseJsonBody<UpdateLeadInput>(request)
    
    if (!body) {
      return errorResponse(API_MESSAGES.ERROR.INVALID_DATA)
    }

    const lead = await updateLead(id, body)
    
    if (!lead) {
      return notFoundResponse()
    }

    return successResponse(lead, API_MESSAGES.SUCCESS.LEAD_UPDATED)
  } catch (error) {
    console.error('[API] Error updating lead:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}

// -----------------------------------------------------------------------------
// DELETE /api/leads/[id] - Delete a lead
// -----------------------------------------------------------------------------

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const deleted = await deleteLead(id)
    
    if (!deleted) {
      return notFoundResponse()
    }

    return successResponse({ id }, API_MESSAGES.SUCCESS.LEAD_DELETED)
  } catch (error) {
    console.error('[API] Error deleting lead:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}
