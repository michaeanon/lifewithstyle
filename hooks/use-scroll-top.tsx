"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * A hook that scrolls to the top of the page when the pathname changes
 */
export function useScrollTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const scrollToTop = () => {
      if (typeof window !== "undefined") {
        // Try multiple methods to ensure scroll works
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        })

        // Fallback for older browsers
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0

        // Additional fallback using requestAnimationFrame
        requestAnimationFrame(() => {
          window.scrollTo(0, 0)
        })
      }
    }

    // Immediate scroll
    scrollToTop()

    // Also scroll after a small delay to handle any async content loading
    const timeoutId = setTimeout(scrollToTop, 100)

    return () => clearTimeout(timeoutId)
  }, [pathname])
}
