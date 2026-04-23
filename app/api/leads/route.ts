// =============================================================================
// Leads API
// =============================================================================

import { 
  successResponse, 
  createdResponse, 
  errorResponse,
  validationErrorResponse,
  parseJsonBody,
  getSearchParams,
} from '@/src/infrastructure/api/response'
import { 
  createLead, 
  getAllLeads, 
  getFilteredLeads,
  validateLeadInput,
  type CreateLeadInput,
  type LeadFilters,
} from '@/src/application/services/lead.service'
import { API_MESSAGES, type LeadStatus } from '@/src/application/config/constants'

// -----------------------------------------------------------------------------
// GET /api/leads - List all leads with optional filtering
// -----------------------------------------------------------------------------

export async function GET(request: Request) {
  try {
    const params = getSearchParams(request)
    
    const filters: LeadFilters = {
      status: params.get('status') as LeadStatus | undefined,
      search: params.get('search') || undefined,
      cohortId: params.get('cohortId') || undefined,
    }

    // Check if any filters are applied
    const hasFilters = Object.values(filters).some(v => v !== undefined)
    
    const leads = hasFilters 
      ? await getFilteredLeads(filters)
      : await getAllLeads()

    return successResponse(leads)
  } catch (error) {
    console.error('[API] Error fetching leads:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}

// -----------------------------------------------------------------------------
// POST /api/leads - Create a new lead
// -----------------------------------------------------------------------------

export async function POST(request: Request) {
  try {
    const body = await parseJsonBody<CreateLeadInput>(request)
    
    if (!body) {
      return errorResponse(API_MESSAGES.ERROR.INVALID_DATA)
    }

    // Validate input
    const validation = validateLeadInput(body)
    if (!validation.valid) {
      return validationErrorResponse(validation.errors)
    }

    const lead = await createLead(body)
    return createdResponse(lead, API_MESSAGES.SUCCESS.LEAD_CREATED)
  } catch (error) {
    if (error instanceof Error && error.message === 'EMAIL_DUPLICATE') {
      return errorResponse(API_MESSAGES.ERROR.DUPLICATE_EMAIL)
    }
    console.error('[API] Error creating lead:', error)
    return errorResponse(API_MESSAGES.ERROR.INTERNAL_ERROR, 500)
  }
}
