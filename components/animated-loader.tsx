"use client"

import { useEffect, useState, useRef } from "react"
import { Volume2, VolumeX, X } from "lucide-react"
import { motion } from "framer-motion"

export const AnimatedLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [showSkip, setShowSkip] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [showLifeWithStyle, setShowLifeWithStyle] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [lowPerformance, setLowPerformance] = useState(false)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  // Detect performance capabilities
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setReducedMotion(prefersReducedMotion)

    // Simple performance detection
    const detectPerformance = () => {
      // Use a simple heuristic based on device memory and processor count
      // @ts-ignore - navigator.deviceMemory is not in the standard TS types
      const lowMemory = navigator.deviceMemory && navigator.deviceMemory < 4
      const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4

      // Check if it's a mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

      // Set low performance mode if any of these conditions are true
      setLowPerformance(lowMemory || lowCores || isMobile)
    }

    detectPerformance()
  }, [])

  useEffect(() => {
    // Show skip button after a delay
    const skipTimer = setTimeout(() => {
      setShowSkip(true)
    }, 2000)

    // Load audio with error handling
    const audioElement = new Audio()
    try {
      audioElement.src = "/sounds/intro-ambient.mp3"
      audioElement.loop = true
      audioElement.volume = 0.4
      setAudio(audioElement)

      audioElement.addEventListener("canplaythrough", () => {
        setAudioLoaded(true)
      })

      audioElement.addEventListener("error", (e) => {
        console.warn("Audio failed to load:", e)
        setAudioLoaded(false)
      })
    } catch (error) {
      console.warn("Audio initialization failed:", error)
      setAudioLoaded(false)
    }

    // Show the "LIFE WITH STYLE" text after the initial animation
    const textTimer = setTimeout(
      () => {
        setShowLifeWithStyle(true)
      },
      reducedMotion ? 1000 : 4000,
    )

    // Use requestAnimationFrame for smoother animation timing
    startTimeRef.current = performance.now()

    const animate = (timestamp: number) => {
      try {
        if (!startTimeRef.current) startTimeRef.current = timestamp
        const elapsed = timestamp - startTimeRef.current

        // Auto-complete after animation duration (shorter for reduced motion)
        const duration = reducedMotion ? 4000 : lowPerformance ? 6000 : 8000

        if (elapsed >= duration) {
          if (audio) {
            try {
              const fadeInterval = setInterval(() => {
                if (audio.volume > 0.05) {
                  audio.volume -= 0.05
                } else {
                  audio.pause()
                  clearInterval(fadeInterval)
                }
              }, 100)
            } catch (error) {
              console.warn("Audio fade failed:", error)
            }
          }
          onComplete()
          return
        }

        animationRef.current = requestAnimationFrame(animate)
      } catch (error) {
        console.error("Animation frame error:", error)
        onComplete()
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      clearTimeout(skipTimer)
      clearTimeout(textTimer)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (audio) {
        audio.pause()
        audio.src = ""
      }
    }
  }, [onComplete, reducedMotion, lowPerformance])

  const toggleAudio = () => {
    if (!audio || !audioLoaded) return

    try {
      if (audioEnabled) {
        audio.pause()
      } else {
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            console.warn("Audio playback failed:", e)
            setAudioEnabled(false)
          })
        }
      }
      setAudioEnabled(!audioEnabled)
    } catch (error) {
      console.warn("Audio toggle failed:", error)
      setAudioEnabled(false)
    }
  }

  const handleSkip = () => {
    if (audio) {
      audio.pause()
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    onComplete()
  }

  // Letter animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  // Simplified loader for reduced motion
  if (reducedMotion) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#212121] z-50">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif tracking-[0.2em] text-white mb-2">LIFE WITH STYLE</h1>
          <p className="text-sm tracking-[0.15em] text-gray-300 uppercase mb-8">by Tina</p>
          <button
            onClick={handleSkip}
            className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
          >
            Continue to Site
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#212121] z-50">
      {/* SVG Loader Animation - Optimized for performance */}
      <div className="relative z-10 mb-12">
        <div className="loader will-change-transform">
          <svg height={0} width={0} viewBox="0 0 64 64" className="absolute">
            <defs xmlns="http://www.w3.org/2000/svg">
              <linearGradient gradientUnits="userSpaceOnUse" y2={2} x2={0} y1={62} x1={0} id="b">
                <stop stopColor="#973BED" />
                <stop stopColor="#007CFF" offset={1} />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" y2={0} x2={0} y1={64} x1={0} id="c">
                <stop stopColor="#FFC800" />
                <stop stopColor="#FF00FF" offset={1} />
                {!lowPerformance && (
                  <animateTransform
                    repeatCount="indefinite"
                    keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1"
                    keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1"
                    dur="8s"
                    values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32"
                    type="rotate"
                    attributeName="gradientTransform"
                  />
                )}
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" y2={2} x2={0} y1={62} x1={0} id="d">
                <stop stopColor="#00E0ED" />
                <stop stopColor="#00DA72" offset={1} />
              </linearGradient>
            </defs>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 64 64"
            height={64}
            width={64}
            className="inline-block will-change-transform"
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth={8}
              stroke="url(#b)"
              d="M 54.722656,3.9726563 A 2.0002,2.0002 0 0 0 54.941406,4 h 5.007813 C 58.955121,17.046124 49.099667,27.677057 36.121094,29.580078 a 2.0002,2.0002 0 0 0 -1.708985,1.978516 V 60 H 29.587891 V 31.558594 A 2.0002,2.0002 0 0 0 27.878906,29.580078 C 14.900333,27.677057 5.0448787,17.046124 4.0507812,4 H 9.28125 c 1.231666,11.63657 10.984383,20.554048 22.6875,20.734375 a 2.0002,2.0002 0 0 0 0.02344,0 c 11.806958,0.04283 21.70649,-9.003371 22.730469,-20.7617187 z"
              className={lowPerformance ? "dash-simple" : "dash"}
              pathLength={360}
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 64 64"
            height={64}
            width={64}
            className="inline-block will-change-transform"
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth={10}
              stroke="url(#c)"
              d="M 32 32
              m 0 -27
              a 27 27 0 1 1 0 54
              a 27 27 0 1 1 0 -54"
              className={lowPerformance ? "spin-simple" : "spin"}
              pathLength={360}
            />
          </svg>
          <div className="w-2" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 64 64"
            height={64}
            width={64}
            className="inline-block will-change-transform"
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth={8}
              stroke="url(#d)"
              d="M 4,4 h 4.6230469 v 25.919922 c -0.00276,11.916203 9.8364941,21.550422 21.7500001,21.296875 11.616666,-0.240651 21.014356,-9.63894 21.253906,-21.25586 a 2.0002,2.0002 0 0 0 0,-0.04102 V 4 H 56.25 v 25.919922 c 0,14.33873 -11.581192,25.919922 -25.919922,25.919922 a 2.0002,2.0002 0 0 0 -0.0293,0 C 15.812309,56.052941 3.998433,44.409961 4,29.919922 Z"
              className={lowPerformance ? "dash-simple" : "dash"}
              pathLength={360}
            />
          </svg>
        </div>
      </div>

      {/* Life With Style Text - Now with letter-by-letter animation */}
      {showLifeWithStyle && (
        <div className="relative z-10 text-center">
          <motion.div
            className="flex justify-center mb-2 overflow-hidden"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {Array.from("LIFE WITH STYLE").map((letter, index) => (
              <motion.span
                key={index}
                variants={child}
                className="text-4xl md:text-5xl font-serif tracking-[0.2em] text-white inline-block"
                style={{
                  display: "inline-block",
                  marginRight: letter === " " ? "0.5em" : "0",
                  width: letter === " " ? "0.5em" : "auto",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            className="text-sm tracking-[0.15em] text-gray-300 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            by Tina
          </motion.p>
        </div>
      )}

      {/* Loading bar - simplified for low performance */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-48 h-px bg-gray-700">
        <div className="h-full bg-gradient-to-r from-[#973BED] to-[#00DA72] animate-progress-bar-optimized"></div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 right-8 flex items-center space-x-4">
        {audioLoaded && (
          <button
            onClick={toggleAudio}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            aria-label={audioEnabled ? "Mute audio" : "Enable audio"}
          >
            {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        )}
        {showSkip && (
          <button
            onClick={handleSkip}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            aria-label="Skip intro"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  )
}

export default AnimatedLoader
