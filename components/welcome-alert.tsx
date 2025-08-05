"use client"

import { useState, useEffect } from "react"
import { X, Sparkles, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface WelcomeAlertProps {
  isVisible: boolean
  onClose: () => void
}

export default function WelcomeAlert({ isVisible, onClose }: WelcomeAlertProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const duration = 8000 // 8 seconds
    const interval = 50 // Update every 50ms
    const increment = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment
        if (newProgress >= 100) {
          clearInterval(timer)
          setTimeout(onClose, 200) // Small delay before closing
          return 100
        }
        return newProgress
      })
    }, interval)

    return () => clearInterval(timer)
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Welcome Card */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[95] w-full max-w-md mx-4">
        <Card className="relative overflow-hidden bg-gradient-to-br from-[#f8f5f0] via-white to-[#f8f5f0] border-2 border-[#d4b59e]/30 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
          {/* Progress bar */}
          <div
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#d4b59e] to-[#a99685] transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[#8c7a6b] hover:text-[#5c4f45] transition-all duration-200 shadow-sm z-10"
          >
            <X size={16} />
          </button>

          <CardContent className="p-8 text-center relative">
            {/* Decorative elements */}
            <div className="absolute top-6 left-6 text-[#d4b59e]/30">
              <Sparkles size={20} />
            </div>
            <div className="absolute bottom-6 right-6 text-[#d4b59e]/30">
              <Heart size={18} />
            </div>

            {/* Animated welcome text */}
            <div className="mb-6 animate-in fade-in-50 duration-700 delay-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#d4b59e] to-[#a99685] flex items-center justify-center">
                <div className="animate-spin">
                  <Sparkles className="text-white" size={24} />
                </div>
              </div>

              <h2 className="text-2xl font-light text-[#8c7a6b] mb-2 tracking-wide">Welcome to</h2>
              <h3 className="text-xl font-medium text-[#5c4f45] mb-4 tracking-wider">LIFE WITH STYLE</h3>
            </div>

            {/* Message */}
            <div className="space-y-3 animate-in fade-in-50 duration-700 delay-600">
              <p className="text-[#8c7a6b] leading-relaxed">
                Thank you for visiting! We're excited to share our curated fashion journey with you.
              </p>

              <div className="bg-gradient-to-r from-[#d4b59e]/10 to-[#a99685]/10 rounded-lg p-4 border border-[#d4b59e]/20">
                <p className="text-sm text-[#a99685] italic">
                  ✨ Our website is currently under curation to bring you the most inspiring style content. New
                  collections and features are being added regularly!
                </p>
              </div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-[#d4b59e] rounded-full animate-pulse"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${2 + i * 0.5}s`,
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
