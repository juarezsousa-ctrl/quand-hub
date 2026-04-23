// =============================================================================
// Local Repository Implementation
// Uses a local JSON file so state remains consistent across Next.js workers
// =============================================================================

import path from 'node:path'
import { promises as fs } from 'node:fs'

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

interface LocalStore {
  cohorts: Cohort[]
  leads: Lead[]
  testimonials: Testimonial[]
  faqs: FAQ[]
  freeClasses: FreeClass[]
  benefits: Benefit[]
  landingPage: LandingPageData
}

const STORE_DIR = path.join(process.cwd(), '.quand-hub-data')
const STORE_FILE = path.join(STORE_DIR, 'store.json')

function cloneSeedStore(): LocalStore {
  return {
    cohorts: seedData.cohorts.map((cohort) => ({ ...cohort })),
    leads: seedData.leads.map((lead) => ({ ...lead })),
    testimonials: seedData.testimonials.map((testimonial) => ({ ...testimonial })),
    faqs: seedData.faqs.map((faq) => ({ ...faq })),
    freeClasses: seedData.freeClasses.map((freeClass) => ({ ...freeClass })),
    benefits: seedData.benefits.map((benefit) => ({ ...benefit })),
    landingPage: { ...seedData.landingPage },
  }
}

function asDate(value: string | Date): Date {
  return value instanceof Date ? value : new Date(value)
}

function hydrateStore(raw: LocalStore): LocalStore {
  return {
    cohorts: raw.cohorts.map((cohort) => ({
      ...cohort,
      createdAt: asDate(cohort.createdAt),
      updatedAt: asDate(cohort.updatedAt),
    })),
    leads: raw.leads.map((lead) => ({
      ...lead,
      createdAt: asDate(lead.createdAt),
      updatedAt: asDate(lead.updatedAt),
    })),
    testimonials: raw.testimonials.map((testimonial) => ({
      ...testimonial,
      createdAt: asDate(testimonial.createdAt),
      updatedAt: asDate(testimonial.updatedAt),
    })),
    faqs: raw.faqs.map((faq) => ({
      ...faq,
      createdAt: asDate(faq.createdAt),
      updatedAt: asDate(faq.updatedAt),
    })),
    freeClasses: raw.freeClasses.map((freeClass) => ({
      ...freeClass,
      createdAt: asDate(freeClass.createdAt),
      updatedAt: asDate(freeClass.updatedAt),
    })),
    benefits: raw.benefits.map((benefit) => ({
      ...benefit,
      createdAt: asDate(benefit.createdAt),
      updatedAt: asDate(benefit.updatedAt),
    })),
    landingPage: {
      ...raw.landingPage,
      updatedAt: asDate(raw.landingPage.updatedAt),
    },
  }
}

async function ensureStoreFile(): Promise<void> {
  await fs.mkdir(STORE_DIR, { recursive: true })

  try {
    await fs.access(STORE_FILE)
  } catch {
    await fs.writeFile(STORE_FILE, JSON.stringify(cloneSeedStore(), null, 2), 'utf8')
  }
}

async function readStore(): Promise<LocalStore> {
  await ensureStoreFile()
  const raw = await fs.readFile(STORE_FILE, 'utf8')

  try {
    return hydrateStore(JSON.parse(raw) as LocalStore)
  } catch {
    const fallbackStore = cloneSeedStore()
    await writeStore(fallbackStore)
    return fallbackStore
  }
}

async function writeStore(store: LocalStore): Promise<void> {
  await ensureStoreFile()
  const tempFile = path.join(
    STORE_DIR,
    `store.${process.pid}.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp.json`
  )

  await fs.writeFile(tempFile, JSON.stringify(store, null, 2), 'utf8')
  await fs.rename(tempFile, STORE_FILE)
}

