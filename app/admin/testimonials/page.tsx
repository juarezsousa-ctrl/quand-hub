'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, Star, X, Save, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Testimonial } from '@/src/domain/entities'
import type { ApiResponse } from '@/src/infrastructure/api/response'

async function readApiData<T>(response: Response): Promise<T> {
  const payload = await response.json()
  return (payload && typeof payload === 'object' && 'data' in payload
    ? (payload as ApiResponse<T>).data
    : payload) as T
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    isActive: true,
    isFeatured: false,
  })

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/admin/testimonials')
      if (response.ok) {
        const data = await readApiData<Testimonial[]>(response)
        setTestimonials(data)
      }
    } catch (error) {
      console.error('[ADMIN] Falha ao buscar depoimentos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchTestimonials()
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [])

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchTestimonials()
        setIsCreating(false)
        setFormData({ name: '', role: '', company: '', content: '', rating: 5, isActive: true, isFeatured: false })
      }
    } catch (error) {
      console.error('[ADMIN] Falha ao criar depoimento:', error)
    }
  }

  const handleUpdate = async () => {
    if (!editingTestimonial) return

    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingTestimonial.id, ...formData }),
      })

      if (response.ok) {
        await fetchTestimonials()
        setEditingTestimonial(null)
        setFormData({ name: '', role: '', company: '', content: '', rating: 5, isActive: true, isFeatured: false })
      }
    } catch (error) {
      console.error('[ADMIN] Falha ao atualizar depoimento:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este depoimento?')) return

    try {
      const response = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchTestimonials()
      }
    } catch (error) {
      console.error('[ADMIN] Falha ao remover depoimento:', error)
    }
  }

  const toggleFeatured = async (testimonial: Testimonial) => {
    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: testimonial.id, isFeatured: !testimonial.isFeatured }),
      })

      if (response.ok) {
        setTestimonials((prev) =>
          prev.map((t) => (t.id === testimonial.id ? { ...t, isFeatured: !t.isFeatured } : t))
        )
      }
    } catch (error) {
      console.error('[ADMIN] Falha ao alternar destaque do depoimento:', error)
    }
  }

  const startEditing = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating,
      isActive: testimonial.isActive,
      isFeatured: testimonial.isFeatured,
    })
    setIsCreating(false)
  }

  const startCreating = () => {
    setIsCreating(true)
    setEditingTestimonial(null)
    setFormData({ name: '', role: '', company: '', content: '', rating: 5, isActive: true, isFeatured: false })
  }

  const cancelForm = () => {
    setIsCreating(false)
    setEditingTestimonial(null)
    setFormData({ name: '', role: '', company: '', content: '', rating: 5, isActive: true, isFeatured: false })
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
          <h1 className="text-3xl font-bold mb-2">Depoimentos</h1>
          <p className="text-muted-foreground">
            Gerencie os depoimentos e casos de sucesso
          </p>
        </div>
        <button
          onClick={startCreating}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Novo Depoimento
        </button>
      </div>

      {/* Form */}
      {(isCreating || editingTestimonial) && (
        <div className="p-6 bg-card rounded-2xl border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">
              {isCreating ? 'Novo Depoimento' : 'Editar Depoimento'}
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
              <label className="text-sm font-medium mb-1.5 block">Nome</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Ricardo Mendes"
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Depoimento</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Conte a história de transformação..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Cargo ou perfil</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Ex: Empresário, Consultora, Vendedor"
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Empresa</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Ex: TechStore"
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Destaque</label>
              <button
                onClick={() => setFormData({ ...formData, isFeatured: !formData.isFeatured })}
                className={cn(
                  'w-full px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2',
                  formData.isFeatured
                    ? 'bg-chart-4/10 text-chart-4'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                <Star className={cn('w-4 h-4', formData.isFeatured && 'fill-chart-4')} />
                {formData.isFeatured ? 'Em destaque' : 'Não destacado'}
              </button>
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

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="relative p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all"
          >
            {/* Featured Badge */}
            {testimonial.isFeatured && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-chart-4 to-chart-5 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white fill-white" />
              </div>
            )}

            {/* Category */}
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3">
              {testimonial.company || testimonial.role}
            </span>

            {/* Content */}
            <h3 className="font-semibold mb-2 line-clamp-2">{testimonial.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {testimonial.content}
            </p>

            {/* Result */}
            <div className="flex items-center gap-2 p-3 bg-chart-3/10 rounded-xl mb-4">
              <TrendingUp className="w-4 h-4 text-chart-3" />
              <span className="text-sm font-medium text-chart-3">{testimonial.role}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => toggleFeatured(testimonial)}
                className={cn(
                  'flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1',
                  testimonial.isFeatured
                    ? 'bg-chart-4/10 text-chart-4'
                    : 'bg-muted hover:bg-muted/80'
                )}
              >
                <Star className={cn('w-4 h-4', testimonial.isFeatured && 'fill-chart-4')} />
                {testimonial.isFeatured ? 'Destacado' : 'Destacar'}
              </button>
              <button
                onClick={() => startEditing(testimonial)}
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(testimonial.id)}
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && !isCreating && (
        <div className="text-center py-12 bg-card rounded-2xl border border-border">
          <h3 className="text-lg font-semibold mb-2">Nenhum depoimento cadastrado</h3>
          <p className="text-muted-foreground mb-4">
            Adicione depoimentos e casos de sucesso
          </p>
          <button
            onClick={startCreating}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium"
          >
            <Plus className="w-5 h-5" />
            Novo Depoimento
          </button>
        </div>
      )}
    </div>
  )
}
