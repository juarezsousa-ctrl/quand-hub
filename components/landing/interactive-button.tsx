'use client'

import { useState, useRef, type MouseEvent as ReactMouseEvent } from 'react'
import { cn } from '@/lib/utils'

interface InteractiveButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  glow?: boolean
}

export function InteractiveButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  glow = false,
}: InteractiveButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = { x, y, id: Date.now() }
    setRipples((prev) => [...prev, newRipple])

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)

    onClick?.()
  }

  const baseStyles = 'relative overflow-hidden font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2'
  
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:shadow-[0_0_30px_rgba(0,188,212,0.5)]',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        glow && 'animate-[pulse-glow_2s_infinite]',
        isHovered && 'transform -translate-y-1',
        className
      )}
    >
      {/* Shimmer effect */}
      <span 
        className={cn(
          'absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-700',
          isHovered && 'translate-x-full'
        )}
      />
      
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-[ping_0.6s_ease-out]"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  )
}
