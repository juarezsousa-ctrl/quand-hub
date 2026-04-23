// =============================================================================
// Seed Data for QUAND HUB
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

import { BRAND, BRAND_SOCIAL_LINKS, BRAND_TITLE } from '@/src/application/config/branding'
import { LEAD_STATUS, LEAD_SOURCE, COHORT_STATUS } from '@/src/application/config/constants'

// -----------------------------------------------------------------------------
// Cohorts
// -----------------------------------------------------------------------------

const cohorts: Cohort[] = [
  {
    id: 'cohort-001',
    name: 'Turma MAPA 01',
    description: 'Primeira turma do método MAPA - Aprenda a transformar processos em sistemas com IA.',
    startDate: '2026-05-15',
    endDate: '2026-05-30',
    maxSpots: 50,
    enrolledCount: 32,
    price: 497,
    status: COHORT_STATUS.OPEN,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'cohort-002',
    name: 'Turma MAPA 02',
    description: 'Segunda turma do método MAPA - Turma de junho.',
    startDate: '2026-06-15',
    endDate: '2026-06-30',
    maxSpots: 50,
    enrolledCount: 0,
    price: 497,
    status: COHORT_STATUS.UPCOMING,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
  },
]

// -----------------------------------------------------------------------------
// Leads
// -----------------------------------------------------------------------------

const leads: Lead[] = [
  {
    id: 'lead-001',
    name: 'Carlos Silva',
    email: 'carlos@empresa.com',
    phone: '11999999999',
    whatsapp: '11999999999',
    source: LEAD_SOURCE.LANDING_PAGE,
    status: LEAD_STATUS.NEW,
    cohortId: 'cohort-001',
    notes: 'Dono de e-commerce, interessado em automatizar atendimento',
    createdAt: new Date('2026-04-20T10:00:00'),
    updatedAt: new Date('2026-04-20T10:00:00'),
  },
  {
    id: 'lead-002',
    name: 'Ana Oliveira',
    email: 'ana@consultoria.com',
    phone: '11988888888',
    whatsapp: '11988888888',
    source: LEAD_SOURCE.INSTAGRAM,
    status: LEAD_STATUS.CONTACTED,
    cohortId: 'cohort-001',
    notes: 'Consultora de RH, demonstrou muito interesse',
    createdAt: new Date('2026-04-19T14:30:00'),
    updatedAt: new Date('2026-04-19T14:30:00'),
  },
  {
    id: 'lead-003',
    name: 'Pedro Santos',
    email: 'pedro@advocacia.com',
    phone: '11977777777',
    whatsapp: '11977777777',
    source: LEAD_SOURCE.REFERRAL,
    status: LEAD_STATUS.QUALIFIED,
    cohortId: 'cohort-001',
    notes: 'Advogado, perfil técnico, quer acelerar produção de documentos',
    createdAt: new Date('2026-04-18T09:15:00'),
    updatedAt: new Date('2026-04-18T09:15:00'),
  },
  {
    id: 'lead-004',
    name: 'Mariana Costa',
    email: 'mariana@marketing.com',
    phone: '11966666666',
    whatsapp: '11966666666',
    source: LEAD_SOURCE.WHATSAPP,
    status: LEAD_STATUS.CONVERTED,
    cohortId: 'cohort-001',
    notes: 'Profissional de marketing, inscrita na turma 01',
    createdAt: new Date('2026-04-17T11:00:00'),
    updatedAt: new Date('2026-04-17T11:00:00'),
  },
]

// -----------------------------------------------------------------------------
// Testimonials
// -----------------------------------------------------------------------------

