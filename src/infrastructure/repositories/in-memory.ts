// =============================================================================
// In-Memory Repository Implementation
// Can be replaced with a real database adapter later
// =============================================================================

import type {
  Cohort,
  Lead,
  Testimonial,
  FAQ,
  FreeClass,
  Benefit,
  LandingPageData,
} from '@/src/domain/entities'

import type {
  IDataRepository,
  ICohortRepository,
  ILeadRepository,
  ITestimonialRepository,
  IFAQRepository,
  IFreeClassRepository,
  IBenefitRepository,
  ILandingPageRepository,
} from '@/src/domain/repositories'

import { seedData } from '../data/seed'

// -----------------------------------------------------------------------------
// In-Memory Storage
// -----------------------------------------------------------------------------

const store = {
  cohorts: [...seedData.cohorts] as Cohort[],
  leads: [...seedData.leads] as Lead[],
  testimonials: [...seedData.testimonials] as Testimonial[],
  faqs: [...seedData.faqs] as FAQ[],
  freeClasses: [...seedData.freeClasses] as FreeClass[],
  benefits: [...seedData.benefits] as Benefit[],
  landingPage: { ...seedData.landingPage } as LandingPageData,
}

// -----------------------------------------------------------------------------
// Cohort Repository
// -----------------------------------------------------------------------------

const cohortRepository: ICohortRepository = {
  async findAll() {
    return [...store.cohorts]
  },

  async findById(id: string) {
    return store.cohorts.find(c => c.id === id) || null
  },

  async findActive() {
    return store.cohorts.find(c => c.status === 'open') || 
           store.cohorts.find(c => c.status === 'upcoming') || 
           null
  },

  async findByStatus(status: string) {
    return store.cohorts.filter(c => c.status === status)
  },

  async create(cohort: Cohort) {
    store.cohorts.push(cohort)
    return cohort
  },

  async update(id: string, updates: Partial<Cohort>) {
    const index = store.cohorts.findIndex(c => c.id === id)
    if (index === -1) return null
    store.cohorts[index] = { ...store.cohorts[index], ...updates }
    return store.cohorts[index]
  },

  async delete(id: string) {
    const index = store.cohorts.findIndex(c => c.id === id)
    if (index === -1) return false
    store.cohorts.splice(index, 1)
    return true
  },
}

// -----------------------------------------------------------------------------
// Lead Repository
// -----------------------------------------------------------------------------

const leadRepository: ILeadRepository = {
  async findAll() {
    return [...store.leads]
  },

  async findById(id: string) {
    return store.leads.find(l => l.id === id) || null
  },

  async findByEmail(email: string) {
    return store.leads.find(l => l.email.toLowerCase() === email.toLowerCase()) || null
  },

  async findByCohortId(cohortId: string) {
    return store.leads.filter(l => l.cohortId === cohortId)
  },

  async findByStatus(status: string) {
    return store.leads.filter(l => l.status === status)
  },

  async create(lead: Lead) {
    store.leads.push(lead)
    return lead
  },

  async update(id: string, updates: Partial<Lead>) {
    const index = store.leads.findIndex(l => l.id === id)
    if (index === -1) return null
    store.leads[index] = { ...store.leads[index], ...updates }
    return store.leads[index]
  },

  async delete(id: string) {
    const index = store.leads.findIndex(l => l.id === id)
    if (index === -1) return false
    store.leads.splice(index, 1)
    return true
  },
}

// -----------------------------------------------------------------------------
// Testimonial Repository
// -----------------------------------------------------------------------------

const testimonialRepository: ITestimonialRepository = {
  async findAll() {
    return [...store.testimonials]
  },

  async findById(id: string) {
    return store.testimonials.find(t => t.id === id) || null
  },

  async findFeatured() {
    return store.testimonials.filter(t => t.isFeatured && t.isActive)
  },

  async findActive() {
    return store.testimonials.filter(t => t.isActive)
  },

  async create(testimonial: Testimonial) {
    store.testimonials.push(testimonial)
    return testimonial
  },

  async update(id: string, updates: Partial<Testimonial>) {
    const index = store.testimonials.findIndex(t => t.id === id)
    if (index === -1) return null
    store.testimonials[index] = { ...store.testimonials[index], ...updates }
    return store.testimonials[index]
  },

  async delete(id: string) {
    const index = store.testimonials.findIndex(t => t.id === id)
    if (index === -1) return false
    store.testimonials.splice(index, 1)
    return true
  },
}

