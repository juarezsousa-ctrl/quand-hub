'use client'

import { useState, useEffect } from 'react'
import { AnimatedBackground } from '@/components/landing/animated-background'
import { Header } from '@/components/landing/header'
import { HeroSection } from '@/components/landing/hero-section'
import { ProblemSection } from '@/components/landing/problem-section'
import { OpportunitySection } from '@/components/landing/opportunity-section'
import { AudienceSection } from '@/components/landing/audience-section'
import { ClassesSection } from '@/components/landing/classes-section'
import { MethodSection } from '@/components/landing/method-section'
import { BenefitsSection } from '@/components/landing/benefits-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { FAQSection } from '@/components/landing/faq-section'
import { CTASection } from '@/components/landing/cta-section'
import { Footer } from '@/components/landing/footer'
import { LeadFormModal } from '@/components/landing/lead-form-modal'
import type { Cohort, LandingPageData, FreeClass, FAQ, Testimonial, Benefit } from '@/src/domain/entities'
import type { ApiResponse } from '@/src/infrastructure/api/response'

interface LandingData {
  cohort: Cohort
  settings: LandingPageData
  freeClasses: FreeClass[]
  benefits: Benefit[]
  faqs: FAQ[]
  testimonials: Testimonial[]
}

export default function LandingPage() {
  const [data, setData] = useState<LandingData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/landing')
        if (response.ok) {
          const landingData = await response.json() as ApiResponse<LandingData>
          if (landingData.data) {
            setData(landingData.data)
          }
        }
      } catch (error) {
        console.error('[LANDING] Falha ao carregar dados da landing:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleCTAClick = () => {
    setIsModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <p className="text-destructive">Erro ao carregar dados</p>
        </div>
      </div>
    )
  }

  const { cohort, settings, freeClasses, benefits, faqs, testimonials } = data

  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      <Header />
      
      <main>
        <HeroSection cohort={cohort} settings={settings} onCTAClick={handleCTAClick} />
        
        <ProblemSection 
          title={settings.problemTitle} 
          text={settings.problemText} 
        />
        
        <OpportunitySection 
          title={settings.opportunityTitle} 
          text={settings.opportunityText} 
        />
        
        <AudienceSection items={settings.audienceItems} />
        
        <ClassesSection classes={freeClasses} />
        
        <MethodSection 
          title={settings.methodTitle} 
          items={settings.methodItems} 
        />
        
        <BenefitsSection benefits={benefits} />
        
        <TestimonialsSection testimonials={testimonials} />
        
        <FAQSection faqs={faqs} />
        
        <CTASection 
          title={settings.finalCTATitle}
          ctaText={settings.finalCTA}
          onCTAClick={handleCTAClick}
        />
      </main>

      <Footer 
        text={settings.footerText} 
        socialLinks={settings.socialLinks} 
      />

      <LeadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cohortId={cohort.id}
        cohortName={cohort.name}
      />
    </div>
  )
}
