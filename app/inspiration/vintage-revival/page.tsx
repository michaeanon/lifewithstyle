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

export default function VintageRevivalPage() {
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  const filteredLooks =
    activeTab === "all" ? vintageLooks : vintageLooks.filter((look) => look.era.toLowerCase() === activeTab)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main className="flex-1">
        <PageHero
          title="Vintage Revival"
          subtitle="Classic styles reimagined for the modern wardrobe"
          backgroundImage="https://images.unsplash.com/photo-1549062572-544a64fb0c56?q=80&w=1287&auto=format&fit=crop"
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
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Timeless Style Reimagined</h2>
              <p className="text-lg max-w-3xl">
                Vintage fashion offers a wealth of inspiration for contemporary style. Discover how to incorporate
                elements from different decades into your modern wardrobe, creating looks that honor the past while
                feeling fresh and relevant today.
              </p>
            </div>

            <div className="mb-8">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <div className="flex justify-center mb-8 overflow-x-auto">
                  <TabsList className="grid min-w-[600px] grid-cols-6 bg-ilary-peachLight">
                    <TabsTrigger value="all" className="data-[state=active]:bg-ilary-button">
                      All Eras
                    </TabsTrigger>
                    <TabsTrigger value="1950s" className="data-[state=active]:bg-ilary-button">
                      1950s
                    </TabsTrigger>
                    <TabsTrigger value="1960s" className="data-[state=active]:bg-ilary-button">
                      1960s
                    </TabsTrigger>
                    <TabsTrigger value="1970s" className="data-[state=active]:bg-ilary-button">
                      1970s
                    </TabsTrigger>
                    <TabsTrigger value="1980s" className="data-[state=active]:bg-ilary-button">
                      1980s
                    </TabsTrigger>
                    <TabsTrigger value="1990s" className="data-[state=active]:bg-ilary-button">
                      1990s
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
                      <Badge className="bg-white text-foreground">{look.era}</Badge>
                      <Badge className="bg-ilary-peach text-foreground">{look.style}</Badge>
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
                    <h4 className="font-medium mb-2">Modern Interpretation:</h4>
                    <ul className="text-sm space-y-2 mb-4">
                      {look.modernTips.map((tip, i) => (
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
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Vintage Shopping Guide</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4">Finding Quality Vintage Pieces</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Check construction:</span> Examine seams, zippers, and buttons
                          for quality and durability.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Inspect fabrics:</span> Natural fibers like wool, silk, and
                          cotton often age better than synthetic materials.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Research labels:</span> Familiarize yourself with vintage
                          designers and brands to spot valuable pieces.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Consider alterations:</span> Many vintage pieces can be tailored
                          for a more modern fit.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4">Where to Shop</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Curated vintage boutiques:</span> Higher prices but better
                          selection and quality control.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Thrift stores:</span> Requires patience but offers the best
                          prices and unexpected finds.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Online marketplaces:</span> Etsy, eBay, and Depop offer wide
                          selections but check seller ratings.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Estate sales:</span> Great for finding high-quality vintage
                          pieces from complete collections.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Follow us on Instagram:</span>
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
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Toaster />
    </div>
  )
}

// Sample data for vintage looks
const vintageLooks = [
  {
    title: "1950s Feminine Silhouettes",
    description: "Full skirts, nipped waists, and elegant accessories define this iconic era",
    imageSrc: "https://images.unsplash.com/photo-1566206091558-7f218b696731?q=80&w=1064&auto=format&fit=crop",
    era: "1950s",
    style: "New Look",
    slug: "1950s-feminine-silhouettes",
    modernTips: [
      "Choose a fit-and-flare dress in a contemporary fabric",
      "Pair a full midi skirt with a fitted t-shirt instead of a blouse",
      "Add a thin belt to define the waist on dresses and cardigans",
      "Keep accessories simple and refined for a modern touch",
    ],
  },
  {
    title: "1960s Mod Fashion",
    description: "Geometric patterns, mini skirts, and bold colors capture the youthful spirit of the 60s",
    imageSrc: "https://images.unsplash.com/photo-1551833726-b6e7210a2d7d?q=80&w=1287&auto=format&fit=crop",
    era: "1960s",
    style: "Mod",
    slug: "1960s-mod-fashion",
    modernTips: [
      "Try a shift dress in a solid color rather than a bold print",
      "Incorporate geometric accessories instead of all-over patterns",
      "Choose modern fabrics with better drape and comfort",
      "Balance mini lengths with modest necklines for contemporary appropriateness",
    ],
  },
  {
    title: "1970s Bohemian Flair",
    description: "Flowing silhouettes, natural fabrics, and earthy tones embody the free-spirited 70s",
    imageSrc: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1170&auto=format&fit=crop",
    era: "1970s",
    style: "Bohemian",
    slug: "1970s-bohemian-flair",
    modernTips: [
      "Limit fringe and embellishments to one statement piece",
      "Choose high-quality fabrics in earthy tones",
      "Pair wide-leg pants with a fitted top for balance",
      "Add structure with a tailored jacket over flowing pieces",
    ],
  },
  {
    title: "1980s Power Dressing",
    description: "Bold shoulders, statement accessories, and confident silhouettes define the ambitious 80s",
    imageSrc: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1287&auto=format&fit=crop",
    era: "1980s",
    style: "Power Dressing",
    slug: "1980s-power-dressing",
    modernTips: [
      "Choose blazers with slightly padded shoulders rather than extreme shapes",
      "Opt for a refined color palette instead of neon brights",
      "Balance oversized tops with slim bottoms",
      "Limit statement accessories to one focal point",
    ],
  },
  {
    title: "1990s Minimalism",
    description: "Clean lines, neutral colors, and understated elegance characterize 90s minimalism",
    imageSrc: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
    era: "1990s",
    style: "Minimalist",
    slug: "1990s-minimalism",
    modernTips: [
      "Update slip dresses with contemporary layering pieces",
      "Choose quality fabrics that drape beautifully",
      "Mix in textural elements to add interest to monochromatic looks",
      "Add architectural accessories for a contemporary edge",
    ],
  },
  {
    title: "1990s Grunge Revival",
    description: "Plaid flannel, distressed denim, and layered pieces capture the rebellious 90s spirit",
    imageSrc: "https://images.unsplash.com/photo-1603189343302-e603f7add05a?q=80&w=987&auto=format&fit=crop",
    era: "1990s",
    style: "Grunge",
    slug: "1990s-grunge-revival",
    modernTips: [
      "Choose one grunge element rather than a head-to-toe look",
      "Opt for well-fitted pieces rather than oversized everything",
      "Balance distressed items with more polished pieces",
      "Add refined accessories to elevate the overall aesthetic",
    ],
  },
]
