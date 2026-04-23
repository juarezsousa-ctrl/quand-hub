'use client'

import { Map, Layout, Cpu, Rocket, ArrowRight } from 'lucide-react'
import type { MethodItem } from '@/src/domain/entities'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  M: Map,
  A: Layout,
  P: Cpu,
}

const getIcon = (letter: string, index: number) => {
  if (letter === 'A' && index === 3) return Rocket
  return iconMap[letter] || Map
}

interface MethodSectionProps {
  title: string
  items: MethodItem[]
}

export function MethodSection({ title, items }: MethodSectionProps) {
  return (
    <section id="metodo" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      {/* Decorative circles */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full border border-primary/10" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full border border-accent/10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            A metodologia
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">{title}</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Um método simples e direto para transformar processos manuais em sistemas inteligentes com IA.
          </p>
        </div>

        {/* Method Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => {
            const Icon = getIcon(item.letter, index)
            return (
              <div
                key={item.id}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Arrow connector (hidden on last item) */}
                {index < items.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                    <ArrowRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}

                <div className="h-full p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 hover-lift">
                  {/* Letter badge */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                      {item.letter}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Step number */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                    {item.order}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
