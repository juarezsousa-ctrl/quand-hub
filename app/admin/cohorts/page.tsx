'use client'

import { useEffect, useState } from 'react'
import { Plus, Check, Calendar, DollarSign, Wifi, Users, Edit2, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Cohort } from '@/src/domain/entities'
import type { ApiResponse } from '@/src/infrastructure/api/response'
import { COHORT_STATUS, COHORT_STATUS_COLORS, COHORT_STATUS_LABELS } from '@/src/application/config/constants'
import { formatCohortDateRange, getRemainingSpots, resolveActiveCohort } from '@/src/application/utils/cohort'

async function readApiData<T>(response: Response): Promise<T> {
  const payload = await response.json()
  return (payload && typeof payload === 'object' && 'data' in payload
    ? (payload as ApiResponse<T>).data
    : payload) as T
}

export default function CohortsPage() {
  const [cohorts, setCohorts] = useState<Cohort[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCohorts()
  }, [])

  const fetchCohorts = async () => {
    try {
      const response = await fetch('/api/admin/cohorts')
      if (response.ok) {
        const data = await readApiData<Cohort[]>(response)
        setCohorts(data)
      }
    } catch (error) {
      console.error('[v0] Failed to fetch cohorts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const setActiveCohort = async (cohortId: string) => {
    try {
      const response = await fetch('/api/admin/cohorts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cohortId }),
      })

      if (response.ok) {
        const updatedCohorts = await readApiData<Cohort[]>(response)
        setCohorts(updatedCohorts)
      }
    } catch (error) {
      console.error('[v0] Failed to set active cohort:', error)
    }
  }

  const activeCohort = resolveActiveCohort(cohorts)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Turmas</h1>
          <p className="text-muted-foreground">
            Gerencie as turmas e ative qual aparecerá na landing page
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:shadow-lg transition-all">
          <Plus className="w-5 h-5" />
          Nova Turma
        </button>
      </div>

      {/* Cohorts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cohorts.map((cohort) => (
          <div
            key={cohort.id}
            className={cn(
              'relative p-6 bg-card rounded-2xl border transition-all',
              activeCohort?.id === cohort.id
                ? 'border-primary shadow-lg shadow-primary/10'
                : 'border-border hover:border-primary/30'
            )}
          >
            {/* Active Badge */}
            {activeCohort?.id === cohort.id && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
              </div>
            )}

            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium border',
                    COHORT_STATUS_COLORS[cohort.status]
                  )}
                >
                  {COHORT_STATUS_LABELS[cohort.status]}
                </span>
              </div>
              <h3 className="text-xl font-bold">{cohort.name}</h3>
            </div>

            {/* Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{formatCohortDateRange(cohort)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="w-4 h-4 text-primary" />
                <span>{cohort.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wifi className="w-4 h-4 text-primary" />
                <span>{getRemainingSpots(cohort)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {activeCohort?.id !== cohort.id && cohort.status !== COHORT_STATUS.COMPLETED && (
                <button
                  onClick={() => setActiveCohort(cohort.id)}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Ativar
                </button>
              )}
              <button className="flex-1 px-4 py-2 bg-muted rounded-xl text-sm font-medium hover:bg-muted/80 transition-colors flex items-center justify-center gap-2">
                <Edit2 className="w-4 h-4" />
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {cohorts.length === 0 && (
        <div className="text-center py-12 bg-card rounded-2xl border border-border">
          <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Nenhuma turma cadastrada</h3>
          <p className="text-muted-foreground mb-4">
            Crie sua primeira turma para começar
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium">
            <Plus className="w-5 h-5" />
            Nova Turma
          </button>
        </div>
      )}
    </div>
  )
}