const cohortRepository: ICohortRepository = {
  async findAll() {
    const store = await readStore()
    return [...store.cohorts]
  },

  async findById(id: string) {
    const store = await readStore()
    return store.cohorts.find((cohort) => cohort.id === id) || null
  },

  async findActive() {
    const store = await readStore()
    return (
      store.cohorts.find((cohort) => cohort.status === 'open') ||
      store.cohorts.find((cohort) => cohort.status === 'upcoming') ||
      null
    )
  },

  async findByStatus(status: string) {
    const store = await readStore()
    return store.cohorts.filter((cohort) => cohort.status === status)
  },

  async create(cohort: Cohort) {
    const store = await readStore()
    store.cohorts.push(cohort)
    await writeStore(store)
    return cohort
  },

  async update(id: string, updates: Partial<Cohort>) {
    const store = await readStore()
    const index = store.cohorts.findIndex((cohort) => cohort.id === id)

    if (index === -1) return null

    store.cohorts[index] = { ...store.cohorts[index], ...updates }
    await writeStore(store)

    return store.cohorts[index]
  },

  async delete(id: string) {
    const store = await readStore()
    const index = store.cohorts.findIndex((cohort) => cohort.id === id)

    if (index === -1) return false

    store.cohorts.splice(index, 1)
    await writeStore(store)

    return true
  },
}

const leadRepository: ILeadRepository = {
  async findAll() {
    const store = await readStore()
    return [...store.leads]
  },

  async findById(id: string) {
    const store = await readStore()
    return store.leads.find((lead) => lead.id === id) || null
  },

  async findByEmail(email: string) {
    const store = await readStore()
    return store.leads.find((lead) => lead.email.toLowerCase() === email.toLowerCase()) || null
  },

  async findByCohortId(cohortId: string) {
    const store = await readStore()
    return store.leads.filter((lead) => lead.cohortId === cohortId)
  },

  async findByStatus(status: string) {
    const store = await readStore()
    return store.leads.filter((lead) => lead.status === status)
  },

  async create(lead: Lead) {
    const store = await readStore()
    store.leads.unshift(lead)
    await writeStore(store)
    return lead
  },

  async update(id: string, updates: Partial<Lead>) {
    const store = await readStore()
    const index = store.leads.findIndex((lead) => lead.id === id)

    if (index === -1) return null

    store.leads[index] = { ...store.leads[index], ...updates }
    await writeStore(store)

    return store.leads[index]
  },

  async delete(id: string) {
    const store = await readStore()
    const index = store.leads.findIndex((lead) => lead.id === id)

    if (index === -1) return false

    store.leads.splice(index, 1)
    await writeStore(store)

    return true
  },
}

const testimonialRepository: ITestimonialRepository = {
  async findAll() {
    const store = await readStore()
    return [...store.testimonials]
  },

  async findById(id: string) {
    const store = await readStore()
    return store.testimonials.find((testimonial) => testimonial.id === id) || null
  },

  async findFeatured() {
    const store = await readStore()
    return store.testimonials.filter((testimonial) => testimonial.isFeatured && testimonial.isActive)
  },

  async findActive() {
    const store = await readStore()
    return store.testimonials.filter((testimonial) => testimonial.isActive)
  },

  async create(testimonial: Testimonial) {
    const store = await readStore()
    store.testimonials.push(testimonial)
    await writeStore(store)
    return testimonial
  },

  async update(id: string, updates: Partial<Testimonial>) {
    const store = await readStore()
    const index = store.testimonials.findIndex((testimonial) => testimonial.id === id)

    if (index === -1) return null

    store.testimonials[index] = { ...store.testimonials[index], ...updates }
    await writeStore(store)

    return store.testimonials[index]
  },

  async delete(id: string) {
    const store = await readStore()
    const index = store.testimonials.findIndex((testimonial) => testimonial.id === id)

    if (index === -1) return false

    store.testimonials.splice(index, 1)
    await writeStore(store)

    return true
  },
}

