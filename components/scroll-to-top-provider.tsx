"use client"

import type React from "react"
import { useEffect } from "react"

import { useScrollTop } from "@/hooks/use-scroll-top"

/**
 * A component that scrolls to the top of the page when the route changes
 */
export function ScrollToTopProvider({ children }: { children: React.ReactNode }) {
  useScrollTop()
  useEffect(() => {
    if (typeof window === "undefined") return
  }, [])
  return <>{children}</>
}
