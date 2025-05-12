"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { AlertCircle } from "lucide-react"

type MediaItem = {
  type: "image" | "video"
  src: string
  alt: string
  poster?: string
}

interface MediaCarouselProps {
  mediaItems: MediaItem[]
  interval?: number
  overlay?: boolean
  overlayOpacity?: number
  showControls?: boolean
  showIndicators?: boolean
}

export function MediaCarousel({
  mediaItems,
  interval = 5000,
  overlay = true,
  overlayOpacity = 0.4,
  showControls = false, // Set default to false to hide controls
  showIndicators = true,
}: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [videoErrors, setVideoErrors] = useState<Record<number, boolean>>({})
  const [videoLoaded, setVideoLoaded] = useState<Record<number, boolean>>({})
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const retryAttemptsRef = useRef<Record<number, number>>({})

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length)
  }

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length)
  }

  // Function to go to a specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Handle automatic sliding
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(nextSlide, interval)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [currentIndex, interval, isPlaying])

  // Handle video playback when slide changes
  useEffect(() => {
    // Pause all videos
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex && !videoErrors[index]) {
          // Play the current video
          const playPromise = video.play()

          // Handle play promise to avoid DOMException
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.log(`Video playback issue at index ${index}:`, error)

              // If we've tried less than 3 times, try again
              if (!retryAttemptsRef.current[index] || retryAttemptsRef.current[index] < 3) {
                retryAttemptsRef.current[index] = (retryAttemptsRef.current[index] || 0) + 1

                // Try again after a short delay
                setTimeout(() => {
                  if (videoRefs.current[index]) {
                    const retryPromise = videoRefs.current[index]?.play()
                    if (retryPromise) {
                      retryPromise.catch(() => {
                        // Mark this video as having an error after retries
                        setVideoErrors((prev) => ({ ...prev, [index]: true }))
                      })
                    }
                  }
                }, 1000)
              } else {
                // Mark this video as having an error after retries
                setVideoErrors((prev) => ({ ...prev, [index]: true }))
              }
            })
          }
        } else {
          // Pause other videos
          video.pause()
          video.currentTime = 0
        }
      }
    })
  }, [currentIndex, videoErrors])

  // Handle touch events for swiping on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide()
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevSlide()
    }
  }

  // Handle video error
  const handleVideoError = (index: number) => {
    console.log(`Video at index ${index} failed to load`)
    setVideoErrors((prev) => ({ ...prev, [index]: true }))
  }

  // Handle video loaded
  const handleVideoLoaded = (index: number) => {
    console.log(`Video at index ${index} loaded successfully`)
    setVideoLoaded((prev) => ({ ...prev, [index]: true }))
  }

  // Initialize videoRefs array
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, mediaItems.length)

    // Reset retry attempts when media items change
    retryAttemptsRef.current = {}
  }, [mediaItems])

  return (
    <div
      className="absolute inset-0 w-full h-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Media Items */}
      {mediaItems.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {item.type === "image" ? (
            <Image
              src={item.src || "/placeholder.svg"}
              alt={item.alt}
              fill
              className="object-cover object-center"
              priority={index === 0}
            />
          ) : videoErrors[index] ? (
            // Show poster image if video has an error
            item.poster ? (
              <Image
                src={item.poster || "/placeholder.svg"}
                alt={item.alt}
                fill
                className="object-cover object-center"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100">
                <div className="text-center p-4">
                  <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">Video could not be loaded</p>
                </div>
              </div>
            )
          ) : (
            <div className="relative w-full h-full overflow-hidden">
              {item.src?.includes("youtube.com") || item.src?.includes("youtu.be") ? (
                <iframe
                  className="absolute w-[300%] h-[300%] top-[-100%] left-[-100%]"
                  src={`${item.src}?autoplay=1&controls=0&mute=1&loop=1&playlist=${item.src?.split("/").pop()}&playsinline=1&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&enablejsapi=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={item.alt}
                  style={{ pointerEvents: "none" }}
                ></iframe>
              ) : (
                <>
                  {/* Loading indicator */}
                  {!videoLoaded[index] && index === currentIndex && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-20">
                      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}

                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    autoPlay={index === currentIndex}
                    loop
                    muted
                    playsInline
                    className="absolute w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                    poster={item.poster}
                    onError={() => handleVideoError(index)}
                    onLoadedData={() => handleVideoLoaded(index)}
                  >
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Fallback poster image that shows while video is loading */}
                  {item.poster && !videoLoaded[index] && (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                      style={{
                        backgroundImage: `url(${item.poster})`,
                      }}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Dark Overlay */}
      {overlay && <div className="absolute inset-0 bg-black z-20" style={{ opacity: overlayOpacity }}></div>}

      {/* Navigation Controls - REMOVED */}

      {/* Indicators */}
      {showIndicators && mediaItems.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-25 flex space-x-2">
          {mediaItems.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
              }`}
              onClick={() => {
                goToSlide(index)
              }}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  )
}
