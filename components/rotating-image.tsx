"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface RotatingImageProps {
  images: string[]
  alt: string
  interval?: number
}

export function RotatingImage({ images, alt, interval = 3000 }: RotatingImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images, interval])

  if (!images || images.length === 0) {
    return null
  }

  if (images.length === 1) {
    return (
      <div className="relative w-full h-full">
        <Image src={images[0] || "/placeholder.svg"} alt={alt} fill className="object-cover" />
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      {images.map((src, index) => (
        <Image
          key={index}
          src={src || "/placeholder.svg"}
          alt={`${alt} ${index + 1}`}
          fill
          className={`object-cover absolute inset-0 transition-all duration-1000 ${
            index === currentIndex ? "opacity-100 rotate-0" : "opacity-0 rotate-12"
          }`}
        />
      ))}
    </div>
  )
}
