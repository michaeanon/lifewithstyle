"use client"

import { useEffect, useState, useRef } from "react"
import { Sparkles } from "lucide-react"

export function WelcomeAnimation() {
  const [show, setShow] = useState(true)
  const [animationStage, setAnimationStage] = useState(1)
  const particlesRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const backgroundPatternRef = useRef<HTMLCanvasElement>(null)

  // Handle audio play automatically
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3

      // Try to play audio automatically
      const playAudio = async () => {
        try {
          await audioRef.current?.play()
        } catch (error) {
          console.log("Auto-play prevented by browser:", error)
          // We'll still continue without sound if autoplay is blocked
        }
      }

      playAudio()
    }
  }, [])

  // Create and animate particles
  useEffect(() => {
    if (!particlesRef.current || animationStage < 2) return

    const container = particlesRef.current
    const containerWidth = container.offsetWidth
    const containerHeight = container.offsetHeight

    // Clear any existing particles
    container.innerHTML = ""

    // Create particles
    const particleCount = 60
    const colors = ["#ff9a8b", "#ff6a88", "#ff8177", "#ffb199", "#ffc2d1", "#ffedde"]

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")

      // Random properties
      const size = Math.random() * 6 + 2
      const color = colors[Math.floor(Math.random() * colors.length)]
      const left = Math.random() * containerWidth
      const top = Math.random() * containerHeight
      const duration = Math.random() * 20 + 10
      const delay = Math.random() * 5
      const xDrift = (Math.random() - 0.5) * 100

      // Set styles
      particle.style.position = "absolute"
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.backgroundColor = color
      particle.style.borderRadius = "50%"
      particle.style.left = `${left}px`
      particle.style.top = `${top}px`
      particle.style.opacity = "0"
      particle.style.setProperty("--x-drift", `${xDrift}px`)
      particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`

      container.appendChild(particle)
    }
  }, [animationStage])

  // Create animated background pattern
  useEffect(() => {
    if (!backgroundPatternRef.current) return

    const canvas = backgroundPatternRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create grid pattern
    const gridSize = 40
    const lineWidth = 0.5
    let time = 0

    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw animated grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      ctx.lineWidth = lineWidth

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        const waveOffset = Math.sin(time + x * 0.01) * 5

        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x + waveOffset, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        const waveOffset = Math.sin(time + y * 0.01) * 5

        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y + waveOffset)
        ctx.stroke()
      }

      // Update time
      time += 0.01

      // Continue animation
      if (show) {
        requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [show])

  // Play sound effects based on animation stage
  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current

    // Play different sounds based on animation stage
    if (animationStage === 2) {
      audio.currentTime = 0
      audio.play().catch((e) => console.log("Audio play prevented:", e))
    } else if (animationStage === 3) {
      audio.currentTime = 2
      audio.play().catch((e) => console.log("Audio play prevented:", e))
    } else if (animationStage === 4) {
      audio.currentTime = 4
      audio.play().catch((e) => console.log("Audio play prevented:", e))
    }
  }, [animationStage])

  useEffect(() => {
    // Check if animation has been shown before
    const hasSeenAnimation = localStorage.getItem("hasSeenWelcomeAnimation")

    if (hasSeenAnimation) {
      setShow(false)
      return
    }

    // Animation sequence timing - extended to 8 seconds total
    const timeline = [
      { stage: 2, delay: 2000 }, // Show sparkles and start background
      { stage: 3, delay: 3500 }, // Show welcome text
      { stage: 4, delay: 5000 }, // Show line
      { stage: 5, delay: 7000 }, // Start fade out
      { stage: 6, delay: 8000 }, // Complete hide
    ]

    // Set up animation sequence
    const timers = timeline.map(({ stage, delay }) =>
      setTimeout(() => {
        if (stage === 6) {
          setShow(false)
          // Save that user has seen the animation
          localStorage.setItem("hasSeenWelcomeAnimation", "true")
        } else {
          setAnimationStage(stage)
        }
      }, delay),
    )

    // Clean up timers
    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [])

  // If not showing, return null
  if (!show) return null

  // Generate sparkle positions
  const sparkles = [
    { top: "15%", left: "20%", delay: "0.2s", size: "16px" },
    { top: "25%", right: "15%", delay: "0.5s", size: "12px" },
    { top: "70%", left: "15%", delay: "0.7s", size: "14px" },
    { top: "65%", right: "20%", delay: "0.3s", size: "18px" },
    { top: "40%", left: "10%", delay: "0.6s", size: "10px" },
    { top: "30%", right: "10%", delay: "0.4s", size: "16px" },
    { top: "80%", right: "25%", delay: "0.8s", size: "14px" },
    { top: "10%", left: "40%", delay: "0.5s", size: "12px" },
  ]

  return (
    <div className={`welcome-animation ${animationStage >= 5 ? "animate-fade-out" : ""}`}>
      {/* Audio element */}
      <audio ref={audioRef} loop={false} preload="auto">
        <source src="/sounds/welcome-sound.mp3" type="audio/mp3" />
      </audio>

      {/* Background effects */}
      <div className="welcome-bg-gradient"></div>
      <div className="welcome-bg-radial"></div>
      <canvas ref={backgroundPatternRef} className="welcome-bg-pattern"></canvas>

      {/* Animated background elements */}
      <div className="welcome-bg-elements">
        <div className="welcome-bg-element element-1"></div>
        <div className="welcome-bg-element element-2"></div>
        <div className="welcome-bg-element element-3"></div>
        <div className="welcome-bg-element element-4"></div>
      </div>

      {/* Animated particles container */}
      <div ref={particlesRef} className="welcome-particles"></div>

      {/* Animated circles */}
      {animationStage >= 2 && (
        <>
          <div className="welcome-circle circle-1"></div>
          <div className="welcome-circle circle-2"></div>
          <div className="welcome-circle circle-3"></div>
        </>
      )}

      {/* Main content */}
      <div className="welcome-content">
        <div className={`welcome-logo ${animationStage >= 1 ? "animate-logo" : ""}`}>
          <div className="welcome-logo-inner">
            <div className="text-xl font-semibold tracking-wider text-white">WELCOME TO</div>
            <div className="text-lg font-medium tracking-wide text-rose-300 mt-1">NEW LIFE</div>
            <div className="text-base tracking-widest text-white">WITH STYLE</div>
          </div>

          {/* Sparkles */}
          {animationStage >= 2 &&
            sparkles.map((style, index) => (
              <div
                key={index}
                className="welcome-sparkle"
                style={{
                  ...style,
                  animationDelay: style.delay,
                }}
              >
                <Sparkles style={{ width: style.size, height: style.size }} className="text-white opacity-80" />
              </div>
            ))}

          {/* Logo glow */}
          <div className="welcome-logo-glow"></div>
        </div>

        {/* Tagline */}
        {animationStage >= 3 && (
          <div className="welcome-tagline">
            <span className="welcome-by">by</span>
            <span className="welcome-tina">Tina</span>
          </div>
        )}

        {/* Line */}
        {animationStage >= 4 && <div className="welcome-line animate-line" />}
      </div>
    </div>
  )
}

// Also export as default for flexibility
export default WelcomeAnimation
