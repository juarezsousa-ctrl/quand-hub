'use client'

import { useEffect, useState } from 'react'
import { 
  Users, 
  GraduationCap, 
  HelpCircle, 
  MessageSquare,
  TrendingUp,
  UserPlus,
  ArrowUpRight
} from 'lucide-react'
import Link from 'next/link'
import type { Lead, Cohort, FAQ, Testimonial } from '@/src/domain/entities'
import type { ApiResponse } from '@/src/infrastructure/api/response'
import { BRAND } from '@/src/application/config/branding'
import { COHORT_STATUS, LEAD_STATUS, LEAD_STATUS_LABELS } from '@/src/application/config/constants'
import { formatCohortDateRange, resolveActiveCohort } from '@/src/application/utils/cohort'

interface DashboardData {
  leads: Lead[]
  cohorts: Cohort[]
  faqs: FAQ[]
  testimonials: Testimonial[]
}

async function readApiData<T>(response: Response): Promise<T> {
  const payload = await response.json()
  return (payload && typeof payload === 'object' && 'data' in payload
    ? (payload as ApiResponse<T>).data
    : payload) as T
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadsRes, cohortsRes, faqsRes, testimonialsRes] = await Promise.all([
          fetch('/api/leads'),
          fetch('/api/admin/cohorts'),
          fetch('/api/admin/faqs'),
          fetch('/api/admin/testimonials'),
        ])

        const [leads, cohorts, faqs, testimonials] = await Promise.all([
          readApiData<Lead[]>(leadsRes),
          readApiData<Cohort[]>(cohortsRes),
          readApiData<FAQ[]>(faqsRes),
          readApiData<Testimonial[]>(testimonialsRes),
        ])

        setData({ leads, cohorts, faqs, testimonials })
      } catch (error) {
        console.error('[ADMIN] Falha ao carregar dados do dashboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
      </div>
    )
  }

  if (!data) {
    return <div className="text-destructive">Erro ao carregar dados</div>
  }

  const activeCohort = resolveActiveCohort(data.cohorts)
  const activeLeads = data.leads.filter((l) => l.cohortId === activeCohort?.id)
  const newLeads = data.leads.filter((l) => l.status === LEAD_STATUS.NEW)

  const stats = [
    {
      label: 'Total de Leads',
      value: data.leads.length,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      href: '/admin/leads',
    },
    {
      label: 'Leads da Turma Ativa',
      value: activeLeads.length,
      icon: UserPlus,
      color: 'text-chart-3',
      bgColor: 'bg-chart-3/10',
      href: '/admin/leads',
    },
    {
      label: 'Novos Leads',
      value: newLeads.length,
      icon: TrendingUp,
      color: 'text-chart-4',
      bgColor: 'bg-chart-4/10',
      href: '/admin/leads',
    },
    {
      label: 'Total FAQs',
      value: data.faqs.length,
      icon: HelpCircle,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      href: '/admin/faqs',
    },
    {
      label: 'Depoimentos',
      value: data.testimonials.length,
      icon: MessageSquare,
      color: 'text-chart-5',
      bgColor: 'bg-chart-5/10',
      href: '/admin/testimonials',
    },
    {
      label: 'Turmas',
      value: data.cohorts.length,
      icon: GraduationCap,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      href: '/admin/cohorts',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do {BRAND.name}
        </p>
      </div>

      {/* Active Cohort Banner */}
      {activeCohort && (
        <div className="p-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl border border-primary/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-chart-3/20 text-chart-3 rounded-full text-sm font-medium mb-2">
                <span className="w-2 h-2 rounded-full bg-chart-3 animate-pulse" />
                Turma Ativa
              </span>
              <h2 className="text-xl font-bold">{activeCohort.name}</h2>
              <p className="text-muted-foreground text-sm">
                {formatCohortDateRange(activeCohort)} - {activeCohort.status === COHORT_STATUS.OPEN ? 'inscrições abertas' : 'próxima turma'}
              </p>
            </div>
            <Link
              href="/admin/cohorts"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:shadow-lg transition-all"
            >
              Gerenciar
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all hover-lift"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold">Leads Recentes</h3>
          <Link
            href="/admin/leads"
            className="text-sm text-primary hover:underline"
          >
            Ver todos
          </Link>
        </div>
        <div className="divide-y divide-border">
          {data.leads.slice(0, 5).map((lead) => (
            <div key={lead.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-sm text-muted-foreground">{lead.email}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                lead.status === LEAD_STATUS.NEW ? 'bg-chart-4/10 text-chart-4' :
                lead.status === LEAD_STATUS.CONTACTED ? 'bg-primary/10 text-primary' :
                lead.status === LEAD_STATUS.QUALIFIED ? 'bg-accent/10 text-accent' :
                'bg-chart-3/10 text-chart-3'
              }`}>
                {LEAD_STATUS_LABELS[lead.status]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
