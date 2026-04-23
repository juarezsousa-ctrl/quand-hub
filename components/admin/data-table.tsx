'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface Column<T> {
  key: string
  header: string
  cell: (item: T) => ReactNode
  className?: string
  hideOnMobile?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  emptyMessage?: string
  isLoading?: boolean
  className?: string
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function DataTable<T extends { id: string }>({
  data,
  columns,
  emptyMessage = 'Nenhum item encontrado',
  isLoading = false,
  className,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className={cn('rounded-lg border border-border overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    'font-semibold',
                    column.hideOnMobile && 'hidden md:table-cell',
                    column.className
                  )}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                {columns.map((column) => (
                  <TableCell
                    key={`${item.id}-${column.key}`}
                    className={cn(
                      column.hideOnMobile && 'hidden md:table-cell',
                      column.className
                    )}
                  >
                    {column.cell(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
