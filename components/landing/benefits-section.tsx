'use client'

import Image from 'next/image'
import { 
  Lightbulb, 
  RefreshCcw, 
  TrendingUp, 
  FolderOpen, 
  Brain, 
  Layers,
  Zap,
  Target,
  Shield
} from 'lucide-react'
import type { Benefit } from '@/src/domain/entities'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Lightbulb,
  RefreshCcw,
  TrendingUp,
  FolderOpen,
  Brain,
  Layers,
  Zap,
  Target,
  Shield,
}

interface BenefitsSectionProps {
  benefits: Benefit[]
}

export function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <section className="py-24 relative overflow-hidden bg-muted/30">
      {/* Background pattern */}
      <div className="absolute inset-0 neural-bg opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-chart-3/10 text-chart-3 rounded-full text-sm font-medium mb-6">
            Benefícios
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            O que você vai <span className="gradient-text">conquistar</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Transforme a forma como você trabalha e alcance resultados que antes pareciam impossíveis.
          </p>
        </div>

        {/* Analytics Image */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-border/50 bg-muted/30 shadow-2xl">
            <Image
              src="/images/analytics.jpg"
              alt="Analytics e Dados em Tempo Real"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon] || Zap
            return (
              <div
                key={benefit.id}
                className="group relative p-6 bg-card/80 backdrop-blur-sm rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Glow effect */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity blur" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary/30 group-hover:bg-primary/50 transition-colors" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
