"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface MediaFallbackHandlerProps {
  src: string
  fallbackSrc?: string
  children: (validSrc: string, isError: boolean) => React.ReactNode
}

export function MediaFallbackHandler({
  src,
  fallbackSrc = "/placeholder.svg?height=500&width=800",
  children,
}: MediaFallbackHandlerProps) {
  const [validSrc, setValidSrc] = useState(src)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    // Check if the media source is accessible
    const checkMedia = async () => {
      try {
        const response = await fetch(src, { method: "HEAD" })
        if (!response.ok) {
          console.warn(`Media resource at ${src} is not available, using fallback`)
          setValidSrc(fallbackSrc)
          setIsError(true)
        }
      } catch (error) {
        console.warn(`Error checking media resource: ${error}`)
        setValidSrc(fallbackSrc)
        setIsError(true)
      }
    }

    checkMedia()
  }, [src, fallbackSrc])

  return <>{children(validSrc, isError)}</>
}
