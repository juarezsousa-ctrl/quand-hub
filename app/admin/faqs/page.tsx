'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, GripVertical, Eye, EyeOff, X, Save } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FAQ } from '@/src/domain/entities'
import type { ApiResponse } from '@/src/infrastructure/api/response'

async function readApiData<T>(response: Response): Promise<T> {
  const payload = await response.json()
  return (payload && typeof payload === 'object' && 'data' in payload
    ? (payload as ApiResponse<T>).data
    : payload) as T
}

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 1,
    isActive: true,
  })

  useEffect(() => {
    fetchFaqs()
  }, [])

  const fetchFaqs = async () => {
    try {
      const response = await fetch('/api/admin/faqs')
      if (response.ok) {
        const data = await readApiData<FAQ[]>(response)
        setFaqs(data)
      }
    } catch (error) {
      console.error('[v0] Failed to fetch FAQs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/admin/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchFaqs()
        setIsCreating(false)
        setFormData({ question: '', answer: '', order: faqs.length + 1, isActive: true })
      }
    } catch (error) {
      console.error('[v0] Failed to create FAQ:', error)
    }
  }

  const handleUpdate = async () => {
    if (!editingFaq) return

    try {
      const response = await fetch('/api/admin/faqs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingFaq.id, ...formData }),
      })

      if (response.ok) {
        await fetchFaqs()
        setEditingFaq(null)
        setFormData({ question: '', answer: '', order: 1, isActive: true })
      }
    } catch (error) {
      console.error('[v0] Failed to update FAQ:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta pergunta?')) return

    try {
      const response = await fetch(`/api/admin/faqs?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchFaqs()
      }
    } catch (error) {
      console.error('[v0] Failed to delete FAQ:', error)
    }
  }

  const toggleActive = async (faq: FAQ) => {
    try {
      const response = await fetch('/api/admin/faqs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: faq.id, isActive: !faq.isActive }),
      })

      if (response.ok) {
        setFaqs((prev) =>
          prev.map((f) => (f.id === faq.id ? { ...f, isActive: !f.isActive } : f))
        )
      }
    } catch (error) {
      console.error('[v0] Failed to toggle FAQ:', error)
    }
  }

  const startEditing = (faq: FAQ) => {
    setEditingFaq(faq)
    setFormData({
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
      isActive: faq.isActive,
    })
    setIsCreating(false)
  }

  const startCreating = () => {
    setIsCreating(true)
    setEditingFaq(null)
    setFormData({ question: '', answer: '', order: faqs.length + 1, isActive: true })
  }

  const cancelForm = () => {
    setIsCreating(false)
    setEditingFaq(null)
    setFormData({ question: '', answer: '', order: 1, isActive: true })
  }

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
          <h1 className="text-3xl font-bold mb-2">Perguntas Frequentes</h1>
          <p className="text-muted-foreground">
            Gerencie as perguntas e respostas da landing page
          </p>
        </div>
        <button
          onClick={startCreating}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Nova Pergunta
        </button>
      </div>

      {/* Form */}
      {(isCreating || editingFaq) && (
        <div className="p-6 bg-card rounded-2xl border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">
              {isCreating ? 'Nova Pergunta' : 'Editar Pergunta'}
            </h3>
            <button
              onClick={cancelForm}
              className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Pergunta</label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="Ex: Preciso saber programar?"
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Resposta</label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                placeholder="Digite a resposta completa..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1.5 block">Ordem</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  min={1}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-1.5 block">Status</label>
                <button
                  onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                  className={cn(
                    'w-full px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2',
                    formData.isActive
                      ? 'bg-chart-3/10 text-chart-3'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {formData.isActive ? (
                    <>
                      <Eye className="w-4 h-4" />
                      Ativo
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Inativo
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={cancelForm}
                className="flex-1 px-4 py-3 bg-muted rounded-xl font-medium hover:bg-muted/80 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={isCreating ? handleCreate : handleUpdate}
                className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isCreating ? 'Criar' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAQs List */}
      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className={cn(
              'p-4 bg-card rounded-xl border transition-all',
              faq.isActive ? 'border-border' : 'border-border/50 opacity-60'
            )}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground cursor-grab">
                <GripVertical className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    {faq.order}
                  </span>
                  <h4 className="font-semibold truncate">{faq.question}</h4>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{faq.answer}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleActive(faq)}
                  className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                    faq.isActive
                      ? 'bg-chart-3/10 text-chart-3'
                      : 'bg-muted text-muted-foreground'
                  )}
                  title={faq.isActive ? 'Desativar' : 'Ativar'}
                >
                  {faq.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => startEditing(faq)}
                  className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {faqs.length === 0 && !isCreating && (
        <div className="text-center py-12 bg-card rounded-2xl border border-border">
          <h3 className="text-lg font-semibold mb-2">Nenhuma pergunta cadastrada</h3>
          <p className="text-muted-foreground mb-4">
            Adicione perguntas frequentes para sua landing page
          </p>
          <button
            onClick={startCreating}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium"
          >
            <Plus className="w-5 h-5" />
            Nova Pergunta
          </button>
        </div>
      )}
    </div>
  )
}
