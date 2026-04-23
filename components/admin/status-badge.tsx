'use client'

import { cn } from '@/lib/utils'
import { 
  LEAD_STATUS_LABELS, 
  LEAD_STATUS_COLORS,
  COHORT_STATUS_LABELS,
  COHORT_STATUS_COLORS,
  type LeadStatus,
  type CohortStatus,
} from '@/src/application/config/constants'

// -----------------------------------------------------------------------------
// Lead Status Badge
// -----------------------------------------------------------------------------

interface LeadStatusBadgeProps {
  status: LeadStatus
  className?: string
}

export function LeadStatusBadge({ status, className }: LeadStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        LEAD_STATUS_COLORS[status],
        className
      )}
    >
      {LEAD_STATUS_LABELS[status]}
    </span>
  )
}

// -----------------------------------------------------------------------------
// Cohort Status Badge
// -----------------------------------------------------------------------------

interface CohortStatusBadgeProps {
  status: CohortStatus
  className?: string
}

export function CohortStatusBadge({ status, className }: CohortStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        COHORT_STATUS_COLORS[status],
        className
      )}
    >
      {COHORT_STATUS_LABELS[status]}
    </span>
  )
}

// -----------------------------------------------------------------------------
// Generic Status Badge
// -----------------------------------------------------------------------------

interface StatusBadgeProps {
  label: string
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  className?: string
}

const variantStyles = {
  default: 'bg-muted text-muted-foreground border-border',
  success: 'bg-green-500/10 text-green-500 border-green-500/20',
  warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  error: 'bg-red-500/10 text-red-500 border-red-500/20',
  info: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
}

export function StatusBadge({ label, variant = 'default', className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  )
}
