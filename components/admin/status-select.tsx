'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  LEAD_STATUS,
  LEAD_STATUS_LABELS,
  COHORT_STATUS,
  COHORT_STATUS_LABELS,
  type LeadStatus,
  type CohortStatus,
} from '@/src/application/config/constants'

// -----------------------------------------------------------------------------
// Lead Status Select
// -----------------------------------------------------------------------------

interface LeadStatusSelectProps {
  value: LeadStatus
  onValueChange: (value: LeadStatus) => void
  disabled?: boolean
}

export function LeadStatusSelect({ value, onValueChange, disabled }: LeadStatusSelectProps) {
  return (
    <Select 
      value={value} 
      onValueChange={(v) => onValueChange(v as LeadStatus)}
      disabled={disabled}
    >
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(LEAD_STATUS).map(([key, status]) => (
          <SelectItem key={key} value={status}>
            {LEAD_STATUS_LABELS[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

// -----------------------------------------------------------------------------
// Cohort Status Select
// -----------------------------------------------------------------------------

interface CohortStatusSelectProps {
  value: CohortStatus
  onValueChange: (value: CohortStatus) => void
  disabled?: boolean
}

export function CohortStatusSelect({ value, onValueChange, disabled }: CohortStatusSelectProps) {
  return (
    <Select 
      value={value} 
      onValueChange={(v) => onValueChange(v as CohortStatus)}
      disabled={disabled}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(COHORT_STATUS).map(([key, status]) => (
          <SelectItem key={key} value={status}>
            {COHORT_STATUS_LABELS[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

// -----------------------------------------------------------------------------
// Lead Status Filter (with "All" option)
// -----------------------------------------------------------------------------

interface LeadStatusFilterProps {
  value: LeadStatus | 'all'
  onValueChange: (value: LeadStatus | 'all') => void
}

export function LeadStatusFilter({ value, onValueChange }: LeadStatusFilterProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="Filtrar status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos</SelectItem>
        {Object.entries(LEAD_STATUS).map(([key, status]) => (
          <SelectItem key={key} value={status}>
            {LEAD_STATUS_LABELS[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
