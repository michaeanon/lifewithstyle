"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * A hook that scrolls to the top of the page when the pathname changes
 */
export function useScrollTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    })
  }, [pathname])
}
