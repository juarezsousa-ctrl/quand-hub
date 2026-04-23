// =============================================================================
// Repository Interfaces (Contracts)
// =============================================================================

import type {
  Cohort,
  Lead,
  Testimonial,
  FAQ,
  FreeClass,
  Benefit,
  LandingPageData,
} from '../entities'

// -----------------------------------------------------------------------------
// Generic Repository Interface
// -----------------------------------------------------------------------------

export interface IRepository<T> {
  findAll(): Promise<T[]>
  findById(id: string): Promise<T | null>
  create(entity: T): Promise<T>
  update(id: string, entity: Partial<T>): Promise<T | null>
  delete(id: string): Promise<boolean>
}

// -----------------------------------------------------------------------------
// Specific Repository Interfaces
// -----------------------------------------------------------------------------

export interface ICohortRepository extends IRepository<Cohort> {
  findActive(): Promise<Cohort | null>
  findByStatus(status: string): Promise<Cohort[]>
}

export interface ILeadRepository extends IRepository<Lead> {
  findByEmail(email: string): Promise<Lead | null>
  findByCohortId(cohortId: string): Promise<Lead[]>
  findByStatus(status: string): Promise<Lead[]>
}

export interface ITestimonialRepository extends IRepository<Testimonial> {
  findFeatured(): Promise<Testimonial[]>
  findActive(): Promise<Testimonial[]>
}

export interface IFAQRepository extends IRepository<FAQ> {
  findActive(): Promise<FAQ[]>
  findByCategory(category: string): Promise<FAQ[]>
}

export interface IFreeClassRepository extends IRepository<FreeClass> {
  findByCohortId(cohortId: string): Promise<FreeClass[]>
  findActive(): Promise<FreeClass[]>
}

export interface IBenefitRepository extends IRepository<Benefit> {
  findActive(): Promise<Benefit[]>
}

export interface ILandingPageRepository {
  findFirst(): Promise<LandingPageData | null>
  update(data: Partial<LandingPageData>): Promise<LandingPageData | null>
}

// -----------------------------------------------------------------------------
// Unified Repository Interface
// -----------------------------------------------------------------------------

export interface IDataRepository {
  cohort: ICohortRepository
  lead: ILeadRepository
  testimonial: ITestimonialRepository
  faq: IFAQRepository
  freeClass: IFreeClassRepository
  benefit: IBenefitRepository
  landingPage: ILandingPageRepository
}
