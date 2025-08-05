"use client"

import { useEffect, type ReactNode } from "react"

interface GsapProviderProps {
  children: ReactNode
}

export default function GsapProvider({ children }: GsapProviderProps) {
  useEffect(() => {
    // Initialize GSAP here if needed
    // This is a good place to register plugins if required

    return () => {
      // Clean up GSAP if needed
    }
  }, [])

  return <>{children}</>
}
