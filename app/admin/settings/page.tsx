'use client'

import { useState } from 'react'
import { Settings, Lock, Users, Bell, Save, Shield, Key } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', label: 'Geral', icon: Settings },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'notifications', label: 'Notificações', icon: Bell },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações do sistema
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-card rounded-2xl border border-border p-6">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Informações da Plataforma</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Nome da Plataforma</label>
                  <input
                    type="text"
                    defaultValue="QUAND HUB"
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Slogan</label>
                  <input
                    type="text"
                    defaultValue="Quem Aprende Não Depende"
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email de Contato</label>
                  <input
                    type="email"
                    defaultValue="contato@quandhub.com"
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar alterações
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="p-4 bg-chart-4/10 border border-chart-4/20 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Lock className="w-5 h-5 text-chart-4" />
                <h4 className="font-semibold text-chart-4">Autenticação em desenvolvimento</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                O sistema de autenticação completo será implementado em breve, incluindo login com Google e Microsoft.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Configurações de Acesso</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Login com Google</p>
                      <p className="text-sm text-muted-foreground">Em breve</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-muted-foreground/20 text-muted-foreground rounded-full text-xs">
                    Desativado
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Login com Microsoft</p>
                      <p className="text-sm text-muted-foreground">Em breve</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-muted-foreground/20 text-muted-foreground rounded-full text-xs">
                    Desativado
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Preferências de Notificação</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                  <div>
                    <p className="font-medium">Novos leads</p>
                    <p className="text-sm text-muted-foreground">Receber notificação quando um novo lead se inscrever</p>
                  </div>
                  <button className="w-12 h-6 bg-primary rounded-full relative">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                  <div>
                    <p className="font-medium">Resumo diário</p>
                    <p className="text-sm text-muted-foreground">Receber um resumo diário de atividades</p>
                  </div>
                  <button className="w-12 h-6 bg-muted-foreground/30 rounded-full relative">
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar preferências
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
