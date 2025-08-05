"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { CubeLoader } from "./cube-loader"

interface SectionLoaderProps {
  children: React.ReactNode
  id?: string
  className?: string
}

export function SectionLoader({ children, id, className }: SectionLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          // Reset loading state and make section visible when it enters viewport
          setIsLoading(true)
          setIsVisible(true)
        } else {
          // Hide section when it leaves viewport
          setIsVisible(false)
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px", // No margin
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    // Set up timer to hide loader after it becomes visible
    let timer: NodeJS.Timeout
    if (isVisible && isLoading) {
      timer = setTimeout(() => {
        setIsLoading(false)
      }, 1500)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isVisible, isLoading])

  return (
    <div ref={sectionRef} id={id} className={className}>
      {isVisible && (
        <>
          {isLoading && <CubeLoader />}
          <div className={`transition-opacity duration-500 ${!isLoading ? "opacity-100" : "opacity-0"}`}>
            {children}
          </div>
        </>
      )}
    </div>
  )
}
