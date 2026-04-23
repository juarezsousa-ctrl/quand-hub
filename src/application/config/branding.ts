export const BRAND = {
  name: 'QUAND HUB',
  slogan: 'Quem Aprende Não Depende',
  shortInstitutionalDescription:
    'Aprenda a usar IA para transformar processos manuais em sistemas simples, profissionais e úteis para o seu negócio.',
  adminDescription: 'Painel administrativo oficial do QUAND HUB.',
  aiSystemLabel: 'QUAND HUB | Sistema IA',
  location: 'Brasil',
  contact: {
    email: 'contato@quandhub.com.br',
    adminEmailExample: 'admin@quandhub.com.br',
  },
  urls: {
    home: '/',
    admin: '/admin',
    adminLogin: '/admin/login',
    privacy: '#',
    terms: '#',
  },
} as const

export const BRAND_TITLE = `${BRAND.name} | ${BRAND.slogan}`

export const LANDING_NAV_LINKS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Aulas', href: '#aulas' },
  { label: 'Método', href: '#metodo' },
  { label: 'FAQ', href: '#faq' },
] as const

export const BRAND_SOCIAL_LINKS = [
  { platform: 'Instagram', url: 'https://instagram.com/quandhub', icon: 'Instagram' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/company/quandhub', icon: 'Linkedin' },
  { platform: 'YouTube', url: 'https://youtube.com/@quandhub', icon: 'Youtube' },
] as const

export const ADMIN_PAGE_TITLES: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/cohorts': 'Turmas',
  '/admin/leads': 'Leads',
  '/admin/faqs': 'FAQ',
  '/admin/testimonials': 'Depoimentos',
  '/admin/settings': 'Configurações',
  '/admin/login': 'Login do Admin',
}
