// =============================================================================
// Lead Management Service
// =============================================================================

import { inMemoryRepository } from '@/src/infrastructure/repositories/in-memory'
import type { Lead } from '@/src/domain/entities'
import { 
  VALIDATION, 
  VALIDATION_MESSAGES, 
  LEAD_STATUS,
  type LeadStatus,
  type LeadSource,
  LEAD_SOURCE,
} from '@/src/application/config/constants'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface CreateLeadInput {
  name: string
  email: string
  phone?: string
  whatsapp?: string
  companyOrProfession?: string
  mainChallenge?: string
  learningGoal?: string
  source?: LeadSource
  cohortId?: string
  notes?: string
}

export interface UpdateLeadInput {
  name?: string
  email?: string
  phone?: string
  whatsapp?: string
  companyOrProfession?: string
  mainChallenge?: string
  learningGoal?: string
  status?: LeadStatus
  notes?: string
}

export interface LeadFilters {
  status?: LeadStatus
  source?: LeadSource
  search?: string
  cohortId?: string
  dateFrom?: Date
  dateTo?: Date
}

export interface LeadStats {
  total: number
  byStatus: Record<LeadStatus, number>
  bySource: Record<LeadSource, number>
  thisWeek: number
  thisMonth: number
}

export type ValidationResult = 
  | { valid: true }
  | { valid: false; errors: Record<string, string> }

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

export function validateLeadInput(input: CreateLeadInput): ValidationResult {
  const errors: Record<string, string> = {}

  // Name validation
  if (!input.name || input.name.trim().length === 0) {
    errors.name = VALIDATION_MESSAGES.NAME_REQUIRED
  } else if (input.name.trim().length < VALIDATION.NAME_MIN_LENGTH) {
    errors.name = VALIDATION_MESSAGES.NAME_TOO_SHORT
  }

  // Email validation
  if (!input.email || input.email.trim().length === 0) {
    errors.email = VALIDATION_MESSAGES.EMAIL_REQUIRED
  } else if (!VALIDATION.EMAIL_REGEX.test(input.email)) {
    errors.email = VALIDATION_MESSAGES.EMAIL_INVALID
  }

  // Phone validation (optional)
  if (input.phone && !VALIDATION.PHONE_REGEX.test(input.phone)) {
    errors.phone = VALIDATION_MESSAGES.PHONE_INVALID
  }

  // WhatsApp validation (optional)
  if (input.whatsapp && !VALIDATION.WHATSAPP_REGEX.test(input.whatsapp.replace(/\D/g, ''))) {
    errors.whatsapp = VALIDATION_MESSAGES.WHATSAPP_INVALID
  }

  return Object.keys(errors).length > 0 
    ? { valid: false, errors } 
    : { valid: true }
}

// -----------------------------------------------------------------------------
// CRUD Operations
// -----------------------------------------------------------------------------

export async function createLead(input: CreateLeadInput): Promise<Lead> {
  const validation = validateLeadInput(input)
  if (!validation.valid) {
    throw new Error(JSON.stringify(validation.errors))
  }

  // Check for duplicate email
  const existingLead = await inMemoryRepository.lead.findByEmail(input.email)
  if (existingLead) {
    throw new Error('EMAIL_DUPLICATE')
  }

  const lead: Lead = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    email: input.email.toLowerCase().trim(),
    phone: input.phone?.trim() || undefined,
    whatsapp: input.whatsapp?.trim() || undefined,
    companyOrProfession: input.companyOrProfession?.trim() || undefined,
    mainChallenge: input.mainChallenge?.trim() || undefined,
    learningGoal: input.learningGoal?.trim() || undefined,
    source: input.source || LEAD_SOURCE.LANDING_PAGE,
    status: LEAD_STATUS.NEW,
    cohortId: input.cohortId,
    notes: input.notes,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return inMemoryRepository.lead.create(lead)
}

export async function updateLead(id: string, input: UpdateLeadInput): Promise<Lead | null> {
  const existing = await inMemoryRepository.lead.findById(id)
  if (!existing) return null

  const updated: Lead = {
    ...existing,
    ...input,
    updatedAt: new Date(),
  }

  return inMemoryRepository.lead.update(id, updated)
}

export async function deleteLead(id: string): Promise<boolean> {
  return inMemoryRepository.lead.delete(id)
}

export async function getLeadById(id: string): Promise<Lead | null> {
  return inMemoryRepository.lead.findById(id)
}

export async function getAllLeads(): Promise<Lead[]> {
  return inMemoryRepository.lead.findAll()
}

// -----------------------------------------------------------------------------
// Filtering & Search
// -----------------------------------------------------------------------------

export async function getFilteredLeads(filters: LeadFilters): Promise<Lead[]> {
  let leads = await inMemoryRepository.lead.findAll()

  if (filters.status) {
    leads = leads.filter(l => l.status === filters.status)
  }

  if (filters.source) {
    leads = leads.filter(l => l.source === filters.source)
  }

  if (filters.cohortId) {
    leads = leads.filter(l => l.cohortId === filters.cohortId)
  }

  if (filters.search) {
    const search = filters.search.toLowerCase()
    leads = leads.filter(l => 
      l.name.toLowerCase().includes(search) ||
      l.email.toLowerCase().includes(search) ||
      l.phone?.includes(search) ||
      l.whatsapp?.includes(search)
    )
  }

  if (filters.dateFrom) {
    leads = leads.filter(l => new Date(l.createdAt) >= filters.dateFrom!)
  }

  if (filters.dateTo) {
    leads = leads.filter(l => new Date(l.createdAt) <= filters.dateTo!)
  }

  // Sort by most recent first
  return leads.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

// -----------------------------------------------------------------------------
// Statistics
// -----------------------------------------------------------------------------

export async function getLeadStats(): Promise<LeadStats> {
  const leads = await inMemoryRepository.lead.findAll()
  const now = new Date()
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)
  
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const byStatus = Object.values(LEAD_STATUS).reduce((acc, status) => {
    acc[status] = leads.filter(l => l.status === status).length
    return acc
  }, {} as Record<LeadStatus, number>)

  const bySource = Object.values(LEAD_SOURCE).reduce((acc, source) => {
    acc[source] = leads.filter(l => l.source === source).length
    return acc
  }, {} as Record<LeadSource, number>)

  return {
    total: leads.length,
    byStatus,
    bySource,
    thisWeek: leads.filter(l => new Date(l.createdAt) >= startOfWeek).length,
    thisMonth: leads.filter(l => new Date(l.createdAt) >= startOfMonth).length,
  }
}

// -----------------------------------------------------------------------------
// Status Transitions
// -----------------------------------------------------------------------------

export async function changeLeadStatus(id: string, newStatus: LeadStatus): Promise<Lead | null> {
  return updateLead(id, { status: newStatus })
}

export async function markLeadAsContacted(id: string, notes?: string): Promise<Lead | null> {
  return updateLead(id, { 
    status: LEAD_STATUS.CONTACTED,
    notes: notes ? `[Contato] ${notes}` : undefined,
  })
}

export async function markLeadAsConverted(id: string, notes?: string): Promise<Lead | null> {
  return updateLead(id, { 
    status: LEAD_STATUS.CONVERTED,
    notes: notes ? `[Convertido] ${notes}` : undefined,
  })
}
