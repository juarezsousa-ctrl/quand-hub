'use client'

import { Building2, Briefcase, User, Users, GraduationCap, Wrench } from 'lucide-react'
import type { AudienceItem } from '@/src/domain/entities'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Briefcase,
  User,
  Users,
  GraduationCap,
  Wrench,
}

interface AudienceSectionProps {
  items: AudienceItem[]
}

export function AudienceSection({ items }: AudienceSectionProps) {
  return (
    <section className="py-24 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            Para quem é
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Feito para quem quer <span className="gradient-text">transformar</span> o negócio com IA
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Se você quer usar inteligência artificial de forma prática e profissional, este conteúdo é para você.
          </p>
        </div>

        {/* Audience Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || User
            return (
              <div
                key={item.id}
                className="group relative p-8 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 hover-lift text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Icon */}
                <div className="relative w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="relative text-xl font-semibold mb-3">{item.title}</h3>
                <p className="relative text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-1/2 transition-all duration-300" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
