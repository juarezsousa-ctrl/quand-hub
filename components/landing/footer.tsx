'use client'

import { Sparkles, Instagram, Linkedin, Youtube, Mail, MapPin } from 'lucide-react'
import type { SocialLink } from '@/src/domain/entities'

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
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none">QUAND HUB</span>
                <span className="text-[10px] text-muted-foreground leading-none mt-0.5">Quem Aprende Não Depende</span>
              </div>
            </a>
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
              <li><a href="#sobre" className="hover:text-foreground transition-colors">Sobre</a></li>
              <li><a href="#aulas" className="hover:text-foreground transition-colors">Aulas</a></li>
              <li><a href="#metodo" className="hover:text-foreground transition-colors">Método</a></li>
              <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>contato@quandhub.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} QUAND HUB. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
            <a href="#" className="hover:text-foreground transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