const faqRepository: IFAQRepository = {
  async findAll() {
    const store = await readStore()
    return [...store.faqs]
  },

  async findById(id: string) {
    const store = await readStore()
    return store.faqs.find((faq) => faq.id === id) || null
  },

  async findActive() {
    const store = await readStore()
    return store.faqs.filter((faq) => faq.isActive)
  },

  async findByCategory(category: string) {
    const store = await readStore()
    return store.faqs.filter((faq) => faq.category === category)
  },

  async create(faq: FAQ) {
    const store = await readStore()
    store.faqs.push(faq)
    await writeStore(store)
    return faq
  },

  async update(id: string, updates: Partial<FAQ>) {
    const store = await readStore()
    const index = store.faqs.findIndex((faq) => faq.id === id)

    if (index === -1) return null

    store.faqs[index] = { ...store.faqs[index], ...updates }
    await writeStore(store)

    return store.faqs[index]
  },

  async delete(id: string) {
    const store = await readStore()
    const index = store.faqs.findIndex((faq) => faq.id === id)

    if (index === -1) return false

    store.faqs.splice(index, 1)
    await writeStore(store)

    return true
  },
}

const freeClassRepository: IFreeClassRepository = {
  async findAll() {
    const store = await readStore()
    return [...store.freeClasses]
  },

  async findById(id: string) {
    const store = await readStore()
    return store.freeClasses.find((freeClass) => freeClass.id === id) || null
  },

  async findByCohortId(cohortId: string) {
    const store = await readStore()
    return store.freeClasses.filter((freeClass) => freeClass.cohortId === cohortId)
  },

  async findActive() {
    const store = await readStore()
    return store.freeClasses.filter((freeClass) => freeClass.isActive)
  },

  async create(freeClass: FreeClass) {
    const store = await readStore()
    store.freeClasses.push(freeClass)
    await writeStore(store)
    return freeClass
  },

  async update(id: string, updates: Partial<FreeClass>) {
    const store = await readStore()
    const index = store.freeClasses.findIndex((freeClass) => freeClass.id === id)

    if (index === -1) return null

    store.freeClasses[index] = { ...store.freeClasses[index], ...updates }
    await writeStore(store)

    return store.freeClasses[index]
  },

  async delete(id: string) {
    const store = await readStore()
    const index = store.freeClasses.findIndex((freeClass) => freeClass.id === id)

    if (index === -1) return false

    store.freeClasses.splice(index, 1)
    await writeStore(store)

    return true
  },
}

const benefitRepository: IBenefitRepository = {
  async findAll() {
    const store = await readStore()
    return [...store.benefits]
  },

  async findById(id: string) {
    const store = await readStore()
    return store.benefits.find((benefit) => benefit.id === id) || null
  },

  async findActive() {
    const store = await readStore()
    return store.benefits.filter((benefit) => benefit.isActive)
  },

  async create(benefit: Benefit) {
    const store = await readStore()
    store.benefits.push(benefit)
    await writeStore(store)
    return benefit
  },

  async update(id: string, updates: Partial<Benefit>) {
    const store = await readStore()
    const index = store.benefits.findIndex((benefit) => benefit.id === id)

    if (index === -1) return null

    store.benefits[index] = { ...store.benefits[index], ...updates }
    await writeStore(store)

    return store.benefits[index]
  },

  async delete(id: string) {
    const store = await readStore()
    const index = store.benefits.findIndex((benefit) => benefit.id === id)

    if (index === -1) return false

    store.benefits.splice(index, 1)
    await writeStore(store)

    return true
  },
}

const landingPageRepository: ILandingPageRepository = {
  async findFirst() {
    const store = await readStore()
    return store.landingPage ? { ...store.landingPage } : null
  },

  async update(data: Partial<LandingPageData>) {
    const store = await readStore()

    if (!store.landingPage) return null

    store.landingPage = { ...store.landingPage, ...data, updatedAt: new Date() }
    await writeStore(store)

    return store.landingPage
  },
}

export const inMemoryRepository: IDataRepository = {
  cohort: cohortRepository,
  lead: leadRepository,
  testimonial: testimonialRepository,
  faq: faqRepository,
  freeClass: freeClassRepository,
  benefit: benefitRepository,
  landingPage: landingPageRepository,
}

export {
  cohortRepository,
  leadRepository,
  testimonialRepository,
  faqRepository,
  freeClassRepository,
  benefitRepository,
  landingPageRepository,
}
