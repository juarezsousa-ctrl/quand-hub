'use client'

import { AlertCircle, Clock, RefreshCw, Layers, Users, TrendingDown } from 'lucide-react'

const problems = [
  {
    icon: RefreshCw,
    title: 'Retrabalho constante',
    description: 'Tarefas repetidas que consomem tempo e energia todos os dias.',
  },
  {
    icon: Layers,
    title: 'Processos manuais',
    description: 'Atividades que poderiam ser automatizadas ainda feitas à mão.',
  },
  {
    icon: Clock,
    title: 'Tempo perdido',
    description: 'Horas gastas em tarefas que não geram valor real para o negócio.',
  },
  {
    icon: AlertCircle,
    title: 'Desorganização',
    description: 'Falta de processos claros e documentados na operação.',
  },
  {
    icon: Users,
    title: 'Dependência operacional',
    description: 'Negócio que só funciona quando você está presente.',
  },
  {
    icon: TrendingDown,
    title: 'Baixa produtividade',
    description: 'Equipe sobrecarregada com tarefas que não escalam.',
  },
]

interface ProblemSectionProps {
  title: string
  text: string
}

export function ProblemSection({ title, text }: ProblemSectionProps) {
  return (
    <section id="sobre" className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-destructive/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-destructive/10 text-destructive rounded-full text-sm font-medium mb-6">
            O problema
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            {text}
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className="group relative p-6 bg-card rounded-2xl border border-border hover:border-destructive/30 transition-all duration-300 hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {problem.description}
              </p>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
