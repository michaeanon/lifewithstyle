"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, X, Star, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function FeaturedCollectionPage() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const toggleExpand = (slug: string) => {
    setExpandedItem(expandedItem === slug ? null : slug)
  }

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
                  <Link href="/shop/featured-collection">
                    <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                      Shop Collection
                    </Button>
                  </Link>
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
                <Card
                  key={index}
                  className={`overflow-hidden border border-ilary-border shadow-sm group transition-all duration-300 ${
                    expandedItem === item.slug ? "col-span-1 md:col-span-2 lg:col-span-3" : ""
                  }`}
                >
                  <div className="relative">
                    <div
                      className={`relative ${expandedItem === item.slug ? "aspect-[16/9]" : "aspect-[3/4]"} overflow-hidden`}
                    >
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
                      {expandedItem === item.slug && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => toggleExpand(item.slug)}
                          className="absolute top-4 right-16 rounded-full bg-white/80 hover:bg-white text-foreground"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Close details</span>
                        </Button>
                      )}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-medium text-white mb-1">{item.title}</h3>
                        <p className="text-sm text-white/80 line-clamp-2">{item.description}</p>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedItem === item.slug && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white p-6"
                        >
                          <div className="grid md:grid-cols-2 gap-8">
                            <div>
                              <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                              <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                                    fill={i < 4 ? "currentColor" : "none"}
                                  />
                                ))}
                                <span className="ml-2 text-sm text-gray-600">4.0 (24 reviews)</span>
                              </div>
                              <div className="mb-4">
                                <span className="text-lg font-medium">{item.price}</span>
                                {item.originalPrice && (
                                  <span className="ml-2 text-sm text-muted-foreground line-through">
                                    {item.originalPrice}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-700 mb-6">{item.fullDescription || item.description}</p>

                              <div className="mb-6">
                                <h4 className="text-sm font-medium mb-2">Size</h4>
                                <div className="flex flex-wrap gap-2">
                                  {["XS", "S", "M", "L", "XL"].map((size) => (
                                    <Button
                                      key={size}
                                      variant="outline"
                                      size="sm"
                                      className="h-9 w-9 rounded-md p-0 border-gray-300"
                                    >
                                      {size}
                                    </Button>
                                  ))}
                                </div>
                              </div>

                              <div className="mb-6">
                                <h4 className="text-sm font-medium mb-2">Color</h4>
                                <div className="flex flex-wrap gap-2">
                                  {["#000000", "#FFFFFF", "#D3A17E", "#7E8ED3"].map((color) => (
                                    <Button
                                      key={color}
                                      variant="outline"
                                      size="sm"
                                      className="h-9 w-9 rounded-full p-0 border-gray-300 overflow-hidden"
                                    >
                                      <span className="h-full w-full rounded-full" style={{ backgroundColor: color }} />
                                      <span className="sr-only">Color: {color}</span>
                                    </Button>
                                  ))}
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/shop/featured-collection">
                                  <Button className="w-full bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                                    Add to Cart
                                  </Button>
                                </Link>
                                <Button
                                  variant="outline"
                                  className="w-full border-ilary-button hover:bg-ilary-peachLight"
                                >
                                  Add to Wishlist
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-6">
                              <div>
                                <h4 className="font-medium mb-2">Product Details</h4>
                                <ul className="text-sm space-y-1 text-gray-600">
                                  <li>• Premium quality materials</li>
                                  <li>• Ethically manufactured</li>
                                  <li>• Designed for comfort and style</li>
                                  <li>• Versatile for multiple occasions</li>
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Care Instructions</h4>
                                <ul className="text-sm space-y-1 text-gray-600">
                                  <li>• Machine wash cold</li>
                                  <li>• Gentle cycle with like colors</li>
                                  <li>• Do not bleach</li>
                                  <li>• Tumble dry low</li>
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Shipping & Returns</h4>
                                <p className="text-sm text-gray-600">
                                  Free shipping on orders over $100. Easy returns within 30 days of purchase.
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{item.price}</p>
                        {item.originalPrice && (
                          <p className="text-xs text-muted-foreground line-through">{item.originalPrice}</p>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover"
                        onClick={() => toggleExpand(item.slug)}
                      >
                        {expandedItem === item.slug ? (
                          <>
                            Hide Details <ChevronUp className="ml-1 h-3 w-3" />
                          </>
                        ) : (
                          <>
                            View Details <ChevronDown className="ml-1 h-3 w-3" />
                          </>
                        )}
                      </Button>
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
    fullDescription:
      "This classic white button-down is a cornerstone of any well-curated wardrobe. Crafted from premium organic cotton with a perfect relaxed fit, it offers unparalleled versatility for both casual and formal occasions. The breathable fabric ensures all-day comfort, while the timeless design promises years of stylish wear. Thoughtful details include mother-of-pearl buttons, reinforced seams, and a slightly longer back hem for a modern silhouette.",
    imageSrc: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?q=80&w=1287&auto=format&fit=crop",
    category: "Essentials",
    price: "$89",
    slug: "classic-white-button-down",
  },
  {
    title: "High-Waisted Tailored Trousers",
    description: "Elegant trousers with a flattering silhouette in sustainable wool blend",
    fullDescription:
      "Our high-waisted tailored trousers combine timeless elegance with modern sustainability. The premium wool blend offers structure and comfort, while the thoughtful high-waisted design creates a flattering silhouette that elongates the legs. Perfect for professional settings or elevated casual looks, these trousers feature side pockets, belt loops, and a hidden hook closure for a clean finish. The sustainable production process uses 60% less water than conventional methods.",
    imageSrc: "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1335&auto=format&fit=crop",
    category: "Bottoms",
    price: "$120",
    originalPrice: "$150",
    slug: "high-waisted-tailored-trousers",
  },
  {
    title: "Oversized Cashmere Sweater",
    description: "Luxuriously soft sweater in a versatile neutral tone",
    fullDescription:
      "Indulge in the ultimate luxury with our oversized cashmere sweater. Crafted from the finest grade A Mongolian cashmere, this piece offers exceptional softness and warmth without bulk. The relaxed silhouette provides effortless style and comfort, while the versatile neutral tone ensures endless pairing possibilities. Featuring dropped shoulders, ribbed cuffs and hem, and a slightly longer back, this sweater combines contemporary design with timeless appeal. Each piece is ethically sourced and produced with traditional craftsmanship.",
    imageSrc: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1305&auto=format&fit=crop",
    category: "Knitwear",
    price: "$195",
    slug: "oversized-cashmere-sweater",
  },
  {
    title: "Silk Midi Skirt",
    description: "Flowing silk skirt with timeless appeal and endless styling options",
    fullDescription:
      "Our silk midi skirt embodies effortless elegance with its fluid drape and timeless silhouette. Made from 100% mulberry silk with a luxurious weight and sheen, this piece moves beautifully with every step. The versatile midi length works perfectly for both day and evening occasions, while the hidden side zipper ensures a sleek finish. Available in this sophisticated neutral shade, it pairs seamlessly with both fitted and oversized tops, creating countless styling possibilities throughout the seasons.",
    imageSrc: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1364&auto=format&fit=crop",
    category: "Bottoms",
    price: "$145",
    slug: "silk-midi-skirt",
  },
  {
    title: "Structured Blazer",
    description: "Impeccably tailored blazer that elevates any outfit",
    fullDescription:
      "Our structured blazer represents the pinnacle of modern tailoring. Crafted from premium Italian wool with a touch of stretch for comfort, this blazer features a single-button closure, notched lapels, and flap pockets for a clean, professional silhouette. The thoughtful construction includes light shoulder padding for structure without bulk, a nipped waist for a flattering fit, and a center back vent for ease of movement. Fully lined in breathable cupro fabric, this versatile piece transitions effortlessly from boardroom to dinner, instantly elevating any outfit.",
    imageSrc: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1336&auto=format&fit=crop",
    category: "Outerwear",
    price: "$225",
    slug: "structured-blazer",
  },
  {
    title: "Leather Tote Bag",
    description: "Handcrafted vegetable-tanned leather tote for everyday elegance",
    fullDescription:
      "Our leather tote bag combines functionality with timeless style. Handcrafted by skilled artisans using vegetable-tanned full-grain leather, each bag develops a unique patina over time, telling the story of its journey with you. The spacious interior easily accommodates daily essentials, including a 13-inch laptop, while the interior zip pocket and key leash keep smaller items secure. Reinforced handles and base ensure durability for years of use. The bag's minimalist design and clean lines make it a versatile companion for work, travel, or everyday adventures.",
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
    imageSrc:
      "https://images.unsplash.com/flagged/photo-1553802922-e345434156e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEVmZm9ydGxlc3MlMjBPZmZpY2UlMjBDaGljJTIwZHJlc3MlMjBkZXNpZ258ZW58MHwwfDB8fHww",
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
    imageSrc:
      "https://plus.unsplash.com/premium_photo-1747763001254-1b676cfe5c87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fFdlZWtlbmQlMjBTb3BoaXN0aWNhdGlvbiUyMGRyZXNzJTIwZGVzaWdufGVufDB8MHwwfHx8MA%3D%3D",
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
    imageSrc:
      "https://images.unsplash.com/photo-1678115978875-bf1bc2969c23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RXZlbmluZyUyMEVsZWdhbmNlJTIwZHJlc3MlMjBkZXNpZ258ZW58MHwwfDB8fHww",
    items: ["Silk blouse", "Tailored trousers", "Statement earrings", "Leather clutch", "Heeled sandals"],
  },
]
