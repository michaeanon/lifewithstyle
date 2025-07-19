"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, Construction } from "lucide-react"
import { Button } from "@/components/ui/button"

// Time period after which to show the welcome banner again (in milliseconds)
const INACTIVITY_PERIOD = 2 * 24 * 60 * 60 * 1000 // 2 days

export const WelcomeBanner = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const checkConditions = () => {
      try {
        // Check if mobile device
        const checkMobile = () => {
          setIsMobile(window.innerWidth < 640)
        }

        // Initial check
        checkMobile()

        // Add resize listener
        const handleResize = () => checkMobile()
        window.addEventListener("resize", handleResize)

        // Check if enough time has passed since the last visit
        const lastVisitTimestamp = localStorage.getItem("lastVisitTimestamp")
        const currentTime = Date.now()

        const shouldShowWelcome =
          !lastVisitTimestamp || currentTime - Number.parseInt(lastVisitTimestamp || "0", 10) > INACTIVITY_PERIOD

        if (shouldShowWelcome) {
          const handleIntroLoaderFinished = () => {
            showWelcomeBanner()
          }

          window.addEventListener("introLoaderFinished", handleIntroLoaderFinished)

          // If there's no intro loader, show banner directly
          const hasSeenIntro = localStorage.getItem("hasSeenIntro") === "true"
          const introLastShown = localStorage.getItem("introLastShown")

          if (hasSeenIntro && introLastShown) {
            setTimeout(() => {
              showWelcomeBanner()
            }, 1000)
          }

          return () => {
            window.removeEventListener("introLoaderFinished", handleIntroLoaderFinished)
            window.removeEventListener("resize", handleResize)
          }
        }

        return () => {
          window.removeEventListener("resize", handleResize)
        }
      } catch (error) {
        console.warn("Error in welcome banner setup:", error)
        return () => {}
      }
    }

    const cleanup = checkConditions()
    return cleanup
  }, [])

  const showWelcomeBanner = () => {
    try {
      setIsVisible(true)

      // Update the last visit timestamp
      localStorage.setItem("lastVisitTimestamp", Date.now().toString())

      // Sequence the animations - use shorter delays on mobile
      const timeline = [
        { phase: 1, delay: isMobile ? 300 : 500 },
        { phase: 2, delay: isMobile ? 1000 : 1500 },
        { phase: 3, delay: isMobile ? 2000 : 3000 },
      ]

      // Set up animation sequence
      const timers = timeline.map(({ phase, delay }) =>
        setTimeout(() => {
          setAnimationPhase(phase)
        }, delay),
      )

      // Auto-hide after 15 seconds if not manually closed
      const hideTimer = setTimeout(() => {
        handleClose()
      }, 15000)

      return () => {
        timers.forEach((timer) => clearTimeout(timer))
        clearTimeout(hideTimer)
      }
    } catch (error) {
      console.warn("Error showing welcome banner:", error)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    try {
      localStorage.setItem("hasSeenWelcome", "true")
      window.dispatchEvent(new Event("welcomeBannerFinished"))
    } catch (error) {
      console.warn("Error closing welcome banner:", error)
    }
  }

  // Don't render anything until mounted
  if (!isMounted || !isVisible) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 py-2"
      >
        <div className="relative w-full max-w-4xl">
          <div className="relative overflow-hidden rounded-lg shadow-lg border border-rose-200 bg-gradient-to-r from-rose-50 via-white to-rose-50">
            <div className="relative px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between">
              {/* Welcome message */}
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left mb-2 sm:mb-0 w-full sm:w-auto">
                <div className="mb-2 sm:mb-0 sm:mr-3 bg-gradient-to-br from-rose-400 to-orange-300 p-1.5 sm:p-2 rounded-full">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>

                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: animationPhase >= 1 ? 1 : 0, y: animationPhase >= 1 ? 0 : 10 }}
                    className="font-serif text-base sm:text-lg font-medium"
                  >
                    Welcome to Life with Style by Tina
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: animationPhase >= 2 ? 1 : 0, y: animationPhase >= 2 ? 0 : 5 }}
                    className="text-xs sm:text-sm text-gray-600 flex items-center justify-center sm:justify-start"
                  >
                    <Construction className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 text-orange-400 flex-shrink-0" />
                    <span>Website under development — more curated products coming soon</span>
                  </motion.div>
                </div>
              </div>

              {/* Close button */}
              <Button variant="ghost" size="sm" onClick={handleClose} className="text-gray-600 hover:bg-white/20 ml-4">
                <X className="h-4 w-4" />
                <span className="sr-only">Close banner</span>
              </Button>
            </div>

            {/* Animated sparkles */}
            {animationPhase >= 3 && (
              <>
                {[...Array(isMobile ? 3 : 5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-rose-300 rounded-full"
                    style={{
                      top: `${10 + Math.random() * 80}%`,
                      left: `${10 + Math.random() * 80}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: Math.random() * 4,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default WelcomeBanner