const testimonials: Testimonial[] = [
  {
    id: 'testimonial-001',
    name: 'Ricardo Mendes',
    role: 'Empresário',
    company: 'TechStore',
    content: 'Automatizei meu atendimento em 2 semanas. Agora economizo 4 horas por dia que antes gastava respondendo as mesmas perguntas.',
    rating: 5,
    avatarUrl: undefined,
    isActive: true,
    isFeatured: true,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
  },
  {
    id: 'testimonial-002',
    name: 'Fernanda Lima',
    role: 'Consultora',
    company: 'RH Solutions',
    content: 'Organizei toda minha operação com IA. Minha produtividade aumentou 60% e agora consigo atender mais clientes.',
    rating: 5,
    avatarUrl: undefined,
    isActive: true,
    isFeatured: true,
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-10'),
  },
  {
    id: 'testimonial-003',
    name: 'Bruno Alves',
    role: 'Vendedor',
    company: 'Alves Imóveis',
    content: 'Criei um gerador de propostas com IA que me permite criar propostas personalizadas em minutos. Revolucionou meu processo de vendas.',
    rating: 5,
    avatarUrl: undefined,
    isActive: true,
    isFeatured: false,
    createdAt: new Date('2026-01-05'),
    updatedAt: new Date('2026-01-05'),
  },
]

// -----------------------------------------------------------------------------
// FAQs
// -----------------------------------------------------------------------------

