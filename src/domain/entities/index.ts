// =============================================================================
// Domain Entities for QUAND HUB
// =============================================================================

import type { LeadStatus, LeadSource, CohortStatus } from '@/src/application/config/constants'

// -----------------------------------------------------------------------------
// Core Entities
// -----------------------------------------------------------------------------

/**
 * Cohort - Represents a class/course batch
 */
export interface Cohort {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  maxSpots: number
  enrolledCount: number
  price: number
  status: CohortStatus
  createdAt: Date
  updatedAt: Date
}

/**
 * Lead - A potential student/customer
 */
export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  whatsapp?: string
  companyOrProfession?: string
  mainChallenge?: string
  learningGoal?: string
  source: LeadSource
  status: LeadStatus
  cohortId?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Testimonial - Student testimonials and success stories
 */
export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatarUrl?: string
  isActive: boolean
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * FAQ - Frequently asked questions
 */
export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * FreeClass - Free classes/lessons offered
 */
export interface FreeClass {
  id: string
  cohortId?: string
  title: string
  description: string
  icon: string
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * Benefit - Program benefits
 */
export interface Benefit {
  id: string
  title: string
  description: string
  icon: string
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// -----------------------------------------------------------------------------
// Landing Page Configuration
// -----------------------------------------------------------------------------

export interface LandingPageData {
  id: string
  heroTitle: string
  heroSubtitle: string
  mainCTA: string
  finalCTATitle: string
  finalCTA: string
  problemTitle: string
  problemText: string
  opportunityTitle: string
  opportunityText: string
  methodTitle: string
  methodItems: MethodItem[]
  audienceItems: AudienceItem[]
  footerText: string
  socialLinks: SocialLink[]
  updatedAt: Date
}

export interface MethodItem {
  id: string
  letter: string
  title: string
  description: string
  order: number
}

export interface AudienceItem {
  id: string
  title: string
  description: string
  icon: string
  order: number
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

// -----------------------------------------------------------------------------
// Authentication
// -----------------------------------------------------------------------------

export type AuthProvider = 'credentials' | 'google' | 'microsoft'

export type AdminRole = 'super_admin'

export interface AdminSession {
  email: string
  role: AdminRole
  provider: AuthProvider
  issuedAt: number
  expiresAt: number
}

// -----------------------------------------------------------------------------
// Utility Types
// -----------------------------------------------------------------------------

export type CreateInput<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateInput<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
