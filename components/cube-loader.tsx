"use client"

import { useEffect } from "react"

interface CubeLoaderProps {
  onLoadComplete?: () => void
  loadingTime?: number
}

export function CubeLoader({ onLoadComplete, loadingTime = 1500 }: CubeLoaderProps) {
  useEffect(() => {
    // This effect is no longer needed as we're handling the timing in the parent component
    // Keeping the props for backward compatibility
  }, [onLoadComplete, loadingTime])

  return (
    <div className="cube-loader-container">
      <div className="loop cubes">
        <div className="item cubes"></div>
        <div className="item cubes"></div>
        <div className="item cubes"></div>
        <div className="item cubes"></div>
        <div className="item cubes"></div>
        <div className="item cubes"></div>
      </div>
    </div>
  )
}
