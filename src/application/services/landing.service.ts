// =============================================================================
// Landing Page Service
// =============================================================================

import { inMemoryRepository } from '@/src/infrastructure/repositories/in-memory'
import type { 
  Cohort, 
  FAQ, 
  Testimonial, 
  FreeClass, 
  Benefit,
  LandingPageData 
} from '@/src/domain/entities'
import {
  formatCohortDateRange,
  getRemainingSpots,
  isCohortEnrollmentOpen,
  resolveActiveCohort,
} from '@/src/application/utils/cohort'

export interface LandingContent {
  cohort: Cohort | null
  settings: LandingPageData | null
  faqs: FAQ[]
  testimonials: Testimonial[]
  classes: FreeClass[]
  benefits: Benefit[]
}

/**
 * Fetches all content needed for the landing page
 */
export async function getLandingContent(): Promise<LandingContent> {
  const [cohorts, settings, faqs, testimonials, classes, benefits] = await Promise.all([
    inMemoryRepository.cohort.findAll(),
    inMemoryRepository.landingPage.findFirst(),
    inMemoryRepository.faq.findAll(),
    inMemoryRepository.testimonial.findAll(),
    inMemoryRepository.freeClass.findAll(),
    inMemoryRepository.benefit.findAll(),
  ])

  return {
    cohort: resolveActiveCohort(cohorts),
    settings,
    faqs: faqs.filter(f => f.isActive).sort((a, b) => a.order - b.order),
    testimonials: testimonials.filter(t => t.isActive),
    classes: classes.filter(c => c.isActive).sort((a, b) => a.order - b.order),
    benefits: benefits.filter(b => b.isActive).sort((a, b) => a.order - b.order),
  }
}

/**
 * Gets landing page metadata (for SEO, etc.)
 */
export async function getLandingMetadata(): Promise<LandingPageData | null> {
  return inMemoryRepository.landingPage.findFirst()
}

export {
  formatCohortDateRange,
  getRemainingSpots,
  isCohortEnrollmentOpen,
  resolveActiveCohort,
}
