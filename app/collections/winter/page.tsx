"use client"

import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowLeft, Heart, X, ChevronDown, Star } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { useState } from "react"

export default function WinterCollectionPage() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main className="flex-1">
        <PageHero
          title="Winter Collection"
          subtitle="Embrace the season with cozy textures and elegant layers"
          backgroundImage="https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=2070&auto=format&fit=crop"
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
                <h2 className="text-2xl font-serif tracking-wide mb-6">Winter Essentials</h2>
                <p className="mb-4">
                  Our winter collection embraces the season with luxurious fabrics like cashmere, wool, and soft velvet
                  that provide warmth and style during the coldest months.
                </p>
                <p className="mb-4">
                  The color palette features rich, deep tones—midnight blues, forest greens, burgundies, and charcoal
                  grays—complemented by winter whites and metallic accents for the holiday season.
                </p>
                <p className="mb-8">
                  Each piece is designed with thoughtful details and expert tailoring, creating elegant silhouettes that
                  layer beautifully for both everyday wear and special winter occasions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                    Shop Collection
                  </Button>
                  <Link href="/outfit-combinations">
                    <Button variant="outline" className="border-ilary-button hover:bg-ilary-peachLight">
                      View Winter Outfits
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=987&auto=format&fit=crop"
                  alt="Winter collection showcase"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8 text-center">Winter Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {winterItems.map((item, index) => (
                  <Card
                    key={index}
                    className={`overflow-hidden border border-ilary-border shadow-sm group transition-all duration-500 ${
                      expandedCard === index ? "md:col-span-2 lg:col-span-3" : ""
                    }`}
                  >
                    {expandedCard === index ? (
                      // Expanded view
                      <div className="grid md:grid-cols-2 gap-6 p-6">
                        <div className="relative aspect-square overflow-hidden rounded-lg">
                          <Image
                            src={item.imageSrc || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-4 right-4 rounded-full bg-white/80 hover:bg-white text-foreground"
                            onClick={() => toggleCard(index)}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close details</span>
                          </Button>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Badge className="bg-ilary-peachLight text-foreground">{item.category}</Badge>
                              <Button size="icon" variant="ghost" className="rounded-full hover:bg-ilary-peachLight">
                                <Heart className="h-4 w-4" />
                                <span className="sr-only">Add to favorites</span>
                              </Button>
                            </div>
                            <h3 className="text-2xl font-serif mb-2">{item.title}</h3>
                            <div className="flex items-center gap-2 mb-4">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">(28 reviews)</span>
                            </div>
                            <p className="text-muted-foreground mb-4">{item.description}</p>
                            <p className="text-sm text-muted-foreground mb-4">
                              Perfect for winter layering, this piece combines luxury with practicality. Made from
                              premium materials with attention to detail and comfort.
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium mb-2 block">Size</label>
                              <div className="flex gap-2">
                                {["XS", "S", "M", "L", "XL"].map((size) => (
                                  <Button
                                    key={size}
                                    variant="outline"
                                    size="sm"
                                    className="w-12 h-10 hover:bg-ilary-peachLight"
                                  >
                                    {size}
                                  </Button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-2 block">Color</label>
                              <div className="flex gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-300 cursor-pointer"></div>
                                <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-gray-300 cursor-pointer"></div>
                                <div className="w-8 h-8 rounded-full bg-blue-900 border-2 border-gray-300 cursor-pointer"></div>
                              </div>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-2xl font-bold">${item.price}</span>
                              <span className="text-sm text-muted-foreground">Free shipping</span>
                            </div>

                            <div className="flex gap-3">
                              <Button className="flex-1 bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                                Add to Cart
                              </Button>
                              <Button variant="outline" className="border-ilary-button hover:bg-ilary-peachLight">
                                Add to Wishlist
                              </Button>
                            </div>
                          </div>

                          <div className="text-xs text-muted-foreground space-y-1">
                            <p>• Premium winter materials</p>
                            <p>• Professional dry clean recommended</p>
                            <p>• 30-day return policy</p>
                            <p>• Sustainably sourced materials</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Compact view
                      <>
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
                            <Button
                              size="sm"
                              className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover"
                              onClick={() => toggleCard(index)}
                            >
                              View Details
                              <ChevronDown className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </>
                    )}
                  </Card>
                ))}
              </div>
            </section>

            <section className="mb-16 bg-ilary-peachLight py-16 px-8 rounded-lg">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Winter Styling Guide</h2>
                <p className="text-lg max-w-3xl mx-auto">
                  Master the art of winter layering with these expert styling suggestions.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Smart Layering</h3>
                  <p className="mb-4">
                    The key to staying warm without sacrificing style is strategic layering with the right fabrics.
                  </p>
                  <ul className="space-y-2">
                    <li>• Start with thermal or silk base layers</li>
                    <li>• Add cashmere or merino wool mid-layers</li>
                    <li>• Finish with a tailored coat or puffer jacket</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Winter Accessories</h3>
                  <p className="mb-4">Accessories add both warmth and style to your winter wardrobe.</p>
                  <ul className="space-y-2">
                    <li>• Invest in cashmere scarves and gloves</li>
                    <li>• Choose wool hats that flatter your face shape</li>
                    <li>• Add texture with chunky knit accessories</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Evening Elegance</h3>
                  <p className="mb-4">Winter occasions call for sophisticated styling.</p>
                  <ul className="space-y-2">
                    <li>• Velvet and silk add luxurious texture</li>
                    <li>• Layer fine knits under evening dresses</li>
                    <li>• Consider a statement coat as part of your outfit</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Winter Color Palette</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#0F2C59] mb-2"></div>
                  <span className="text-sm">Midnight Blue</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#1F3A3D] mb-2"></div>
                  <span className="text-sm">Forest Green</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#6E0D25] mb-2"></div>
                  <span className="text-sm">Burgundy</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#F5F5F5] mb-2 border border-gray-200"></div>
                  <span className="text-sm">Winter White</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#C0C0C0] mb-2"></div>
                  <span className="text-sm">Silver</span>
                </div>
              </div>
            </section>

            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Complete Your Winter Wardrobe</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Discover our full range of winter essentials designed to keep you stylish and warm throughout the
                season.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                  Shop All Winter Items
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

const winterItems = [
  {
    title: "Cashmere Turtleneck",
    description: "Luxuriously soft turtleneck sweater in premium cashmere.",
    price: 195,
    category: "Knitwear",
    imageSrc: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=987&auto=format&fit=crop",
  },
  {
    title: "Wool Blend Coat",
    description: "Tailored wool-blend coat with elegant silhouette.",
    price: 285,
    category: "Outerwear",
    imageSrc: "https://images.unsplash.com/photo-1520012218364-3dbe62c99bee?q=80&w=1287&auto=format&fit=crop",
  },
  {
    title: "Leather Ankle Boots",
    description: "Water-resistant leather boots with cozy interior lining.",
    price: 220,
    category: "Footwear",
    imageSrc: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1480&auto=format&fit=crop",
  },
  {
    title: "Merino Wool Scarf",
    description: "Ultra-soft merino wool scarf in a versatile neutral shade.",
    price: 85,
    category: "Accessories",
    imageSrc: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1287&auto=format&fit=crop",
  },
  {
    title: "Velvet Evening Dress",
    description: "Elegant velvet dress perfect for winter celebrations.",
    price: 245,
    category: "Dresses",
    imageSrc: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=983&auto=format&fit=crop",
  },
  {
    title: "Cashmere-Lined Gloves",
    description: "Leather gloves with luxurious cashmere lining.",
    price: 95,
    category: "Accessories",
    imageSrc: "https://images.unsplash.com/photo-1584704135557-d8bf7ca50eae?q=80&w=1287&auto=format&fit=crop",
  },
]
