'use client'

import { Quote, Star, TrendingUp } from 'lucide-react'
import type { Testimonial } from '@/src/domain/entities'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-chart-4/10 text-chart-4 rounded-full text-sm font-medium mb-6">
            Resultados reais
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Veja quem já <span className="gradient-text">transformou</span> seus processos
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Histórias reais de pessoas que aplicaram o método e conquistaram resultados.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
              
              {/* Category badge */}
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-4">
                {testimonial.company || testimonial.role}
              </span>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                {testimonial.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {testimonial.content}
              </p>

              {/* Result */}
              <div className="flex items-center gap-2 p-3 bg-chart-3/10 rounded-xl">
                <TrendingUp className="w-5 h-5 text-chart-3" />
                <span className="text-sm font-semibold text-chart-3">{testimonial.role}</span>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-chart-4 text-chart-4" />
                ))}
              </div>

              {/* Featured badge */}
              {testimonial.isFeatured && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
