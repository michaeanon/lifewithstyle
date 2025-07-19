"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface VideoFallbackProps {
  sources: { src: string; type: string }[]
  poster?: string
  className?: string
  style?: React.CSSProperties
}

export function VideoFallback({ sources, poster, className, style }: VideoFallbackProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Check if at least one source is playable
    const video = document.createElement("video")

    let canPlay = false
    sources.forEach((source) => {
      if (video.canPlayType(source.type)) {
        canPlay = true
      }
    })

    if (!canPlay) {
      setHasError(true)
    }

    setIsLoading(false)
  }, [sources])

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`} style={style}>
        <div className="animate-pulse">Loading video...</div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`} style={style}>
        <div className="text-center p-4">
          <p>Video cannot be played in your browser.</p>
          <p className="text-sm text-gray-500 mt-2">Please try a different browser or device.</p>
        </div>
      </div>
    )
  }

  return (
    <video autoPlay loop muted playsInline className={className} style={style} poster={poster}>
      {sources.map((source, index) => (
        <source key={index} src={source.src} type={source.type} />
      ))}
      Your browser does not support the video tag.
    </video>
  )
}
