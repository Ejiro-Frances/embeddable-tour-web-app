"use client"

import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface AuthCardProps {
  children: React.ReactNode
  title: string
  subtitle: string
}


export function AuthCard({ children, title, subtitle }: AuthCardProps) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.matchMedia('(min-width: 1024px)').matches)
    }

    // Initial check
    checkIsDesktop()

    // Add listener for resize/changes
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const variantsMobile = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  const variantsDesktop = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={isDesktop ? variantsDesktop : variantsMobile}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Card className="p-8 shadow-lg border-0 bg-background/50 backdrop-blur-md">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {/* Form Content */}
          {children}
        </div>
      </Card>
    </motion.div>
  )
}
