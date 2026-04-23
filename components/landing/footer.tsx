'use client'

import Link from 'next/link'
import { Sparkles, Instagram, Linkedin, Youtube, Mail, MapPin } from 'lucide-react'
import type { SocialLink } from '@/src/domain/entities'
import { BRAND, LANDING_NAV_LINKS } from '@/src/application/config/branding'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram,
  Linkedin,
  Youtube,
}

interface FooterProps {
  text: string
  socialLinks: SocialLink[]
}

export function Footer({ text, socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative pt-16 pb-8 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href={BRAND.urls.home} className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none">{BRAND.name}</span>
                <span className="text-[10px] text-muted-foreground leading-none mt-0.5">{BRAND.slogan}</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-4">
              {text}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon] || Instagram
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {LANDING_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>{BRAND.contact.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{BRAND.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} {BRAND.name}. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href={BRAND.urls.privacy} className="hover:text-foreground transition-colors">Privacidade</a>
            <a href={BRAND.urls.terms} className="hover:text-foreground transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
