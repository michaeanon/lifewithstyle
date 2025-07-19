"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram, Twitter, Mail, Download, Share2, Clipboard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface BusinessCardProps {
  variant?: "digital" | "print"
  className?: string
}

export default function BusinessCard({ variant = "digital", className = "" }: BusinessCardProps) {
  const [copied, setCopied] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [autoFlip, setAutoFlip] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [flipInterval, setFlipInterval] = useState<NodeJS.Timeout | null>(null)

  const websiteUrl = "lifewithstyle.com"
  const email = "lifewithstyleinfo1@gmail.com"
  const instagramUrl = "https://www.instagram.com/life_withstyle24?igsh=MWxtMDA2N3l3dWRmdA=="
  const twitterUrl = "https://x.com/christinekeymbu?t=nnVVT5oG9YTFa51WUi1A5A&s=08"

  // Auto flip the card on a timer unless hovered
  useEffect(() => {
    // Initial flip animation
    if (autoFlip) {
      const timer = setTimeout(() => {
        setFlipped(true)
        const timer2 = setTimeout(() => {
          setFlipped(false)
          setAutoFlip(false)

          // Start the automatic flipping after initial animation
          const interval = setInterval(() => {
            if (!isHovering) {
              setFlipped((prev) => !prev)
            }
          }, 5000) // Flip every 5 seconds

          setFlipInterval(interval)
        }, 2000)
        return () => clearTimeout(timer2)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [autoFlip, isHovering])

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (flipInterval) {
        clearInterval(flipInterval)
      }
    }
  }, [flipInterval])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Christine Kambu
ORG:Life With Style
TITLE:Founder & Lead Stylist
EMAIL:${email}
URL:${websiteUrl}
NOTE:Where timeless elegance meets effortless living
END:VCARD`

    const blob = new Blob([vcard], { type: "text/vcard" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "life-with-style-contact.vcf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const shareCard = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Life With Style by Tina",
          text: "Check out Life With Style, where timeless elegance meets effortless living.",
          url: websiteUrl,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      copyToClipboard(websiteUrl)
    }
  }

  if (variant === "print") {
    return (
      <div className={`print-business-card ${className}`}>
        <div className="w-[3.5in] h-[2in] bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none">
          <div className="flex h-full">
            {/* Left side - Brand */}
            <div className="w-1/3 bg-gradient-to-br from-amber-100 to-rose-200 flex flex-col justify-center items-center p-4">
              <div className="relative">
                <h2 className="text-lg font-serif tracking-wide text-gray-800 text-center">LIFE WITH STYLE</h2>
                <div className="w-full h-[1px] bg-gray-800/30 my-1"></div>
                <p className="text-[10px] tracking-widest text-gray-700/80 text-center w-full">BY TINA</p>
              </div>
            </div>

            {/* Right side - Contact Info */}
            <div className="w-2/3 p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-medium text-base">Christine Kambu</h3>
                <p className="text-sm text-muted-foreground">Founder & Lead Stylist</p>
              </div>

              <div className="space-y-1 text-sm">
                <p className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  {email}
                </p>
                <p className="flex items-center gap-2">
                  <Instagram className="h-3 w-3" />
                  @life_withstyle24
                </p>
                <p>{websiteUrl}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`digital-business-card ${className}`}>
      <div className="perspective-1000 w-full">
        <motion.div
          className="relative w-full max-w-md mx-auto h-[340px]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front of card */}
          <Card
            className="absolute inset-0 p-6 bg-gradient-to-br from-amber-50 to-rose-100 border border-amber-200/50 shadow-lg backface-hidden"
            style={{
              backfaceVisibility: "hidden",
              background: "linear-gradient(135deg, #fff6e5 0%, #ffd9d9 100%)",
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={() => setIsHovering(true)}
            onTouchEnd={() => {
              setIsHovering(false)
              setFlipped(true)
            }}
          >
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative mb-4 group">
                {/* Elegant feather-pointed corner frame container */}
                <div className="relative px-4 py-3 transition-all duration-300">
                  {/* Top line with feather corners */}
                  <div className="absolute top-0 left-0 right-0 w-full h-[1px] bg-gray-600/40 group-hover:bg-gray-600/60 transition-colors duration-300"></div>

                  {/* Top-left feather corner */}
                  <div className="absolute -top-1 -left-1 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[5px] border-b-gray-600/40 group-hover:border-b-gray-600/60 transition-all duration-300 transform rotate-45"></div>

                  {/* Top-right feather corner */}
                  <div className="absolute -top-1 -right-1 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[5px] border-b-gray-600/40 group-hover:border-b-gray-600/60 transition-all duration-300 transform -rotate-45"></div>

                  {/* Bottom line with feather corners */}
                  <div className="absolute bottom-0 left-0 right-0 w-full h-[1px] bg-gray-600/40 group-hover:bg-gray-600/60 transition-colors duration-300"></div>

                  {/* Bottom-left feather corner */}
                  <div className="absolute -bottom-1 -left-1 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-gray-600/40 group-hover:border-t-gray-600/60 transition-all duration-300 transform -rotate-45"></div>

                  {/* Bottom-right feather corner */}
                  <div className="absolute -bottom-1 -right-1 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-gray-600/40 group-hover:border-t-gray-600/60 transition-all duration-300 transform rotate-45"></div>

                  {/* Left side lines - disconnected from corners */}
                  <div className="absolute left-0 top-1 w-[1px] h-4 bg-gray-600/40 group-hover:bg-gray-600/60 transition-colors duration-300"></div>
                  <div className="absolute left-0 bottom-1 w-[1px] h-4 bg-gray-600/40 group-hover:bg-gray-600/60 transition-colors duration-300"></div>

                  {/* Right side lines - disconnected from corners */}
                  <div className="absolute right-0 top-1 w-[1px] h-4 bg-gray-600/40 group-hover:bg-gray-600/60 transition-colors duration-300"></div>
                  <div className="absolute right-0 bottom-1 w-[1px] h-4 bg-gray-600/40 group-hover:bg-gray-600/60 transition-colors duration-300"></div>

                  {/* Background */}
                  <div className="absolute inset-0 bg-white/30 backdrop-blur-sm group-hover:bg-white/40 transition-all duration-300"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h2
                      className="text-xl font-serif tracking-wide text-gray-800 italic"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Life with Style
                    </h2>
                    <div className="w-full h-[1px] bg-gray-800/30 my-2"></div>
                    <p className="text-xs tracking-[0.2em] text-gray-700/80 text-center w-full font-light">BY TINA</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 italic">Where timeless elegance meets effortless living</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">{email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-amber-100/50"
                  onClick={() => copyToClipboard(email)}
                  aria-label="Copy email"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Website:</span>
                  <span className="text-sm">{websiteUrl}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-amber-100/50"
                  onClick={() => copyToClipboard(websiteUrl)}
                  aria-label="Copy website URL"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex justify-center space-x-4 pt-2">
                <Link href={instagramUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 border-amber-200 hover:bg-amber-100/50"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={twitterUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 border-amber-200 hover:bg-amber-100/50"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-amber-200 hover:bg-amber-100/50"
                  onClick={shareCard}
                  aria-label="Share"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-amber-200 hover:bg-amber-100/50"
                  onClick={downloadVCard}
                  aria-label="Download vCard"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Back of card */}
          <Card
            className="absolute inset-0 p-6 bg-gradient-to-br from-rose-100 to-amber-50 border border-amber-200/50 shadow-lg backface-hidden rotate-y-180"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "linear-gradient(135deg, #ffd9d9 0%, #fff6e5 100%)",
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={() => setIsHovering(true)}
            onTouchEnd={() => {
              setIsHovering(false)
              setFlipped(false)
            }}
          >
            <div className="h-full flex flex-col justify-between">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2 text-gray-800">Christine Kambu</h3>
                <p className="text-sm text-gray-600 mb-4">Founder & Lead Stylist</p>
                <div className="w-16 h-1 bg-amber-300/70 mx-auto mb-4"></div>
                <p className="text-sm text-gray-700">
                  Curated fashion inspiration and style guides for the modern fashion enthusiast.
                </p>
              </div>

              <div className="mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-2 bg-white/50 rounded-md border border-amber-100">
                    <h4 className="text-xs font-medium mb-1 text-gray-800">Style Guides</h4>
                    <p className="text-xs text-gray-600">Capsule Wardrobes</p>
                  </div>
                  <div className="text-center p-2 bg-white/50 rounded-md border border-amber-100">
                    <h4 className="text-xs font-medium mb-1 text-gray-800">Collections</h4>
                    <p className="text-xs text-gray-600">Seasonal Trends</p>
                  </div>
                  <div className="text-center p-2 bg-white/50 rounded-md border border-amber-100">
                    <h4 className="text-xs font-medium mb-1 text-gray-800">Inspiration</h4>
                    <p className="text-xs text-gray-600">Street Style</p>
                  </div>
                  <div className="text-center p-2 bg-white/50 rounded-md border border-amber-100">
                    <h4 className="text-xs font-medium mb-1 text-gray-800">Outfits</h4>
                    <p className="text-xs text-gray-600">Daily Combinations</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
