// =============================================================================
// QUAND HUB - Application Constants
// =============================================================================

// -----------------------------------------------------------------------------
// Lead Status
// -----------------------------------------------------------------------------
export const LEAD_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  CONVERTED: 'converted',
  LOST: 'lost',
} as const

export type LeadStatus = (typeof LEAD_STATUS)[keyof typeof LEAD_STATUS]

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  [LEAD_STATUS.NEW]: 'Novo',
  [LEAD_STATUS.CONTACTED]: 'Contatado',
  [LEAD_STATUS.QUALIFIED]: 'Qualificado',
  [LEAD_STATUS.CONVERTED]: 'Convertido',
  [LEAD_STATUS.LOST]: 'Perdido',
}

export const LEAD_STATUS_COLORS: Record<LeadStatus, string> = {
  [LEAD_STATUS.NEW]: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  [LEAD_STATUS.CONTACTED]: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  [LEAD_STATUS.QUALIFIED]: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  [LEAD_STATUS.CONVERTED]: 'bg-green-500/10 text-green-500 border-green-500/20',
  [LEAD_STATUS.LOST]: 'bg-red-500/10 text-red-500 border-red-500/20',
}

// -----------------------------------------------------------------------------
// Cohort Status
// -----------------------------------------------------------------------------
export const COHORT_STATUS = {
  UPCOMING: 'upcoming',
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export type CohortStatus = (typeof COHORT_STATUS)[keyof typeof COHORT_STATUS]

export const COHORT_STATUS_LABELS: Record<CohortStatus, string> = {
  [COHORT_STATUS.UPCOMING]: 'Em Breve',
  [COHORT_STATUS.OPEN]: 'Inscrições Abertas',
  [COHORT_STATUS.IN_PROGRESS]: 'Em Andamento',
  [COHORT_STATUS.COMPLETED]: 'Finalizado',
  [COHORT_STATUS.CANCELLED]: 'Cancelado',
}

export const COHORT_STATUS_COLORS: Record<CohortStatus, string> = {
  [COHORT_STATUS.UPCOMING]: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  [COHORT_STATUS.OPEN]: 'bg-green-500/10 text-green-500 border-green-500/20',
  [COHORT_STATUS.IN_PROGRESS]: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  [COHORT_STATUS.COMPLETED]: 'bg-muted text-muted-foreground border-border',
  [COHORT_STATUS.CANCELLED]: 'bg-red-500/10 text-red-500 border-red-500/20',
}

// -----------------------------------------------------------------------------
// Lead Sources
// -----------------------------------------------------------------------------
export const LEAD_SOURCE = {
  LANDING_PAGE: 'landing_page',
  WHATSAPP: 'whatsapp',
  INSTAGRAM: 'instagram',
  REFERRAL: 'referral',
  OTHER: 'other',
} as const

export type LeadSource = (typeof LEAD_SOURCE)[keyof typeof LEAD_SOURCE]

export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  [LEAD_SOURCE.LANDING_PAGE]: 'Landing Page',
  [LEAD_SOURCE.WHATSAPP]: 'WhatsApp',
  [LEAD_SOURCE.INSTAGRAM]: 'Instagram',
  [LEAD_SOURCE.REFERRAL]: 'Indicação',
  [LEAD_SOURCE.OTHER]: 'Outro',
}

// -----------------------------------------------------------------------------
// Form Validation
// -----------------------------------------------------------------------------
export const VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s\-()]{10,}$/,
  WHATSAPP_REGEX: /^\+?[\d]{10,15}$/,
} as const

export const VALIDATION_MESSAGES = {
  NAME_REQUIRED: 'Nome é obrigatório',
  NAME_TOO_SHORT: `Nome deve ter pelo menos ${VALIDATION.NAME_MIN_LENGTH} caracteres`,
  EMAIL_REQUIRED: 'E-mail é obrigatório',
  EMAIL_INVALID: 'E-mail inválido',
  PHONE_INVALID: 'Telefone inválido',
  WHATSAPP_INVALID: 'WhatsApp inválido',
} as const

