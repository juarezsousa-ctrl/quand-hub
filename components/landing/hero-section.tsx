'use client'

import { ArrowRight, Play, Calendar, DollarSign, Users, Wifi } from 'lucide-react'
import { InteractiveButton } from './interactive-button'
import { AIScreenMockup } from './ai-screen-mockup'
import type { Cohort, LandingPageData } from '@/src/domain/entities'
import { COHORT_STATUS } from '@/src/application/config/constants'
import { formatCohortDateRange, getRemainingSpots } from '@/src/application/utils/cohort'

interface HeroSectionProps {
  cohort: Cohort
  settings: LandingPageData
  onCTAClick: () => void
}

export function HeroSection({ cohort, settings, onCTAClick }: HeroSectionProps) {
  const scrollToMethod = () => {
    document.querySelector('#metodo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      {/* Gradient orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-chart-3 animate-pulse" />
              <span className="text-sm font-medium text-primary">
                {cohort.status === COHORT_STATUS.OPEN ? 'Inscrições abertas' : 'Em breve'}
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                <span className="gradient-text">{settings.heroTitle}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl text-pretty">
                {settings.heroSubtitle}
              </p>
            </div>

            {/* Cohort Info */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{formatCohortDateRange(cohort)}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">
                  {cohort.price > 0 ? cohort.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Gratuito'}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border">
                <Wifi className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Online ao vivo</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{getRemainingSpots(cohort)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <InteractiveButton
                variant="primary"
                size="lg"
                onClick={onCTAClick}
                glow
              >
                {settings.mainCTA}
                <ArrowRight className="w-5 h-5" />
              </InteractiveButton>
              
              <InteractiveButton
                variant="outline"
                size="lg"
                onClick={scrollToMethod}
              >
                <Play className="w-5 h-5" />
                Ver como funciona
              </InteractiveButton>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-background flex items-center justify-center text-xs font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">+150</span> profissionais já participaram
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative lg:pl-8">
            <AIScreenMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
