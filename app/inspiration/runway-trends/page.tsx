"use client"

import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Instagram } from "lucide-react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { PageHero } from "@/components/page-hero"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function RunwayTrendsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  const filteredTrends =
    activeTab === "all" ? runwayTrends : runwayTrends.filter((trend) => trend.season.toLowerCase() === activeTab)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main className="flex-1">
        <PageHero
          title="Runway Trends"
          subtitle="Adaptable looks inspired by high fashion runways"
          backgroundImage="https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?q=80&w=1287&auto=format&fit=crop"
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
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">From Runway to Everyday</h2>
              <p className="text-lg max-w-3xl">
                Runway fashion often seems extravagant and unwearable, but these trends can be adapted for everyday
                style. We've curated the most wearable trends from recent fashion weeks and show you how to incorporate
                them into your wardrobe in practical, accessible ways.
              </p>
            </div>

            <div className="mb-8">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <div className="flex justify-center mb-8">
                  <TabsList className="grid min-w-[400px] grid-cols-3 bg-ilary-peachLight">
                    <TabsTrigger value="all" className="data-[state=active]:bg-ilary-button">
                      All Seasons
                    </TabsTrigger>
                    <TabsTrigger value="spring/summer" className="data-[state=active]:bg-ilary-button">
                      Spring/Summer
                    </TabsTrigger>
                    <TabsTrigger value="fall/winter" className="data-[state=active]:bg-ilary-button">
                      Fall/Winter
                    </TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
              {filteredTrends.map((trend, index) => (
                <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm group">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={trend.imageSrc || "/placeholder.svg"}
                      alt={trend.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <Badge className="bg-white text-foreground">{trend.designer}</Badge>
                      <Badge className="bg-ilary-peach text-foreground">{trend.season}</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-medium text-white mb-1">{trend.title}</h3>
                      <p className="text-sm text-white/80 line-clamp-2">{trend.description}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="font-medium mb-2">How to Wear It:</h4>
                    <ul className="text-sm space-y-2 mb-4">
                      {trend.howToWear.map((tip, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="outline"
                      className="w-full border-ilary-button hover:bg-ilary-peachLight flex items-center justify-center gap-2"
                      onClick={() => {
                        toast({
                          title: "Coming Soon",
                          description: `More examples for "${trend.title}" are currently being curated.`,
                        })
                      }}
                    >
                      <span>See More Examples</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Toaster />
    </div>
  )
}

// Sample data for runway trends
const runwayTrends = [
  {
    title: "Statement Sleeves",
    description: "Voluminous and sculptural sleeves that add drama to simple silhouettes",
    imageSrc: "https://images.unsplash.com/photo-1566206091558-7f218b696731?q=80&w=1064&auto=format&fit=crop",
    designer: "Cecilie Bahnsen",
    season: "Spring/Summer",
    howToWear: [
      "Balance with slim-fitting bottoms",
      "Keep accessories minimal",
      "Choose solid colors for maximum impact",
    ],
    moreInfoUrl: "#",
  },
  {
    title: "Saturated Colors",
    description: "Bold, vibrant hues that make a statement",
    imageSrc: "https://images.unsplash.com/photo-1589465885857-44edb59bbff2?q=80&w=1287&auto=format&fit=crop",
    designer: "Valentino",
    season: "Fall/Winter",
    howToWear: [
      "Start with one statement piece in a bright color",
      "Try color blocking with complementary hues",
      "Ground with neutral accessories",
    ],
    moreInfoUrl: "#",
  },
  {
    title: "Modern Suiting",
    description: "Relaxed tailoring with unexpected proportions",
    imageSrc: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?q=80&w=1287&auto=format&fit=crop",
    designer: "The Row",
    season: "Fall/Winter",
    howToWear: [
      "Look for relaxed fits rather than structured shapes",
      "Try monochromatic styling for a sleek look",
      "Mix with casual pieces like t-shirts or sneakers",
    ],
    moreInfoUrl: "#",
  },
  {
    title: "Fringe Details",
    description: "Movement-adding fringe on everything from dresses to accessories",
    imageSrc: "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1335&auto=format&fit=crop",
    designer: "Proenza Schouler",
    season: "Spring/Summer",
    howToWear: [
      "Start small with fringed accessories",
      "Keep the rest of your outfit simple",
      "Choose subtle fringe for workwear, bolder for evening",
    ],
    moreInfoUrl: "#",
  },
  {
    title: "Sheer Layers",
    description: "Transparent fabrics used in wearable, elegant ways",
    imageSrc: "https://images.unsplash.com/photo-1603189343302-e603f7add05a?q=80&w=987&auto=format&fit=crop",
    designer: "Fendi",
    season: "Spring/Summer",
    howToWear: [
      "Layer over solid pieces for everyday wear",
      "Look for strategic opacity in key areas",
      "Try sheer sleeves or overlays as an entry point",
    ],
    moreInfoUrl: "#",
  },
  {
    title: "Sculptural Knitwear",
    description: "Artful knits with interesting textures and shapes",
    imageSrc: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=987&auto=format&fit=crop",
    designer: "Loewe",
    season: "Fall/Winter",
    howToWear: [
      "Let the knit be the focal point of your outfit",
      "Pair with simple bottoms in solid colors",
      "Look for interesting details like cutouts or asymmetry",
    ],
    moreInfoUrl: "#",
  },
]