// -----------------------------------------------------------------------------
// Pagination
// -----------------------------------------------------------------------------
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const

// -----------------------------------------------------------------------------
// API Response Messages
// -----------------------------------------------------------------------------
export const API_MESSAGES = {
  SUCCESS: {
    LEAD_CREATED: 'Lead criado com sucesso',
    LEAD_UPDATED: 'Lead atualizado com sucesso',
    LEAD_DELETED: 'Lead removido com sucesso',
    COHORT_CREATED: 'Turma criada com sucesso',
    COHORT_UPDATED: 'Turma atualizada com sucesso',
    COHORT_DELETED: 'Turma removida com sucesso',
    FAQ_CREATED: 'FAQ criada com sucesso',
    FAQ_UPDATED: 'FAQ atualizada com sucesso',
    FAQ_DELETED: 'FAQ removida com sucesso',
    TESTIMONIAL_CREATED: 'Depoimento criado com sucesso',
    TESTIMONIAL_UPDATED: 'Depoimento atualizado com sucesso',
    TESTIMONIAL_DELETED: 'Depoimento removido com sucesso',
  },
  ERROR: {
    NOT_FOUND: 'Recurso não encontrado',
    INVALID_DATA: 'Dados inválidos',
    INTERNAL_ERROR: 'Erro interno do servidor',
    UNAUTHORIZED: 'Não autorizado',
    DUPLICATE_EMAIL: 'E-mail já cadastrado',
  },
} as const

// -----------------------------------------------------------------------------
// UI Text
// -----------------------------------------------------------------------------
export const UI_TEXT = {
  ADMIN: {
    DASHBOARD_TITLE: 'Dashboard',
    LEADS_TITLE: 'Gerenciar Leads',
    COHORTS_TITLE: 'Gerenciar Turmas',
    FAQS_TITLE: 'Gerenciar FAQs',
    TESTIMONIALS_TITLE: 'Gerenciar Depoimentos',
    SETTINGS_TITLE: 'Configurações',
  },
  LANDING: {
    CTA_PRIMARY: 'Quero Participar',
    CTA_SECONDARY: 'Saiba Mais',
    CTA_WAITLIST: 'Entrar na Lista de Espera',
  },
  COMMON: {
    LOADING: 'Carregando...',
    SAVE: 'Salvar',
    CANCEL: 'Cancelar',
    DELETE: 'Excluir',
    EDIT: 'Editar',
    ADD: 'Adicionar',
    SEARCH: 'Buscar',
    FILTER: 'Filtrar',
    EXPORT: 'Exportar',
    NO_RESULTS: 'Nenhum resultado encontrado',
    CONFIRM_DELETE: 'Tem certeza que deseja excluir?',
  },
} as const

// -----------------------------------------------------------------------------
// Feature Icons (Lucide icon names)
// -----------------------------------------------------------------------------
export const FEATURE_ICONS = {
  AUTOMATION: 'Workflow',
  AI: 'Bot',
  ANALYTICS: 'TrendingUp',
  SPEED: 'Zap',
  SECURITY: 'Shield',
  SUPPORT: 'Headphones',
  LEARNING: 'GraduationCap',
  COMMUNITY: 'Users',
} as const

// -----------------------------------------------------------------------------
// Social Links
// -----------------------------------------------------------------------------
export const SOCIAL_LINKS = {
  INSTAGRAM: 'https://instagram.com/quandhub',
  WHATSAPP: 'https://wa.me/5511999999999',
  YOUTUBE: 'https://youtube.com/@quandhub',
  LINKEDIN: 'https://linkedin.com/company/quandhub',
} as const

// -----------------------------------------------------------------------------
// Meta / SEO
// -----------------------------------------------------------------------------
export const META = {
  TITLE: 'QUAND HUB - Quem Aprende Não Depende',
  DESCRIPTION: 'Aprenda a usar IA para transformar processos manuais em sistemas simples, profissionais e úteis para o seu negócio.',
  KEYWORDS: 'IA, inteligência artificial, automação, negócios, empreendedorismo, cursos',
  OG_IMAGE: '/images/og-image.jpg',
} as const
