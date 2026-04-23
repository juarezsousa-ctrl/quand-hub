import type { Cohort } from '@/src/domain/entities'
import { COHORT_STATUS } from '@/src/application/config/constants'

export function resolveActiveCohort(cohorts: Cohort[]): Cohort | null {
  const openCohorts = cohorts
    .filter(cohort => cohort.status === COHORT_STATUS.OPEN)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  if (openCohorts.length > 0) return openCohorts[0]

  const upcomingCohorts = cohorts
    .filter(cohort => cohort.status === COHORT_STATUS.UPCOMING)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  if (upcomingCohorts.length > 0) return upcomingCohorts[0]

  return cohorts.find(cohort => cohort.status === COHORT_STATUS.IN_PROGRESS) || null
}

export function formatCohortDateRange(cohort: Cohort): string {
  const start = new Date(cohort.startDate)
  const end = new Date(cohort.endDate)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    })
  }

  return `${formatDate(start)} - ${formatDate(end)}`
}

export function isCohortEnrollmentOpen(cohort: Cohort): boolean {
  return cohort.status === COHORT_STATUS.OPEN || cohort.status === COHORT_STATUS.UPCOMING
}

export function getRemainingSpots(cohort: Cohort): string {
  const remaining = cohort.maxSpots - cohort.enrolledCount

  if (remaining <= 0) return 'Esgotado'
  if (remaining <= 5) return `Últimas ${remaining} vagas`
  if (remaining <= 10) return `${remaining} vagas restantes`

  return `${remaining} vagas disponíveis`
}