const faqs: FAQ[] = [
  {
    id: 'faq-001',
    question: 'Preciso saber programar?',
    answer: 'Não! O método foi criado justamente para quem não é técnico. Você vai aprender a usar ferramentas de IA que não exigem conhecimento em programação.',
    category: 'geral',
    order: 1,
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'faq-002',
    question: 'Isso é só para empresas?',
    answer: 'Não. O conteúdo serve para empresários, profissionais autônomos, consultores e qualquer pessoa que queira usar IA para melhorar processos e resultados.',
    category: 'geral',
    order: 2,
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'faq-003',
    question: 'Vou aprender a criar sistemas reais?',
    answer: 'Sim! Ao final das aulas, você terá criado pelo menos um protótipo funcional que pode ser usado no seu negócio ou projeto.',
    category: 'curso',
    order: 3,
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'faq-004',
    question: 'A IA faz tudo sozinha?',
    answer: 'Não. A IA é uma ferramenta poderosa, mas precisa de direcionamento humano. Você vai aprender exatamente como usar a IA de forma estratégica e eficiente.',
    category: 'ia',
    order: 4,
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'faq-005',
    question: 'Esse conteúdo serve para meu negócio?',
    answer: 'Se você tem processos manuais, repetitivos ou desorganizados, o método MAPA pode ser aplicado. Ele funciona para diversos tipos de negócios e áreas.',
    category: 'geral',
    order: 5,
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'faq-006',
    question: 'Vou conseguir aplicar isso na prática?',
    answer: 'Com certeza! Todo o conteúdo é focado em aplicação prática. Você não vai apenas aprender teoria, mas sim colocar a mão na massa desde a primeira aula.',
    category: 'curso',
    order: 6,
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
]

// -----------------------------------------------------------------------------
// Free Classes
// -----------------------------------------------------------------------------

const freeClasses: FreeClass[] = [
  {
    id: 'class-001',
    cohortId: 'cohort-001',
    title: 'Como identificar processos que já podem virar sistema com IA',
    description: 'Descubra quais tarefas do seu dia a dia podem ser automatizadas e transformadas em sistemas inteligentes.',
    icon: 'Search',
    order: 1,
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'class-002',
    cohortId: 'cohort-001',
    title: 'Como transformar uma ideia em um sistema sem começar complicado',
    description: 'Aprenda a estruturar suas ideias de forma simples e criar um plano de ação claro e executável.',
    icon: 'Lightbulb',
    order: 2,
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'class-003',
    cohortId: 'cohort-001',
    title: 'Como criar a primeira versão com IA de forma simples, mas profissional',
    description: 'Mão na massa: construa seu primeiro protótipo funcional usando ferramentas de IA acessíveis.',
    icon: 'Wand2',
    order: 3,
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'class-004',
    cohortId: 'cohort-001',
    title: 'Como levar a solução para um nível mais profissional e útil',
    description: 'Transforme seu protótipo em uma solução robusta, escalável e pronta para uso real no seu negócio.',
    icon: 'Rocket',
    order: 4,
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
]

// -----------------------------------------------------------------------------
// Benefits
// -----------------------------------------------------------------------------

const benefits: Benefit[] = [
  {
    id: 'benefit-001',
    title: 'Mais clareza',
    description: 'Entenda exatamente como a IA pode ajudar seu negócio.',
    icon: 'Lightbulb',
    order: 1,
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'benefit-002',
    title: 'Menos retrabalho',
    description: 'Automatize tarefas repetitivas e libere seu tempo.',
    icon: 'RefreshCcw',
    order: 2,
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'benefit-003',
    title: 'Mais produtividade',
    description: 'Faça mais em menos tempo com processos otimizados.',
    icon: 'TrendingUp',
    order: 3,
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'benefit-004',
    title: 'Processos organizados',
    description: 'Tenha sistemas claros e documentados no seu negócio.',
    icon: 'FolderOpen',
    order: 4,
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'benefit-005',
    title: 'Visão profissional de IA',
    description: 'Aprenda a usar IA de forma estratégica e profissional.',
    icon: 'Brain',
    order: 5,
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'benefit-006',
    title: 'Base para automações',
    description: 'Construa fundamentos sólidos para escalar seus sistemas.',
    icon: 'Layers',
    order: 6,
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
]

// -----------------------------------------------------------------------------
// Landing Page Data
// -----------------------------------------------------------------------------

const landingPage: LandingPageData = {
  id: 'landing-001',
  heroTitle: BRAND.slogan,
  heroSubtitle: BRAND.shortInstitutionalDescription,
  mainCTA: 'Quero participar',
  finalCTATitle: 'Pronto para transformar seus processos com IA?',
  finalCTA: 'Garantir minha vaga',
  problemTitle: 'Seu negócio não precisa de mais improviso. Precisa de sistema.',
  problemText: 'Muitos profissionais e empresas ainda operam no modo manual, perdendo tempo com retrabalho, processos desorganizados e dependência operacional.',
  opportunityTitle: 'Hoje, com IA, já é possível transformar processos em sistemas úteis',
  opportunityText: 'A inteligência artificial não é mais coisa do futuro. Ela está disponível agora, para quem souber usar de forma simples e profissional.',
  methodTitle: 'Método MAPA',
  methodItems: [
    {
      id: 'method-001',
      letter: 'M',
      title: 'Mapear o processo',
      description: 'Identifique e documente os processos que consomem mais tempo e podem ser otimizados.',
      order: 1,
    },
    {
      id: 'method-002',
      letter: 'A',
      title: 'Arquitetar a solução',
      description: 'Desenhe uma estrutura clara e simples para transformar o processo em sistema.',
      order: 2,
    },
    {
      id: 'method-003',
      letter: 'P',
      title: 'Prototipar com IA',
      description: 'Crie versões funcionais rapidamente usando ferramentas de inteligência artificial.',
      order: 3,
    },
    {
      id: 'method-004',
      letter: 'A',
      title: 'Aprimorar para produção',
      description: 'Refine e profissionalize a solução para uso real no dia a dia do negócio.',
      order: 4,
    },
  ],
  audienceItems: [
    {
      id: 'audience-001',
      title: 'PMEs',
      description: 'Pequenas e médias empresas que querem modernizar operações.',
      icon: 'Building2',
      order: 1,
    },
    {
      id: 'audience-002',
      title: 'Empresários',
      description: 'Donos de negócio buscando autonomia e eficiência.',
      icon: 'Briefcase',
      order: 2,
    },
    {
      id: 'audience-003',
      title: 'Profissionais',
      description: 'Profissionais que querem se destacar usando IA.',
      icon: 'User',
      order: 3,
    },
    {
      id: 'audience-004',
      title: 'Consultores',
      description: 'Consultores que querem oferecer soluções com IA aos clientes.',
      icon: 'Users',
      order: 4,
    },
  ],
  footerText: BRAND_TITLE,
  socialLinks: [...BRAND_SOCIAL_LINKS],
  updatedAt: new Date('2026-01-01'),
}

// -----------------------------------------------------------------------------
// Export All Seed Data
// -----------------------------------------------------------------------------

export const seedData = {
  cohorts,
  leads,
  testimonials,
  faqs,
  freeClasses,
  benefits,
  landingPage,
}

// Legacy exports for backwards compatibility
export const seedCohort = cohorts[0]
export const seedFreeClasses = freeClasses
export const seedFAQs = faqs
export const seedLeads = leads
export const seedTestimonials = testimonials
export const seedLandingSettings = landingPage
