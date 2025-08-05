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

// Helper function to determine the appropriate style guide link
function getStyleGuideLink(category: string, slug: string): string {
  switch (category.toLowerCase()) {
    case "scandinavian":
      return "/guides/capsule-wardrobe#scandinavian-minimalism"
    case "japanese":
      return "/guides/sustainable-fashion#japanese-minimalism"
    case "modern":
      if (slug.includes("professional")) {
        return "/guides/occasion-dressing#professional-minimalism"
      }
      return "/guides/capsule-wardrobe#modern-minimalism"
    case "coastal":
      return "/guides/seasonal-transitions#coastal-style"
    default:
      return "/guides/capsule-wardrobe"
  }
}

export default function MinimalistAestheticsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  const filteredLooks =
    activeTab === "all" ? minimalistLooks : minimalistLooks.filter((look) => look.category.toLowerCase() === activeTab)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main className="flex-1">
        <PageHero
          title="Minimalist Aesthetics"
          subtitle="Clean, simple, and elegant minimalist style inspiration"
          backgroundImage="https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1770&auto=format&fit=crop"
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
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">The Art of Less</h2>
              <p className="text-lg max-w-3xl">
                Minimalist style embraces the philosophy that less is more. By focusing on quality over quantity,
                thoughtful curation, and timeless design, minimalist fashion creates a sense of calm and intention in
                your wardrobe and daily life.
              </p>
            </div>

            <div className="mb-8">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <div className="flex justify-center mb-8 overflow-x-auto">
                  <TabsList className="grid min-w-[500px] grid-cols-5 bg-ilary-peachLight">
                    <TabsTrigger value="all" className="data-[state=active]:bg-ilary-button">
                      All Styles
                    </TabsTrigger>
                    <TabsTrigger value="scandinavian" className="data-[state=active]:bg-ilary-button">
                      Scandinavian
                    </TabsTrigger>
                    <TabsTrigger value="japanese" className="data-[state=active]:bg-ilary-button">
                      Japanese
                    </TabsTrigger>
                    <TabsTrigger value="modern" className="data-[state=active]:bg-ilary-button">
                      Modern
                    </TabsTrigger>
                    <TabsTrigger value="coastal" className="data-[state=active]:bg-ilary-button">
                      Coastal
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
                    <h4 className="font-medium mb-2">Key Elements:</h4>
                    <ul className="text-sm space-y-2 mb-4">
                      {look.keyElements.map((element, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{element}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={getStyleGuideLink(look.category, look.slug)} className="w-full">
                      <Button className="w-full bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                        View Style Guide
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Principles of Minimalist Style</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Quality Over Quantity</h3>
                    <p className="text-muted-foreground">
                      Invest in fewer, higher-quality pieces that will last longer and maintain their appearance.
                      Consider cost-per-wear rather than initial price when making purchasing decisions.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Thoughtful Curation</h3>
                    <p className="text-muted-foreground">
                      Each item should serve a purpose and work harmoniously with other pieces in your wardrobe. Avoid
                      impulse purchases and trend-driven items that won't stand the test of time.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Refined Simplicity</h3>
                    <p className="text-muted-foreground">
                      Focus on clean lines, balanced proportions, and subtle details. Minimalism isn't about absence of
                      design, but rather about intentional, purposeful design choices.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="bg-ilary-peachLight p-8 rounded-lg mb-16">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">Build Your Minimalist Wardrobe</h2>
                  <p className="mb-6">
                    Ready to embrace minimalist style? Our expert stylists can help you curate a thoughtful wardrobe of
                    versatile, high-quality pieces that align with your lifestyle and personal aesthetic.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/guides/capsule-wardrobe">
                      <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                        Capsule Wardrobe Guide
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline" className="border-ilary-button hover:bg-white/20">
                        Book a Consultation
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1723257129708-4ca1d4df3fd6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Minimalist wardrobe collection"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
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
          </motion.div>
        </div>
      </main>
      <Toaster />
    </div>
  )
}

// Sample data for minimalist looks
const minimalistLooks = [
  {
    title: "Scandinavian Simplicity",
    description: "Clean lines and neutral palette with subtle texture",
    imageSrc: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1770&auto=format&fit=crop",
    category: "Scandinavian",
    occasion: "Everyday",
    slug: "scandinavian-simplicity",
    keyElements: [
      "Neutral color palette with emphasis on white, beige, and gray",
      "Natural materials like cotton, linen, and wool",
      "Relaxed yet precise silhouettes",
      "Subtle textural interest rather than patterns",
    ],
  },
  {
    title: "Japanese Minimalism",
    description: "Inspired by traditional Japanese aesthetics with modern functionality",
    imageSrc: "https://images.unsplash.com/photo-1526887520775-4b14b8aed897?q=80&w=1287&auto=format&fit=crop",
    category: "Japanese",
    occasion: "Casual",
    slug: "japanese-minimalism",
    keyElements: [
      "Oversized yet structured silhouettes",
      "Natural and technical fabrics in harmony",
      "Asymmetrical details and thoughtful design elements",
      "Muted color palette with occasional deep accent colors",
    ],
  },
  {
    title: "Modern Professional",
    description: "Refined workwear with clean lines and architectural influence",
    imageSrc: "https://images.unsplash.com/photo-1632149877166-f75d49000351?q=80&w=1064&auto=format&fit=crop",
    category: "Modern",
    occasion: "Work",
    slug: "modern-professional",
    keyElements: [
      "Precise tailoring with contemporary proportions",
      "Limited color palette for easy mixing and matching",
      "Strategic use of subtle texture and material contrast",
      "Minimal yet impactful accessories",
    ],
  },
  {
    title: "Coastal Minimalism",
    description: "Breezy, light-filled aesthetic inspired by seaside living",
    imageSrc: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
    category: "Coastal",
    occasion: "Weekend",
    slug: "coastal-minimalism",
    keyElements: [
      "Airy natural fabrics like linen and cotton",
      "Soft, washed color palette inspired by sand and sea",
      "Relaxed silhouettes with thoughtful draping",
      "Simple, nature-inspired accessories",
    ],
  },
  {
    title: "Monochromatic Elegance",
    description: "Sophisticated tonal dressing for elevated occasions",
    imageSrc: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=986&auto=format&fit=crop",
    category: "Modern",
    occasion: "Evening",
    slug: "monochromatic-elegance",
    keyElements: [
      "Single color family in varying shades and textures",
      "Luxurious fabrics with beautiful drape",
      "Architectural silhouettes with interesting proportions",
      "Minimal jewelry with maximum impact",
    ],
  },
  {
    title: "Minimalist Athleisure",
    description: "Performance-meets-style approach to casual dressing",
    imageSrc: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop",
    category: "Modern",
    occasion: "Active",
    slug: "minimalist-athleisure",
    keyElements: [
      "Technical fabrics in neutral colors",
      "Clean lines with strategic seaming details",
      "Thoughtful layering for versatility",
      "Functional accessories with design integrity",
    ],
  },
]
