"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { OutfitCard } from "@/components/outfit-card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { motion } from "framer-motion"

export default function OutfitsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter outfits based on category and search query
  const filteredOutfits = outfits.filter((outfit) => {
    const matchesCategory = activeCategory === "all" || outfit.category.toLowerCase() === activeCategory.toLowerCase()
    const matchesSearch =
      outfit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outfit.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="bg-white">
      <Navigation />
      <main className="flex-1">
        <PageHero
          title="Outfit Collection"
          subtitle="Discover curated outfit combinations for every style and occasion"
          backgroundImage="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
        />

        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-12 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
              <div className="relative w-full md:w-auto md:min-w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search outfits..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Tabs
                defaultValue="all"
                value={activeCategory}
                onValueChange={setActiveCategory}
                className="w-full md:w-auto"
              >
                <TabsList className="grid w-full grid-cols-4 md:grid-cols-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="summer">Summer</TabsTrigger>
                  <TabsTrigger value="autumn">Autumn</TabsTrigger>
                  <TabsTrigger value="winter">Winter</TabsTrigger>
                  <TabsTrigger value="spring" className="hidden md:inline-flex">
                    Spring
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Button variant="outline" className="md:hidden w-full flex items-center gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredOutfits.length} {filteredOutfits.length === 1 ? "outfit" : "outfits"}
                {activeCategory !== "all" && ` in ${activeCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>

            {/* Outfits Grid */}
            {filteredOutfits.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                {filteredOutfits.map((outfit, index) => (
                  <OutfitCard
                    key={index}
                    title={outfit.title}
                    description={outfit.description}
                    imageSrc={outfit.imageSrc}
                    category={outfit.category}
                    slug={outfit.slug}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No outfits found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                <Button
                  onClick={() => {
                    setActiveCategory("all")
                    setSearchQuery("")
                  }}
                  className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover"
                >
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Featured Outfit Section */}
            {filteredOutfits.length > 0 && (
              <section className="mt-16 bg-ilary-peachLight p-8 rounded-lg">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">Featured Outfit of the Month</h2>
                    <p className="mb-6">
                      Our stylists have curated this versatile ensemble that transitions effortlessly from day to
                      evening. Featuring timeless pieces that can be mixed and matched with your existing wardrobe.
                    </p>
                    <Link href={`/outfits/${featuredOutfit.slug}`}>
                      <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                        View Featured Outfit
                      </Button>
                    </Link>
                  </div>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={featuredOutfit.imageSrc || "/placeholder.svg"}
                      alt={featuredOutfit.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Style Tips Section */}
            <section className="mt-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6 text-center">Styling Tips</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg border border-ilary-border shadow-sm">
                  <h3 className="text-xl font-medium mb-3">Mix & Match</h3>
                  <p className="text-muted-foreground">
                    Each outfit can be broken down into individual pieces that work with other items in your wardrobe.
                    Don't be afraid to experiment with different combinations.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-ilary-border shadow-sm">
                  <h3 className="text-xl font-medium mb-3">Accessorize Thoughtfully</h3>
                  <p className="text-muted-foreground">
                    The right accessories can transform a simple outfit into something special. Choose pieces that
                    complement rather than compete with your clothing.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-ilary-border shadow-sm">
                  <h3 className="text-xl font-medium mb-3">Consider the Occasion</h3>
                  <p className="text-muted-foreground">
                    Adapt outfits to suit different settings by changing shoes, accessories, or adding/removing layers.
                    Versatility is key to maximizing your wardrobe.
                  </p>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">Need Personalized Styling?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Our expert stylists can help you create custom outfit combinations tailored to your body type, personal
                style, and lifestyle needs.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                  Book a Styling Session
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

// Sample data for outfits
const outfits = [
  {
    title: "Summer Casual Elegance",
    description: "A light and breezy ensemble perfect for warm summer days",
    imageSrc: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
    category: "Summer",
    slug: "summer-casual-elegance",
  },
  {
    title: "Autumn Layers",
    description: "Cozy and stylish layers for the transitional season",
    imageSrc: "https://images.unsplash.com/photo-1511963211013-83bba110595d?q=80&w=1170&auto=format&fit=crop",
    category: "Autumn",
    slug: "autumn-layers",
  },
  {
    title: "Winter Sophistication",
    description: "Elegant cold weather ensemble with luxurious textures",
    imageSrc: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=987&auto=format&fit=crop",
    category: "Winter",
    slug: "winter-sophistication",
  },
  {
    title: "Spring Renewal",
    description: "Fresh and vibrant look for the new season",
    imageSrc: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1173&auto=format&fit=crop",
    category: "Spring",
    slug: "spring-renewal",
  },
  {
    title: "Office Power Look",
    description: "Professional and confident for important meetings",
    imageSrc: "https://images.unsplash.com/photo-1632149877166-f75d49000351?q=80&w=1064&auto=format&fit=crop",
    category: "Winter",
    slug: "office-power-look",
  },
  {
    title: "Weekend Getaway",
    description: "Comfortable yet stylish for travel and exploration",
    imageSrc: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=988&auto=format&fit=crop",
    category: "Summer",
    slug: "weekend-getaway",
  },
  {
    title: "Evening Elegance",
    description: "Sophisticated look for dinner dates or formal events",
    imageSrc: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=983&auto=format&fit=crop",
    category: "Autumn",
    slug: "evening-elegance",
  },
  {
    title: "Casual Friday",
    description: "Perfect for a relaxed office environment or weekend brunch",
    imageSrc: "https://images.unsplash.com/photo-1603189343302-e603f7add05a?q=80&w=987&auto=format&fit=crop",
    category: "Spring",
    slug: "casual-friday",
  },
  {
    title: "Beach Day",
    description: "Effortlessly chic for seaside adventures",
    imageSrc: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1170&auto=format&fit=crop",
    category: "Summer",
    slug: "beach-day",
  },
]

// Featured outfit
const featuredOutfit = {
  title: "Transitional Season Ensemble",
  description: "Versatile pieces that work for changing weather",
  imageSrc: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1160&auto=format&fit=crop",
  category: "Autumn",
  slug: "transitional-season-ensemble",
}
