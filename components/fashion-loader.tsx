"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export const FashionLoader = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 7000) // 7 seconds
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key="loader"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-black/60 rounded-xl p-8 shadow-[0_0_40px_rgba(255,125,125,0.3)] backdrop-blur-sm"
          >
            {/* Smaller circular container */}
            <div className="w-48 h-48 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-orange-300 rounded-full blur-md opacity-80 animate-pulse"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white rounded-full overflow-hidden bg-black/80 z-10 border-2 border-rose-300">
                <div className="absolute inset-0 opacity-20">
                  <Image
                    src="/placeholder.svg?height=192&width=192"
                    alt="Background texture"
                    width={192}
                    height={192}
                    className="object-cover"
                  />
                </div>

                {/* Sparkles */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-70"
                    style={{
                      top: `${Math.sin(i * (Math.PI / 4)) * 45 + 50}%`,
                      left: `${Math.cos(i * (Math.PI / 4)) * 45 + 50}%`,
                      animation: `twinkle ${1 + Math.random() * 2}s infinite ${Math.random() * 1}s ease-in-out`,
                    }}
                  ></div>
                ))}

                <div className="text-center space-y-1">
                  <div className="text-sm uppercase tracking-wider font-light">Welcome to</div>
                  <div className="text-xl font-serif tracking-wider text-rose-200">NEW LIFE</div>
                  <div className="text-sm uppercase tracking-wider font-light">with style</div>
                </div>
              </div>
            </div>

            {/* Development message below the circle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-center mt-6 text-white/90"
            >
              <p className="text-sm font-light">Website under development</p>
              <p className="text-xs text-rose-200/80 mt-1">More curative products will be updated soon</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
