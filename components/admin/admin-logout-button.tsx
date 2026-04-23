'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export function AdminLogoutButton() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const handleLogout = async () => {
    setIsPending(true)

    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
      })

      router.replace('/admin/login')
      router.refresh()
    } catch (error) {
      console.error('[AUTH] Erro ao realizar logout:', error)
      setIsPending(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all disabled:opacity-60"
    >
      <LogOut className="w-5 h-5" />
      <span className="font-medium">{isPending ? 'Saindo...' : 'Sair do admin'}</span>
    </button>
  )
}
