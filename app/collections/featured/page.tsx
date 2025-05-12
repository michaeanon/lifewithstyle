"use client"

import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"

export default function FeaturedCollectionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main className="flex-1">
        <PageHero
          title="Featured Collection"
          subtitle="Explore our latest curated collection of seasonal styles and timeless pieces"
          backgroundImage="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
        />

        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-12 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Spring/Summer 2025</h2>
                <p className="mb-4">
                  Our latest collection embraces the essence of the season with lightweight fabrics, versatile pieces,
                  and a harmonious color palette inspired by nature's renewal.
                </p>
                <p className="mb-4">
                  Each piece is thoughtfully designed to mix and match effortlessly, creating a capsule wardrobe that
                  transitions seamlessly from day to evening, work to weekend.
                </p>
                <p className="mb-8">
                  With a focus on quality materials and timeless silhouettes, these garments are designed to become
                  wardrobe favorites for years to come.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                    Shop Collection
                  </Button>
                  <Link href="/outfit-combinations">
                    <Button variant="outline" className="border-ilary-button hover:bg-ilary-peachLight">
                      View Outfit Ideas
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop"
                  alt="Featured collection showcase"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
              {featuredItems.map((item, index) => (
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
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-medium text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-white/80 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{item.price}</p>
                        {item.originalPrice && (
                          <p className="text-xs text-muted-foreground line-through">{item.originalPrice}</p>
                        )}
                      </div>
                      <Link href={`/collections/item/${item.slug}`}>
                        <Button size="sm" className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Styling Inspiration</h2>
              <p className="text-lg mb-8">
                Discover how our featured pieces can be mixed and matched to create versatile outfits for any occasion.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {outfitIdeas.map((outfit, index) => (
                  <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm">
                    <div className="relative aspect-square">
                      <Image
                        src={outfit.imageSrc || "/placeholder.svg"}
                        alt={outfit.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-medium mb-2">{outfit.title}</h3>
                      <p className="text-muted-foreground mb-4">{outfit.description}</p>
                      <h4 className="font-medium mb-2">Includes:</h4>
                      <ul className="text-sm space-y-1">
                        {outfit.items.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="bg-ilary-peachLight p-8 rounded-lg mb-16">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">Complete Your Collection</h2>
                  <p className="mb-6">
                    Our featured pieces are designed to work together, creating a cohesive wardrobe that maximizes style
                    options while minimizing clutter. Explore our complete collection to find your perfect wardrobe
                    essentials.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/outfit-combinations">
                      <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                        View Outfit Combinations
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline" className="border-ilary-button hover:bg-ilary-peachLight">
                        Book Styling Session
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1160&auto=format&fit=crop"
                    alt="Styled outfit collection"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

const featuredItems = [
  {
    title: "Classic White Button-Down",
    description: "A timeless staple crafted from organic cotton with a relaxed fit",
    imageSrc: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?q=80&w=1287&auto=format&fit=crop",
    category: "Essentials",
    price: "$89",
    slug: "classic-white-button-down",
  },
  {
    title: "High-Waisted Tailored Trousers",
    description: "Elegant trousers with a flattering silhouette in sustainable wool blend",
    imageSrc: "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1335&auto=format&fit=crop",
    category: "Bottoms",
    price: "$120",
    originalPrice: "$150",
    slug: "high-waisted-tailored-trousers",
  },
  {
    title: "Oversized Cashmere Sweater",
    description: "Luxuriously soft sweater in a versatile neutral tone",
    imageSrc: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1305&auto=format&fit=crop",
    category: "Knitwear",
    price: "$195",
    slug: "oversized-cashmere-sweater",
  },
  {
    title: "Silk Midi Skirt",
    description: "Flowing silk skirt with timeless appeal and endless styling options",
    imageSrc: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1364&auto=format&fit=crop",
    category: "Bottoms",
    price: "$145",
    slug: "silk-midi-skirt",
  },
  {
    title: "Structured Blazer",
    description: "Impeccably tailored blazer that elevates any outfit",
    imageSrc: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1336&auto=format&fit=crop",
    category: "Outerwear",
    price: "$225",
    slug: "structured-blazer",
  },
  {
    title: "Leather Tote Bag",
    description: "Handcrafted vegetable-tanned leather tote for everyday elegance",
    imageSrc: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1287&auto=format&fit=crop",
    category: "Accessories",
    price: "$275",
    originalPrice: "$325",
    slug: "leather-tote-bag",
  },
]

const outfitIdeas = [
  {
    title: "Effortless Office Chic",
    description: "A polished yet comfortable look for the modern workplace",
    imageSrc: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=987&auto=format&fit=crop",
    items: [
      "White button-down shirt",
      "High-waisted tailored trousers",
      "Structured blazer",
      "Leather tote bag",
      "Minimal gold jewelry",
    ],
  },
  {
    title: "Weekend Sophistication",
    description: "Elevated casual style for brunches and social gatherings",
    imageSrc: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
    items: [
      "Oversized cashmere sweater",
      "Silk midi skirt",
      "Ankle boots",
      "Leather crossbody bag",
      "Delicate layered necklaces",
    ],
  },
  {
    title: "Evening Elegance",
    description: "A refined look for dinner dates and special occasions",
    imageSrc: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=983&auto=format&fit=crop",
    items: ["Silk blouse", "Tailored trousers", "Statement earrings", "Leather clutch", "Heeled sandals"],
  },
]
