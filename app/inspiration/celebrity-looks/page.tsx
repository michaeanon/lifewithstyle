"use client"

import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Instagram } from "lucide-react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { PageHero } from "@/components/page-hero"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function CelebrityLooksPage() {
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  const filteredLooks =
    activeTab === "all" ? celebrityLooks : celebrityLooks.filter((look) => look.category.toLowerCase() === activeTab)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main className="flex-1">
        <PageHero
          title="Celebrity Looks"
          subtitle="Get inspired by celebrity style and fashion choices"
          backgroundImage="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=983&auto=format&fit=crop"
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
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Celebrity Style Inspiration</h2>
              <p className="text-lg max-w-3xl">
                Celebrity fashion often sets trends and provides inspiration for everyday style. Explore our curated
                collection of celebrity looks and learn how to adapt these styles to your own wardrobe with accessible
                alternatives and styling tips.
              </p>
            </div>

            <div className="mb-8">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <div className="flex justify-center mb-8 overflow-x-auto">
                  <TabsList className="grid min-w-[500px] grid-cols-5 bg-ilary-peachLight">
                    <TabsTrigger value="all" className="data-[state=active]:bg-ilary-button">
                      All Looks
                    </TabsTrigger>
                    <TabsTrigger value="casual" className="data-[state=active]:bg-ilary-button">
                      Casual
                    </TabsTrigger>
                    <TabsTrigger value="red carpet" className="data-[state=active]:bg-ilary-button">
                      Red Carpet
                    </TabsTrigger>
                    <TabsTrigger value="street" className="data-[state=active]:bg-ilary-button">
                      Street Style
                    </TabsTrigger>
                    <TabsTrigger value="event" className="data-[state=active]:bg-ilary-button">
                      Events
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
                      <Badge className="bg-white text-foreground">{look.celebrity}</Badge>
                      <Badge className="bg-ilary-peach text-foreground">{look.category}</Badge>
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
                    <h4 className="font-medium mb-2">Get the Look:</h4>
                    <ul className="text-sm space-y-2 mb-4">
                      {look.getTheLook.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{item}</span>
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

            <div className="bg-ilary-peachLight p-8 rounded-lg mb-16">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">Style Like a Celebrity</h2>
                  <p className="mb-6">
                    Want to recreate celebrity looks with your own wardrobe? Our personal stylists can help you adapt
                    celebrity-inspired outfits to your body type, budget, and personal style.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/contact">
                      <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                        Book a Styling Session
                      </Button>
                    </Link>
                    <Link href="/outfit-combinations">
                      <Button variant="outline" className="border-ilary-button hover:bg-white/20">
                        View Outfit Combinations
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
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1160&auto=format&fit=crop"
                    alt="Celebrity styling session"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Toaster />
    </div>
  )
}

// Sample data for celebrity looks
const celebrityLooks = [
  {
    title: "Effortless Chic",
    description: "A perfectly balanced casual look combining comfort and style",
    imageSrc: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
    celebrity: "Zendaya",
    category: "Street",
    slug: "zendaya-street-style",
    getTheLook: [
      "Oversized blazer in neutral tone",
      "High-waisted straight leg jeans",
      "Simple white t-shirt or tank",
      "Minimal gold jewelry",
    ],
  },
  {
    title: "Modern Elegance",
    description: "Sophisticated red carpet look with contemporary elements",
    imageSrc: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=983&auto=format&fit=crop",
    celebrity: "Timothée Chalamet",
    category: "Red Carpet",
    slug: "timothee-chalamet-red-carpet",
    getTheLook: [
      "Well-fitted suit in unexpected color",
      "Turtleneck instead of traditional shirt",
      "Statement boots rather than dress shoes",
      "Minimal accessories for modern edge",
    ],
  },
  {
    title: "Polished Casual",
    description: "Elevated everyday style that looks put-together yet relaxed",
    imageSrc: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=988&auto=format&fit=crop",
    celebrity: "Hailey Bieber",
    category: "Casual",
    slug: "hailey-bieber-casual",
    getTheLook: [
      "Oversized button-down shirt",
      "Bike shorts or leggings",
      "Chunky sneakers or loafers",
      "Statement sunglasses",
    ],
  },
  {
    title: "Statement Dressing",
    description: "Bold event look that commands attention",
    imageSrc: "https://images.unsplash.com/photo-1549062572-544a64fb0c56?q=80&w=1287&auto=format&fit=crop",
    celebrity: "Billy Porter",
    category: "Event",
    slug: "billy-porter-event",
    getTheLook: [
      "One statement piece as focal point",
      "Monochromatic base for balance",
      "Confidence as the key accessory",
      "Complementary makeup or grooming",
    ],
  },
  {
    title: "Minimalist Sophistication",
    description: "Clean lines and neutral palette for timeless elegance",
    imageSrc: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1770&auto=format&fit=crop",
    celebrity: "Rosie Huntington-Whiteley",
    category: "Street",
    slug: "rosie-huntington-whiteley-street",
    getTheLook: [
      "Perfectly fitted neutral basics",
      "Quality fabrics that drape beautifully",
      "Thoughtful proportions and silhouettes",
      "Subtle luxury accessories",
    ],
  },
  {
    title: "Vintage-Inspired Glamour",
    description: "Modern take on old Hollywood elegance",
    imageSrc: "https://images.unsplash.com/photo-1566206091558-7f218b696731?q=80&w=1064&auto=format&fit=crop",
    celebrity: "Blake Lively",
    category: "Red Carpet",
    slug: "blake-lively-red-carpet",
    getTheLook: [
      "Figure-flattering silhouette",
      "Rich, luxurious fabrics",
      "Classic hair and makeup",
      "Statement jewelry that complements rather than competes",
    ],
  },
]
