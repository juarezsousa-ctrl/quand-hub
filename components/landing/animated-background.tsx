'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  connections: number[]
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000))
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          connections: [],
        })
      }
      particlesRef.current = particles
    }

    const drawParticle = (p: Particle) => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 188, 212, ${p.opacity})`
      ctx.fill()
      
      // Glow effect
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
      gradient.addColorStop(0, `rgba(0, 188, 212, ${p.opacity * 0.3})`)
      gradient.addColorStop(1, 'rgba(0, 188, 212, 0)')
      ctx.fillStyle = gradient
      ctx.fill()
    }

    const drawConnections = () => {
      const particles = particlesRef.current
      const maxDistance = 150
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 188, 212, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }

        // Connect to mouse
        const dx = particles[i].x - mouseRef.current.x
        const dy = particles[i].y - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 200) {
          const opacity = (1 - distance / 200) * 0.5
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
          ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
      }
    }

    const updateParticles = () => {
      const particles = particlesRef.current
      
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        
        // Mouse repulsion
        const dx = p.x - mouseRef.current.x
        const dy = p.y - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const force = (100 - distance) / 100
          p.vx += (dx / distance) * force * 0.02
          p.vy += (dy / distance) * force * 0.02
        }
        
        // Limit velocity
        const maxVel = 2
        const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (vel > maxVel) {
          p.vx = (p.vx / vel) * maxVel
          p.vy = (p.vy / vel) * maxVel
        }
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      drawConnections()
      particlesRef.current.forEach(drawParticle)
      updateParticles()
      
      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resizeCanvas()
    createParticles()
    animate()

    window.addEventListener('resize', () => {
      resizeCanvas()
      createParticles()
    })
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
