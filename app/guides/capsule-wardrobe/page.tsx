"use client"

import React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { PageHero } from "@/components/page-hero"

const blazerImages = [
  "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop", // Black blazer
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop", // Navy blazer
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop", // Gray blazer
]

const modernEssentials = [
  {
    title: "Essential Blazers",
    description: "Versatile blazers that rotate through different styles",
    imageSrc: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop",
    images: blazerImages,
  },
  {
    title: "White Button-Down",
    description: "Crisp, tailored shirt for professional looks",
    imageSrc: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Tailored Trousers",
    description: "Well-fitted pants in neutral tones",
    imageSrc: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Minimalist Dress",
    description: "Clean lines and sophisticated silhouette",
    imageSrc: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
  },
]

function RotatingImage({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, 2000)
    return () => clearInterval(intervalId)
  }, [images.length])

  return (
    <Image
      src={images[index] || "/placeholder.svg"}
      alt={alt}
      fill
      className="object-cover transition-opacity duration-1000"
      style={{ opacity: 1 }}
    />
  )
}

export default function CapsuleWardrobePage() {
  const { toast } = useToast()

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <Toaster />
      <main className="flex-1">
        <PageHero
          title="Capsule Wardrobe Guide"
          subtitle="Build a timeless collection of versatile pieces that work perfectly together for effortless style."
          backgroundImage="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop"
        />

        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-12">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">What is a Capsule Wardrobe?</h2>
                <p className="text-lg mb-6">
                  A capsule wardrobe is a curated collection of essential clothing items that can be mixed and matched
                  to create a variety of outfits. This approach simplifies your wardrobe, saves time, and promotes
                  sustainable fashion by focusing on quality over quantity.
                </p>
                <p className="text-lg mb-8">
                  Our comprehensive guide will help you build a functional capsule wardrobe tailored to your personal
                  style, lifestyle needs, and seasonal requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() =>
                      toast({
                        title: "Guide Downloaded",
                        description: "The capsule wardrobe guide PDF has been downloaded to your device.",
                      })
                    }
                    className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Complete Guide
                  </Button>
                  <Link href="/contact">
                    <Button variant="outline" className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4" />
                      Book Styling Session
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=2070&auto=format&fit=crop"
                  alt="Capsule wardrobe collection"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Modern Essentials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modernEssentials.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      {item.images ? (
                        <RotatingImage images={item.images} alt={item.title} />
                      ) : (
                        <Image
                          src={item.imageSrc || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-110 hover:rotate-3"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Tips for Building Your Capsule Wardrobe</h2>
              <div className="bg-ilary-peachLight p-8 rounded-lg">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="bg-ilary-button rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <span>Choose a neutral color palette for maximum versatility.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-ilary-button rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <span>Invest in high-quality, durable pieces that will last.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-ilary-button rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <span>Consider your lifestyle and personal style when selecting items.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-ilary-button rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      4
                    </span>
                    <span>Don't be afraid to add a few statement pieces to express your individuality.</span>
                  </li>
                </ul>
              </div>
            </section>

            <div className="bg-ilary-peach rounded-lg p-8 mt-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">
                  Ready to Build Your Capsule Wardrobe?
                </h2>
                <p className="text-lg max-w-2xl mx-auto">
                  Our professional stylists can help you create a personalized capsule wardrobe plan tailored to your
                  lifestyle, body type, and preferences.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-foreground hover:bg-gray-100">
                    Book a Consultation
                  </Button>
                </Link>
                <Link href="/shop/featured-collection">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Shop Essentials
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
