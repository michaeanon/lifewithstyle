"use client"

import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { PageHero } from "@/components/page-hero"
import { Instagram } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function BoldExpressionsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  const filteredLooks =
    activeTab === "all" ? boldLooks : boldLooks.filter((look) => look.category.toLowerCase() === activeTab)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main className="flex-1">
        <PageHero
          title="Bold Expressions"
          subtitle="Statement pieces and expressive style combinations"
          backgroundImage="https://images.unsplash.com/photo-1589465885857-44edb59bbff2?q=80&w=1287&auto=format&fit=crop"
        />

        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-12 pb-16">
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
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Fashion as Self-Expression</h2>
              <p className="text-lg max-w-3xl">
                Bold style is about confidence, creativity, and personal expression. Discover how to incorporate
                statement pieces, vibrant colors, and unexpected combinations into your wardrobe to create looks that
                reflect your unique personality and make a memorable impression.
              </p>
            </div>

            <div className="mb-8">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <div className="flex justify-center mb-8 overflow-x-auto">
                  <TabsList className="grid min-w-[500px] grid-cols-5 bg-ilary-peachLight">
                    <TabsTrigger value="all" className="data-[state=active]:bg-ilary-button">
                      All Styles
                    </TabsTrigger>
                    <TabsTrigger value="color" className="data-[state=active]:bg-ilary-button">
                      Color Play
                    </TabsTrigger>
                    <TabsTrigger value="pattern" className="data-[state=active]:bg-ilary-button">
                      Pattern Mix
                    </TabsTrigger>
                    <TabsTrigger value="volume" className="data-[state=active]:bg-ilary-button">
                      Volume & Shape
                    </TabsTrigger>
                    <TabsTrigger value="statement" className="data-[state=active]:bg-ilary-button">
                      Statement Pieces
                    </TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
              {filteredLooks.map((look, index) => (
                <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm group">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={look.imageSrc || "/placeholder.svg"}
                      alt={look.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <Badge className="bg-white text-foreground">{look.category}</Badge>
                      <Badge className="bg-ilary-peach text-foreground">{look.occasion}</Badge>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-4 right-4 rounded-full bg-white/80 hover:bg-white text-foreground"
                    >
                      <Heart className="h-4 w-4" />
                      <span className="sr-only">Save to favorites</span>
                    </Button>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-medium text-white mb-1">{look.title}</h3>
                      <p className="text-sm text-white/80 line-clamp-2">{look.description}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="font-medium mb-2">Styling Tips:</h4>
                    <ul className="text-sm space-y-2 mb-4">
                      {look.stylingTips.map((tip, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full bg-ilary-button text-foreground hover:bg-ilary-buttonHover"
                      onClick={() => {
                        toast({
                          title: "Coming Soon",
                          description: `The style guide for "${look.title}" is currently under development.`,
                        })
                      }}
                    >
                      View Style Guide
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Finding Your Bold Style</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4">Start Small, Go Big</h3>
                    <p className="mb-4">
                      If you're new to bold style, begin with smaller elements and gradually increase your comfort zone:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Accessories first:</span> Try a statement necklace, bold
                          earrings, or vibrant scarf before committing to larger pieces.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">One bold element:</span> Start with a single statement piece and
                          keep the rest of your outfit simple.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Color confidence:</span> Experiment with colors that make you
                          feel good and complement your skin tone.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4">Balance is Key</h3>
                    <p className="mb-4">
                      Even the boldest looks need thoughtful balance to feel intentional rather than overwhelming:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Silhouette awareness:</span> Balance volume with structure—if
                          wearing an oversized top, pair with more fitted bottoms.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Color theory:</span> Even eclectic color combinations follow
                          certain principles—complementary, analogous, or triadic schemes.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Pattern mixing:</span> Connect patterns through a common color
                          or vary the scale (small patterns with larger ones).
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="bg-ilary-peach rounded-lg p-8 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">Express Yourself</h2>
                <p className="text-lg max-w-2xl mx-auto">
                  Ready to explore your bold side? Our personal stylists can help you discover statement pieces and
                  expressive combinations that reflect your unique personality while ensuring you feel confident and
                  comfortable.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-foreground hover:bg-gray-100">
                    Book a Styling Session
                  </Button>
                </Link>
                <Link href="/outfit-combinations">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    View Bold Outfit Ideas
                  </Button>
                </Link>
                <Link
                  href="https://www.instagram.com/life_withstyle24?igsh=MWxtMDA2N3l3dWRmdA=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                    <Instagram className="h-4 w-4 mr-1" />
                    <span className="text-xs">View on Instagram</span>
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Toaster />
    </div>
  )
}

// Sample data for bold looks
const boldLooks = [
  {
    title: "Color Blocking Brilliance",
    description: "Strategic use of complementary colors for maximum impact",
    imageSrc: "https://images.unsplash.com/photo-1589465885857-44edb59bbff2?q=80&w=1287&auto=format&fit=crop",
    category: "Color",
    occasion: "Casual",
    slug: "color-blocking-brilliance",
    stylingTips: [
      "Choose colors from opposite sides of the color wheel for strongest contrast",
      "Keep silhouettes simple to let the colors be the focus",
      "Add a neutral (black, white, or beige) to ground the look",
      "Consider your skin tone when selecting colors near your face",
    ],
  },
  {
    title: "Pattern Play",
    description: "Artful mixing of different patterns for a curated eclectic look",
    imageSrc: "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1335&auto=format&fit=crop",
    category: "Pattern",
    occasion: "Creative",
    slug: "pattern-play",
    stylingTips: [
      "Mix patterns of different scales (small with large)",
      "Find a common color thread between patterns",
      "Include solid pieces to give the eye a place to rest",
      "Start with classic patterns like stripes and florals before advancing to more complex mixes",
    ],
  },
  {
    title: "Sculptural Silhouettes",
    description: "Playing with volume and shape for architectural impact",
    imageSrc: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?q=80&w=1287&auto=format&fit=crop",
    category: "Volume",
    occasion: "Evening",
    slug: "sculptural-silhouettes",
    stylingTips: [
      "Balance volume—if going big on top, keep it streamlined below (or vice versa)",
      "Choose structured fabrics that hold their shape",
      "Keep accessories minimal to let the silhouette speak",
      "Consider your proportions when selecting where to add volume",
    ],
  },
  {
    title: "Statement Outerwear",
    description: "Making an entrance with bold, eye-catching coats and jackets",
    imageSrc: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1287&auto=format&fit=crop",
    category: "Statement",
    occasion: "Everyday",
    slug: "statement-outerwear",
    stylingTips: [
      "Let the coat be the star—keep what's underneath simple",
      "Consider bold colors, interesting textures, or unusual silhouettes",
      "Ensure proper fit in the shoulders even with oversized styles",
      "Choose a statement coat that works with multiple outfits in your wardrobe",
    ],
  },
  {
    title: "Monochrome Maximalism",
    description: "All-over color with textural variation for sophisticated boldness",
    imageSrc: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
    category: "Color",
    occasion: "Work",
    slug: "monochrome-maximalism",
    stylingTips: [
      "Choose different shades and textures of the same color family",
      "Mix matte and shiny finishes for visual interest",
      "Add subtle pattern in the same color family for depth",
      "Consider the psychological impact of your chosen color",
    ],
  },
  {
    title: "Unexpected Accessories",
    description: "Transforming simple outfits with bold, conversation-starting accessories",
    imageSrc: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1287&auto=format&fit=crop",
    category: "Statement",
    occasion: "Special",
    slug: "unexpected-accessories",
    stylingTips: [
      "Choose one statement piece as the focal point",
      "Keep clothing relatively simple to showcase your bold accessory",
      "Consider scale—larger accessories need space to shine",
      "Look for handcrafted or unique pieces with a story",
    ],
  },
]
