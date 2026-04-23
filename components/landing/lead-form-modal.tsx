'use client'

import { useState } from 'react'
import { X, Send, CheckCircle2, Loader2, User, Mail, Phone, Briefcase, Target, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LeadFormModalProps {
  isOpen: boolean
  onClose: () => void
  cohortId: string
  cohortName: string
}

interface FormData {
  name: string
  email: string
  whatsapp: string
  companyOrProfession: string
  mainChallenge: string
  learningGoal: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  whatsapp: '',
  companyOrProfession: '',
  mainChallenge: '',
  learningGoal: '',
}

export function LeadFormModal({ isOpen, onClose, cohortId, cohortName }: LeadFormModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório'
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }
    if (!formData.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp é obrigatório'
    if (!formData.companyOrProfession.trim()) newErrors.companyOrProfession = 'Campo obrigatório'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          cohortId,
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        setTimeout(() => {
          onClose()
          setIsSuccess(false)
          setFormData(initialFormData)
        }, 3000)
      }
    } catch (error) {
      console.error('[LEADS] Erro ao enviar lead:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card rounded-2xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-chart-3/20 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-chart-3" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Inscrição confirmada!</h3>
            <p className="text-muted-foreground">
              Você foi inscrito na {cohortName}. Em breve você receberá mais informações por e-mail.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-6 pb-0">
              <h3 className="text-2xl font-bold mb-1">Quero participar</h3>
              <p className="text-muted-foreground text-sm">
                Preencha seus dados para garantir sua vaga na {cohortName}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Nome completo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleChange('name')}
                  placeholder="Seu nome"
                  className={cn(
                    'w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all',
                    errors.name && 'border-destructive'
                  )}
                />
                {errors.name && <span className="text-xs text-destructive">{errors.name}</span>}
              </div>

              {/* Email & WhatsApp */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    placeholder="seu@email.com"
                    className={cn(
                      'w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all',
                      errors.email && 'border-destructive'
                    )}
                  />
                  {errors.email && <span className="text-xs text-destructive">{errors.email}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handleChange('whatsapp')}
                    placeholder="(00) 00000-0000"
                    className={cn(
                      'w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all',
                      errors.whatsapp && 'border-destructive'
                    )}
                  />
                  {errors.whatsapp && <span className="text-xs text-destructive">{errors.whatsapp}</span>}
                </div>
              </div>

              {/* Company/Profession */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Empresa ou profissão
                </label>
                <input
                  type="text"
                  value={formData.companyOrProfession}
                  onChange={handleChange('companyOrProfession')}
                  placeholder="Ex: Dono de e-commerce, Consultor..."
                  className={cn(
                    'w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all',
                    errors.companyOrProfession && 'border-destructive'
                  )}
                />
                {errors.companyOrProfession && <span className="text-xs text-destructive">{errors.companyOrProfession}</span>}
              </div>

              {/* Challenge */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  Principal desafio atual
                </label>
                <textarea
                  value={formData.mainChallenge}
                  onChange={handleChange('mainChallenge')}
                  placeholder="Qual o maior desafio que você quer resolver?"
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                />
              </div>

              {/* Learning Goal */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  O que mais deseja aprender?
                </label>
                <textarea
                  value={formData.learningGoal}
                  onChange={handleChange('learningGoal')}
                  placeholder="O que você espera aprender nas aulas?"
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Confirmar inscrição
                  </>
                )}
              </button>

              <p className="text-xs text-center text-muted-foreground">
                Ao se inscrever, você concorda em receber comunicações sobre o evento.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
