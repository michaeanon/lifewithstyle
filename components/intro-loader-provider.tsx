"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface IntroLoaderContextType {
  showIntroLoader: boolean
  setShowIntroLoader: (show: boolean) => void
  hasShownIntro: boolean
  setHasShownIntro: (shown: boolean) => void
}

const IntroLoaderContext = createContext<IntroLoaderContextType | undefined>(undefined)

export function IntroLoaderProvider({ children }: { children: ReactNode }) {
  const [showIntroLoader, setShowIntroLoader] = useState(false)
  const [hasShownIntro, setHasShownIntro] = useState(true) // Default to true for SSR
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Mark as client-side after hydration
    setIsClient(true)

    // Check if intro has been shown before
    const hasShown = localStorage.getItem("hasShownIntro") === "true"
    setHasShownIntro(hasShown)

    // Show intro loader if it hasn't been shown before
    if (!hasShown) {
      setShowIntroLoader(true)
    }
  }, [])

  const handleSetHasShownIntro = (shown: boolean) => {
    setHasShownIntro(shown)
    if (isClient) {
      localStorage.setItem("hasShownIntro", shown.toString())
    }
  }

  const value = {
    showIntroLoader,
    setShowIntroLoader,
    hasShownIntro,
    setHasShownIntro: handleSetHasShownIntro,
  }

  return <IntroLoaderContext.Provider value={value}>{children}</IntroLoaderContext.Provider>
}

export function useIntroLoader() {
  const context = useContext(IntroLoaderContext)
  if (context === undefined) {
    // Return safe defaults during SSR or if provider is missing
    return {
      showIntroLoader: false,
      setShowIntroLoader: () => {},
      hasShownIntro: true,
      setHasShownIntro: () => {},
    }
  }
  return context
}

// ⬇️ NEW – keep the named export above, then add this line
export default IntroLoaderProvider
