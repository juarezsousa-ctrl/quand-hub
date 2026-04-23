'use client'

import Image from 'next/image'
import { Sparkles, ArrowRight, Bot, Cpu, Workflow, Rocket } from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'IA acessível',
    description: 'Ferramentas que qualquer pessoa pode usar sem conhecimento técnico.',
  },
  {
    icon: Cpu,
    title: 'Automação inteligente',
    description: 'Sistemas que aprendem e se adaptam ao seu negócio.',
  },
  {
    icon: Workflow,
    title: 'Processos eficientes',
    description: 'Fluxos de trabalho otimizados e documentados.',
  },
  {
    icon: Rocket,
    title: 'Resultados rápidos',
    description: 'Comece simples e veja resultados em semanas, não meses.',
  },
]

interface OpportunitySectionProps {
  title: string
  text: string
}

export function OpportunitySection({ title, text }: OpportunitySectionProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              A oportunidade
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
              {title}
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              {text}
            </p>

            <div className="flex items-center gap-2 text-primary font-medium group cursor-pointer">
              <span>Descubra como começar</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Features with image */}
          <div className="space-y-4">
            <div className="relative w-full h-60 rounded-2xl overflow-hidden border border-border/50 bg-muted/30 shadow-lg">
              <Image
                src="/images/automation.jpg"
                alt="Automação de Processos"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/40 to-transparent" />
            </div>
            
            {/* Features grid */}
            <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
