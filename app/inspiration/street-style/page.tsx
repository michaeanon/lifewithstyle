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

export default function StreetStylePage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredLooks =
    activeTab === "all" ? streetStyleLooks : streetStyleLooks.filter((look) => look.season.toLowerCase() === activeTab)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main className="flex-1">
        <PageHero
          title="Street Style Inspiration"
          subtitle="Real-world fashion from global style capitals"
          backgroundImage="https://images.unsplash.com/photo-1705237555670-654ed497dd62?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Global Street Fashion</h2>
              <p className="text-lg max-w-3xl">
                Street style captures the essence of contemporary fashion as it's actually worn by people around the
                world. From the bustling streets of Tokyo to the chic avenues of Paris, these looks showcase personal
                expression, cultural influences, and emerging trends before they hit the mainstream.
              </p>
            </div>

            <div className="mb-8">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <div className="flex justify-center mb-8">
                  <TabsList className="grid min-w-[400px] grid-cols-4 bg-ilary-peachLight">
                    <TabsTrigger value="all" className="data-[state=active]:bg-ilary-button">
                      All Seasons
                    </TabsTrigger>
                    <TabsTrigger value="spring" className="data-[state=active]:bg-ilary-button">
                      Spring
                    </TabsTrigger>
                    <TabsTrigger value="summer" className="data-[state=active]:bg-ilary-button">
                      Summer
                    </TabsTrigger>
                    <TabsTrigger value="fall" className="data-[state=active]:bg-ilary-button">
                      Fall/Winter
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
                      <Badge className="bg-white text-foreground">{look.location}</Badge>
                      <Badge className="bg-ilary-peach text-foreground">{look.season}</Badge>
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
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={look.photographer.avatar || "/placeholder.svg"}
                            alt={look.photographer.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm">{look.photographer.name}</span>
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

// Sample data for street style looks
const streetStyleLooks = [
  {
    title: "Tokyo Street Fusion",
    description: "Avant-garde layering with unexpected color combinations and statement accessories",
    imageSrc: "https://images.unsplash.com/photo-1551833726-b6e7210a2d7d?q=80&w=1287&auto=format&fit=crop",
    location: "Tokyo",
    season: "Spring",
    photographer: {
      name: "Yuki Tanaka",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop",
    },
    instagramUrl: "#",
  },
  {
    title: "Parisian Chic",
    description: "Effortless elegance with neutral tones and minimal accessories",
    imageSrc: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1286&auto=format&fit=crop",
    location: "Paris",
    season: "Fall",
    photographer: {
      name: "Sophie Laurent",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361&auto=format&fit=crop",
    },
    instagramUrl: "#",
  },
  {
    title: "New York Monochrome",
    description: "Urban sophistication with layered black and white pieces",
    imageSrc: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1287&auto=format&fit=crop",
    location: "New York",
    season: "Fall",
    photographer: {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop",
    },
    instagramUrl: "#",
  },
  {
    title: "Copenhagen Color Block",
    description: "Bold color combinations with clean Scandinavian lines",
    imageSrc: "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1335&auto=format&fit=crop",
    location: "Copenhagen",
    season: "Summer",
    photographer: {
      name: "Mia Jensen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop",
    },
    instagramUrl: "#",
  },
  {
    title: "Milan Tailoring",
    description: "Impeccable Italian craftsmanship with a modern twist",
    imageSrc: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?q=80&w=1287&auto=format&fit=crop",
    location: "Milan",
    season: "Spring",
    photographer: {
      name: "Marco Bianchi",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop",
    },
    instagramUrl: "#",
  },
  {
    title: "Seoul Streetwear",
    description: "Cutting-edge Korean streetwear with oversized silhouettes",
    imageSrc: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1288&auto=format&fit=crop",
    location: "Seoul",
    season: "Summer",
    photographer: {
      name: "Ji-hoon Park",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop",
    },
    instagramUrl: "#",
  },
]

// Sample data for fashion cities
const fashionCities = [
  {
    name: "Paris",
    description: "Elegant, refined, and timeless with a focus on quality over quantity",
    imageSrc: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1473&auto=format&fit=crop",
  },
  {
    name: "Tokyo",
    description: "Bold, experimental, and avant-garde with attention to detail",
    imageSrc: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1371&auto=format&fit=crop",
  },
  {
    name: "New York",
    description: "Practical, urban, and diverse with a focus on functionality",
    imageSrc: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1470&auto=format&fit=crop",
  },
  {
    name: "Milan",
    description: "Sophisticated, polished, and luxurious with impeccable craftsmanship",
    imageSrc: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1286&auto=format&fit=crop",
  },
]
