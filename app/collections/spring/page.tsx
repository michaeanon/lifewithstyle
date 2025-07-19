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

export default function SpringCollectionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main className="flex-1">
        <PageHero
          title="Spring Collection"
          subtitle="Refresh your wardrobe with light fabrics and vibrant colors"
          backgroundImage="https://images.unsplash.com/photo-1487088678257-3a541e6e3922?q=80&w=2074&auto=format&fit=crop"
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
                <h2 className="text-2xl font-serif tracking-wide mb-6">Spring Essentials</h2>
                <p className="mb-4">
                  Our spring collection celebrates renewal with lightweight fabrics, fresh silhouettes, and a palette
                  inspired by blossoming nature.
                </p>
                <p className="mb-4">
                  From delicate florals to soft pastels and vibrant pops of color, these pieces capture the optimistic
                  spirit of the season while providing versatility for changing spring weather.
                </p>
                <p className="mb-8">
                  Each garment is designed with thoughtful details and transitional styling in mind, perfect for
                  layering as you move from cool mornings to warm afternoons.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                    Shop Collection
                  </Button>
                  <Link href="/outfit-combinations">
                    <Button variant="outline" className="border-ilary-button hover:bg-ilary-peachLight">
                      View Spring Outfits
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1173&auto=format&fit=crop"
                  alt="Spring collection showcase"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8 text-center">Spring Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {springItems.map((item, index) => (
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
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Spring Styling Tips</h2>
                <p className="text-lg max-w-3xl mx-auto">
                  Embrace the season with these fresh styling approaches for your spring wardrobe.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Transitional Layering</h3>
                  <p className="mb-4">
                    Master the art of spring layering to adapt to fluctuating temperatures throughout the day.
                  </p>
                  <ul className="space-y-2">
                    <li>• Lightweight cardigans over dresses</li>
                    <li>• Denim jackets as versatile outer layers</li>
                    <li>• Scarves that can be added or removed as needed</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Color Combinations</h3>
                  <p className="mb-4">Refresh your palette with spring-inspired color pairings.</p>
                  <ul className="space-y-2">
                    <li>• Pastels with white for a clean, fresh look</li>
                    <li>• Complementary colors for vibrant contrast</li>
                    <li>• Tonal dressing in a single color family</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Print Mixing</h3>
                  <p className="mb-4">Experiment with patterns for dynamic spring outfits.</p>
                  <ul className="space-y-2">
                    <li>• Florals with stripes for classic spring style</li>
                    <li>• Mix prints in the same color family</li>
                    <li>• Balance bold patterns with solid pieces</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Spring Color Palette</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#E0BBE4] mb-2"></div>
                  <span className="text-sm">Lavender</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#FFDFD3] mb-2"></div>
                  <span className="text-sm">Peach</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#B5EAD7] mb-2"></div>
                  <span className="text-sm">Mint</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#C7CEEA] mb-2"></div>
                  <span className="text-sm">Periwinkle</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#FFF5BA] mb-2"></div>
                  <span className="text-sm">Buttercream</span>
                </div>
              </div>
            </section>

            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Complete Your Spring Wardrobe</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Discover our full range of spring essentials designed to refresh your style as the season changes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                  Shop All Spring Items
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

const springItems = [
  {
    title: "Floral Midi Dress",
    description: "Lightweight dress with delicate floral print and flowing silhouette.",
    price: 115,
    category: "Dresses",
    imageSrc: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1065&auto=format&fit=crop",
  },
  {
    title: "Linen Blend Blazer",
    description: "Breathable linen-blend blazer perfect for spring layering.",
    price: 145,
    category: "Outerwear",
    imageSrc: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1336&auto=format&fit=crop",
  },
  {
    title: "Cotton Chino Pants",
    description: "Classic chinos in lightweight cotton with comfortable stretch.",
    price: 85,
    category: "Bottoms",
    imageSrc: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Silk Scarf",
    description: "Versatile silk scarf in a vibrant spring print.",
    price: 65,
    category: "Accessories",
    imageSrc: "https://www.museumselection.co.uk/images/products/large/30107.jpg",
  },
  {
    title: "Leather Mules",
    description: "Comfortable leather mules with modern silhouette.",
    price: 120,
    category: "Footwear",
    imageSrc: "https://www.jcrew.com/s7-img-facade/BA505_BK0001?hei=2000&crop=0,0,1600,0",
  },
  {
    title: "Lightweight Cardigan",
    description: "Soft, lightweight cardigan in a versatile neutral shade.",
    price: 95,
    category: "Knitwear",
    imageSrc: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1305&auto=format&fit=crop",
  },
]
