"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Share2, ShoppingBag } from "lucide-react"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ActionButtons from "@/components/action-buttons"
import { useToast } from "@/components/ui/use-toast"

// Define the outfit data
const outfitData: Record<string, any> = {
  "summer-breeze": {
    id: "summer-breeze",
    title: "Summer Breeze",
    description: "Light and airy outfit perfect for warm summer days",
    image: "/placeholder.svg?height=600&width=400",
    category: "Summer",
    tags: ["Casual", "Light", "Comfortable"],
    pieces: [
      { name: "Linen Shirt", price: "$45", image: "/placeholder.svg?height=200&width=200" },
      { name: "Cotton Shorts", price: "$35", image: "/placeholder.svg?height=200&width=200" },
      { name: "Canvas Sneakers", price: "$65", image: "/placeholder.svg?height=200&width=200" },
    ],
  },
  "elegant-evening": {
    id: "elegant-evening",
    title: "Elegant Evening",
    description: "Sophisticated look for special occasions",
    image: "/placeholder.svg?height=600&width=400",
    category: "Evening",
    tags: ["Elegant", "Formal", "Sophisticated"],
    pieces: [
      { name: "Silk Dress", price: "$120", image: "/placeholder.svg?height=200&width=200" },
      { name: "Heeled Sandals", price: "$85", image: "/placeholder.svg?height=200&width=200" },
      { name: "Statement Necklace", price: "$45", image: "/placeholder.svg?height=200&width=200" },
    ],
  },
  "casual-chic": {
    id: "casual-chic",
    title: "Casual Chic",
    description: "Effortlessly stylish for everyday wear",
    image: "/placeholder.svg?height=600&width=400",
    category: "Casual",
    tags: ["Chic", "Comfortable", "Versatile"],
    pieces: [
      { name: "Denim Jacket", price: "$75", image: "/placeholder.svg?height=200&width=200" },
      { name: "White Tee", price: "$25", image: "/placeholder.svg?height=200&width=200" },
      { name: "Black Jeans", price: "$55", image: "/placeholder.svg?height=200&width=200" },
    ],
  },
}

interface OutfitPageProps {
  params: {
    slug: string
  }
}

export default function OutfitPageClient({ params }: OutfitPageProps) {
  const guideRef = useRef<HTMLElement>(null)
  const { toast } = useToast()
  const outfit = outfitData[params.slug]

  // If outfit doesn't exist, trigger 404
  if (!outfit) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/outfits" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Outfits
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Outfit Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src={outfit.image || "/placeholder.svg"}
                  alt={outfit.title}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </CardContent>
            </Card>

            <ActionButtons />
          </div>

          {/* Outfit Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {outfit.category}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{outfit.title}</h1>
              <p className="text-gray-600 text-lg">{outfit.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {outfit.tags.map((tag: string) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={() =>
                  toast({
                    title: "Saved to Collection",
                    description: "This outfit has been saved to your personal collection.",
                  })
                }
              >
                <Heart className="w-4 h-4 mr-2" />
                Save Outfit
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast({
                    title: "Outfit Shared",
                    description: "Link copied to clipboard! Share this outfit with friends.",
                  })
                }
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Outfit Pieces */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Get The Look</h3>
              <div className="grid gap-4">
                {outfit.pieces.map((piece: any, index: number) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={piece.image || "/placeholder.svg"}
                        alt={piece.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{piece.name}</h4>
                        <p className="text-lg font-semibold text-pink-600">{piece.price}</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() =>
                          toast({
                            title: "Added to Cart",
                            description: `${piece.name} has been added to your cart.`,
                          })
                        }
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Shop
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
