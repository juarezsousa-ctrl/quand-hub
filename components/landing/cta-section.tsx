'use client'

import { ArrowRight, Sparkles, Zap, Rocket } from 'lucide-react'
import { InteractiveButton } from './interactive-button'

interface CTASectionProps {
  title: string
  ctaText: string
  onCTAClick: () => void
}

export function CTASection({ title, ctaText, onCTAClick }: CTASectionProps) {
  return (
    <section id="inscricao" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-chart-3 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-chart-4 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Card */}
          <div className="relative p-8 md:p-12 lg:p-16 bg-card/80 backdrop-blur-xl rounded-3xl border border-border shadow-2xl overflow-hidden">
            {/* Decorative icons */}
            <div className="absolute top-6 left-6 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center float-animation">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center float-animation" style={{ animationDelay: '0.5s' }}>
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl bg-chart-3/10 flex items-center justify-center float-animation" style={{ animationDelay: '1s' }}>
              <Rocket className="w-6 h-6 text-chart-3" />
            </div>

            {/* Content */}
            <div className="text-center max-w-2xl mx-auto pt-8 pb-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="gradient-text">{title}</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Não perca a oportunidade de transformar a forma como você trabalha. 
                Aprenda a usar IA de forma prática e profissional.
              </p>

              <InteractiveButton
                variant="primary"
                size="lg"
                onClick={onCTAClick}
                glow
                className="text-lg px-10 py-5"
              >
                {ctaText}
                <ArrowRight className="w-6 h-6" />
              </InteractiveButton>

              <p className="mt-6 text-sm text-muted-foreground">
                Vagas limitadas. Garanta seu lugar agora.
              </p>
            </div>

            {/* Glow effects */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-accent/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
