"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface RotatingProductImageProps {
  images: string[]
  alt: string
  interval?: number
  className?: string
}

export function RotatingProductImage({ images, alt, interval = 4000, className = "" }: RotatingProductImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images, interval])

  if (!images || images.length === 0) {
    return (
      <div className={`relative ${className}`}>
        <Image src="/placeholder.svg?height=300&width=300" alt={alt} fill className="object-cover" />
      </div>
    )
  }

  if (images.length === 1) {
    return (
      <div className={`relative ${className}`}>
        <Image src={images[0] || "/placeholder.svg"} alt={alt} fill className="object-cover" />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-110 rotate-3"
          }`}
        >
          <Image src={src || "/placeholder.svg"} alt={`${alt} - View ${index + 1}`} fill className="object-cover" />
        </div>
      ))}

      {/* Image indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white shadow-lg" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
