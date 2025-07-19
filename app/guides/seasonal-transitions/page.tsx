"use client"

import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { PageHero } from "@/components/page-hero"

export default function SeasonalTransitionsPage() {
  const [activeTab, setActiveTab] = useState("spring-summer")
  const { toast } = useToast()

  const handleDownloadGuide = () => {
    toast({
      title: "Guide Downloaded",
      description: "The seasonal transitions guide PDF has been downloaded to your device.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <Toaster />
      <main className="flex-1">
        <PageHero
          title="Seasonal Transitions"
          subtitle="How to adapt your wardrobe between seasons"
          backgroundImage="https://images.unsplash.com/photo-1511963211013-83bba110595d?q=80&w=1170&auto=format&fit=crop"
        />

        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-12">
          <div className="mb-8">
            <Link
              href="/inspiration/minimalist-aesthetics"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Minimalist Aesthetics
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Seasonal Transitions Guide</h2>
                <p className="text-lg mb-6">
                  Navigating the changing seasons with style can be challenging. This guide will help you seamlessly
                  transition your wardrobe between seasons, maximizing the versatility of your clothing while staying
                  comfortable and fashionable.
                </p>
                <p className="text-lg mb-8">
                  Learn how to layer effectively, which pieces to invest in for year-round wear, and how to adapt your
                  existing wardrobe for changing weather conditions.
                </p>
                <Button
                  onClick={handleDownloadGuide}
                  className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Complete Guide
                </Button>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1511963211013-83bba110595d?q=80&w=1170&auto=format&fit=crop"
                  alt="Seasonal fashion transitions"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Coastal Style Section */}
            <section id="coastal-style" className="mb-16 scroll-mt-24">
              <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-lg mb-8">
                <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Coastal Minimalism</h2>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  Embrace the effortless beauty of seaside living with relaxed silhouettes and natural textures inspired
                  by sand, sea, and sky.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <h3 className="text-2xl font-medium mb-4">Seaside Serenity</h3>
                  <p className="text-lg mb-6">
                    Coastal minimalism captures the relaxed, effortless beauty of seaside living. This style emphasizes
                    natural textures, breathable fabrics, and a palette inspired by the ocean's ever-changing moods.
                    It's about finding beauty in simplicity and comfort in natural materials.
                  </p>
                  <h4 className="text-xl font-medium mb-3">Coastal Elements:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                      <span>Linen and cotton in relaxed, flowing silhouettes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                      <span>Soft, washed color palette of blues, whites, and sandy neutrals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                      <span>Natural accessories like woven bags and rope details</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                      <span>Comfortable, walkable footwear for any terrain</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                      <span>Layering pieces for changing coastal weather</span>
                    </li>
                  </ul>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop"
                    alt="Coastal minimalist style"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {coastalEssentials.map((item, index) => (
                  <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm group">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={item.imageSrc || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <div className="bg-ilary-peach rounded-lg p-8 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">Master Seasonal Style</h2>
                <p className="text-lg max-w-2xl mx-auto">
                  Learn to transition your wardrobe seamlessly through the seasons with our expert styling advice and
                  personalized wardrobe planning services.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-foreground hover:bg-gray-100">
                    Book Consultation
                  </Button>
                </Link>
                <Link href="/guides/sustainable-fashion">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Sustainable Fashion
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

const coastalEssentials = [
  {
    title: "Linen Shirt Dress",
    description: "Effortless elegance in breathable natural fabric",
    imageSrc: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
  },
  {
    title: "Woven Straw Hat",
    description: "Sun protection with natural coastal charm",
    imageSrc: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Canvas Espadrilles",
    description: "Comfortable footwear with rope sole details",
    imageSrc: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1364&auto=format&fit=crop",
  },
  {
    title: "Cotton Knit Cardigan",
    description: "Lightweight layering for cool ocean breezes",
    imageSrc: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1305&auto=format&fit=crop",
  },
  {
    title: "Woven Beach Bag",
    description: "Natural textures in functional design",
    imageSrc: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1287&auto=format&fit=crop",
  },
  {
    title: "Flowing Wide-Leg Pants",
    description: "Relaxed silhouettes in soft, washed fabrics",
    imageSrc: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1480&auto=format&fit=crop",
  },
]
