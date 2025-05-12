"use client"

import { useEffect, useState } from "react"

export const CircleLoader = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative h-60 w-60">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-[rgb(47,0,255)] border-t-transparent rounded-full animate-circle-spin ${
              i % 2 === 0 ? "animate-circle-spin-reverse" : "animate-circle-spin"
            }`}
            style={{
              height: `${(i + 1) * 15}px`,
              width: `${(i + 1) * 15}px`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
