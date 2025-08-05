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
  mediaItems?: MediaItem[]
  interval?: number
  overlay?: boolean
  overlayOpacity?: number
  showControls?: boolean
  showIndicators?: boolean
}

function MediaCarousel({
  mediaItems = [],
  interval = 5000,
  overlay = true,
  overlayOpacity = 0.4,
  showControls = false,
  showIndicators = true,
}: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [videoErrors, setVideoErrors] = useState<Record<number, boolean>>({})
  const [videoLoaded, setVideoLoaded] = useState<Record<number, boolean>>({})
  const [isMounted, setIsMounted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const retryAttemptsRef = useRef<Record<number, number>>({})

  // Default media items if none provided
  const defaultMediaItems: MediaItem[] = [
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop",
      alt: "Fashion inspiration 1",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1074&auto=format&fit=crop",
      alt: "Fashion inspiration 2",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=988&auto=format&fit=crop",
      alt: "Fashion inspiration 3",
    },
  ]

  const items = mediaItems.length > 0 ? mediaItems : defaultMediaItems

  // Ensure component is mounted before running client-side code
  useEffect(() => {
    setIsMounted(true)
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  // Function to go to the next slide
  const nextSlide = () => {
    if (!isMounted || items.length === 0) return
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  // Function to go to the previous slide
  const prevSlide = () => {
    if (!isMounted || items.length === 0) return
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  // Function to go to a specific slide
  const goToSlide = (index: number) => {
    if (!isMounted || items.length === 0) return
    setCurrentIndex(index)
  }

  // Handle automatic sliding
  useEffect(() => {
    if (!isMounted || !isPlaying || items.length <= 1) return

    timerRef.current = setTimeout(nextSlide, interval)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [currentIndex, interval, isPlaying, isMounted, items.length])

  // Handle video playback when slide changes
  useEffect(() => {
    if (!isMounted || items.length === 0) return

    try {
      // Pause all videos
      videoRefs.current.forEach((video, index) => {
        if (video && typeof video.pause === "function") {
          try {
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
                      try {
                        if (videoRefs.current[index] && typeof videoRefs.current[index]?.play === "function") {
                          const retryPromise = videoRefs.current[index]?.play()
                          if (retryPromise) {
                            retryPromise.catch(() => {
                              // Mark this video as having an error after retries
                              setVideoErrors((prev) => ({ ...prev, [index]: true }))
                            })
                          }
                        }
                      } catch (retryError) {
                        console.warn("Video retry failed:", retryError)
                        setVideoErrors((prev) => ({ ...prev, [index]: true }))
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
          } catch (videoError) {
            console.warn(`Video operation failed for index ${index}:`, videoError)
            setVideoErrors((prev) => ({ ...prev, [index]: true }))
          }
        }
      })
    } catch (error) {
      console.error("Video playback effect error:", error)
    }
  }, [currentIndex, videoErrors, isMounted, items.length])

  // Handle touch events for swiping on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMounted) return
    try {
      setTouchStart(e.targetTouches[0]?.clientX || 0)
    } catch (error) {
      console.warn("Touch start error:", error)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMounted) return
    try {
      setTouchEnd(e.targetTouches[0]?.clientX || 0)
    } catch (error) {
      console.warn("Touch move error:", error)
    }
  }

  const handleTouchEnd = () => {
    if (!isMounted) return
    try {
      if (touchStart - touchEnd > 50) {
        // Swipe left
        nextSlide()
      }

      if (touchStart - touchEnd < -50) {
        // Swipe right
        prevSlide()
      }
    } catch (error) {
      console.warn("Touch end error:", error)
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
    if (!isMounted || items.length === 0) return

    videoRefs.current = videoRefs.current.slice(0, items.length)
    // Reset retry attempts when media items change
    retryAttemptsRef.current = {}
  }, [items.length, isMounted])

  // Don't render anything until mounted to prevent hydration issues
  if (!isMounted) {
    return (
      <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg">
        <div className="flex items-center justify-center h-full">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  // If no items, show placeholder
  if (items.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center p-4">
          <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500">No media items to display</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Media Items */}
        {items.map((item, index) => (
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
                onError={() => console.warn(`Image failed to load: ${item.src}`)}
              />
            ) : videoErrors[index] ? (
              // Show poster image if video has an error
              item.poster ? (
                <Image
                  src={item.poster || "/placeholder.svg"}
                  alt={item.alt}
                  fill
                  className="object-cover object-center"
                  onError={() => console.warn(`Poster image failed to load: ${item.poster}`)}
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
                    onError={() => handleVideoError(index)}
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
                      ref={(el) => {
                        if (videoRefs.current) {
                          videoRefs.current[index] = el
                        }
                      }}
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

        {/* Indicators */}
        {showIndicators && items.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-25 flex space-x-2">
            {items.map((_, index) => (
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
    </div>
  )
}

// Export as both named and default export
export { MediaCarousel }
export default MediaCarousel