// -----------------------------------------------------------------------------
// FAQ Repository
// -----------------------------------------------------------------------------

const faqRepository: IFAQRepository = {
  async findAll() {
    return [...store.faqs]
  },

  async findById(id: string) {
    return store.faqs.find(f => f.id === id) || null
  },

  async findActive() {
    return store.faqs.filter(f => f.isActive)
  },

  async findByCategory(category: string) {
    return store.faqs.filter(f => f.category === category)
  },

  async create(faq: FAQ) {
    store.faqs.push(faq)
    return faq
  },

  async update(id: string, updates: Partial<FAQ>) {
    const index = store.faqs.findIndex(f => f.id === id)
    if (index === -1) return null
    store.faqs[index] = { ...store.faqs[index], ...updates }
    return store.faqs[index]
  },

  async delete(id: string) {
    const index = store.faqs.findIndex(f => f.id === id)
    if (index === -1) return false
    store.faqs.splice(index, 1)
    return true
  },
}

// -----------------------------------------------------------------------------
// Free Class Repository
// -----------------------------------------------------------------------------

const freeClassRepository: IFreeClassRepository = {
  async findAll() {
    return [...store.freeClasses]
  },

  async findById(id: string) {
    return store.freeClasses.find(fc => fc.id === id) || null
  },

  async findByCohortId(cohortId: string) {
    return store.freeClasses.filter(fc => fc.cohortId === cohortId)
  },

  async findActive() {
    return store.freeClasses.filter(fc => fc.isActive)
  },

  async create(freeClass: FreeClass) {
    store.freeClasses.push(freeClass)
    return freeClass
  },

  async update(id: string, updates: Partial<FreeClass>) {
    const index = store.freeClasses.findIndex(fc => fc.id === id)
    if (index === -1) return null
    store.freeClasses[index] = { ...store.freeClasses[index], ...updates }
    return store.freeClasses[index]
  },

  async delete(id: string) {
    const index = store.freeClasses.findIndex(fc => fc.id === id)
    if (index === -1) return false
    store.freeClasses.splice(index, 1)
    return true
  },
}

// -----------------------------------------------------------------------------
// Benefit Repository
// -----------------------------------------------------------------------------

const benefitRepository: IBenefitRepository = {
  async findAll() {
    return [...store.benefits]
  },

  async findById(id: string) {
    return store.benefits.find(b => b.id === id) || null
  },

  async findActive() {
    return store.benefits.filter(b => b.isActive)
  },

  async create(benefit: Benefit) {
    store.benefits.push(benefit)
    return benefit
  },

  async update(id: string, updates: Partial<Benefit>) {
    const index = store.benefits.findIndex(b => b.id === id)
    if (index === -1) return null
    store.benefits[index] = { ...store.benefits[index], ...updates }
    return store.benefits[index]
  },

  async delete(id: string) {
    const index = store.benefits.findIndex(b => b.id === id)
    if (index === -1) return false
    store.benefits.splice(index, 1)
    return true
  },
}

// -----------------------------------------------------------------------------
// Landing Page Repository
// -----------------------------------------------------------------------------

const landingPageRepository: ILandingPageRepository = {
  async findFirst() {
    return store.landingPage ? { ...store.landingPage } : null
  },

  async update(data: Partial<LandingPageData>) {
    if (!store.landingPage) return null
    store.landingPage = { ...store.landingPage, ...data, updatedAt: new Date() }
    return store.landingPage
  },
}

// -----------------------------------------------------------------------------
// Unified Repository Export
// -----------------------------------------------------------------------------

export const inMemoryRepository: IDataRepository = {
  cohort: cohortRepository,
  lead: leadRepository,
  testimonial: testimonialRepository,
  faq: faqRepository,
  freeClass: freeClassRepository,
  benefit: benefitRepository,
  landingPage: landingPageRepository,
}

// Export for direct access if needed
export {
  cohortRepository,
  leadRepository,
  testimonialRepository,
  faqRepository,
  freeClassRepository,
  benefitRepository,
  landingPageRepository,
}
