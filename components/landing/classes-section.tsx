'use client'

import { Play, CheckCircle2, Sparkles } from 'lucide-react'
import type { FreeClass } from '@/src/domain/entities'

interface ClassesSectionProps {
  classes: FreeClass[]
}

export function ClassesSection({ classes }: ClassesSectionProps) {
  return (
    <section id="aulas" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-chart-3/10 text-chart-3 rounded-full text-sm font-medium mb-6">
            <Play className="w-4 h-4" />
            Aulas gratuitas
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            4 aulas para transformar sua visão sobre <span className="gradient-text">IA aplicada</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Um passo a passo prático para você começar a usar IA de forma profissional no seu negócio.
          </p>
        </div>

        {/* Classes Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-chart-3 hidden md:block" />

            {/* Classes */}
            <div className="space-y-8">
              {classes.map((classItem, index) => (
                <div
                  key={classItem.id}
                  className="group relative md:pl-20"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Number indicator */}
                  <div className="hidden md:flex absolute left-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent items-center justify-center text-2xl font-bold text-primary-foreground group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                    {classItem.order}
                  </div>

                  {/* Card */}
                  <div className="relative p-6 md:p-8 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover-lift overflow-hidden">
                    {/* Mobile number */}
                    <div className="md:hidden absolute top-4 right-4 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg font-bold text-primary-foreground">
                      {classItem.order}
                    </div>

                    {/* Decorative sparkle */}
                    <Sparkles className="absolute top-4 right-4 w-5 h-5 text-primary/20 hidden md:block" />

                    <div className="flex items-start gap-4">
                      <div className="hidden sm:flex w-12 h-12 rounded-xl bg-primary/10 items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 pr-12 md:pr-0">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {classItem.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {classItem.description}
                        </p>
                      </div>
                    </div>

                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
