"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, X } from "lucide-react"

interface IntroLoaderProps {
  onComplete: () => void
}

function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [showSkip, setShowSkip] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)

  useEffect(() => {
    // Show skip button after 2 seconds
    const skipTimer = setTimeout(() => {
      setShowSkip(true)
    }, 2000)

    // Auto-complete after 5 seconds
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 5000)

    // Phase progression
    const phaseTimer = setTimeout(() => {
      setCurrentPhase(1)
    }, 1000)

    return () => {
      clearTimeout(skipTimer)
      clearTimeout(completeTimer)
      clearTimeout(phaseTimer)
    }
  }, [onComplete])

  const handleSkip = () => {
    onComplete()
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-20" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            {/* Logo Animation */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <motion.div
                className="absolute inset-0 border-4 border-rose-300 rounded-full"
                initial={{ rotate: 0, scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-4 border-2 border-purple-300 rounded-full"
                initial={{ rotate: 0, scale: 0 }}
                animate={{ rotate: -360, scale: 1 }}
                transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <span className="text-3xl font-serif font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                  LS
                </span>
              </motion.div>
            </div>

            {/* Text Animation */}
            <motion.h1
              className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: currentPhase >= 1 ? 1 : 0, y: currentPhase >= 1 ? 0 : 20 }}
              transition={{ duration: 0.8 }}
            >
              Life with Style
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 italic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: currentPhase >= 1 ? 1 : 0, y: currentPhase >= 1 ? 0 : 10 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              by Tina
            </motion.p>
          </motion.div>

          {/* Loading Animation */}
          <motion.div
            className="flex justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 right-8 flex items-center space-x-4">
          <button
            onClick={toggleMute}
            className="p-3 rounded-full bg-white/80 hover:bg-white transition-colors shadow-lg"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-gray-600" /> : <Volume2 className="w-5 h-5 text-gray-600" />}
          </button>

          {showSkip && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleSkip}
              className="p-3 rounded-full bg-white/80 hover:bg-white transition-colors shadow-lg"
            >
              <X className="w-5 h-5 text-gray-600" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default IntroLoader
export { IntroLoader }
