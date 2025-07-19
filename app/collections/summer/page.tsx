"use client"

import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowLeft, Heart } from "lucide-react"
import { PageHero } from "@/components/page-hero"

export default function SummerCollectionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main className="flex-1">
        <PageHero
          title="Summer Collection"
          subtitle="Embrace the warmth with breezy fabrics and vibrant colors"
          backgroundImage="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=2070&auto=format&fit=crop"
        />

        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-12 pb-16">
          <div className="mb-8">
            <Link
              href="/collections"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Collections
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-2xl font-serif tracking-wide mb-6">Summer Essentials</h2>
                <p className="mb-4">
                  Our summer collection celebrates the season with breathable fabrics like linen, cotton, and
                  lightweight silk that keep you cool while looking effortlessly stylish.
                </p>
                <p className="mb-4">
                  The color palette draws inspiration from coastal landscapes—soft blues, sandy neutrals, vibrant
                  corals, and refreshing greens that capture the essence of summer days.
                </p>
                <p className="mb-8">
                  Each piece is designed with versatility in mind, perfect for beach vacations, city explorations, or
                  relaxed evenings with friends.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                    Shop Collection
                  </Button>
                  <Link href="/outfit-combinations">
                    <Button variant="outline" className="border-ilary-button hover:bg-ilary-peachLight">
                      View Summer Outfits
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop"
                  alt="Summer collection showcase"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8 text-center">Summer Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {summerItems.map((item, index) => (
                  <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm group">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={item.imageSrc || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-white text-foreground">{item.category}</Badge>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-4 right-4 rounded-full bg-white/80 hover:bg-white text-foreground"
                      >
                        <Heart className="h-4 w-4" />
                        <span className="sr-only">Add to favorites</span>
                      </Button>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">${item.price}</span>
                        <Button size="sm" className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="mb-16 bg-ilary-peachLight py-16 px-8 rounded-lg">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Summer Styling Tips</h2>
                <p className="text-lg max-w-3xl mx-auto">
                  Make the most of your summer wardrobe with these expert styling suggestions.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Layering for Summer</h3>
                  <p className="mb-4">
                    Even in warm weather, light layers are essential for transitioning from air-conditioned interiors to
                    sunny outdoors.
                  </p>
                  <ul className="space-y-2">
                    <li>• Lightweight linen shirts over tank tops</li>
                    <li>• Breathable cotton cardigans for evening</li>
                    <li>• Versatile scarves that double as wraps</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Accessorizing</h3>
                  <p className="mb-4">The right accessories can transform simple summer basics into standout looks.</p>
                  <ul className="space-y-2">
                    <li>• Statement earrings to elevate casual outfits</li>
                    <li>• Woven bags for texture and interest</li>
                    <li>• Layered delicate necklaces for dimension</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Day to Night</h3>
                  <p className="mb-4">Simple switches to take your daytime summer look into evening.</p>
                  <ul className="space-y-2">
                    <li>• Swap sandals for espadrille wedges</li>
                    <li>• Add a structured blazer over a sundress</li>
                    <li>• Transition with bold lipstick and statement jewelry</li>
                  </ul>
                </div>
              </div>
            </section>

            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Complete Your Summer Wardrobe</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Discover our full range of summer essentials designed to keep you stylish and comfortable all season
                long.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                  Shop All Summer Items
                </Button>
                <Link href="/guides/seasonal-transitions">
                  <Button variant="outline" className="border-ilary-button hover:bg-ilary-peachLight">
                    Seasonal Transition Guide
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

const summerItems = [
  {
    title: "Linen Sundress",
    description: "A breezy linen dress with adjustable straps and flowing silhouette.",
    price: 125,
    category: "Dresses",
    imageSrc: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1065&auto=format&fit=crop",
  },
  {
    title: "Cotton Poplin Blouse",
    description: "Lightweight cotton blouse with puff sleeves and delicate details.",
    price: 85,
    category: "Tops",
    imageSrc: "https://images.unsplash.com/photo-1559334417-a57bd929f003?q=80&w=987&auto=format&fit=crop",
  },
  {
    title: "High-Waisted Linen Shorts",
    description: "Comfortable linen blend shorts with flattering high waist.",
    price: 75,
    category: "Bottoms",
    imageSrc: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=987&auto=format&fit=crop",
  },
  {
    title: "Raffia Tote Bag",
    description: "Handwoven raffia tote perfect for beach days and summer outings.",
    price: 95,
    category: "Accessories",
    imageSrc: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=876&auto=format&fit=crop",
  },
  {
    title: "Espadrille Sandals",
    description: "Classic espadrille sandals with comfortable ankle straps.",
    price: 110,
    category: "Footwear",
    imageSrc: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1480&auto=format&fit=crop",
  },
  {
    title: "Oversized Straw Hat",
    description: "Wide-brimmed straw hat offering stylish sun protection.",
    price: 65,
    category: "Accessories",
    imageSrc: "https://images.unsplash.com/photo-1529245856630-f4853233d2ea?q=80&w=987&auto=format&fit=crop",
  },
]
