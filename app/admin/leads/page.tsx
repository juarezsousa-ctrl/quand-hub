'use client'

import { useEffect, useState } from 'react'
import { Search, Filter, Mail, Phone, Building2, Target, GraduationCap, X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Lead } from '@/src/domain/entities'
import type { ApiResponse } from '@/src/infrastructure/api/response'
import { LEAD_STATUS, LEAD_STATUS_COLORS, LEAD_STATUS_LABELS, type LeadStatus } from '@/src/application/config/constants'

const statusOptions = [
  { value: LEAD_STATUS.NEW, label: LEAD_STATUS_LABELS[LEAD_STATUS.NEW], color: LEAD_STATUS_COLORS[LEAD_STATUS.NEW] },
  { value: LEAD_STATUS.CONTACTED, label: LEAD_STATUS_LABELS[LEAD_STATUS.CONTACTED], color: LEAD_STATUS_COLORS[LEAD_STATUS.CONTACTED] },
  { value: LEAD_STATUS.QUALIFIED, label: LEAD_STATUS_LABELS[LEAD_STATUS.QUALIFIED], color: LEAD_STATUS_COLORS[LEAD_STATUS.QUALIFIED] },
  { value: LEAD_STATUS.CONVERTED, label: LEAD_STATUS_LABELS[LEAD_STATUS.CONVERTED], color: LEAD_STATUS_COLORS[LEAD_STATUS.CONVERTED] },
  { value: LEAD_STATUS.LOST, label: LEAD_STATUS_LABELS[LEAD_STATUS.LOST], color: LEAD_STATUS_COLORS[LEAD_STATUS.LOST] },
]

async function readApiData<T>(response: Response): Promise<T> {
  const payload = await response.json()
  return (payload && typeof payload === 'object' && 'data' in payload
    ? (payload as ApiResponse<T>).data
    : payload) as T
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads')
      if (response.ok) {
        const data = await readApiData<Lead[]>(response)
        setLeads(data)
      }
    } catch (error) {
      console.error('[ADMIN] Falha ao buscar leads:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchLeads()
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [])

  const updateLeadStatus = async (leadId: string, status: LeadStatus) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === leadId ? { ...lead, status } : lead))
        )
        if (selectedLead?.id === leadId) {
          setSelectedLead((prev) => prev ? { ...prev, status } : null)
        }
      }
    } catch (error) {
      console.error('[ADMIN] Falha ao atualizar lead:', error)
    }
  }

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.companyOrProfession?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.notes?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
      <div>
        <h1 className="text-3xl font-bold mb-2">Leads</h1>
        <p className="text-muted-foreground">
          Gerencie os leads capturados na landing page
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nome, email ou empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="">Todos os status</option>
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statusOptions.map((status) => {
          const count = leads.filter((l) => l.status === status.value).length
          return (
            <button
              key={status.value}
              onClick={() => setStatusFilter(statusFilter === status.value ? '' : status.value)}
              className={cn(
                'p-4 rounded-xl border transition-all',
                statusFilter === status.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-card hover:border-primary/30'
              )}
            >
              <p className="text-2xl font-bold mb-1">{count}</p>
              <p className="text-sm text-muted-foreground">{status.label}</p>
            </button>
          )
        })}
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-medium">Nome</th>
                <th className="text-left p-4 font-medium hidden md:table-cell">Empresa/Profissão</th>
                <th className="text-left p-4 font-medium hidden lg:table-cell">Data</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold shrink-0">
                        {lead.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{lead.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <p className="text-sm text-muted-foreground">{lead.companyOrProfession}</p>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <p className="text-sm text-muted-foreground">
                      {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </td>
                  <td className="p-4">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-medium border-0 cursor-pointer',
                        statusOptions.find((s) => s.value === lead.status)?.color
                      )}
                    >
                      {statusOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            Nenhum lead encontrado
          </div>
        )}
      </div>

      {/* Detail Panel */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedLead(null)}
          />
          <div className="relative w-full max-w-lg bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-xl font-bold">Detalhes do Lead</h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                  {selectedLead.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xl font-semibold">{selectedLead.name}</h4>
                  <span
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium',
                      statusOptions.find((s) => s.value === selectedLead.status)?.color
                    )}
                  >
                    {statusOptions.find((s) => s.value === selectedLead.status)?.label}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-sm">{selectedLead.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-sm">{selectedLead.whatsapp}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                  <Building2 className="w-5 h-5 text-primary" />
                    <span className="text-sm">{selectedLead.companyOrProfession || 'Não informado'}</span>
                </div>
              </div>

              {selectedLead.mainChallenge && (
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Principal desafio
                  </label>
                  <p className="text-sm text-muted-foreground p-3 bg-muted rounded-xl">
                    {selectedLead.mainChallenge}
                  </p>
                </div>
              )}

              {selectedLead.learningGoal && (
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    O que deseja aprender
                  </label>
                  <p className="text-sm text-muted-foreground p-3 bg-muted rounded-xl">
                    {selectedLead.learningGoal}
                  </p>
                </div>
              )}

              <div className="pt-4 flex gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => updateLeadStatus(selectedLead.id, status.value)}
                    className={cn(
                      'flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1',
                      selectedLead.status === status.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    )}
                  >
                    {selectedLead.status === status.value && <Check className="w-4 h-4" />}
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
