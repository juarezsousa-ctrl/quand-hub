// =============================================================================
// Admin Service - Cohorts, FAQs, Testimonials Management
// =============================================================================

import { inMemoryRepository } from '@/src/infrastructure/repositories/in-memory'
import type { Cohort, FAQ, Testimonial } from '@/src/domain/entities'
import { COHORT_STATUS, type CohortStatus } from '@/src/application/config/constants'

// -----------------------------------------------------------------------------
// Cohort Operations
// -----------------------------------------------------------------------------

export interface CreateCohortInput {
  name: string
  description?: string
  startDate: string
  endDate: string
  maxSpots: number
  price?: number
  status?: CohortStatus
}

export interface UpdateCohortInput extends Partial<CreateCohortInput> {
  enrolledCount?: number
}

export async function createCohort(input: CreateCohortInput): Promise<Cohort> {
  const cohort: Cohort = {
    id: crypto.randomUUID(),
    name: input.name,
    description: input.description || '',
    startDate: input.startDate,
    endDate: input.endDate,
    maxSpots: input.maxSpots,
    enrolledCount: 0,
    price: input.price || 0,
    status: input.status || COHORT_STATUS.UPCOMING,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return inMemoryRepository.cohort.create(cohort)
}

export async function updateCohort(id: string, input: UpdateCohortInput): Promise<Cohort | null> {
  const existing = await inMemoryRepository.cohort.findById(id)
  if (!existing) return null

  const updated: Cohort = {
    ...existing,
    ...input,
    updatedAt: new Date(),
  }

  return inMemoryRepository.cohort.update(id, updated)
}

export async function deleteCohort(id: string): Promise<boolean> {
  return inMemoryRepository.cohort.delete(id)
}

export async function getAllCohorts(): Promise<Cohort[]> {
  const cohorts = await inMemoryRepository.cohort.findAll()
  return cohorts.sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )
}

export async function getCohortById(id: string): Promise<Cohort | null> {
  return inMemoryRepository.cohort.findById(id)
}

export async function setActiveCohort(id: string): Promise<Cohort[]> {
  const cohorts = await inMemoryRepository.cohort.findAll()
  const target = cohorts.find(cohort => cohort.id === id)

  if (!target) {
    return cohorts
  }

  for (const cohort of cohorts) {
    if (cohort.id === id) {
      await inMemoryRepository.cohort.update(cohort.id, {
        status: COHORT_STATUS.OPEN,
        updatedAt: new Date(),
      })
      continue
    }

    if (cohort.status === COHORT_STATUS.OPEN) {
      await inMemoryRepository.cohort.update(cohort.id, {
        status: COHORT_STATUS.UPCOMING,
        updatedAt: new Date(),
      })
    }
  }

  return getAllCohorts()
}

// -----------------------------------------------------------------------------
// FAQ Operations
// -----------------------------------------------------------------------------

export interface CreateFAQInput {
  question: string
  answer: string
  category?: string
  order?: number
}

export interface UpdateFAQInput extends Partial<CreateFAQInput> {
  isActive?: boolean
}

export async function createFAQ(input: CreateFAQInput): Promise<FAQ> {
  const allFaqs = await inMemoryRepository.faq.findAll()
  const maxOrder = Math.max(0, ...allFaqs.map(f => f.order))

  const faq: FAQ = {
    id: crypto.randomUUID(),
    question: input.question,
    answer: input.answer,
    category: input.category || 'geral',
    order: input.order ?? maxOrder + 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return inMemoryRepository.faq.create(faq)
}

export async function updateFAQ(id: string, input: UpdateFAQInput): Promise<FAQ | null> {
  const existing = await inMemoryRepository.faq.findById(id)
  if (!existing) return null

  const updated: FAQ = {
    ...existing,
    ...input,
    updatedAt: new Date(),
  }

  return inMemoryRepository.faq.update(id, updated)
}

export async function deleteFAQ(id: string): Promise<boolean> {
  return inMemoryRepository.faq.delete(id)
}

export async function getAllFAQs(): Promise<FAQ[]> {
  const faqs = await inMemoryRepository.faq.findAll()
  return faqs.sort((a, b) => a.order - b.order)
}

export async function reorderFAQs(orderedIds: string[]): Promise<void> {
  for (let i = 0; i < orderedIds.length; i++) {
    await inMemoryRepository.faq.update(orderedIds[i], { order: i + 1 } as FAQ)
  }
}

// -----------------------------------------------------------------------------
// Testimonial Operations
// -----------------------------------------------------------------------------

export interface CreateTestimonialInput {
  name: string
  role?: string
  company?: string
  content: string
  rating?: number
  avatarUrl?: string
}

export interface UpdateTestimonialInput extends Partial<CreateTestimonialInput> {
  isActive?: boolean
  isFeatured?: boolean
}

export async function createTestimonial(input: CreateTestimonialInput): Promise<Testimonial> {
  const testimonial: Testimonial = {
    id: crypto.randomUUID(),
    name: input.name,
    role: input.role || '',
    company: input.company || '',
    content: input.content,
    rating: input.rating || 5,
    avatarUrl: input.avatarUrl,
    isActive: true,
    isFeatured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return inMemoryRepository.testimonial.create(testimonial)
}

export async function updateTestimonial(id: string, input: UpdateTestimonialInput): Promise<Testimonial | null> {
  const existing = await inMemoryRepository.testimonial.findById(id)
  if (!existing) return null

  const updated: Testimonial = {
    ...existing,
    ...input,
    updatedAt: new Date(),
  }

  return inMemoryRepository.testimonial.update(id, updated)
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  return inMemoryRepository.testimonial.delete(id)
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const testimonials = await inMemoryRepository.testimonial.findAll()
  return testimonials.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const testimonials = await inMemoryRepository.testimonial.findAll()
  return testimonials.filter(t => t.isActive && t.isFeatured)
}

// -----------------------------------------------------------------------------
// Dashboard Stats
// -----------------------------------------------------------------------------

export interface DashboardStats {
  totalLeads: number
  newLeadsThisWeek: number
  totalCohorts: number
  activeCohorts: number
  totalTestimonials: number
  totalFAQs: number
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [leads, cohorts, testimonials, faqs] = await Promise.all([
    inMemoryRepository.lead.findAll(),
    inMemoryRepository.cohort.findAll(),
    inMemoryRepository.testimonial.findAll(),
    inMemoryRepository.faq.findAll(),
  ])

  const now = new Date()
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  return {
    totalLeads: leads.length,
    newLeadsThisWeek: leads.filter(l => new Date(l.createdAt) >= startOfWeek).length,
    totalCohorts: cohorts.length,
    activeCohorts: cohorts.filter(c => 
      c.status === 'open' || c.status === 'upcoming' || c.status === 'in_progress'
    ).length,
    totalTestimonials: testimonials.filter(t => t.isActive).length,
    totalFAQs: faqs.filter(f => f.isActive).length,
  }
}
