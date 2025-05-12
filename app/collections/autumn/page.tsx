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

const autumnItems = [
  {
    title: "Cashmere Sweater",
    description: "Luxuriously soft turtleneck sweater in premium cashmere.",
    price: 120,
    imageSrc: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=987&auto=format&fit=crop",
    category: "Knitwear",
  },
  {
    title: "Wool Coat",
    description: "A timeless classic for colder days.",
    price: 250,
    imageSrc: "https://images.unsplash.com/photo-1520012218364-3dbe62c99bee?q=80&w=1287&auto=format&fit=crop",
    category: "Outerwear",
  },
  {
    title: "Leather Boots",
    description: "Stylish and durable, ideal for autumn walks.",
    price: 180,
    imageSrc: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1480&auto=format&fit=crop",
    category: "Footwear",
  },
]

export default function AutumnCollectionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main className="flex-1">
        <PageHero
          title="Autumn Collection"
          subtitle="Embrace the changing season with rich textures and warm tones"
          backgroundImage="https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1511963211013-83bba110595d?q=80&w=1170&auto=format&fit=crop"
                  alt="Autumn collection showcase"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-serif tracking-wide mb-6">Autumn Essentials</h2>
                <p className="mb-4">
                  Our autumn collection celebrates the season's rich palette with warm rust tones, deep burgundies,
                  forest greens, and earthy neutrals that reflect the changing landscape.
                </p>
                <p className="mb-4">
                  We've focused on luxurious textures like soft wool blends, supple leather, and cozy knits that provide
                  warmth without sacrificing style as temperatures begin to drop.
                </p>
                <p className="mb-8">
                  Each piece is designed for versatile layering, allowing you to adapt to fluctuating autumn
                  temperatures while maintaining a polished, seasonal look.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                    Shop Collection
                  </Button>
                  <Link href="/outfit-combinations">
                    <Button variant="outline" className="border-ilary-button hover:bg-ilary-peachLight">
                      View Autumn Outfits
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8 text-center">Autumn Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {autumnItems.map((item, index) => (
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
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">The Art of Autumn Layering</h2>
                <p className="text-lg max-w-3xl mx-auto">
                  Master the essential autumn skill of layering with these expert styling tips.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Base Layers</h3>
                  <p className="mb-4">Start with lightweight, breathable fabrics that sit close to the skin.</p>
                  <ul className="space-y-2">
                    <li>• Fine merino wool for temperature regulation</li>
                    <li>• Silk-blend tops for a luxurious foundation</li>
                    <li>• Fitted cotton pieces for everyday comfort</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Mid Layers</h3>
                  <p className="mb-4">Add warmth and style with versatile middle layers.</p>
                  <ul className="space-y-2">
                    <li>• Lightweight knit sweaters for easy layering</li>
                    <li>• Button-down shirts as standalone or layering pieces</li>
                    <li>• Vests for core warmth without bulk</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Outer Layers</h3>
                  <p className="mb-4">Complete your autumn look with stylish and functional outer layers.</p>
                  <ul className="space-y-2">
                    <li>• Lightweight jackets for mild autumn days</li>
                    <li>• Trench coats for rainy weather</li>
                    <li>• Wool coats for colder late-autumn temperatures</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Autumn Color Palette</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#8B4513] mb-2"></div>
                  <span className="text-sm">Russet Brown</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#A0522D] mb-2"></div>
                  <span className="text-sm">Sienna</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#B8860B] mb-2"></div>
                  <span className="text-sm">Dark Goldenrod</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#556B2F] mb-2"></div>
                  <span className="text-sm">Olive Green</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#800000] mb-2"></div>
                  <span className="text-sm">Burgundy</span>
                </div>
              </div>
            </section>

            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Complete Your Autumn Wardrobe</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Discover our full range of autumn essentials designed to keep you stylish and comfortable throughout the
                season.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                  Shop All Autumn Items
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
