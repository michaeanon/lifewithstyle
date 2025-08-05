"use client"

import type React from "react"
import { useEffect } from "react"
import { useScrollTop } from "@/hooks/use-scroll-top"

/**
 * A component that scrolls to the top of the page when the route changes
 */
export function ScrollToTopProvider({ children }: { children: React.ReactNode }) {
  useScrollTop()

  // Additional scroll to top on mount and when component updates
  useEffect(() => {
    const scrollToTop = () => {
      if (typeof window !== "undefined") {
        // Multiple scroll methods for better compatibility
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        })

        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0

        // Force scroll using requestAnimationFrame
        requestAnimationFrame(() => {
          window.scrollTo(0, 0)
        })
      }
    }

    scrollToTop()

    // Also handle when images or other content loads
    const handleLoad = () => scrollToTop()
    window.addEventListener("load", handleLoad)

    return () => {
      window.removeEventListener("load", handleLoad)
    }
  }, [])

  return <>{children}</>
}
