"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FashionIntroLoaderProps {
  onComplete: () => void
}

export default function FashionIntroLoader({ onComplete }: FashionIntroLoaderProps) {
  const [currentStage, setCurrentStage] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [lowPerformance, setLowPerformance] = useState(false)
  const [progress, setProgress] = useState(0)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  // Detect performance capabilities
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setReducedMotion(prefersReducedMotion)

    // Simple performance detection
    const detectPerformance = () => {
      // @ts-ignore - navigator.deviceMemory is not in the standard TS types
      const lowMemory = navigator.deviceMemory && navigator.deviceMemory < 4
      const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setLowPerformance(lowMemory || lowCores || isMobile)
    }

    detectPerformance()
  }, [])

  useEffect(() => {
    // Animation timing
    startTimeRef.current = performance.now()

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current

      // Total animation duration
      const duration = reducedMotion ? 4000 : lowPerformance ? 6000 : 8000

      // Update progress
      const newProgress = Math.min(elapsed / duration, 1)
      setProgress(newProgress)

      // Update stages
      if (newProgress >= 0.15 && currentStage < 1) {
        setCurrentStage(1)
      }
      if (newProgress >= 0.35 && currentStage < 2) {
        setCurrentStage(2)
      }
      if (newProgress >= 0.65 && currentStage < 3) {
        setCurrentStage(3)
      }

      // Complete animation
      if (elapsed >= duration) {
        onComplete()
        return
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [onComplete, reducedMotion, lowPerformance])

  // Simplified loader for reduced motion
  if (reducedMotion) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black z-50">
        <div className="text-center">
          <p className="text-xl text-gray-300 mb-2">Welcome to</p>
          <h1 className="text-4xl md:text-5xl font-serif tracking-[0.2em] text-white mb-2">LIFE WITH STYLE</h1>
          <p className="text-sm tracking-[0.15em] text-gray-400 uppercase mb-8">by Tina</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #1a1a2e 100%)",
          }}
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #1a1a2e 100%)",
              "radial-gradient(circle at 30% 70%, #2d1b69 0%, #11998e 25%, #38ef7d 50%, #1a1a2e 100%)",
              "radial-gradient(circle at 70% 30%, #667eea 0%, #764ba2 25%, #f093fb 50%, #1a1a2e 100%)",
              "radial-gradient(circle at 50% 50%, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #1a1a2e 100%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Floating geometric shapes */}
        {!lowPerformance && (
          <>
            {/* Large floating circles */}
            <motion.div
              className="absolute w-96 h-96 rounded-full opacity-10"
              style={{
                background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                top: "10%",
                left: "10%",
                filter: "blur(40px)",
              }}
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -80, 60, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute w-80 h-80 rounded-full opacity-15"
              style={{
                background: "linear-gradient(45deg, #ec4899, #f97316)",
                top: "60%",
                right: "15%",
                filter: "blur(30px)",
              }}
              animate={{
                x: [0, -120, 80, 0],
                y: [0, 90, -70, 0],
                scale: [1, 0.7, 1.3, 1],
              }}
              transition={{
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2,
              }}
            />

            <motion.div
              className="absolute w-64 h-64 rounded-full opacity-12"
              style={{
                background: "linear-gradient(45deg, #22c55e, #06b6d4)",
                bottom: "20%",
                left: "20%",
                filter: "blur(35px)",
              }}
              animate={{
                x: [0, 150, -100, 0],
                y: [0, -60, 40, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{
                duration: 18,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 4,
              }}
            />

            {/* Animated mesh overlay */}
            <motion.div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
                  radial-gradient(circle at 75% 75%, #ec4899 2px, transparent 2px),
                  radial-gradient(circle at 25% 75%, #22c55e 2px, transparent 2px),
                  radial-gradient(circle at 75% 25%, #f97316 2px, transparent 2px)
                `,
                backgroundSize: "100px 100px, 120px 120px, 80px 80px, 90px 90px",
              }}
              animate={{
                backgroundPosition: ["0% 0%, 0% 0%, 0% 0%, 0% 0%", "100% 100%, -100% 100%, 100% -100%, -100% -100%"],
              }}
              transition={{
                duration: 30,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            {/* Floating particles */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: [
                    "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                    "linear-gradient(45deg, #ec4899, #f97316)",
                    "linear-gradient(45deg, #22c55e, #06b6d4)",
                    "linear-gradient(45deg, #eab308, #f59e0b)",
                  ][i % 4],
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.3,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 100 - 50, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: Math.random() * 5,
                }}
              />
            ))}

            {/* Animated lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
              <defs>
                <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              <motion.path
                d="M0,100 Q400,50 800,200 T1600,150"
                stroke="url(#lineGradient1)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
              <motion.path
                d="M0,300 Q600,150 1200,400 T2400,250"
                stroke="url(#lineGradient2)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ duration: 4, ease: "easeInOut", delay: 1 }}
              />
            </svg>
          </>
        )}

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Animated colorful text */}
      <div className="relative flex flex-col items-center justify-center z-10">
        {/* Welcome To */}
        <AnimatePresence>
          {currentStage >= 1 && (
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {["W", "E", "L", "C", "O", "M", "E", " ", "T", "O"].map((letter, index) => (
                <motion.span
                  key={`welcome-${index}`}
                  className={`text-2xl md:text-3xl font-light tracking-wider inline-block ${
                    letter === " " ? "w-2" : ""
                  }`}
                  style={{
                    background:
                      letter === " "
                        ? "transparent"
                        : index % 7 === 0
                          ? "linear-gradient(45deg, #3b82f6, #8b5cf6)"
                          : index % 7 === 1
                            ? "linear-gradient(45deg, #8b5cf6, #ec4899)"
                            : index % 7 === 2
                              ? "linear-gradient(45deg, #ec4899, #f97316)"
                              : index % 7 === 3
                                ? "linear-gradient(45deg, #f97316, #eab308)"
                                : index % 7 === 4
                                  ? "linear-gradient(45deg, #eab308, #22c55e)"
                                  : index % 7 === 5
                                    ? "linear-gradient(45deg, #22c55e, #06b6d4)"
                                    : "linear-gradient(45deg, #06b6d4, #3b82f6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: letter === " " ? "transparent" : "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))",
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* LIFE WITH STYLE - Main animated text */}
          {currentStage >= 2 && (
            <motion.div
              className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {/* LIFE */}
              <motion.div className="flex">
                {["L", "I", "F", "E"].map((letter, index) => (
                  <motion.span
                    key={`life-${index}`}
                    className="text-6xl md:text-8xl font-bold tracking-wider"
                    style={{
                      background:
                        index === 0
                          ? "linear-gradient(45deg, #3b82f6, #8b5cf6)"
                          : index === 1
                            ? "linear-gradient(45deg, #8b5cf6, #ec4899)"
                            : index === 2
                              ? "linear-gradient(45deg, #ec4899, #f97316)"
                              : "linear-gradient(45deg, #f97316, #eab308)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))",
                    }}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>

              {/* WITH */}
              <motion.div className="flex">
                {["W", "I", "T", "H"].map((letter, index) => (
                  <motion.span
                    key={`with-${index}`}
                    className="text-6xl md:text-8xl font-bold tracking-wider"
                    style={{
                      background:
                        index === 0
                          ? "linear-gradient(45deg, #eab308, #22c55e)"
                          : index === 1
                            ? "linear-gradient(45deg, #22c55e, #06b6d4)"
                            : index === 2
                              ? "linear-gradient(45deg, #06b6d4, #3b82f6)"
                              : "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 0 20px rgba(34, 197, 94, 0.4))",
                    }}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.4 + index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>

              {/* STYLE */}
              <motion.div className="flex">
                {["S", "T", "Y", "L", "E"].map((letter, index) => (
                  <motion.span
                    key={`style-${index}`}
                    className="text-6xl md:text-8xl font-bold tracking-wider"
                    style={{
                      background:
                        index === 0
                          ? "linear-gradient(45deg, #8b5cf6, #ec4899)"
                          : index === 1
                            ? "linear-gradient(45deg, #ec4899, #f97316)"
                            : index === 2
                              ? "linear-gradient(45deg, #f97316, #eab308)"
                              : index === 3
                                ? "linear-gradient(45deg, #eab308, #22c55e)"
                                : "linear-gradient(45deg, #22c55e, #06b6d4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 0 20px rgba(236, 72, 153, 0.4))",
                    }}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.8 + index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* BY TINA */}
          {currentStage >= 3 && (
            <motion.div
              className="flex justify-center items-center mt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {["B", "Y", " ", "T", "I", "N", "A"].map((letter, index) => (
                <motion.span
                  key={`bytina-${index}`}
                  className={`text-2xl md:text-3xl font-light tracking-[0.2em] inline-block ${
                    letter === " " ? "w-4" : ""
                  }`}
                  style={{
                    background:
                      letter === " "
                        ? "transparent"
                        : index === 0
                          ? "linear-gradient(45deg, #06b6d4, #3b82f6)"
                          : index === 1
                            ? "linear-gradient(45deg, #3b82f6, #8b5cf6)"
                            : index === 3
                              ? "linear-gradient(45deg, #8b5cf6, #ec4899)"
                              : index === 4
                                ? "linear-gradient(45deg, #ec4899, #f97316)"
                                : index === 5
                                  ? "linear-gradient(45deg, #f97316, #eab308)"
                                  : "linear-gradient(45deg, #eab308, #22c55e)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: letter === " " ? "transparent" : "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-48 h-[2px] bg-white/20 z-10">
        <motion.div
          className="h-full"
          style={{
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #f97316, #eab308, #22c55e, #06b6d4)",
            boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
          }}
        />
      </div>
    </div>
  )
}
