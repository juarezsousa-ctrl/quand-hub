'use client'

import { FormEvent, Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, LoaderCircle, LockKeyhole, Sparkles } from 'lucide-react'
import { BRAND } from '@/src/application/config/branding'

interface AuthStatusPayload {
  isConfigured: boolean
  missing: string[]
  bootstrap: {
    adminEmailConfigured: boolean
    adminPasswordHashConfigured: boolean
    sessionSecretConfigured: boolean
  }
  providers: {
    credentials: boolean
    google: boolean
    microsoft: boolean
  }
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<AdminLoginFallback />}>
      <AdminLoginPageContent />
    </Suspense>
  )
}

function AdminLoginFallback() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.18),_transparent_32%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted)/0.25))]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-sm text-muted-foreground shadow-lg">
          <LoaderCircle className="h-4 w-4 animate-spin" />
          Preparando acesso ao admin...
        </div>
      </div>
    </div>
  )
}

function AdminLoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPath = searchParams.get('next') || '/admin'

  const [status, setStatus] = useState<AuthStatusPayload | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoadingStatus, setIsLoadingStatus] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let ignore = false

    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/admin/auth/status', {
          cache: 'no-store',
        })
        const payload = (await response.json()) as ApiResponse<AuthStatusPayload>

        if (!ignore) {
          setStatus(payload.data ?? null)
        }
      } catch (error) {
        console.error('[AUTH] Erro ao carregar status de autenticação:', error)
        if (!ignore) {
          setErrorMessage('Não foi possível carregar o status da autenticação.')
        }
      } finally {
        if (!ignore) {
          setIsLoadingStatus(false)
        }
      }
    }

    fetchStatus()

    return () => {
      ignore = true
    }
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const payload = (await response.json()) as ApiResponse<{ user: { email: string } }>

      if (!response.ok || !payload.success) {
        setErrorMessage(payload.error ?? 'Não foi possível autenticar no admin.')
        setIsSubmitting(false)
        return
      }

      router.replace(nextPath)
      router.refresh()
    } catch (error) {
      console.error('[AUTH] Erro ao enviar login:', error)
      setErrorMessage('Ocorreu um erro ao tentar autenticar.')
      setIsSubmitting(false)
    }
  }

  const isConfigured = status?.isConfigured ?? false

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.18),_transparent_32%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted)/0.25))]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-border/60 bg-card/90 shadow-2xl backdrop-blur md:grid-cols-[1.1fr_0.9fr]">
          <section className="relative hidden overflow-hidden border-r border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-10 md:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.16),transparent_30%),radial-gradient(circle_at_80%_10%,hsl(var(--accent)/0.14),transparent_24%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{BRAND.name}</p>
                    <p className="text-sm text-muted-foreground">{BRAND.adminDescription}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl font-bold leading-tight">
                    Acesso restrito para operação do MVP.
                  </h1>
                  <p className="max-w-md text-base text-muted-foreground">
                    O admin agora exige credenciais válidas, sessão segura em cookie `httpOnly`
                    e está preparado para futura expansão com login corporativo.
                  </p>
                </div>
              </div>

              <div className="space-y-3 rounded-3xl border border-border/60 bg-background/80 p-6">
                <p className="text-sm font-medium">Próximos provedores suportados pela base</p>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span className="rounded-full border border-border px-3 py-1">Email e senha</span>
                  <span className="rounded-full border border-border px-3 py-1">Google</span>
                  <span className="rounded-full border border-border px-3 py-1">Microsoft</span>
                </div>
              </div>
            </div>
          </section>

          <section className="p-6 sm:p-8 md:p-10">
            <div className="mx-auto flex h-full w-full max-w-md flex-col justify-center">
              <Link
                href={BRAND.urls.home}
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar para a landing
              </Link>

              <div className="mb-8 space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <LockKeyhole className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Entrar no admin</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Use o email e a senha configurados para o primeiro administrador.
                  </p>
                </div>
              </div>

              {isLoadingStatus ? (
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm text-muted-foreground">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Validando configuração de autenticação...
                </div>
              ) : null}

              {!isLoadingStatus && status && !isConfigured ? (
                <div className="mb-6 space-y-3 rounded-3xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-amber-950 dark:text-amber-100">
                  <p className="font-semibold">Autenticação ainda não configurada</p>
                  <p>
                    Defina as variáveis abaixo no seu `.env.local` para habilitar o login do
                    admin.
                  </p>
                  <ul className="space-y-1 font-mono text-xs">
                    {status.missing.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-xs">
                    Use <code>pnpm auth:hash-password -- &quot;SuaSenhaSegura&quot;</code> para gerar o hash da senha.
                  </p>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email do admin
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={BRAND.contact.adminEmailExample}
                    className="h-12 w-full rounded-2xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary"
                    disabled={!isConfigured || isSubmitting}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Senha
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Digite sua senha"
                    className="h-12 w-full rounded-2xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary"
                    disabled={!isConfigured || isSubmitting}
                    required
                  />
                </div>

                {errorMessage ? (
                  <div className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {errorMessage}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={!isConfigured || isSubmitting || isLoadingStatus}
                  className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Entrando...' : 'Entrar no painel'}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
