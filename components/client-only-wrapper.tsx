"use client"

import { useState, useEffect, type ReactNode } from "react"

interface ClientOnlyProps {
  children: ReactNode
  fallback?: ReactNode
}

function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

export default ClientOnly
export { ClientOnly, ClientOnly as ClientOnlyWrapper }
