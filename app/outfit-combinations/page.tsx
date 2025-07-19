"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { ActionButtons } from "@/components/action-buttons"
import { CapsuleGuide } from "@/components/capsule-guide"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"

export default function OutfitCombinationsPage() {
  const guideRef = useRef<HTMLElement>(null)

  // Replace the outfit combinations data with real images
  const outfitCombinations = [
    {
      id: 1,
      title: "Casual Friday",
      description: "Perfect for a relaxed office environment or weekend brunch",
      items: ["White button-down shirt", "Dark wash jeans", "Beige blazer", "Leather loafers", "Minimal gold jewelry"],
      imageSrc: "https://images.unsplash.com/photo-1603189343302-e603f7add05a?q=80&w=987&auto=format&fit=crop",
      category: "Work",
      slug: "casual-friday",
    },
    {
      id: 2,
      title: "Weekend Getaway",
      description: "Comfortable yet stylish for travel and exploration",
      imageSrc: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=987&auto=format&fit=crop",
      category: "Casual",
      slug: "weekend-getaway",
      items: ["Linen shirt", "Comfortable jeans", "White sneakers", "Crossbody bag"],
    },
    {
      id: 3,
      title: "Evening Elegance",
      description: "Sophisticated look for dinner dates or formal events",
      imageSrc: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=983&auto=format&fit=crop",
      category: "Formal",
      slug: "evening-elegance",
      items: ["Little black dress", "Heels", "Clutch", "Statement jewelry"],
    },
    {
      id: 4,
      title: "Office Power Look",
      description: "Professional and confident for important meetings",
      imageSrc: "https://images.unsplash.com/photo-1632149877166-f75d49000351?q=80&w=1064&auto=format&fit=crop",
      category: "Work",
      slug: "office-power-look",
      items: ["Blazer", "Pencil skirt", "Button-up shirt", "Heels"],
    },
    {
      id: 5,
      title: "Sunday Brunch",
      description: "Effortlessly chic for weekend social gatherings",
      imageSrc: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=988&auto=format&fit=crop",
      category: "Casual",
      slug: "sunday-brunch",
      items: ["Flowy dress", "Sandals", "Sun hat", "Sunglasses"],
    },
    {
      id: 6,
      title: "Athleisure Day",
      description: "Sporty yet stylish for errands or casual outings",
      imageSrc: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop",
      category: "Casual",
      slug: "athleisure-day",
      items: ["Leggings", "Hoodie", "Sneakers", "Backpack"],
    },
    {
      id: 7,
      title: "Beach Vacation",
      description: "Breezy and beautiful for seaside adventures",
      imageSrc: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1170&auto=format&fit=crop",
      category: "Vacation",
      slug: "beach-vacation",
      items: ["Swimsuit", "Cover-up", "Flip-flops", "Beach bag"],
    },
    {
      id: 8,
      title: "Autumn Layers",
      description: "Cozy and stylish for cooler temperatures",
      imageSrc: "https://images.unsplash.com/photo-1511963211013-83bba110595d?q=80&w=1170&auto=format&fit=crop",
      category: "Seasonal",
      slug: "autumn-layers",
      items: ["Sweater", "Scarf", "Boots", "Jeans"],
    },
    {
      id: 9,
      title: "Creative Workspace",
      description: "Artistic and comfortable for creative environments",
      imageSrc: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=987&auto=format&fit=crop",
      category: "Work",
      slug: "creative-workspace",
      items: ["Oversized shirt", "Comfortable pants", "Sneakers", "Glasses"],
    },
    {
      id: 10,
      title: "Minimalist Everyday",
      description: "Clean lines and neutral tones for a timeless look",
      imageSrc: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1005&auto=format&fit=crop",
      category: "Everyday",
      slug: "minimalist-everyday",
      items: ["T-shirt", "Jeans", "Flats", "Tote bag"],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main className="flex-1 pt-24">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-serif tracking-wide mb-4">10 Versatile Outfit Combinations</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our curated selection of outfit combinations that maximize style with minimal pieces. Each look
              can be adapted to your personal wardrobe and style preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {outfitCombinations.map((outfit) => (
              <Card key={outfit.id} className="overflow-hidden border border-ilary-border shadow-sm group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={outfit.imageSrc || "/placeholder.svg"}
                    alt={outfit.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-white text-foreground">{outfit.category}</Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-4 right-4 rounded-full bg-white/80 hover:bg-white text-foreground"
                  >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to favorites</span>
                  </Button>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{outfit.title}</CardTitle>
                  <CardDescription>{outfit.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <h3 className="text-sm font-medium mb-2">Includes:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {outfit.items?.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-center">
                        <span className="mr-2 text-xs">•</span>
                        {item}
                      </li>
                    ))}
                    {outfit.items && outfit.items.length > 3 && (
                      <li className="text-xs text-muted-foreground italic">+{outfit.items.length - 3} more items</li>
                    )}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href={`/outfits/${outfit.slug}`} className="w-full">
                    <Button
                      className="w-full bg-ilary-button text-foreground hover:bg-ilary-buttonHover"
                      variant="default"
                    >
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">Mix and Match Philosophy</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Our outfit combinations are designed with versatility in mind. Each piece can be mixed and matched with
              others to create countless unique looks that express your personal style.
            </p>
            <Link href="/outfit-combinations">
              <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">Browse All Outfits</Button>
            </Link>
          </div>
        </div>

        {/* Action Buttons Section */}
        <ActionButtons guideRef={guideRef} className="bg-ilary-peachLight" />

        {/* Capsule Guide Section */}
        <section ref={guideRef}>
          <CapsuleGuide />
        </section>
      </main>
    </div>
  )
}
