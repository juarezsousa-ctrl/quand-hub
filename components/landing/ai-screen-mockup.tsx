'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Bot, Sparkles, Zap, Check } from 'lucide-react'
import { BRAND } from '@/src/application/config/branding'

const codeLines = [
  '> Analisando processo...',
  '> Identificando padrões...',
  '> Gerando automação...',
  '> Sistema criado com sucesso!',
]

const systemItems = [
  { label: 'Atendimento', status: 'active', icon: '💬' },
  { label: 'Propostas', status: 'processing', icon: '📄' },
  { label: 'Relatórios', status: 'done', icon: '📊' },
  { label: 'Tarefas', status: 'active', icon: '✓' },
]

export function AIScreenMockup() {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (currentLine >= codeLines.length) {
      setTimeout(() => {
        setCurrentLine(0)
        setDisplayedText('')
        setIsTyping(true)
      }, 3000)
      return
    }

    const line = codeLines[currentLine]
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (charIndex <= line.length) {
        setDisplayedText(line.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)
        setTimeout(() => {
          setCurrentLine((prev) => prev + 1)
          setDisplayedText('')
          setIsTyping(true)
        }, 1000)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [currentLine])

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Main screen */}
      <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl border border-border shadow-2xl overflow-hidden">
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-[scan-line_3s_linear_infinite]" />
        </div>

        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-chart-4/60" />
            <div className="w-3 h-3 rounded-full bg-chart-3/60" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-muted-foreground font-mono">{BRAND.aiSystemLabel}</span>
          </div>
          <Bot className="w-4 h-4 text-primary" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* AI Dashboard Image */}
          <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border/50 bg-muted/30">
            <Image
              src="/images/ai-dashboard.jpg"
              alt="AI Dashboard"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
          </div>

          {/* AI Processing */}
          <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium">Assistente IA</span>
              <div className="ml-auto flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-chart-3 animate-pulse" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
            
            <div className="font-mono text-sm text-primary min-h-[24px]">
              {displayedText}
              {isTyping && <span className="animate-[blink_0.8s_step-end_infinite]">|</span>}
            </div>
          </div>

          {/* System Cards */}
          <div className="grid grid-cols-2 gap-2">
            {systemItems.map((item, i) => (
              <div
                key={item.label}
                className="group bg-muted/20 rounded-lg p-3 border border-border/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  {item.status === 'active' && (
                    <>
                      <Zap className="w-3 h-3 text-chart-4" />
                      <span className="text-[10px] text-chart-4">Ativo</span>
                    </>
                  )}
                  {item.status === 'processing' && (
                    <>
                      <div className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      <span className="text-[10px] text-primary">Processando</span>
                    </>
                  )}
                  {item.status === 'done' && (
                    <>
                      <Check className="w-3 h-3 text-chart-3" />
                      <span className="text-[10px] text-chart-3">Concluído</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Progress bars */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Automações ativas</span>
              <span>78%</span>
            </div>
            <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                style={{ width: '78%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Floating icons */}
      <div className="absolute -top-2 right-8 w-10 h-10 bg-card rounded-xl border border-border shadow-lg flex items-center justify-center float-animation">
        <Bot className="w-5 h-5 text-primary" />
      </div>
      <div className="absolute top-1/2 -left-6 w-10 h-10 bg-card rounded-xl border border-border shadow-lg flex items-center justify-center float-animation" style={{ animationDelay: '0.5s' }}>
        <Sparkles className="w-5 h-5 text-accent" />
      </div>
      <div className="absolute -bottom-2 right-12 w-10 h-10 bg-card rounded-xl border border-border shadow-lg flex items-center justify-center float-animation" style={{ animationDelay: '1s' }}>
        <Zap className="w-5 h-5 text-chart-4" />
      </div>
    </div>
  )
}
